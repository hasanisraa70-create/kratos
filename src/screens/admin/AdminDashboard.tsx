import React, { useState } from 'react';
import { 
  Package, 
  ShoppingBag, 
  Users, 
  ShieldCheck, 
  ArrowLeft, 
  Search, 
  CheckCircle2, 
  TrendingUp, 
  Box, 
  DollarSign, 
  Clock, 
  Check, 
  X,
  Edit2,
  Sliders,
  RotateCcw,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../../components/common/BrandLogo';
import { OrderStatus, Product } from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    updateProduct,
    orders,
    updateOrderStatus,
    updateOrderPaymentStatus,
    setCurrentScreen,
    isStallMode,
    toggleStallMode,
    resetStallSession,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'overview'>('orders');
  const [orderSearch, setOrderSearch] = useState('');
  const [selectedProductToEdit, setSelectedProductToEdit] = useState<Product | null>(null);

  // Inventory matrix state
  const [inventory, setInventory] = useState([
    { id: '1', product: 'Kratos Apex Carbon Pro', size: 'US M 9.5 / W 11', stock: 24, threshold: 10 },
    { id: '2', product: 'Kratos Apex Sprint Insole', size: 'US M 10 / W 11.5', stock: 8, threshold: 10 },
    { id: '3', product: 'Kratos Court Stability Pro', size: 'US M 10.5 / W 12', stock: 15, threshold: 10 },
    { id: '4', product: 'Kratos Endurance Carbon', size: 'US M 9 / W 10.5', stock: 19, threshold: 10 },
    { id: '5', product: 'Kratos High-Arch Orthotic', size: 'US M 9.5 / W 11', stock: 30, threshold: 15 },
  ]);

  const handleAdjustStock = (id: string, delta: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, stock: Math.max(0, item.stock + delta) } : item
      )
    );
    showToast('Inventory level updated');
  };

  const filteredOrders = orders.filter((o) => {
    const q = orderSearch.toLowerCase();
    return (
      o.id.toLowerCase().includes(q) ||
      (o.customerInfo?.fullName && o.customerInfo.fullName.toLowerCase().includes(q)) ||
      (o.customerInfo?.phone && o.customerInfo.phone.includes(q))
    );
  });

  const totalStallRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const paidOrdersCount = orders.filter((o) => o.paymentStatus === 'Paid (Demo)' || o.paymentStatus === 'Paid').length;
  const pendingOrdersCount = orders.filter((o) => o.paymentStatus === 'Pending at Stall').length;

  const orderStages: OrderStatus[] = [
    'Order Received',
    'Order Confirmed',
    'In Production',
    'Ready / Dispatched',
    'Completed',
  ];

  return (
    <div className="min-h-screen bg-[#0e0f12] text-white flex flex-col font-sans">
      {/* TOP ADMIN HEADER */}
      <header className="bg-[#14151a] border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BrandLogo variant="gold" size="sm" showSubtitle={true} />
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-[#C6A66B]/20 text-[#C6A66B] text-[10px] font-mono font-bold uppercase">
            STALL STAFF CONSOLE
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Toggle Stall Mode */}
          <button
            onClick={toggleStallMode}
            className={`px-2.5 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all ${
              isStallMode
                ? 'bg-[#C6A66B] text-black border-[#C6A66B]'
                : 'bg-white/5 border-white/10 text-white'
            }`}
          >
            {isStallMode ? 'STALL MODE: ON' : 'STALL MODE: OFF'}
          </button>

          <button
            onClick={() => setCurrentScreen('home')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-semibold transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-[#C6A66B]" />
            <span>Return to App</span>
          </button>
        </div>
      </header>

      {/* DASHBOARD TABS */}
      <div className="bg-[#121316] border-b border-white/10 px-4 flex gap-2">
        {[
          { id: 'orders', label: 'Customer Orders', count: orders.length },
          { id: 'products', label: 'Products & Customizer', count: products.length },
          { id: 'overview', label: 'Stall Overview & Stock' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-3 px-3 text-xs font-bold uppercase tracking-wider border-b-2 -mb-[1px] transition-all flex items-center gap-1.5 ${
              activeTab === tab.id
                ? 'border-[#C6A66B] text-[#C6A66B]'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-white/10 text-white">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="p-4 space-y-4 flex-1 max-w-5xl mx-auto w-full">
        {/* TAB 1: CUSTOMER ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-bold uppercase text-white">
                  Stall Customer Orders & Production Queue
                </h2>
                <p className="text-xs text-zinc-400">
                  Update payment status, track customer specs, and advance production stages.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="Search order #, customer, phone..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#C6A66B]"
                />
              </div>
            </div>

            {/* Orders List */}
            <div className="space-y-3">
              {filteredOrders.length === 0 ? (
                <div className="p-8 text-center text-zinc-500 border border-white/5 rounded-2xl">
                  No orders match &quot;{orderSearch}&quot;
                </div>
              ) : (
                filteredOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 rounded-2xl bg-[#15161a] border border-white/10 space-y-3"
                  >
                    {/* Header Row */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-white/5">
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm font-mono font-black text-[#C6A66B]">
                          {ord.id}
                        </span>
                        <span className="text-xs font-bold text-white">
                          {ord.customerInfo?.fullName || ord.shippingAddress?.fullName || 'Booth Visitor'}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400">
                          {ord.customerInfo?.phone}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Payment Toggle */}
                        <button
                          onClick={() =>
                            updateOrderPaymentStatus(
                              ord.id,
                              ord.paymentStatus === 'Pending at Stall'
                                ? 'Paid (Demo)'
                                : 'Pending at Stall'
                            )
                          }
                          className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold transition-all ${
                            ord.paymentStatus === 'Paid (Demo)' || ord.paymentStatus === 'Paid'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          }`}
                          title="Click to toggle payment status"
                        >
                          {ord.paymentStatus || 'Paid (Demo)'} ⇄
                        </button>

                        <span className="text-xs font-mono font-black text-white">
                          ${ord.total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Insole Specs Breakdown */}
                    <div className="text-xs font-mono text-zinc-300 space-y-1">
                      <div className="font-bold text-white">
                        {ord.items[0]?.name || 'Custom Insole'} (Size: {ord.items[0]?.size || 'US 9.5'})
                      </div>
                      {ord.items[0]?.customizationDetails && (
                        <div className="flex flex-wrap gap-1.5 text-[10px]">
                          {ord.items[0].customizationDetails.arch && (
                            <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/10">
                              Arch: {ord.items[0].customizationDetails.arch}
                            </span>
                          )}
                          {ord.items[0].customizationDetails.flex && (
                            <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/10">
                              Stiffness: {ord.items[0].customizationDetails.flex}
                            </span>
                          )}
                          {ord.items[0].customizationDetails.width && (
                            <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/10">
                              Width: {ord.items[0].customizationDetails.width}
                            </span>
                          )}
                          {ord.items[0].customizationDetails.engraving && (
                            <span className="px-2 py-0.5 rounded bg-[#C6A66B]/20 text-[#C6A66B] font-bold border border-[#C6A66B]/40">
                              Laser Engrave: &quot;{ord.items[0].customizationDetails.engraving}&quot;
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* 5-Stage Status Action Stepper */}
                    <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[10px] font-mono uppercase text-zinc-400">
                        Production Status: <strong className="text-[#C6A66B]">{ord.status}</strong>
                      </span>

                      {/* Advance Stage Buttons */}
                      <div className="flex gap-1 overflow-x-auto">
                        {orderStages.map((stage) => {
                          const isActive = ord.status === stage;
                          return (
                            <button
                              key={stage}
                              onClick={() => updateOrderStatus(ord.id, stage)}
                              className={`px-2 py-1 rounded-lg text-[9px] font-mono font-bold uppercase transition-all ${
                                isActive
                                  ? 'bg-[#C6A66B] text-black shadow-sm'
                                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                              }`}
                            >
                              {stage}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCT MANAGEMENT & CUSTOMIZATION CONTROLS */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-bold uppercase text-white">
                Insole Models & Customization Config
              </h2>
              <p className="text-xs text-zinc-400">
                Configure prices, availability, and enable or disable individual customization options.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {products.map((p) => {
                const cfg = p.customizationConfig || {
                  allowArchProfile: true,
                  allowFootWidth: true,
                  allowStiffness: true,
                  allowTopCover: true,
                  allowCushioning: true,
                  allowLaserEngraving: true,
                };

                return (
                  <div
                    key={p.id}
                    className="p-4 rounded-2xl bg-[#15161a] border border-white/10 space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1">
                        <span className="text-[8px] font-mono px-1.5 py-0.2 rounded bg-[#C6A66B]/20 text-[#C6A66B] font-bold uppercase">
                          {p.tag}
                        </span>
                        <h3 className="text-xs font-bold uppercase text-white mt-0.5">
                          {p.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-mono font-black text-[#C6A66B]">
                            ${p.price.toFixed(2)}
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400 font-bold">
                            {p.availability || 'In Stock'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Customization Options Toggle Switches */}
                    <div className="pt-2 border-t border-white/5 space-y-1.5 text-xs">
                      <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">
                        Enabled Customizer Options for this insole:
                      </span>

                      <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
                        {[
                          { key: 'allowArchProfile', label: 'Arch Profile' },
                          { key: 'allowFootWidth', label: 'Foot Width' },
                          { key: 'allowStiffness', label: 'Carbon Stiffness' },
                          { key: 'allowTopCover', label: 'Top Cover Fabric' },
                          { key: 'allowCushioning', label: 'Cushioning Foam' },
                          { key: 'allowLaserEngraving', label: 'Laser Engraving' },
                        ].map((opt) => {
                          const isEnabled = (cfg as any)[opt.key];
                          return (
                            <button
                              key={opt.key}
                              onClick={() => {
                                updateProduct(p.id, {
                                  customizationConfig: {
                                    ...cfg,
                                    [opt.key]: !isEnabled,
                                  },
                                });
                              }}
                              className={`p-1.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                                isEnabled
                                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                                  : 'bg-white/5 border-white/10 text-zinc-500 line-through'
                              }`}
                            >
                              <span>{opt.label}</span>
                              <span className="text-[9px] font-bold">
                                {isEnabled ? 'ON' : 'OFF'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: STALL OVERVIEW & INVENTORY */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#15161a] border border-white/10 space-y-1">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">
                  Total Stall Revenue
                </span>
                <div className="text-xl font-black font-mono text-[#C6A66B]">
                  ${totalStallRevenue.toFixed(2)}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#15161a] border border-white/10 space-y-1">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">
                  Total Orders
                </span>
                <div className="text-xl font-black font-mono text-white">
                  {orders.length}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#15161a] border border-white/10 space-y-1">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">
                  Paid / Confirmed
                </span>
                <div className="text-xl font-black font-mono text-emerald-400">
                  {paidOrdersCount}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#15161a] border border-white/10 space-y-1">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">
                  Pending at Counter
                </span>
                <div className="text-xl font-black font-mono text-amber-400">
                  {pendingOrdersCount}
                </div>
              </div>
            </div>

            {/* Stall Inventory Matrix */}
            <div className="p-4 rounded-2xl bg-[#15161a] border border-white/10 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h3 className="text-xs font-bold uppercase text-white">
                  Stall Inventory Matrix
                </h3>
                <span className="text-[10px] font-mono text-zinc-400">
                  Live Counter Stock
                </span>
              </div>

              <div className="space-y-2">
                {inventory.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-white">{item.product}</p>
                      <p className="text-[10px] font-mono text-zinc-400">{item.size}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-mono font-bold ${
                          item.stock < item.threshold ? 'text-amber-400' : 'text-emerald-400'
                        }`}
                      >
                        {item.stock} in stock
                      </span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleAdjustStock(item.id, -1)}
                          className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center text-xs"
                        >
                          -
                        </button>
                        <button
                          onClick={() => handleAdjustStock(item.id, 1)}
                          className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
