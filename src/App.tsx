/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ViewState } from './types';
import { Navigation } from './components/Navigation';
import { Home } from './components/Home';
import { AIAssistant } from './components/AIAssistant';
import { LawsLibrary } from './components/LawsLibrary';
import { DocGenerator } from './components/DocGenerator';
import { Emergency } from './components/Emergency';
import { motion, AnimatePresence } from 'motion/react';

const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isLightMode, setIsLightMode] = useState(false);
  const [isObfuscated, setIsObfuscated] = useState(false);

  useEffect(() => {
    let inactivityTimer: number;

    const resetTimer = () => {
      window.clearTimeout(inactivityTimer);
      inactivityTimer = window.setTimeout(() => {
        // Clear local storage and reset to home on timeout
        localStorage.clear();
        setCurrentView('home');
      }, INACTIVITY_TIMEOUT);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = 'New Tab';
        setIsObfuscated(true);
      } else {
        document.title = 'LawShield';
        setIsObfuscated(false);
        resetTimer();
      }
    };

    // Attach event listeners
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => document.addEventListener(event, resetTimer, true));
    document.addEventListener('visibilitychange', handleVisibilityChange);

    resetTimer();

    return () => {
      events.forEach(event => document.removeEventListener(event, resetTimer, true));
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.clearTimeout(inactivityTimer);
    };
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'home': return <Home setView={setCurrentView} />;
      case 'assistant': return <AIAssistant />;
      case 'library': return <LawsLibrary />;
      case 'generator': return <DocGenerator />;
      case 'emergency': return <Emergency />;
      default: return <Home setView={setCurrentView} />;
    }
  };

  return (
    <div className={`h-[100dvh] bg-[#0A0A0A] text-[#F5F5F5] flex flex-col md:flex-row font-sans selection:bg-white selection:text-black overflow-hidden ${isLightMode ? 'light-theme' : ''}`}>
      {isObfuscated && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-xl flex items-center justify-center">
          <p className="text-white/40 tracking-widest text-sm uppercase">Session Paused</p>
        </div>
      )}
      <Navigation currentView={currentView} setView={setCurrentView} isLightMode={isLightMode} toggleTheme={() => setIsLightMode(!isLightMode)} />
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-full flex flex-col"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

