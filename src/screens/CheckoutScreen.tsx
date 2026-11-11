import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  CreditCard, 
  ShieldCheck, 
  Check, 
  Truck, 
  Lock, 
  CheckCircle2, 
  ArrowRight,
  PackageCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';

export const CheckoutScreen: React.FC = () => {
  const { cart, cartSubtotal, placeOrder, setCurrentScreen, showToast, theme } = useApp();
  const isLight = theme === 'light';

  const [email, setEmail] = useState('marcus.vance@athlete.com');
  const [phone, setPhone] = useState('+1 (503) 555-0192');
  const [fullName, setFullName] = useState('Marcus Vance');
  const [street, setStreet] = useState('742 Evergreen Terrace, Apt 4B');
  const [city, setCity] = useState('Portland');
  const [state, setState] = useState('OR');
  const [zip, setZip] = useState('97201');

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'apple-pay' | 'card' | 'google-pay'>('apple-pay');

  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('883');

  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shippingCost = shippingMethod === 'express' ? 9.99 : 0;
  const total = cartSubtotal + shippingCost;

  const handlePlaceOrder = () => {
    if (!email || !fullName || !street || !city || !zip) {
      showToast('Please fill out all required shipping fields', 'info');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const order = placeOrder(
        { fullName, street, city, state, zip },
        paymentMethod,
        0
      );
      setPlacedOrder(order);
      setIsSubmitting(false);

      // Trigger athletic gold celebration confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C6A66B', '#FFFFFF', '#222222', '#F1E4C3'],
      });
    }, 900);
  };

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
        <button
          onClick={() => setCurrentScreen('cart')}
          className={`p-1 rounded-full transition-colors ${
            isLight ? 'text-gray-600 hover:text-black hover:bg-gray-100' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <span className={`text-xs font-mono font-bold uppercase tracking-wider ${isLight ? 'text-gray-900' : 'text-white'}`}>
          CHECKOUT & PAYMENT
        </span>

        <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-600 font-bold">
          <Lock className="w-3 h-3" />
          <span>256-BIT ENCRYPTION</span>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4 flex-1">
        {/* SECTION 1: CONTACT INFORMATION */}
        <section
          className={`p-4 rounded-2xl border space-y-3 transition-colors ${
            isLight ? 'bg-white border-gray-200 shadow-xs' : 'bg-[#16171b] border-white/10'
          }`}
        >
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-mono text-[#A38448] uppercase font-bold tracking-wider">
              1. CONTACT INFORMATION
            </span>
            <span className={`text-[10px] font-mono ${isLight ? 'text-gray-400' : 'text-zinc-400'}`}>ATHLETE PROFILE</span>
          </div>

          <div className="space-y-2">
            <div>
              <label className={`text-[10px] font-mono uppercase block mb-1 ${isLight ? 'text-gray-600 font-semibold' : 'text-zinc-400'}`}>
                Email for Tracking Updates
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C6A66B] transition-colors ${
                  isLight
                    ? 'bg-gray-50 border-gray-300 text-gray-900 focus:bg-white'
                    : 'bg-black/60 border-white/15 text-white'
                }`}
              />
            </div>
            <div>
              <label className={`text-[10px] font-mono uppercase block mb-1 ${isLight ? 'text-gray-600 font-semibold' : 'text-zinc-400'}`}>
                Mobile Phone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C6A66B] transition-colors ${
                  isLight
                    ? 'bg-gray-50 border-gray-300 text-gray-900 focus:bg-white'
                    : 'bg-black/60 border-white/15 text-white'
                }`}
              />
            </div>
          </div>
        </section>

        {/* SECTION 2: SHIPPING ADDRESS */}
        <section
          className={`p-4 rounded-2xl border space-y-3 transition-colors ${
            isLight ? 'bg-white border-gray-200 shadow-xs' : 'bg-[#16171b] border-white/10'
          }`}
        >
          <span className="text-[10px] font-mono text-[#A38448] uppercase font-bold tracking-wider block">
            2. DELIVERY ADDRESS
          </span>

          <div className="space-y-2">
            <div>
              <label className={`text-[10px] font-mono uppercase block mb-1 ${isLight ? 'text-gray-600 font-semibold' : 'text-zinc-400'}`}>
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C6A66B] transition-colors ${
                  isLight
                    ? 'bg-gray-50 border-gray-300 text-gray-900 focus:bg-white'
                    : 'bg-black/60 border-white/15 text-white'
                }`}
              />
            </div>
            <div>
              <label className={`text-[10px] font-mono uppercase block mb-1 ${isLight ? 'text-gray-600 font-semibold' : 'text-zinc-400'}`}>
                Street Address
              </label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C6A66B] transition-colors ${
                  isLight
                    ? 'bg-gray-50 border-gray-300 text-gray-900 focus:bg-white'
                    : 'bg-black/60 border-white/15 text-white'
                }`}
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className={`text-[10px] font-mono uppercase block mb-1 ${isLight ? 'text-gray-600 font-semibold' : 'text-zinc-400'}`}>
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={`w-full border rounded-xl px-2.5 py-2 text-xs focus:outline-none focus:border-[#C6A66B] transition-colors ${
                    isLight
                      ? 'bg-gray-50 border-gray-300 text-gray-900 focus:bg-white'
                      : 'bg-black/60 border-white/15 text-white'
                  }`}
                />
              </div>
              <div>
                <label className={`text-[10px] font-mono uppercase block mb-1 ${isLight ? 'text-gray-600 font-semibold' : 'text-zinc-400'}`}>
                  State
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className={`w-full border rounded-xl px-2.5 py-2 text-xs focus:outline-none focus:border-[#C6A66B] transition-colors ${
                    isLight
                      ? 'bg-gray-50 border-gray-300 text-gray-900 focus:bg-white'
                      : 'bg-black/60 border-white/15 text-white'
                  }`}
                />
              </div>
              <div>
                <label className={`text-[10px] font-mono uppercase block mb-1 ${isLight ? 'text-gray-600 font-semibold' : 'text-zinc-400'}`}>
                  ZIP
                </label>
                <input
                  type="text"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className={`w-full border rounded-xl px-2.5 py-2 text-xs focus:outline-none focus:border-[#C6A66B] transition-colors ${
                    isLight
                      ? 'bg-gray-50 border-gray-300 text-gray-900 focus:bg-white'
                      : 'bg-black/60 border-white/15 text-white'
                  }`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: SHIPPING METHOD */}
        <section
          className={`p-4 rounded-2xl border space-y-3 transition-colors ${
            isLight ? 'bg-white border-gray-200 shadow-xs' : 'bg-[#16171b] border-white/10'
          }`}
        >
          <span className="text-[10px] font-mono text-[#A38448] uppercase font-bold tracking-wider block">
            3. SHIPPING SPEED
          </span>

          <div className="space-y-2">
            {[
              {
                id: 'standard',
                name: 'FedEx Athletic Standard (3-5 Business Days)',
                price: 'FREE',
                cost: 0,
              },
              {
                id: 'express',
                name: 'FedEx Priority Overnight Air (1-2 Days)',
                price: '$9.99',
                cost: 9.99,
              },
            ].map((method) => {
              const isSelected = shippingMethod === method.id;
              return (
                <div
                  key={method.id}
                  onClick={() => setShippingMethod(method.id as any)}
                  className={`p-3 rounded-xl border cursor-pointer flex justify-between items-center transition-all ${
                    isSelected
                      ? isLight
                        ? 'bg-[#FFFDF7] border-[#C6A66B] ring-1 ring-[#C6A66B]/50'
                        : 'bg-[#18191e] border-[#C6A66B]'
                      : isLight
                      ? 'bg-gray-50 border-gray-200 text-gray-800'
                      : 'bg-black/40 border-white/10 text-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? 'border-[#C6A66B] bg-[#C6A66B] text-black'
                          : isLight
                          ? 'border-gray-400'
                          : 'border-zinc-500'
                      }`}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </span>
                    <span className={`text-xs ${isLight ? 'text-gray-800' : 'text-zinc-200'}`}>{method.name}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#A38448]">
                    {method.price}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: PAYMENT METHOD */}
        <section
          className={`p-4 rounded-2xl border space-y-3 transition-colors ${
            isLight ? 'bg-white border-gray-200 shadow-xs' : 'bg-[#16171b] border-white/10'
          }`}
        >
          <span className="text-[10px] font-mono text-[#A38448] uppercase font-bold tracking-wider block">
            4. PAYMENT SELECTION
          </span>

          {/* Payment Method Selector Pills */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'apple-pay', label: ' Apple Pay' },
              { id: 'card', label: 'Credit Card' },
              { id: 'google-pay', label: 'G Pay' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setPaymentMethod(p.id as any)}
                className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all ${
                  paymentMethod === p.id
                    ? 'bg-[#C6A66B] border-[#C6A66B] text-black shadow-sm font-bold'
                    : isLight
                    ? 'bg-gray-50 border-gray-200 text-gray-700'
                    : 'bg-black/40 border-white/10 text-zinc-300'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Apple Pay Button Visual Option */}
          {paymentMethod === 'apple-pay' && (
            <div className={`p-3 rounded-xl border text-center space-y-1 ${isLight ? 'bg-gray-900 border-black text-white' : 'bg-black border-white/20 text-white'}`}>
              <span className="text-sm font-bold font-mono">Pay with Face ID</span>
              <p className="text-[10px] text-zinc-300">
                Authorized with your Apple device biometric security.
              </p>
            </div>
          )}

          {/* Credit Card Input */}
          {paymentMethod === 'card' && (
            <div className="space-y-2 pt-1">
              <div>
                <label className={`text-[10px] font-mono uppercase block mb-1 ${isLight ? 'text-gray-600 font-semibold' : 'text-zinc-400'}`}>
                  Card Number
                </label>
                <div className="relative">
                  <CreditCard className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isLight ? 'text-gray-400' : 'text-zinc-400'}`} />
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className={`w-full border rounded-xl py-2 pl-9 pr-3 text-xs font-mono focus:outline-none focus:border-[#C6A66B] transition-colors ${
                      isLight
                        ? 'bg-gray-50 border-gray-300 text-gray-900 focus:bg-white'
                        : 'bg-black/60 border-white/15 text-white'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={`text-[10px] font-mono uppercase block mb-1 ${isLight ? 'text-gray-600 font-semibold' : 'text-zinc-400'}`}>
                    Expiry (MM/YY)
                  </label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className={`w-full border rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#C6A66B] transition-colors ${
                      isLight
                        ? 'bg-gray-50 border-gray-300 text-gray-900 focus:bg-white'
                        : 'bg-black/60 border-white/15 text-white'
                    }`}
                  />
                </div>
                <div>
                  <label className={`text-[10px] font-mono uppercase block mb-1 ${isLight ? 'text-gray-600 font-semibold' : 'text-zinc-400'}`}>
                    CVC Code
                  </label>
                  <input
                    type="text"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    className={`w-full border rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#C6A66B] transition-colors ${
                      isLight
                        ? 'bg-gray-50 border-gray-300 text-gray-900 focus:bg-white'
                        : 'bg-black/60 border-white/15 text-white'
                    }`}
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'google-pay' && (
            <div className={`p-3 rounded-xl border text-center ${isLight ? 'bg-gray-900 text-white' : 'bg-black border-white/20'}`}>
              <span className="text-xs font-bold font-mono">G Pay 1-Tap Ready</span>
            </div>
          )}
        </section>

        {/* SECTION 5: ORDER SUMMARY */}
        <section
          className={`p-4 rounded-2xl border space-y-2 text-xs transition-colors ${
            isLight ? 'bg-white border-gray-200 shadow-xs' : 'bg-[#16171b] border-white/10'
          }`}
        >
          <span className="text-[10px] font-mono text-[#A38448] uppercase font-bold tracking-wider block">
            5. FINAL REVIEW
          </span>

          <div className="flex justify-between">
            <span className={isLight ? 'text-gray-500' : 'text-zinc-400'}>Items ({cart.length})</span>
            <span className={`font-mono font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>${cartSubtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className={isLight ? 'text-gray-500' : 'text-zinc-400'}>Shipping</span>
            <span className={`font-mono ${isLight ? 'text-gray-900' : 'text-white'}`}>
              {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
            </span>
          </div>

          <div className={`pt-2 border-t flex justify-between items-baseline ${isLight ? 'border-gray-200' : 'border-white/10'}`}>
            <span className={`text-sm font-bold uppercase ${isLight ? 'text-gray-900' : 'text-white'}`}>Total Due</span>
            <span className="text-xl font-mono font-black text-[#A38448]">
              ${total.toFixed(2)}
            </span>
          </div>
        </section>
      </div>

      {/* FIXED BOTTOM CTA BUTTON */}
      <div
        className={`fixed bottom-0 inset-x-0 z-40 backdrop-blur-xl border-t p-3 max-w-lg mx-auto transition-colors ${
          isLight
            ? 'bg-white/98 border-gray-200'
            : 'bg-[#101010]/95 border-white/10'
        }`}
      >
        <button
          onClick={handlePlaceOrder}
          disabled={isSubmitting}
          className="w-full py-4 px-6 rounded-2xl bg-[#C6A66B] hover:bg-[#D4B579] disabled:opacity-50 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl active:scale-98"
        >
          {isSubmitting ? (
            <span>PROCESSING ENCRYPTED ORDER...</span>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              <span>PLACE ORDER • ${total.toFixed(2)}</span>
            </>
          )}
        </button>
      </div>

      {/* ORDER SUCCESS POPUP / SCREEN */}
      {placedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div
            className={`w-full max-w-sm rounded-3xl border-2 p-6 space-y-4 text-center shadow-2xl animate-in zoom-in-95 transition-colors ${
              isLight
                ? 'bg-white border-[#C6A66B] text-gray-900'
                : 'bg-[#16171b] border-[#C6A66B]/50 text-white'
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-[#C6A66B]/20 border border-[#C6A66B] flex items-center justify-center mx-auto text-[#A38448]">
              <PackageCheck className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-[#A38448] uppercase font-bold tracking-widest">
                ORDER CONFIRMED
              </span>
              <h2 className={`text-xl font-black uppercase ${isLight ? 'text-gray-900' : 'text-white'}`}>
                THANK YOU, MARCUS!
              </h2>
              <p className={`text-xs ${isLight ? 'text-gray-600' : 'text-zinc-400'}`}>
                Your high-performance insoles are now in queue for custom calibration.
              </p>
            </div>

            <div
              className={`p-3 rounded-2xl border text-xs font-mono space-y-1 text-left ${
                isLight ? 'bg-gray-50 border-gray-200' : 'bg-black/60 border-white/10'
              }`}
            >
              <div className="flex justify-between">
                <span className={isLight ? 'text-gray-500' : 'text-zinc-500'}>CONFIRMATION #:</span>
                <span className="text-[#A38448] font-bold">{placedOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span className={isLight ? 'text-gray-500' : 'text-zinc-500'}>ESTIMATED DELIVERY:</span>
                <span className={isLight ? 'text-gray-900 font-semibold' : 'text-white'}>3 Business Days</span>
              </div>
              <div className="flex justify-between">
                <span className={isLight ? 'text-gray-500' : 'text-zinc-500'}>TOTAL CHARGED:</span>
                <span className={isLight ? 'text-gray-900 font-bold' : 'text-white'}>${placedOrder.total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setPlacedOrder(null);
                setCurrentScreen('order-tracking');
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-[#C6A66B] hover:bg-[#D4B579] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
            >
              <span>TRACK YOUR ORDER</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
