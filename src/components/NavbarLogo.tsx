import React from 'react';

interface NavbarLogoProps {
  firmName?: string;
  tagline?: string;
  size?: number; // size in px, default 38
  className?: string;
  showTagline?: boolean;
}

export function NavbarLogo({
  firmName = "LawShield",
  tagline = "DEFENDING EVERY RIGHT",
  size = 38,
  className = "",
  showTagline = false
}: NavbarLogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Icon Container with Rotating Dashed Ring and Pulsing Glow */}
      <div 
        className="relative flex items-center justify-center flex-shrink-0 ls-nav-glow"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <svg 
          viewBox="0 0 38 38" 
          className="w-full h-full overflow-visible"
        >
          <defs>
            <linearGradient id="lsNavGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7d5f28"/>
              <stop offset="50%" stopColor="#f3d68a"/>
              <stop offset="100%" stopColor="#7d5f28"/>
            </linearGradient>
          </defs>

          {/* Rotating Dashed Ring */}
          <circle className="ls-nav-ring" cx="19" cy="19" r="17.5" />

          {/* Shield Outline & Fill */}
          <path 
            d="M19 5 L30 9 V19 C30 26 25 31 19 34 C13 31 8 26 8 19 V9 Z"
            fill="#101d38" 
            stroke="url(#lsNavGold)" 
            strokeWidth="1.6"
          />

          {/* Sword / Scales Emblem */}
          <line x1="19" y1="13" x2="19" y2="26" stroke="#f6f1e8" strokeWidth="1.3" strokeLinecap="round" />
          <line x1="14" y1="16" x2="24" y2="16" stroke="#f6f1e8" strokeWidth="1.3" strokeLinecap="round" />
          {/* Scale Pans */}
          <path d="M14 16 L11.5 21 A3 3 0 0 0 16.5 21 Z" fill="none" stroke="#f6f1e8" strokeWidth="1.1" />
          <path d="M24 16 L21.5 21 A3 3 0 0 0 26.5 21 Z" fill="none" stroke="#f6f1e8" strokeWidth="1.1" />
        </svg>
      </div>

      {/* Firm Name & Optional Tagline */}
      <div className="flex flex-col">
        <span className="font-cinzel font-bold text-lg md:text-xl tracking-[0.14em] text-[#f3d68a] leading-none drop-shadow-[0_0_10px_rgba(243,214,138,0.25)]">
          {firmName}
        </span>
        {showTagline && (
          <span className="font-cormorant italic text-[10px] tracking-[0.28em] text-white/70 uppercase font-medium mt-1">
            {tagline}
          </span>
        )}
      </div>
    </div>
  );
}
