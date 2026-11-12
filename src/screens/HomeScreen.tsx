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
  Compass,
  Eye,
  ShoppingBag,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import { SPORTS_CATEGORIES, MOCK_REVIEWS } from '../data/mockData';
import { Product, CategoryId } from '../types';

export const HomeScreen: React.FC = () => {
  const {
    products,
    setCurrentScreen,
    navigateToProduct,
    startCustomizerForProduct,
    open3DViewer,
    addToCart,
    toggleWishlist,
    isWishlisted,
    setActiveCategory,
    isStallMode,
    theme,
  } = useApp();

  const isLight = theme === 'light';

  // Hero product is the flagship 3K carbon insole
  const heroProduct = products[0];
  const featuredProducts = products.slice(0, 4);

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

  const handleCategoryShortcut = (categoryId: CategoryId) => {
    setActiveCategory(categoryId);
    setCurrentScreen('shop');
  };

  return (
    <div
      className={`flex-1 flex flex-col pb-24 transition-colors ${
        isLight ? 'bg-[#F9FAFB] text-gray-900' : 'bg-[#101010] text-white'
      }`}
    >
      <Header />

      <div className="px-4 py-4 space-y-6">
        {/* STALL BANNER (When Stall Mode is Active) */}
        {isStallMode && (
          <div
            className={`p-3 rounded-2xl border flex items-center justify-between text-xs transition-colors ${
              isLight
                ? 'bg-amber-50/80 border-amber-200 text-amber-950'
                : 'bg-amber-950/20 border-amber-500/20 text-amber-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C6A66B] animate-ping" />
              <div>
                <p className="font-bold text-[11px] uppercase tracking-wider font-mono">
                  KRATOS STALL 4B // LIVE SHOWROOM
                </p>
                <p className="text-[10px] opacity-80">
                  Touch to rotate in 3D, customize specs, and order directly at counter.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setActiveCategory('all');
                setCurrentScreen('shop');
              }}
              className="px-2.5 py-1 rounded-lg bg-[#C6A66B] text-black font-extrabold text-[10px] uppercase tracking-wider shrink-0"
            >
              BROWSE
            </button>
          </div>
        )}

        {/* HERO BANNER — AEROSPACE INSOLE PRODUCT SHOWCASE */}
        <section className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#18191e] to-[#0c0d0f] p-5 shadow-2xl text-white">
          {/* Subtle Carbon Weave Pattern */}
          <div className="absolute inset-0 carbon-pattern opacity-30 pointer-events-none" />

          {/* Golden radial ambient highlight */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C6A66B]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Aerospace Tag */}
          <div className="relative z-10 flex items-center justify-between mb-3">
            <span className="px-2.5 py-0.5 rounded-full bg-[#C6A66B]/20 border border-[#C6A66B]/40 text-[#C6A66B] text-[9px] font-mono font-bold tracking-widest uppercase">
              EXHIBITION EDITION // 2026
            </span>
            <span className="text-[10px] font-mono text-zinc-400">
              100% 3K PREPREG CARBON
            </span>
          </div>

          {/* Hero Typography */}
          <div className="relative z-10 space-y-1.5 mb-4">
            <h1 className="text-2xl font-black uppercase tracking-tight text-white leading-tight">
              AEROSPACE CARBON INSOLES. <br />
              <span className="gold-gradient-text">ENGINEERED FOR SPEED.</span>
            </h1>
            <p className="text-xs text-zinc-300 leading-relaxed max-w-[300px]">
              Convert ground impact into explosive forward momentum. Engineered with authentic multi-ply 3K carbon fiber plates.
            </p>
          </div>

          {/* Large Carbon Insole Showcase Visual */}
          <div
            onClick={() => navigateToProduct(heroProduct)}
            className="relative z-10 w-full h-44 rounded-2xl overflow-hidden cursor-pointer group mb-4 border border-white/10 bg-[#141518]"
          >
            <img
              src={heroProduct.image}
              alt="Kratos Carbon Fiber Performance Insole"
              className="w-full h-full object-cover filter contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-3.5 justify-between">
              <div>
                <span className="px-2 py-0.5 rounded text-[8px] font-mono bg-[#C6A66B] text-black font-extrabold uppercase">
                  {heroProduct.tag}
                </span>
                <p className="text-xs font-bold text-white mt-1">
                  {heroProduct.name}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-zinc-400 block line-through">
                  ${heroProduct.originalPrice?.toFixed(2)}
                </span>
                <span className="text-sm font-mono font-black text-[#C6A66B]">
                  ${heroProduct.price.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Primary CTA Buttons */}
          <div className="relative z-10 flex gap-2">
            <button
              onClick={() => {
                setActiveCategory('all');
                setCurrentScreen('shop');
              }}
              className="flex-1 py-3.5 px-4 rounded-xl bg-[#C6A66B] hover:bg-[#D4B579] text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-98 flex items-center justify-center gap-2"
            >
              <span>EXPLORE INSOLES</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => open3DViewer(heroProduct)}
              className="py-3.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
              title="Launch 360° 3D Insole Viewer"
            >
              <Eye className="w-4 h-4 text-[#C6A66B]" />
              <span className="hidden xs:inline">VIEW 3D</span>
            </button>

            <button
              onClick={() => startCustomizerForProduct(heroProduct)}
              className="py-3.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
              title="Launch Customizer"
            >
              <Sliders className="w-4 h-4 text-[#C6A66B]" />
              <span className="hidden xs:inline">CUSTOMIZE</span>
            </button>
          </div>
        </section>

        {/* PRODUCT CATEGORY SHORTCUTS (Sprinting, Basketball, Marathon, Recovery) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className={`text-xs font-mono font-bold tracking-[0.2em] uppercase ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>
              SELECT BY ATHLETIC DISCIPLINE
            </h2>
            <button
              onClick={() => {
                setActiveCategory('all');
                setCurrentScreen('shop');
              }}
              className="text-xs font-mono text-[#A38448] font-bold flex items-center gap-0.5 hover:underline"
            >
              <span>All ({products.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {[
              {
                id: 'sprinting',
                name: 'Sprinting',
                icon: Zap,
                sub: 'Ultra-Stiff Track Plate',
                badge: '+41% Snap',
              },
              {
                id: 'basketball',
                name: 'Basketball',
                icon: Activity,
                sub: 'Lateral Cut Wings',
                badge: 'Torsional Lock',
              },
              {
                id: 'marathon',
                name: 'Marathon',
                icon: Compass,
                sub: 'Graduated Dual-Flex',
                badge: '26.2mi Energy',
              },
              {
                id: 'recovery',
                name: 'Recovery',
                icon: ShieldCheck,
                sub: 'Plantar Relief Gel',
                badge: 'Joint Relief',
              },
            ].map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryShortcut(cat.id as CategoryId)}
                  className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all hover:scale-[1.02] active:scale-98 ${
                    isLight
                      ? 'bg-white border-gray-200 hover:border-[#C6A66B] shadow-xs'
                      : 'bg-[#15161a] border-white/10 hover:border-[#C6A66B]/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-7 h-7 rounded-lg bg-[#C6A66B]/15 flex items-center justify-center text-[#C6A66B]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-black/5 text-[#A38448] font-bold">
                      {cat.badge}
                    </span>
                  </div>
                  <div>
                    <h3 className={`text-xs font-black uppercase tracking-wide ${isLight ? 'text-gray-900' : 'text-white'}`}>
                      {cat.name}
                    </h3>
                    <p className={`text-[10px] leading-tight mt-0.5 ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>
                      {cat.sub}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* FEATURED INSOLES SHOWCASE */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-sm font-black uppercase tracking-wider ${isLight ? 'text-gray-900' : 'text-white'}`}>
                FEATURED INSOLES
              </h2>
              <p className={`text-[10px] ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>
                Engineered for maximum athletic kinetic efficiency
              </p>
            </div>
            <button
              onClick={() => {
                setActiveCategory('all');
                setCurrentScreen('shop');
              }}
              className="text-xs font-mono text-[#A38448] font-bold flex items-center gap-1 hover:underline"
            >
              <span>View Catalog</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {featuredProducts.map((product) => {
              const favorited = isWishlisted(product.id);
              return (
                <div
                  key={product.id}
                  onClick={() => navigateToProduct(product)}
                  className={`rounded-2xl border p-3 flex flex-col justify-between cursor-pointer group transition-all hover:shadow-lg ${
                    isLight
                      ? 'bg-white border-gray-200 hover:border-gray-300 shadow-xs'
                      : 'bg-[#15161a] border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Image & Badges */}
                  <div className="relative w-full h-36 rounded-xl overflow-hidden bg-gray-100 mb-2.5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Tag badge */}
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider bg-black/80 text-[#C6A66B] backdrop-blur-xs">
                      {product.tag}
                    </span>

                    {/* Stock availability badge */}
                    <span className="absolute bottom-2 left-2 px-1.5 py-0.2 rounded text-[8px] font-mono font-bold bg-emerald-500/90 text-white backdrop-blur-xs">
                      {product.availability || 'In Stock'}
                    </span>

                    {/* Wishlist toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
                      title="Save item"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${favorited ? 'fill-[#C6A66B] text-[#C6A66B]' : ''}`}
                      />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold">
                      <Star className="w-3 h-3 fill-amber-500" />
                      <span>{product.rating}</span>
                      <span className={`text-[9px] ${isLight ? 'text-gray-400' : 'text-zinc-500'}`}>
                        ({product.reviewsCount})
                      </span>
                    </div>

                    <h3 className={`text-xs font-bold uppercase tracking-tight line-clamp-1 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                      {product.name}
                    </h3>
                    <p className={`text-[10px] line-clamp-2 leading-relaxed ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>
                      {product.subtitle}
                    </p>
                  </div>

                  {/* Price & Quick Actions */}
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono font-black text-[#A38448]">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className={`text-[9px] font-mono line-through ml-1.5 ${isLight ? 'text-gray-400' : 'text-zinc-500'}`}>
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          open3DViewer(product);
                        }}
                        className={`p-1.5 rounded-lg border text-[10px] font-mono transition-colors ${
                          isLight
                            ? 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 text-zinc-300'
                        }`}
                        title="360° 3D View"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#C6A66B]" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startCustomizerForProduct(product);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-[#C6A66B] hover:bg-[#D4B579] text-black font-extrabold text-[10px] uppercase tracking-wider transition-all"
                      >
                        CUSTOMIZE
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* TECHNICAL HIGHLIGHTS: CARBON FIBER ENGINEERING */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className={`text-xs font-mono font-bold tracking-[0.2em] uppercase ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>
              BIOMECHANICAL HIGHLIGHTS
            </h2>
            <span className="text-[10px] font-mono text-[#A38448] font-bold">AEROSPACE TECH</span>
          </div>

          <div className="space-y-2">
            {[
              {
                title: '1. Genuine 3K Prepreg Carbon Fiber Plate',
                desc: 'Continuous multi-axial carbon weave stores compressive energy at heel-strike and snaps back instantaneously during toe-off, delivering proven kinetic propulsion.',
                metric: '+33% Energy Return',
              },
              {
                title: '2. Dynamic Biomechanical Arch Cradle',
                desc: 'Engineered arch geometry supports the medial longitudinal arch, redistributing plantar peak pressures and mitigating plantar fasciitis during high volume training.',
                metric: '+38% Pressure Balance',
              },
              {
                title: '3. Medical-Grade Poron & Silver-Ion Top Weave',
                desc: 'Dual-density microcellular cushioning dampens repetitive joint impact while silver-infused fibers prevent friction hot-spots, moisture buildup, and odor.',
                metric: '+28% Shock Damping',
              },
            ].map((tech) => (
              <div
                key={tech.title}
                className={`p-3.5 rounded-2xl border transition-colors ${
                  isLight
                    ? 'bg-white border-gray-200 shadow-xs'
                    : 'bg-[#15161a] border-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`text-xs font-bold uppercase tracking-tight ${isLight ? 'text-gray-900' : 'text-white'}`}>
                    {tech.title}
                  </h3>
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-[#C6A66B]/15 text-[#A38448]">
                    {tech.metric}
                  </span>
                </div>
                <p className={`text-[11px] leading-relaxed ${isLight ? 'text-gray-600' : 'text-zinc-300'}`}>
                  {tech.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* COMPACT ATHLETE TESTIMONIALS & CREDIBILITY */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className={`text-xs font-mono font-bold tracking-[0.2em] uppercase ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>
              ATHLETE VERIFICATION
            </h2>
            <span className="text-[10px] font-mono text-emerald-600 font-bold">100% REAL FEEDBACK</span>
          </div>

          <div className="space-y-2">
            {MOCK_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className={`p-3 rounded-xl border text-xs space-y-1 transition-colors ${
                  isLight ? 'bg-white border-gray-200' : 'bg-[#15161a] border-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>
                    {rev.author}
                  </span>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-amber-500" />
                    ))}
                  </div>
                </div>
                <p className={`text-[10px] italic ${isLight ? 'text-gray-600' : 'text-zinc-300'}`}>
                  &quot;{rev.comment}&quot;
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM STALL ASSISTANCE & WARRANTY NOTICE */}
        <section
          className={`p-4 rounded-2xl border text-center space-y-2 transition-colors ${
            isLight
              ? 'bg-gray-100 border-gray-200 text-gray-700'
              : 'bg-[#15161a] border-white/10 text-zinc-300'
          }`}
        >
          <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#A38448]">
            KRATOS PERFORMANCE SYSTEMS // STALL SUPPORT
          </p>
          <p className="text-xs">
            Need custom fitting advice? Talk to our booth biomechanical specialist.
          </p>
          <div className="flex items-center justify-center gap-3 pt-1">
            <button
              onClick={() => setCurrentScreen('warranty')}
              className="text-[10px] font-mono underline hover:text-[#C6A66B]"
            >
              Warranty Information
            </button>
            <span className="text-gray-400">•</span>
            <button
              onClick={() => setCurrentScreen('order-tracking')}
              className="text-[10px] font-mono underline hover:text-[#C6A66B]"
            >
              Order Status Lookup
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
