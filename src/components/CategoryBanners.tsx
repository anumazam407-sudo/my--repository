import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import lawnLuxuryImg from '../assets/images/lawn_luxury_campaign_1791437736955.jpg';
import festiveChiffonImg from '../assets/images/festive_eid_chiffon_1791437722533.jpg';
import royalVelvetImg from '../assets/images/royal_velvet_evening_1791437754980.jpg';
import heroMallImg from '../assets/images/hero_pakistani_couture_mall_1791437703357.jpg';

interface BannerItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tag: string;
  image: string;
}

export const CategoryBanners: React.FC = () => {
  const { setActiveCategory, setActiveView } = useShop();

  const banners: BannerItem[] = [
    {
      id: 'b-1',
      title: 'Summer Luxury Lawn',
      category: 'Everyday Wear',
      description: 'Superfine Swiss voile lawn 3-piece suits paired with pure silk dupattas and cutwork embroidery.',
      tag: 'NEW SUMMER EDIT',
      image: lawnLuxuryImg
    },
    {
      id: 'b-2',
      title: 'Eid & Festive Chiffon',
      category: 'Festive Wear',
      description: 'Regal emerald and gold zari embroidered chiffon ensembles tailored for grand celebrations.',
      tag: 'EID SPECIAL',
      image: festiveChiffonImg
    },
    {
      id: 'b-3',
      title: 'Royal Velvet & Formals',
      category: 'Formal Wear',
      description: 'Micro 9000 pure velvet suits with heavy antique tilla shawls and heirloom zardozi handwork.',
      tag: 'HEIRLOOM FORMALS',
      image: royalVelvetImg
    },
    {
      id: 'b-4',
      title: 'Atelier Luxury Pret',
      category: 'Premium Collection',
      description: 'Ready-to-wear sheer organza, raw silk and Lakhnavi chikankari kurtas with immaculate tailoring.',
      tag: 'READY TO SHIP',
      image: heroMallImg
    }
  ];

  const handleBannerClick = (cat: string) => {
    setActiveCategory(cat);
    setActiveView('catalog');
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-14 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest font-semibold text-[#8C6239] mb-1">
              Curated Pakistani Aesthetics
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-medium">
              Signature Collections
            </h2>
          </div>
          <p className="text-sm text-stone-600 max-w-md">
            Explore diverse Pakistani design houses, from breathable morning lawn to resplendent evening festive wear.
          </p>
        </div>

        {/* 4 Feature Category Banners */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {banners.map((item) => (
            <div
              key={item.id}
              onClick={() => handleBannerClick(item.category)}
              className="group relative rounded-xl overflow-hidden aspect-[4/5] bg-stone-900 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-108 opacity-85 group-hover:opacity-95"
              />

              {/* Scrim Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300" />

              {/* Banner Text Overlay */}
              <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-300 mb-1">
                  {item.tag}
                </span>
                <h3 className="font-serif text-xl font-medium leading-tight text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-white/80 line-clamp-2 mb-4 leading-relaxed">
                  {item.description}
                </p>

                <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-200 group-hover:text-white transition-colors">
                  <span>SHOP NOW</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
