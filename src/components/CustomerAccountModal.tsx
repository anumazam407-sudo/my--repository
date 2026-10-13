import React, { useState } from 'react';
import { X, User, ShoppingBag, Heart, MapPin, Star, MessageSquare, Truck, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPKR } from '../utils/formatters';

export const CustomerAccountModal: React.FC = () => {
  const {
    isAccountModalOpen,
    setIsAccountModalOpen,
    orders,
    wishlist,
    products,
    reviews,
    feedbacks,
    setIsTrackingModalOpen
  } = useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses' | 'reviews'>('orders');

  if (!isAccountModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-y-auto flex flex-col border border-[#E0D5C5]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#EBE4D8] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1E1B18] text-amber-200 flex items-center justify-center font-serif text-lg font-bold">
              Z
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-semibold text-stone-900">
                Customer Account Dashboard
              </h2>
              <p className="text-xs text-stone-500">
                Manage your Pakistani orders, addresses, and wishlist
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAccountModalOpen(false)}
            className="p-1.5 text-stone-500 hover:text-black rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#EBE4D8] px-6 pt-3 bg-[#FAF8F5]/50 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 text-xs font-semibold tracking-wider uppercase border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'orders'
                ? 'border-[#8C6239] text-[#8C6239]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>My Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2.5 text-xs font-semibold tracking-wider uppercase border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'profile'
                ? 'border-[#8C6239] text-[#8C6239]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>My Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-4 py-2.5 text-xs font-semibold tracking-wider uppercase border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'addresses'
                ? 'border-[#8C6239] text-[#8C6239]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Delivery Addresses</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2.5 text-xs font-semibold tracking-wider uppercase border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'reviews'
                ? 'border-[#8C6239] text-[#8C6239]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Star className="w-4 h-4" />
            <span>My Reviews ({reviews.length})</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="py-12 text-center text-stone-500 text-xs">
                  You haven't placed any orders yet.
                </div>
              ) : (
                orders.map((ord) => (
                  <div key={ord.id} className="p-4 rounded-xl border border-[#E8DEC8] bg-[#FAF8F5] space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs border-b border-[#E0D5C5] pb-2.5">
                      <div>
                        <span className="text-stone-400 block text-[10px] uppercase font-semibold">Order ID</span>
                        <span className="font-mono font-bold text-stone-900">{ord.orderNumber}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[10px] uppercase font-semibold">Date</span>
                        <span>{new Date(ord.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[10px] uppercase font-semibold">Status</span>
                        <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold text-[10px] uppercase">
                          {ord.status}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setIsAccountModalOpen(false);
                          setIsTrackingModalOpen(true);
                        }}
                        className="bg-[#1E1B18] text-white px-3 py-1 rounded text-[11px] font-medium hover:bg-stone-800"
                      >
                        Live Tracking
                      </button>
                    </div>

                    <div className="space-y-2">
                      {ord.items.map((it) => (
                        <div key={it.cartItemId} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <img
                              src={it.product.images[0]}
                              alt={it.product.title}
                              referrerPolicy="no-referrer"
                              className="w-10 h-12 object-cover object-top rounded bg-stone-100"
                            />
                            <div>
                              <p className="font-semibold text-stone-900">{it.product.title}</p>
                              <p className="text-[11px] text-stone-500">Size {it.selectedSize} • {it.selectedColor} • Qty {it.quantity}</p>
                            </div>
                          </div>
                          <span className="font-bold text-stone-900 tabular-nums">
                            {formatPKR((it.product.salePrice ?? it.product.originalPrice) * it.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-[#E0D5C5] flex justify-between items-center text-xs">
                      <span className="text-stone-500">
                        Destination: {ord.customer.city}, {ord.customer.province} ({ord.paymentMethod.toUpperCase()})
                      </span>
                      <span className="font-bold text-sm text-[#8C6239] tabular-nums">
                        Total: {formatPKR(ord.totalAmount)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="max-w-md space-y-4 text-xs">
              <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#E8DEC8] space-y-3">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-semibold">Customer Name</span>
                  <span className="font-bold text-stone-900 text-sm">Hira Khan</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-semibold">Contact Phone</span>
                  <span className="font-semibold text-stone-800">0321-4567890</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-semibold">Registered Email</span>
                  <span className="font-semibold text-stone-800">hira.khan@example.com</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-semibold">VIP Loyalty Tier</span>
                  <span className="text-[#8C6239] font-bold">Gold Atelier Member • 5% Reward Credit</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl border border-[#E8DEC8] bg-[#FAF8F5]">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-stone-900">Default Home Address (Islamabad)</span>
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">Primary</span>
                </div>
                <p className="text-stone-600 leading-relaxed">
                  House 42-B, Sector F-8/2, Margalla Road, Islamabad, Islamabad Capital Territory (44000)
                </p>
                <p className="text-[11px] text-stone-500 mt-1">Recipient: Hira Khan • 0321-4567890</p>
              </div>

              <div className="p-4 rounded-xl border border-[#E8DEC8] bg-[#FAF8F5]">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-stone-900">Office / Atelier (Lahore)</span>
                </div>
                <p className="text-stone-600 leading-relaxed">
                  Suite 404, Siddiq Trade Center, Main Boulevard Gulberg, Lahore, Punjab
                </p>
                <p className="text-[11px] text-stone-500 mt-1">Recipient: Hira Khan • 0321-4567890</p>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-3">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E8DEC8] text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="font-bold text-stone-900">{rev.authorName} ({rev.city})</span>
                    <span className="text-[10px] text-stone-400">{rev.createdAt}</span>
                  </div>
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-stone-200'}`} />
                    ))}
                  </div>
                  <p className="text-stone-600">{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
