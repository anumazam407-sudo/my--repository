import React from 'react';
import { Sparkles, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const TrustPillars: React.FC = () => {
  return (
    <section className="py-16 bg-[#FAF8F5] border-t border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest font-semibold text-[#8C6239] mb-1">
            Customer Impression & Heritage
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-medium leading-tight">
            Fashion That Feels Like You
          </h2>
          <p className="text-sm text-stone-600 mt-2 leading-relaxed">
            Discover thoughtfully designed Pakistani outfits created for everyday elegance, celebrations, and unforgettable moments.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white rounded-2xl p-8 border border-[#EBE4D8] shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-[#FAF5EC] text-[#8C6239] flex items-center justify-center mb-5 border border-[#E0D5C5]">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-stone-900 mb-2">
              PREMIUM QUALITY
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed max-w-xs">
              Pure Swiss lawn, genuine Micro 9000 velvet, and artisanal zari threadwork. Each garment passes strict hand-finish inspection before dispatch.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-[#EBE4D8] shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-[#FAF5EC] text-[#8C6239] flex items-center justify-center mb-5 border border-[#E0D5C5]">
              <Truck className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-stone-900 mb-2">
              FAST DELIVERY (COD)
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed max-w-xs">
              Nationwide delivery across 150+ Pakistani cities in 2-4 business days. Convenient doorstep Cash on Delivery (COD) with SMS dispatch tracking.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-[#EBE4D8] shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-[#FAF5EC] text-[#8C6239] flex items-center justify-center mb-5 border border-[#E0D5C5]">
              <RefreshCw className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-stone-900 mb-2">
              CUSTOMER SATISFACTION
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed max-w-xs">
              7-day hassle-free exchange policy. Exchange online or visit any of our flagship luxury shopping mall boutique counters in Lahore and Karachi.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
