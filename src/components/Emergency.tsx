import React from 'react';
import { motion } from 'motion/react';
import { LogOut } from 'lucide-react';

export function Emergency() {
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
      <div className="flex justify-end mb-4">
        <button 
          onClick={handleQuickExit}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 transition-colors uppercase tracking-[0.2em] text-[10px] font-bold"
        >
          <LogOut className="w-4 h-4" />
          Quick Exit
        </button>
      </div>
      
      <div className="border border-white/20 p-8 bg-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-white"></div>
        <div className="flex flex-col gap-4">
          <span className="text-[10px] uppercase tracking-widest opacity-60">Critical Notice</span>
          <h2 className="text-3xl font-serif italic text-white tracking-tight">Are you in immediate danger?</h2>
          <p className="text-sm text-white/80 max-w-lg leading-relaxed">
            Do not wait. Call emergency services immediately. Leave this page if you feel unsafe.
          </p>
        </div>
      </div>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
        className="grid md:grid-cols-2 gap-8 pt-8"
      >
        {helplines.map((line, idx) => (
          <motion.a 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
            }}
            key={line.number}
            href={`tel:${line.number}`}
            className="group p-8 border border-white/10 hover:border-white/40 transition-colors flex flex-col"
          >
            <div className="flex items-baseline justify-between mb-8 border-b border-white/10 pb-4">
              <span className="text-[10px] uppercase tracking-[0.2em] opacity-40">Line 0{idx + 1}</span>
              <h3 className="text-4xl font-serif italic text-white group-hover:text-white/80 transition-colors">{line.number}</h3>
            </div>
            <p className="text-xs uppercase tracking-widest font-medium mb-3">{line.name}</p>
            <p className="text-sm text-white/60 leading-relaxed mt-auto">{line.desc}</p>
          </motion.a>
        ))}
      </motion.div>

      <div className="mt-16 pt-12 border-t border-white/10 space-y-8">
        <span className="text-[10px] uppercase tracking-[0.3em] opacity-40">Official Resources</span>
        <div className="grid sm:grid-cols-2 gap-6">
          <a 
            href="http://ncw.nic.in/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-between p-6 border border-white/10 hover:bg-white hover:text-black transition-colors group"
          >
            <span className="text-xs uppercase tracking-widest">National Commission for Women</span>
            <span className="text-[10px] opacity-40 group-hover:opacity-100">↗</span>
          </a>
          <a 
            href="https://nalsa.gov.in/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-between p-6 border border-white/10 hover:bg-white hover:text-black transition-colors group"
          >
            <span className="text-xs uppercase tracking-widest">NALSA - Free Legal</span>
            <span className="text-[10px] opacity-40 group-hover:opacity-100">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
