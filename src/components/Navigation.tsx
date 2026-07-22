import React from 'react';
import { ViewState } from '../types';
import { Shield, BookOpen, MessageSquare, FileText, Phone, Menu, X, Sun, Moon } from 'lucide-react';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  isLightMode?: boolean;
  toggleTheme?: () => void;
}

export function Navigation({ currentView, setView, isLightMode = false, toggleTheme }: NavigationProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems: { id: ViewState; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Shield className="w-4 h-4" /> },
    { id: 'assistant', label: 'AI Assistant', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'library', label: 'Laws Library', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'generator', label: 'Doc Generator', icon: <FileText className="w-4 h-4" /> },
    { id: 'emergency', label: 'Emergency Help', icon: <Phone className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-6 bg-[#0A0A0A] border-b border-white/20 sticky top-0 z-30">
        <div className="text-xl font-bold tracking-tighter uppercase text-[#F5F5F5]">
          LawShield
        </div>
        <div className="flex items-center gap-4">
          {toggleTheme && (
            <button onClick={toggleTheme} className="text-white/60 hover:text-white transition-colors">
              {isLightMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          )}
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-white/60">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Sidebar / Drawer */}
      <div className={`
        fixed inset-y-0 left-0 z-20 w-64 pt-24 md:pt-0 bg-[#0A0A0A] border-r border-white/10 transform transition-transform duration-200 ease-in-out
        md:translate-x-0 md:static md:flex-shrink-0 flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="hidden md:flex p-8 border-b border-white/10 mb-8 items-center justify-between">
          <div className="text-2xl font-bold tracking-tighter uppercase text-[#F5F5F5]">
            LawShield.01
          </div>
          {toggleTheme && (
            <button onClick={toggleTheme} className="text-white/40 hover:text-white transition-colors ml-4 hidden md:block">
              {isLightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          )}
        </div>
        
        <nav className="flex-1 px-8 space-y-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setView(item.id); setIsOpen(false); }}
              className={`w-full flex items-center gap-4 text-left transition-colors text-[11px] uppercase tracking-[0.2em] font-medium
                ${currentView === item.id 
                  ? 'text-white' 
                  : 'text-white/40 hover:text-white'
                }
              `}
            >
              <span className={currentView === item.id ? 'opacity-100' : 'opacity-40'}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>


      </div>
      
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-10 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
