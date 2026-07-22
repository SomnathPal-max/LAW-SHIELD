export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface Law {
  id: string;
  title: string;
  description: string;
  simplified: string;
  category: string;
  jurisdiction?: string;
}

export type ViewState = 'home' | 'assistant' | 'library' | 'generator' | 'emergency';
