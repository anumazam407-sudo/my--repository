import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  ArrowUpDown, 
  Search, 
  X, 
  RotateCcw,
  Sparkles,
  ChevronDown,
  Plus,
  Trash2
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { formatPKR } from '../utils/formatters';

const FABRICS = [
  'All',
  'Swiss Voile Lawn & Pure Silk Dupatta',
  'Pure Crinkle Chiffon with Zari & Sequins',
  'Micro 9000 Pure Velvet with Hand-Embroidered Shawl',
  'Crystal Organza with Silk Lining',
  'Premium 100% Breathable Combed Cotton',
  '80g Pure Pakistani Raw Silk & Organza Dupatta',
  'Fine Cotton Mulmul with Tone-on-Tone Chikankari',
  'Fine Cotton Net with Silk Slip'
];

export const CatalogSection: React.FC = () => {
  const {
    products,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    activeFabric,
    setActiveFabric,
    sortBy,
    setSortBy,
    resetFilters,
    setIsAddProductModalOpen,
    isManageMode,
    setIsManageMode,
    resetToDefaultProducts
  } = useShop();

  const [priceMax, setPriceMax] = useState<number>(45000);
  const [onlySale, setOnlySale] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(8);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories = [
    'All',
    'Everyday Wear',
    'Festive Wear',
    'Formal Wear',
    'Party Wear',
    'Premium Collection',
    'Sale'
  ];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchCategory = p.category.toLowerCase().includes(q);
        const matchSubCategory = p.subCategory.toLowerCase().includes(q);
        const matchFabric = p.fabric.toLowerCase().includes(q);
        const matchCollection = p.collection.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        if (!matchTitle && !matchCategory && !matchSubCategory && !matchFabric && !matchCollection && !matchDesc) {
          return false;
        }
      }

      // Category
      if (activeCategory !== 'All') {
        if (activeCategory === 'Sale') {
          if (!p.isSale && (!p.discountPercent || p.discountPercent <= 0)) return false;
        } else if (p.category !== activeCategory) {
          return false;
        }
      }

      // Fabric
      if (activeFabric !== 'All' && p.fabric !== activeFabric) {
        return false;
      }

      // Sale Filter
      if (onlySale && !p.isSale && (!p.discountPercent || p.discountPercent <= 0)) {
        return false;
      }

      // Stock
      if (onlyInStock && p.stock <= 0) {
        return false;
      }

      // Price
      const finalPrice = p.salePrice ?? p.originalPrice;
      if (finalPrice > priceMax) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.salePrice ?? a.originalPrice;
      const priceB = b.salePrice ?? b.originalPrice;

      if (sortBy === 'price-low') return priceA - priceB;
      if (sortBy === 'price-high') return priceB - priceA;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [products, searchQuery, activeCategory, activeFabric, onlySale, onlyInStock, priceMax, sortBy]);

  const visibleProducts = filteredProducts.slice(0, itemsToShow);
  const hasMore = itemsToShow < filteredProducts.length;

  return (
    <section id="catalog-section" className="py-16 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#8C6239] mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Pakistani Designer Ready-to-Wear & Unstitched</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-medium">
            Explore All Pakistani Collections
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            From breezy daytime lawn suits to regal wedding ensembles, crafted with authentic fabrics and signature embroidery.
          </p>
        </div>

        {/* Category Navigation Pills/Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto gap-2 pb-4 no-scrollbar mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setItemsToShow(8);
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 shrink-0 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#1E1B18] text-[#FAF8F5] shadow-md'
                  : 'bg-white border border-[#E0D5C5] text-stone-700 hover:border-[#8C6239] hover:text-[#8C6239]'
              }`}
            >
              {cat === 'All' ? 'All Collections' : cat}
            </button>
          ))}
        </div>

        {/* Quick Add and Remove Control Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 p-3.5 bg-gradient-to-r from-[#FAF6F0] via-white to-[#FAF6F0] rounded-xl border border-[#D5C2A5] shadow-xs">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C6239]">Store Controls:</span>
            <span className="text-xs text-stone-600 hidden sm:inline">Add new dresses or remove existing ones from the catalog</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Add Dress Button */}
            <button
              onClick={() => setIsAddProductModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1E1B18] text-white text-xs font-bold hover:bg-stone-800 transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 text-amber-200" />
              <span>+ Add Dress (پروڈکٹ شامل کریں)</span>
            </button>

            {/* Remove Mode Toggle */}
            <button
              onClick={() => setIsManageMode(!isManageMode)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                isManageMode
                  ? 'bg-rose-700 text-white border-rose-800 shadow-sm'
                  : 'bg-white text-rose-700 border-rose-300 hover:bg-rose-50'
              }`}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remove Mode: {isManageMode ? 'ON (آن)' : 'OFF (آف)'}</span>
            </button>

            {/* Restore Collection if items were deleted */}
            {products.length < 12 && (
              <button
                onClick={resetToDefaultProducts}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-100 text-stone-600 text-xs font-semibold hover:bg-stone-200 transition-colors"
                title="Restore all default 12 dresses"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden md:inline">Restore All</span>
              </button>
            )}
          </div>
        </div>

        {isManageMode && (
          <div className="mb-5 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between text-xs text-rose-800">
            <div className="flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-rose-600" />
              <span>
                <strong>Remove Mode is Active:</strong> Click the red trash icon on any dress card to delete it from the website.
              </span>
            </div>
            <button
              onClick={() => setIsManageMode(false)}
              className="font-bold underline text-rose-900 hover:text-black cursor-pointer"
            >
              Done / Turn Off
            </button>
          </div>
        )}

        {/* Filter and Sort Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-xl border border-[#EBE4D8] mb-8 shadow-sm">
          {/* Left: Active Results & Filter toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-800 bg-[#FAF8F5] border border-[#E0D5C5] px-3.5 py-2 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5 text-[#8C6239]" />
              <span>Filters {priceMax < 45000 || onlySale || onlyInStock || activeFabric !== 'All' ? '(Active)' : ''}</span>
            </button>

            <span className="text-xs text-stone-500 tabular-nums">
              Showing <strong className="text-stone-900">{visibleProducts.length}</strong> of{' '}
              <strong className="text-stone-900">{filteredProducts.length}</strong> outfits
            </span>
          </div>

          {/* Right: Quick Sort Dropdown */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-stone-600">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
              <span className="hidden sm:inline">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#FAF8F5] border border-[#E0D5C5] text-xs font-medium text-stone-800 py-1.5 px-3 rounded-lg focus:outline-none focus:border-[#8C6239] cursor-pointer"
              >
                <option value="featured">Featured / Best Sellers</option>
                <option value="newest">New Arrivals First</option>
                <option value="price-low">Price: Low to High (PKR)</option>
                <option value="price-high">Price: High to Low (PKR)</option>
                <option value="rating">Highest Customer Rating</option>
              </select>
            </div>

            {(activeCategory !== 'All' || activeFabric !== 'All' || searchQuery || onlySale || priceMax < 45000) && (
              <button
                onClick={() => {
                  resetFilters();
                  setPriceMax(45000);
                  setOnlySale(false);
                  setOnlyInStock(false);
                }}
                className="text-xs text-rose-700 hover:text-rose-900 font-medium flex items-center gap-1 cursor-pointer"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Expandable Filter Drawer Box */}
        {mobileFilterOpen && (
          <div className="mb-8 p-5 bg-white rounded-xl border border-[#E0D5C5] shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
            {/* Price Range Filter */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                Max Price: {formatPKR(priceMax)}
              </label>
              <input
                type="range"
                min="3500"
                max="45000"
                step="1000"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-[#8C6239] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                <span>Rs. 3,500</span>
                <span>Rs. 45,000</span>
              </div>
            </div>

            {/* Fabric Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                Fabric Type
              </label>
              <select
                value={activeFabric}
                onChange={(e) => setActiveFabric(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E0D5C5] text-xs py-2 px-3 rounded-lg text-stone-800 focus:outline-none focus:border-[#8C6239]"
              >
                {FABRICS.map((fab) => (
                  <option key={fab} value={fab}>
                    {fab === 'All' ? 'All Fabrics' : fab}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Checkboxes */}
            <div className="flex flex-col justify-center gap-2">
              <label className="inline-flex items-center gap-2 text-xs text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlySale}
                  onChange={(e) => setOnlySale(e.target.checked)}
                  className="rounded text-[#8C6239] focus:ring-[#8C6239]"
                />
                <span>Discounted & On Sale Outfits Only</span>
              </label>
              <label className="inline-flex items-center gap-2 text-xs text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded text-[#8C6239] focus:ring-[#8C6239]"
                />
                <span>In Stock & Ready for Immediate Dispatch</span>
              </label>
            </div>

            {/* Close / Apply */}
            <div className="flex items-end justify-end">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="bg-[#1E1B18] text-white text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer w-full sm:w-auto"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#EBE4D8] p-12 text-center max-w-lg mx-auto">
            <Search className="w-10 h-10 text-stone-400 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-semibold text-stone-900 mb-1">
              No matching Pakistani outfits found
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              We couldn't find any items matching your selected criteria. Try adjusting your search keywords or price filter.
            </p>
            <button
              onClick={() => {
                resetFilters();
                setPriceMax(45000);
                setOnlySale(false);
                setOnlyInStock(false);
              }}
              className="bg-[#1E1B18] text-white text-xs font-medium px-5 py-2.5 rounded-full hover:bg-stone-800 transition-colors"
            >
              Reset Filters & Show All
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setItemsToShow((prev) => prev + 4)}
              className="inline-flex items-center gap-2 bg-white border border-[#D5C2A5] text-[#1E1B18] px-8 py-3 rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-[#1E1B18] hover:text-white transition-all duration-200 shadow-sm cursor-pointer"
            >
              <span>Load More Pakistani Outfits</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
