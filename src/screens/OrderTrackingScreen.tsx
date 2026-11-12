import React from 'react';
import { 
  ArrowLeft, 
  Package, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Check, 
  ShieldCheck,
  AlertCircle,
  RotateCcw,
  ShoppingBag
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OrderStatus } from '../types';

export const OrderTrackingScreen: React.FC = () => {
  const { orders, activeOrder, setActiveOrder, setCurrentScreen, theme } = useApp();
  const isLight = theme === 'light';

  const currentOrder = activeOrder || orders[0];

  // The 5 required order stages
  const orderStages: { stage: OrderStatus; title: string; desc: string }[] = [
    {
      stage: 'Order Received',
      title: '1. Order Received',
      desc: 'Order registered at Kratos Stall Counter',
    },
    {
      stage: 'Order Confirmed',
      title: '2. Order Confirmed',
      desc: 'Biomechanical sizing & specifications validated',
    },
    {
      stage: 'In Production',
      title: '3. In Production',
      desc: '3K Carbon plate calibrated & heel laser etched',
    },
    {
      stage: 'Ready / Dispatched',
      title: '4. Ready / Dispatched',
      desc: 'Finished insole ready for collection at Stall 4B',
    },
    {
      stage: 'Completed',
      title: '5. Completed',
      desc: 'Handed to athlete with 6-month fit guarantee',
    },
  ];

  const getStageIndex = (st?: OrderStatus) => {
    if (!st) return 0;
    // Map any legacy or current statuses to the 5 stages
    if (st === 'Order Received' || st === 'Order Placed') return 0;
    if (st === 'Order Confirmed') return 1;
    if (st === 'In Production' || st === 'Processing') return 2;
    if (st === 'Ready / Dispatched' || st === 'Shipped' || st === 'Out for Delivery') return 3;
    if (st === 'Completed' || st === 'Delivered') return 4;
    return 0;
  };

  const currentStageIdx = getStageIndex(currentOrder?.status);

  if (!currentOrder) {
    return (
      <div
        className={`flex-1 flex flex-col items-center justify-center p-6 text-center transition-colors ${
          isLight ? 'bg-[#F9FAFB] text-gray-900' : 'bg-[#101010] text-white'
        }`}
      >
        <Package className="w-12 h-12 text-zinc-400 mb-3" />
        <h2 className="text-sm font-bold">No orders found</h2>
        <p className={`text-xs mt-1 ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>
          Select an insole or configure a custom build to place a stall order.
        </p>
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
          onClick={() => setCurrentScreen('home')}
          className={`p-1 rounded-full transition-colors ${
            isLight ? 'text-gray-600 hover:text-black hover:bg-gray-100' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <span className={`text-xs font-mono font-bold uppercase tracking-wider ${isLight ? 'text-gray-900' : 'text-white'}`}>
          STALL ORDERS & STATUS
        </span>

        <span className="text-[10px] font-mono text-[#A38448] font-bold">
          BOOTH 4B
        </span>
      </div>

      <div className="px-4 py-4 space-y-4 flex-1">
        {/* Prototype Notice */}
        <div
          className={`p-2.5 rounded-xl border flex items-center gap-2 text-[10px] transition-colors ${
            isLight
              ? 'bg-amber-50/70 border-amber-200 text-amber-900'
              : 'bg-amber-950/20 border-amber-500/20 text-amber-300'
          }`}
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#C6A66B]" />
          <span>
            <strong>Prototype Order Tracker:</strong> Sample exhibition orders for booth showcase. Status updates can be toggled in the Staff Portal.
          </span>
        </div>

        {/* ORDER SWITCHER PILLS (If multiple orders exist) */}
        {orders.length > 1 && (
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase text-gray-500 font-bold block">
              Recent Booth Orders:
            </span>
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5">
              {orders.map((ord) => {
                const isSelected = ord.id === currentOrder.id;
                return (
                  <button
                    key={ord.id}
                    onClick={() => setActiveOrder(ord)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all border ${
                      isSelected
                        ? 'bg-[#C6A66B] text-black border-[#C6A66B] shadow-sm'
                        : isLight
                        ? 'bg-white border-gray-200 text-gray-700'
                        : 'bg-white/5 border-white/10 text-zinc-300'
                    }`}
                  >
                    {ord.id}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ACTIVE ORDER TICKET CARD */}
        <div
          className={`p-4 rounded-3xl border space-y-4 shadow-sm transition-colors ${
            isLight ? 'bg-white border-gray-200' : 'bg-[#15161a] border-white/10'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <span className="text-[10px] font-mono text-gray-500 uppercase block">
                ORDER REFERENCE NUMBER
              </span>
              <span className="text-base font-mono font-black text-[#A38448]">
                {currentOrder.id}
              </span>
            </div>

            <span
              className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                currentOrder.paymentStatus === 'Paid (Demo)' || currentOrder.paymentStatus === 'Paid'
                  ? 'bg-emerald-500/15 text-emerald-600 border border-emerald-500/30'
                  : 'bg-amber-500/15 text-amber-600 border border-amber-500/30'
              }`}
            >
              {currentOrder.paymentStatus || 'Paid (Demo)'}
            </span>
          </div>

          {/* ITEM DETAILS */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-start">
              <div>
                <h3 className={`font-bold uppercase ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  {currentOrder.items[0]?.name || 'Kratos Custom Insole'}
                </h3>
                <p className={`text-[10px] font-mono ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>
                  Size: {currentOrder.items[0]?.size || 'US M 9.5'} • {currentOrder.items[0]?.colorName || 'Stealth Gold'}
                </p>

                {currentOrder.items[0]?.customizationDetails && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {currentOrder.items[0].customizationDetails.arch && (
                      <span className="px-1.5 py-0.2 rounded text-[8px] font-mono bg-black/5 text-[#A38448] font-bold">
                        {currentOrder.items[0].customizationDetails.arch}
                      </span>
                    )}
                    {currentOrder.items[0].customizationDetails.flex && (
                      <span className="px-1.5 py-0.2 rounded text-[8px] font-mono bg-black/5 text-[#A38448] font-bold">
                        {currentOrder.items[0].customizationDetails.flex}
                      </span>
                    )}
                    {currentOrder.items[0].customizationDetails.engraving && (
                      <span className="px-1.5 py-0.2 rounded text-[8px] font-mono bg-[#C6A66B]/20 text-[#A38448] font-bold">
                        &quot;{currentOrder.items[0].customizationDetails.engraving}&quot;
                      </span>
                    )}
                  </div>
                )}
              </div>

              <span className="font-mono font-black text-sm text-[#A38448]">
                ${currentOrder.total.toFixed(2)}
              </span>
            </div>

            <div className="pt-2 border-t border-gray-100 flex justify-between text-[11px] font-mono text-gray-500">
              <span>Order Date: {currentOrder.date}</span>
              <span>Pickup: Kratos Stall Booth 4B</span>
            </div>
          </div>
        </div>

        {/* 5-STAGE PRODUCTION STATUS TIMELINE */}
        <div
          className={`p-4 rounded-3xl border space-y-4 shadow-sm transition-colors ${
            isLight ? 'bg-white border-gray-200' : 'bg-[#15161a] border-white/10'
          }`}
        >
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#A38448]">
              CURRENT PRODUCTION STAGE
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#C6A66B]/20 text-[#A38448] font-bold">
              STAGE {currentStageIdx + 1} OF 5
            </span>
          </div>

          <div className="space-y-4">
            {orderStages.map((st, idx) => {
              const isPast = idx < currentStageIdx;
              const isCurrent = idx === currentStageIdx;
              const isFuture = idx > currentStageIdx;

              return (
                <div key={st.stage} className="flex gap-3 relative">
                  {/* Connecting Line */}
                  {idx < orderStages.length - 1 && (
                    <div
                      className={`absolute left-[13px] top-[26px] w-[2px] h-[calc(100%+2px)] ${
                        isPast
                          ? 'bg-[#C6A66B]'
                          : isLight
                          ? 'bg-gray-200'
                          : 'bg-zinc-800'
                      }`}
                    />
                  )}

                  {/* Indicator Icon */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${
                      isPast
                        ? 'bg-[#C6A66B] text-black shadow-sm'
                        : isCurrent
                        ? 'bg-[#C6A66B] text-black ring-4 ring-[#C6A66B]/20'
                        : isLight
                        ? 'bg-gray-100 text-gray-400'
                        : 'bg-zinc-800 text-zinc-500'
                    }`}
                  >
                    {isPast ? (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    ) : isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-black animate-ping" />
                    ) : (
                      <span className="text-[10px] font-mono font-bold">{idx + 1}</span>
                    )}
                  </div>

                  {/* Text Details */}
                  <div className="flex-1 pb-1">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-xs font-bold uppercase ${
                          isCurrent
                            ? 'text-[#A38448]'
                            : isPast
                            ? isLight ? 'text-gray-900' : 'text-white'
                            : isLight ? 'text-gray-400' : 'text-zinc-600'
                        }`}
                      >
                        {st.title}
                      </h4>
                      {isCurrent && (
                        <span className="text-[9px] font-mono text-emerald-600 font-bold">
                          ACTIVE NOW
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-[11px] leading-tight mt-0.5 ${
                        isCurrent || isPast
                          ? isLight ? 'text-gray-600' : 'text-zinc-300'
                          : isLight ? 'text-gray-400' : 'text-zinc-600'
                      }`}
                    >
                      {st.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM ACTION BUTTONS */}
        <div className="space-y-2 pt-2">
          <button
            onClick={() => setCurrentScreen('shop')}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#C6A66B] hover:bg-[#D4B579] text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-98 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>EXPLORE MORE INSOLES</span>
          </button>
        </div>
      </div>
    </div>
  );
};
