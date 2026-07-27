import React from 'react';
import { ViewState } from '../types';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { HeroBrandMark } from './HeroBrandMark';

interface HomeProps {
  setView: (view: ViewState) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export function Home({ setView }: HomeProps) {
  return (
    <motion.div 
      className="max-w-6xl mx-auto flex flex-col h-full p-4 md:p-8 space-y-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated Law Firm Brand Mark Hero Section */}
      <motion.div variants={itemVariants} className="w-full">
        <HeroBrandMark 
          firmName="LAWSHIELD & ASSOCIATES"
          tagline="PRESTIGE • ADVOCACY • JUSTICE • PROTECTION"
          autoLoop={true}
          loopIntervalMs={9000}
        />
      </motion.div>

      {/* Primary Headline & Description */}
      <div className="relative mb-12 flex flex-col">
        <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl leading-[0.95] font-serif italic font-normal tracking-tight md:ml-4">
          Understand your <br className="hidden md:block"/> rights.
        </motion.h2>
        <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl leading-[0.95] font-serif italic font-normal tracking-tight md:ml-12 lg:ml-24 mt-2 md:mt-0 text-white/60">
          Protect your future.
        </motion.h2>
        
        <div className="mt-8 flex flex-col md:flex-row gap-8 md:items-end md:ml-4">
          <motion.div variants={itemVariants} className="md:w-3/4 lg:w-1/2">
            <p className="text-sm leading-relaxed opacity-80 mb-6 max-w-md">
              LawShield translates complex legal jargon into simple language. Get instant access to women's safety laws, AI-powered legal guidance, and emergency resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setView('assistant')}
                className="px-6 py-3.5 border border-[#c9a24b] text-[10px] uppercase tracking-[0.2em] bg-[#13223f]/80 text-[#f3d68a] hover:bg-[#c9a24b] hover:text-black transition-all flex items-center justify-center gap-3 font-semibold shadow-md"
              >
                Ask AI Assistant <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setView('emergency')}
                className="px-6 py-3.5 bg-red-600/90 text-white border border-red-500 text-[10px] uppercase tracking-[0.2em] hover:bg-red-700 transition-colors font-bold shadow-md"
              >
                Emergency Help
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <motion.div variants={itemVariants} className="mt-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-[#c9a24b]/20 pb-8">
        <div 
          onClick={() => setView('assistant')}
          className="group cursor-pointer flex flex-col h-full p-5 rounded-xl bg-[#0c1729]/60 border border-[#c9a24b]/10 hover:border-[#c9a24b]/40 transition-all"
        >
          <h3 className="text-base font-cinzel text-gold-gradient font-bold mb-2">01. AI Legal Assistant</h3>
          <p className="text-xs opacity-70 leading-relaxed mb-4 flex-1">
            Get instant, accurate responses based on BNS 2023, POSH Act, and women safety laws.
          </p>
          <div className="h-px w-full bg-[#c9a24b]/20 group-hover:bg-[#f3d68a]/60 transition-colors"></div>
        </div>

        <div 
          onClick={() => setView('library')}
          className="group cursor-pointer flex flex-col h-full p-5 rounded-xl bg-[#0c1729]/60 border border-[#c9a24b]/10 hover:border-[#c9a24b]/40 transition-all"
        >
          <h3 className="text-base font-cinzel text-gold-gradient font-bold mb-2">02. Laws & Glossary</h3>
          <p className="text-xs opacity-70 leading-relaxed mb-4 flex-1">
            Browse simplified statutes and a comprehensive legal dictionary explaining complex terms.
          </p>
          <div className="h-px w-full bg-[#c9a24b]/20 group-hover:bg-[#f3d68a]/60 transition-colors"></div>
        </div>

        <div 
          onClick={() => setView('quiz')}
          className="group cursor-pointer flex flex-col h-full p-5 rounded-xl bg-[#0c1729]/60 border border-[#c9a24b]/10 hover:border-[#c9a24b]/40 transition-all"
        >
          <h3 className="text-base font-cinzel text-gold-gradient font-bold mb-2">03. Legal Awareness Quiz</h3>
          <p className="text-xs opacity-70 leading-relaxed mb-4 flex-1">
            Test your knowledge of FIR rights, POSH rules, and domestic violence protections with instant explanations.
          </p>
          <div className="h-px w-full bg-[#c9a24b]/20 group-hover:bg-[#f3d68a]/60 transition-colors"></div>
        </div>

        <div 
          onClick={() => setView('resources')}
          className="group cursor-pointer flex flex-col h-full p-5 rounded-xl bg-[#0c1729]/60 border border-[#c9a24b]/10 hover:border-[#c9a24b]/40 transition-all"
        >
          <h3 className="text-base font-cinzel text-gold-gradient font-bold mb-2">04. Regional Support</h3>
          <p className="text-xs opacity-70 leading-relaxed mb-4 flex-1">
            Find police helpdesks, Sakhi One Stop Centers, and free legal aid (DLSA) in your state/UT.
          </p>
          <div className="h-px w-full bg-[#c9a24b]/20 group-hover:bg-[#f3d68a]/60 transition-colors"></div>
        </div>
      </motion.div>
    </motion.div>
  );
}

