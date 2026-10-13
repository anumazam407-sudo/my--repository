import React, { useState } from 'react';
import { Mail, Phone, MapPin, Check, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { Logo } from './Logo';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { setActiveCategory, setActiveView, setIsAdminOpen, setIsTrackingModalOpen, setIsFeedbackModalOpen } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setNewsletterEmail('');
  };

  const handleNavCategory = (cat: string) => {
    setActiveCategory(cat);
    setActiveView('catalog');
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1E1B18] text-[#E0D5C5] border-t border-[#342D26]">
      {/* Newsletter Strip */}
      <div className="border-b border-stone-800 py-10 bg-[#171412]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-300 block mb-1">
                JOIN THE ATELIER PRIVILEGE CLUB
              </span>
              <h3 className="font-serif text-2xl text-white font-medium">
                Subscribe for Exclusive Eid Launches & VIP Offers
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Receive 10% off coupon code <strong className="text-amber-200">WELCOME10</strong> on your first Pakistani order.
              </p>
            </div>

            <div className="w-full md:w-auto">
              {subscribed ? (
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold bg-emerald-950/60 border border-emerald-800 px-4 py-2.5 rounded-full">
                  <Check className="w-4 h-4" />
                  <span>Welcome! Use code WELCOME10 for 10% off.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md w-full">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="bg-stone-900 border border-stone-700 text-white placeholder-stone-500 text-xs px-4 py-3 rounded-full flex-1 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="bg-amber-300 hover:bg-amber-400 text-stone-900 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" size="lg" className="items-start" />
            
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              ZAYRAH Atelier is Pakistan’s premier luxury women's fashion house, celebrating artisanal heritage, handcrafted embroidery, and contemporary pret inspired by world-class shopping boutiques.
            </p>

            <div className="space-y-2 text-xs text-stone-300 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-300 mt-0.5 shrink-0" />
                <span>Flagship Boutiques: Packages Mall (Lahore) • Dolmen Mall Clifton (Karachi) • Centaurus (Islamabad)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Customer Concierge: +92 (042) 111-929-724</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-300 shrink-0" />
                <span>atelier@zayrahfashion.pk</span>
              </div>
            </div>
          </div>

          {/* SHOP */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Shop Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={() => handleNavCategory('Everyday Wear')} className="hover:text-amber-200 transition-colors">
                  Summer Swiss Lawn
                </button>
              </li>
              <li>
                <button onClick={() => handleNavCategory('Festive Wear')} className="hover:text-amber-200 transition-colors">
                  Eid & Ramadan Festive
                </button>
              </li>
              <li>
                <button onClick={() => handleNavCategory('Premium Collection')} className="hover:text-amber-200 transition-colors">
                  Atelier Luxury Pret
                </button>
              </li>
              <li>
                <button onClick={() => handleNavCategory('Formal Wear')} className="hover:text-amber-200 transition-colors">
                  Velvet Shawls & Formals
                </button>
              </li>
              <li>
                <button onClick={() => handleNavCategory('Party Wear')} className="hover:text-amber-200 transition-colors">
                  Party Wear & Peshwas
                </button>
              </li>
              <li>
                <button onClick={() => handleNavCategory('Sale')} className="text-rose-400 font-semibold hover:text-rose-300 transition-colors">
                  Mega Festive Sale (40% Off)
                </button>
              </li>
            </ul>
          </div>

          {/* CUSTOMER CARE */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={() => setIsTrackingModalOpen(true)} className="hover:text-amber-200 transition-colors">
                  Track Pakistani Order
                </button>
              </li>
              <li>
                <button onClick={() => setIsFeedbackModalOpen(true)} className="hover:text-amber-200 transition-colors">
                  Shopping Experience Feedback
                </button>
              </li>
              <li>
                <span className="cursor-default">Nationwide COD Policy</span>
              </li>
              <li>
                <span className="cursor-default">7-Day Boutique Exchange</span>
              </li>
              <li>
                <span className="cursor-default">Pakistani Size Chart Guide</span>
              </li>
              <li>
                <span className="cursor-default">Fabric Care & Preservation</span>
              </li>
            </ul>
          </div>

          {/* ABOUT & ADMIN */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Brand & Portal
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <span className="cursor-default">About Zayrah Atelier</span>
              </li>
              <li>
                <span className="cursor-default">Our Artisan Weavers</span>
              </li>
              <li>
                <span className="cursor-default">Mall Flagship Outlets</span>
              </li>
              <li>
                <span className="cursor-default">Privacy Policy</span>
              </li>
              <li className="pt-3">
                <button
                  onClick={() => setIsAdminOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 text-amber-300 border border-amber-400/30 rounded text-xs hover:bg-stone-700 transition-colors cursor-pointer"
                >
                  <span>Admin Store Management</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div className="flex items-center gap-2">
            <span>© 2026 ZAYRAH Atelier. All rights reserved. Registered Pakistani Fashion Brand.</span>
          </div>

          <div className="flex items-center gap-4 text-stone-400">
            <span>Cash on Delivery (COD)</span>
            <span>•</span>
            <span>Raast / Bank Transfer</span>
            <span>•</span>
            <span>TCS / Leopards Express</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
