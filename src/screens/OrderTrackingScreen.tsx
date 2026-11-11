import React from 'react';
import { 
  ArrowLeft, 
  Package, 
  Truck, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Check, 
  ShieldCheck 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OrderStatus } from '../types';

export const OrderTrackingScreen: React.FC = () => {
  const { orders, activeOrder, setActiveOrder, updateOrderStatus, setCurrentScreen, theme } = useApp();
  const isLight = theme === 'light';

  const currentOrder = activeOrder || orders[0];

  const statuses: { label: OrderStatus; desc: string; date: string }[] = [
    {
      label: 'Order Placed',
      desc: 'Order verified & payment authorized',
      date: 'Today, 2:15 PM',
    },
    {
      label: 'Processing',
      desc: '3K Carbon plate calibrated & laser etched',
      date: 'Today, 4:30 PM',
    },
    {
      label: 'Shipped',
      desc: 'Package picked up by FedEx Priority Hub',
      date: 'Yesterday, 8:12 PM',
    },
    {
      label: 'Out for Delivery',
      desc: 'Courier vehicle en route to your address',
      date: 'Expected Today by 4 PM',
    },
    {
      label: 'Delivered',
      desc: 'Delivered to front door / mail room',
      date: 'Pending arrival',
    },
  ];

  const getStatusIndex = (st: OrderStatus) => {
    return statuses.findIndex((s) => s.label === st);
  };

  const currentIdx = getStatusIndex(currentOrder?.status || 'Shipped');

  if (!currentOrder) {
    return (
      <div
        className={`flex-1 flex flex-col items-center justify-center p-6 text-center transition-colors ${
          isLight ? 'bg-[#F9FAFB] text-gray-900' : 'bg-[#101010] text-white'
        }`}
      >
        <Package className="w-12 h-12 text-zinc-400 mb-3" />
        <h2 className="text-sm font-bold">No orders found</h2>
        <p className={`text-xs mt-1 ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>Start shopping to place your first order.</p>
        <button
          onClick={() => setCurrentScreen('shop')}
          className="mt-4 px-4 py-2 rounded-xl bg-[#C6A66B] text-black font-extrabold text-xs uppercase"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  return (
    <div
      className={`flex-1 flex flex-col pb-12 transition-colors ${
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
          onClick={() => setCurrentScreen('home')}
          className={`p-1 rounded-full transition-colors ${
            isLight ? 'text-gray-600 hover:text-black hover:bg-gray-100' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <span className={`text-xs font-mono font-bold uppercase tracking-wider ${isLight ? 'text-gray-900' : 'text-white'}`}>
          LIVE SHIPMENT TRACKING
        </span>

        <span className="text-[10px] font-mono text-[#A38448] font-bold">
          {currentOrder.id}
        </span>
      </div>

      <div className="px-4 py-4 space-y-4 flex-1">
        {/* MULTIPLE ORDERS SELECTOR (if more than 1) */}
        {orders.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {orders.map((ord) => (
              <button
                key={ord.id}
                onClick={() => setActiveOrder(ord)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all border shrink-0 ${
                  currentOrder.id === ord.id
                    ? 'bg-[#C6A66B] border-[#C6A66B] text-black font-bold'
                    : isLight
                    ? 'bg-white border-gray-200 text-gray-700 hover:text-black'
                    : 'bg-[#16171a] border-white/10 text-zinc-400 hover:text-white'
                }`}
              >
                Order #{ord.id} ({ord.status})
              </button>
            ))}
          </div>
        )}

        {/* STATUS SUMMARY CARD */}
        <div
          className={`p-4 rounded-3xl border space-y-3 transition-colors ${
            isLight
              ? 'bg-white border-gray-200 shadow-xs text-gray-900'
              : 'bg-gradient-to-b from-[#18191d] to-[#121316] border-white/10 text-white'
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[9px] font-mono text-[#A38448] uppercase font-bold tracking-widest block">
                STATUS: {currentOrder.status.toUpperCase()}
              </span>
              <h2 className={`text-base font-black uppercase mt-0.5 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                Estimated: {currentOrder.estimatedDelivery}
              </h2>
            </div>
            <div className="p-2.5 rounded-2xl bg-[#C6A66B]/20 text-[#A38448]">
              <Truck className="w-5 h-5" />
            </div>
          </div>

          <div
            className={`p-2.5 rounded-xl border flex justify-between items-center text-xs font-mono ${
              isLight ? 'bg-gray-50 border-gray-200' : 'bg-black/60 border-white/10'
            }`}
          >
            <div>
              <span className={`text-[10px] block ${isLight ? 'text-gray-500' : 'text-zinc-500'}`}>CARRIER & TRACKING:</span>
              <span className={`font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>{currentOrder.carrier}</span>
            </div>
            <span className="text-[#A38448] font-bold">{currentOrder.trackingNumber}</span>
          </div>
        </div>

        {/* VERTICAL ORDER TIMELINE */}
        <div
          className={`p-4 rounded-3xl border space-y-4 transition-colors ${
            isLight ? 'bg-white border-gray-200 shadow-xs text-gray-900' : 'bg-[#16171b] border-white/10 text-white'
          }`}
        >
          <span className="text-[10px] font-mono text-[#A38448] uppercase font-bold tracking-wider block">
            TRANSIT PROGRESSION
          </span>

          <div className="relative pl-6 space-y-6">
            {/* Vertical connector line */}
            <div className={`absolute left-2.5 top-2 bottom-4 w-0.5 ${isLight ? 'bg-gray-200' : 'bg-zinc-800'}`} />

            {statuses.map((st, idx) => {
              const isPast = idx < currentIdx;
              const isCurrent = idx === currentIdx;
              const isFuture = idx > currentIdx;

              return (
                <div key={st.label} className="relative flex items-start gap-3">
                  {/* Timeline node icon */}
                  <div
                    className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all ${
                      isPast
                        ? 'bg-[#C6A66B] border-[#C6A66B] text-black'
                        : isCurrent
                        ? isLight
                          ? 'bg-white border-[#C6A66B] text-[#A38448] ring-4 ring-[#C6A66B]/30'
                          : 'bg-black border-[#C6A66B] text-[#C6A66B] ring-4 ring-[#C6A66B]/20'
                        : isLight
                        ? 'bg-gray-100 border-gray-300 text-transparent'
                        : 'bg-zinc-900 border-zinc-700 text-transparent'
                    }`}
                  >
                    {isPast ? (
                      <Check className="w-3 h-3 stroke-[3]" />
                    ) : isCurrent ? (
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C6A66B]" />
                    ) : null}
                  </div>

                  {/* Step Info */}
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h4
                        className={`text-xs font-bold uppercase ${
                          isFuture
                            ? isLight
                              ? 'text-gray-400'
                              : 'text-zinc-500'
                            : isLight
                            ? 'text-gray-900'
                            : 'text-white'
                        }`}
                      >
                        {st.label}
                      </h4>
                      {isCurrent && (
                        <span className="px-1.5 py-0.2 rounded bg-[#C6A66B]/20 text-[#A38448] text-[8px] font-mono font-bold uppercase">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <p className={`text-[11px] ${isLight ? 'text-gray-600' : 'text-zinc-400'}`}>{st.desc}</p>
                    <span className={`text-[10px] font-mono block ${isLight ? 'text-gray-400' : 'text-zinc-500'}`}>
                      {st.date}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Status Simulation Selector */}
          <div className={`pt-3 border-t space-y-1.5 ${isLight ? 'border-gray-200' : 'border-white/10'}`}>
            <span className={`text-[9px] font-mono uppercase block ${isLight ? 'text-gray-500' : 'text-zinc-500'}`}>
              Test Simulator • Switch Live Status:
            </span>
            <div className="flex flex-wrap gap-1">
              {(['Order Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'] as OrderStatus[]).map(
                (statusChoice) => (
                  <button
                    key={statusChoice}
                    onClick={() => updateOrderStatus(currentOrder.id, statusChoice)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-mono transition-all ${
                      currentOrder.status === statusChoice
                        ? 'bg-[#C6A66B] text-black font-bold'
                        : isLight
                        ? 'bg-gray-100 text-gray-700 hover:text-black hover:bg-gray-200'
                        : 'bg-black/60 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {statusChoice}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* PURCHASED PRODUCTS LIST */}
        <div
          className={`p-4 rounded-3xl border space-y-3 transition-colors ${
            isLight ? 'bg-white border-gray-200 shadow-xs text-gray-900' : 'bg-[#16171b] border-white/10 text-white'
          }`}
        >
          <span className="text-[10px] font-mono text-[#A38448] uppercase font-bold tracking-wider block">
            ITEMS IN SHIPMENT ({currentOrder.items.length})
          </span>

          <div className="space-y-2">
            {currentOrder.items.map((item) => (
              <div
                key={item.id}
                className={`p-2.5 rounded-2xl border flex gap-3 items-center ${
                  isLight ? 'bg-gray-50 border-gray-200' : 'bg-black/40 border-white/5'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-xl object-cover bg-black"
                />
                <div className="flex-1 text-xs space-y-0.5">
                  <h4 className={`font-bold line-clamp-1 ${isLight ? 'text-gray-900' : 'text-white'}`}>{item.name}</h4>
                  <p className={`text-[10px] font-mono ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>
                    {item.size} • Qty {item.quantity}
                  </p>
                  {item.customizationDetails?.engraving && (
                    <span className="text-[9px] font-mono text-[#A38448] font-bold">
                      Laser: &quot;{item.customizationDetails.engraving}&quot;
                    </span>
                  )}
                </div>
                <span className={`text-xs font-mono font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* DELIVERY ADDRESS */}
        <div
          className={`p-4 rounded-3xl border space-y-2 text-xs transition-colors ${
            isLight ? 'bg-white border-gray-200 shadow-xs text-gray-900' : 'bg-[#16171b] border-white/10 text-white'
          }`}
        >
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#A38448] uppercase font-bold">
            <MapPin className="w-3.5 h-3.5" />
            <span>DESTINATION ADDRESS</span>
          </div>

          <div className={`space-y-0.5 font-sans ${isLight ? 'text-gray-600' : 'text-zinc-300'}`}>
            <p className={`font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>
              {currentOrder.shippingAddress.fullName}
            </p>
            <p>{currentOrder.shippingAddress.street}</p>
            <p>
              {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state}{' '}
              {currentOrder.shippingAddress.zip}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
