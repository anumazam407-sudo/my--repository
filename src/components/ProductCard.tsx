import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star, Check, Trash2 } from 'lucide-react';
import { Product, ProductSize } from '../types';
import { useShop } from '../context/ShopContext';
import { formatPKR } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    isInWishlist,
    toggleWishlist,
    addToCart,
    setSelectedProduct,
    setIsQuickViewOpen,
    deleteProduct,
    isManageMode
  } = useShop();

  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Standard');
  const [selectedSize, setSelectedSize] = useState<ProductSize>(product.sizes[0] || 'M');
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const isLiked = isInWishlist(product.id);
  const hasSale = product.salePrice && product.salePrice < product.originalPrice;
  const currentPrice = product.salePrice ?? product.originalPrice;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedSize, selectedColor, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1600);
  };

  const handleCardClick = () => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    deleteProduct(product.id);
  };

  const isOutOfStock = product.stock <= 0;

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col bg-white rounded-xl border border-[#EBE4D8] overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#D5C2A5] cursor-pointer"
    >
      {/* Product Image Showcase with Image Hover Flip if multiple images exist */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100">
        <img
          src={product.images[0]}
          alt={product.title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />

        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.title} Alternate View`}
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full object-cover object-top opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}

        {/* Top Floating Badges (Sale % or New Arrival) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {hasSale && (
            <span className="bg-[#800F2F] text-white text-[11px] font-bold px-2 py-0.5 rounded tracking-wide shadow-sm">
              {product.discountPercent}% OFF
            </span>
          )}
          {product.isNewArrival && !hasSale && (
            <span className="bg-[#1E1B18] text-amber-200 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded shadow-sm">
              New Arrival
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-[#8C6239] text-white text-[10px] font-medium tracking-wide px-2 py-0.5 rounded shadow-sm">
              Best Seller
            </span>
          )}
        </div>

        {/* Top Right Actions: Wishlist and Direct Remove Dress */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
          {/* Direct Remove Dress Button */}
          <button
            type="button"
            onClick={handleRemove}
            className={`h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${
              confirmDelete
                ? 'bg-rose-700 text-white px-2.5 text-[10px] font-bold gap-1'
                : isManageMode
                ? 'w-8 bg-rose-50 text-rose-700 border border-rose-300 hover:bg-rose-700 hover:text-white'
                : 'w-8 bg-white/90 backdrop-blur-sm text-stone-500 hover:text-rose-700 hover:bg-rose-50 opacity-0 group-hover:opacity-100'
            }`}
            title={confirmDelete ? 'Click again to confirm delete' : 'Remove dress from store'}
            aria-label="Remove Product"
          >
            <Trash2 className="w-3.5 h-3.5" />
            {confirmDelete && <span>Remove?</span>}
          </button>

          {/* Wishlist Heart Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-stone-700 hover:text-rose-600 transition-colors shadow-sm"
            aria-label={isLiked ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart
              className={`w-4 h-4 transition-transform ${
                isLiked ? 'fill-rose-600 text-rose-600 scale-110' : ''
              }`}
            />
          </button>
        </div>

        {/* Quick View Overlay Button */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
              setIsQuickViewOpen(true);
            }}
            className="flex-1 bg-white/95 backdrop-blur-md text-[#1E1B18] py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#1E1B18] hover:text-white transition-all shadow-md"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-2.5">
        <div>
          {/* Category & Fabric Metadata (Zero-pill text separator discipline) */}
          <div className="flex items-center gap-2 text-xs text-[#8C6239] font-medium tracking-wide">
            <span className="uppercase">{product.category}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="truncate text-stone-500">{product.subCategory}</span>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-base font-semibold text-[#1E1B18] line-clamp-1 group-hover:text-[#8C6239] transition-colors mt-1">
            {product.title}
          </h3>

          {/* Fabric Note */}
          <p className="text-xs text-stone-500 truncate mt-0.5">
            {product.fabric}
          </p>

          {/* Star Rating & Reviews */}
          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-stone-600">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-semibold text-stone-800 tabular-nums">{product.rating.toFixed(1)}</span>
            <span className="text-stone-400 tabular-nums">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Price & Action Area */}
        <div className="pt-2 border-t border-[#F2ECE1]">
          {/* Color swatches preview */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5">
              {product.colors.slice(0, 4).map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(c.name);
                  }}
                  className={`w-4 h-4 rounded-full border transition-all ${
                    selectedColor === c.name
                      ? 'border-[#8C6239] ring-2 ring-[#8C6239]/30 scale-110'
                      : 'border-stone-300 hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-[10px] text-stone-500">+{product.colors.length - 4}</span>
              )}
            </div>

            {/* Available Sizes Tag */}
            <div className="text-[11px] text-stone-500 font-medium">
              {product.sizes.join(', ')}
            </div>
          </div>

          {/* Pricing Row in Pakistani Rupees */}
          <div className="flex items-baseline justify-between gap-2">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-[#1E1B18] tabular-nums">
                {formatPKR(currentPrice)}
              </span>
              {hasSale && (
                <span className="text-xs text-stone-400 line-through tabular-nums">
                  {formatPKR(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Quick Add Button */}
            <button
              type="button"
              disabled={isOutOfStock}
              onClick={handleQuickAdd}
              className={`p-2 rounded-lg transition-all duration-200 ${
                addedAnimation
                  ? 'bg-emerald-700 text-white'
                  : isOutOfStock
                  ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                  : 'bg-[#FAF8F5] text-[#1E1B18] border border-[#E0D5C5] hover:bg-[#1E1B18] hover:text-white'
              }`}
              title={isOutOfStock ? 'Out of Stock' : 'Add to Bag'}
            >
              {addedAnimation ? (
                <Check className="w-4 h-4" />
              ) : (
                <ShoppingBag className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
