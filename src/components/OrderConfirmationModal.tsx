import React from 'react';
import { CheckCircle2, X, Printer, Truck, ArrowRight, ShieldCheck, PhoneCall } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPKR } from '../utils/formatters';

export const OrderConfirmationModal: React.FC = () => {
  const { lastPlacedOrder, setLastPlacedOrder, setIsTrackingModalOpen, setActiveView } = useShop();

  if (!lastPlacedOrder) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleTrack = () => {
    setLastPlacedOrder(null);
    setIsTrackingModalOpen(true);
  };

  const handleContinueShopping = () => {
    setLastPlacedOrder(null);
    setActiveView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[92vh] bg-white rounded-2xl shadow-2xl overflow-y-auto flex flex-col border border-[#E0D5C5]">
        
        {/* Close */}
        <button
          onClick={() => setLastPlacedOrder(null)}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-black rounded-lg transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Success Banner */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-[11px] uppercase tracking-widest font-bold text-[#8C6239]">
              Alhamdulillah • Order Confirmed
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E1B18]">
              Your Order Has Been Successfully Placed
            </h2>
            <p className="text-xs text-stone-600 max-w-md mx-auto">
              Shukriya for shopping with Zayrah Atelier! We have reserved your Pakistani designer dresses and dispatched order notification to <strong className="text-stone-900">{lastPlacedOrder.customer.phoneNumber}</strong>.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-[#FAF8F5] rounded-xl p-5 border border-[#E8DEC8] space-y-4 text-xs">
            
            {/* Top row */}
            <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#E0D5C5] gap-2">
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-semibold">Order Tracking Number</span>
                <span className="font-mono text-sm font-bold text-[#8C6239]">{lastPlacedOrder.orderNumber}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-semibold">Payment Method</span>
                <span className="font-bold text-stone-900 capitalize">
                  {lastPlacedOrder.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : lastPlacedOrder.paymentMethod}
                </span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-semibold">Status</span>
                <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold uppercase text-[10px]">
                  {lastPlacedOrder.status}
                </span>
              </div>
            </div>

            {/* Customer & Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-3 border-b border-[#E0D5C5]">
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-semibold">Customer Details</span>
                <p className="font-bold text-stone-900">{lastPlacedOrder.customer.fullName}</p>
                <p className="text-stone-600">{lastPlacedOrder.customer.phoneNumber}</p>
                <p className="text-stone-600">{lastPlacedOrder.customer.email}</p>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-semibold">Delivery Destination</span>
                <p className="text-stone-700 leading-relaxed">
                  {lastPlacedOrder.customer.address}, {lastPlacedOrder.customer.city}, {lastPlacedOrder.customer.province} ({lastPlacedOrder.customer.postalCode})
                </p>
                {lastPlacedOrder.customer.deliveryNotes && (
                  <p className="text-[11px] text-[#8C6239] mt-1 italic">
                    Note: {lastPlacedOrder.customer.deliveryNotes}
                  </p>
                )}
              </div>
            </div>

            {/* Ordered Outfits List */}
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-semibold mb-2">Reserved Outfits</span>
              <div className="space-y-2">
                {lastPlacedOrder.items.map((item) => (
                  <div key={item.cartItemId} className="flex justify-between items-center py-1">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        referrerPolicy="no-referrer"
                        className="w-10 h-12 object-cover object-top rounded bg-stone-100"
                      />
                      <div>
                        <p className="font-semibold text-stone-900">{item.product.title}</p>
                        <p className="text-[11px] text-stone-500">
                          Size: {item.selectedSize} • Color: {item.selectedColor} • Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-stone-900 tabular-nums">
                      {formatPKR((item.product.salePrice ?? item.product.originalPrice) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="pt-3 border-t border-[#E0D5C5] space-y-1 text-right">
              <div className="text-stone-500">
                Subtotal: <span className="text-stone-900 font-semibold">{formatPKR(lastPlacedOrder.subtotal)}</span>
              </div>
              {lastPlacedOrder.discountAmount > 0 && (
                <div className="text-emerald-700">
                  Discount: <span>- {formatPKR(lastPlacedOrder.discountAmount)}</span>
                </div>
              )}
              <div className="text-stone-500">
                Shipping Fee: <span className="text-stone-900 font-semibold">{lastPlacedOrder.shippingFee === 0 ? 'FREE' : formatPKR(lastPlacedOrder.shippingFee)}</span>
              </div>
              <div className="text-base font-bold text-stone-900 pt-1">
                Total Payable at Doorstep: <span className="text-[#8C6239]">{formatPKR(lastPlacedOrder.totalAmount)}</span>
              </div>
            </div>

          </div>

          {/* Delivery Note */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 flex items-start gap-3 text-xs text-amber-900">
            <Truck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Next Steps for Delivery:</span>
              <p className="mt-0.5 text-stone-600">
                Our logistics manager will inspect and seal your order in our signature dustbag. You will receive a courier SMS with live dispatch tracking within 12 hours. Delivery time is 2-4 business days across Pakistan.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 border border-stone-300 text-stone-700 px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice Receipt</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={handleTrack}
                className="bg-[#8C6239] text-white px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-[#734e29] transition-colors cursor-pointer"
              >
                Track Live Parcel
              </button>

              <button
                onClick={handleContinueShopping}
                className="bg-[#1E1B18] text-white px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
