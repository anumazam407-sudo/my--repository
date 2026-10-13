import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Building2, 
  Banknote, 
  ArrowRight,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PAKISTANI_CITIES, PAKISTANI_PROVINCES, formatPKR } from '../utils/formatters';
import { PaymentMethod } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    cartShippingFee,
    cartDiscount,
    cartTotal,
    appliedCoupon,
    placeOrder,
    setLastPlacedOrder
  } = useShop();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Lahore');
  const [province, setProvince] = useState('Punjab');
  const [postalCode, setPostalCode] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      alert('Please fill out all required delivery fields.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const order = placeOrder(
        {
          fullName: fullName.trim(),
          phoneNumber: phone.trim(),
          email: email.trim() || `${phone.replace(/\D/g, '')}@zayrah-customer.pk`,
          address: address.trim(),
          city,
          province,
          postalCode: postalCode.trim() || '54000',
          deliveryNotes: deliveryNotes.trim() || undefined
        },
        paymentMethod
      );

      setIsSubmitting(false);
      setIsCheckoutOpen(false);
      setLastPlacedOrder(order);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-2xl shadow-2xl overflow-y-auto flex flex-col border border-[#E0D5C5]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#EBE4D8] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1E1B18] text-amber-200 flex items-center justify-center font-serif text-sm">
              Z
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-semibold text-stone-900">
                Express Checkout
              </h2>
              <p className="text-xs text-stone-500">
                Fast & secure delivery across Pakistan with Cash on Delivery
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-stone-500 hover:text-black rounded-lg hover:bg-stone-200 transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmitOrder} className="p-4 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Customer & Delivery Details */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <h3 className="font-serif text-base font-semibold text-stone-900 border-b border-[#F0E8DC] pb-2 mb-4 flex items-center justify-between">
                  <span>1. Delivery Information</span>
                  <span className="text-xs font-normal text-stone-500">Shipped via TCS / Leopards Express</span>
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Maryam Nawaz Khan"
                      className="w-full bg-[#FAF8F5] border border-[#E0D5C5] rounded-lg p-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#8C6239]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Phone Number (for Courier Rider) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0300-1234567"
                        className="w-full bg-[#FAF8F5] border border-[#E0D5C5] rounded-lg p-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#8C6239]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Email Address (for Receipt)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="maryam@example.com"
                        className="w-full bg-[#FAF8F5] border border-[#E0D5C5] rounded-lg p-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#8C6239]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Complete Street Address (House/Apartment #, Street, Sector) *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. House 14-C, Lane 5, DHA Phase 6, Near Main Boulevard"
                      className="w-full bg-[#FAF8F5] border border-[#E0D5C5] rounded-lg p-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#8C6239]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        City *
                      </label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#E0D5C5] rounded-lg p-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#8C6239]"
                      >
                        {PAKISTANI_CITIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Province *
                      </label>
                      <select
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#E0D5C5] rounded-lg p-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#8C6239]"
                      >
                        {PAKISTANI_PROVINCES.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="54000"
                        className="w-full bg-[#FAF8F5] border border-[#E0D5C5] rounded-lg p-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#8C6239]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Delivery Instructions / Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      value={deliveryNotes}
                      onChange={(e) => setDeliveryNotes(e.target.value)}
                      placeholder="e.g. Call before delivery, leave with guard"
                      className="w-full bg-[#FAF8F5] border border-[#E0D5C5] rounded-lg p-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#8C6239]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h3 className="font-serif text-base font-semibold text-stone-900 border-b border-[#F0E8DC] pb-2 mb-4">
                  2. Select Payment Method
                </h3>

                <div className="space-y-3">
                  {/* COD */}
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#8C6239] bg-[#FAF6F0] ring-1 ring-[#8C6239]'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-0.5 text-[#8C6239] focus:ring-[#8C6239]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-emerald-700" />
                        <span className="font-semibold text-xs text-stone-900">
                          Cash on Delivery (COD) - Most Popular in Pakistan
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Pay cash directly to the courier rider upon inspecting your parcel at your doorstep.
                      </p>
                    </div>
                  </label>

                  {/* Bank Transfer / Raast */}
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'bank_transfer'
                        ? 'border-[#8C6239] bg-[#FAF6F0] ring-1 ring-[#8C6239]'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank_transfer"
                      checked={paymentMethod === 'bank_transfer'}
                      onChange={() => setPaymentMethod('bank_transfer')}
                      className="mt-0.5 text-[#8C6239] focus:ring-[#8C6239]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-blue-700" />
                        <span className="font-semibold text-xs text-stone-900">
                          Direct Bank Transfer / Raast / EasyPaisa / JazzCash
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Meezan Bank / HBL Account details provided on confirmation screen. Send screenshot via WhatsApp.
                      </p>
                    </div>
                  </label>

                  {/* Online Card */}
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'online_card'
                        ? 'border-[#8C6239] bg-[#FAF6F0] ring-1 ring-[#8C6239]'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online_card"
                      checked={paymentMethod === 'online_card'}
                      onChange={() => setPaymentMethod('online_card')}
                      className="mt-0.5 text-[#8C6239] focus:ring-[#8C6239]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-purple-700" />
                        <span className="font-semibold text-xs text-stone-900">
                          Visa / MasterCard / UnionPay Online
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Encrypted 256-bit bank portal checkout.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* Right Column: Order Summary Review */}
            <div className="lg:col-span-5 bg-[#FAF8F5] p-5 sm:p-6 rounded-2xl border border-[#E0D5C5] flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-base font-semibold text-stone-900 border-b border-[#E8DEC8] pb-2 mb-4">
                  Order Summary ({cart.length} Outfits)
                </h3>

                {/* Items preview */}
                <div className="space-y-3 max-h-56 overflow-y-auto pr-1 no-scrollbar mb-4">
                  {cart.map((item) => (
                    <div key={item.cartItemId} className="flex gap-3 items-center text-xs">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        referrerPolicy="no-referrer"
                        className="w-12 h-14 object-cover object-top rounded bg-stone-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-stone-900 truncate">
                          {item.product.title}
                        </h4>
                        <p className="text-[11px] text-stone-500">
                          {item.selectedSize} • {item.selectedColor} • Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="font-bold text-stone-900 tabular-nums">
                        {formatPKR((item.product.salePrice ?? item.product.originalPrice) * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-2 text-xs border-t border-[#E8DEC8] pt-3 text-stone-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-stone-900 tabular-nums">{formatPKR(cartSubtotal)}</span>
                  </div>

                  {cartDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Discount ({appliedCoupon})</span>
                      <span className="tabular-nums">- {formatPKR(cartDiscount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Nationwide Express Delivery</span>
                    <span className="font-semibold text-stone-900 tabular-nums">
                      {cartShippingFee === 0 ? (
                        <span className="text-emerald-700 font-bold uppercase text-[11px]">FREE</span>
                      ) : (
                        formatPKR(cartShippingFee)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-base font-bold text-stone-900 border-t border-[#E8DEC8] pt-3">
                    <span>Total Payable</span>
                    <span className="text-lg text-[#8C6239] tabular-nums">{formatPKR(cartTotal)}</span>
                  </div>
                </div>
              </div>

              {/* Submit Button & Security Note */}
              <div className="mt-6 space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting || cart.length === 0}
                  className="w-full bg-[#1E1B18] text-white py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:bg-stone-300 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <span>Booking Your Order...</span>
                  ) : (
                    <>
                      <span>CONFIRM ORDER ({formatPKR(cartTotal)})</span>
                      <ArrowRight className="w-4 h-4 text-amber-200 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 text-center">
                  <Lock className="w-3.5 h-3.5 text-stone-400" />
                  <span>Secure 256-Bit SSL Checkout • No Hidden Taxes</span>
                </div>
              </div>

            </div>

          </div>
        </form>

      </div>
    </div>
  );
};
