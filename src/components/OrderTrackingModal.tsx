import React, { useState } from 'react';
import { X, Search, Truck, CheckCircle2, Clock, PackageCheck, AlertCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Order, OrderStatus } from '../types';
import { formatPKR } from '../utils/formatters';

const STATUS_STEPS: OrderStatus[] = [
  'Pending',
  'Confirmed',
  'Processing',
  'Shipped',
  'Out for Delivery',
  'Delivered'
];

export const OrderTrackingModal: React.FC = () => {
  const { isTrackingModalOpen, setIsTrackingModalOpen, orders } = useShop();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(orders[0] || null);
  const [searchAttempted, setSearchAttempted] = useState(false);

  if (!isTrackingModalOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchAttempted(true);
    const clean = searchTerm.trim().toLowerCase();
    const found = orders.find(
      (o) =>
        o.orderNumber.toLowerCase().includes(clean) ||
        o.customer.phoneNumber.replace(/\D/g, '').includes(clean.replace(/\D/g, ''))
    );
    setSearchedOrder(found || null);
  };

  const getStepIndex = (status: OrderStatus) => {
    return STATUS_STEPS.indexOf(status);
  };

  const activeIndex = searchedOrder ? getStepIndex(searchedOrder.status) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-y-auto flex flex-col border border-[#E0D5C5]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#EBE4D8] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#8C6239]" />
            <h2 className="font-serif text-lg sm:text-xl font-semibold text-stone-900">
              Track Your Pakistani Order
            </h2>
          </div>
          <button
            onClick={() => setIsTrackingModalOpen(false)}
            className="p-1.5 text-stone-500 hover:text-black rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-8 space-y-6">
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter Order # (e.g. ZYR-PK-98214) or Phone Number"
                className="w-full bg-[#FAF8F5] border border-[#E0D5C5] rounded-xl pl-9 pr-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#8C6239]"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <button
              type="submit"
              className="bg-[#1E1B18] text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-stone-800 transition-colors"
            >
              Track Order
            </button>
          </form>

          {/* Results display */}
          {searchedOrder ? (
            <div className="space-y-6">
              
              {/* Order Meta Box */}
              <div className="bg-[#FAF8F5] rounded-xl p-4 border border-[#E8DEC8] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-semibold">Order Number</span>
                  <span className="font-mono text-sm font-bold text-[#8C6239]">{searchedOrder.orderNumber}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-semibold">Recipient</span>
                  <span className="font-semibold text-stone-900">{searchedOrder.customer.fullName} ({searchedOrder.customer.city})</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-semibold">Total (COD)</span>
                  <span className="font-bold text-stone-900">{formatPKR(searchedOrder.totalAmount)}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-semibold">Current State</span>
                  <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold uppercase text-[10px]">
                    {searchedOrder.status}
                  </span>
                </div>
              </div>

              {/* Progress Stepper */}
              <div className="py-2">
                <div className="relative flex items-center justify-between">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-stone-200 w-full z-0" />
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#8C6239] transition-all duration-500 z-0"
                    style={{
                      width: `${(Math.max(0, activeIndex) / (STATUS_STEPS.length - 1)) * 100}%`
                    }}
                  />

                  {STATUS_STEPS.map((step, idx) => {
                    const isCompleted = idx <= activeIndex;
                    const isCurrent = idx === activeIndex;
                    return (
                      <div key={step} className="relative z-10 flex flex-col items-center">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                            isCompleted
                              ? 'bg-[#8C6239] text-white ring-4 ring-[#FAF8F5]'
                              : 'bg-stone-200 text-stone-500 ring-4 ring-[#FAF8F5]'
                          } ${isCurrent ? 'ring-[#8C6239]/30 scale-110' : ''}`}
                        >
                          {isCompleted ? '✓' : idx + 1}
                        </div>
                        <span
                          className={`text-[9px] sm:text-[10px] mt-2 font-medium tracking-tight whitespace-nowrap ${
                            isCurrent
                              ? 'text-[#8C6239] font-bold'
                              : isCompleted
                              ? 'text-stone-800'
                              : 'text-stone-400'
                          }`}
                        >
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status History Timeline */}
              <div className="space-y-3 pt-2">
                <h4 className="font-serif text-sm font-semibold text-stone-900 border-b border-[#F0E8DC] pb-1.5">
                  Live Dispatch Activity
                </h4>
                <div className="space-y-2.5">
                  {searchedOrder.statusHistory.map((hist, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs">
                      <div className="w-2 h-2 rounded-full bg-[#8C6239] mt-1.5 shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900 uppercase text-[11px]">{hist.status}</span>
                          <span className="text-stone-400 text-[10px] tabular-nums">
                            {new Date(hist.timestamp).toLocaleDateString()} {new Date(hist.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-stone-600 text-[11px] mt-0.5">{hist.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : searchAttempted ? (
            <div className="p-8 text-center bg-stone-50 rounded-xl border border-stone-200">
              <AlertCircle className="w-8 h-8 text-stone-400 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-stone-800">No matching order found</h4>
              <p className="text-xs text-stone-500 mt-1">
                Please verify your order tracking ID or phone number. Sample order: <strong>ZYR-PK-98214</strong>
              </p>
            </div>
          ) : null}

        </div>

      </div>
    </div>
  );
};
