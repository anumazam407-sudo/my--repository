import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Star, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Ruler, 
  Check, 
  MessageSquare,
  Sparkles,
  Trash2
} from 'lucide-react';
import { Product, ProductSize } from '../types';
import { useShop } from '../context/ShopContext';
import { formatPKR } from '../utils/formatters';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const {
    addToCart,
    isInWishlist,
    toggleWishlist,
    setIsCheckoutOpen,
    getProductReviews,
    addReview,
    deleteProduct
  } = useShop();

  const [confirmDelete, setConfirmDelete] = useState(false);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Standard');
  const [selectedSize, setSelectedSize] = useState<ProductSize>(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews' | 'sizing'>('details');

  // Review Form state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewCity, setNewReviewCity] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const isLiked = isInWishlist(product.id);
  const hasSale = product.salePrice && product.salePrice < product.originalPrice;
  const currentPrice = product.salePrice ?? product.originalPrice;
  const currentSizeStock = product.sizeStock?.[selectedSize] ?? product.stock;

  const reviews = getProductReviews(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    onClose();
    setIsCheckoutOpen(true);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    addReview({
      productId: product.id,
      authorName: newReviewAuthor.trim(),
      city: newReviewCity.trim() || 'Pakistan',
      rating: newReviewRating,
      comment: newReviewComment.trim(),
      verifiedPurchase: true
    });

    setReviewSubmitted(true);
    setNewReviewAuthor('');
    setNewReviewCity('');
    setNewReviewComment('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-2xl shadow-2xl overflow-y-auto flex flex-col border border-[#E0D5C5]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-stone-700 hover:text-black hover:bg-stone-100 transition-colors shadow-sm"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          
          {/* Left Column: Gallery */}
          <div className="md:col-span-6 flex flex-col gap-4">
            {/* Main Active Image View */}
            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-stone-100 border border-[#EBE4D8]">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />

              {hasSale && (
                <span className="absolute top-3 left-3 bg-[#800F2F] text-white text-xs font-bold px-2.5 py-1 rounded shadow-md">
                  {product.discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#8C6239] ring-2 ring-[#8C6239]/20'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Purchasing Module */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div className="space-y-4">
              
              {/* Category & SKU */}
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span className="font-semibold uppercase tracking-wider text-[#8C6239]">
                  {product.category} • {product.subCategory}
                </span>
                <span className="tabular-nums">SKU: {product.sku}</span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E1B18] leading-tight">
                {product.title}
              </h2>

              {/* Star Rating & Review count */}
              <div className="flex items-center gap-3 text-xs text-stone-600">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-current'
                          : 'fill-stone-200 text-stone-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-stone-800 tabular-nums">{product.rating.toFixed(1)}</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <button
                  type="button"
                  onClick={() => setActiveTab('reviews')}
                  className="text-[#8C6239] hover:underline"
                >
                  {product.reviewsCount} Customer Reviews
                </button>
              </div>

              {/* Price in PKR */}
              <div className="flex items-baseline gap-3 py-2 border-y border-[#F0E8DC]">
                <span className="text-2xl font-bold text-[#1E1B18] tabular-nums">
                  {formatPKR(currentPrice)}
                </span>
                {hasSale && (
                  <span className="text-sm text-stone-400 line-through tabular-nums">
                    {formatPKR(product.originalPrice)}
                  </span>
                )}
                {hasSale && (
                  <span className="text-xs font-semibold text-[#800F2F]">
                    Save {formatPKR(product.originalPrice - (product.salePrice ?? 0))}
                  </span>
                )}
              </div>

              {/* Color Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                  Select Color: <span className="text-stone-900 font-normal">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                        selectedColor === c.name
                          ? 'border-[#8C6239] bg-[#FAF6F0] text-stone-900 ring-1 ring-[#8C6239]'
                          : 'border-stone-200 text-stone-600 hover:border-stone-400'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-inner"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Select Size:
                  </label>
                  <button
                    type="button"
                    onClick={() => setActiveTab('sizing')}
                    className="text-xs text-[#8C6239] flex items-center gap-1 hover:underline"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Pakistani Size Guide</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => {
                    const stock = product.sizeStock?.[s] ?? 5;
                    const disabled = stock <= 0;
                    return (
                      <button
                        key={s}
                        type="button"
                        disabled={disabled}
                        onClick={() => setSelectedSize(s)}
                        className={`min-w-[42px] px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                          disabled
                            ? 'border-stone-200 text-stone-300 bg-stone-50 cursor-not-allowed line-through'
                            : selectedSize === s
                            ? 'border-[#1E1B18] bg-[#1E1B18] text-white shadow-sm'
                            : 'border-stone-200 text-stone-700 hover:border-stone-400 bg-white'
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>

                {/* Stock Indicator */}
                <div className="mt-2 text-[11px] text-stone-500 flex items-center gap-1.5">
                  {currentSizeStock > 0 ? (
                    <>
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>In Stock ({currentSizeStock} suits remaining in {selectedSize})</span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 rounded-full bg-rose-500" />
                      <span className="text-rose-600 font-medium">Out of Stock in this size</span>
                    </>
                  )}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center gap-4 pt-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-700">Quantity:</span>
                <div className="flex items-center border border-[#E0D5C5] rounded-lg bg-white overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 text-sm font-semibold"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-bold text-stone-900 tabular-nums min-w-[28px] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(currentSizeStock, quantity + 1))}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 text-sm font-semibold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <button
                  type="button"
                  disabled={currentSizeStock <= 0}
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#1E1B18] text-[#FAF8F5] py-3.5 px-6 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:bg-stone-300 disabled:cursor-not-allowed"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-200" />
                  <span>ADD TO BAG</span>
                </button>

                <button
                  type="button"
                  disabled={currentSizeStock <= 0}
                  onClick={handleBuyNow}
                  className="flex-1 bg-[#8C6239] text-white py-3.5 px-6 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#724e2b] transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:bg-stone-300 disabled:cursor-not-allowed"
                >
                  <span>BUY NOW (COD)</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 rounded-xl border transition-colors flex items-center justify-center ${
                    isLiked
                      ? 'border-rose-300 bg-rose-50 text-rose-600'
                      : 'border-stone-200 text-stone-600 hover:border-stone-400'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-rose-600' : ''}`} />
                </button>
              </div>

              {/* Direct Remove Dress Option */}
              <div className="flex items-center justify-end">
                {confirmDelete ? (
                  <div className="flex items-center gap-2 p-2 bg-rose-50 border border-rose-200 rounded-lg text-xs">
                    <span className="text-rose-800 font-semibold">Delete this outfit permanently?</span>
                    <button
                      type="button"
                      onClick={() => {
                        deleteProduct(product.id);
                        onClose();
                      }}
                      className="px-2.5 py-1 bg-rose-700 text-white rounded font-bold hover:bg-rose-800"
                    >
                      Yes, Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(false)}
                      className="px-2 py-1 bg-stone-200 text-stone-700 rounded hover:bg-stone-300"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(true)}
                    className="text-stone-400 hover:text-rose-600 text-xs flex items-center gap-1 transition-colors py-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove Dress from Store (ڈیلیٹ کریں)</span>
                  </button>
                )}
              </div>

              {/* Pakistani Delivery Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#F0E8DC] text-[11px] text-stone-600 text-center">
                <div className="flex flex-col items-center gap-1 p-2 bg-[#FAF8F5] rounded-lg">
                  <Truck className="w-4 h-4 text-[#8C6239]" />
                  <span className="font-semibold">COD Available</span>
                  <span className="text-[10px] text-stone-400">2-4 Days Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 bg-[#FAF8F5] rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-[#8C6239]" />
                  <span className="font-semibold">100% Original</span>
                  <span className="text-[10px] text-stone-400">Pure Fabric Guaranteed</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 bg-[#FAF8F5] rounded-lg">
                  <RotateCcw className="w-4 h-4 text-[#8C6239]" />
                  <span className="font-semibold">7 Days Exchange</span>
                  <span className="text-[10px] text-stone-400">Doorstep Pickup</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Bottom Tabbed Details: Description / Fabric Specs / Reviews / Sizing */}
        <div className="border-t border-[#EBE4D8] bg-[#FAF8F5] p-6 sm:p-8">
          {/* Tabs */}
          <div className="flex items-center gap-2 border-b border-[#E0D5C5] pb-3 mb-6 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-lg transition-colors cursor-pointer ${
                activeTab === 'details'
                  ? 'bg-white text-stone-900 shadow-sm border border-[#E0D5C5]'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-lg transition-colors cursor-pointer ${
                activeTab === 'specs'
                  ? 'bg-white text-stone-900 shadow-sm border border-[#E0D5C5]'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Fabric & Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-lg transition-colors cursor-pointer ${
                activeTab === 'reviews'
                  ? 'bg-white text-stone-900 shadow-sm border border-[#E0D5C5]'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Reviews ({reviews.length})
            </button>
            <button
              onClick={() => setActiveTab('sizing')}
              className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-lg transition-colors cursor-pointer ${
                activeTab === 'sizing'
                  ? 'bg-white text-stone-900 shadow-sm border border-[#E0D5C5]'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Size Chart Guide
            </button>
          </div>

          {/* Tab 1: Description */}
          {activeTab === 'details' && (
            <div className="space-y-4 max-w-2xl text-sm text-stone-700 leading-relaxed">
              <p>{product.description}</p>
              <div className="bg-white p-4 rounded-xl border border-[#EBE4D8]">
                <h4 className="font-semibold text-xs uppercase tracking-wider text-stone-900 mb-2">
                  Atelier Craftsmanship Notes
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-xs text-stone-600">
                  <li>Collection: {product.collection}</li>
                  <li>Pieces: {product.specifications.pieces || '3-Piece Suit'}</li>
                  <li>Stitch Status: {product.specifications.stitchType || 'Stitched Pret'}</li>
                  <li>Care: {product.specifications.careInstructions}</li>
                </ul>
              </div>
            </div>
          )}

          {/* Tab 2: Specs */}
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl text-xs">
              <div className="bg-white p-4 rounded-xl border border-[#EBE4D8] space-y-2">
                <span className="font-bold text-stone-900 block">Shirt / Kurta Fabric</span>
                <p className="text-stone-600">{product.specifications.shirtFabric || product.fabric}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#EBE4D8] space-y-2">
                <span className="font-bold text-stone-900 block">Dupatta Fabric</span>
                <p className="text-stone-600">{product.specifications.dupattaFabric || 'Matching Pure Dupatta'}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#EBE4D8] space-y-2">
                <span className="font-bold text-stone-900 block">Trouser / Shalwar Fabric</span>
                <p className="text-stone-600">{product.specifications.trouserFabric || 'Cambric / Raw Silk Pants'}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#EBE4D8] space-y-2">
                <span className="font-bold text-stone-900 block">Embellishment Work</span>
                <p className="text-stone-600">{product.specifications.embroideryType || 'Resham Threadwork & Zari'}</p>
              </div>
            </div>
          )}

          {/* Tab 3: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {/* Existing Reviews */}
              <div className="space-y-3">
                {reviews.length === 0 ? (
                  <p className="text-xs text-stone-500">No reviews yet for this outfit. Be the first to review!</p>
                ) : (
                  reviews.map((rev) => (
                    <div key={rev.id} className="bg-white p-4 rounded-xl border border-[#EBE4D8] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-stone-900">{rev.authorName}</span>
                          <span className="text-[11px] text-stone-400">({rev.city})</span>
                          {rev.verifiedPurchase && (
                            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium flex items-center gap-1">
                              <Check className="w-3 h-3" /> Verified Purchase
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-stone-400 tabular-nums">{rev.createdAt}</span>
                      </div>
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-stone-200'}`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Add Review Form */}
              <div className="bg-white p-5 rounded-xl border border-[#D5C2A5] max-w-xl">
                <h4 className="font-serif text-base font-semibold text-stone-900 mb-2">
                  Write a Customer Review
                </h4>
                {reviewSubmitted ? (
                  <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Shukriya! Your verified review has been submitted and published.</span>
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-1">Your Name</label>
                        <input
                          type="text"
                          required
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          placeholder="e.g. Areeba Tariq"
                          className="w-full bg-[#FAF8F5] border border-[#E0D5C5] rounded-lg p-2 text-xs text-stone-900 focus:outline-none focus:border-[#8C6239]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-1">City</label>
                        <input
                          type="text"
                          value={newReviewCity}
                          onChange={(e) => setNewReviewCity(e.target.value)}
                          placeholder="e.g. Lahore / Karachi"
                          className="w-full bg-[#FAF8F5] border border-[#E0D5C5] rounded-lg p-2 text-xs text-stone-900 focus:outline-none focus:border-[#8C6239]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">Star Rating</label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReviewRating(star)}
                            className="text-amber-500 p-0.5 cursor-pointer"
                          >
                            <Star className={`w-5 h-5 ${star <= newReviewRating ? 'fill-current' : 'text-stone-300'}`} />
                          </button>
                        ))}
                        <span className="text-xs text-stone-600 font-medium ml-2">{newReviewRating} / 5 Stars</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">Your Feedback & Experience</label>
                      <textarea
                        required
                        rows={3}
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        placeholder="Comment on fabric softness, stitching fit, dupatta drape, delivery..."
                        className="w-full bg-[#FAF8F5] border border-[#E0D5C5] rounded-lg p-2 text-xs text-stone-900 focus:outline-none focus:border-[#8C6239]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-[#1E1B18] text-white text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                    >
                      Submit Review
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* Tab 4: Size Chart Guide */}
          {activeTab === 'sizing' && (
            <div className="bg-white p-4 rounded-xl border border-[#EBE4D8] max-w-2xl overflow-x-auto">
              <h4 className="font-serif text-base font-semibold text-stone-900 mb-2">
                Standard Pakistani Women's Pret Size Guide (Inches)
              </h4>
              <table className="w-full text-left text-xs text-stone-700">
                <thead className="bg-[#FAF8F5] text-stone-900 font-semibold border-b border-[#E0D5C5]">
                  <tr>
                    <th className="p-2.5">Size</th>
                    <th className="p-2.5">Chest</th>
                    <th className="p-2.5">Waist</th>
                    <th className="p-2.5">Hips</th>
                    <th className="p-2.5">Shirt Length</th>
                    <th className="p-2.5">Trouser Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 tabular-nums">
                  <tr>
                    <td className="p-2.5 font-bold">XS</td>
                    <td className="p-2.5">36"</td>
                    <td className="p-2.5">32"</td>
                    <td className="p-2.5">38"</td>
                    <td className="p-2.5">39"</td>
                    <td className="p-2.5">37"</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">S</td>
                    <td className="p-2.5">38"</td>
                    <td className="p-2.5">34"</td>
                    <td className="p-2.5">40"</td>
                    <td className="p-2.5">40"</td>
                    <td className="p-2.5">38"</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">M</td>
                    <td className="p-2.5">41"</td>
                    <td className="p-2.5">37"</td>
                    <td className="p-2.5">43"</td>
                    <td className="p-2.5">41"</td>
                    <td className="p-2.5">39"</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">L</td>
                    <td className="p-2.5">44"</td>
                    <td className="p-2.5">40"</td>
                    <td className="p-2.5">46"</td>
                    <td className="p-2.5">42"</td>
                    <td className="p-2.5">39"</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">XL</td>
                    <td className="p-2.5">47"</td>
                    <td className="p-2.5">43"</td>
                    <td className="p-2.5">49"</td>
                    <td className="p-2.5">42"</td>
                    <td className="p-2.5">40"</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">XXL</td>
                    <td className="p-2.5">50"</td>
                    <td className="p-2.5">46"</td>
                    <td className="p-2.5">52"</td>
                    <td className="p-2.5">43"</td>
                    <td className="p-2.5">40"</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-[11px] text-stone-500 mt-3">
                * Note: Measurements are for stitched ready-to-wear shirts. Unstitched suits include 3.0 meters of shirt fabric for custom bespoke tailoring.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
