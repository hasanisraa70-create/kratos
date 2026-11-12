import React from 'react';
import { Home, Compass, Sliders, Package } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ScreenId } from '../../types';

export const BottomNav: React.FC = () => {
  const { currentScreen, setCurrentScreen, theme } = useApp();

  const isLight = theme === 'light';

  // If on checkout, splash, onboarding, admin, or 3d viewer, bottom nav is hidden
  if (['splash', 'onboarding', 'viewer-3d', 'checkout', 'admin'].includes(currentScreen)) {
    return null;
  }

  const navItems: { id: ScreenId; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'shop', label: 'Shop', icon: Compass },
    { id: 'customize', label: 'Customize', icon: Sliders },
    { id: 'order-tracking', label: 'Orders', icon: Package },
  ];

  return (
    <nav
      className={`fixed bottom-0 inset-x-0 max-w-lg mx-auto z-50 h-[58px] border-t px-3 py-1 flex items-center justify-around transition-all shadow-2xl backdrop-blur-lg ${
        isLight
          ? 'bg-white/98 border-gray-200 text-gray-500'
          : 'bg-[#101010]/98 border-white/10 text-zinc-400'
      }`}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          currentScreen === item.id ||
          (item.id === 'shop' && currentScreen === 'product-details') ||
          (item.id === 'order-tracking' && currentScreen === 'cart');

        const isCustomize = item.id === 'customize';

        return (
          <button
            key={item.id}
            onClick={() => setCurrentScreen(item.id)}
            className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 group ${
              isActive
                ? isLight
                  ? 'text-[#9C7E44]'
                  : 'text-[#C6A66B]'
                : isLight
                ? 'text-gray-500 hover:text-black'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {/* Customize Item Subtle Accent Aura */}
            {isCustomize && (
              <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-[#C6A66B] animate-pulse" />
            )}

            <div
              className={`p-1 rounded-lg transition-transform duration-150 ${
                isActive ? 'scale-110' : 'group-hover:scale-105'
              }`}
            >
              <Icon className="w-5 h-5 stroke-[1.75]" />
            </div>

            <span
              className={`text-[10px] tracking-wider uppercase font-semibold transition-all ${
                isActive
                  ? isLight
                    ? 'font-bold text-[#9C7E44]'
                    : 'font-bold text-[#C6A66B]'
                  : isLight
                  ? 'text-gray-500 group-hover:text-black'
                  : 'text-zinc-400 group-hover:text-zinc-200'
              }`}
            >
              {item.label}
            </span>

            {/* Active Pill Indicator */}
            {isActive && (
              <span className="absolute -bottom-1 w-4 h-0.5 rounded-full bg-[#C6A66B]" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
