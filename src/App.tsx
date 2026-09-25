import React, { useState, useEffect } from 'react';
import { Product, CartItem, CategoryType, OrderDispatch } from './types';
import { INITIAL_PRODUCTS } from './data/products';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ValueStrip } from './components/ValueStrip';
import { CategoryMosaic } from './components/CategoryMosaic';
import { ProductCatalog } from './components/ProductCatalog';
import { CategoryView } from './components/CategoryView';
import { AtelierStory } from './components/AtelierStory';
import { AhmedabadStoreSection } from './components/AhmedabadStoreSection';
import { StoreModal } from './components/StoreModal';
import { PDPView } from './components/PDPView';
import { CheckoutView } from './components/CheckoutView';
import { AccountView } from './components/AccountView';
import { AdminView } from './components/AdminView';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { FitGuideModal } from './components/FitGuideModal';
import { QuickViewModal } from './components/QuickViewModal';
import { OutfitStyleFinder } from './components/OutfitStyleFinder';
import { BridalBoxBuilderModal } from './components/BridalBoxBuilderModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { WriteReviewModal } from './components/WriteReviewModal';
import { LiveChatWidget } from './components/LiveChatWidget';
import { StoreReview } from './data/storeData';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

export default function App() {
  // Navigation & View State
  const [currentView, setCurrentView] = useState<'store' | 'category' | 'pdp' | 'checkout' | 'account' | 'admin'>('store');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  
  // Products Data with localStorage persistence
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('she_emporium_products_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_PRODUCTS;
  });
  const [selectedProduct, setSelectedProduct] = useState<Product>(INITIAL_PRODUCTS[0]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Cart State (pre-populated with 1 item for immediate delight and ready checkout testing)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: `cart-${INITIAL_PRODUCTS[0].id}-34B-Bordeaux`,
      product: INITIAL_PRODUCTS[0],
      selectedColor: INITIAL_PRODUCTS[0].colors[0],
      selectedSize: '34B',
      quantity: 1
    }
  ]);

  // Wishlist State (pre-populated with 2 items)
  const [wishlistIds, setWishlistIds] = useState<number[]>([1, 2]);

  // Coupon & Totals State
  const [appliedCoupon, setAppliedCoupon] = useState<string>('LUXESHE10');

  // Modals & Drawers State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFitGuideOpen, setIsFitGuideOpen] = useState(false);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);

  // New Features 1-7 States
  const [isOutfitFinderOpen, setIsOutfitFinderOpen] = useState(false);
  const [isBridalBuilderOpen, setIsBridalBuilderOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);

  // Custom User Submitted Reviews (persisted in localStorage)
  const [customReviews, setCustomReviews] = useState<StoreReview[]>(() => {
    try {
      const saved = localStorage.getItem('she_emporium_custom_reviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return [];
  });

  // Ensure dark mode class is cleared
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    try {
      localStorage.removeItem('she_emporium_dark_mode');
    } catch {}
  }, []);

  // Orders State
  const [activeOrder, setActiveOrder] = useState<OrderDispatch | null>({
    orderId: 'SHE-IN-88912',
    date: '14 October 2026',
    estimatedDelivery: 'Tomorrow by 2:00 PM',
    carrier: 'BlueDart Priority Luxe',
    status: 'In Transit',
    currentHub: 'Ahmedabad Distribution Hub, Old City',
    items: [
      {
        id: 'default-item',
        product: INITIAL_PRODUCTS[0],
        selectedColor: INITIAL_PRODUCTS[0].colors[0],
        selectedSize: '34B',
        quantity: 1
      }
    ],
    total: 2069.10,
    packagingMode: 'The Signature Atelier Box'
  });

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  // Cart calculations
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const discountRate = appliedCoupon === 'LUXESHE10' ? 0.1 : 0;
  const discount = subtotal * discountRate;
  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 150;
  const total = Math.max(0, subtotal - discount + shipping);

  // Navigation Helper
  const handleNavigate = (
    view: 'store' | 'category' | 'pdp' | 'checkout' | 'account' | 'admin',
    category?: CategoryType
  ) => {
    if (category) {
      setSelectedCategory(category);
      if (category === 'All') {
        setCurrentView('store');
      } else {
        setCurrentView('category');
      }
    } else {
      setCurrentView(view);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add To Cart
  const handleAddToCart = (
    product: Product,
    size?: string,
    colorHex?: string,
    quantity: number = 1
  ) => {
    const chosenSize = size || product.sizes[0] || 'Standard';
    const chosenColor = colorHex
      ? product.colors.find((c) => c.hex === colorHex) || product.colors[0]
      : product.colors[0];

    const itemId = `cart-${product.id}-${chosenSize}-${chosenColor.name}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [
          ...prev,
          {
            id: itemId,
            product,
            selectedSize: chosenSize,
            selectedColor: chosenColor,
            quantity
          }
        ];
      }
    });

    showToast(`Added ${product.name} (${chosenSize}) to your bag.`);
    setIsCartOpen(true);
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove Item
  const handleRemoveFromCart = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    showToast("Item removed from your shopping bag.");
  };

  // Toggle Wishlist
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`Removed ${product.name} from your wishlist.`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Saved ${product.name} to your wishlist.`);
        return [...prev, product.id];
      }
    });
  };

  // Apply Coupon
  const handleApplyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'LUXESHE10') {
      setAppliedCoupon('LUXESHE10');
      showToast("Privilege code applied: 10% complimentary atelier reduction.");
    } else if (clean === 'FIRST100') {
      setAppliedCoupon('FIRST100');
      showToast("Welcome code applied: Complimentary express courier activated.");
    } else {
      showToast("Privilege code not recognized or expired.");
    }
  };

  // Open Product Detail Page
  const handleOpenPDP = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('pdp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Place Order
  const handlePlaceOrder = (details: {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
    packaging: string;
    paymentMethod: string;
  }) => {
    const newOrderId = `SHE-IN-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: OrderDispatch = {
      orderId: newOrderId,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      estimatedDelivery: '3-4 Business Days via Discreet Express Air',
      carrier: 'BlueDart Priority Luxe Express',
      status: 'Placed',
      currentHub: 'Ahmedabad Fulfillment Center, Lal Darwaja',
      items: [...cartItems],
      total,
      packagingMode: details.packaging
    };

    setActiveOrder(newOrder);
    setCartItems([]);
    setCurrentView('account');
    showToast(`Order #${newOrderId} confirmed! Discreet packaging protocol activated.`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Admin Stock Update with localStorage
  const handleUpdateStock = (productId: number, newStock: number) => {
    setProducts((prev) => {
      const updated = prev.map((p) => (p.id === productId ? { ...p, stockCount: Math.max(0, newStock) } : p));
      try {
        localStorage.setItem('she_emporium_products_v2', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Admin Add Product with localStorage
  const handleAddProduct = (newProd: Product) => {
    setProducts((prev) => {
      const updated = [newProd, ...prev];
      try {
        localStorage.setItem('she_emporium_products_v2', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Admin Edit Product with localStorage
  const handleEditProduct = (updatedProd: Product) => {
    setProducts((prev) => {
      const updated = prev.map((p) => (p.id === updatedProd.id ? updatedProd : p));
      try {
        localStorage.setItem('she_emporium_products_v2', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Admin Delete Product with localStorage
  const handleDeleteProduct = (productId: number) => {
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== productId);
      try {
        localStorage.setItem('she_emporium_products_v2', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Admin Reset Catalog to Factory Defaults
  const handleResetCatalog = () => {
    setProducts(INITIAL_PRODUCTS);
    try {
      localStorage.removeItem('she_emporium_products_v2');
    } catch {}
    showToast('Catalog restored to default Indian retail collection.');
  };

  // Bridal Box Customization Handler (15% Bundle Privilege)
  const handleAddBridalBoxToCart = (
    boxItems: { product: Product; size: string; color: string }[],
    boxStyle: string,
    _giftNote: string
  ) => {
    const newCartItems: CartItem[] = boxItems.map((bi) => {
      const colorObj =
        bi.product.colors.find((c) => c.name.toLowerCase() === bi.color.toLowerCase()) ||
        bi.product.colors[0];
      return {
        id: `bridal-${bi.product.id}-${bi.size}-${Date.now()}-${Math.random()}`,
        product: {
          ...bi.product,
          price: Math.round(bi.product.price * 0.85) // 15% bridal bundle privilege savings
        },
        selectedSize: bi.size,
        selectedColor: colorObj,
        quantity: 1
      };
    });

    setCartItems((prev) => [...prev, ...newCartItems]);
    setIsCartOpen(true);
    showToast(`Bridal Trousseau Box (${boxStyle}) added to your bag with 15% VIP bundle discount!`);
  };

  // Review Submission Handler with local persistence
  const handleSubmitReview = (newReview: StoreReview) => {
    setCustomReviews((prev) => {
      const updated = [newReview, ...prev];
      try {
        localStorage.setItem('she_emporium_custom_reviews', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    showToast('Your verified review has been published to the She Emporium Atelier!');
  };

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#fcf9f8] text-[#1c1b1b]">
      {/* Top Header & Navigation */}
      <Header
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        currentCategory={selectedCategory}
        currentView={currentView}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenFitGuide={() => setIsFitGuideOpen(true)}
        onOpenStoreModal={() => setIsStoreModalOpen(true)}
        onNavigate={handleNavigate}
        onShowToast={showToast}
        onOpenTrackOrder={() => setIsOrderTrackingOpen(true)}
        onOpenOutfitFinder={() => setIsOutfitFinderOpen(true)}
        onOpenBridalBuilder={() => setIsBridalBuilderOpen(true)}
        onOpenLiveChat={() => window.dispatchEvent(new CustomEvent('open-live-chat'))}
      />

      {/* Main Content Body (with exact flush offset for fixed header) */}
      <main className="flex-1 pt-[88px] sm:pt-[102px]">
        {currentView === 'store' && (
          <>
            {/* Hero Section */}
            <Hero
              onShopCollection={() => {
                const el = document.getElementById('catalog-anchor');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onExploreProduct={() => {
                const silkSlip = products.find((p) => p.id === 6) || products[0];
                handleOpenPDP(silkSlip);
              }}
              onOpenFitConcierge={() => setIsFitGuideOpen(true)}
              onOpenBridalBuilder={() => setIsBridalBuilderOpen(true)}
            />

            {/* Prestige Value Strip */}
            <ValueStrip />

            {/* Shop by Atelier Category Mosaic */}
            <CategoryMosaic
              onSelectCategory={(cat) => {
                handleNavigate('category', cat);
              }}
            />

            {/* Intimate Atelier Catalog Grid */}
            <ProductCatalog
              products={products}
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => handleNavigate('category', cat)}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onQuickView={(prod) => setQuickViewProduct(prod)}
              onAddToCart={handleAddToCart}
              onOpenPDP={handleOpenPDP}
              onOpenFitGuide={() => setIsFitGuideOpen(true)}
            />

            {/* Ahmedabad Flagship Store & Real Google Reviews Section */}
            <AhmedabadStoreSection
              onOpenStoreModal={() => setIsStoreModalOpen(true)}
              onOpenFitGuide={() => setIsFitGuideOpen(true)}
              onOpenWriteReview={() => setIsWriteReviewOpen(true)}
              customReviews={customReviews}
            />

            {/* Atelier Craft & Provenance Story */}
            <AtelierStory
              onScheduleFitting={() => {
                setIsFitGuideOpen(true);
                showToast("Opening Virtual Fit Concierge for bespoke measurement calibration.");
              }}
            />
          </>
        )}

        {currentView === 'category' && (
          <CategoryView
            category={selectedCategory}
            products={products}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={(prod) => setQuickViewProduct(prod)}
            onAddToCart={handleAddToCart}
            onOpenPDP={handleOpenPDP}
            onOpenFitGuide={() => setIsFitGuideOpen(true)}
            onNavigateHome={() => handleNavigate('store', 'All')}
            onSelectCategory={(cat) => handleNavigate('category', cat)}
          />
        )}

        {currentView === 'pdp' && (
          <PDPView
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlistIds.includes(selectedProduct.id)}
            onOpenFitGuide={() => setIsFitGuideOpen(true)}
            onNavigateHome={() => handleNavigate('store', 'All')}
            onOpenReviewModal={() => setIsWriteReviewOpen(true)}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutView
            cartItems={cartItems}
            subtotal={subtotal}
            discount={discount}
            total={total}
            onPlaceOrder={handlePlaceOrder}
            onNavigateHome={() => handleNavigate('store', 'All')}
          />
        )}

        {currentView === 'account' && (
          <AccountView
            activeOrder={activeOrder}
            onOpenFitGuide={() => setIsFitGuideOpen(true)}
            onShowToast={showToast}
            onNavigateHome={() => handleNavigate('store', 'All')}
          />
        )}

        {currentView === 'admin' && (
          <AdminView
            products={products}
            onUpdateStock={handleUpdateStock}
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
            onResetCatalog={handleResetCatalog}
            onNavigateHome={() => handleNavigate('store', 'All')}
            onNavigateToCategory={(cat) => handleNavigate('category', cat)}
            onNavigateToPDP={(prod) => handleOpenPDP(prod)}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Floating Quick Admin Toggle for effortlessly adding real products */}
      <div className="fixed bottom-4 left-4 z-40">
        <button
          onClick={() => handleNavigate(currentView === 'admin' ? 'store' : 'admin')}
          className="bg-[#4e051a] hover:bg-[#6b1d2f] text-white px-3.5 py-2 rounded-full text-[11px] font-bold shadow-xl flex items-center gap-1.5 transition-transform hover:scale-105 cursor-pointer border border-white/30"
          title="Open Admin Panel to add new products with Indian prices & descriptions"
        >
          <span className="material-symbols-outlined text-[16px]">
            {currentView === 'admin' ? 'storefront' : 'add_business'}
          </span>
          <span>{currentView === 'admin' ? 'Back to Store' : 'Admin: + Add Product'}</span>
        </button>
      </div>

      {/* Luxury Footer with Ahmedabad Information */}
      <Footer
        onSelectCategory={(cat) => handleNavigate('category', cat)}
        onOpenFitGuide={() => setIsFitGuideOpen(true)}
        onOpenStoreModal={() => setIsStoreModalOpen(true)}
        onNavigate={handleNavigate}
        onShowToast={showToast}
      />

      {/* Slide-out Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          handleNavigate('checkout');
        }}
        onExploreCollections={() => {
          setIsCartOpen(false);
          handleNavigate('store', 'All');
        }}
        subtotal={subtotal}
        discount={discount}
        total={total}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
      />

      {/* Slide-out Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onMoveToBag={(prod) => handleAddToCart(prod)}
        onExploreCollections={() => {
          setIsWishlistOpen(false);
          handleNavigate('store', 'All');
        }}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={handleOpenPDP}
      />

      {/* Virtual Fit Concierge Modal */}
      <FitGuideModal
        isOpen={isFitGuideOpen}
        onClose={() => setIsFitGuideOpen(false)}
        onSaveSize={(size) => {
          showToast(`Saved ${size} as your primary fit to your VIP salon profile.`);
        }}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenPDP={handleOpenPDP}
      />

      {/* Ahmedabad Store Details & Timings Modal */}
      <StoreModal
        isOpen={isStoreModalOpen}
        onClose={() => setIsStoreModalOpen(false)}
        onOpenFitGuide={() => setIsFitGuideOpen(true)}
      />

      {/* Feature 4: Outfit Style Finder Modal */}
      {isOutfitFinderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-lg shadow-2xl">
            <button
              onClick={() => setIsOutfitFinderOpen(false)}
              className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/90 hover:bg-stone-100 rounded-full flex items-center justify-center text-stone-700 shadow-md cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
            <OutfitStyleFinder
              products={products}
              onOpenPDP={(p) => {
                setIsOutfitFinderOpen(false);
                handleOpenPDP(p);
              }}
              onAddToCart={(p, s, c) => {
                handleAddToCart(p, s, c);
                showToast(`Added ${p.name} to bag!`);
              }}
              onClose={() => setIsOutfitFinderOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Feature 5: Bridal Trousseau Box Builder Modal (15% Off VIP privilege) */}
      <BridalBoxBuilderModal
        products={products}
        isOpen={isBridalBuilderOpen}
        onClose={() => setIsBridalBuilderOpen(false)}
        onAddBoxToCart={handleAddBridalBoxToCart}
        onShowToast={showToast}
      />

      {/* Feature 6: Real-time Discreet Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isOrderTrackingOpen}
        onClose={() => setIsOrderTrackingOpen(false)}
        activeOrder={activeOrder}
      />

      {/* Feature 3: Write Review Modal */}
      <WriteReviewModal
        isOpen={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
        onSubmitReview={handleSubmitReview}
        onShowToast={showToast}
      />

      {/* Live Concierge Chat Widget fixed at lower right */}
      <LiveChatWidget
        onOpenFitGuide={() => setIsFitGuideOpen(true)}
        onOpenStoreModal={() => setIsStoreModalOpen(true)}
        onOpenTrackOrder={() => setIsOrderTrackingOpen(true)}
      />

      {/* Floating Status Notification Toast */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
