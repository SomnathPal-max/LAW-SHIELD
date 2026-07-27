import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { Send, Mic, MicOff, Volume2, Square, Lock, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import CryptoJS from 'crypto-js';

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
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [showEncryptionInput, setShowEncryptionInput] = useState(false);
  const [encryptionPassword, setEncryptionPassword] = useState('');
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const exportToEncryptedFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (messages.length < 2 || !encryptionPassword) return;
    
    try {
      const historyText = messages.map(m => `${m.role.toUpperCase()}:\n${m.content}\n`).join('\n---\n\n');
      const encrypted = CryptoJS.AES.encrypt(historyText, encryptionPassword).toString();
      const blob = new Blob([encrypted], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Encrypted_Chat_History.lawshield';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setShowEncryptionInput(false);
      setEncryptionPassword('');
    } catch (err) {
      console.error('Encryption failed', err);
    }
  };

  useEffect(() => {
    scrollToBottom();
    localStorage.setItem('lawshield_chat_history', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleSpeech = (id: string, text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    
    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setSpeakingId(null);
      window.speechSynthesis.speak(utterance);
      setSpeakingId(id);
    }
  };

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

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error("Non-JSON response:", text);
        throw new Error(`Server connection error (${response.status}). The backend might be unavailable.`);
      }

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
          <div className="flex gap-4">
            <button 
              onClick={() => setShowEncryptionInput(!showEncryptionInput)}
              className={`text-[9px] uppercase tracking-[0.2em] transition-colors border px-3 py-1.5 flex items-center gap-1.5 ${showEncryptionInput ? 'border-[#c9a24b] text-[#c9a24b]' : 'border-white/20 text-white/40 hover:text-white hover:border-white/40'}`}
            >
              <Lock className="w-3 h-3" />
              Secure Export
            </button>
            <button 
              onClick={handleClearChat}
              className="text-[9px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors border border-white/20 hover:border-white px-3 py-1.5"
            >
              Clear History
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showEncryptionInput && messages.length > 1 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-[#c9a24b]/5 border-b border-[#c9a24b]/30"
          >
            <div className="p-6 space-y-4">
              <div className="flex flex-col space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-[#c9a24b] font-bold">Set Encryption Password</label>
                <p className="text-xs text-white/50">Export a secure, encrypted copy of this chat. You will need this password to read it later.</p>
              </div>
              <form onSubmit={exportToEncryptedFile} className="flex gap-4 max-w-md">
                <input
                  type="password"
                  value={encryptionPassword}
                  onChange={(e) => setEncryptionPassword(e.target.value)}
                  placeholder="ENTER PASSWORD"
                  className="flex-1 bg-[#0A0A0A] border border-white/20 px-4 py-2 text-xs uppercase tracking-widest text-white focus:outline-none focus:border-[#c9a24b] transition-colors"
                />
                <button
                  type="submit"
                  disabled={!encryptionPassword}
                  className="px-4 py-2 bg-[#c9a24b] text-black text-[10px] font-bold uppercase tracking-widest hover:bg-[#c9a24b]/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  Encrypt
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
            <div className={`flex items-center gap-3 mb-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">
                {msg.role === 'user' ? 'You' : 'Assistant'}
              </span>
              {msg.role === 'assistant' && (
                <button
                  onClick={() => toggleSpeech(msg.id, msg.content)}
                  className="text-white/30 hover:text-white transition-colors"
                  title={speakingId === msg.id ? "Stop reading" : "Read aloud"}
                >
                  {speakingId === msg.id ? (
                    <Square className="w-3.5 h-3.5 text-amber-400" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5" />
                  )}
                </button>
              )}
            </div>
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
