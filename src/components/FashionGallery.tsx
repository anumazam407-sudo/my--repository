import React from 'react';
import { Instagram, Sparkles } from 'lucide-react';
import lawnLuxuryImg from '../assets/images/lawn_luxury_campaign_1791437736955.jpg';
import festiveChiffonImg from '../assets/images/festive_eid_chiffon_1791437722533.jpg';
import royalVelvetImg from '../assets/images/royal_velvet_evening_1791437754980.jpg';
import heroMallImg from '../assets/images/hero_pakistani_couture_mall_1791437703357.jpg';

export const FashionGallery: React.FC = () => {
  const images = [
    { src: heroMallImg, title: 'Mall Atrium Pret Lookbook', tag: '#ZayrahMallEdition' },
    { src: festiveChiffonImg, title: 'Festive Zari Chiffon Edit', tag: '#PakistaniCouture' },
    { src: lawnLuxuryImg, title: 'Summer Swiss Voile Lawn', tag: '#LuxuryLawn2026' },
    { src: royalVelvetImg, title: 'Royal Winter Velvet Soiree', tag: '#HeirloomVelvet' },
  ];

  return (
    <section className="py-16 bg-[#FAF8F5] border-t border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#8C6239] mb-1">
            <Instagram className="w-4 h-4" />
            <span>@ZAYRAHATELIER.PK</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-medium">
            Fashion Gallery & Lookbook
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Tag us in your festive moments to be featured in our grand boutique lookbook gallery.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className="group relative rounded-xl overflow-hidden aspect-[4/5] bg-stone-100 shadow-sm"
            >
              <img
                src={img.src}
                alt={img.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <span className="text-[10px] uppercase font-bold text-amber-200">{img.tag}</span>
                <span className="font-serif text-sm font-semibold">{img.title}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
