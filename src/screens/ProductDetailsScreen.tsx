import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Star, 
  Check, 
  ShieldCheck, 
  Zap, 
  Activity, 
  Sliders, 
  Eye, 
  HelpCircle, 
  Plus, 
  Minus,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Info,
  Layers,
  MapPin
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Insole3DViewer } from '../components/3d/Insole3DViewer';
import { MOCK_REVIEWS } from '../data/mockData';
import { ProductColor } from '../types';

export const ProductDetailsScreen: React.FC = () => {
  const {
    selectedProduct,
    setCurrentScreen,
    addToCart,
    toggleWishlist,
    isWishlisted,
    startCustomizerForProduct,
    open3DViewer,
    showToast,
    theme,
  } = useApp();

  const isLight = theme === 'light';

  const product = selectedProduct;
  const [selectedSize, setSelectedSize] = useState(product.sizes[4] || product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colorways[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'specs' | 'reviews'>('benefits');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const favorited = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      colorName: selectedColor.name,
      colorHex: selectedColor.hex,
      quantity,
    });
    showToast(`Added ${quantity}x ${product.name} to order bag`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setCurrentScreen('checkout');
  };

  const hotspots = [
    {
      id: 1,
      title: 'Forefoot Kinetic Spring Zone',
      desc: 'Tapered 3K carbon deck provides instantaneous propulsion snap upon metatarsal push-off.',
    },
    {
      id: 2,
      title: 'Biomechanical Arch Bridge',
      desc: 'Resists medial arch flattening during prolonged running, maintaining biomechanical kinetic chain alignment.',
    },
    {
      id: 3,
      title: 'Deep Anatomical Heel Cradle',
      desc: 'Centers the calcaneus fat pad and dampens heavy deceleration forces with Poron cellular foam.',
    },
  ];

  return (
    <div
      className={`flex-1 flex flex-col pb-48 transition-colors ${
        isLight ? 'bg-[#F9FAFB] text-gray-900' : 'bg-[#101010] text-white'
      }`}
    >
      {/* TOP NAVIGATION BAR */}
      <div
        className={`sticky top-0 z-40 backdrop-blur-md px-4 py-3 border-b flex items-center justify-between transition-colors ${
          isLight
            ? 'bg-white/95 border-gray-200 text-gray-900 shadow-xs'
            : 'bg-[#101010]/90 border-white/10 text-white'
        }`}
      >
        <button
          onClick={() => setCurrentScreen('shop')}
          className={`p-2 -ml-2 rounded-full transition-colors ${
            isLight ? 'text-gray-700 hover:text-black hover:bg-gray-100' : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <span className={`text-[11px] font-mono tracking-widest uppercase ${isLight ? 'text-gray-500 font-bold' : 'text-zinc-400'}`}>
          PRODUCT DETAILS & 3D
        </span>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => toggleWishlist(product.id)}
            className={`p-2 rounded-full transition-colors ${
              isLight ? 'text-gray-700 hover:text-black hover:bg-gray-100' : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
            title="Wishlist"
          >
            <Heart
              className={`w-5 h-5 ${
                favorited ? 'fill-red-500 text-red-500' : ''
              }`}
            />
          </button>
        </div>
      </div>

      <div className="px-4 py-3 space-y-4">
        {/* MAIN PRODUCT 3D VIEWER CONTAINER */}
        <div className="relative">
          <Insole3DViewer
            color={selectedColor}
            height="320px"
            onOpenFullscreen={() => open3DViewer(product)}
          />

          {/* Construction Hotspots Quick Controls */}
          <div className="mt-2 flex items-center justify-between gap-1.5">
            <button
              onClick={() => open3DViewer(product)}
              className={`flex-1 py-2 px-3 rounded-xl border font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                isLight
                  ? 'bg-white hover:bg-gray-50 border-gray-200 text-gray-800 shadow-xs'
                  : 'bg-white/10 hover:bg-white/15 border-white/15 text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-[#C6A66B]" />
              <span>360° FULLSCREEN</span>
            </button>

            <button
              onClick={() => setActiveHotspot(activeHotspot ? null : 1)}
              className={`py-2 px-3 rounded-xl border font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeHotspot !== null
                  ? 'bg-[#C6A66B] text-black border-[#C6A66B]'
                  : isLight
                  ? 'bg-white hover:bg-gray-50 border-gray-200 text-gray-800 shadow-xs'
                  : 'bg-white/10 hover:bg-white/15 border-white/15 text-white'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>HOTSPOTS</span>
            </button>
          </div>

          {/* Hotspot details card */}
          {activeHotspot !== null && (
            <div
              className={`mt-2 p-3 rounded-xl border text-xs space-y-2 animate-in fade-in transition-colors ${
                isLight ? 'bg-white border-[#C6A66B]/50 shadow-md' : 'bg-[#15161a] border-[#C6A66B]/40'
              }`}
            >
              <div className="flex gap-2">
                {hotspots.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => setActiveHotspot(h.id)}
                    className={`flex-1 py-1 rounded-lg text-[10px] font-mono font-bold uppercase transition-all ${
                      activeHotspot === h.id
                        ? 'bg-[#C6A66B] text-black'
                        : isLight ? 'bg-gray-100 text-gray-700' : 'bg-white/5 text-zinc-400'
                    }`}
                  >
                    Zone {h.id}
                  </button>
                ))}
              </div>
              <div>
                <h4 className="font-bold text-xs text-[#A38448] uppercase">
                  {hotspots[activeHotspot - 1].title}
                </h4>
                <p className={`text-[11px] leading-relaxed mt-0.5 ${isLight ? 'text-gray-600' : 'text-zinc-300'}`}>
                  {hotspots[activeHotspot - 1].desc}
                </p>
              </div>
            </div>
          )}

          {/* Prototype Notice */}
          <div
            className={`mt-2 p-2 rounded-xl border flex items-center gap-1.5 text-[9px] font-mono ${
              isLight ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-amber-950/20 border-amber-500/20 text-amber-300'
            }`}
          >
            <Info className="w-3.5 h-3.5 text-[#C6A66B] shrink-0" />
            <span>Interactive 3D Prototype Model — Physical production matches athlete foot scan profile.</span>
          </div>
        </div>

        {/* PRODUCT HEADER & RATING */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full bg-[#C6A66B]/20 border border-[#C6A66B]/40 text-[#A38448] text-[9px] font-mono font-bold tracking-widest uppercase">
              {product.tag}
            </span>
            <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating}</span>
              <span className={`font-normal ${isLight ? 'text-gray-400' : 'text-zinc-500'}`}>
                ({product.reviewsCount} reviews)
              </span>
            </div>
          </div>

          <h1 className={`text-xl font-black uppercase tracking-tight leading-tight ${isLight ? 'text-gray-900' : 'text-white'}`}>
            {product.name}
          </h1>
          <p className={`text-xs ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>{product.subtitle}</p>

          <div className="flex items-baseline gap-2 pt-1">
            <span className={`text-2xl font-black font-mono ${isLight ? 'text-gray-900' : 'text-white'}`}>
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className={`text-xs font-mono line-through ${isLight ? 'text-gray-400' : 'text-zinc-500'}`}>
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-[10px] font-mono text-emerald-600 font-bold ml-auto">
              {product.availability || 'IN STOCK'} • STALL READY
            </span>
          </div>

          <p className={`text-xs leading-relaxed pt-1 ${isLight ? 'text-gray-700' : 'text-zinc-300'}`}>
            {product.description}
          </p>
        </div>

        {/* COLORWAYS SELECTOR (UPDATES 3D LIVE) */}
        <div className={`space-y-2 pt-2 border-t ${isLight ? 'border-gray-200' : 'border-white/10'}`}>
          <div className="flex items-center justify-between text-xs">
            <span className={`font-bold uppercase tracking-wider ${isLight ? 'text-gray-700' : 'text-zinc-300'}`}>
              Colorway (Live 3D Update):
            </span>
            <span className="font-mono text-[#A38448] font-bold">{selectedColor.name}</span>
          </div>

          <div className="flex items-center gap-3">
            {product.colorways.map((col) => {
              const isSelected = selectedColor.id === col.id;
              return (
                <button
                  key={col.id}
                  onClick={() => setSelectedColor(col)}
                  className={`relative w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected
                      ? 'border-[#C6A66B] scale-110 shadow-lg ring-2 ring-[#C6A66B]/40'
                      : 'border-black/15 hover:border-black/30'
                  }`}
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                >
                  {isSelected && (
                    <Check
                      className={`w-4 h-4 ${
                        col.hex === '#202020' ? 'text-white' : 'text-black'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* SIZES SELECTOR */}
        <div className={`space-y-2 pt-2 border-t ${isLight ? 'border-gray-200' : 'border-white/10'}`}>
          <div className="flex items-center justify-between text-xs">
            <span className={`font-bold uppercase tracking-wider ${isLight ? 'text-gray-700' : 'text-zinc-300'}`}>
              Select Size:
            </span>
            <button
              onClick={() => setShowSizeGuide(true)}
              className="text-[11px] font-mono text-[#A38448] hover:underline flex items-center gap-1 font-bold"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Size Guide</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {product.sizes.map((sz) => {
              const isSelected = selectedSize === sz;
              return (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`py-2 px-1 rounded-xl text-center text-xs font-mono transition-all border ${
                    isSelected
                      ? 'bg-[#C6A66B] border-[#C6A66B] text-black font-bold shadow-md'
                      : isLight
                      ? 'bg-white border-gray-200 text-gray-800 hover:border-gray-300 shadow-xs'
                      : 'bg-[#16171a] border-white/10 text-zinc-300 hover:border-white/30'
                  }`}
                >
                  {sz}
                </button>
              );
            })}
          </div>
        </div>

        {/* QUANTITY SELECTOR */}
        <div className={`flex items-center justify-between pt-2 border-t ${isLight ? 'border-gray-200' : 'border-white/10'}`}>
          <span className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-gray-700' : 'text-zinc-300'}`}>
            Quantity:
          </span>
          <div
            className={`flex items-center gap-3 border rounded-xl px-2 py-1 transition-colors ${
              isLight ? 'bg-white border-gray-200 text-gray-900 shadow-xs' : 'bg-[#16171a] border-white/10 text-white'
            }`}
          >
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className={isLight ? 'p-1 rounded-lg text-gray-500 hover:text-black' : 'p-1 rounded-lg text-zinc-400 hover:text-white'}
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-mono font-bold w-6 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className={isLight ? 'p-1 rounded-lg text-gray-500 hover:text-black' : 'p-1 rounded-lg text-zinc-400 hover:text-white'}
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* DETAILS TABS: BENEFITS / SPECS / REVIEWS */}
        <div className={`pt-2 border-t space-y-3 ${isLight ? 'border-gray-200' : 'border-white/10'}`}>
          <div className={`flex border-b ${isLight ? 'border-gray-200' : 'border-white/10'}`}>
            {(['benefits', 'specs', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 -mb-[2px] ${
                  activeTab === tab
                    ? 'border-[#C6A66B] text-[#A38448]'
                    : isLight
                    ? 'border-transparent text-gray-500 hover:text-black'
                    : 'border-transparent text-zinc-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* TAB 1: BENEFITS */}
          {activeTab === 'benefits' && (
            <div className="space-y-2.5 pt-1">
              {product.benefits.map((b, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl border flex items-start justify-between gap-3 transition-colors ${
                    isLight ? 'bg-white border-gray-200 shadow-xs' : 'bg-[#16171a] border-white/5'
                  }`}
                >
                  <div>
                    <h4 className={`text-xs font-bold uppercase tracking-wide ${isLight ? 'text-gray-900' : 'text-white'}`}>
                      {b.title}
                    </h4>
                    <p className={`text-[11px] mt-0.5 leading-relaxed ${isLight ? 'text-gray-600' : 'text-zinc-400'}`}>
                      {b.description}
                    </p>
                  </div>
                  <span className="text-sm font-mono font-black text-[#A38448] shrink-0">
                    {b.metric}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: SPECS */}
          {activeTab === 'specs' && (
            <div className="space-y-1.5 pt-1 text-xs">
              {Object.entries(product.specs).map(([key, val]) => (
                <div
                  key={key}
                  className={`py-2 px-3 rounded-xl flex justify-between items-center text-[11px] border transition-colors ${
                    isLight ? 'bg-white border-gray-200' : 'bg-[#16171a] border-transparent'
                  }`}
                >
                  <span className={`uppercase font-mono ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>
                    {key.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <span className={`font-mono font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>
                    {val}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-2 pt-1">
              {MOCK_REVIEWS.map((rev) => (
                <div
                  key={rev.id}
                  className={`p-3 rounded-xl border space-y-1 transition-colors ${
                    isLight ? 'bg-white border-gray-200' : 'bg-[#16171a] border-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#A38448]">{rev.author}</span>
                    <span className="text-amber-500 font-mono">★★★★★</span>
                  </div>
                  <p className={`text-xs font-semibold ${isLight ? 'text-gray-900' : 'text-white'}`}>
                    {rev.title}
                  </p>
                  <p className={`text-[11px] ${isLight ? 'text-gray-600' : 'text-zinc-400'}`}>
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* DOCKED ACTIONS: CUSTOMIZE & BUY NOW */}
      <div
        className={`fixed bottom-[58px] inset-x-0 z-40 backdrop-blur-xl border-t p-3 max-w-lg mx-auto flex gap-2 shadow-2xl transition-colors ${
          isLight
            ? 'bg-white/98 border-gray-200'
            : 'bg-[#101010]/98 border-white/10'
        }`}
      >
        <button
          onClick={() => startCustomizerForProduct(product)}
          className={`flex-1 py-3 px-3 rounded-2xl border font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
            isLight
              ? 'bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-900'
              : 'bg-white/10 hover:bg-white/15 border-white/20 text-white'
          }`}
        >
          <Sliders className="w-4 h-4 text-[#A38448]" />
          <span>CUSTOMIZE</span>
        </button>

        <button
          onClick={handleBuyNow}
          className="flex-1 py-3 px-3 rounded-2xl bg-[#C6A66B] hover:bg-[#D4B579] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-lg active:scale-98"
        >
          <span>ORDER NOW</span>
          <span className="font-mono text-[11px] font-normal">
            • ${(product.price * quantity).toFixed(2)}
          </span>
        </button>
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className={`w-full max-w-sm rounded-3xl border p-5 space-y-4 shadow-2xl transition-colors ${
              isLight
                ? 'bg-white border-gray-200 text-gray-900'
                : 'bg-[#16171b] border-white/15 text-white'
            }`}
          >
            <div className={`flex justify-between items-center pb-2 border-b ${isLight ? 'border-gray-200' : 'border-white/10'}`}>
              <span className="text-xs font-mono font-bold text-[#A38448] uppercase">
                ATHLETIC SIZING CONVERSION
              </span>
              <button
                onClick={() => setShowSizeGuide(false)}
                className={`text-xs font-mono ${isLight ? 'text-gray-500 hover:text-black' : 'text-zinc-400 hover:text-white'}`}
              >
                CLOSE
              </button>
            </div>

            <table className="w-full text-xs font-mono">
              <thead>
                <tr className={`border-b text-left ${isLight ? 'border-gray-200 text-gray-500' : 'border-white/10 text-zinc-400'}`}>
                  <th className="pb-1">US MEN</th>
                  <th className="pb-1">US WOMEN</th>
                  <th className="pb-1">EU</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isLight ? 'divide-gray-100 text-gray-800' : 'divide-white/5 text-zinc-300'}`}>
                <tr><td className="py-1">7.0</td><td>8.5</td><td>40</td></tr>
                <tr><td className="py-1">8.0</td><td>9.5</td><td>41</td></tr>
                <tr><td className="py-1">9.0</td><td>10.5</td><td>42.5</td></tr>
                <tr><td className="py-1">10.0</td><td>11.5</td><td>44</td></tr>
                <tr><td className="py-1">11.0</td><td>12.5</td><td>45</td></tr>
                <tr><td className="py-1">12.0</td><td>13.5</td><td>46.5</td></tr>
              </tbody>
            </table>

            <button
              onClick={() => setShowSizeGuide(false)}
              className="w-full py-2.5 rounded-xl bg-[#C6A66B] text-black font-bold text-xs uppercase"
            >
              GOT IT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
