import React, { useState } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  Star, 
  Heart, 
  Plus, 
  X, 
  Check, 
  ArrowUpDown,
  Eye,
  Sliders,
  Sparkles,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import { CategoryId, Product } from '../types';

export const ShopScreen: React.FC = () => {
  const {
    products,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    navigateToProduct,
    startCustomizerForProduct,
    open3DViewer,
    addToCart,
    toggleWishlist,
    isWishlisted,
    theme,
  } = useApp();

  const isLight = theme === 'light';

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [showSortModal, setShowSortModal] = useState(false);

  const categories: { id: CategoryId; label: string }[] = [
    { id: 'all', label: 'All Insoles' },
    { id: 'sprinting', label: 'Sprinting' },
    { id: 'basketball', label: 'Basketball' },
    { id: 'marathon', label: 'Marathon' },
    { id: 'recovery', label: 'Recovery' },
    { id: 'carbon-fiber', label: '3K Carbon Plates' },
    { id: 'high-arch', label: 'High Arch Relief' },
  ];

  // Filtering & Sorting
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === 'all' ||
      product.category === activeCategory ||
      (product.sports && product.sports.some((s) => s.toLowerCase() === activeCategory.toLowerCase())) ||
      (activeCategory === 'carbon-fiber' && product.specs.plateMaterial.toLowerCase().includes('carbon'));

    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === '' ||
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.tag.toLowerCase().includes(query) ||
      (product.sports && product.sports.some((s) => s.toLowerCase().includes(query)));

    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured default
  });

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
      className={`flex-1 flex flex-col pb-24 transition-colors ${
        isLight ? 'bg-[#F9FAFB] text-gray-900' : 'bg-[#101010] text-white'
      }`}
    >
      <Header />

      <div className="px-4 py-4 space-y-4">
        {/* SHOP HEADER & STATS */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-xl font-black uppercase tracking-tight ${isLight ? 'text-gray-900' : 'text-white'}`}>
                INSOLE CATALOGUE
              </h1>
              <p className={`text-[11px] ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>
                Showing {filteredProducts.length} available models
              </p>
            </div>

            {/* Sort trigger button */}
            <button
              onClick={() => setShowSortModal(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-colors ${
                isLight
                  ? 'bg-white border-gray-200 text-gray-800 hover:bg-gray-50 shadow-xs'
                  : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10'
              }`}
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-[#C6A66B]" />
              <span className="uppercase">{sortBy.replace('-', ' ')}</span>
            </button>
          </div>

          {/* Search Input Bar */}
          <div className="relative">
            <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isLight ? 'text-gray-400' : 'text-zinc-400'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sprint, basketball, high arch, carbon..."
              className={`w-full pl-10 pr-9 py-2.5 rounded-2xl text-xs transition-colors border focus:outline-none focus:border-[#C6A66B] ${
                isLight
                  ? 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 shadow-xs'
                  : 'bg-[#15161a] border-white/10 text-white placeholder-zinc-500'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-black"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter Pills (Horizontal Scroll) */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-[#C6A66B] text-black shadow-md'
                      : isLight
                      ? 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
                      : 'bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* PRODUCT GRID */}
        {filteredProducts.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <p className={`text-sm ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>
              No insoles match your query &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-4 py-2 rounded-xl bg-[#C6A66B] text-black text-xs font-bold uppercase"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredProducts.map((product) => {
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
                  {/* Top Image Container */}
                  <div className="relative w-full h-40 rounded-xl overflow-hidden bg-gray-100 mb-2.5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Tag badge */}
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider bg-black/80 text-[#C6A66B] backdrop-blur-xs">
                      {product.tag}
                    </span>

                    {/* Availability Status */}
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[8px] font-mono font-bold bg-emerald-600/90 text-white backdrop-blur-xs">
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

                  {/* Product Details */}
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold">
                      <Star className="w-3 h-3 fill-amber-500" />
                      <span>{product.rating}</span>
                      <span className={`text-[9px] ${isLight ? 'text-gray-400' : 'text-zinc-500'}`}>
                        ({product.reviewsCount} reviews)
                      </span>
                    </div>

                    <h2 className={`text-xs font-bold uppercase tracking-tight line-clamp-1 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                      {product.name}
                    </h2>
                    <p className={`text-[10px] line-clamp-2 leading-relaxed ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>
                      {product.subtitle}
                    </p>
                  </div>

                  {/* Price & Action Buttons */}
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
                      {/* 3D View Shortcut */}
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
                        title="360° 3D Insole View"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#C6A66B]" />
                      </button>

                      {/* Customize Button */}
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
        )}
      </div>

      {/* SORT MODAL */}
      {showSortModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div
            className={`w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-5 space-y-4 border ${
              isLight ? 'bg-white border-gray-200 text-gray-900' : 'bg-[#15161a] border-white/10 text-white'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider">
                Sort Insoles By
              </h3>
              <button onClick={() => setShowSortModal(false)}>
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            <div className="space-y-2">
              {[
                { id: 'featured', label: 'Featured / Recommended' },
                { id: 'price-asc', label: 'Price: Low to High' },
                { id: 'price-desc', label: 'Price: High to Low' },
                { id: 'rating', label: 'Customer Rating' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setSortBy(opt.id as any);
                    setShowSortModal(false);
                  }}
                  className={`w-full p-3 rounded-xl text-left text-xs font-bold flex items-center justify-between transition-colors ${
                    sortBy === opt.id
                      ? 'bg-[#C6A66B] text-black'
                      : isLight
                      ? 'bg-gray-50 text-gray-800 hover:bg-gray-100'
                      : 'bg-white/5 text-zinc-300 hover:bg-white/10'
                  }`}
                >
                  <span>{opt.label}</span>
                  {sortBy === opt.id && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
