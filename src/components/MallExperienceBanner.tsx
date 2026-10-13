import React from 'react';
import { Sparkles, MapPin, Clock, ShieldCheck, ShoppingBag } from 'lucide-react';
import heroMallImg from '../assets/images/hero_pakistani_couture_mall_1791437703357.jpg';

export const MallExperienceBanner: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-14 bg-gradient-to-b from-[#FAF8F5] via-[#F4EDE2] to-[#FAF8F5] border-y border-[#E8DEC8]">
      {/* Soft Blurred Shopping Mall Background Silhouette */}
      <div className="absolute inset-0 opacity-15 mix-blend-multiply pointer-events-none">
        <img
          src={heroMallImg}
          alt="Luxury Mall Boutique Interior"
          className="w-full h-full object-cover filter blur-sm scale-105"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-semibold text-[#8C6239] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>The Flagship Boutique Experience</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1E1B18] font-medium leading-tight">
            Inspired by Modern Luxury Shopping Malls
          </h2>
          <p className="text-sm text-stone-600 mt-2 leading-relaxed">
            Step into our digital grand boutique — where the illuminated glass storefronts of Pakistan’s finest shopping gallerias meet effortless doorstep delivery across all 150+ cities.
          </p>
        </div>

        {/* 4 Flagship Boutique Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="mall-glass rounded-xl p-5 border border-white/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="w-10 h-10 rounded-full bg-[#F3EAD8] text-[#8C6239] flex items-center justify-center mb-3">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-stone-900 mb-1">
              Curated Mall Collections
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every season’s most anticipated lawn, festive organza, and velvet edits hand-selected directly from Pakistani couturiers.
            </p>
          </div>

          <div className="mall-glass rounded-xl p-5 border border-white/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="w-10 h-10 rounded-full bg-[#F3EAD8] text-[#8C6239] flex items-center justify-center mb-3">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-stone-900 mb-1">
              Flagship Mall Boutiques
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Flagship locations at Packages Mall (Lahore), Dolmen Mall Clifton (Karachi), and Centaurus (Islamabad) for walk-ins & fittings.
            </p>
          </div>

          <div className="mall-glass rounded-xl p-5 border border-white/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="w-10 h-10 rounded-full bg-[#F3EAD8] text-[#8C6239] flex items-center justify-center mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-stone-900 mb-1">
              Swift 2-4 Day Delivery
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Express courier dispatch via TCS & Leopard Express nationwide with doorstep Cash on Delivery and live tracking.
            </p>
          </div>

          <div className="mall-glass rounded-xl p-5 border border-white/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="w-10 h-10 rounded-full bg-[#F3EAD8] text-[#8C6239] flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-stone-900 mb-1">
              7-Day Boutique Exchange
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Hassle-free size or style exchanges online or in any of our official mall boutique salons with zero fuss.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
