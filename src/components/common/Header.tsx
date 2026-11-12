import React from 'react';
import { 
  Search, 
  ShoppingBag, 
  ArrowLeft, 
  Heart, 
  Sun, 
  Moon
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from './BrandLogo';

export const Header: React.FC = () => {
  const {
    currentScreen,
    setCurrentScreen,
    cartCount,
    wishlist,
    setActiveCategory,
    theme,
    toggleTheme,
  } = useApp();

  const isLight = theme === 'light';

  const isSubScreen = [
    'product-details',
    'viewer-3d',
    'checkout',
    'order-tracking',
    'warranty',
    'admin',
  ].includes(currentScreen);

  const handleBack = () => {
    if (currentScreen === 'checkout') {
      setCurrentScreen('cart');
    } else if (currentScreen === 'viewer-3d') {
      setCurrentScreen('product-details');
    } else if (currentScreen === 'admin') {
      setCurrentScreen('home');
    } else {
      setCurrentScreen('home');
    }
  };

  const handleOpenSearch = () => {
    setActiveCategory('all');
    setCurrentScreen('shop');
  };

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-md px-3.5 py-2.5 flex items-center justify-between transition-colors border-b ${
        isLight
          ? 'bg-white/95 border-gray-200 text-gray-900 shadow-xs'
          : 'bg-[#101010]/95 border-white/10 text-white'
      }`}
    >
      {/* Left: Back button or Brand Logo */}
      <div className="flex items-center gap-2">
        {isSubScreen ? (
          <button
            onClick={handleBack}
            className={`p-1.5 -ml-1 rounded-full transition-colors active:scale-95 ${
              isLight
                ? 'text-gray-700 hover:text-black hover:bg-gray-100'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
            aria-label="Go Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        ) : null}

        <button
          onClick={() => setCurrentScreen('home')}
          className="text-left focus:outline-none"
        >
          <BrandLogo
            variant={isLight ? 'dark' : 'light'}
            size="sm"
            showSubtitle={!isSubScreen}
          />
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1.5">
        {/* Light / Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className={`p-1.5 rounded-full transition-all active:scale-95 ${
            isLight
              ? 'text-gray-700 hover:text-black hover:bg-gray-100'
              : 'text-zinc-300 hover:text-white hover:bg-white/10'
          }`}
          title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          aria-label="Toggle Theme"
        >
          {isLight ? (
            <Moon className="w-4 h-4 text-zinc-700 hover:text-black" />
          ) : (
            <Sun className="w-4 h-4 text-amber-300" />
          )}
        </button>

        {/* Search Icon */}
        <button
          onClick={handleOpenSearch}
          className={`p-1.5 rounded-full transition-colors ${
            isLight
              ? 'text-gray-700 hover:text-black hover:bg-gray-100'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
          aria-label="Search Catalog"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Shopping Bag with dynamic item count badge */}
        <button
          onClick={() => setCurrentScreen('cart')}
          className={`relative p-1.5 rounded-full transition-colors ${
            isLight
              ? 'text-gray-900 hover:bg-gray-100'
              : 'text-white/90 hover:text-white hover:bg-white/10'
          }`}
          aria-label="Order Cart"
        >
          <ShoppingBag className="w-4 h-4" />
          {cartCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] px-1 rounded-full bg-[#C6A66B] text-black font-extrabold text-[9px] flex items-center justify-center leading-none shadow-md">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
