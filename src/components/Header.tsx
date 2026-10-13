import React, { useState } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Truck, 
  Menu, 
  X, 
  Sparkles,
  SlidersHorizontal,
  ChevronDown,
  UserCheck,
  Plus
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Logo } from './Logo';
import { formatPKR } from '../utils/formatters';

export const Header: React.FC = () => {
  const {
    cartCount,
    cartSubtotal,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    searchQuery,
    setSearchQuery,
    setActiveCategory,
    setActiveView,
    setIsAdminOpen,
    setIsTrackingModalOpen,
    setIsFeedbackModalOpen,
    setIsAccountModalOpen,
    setIsAddProductModalOpen
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const categories = [
    { label: 'All Collection', value: 'All' },
    { label: 'Summer Lawn', value: 'Everyday Wear' },
    { label: 'Festive & Eid', value: 'Festive Wear' },
    { label: 'Luxury Pret', value: 'Premium Collection' },
    { label: 'Formal & Velvet', value: 'Formal Wear' },
    { label: 'Party Wear', value: 'Party Wear' },
    { label: 'Sale (Up to 40%)', value: 'Sale', highlight: true },
  ];

  const handleCategoryClick = (catVal: string) => {
    setActiveCategory(catVal);
    setActiveView('catalog');
    setMobileMenuOpen(false);
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EADBC8]/70">
      {/* Top Announcement Bar */}
      <div className="bg-[#1E1B18] text-[#F5EBE1] text-xs py-2 px-4 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] sm:text-xs">
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Eid-ul-Fitr Couture Edition 2026</span>
            </span>
            <span className="hidden md:inline text-white/30">|</span>
            <span className="truncate">
              Free Express Delivery in Pakistan on orders above Rs. 5,000 • COD Available
            </span>
          </div>

          <div className="flex items-center gap-4 text-white/80 shrink-0">
            <button
              onClick={() => setIsTrackingModalOpen(true)}
              className="flex items-center gap-1 hover:text-amber-200 transition-colors cursor-pointer"
            >
              <Truck className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Track Order</span>
            </button>
            <span className="text-white/30 hidden sm:inline">|</span>
            <button
              onClick={() => setIsFeedbackModalOpen(true)}
              className="hover:text-amber-200 transition-colors text-[11px] cursor-pointer hidden md:inline"
            >
              Feedback
            </button>
            <span className="text-white/30">|</span>
            <span className="font-semibold text-amber-200 tracking-wider">PKR (Rs.)</span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-stone-700 hover:text-black focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo Zone */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => { setActiveView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <Logo size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleCategoryClick(cat.value)}
                className={`text-sm tracking-wide font-medium transition-colors cursor-pointer py-1 border-b-2 ${
                  cat.highlight
                    ? 'text-rose-700 border-rose-300 font-semibold hover:text-rose-800'
                    : 'text-[#3E3933] border-transparent hover:text-[#9E7D4B] hover:border-[#9E7D4B]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </nav>

          {/* Action Zone */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Input on Desktop */}
            <div className="relative hidden md:block w-48 xl:w-64">
              <input
                type="text"
                placeholder="Search lawn, chiffon, pret..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.trim().length > 0) {
                    setActiveView('catalog');
                  }
                }}
                className="w-full bg-white/90 border border-[#E0D5C5] rounded-full pl-9 pr-4 py-1.5 text-xs text-[#1E1B18] placeholder-[#9C8F80] focus:outline-none focus:border-[#9E7D4B] focus:ring-1 focus:ring-[#9E7D4B] transition-all"
              />
              <Search className="w-4 h-4 text-[#9C8F80] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* Mobile Search Icon Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-[#9E7D4B] transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Customer Account Button */}
            <button
              onClick={() => setIsAccountModalOpen(true)}
              className="p-2 text-stone-700 hover:text-[#9E7D4B] transition-colors relative"
              title="Customer Account"
              aria-label="Account"
            >
              <UserCheck className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 text-stone-700 hover:text-[#9E7D4B] transition-colors relative"
              title="My Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#8C6239] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-[#1E1B18] text-white px-3.5 py-2 rounded-full hover:bg-[#342D26] transition-all cursor-pointer shadow-sm group"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-amber-200 group-hover:scale-105 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-amber-400 text-stone-900 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-medium text-[#FAF8F5]">
                {cartSubtotal > 0 ? formatPKR(cartSubtotal) : 'Bag'}
              </span>
            </button>

            {/* Quick Add Product Button */}
            <button
              onClick={() => setIsAddProductModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#8C6239] text-[#FAF8F5] text-xs font-semibold hover:bg-[#724e2b] transition-all shadow-sm cursor-pointer whitespace-nowrap"
              title="Add New Pakistani Dress"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add Dress</span>
            </button>

            {/* Admin Portal Quick Access */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#D5C2A5] bg-[#F7F2E9] text-[11px] font-medium text-[#7D5A2A] hover:bg-[#EFE7D8] transition-colors"
              title="Store Management & Orders"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Expandable */}
        {searchOpen && (
          <div className="py-2.5 pb-3 border-t border-[#EADBC8] md:hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Pakistani dresses, lawn, pret..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.trim().length > 0) {
                    setActiveView('catalog');
                  }
                }}
                className="w-full bg-white border border-[#E0D5C5] rounded-full pl-9 pr-4 py-2 text-sm text-[#1E1B18] placeholder-[#9C8F80] focus:outline-none focus:border-[#9E7D4B]"
                autoFocus
              />
              <Search className="w-4 h-4 text-[#9C8F80] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Flyout */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-t border-[#EADBC8] px-4 pt-3 pb-6 space-y-2 shadow-lg">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-400 px-3 py-1">
            Browse Categories
          </div>
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryClick(cat.value)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                cat.highlight
                  ? 'bg-rose-50 text-rose-700 font-semibold'
                  : 'text-stone-800 hover:bg-[#F3ECE1]'
              }`}
            >
              <span>{cat.label}</span>
              <ChevronDown className="w-4 h-4 text-stone-400 -rotate-90" />
            </button>
          ))}

          <div className="pt-3 border-t border-[#EADBC8]/70 flex flex-col gap-2">
            <button
              onClick={() => { setIsTrackingModalOpen(true); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm text-stone-700 flex items-center gap-2 hover:bg-stone-100 rounded-md"
            >
              <Truck className="w-4 h-4 text-[#8C6239]" />
              <span>Track Pakistani Order</span>
            </button>
            <button
              onClick={() => { setIsAccountModalOpen(true); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm text-stone-700 flex items-center gap-2 hover:bg-stone-100 rounded-md"
            >
              <UserCheck className="w-4 h-4 text-[#8C6239]" />
              <span>Customer Account & Orders</span>
            </button>
            <button
              onClick={() => { setIsAdminOpen(true); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-[#8C6239] flex items-center gap-2 bg-[#F3ECE1] rounded-md"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Admin Management Dashboard</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
