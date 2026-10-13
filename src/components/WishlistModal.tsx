import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPKR } from '../utils/formatters';

export const WishlistModal: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    products,
    addToCart,
    setSelectedProduct,
    setIsQuickViewOpen
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleMoveToCart = (prod: any) => {
    addToCart(prod, prod.sizes[0] || 'M', prod.colors[0]?.name || 'Standard', 1);
    toggleWishlist(prod.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="fixed inset-0" onClick={() => setIsWishlistOpen(false)} />

      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 border-l border-[#E0D5C5]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#EBE4D8] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
            <h2 className="font-serif text-lg font-semibold text-stone-900">
              My Saved Wishlist ({wishlistProducts.length})
            </h2>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 text-stone-500 hover:text-black rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Heart className="w-12 h-12 text-stone-300 mx-auto" />
              <h3 className="font-serif text-base font-medium text-stone-800">Your wishlist is empty</h3>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Save your favorite Pakistani lawn suits and evening formals to review or purchase anytime.
              </p>
            </div>
          ) : (
            wishlistProducts.map((p) => {
              const price = p.salePrice ?? p.originalPrice;
              return (
                <div
                  key={p.id}
                  className="flex gap-3.5 p-3 rounded-xl border border-[#EBE4D8] bg-[#FAF8F5]/50 hover:bg-[#FAF8F5] transition-colors"
                >
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 object-cover object-top rounded-lg bg-stone-100 shrink-0 cursor-pointer"
                    onClick={() => {
                      setSelectedProduct(p);
                      setIsQuickViewOpen(true);
                      setIsWishlistOpen(false);
                    }}
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4
                          onClick={() => {
                            setSelectedProduct(p);
                            setIsQuickViewOpen(true);
                            setIsWishlistOpen(false);
                          }}
                          className="font-serif text-sm font-semibold text-stone-900 line-clamp-1 cursor-pointer hover:text-[#8C6239]"
                        >
                          {p.title}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(p.id)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-xs text-[#8C6239] mt-0.5">{p.category} • {p.fabric}</p>
                      <span className="font-bold text-xs text-stone-900 mt-1 block tabular-nums">
                        {formatPKR(price)}
                      </span>
                    </div>

                    <button
                      onClick={() => handleMoveToCart(p)}
                      className="mt-2 w-full bg-[#1E1B18] text-white text-xs py-2 px-3 rounded-lg font-medium hover:bg-stone-800 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-amber-200" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};
