import React, { useState, useEffect } from 'react';
import { REGIONAL_SUPPORT_RESOURCES, INDIAN_STATES_AND_UTS, SupportResource } from '../data/regionalResourcesData';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Clock, ShieldAlert, Building2, Scale, HeartHandshake, Copy, Check, ExternalLink, Filter, Bookmark, BookmarkCheck } from 'lucide-react';

export function RegionalResources() {
  const [selectedState, setSelectedState] = useState<string>('Delhi');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('lawshield_resource_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse bookmarks', e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('lawshield_resource_bookmarks', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const categories = ['All', 'Police & Emergency', 'One Stop Center (Sakhi)', 'Free Legal Aid (DLSA)', 'Women Commission'];

  const filteredResources = REGIONAL_SUPPORT_RESOURCES.filter(res => {
    const matchesState = selectedState === 'National Support (All States & UTs)' 
      ? true 
      : (res.stateOrUT === selectedState || res.stateOrUT === 'National Support (All States & UTs)');
    const matchesCategory = activeCategory === 'All' ? true : res.category === activeCategory;
    const matchesBookmark = showBookmarksOnly ? bookmarkedIds.includes(res.id) : true;
    return matchesState && matchesCategory && matchesBookmark;
  });

  const handleCopyPhone = (id: string, phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryIcon = (category: SupportResource['category']) => {
    switch (category) {
      case 'Police & Emergency': return <ShieldAlert className="w-4 h-4 text-red-400" />;
      case 'One Stop Center (Sakhi)': return <HeartHandshake className="w-4 h-4 text-pink-400" />;
      case 'Free Legal Aid (DLSA)': return <Scale className="w-4 h-4 text-amber-400" />;
      case 'Women Commission': return <Building2 className="w-4 h-4 text-blue-400" />;
      default: return <MapPin className="w-4 h-4 text-white/60" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 p-4 md:p-8">
      {/* Header */}
      <div className="border-b border-white/20 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-widest opacity-40 block mb-2">Geographic Directory</span>
          <h2 className="text-3xl md:text-5xl font-serif italic text-white tracking-tight">Regional Support & Resources</h2>
        </div>
        <p className="text-xs text-white/60 max-w-sm">
          Find localized assistance, Sakhi One Stop Centers, free legal aid (DLSA), and emergency police helpdesks in your region.
        </p>
      </div>

      {/* Controls */}
      <div className="bg-[#0c1729]/80 border border-[#c9a24b]/20 p-6 rounded-xl space-y-6">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-[#c9a24b] font-mono mb-2">
              Select State or Union Territory:
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-white/20 text-white text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-[#c9a24b] transition-colors"
            >
              {INDIAN_STATES_AND_UTS.map(state => (
                <option key={state} value={state} className="bg-[#0A0A0A]">
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-[#c9a24b] font-mono mb-2">
              Filter Resource Type:
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[10px] uppercase tracking-wider px-3 py-1.5 rounded border transition-all ${
                    activeCategory === cat 
                      ? 'bg-[#c9a24b] text-black border-[#c9a24b] font-bold' 
                      : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
              <button
                onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
                className={`text-[10px] uppercase tracking-wider px-3 py-1.5 rounded border transition-all flex items-center gap-1.5 ${
                  showBookmarksOnly
                    ? 'bg-[#c9a24b] text-black border-[#c9a24b] font-bold'
                    : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {showBookmarksOnly ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                SAVED
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-white/50 font-mono uppercase tracking-widest px-1">
          <span>Showing resources for: <strong className="text-white font-normal">{selectedState}</strong></span>
          <span>{filteredResources.length} Found</span>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {filteredResources.map((res) => (
            <motion.div
              key={res.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-neutral-900/60 border border-white/10 p-6 rounded-xl hover:border-[#c9a24b]/40 transition-all flex flex-col justify-between space-y-4 relative group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-[#c9a24b] font-mono border border-[#c9a24b]/30 px-2.5 py-1 rounded">
                    {getCategoryIcon(res.category)}
                    <span>{res.category}</span>
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] uppercase tracking-widest text-white/40 font-mono">
                      {res.stateOrUT}
                    </span>
                    <button
                      onClick={() => toggleBookmark(res.id)}
                      className="text-white/40 hover:text-white transition-colors"
                      title={bookmarkedIds.includes(res.id) ? "Remove bookmark" : "Save resource"}
                    >
                      {bookmarkedIds.includes(res.id) ? (
                        <BookmarkCheck className="w-4 h-4 text-[#c9a24b]" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-serif text-white leading-tight">
                  {res.name}
                </h3>

                <p className="text-xs text-white/70 leading-relaxed">
                  {res.description}
                </p>

                {/* Details */}
                <div className="space-y-2 pt-2 border-t border-white/5 text-xs text-white/80">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#c9a24b] shrink-0 mt-0.5" />
                    <span>{res.address}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{res.operatingHours}</span>
                  </div>

                  {res.email && (
                    <div className="flex items-center gap-2 text-white/60">
                      <Mail className="w-4 h-4 shrink-0" />
                      <span>{res.email}</span>
                    </div>
                  )}
                </div>

                {/* Key Services Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {res.keyServices.map((service, idx) => (
                    <span key={idx} className="text-[9px] uppercase tracking-wider bg-white/5 text-white/60 border border-white/5 px-2 py-0.5 rounded">
                      • {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Call Action */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <a
                  href={`tel:${res.phone.split('/')[0].trim()}`}
                  className="flex-1 py-2.5 px-4 bg-[#c9a24b] hover:bg-[#d8b35c] text-black font-mono text-xs uppercase tracking-widest font-bold rounded flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {res.phone}</span>
                </a>

                <button
                  onClick={() => handleCopyPhone(res.id, res.phone)}
                  className="p-2.5 border border-white/20 hover:border-white/40 text-white/70 hover:text-white rounded transition-colors"
                  title="Copy Phone Number"
                >
                  {copiedId === res.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="p-12 text-center border border-white/10 rounded-xl bg-white/5 text-white/50 space-y-2">
            <p className="text-sm">No specific entries found for this state filter yet.</p>
            <p className="text-xs text-[#c9a24b]">
              Note: You can dial <strong>112</strong> (National Emergency) or <strong>15100</strong> (DLSA Free Legal Aid) from anywhere in India.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
