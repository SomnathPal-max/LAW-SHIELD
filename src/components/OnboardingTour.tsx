import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, MessageSquare, BookOpen, CheckCircle, MapPin, FileText, AlertTriangle, ArrowRight, X } from 'lucide-react';

const TOUR_STEPS = [
  {
    title: 'Welcome to LawShield',
    description: 'A secure, discreet platform designed to empower you with legal knowledge, resources, and immediate assistance.',
    icon: <Shield className="w-12 h-12 text-[#c9a24b]" />,
  },
  {
    title: 'AI Legal Assistant',
    description: 'Get immediate, confidential guidance on your situation. Describe your scenario and receive actionable legal insights.',
    icon: <MessageSquare className="w-12 h-12 text-[#c9a24b]" />,
  },
  {
    title: 'Laws & Glossary',
    description: 'Explore a curated library of women\'s safety laws and legal terms explained in plain, easy-to-understand language.',
    icon: <BookOpen className="w-12 h-12 text-[#c9a24b]" />,
  },
  {
    title: 'Legal Knowledge Quiz',
    description: 'Test your understanding of important rights and legal scenarios in a safe, educational format.',
    icon: <CheckCircle className="w-12 h-12 text-[#c9a24b]" />,
  },
  {
    title: 'Nearby Support',
    description: 'Locate trusted NGOs, free legal aid centers, and specialized police stations in your specific region.',
    icon: <MapPin className="w-12 h-12 text-[#c9a24b]" />,
  },
  {
    title: 'Document Generator',
    description: 'Draft formal legal complaints and letters securely. Your data stays on your device.',
    icon: <FileText className="w-12 h-12 text-[#c9a24b]" />,
  },
  {
    title: 'Emergency & Quick Exit',
    description: 'Access critical helplines even offline. Use the Quick Exit button to immediately close the app and clear data if you feel unsafe.',
    icon: <AlertTriangle className="w-12 h-12 text-red-500" />,
  }
];

interface OnboardingTourProps {
  onComplete: () => void;
}

export function OnboardingTour({ onComplete }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0A0A0A]/95 backdrop-blur-md" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-xl bg-[#111] border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden"
      >
        <button 
          onClick={handleSkip}
          className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex justify-center mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 20 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-white/5 rounded-full border border-white/10"
            >
              {TOUR_STEPS[currentStep].icon}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="text-center space-y-4 mb-12 min-h-[120px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl md:text-3xl font-serif text-white mb-4">
                {TOUR_STEPS[currentStep].title}
              </h2>
              <p className="text-white/60 leading-relaxed max-w-md mx-auto">
                {TOUR_STEPS[currentStep].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10">
          <div className="flex gap-2">
            {TOUR_STEPS.map((_, idx) => (
              <div 
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentStep ? 'bg-[#c9a24b] w-4' : 'bg-white/20'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button 
              onClick={handleSkip}
              className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors px-4 py-2 flex-1 sm:flex-none text-center"
            >
              Skip Tour
            </button>
            <button 
              onClick={handleNext}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white text-black hover:bg-white/90 px-6 py-3 rounded text-xs uppercase tracking-widest font-bold transition-all"
            >
              {currentStep === TOUR_STEPS.length - 1 ? 'Get Started' : 'Next'}
              {currentStep < TOUR_STEPS.length - 1 && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
