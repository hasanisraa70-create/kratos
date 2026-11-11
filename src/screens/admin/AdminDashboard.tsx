import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  ShieldCheck, 
  BarChart3, 
  ArrowLeft, 
  Search, 
  Plus, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Box, 
  DollarSign, 
  Clock, 
  Layers, 
  RotateCw, 
  Eye, 
  Download,
  Check,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../../components/common/BrandLogo';
import { PRODUCTS } from '../../data/mockData';
import { OrderStatus } from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    orders,
    warranties,
    updateOrderStatus,
    setViewMode,
    setCurrentScreen,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'products' | 'orders' | 'inventory' | 'customers' | 'warranty' | 'analytics'
  >('orders');

  const [orderSearch, setOrderSearch] = useState('');
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  // Sample inventory matrix
  const [inventory, setInventory] = useState([
    { id: '1', product: 'Kratos Carbon Fiber Performance', size: 'US M 8 / W 9.5', stock: 45, threshold: 20 },
    { id: '2', product: 'Kratos Carbon Fiber Performance', size: 'US M 9 / W 10.5', stock: 12, threshold: 15 }, // LOW STOCK
    { id: '3', product: 'Kratos Carbon Fiber Performance', size: 'US M 9.5 / W 11', stock: 8, threshold: 15 }, // LOW STOCK
    { id: '4', product: 'Kratos Carbon Fiber Performance', size: 'US M 10 / W 11.5', stock: 32, threshold: 20 },
    { id: '5', product: 'Kratos High-Arch Support Insole', size: 'US M 9 / W 10.5', stock: 64, threshold: 20 },
    { id: '6', product: 'Kratos High-Arch Support Insole', size: 'US M 10 / W 11.5', stock: 5, threshold: 15 }, // LOW STOCK
    { id: '7', product: 'Kratos Apex Sprint Carbon', size: 'US M 9.5 / W 11', stock: 18, threshold: 10 },
  ]);

  const handleAdjustStock = (id: string, delta: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, stock: Math.max(0, item.stock + delta) } : item
      )
    );
    showToast('Inventory level updated');
  };

  const filteredOrders = orders.filter((o) =>
    o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.shippingAddress.fullName.toLowerCase().includes(orderSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0e0f12] text-white flex flex-col font-sans">
      {/* TOP ADMIN HEADER */}
      <header className="bg-[#14151a] border-b border-white/10 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BrandLogo variant="gold" size="sm" showSubtitle={true} />
          <span className="hidden md:inline-block px-2 py-0.5 rounded-full bg-[#C6A66B]/20 text-[#C6A66B] text-[10px] font-mono font-bold uppercase">
            ENTERPRISE CONSOLE
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>PRODUCTION CLUSTER // US-WEST</span>
          </div>

          <button
            onClick={() => {
              setViewMode('mobile-frame');
              setCurrentScreen('home');
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-semibold transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-[#C6A66B]" />
            <span>Return To Mobile App</span>
          </button>
        </div>
      </header>

      {/* DASHBOARD KPI OVERVIEW METRICS */}
      <div className="px-6 pt-6 pb-2">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
          <div className="p-4 rounded-2xl bg-[#14151a] border border-white/10 space-y-1">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">
              Total Revenue
            </span>
            <div className="text-xl font-black font-mono text-white">
              $148,920.00
            </div>
            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +18.4% this month
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#14151a] border border-white/10 space-y-1">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">
              Total Orders
            </span>
            <div className="text-xl font-black font-mono text-white">
              1,842
            </div>
            <span className="text-[10px] font-mono text-emerald-400">
              +12.1% fulfillment rate
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#14151a] border border-white/10 space-y-1">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">
              Active Athletes
            </span>
            <div className="text-xl font-black font-mono text-white">
              1,290
            </div>
            <span className="text-[10px] font-mono text-[#C6A66B]">
              84% verified runners
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#14151a] border border-white/10 space-y-1">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">
              Insoles Manufactured
            </span>
            <div className="text-xl font-black font-mono text-white">
              2,410
            </div>
            <span className="text-[10px] font-mono text-zinc-400">
              3K Prepreg Carbon
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#14151a] border border-white/10 space-y-1 col-span-2 md:col-span-1">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">
              Pending Orders
            </span>
            <div className="text-xl font-black font-mono text-amber-400">
              {orders.filter((o) => o.status === 'Order Placed' || o.status === 'Processing').length + 8}
            </div>
            <span className="text-[10px] font-mono text-amber-400">
              Awaiting laser etching
            </span>
          </div>
        </div>
      </div>

      {/* MODULE NAVIGATION TABS */}
      <div className="px-6 pt-4">
        <div className="flex border-b border-white/10 overflow-x-auto no-scrollbar gap-2">
          {[
            { id: 'orders', label: 'Order Management', icon: ShoppingBag, count: orders.length },
            { id: 'products', label: 'Product Management', icon: Package, count: PRODUCTS.length },
            { id: 'inventory', label: 'Inventory & Sizes', icon: Layers, count: inventory.length },
            { id: 'warranty', label: 'Warranty & Claims', icon: ShieldCheck, count: warranties.length },
            { id: 'customers', label: 'Athlete Profiles', icon: Users, count: '1.2k' },
            { id: 'analytics', label: 'Analytics & Sales', icon: BarChart3 },
          ].map((m) => {
            const Icon = m.icon;
            const isActive = activeTab === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setActiveTab(m.id as any)}
                className={`py-3 px-4 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 -mb-[2px] transition-all whitespace-nowrap ${
                  isActive
                    ? 'border-[#C6A66B] text-[#C6A66B]'
                    : 'border-transparent text-zinc-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{m.label}</span>
                {m.count !== undefined && (
                  <span className="px-1.5 py-0.2 rounded bg-white/10 text-[10px]">
                    {m.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB CONTENT MODULES */}
      <main className="flex-1 px-6 py-6 overflow-y-auto">
        {/* MODULE 1: ORDER MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="text-base font-bold text-white">Active Production & Dispatch Orders</h3>
                <p className="text-xs text-zinc-400">
                  Manage custom carbon calibration, laser engravings, and shipment status.
                </p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="Search by Order ID or Athlete..."
                  className="w-full bg-[#14151a] border border-white/15 rounded-xl py-2 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-[#C6A66B]"
                />
              </div>
            </div>

            <div className="rounded-2xl bg-[#14151a] border border-white/10 overflow-hidden shadow-xl">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-black/60 text-zinc-400 font-mono text-[11px] border-b border-white/10">
                  <tr>
                    <th className="py-3 px-4">ORDER ID</th>
                    <th className="py-3 px-4">ATHLETE / DESTINATION</th>
                    <th className="py-3 px-4">CUSTOM SPECIFICATIONS</th>
                    <th className="py-3 px-4">TOTAL</th>
                    <th className="py-3 px-4">FULFILLMENT STATUS</th>
                    <th className="py-3 px-4 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-zinc-300">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#C6A66B]">
                        #{ord.id}
                        <span className="text-[10px] text-zinc-500 block font-normal font-sans">
                          {ord.date}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white">
                          {ord.shippingAddress.fullName}
                        </div>
                        <div className="text-[11px] text-zinc-400">
                          {ord.shippingAddress.city}, {ord.shippingAddress.state}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        {ord.items.map((item, idx) => (
                          <div key={idx} className="space-y-0.5">
                            <span className="font-semibold text-white">
                              {item.name} ({item.size})
                            </span>
                            {item.customizationDetails?.engraving && (
                              <span className="inline-block px-1.5 py-0.2 rounded bg-[#C6A66B]/20 text-[#C6A66B] text-[9px] font-mono font-bold ml-1">
                                Laser: &quot;{item.customizationDetails.engraving}&quot;
                              </span>
                            )}
                          </div>
                        ))}
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold text-white">
                        ${ord.total.toFixed(2)}
                      </td>

                      <td className="py-3.5 px-4">
                        <select
                          value={ord.status}
                          onChange={(e) =>
                            updateOrderStatus(ord.id, e.target.value as OrderStatus)
                          }
                          className="bg-black/60 border border-white/20 text-[#C6A66B] font-mono text-[11px] font-bold rounded-lg px-2.5 py-1 focus:outline-none focus:border-[#C6A66B]"
                        >
                          <option value="Order Placed">Order Placed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => showToast(`Invoice sent for Order #${ord.id}`)}
                          className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-[10px] font-mono text-zinc-300"
                        >
                          Invoice
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODULE 2: PRODUCT MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-white">Kratos Insole Catalog & 3D Assets</h3>
                <p className="text-xs text-zinc-400">
                  Manage carbon composite specifications, glTF/GLB models, pricing, and colorways.
                </p>
              </div>

              <button
                onClick={() => setShowAddProductModal(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C6A66B] text-black font-extrabold text-xs uppercase"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add New Insole</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {PRODUCTS.map((p) => (
                <div
                  key={p.id}
                  className="rounded-2xl bg-[#14151a] border border-white/10 overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative h-44 bg-black">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover filter brightness-90"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[#C6A66B] text-[9px] font-mono font-bold uppercase">
                      {p.tag}
                    </span>
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[9px] font-mono font-bold uppercase flex items-center gap-1">
                      <Box className="w-3 h-3" /> 3D READY
                    </span>
                  </div>

                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-white line-clamp-1">{p.name}</h4>
                      <p className="text-xs text-zinc-400 line-clamp-2 mt-0.5">{p.subtitle}</p>
                    </div>

                    <div className="space-y-1 pt-2 border-t border-white/10 text-xs">
                      <div className="flex justify-between">
                        <span className="text-zinc-500 font-mono">Price:</span>
                        <span className="font-mono font-bold text-white">${p.price.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500 font-mono">Sizes:</span>
                        <span className="font-mono text-zinc-300">{p.sizes.length} Options</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500 font-mono">Colorways:</span>
                        <span className="font-mono text-zinc-300">{p.colorways.length} Finishes</span>
                      </div>
                    </div>

                    <div className="pt-2 flex gap-2">
                      <button
                        onClick={() => showToast(`Edit modal opened for ${p.name}`)}
                        className="flex-1 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-white"
                      >
                        Edit Specs
                      </button>
                      <button
                        onClick={() => showToast(`3D GLB Asset inspected for ${p.name}`)}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#C6A66B]"
                        title="Inspect 3D Geometry"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULE 3: INVENTORY MANAGEMENT */}
        {activeTab === 'inventory' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-white">Size-by-Size Inventory Matrix</h3>
                <p className="text-xs text-zinc-400">
                  Track stock levels across US shoe sizes with automated low-stock warnings.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-[#14151a] border border-white/10 overflow-hidden shadow-xl">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-black/60 text-zinc-400 font-mono text-[11px] border-b border-white/10">
                  <tr>
                    <th className="py-3 px-4">PRODUCT VARIANT</th>
                    <th className="py-3 px-4">SIZE SPECIFICATION</th>
                    <th className="py-3 px-4">CURRENT ON-HAND STOCK</th>
                    <th className="py-3 px-4">STATUS</th>
                    <th className="py-3 px-4 text-right">QUICK ADJUST</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-zinc-300">
                  {inventory.map((item) => {
                    const isLow = item.stock <= item.threshold;
                    return (
                      <tr key={item.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 font-bold text-white">
                          {item.product}
                        </td>
                        <td className="py-3 px-4 font-mono text-[#C6A66B]">
                          {item.size}
                        </td>
                        <td className="py-3 px-4 font-mono font-black text-white text-sm">
                          {item.stock} units
                        </td>
                        <td className="py-3 px-4">
                          {isLow ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-mono text-[10px] font-bold">
                              <AlertTriangle className="w-3 h-3" /> LOW STOCK ALERT
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                              <CheckCircle2 className="w-3 h-3" /> HEALTHY SUPPLY
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right space-x-1">
                          <button
                            onClick={() => handleAdjustStock(item.id, -5)}
                            className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 font-mono text-xs"
                          >
                            -5
                          </button>
                          <button
                            onClick={() => handleAdjustStock(item.id, +25)}
                            className="px-2 py-1 rounded bg-[#C6A66B]/20 text-[#C6A66B] font-mono text-xs font-bold hover:bg-[#C6A66B]/30"
                          >
                            +25 Restock
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODULE 4: WARRANTY MANAGEMENT */}
        {activeTab === 'warranty' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-white">Registered 6-Month Warranties & Serial Claims</h3>
              <p className="text-xs text-zinc-400">
                Verify purchased carbon plates and process athlete performance guarantee claims.
              </p>
            </div>

            <div className="rounded-2xl bg-[#14151a] border border-white/10 overflow-hidden shadow-xl">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-black/60 text-zinc-400 font-mono text-[11px] border-b border-white/10">
                  <tr>
                    <th className="py-3 px-4">WARRANTY ID</th>
                    <th className="py-3 px-4">ATHLETE NAME & EMAIL</th>
                    <th className="py-3 px-4">SERIAL NUMBER</th>
                    <th className="py-3 px-4">PRODUCT / RETAILER</th>
                    <th className="py-3 px-4">EXPIRY</th>
                    <th className="py-3 px-4">STATUS</th>
                    <th className="py-3 px-4 text-right">CLAIM VERIFICATION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-zinc-300">
                  {warranties.map((w) => (
                    <tr key={w.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#C6A66B]">
                        {w.id}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-white">{w.customerName}</div>
                        <div className="text-[10px] text-zinc-400">{w.email}</div>
                      </td>
                      <td className="py-3 px-4 font-mono text-zinc-200">
                        {w.serialNumber}
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-white line-clamp-1">{w.productType}</div>
                        <div className="text-[10px] text-zinc-400">{w.retailer}</div>
                      </td>
                      <td className="py-3 px-4 font-mono text-emerald-400">
                        {w.expiryDate}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                          {w.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => showToast(`Serial ${w.serialNumber} verified with manufacturing batch`)}
                          className="px-2.5 py-1 rounded bg-[#C6A66B]/20 text-[#C6A66B] font-mono text-[10px] font-bold hover:bg-[#C6A66B]/30"
                        >
                          Verify Serial
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODULE 5: CUSTOMER PROFILES */}
        {activeTab === 'customers' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-white">Athlete Database & Fitting Profiles</h3>
              <p className="text-xs text-zinc-400">
                Customer purchase histories, lifetime values, and biomechanical arch preferences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'Marcus Vance', email: 'marcus.vance@athlete.com', spend: '$212.00', orders: 2, sport: 'Marathon / Distance', tier: 'Kratos Pro Elite' },
                { name: 'Elena Rostova', email: 'elena.r@tennis.org', spend: '$178.00', orders: 2, sport: 'D1 Hardcourt Tennis', tier: 'Ambassador' },
                { name: 'David Kim', email: 'david.kim@runner.com', spend: '$99.00', orders: 1, sport: 'Track & Sprint', tier: 'Member' },
              ].map((cust) => (
                <div key={cust.email} className="p-4 rounded-2xl bg-[#14151a] border border-white/10 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-white">{cust.name}</h4>
                      <p className="text-[11px] text-zinc-400">{cust.email}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#C6A66B]/20 text-[#C6A66B] text-[9px] font-mono font-bold uppercase">
                      {cust.tier}
                    </span>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-white/10 text-xs font-mono">
                    <div className="flex justify-between text-zinc-400">
                      <span>Lifetime Spend:</span>
                      <span className="text-white font-bold">{cust.spend}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Total Orders:</span>
                      <span className="text-white">{cust.orders} Orders</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Primary Sport:</span>
                      <span className="text-[#C6A66B]">{cust.sport}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULE 6: ANALYTICS & SALES CHARTS */}
        {activeTab === 'analytics' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-base font-bold text-white">Sales & Performance Analytics</h3>
              <p className="text-xs text-zinc-400">
                Revenue trajectories, sport discipline distribution, and unit velocities.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Revenue Trend Visualizer */}
              <div className="lg:col-span-2 p-5 rounded-3xl bg-[#14151a] border border-white/10 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono font-bold text-[#C6A66B] uppercase">
                    MONTHLY REVENUE ($K)
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">2026 FISCAL YEAR</span>
                </div>

                {/* Styled SVG Bar Chart */}
                <div className="h-44 flex items-end justify-between gap-3 pt-6 px-2">
                  {[
                    { month: 'Jun', val: 65, h: '45%' },
                    { month: 'Jul', val: 82, h: '55%' },
                    { month: 'Aug', val: 94, h: '65%' },
                    { month: 'Sep', val: 110, h: '75%' },
                    { month: 'Oct', val: 132, h: '88%' },
                    { month: 'Nov', val: 148, h: '100%' },
                  ].map((bar) => (
                    <div key={bar.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                      <span className="text-[10px] font-mono text-[#C6A66B] font-bold">
                        ${bar.val}k
                      </span>
                      <div
                        className="w-full rounded-t-xl bg-gradient-to-t from-[#C6A66B]/50 to-[#C6A66B] hover:brightness-125 transition-all"
                        style={{ height: bar.h }}
                      />
                      <span className="text-[10px] font-mono text-zinc-400">
                        {bar.month}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sales by Sport Discipline */}
              <div className="p-5 rounded-3xl bg-[#14151a] border border-white/10 space-y-4">
                <span className="text-xs font-mono font-bold text-[#C6A66B] uppercase block">
                  SALES BY DISCIPLINE
                </span>

                <div className="space-y-3">
                  {[
                    { sport: 'Running & Marathon', share: 38, color: 'bg-[#C6A66B]' },
                    { sport: 'Basketball & Court', share: 24, color: 'bg-amber-400' },
                    { sport: 'Tennis & Hardcourt', share: 18, color: 'bg-emerald-400' },
                    { sport: 'Gym & Cross-Training', share: 12, color: 'bg-blue-400' },
                    { sport: 'Walking & Hiking', share: 8, color: 'bg-purple-400' },
                  ].map((item) => (
                    <div key={item.sport} className="space-y-1 text-xs">
                      <div className="flex justify-between font-mono">
                        <span className="text-zinc-300">{item.sport}</span>
                        <span className="text-white font-bold">{item.share}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color}`}
                          style={{ width: `${item.share}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-[#16171b] border border-white/15 p-6 space-y-4 text-white shadow-2xl">
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <span className="text-xs font-mono font-bold text-[#C6A66B] uppercase">
                ADD NEW PERFORMANCE INSOLE
              </span>
              <button
                onClick={() => setShowAddProductModal(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <label className="text-zinc-400 block mb-1">Product Title</label>
                <input
                  type="text"
                  placeholder="e.g. Kratos Aero Elite Carbon"
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-zinc-400 block mb-1">Base Price ($)</label>
                  <input
                    type="number"
                    defaultValue={89}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Category</label>
                  <select className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white">
                    <option>Carbon Fiber</option>
                    <option>Non-Carbon</option>
                    <option>High Arch</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">3D Model File (.GLB / .glTF)</label>
                <div className="border border-dashed border-white/20 rounded-xl p-3 text-center text-zinc-400">
                  <Box className="w-5 h-5 mx-auto text-[#C6A66B] mb-1" />
                  <span>Drop 3D glTF model asset here</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                showToast('Product added to Kratos catalog');
                setShowAddProductModal(false);
              }}
              className="w-full py-3 rounded-xl bg-[#C6A66B] text-black font-extrabold text-xs uppercase"
            >
              SAVE PRODUCT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
