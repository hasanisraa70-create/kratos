import React, { useState } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  Star, 
  Heart, 
  Plus, 
  X, 
  Check, 
  ArrowUpDown 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import { PRODUCTS } from '../data/mockData';
import { CategoryId, Product } from '../types';

export const ShopScreen: React.FC = () => {
  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    navigateToProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    theme,
  } = useApp();

  const isLight = theme === 'light';

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [showSortModal, setShowSortModal] = useState(false);

  const categories: { id: CategoryId; label: string }[] = [
    { id: 'all', label: 'All Products' },
    { id: 'carbon-fiber', label: 'Carbon Fiber' },
    { id: 'non-carbon', label: 'Non-Carbon' },
    { id: 'high-arch', label: 'High Arch Support' },
  ];

  // Filtering
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      activeCategory === 'all' ||
      product.category === activeCategory ||
      (activeCategory === 'non-carbon' && product.category === 'high-arch');

    const matchesSearch =
      searchQuery.trim() === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tag.toLowerCase().includes(searchQuery.toLowerCase());

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
      className={`flex-1 flex flex-col pb-8 transition-colors ${
        isLight ? 'bg-[#F9FAFB] text-gray-900' : 'bg-[#101010] text-white'
      }`}
    >
      <Header />

      <div className="px-4 py-4 space-y-4">
        {/* TOP: Shop Heading & Search Bar */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h1 className={`text-xl font-black uppercase tracking-tight ${isLight ? 'text-gray-900' : 'text-white'}`}>
              PERFORMANCE CATALOG
            </h1>
            <span className={`text-[11px] font-mono ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>
              {filteredProducts.length} MODELS
            </span>
          </div>

          {/* Search Input Bar */}
          <div className="relative">
            <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isLight ? 'text-gray-400' : 'text-zinc-400'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search carbon fiber, arch support, sprint..."
              className={`w-full border rounded-2xl py-2.5 pl-10 pr-9 text-xs focus:outline-none focus:border-[#C6A66B] transition-colors ${
                isLight
                  ? 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 shadow-xs'
                  : 'bg-[#16171b] border-white/10 text-white placeholder-zinc-500'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full bg-zinc-300 text-zinc-700 hover:text-black dark:bg-zinc-700 dark:text-zinc-300 dark:hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex items-center justify-between gap-2">
          {/* Category Filter Pills (Horizontal Scroll) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                    isActive
                      ? 'bg-[#C6A66B] border-[#C6A66B] text-black font-bold shadow-md'
                      : isLight
                      ? 'bg-white border-gray-200 text-gray-700 hover:text-black hover:border-gray-300 shadow-xs'
                      : 'bg-[#16171b] border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Sort Button */}
          <button
            onClick={() => setShowSortModal(true)}
            className={`shrink-0 p-2 rounded-xl border transition-colors ${
              isLight
                ? 'bg-white border-gray-200 text-gray-700 hover:text-black shadow-xs'
                : 'bg-[#16171b] border-white/10 text-zinc-300 hover:text-white hover:border-white/20'
            }`}
            title="Sort Products"
          >
            <ArrowUpDown className="w-4 h-4" />
          </button>
        </div>

        {/* PRODUCT GRID: CLEAN TWO-COLUMN LAYOUT */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <p className={isLight ? 'text-gray-500 text-xs' : 'text-zinc-400 text-xs'}>No insoles match your query.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-[#C6A66B]/20 text-xs text-[#A38448] font-mono font-bold uppercase"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 pt-1">
            {filteredProducts.map((product) => {
              const favorited = isWishlisted(product.id);
              return (
                <div
                  key={product.id}
                  onClick={() => navigateToProduct(product)}
                  className={`rounded-2xl border overflow-hidden flex flex-col justify-between cursor-pointer group transition-all ${
                    isLight
                      ? 'bg-white border-gray-200 hover:border-gray-300 shadow-xs'
                      : 'bg-[#16171b] border-white/10 hover:border-white/25 shadow-lg'
                  }`}
                >
                  {/* Top Image + Wishlist */}
                  <div className="relative aspect-square w-full bg-black/5 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Category / Badge tag */}
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/10 text-[8px] font-mono text-[#C6A66B] font-bold uppercase">
                      {product.tag}
                    </div>

                    {/* Wishlist Heart */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 backdrop-blur-md text-white hover:text-red-400 transition-colors"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          favorited ? 'fill-red-500 text-red-500' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      {/* Rating */}
                      <div className="flex items-center text-[10px] text-amber-500 font-bold mb-1">
                        <Star className="w-3 h-3 fill-amber-400 mr-0.5" />
                        <span>{product.rating}</span>
                        <span className={`ml-1 ${isLight ? 'text-gray-400' : 'text-zinc-500'}`}>
                          ({product.reviewsCount})
                        </span>
                      </div>

                      {/* Product Name */}
                      <h3 className={`text-xs font-bold line-clamp-2 leading-tight ${isLight ? 'text-gray-900' : 'text-white'}`}>
                        {product.name}
                      </h3>
                    </div>

                    {/* Price and Add button */}
                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <span className={`text-xs font-mono font-black ${isLight ? 'text-gray-900' : 'text-white'}`}>
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className={`text-[10px] font-mono line-through block ${isLight ? 'text-gray-400' : 'text-zinc-500'}`}>
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={(e) => handleQuickAdd(product, e)}
                        className="p-1.5 rounded-lg bg-[#C6A66B] hover:bg-[#D4B579] text-black transition-transform active:scale-95 shadow"
                        title="Add to bag"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Sort Bottom Sheet Modal */}
      {showSortModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center p-3">
          <div
            className={`w-full max-w-sm rounded-3xl border p-5 space-y-3 shadow-2xl animate-in slide-in-from-bottom transition-colors ${
              isLight
                ? 'bg-white border-gray-200 text-gray-900'
                : 'bg-[#16171b] border-white/15 text-white'
            }`}
          >
            <div className={`flex justify-between items-center pb-2 border-b ${isLight ? 'border-gray-200' : 'border-white/10'}`}>
              <span className="text-xs font-mono font-bold text-[#A38448] uppercase">
                SORT PRODUCTS
              </span>
              <button
                onClick={() => setShowSortModal(false)}
                className={isLight ? 'text-gray-500 hover:text-black' : 'text-zinc-400 hover:text-white'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5">
              {[
                { id: 'featured', label: 'Featured / Best Performance' },
                { id: 'price-asc', label: 'Price: Low to High' },
                { id: 'price-desc', label: 'Price: High to Low' },
                { id: 'rating', label: 'Highest Rated' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setSortBy(opt.id as any);
                    setShowSortModal(false);
                  }}
                  className={`w-full py-2.5 px-3 rounded-xl flex items-center justify-between text-xs transition-colors ${
                    sortBy === opt.id
                      ? 'bg-[#C6A66B]/20 text-[#A38448] font-bold'
                      : isLight
                      ? 'hover:bg-gray-100 text-gray-700'
                      : 'hover:bg-white/5 text-zinc-300'
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
