import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, Tag, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPKR } from '../utils/formatters';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartSubtotal,
    cartShippingFee,
    cartDiscount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    cartTotal,
    setIsCheckoutOpen
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 5000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
    if (res.success) {
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={() => setIsCartOpen(false)} />

      {/* Drawer panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 border-l border-[#E0D5C5]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#EBE4D8] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#8C6239]" />
            <h2 className="font-serif text-lg font-semibold text-stone-900">
              Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-stone-400 hover:text-rose-600 text-xs font-semibold px-2 py-1 rounded hover:bg-stone-100 transition-colors"
                title="Remove all items from cart"
              >
                Clear All
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-stone-500 hover:text-black rounded-lg hover:bg-stone-200 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Free Delivery Goal Tracker */}
        <div className="bg-[#F5EFE6] px-5 py-3 border-b border-[#E8DEC8]">
          <div className="flex items-center justify-between text-xs font-medium text-stone-800 mb-1.5">
            {remainingForFreeShipping > 0 ? (
              <span>Add <strong className="text-[#8C6239]">{formatPKR(remainingForFreeShipping)}</strong> more for <strong>FREE Nationwide Express Delivery</strong></span>
            ) : (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Congratulations! You unlocked Free Delivery in Pakistan
              </span>
            )}
          </div>
          <div className="w-full bg-[#E0D5C5] rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#8C6239] h-full transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
              <h3 className="font-serif text-lg font-medium text-stone-800">Your shopping bag is empty</h3>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore our luxury lawn, festive chiffon, and pret collections to begin styling your wardrobe.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="bg-[#1E1B18] text-white text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-stone-800 transition-colors"
              >
                Browse Pakistani Outfits
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const itemPrice = item.product.salePrice ?? item.product.originalPrice;
              return (
                <div
                  key={item.cartItemId}
                  className="flex gap-3.5 p-3 rounded-xl border border-[#EBE4D8] bg-[#FAF8F5]/50 hover:bg-[#FAF8F5] transition-colors"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 object-cover object-top rounded-lg bg-stone-100 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-serif text-sm font-semibold text-stone-900 line-clamp-1">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-xs text-stone-500 mt-0.5 space-x-2">
                        <span>Size: <strong className="text-stone-800">{item.selectedSize}</strong></span>
                        <span>·</span>
                        <span>Color: <strong className="text-stone-800">{item.selectedColor}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#E0D5C5] rounded bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                          className="px-2 py-0.5 text-stone-600 hover:bg-stone-100 text-xs"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-bold text-stone-900 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                          className="px-2 py-0.5 text-stone-600 hover:bg-stone-100 text-xs"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-bold text-xs text-stone-900 tabular-nums">
                        {formatPKR(itemPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer / Summary if items in cart */}
        {cart.length > 0 && (
          <div className="border-t border-[#EBE4D8] p-4 sm:p-5 bg-[#FAF8F5] space-y-3.5">
            {/* Promo Code Form */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-2 rounded-lg text-xs">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Coupon <strong>{appliedCoupon}</strong> Applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-rose-600 hover:underline font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Coupon (e.g. EID2026 or WELCOME10)"
                    className="flex-1 bg-white border border-[#E0D5C5] rounded-lg px-3 py-1.5 text-xs text-stone-900 uppercase focus:outline-none focus:border-[#8C6239]"
                  />
                  <button
                    type="submit"
                    className="bg-[#1E1B18] text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponFeedback && !appliedCoupon && (
                <p className={`text-[11px] mt-1 ${couponFeedback.success ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {couponFeedback.message}
                </p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600 border-t border-[#E8DEC8] pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900 tabular-nums">{formatPKR(cartSubtotal)}</span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Special Discount ({appliedCoupon})</span>
                  <span className="tabular-nums">- {formatPKR(cartDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Nationwide Shipping</span>
                <span className="font-semibold text-stone-900 tabular-nums">
                  {cartShippingFee === 0 ? (
                    <span className="text-emerald-700 uppercase font-bold text-[11px]">FREE</span>
                  ) : (
                    formatPKR(cartShippingFee)
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm font-bold text-stone-900 border-t border-[#E8DEC8] pt-2">
                <span>Total Amount (PKR)</span>
                <span className="text-base text-[#8C6239] tabular-nums">{formatPKR(cartTotal)}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full bg-[#1E1B18] text-white py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#38312B] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer group"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4 text-amber-200 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
