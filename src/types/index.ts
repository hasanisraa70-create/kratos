export type ScreenId = 
  | 'splash'
  | 'onboarding'
  | 'home'
  | 'shop'
  | 'product-details'
  | 'viewer-3d'
  | 'customize'
  | 'cart'
  | 'checkout'
  | 'order-tracking'
  | 'warranty'
  | 'profile'
  | 'admin';

export type CategoryId = 'all' | 'carbon-fiber' | 'non-carbon' | 'high-arch' | 'sprinting' | 'basketball' | 'marathon' | 'recovery';

export interface ProductColor {
  id: string;
  name: string;
  hex: string;
  accentHex: string;
  carbonTintHex: string;
}

export interface ProductCustomizationConfig {
  allowArchProfile: boolean;
  allowFootWidth: boolean;
  allowStiffness: boolean;
  allowTopCover: boolean;
  allowCushioning: boolean;
  allowLaserEngraving: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: CategoryId;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  tag: string;
  description: string;
  image: string;
  colorways: ProductColor[];
  sizes: string[];
  availability?: 'In Stock' | 'Custom Made' | 'Limited Stock';
  customizationConfig?: ProductCustomizationConfig;
  specs: {
    weight: string;
    thickness: string;
    plateMaterial: string;
    topCover: string;
    cushioning: string;
    warranty: string;
  };
  benefits: {
    title: string;
    description: string;
    metric: string;
  }[];
  sports: string[];
}

export interface CustomInsoleBuild {
  productId: string;
  productName: string;
  basePrice: number;
  size: string;
  width: 'Standard' | 'Wide';
  color: ProductColor;
  archHeight: 'Low' | 'Neutral' | 'High';
  flexStiffness: 'Flexible' | 'Semi-Rigid' | 'Ultra-Stiff Track';
  topCover: 'Standard Grip' | 'Perforated Aeration' | 'Ultra-Plush Velvet';
  cushioning?: 'Dual-Density PU' | 'Poron Gel Pods' | 'Nitrogen Ultra-Light';
  laserEngravingText: string;
  totalPrice: number;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  colorName: string;
  colorHex: string;
  quantity: number;
  customizationDetails?: {
    arch?: string;
    flex?: string;
    width?: string;
    cushioning?: string;
    topCover?: string;
    engraving?: string;
  };
}

export type OrderStatus = 
  | 'Order Received'
  | 'Order Confirmed'
  | 'In Production'
  | 'Ready / Dispatched'
  | 'Completed'
  | 'Order Placed'
  | 'Processing'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered';

export interface CustomerInfo {
  fullName: string;
  phone: string;
  email?: string;
  notes?: string;
  boothLocation?: string;
}

export interface Order {
  id: string; // e.g. KRT-STALL-8942
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  paymentStatus: 'Paid (Demo)' | 'Pending at Stall' | 'Paid';
  paymentMethod?: string;
  isStallOrder?: boolean;
  carrier?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  customerInfo?: CustomerInfo;
  shippingAddress?: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

export interface WarrantyRegistration {
  id: string;
  customerName: string;
  email: string;
  productType: string;
  serialNumber: string;
  purchaseDate: string;
  retailer: string;
  receiptName?: string;
  status: 'Verified' | 'Pending Review' | 'Active';
  expiryDate: string;
  qrCodeMock: string;
}

export interface AdminAnalytics {
  totalRevenue: number;
  revenueGrowth: number;
  totalOrders: number;
  ordersGrowth: number;
  activeCustomers: number;
  productsSold: number;
  pendingOrdersCount: number;
}
