import React, { useState } from 'react';
import { X, Plus, Sparkles, Check, Image as ImageIcon } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ClothingCategory, ClothingSubCategory, ProductSize } from '../types';

import heroMallImg from '../assets/images/hero_pakistani_couture_mall_1791437703357.jpg';
import festiveChiffonImg from '../assets/images/festive_eid_chiffon_1791437722533.jpg';
import lawnLuxuryImg from '../assets/images/lawn_luxury_campaign_1791437736955.jpg';
import royalVelvetImg from '../assets/images/royal_velvet_evening_1791437754980.jpg';

const PRESET_IMAGES = [
  { label: 'Summer Lawn Luxury', url: lawnLuxuryImg },
  { label: 'Festive Emerald Chiffon', url: festiveChiffonImg },
  { label: 'Royal Velvet Evening', url: royalVelvetImg },
  { label: 'Mall Boutique Pret', url: heroMallImg },
  { label: 'Designer Embroidered Gold', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Pastel Floral Anarkali', url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80' },
];

const PRESET_FABRICS = [
  'Swiss Voile Lawn & Pure Silk Dupatta',
  'Pure Crinkle Chiffon with Zari & Sequins',
  'Micro 9000 Pure Velvet with Hand-Embroidered Shawl',
  'Crystal Organza with Silk Lining',
  'Fine Cotton Mulmul with Tone-on-Tone Chikankari',
  '80g Pure Pakistani Raw Silk & Organza Dupatta',
  'Premium 100% Breathable Combed Cotton',
  'Banarsi Jacquard with Embroidered Daman'
];

