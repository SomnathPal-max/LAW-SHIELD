import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini lazily
  let aiClient: GoogleGenAI | null = null;
  const getAi = () => {
    if (!aiClient) {
      if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY environment variable is required");
      }
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }
    return aiClient;
  };

  // API Routes
  app.post('/api/chat', async (req, res) => {
    try {
      const ai = getAi();
      const { message, history } = req.body;
      
      const systemInstruction = `You are LawShield's AI Legal Assistant, a specialized AI designed to help women in India understand their legal rights regarding safety, harassment, and domestic violence.
Your primary goal is to translate complex legal jargon into simple, easy-to-understand language.
Be empathetic, objective, and clear.
Always include a disclaimer that you are an AI, not a lawyer, and for serious matters, they should seek professional legal counsel or contact emergency services.
Provide actionable steps when appropriate.`;

      let contents = [];
      if (history && history.length > 0) {
          contents = history.map((msg: any) => ({
              role: msg.role === 'user' ? 'user' : 'model',
              parts: [{ text: msg.content }]
          }));
      }
      
      contents.push({
          role: 'user',
          parts: [{ text: systemInstruction + "\n\nUser query: " + message }]
      });

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: contents,
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Chat error:", error);
      res.status(500).json({ error: error.message || 'Failed to generate response' });
    }
  });

  app.post('/api/generate-document', async (req, res) => {
      try {
          const ai = getAi();
          const { type, details } = req.body;
          
          const prompt = `You are a legal assistant tool for LawShield. Generate a draft for a ${type}. 
Here are the details provided by the user:
${details}

Write a formal, professional draft that the user can use as a starting point. Keep placeholders in brackets like [Your Name] for missing information.
Do not add introductory conversational text, just the document draft.`;

          const response = await ai.models.generateContent({
              model: 'gemini-2.5-flash',
              contents: prompt,
          });

          res.json({ text: response.text });
      } catch (error: any) {
          console.error("Doc gen error:", error);
          res.status(500).json({ error: error.message || 'Failed to generate document' });
      }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
