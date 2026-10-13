import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Star, ShieldCheck, ChevronRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import heroMallImg from '../assets/images/hero_pakistani_couture_mall_1791437703357.jpg';
import festiveChiffonImg from '../assets/images/festive_eid_chiffon_1791437722533.jpg';
import lawnLuxuryImg from '../assets/images/lawn_luxury_campaign_1791437736955.jpg';

const HERO_SLIDES = [
  {
    image: heroMallImg,
    badge: 'LUXURY MALL ATRIUM EDITION',
    tag: 'EID & FESTIVE COUTURE 2026',
    title: 'Discover the Beauty of Pakistani Fashion',
    subtitle: 'Elegant Pakistani outfits crafted to make every occasion unforgettable.',
    ctaText: 'SHOP NOW',
    secondaryCta: 'EXPLORE COLLECTION',
    category: 'Festive Wear',
    features: ['Handcrafted Resham & Zari Work', 'Pure Organza & Silk Dupattas', 'Nationwide Cash on Delivery']
  },
  {
    image: lawnLuxuryImg,
    badge: 'SUMMER LAWN ATELIER',
    tag: 'NEW ARRIVALS 2026',
    title: 'Pure Swiss Voile & Embroidered Lawn',
    subtitle: 'Breathtaking 3-piece luxury suits designed for effortless regal sophistication.',
    ctaText: 'EXPLORE LAWN',
    secondaryCta: 'VIEW LOOKBOOK',
    category: 'Everyday Wear',
    features: ['100% Breathable Egyptian Cotton', 'Intricate Cutwork Borders', 'Ready to Wear & Stitched']
  },
  {
    image: festiveChiffonImg,
    badge: 'ROYAL HEIRLOOM COLLECTION',
    tag: 'WEDDING & PARTY WEAR',
    title: 'Chiffon & Raw Silk Evening Pret',
    subtitle: 'Radiant Pakistani silhouettes drenched in antique dabka, pearls, and mirror art.',
    ctaText: 'SHOP FESTIVE',
    secondaryCta: 'CUSTOM STITCHING',
    category: 'Formal Wear',
    features: ['Heavy Zardozi Embellishments', 'Flowing Peshwas & Anarkalis', 'Delivered in 2-4 Days']
  }
];

export const Hero: React.FC = () => {
  const { setActiveCategory, setActiveView } = useShop();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  const handleShopNow = () => {
    setActiveCategory(slide.category);
    setActiveView('catalog');
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExplore = () => {
    setActiveCategory('All');
    setActiveView('catalog');
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] border-b border-[#E8DEC8]">
      {/* Subtle Shopping Mall Architectural Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-amber-100/60 to-rose-100/40 rounded-full blur-3xl transform -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-10 w-[500px] h-[400px] bg-gradient-to-tr from-amber-50/80 to-stone-100/60 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Hero Text Content */}
          <div className="lg:col-span-6 space-y-6 z-10">
            {/* Category Subtitle Kicker (Clean unboxed text) */}
            <div className="flex items-center gap-2 text-xs tracking-widest uppercase font-semibold text-[#8C6239]">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{slide.badge}</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="text-stone-500">{slide.tag}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[#1E1B18] leading-[1.15] text-balance">
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-stone-600 font-normal leading-relaxed max-w-xl text-balance">
              {slide.subtitle}
            </p>

            {/* Key Quality Bullets (Clean unboxed list) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs text-stone-600">
              {slide.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#8C6239]" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={handleShopNow}
                className="inline-flex items-center gap-2.5 bg-[#1E1B18] text-[#FAF8F5] px-7 py-3.5 rounded-full font-medium text-sm tracking-wider uppercase hover:bg-[#38312B] transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer group whitespace-nowrap"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleExplore}
                className="inline-flex items-center gap-2 bg-white/90 border border-[#D5C2A5] text-[#1E1B18] px-7 py-3.5 rounded-full font-medium text-sm tracking-wider uppercase hover:bg-[#F5EFE6] transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                <span>{slide.secondaryCta}</span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>
            </div>

            {/* Trust Markers Bar */}
            <div className="pt-4 border-t border-[#E8DEC8]/80 flex flex-wrap items-center gap-6 text-xs text-stone-500">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                <span className="font-semibold text-stone-800">4.9/5 Rating</span>
                <span>(1,500+ Verified Pakistani Reviews)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Original Designer Fabric Guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset Showcase */}
          <div className="lg:col-span-6 relative">
            {/* Shopping Mall Aura Framing */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80 bg-stone-100 group">
              <img
                src={slide.image}
                alt={slide.title}
                referrerPolicy="no-referrer"
                className="w-full h-[400px] sm:h-[480px] lg:h-[540px] object-cover object-top transition-all duration-700 hover:scale-105"
              />

              {/* Mall Ambient Overlay Card */}
              <div className="absolute bottom-4 left-4 right-4 mall-glass rounded-xl p-4 shadow-lg border border-[#D4AF37]/30 transition-transform duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] tracking-widest uppercase font-semibold text-[#8C6239]">
                      Featured Luxury Pret
                    </span>
                    <h2 className="font-serif text-lg font-medium text-stone-900 leading-tight">
                      Boutique Mall Collection
                    </h2>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Prices starting from <span className="font-semibold text-stone-900">Rs. 3,850</span>
                    </p>
                  </div>

                  <button
                    onClick={handleShopNow}
                    className="bg-[#1E1B18] text-white text-xs px-3.5 py-2 rounded-lg font-medium hover:bg-[#8C6239] transition-colors whitespace-nowrap cursor-pointer"
                  >
                    View Outfits
                  </button>
                </div>
              </div>
            </div>

            {/* Slider Dots */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentSlide === idx ? 'w-8 bg-[#8C6239]' : 'w-2 bg-stone-300 hover:bg-stone-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
