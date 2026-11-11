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

export type CategoryId = 'all' | 'carbon-fiber' | 'non-carbon' | 'high-arch';

export interface ProductColor {
  id: string;
  name: string;
  hex: string;
  accentHex: string;
  carbonTintHex: string;
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
  flexStiffness: 'Medium' | 'Stiff' | 'Rigid Competition';
  topCover: 'Standard Grip' | 'Perforated Aeration' | 'Ultra-Plush Velvet';
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
    arch: string;
    flex: string;
    engraving?: string;
  };
}

export type OrderStatus = 'Order Placed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  carrier: string;
  trackingNumber: string;
  estimatedDelivery: string;
  shippingAddress: {
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
