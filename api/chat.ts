import { GoogleGenAI } from '@google/genai';
import { WOMENS_SAFETY_LAWS_KNOWLEDGE_BASE } from '../src/data/womensSafetyLawsDataset';

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
  // Add CORS headers for local testing or cross-origin if needed
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
    const { message, history } = req.body;
    
    const systemInstruction = `You are LawShield's AI Legal Assistant, an authoritative yet compassionate expert on women's safety laws in India.
Your primary goal is to translate complex Indian laws and procedures into clear, accessible, and actionable guidance for women facing harassment, violence, cybercrime, or legal confusion.

Refer strictly and accurately to the following official knowledge base of Indian women's safety laws:

${WOMENS_SAFETY_LAWS_KNOWLEDGE_BASE}

KEY OPERATIONAL DIRECTIVES:
1. EMERGENCY FIRST: If the user query indicates active physical danger, violence in progress, or immediate distress, start your response by displaying primary emergency helplines in bold:
   - National Emergency: 112
   - Women Helpline: 181
   - Women in Distress: 1091
   - Cybercrime: 1930
   - Free Legal Aid (DLSA): 15100
2. DUAL LEGAL CITATION: Always reference BOTH the Bharatiya Nyaya Sanhita (BNS, 2023) and former Indian Penal Code (IPC) section numbers when citing criminal offenses (e.g., "BNS Section 74 / formerly IPC Section 354").
3. EMPATHY & CLARITY: Explain legal terms in simple everyday language. Use bullet points for steps (e.g., how to file a POSH complaint, how to file an FIR, or remedies under PWDVA).
4. DISCLAIMER: Always remind the user politely that you provide legal information for awareness, not formal legal counsel, and encourage consulting a lawyer or free legal aid (DLSA - 15100) for ongoing legal proceedings.`;

    let contents = [];
    if (history && history.length > 0) {
        contents = history.map((msg: any) => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));
    }
    
    contents.push({
        role: 'user',
        parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Chat error:", error);
    res.status(500).json({ error: error.message || 'Failed to generate response' });
  }
}
