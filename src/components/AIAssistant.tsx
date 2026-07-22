import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { Send, Mic, MicOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('lawshield_chat_history');
    if (saved) {
      try {
        // Base64 decode to obfuscate from casual DevTools snooping
        try {
          return JSON.parse(atob(saved));
        } catch (e) {
          // Fallback to plain JSON for backward compatibility
          return JSON.parse(saved);
        }
      } catch (e) {
        console.error('Failed to parse chat history', e);
      }
    }
    return [
      {
        id: '1',
        role: 'assistant',
        content: 'Hello. I am the LawShield AI Assistant. I can help explain your legal rights regarding safety, harassment, or domestic violence in simple terms. How can I assist you today?'
      }
    ];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    // Base64 encode before saving
    localStorage.setItem('lawshield_chat_history', btoa(JSON.stringify(messages)));
  }, [messages]);

  const handleClearChat = () => {
    if (window.confirm("Are you sure you want to clear your chat history for privacy?")) {
      setMessages([{
        id: '1',
        role: 'assistant',
        content: 'Hello. I am the LawShield AI Assistant. I can help explain your legal rights regarding safety, harassment, or domestic violence in simple terms. How can I assist you today?'
      }]);
    }
  };

  useEffect(() => {
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setInput(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setInput('');
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.content,
          history: messages.map(m => ({ role: m.role, content: m.content }))
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.text
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      setError(err.message);
      setMessages(prev => prev.slice(0, -1)); // Remove user message on failure
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto bg-[#0A0A0A] md:border-x border-white/10 overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 border-b border-white/10 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif italic text-white mb-1">
            AI Legal Assistant
          </h2>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Translating complex laws</p>
        </div>
        {messages.length > 1 && (
          <button 
            onClick={handleClearChat}
            className="text-[9px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors border border-white/20 hover:border-white px-3 py-1.5"
          >
            Clear History
          </button>
        )}
      </div>

      {/* Warning Notice */}
      <div className="bg-neutral-900/50 px-8 py-4 border-b border-white/5 flex items-start gap-4">
        <span className="text-[10px] uppercase tracking-widest opacity-40 shrink-0 mt-0.5">Disclaimer</span>
        <p className="text-xs text-white/60 leading-relaxed font-serif italic">
          This AI provides legal information, not official legal advice. For serious or urgent matters, please contact authorities or a qualified lawyer immediately.
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        <AnimatePresence initial={false}>
        {messages.map((msg) => (
          <motion.div 
            key={msg.id} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <span className="text-[9px] uppercase tracking-[0.2em] text-white/30 mb-2">
              {msg.role === 'user' ? 'You' : 'Assistant'}
            </span>
            <div className={`max-w-[85%] px-6 py-5 ${
              msg.role === 'user' 
                ? 'border border-white/20 bg-white/5 text-white/90' 
                : 'bg-neutral-900 border border-white/10 text-white/90'
            }`}>
              {msg.content.split('\n').map((line, i) => (
                <p key={i} className="mb-2 last:mb-0 text-sm leading-relaxed whitespace-pre-wrap">{line}</p>
              ))}
            </div>
          </motion.div>
        ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-start"
          >
            <span className="text-[9px] uppercase tracking-[0.2em] text-white/30 mb-2">Assistant</span>
            <div className="bg-neutral-900 border border-white/10 px-6 py-5 flex gap-2 items-center">
              <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </motion.div>
        )}
        {error && (
          <div className="text-center text-[10px] uppercase tracking-[0.2em] text-red-400 p-4 border border-red-900/50 bg-red-950/20 mt-4">
            Error: {error}. Please try again.
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-6 border-t border-white/10 bg-[#0A0A0A]">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isListening ? 'LISTENING...' : 'DESCRIBE YOUR SITUATION...'}
            className="w-full pl-6 pr-24 py-4 bg-transparent border border-white/20 focus:outline-none focus:border-white text-xs uppercase tracking-widest placeholder:text-white/20 transition-colors text-white"
            disabled={isLoading}
          />
          <div className="absolute right-2 flex items-center gap-1">
            {SpeechRecognition && (
              <button
                type="button"
                onClick={toggleListening}
                className={`p-3 transition-colors flex items-center justify-center ${
                  isListening ? 'text-red-400 hover:text-red-300' : 'text-white/50 hover:text-white'
                }`}
                title={isListening ? 'Stop listening' : 'Start dictation'}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            )}
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-3 text-white/50 hover:text-white disabled:opacity-30 transition-colors flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