export const QuickAddProductModal: React.FC = () => {
  const { isAddProductModalOpen, setIsAddProductModalOpen, addProduct } = useShop();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ClothingCategory>('Everyday Wear');
  const [subCategory, setSubCategory] = useState<ClothingSubCategory>('Lawn Suits');
  const [fabric, setFabric] = useState(PRESET_FABRICS[0]);
  const [originalPrice, setOriginalPrice] = useState(7500);
  const [salePrice, setSalePrice] = useState(5999);
  const [hasSale, setHasSale] = useState(true);
  const [stock, setStock] = useState(25);
  const [selectedImage, setSelectedImage] = useState(PRESET_IMAGES[0].url);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [selectedSizes, setSelectedSizes] = useState<ProductSize[]>(['S', 'M', 'L', 'XL']);
  const [description, setDescription] = useState('');

  if (!isAddProductModalOpen) return null;

  const handleToggleSize = (size: ProductSize) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const finalImage = customImageUrl.trim() || selectedImage;
    const discount = hasSale && salePrice < originalPrice
      ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
      : undefined;

    const sizeStockObj: Record<ProductSize, number> = {} as any;
    selectedSizes.forEach(s => {
      sizeStockObj[s] = Math.ceil(stock / (selectedSizes.length || 1));
    });

    addProduct({
      sku: `ZYR-${Math.floor(1000 + Math.random() * 9000)}`,
      title: title.trim(),
      category,
      subCategory,
      collection: `${category} Signature 2026`,
      fabric,
      description: description.trim() || `Beautiful Pakistani ${title.trim()} crafted from authentic ${fabric}. Perfect for elegant gatherings.`,
      originalPrice,
      salePrice: hasSale ? salePrice : undefined,
      discountPercent: discount,
      rating: 5.0,
      reviewsCount: 1,
      colors: [
        { name: 'Champagne / Ivory', hex: '#F5EBE1' },
        { name: 'Rose Gold', hex: '#E8C5C8' }
      ],
      sizes: selectedSizes.length > 0 ? selectedSizes : ['M'],
      sizeStock: sizeStockObj,
      stock,
      images: [finalImage],
      isNewArrival: true,
      isBestSeller: false,
      isFeatured: true,
      isSale: hasSale,
      specifications: {
        shirtFabric: fabric,
        dupattaFabric: 'Matching Pure Dupatta (2.5 Meters)',
        trouserFabric: 'Dyed Cambric Cotton Trousers',
        embroideryType: 'Intricate Resham Threadwork & Zari Finish',
        pieces: '3-Piece',
        stitchType: 'Ready to Wear',
        careInstructions: 'Dry clean or gentle hand wash recommended.'
      }
    });

    setIsAddProductModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[92vh] bg-white rounded-2xl shadow-2xl overflow-y-auto flex flex-col border border-[#E0D5C5]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#EBE4D8] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#1E1B18] text-amber-200 flex items-center justify-center font-bold text-sm">
              +
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                Add New Pakistani Dress (نئی ڈریس شامل کریں)
              </h2>
              <p className="text-xs text-stone-500">
                Instantly add a new outfit with photos, PKR pricing, and sizes to your storefront
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAddProductModalOpen(false)}
            className="p-1.5 text-stone-400 hover:text-black rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-xs">
          
          {/* Title */}
          <div>
            <label className="block font-semibold text-stone-800 mb-1">
              Dress Name / Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Mah-e-Noor Embroidered Lawn 3-Piece"
              className="w-full bg-[#FAF8F5] border border-[#E0D5C5] rounded-lg p-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#8C6239]"
            />
          </div>

          {/* Category & SubCategory */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-800 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ClothingCategory)}
                className="w-full bg-[#FAF8F5] border border-[#E0D5C5] rounded-lg p-2 text-xs text-stone-900 focus:outline-none focus:border-[#8C6239]"
              >
                <option value="Everyday Wear">Everyday Wear (Lawn & Cotton)</option>
                <option value="Festive Wear">Festive Wear (Eid Collection)</option>
                <option value="Formal Wear">Formal Wear (Velvet & Silk)</option>
                <option value="Party Wear">Party Wear (Peshwas & Gowns)</option>
                <option value="Premium Collection">Premium Collection (Luxury Pret)</option>
                <option value="Sale">Sale Collection</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-stone-800 mb-1">
                Sub-Category
              </label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value as ClothingSubCategory)}
                className="w-full bg-[#FAF8F5] border border-[#E0D5C5] rounded-lg p-2 text-xs text-stone-900 focus:outline-none focus:border-[#8C6239]"
              >
                <option value="Lawn Suits">Lawn Suits (3-Piece / 2-Piece)</option>
                <option value="Eid Collection">Eid Collection</option>
                <option value="Festive Dresses">Festive Dresses</option>
                <option value="Chiffon Dresses">Chiffon Dresses</option>
                <option value="Velvet Dresses">Velvet Dresses & Shawls</option>
                <option value="Luxury Pret">Luxury Pret (Ready-to-Wear)</option>
                <option value="Party Dresses">Party Dresses</option>
              </select>
            </div>
          </div>

          {/* Fabric */}
          <div>
            <label className="block font-semibold text-stone-800 mb-1">
              Fabric & Details
            </label>
            <select
              value={fabric}
              onChange={(e) => setFabric(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-[#E0D5C5] rounded-lg p-2 text-xs text-stone-900 focus:outline-none focus:border-[#8C6239] mb-1.5"
            >
              {PRESET_FABRICS.map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
            <input
              type="text"
              value={fabric}
              onChange={(e) => setFabric(e.target.value)}
              placeholder="Or type custom fabric (e.g. Pure Tissue Silk with Organza Dupatta)"
              className="w-full bg-white border border-[#E0D5C5] rounded-lg p-2 text-xs text-stone-900"
            />
          </div>

          {/* Pricing in PKR */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E8DEC8]">
            <div>
              <label className="block font-semibold text-stone-800 mb-1">
                Original Price (PKR) *
              </label>
              <input
                type="number"
                required
                min={500}
                value={originalPrice}
                onChange={(e) => setOriginalPrice(Number(e.target.value))}
                className="w-full bg-white border border-[#E0D5C5] rounded p-2 text-xs font-bold text-stone-900 tabular-nums"
              />
              <span className="text-[10px] text-stone-500">e.g. Rs. 7,500</span>
            </div>

            <div>
              <label className="block font-semibold text-stone-800 mb-1">
                Sale Price (PKR)
              </label>
              <input
                type="number"
                disabled={!hasSale}
                min={500}
                value={salePrice}
                onChange={(e) => setSalePrice(Number(e.target.value))}
                className="w-full bg-white border border-[#E0D5C5] rounded p-2 text-xs font-bold text-emerald-800 tabular-nums disabled:bg-stone-100"
              />
              <span className="text-[10px] text-stone-500">e.g. Rs. 5,999</span>
            </div>

            <div>
              <label className="block font-semibold text-stone-800 mb-1">
                Stock Quantity
              </label>
              <input
                type="number"
                required
                min={1}
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full bg-white border border-[#E0D5C5] rounded p-2 text-xs font-bold text-stone-900"
              />
              <label className="mt-1 flex items-center gap-1.5 cursor-pointer text-[11px] text-stone-600">
                <input
                  type="checkbox"
                  checked={hasSale}
                  onChange={(e) => setHasSale(e.target.checked)}
                />
                <span>Enable Sale Discount</span>
              </label>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <label className="block font-semibold text-stone-800 mb-1.5">
              Available Sizes
            </label>
            <div className="flex flex-wrap gap-2">
              {(['XS', 'S', 'M', 'L', 'XL', 'XXL'] as ProductSize[]).map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => handleToggleSize(sz)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                    selectedSizes.includes(sz)
                      ? 'bg-[#1E1B18] text-white border-[#1E1B18]'
                      : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {sz} {selectedSizes.includes(sz) && '✓'}
                </button>
              ))}
            </div>
          </div>

          {/* Outfit Image Selection */}
          <div>
            <label className="block font-semibold text-stone-800 mb-1.5">
              Select Preset High-Res Pakistani Outfit Photo or Custom URL
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-2">
              {PRESET_IMAGES.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => { setSelectedImage(img.url); setCustomImageUrl(''); }}
                  className={`relative aspect-[3/4] rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                    selectedImage === img.url && !customImageUrl
                      ? 'border-[#8C6239] ring-2 ring-[#8C6239]/30 scale-105'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.label}
                    className="w-full h-full object-cover object-top"
                  />
                  {selectedImage === img.url && !customImageUrl && (
                    <div className="absolute top-1 right-1 bg-[#8C6239] text-white rounded-full p-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={customImageUrl}
                onChange={(e) => setCustomImageUrl(e.target.value)}
                placeholder="Or paste any custom image URL (https://...)"
                className="flex-1 bg-[#FAF8F5] border border-[#E0D5C5] rounded p-2 text-xs text-stone-800"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-3 pt-3 border-t border-[#E8DEC8]">
            <button
              type="button"
              onClick={() => setIsAddProductModalOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-100 font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#1E1B18] text-white font-bold hover:bg-stone-800 shadow-md cursor-pointer flex items-center gap-2"
            >
              <Plus className="w-4 h-4 text-amber-200" />
              <span>Add Dress to Catalog</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
