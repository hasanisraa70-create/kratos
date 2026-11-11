import React, { useEffect, useState } from 'react';
import { ArrowRight, Zap, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from '../components/common/BrandLogo';

export const SplashScreen: React.FC = () => {
  const { setCurrentScreen } = useApp();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 15;
      });
    }, 120);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex-1 bg-black flex flex-col justify-between items-center p-8 text-center overflow-hidden selection:bg-transparent">
      {/* Carbon Twill Weave Background Watermark */}
      <div className="absolute inset-0 carbon-pattern opacity-40 pointer-events-none" />

      {/* Atmospheric Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#C6A66B]/15 blur-3xl pointer-events-none" />

      {/* Top Engineering Code */}
      <div className="relative z-10 w-full flex justify-between items-center text-[10px] font-mono text-zinc-500 pt-4">
        <span>KRT-SYSTEMS // 2026</span>
        <span className="flex items-center gap-1 text-[#C6A66B]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C6A66B] animate-ping" />
          AEROSPACE GRADE
        </span>
      </div>

      {/* Center Hero: Kratos Logo & Tagline */}
      <div className="relative z-10 flex flex-col items-center max-w-xs space-y-6">
        <div className="p-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
          <BrandLogo variant="gold" size="xl" showSubtitle={true} />
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-black uppercase tracking-[0.2em] text-white">
            BUILT FOR ATHLETES WHO DON&apos;T COMPROMISE.
          </h2>
          <p className="text-xs text-zinc-400 font-sans leading-relaxed">
            Engineered with multi-ply 3K prepreg carbon fiber for explosive rebound and biomechanical arch stability.
          </p>
        </div>

        {/* Minimal High-Tech Loading Progress Bar */}
        <div className="w-48 space-y-1.5">
          <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#C6A66B] to-[#F1E4C3] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[9px] font-mono text-zinc-500">
            <span>CALIBRATING 3K MATRIX</span>
            <span className="text-[#C6A66B]">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Bottom Action: Get Started / Enter App */}
      <div className="relative z-10 w-full space-y-3 pb-6">
        <button
          onClick={() => setCurrentScreen('onboarding')}
          className="w-full py-4 px-6 rounded-2xl bg-[#C6A66B] hover:bg-[#D4B579] text-black font-extrabold text-xs uppercase tracking-[0.2em] transition-all duration-200 active:scale-95 shadow-[0_10px_25px_rgba(198,166,107,0.3)] flex items-center justify-center gap-2 group"
        >
          <span>ENTER THE SYSTEM</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>

        <button
          onClick={() => setCurrentScreen('home')}
          className="w-full text-center text-xs font-mono text-zinc-500 hover:text-white transition-colors"
        >
          Skip to Store
        </button>
      </div>
    </div>
  );
};
