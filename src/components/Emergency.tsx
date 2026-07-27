import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LogOut, Phone, MapPin, Bookmark, WifiOff, Wifi } from 'lucide-react';
import { REGIONAL_SUPPORT_RESOURCES, SupportResource } from '../data/regionalResourcesData';

export function Emergency() {
  const [bookmarkedResources, setBookmarkedResources] = useState<SupportResource[]>([]);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('lawshield_resource_bookmarks');
      if (saved) {
        const ids: string[] = JSON.parse(saved);
        const savedResources = REGIONAL_SUPPORT_RESOURCES.filter(res => ids.includes(res.id));
        setBookmarkedResources(savedResources);
      }
    } catch (e) {
      console.error('Failed to parse saved resources', e);
    }
  }, []);

  const helplines = [
    { number: '112', name: 'National Emergency Number', desc: 'Single emergency number for Police, Fire, and Medical emergencies.' },
    { number: '1091', name: 'Women Helpline', desc: 'Dedicated 24/7 toll-free helpline for women in distress.' },
    { number: '181', name: 'Domestic Abuse Helpline', desc: 'Support and rescue for women facing domestic violence.' },
    { number: '1090', name: 'Women Power Line', desc: 'Special helpline to report harassment (especially cyber and phone harassment).' }
  ];

  const handleQuickExit = () => {
    // Quickly replace current history entry so back button doesn't come back
    window.location.replace('https://www.google.com');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12 p-4 md:p-8">
      <div className="flex justify-between items-center mb-4">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] uppercase tracking-widest font-bold ${
          isOffline 
            ? 'bg-amber-950/30 border-amber-500/50 text-amber-500' 
            : 'bg-emerald-950/30 border-emerald-500/50 text-emerald-500'
        }`}>
          {isOffline ? <WifiOff className="w-3 h-3" /> : <Wifi className="w-3 h-3" />}
          {isOffline ? 'Offline Mode Active' : 'Online Mode'}
        </div>
        <button 
          onClick={handleQuickExit}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 transition-colors uppercase tracking-[0.2em] text-[10px] font-bold rounded"
        >
          <LogOut className="w-4 h-4" />
          Quick Exit
        </button>
      </div>
      
      <div className="border border-white/20 p-8 bg-white/5 relative overflow-hidden rounded-xl">
        <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
        <div className="flex flex-col gap-4">
          <span className="text-[10px] uppercase tracking-widest text-red-400 font-bold">Critical Notice</span>
          <h2 className="text-3xl font-serif italic text-white tracking-tight">Are you in immediate danger?</h2>
          <p className="text-sm text-white/80 max-w-lg leading-relaxed">
            Do not wait. Call emergency services immediately. Leave this page if you feel unsafe.
          </p>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-serif italic text-white">National Helplines</h3>
          <span className="text-[10px] uppercase tracking-widest text-white/40 border border-white/10 px-2 py-1 rounded">Available Offline</span>
        </div>
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="grid md:grid-cols-2 gap-6"
        >
          {helplines.map((line, idx) => (
            <motion.a 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
              }}
              key={line.number}
              href={`tel:${line.number}`}
              className="group p-6 border border-red-500/20 hover:border-red-500/50 bg-red-950/10 hover:bg-red-950/20 rounded-xl transition-all flex flex-col"
            >
              <div className="flex items-baseline justify-between mb-6 border-b border-white/5 pb-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-red-400/60 font-mono">Line 0{idx + 1}</span>
                <h3 className="text-3xl font-serif text-white group-hover:text-red-400 transition-colors">{line.number}</h3>
              </div>
              <p className="text-xs uppercase tracking-widest font-bold mb-2 text-white/90">{line.name}</p>
              <p className="text-xs text-white/50 leading-relaxed mt-auto">{line.desc}</p>
            </motion.a>
          ))}
        </motion.div>
      </div>

      {bookmarkedResources.length > 0 && (
        <div className="mt-12 pt-12 border-t border-white/10 space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <Bookmark className="w-5 h-5 text-[#c9a24b]" />
            <h3 className="text-xl font-serif italic text-white">Saved Support Centers</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {bookmarkedResources.map(res => (
              <div key={res.id} className="p-5 border border-[#c9a24b]/20 bg-[#c9a24b]/5 rounded-xl space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#c9a24b] font-mono mb-1">{res.category}</p>
                    <h4 className="text-sm font-bold text-white leading-tight">{res.name}</h4>
                  </div>
                </div>
                <div className="space-y-2 text-xs text-white/70">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#c9a24b]/70 shrink-0 mt-0.5" />
                    <span>{res.address}</span>
                  </div>
                </div>
                <div className="pt-2">
                  <a
                    href={`tel:${res.phone.split('/')[0].trim()}`}
                    className="w-full py-2 px-4 bg-[#c9a24b]/10 hover:bg-[#c9a24b]/20 border border-[#c9a24b]/30 text-[#c9a24b] font-mono text-[10px] uppercase tracking-widest font-bold rounded flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call {res.phone.split('/')[0].trim()}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-12 pt-12 border-t border-white/10 space-y-6">
        <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-mono">Official Resources</span>
        <div className="grid sm:grid-cols-2 gap-4">
          <a 
            href="http://ncw.nic.in/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-between p-5 border border-white/10 hover:border-white/30 rounded-xl hover:bg-white/5 transition-all group"
          >
            <span className="text-xs uppercase tracking-widest font-medium">National Commission for Women</span>
            <span className="text-[10px] opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">↗</span>
          </a>
          <a 
            href="https://nalsa.gov.in/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-between p-5 border border-white/10 hover:border-white/30 rounded-xl hover:bg-white/5 transition-all group"
          >
            <span className="text-xs uppercase tracking-widest font-medium">NALSA - Free Legal</span>
            <span className="text-[10px] opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
