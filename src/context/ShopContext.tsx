import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, ProductReview, GeneralFeedback, ProductSize, OrderStatus } from '../types';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS } from '../data/initialProducts';

interface ShopContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  duplicateProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: ProductSize, color: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartShippingFee: number;
  cartDiscount: number;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  cartTotal: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders
  orders: Order[];
  placeOrder: (customer: Order['customer'], paymentMethod: Order['paymentMethod']) => Order;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus, note?: string) => void;
  lastPlacedOrder: Order | null;
  setLastPlacedOrder: (order: Order | null) => void;

  // Reviews
  reviews: ProductReview[];
  addReview: (review: Omit<ProductReview, 'id' | 'createdAt' | 'approved'>) => void;
  approveReview: (reviewId: string) => void;
  hideReview: (reviewId: string) => void;
  deleteReview: (reviewId: string) => void;
  getProductReviews: (productId: string) => ProductReview[];

  // Feedback
  feedbacks: GeneralFeedback[];
  addFeedback: (feedback: Omit<GeneralFeedback, 'id' | 'createdAt'>) => void;

  // Navigation & Modals
  activeView: 'home' | 'catalog';
  setActiveView: (view: 'home' | 'catalog') => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  isQuickViewOpen: boolean;
  setIsQuickViewOpen: (open: boolean) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isFeedbackModalOpen: boolean;
  setIsFeedbackModalOpen: (open: boolean) => void;
  isTrackingModalOpen: boolean;
  setIsTrackingModalOpen: (open: boolean) => void;
  isAccountModalOpen: boolean;
  setIsAccountModalOpen: (open: boolean) => void;
  isAddProductModalOpen: boolean;
  setIsAddProductModalOpen: (open: boolean) => void;
  isManageMode: boolean;
  setIsManageMode: (manage: boolean) => void;
  resetToDefaultProducts: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Search & Filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  activeFabric: string;
  setActiveFabric: (fabric: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  resetFilters: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'zayrah_products_v1',
  CART: 'zayrah_cart_v1',
  WISHLIST: 'zayrah_wishlist_v1',
  ORDERS: 'zayrah_orders_v1',
  REVIEWS: 'zayrah_reviews_v1',
  FEEDBACKS: 'zayrah_feedbacks_v1',
  COUPON: 'zayrah_coupon_v1',
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load products with fallback
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PRODUCTS;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ['prod-1', 'prod-3'];
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Initial sample Pakistani order so Admin / Account tracking displays rich data right away
    return [
      {
        id: 'ord-1001',
        orderNumber: 'ZYR-PK-98214',
        createdAt: '2026-10-06T14:30:00.000Z',
        customer: {
          fullName: 'Hira Khan',
          phoneNumber: '0321-4567890',
          email: 'hira.khan@example.com',
          address: 'House 42-B, Sector F-8/2, Margalla Road',
          city: 'Islamabad',
          province: 'Islamabad Capital Territory',
          postalCode: '44000',
          deliveryNotes: 'Please ring bell twice, deliver before 6 PM.'
        },
        items: [
          {
            cartItemId: 'item-101',
            productId: 'prod-1',
            product: INITIAL_PRODUCTS[0],
            selectedColor: 'Pastel Peach',
            selectedSize: 'M',
            quantity: 1
          }
        ],
        subtotal: 6800,
        shippingFee: 0, // Free above Rs 5000
        discountAmount: 0,
        totalAmount: 6800,
        paymentMethod: 'cod',
        status: 'Out for Delivery',
        statusHistory: [
          { status: 'Pending', timestamp: '2026-10-06T14:30:00.000Z', note: 'Order placed via website (COD).' },
          { status: 'Confirmed', timestamp: '2026-10-06T15:10:00.000Z', note: 'Verified by Pakistani customer care team.' },
          { status: 'Processing', timestamp: '2026-10-06T17:00:00.000Z', note: 'Packaged in premium Zayrah gift box.' },
          { status: 'Shipped', timestamp: '2026-10-07T09:30:00.000Z', note: 'Handed over to TCS Courier Express (Tracking # TCS-892147).' },
          { status: 'Out for Delivery', timestamp: '2026-10-07T12:00:00.000Z', note: 'Courier rider on the way.' }
        ]
      }
    ];
  });

  // Reviews
  const [reviews, setReviews] = useState<ProductReview[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_REVIEWS;
  });

  // General Feedbacks
  const [feedbacks, setFeedbacks] = useState<GeneralFeedback[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FEEDBACKS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 'fb-1',
        name: 'Sadia Malik',
        email: 'sadia.m@gmail.com',
        rating: 5,
        category: 'Fabric Quality',
        message: 'The lawn fabric breathability is unmatched! It feels truly luxurious in hot weather.',
        createdAt: '2026-10-05'
      },
      {
        id: 'fb-2',
        name: 'Nadia Afzal',
        email: 'nadia.afzal@yahoo.com',
        rating: 5,
        category: 'Delivery Speed',
        message: 'Ordered from Karachi and received the package in less than 48 hours. Beautiful presentation!',
        createdAt: '2026-10-04'
      }
    ];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEYS.COUPON) || null;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FEEDBACKS, JSON.stringify(feedbacks));
  }, [feedbacks]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem(STORAGE_KEYS.COUPON, appliedCoupon);
    } else {
      localStorage.removeItem(STORAGE_KEYS.COUPON);
    }
  }, [appliedCoupon]);

  // Navigation & View Modals
  const [activeView, setActiveView] = useState<'home' | 'catalog'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isManageMode, setIsManageMode] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 3200);
  };

  const resetToDefaultProducts = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    showToast('Catalog restored to all 12 default Pakistani dresses!');
  };

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeFabric, setActiveFabric] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const resetFilters = () => {
    setSearchQuery('');
    setActiveCategory('All');
    setActiveFabric('All');
    setSortBy('featured');
  };

  // Product operations
  const addProduct = (newProdData: Omit<Product, 'id'>) => {
    const id = `prod-${Date.now()}`;
    const newProduct: Product = {
      ...newProdData,
      id
    };
    setProducts(prev => [newProduct, ...prev]);
    showToast(`Added "${newProduct.title}" to store!`);
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Product updated successfully!');
  };

  const deleteProduct = (id: string) => {
    const deletedItem = products.find(p => p.id === id);
    setProducts(prev => prev.filter(p => p.id !== id));
    setCart(prev => prev.filter(item => item.productId !== id));
    setWishlist(prev => prev.filter(pid => pid !== id));
    if (selectedProduct?.id === id) {
      setSelectedProduct(null);
      setIsQuickViewOpen(false);
    }
    showToast(deletedItem ? `Removed "${deletedItem.title}" from store.` : 'Product removed from store.');
  };

  const duplicateProduct = (id: string) => {
    const existing = products.find(p => p.id === id);
    if (!existing) return;
    const duplicated: Product = {
      ...existing,
      id: `prod-${Date.now()}`,
      sku: `${existing.sku}-COPY`,
      title: `${existing.title} (Copy)`,
      rating: 5.0,
      reviewsCount: 0,
    };
    setProducts(prev => [duplicated, ...prev]);
  };

  const getProductById = (id: string) => {
    return products.find(p => p.id === id);
  };

  // Cart operations
  const addToCart = (product: Product, size: ProductSize, color: string, quantity = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item =>
          item.productId === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      }

      const newItem: CartItem = {
        cartItemId: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        productId: product.id,
        product,
        selectedColor: color,
        selectedSize: size,
        quantity
      };
      return [...prev, newItem];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartSubtotal = cart.reduce((sum, item) => {
    const price = item.product.salePrice ?? item.product.originalPrice;
    return sum + price * item.quantity;
  }, 0);

  // Shipping logic: Free shipping across Pakistan over Rs. 5,000, otherwise Rs. 250 flat standard express
  const cartShippingFee = cartSubtotal === 0 ? 0 : cartSubtotal >= 5000 ? 0 : 250;

  let cartDiscount = 0;
  if (appliedCoupon === 'EID2026') {
    cartDiscount = Math.round(cartSubtotal * 0.15); // 15% discount
  } else if (appliedCoupon === 'WELCOME10') {
    cartDiscount = Math.round(cartSubtotal * 0.10); // 10% discount
  }

  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShippingFee);

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'EID2026') {
      setAppliedCoupon('EID2026');
      return { success: true, message: 'Coupon EID2026 applied! 15% luxury discount deducted.' };
    }
    if (trimmed === 'WELCOME10') {
      setAppliedCoupon('WELCOME10');
      return { success: true, message: 'Coupon WELCOME10 applied! 10% discount deducted.' };
    }
    return { success: false, message: 'Invalid coupon code. Try EID2026 or WELCOME10' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  // Orders
  const placeOrder = (customer: Order['customer'], paymentMethod: Order['paymentMethod']): Order => {
    const orderNumber = `ZYR-PK-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date().toISOString();

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: now,
      customer,
      items: [...cart],
      subtotal: cartSubtotal,
      shippingFee: cartShippingFee,
      discountAmount: cartDiscount,
      couponCode: appliedCoupon || undefined,
      totalAmount: cartTotal,
      paymentMethod,
      status: 'Confirmed',
      statusHistory: [
        {
          status: 'Confirmed',
          timestamp: now,
          note: `Order booked via ${paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : paymentMethod === 'bank_transfer' ? 'Direct Bank Transfer / Raast' : 'Debit/Credit Card'}.`
        }
      ]
    };

    // Deduct stock
    setProducts(prev => {
      return prev.map(p => {
        const orderedItem = cart.find(ci => ci.productId === p.id);
        if (!orderedItem) return p;

        const updatedSizeStock = { ...(p.sizeStock || {}) };
        const currentSizeQty = updatedSizeStock[orderedItem.selectedSize] || 0;
        updatedSizeStock[orderedItem.selectedSize] = Math.max(0, currentSizeQty - orderedItem.quantity);

        const newStock = Math.max(0, p.stock - orderedItem.quantity);
        return {
          ...p,
          stock: newStock,
          sizeStock: updatedSizeStock
        };
      });
    });

    setOrders(prev => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    clearCart();
    setAppliedCoupon(null);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus, note?: string) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== orderId) return ord;
        return {
          ...ord,
          status: newStatus,
          statusHistory: [
            ...ord.statusHistory,
            {
              status: newStatus,
              timestamp: new Date().toISOString(),
              note: note || `Status updated to ${newStatus}`
            }
          ]
        };
      })
    );
  };

  // Reviews
  const addReview = (reviewData: Omit<ProductReview, 'id' | 'createdAt' | 'approved'>) => {
    const newRev: ProductReview = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      approved: true // Approved by default or configurable by admin
    };
    setReviews(prev => [newRev, ...prev]);

    // Recalculate product rating
    setProducts(prev =>
      prev.map(p => {
        if (p.id !== reviewData.productId) return p;
        const prodRevs = [...reviews.filter(r => r.productId === p.id && r.approved), newRev];
        const avg = prodRevs.reduce((acc, r) => acc + r.rating, 0) / prodRevs.length;
        return {
          ...p,
          rating: Number(avg.toFixed(1)),
          reviewsCount: prodRevs.length
        };
      })
    );
  };

  const approveReview = (reviewId: string) => {
    setReviews(prev =>
      prev.map(r => (r.id === reviewId ? { ...r, approved: true } : r))
    );
  };

  const hideReview = (reviewId: string) => {
    setReviews(prev =>
      prev.map(r => (r.id === reviewId ? { ...r, approved: false } : r))
    );
  };

  const deleteReview = (reviewId: string) => {
    setReviews(prev => prev.filter(r => r.id !== reviewId));
  };

  const getProductReviews = (productId: string) => {
    return reviews.filter(r => r.productId === productId && r.approved);
  };

  // Feedbacks
  const addFeedback = (feedbackData: Omit<GeneralFeedback, 'id' | 'createdAt'>) => {
    const newFb: GeneralFeedback = {
      ...feedbackData,
      id: `fb-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setFeedbacks(prev => [newFb, ...prev]);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        duplicateProduct,
        getProductById,

        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartShippingFee,
        cartDiscount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        cartTotal,

        wishlist,
        toggleWishlist,
        isInWishlist,

        orders,
        placeOrder,
        updateOrderStatus,
        lastPlacedOrder,
        setLastPlacedOrder,

        reviews,
        addReview,
        approveReview,
        hideReview,
        deleteReview,
        getProductReviews,

        feedbacks,
        addFeedback,

        activeView,
        setActiveView,
        selectedProduct,
        setSelectedProduct,
        isQuickViewOpen,
        setIsQuickViewOpen,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isAdminOpen,
        setIsAdminOpen,
        isFeedbackModalOpen,
        setIsFeedbackModalOpen,
        isTrackingModalOpen,
        setIsTrackingModalOpen,
        isAccountModalOpen,
        setIsAccountModalOpen,
        isAddProductModalOpen,
        setIsAddProductModalOpen,
        isManageMode,
        setIsManageMode,
        resetToDefaultProducts,
        toastMessage,
        showToast,

        searchQuery,
        setSearchQuery,
        activeCategory,
        setActiveCategory,
        activeFabric,
        setActiveFabric,
        sortBy,
        setSortBy,
        resetFilters,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
