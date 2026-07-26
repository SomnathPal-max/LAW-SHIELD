import React, { useState, useEffect, useRef } from 'react';
import { RotateCw, Play, Pause } from 'lucide-react';

interface HeroBrandMarkProps {
  firmName?: string;
  tagline?: string;
  autoLoop?: boolean;
  loopIntervalMs?: number; // default 6000ms
  className?: string;
}

interface Particle {
  id: number;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  size: number;
  duration: number; // seconds
  delay: number; // seconds
  driftX: number; // px
}

export function HeroBrandMark({
  firmName = "LawShield",
  tagline = "Defending Every Right",
  autoLoop = true,
  loopIntervalMs = 6500,
  className = ""
}: HeroBrandMarkProps) {
  const [animKey, setAnimKey] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate floating gold dust particles
  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: 30 + Math.random() * 40,
      y: 60 + Math.random() * 30,
      size: 2 + Math.random() * 3,
      duration: 5 + Math.random() * 4,
      delay: Math.random() * 4,
      driftX: (Math.random() - 0.5) * 35
    }));
    setParticles(newParticles);
  }, [animKey]);

  // Handle auto-looping timer sequence
  useEffect(() => {
    if (!autoLoop || isPaused) return;

    timerRef.current = setTimeout(() => {
      setAnimKey(prev => prev + 1);
    }, loopIntervalMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [animKey, autoLoop, isPaused, loopIntervalMs]);

  const handleReplay = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setAnimKey(prev => prev + 1);
  };

  return (
    <section className={`ls-hero rounded-2xl relative overflow-hidden select-none ${className}`}>
      {/* Background Radial Glow */}
      <div className="ls-glow" />

      {/* Floating Gold Dust Particles */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {particles.map(p => (
          <div
            key={`${animKey}-p-${p.id}`}
            className="ls-dust"
            style={{
              left: `${p.x}%`,
              bottom: `${100 - p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Main Hero Stage - Keyed for Intro Animation Restart */}
      <div key={animKey} className="ls-hero-stage z-20 flex flex-col items-center justify-center max-w-2xl mx-auto w-full">
        
        {/* SVG Crest Assembly */}
        <svg width="260" height="300" viewBox="0 0 260 300" className="ls-crest overflow-visible">
          <defs>
            <linearGradient id="lsGoldGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7d5f28"/>
              <stop offset="45%" stopColor="#f3d68a"/>
              <stop offset="55%" stopColor="#c9a24b"/>
              <stop offset="100%" stopColor="#7d5f28"/>
            </linearGradient>

            <linearGradient id="lsShieldGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e3159"/>
              <stop offset="55%" stopColor="#101d38"/>
              <stop offset="100%" stopColor="#070e1c"/>
            </linearGradient>

            <linearGradient id="lsGlossGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.14)"/>
              <stop offset="35%" stopColor="rgba(255,255,255,0.02)"/>
              <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
            </linearGradient>

            <linearGradient id="lsRingGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(201,162,75,0.1)"/>
              <stop offset="50%" stopColor="rgba(243,214,138,0.75)"/>
              <stop offset="100%" stopColor="rgba(201,162,75,0.1)"/>
            </linearGradient>

            <linearGradient id="lsShimmerGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255,255,255,0)"/>
              <stop offset="50%" stopColor="rgba(255,255,255,0.6)"/>
              <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
            </linearGradient>

            <clipPath id="lsShieldClip">
              <path d="M130 28 L206 56 V122 C206 172 173 210 130 234 C87 210 54 172 54 122 V56 Z"/>
            </clipPath>
          </defs>

          {/* Rotating Concentric Dashed Gold Rings */}
          <circle className="ls-ring-outer" cx="130" cy="128" r="120"/>
          <circle className="ls-ring-inner" cx="130" cy="128" r="107"/>

          {/* Left Laurel Wreath Branch */}
          <g className="ls-laurel" transform="translate(36,150)">
            <path d="M0 0 C-8 -14 -6 -32 4 -46 M-2 -8 C-10 -8 -16 -14 -16 -22 M2 -20 C-6 -20 -12 -26 -12 -34 M4 -34 C-3 -35 -8 -40 -8 -47 M-1 -14 C-9 -13 -14 -8 -14 -1 M3 -27 C-5 -26 -10 -21 -10 -14"/>
          </g>

          {/* Right Laurel Wreath Branch (Mirrored) */}
          <g className="ls-laurel" transform="translate(224,150) scale(-1,1)">
            <path d="M0 0 C-8 -14 -6 -32 4 -46 M-2 -8 C-10 -8 -16 -14 -16 -22 M2 -20 C-6 -20 -12 -26 -12 -34 M4 -34 C-3 -35 -8 -40 -8 -47 M-1 -14 C-9 -13 -14 -8 -14 -1 M3 -27 C-5 -26 -10 -21 -10 -14"/>
          </g>

          {/* Shield Fill, Inner Line, Outline, and Gloss */}
          <path className="ls-shield-fill" d="M130 28 L206 56 V122 C206 172 173 210 130 234 C87 210 54 172 54 122 V56 Z"/>
          <path className="ls-shield-inner-line" d="M130 36 L198 61 V122 C198 167 168 202 130 224 C92 202 62 167 62 122 V61 Z"/>
          <path className="ls-shield-outline" d="M130 28 L206 56 V122 C206 172 173 210 130 234 C87 210 54 172 54 122 V56 Z"/>
          <path className="ls-shield-gloss" d="M130 28 L206 56 V120 C170 106 90 106 54 120 V56 Z"/>

          {/* Emblem: Sword + Scales of Justice + Pedestal Stand */}
          <g>
            <line className="ls-emblem-part" x1="130" y1="86" x2="130" y2="178" style={{ animationDelay: '2.7s' }}/>
            <line className="ls-emblem-part" x1="95" y1="101" x2="165" y2="101" style={{ animationDelay: '2.85s' }}/>
            <path className="ls-emblem-part" d="M95 101 L78 136 A17 17 0 0 0 112 136 Z" style={{ animationDelay: '3.0s' }}/>
            <path className="ls-emblem-part" d="M165 101 L148 136 A17 17 0 0 0 182 136 Z" style={{ animationDelay: '3.1s' }}/>
            <path className="ls-emblem-part" d="M110 178 L150 178 L160 190 L100 190 Z" style={{ animationDelay: '3.25s' }}/>
            <circle className="ls-emblem-dot" cx="130" cy="86" r="4.5"/>
          </g>

          {/* Shimmer Sweep Effect */}
          <g clipPath="url(#lsShieldClip)">
            <rect className="ls-shimmer" x="0" y="20" width="60" height="220" transform="skewX(-20)"/>
          </g>
        </svg>

        {/* Wordmark & Divider */}
        <div className="ls-wordmark">
          <div className="ls-name">{firmName}</div>
          <div className="ls-divider">
            <span className="ls-line"></span>
            <span className="ls-diamond"></span>
            <span className="ls-line"></span>
          </div>
          <div className="ls-tagline">{tagline}</div>
        </div>

        {/* Controls Bar */}
        <div className="mt-8 flex items-center justify-center gap-3 text-xs text-[#f3d68a]/60 z-30">
          <button
            onClick={handleReplay}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a24b]/30 bg-[#101d38]/80 hover:bg-[#1e3159] hover:text-[#f3d68a] hover:border-[#c9a24b] transition-all cursor-pointer backdrop-blur-sm"
            title="Replay Build-Up Animation"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span className="font-cinzel tracking-wider uppercase text-[11px]">Replay Intro</span>
          </button>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a24b]/30 bg-[#101d38]/80 hover:bg-[#1e3159] hover:text-[#f3d68a] hover:border-[#c9a24b] transition-all cursor-pointer backdrop-blur-sm"
            title={isPaused ? "Resume Auto-Looping" : "Pause Auto-Looping"}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            <span className="font-cinzel tracking-wider uppercase text-[11px]">
              {isPaused ? "Paused" : "Looping"}
            </span>
          </button>
        </div>

      </div>
    </section>
  );
}
