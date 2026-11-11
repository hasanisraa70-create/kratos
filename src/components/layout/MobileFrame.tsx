import React from 'react';
import { useApp } from '../../context/AppContext';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  const { theme } = useApp();
  const isLight = theme === 'light';

  return (
    <div
      className={`min-h-screen selection:bg-[#C6A66B] selection:text-black flex flex-col justify-start items-center transition-colors ${
        isLight
          ? 'bg-[#EBF0F5] text-gray-900'
          : 'bg-[#090a0c] text-white'
      }`}
    >
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
