import React, { useState, useEffect } from 'react';
import { LAWS_LIBRARY } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Square, Bookmark, BookmarkCheck } from 'lucide-react';

export function LawsLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeJurisdiction, setActiveJurisdiction] = useState<string>('All');
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('lawshield_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('lawshield_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]
    );
  };

  const toggleSpeech = (id: string, text: string) => {
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

  const categories = Array.from(new Set(LAWS_LIBRARY.map(law => law.category)));
  const jurisdictions = Array.from(new Set(LAWS_LIBRARY.map(law => law.jurisdiction || 'National')));

  const filteredLaws = LAWS_LIBRARY.filter(law => {
    const matchesSearch = law.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          law.simplified.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory ? law.category === activeCategory : true;
    const matchesJurisdiction = activeJurisdiction === 'All' ? true : (law.jurisdiction === activeJurisdiction);
    const matchesBookmarks = showBookmarks ? bookmarks.includes(law.id) : true;
    return matchesSearch && matchesCategory && matchesJurisdiction && matchesBookmarks;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-12 p-4 md:p-8">
      <div className="border-b border-white/20 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[10px] uppercase tracking-widest opacity-40 block mb-4">Archive.02</span>
          <h2 className="text-4xl md:text-6xl font-serif italic text-white tracking-tight">Laws Library</h2>
        </div>
        <button 
          onClick={() => setShowBookmarks(!showBookmarks)}
          className={`text-[9px] uppercase tracking-[0.2em] transition-colors border px-4 py-2 flex items-center gap-2
            ${showBookmarks ? 'border-white text-white' : 'border-white/20 text-white/40 hover:text-white hover:border-white/40'}
          `}
        >
          {showBookmarks ? <BookmarkCheck className="w-3 h-3" /> : <Bookmark className="w-3 h-3" />}
          {showBookmarks ? 'Showing Library' : 'My Library'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
        <div className="w-full md:w-1/2 space-y-6">
          <input
            type="text"
            placeholder="SEARCH LAWS OR TOPICS..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-transparent border-b border-white/20 focus:outline-none focus:border-white text-xs uppercase tracking-widest placeholder:text-white/20 transition-colors text-white"
          />
          <div className="flex items-center gap-4">
            <span className="text-[9px] uppercase tracking-[0.2em] opacity-40">Region:</span>
            <select 
              value={activeJurisdiction}
              onChange={(e) => setActiveJurisdiction(e.target.value)}
              className="bg-transparent border-b border-white/20 text-[10px] uppercase tracking-[0.2em] text-white focus:outline-none pb-1"
            >
              <option value="All" className="bg-[#0A0A0A]">All Regions</option>
              {jurisdictions.map(j => (
                <option key={j} value={j} className="bg-[#0A0A0A]">{j}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 w-full md:w-auto text-[10px] uppercase tracking-[0.2em]">
          <button
            onClick={() => setActiveCategory(null)}
            className={`pb-1 border-b transition-colors ${
              activeCategory === null ? 'border-white text-white' : 'border-transparent text-white/40 hover:text-white'
            }`}
          >
            All Categories
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`pb-1 border-b transition-colors ${
                activeCategory === cat ? 'border-white text-white' : 'border-transparent text-white/40 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-12">
        <AnimatePresence mode="popLayout">
        {filteredLaws.map((law, idx) => (
          <motion.div 
            key={law.id} 
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="group border-t border-white/10 pt-8 flex flex-col md:flex-row gap-8"
          >
            <div className="md:w-1/3 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-[0.3em] opacity-40">0{idx + 1}. {law.category}</span>
                <button 
                  onClick={() => toggleBookmark(law.id)}
                  className={`transition-colors ${bookmarks.includes(law.id) ? 'text-white' : 'text-white/20 hover:text-white/60'}`}
                >
                  {bookmarks.includes(law.id) ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                </button>
              </div>
              <h3 className="text-2xl font-serif italic text-white leading-tight mb-4">
                {law.title}
              </h3>
              {law.jurisdiction && (
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/60 border border-white/10 self-start px-2 py-1">
                  {law.jurisdiction}
                </span>
              )}
            </div>
            
            <div className="md:w-2/3 grid sm:grid-cols-2 gap-8">
              <div>
                <span className="text-[9px] uppercase tracking-[0.2em] opacity-30 block mb-3">Official Text</span>
                <p className="text-sm text-white/60 leading-relaxed font-serif italic">"{law.description}"</p>
              </div>
              
              <div className="bg-neutral-900/50 p-6 border border-white/5 relative">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[9px] uppercase tracking-[0.2em] opacity-40 text-white">What it means</span>
                  <button
                    onClick={() => toggleSpeech(law.id, law.simplified)}
                    className="text-white/40 hover:text-white transition-colors"
                    aria-label={speakingId === law.id ? "Stop reading" : "Read aloud"}
                  >
                    {speakingId === law.id ? (
                      <Square className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="text-sm text-white/90 leading-relaxed">{law.simplified}</p>
              </div>
            </div>
          </motion.div>
        ))}
        </AnimatePresence>
        {filteredLaws.length === 0 && (
          <div className="py-12 text-center text-[10px] uppercase tracking-widest text-white/40">
            {showBookmarks ? 'No saved laws in your library.' : 'No laws found matching your search.'}
          </div>
        )}
      </div>
    </div>
  );
}
