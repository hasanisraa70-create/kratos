import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Trash2, 
  Plus, 
  Minus, 
  Tag, 
  ArrowRight, 
  ShoppingBag, 
  Check, 
  ShieldCheck, 
  Truck 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartScreen: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    setCurrentScreen,
    showToast,
    theme,
  } = useApp();

  const isLight = theme === 'light';

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; percent: number } | null>(null);

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'KRATOS10') {
      setAppliedPromo({ code, percent: 10 });
      showToast('Promo code KRATOS10 applied (10% OFF)');
    } else if (code === 'ATHLETE20') {
      setAppliedPromo({ code, percent: 20 });
      showToast('VIP Promo code ATHLETE20 applied (20% OFF)');
    } else {
      showToast('Invalid promo code. Try KRATOS10 or ATHLETE20', 'info');
    }
  };

  const discount = appliedPromo ? (cartSubtotal * appliedPromo.percent) / 100 : 0;
  const shipping = cartSubtotal >= 75 || cart.length === 0 ? 0 : 9.99;
  const total = Math.max(0, cartSubtotal - discount + shipping);

  const freeShippingThreshold = 75;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  return (
    <div
      className={`flex-1 flex flex-col pb-48 transition-colors ${
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
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentScreen('shop')}
            className={`p-1 rounded-full transition-colors ${
              isLight ? 'text-gray-600 hover:text-black hover:bg-gray-100' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className={`text-sm font-black uppercase tracking-wider ${isLight ? 'text-gray-900' : 'text-white'}`}>
            YOUR PERFORMANCE BAG ({cart.length})
          </h1>
        </div>

        <span className="text-[10px] font-mono text-[#A38448] font-bold">
          SECURE CHECKOUT
        </span>
      </div>

      <div className="px-4 py-4 space-y-4 flex-1">
        {/* FREE SHIPPING PROGRESS BAR */}
        <div
          className={`p-3 rounded-2xl border space-y-2 transition-colors ${
            isLight ? 'bg-white border-gray-200 shadow-xs' : 'bg-[#16171b] border-white/10'
          }`}
        >
          <div className="flex items-center justify-between text-xs">
            <span className={`flex items-center gap-1.5 ${isLight ? 'text-gray-700 font-medium' : 'text-zinc-300'}`}>
              <Truck className="w-3.5 h-3.5 text-[#C6A66B]" />
              <span>
                {amountToFreeShipping === 0
                  ? 'FREE PRIORITY SHIPPING UNLOCKED'
                  : `Add $${amountToFreeShipping.toFixed(2)} for FREE Express Delivery`}
              </span>
            </span>
            <span className="font-mono text-[10px] text-[#A38448] font-bold">
              {Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100))}%
            </span>
          </div>

          <div className={`h-1.5 w-full rounded-full overflow-hidden ${isLight ? 'bg-gray-200' : 'bg-zinc-800'}`}>
            <div
              className="h-full bg-gradient-to-r from-[#C6A66B] to-[#F1E4C3] transition-all duration-300"
              style={{
                width: `${Math.min(100, (cartSubtotal / freeShippingThreshold) * 100)}%`,
              }}
            />
          </div>
        </div>

        {/* CART ITEMS LIST */}
        {cart.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <div
              className={`w-16 h-16 rounded-3xl border flex items-center justify-center mx-auto ${
                isLight ? 'bg-gray-100 border-gray-200 text-gray-400' : 'bg-white/5 border-white/10 text-zinc-500'
              }`}
            >
              <ShoppingBag className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h2 className={`text-sm font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>Your bag is empty</h2>
              <p className={`text-xs ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>
                Explore our carbon fiber and biomechanical high-arch insoles.
              </p>
            </div>
            <button
              onClick={() => setCurrentScreen('shop')}
              className="px-6 py-3 rounded-xl bg-[#C6A66B] text-black font-extrabold text-xs uppercase tracking-wider shadow"
            >
              EXPLORE COLLECTION
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-2xl border flex gap-3 relative group transition-colors ${
                  isLight ? 'bg-white border-gray-200 shadow-xs' : 'bg-[#16171b] border-white/10'
                }`}
              >
                {/* Thumbnail */}
                <div
                  className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border ${
                    isLight ? 'bg-gray-50 border-gray-200' : 'bg-black border-white/10'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute bottom-1 left-1 w-3 h-3 rounded-full border border-black/20 shadow-xs"
                    style={{ backgroundColor: item.colorHex }}
                    title={item.colorName}
                  />
                </div>

                {/* Info & Customization Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className={`text-xs font-bold line-clamp-1 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className={`p-0.5 transition-colors ${
                          isLight ? 'text-gray-400 hover:text-red-500' : 'text-zinc-500 hover:text-red-400'
                        }`}
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] space-y-0.5 mt-0.5">
                      <p className={`font-mono ${isLight ? 'text-gray-600' : 'text-zinc-400'}`}>Size: {item.size}</p>
                      <p className={isLight ? 'text-gray-600' : 'text-zinc-400'}>Color: {item.colorName}</p>
                      {item.customizationDetails && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {item.customizationDetails.arch && (
                            <span
                              className={`px-1.5 py-0.5 rounded border text-[9px] font-mono ${
                                isLight
                                  ? 'bg-amber-50 border-amber-200 text-[#A38448] font-bold'
                                  : 'bg-white/5 border-white/10 text-[#C6A66B]'
                              }`}
                            >
                              {item.customizationDetails.arch}
                            </span>
                          )}
                          {item.customizationDetails.engraving && (
                            <span
                              className={`px-1.5 py-0.5 rounded border text-[9px] font-mono font-bold ${
                                isLight
                                  ? 'bg-[#C6A66B]/15 border-[#C6A66B]/40 text-[#A38448]'
                                  : 'bg-[#C6A66B]/20 border-[#C6A66B]/40 text-[#C6A66B]'
                              }`}
                            >
                              Laser: &quot;{item.customizationDetails.engraving}&quot;
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex items-center justify-between pt-2">
                    <span className={`text-xs font-mono font-black ${isLight ? 'text-gray-900' : 'text-white'}`}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>

                    <div
                      className={`flex items-center gap-2 border rounded-lg px-2 py-0.5 transition-colors ${
                        isLight ? 'bg-gray-100 border-gray-200' : 'bg-black/60 border-white/10'
                      }`}
                    >
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className={`p-1 ${isLight ? 'text-gray-600 hover:text-black' : 'text-zinc-400 hover:text-white'}`}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className={`text-xs font-mono font-bold w-4 text-center ${isLight ? 'text-gray-900' : 'text-white'}`}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className={`p-1 ${isLight ? 'text-gray-600 hover:text-black' : 'text-zinc-400 hover:text-white'}`}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <>
            {/* DISCOUNT CODE INPUT */}
            <div
              className={`p-3 rounded-2xl border space-y-2 transition-colors ${
                isLight ? 'bg-white border-gray-200 shadow-xs' : 'bg-[#16171b] border-white/10'
              }`}
            >
              <span className={`text-[10px] font-mono uppercase ${isLight ? 'text-gray-500 font-semibold' : 'text-zinc-400'}`}>
                Have a Promo Code? (Try KRATOS10 or ATHLETE20)
              </span>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className={`absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${isLight ? 'text-gray-400' : 'text-zinc-400'}`} />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className={`w-full border rounded-xl py-2 pl-9 pr-3 text-xs font-mono uppercase focus:outline-none focus:border-[#C6A66B] transition-colors ${
                      isLight
                        ? 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:bg-white'
                        : 'bg-black/60 border-white/15 text-white placeholder-zinc-500'
                    }`}
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-colors ${
                    isLight
                      ? 'bg-gray-900 hover:bg-black text-white'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  Apply
                </button>
              </div>

              {appliedPromo && (
                <div className="flex items-center justify-between text-xs text-emerald-600 font-mono font-bold pt-1">
                  <span>Promo {appliedPromo.code} applied!</span>
                  <span>-{appliedPromo.percent}% OFF</span>
                </div>
              )}
            </div>

            {/* ORDER SUMMARY */}
            <div
              className={`p-4 rounded-2xl border space-y-2.5 text-xs transition-colors ${
                isLight ? 'bg-white border-gray-200 shadow-xs' : 'bg-[#16171b] border-white/10'
              }`}
            >
              <span className="text-[10px] font-mono text-[#A38448] uppercase font-bold tracking-wider block">
                ORDER SUMMARY
              </span>

              <div className="flex justify-between">
                <span className={isLight ? 'text-gray-500' : 'text-zinc-400'}>Subtotal</span>
                <span className={`font-mono font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>${cartSubtotal.toFixed(2)}</span>
              </div>

              {appliedPromo && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount ({appliedPromo.code})</span>
                  <span className="font-mono">-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className={isLight ? 'text-gray-500' : 'text-zinc-400'}>Estimated Shipping</span>
                <span className={`font-mono ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  {shipping === 0 ? (
                    <span className="text-emerald-600 font-bold">FREE</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className={`pt-2 border-t flex justify-between items-baseline ${isLight ? 'border-gray-200' : 'border-white/10'}`}>
                <span className={`text-sm font-bold uppercase ${isLight ? 'text-gray-900' : 'text-white'}`}>Total</span>
                <span className="text-xl font-mono font-black text-[#A38448]">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* FIXED BOTTOM CTA BUTTON (DOCKED ABOVE BOTTOM NAV BAR) */}
      {cart.length > 0 && (
        <div
          className={`fixed bottom-[58px] inset-x-0 z-40 backdrop-blur-xl border-t p-3 max-w-lg mx-auto shadow-2xl transition-colors ${
            isLight
              ? 'bg-white/98 border-gray-200'
              : 'bg-[#101010]/98 border-white/10'
          }`}
        >
          <button
            onClick={() => setCurrentScreen('checkout')}
            className="w-full py-4 px-6 rounded-2xl bg-[#C6A66B] hover:bg-[#D4B579] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl active:scale-98"
          >
            <span>PROCEED TO CHECKOUT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
