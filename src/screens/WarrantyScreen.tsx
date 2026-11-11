import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Upload, 
  CheckCircle2, 
  QrCode, 
  Sparkles, 
  Calendar, 
  FileText, 
  Check, 
  Clock 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WarrantyRegistration } from '../types';

export const WarrantyScreen: React.FC = () => {
  const { warranties, registerWarranty, setCurrentScreen, showToast, theme } = useApp();
  const isLight = theme === 'light';

  const [customerName, setCustomerName] = useState('Marcus Vance');
  const [email, setEmail] = useState('marcus.vance@athlete.com');
  const [productType, setProductType] = useState('Kratos Carbon Fiber Performance Insole');
  const [serialNumber, setSerialNumber] = useState('KRT-3K-98421-PRO');
  const [purchaseDate, setPurchaseDate] = useState('2026-11-01');
  const [retailer, setRetailer] = useState('Kratos Official Store');
  const [receiptName, setReceiptName] = useState<string | null>('kratos_receipt_official.pdf');
  const [newlyRegistered, setNewlyRegistered] = useState<WarrantyRegistration | null>(null);

  const handleGenerateSerial = () => {
    const randomSerial = `KRT-3K-${Math.floor(10000 + Math.random() * 90000)}-PRO`;
    setSerialNumber(randomSerial);
    showToast('Sample serial generated');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !email || !serialNumber) {
      showToast('Please complete all required registration fields', 'info');
      return;
    }

    const reg = registerWarranty({
      customerName,
      email,
      productType,
      serialNumber,
      purchaseDate,
      retailer,
      receiptName: receiptName || undefined,
    });

    setNewlyRegistered(reg);
  };

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
          WARRANTY & REGISTRATION
        </span>

        <ShieldCheck className="w-5 h-5 text-[#A38448]" />
      </div>

      <div className="px-4 py-4 space-y-5 flex-1">
        {/* BANNER: 6-MONTH LIMITED PERFORMANCE GUARANTEE */}
        <div
          className={`p-4 rounded-3xl border space-y-2 transition-colors ${
            isLight
              ? 'bg-[#FFFDF7] border-[#C6A66B]/40 text-gray-900 shadow-xs'
              : 'bg-gradient-to-r from-[#1c1d22] to-[#121316] border-[#C6A66B]/30 text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#C6A66B]/20 text-[#A38448] text-[9px] font-mono font-bold uppercase tracking-widest">
              OFFICIAL KRATOS PROTOCOL
            </span>
          </div>
          <h2 className={`text-sm font-black uppercase ${isLight ? 'text-gray-900' : 'text-white'}`}>
            6-MONTH LIMITED PERFORMANCE WARRANTY
          </h2>
          <p className={`text-xs leading-relaxed ${isLight ? 'text-gray-600' : 'text-zinc-400'}`}>
            Every genuine Kratos carbon fiber insole is warranted against composite delamination, structural fracture, and material defects for 180 days from verified purchase.
          </p>
        </div>

        {/* REGISTRATION SUCCESS CERTIFICATE (IF JUST REGISTERED) */}
        {newlyRegistered ? (
          <div
            className={`p-5 rounded-3xl border-2 space-y-4 shadow-2xl animate-in zoom-in-95 transition-colors ${
              isLight
                ? 'bg-white border-[#C6A66B] text-gray-900'
                : 'bg-[#16171b] border-[#C6A66B] text-white'
            }`}
          >
            <div className={`flex justify-between items-center pb-3 border-b ${isLight ? 'border-gray-200' : 'border-white/10'}`}>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-600 font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase">
                    CERTIFICATE VERIFIED
                  </span>
                  <h3 className={`text-sm font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>
                    {newlyRegistered.id}
                  </h3>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-600 text-[10px] font-mono font-bold uppercase">
                ACTIVE WARRANTY
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className={isLight ? 'text-gray-500' : 'text-zinc-500'}>ATHLETE:</span>
                <span className={`font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>{newlyRegistered.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className={isLight ? 'text-gray-500' : 'text-zinc-500'}>SERIAL NO:</span>
                <span className="text-[#A38448] font-bold">{newlyRegistered.serialNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className={isLight ? 'text-gray-500' : 'text-zinc-500'}>PRODUCT:</span>
                <span className={`truncate max-w-[180px] font-semibold ${isLight ? 'text-gray-900' : 'text-white'}`}>{newlyRegistered.productType}</span>
              </div>
              <div className="flex justify-between">
                <span className={isLight ? 'text-gray-500' : 'text-zinc-500'}>VALID THROUGH:</span>
                <span className="text-emerald-600 font-bold">{newlyRegistered.expiryDate}</span>
              </div>
            </div>

            {/* Simulated Digital QR Stamp */}
            <div
              className={`p-3 rounded-2xl border flex items-center justify-between ${
                isLight ? 'bg-gray-50 border-gray-200' : 'bg-black/60 border-white/10'
              }`}
            >
              <div className="flex items-center gap-2">
                <QrCode className="w-8 h-8 text-[#A38448]" />
                <div className="text-[9px] font-mono">
                  <p className={`font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>DIGITAL KRATOS PASS</p>
                  <p className={isLight ? 'text-gray-500' : 'text-zinc-400'}>Encrypted verification stamp</p>
                </div>
              </div>
              <span className={`text-[10px] font-mono ${isLight ? 'text-gray-400 font-bold' : 'text-zinc-500'}`}>VERIFIED</span>
            </div>

            <button
              onClick={() => setNewlyRegistered(null)}
              className={`w-full py-2.5 rounded-xl border font-mono text-xs uppercase transition-colors ${
                isLight
                  ? 'bg-gray-100 hover:bg-gray-200 border-gray-200 text-gray-800'
                  : 'bg-white/10 hover:bg-white/15 text-white border-transparent'
              }`}
            >
              Register Another Product
            </button>
          </div>
        ) : (
          /* PRODUCT REGISTRATION FORM */
          <form
            onSubmit={handleRegister}
            className={`p-4 rounded-3xl border space-y-3 text-xs transition-colors ${
              isLight ? 'bg-white border-gray-200 shadow-xs' : 'bg-[#16171b] border-white/10'
            }`}
          >
            <span className="text-[10px] font-mono text-[#A38448] uppercase font-bold tracking-wider block">
              PRODUCT REGISTRATION FORM
            </span>

            <div>
              <label className={`text-[10px] font-mono uppercase block mb-1 ${isLight ? 'text-gray-600 font-semibold' : 'text-zinc-400'}`}>
                Customer Full Name
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C6A66B] transition-colors ${
                  isLight
                    ? 'bg-gray-50 border-gray-300 text-gray-900 focus:bg-white'
                    : 'bg-black/60 border-white/15 text-white'
                }`}
              />
            </div>

            <div>
              <label className={`text-[10px] font-mono uppercase block mb-1 ${isLight ? 'text-gray-600 font-semibold' : 'text-zinc-400'}`}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C6A66B] transition-colors ${
                  isLight
                    ? 'bg-gray-50 border-gray-300 text-gray-900 focus:bg-white'
                    : 'bg-black/60 border-white/15 text-white'
                }`}
              />
            </div>

            <div>
              <label className={`text-[10px] font-mono uppercase block mb-1 ${isLight ? 'text-gray-600 font-semibold' : 'text-zinc-400'}`}>
                Product Model
              </label>
              <select
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C6A66B] transition-colors ${
                  isLight
                    ? 'bg-gray-50 border-gray-300 text-gray-900 focus:bg-white'
                    : 'bg-black/60 border-white/15 text-white'
                }`}
              >
                <option value="Kratos Carbon Fiber Performance Insole">
                  Kratos Carbon Fiber Performance Insole
                </option>
                <option value="Kratos Non-Carbon High Arch Support">
                  Kratos Non-Carbon High Arch Support
                </option>
                <option value="Kratos Apex Sprint Carbon Insole">
                  Kratos Apex Sprint Carbon Insole
                </option>
                <option value="Kratos Court Stability Carbon Insole">
                  Kratos Court Stability Carbon Insole
                </option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className={`text-[10px] font-mono uppercase ${isLight ? 'text-gray-600 font-semibold' : 'text-zinc-400'}`}>
                  Product Serial Number (from heel/packaging)
                </label>
                <button
                  type="button"
                  onClick={handleGenerateSerial}
                  className="text-[9px] font-mono text-[#A38448] font-bold hover:underline"
                >
                  Generate Test Serial
                </button>
              </div>
              <input
                type="text"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                placeholder="e.g. KRT-3K-XXXXX-PRO"
                required
                className={`w-full border rounded-xl px-3 py-2 text-xs font-mono uppercase focus:outline-none focus:border-[#C6A66B] transition-colors ${
                  isLight
                    ? 'bg-gray-50 border-gray-300 text-gray-900 focus:bg-white'
                    : 'bg-black/60 border-white/15 text-white'
                }`}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={`text-[10px] font-mono uppercase block mb-1 ${isLight ? 'text-gray-600 font-semibold' : 'text-zinc-400'}`}>
                  Purchase Date
                </label>
                <input
                  type="date"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                  required
                  className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C6A66B] transition-colors ${
                    isLight
                      ? 'bg-gray-50 border-gray-300 text-gray-900 focus:bg-white'
                      : 'bg-black/60 border-white/15 text-white'
                  }`}
                />
              </div>

              <div>
                <label className={`text-[10px] font-mono uppercase block mb-1 ${isLight ? 'text-gray-600 font-semibold' : 'text-zinc-400'}`}>
                  Authorized Retailer
                </label>
                <select
                  value={retailer}
                  onChange={(e) => setRetailer(e.target.value)}
                  className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C6A66B] transition-colors ${
                    isLight
                      ? 'bg-gray-50 border-gray-300 text-gray-900 focus:bg-white'
                    : 'bg-black/60 border-white/15 text-white'
                  }`}
                >
                  <option value="Kratos Official Store">Kratos Official Store</option>
                  <option value="Fleet Feet Running">Fleet Feet Running</option>
                  <option value="Running Warehouse">Running Warehouse</option>
                  <option value="Amazon Official Store">Amazon Official Store</option>
                  <option value="Dick's Sporting Goods">Dick&apos;s Sporting Goods</option>
                </select>
              </div>
            </div>

            {/* UPLOAD RECEIPT SIMULATION */}
            <div>
              <label className={`text-[10px] font-mono uppercase block mb-1 ${isLight ? 'text-gray-600 font-semibold' : 'text-zinc-400'}`}>
                Upload Purchase Receipt / Invoice
              </label>
              <div
                onClick={() => setReceiptName('receipt_kratos_verified.jpg')}
                className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer hover:border-[#C6A66B] transition-colors ${
                  isLight ? 'bg-gray-50 border-gray-300 hover:bg-amber-50/20' : 'border-white/15 bg-black/40'
                }`}
              >
                <Upload className="w-6 h-6 text-[#A38448] mx-auto mb-1" />
                <p className={`text-xs font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  {receiptName ? receiptName : 'Tap to upload receipt image or PDF'}
                </p>
                <span className={`text-[10px] font-mono ${isLight ? 'text-gray-500' : 'text-zinc-500'}`}>
                  {receiptName ? 'File attached • Verified' : 'JPG, PNG or PDF (Max 10MB)'}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3.5 px-4 rounded-xl bg-[#C6A66B] hover:bg-[#D4B579] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg active:scale-98"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>REGISTER MY INSOLE</span>
            </button>
          </form>
        )}

        {/* EXISTING REGISTERED CERTIFICATES */}
        <div className="space-y-3">
          <span className="text-[10px] font-mono text-[#A38448] uppercase font-bold tracking-wider block">
            MY REGISTERED PRODUCTS ({warranties.length})
          </span>

          <div className="space-y-2">
            {warranties.map((w) => (
              <div
                key={w.id}
                className={`p-3.5 rounded-2xl border flex justify-between items-center text-xs transition-colors ${
                  isLight ? 'bg-white border-gray-200 shadow-xs' : 'bg-[#16171b] border-white/10'
                }`}
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold line-clamp-1 ${isLight ? 'text-gray-900' : 'text-white'}`}>{w.productType}</span>
                    <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-600 text-[9px] font-mono font-bold">
                      ACTIVE
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-[#A38448] font-bold">
                    SN: {w.serialNumber}
                  </p>
                  <p className={`text-[10px] ${isLight ? 'text-gray-500' : 'text-zinc-500'}`}>
                    Expires: {w.expiryDate} • {w.retailer}
                  </p>
                </div>

                <div className={`p-2 rounded-xl ${isLight ? 'bg-gray-100' : 'bg-black/60'}`}>
                  <QrCode className="w-5 h-5 text-[#A38448]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
