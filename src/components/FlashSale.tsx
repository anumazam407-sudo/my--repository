import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Clock, Tag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';

export const FlashSale: React.FC = () => {
  const { products, setActiveCategory, setActiveView } = useShop();

  // 24 hour countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 18,
    minutes: 42,
    seconds: 15
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const saleProducts = products.filter(p => p.isSale || (p.discountPercent && p.discountPercent > 0)).slice(0, 4);

  const handleViewAllSale = () => {
    setActiveCategory('Sale');
    setActiveView('catalog');
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (saleProducts.length === 0) return null;

  return (
    <section className="py-14 bg-gradient-to-r from-[#F7EBE8] via-[#FAF2EC] to-[#F5EBE1] border-y border-[#ECD8D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Sale Header with Countdown */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-8 border-b border-[#E8C5BE]/60 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#9E2A2B] mb-1">
              <Tag className="w-3.5 h-3.5" />
              <span>LIMITED TIME EID FESTIVAL OFFER</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1E1B18]">
              Mega Festive Sale • Up to 40% Off
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Handcrafted Pakistani pret, luxury unstitched lawn, and festive chiffon suits at exclusive reduced prices.
            </p>
          </div>

          {/* Countdown Clock Box */}
          <div className="flex items-center gap-4 bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl border border-[#E8C5BE] shadow-sm shrink-0">
            <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
              <Clock className="w-4 h-4 text-[#9E2A2B]" />
              <span className="hidden sm:inline">Offer Ends In:</span>
            </div>

            <div className="flex items-center gap-2 text-center">
              <div className="bg-[#1E1B18] text-white px-2.5 py-1.5 rounded-lg min-w-[40px]">
                <span className="font-bold text-sm sm:text-base tabular-nums">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="block text-[8px] uppercase tracking-wider text-amber-200">Hours</span>
              </div>
              <span className="font-bold text-stone-400">:</span>
              <div className="bg-[#1E1B18] text-white px-2.5 py-1.5 rounded-lg min-w-[40px]">
                <span className="font-bold text-sm sm:text-base tabular-nums">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="block text-[8px] uppercase tracking-wider text-amber-200">Mins</span>
              </div>
              <span className="font-bold text-stone-400">:</span>
              <div className="bg-[#1E1B18] text-white px-2.5 py-1.5 rounded-lg min-w-[40px]">
                <span className="font-bold text-sm sm:text-base tabular-nums">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="block text-[8px] uppercase tracking-wider text-amber-200">Secs</span>
              </div>
            </div>

            <button
              onClick={handleViewAllSale}
              className="ml-2 bg-[#9E2A2B] hover:bg-[#800F2F] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer hidden sm:flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Sale Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
          {saleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center sm:hidden">
          <button
            onClick={handleViewAllSale}
            className="w-full bg-[#9E2A2B] text-white py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2"
          >
            <span>Explore All Discounted Suits</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
