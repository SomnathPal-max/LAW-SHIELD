import { GoogleGenAI } from '@google/genai';

let aiClient: GoogleGenAI | null = null;
const getAi = () => {
  if (!aiClient) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClient;
};

export default async function handler(req: any, res: any) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const ai = getAi();
    const { type, details } = req.body;
    
    const prompt = `You are a legal assistant tool for LawShield India. Generate a formal, legal complaint or request draft for a ${type}.
Refer to applicable Indian laws (BNS 2023 / IPC, PWDVA 2005, POSH Act 2013, IT Act 2000) where appropriate.

Here are the details provided by the user:
${details}

Write a formal, professional draft that the user can submit to the authorities (e.g. Police Station / ICC / Protection Officer / Cyber Cell). Keep placeholders in brackets like [Your Name], [Police Station Name], [Date] for missing information.
Do not add introductory conversational text, output only the document draft.`;

    const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
    });

    res.json({ text: response.text });
  } catch (error: any) {
      console.error("Doc gen error:", error);
      res.status(500).json({ error: error.message || 'Failed to generate document' });
  }
}
