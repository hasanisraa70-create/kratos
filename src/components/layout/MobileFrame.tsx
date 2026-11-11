import React from 'react';
import { useApp } from '../../context/AppContext';
import { ScreenId } from '../../types';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  const { currentScreen, setCurrentScreen, theme } = useApp();

  const isLight = theme === 'light';

  const screenOptions: { id: ScreenId; label: string }[] = [
    { id: 'splash', label: '1. Splash Screen' },
    { id: 'onboarding', label: '2. Onboarding' },
    { id: 'home', label: '3. Home' },
    { id: 'shop', label: '4. Shop Catalog' },
    { id: 'product-details', label: '5. Product Details' },
    { id: 'viewer-3d', label: '6. 360° 3D Viewer' },
    { id: 'customize', label: '7. Customizer' },
    { id: 'cart', label: '8. Cart' },
    { id: 'checkout', label: '9. Checkout' },
    { id: 'order-tracking', label: '10. Order Tracking' },
    { id: 'warranty', label: '11. Warranty' },
    { id: 'profile', label: '12. Profile' },
  ];

  return (
    <div
      className={`min-h-screen selection:bg-[#C6A66B] selection:text-black flex flex-col justify-start items-center transition-colors ${
        isLight
          ? 'bg-[#EBF0F5] text-gray-900'
          : 'bg-[#090a0c] text-white'
      }`}
    >
      {/* Minimal Top Preview Bar */}
      <div
        className={`w-full px-4 py-2 flex items-center justify-between text-xs font-mono border-b transition-colors ${
          isLight
            ? 'bg-white border-gray-200 text-gray-800 shadow-xs'
            : 'bg-[#121316] border-white/10 text-white'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C6A66B] animate-pulse" />
          <span
            className={`font-bold uppercase tracking-wider text-[11px] ${
              isLight ? 'text-gray-900' : 'text-zinc-400'
            }`}
          >
            KRATOS PERFORMANCE SYSTEMS
          </span>
          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#C6A66B]/20 text-[#A38448] uppercase">
            {isLight ? 'LIGHT MODE' : 'DARK MODE'}
          </span>
        </div>

        {/* Quick Screen Selector */}
        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] hidden sm:inline ${
              isLight ? 'text-gray-500' : 'text-zinc-500'
            }`}
          >
            SCREEN:
          </span>
          <select
            value={currentScreen}
            onChange={(e) => setCurrentScreen(e.target.value as ScreenId)}
            className={`font-bold rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-[#C6A66B] cursor-pointer border ${
              isLight
                ? 'bg-gray-50 border-gray-300 text-gray-900'
                : 'bg-black/80 border-white/15 text-[#C6A66B]'
            }`}
          >
            {screenOptions.map((opt) => (
              <option
                key={opt.id}
                value={opt.id}
                className={isLight ? 'bg-white text-gray-900' : 'bg-[#141518] text-white'}
              >
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Responsive Mobile Viewport Container */}
      <div
        className={`w-full max-w-lg min-h-screen border-x flex flex-col relative transition-colors ${
          isLight
            ? 'bg-[#F9FAFB] text-gray-900 border-gray-200 shadow-xl'
            : 'bg-[#101010] text-white border-white/5 shadow-[0_0_60px_rgba(0,0,0,0.85)]'
        }`}
      >
        {children}
      </div>
    </div>
  );
};
