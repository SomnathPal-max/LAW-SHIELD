import React from 'react';
import { ViewState } from '../types';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

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
      className="max-w-6xl mx-auto flex flex-col h-full p-4 md:p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <div className="relative mb-16 md:mb-24 mt-8 md:mt-16 flex flex-col">
        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-[100px] leading-[0.9] font-serif italic font-normal tracking-tight md:ml-8">
          Understand your <br className="hidden md:block"/> rights.
        </motion.h1>
        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-[100px] leading-[0.9] font-serif italic font-normal tracking-tight md:ml-16 lg:ml-32 mt-2 md:mt-0 text-white/60">
          Protect your future.
        </motion.h1>
        
        <div className="mt-12 md:mt-20 flex flex-col md:flex-row gap-10 md:items-end md:ml-8">
          <motion.div variants={itemVariants} className="md:w-1/2">
            <p className="text-sm leading-relaxed opacity-80 mb-8 max-w-md">
              LawShield translates complex legal jargon into simple language. Get instant access to women's safety laws, AI-powered legal guidance, and emergency resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setView('assistant')}
                className="px-6 py-4 border border-white text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-3"
              >
                Ask AI Assistant <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setView('emergency')}
                className="px-6 py-4 bg-white text-black border border-white text-[10px] uppercase tracking-[0.2em] hover:bg-transparent hover:text-white transition-colors"
              >
                Emergency Help
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <motion.div variants={itemVariants} className="mt-auto grid md:grid-cols-3 gap-8 pt-12 border-t border-white/20 pb-8">
        <div 
          onClick={() => setView('assistant')}
          className="group cursor-pointer flex flex-col h-full"
        >
          <h3 className="text-lg font-serif italic mb-4">01. AI Legal Assistant</h3>
          <p className="text-xs opacity-60 leading-relaxed mb-6 flex-1">
            Chat with our AI to get immediate, easy-to-understand explanations of your legal rights and possible next steps.
          </p>
          <div className="h-px w-full bg-white/10 group-hover:bg-white/40 transition-colors"></div>
        </div>

        <div 
          onClick={() => setView('library')}
          className="group cursor-pointer flex flex-col h-full"
        >
          <h3 className="text-lg font-serif italic mb-4">02. Smart Law Search</h3>
          <p className="text-xs opacity-60 leading-relaxed mb-6 flex-1">
            Browse our comprehensive library of women's safety laws, translated from complex jargon into plain English.
          </p>
          <div className="h-px w-full bg-white/10 group-hover:bg-white/40 transition-colors"></div>
        </div>

        <div 
          onClick={() => setView('generator')}
          className="group cursor-pointer flex flex-col h-full"
        >
          <h3 className="text-lg font-serif italic mb-4">03. Document Generator</h3>
          <p className="text-xs opacity-60 leading-relaxed mb-6 flex-1">
            Quickly generate formal draft complaints or grievance letters to submit to authorities or employers.
          </p>
          <div className="h-px w-full bg-white/10 group-hover:bg-white/40 transition-colors"></div>
        </div>
      </motion.div>
    </motion.div>
  );
}
