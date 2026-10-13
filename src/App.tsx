import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MallExperienceBanner } from './components/MallExperienceBanner';
import { CategoryBanners } from './components/CategoryBanners';
import { FlashSale } from './components/FlashSale';
import { CatalogSection } from './components/CatalogSection';
import { TrustPillars } from './components/TrustPillars';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FashionGallery } from './components/FashionGallery';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { CustomerAccountModal } from './components/CustomerAccountModal';
import { CustomerFeedbackModal } from './components/CustomerFeedbackModal';
import { WishlistModal } from './components/WishlistModal';
import { AdminDashboard } from './components/AdminDashboard';
import { QuickAddProductModal } from './components/QuickAddProductModal';
import { ToastNotification } from './components/ToastNotification';

const MainLayout: React.FC = () => {
  const {
    selectedProduct,
    isQuickViewOpen,
    setIsQuickViewOpen,
    setSelectedProduct
  } = useShop();

  const handleCloseDetailModal = () => {
    setIsQuickViewOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen flex flex-col mall-backdrop">
      {/* Sticky Header with Logo & Navigation */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Grand Hero Section */}
        <Hero />

        {/* 2. Shopping Mall Inspired Atmosphere Banner */}
        <MallExperienceBanner />

        {/* 3. Pakistani Fashion Category Banners */}
        <CategoryBanners />

        {/* 4. Mega Festive Sale with Live Countdown */}
        <FlashSale />

        {/* 5. Complete Pakistani Clothing Catalog & Filters */}
        <CatalogSection />

        {/* 6. Brand Impression & Trust Pillars */}
        <TrustPillars />

        {/* 7. Patron Testimonials & Reviews */}
        <TestimonialsSection />

        {/* 8. Lookbook Fashion Gallery */}
        <FashionGallery />
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Overlays and Functional Modals */}
      {selectedProduct && isQuickViewOpen && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={handleCloseDetailModal}
        />
      )}

      <CartDrawer />
      <CheckoutModal />
      <OrderConfirmationModal />
      <OrderTrackingModal />
      <CustomerAccountModal />
      <CustomerFeedbackModal />
      <WishlistModal />
      <AdminDashboard />
      <QuickAddProductModal />
      <ToastNotification />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainLayout />
    </ShopProvider>
  );
}
