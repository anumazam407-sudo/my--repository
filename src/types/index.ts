export type ClothingCategory = 
  | 'Everyday Wear'
  | 'Festive Wear'
  | 'Formal Wear'
  | 'Party Wear'
  | 'Premium Collection'
  | 'Sale';

export type ClothingSubCategory =
  | 'Lawn Suits'
  | '2-Piece Suits'
  | '3-Piece Suits'
  | 'Casual Shalwar Kameez'
  | 'Printed Suits'
  | 'Cotton Suits'
  | 'Eid Collection'
  | 'Ramadan Collection'
  | 'Wedding Collection'
  | 'Festive Dresses'
  | 'Embroidered Suits'
  | 'Chiffon Dresses'
  | 'Silk Dresses'
  | 'Organza Dresses'
  | 'Velvet Dresses'
  | 'Luxury Embroidered Dresses'
  | 'Party Dresses'
  | 'Embellished Dresses'
  | 'Luxury Lawn'
  | 'Luxury Pret'
  | 'Bridal Wear'
  | 'Designer Collection'
  | 'Designer Inspired Dresses';

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  sku: string;
  title: string;
  category: ClothingCategory;
  subCategory: ClothingSubCategory;
  collection: string;
  fabric: string;
  description: string;
  originalPrice: number; // In PKR
  salePrice?: number; // In PKR
  discountPercent?: number;
  rating: number;
  reviewsCount: number;
  colors: ProductColor[];
  sizes: ProductSize[];
  sizeStock: Partial<Record<ProductSize, number>>;
  stock: number;
  images: string[];
  videoUrl?: string;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isSale?: boolean;
  specifications: {
    shirtFabric?: string;
    dupattaFabric?: string;
    trouserFabric?: string;
    embroideryType?: string;
    stitchType?: 'Unstitched' | 'Stitched' | 'Ready to Wear' | 'Custom Stitched';
    pieces?: '1-Piece' | '2-Piece' | '3-Piece';
    careInstructions?: string;
  };
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  product: Product;
  selectedColor: string;
  selectedSize: ProductSize;
  quantity: number;
}

export type OrderStatus = 
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled';

export type PaymentMethod = 'cod' | 'bank_transfer' | 'online_card';

export interface CustomerInfo {
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  deliveryNotes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  couponCode?: string;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  statusHistory: { status: OrderStatus; timestamp: string; note: string }[];
}

export interface ProductReview {
  id: string;
  productId: string;
  authorName: string;
  city: string;
  rating: number; // 1-5
  comment: string;
  verifiedPurchase: boolean;
  createdAt: string;
  approved: boolean;
  userImages?: string[];
}

export interface GeneralFeedback {
  id: string;
  name: string;
  email: string;
  rating: number; // 1-5
  category: 'Service' | 'Fabric Quality' | 'Delivery Speed' | 'Website Experience' | 'Suggestion';
  message: string;
  createdAt: string;
}

export interface CustomerAccount {
  name: string;
  email: string;
  phone: string;
  addresses: CustomerInfo[];
}
