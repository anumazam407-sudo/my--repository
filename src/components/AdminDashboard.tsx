import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  Copy, 
  Search, 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  Package, 
  AlertTriangle, 
  CheckCircle, 
  Eye, 
  SlidersHorizontal,
  DollarSign,
  Tag,
  Star,
  Check,
  RotateCcw,
  BarChart3
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product, ClothingCategory, ClothingSubCategory, ProductSize, OrderStatus } from '../types';
import { formatPKR } from '../utils/formatters';

export const AdminDashboard: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    duplicateProduct,
    orders,
    updateOrderStatus,
    reviews,
    approveReview,
    hideReview,
    deleteReview,
    feedbacks
  } = useShop();

  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'orders' | 'inventory' | 'reviews' | 'feedback'>('analytics');

  // Product Filter & Search
  const [productSearch, setProductSearch] = useState('');
  const [selectedProductForEdit, setSelectedProductForEdit] = useState<Product | null>(null);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<string | null>(null);

  // Order Filter
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('All');

  // Analytics Metrics
  const totalSalesPKR = orders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? o.totalAmount : 0), 0);
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending' || o.status === 'Confirmed' || o.status === 'Processing').length;
  const deliveredOrdersCount = orders.filter((o) => o.status === 'Delivered').length;
  const lowStockCount = products.filter((p) => p.stock < 15).length;
  const totalProductsCount = products.length;

  // New/Edit Product Form State
  const [formData, setFormData] = useState({
    title: '',
    sku: '',
    category: 'Everyday Wear' as ClothingCategory,
    subCategory: 'Lawn Suits' as ClothingSubCategory,
    collection: 'Summer Luxury Lawn 2026',
    fabric: 'Swiss Voile Lawn & Pure Silk Dupatta',
    description: '',
    originalPrice: 7500,
    salePrice: 5999,
    discountPercent: 20,
    stock: 25,
    sizes: ['XS', 'S', 'M', 'L', 'XL'] as ProductSize[],
    images: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'],
    isNewArrival: true,
    isBestSeller: false,
    isFeatured: true,
    isSale: true,
    shirtFabric: 'Embroidered Swiss Lawn (3.0M)',
    dupattaFabric: 'Medium Silk Dupatta (2.5M)',
    trouserFabric: 'Cambric Dyed Trousers (2.5M)',
    embroideryType: 'Resham and Zari Handwork',
    pieces: '3-Piece' as '1-Piece' | '2-Piece' | '3-Piece',
    stitchType: 'Ready to Wear' as 'Unstitched' | 'Stitched' | 'Ready to Wear' | 'Custom Stitched',
    colorsString: 'Peach (#FAD4C0), Mint (#D8E2DC)'
  });

  if (!isAdminOpen) return null;

  const handleOpenAddProduct = () => {
    setSelectedProductForEdit(null);
    setFormData({
      title: '',
      sku: `ZYR-${Math.floor(100 + Math.random() * 900)}`,
      category: 'Everyday Wear',
      subCategory: 'Lawn Suits',
      collection: 'Summer Luxury Lawn 2026',
      fabric: 'Swiss Voile Lawn & Pure Silk Dupatta',
      description: 'Handcrafted luxury Pakistani 3-piece suit with resham threadwork.',
      originalPrice: 8500,
      salePrice: 6800,
      discountPercent: 20,
      stock: 30,
      sizes: ['S', 'M', 'L', 'XL'],
      images: [products[0]?.images[0] || ''],
      isNewArrival: true,
      isBestSeller: false,
      isFeatured: true,
      isSale: true,
      shirtFabric: 'Embroidered Lawn (3.0 Meters)',
      dupattaFabric: 'Pure Silk Dupatta (2.5 Meters)',
      trouserFabric: 'Dyed Cambric Pants',
      embroideryType: 'Resham Embroidery',
      pieces: '3-Piece',
      stitchType: 'Ready to Wear',
      colorsString: 'Pastel Rose (#E8C5C8), Champagne (#E6D5B8)'
    });
    setIsProductFormOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setSelectedProductForEdit(prod);
    setFormData({
      title: prod.title,
      sku: prod.sku,
      category: prod.category,
      subCategory: prod.subCategory,
      collection: prod.collection,
      fabric: prod.fabric,
      description: prod.description,
      originalPrice: prod.originalPrice,
      salePrice: prod.salePrice ?? prod.originalPrice,
      discountPercent: prod.discountPercent ?? 0,
      stock: prod.stock,
      sizes: prod.sizes,
      images: prod.images,
      isNewArrival: prod.isNewArrival || false,
      isBestSeller: prod.isBestSeller || false,
      isFeatured: prod.isFeatured || false,
      isSale: prod.isSale || false,
      shirtFabric: prod.specifications.shirtFabric || '',
      dupattaFabric: prod.specifications.dupattaFabric || '',
      trouserFabric: prod.specifications.trouserFabric || '',
      embroideryType: prod.specifications.embroideryType || '',
      pieces: prod.specifications.pieces || '3-Piece',
      stitchType: prod.specifications.stitchType || 'Ready to Wear',
      colorsString: prod.colors.map(c => `${c.name} (${c.hex})`).join(', ')
    });
    setIsProductFormOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    // Parse colors
    const parsedColors = formData.colorsString.split(',').map((part) => {
      const match = part.match(/(.*?)\((#.*?)\)/);
      if (match) {
        return { name: match[1].trim(), hex: match[2].trim() };
      }
      return { name: part.trim(), hex: '#D4AF37' };
    }).filter(c => c.name.length > 0);

    const sizeStockObj: Record<ProductSize, number> = {} as any;
    formData.sizes.forEach((s) => {
      sizeStockObj[s] = Math.ceil(formData.stock / formData.sizes.length);
    });

    if (selectedProductForEdit) {
      updateProduct(selectedProductForEdit.id, {
        title: formData.title,
        sku: formData.sku,
        category: formData.category,
        subCategory: formData.subCategory,
        collection: formData.collection,
        fabric: formData.fabric,
        description: formData.description,
        originalPrice: formData.originalPrice,
        salePrice: formData.isSale ? formData.salePrice : undefined,
        discountPercent: formData.isSale ? formData.discountPercent : undefined,
        stock: formData.stock,
        sizes: formData.sizes,
        sizeStock: sizeStockObj,
        images: formData.images,
        isNewArrival: formData.isNewArrival,
        isBestSeller: formData.isBestSeller,
        isFeatured: formData.isFeatured,
        isSale: formData.isSale,
        colors: parsedColors.length > 0 ? parsedColors : [{ name: 'Standard', hex: '#FAF8F5' }],
        specifications: {
          shirtFabric: formData.shirtFabric,
          dupattaFabric: formData.dupattaFabric,
          trouserFabric: formData.trouserFabric,
          embroideryType: formData.embroideryType,
          pieces: formData.pieces,
          stitchType: formData.stitchType
        }
      });
    } else {
      addProduct({
        sku: formData.sku,
        title: formData.title,
        category: formData.category,
        subCategory: formData.subCategory,
        collection: formData.collection,
        fabric: formData.fabric,
        description: formData.description,
        originalPrice: formData.originalPrice,
        salePrice: formData.isSale ? formData.salePrice : undefined,
        discountPercent: formData.isSale ? formData.discountPercent : undefined,
        rating: 5.0,
        reviewsCount: 0,
        colors: parsedColors.length > 0 ? parsedColors : [{ name: 'Standard', hex: '#FAF8F5' }],
        sizes: formData.sizes,
        sizeStock: sizeStockObj,
        stock: formData.stock,
        images: formData.images,
        isNewArrival: formData.isNewArrival,
        isBestSeller: formData.isBestSeller,
        isFeatured: formData.isFeatured,
        isSale: formData.isSale,
        specifications: {
          shirtFabric: formData.shirtFabric,
          dupattaFabric: formData.dupattaFabric,
          trouserFabric: formData.trouserFabric,
          embroideryType: formData.embroideryType,
          pieces: formData.pieces,
          stitchType: formData.stitchType
        }
      });
    }

    setIsProductFormOpen(false);
  };

  const filteredProducts = products.filter((p) => {
    if (!productSearch.trim()) return true;
    const q = productSearch.toLowerCase();
    return p.title.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
  });

  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter === 'All') return true;
    return o.status === orderStatusFilter;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-6xl max-h-[94vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-[#E0D5C5]">
        
        {/* Top Admin Header */}
        <div className="px-6 py-4 bg-[#1E1B18] text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#8C6239] text-white flex items-center justify-center font-bold font-serif text-sm">
              Z
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-lg font-bold text-amber-200">
                  ZAYRAH Atelier Store Admin
                </h2>
                <span className="bg-emerald-900/60 text-emerald-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-emerald-600/30">
                  LIVE DASHBOARD
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                Manage Pakistani Clothing Catalog, Inventory, Customer Orders & Reviews in PKR
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 border-b border-[#E8DEC8] px-6 bg-[#FAF8F5] overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-3 text-xs font-semibold tracking-wider uppercase border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'analytics'
                ? 'border-[#8C6239] text-[#8C6239]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Store Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-3 text-xs font-semibold tracking-wider uppercase border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'products'
                ? 'border-[#8C6239] text-[#8C6239]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products Catalog ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-3 text-xs font-semibold tracking-wider uppercase border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'orders'
                ? 'border-[#8C6239] text-[#8C6239]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Order Management ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-3 text-xs font-semibold tracking-wider uppercase border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'inventory'
                ? 'border-[#8C6239] text-[#8C6239]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Inventory Stock</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-3 text-xs font-semibold tracking-wider uppercase border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'reviews'
                ? 'border-[#8C6239] text-[#8C6239]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Star className="w-4 h-4" />
            <span>Reviews ({reviews.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('feedback')}
            className={`px-4 py-3 text-xs font-semibold tracking-wider uppercase border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'feedback'
                ? 'border-[#8C6239] text-[#8C6239]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Customer Feedback ({feedbacks.length})</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          
          {/* TAB 1: ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#E8DEC8]">
                  <span className="text-stone-400 block text-[10px] uppercase font-bold tracking-wider">Total Revenue</span>
                  <div className="text-2xl font-serif font-bold text-[#8C6239] mt-1 tabular-nums">
                    {formatPKR(totalSalesPKR)}
                  </div>
                  <span className="text-[11px] text-emerald-700 font-semibold mt-1 inline-block">
                    +24.8% vs last month
                  </span>
                </div>

                <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#E8DEC8]">
                  <span className="text-stone-400 block text-[10px] uppercase font-bold tracking-wider">Total Orders</span>
                  <div className="text-2xl font-serif font-bold text-stone-900 mt-1 tabular-nums">
                    {totalOrdersCount} Orders
                  </div>
                  <span className="text-[11px] text-stone-500 mt-1 inline-block">
                    {pendingOrdersCount} In Processing • {deliveredOrdersCount} Delivered
                  </span>
                </div>

                <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#E8DEC8]">
                  <span className="text-stone-400 block text-[10px] uppercase font-bold tracking-wider">Active Pakistani Catalog</span>
                  <div className="text-2xl font-serif font-bold text-stone-900 mt-1 tabular-nums">
                    {totalProductsCount} Outfits
                  </div>
                  <span className="text-[11px] text-stone-500 mt-1 inline-block">
                    Lawn, Chiffon, Pret & Velvet
                  </span>
                </div>

                <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#E8DEC8]">
                  <span className="text-stone-400 block text-[10px] uppercase font-bold tracking-wider">Inventory Alerts</span>
                  <div className="text-2xl font-serif font-bold text-rose-700 mt-1 tabular-nums">
                    {lowStockCount} Low Stock
                  </div>
                  <span className="text-[11px] text-rose-600 font-semibold mt-1 inline-block">
                    Replenishment required
                  </span>
                </div>
              </div>

              {/* Sales by Category & Top Performers */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#E8DEC8]">
                  <h3 className="font-serif text-base font-semibold text-stone-900 mb-3">
                    Revenue Contribution by Pakistani Category
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between font-medium mb-1">
                        <span>Summer Luxury Lawn</span>
                        <span className="font-bold tabular-nums">42% (Rs. 182,500)</span>
                      </div>
                      <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#8C6239] h-full" style={{ width: '42%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-medium mb-1">
                        <span>Festive & Eid Chiffon</span>
                        <span className="font-bold tabular-nums">31% (Rs. 134,800)</span>
                      </div>
                      <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-700 h-full" style={{ width: '31%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-medium mb-1">
                        <span>Formal Velvet & Bridal</span>
                        <span className="font-bold tabular-nums">18% (Rs. 78,200)</span>
                      </div>
                      <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-amber-600 h-full" style={{ width: '18%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-medium mb-1">
                        <span>Daily Casual Pret</span>
                        <span className="font-bold tabular-nums">9% (Rs. 39,100)</span>
                      </div>
                      <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-stone-600 h-full" style={{ width: '9%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#E8DEC8]">
                  <h3 className="font-serif text-base font-semibold text-stone-900 mb-3">
                    Top Selling Pakistani Outfits
                  </h3>
                  <div className="space-y-3 text-xs">
                    {products.slice(0, 4).map((p) => (
                      <div key={p.id} className="flex items-center justify-between pb-2 border-b border-stone-200">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.images[0]}
                            alt={p.title}
                            referrerPolicy="no-referrer"
                            className="w-10 h-12 object-cover object-top rounded bg-stone-100"
                          />
                          <div>
                            <span className="font-semibold text-stone-900 block">{p.title}</span>
                            <span className="text-stone-500 text-[11px]">{p.category} • {formatPKR(p.salePrice ?? p.originalPrice)}</span>
                          </div>
                        </div>
                        <span className="bg-[#FAF8F5] font-bold text-[#8C6239] tabular-nums">
                          {p.rating} ★ ({p.reviewsCount} reviews)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="relative flex-1 min-w-[240px]">
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search by title, SKU, or category..."
                    className="w-full bg-[#FAF8F5] border border-[#E0D5C5] rounded-lg pl-9 pr-4 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#8C6239]"
                  />
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                <button
                  onClick={handleOpenAddProduct}
                  className="bg-[#1E1B18] text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Pakistani Outfit</span>
                </button>
              </div>

              {/* Products Table */}
              <div className="border border-[#E8DEC8] rounded-xl overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-700">
                  <thead className="bg-[#FAF8F5] text-stone-900 font-semibold border-b border-[#E8DEC8]">
                    <tr>
                      <th className="p-3">Outfit Image & Name</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">SKU</th>
                      <th className="p-3">Price (PKR)</th>
                      <th className="p-3">Stock</th>
                      <th className="p-3">Badges</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8DEC8]">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.images[0]}
                              alt={p.title}
                              referrerPolicy="no-referrer"
                              className="w-10 h-12 object-cover object-top rounded bg-stone-100 shrink-0"
                            />
                            <div>
                              <span className="font-semibold text-stone-900 block line-clamp-1">{p.title}</span>
                              <span className="text-[11px] text-stone-500">{p.fabric}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 whitespace-nowrap">{p.category}</td>
                        <td className="p-3 font-mono text-[11px] whitespace-nowrap">{p.sku}</td>
                        <td className="p-3 whitespace-nowrap tabular-nums">
                          <div className="font-bold text-stone-900">
                            {formatPKR(p.salePrice ?? p.originalPrice)}
                          </div>
                          {p.salePrice && p.salePrice < p.originalPrice && (
                            <span className="text-[10px] text-stone-400 line-through">
                              {formatPKR(p.originalPrice)}
                            </span>
                          )}
                        </td>
                        <td className="p-3 whitespace-nowrap tabular-nums">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                            p.stock > 10 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {p.stock} units
                          </span>
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <div className="flex items-center gap-1 text-[10px]">
                            {p.isNewArrival && <span className="bg-stone-100 px-1.5 py-0.5 rounded">New</span>}
                            {p.isSale && <span className="bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded">Sale</span>}
                            {p.isBestSeller && <span className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">Top</span>}
                          </div>
                        </td>
                        <td className="p-3 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => handleOpenEditProduct(p)}
                              className="p-1.5 text-stone-600 hover:text-black rounded hover:bg-stone-100"
                              title="Edit product"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => duplicateProduct(p.id)}
                              className="p-1.5 text-stone-600 hover:text-blue-600 rounded hover:bg-stone-100"
                              title="Duplicate product"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirmationId(p.id)}
                              className="p-1.5 text-stone-600 hover:text-rose-600 rounded hover:bg-stone-100"
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-semibold text-stone-700">Filter Status:</span>
                  <select
                    value={orderStatusFilter}
                    onChange={(e) => setOrderStatusFilter(e.target.value)}
                    className="bg-[#FAF8F5] border border-[#E0D5C5] text-xs py-1.5 px-3 rounded-lg"
                  >
                    <option value="All">All Statuses ({orders.length})</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                {filteredOrders.map((ord) => (
                  <div key={ord.id} className="p-4 rounded-xl border border-[#E8DEC8] bg-[#FAF8F5] text-xs space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E0D5C5] pb-2.5">
                      <div>
                        <span className="text-stone-400 block text-[10px] uppercase font-bold">Order Tracking ID</span>
                        <span className="font-mono text-sm font-bold text-[#8C6239]">{ord.orderNumber}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[10px] uppercase font-bold">Customer</span>
                        <span className="font-semibold text-stone-900">{ord.customer.fullName} ({ord.customer.phoneNumber})</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[10px] uppercase font-bold">City / Destination</span>
                        <span>{ord.customer.city}, {ord.customer.province}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[10px] uppercase font-bold">Amount (COD)</span>
                        <span className="font-bold text-stone-900">{formatPKR(ord.totalAmount)}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[10px] uppercase font-bold">Update Status</span>
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus, `Status updated by Admin to ${e.target.value}`)}
                          className="bg-white border border-[#E0D5C5] rounded py-1 px-2 text-xs font-semibold text-stone-800"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-stone-600">
                      {ord.items.map((it) => (
                        <div key={it.cartItemId} className="flex items-center gap-2">
                          <img
                            src={it.product.images[0]}
                            alt={it.product.title}
                            referrerPolicy="no-referrer"
                            className="w-8 h-10 object-cover object-top rounded bg-stone-100"
                          />
                          <span>{it.product.title} (Size {it.selectedSize}, {it.quantity}x)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: INVENTORY */}
          {activeTab === 'inventory' && (
            <div className="space-y-4">
              <div className="text-xs text-stone-600">
                Directly adjust stock quantities for each Pakistani dress. Changes update instantaneously across customer storefront.
              </div>

              <div className="border border-[#E8DEC8] rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs text-stone-700">
                  <thead className="bg-[#FAF8F5] text-stone-900 font-semibold border-b border-[#E8DEC8]">
                    <tr>
                      <th className="p-3">Outfit</th>
                      <th className="p-3">SKU</th>
                      <th className="p-3">Current Total Stock</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Quick Stock Update</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8DEC8]">
                    {products.map((p) => (
                      <tr key={p.id}>
                        <td className="p-3 font-medium text-stone-900">{p.title}</td>
                        <td className="p-3 font-mono">{p.sku}</td>
                        <td className="p-3 font-bold tabular-nums">{p.stock} units</td>
                        <td className="p-3">
                          {p.stock === 0 ? (
                            <span className="text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded">Out of Stock</span>
                          ) : p.stock < 15 ? (
                            <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded">Low Stock</span>
                          ) : (
                            <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">Healthy Stock</span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <div className="inline-flex items-center gap-2">
                            <button
                              onClick={() => updateProduct(p.id, { stock: Math.max(0, p.stock - 5) })}
                              className="px-2 py-1 bg-stone-100 hover:bg-stone-200 rounded text-xs font-bold"
                            >
                              -5
                            </button>
                            <button
                              onClick={() => updateProduct(p.id, { stock: p.stock + 10 })}
                              className="px-2 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded text-xs font-bold"
                            >
                              +10 Restock
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="text-xs text-stone-600">
                Manage verified customer reviews. You can approve, hide, or delete reviews.
              </div>
              <div className="space-y-3">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-xl border border-[#E8DEC8] bg-[#FAF8F5] text-xs space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-bold text-stone-900">{rev.authorName}</span>
                        <span className="text-stone-500 text-[11px] ml-1">({rev.city})</span>
                        <span className={`ml-2 px-2 py-0.5 rounded text-[10px] font-bold ${
                          rev.approved ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'
                        }`}>
                          {rev.approved ? 'Approved & Visible' : 'Hidden'}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {rev.approved ? (
                          <button
                            onClick={() => hideReview(rev.id)}
                            className="text-stone-600 hover:text-black text-xs font-semibold"
                          >
                            Hide
                          </button>
                        ) : (
                          <button
                            onClick={() => approveReview(rev.id)}
                            className="text-emerald-700 hover:text-emerald-900 text-xs font-semibold"
                          >
                            Approve
                          </button>
                        )}
                        <button
                          onClick={() => deleteReview(rev.id)}
                          className="text-rose-600 hover:text-rose-800 text-xs font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-stone-200'}`} />
                      ))}
                    </div>
                    <p className="text-stone-700">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: FEEDBACK */}
          {activeTab === 'feedback' && (
            <div className="space-y-3">
              <div className="text-xs text-stone-600">
                General customer shopping experience suggestions submitted through the shopping mall feedback portal.
              </div>
              {feedbacks.map((fb) => (
                <div key={fb.id} className="p-4 rounded-xl border border-[#E8DEC8] bg-[#FAF8F5] text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <div>
                      <span className="font-bold text-stone-900">{fb.name}</span>
                      <span className="text-stone-400 text-[11px] ml-1">({fb.email || 'No email'})</span>
                    </div>
                    <span className="bg-[#8C6239] text-white px-2 py-0.5 rounded text-[10px] font-semibold">
                      {fb.category}
                    </span>
                  </div>
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < fb.rating ? 'fill-current' : 'text-stone-200'}`} />
                    ))}
                  </div>
                  <p className="text-stone-700 leading-relaxed">{fb.message}</p>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmationId && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full border border-stone-200 shadow-2xl space-y-4">
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Confirm Product Deletion
            </h3>
            <p className="text-xs text-stone-600">
              Are you sure you want to permanently delete this Pakistani outfit? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmationId(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-stone-700 hover:bg-stone-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteProduct(deleteConfirmationId);
                  setDeleteConfirmationId(null);
                }}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-rose-700 text-white hover:bg-rose-800"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isProductFormOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-2xl shadow-2xl overflow-y-auto flex flex-col border border-[#E0D5C5] p-6">
            <div className="flex justify-between items-center border-b border-[#E8DEC8] pb-3 mb-4">
              <h3 className="font-serif text-xl font-bold text-stone-900">
                {selectedProductForEdit ? 'Edit Pakistani Outfit' : 'Add New Pakistani Outfit'}
              </h3>
              <button
                onClick={() => setIsProductFormOpen(false)}
                className="p-1 text-stone-400 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Mah-e-Noor Embroidered Lawn 3-Piece"
                    className="w-full bg-[#FAF8F5] border border-[#E0D5C5] rounded p-2 focus:outline-none focus:border-[#8C6239]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">SKU *</label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E0D5C5] rounded p-2 focus:outline-none focus:border-[#8C6239]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-[#FAF8F5] border border-[#E0D5C5] rounded p-2"
                  >
                    <option value="Everyday Wear">Everyday Wear (Lawn/Cotton)</option>
                    <option value="Festive Wear">Festive Wear (Eid/Chiffon)</option>
                    <option value="Formal Wear">Formal Wear (Velvet/Silk)</option>
                    <option value="Party Wear">Party Wear</option>
                    <option value="Premium Collection">Premium Collection</option>
                    <option value="Sale">Sale Collection</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Original Price (PKR) *</label>
                  <input
                    type="number"
                    required
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full bg-[#FAF8F5] border border-[#E0D5C5] rounded p-2"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Sale Price (PKR)</label>
                  <input
                    type="number"
                    value={formData.salePrice}
                    onChange={(e) => setFormData({ ...formData, salePrice: Number(e.target.value) })}
                    className="w-full bg-[#FAF8F5] border border-[#E0D5C5] rounded p-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Fabric Details *</label>
                  <input
                    type="text"
                    required
                    value={formData.fabric}
                    onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                    placeholder="e.g. Swiss Voile Lawn & Pure Silk Dupatta"
                    className="w-full bg-[#FAF8F5] border border-[#E0D5C5] rounded p-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Stock Quantity *</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full bg-[#FAF8F5] border border-[#E0D5C5] rounded p-2"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Product Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#E0D5C5] rounded p-2"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Image URLs (comma-separated or CDN)</label>
                <input
                  type="text"
                  value={formData.images.join(', ')}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                  className="w-full bg-[#FAF8F5] border border-[#E0D5C5] rounded p-2 font-mono text-[11px]"
                />
              </div>

              <div className="flex flex-wrap gap-4 pt-2 border-t border-[#E8DEC8]">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isNewArrival}
                    onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
                  />
                  <span>Mark as New Arrival</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isBestSeller}
                    onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                  />
                  <span>Mark as Best Seller</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isSale}
                    onChange={(e) => setFormData({ ...formData, isSale: e.target.checked })}
                  />
                  <span>Mark on Sale</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#E8DEC8]">
                <button
                  type="button"
                  onClick={() => setIsProductFormOpen(false)}
                  className="px-4 py-2 rounded text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded bg-[#1E1B18] text-white font-bold hover:bg-stone-800"
                >
                  Save Outfit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
