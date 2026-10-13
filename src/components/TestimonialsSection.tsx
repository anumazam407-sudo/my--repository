import React from 'react';
import { Star, Quote, MessageSquareHeart } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const TestimonialsSection: React.FC = () => {
  const { setIsFeedbackModalOpen } = useShop();

  const testimonials = [
    {
      name: 'Ayesha Siddiqui',
      city: 'Lahore (Gulberg)',
      rating: 5,
      review: 'Beautiful fabric, elegant design and exactly what I expected. I wore the embroidered chiffon to a family dinner and received countless compliments. I absolutely loved my dress!',
      outfit: 'Gul-e-Noor Embroidered Lawn 3-Piece'
    },
    {
      name: 'Dr. Fatima Tariq',
      city: 'Islamabad (F-7)',
      rating: 5,
      review: 'I usually hesitate to order stitched clothes online, but Zayrah Atelier’s Medium size fits like custom bespoke tailoring. Delivered in Islamabad in just 2 days via TCS COD.',
      outfit: 'Shahzadi Ruby Velvet Shawl & Suit'
    },
    {
      name: 'Zainab Qureshi',
      city: 'Karachi (DHA)',
      rating: 5,
      review: 'The shopping mall ambiance on the website is so true to the real boutique experience! The packaging, delicate cedar fragrance, and fabric finish reflect true Pakistani luxury.',
      outfit: 'Emerald Zari Chiffon Festive 3-Piece'
    }
  ];

  return (
    <section className="py-16 bg-[#F5EFE6] border-t border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest font-semibold text-[#8C6239] mb-1">
              Verified Patron Testimonials
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-medium">
              Loved by Women Across Pakistan
            </h2>
          </div>

          <button
            onClick={() => setIsFeedbackModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#1E1B18] text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer self-start md:self-auto"
          >
            <MessageSquareHeart className="w-4 h-4 text-amber-200" />
            <span>Share Your Shopping Experience</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-stone-200" />
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic mb-4">
                  "{item.review}"
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100">
                <h4 className="font-serif text-base font-bold text-stone-900">{item.name}</h4>
                <div className="flex items-center justify-between text-[11px] text-stone-500 mt-0.5">
                  <span>{item.city}</span>
                  <span className="text-[#8C6239] font-medium">{item.outfit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
