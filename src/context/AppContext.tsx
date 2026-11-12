import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  ScreenId, 
  CategoryId, 
  Product, 
  CartItem, 
  Order, 
  OrderStatus,
  WarrantyRegistration, 
  CustomInsoleBuild 
} from '../types';
import { PRODUCTS, COLORWAYS, INITIAL_ORDERS, INITIAL_WARRANTIES } from '../data/mockData';

interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'info';
}

interface AppContextType {
  currentScreen: ScreenId;
  setCurrentScreen: (screen: ScreenId) => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  selectedProduct: Product;
  setSelectedProduct: (p: Product) => void;
  activeCategory: CategoryId;
  setActiveCategory: (cat: CategoryId) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedSport: string | null;
  setSelectedSport: (sport: string | null) => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  updateCartQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Customizer
  customBuild: CustomInsoleBuild;
  updateCustomBuild: (updates: Partial<CustomInsoleBuild>) => void;
  resetCustomBuild: (product?: Product) => void;

  // Orders
  orders: Order[];
  activeOrder: Order | null;
  setActiveOrder: (order: Order | null) => void;
  placeOrder: (shippingAddress: Order['shippingAddress'], paymentMethod: string, discountAmount: number) => Order;
  placeStallOrder: (params: {
    customerName: string;
    phone: string;
    email?: string;
    notes?: string;
    paymentMethod: string;
    paymentStatus: 'Paid (Demo)' | 'Pending at Stall';
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updateOrderPaymentStatus: (orderId: string, status: 'Paid (Demo)' | 'Pending at Stall' | 'Paid') => void;

  // Stall Mode
  isStallMode: boolean;
  setIsStallMode: (val: boolean) => void;
  toggleStallMode: () => void;
  resetStallSession: () => void;

  // Warranty
  warranties: WarrantyRegistration[];
  registerWarranty: (data: Omit<WarrantyRegistration, 'id' | 'status' | 'expiryDate' | 'qrCodeMock'>) => WarrantyRegistration;

  // Theme mode
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
  toggleTheme: () => void;

  // Viewport / Environment
  viewMode: 'mobile-frame' | 'mobile-full' | 'admin-desktop';
  setViewMode: (mode: 'mobile-frame' | 'mobile-full' | 'admin-desktop') => void;
  showFlutterSpec: boolean;
  setShowFlutterSpec: (show: boolean) => void;

  // Toast
  toast: ToastState;
  showToast: (message: string, type?: 'success' | 'info') => void;

  // Navigation helpers
  navigateToProduct: (product: Product) => void;
  startCustomizerForProduct: (product: Product) => void;
  open3DViewer: (product?: Product) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState<string | null>('Sprinting');
  const [wishlist, setWishlist] = useState<string[]>([PRODUCTS[0].id]);
  const [viewMode, setViewMode] = useState<'mobile-frame' | 'mobile-full' | 'admin-desktop'>('mobile-frame');
  const [showFlutterSpec, setShowFlutterSpec] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isStallMode, setIsStallMode] = useState(true); // Default to Stall Mode for exhibition/kiosk

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      showToast(next === 'light' ? 'Light Mode active' : 'Dark Mode active');
      return next;
    });
  };

  const toggleStallMode = () => {
    setIsStallMode((prev) => {
      const next = !prev;
      showToast(next ? 'Stall Kiosk Mode enabled' : 'Standard Mobile Mode active');
      return next;
    });
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    if (selectedProduct.id === id) {
      setSelectedProduct((prev) => ({ ...prev, ...updates }));
    }
    showToast('Product updated successfully');
  };

  // Initial cart with a pre-configured sample item
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'initial-item-1',
      productId: PRODUCTS[0].id,
      name: PRODUCTS[0].name,
      price: PRODUCTS[0].price,
      image: PRODUCTS[0].image,
      size: 'US M 9.5 / W 11',
      colorName: 'Stealth Black / Kratos Gold',
      colorHex: '#C6A66B',
      quantity: 1,
      customizationDetails: {
        arch: 'Neutral Arch',
        flex: 'Semi-Rigid',
        engraving: 'KRT-PRO',
      },
    },
  ]);

  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [activeOrder, setActiveOrder] = useState<Order | null>(INITIAL_ORDERS[0]);
  const [warranties, setWarranties] = useState<WarrantyRegistration[]>(INITIAL_WARRANTIES);

  // Customizer build state
  const [customBuild, setCustomBuild] = useState<CustomInsoleBuild>({
    productId: PRODUCTS[0].id,
    productName: PRODUCTS[0].name,
    basePrice: PRODUCTS[0].price,
    size: 'US M 9.5 / W 11',
    width: 'Standard',
    color: COLORWAYS[0],
    archHeight: 'Neutral',
    flexStiffness: 'Semi-Rigid',
    topCover: 'Standard Grip',
    cushioning: 'Dual-Density PU',
    laserEngravingText: 'KRT-26',
    totalPrice: PRODUCTS[0].price + 15, // base + default engraving
  });

  // Toast
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: '',
    type: 'success',
  });

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3200);
  };

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const newItem: CartItem = {
      ...item,
      id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    };
    setCart((prev) => [newItem, ...prev]);
    showToast(`Added ${item.name} to order summary`);
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed from order', 'info');
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      showToast(exists ? 'Removed from saved items' : 'Saved to favorites');
      return updated;
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const updateCustomBuild = (updates: Partial<CustomInsoleBuild>) => {
    setCustomBuild((prev) => {
      const next = { ...prev, ...updates };
      let extra = 0;
      if (next.laserEngravingText.trim().length > 0) extra += 15;
      if (next.flexStiffness === 'Ultra-Stiff Track') extra += 10;
      if (next.topCover === 'Ultra-Plush Velvet') extra += 5;
      if (next.cushioning === 'Nitrogen Ultra-Light') extra += 8;
      next.totalPrice = next.basePrice + extra;
      return next;
    });
  };

  const resetCustomBuild = (product?: Product) => {
    const prod = product || selectedProduct || products[0];
    setCustomBuild({
      productId: prod.id,
      productName: prod.name,
      basePrice: prod.price,
      size: prod.sizes[4] || 'US M 9.5 / W 11',
      width: 'Standard',
      color: prod.colorways[0] || COLORWAYS[0],
      archHeight: 'Neutral',
      flexStiffness: 'Semi-Rigid',
      topCover: 'Standard Grip',
      cushioning: 'Dual-Density PU',
      laserEngravingText: 'KRATOS',
      totalPrice: prod.price + 15,
    });
  };

  // Reset entire stall session for the next booth visitor
  const resetStallSession = () => {
    clearCart();
    resetCustomBuild(products[0]);
    setCurrentScreen('home');
    showToast('Session reset. Ready for next customer.', 'info');
  };

  const placeOrder = (
    shippingAddress: Order['shippingAddress'],
    paymentMethod: string,
    discountAmount: number
  ): Order => {
    const subtotal = cartSubtotal;
    const shipping = 0; // Stall pickup free
    const total = Math.max(0, subtotal - discountAmount + shipping);
    const orderNum = `KRT-STALL-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: orderNum,
      date: 'Just now',
      items: [...cart],
      subtotal,
      discount: discountAmount,
      shipping,
      total,
      status: 'Order Received',
      paymentStatus: 'Paid (Demo)',
      paymentMethod,
      isStallOrder: true,
      carrier: 'Kratos Stall Booth 4B',
      trackingNumber: `STALL-${Math.floor(1000 + Math.random() * 9000)}`,
      estimatedDelivery: 'Ready in 15 mins at Stall Counter',
      shippingAddress,
      customerInfo: {
        fullName: shippingAddress?.fullName || 'Booth Visitor',
        phone: '+1 (503) 555-0192',
        boothLocation: 'Exhibition Stall 4B',
      },
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    clearCart();
    showToast(`Order ${orderNum} confirmed!`, 'success');
    return newOrder;
  };

  // Physical stall fast-checkout placement
  const placeStallOrder = ({
    customerName,
    phone,
    email,
    notes,
    paymentMethod,
    paymentStatus,
  }: {
    customerName: string;
    phone: string;
    email?: string;
    notes?: string;
    paymentMethod: string;
    paymentStatus: 'Paid (Demo)' | 'Pending at Stall';
  }): Order => {
    const subtotal = cartSubtotal;
    const total = subtotal;
    const orderNum = `KRT-STALL-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: orderNum,
      date: 'Just now',
      items: [...cart],
      subtotal,
      discount: 0,
      shipping: 0,
      total,
      status: 'Order Received',
      paymentStatus,
      paymentMethod,
      isStallOrder: true,
      carrier: 'Stall Counter Direct Pickup',
      trackingNumber: `BOOTH-4B-${Math.floor(100 + Math.random() * 900)}`,
      estimatedDelivery: 'Ready in 15 mins',
      customerInfo: {
        fullName: customerName,
        phone,
        email,
        notes,
        boothLocation: 'Stall Booth 4B',
      },
      shippingAddress: {
        fullName: customerName,
        street: 'Kratos Exhibition Stall 4B',
        city: 'Portland',
        state: 'OR',
        zip: '97232',
      },
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    clearCart();
    showToast(
      paymentStatus === 'Paid (Demo)'
        ? `Payment verified! Order ${orderNum} generated.`
        : `Order ${orderNum} submitted to booth staff!`,
      'success'
    );
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
    if (activeOrder && activeOrder.id === orderId) {
      setActiveOrder((prev) => (prev ? { ...prev, status } : null));
    }
    showToast(`Order ${orderId} updated to: ${status}`);
  };

  const updateOrderPaymentStatus = (
    orderId: string,
    status: 'Paid (Demo)' | 'Pending at Stall' | 'Paid'
  ) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, paymentStatus: status } : ord))
    );
    if (activeOrder && activeOrder.id === orderId) {
      setActiveOrder((prev) => (prev ? { ...prev, paymentStatus: status } : null));
    }
    showToast(`Payment status for ${orderId} set to: ${status}`);
  };

  const registerWarranty = (
    data: Omit<WarrantyRegistration, 'id' | 'status' | 'expiryDate' | 'qrCodeMock'>
  ): WarrantyRegistration => {
    const warrantyId = `WR-${Math.floor(10000 + Math.random() * 90000)}`;
    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + 6);
    const expiryDate = expiry.toISOString().split('T')[0];

    const newWarranty: WarrantyRegistration = {
      ...data,
      id: warrantyId,
      status: 'Active',
      expiryDate,
      qrCodeMock: `KRATOS-WARRANTY-${warrantyId}-${data.serialNumber}`,
    };

    setWarranties((prev) => [newWarranty, ...prev]);
    showToast(`Warranty ${warrantyId} registered successfully!`, 'success');
    return newWarranty;
  };

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen('product-details');
  };

  const startCustomizerForProduct = (product: Product) => {
    setSelectedProduct(product);
    resetCustomBuild(product);
    setCurrentScreen('customize');
  };

  const open3DViewer = (product?: Product) => {
    if (product) setSelectedProduct(product);
    setCurrentScreen('viewer-3d');
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        products,
        setProducts,
        updateProduct,
        selectedProduct,
        setSelectedProduct,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        selectedSport,
        setSelectedSport,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        wishlist,
        toggleWishlist,
        isWishlisted,
        customBuild,
        updateCustomBuild,
        resetCustomBuild,
        orders,
        activeOrder,
        setActiveOrder,
        placeOrder,
        placeStallOrder,
        updateOrderStatus,
        updateOrderPaymentStatus,
        isStallMode,
        setIsStallMode,
        toggleStallMode,
        resetStallSession,
        warranties,
        registerWarranty,
        theme,
        setTheme,
        toggleTheme,
        viewMode,
        setViewMode,
        showFlutterSpec,
        setShowFlutterSpec,
        toast,
        showToast,
        navigateToProduct,
        startCustomizerForProduct,
        open3DViewer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
