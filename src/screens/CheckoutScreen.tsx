import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  CreditCard, 
  ShieldCheck, 
  Check, 
  Lock, 
  CheckCircle2, 
  ArrowRight,
  PackageCheck,
  User,
  Phone,
  Mail,
  FileText,
  Plus,
  Minus,
  Sparkles,
  QrCode,
  RotateCcw,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';

export const CheckoutScreen: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    placeStallOrder, 
    setCurrentScreen, 
    resetStallSession,
    showToast, 
    theme 
  } = useApp();
  const isLight = theme === 'light';

  // Guest Customer Form Information (Physical Stall Optimized)
  const [fullName, setFullName] = useState('Marcus Vance');
  const [phone, setPhone] = useState('+1 (503) 555-0192');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('Pick up at Kratos Exhibition Stall 4B');
  const [quantity, setQuantity] = useState(1);

  // Payment Selection Modal
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'card' | 'qr' | 'counter'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Placed order result state
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  // Calculate total based on items & quantity
  const primaryItem = cart[0];
  const unitPrice = primaryItem ? primaryItem.price : 89.0;
  const totalAmount = unitPrice * quantity;

  // Action 1: BUY NOW (Demo Payment Flow)
  const handleProceedBuyNow = () => {
    if (!fullName.trim() || !phone.trim()) {
      showToast('Please enter customer name and phone number', 'info');
      return;
    }
    setShowPaymentModal(true);
  };

  const handleConfirmDemoPayment = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const order = placeStallOrder({
        customerName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        notes: notes.trim() || undefined,
        paymentMethod: selectedPaymentMethod === 'card' 
          ? 'Contactless Card (Demo)' 
          : selectedPaymentMethod === 'qr' 
          ? 'UPI / QR Scan (Demo)' 
          : 'Demo Payment',
        paymentStatus: 'Paid (Demo)',
      });

      setPlacedOrder(order);
      setIsSubmitting(false);
      setShowPaymentModal(false);

      // Gold celebratory confetti
      confetti({
        particleCount: 85,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#C6A66B', '#FFFFFF', '#111111', '#F1E4C3'],
      });
    }, 700);
  };

  // Action 2: PLACE ORDER (Pay / Confirm at Stall)
  const handlePlaceOrderAtStall = () => {
    if (!fullName.trim() || !phone.trim()) {
      showToast('Please enter customer name and phone number', 'info');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const order = placeStallOrder({
        customerName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        notes: notes.trim() || undefined,
        paymentMethod: 'Pay at Stall Counter',
        paymentStatus: 'Pending at Stall',
      });

      setPlacedOrder(order);
      setIsSubmitting(false);

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#C6A66B', '#FFFFFF', '#222222'],
      });
    }, 600);
  };

  // Order Confirmation View
  if (placedOrder) {
    return (
      <div
        className={`flex-1 flex flex-col p-5 space-y-6 transition-colors ${
          isLight ? 'bg-[#F9FAFB] text-gray-900' : 'bg-[#101010] text-white'
        }`}
      >
        <div className="text-center pt-4 space-y-2">
          <div className="w-14 h-14 rounded-full bg-[#C6A66B]/20 border border-[#C6A66B] flex items-center justify-center mx-auto text-[#C6A66B]">
            <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#A38448] font-bold block">
            STALL ORDER GENERATED
          </span>
          <h1 className="text-xl font-black uppercase tracking-tight">
            ORDER CONFIRMED!
          </h1>
          <p className={`text-xs ${isLight ? 'text-gray-600' : 'text-zinc-400'}`}>
            Thank you, {placedOrder.customerInfo?.fullName}. Your order is registered in the booth production queue.
          </p>
        </div>

        {/* ORDER REFERENCE TICKET CARD */}
        <div
          className={`p-4 rounded-3xl border space-y-4 shadow-xl transition-colors ${
            isLight ? 'bg-white border-gray-200' : 'bg-[#15161a] border-white/10'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <span className="text-[10px] font-mono text-gray-500 uppercase block">
                ORDER REFERENCE NUMBER
              </span>
              <span className="text-lg font-mono font-black text-[#A38448]">
                {placedOrder.id}
              </span>
            </div>
            <span
              className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                placedOrder.paymentStatus === 'Paid (Demo)'
                  ? 'bg-emerald-500/15 text-emerald-600 border border-emerald-500/30'
                  : 'bg-amber-500/15 text-amber-600 border border-amber-500/30'
              }`}
            >
              {placedOrder.paymentStatus}
            </span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-gray-500">Customer:</span>
              <span className="font-bold">{placedOrder.customerInfo?.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Mobile Phone:</span>
              <span className="font-bold">{placedOrder.customerInfo?.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Items Ordered:</span>
              <span className="font-bold">{placedOrder.items[0]?.name || 'Custom Insole'} (x{quantity})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Collection Point:</span>
              <span className="font-bold text-[#A38448]">Kratos Stall Booth 4B</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-100 text-sm">
              <span className="font-bold">Total Amount:</span>
              <span className="font-black text-[#A38448]">${placedOrder.total.toFixed(2)}</span>
            </div>
          </div>

          <div
            className={`p-2.5 rounded-xl border text-[11px] flex items-center gap-2 ${
              isLight ? 'bg-amber-50/70 border-amber-200 text-amber-900' : 'bg-amber-950/20 border-amber-500/20 text-amber-200'
            }`}
          >
            <AlertCircle className="w-4 h-4 shrink-0 text-[#C6A66B]" />
            <span>
              {placedOrder.paymentStatus === 'Paid (Demo)'
                ? 'Demo transaction recorded. Please pick up your insole when announced at Booth 4B.'
                : 'Present your Order # at counter to complete payment and collect your customized insoles.'}
            </span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="space-y-2 pt-2">
          <button
            onClick={() => setCurrentScreen('order-tracking')}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#C6A66B] hover:bg-[#D4B579] text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-98 flex items-center justify-center gap-2"
          >
            <PackageCheck className="w-4 h-4" />
            <span>TRACK PRODUCTION STATUS</span>
          </button>

          {/* Critical Stall Reset for Next Customer */}
          <button
            onClick={resetStallSession}
            className={`w-full py-3 px-4 rounded-2xl border font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
              isLight
                ? 'bg-white hover:bg-gray-100 border-gray-300 text-gray-800'
                : 'bg-white/10 hover:bg-white/15 border-white/20 text-white'
            }`}
          >
            <RotateCcw className="w-4 h-4 text-[#C6A66B]" />
            <span>START NEXT CUSTOMER SESSION</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex-1 flex flex-col pb-36 transition-colors ${
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
          onClick={() => setCurrentScreen('shop')}
          className={`p-1 rounded-full transition-colors ${
            isLight ? 'text-gray-600 hover:text-black hover:bg-gray-100' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <span className={`text-xs font-mono font-bold uppercase tracking-wider ${isLight ? 'text-gray-900' : 'text-white'}`}>
          EXHIBITION STALL CHECKOUT
        </span>

        <span className="text-[10px] font-mono text-[#A38448] font-bold">
          BOOTH 4B
        </span>
      </div>

      <div className="px-4 py-4 space-y-4 flex-1">
        {/* GUEST CUSTOMER FORM (NO REGISTRATION REQUIRED) */}
        <div
          className={`p-4 rounded-2xl border space-y-3.5 transition-colors ${
            isLight ? 'bg-white border-gray-200 shadow-xs' : 'bg-[#15161a] border-white/10'
          }`}
        >
          <div className="flex items-center justify-between pb-1 border-b border-gray-100">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#A38448]">
              ATHLETE CONTACT INFORMATION (GUEST)
            </h2>
            <span className="text-[9px] font-mono text-gray-400">NO SIGNUP REQUIRED</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className={`text-[11px] font-bold uppercase block mb-1 ${isLight ? 'text-gray-700' : 'text-zinc-300'}`}>
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Marcus Vance"
                  className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs border focus:outline-none focus:border-[#C6A66B] ${
                    isLight
                      ? 'bg-gray-50 border-gray-300 text-gray-900'
                      : 'bg-[#101010] border-white/15 text-white'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`text-[11px] font-bold uppercase block mb-1 ${isLight ? 'text-gray-700' : 'text-zinc-300'}`}>
                Mobile Number *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (503) 555-0192"
                  className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs border focus:outline-none focus:border-[#C6A66B] ${
                    isLight
                      ? 'bg-gray-50 border-gray-300 text-gray-900'
                      : 'bg-[#101010] border-white/15 text-white'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`text-[11px] font-bold uppercase block mb-1 ${isLight ? 'text-gray-700' : 'text-zinc-300'}`}>
                Email Address (Optional)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="athlete@kratos.com"
                  className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs border focus:outline-none focus:border-[#C6A66B] ${
                    isLight
                      ? 'bg-gray-50 border-gray-300 text-gray-900'
                      : 'bg-[#101010] border-white/15 text-white'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`text-[11px] font-bold uppercase block mb-1 ${isLight ? 'text-gray-700' : 'text-zinc-300'}`}>
                Additional Instructions / Notes (Optional)
              </label>
              <div className="relative">
                <FileText className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Laser engraving: KRT-09, pickup after competition heat"
                  className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs border focus:outline-none focus:border-[#C6A66B] ${
                    isLight
                      ? 'bg-gray-50 border-gray-300 text-gray-900'
                      : 'bg-[#101010] border-white/15 text-white'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ORDER SUMMARY */}
        <div
          className={`p-4 rounded-2xl border space-y-3 transition-colors ${
            isLight ? 'bg-white border-gray-200 shadow-xs' : 'bg-[#15161a] border-white/10'
          }`}
        >
          <div className="flex items-center justify-between pb-1 border-b border-gray-100">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#A38448]">
              SELECTED INSOLE SPECIFICATIONS
            </h2>
            <span className="text-[10px] font-mono text-emerald-600 font-bold">READY AT STALL</span>
          </div>

          {primaryItem ? (
            <div className="flex gap-3">
              <img
                src={primaryItem.image}
                alt={primaryItem.name}
                className="w-16 h-16 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 space-y-1">
                <h3 className={`text-xs font-bold uppercase ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  {primaryItem.name}
                </h3>
                <p className={`text-[10px] font-mono ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>
                  Size: {primaryItem.size} • {primaryItem.colorName}
                </p>

                {primaryItem.customizationDetails && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {primaryItem.customizationDetails.arch && (
                      <span className="px-1.5 py-0.2 rounded text-[8px] font-mono bg-black/5 text-[#A38448] font-bold">
                        {primaryItem.customizationDetails.arch}
                      </span>
                    )}
                    {primaryItem.customizationDetails.flex && (
                      <span className="px-1.5 py-0.2 rounded text-[8px] font-mono bg-black/5 text-[#A38448] font-bold">
                        {primaryItem.customizationDetails.flex}
                      </span>
                    )}
                    {primaryItem.customizationDetails.engraving && (
                      <span className="px-1.5 py-0.2 rounded text-[8px] font-mono bg-[#C6A66B]/20 text-[#A38448] font-bold">
                        &quot;{primaryItem.customizationDetails.engraving}&quot;
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="text-xs text-gray-500">No insole configured yet.</p>
          )}

          {/* QUANTITY STEPPER */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <span className="text-xs font-bold uppercase">Order Quantity:</span>
            <div className="flex items-center gap-2 border rounded-xl px-2 py-1">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-1 text-gray-500 hover:text-black"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-mono font-bold w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-1 text-gray-500 hover:text-black"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* TOTAL */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <span className="text-xs font-bold uppercase">Total Due:</span>
            <span className="text-lg font-mono font-black text-[#A38448]">
              ${totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* DOCKED ACTIONS: BUY NOW & PLACE ORDER */}
      <div
        className={`fixed bottom-[58px] inset-x-0 z-40 backdrop-blur-xl border-t p-3 max-w-lg mx-auto grid grid-cols-2 gap-2.5 shadow-2xl transition-colors ${
          isLight ? 'bg-white/98 border-gray-200' : 'bg-[#101010]/98 border-white/10'
        }`}
      >
        {/* ACTION 1: PLACE ORDER (PAY AT STALL) */}
        <button
          onClick={handlePlaceOrderAtStall}
          disabled={isSubmitting}
          className={`py-3 px-3 rounded-2xl border font-bold text-xs uppercase tracking-wider transition-all flex flex-col items-center justify-center ${
            isLight
              ? 'bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-900'
              : 'bg-white/10 hover:bg-white/15 border-white/20 text-white'
          }`}
        >
          <span>PLACE ORDER</span>
          <span className="text-[9px] font-mono font-normal opacity-80">Pay at Stall</span>
        </button>

        {/* ACTION 2: BUY NOW (DEMO PAYMENT) */}
        <button
          onClick={handleProceedBuyNow}
          disabled={isSubmitting}
          className="py-3 px-3 rounded-2xl bg-[#C6A66B] hover:bg-[#D4B579] text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-98 flex flex-col items-center justify-center"
        >
          <span>BUY NOW</span>
          <span className="text-[9px] font-mono font-bold opacity-90">Demo Payment</span>
        </button>
      </div>

      {/* DEMO PAYMENT MODAL */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div
            className={`w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-5 space-y-4 border shadow-2xl ${
              isLight ? 'bg-white border-gray-200 text-gray-900' : 'bg-[#15161a] border-white/10 text-white'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div>
                <span className="text-[9px] font-mono text-[#A38448] font-bold uppercase">
                  DEMO PAYMENT GATEWAY
                </span>
                <h3 className="text-xs font-bold uppercase tracking-wider">
                  Select Demo Payment Method
                </h3>
              </div>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-400 hover:text-black"
              >
                ✕
              </button>
            </div>

            {/* Clear Demo Label Notice */}
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 text-[10px] space-y-0.5">
              <span className="font-bold">EXHIBITION SANDBOX MODE</span>
              <p>Demo payment flow — no actual charges will be processed on cards or UPI.</p>
            </div>

            <div className="space-y-2">
              {[
                { id: 'card', name: 'Contactless Card / Apple Pay (Demo)', icon: CreditCard },
                { id: 'qr', name: 'Instant QR / UPI Scan (Demo)', icon: QrCode },
              ].map((m) => {
                const Icon = m.icon;
                const isSelected = selectedPaymentMethod === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedPaymentMethod(m.id as any)}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-[#C6A66B] text-black border-[#C6A66B]'
                        : isLight
                        ? 'bg-gray-50 border-gray-200 text-gray-800'
                        : 'bg-white/5 border-white/10 text-zinc-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{m.name}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleConfirmDemoPayment}
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-[#C6A66B] hover:bg-[#D4B579] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg"
            >
              {isSubmitting ? 'AUTHORIZING DEMO...' : `CONFIRM DEMO PAYMENT ($${totalAmount.toFixed(2)})`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
