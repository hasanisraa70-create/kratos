import React, { useState } from 'react';
import { ArrowRight, Sparkles, Box, ShieldCheck, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const OnboardingScreen: React.FC = () => {
  const { setCurrentScreen, theme } = useApp();
  const isLight = theme === 'light';
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      step: '01',
      badge: 'BIOMECHANICAL POWER',
      headline: 'Next-Gen Carbon Insoles.',
      description: 'Discover performance-engineered insoles built for every stride with genuine aerospace carbon fiber.',
      image: '/kratos-insole-red-top.jpg',
      stat: '33%',
      statLabel: 'ENERGY RETURN',
    },
    {
      step: '02',
      badge: 'IMMERSIVE PRECISION',
      headline: 'Experience Every Detail.',
      description: 'Explore your insoles in immersive 360-degree 3D with interactive camera inspection and exploded engineering layers.',
      image: '/kratos-insole-carbon-bottom.jpg',
      stat: '360°',
      statLabel: 'VIRTUAL INSPECTION',
    },
    {
      step: '03',
      badge: 'CUSTOM ARCH FIT',
      headline: 'Make It Yours.',
      description: 'Customize your perfect fit, choose your style, add custom laser engravings, and shop with confidence.',
      image: '/kratos-insole-exploded.jpg',
      stat: '100%',
      statLabel: 'CUSTOM TUNED',
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      setCurrentScreen('home');
    }
  };

  const active = slides[currentSlide];

  return (
    <div
      className={`relative flex-1 flex flex-col justify-between p-6 overflow-hidden transition-colors ${
        isLight ? 'bg-[#F9FAFB] text-gray-900' : 'bg-[#101010] text-white'
      }`}
    >
      {/* Top Bar: Slide Indicator & Skip */}
      <div className="flex items-center justify-between pt-2">
        <span className={`text-[11px] font-mono font-semibold ${isLight ? 'text-gray-500' : 'text-zinc-500'}`}>
          STEP {active.step} / 03
        </span>
        <button
          onClick={() => setCurrentScreen('home')}
          className={`text-xs font-mono transition-colors ${
            isLight ? 'text-gray-500 hover:text-black font-semibold' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Skip
        </button>
      </div>

      {/* Middle Carousel Content */}
      <div className="my-auto space-y-6">
        {/* Visual Showcase Card */}
        <div
          className={`relative w-full aspect-[4/3] rounded-3xl overflow-hidden border shadow-2xl group ${
            isLight ? 'border-gray-200 bg-gray-100' : 'border-white/10 bg-[#16171a]'
          }`}
        >
          <img
            src={active.image}
            alt={active.headline}
            className="w-full h-full object-cover object-center filter brightness-90 contrast-105 group-hover:scale-105 transition-transform duration-700"
          />

          <div
            className={`absolute inset-0 bg-gradient-to-t ${
              isLight ? 'from-black/60 via-transparent to-transparent' : 'from-[#101010] via-transparent to-black/30'
            }`}
          />

          {/* Floating Metric Badge */}
          <div className="absolute bottom-4 left-4 p-3 rounded-2xl bg-black/80 backdrop-blur-md border border-[#C6A66B]/40 flex items-center gap-3">
            <span className="text-2xl font-black font-mono text-[#C6A66B]">
              {active.stat}
            </span>
            <div className="text-[10px] uppercase font-bold text-zinc-200 leading-tight">
              {active.statLabel}
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <span className="inline-block px-3 py-1 rounded-full bg-[#C6A66B]/15 border border-[#C6A66B]/40 text-[#A38448] text-[10px] font-mono font-bold uppercase tracking-widest">
            {active.badge}
          </span>
          <h1 className={`text-2xl font-black uppercase tracking-tight leading-tight ${isLight ? 'text-gray-900' : 'text-white'}`}>
            {active.headline}
          </h1>
          <p className={`text-xs leading-relaxed ${isLight ? 'text-gray-600' : 'text-zinc-400'}`}>
            {active.description}
          </p>
        </div>
      </div>

      {/* Bottom Controls: Pagination Dots & Action Buttons */}
      <div className="space-y-5 pb-4">
        {/* Dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentSlide === idx
                  ? 'w-8 bg-[#C6A66B]'
                  : isLight
                  ? 'w-2 bg-gray-300 hover:bg-gray-400'
                  : 'w-2 bg-zinc-700 hover:bg-zinc-500'
              }`}
            />
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={handleNext}
          className="w-full py-4 px-6 rounded-2xl bg-[#C6A66B] hover:bg-[#D4B579] text-black font-extrabold text-xs uppercase tracking-[0.2em] transition-all duration-200 active:scale-98 shadow-lg flex items-center justify-center gap-2"
        >
          <span>{currentSlide === slides.length - 1 ? 'GET STARTED' : 'CONTINUE'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
