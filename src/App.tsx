import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { MobileFrame } from './components/layout/MobileFrame';
import { BottomNav } from './components/layout/BottomNav';

// The 12 Mobile Screens
import { SplashScreen } from './screens/SplashScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { HomeScreen } from './screens/HomeScreen';
import { ShopScreen } from './screens/ShopScreen';
import { ProductDetailsScreen } from './screens/ProductDetailsScreen';
import { Dedicated3DViewerScreen } from './screens/Dedicated3DViewerScreen';
import { CustomizerScreen } from './screens/CustomizerScreen';
import { CartScreen } from './screens/CartScreen';
import { CheckoutScreen } from './screens/CheckoutScreen';
import { OrderTrackingScreen } from './screens/OrderTrackingScreen';
import { WarrantyScreen } from './screens/WarrantyScreen';

const MainContent: React.FC = () => {
  const { currentScreen, toast } = useApp();

  // Render current mobile screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'onboarding':
        return <OnboardingScreen />;
      case 'home':
        return <HomeScreen />;
      case 'shop':
        return <ShopScreen />;
      case 'product-details':
        return <ProductDetailsScreen />;
      case 'viewer-3d':
        return <Dedicated3DViewerScreen />;
      case 'customize':
        return <CustomizerScreen />;
      case 'cart':
        return <CartScreen />;
      case 'checkout':
        return <CheckoutScreen />;
      case 'order-tracking':
        return <OrderTrackingScreen />;
      case 'warranty':
        return <WarrantyScreen />;
      case 'profile':
      default:
        return <HomeScreen />;
    }
  };

  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col relative w-full h-full min-h-0">
        {/* Render Mobile Screen */}
        <div className="flex-1 flex flex-col relative min-h-0">
          {renderScreen()}
        </div>

        {/* Fixed 5-Item Bottom Navigation */}
        <BottomNav />
      </div>

      {/* Global Toast Alert */}
      {toast.show && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-2xl bg-black/90 backdrop-blur-md border border-[#C6A66B]/50 text-white text-xs font-mono shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <span className="w-2 h-2 rounded-full bg-[#C6A66B] animate-pulse" />
          <span>{toast.message}</span>
        </div>
      )}
    </MobileFrame>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
