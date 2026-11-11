import React, { useState } from 'react';
import { 
  Package, 
  Heart, 
  Sliders, 
  ShieldCheck, 
  MapPin, 
  Bell, 
  HelpCircle, 
  FileText, 
  LogOut, 
  ChevronRight, 
  LayoutDashboard,
  X,
  LucideIcon
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface MenuItem {
  label: string;
  icon: LucideIcon;
  count?: number;
  badge?: string;
  desc?: string;
  action: () => void;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

export const ProfileScreen: React.FC = () => {
  const {
    orders,
    warranties,
    wishlist,
    setCurrentScreen,
    setViewMode,
    showToast,
    theme,
  } = useApp();

  const isLight = theme === 'light';

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const profileName = 'Marcus Vance';
  const athleteDiscipline = 'Marathon & Distance Runner';

  const menuSections: MenuSection[] = [
    {
      title: 'EQUIPMENT & ORDERS',
      items: [
        {
          label: 'My Orders',
          icon: Package,
          count: orders.length,
          action: () => setCurrentScreen('order-tracking'),
        },
        {
          label: 'Wishlist & Saved Items',
          icon: Heart,
          count: wishlist.length,
          action: () => setCurrentScreen('shop'),
        },
        {
          label: 'My Customized Products',
          icon: Sliders,
          badge: 'ACTIVE',
          action: () => setCurrentScreen('customize'),
        },
        {
          label: 'Warranty Registrations',
          icon: ShieldCheck,
          count: warranties.length,
          action: () => setCurrentScreen('warranty'),
        },
      ],
    },
    {
      title: 'PREFERENCES & SUPPORT',
      items: [
        {
          label: 'Saved Addresses',
          icon: MapPin,
          desc: 'Portland, OR (Default)',
          action: () => showToast('Default shipping address active'),
        },
        {
          label: 'Help & Athlete Support',
          icon: HelpCircle,
          action: () => setShowSupportModal(true),
        },
        {
          label: 'Terms & Warranty Policy',
          icon: FileText,
          action: () => setShowTermsModal(true),
        },
      ],
    },
  ];

  return (
    <div
      className={`flex-1 flex flex-col pb-24 transition-colors ${
        isLight ? 'bg-[#F9FAFB] text-gray-900' : 'bg-[#101010] text-white'
      }`}
    >
      {/* HEADER */}
      <div
        className={`sticky top-0 z-40 backdrop-blur-md px-4 py-3 border-b flex items-center justify-between transition-colors ${
          isLight
            ? 'bg-white/95 border-gray-200 text-gray-900 shadow-xs'
            : 'bg-[#101010]/95 border-white/10 text-white'
        }`}
      >
        <span className={`text-xs font-mono font-bold uppercase tracking-wider ${isLight ? 'text-gray-900' : 'text-white'}`}>
          ATHLETE PROFILE
        </span>

        <span className="px-2.5 py-1 rounded-lg bg-[#C6A66B]/20 border border-[#C6A66B]/40 text-[#A38448] text-[10px] font-mono font-bold uppercase flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>VERIFIED ATHLETE</span>
        </span>
      </div>

      <div className="px-4 py-4 space-y-5 flex-1">
        {/* ATHLETE IDENTITY CARD */}
        <div
          className={`p-4 rounded-3xl border space-y-3 transition-colors ${
            isLight
              ? 'bg-white border-gray-200 shadow-xs text-gray-900'
              : 'bg-gradient-to-b from-[#18191e] to-[#121316] border-white/10 text-white'
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#16171a] to-[#2a2c33] border border-[#C6A66B]/40 p-0.5 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                alt="Marcus Vance"
                className="w-full h-full object-cover rounded-[14px]"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#C6A66B] text-black flex items-center justify-center text-[9px] font-bold">
                ✓
              </span>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className={`text-sm font-black uppercase ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  {profileName}
                </h2>
                <span className="px-1.5 py-0.2 rounded bg-[#C6A66B]/20 text-[#A38448] text-[8px] font-mono font-bold uppercase">
                  PRO ATHLETE
                </span>
              </div>
              <p className={`text-[11px] mt-0.5 ${isLight ? 'text-gray-600' : 'text-zinc-400'}`}>
                {athleteDiscipline}
              </p>
              <span className={`text-[10px] font-mono ${isLight ? 'text-gray-400' : 'text-zinc-500'}`}>
                MEMBER ID: #KRT-PRO-8491
              </span>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className={`grid grid-cols-3 gap-2 pt-2 border-t text-center text-xs ${isLight ? 'border-gray-100' : 'border-white/10'}`}>
            <div className={`p-2 rounded-xl ${isLight ? 'bg-gray-50 border border-gray-100' : 'bg-black/40'}`}>
              <span className="font-mono font-bold text-[#A38448] block text-sm">
                {orders.length}
              </span>
              <span className={`text-[9px] uppercase font-mono ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>
                Orders
              </span>
            </div>
            <div className={`p-2 rounded-xl ${isLight ? 'bg-gray-50 border border-gray-100' : 'bg-black/40'}`}>
              <span className="font-mono font-bold text-[#A38448] block text-sm">
                {warranties.length}
              </span>
              <span className={`text-[9px] uppercase font-mono ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>
                Warranties
              </span>
            </div>
            <div className={`p-2 rounded-xl ${isLight ? 'bg-gray-50 border border-gray-100' : 'bg-black/40'}`}>
              <span className="font-mono font-bold text-[#A38448] block text-sm">
                {wishlist.length}
              </span>
              <span className={`text-[9px] uppercase font-mono ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>
                Saved
              </span>
            </div>
          </div>
        </div>

        {/* NOTIFICATIONS TOGGLE CARD */}
        <div
          className={`p-3.5 rounded-2xl border flex items-center justify-between transition-colors ${
            isLight ? 'bg-white border-gray-200 text-gray-900 shadow-xs' : 'bg-[#16171b] border-white/10 text-white'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl ${isLight ? 'bg-gray-100 text-gray-700' : 'bg-white/5 text-zinc-300'}`}>
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h4 className={`text-xs font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>Order & Dispatch Alerts</h4>
              <p className={`text-[10px] ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>Push updates on custom curing & tracking</p>
            </div>
          </div>
          <button
            onClick={() => {
              setNotificationsEnabled(!notificationsEnabled);
              showToast(
                notificationsEnabled
                  ? 'Notifications muted'
                  : 'Notifications enabled'
              );
            }}
            className={`w-11 h-6 rounded-full transition-colors p-0.5 flex items-center ${
              notificationsEnabled ? 'bg-[#C6A66B]' : isLight ? 'bg-gray-300' : 'bg-zinc-800'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* MENU LISTS */}
        {menuSections.map((sec) => (
          <div key={sec.title} className="space-y-2">
            <span className={`text-[10px] font-mono uppercase tracking-wider block px-1 ${isLight ? 'text-gray-500 font-semibold' : 'text-zinc-500'}`}>
              {sec.title}
            </span>

            <div
              className={`rounded-2xl border divide-y overflow-hidden transition-colors ${
                isLight ? 'bg-white border-gray-200 divide-gray-100 shadow-xs' : 'bg-[#16171b] border-white/10 divide-white/5'
              }`}
            >
              {sec.items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className={`w-full p-3.5 flex items-center justify-between text-left transition-colors group ${
                      isLight ? 'hover:bg-gray-50' : 'hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 transition-colors ${isLight ? 'text-gray-500 group-hover:text-[#A38448]' : 'text-zinc-400 group-hover:text-[#C6A66B]'}`} />
                      <div>
                        <span className={`text-xs font-semibold block ${isLight ? 'text-gray-900' : 'text-white'}`}>
                          {item.label}
                        </span>
                        {item.desc && (
                          <span className={`text-[10px] font-mono ${isLight ? 'text-gray-400' : 'text-zinc-500'}`}>
                            {item.desc}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.count !== undefined && (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${isLight ? 'bg-gray-100 text-gray-700' : 'bg-white/10 text-zinc-300'}`}>
                          {item.count}
                        </span>
                      )}
                      {item.badge && (
                        <span className="px-2 py-0.5 rounded-full bg-[#C6A66B]/20 text-[9px] font-mono text-[#A38448] font-bold">
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight className={`w-4 h-4 group-hover:translate-x-0.5 transition-transform ${isLight ? 'text-gray-400' : 'text-zinc-500'}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* LOGOUT BUTTON */}
        <button
          onClick={() => {
            showToast('Signed out of Kratos Athlete account');
            setCurrentScreen('splash');
          }}
          className={`w-full p-3.5 rounded-2xl border text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
            isLight
              ? 'bg-white hover:bg-red-50 border-gray-200 text-gray-700 hover:text-red-600 shadow-xs'
              : 'bg-white/5 hover:bg-red-500/10 border-white/10 hover:border-red-500/30 text-zinc-400 hover:text-red-400'
          }`}
        >
          <LogOut className="w-4 h-4" />
          <span>SIGN OUT</span>
        </button>
      </div>

      {/* HELP & SUPPORT MODAL */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className={`w-full max-w-sm rounded-3xl border p-5 space-y-4 shadow-2xl transition-colors ${
              isLight ? 'bg-white border-gray-200 text-gray-900' : 'bg-[#16171b] border-white/15 text-white'
            }`}
          >
            <div className={`flex justify-between items-center pb-2 border-b ${isLight ? 'border-gray-200' : 'border-white/10'}`}>
              <span className="text-xs font-mono font-bold text-[#A38448] uppercase">
                ATHLETE CONCIERGE & SUPPORT
              </span>
              <button
                onClick={() => setShowSupportModal(false)}
                className={isLight ? 'text-gray-500 hover:text-black' : 'text-zinc-400 hover:text-white'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className={`p-3 rounded-xl space-y-1 ${isLight ? 'bg-gray-50 text-gray-900' : 'bg-black/40 text-white'}`}>
                <h5 className="font-bold">How do I trim my Kratos insole?</h5>
                <p className={`text-[11px] ${isLight ? 'text-gray-600' : 'text-zinc-400'}`}>
                  Use your shoe&apos;s factory insole as a cutting template. Trace the toe area with scissors. Never cut the carbon fiber shank.
                </p>
              </div>

              <div className={`p-3 rounded-xl space-y-1 ${isLight ? 'bg-gray-50 text-gray-900' : 'bg-black/40 text-white'}`}>
                <h5 className="font-bold">Break-in Period</h5>
                <p className={`text-[11px] ${isLight ? 'text-gray-600' : 'text-zinc-400'}`}>
                  Carbon fiber insoles are rigid. Wear for 1-2 hours daily for the first 3 days to allow foot muscles to adapt.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                showToast('Support ticket dispatched to Kratos Engineering');
                setShowSupportModal(false);
              }}
              className="w-full py-2.5 rounded-xl bg-[#C6A66B] text-black font-extrabold text-xs uppercase"
            >
              Contact Engineering Team
            </button>
          </div>
        </div>
      )}

      {/* TERMS & PRIVACY MODAL */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className={`w-full max-w-sm rounded-3xl border p-5 space-y-3 shadow-2xl transition-colors ${
              isLight ? 'bg-white border-gray-200 text-gray-900' : 'bg-[#16171b] border-white/15 text-white'
            }`}
          >
            <div className={`flex justify-between items-center pb-2 border-b ${isLight ? 'border-gray-200' : 'border-white/10'}`}>
              <span className="text-xs font-mono font-bold text-[#A38448] uppercase">
                TERMS & WARRANTY POLICY
              </span>
              <button
                onClick={() => setShowTermsModal(false)}
                className={isLight ? 'text-gray-500 hover:text-black' : 'text-zinc-400 hover:text-white'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className={`text-[11px] space-y-2 max-h-60 overflow-y-auto no-scrollbar ${isLight ? 'text-gray-600' : 'text-zinc-400'}`}>
              <p>
                <strong className={isLight ? 'text-gray-900' : 'text-white'}>6-Month Limited Warranty:</strong> Kratos warrants genuine carbon fiber plates against structural breakage, cracking, and bonding failure under normal athletic use.
              </p>
              <p>
                <strong className={isLight ? 'text-gray-900' : 'text-white'}>Exclusions:</strong> Damage resulting from scissors trimming into the carbon weave, dog bites, excessive dryer heat, or improper shoe fit.
              </p>
              <p>
                <strong className={isLight ? 'text-gray-900' : 'text-white'}>Privacy:</strong> We protect athlete biomechanical data and never sell customer fitting profiles to third parties.
              </p>
            </div>

            <button
              onClick={() => setShowTermsModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#C6A66B] text-black font-extrabold text-xs uppercase"
            >
              I Understand
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
