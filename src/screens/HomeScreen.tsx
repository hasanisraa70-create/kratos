import React, { useState } from 'react';
import { 
  ArrowRight, 
  Star, 
  Zap, 
  ShieldCheck, 
  Activity, 
  Sparkles, 
  Check, 
  Sliders, 
  Heart, 
  ChevronRight, 
  Plus 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import { PRODUCTS, SPORTS_CATEGORIES } from '../data/mockData';
import { Product } from '../types';

export const HomeScreen: React.FC = () => {
  const {
    setCurrentScreen,
    navigateToProduct,
    startCustomizerForProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    setActiveCategory,
    selectedSport,
    setSelectedSport,
    theme,
  } = useApp();

  const isLight = theme === 'light';

  const [archQuizOpen, setArchQuizOpen] = useState(false);
  const [archResult, setArchResult] = useState<string | null>(null);

  const bestSellers = PRODUCTS.slice(0, 3);
  const heroProduct = PRODUCTS[0];

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.sizes[4] || 'US M 9.5 / W 11',
      colorName: product.colorways[0].name,
      colorHex: product.colorways[0].hex,
      quantity: 1,
    });
  };

  return (
    <div
      className={`flex-1 flex flex-col pb-8 transition-colors ${
        isLight ? 'bg-[#F9FAFB] text-gray-900' : 'bg-[#101010] text-white'
      }`}
    >
      <Header />

      <div className="px-4 py-4 space-y-6">
        {/* HERO BANNER */}
        <section className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#18191e] to-[#0c0d0f] p-5 shadow-2xl text-white">
          {/* Subtle Carbon Weave Pattern */}
          <div className="absolute inset-0 carbon-pattern opacity-30 pointer-events-none" />

          {/* Golden radial ambient highlight */}
          <div className="absolute top-0 right-0 w-56 h-56 bg-[#C6A66B]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Aerospace Tag */}
          <div className="relative z-10 flex items-center justify-between mb-3">
            <span className="px-2.5 py-0.5 rounded-full bg-[#C6A66B]/20 border border-[#C6A66B]/40 text-[#C6A66B] text-[9px] font-mono font-bold tracking-widest uppercase">
              SERIES 2026 // FLAGSHIP
            </span>
            <span className="text-[10px] font-mono text-zinc-400">
              100% 3K CARBON
            </span>
          </div>

          {/* Hero Typography */}
          <div className="relative z-10 space-y-2 mb-4">
            <h1 className="text-2xl font-black uppercase tracking-tight text-white leading-tight">
              TRANSFORM YOUR SHOES. <br />
              <span className="gold-gradient-text">FEEL THE POWER.</span>
            </h1>
            <p className="text-xs text-zinc-300 leading-relaxed max-w-[280px]">
              Experience the next generation of carbon fiber performance. Engineered for explosive rebound and torsional lock.
            </p>
          </div>

          {/* Large Carbon Insole Product Showcase Visual */}
          <div
            onClick={() => navigateToProduct(heroProduct)}
            className="relative z-10 w-full h-44 rounded-2xl overflow-hidden cursor-pointer group mb-4 border border-white/10 bg-[#141518]"
          >
            <img
              src={heroProduct.image}
              alt="Kratos Carbon Fiber Performance Insole"
              className="w-full h-full object-cover filter contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3 justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#C6A66B] uppercase font-bold">
                  {heroProduct.tag}
                </span>
                <p className="text-xs font-bold text-white">
                  {heroProduct.name}
                </p>
              </div>
              <span className="text-sm font-mono font-black text-white">
                ${heroProduct.price.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Hero CTA Button */}
          <div className="relative z-10 flex gap-2">
            <button
              onClick={() => {
                setActiveCategory('carbon-fiber');
                setCurrentScreen('shop');
              }}
              className="flex-1 py-3.5 px-4 rounded-xl bg-[#C6A66B] hover:bg-[#D4B579] text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-98 flex items-center justify-center gap-2"
            >
              <span>EXPLORE COLLECTION</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => startCustomizerForProduct(heroProduct)}
              className="py-3.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
              title="Launch Customizer"
            >
              <Sliders className="w-4 h-4 text-[#C6A66B]" />
              <span>CUSTOMIZE</span>
            </button>
          </div>
        </section>

        {/* PERFORMANCE HIGHLIGHTS (3 STATS) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className={`text-xs font-mono font-bold tracking-[0.2em] uppercase ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>
              LAB PERFORMANCE METRICS
            </h2>
            <span className="text-[10px] font-mono text-[#A38448] font-bold">VERIFIED</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { stat: '33%', label: 'Enhanced Energy Transfer' },
              { stat: '22%', label: 'Increased Midfoot Stability' },
              { stat: '20%', label: 'Boosted Vertical Support' },
            ].map((metric) => (
              <div
                key={metric.label}
                className={`p-3 rounded-2xl border text-center space-y-1 transition-colors ${
                  isLight
                    ? 'bg-white border-gray-200 shadow-xs'
                    : 'bg-[#16171a] border-white/10'
                }`}
              >
                <div className="text-xl font-black font-mono text-[#C6A66B]">
                  {metric.stat}
                </div>
                <p className={`text-[9px] font-bold uppercase leading-tight ${isLight ? 'text-gray-600' : 'text-zinc-300'}`}>
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED COLLECTIONS */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className={`text-sm font-black uppercase tracking-wider ${isLight ? 'text-gray-900' : 'text-white'}`}>
              FEATURED COLLECTIONS
            </h2>
            <button
              onClick={() => {
                setActiveCategory('all');
                setCurrentScreen('shop');
              }}
              className="text-xs font-mono text-[#A38448] font-bold flex items-center gap-1 hover:underline"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Collection 1: Carbon Fiber */}
            <div
              onClick={() => {
                setActiveCategory('carbon-fiber');
                setCurrentScreen('shop');
              }}
              className={`relative h-44 rounded-2xl overflow-hidden border cursor-pointer group ${
                isLight ? 'bg-white border-gray-200 shadow-xs' : 'bg-[#16171a] border-white/10'
              }`}
            >
              <img
                src={PRODUCTS[0].image}
                alt="Carbon Fiber Collection"
                className="w-full h-full object-cover filter brightness-75 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 flex flex-col justify-end">
                <span className="text-[9px] font-mono text-[#C6A66B] font-bold uppercase">
                  AEROSPACE 3K
                </span>
                <h3 className="text-xs font-black uppercase text-white leading-snug">
                  Carbon Fiber Insoles
                </h3>
                <span className="text-[10px] text-zinc-300 mt-1">From $89.00</span>
              </div>
            </div>

            {/* Collection 2: Non-Carbon High Arch */}
            <div
              onClick={() => {
                setActiveCategory('high-arch');
                setCurrentScreen('shop');
              }}
              className={`relative h-44 rounded-2xl overflow-hidden border cursor-pointer group ${
                isLight ? 'bg-white border-gray-200 shadow-xs' : 'bg-[#16171a] border-white/10'
              }`}
            >
              <img
                src={PRODUCTS[1].image}
                alt="Non-Carbon Collection"
                className="w-full h-full object-cover filter brightness-75 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 flex flex-col justify-end">
                <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase">
                  BIOMECHANICAL TPU
                </span>
                <h3 className="text-xs font-black uppercase text-white leading-snug">
                  Non-Carbon High Arch
                </h3>
                <span className="text-[10px] text-zinc-300 mt-1">From $59.00</span>
              </div>
            </div>
          </div>
        </section>

        {/* BEST SELLERS */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-sm font-black uppercase tracking-wider ${isLight ? 'text-gray-900' : 'text-white'}`}>
                BEST SELLERS
              </h2>
              <p className={`text-[11px] ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>
                Athletic precision gear
              </p>
            </div>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                isLight ? 'bg-gray-100 text-gray-700' : 'bg-white/10 text-zinc-300'
              }`}
            >
              TOP RATED
            </span>
          </div>

          <div className="space-y-3">
            {bestSellers.map((product) => {
              const favorited = isWishlisted(product.id);
              return (
                <div
                  key={product.id}
                  onClick={() => navigateToProduct(product)}
                  className={`p-3 rounded-2xl border flex gap-3 cursor-pointer transition-all group ${
                    isLight
                      ? 'bg-white border-gray-200 shadow-xs hover:border-gray-300 text-gray-900'
                      : 'bg-[#16171a] border-white/10 hover:border-white/20 text-white'
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-black shrink-0 border border-black/10">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/60 backdrop-blur-md text-white hover:text-red-400"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          favorited ? 'fill-red-500 text-red-500' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-mono text-[#C6A66B] font-bold uppercase">
                          {product.tag}
                        </span>
                        <div className="flex items-center text-[10px] text-amber-500 font-bold">
                          <Star className="w-3 h-3 fill-amber-400 mr-0.5" />
                          <span>{product.rating}</span>
                          <span className={`ml-0.5 ${isLight ? 'text-gray-400' : 'text-zinc-500'}`}>
                            ({product.reviewsCount})
                          </span>
                        </div>
                      </div>

                      <h3 className={`text-xs font-bold line-clamp-1 mt-0.5 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                        {product.name}
                      </h3>
                      <p className={`text-[10px] line-clamp-1 mt-0.5 ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>
                        {product.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-baseline gap-1.5">
                        <span className={`text-sm font-black font-mono ${isLight ? 'text-gray-900' : 'text-white'}`}>
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-[10px] font-mono text-gray-400 line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={(e) => handleQuickAdd(product, e)}
                        className="px-2.5 py-1 rounded-lg bg-[#C6A66B] hover:bg-[#D4B579] text-black font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 transition-transform active:scale-95"
                      >
                        <Plus className="w-3 h-3 stroke-[2.5]" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ENGINEERED TO PERFORM (SPORTS SELECTOR) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className={`text-sm font-black uppercase tracking-wider ${isLight ? 'text-gray-900' : 'text-white'}`}>
              ENGINEERED TO PERFORM
            </h2>
            <span className={`text-[10px] font-mono ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>
              BY DISCIPLINE
            </span>
          </div>

          {/* Horizontal Sports Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {SPORTS_CATEGORIES.map((sport) => {
              const isSelected = selectedSport === sport.id;
              return (
                <button
                  key={sport.id}
                  onClick={() => setSelectedSport(sport.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                    isSelected
                      ? 'bg-[#C6A66B] border-[#C6A66B] text-black font-bold shadow-md'
                      : isLight
                      ? 'bg-white border-gray-200 text-gray-700 hover:text-black hover:border-gray-300'
                      : 'bg-[#16171a] border-white/10 text-zinc-300 hover:text-white hover:border-white/20'
                  }`}
                >
                  {sport.name}
                </button>
              );
            })}
          </div>

          {/* Sport Context Note Card */}
          {selectedSport && (
            <div
              className={`p-3.5 rounded-2xl border flex items-center justify-between transition-colors ${
                isLight
                  ? 'bg-white border-gray-200 text-gray-900 shadow-xs'
                  : 'bg-gradient-to-r from-[#1c1d22] to-[#141518] border-white/10 text-white'
              }`}
            >
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono text-[#A38448] uppercase font-bold">
                  {selectedSport} PERFORMANCE OPTIMIZATION
                </span>
                <p className={`text-xs ${isLight ? 'text-gray-600' : 'text-zinc-300'}`}>
                  {SPORTS_CATEGORIES.find((s) => s.id === selectedSport)?.desc}
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setCurrentScreen('shop');
                }}
                className={`shrink-0 p-2 rounded-xl transition-colors ml-2 ${
                  isLight ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </section>

        {/* PROMOTIONAL BANNER: FIND YOUR PERFECT FIT */}
        <section className="relative rounded-3xl overflow-hidden p-5 bg-gradient-to-r from-neutral-900 via-stone-900 to-black border border-[#C6A66B]/30 shadow-xl text-white">
          <div className="relative z-10 space-y-2">
            <span className="px-2 py-0.5 rounded bg-[#C6A66B]/20 text-[#C6A66B] text-[9px] font-mono font-bold uppercase tracking-wider">
              BIOMECHANICAL QUIZ
            </span>
            <h3 className="text-lg font-black uppercase text-white leading-tight">
              FIND YOUR PERFECT FIT.
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Answer 3 quick questions about your arch height, activity level, and shoe type for personalized insole recommendations.
            </p>

            <button
              onClick={() => setArchQuizOpen(true)}
              className="mt-2 py-2.5 px-4 rounded-xl bg-white text-black font-extrabold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all flex items-center gap-1.5 shadow"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C6A66B]" />
              <span>START FIT SELECTOR</span>
            </button>
          </div>
        </section>
      </div>

      {/* Interactive Fit Selector Modal */}
      {archQuizOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl bg-[#16171b] border border-white/15 p-5 space-y-4 text-white shadow-2xl">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono font-bold text-[#C6A66B] uppercase">
                Fit Assessment Quiz
              </span>
              <button
                onClick={() => setArchQuizOpen(false)}
                className="text-zinc-400 hover:text-white text-xs font-mono"
              >
                CLOSE
              </button>
            </div>

            <h4 className="text-base font-bold">What is your primary foot arch type?</h4>

            <div className="space-y-2">
              {[
                { type: 'Low Arch / Flatfoot', rec: 'Kratos Non-Carbon High Arch' },
                { type: 'Neutral Arch / Standard', rec: 'Kratos Carbon Fiber Performance' },
                { type: 'High Rigid Arch / Plantar Strain', rec: 'Kratos High-Arch Orthotic' },
              ].map((item) => (
                <button
                  key={item.type}
                  onClick={() => setArchResult(item.rec)}
                  className={`w-full p-3 rounded-xl border text-left text-xs transition-all ${
                    archResult === item.rec
                      ? 'bg-[#C6A66B]/20 border-[#C6A66B] text-white font-bold'
                      : 'bg-black/40 border-white/10 text-zinc-300 hover:border-white/20'
                  }`}
                >
                  <p>{item.type}</p>
                </button>
              ))}
            </div>

            {archResult && (
              <div className="p-3 rounded-xl bg-[#C6A66B]/15 border border-[#C6A66B]/40 space-y-2 text-xs">
                <span className="text-[10px] font-mono text-[#C6A66B] font-bold uppercase">
                  RECOMMENDED MODEL:
                </span>
                <p className="font-bold text-white">{archResult}</p>
                <button
                  onClick={() => {
                    setArchQuizOpen(false);
                    const prod = PRODUCTS.find((p) => p.name.includes(archResult)) || PRODUCTS[0];
                    navigateToProduct(prod);
                  }}
                  className="w-full py-2 rounded-lg bg-[#C6A66B] text-black font-extrabold text-xs uppercase"
                >
                  View Recommended Insole
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
