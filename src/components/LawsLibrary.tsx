import React, { useState, useEffect } from 'react';
import { LAWS_LIBRARY } from '../data';
import { LEGAL_DICTIONARY_TERMS } from '../data/legalDictionaryData';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Square, Bookmark, BookmarkCheck, BookOpen, Search, Sparkles } from 'lucide-react';

export function LawsLibrary() {
  const [activeTab, setActiveTab] = useState<'laws' | 'dictionary'>('laws');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeJurisdiction, setActiveJurisdiction] = useState<string>('All');
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('lawshield_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse bookmarks', e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('lawshield_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]
    );
  };

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

  // Categories for Laws
  const lawCategories = Array.from(new Set(LAWS_LIBRARY.map(law => law.category)));
  const ALL_REGIONS = [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
  ];
  const jurisdictions = Array.from(new Set([...LAWS_LIBRARY.map(law => law.jurisdiction || 'National'), ...ALL_REGIONS]));
  const sortedJurisdictions = [
    'National',
    ...jurisdictions.filter(j => j !== 'National').sort()
  ];

  // Categories for Dictionary
  const dictCategories = Array.from(new Set(LEGAL_DICTIONARY_TERMS.map(term => term.category)));

  // Filtering Laws
  const filteredLaws = LAWS_LIBRARY.filter(law => {
    const matchesSearch = law.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          law.simplified.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          law.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory ? law.category === activeCategory : true;
    const matchesJurisdiction = activeJurisdiction === 'All' ? true : (law.jurisdiction === activeJurisdiction);
    const matchesBookmarks = showBookmarks ? bookmarks.includes(law.id) : true;
    return matchesSearch && matchesCategory && matchesJurisdiction && matchesBookmarks;
  });

  // Filtering Dictionary Terms
  const filteredTerms = LEGAL_DICTIONARY_TERMS.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          term.shortDefinition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          term.detailedExplanation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory ? term.category === activeCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-12 p-4 md:p-8">
      {/* Header */}
      <div className="border-b border-white/20 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[10px] uppercase tracking-widest opacity-40 block mb-3">Archive.02</span>
          <h2 className="text-4xl md:text-6xl font-serif italic text-white tracking-tight">Laws Library & Dictionary</h2>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-3 bg-white/5 p-1 rounded-lg border border-white/10 self-start md:self-auto">
          <button
            onClick={() => { setActiveTab('laws'); setActiveCategory(null); }}
            className={`text-[10px] uppercase tracking-[0.2em] px-4 py-2.5 rounded transition-all font-mono ${
              activeTab === 'laws' ? 'bg-[#c9a24b] text-black font-bold shadow' : 'text-white/60 hover:text-white'
            }`}
          >
            Acts & Statutes
          </button>
          <button
            onClick={() => { setActiveTab('dictionary'); setActiveCategory(null); }}
            className={`text-[10px] uppercase tracking-[0.2em] px-4 py-2.5 rounded transition-all font-mono flex items-center gap-1.5 ${
              activeTab === 'dictionary' ? 'bg-[#c9a24b] text-black font-bold shadow' : 'text-white/60 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Legal Dictionary</span>
          </button>
        </div>
      </div>

      {/* Sub Header / Filters */}
      <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
        <div className="w-full md:w-1/2 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder={activeTab === 'laws' ? "SEARCH LAWS, SECTIONS, OR TOPICS..." : "SEARCH LEGAL TERMS & DEFINITIONS..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-4 py-3 bg-transparent border-b border-white/20 focus:outline-none focus:border-white text-xs uppercase tracking-widest placeholder:text-white/20 transition-colors text-white"
            />
            <Search className="w-4 h-4 text-white/30 absolute left-0 top-3.5" />
          </div>

          {activeTab === 'laws' && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-[9px] uppercase tracking-[0.2em] opacity-40">Region:</span>
                <select 
                  value={activeJurisdiction}
                  onChange={(e) => setActiveJurisdiction(e.target.value)}
                  className="bg-transparent border-b border-white/20 text-[10px] uppercase tracking-[0.2em] text-white focus:outline-none pb-1"
                >
                  <option value="All" className="bg-[#0A0A0A]">All Regions</option>
                  {sortedJurisdictions.map(j => (
                    <option key={j} value={j} className="bg-[#0A0A0A]">{j}</option>
                  ))}
                </select>
              </div>

              <button 
                onClick={() => setShowBookmarks(!showBookmarks)}
                className={`text-[9px] uppercase tracking-[0.2em] transition-colors border px-3 py-1 flex items-center gap-1.5
                  ${showBookmarks ? 'border-white text-white' : 'border-white/20 text-white/40 hover:text-white hover:border-white/40'}
                `}
              >
                {showBookmarks ? <BookmarkCheck className="w-3 h-3" /> : <Bookmark className="w-3 h-3" />}
                {showBookmarks ? 'Showing Library' : 'Saved'}
              </button>
            </div>
          )}
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-3 w-full md:w-auto text-[10px] uppercase tracking-[0.2em]">
          <button
            onClick={() => setActiveCategory(null)}
            className={`pb-1 border-b transition-colors ${
              activeCategory === null ? 'border-white text-white font-bold' : 'border-transparent text-white/40 hover:text-white'
            }`}
          >
            All Categories
          </button>
          {(activeTab === 'laws' ? lawCategories : dictCategories).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`pb-1 border-b transition-colors ${
                activeCategory === cat ? 'border-white text-white font-bold' : 'border-transparent text-white/40 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: ACTS & STATUTES */}
      {activeTab === 'laws' && (
        <div className="space-y-12">
          <AnimatePresence mode="popLayout">
          {filteredLaws.map((law, idx) => (
            <motion.div 
              key={law.id} 
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
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
                  <span className="text-[9px] uppercase tracking-[0.2em] opacity-30 block mb-3">Official Scope</span>
                  <p className="text-sm text-white/60 leading-relaxed font-serif italic">"{law.description}"</p>
                </div>
                
                <div className="bg-neutral-900/50 p-6 border border-white/5 relative rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[9px] uppercase tracking-[0.2em] opacity-40 text-[#c9a24b] font-mono">Plain Language Meaning</span>
                    <button
                      onClick={() => toggleSpeech(law.id, law.simplified)}
                      className="text-white/40 hover:text-white transition-colors p-1"
                      aria-label={speakingId === law.id ? "Stop reading" : "Read aloud"}
                    >
                      {speakingId === law.id ? (
                        <Square className="w-4 h-4 text-amber-400" />
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
      )}

      {/* TAB 2: LEGAL DICTIONARY / GLOSSARY */}
      {activeTab === 'dictionary' && (
        <div className="space-y-6">
          <div className="bg-[#0c1729]/60 border border-[#c9a24b]/20 p-4 rounded-lg flex items-center justify-between text-xs text-white/70">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#c9a24b]" />
              <span>Plain-language definitions for complex legal terms used in Indian Courts, BNS, and POSH Act.</span>
            </div>
            <span className="font-mono text-[10px] text-[#c9a24b] uppercase tracking-widest hidden sm:inline">
              {filteredTerms.length} Terms
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {filteredTerms.map((term) => (
                <motion.div
                  key={term.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-neutral-900/60 border border-white/10 p-6 rounded-xl space-y-4 hover:border-[#c9a24b]/30 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-[#c9a24b] font-mono border border-[#c9a24b]/30 px-2 py-0.5 rounded">
                        {term.category}
                      </span>
                      <button
                        onClick={() => toggleSpeech(term.id, `${term.term}. ${term.shortDefinition} ${term.detailedExplanation}`)}
                        className="text-white/40 hover:text-white transition-colors"
                        title="Read Aloud"
                      >
                        {speakingId === term.id ? <Square className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                    </div>

                    <h3 className="text-xl font-serif text-white font-medium flex items-center gap-2">
                      <span>{term.term}</span>
                      {term.pronunciation && (
                        <span className="text-xs font-mono text-white/40 font-normal">({term.pronunciation})</span>
                      )}
                    </h3>

                    <p className="text-sm text-white/90 font-medium leading-relaxed bg-white/5 p-3 rounded border border-white/5">
                      {term.shortDefinition}
                    </p>

                    <p className="text-xs text-white/70 leading-relaxed">
                      {term.detailedExplanation}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 space-y-1.5">
                    <div className="text-xs text-emerald-300/90 font-mono flex items-start gap-1.5">
                      <span className="text-[#c9a24b] font-bold">Key Right:</span>
                      <span>{term.keyRightsOrTakeaway}</span>
                    </div>
                    {term.relatedSections && (
                      <div className="text-[10px] text-white/40 font-mono uppercase tracking-wider">
                        Provision: {term.relatedSections}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredTerms.length === 0 && (
            <div className="py-12 text-center text-[10px] uppercase tracking-widest text-white/40">
              No legal dictionary terms found matching "{searchTerm}".
            </div>
          )}
        </div>
      )}
    </div>
  );
}
