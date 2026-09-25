import React, { useState } from 'react';
import { CategoryType } from '../types';

interface HeaderProps {
  currentView: 'store' | 'category' | 'pdp' | 'checkout' | 'account' | 'admin';
  currentCategory: CategoryType;
  cartCount: number;
  wishlistCount: number;
  onNavigate: (view: 'store' | 'category' | 'pdp' | 'checkout' | 'account' | 'admin', category?: CategoryType) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenFitGuide: () => void;
  onOpenStoreModal?: () => void;
  onShowToast: (message: string) => void;
  onOpenTrackOrder?: () => void;
  onOpenOutfitFinder?: () => void;
  onOpenBridalBuilder?: () => void;
  onOpenLiveChat?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  currentCategory,
  cartCount,
  wishlistCount,
  onNavigate,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenFitGuide,
  onOpenStoreModal,
  onShowToast,
  onOpenTrackOrder,
  onOpenOutfitFinder,
  onOpenBridalBuilder,
  onOpenLiveChat
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  // Exact navigation items requested, placed in the exact center of the screen
  const navItems: { label: string; view: 'store' | 'category'; cat: CategoryType; highlight?: boolean }[] = [
    { label: 'Home', view: 'store', cat: 'All' },
    { label: 'Bras', view: 'category', cat: 'Bras' },
    { label: 'Panties', view: 'category', cat: 'Panties' },
    { label: 'Camisoles', view: 'category', cat: 'Camisoles & Slips' },
    { label: 'Sets', view: 'category', cat: 'Lingerie Sets' },
    { label: 'Shapewear', view: 'category', cat: 'Shapewear' },
    { label: 'Sleepwear', view: 'category', cat: 'Sleepwear' },
    { label: 'Bridal', view: 'category', cat: 'Bridal' },
    { label: 'Sale', view: 'category', cat: 'Sale', highlight: true }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[#fcf9f8]/98 backdrop-blur-xl shadow-[0_2px_10px_rgba(78,5,26,0.05)] border-b border-[#eae7e7]">
      {/* Top Announcement & Store Bar */}
      <div className="bg-[#4e051a] text-white px-2 sm:px-4 md:px-6 h-7 sm:h-7.5 flex items-center overflow-hidden">
        <div className="w-full flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-wider">
          {/* Left: Store Location */}
          <div className="flex items-center gap-2 text-[#dac0c2] min-w-0">
            {onOpenStoreModal ? (
              <button
                onClick={onOpenStoreModal}
                className="flex items-center gap-1 sm:gap-1.5 text-white hover:text-[#e8d7c8] transition-colors cursor-pointer text-left truncate"
                title="View She Emporium Ahmedabad Store & Directions"
              >
                <span className="material-symbols-outlined text-[13px] sm:text-[14px] text-amber-300 shrink-0">location_on</span>
                <span className="font-semibold text-white tracking-normal sm:tracking-wider truncate">
                  She Emporium • Lal Darwaja, Ahmedabad
                </span>
              </button>
            ) : (
              <span className="flex items-center gap-1 text-[#e8d7c8] truncate">
                <span className="material-symbols-outlined text-[13px] sm:text-[14px] shrink-0">location_on</span>
                <span className="truncate">Lal Darwaja, Ahmedabad</span>
              </span>
            )}
            <span className="hidden md:inline text-white/30">•</span>
            <a
              href="tel:9909008789"
              className="hidden md:inline-flex items-center gap-1 text-[#e8d7c8] hover:text-white"
            >
              <span className="material-symbols-outlined text-[12px]">call</span>
              <span>99090 08789</span>
            </a>
          </div>

          {/* Center: Discreet Delivery Guarantee */}
          <div className="hidden lg:block flex-1 text-center font-medium text-[#fcf9f8] tracking-[0.14em] text-[10px] truncate px-3">
            100% DISCREET UNBRANDED PACKAGING • GENUINE BRANDED LINGERIE
          </div>

          {/* Right: Fit Guide & Currency */}
          <div className="flex items-center justify-end gap-2 sm:gap-3 text-[10px] sm:text-[11px] text-[#dac0c2]">
            <button
              onClick={onOpenFitGuide}
              className="hidden xs:inline-flex items-center gap-1 text-[#e8d7c8] hover:text-white transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[13px]">straighten</span>
              <span>Fit Guide</span>
            </button>
            <span className="font-mono text-white font-semibold">₹ INR</span>
          </div>
        </div>
      </div>

      {/* Main Nav Bar: Responsive layout ensuring brand and icons never collide */}
      <div className="h-15 sm:h-18 w-full px-2 sm:px-4 md:px-6 flex items-center justify-between gap-1 sm:gap-2">
        {/* Left Zone: Hamburger + SE Crest + SHE EMPORIUM Brand Title */}
        <div className="flex items-center gap-1 sm:gap-2 shrink min-w-0">
          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="xl:hidden p-1 sm:p-1.5 text-[#4e051a] hover:bg-[#4e051a]/5 transition-colors cursor-pointer rounded-xs"
            title="Menu"
          >
            <span className="material-symbols-outlined text-[22px] sm:text-[24px]">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>

          {/* Brand Logo & Title */}
          <button
            onClick={() => onNavigate('store', 'All')}
            className="flex items-center gap-1.5 sm:gap-2 group text-left cursor-pointer focus:outline-none min-w-0"
            aria-label="SHE Emporium Home"
          >
            {/* Atelier Crest Seal (SE) */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-8.5 md:h-8.5 rounded-full bg-[#4e051a] text-[#fcf9f8] flex items-center justify-center shadow-xs shrink-0 border border-[#dac0c2]/40 transition-transform group-hover:scale-105">
              <span className="font-serif font-bold text-[12px] sm:text-[14px] md:text-[15px] tracking-tighter text-[#e8d7c8] select-none">
                SE
              </span>
            </div>

            {/* Brand Title & Tagline */}
            <div className="flex flex-col text-left min-w-0">
              <span className="font-serif text-[13px] xs:text-[14px] sm:text-[16px] md:text-[17.5px] tracking-[0.04em] text-[#4e051a] font-bold leading-tight select-none truncate">
                SHE EMPORIUM
              </span>
              <span className="text-[6.5px] xs:text-[7px] sm:text-[8px] tracking-[0.2em] text-[#6c5b4c] font-semibold uppercase select-none hidden sm:block">
                LUXURY INTIMATES
              </span>
            </div>
          </button>
        </div>

        {/* Center Zone: Placed in the EXACT MIDDLE of the header screen */}
        <nav className="hidden xl:flex items-center justify-center gap-3 lg:gap-4 xl:gap-5 2xl:gap-6 shrink-0 px-2">
          {navItems.map((item) => {
            const isActive =
              (item.view === 'store' && currentView === 'store' && currentCategory === 'All') ||
              (item.view === 'category' && currentView === 'category' && currentCategory === item.cat);

            return (
              <button
                key={item.label}
                onClick={() => onNavigate(item.view, item.cat)}
                className={`relative text-[11px] xl:text-[11.5px] uppercase tracking-[0.1em] font-semibold py-1.5 transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  item.highlight
                    ? 'text-[#4e051a] font-bold hover:opacity-80'
                    : isActive
                    ? 'text-[#4e051a]'
                    : 'text-[#2b2728] hover:text-[#4e051a]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#4e051a] rounded-full animate-in fade-in duration-200" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Zone: Controls & Shopping Bag */}
        <div className="flex items-center justify-end gap-1 sm:gap-1.5 shrink-0">
          {/* Search Button */}
          <button
            aria-label="Search Atelier Catalog"
            className="w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 flex items-center justify-center text-[#1c1b1b] hover:text-[#4e051a] hover:bg-[#4e051a]/5 transition-all duration-200 cursor-pointer rounded-full"
            onClick={onOpenSearch}
            title="Search intimates"
          >
            <span className="material-symbols-outlined text-[19px] sm:text-[20px]">search</span>
          </button>

          {/* Wishlist Button */}
          <button
            aria-label="Private Wishlist"
            className="relative w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 flex items-center justify-center text-[#1c1b1b] hover:text-[#4e051a] hover:bg-[#4e051a]/5 transition-all duration-200 cursor-pointer rounded-full"
            onClick={onOpenWishlist}
            title="Saved Wishlist"
          >
            <span className="material-symbols-outlined text-[19px] sm:text-[20px]">favorite</span>
            {wishlistCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-[#4e051a] text-white text-[8px] sm:text-[8.5px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold shadow-xs">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Client Account Dropdown */}
          <div className="relative">
            <button
              aria-label="Client VIP Account"
              className="w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 flex items-center justify-center text-[#1c1b1b] hover:text-[#4e051a] hover:bg-[#4e051a]/5 transition-all duration-200 cursor-pointer rounded-full"
              onClick={() => setIsAccountOpen(!isAccountOpen)}
              title="Client Account"
            >
              <span className="material-symbols-outlined text-[19px] sm:text-[20px]">person</span>
            </button>

            {isAccountOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-[#eae7e7] p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 border-b border-[#eae7e7]">
                  <p className="text-[9px] uppercase tracking-wider text-[#6c5b4c] font-bold">Client Concierge</p>
                  <p className="font-serif text-[15px] sm:text-[16px] text-[#4e051a] font-medium truncate">Customer Profile</p>
                  <p className="text-[11px] text-[#544244] font-mono">She Emporium Club</p>
                </div>
                <div className="py-1 text-[12px] sm:text-[13px]">
                  {onOpenTrackOrder ? (
                    <button
                      className="w-full flex items-center gap-2 px-3 py-2 text-[#1c1b1b] hover:bg-[#f6f3f2] transition-colors cursor-pointer text-left"
                      onClick={() => {
                        onOpenTrackOrder();
                        setIsAccountOpen(false);
                      }}
                    >
                      <span className="material-symbols-outlined text-[17px] text-[#4e051a]">local_shipping</span>
                      <span>Track Discreet Order</span>
                    </button>
                  ) : (
                    <button
                      className="w-full flex items-center gap-2 px-3 py-2 text-[#1c1b1b] hover:bg-[#f6f3f2] transition-colors cursor-pointer text-left"
                      onClick={() => {
                        onNavigate('account');
                        setIsAccountOpen(false);
                      }}
                    >
                      <span className="material-symbols-outlined text-[17px] text-[#4e051a]">local_shipping</span>
                      <span>Track Active Order</span>
                    </button>
                  )}

                  {onOpenOutfitFinder && (
                    <button
                      className="w-full flex items-center gap-2 px-3 py-2 text-[#1c1b1b] hover:bg-[#f6f3f2] transition-colors cursor-pointer text-left"
                      onClick={() => {
                        onOpenOutfitFinder();
                        setIsAccountOpen(false);
                      }}
                    >
                      <span className="material-symbols-outlined text-[17px] text-[#4e051a]">auto_awesome</span>
                      <span>Outfit Style Matcher</span>
                    </button>
                  )}

                  {onOpenBridalBuilder && (
                    <button
                      className="w-full flex items-center gap-2 px-3 py-2 text-[#1c1b1b] hover:bg-[#f6f3f2] transition-colors cursor-pointer text-left"
                      onClick={() => {
                        onOpenBridalBuilder();
                        setIsAccountOpen(false);
                      }}
                    >
                      <span className="material-symbols-outlined text-[17px] text-[#4e051a]">featured_seasonal_and_gifts</span>
                      <span>Bridal Box Builder (15% Off)</span>
                    </button>
                  )}

                  <button
                    className="w-full flex items-center gap-2 px-3 py-2 text-[#1c1b1b] hover:bg-[#f6f3f2] transition-colors cursor-pointer text-left"
                    onClick={() => {
                      onOpenFitGuide();
                      setIsAccountOpen(false);
                    }}
                  >
                    <span className="material-symbols-outlined text-[17px] text-[#4e051a]">straighten</span>
                    <span>Cup &amp; Band Sizing Guide</span>
                  </button>
                  {onOpenStoreModal && (
                    <button
                      className="w-full flex items-center gap-2 px-3 py-2 text-[#1c1b1b] hover:bg-[#f6f3f2] transition-colors cursor-pointer text-left"
                      onClick={() => {
                        onOpenStoreModal();
                        setIsAccountOpen(false);
                      }}
                    >
                      <span className="material-symbols-outlined text-[17px] text-[#4e051a]">store</span>
                      <span>Visit Ahmedabad Store</span>
                    </button>
                  )}
                  <button
                    className="w-full flex items-center gap-2 px-3 py-2 text-[#1c1b1b] hover:bg-[#f6f3f2] transition-colors cursor-pointer text-left"
                    onClick={() => {
                      onNavigate('admin');
                      setIsAccountOpen(false);
                    }}
                  >
                    <span className="material-symbols-outlined text-[17px] text-[#4e051a]">admin_panel_settings</span>
                    <span>Atelier Admin Portal</span>
                  </button>
                </div>
                <div className="pt-1 border-t border-[#eae7e7]">
                  <button
                    className="w-full flex items-center gap-2 px-3 py-2 text-[#544244] hover:text-[#4e051a] text-[11px] cursor-pointer text-left"
                    onClick={() => {
                      setIsAccountOpen(false);
                      onShowToast("Signed out of private session.");
                    }}
                  >
                    <span className="material-symbols-outlined text-[15px]">logout</span>
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>


          {/* Boutique Shopping Bag Button */}
          <button
            aria-label="Boutique Shopping Bag"
            className="relative w-7.5 h-7.5 sm:w-auto sm:h-8.5 sm:px-3 flex items-center justify-center bg-[#4e051a] hover:bg-[#6b1d2f] text-white transition-all duration-200 cursor-pointer rounded-full sm:rounded-xs shadow-xs shrink-0"
            onClick={onOpenCart}
            title="View Shopping Bag"
          >
            <span className="material-symbols-outlined text-[18px] sm:text-[19px]">shopping_bag</span>
            
            {/* Desktop only text */}
            <span className="hidden sm:inline text-[10.5px] sm:text-[11px] font-bold tracking-wider uppercase ml-1.5 mr-1">
              Bag
            </span>

            {/* Mobile Badge: POSITIONED ON TOP OVER THE ICON */}
            <span className="sm:hidden absolute -top-1 -right-1 bg-[#e8d7c8] text-[#4e051a] text-[8.5px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center font-bold font-mono shadow-xs border border-[#4e051a] leading-none">
              {cartCount}
            </span>

            {/* Desktop Badge: Inline next to text */}
            <span className="hidden sm:flex bg-[#e8d7c8] text-[#4e051a] text-[10px] w-4 h-4 rounded-full items-center justify-center font-bold font-mono shrink-0">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-[#fcf9f8] border-b border-[#eae7e7] shadow-xl px-4 sm:px-6 py-4 animate-in slide-in-from-top-2 duration-200 text-left">

          <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-[#eae7e7]">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#6c5b4c] font-bold">
              Pure Lingerie Collections
            </p>
            {onOpenStoreModal && (
              <button
                onClick={() => {
                  onOpenStoreModal();
                  setIsMobileMenuOpen(false);
                }}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#4e051a]"
              >
                <span className="material-symbols-outlined text-[14px] text-amber-500">store</span>
                <span>Ahmedabad Store</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  onNavigate(item.view, item.cat);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left px-2.5 py-2 text-[11.5px] sm:text-[12px] uppercase tracking-wider font-semibold rounded transition-colors ${
                  item.highlight
                    ? 'text-[#4e051a] font-bold bg-[#4e051a]/10'
                    : currentCategory === item.cat && currentView === item.view
                    ? 'bg-[#4e051a] text-white'
                    : 'text-[#1c1b1b] hover:bg-[#eae7e7]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Quick Feature Shortcuts in Mobile / Tablet Menu */}
          <div className="mt-3 pt-3 border-t border-[#eae7e7] grid grid-cols-2 gap-2 text-[11.5px]">
            {onOpenTrackOrder && (
              <button
                onClick={() => {
                  onOpenTrackOrder();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-1.5 p-1.5 rounded bg-white border border-[#eae7e7] text-[#1c1b1b] font-medium"
              >
                <span className="material-symbols-outlined text-[16px] text-[#4e051a]">local_shipping</span>
                <span>Track Order</span>
              </button>
            )}

            {onOpenOutfitFinder && (
              <button
                onClick={() => {
                  onOpenOutfitFinder();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-1.5 p-1.5 rounded bg-white border border-[#eae7e7] text-[#1c1b1b] font-medium"
              >
                <span className="material-symbols-outlined text-[16px] text-[#4e051a]">auto_awesome</span>
                <span>Style Matcher</span>
              </button>
            )}

            {onOpenBridalBuilder && (
              <button
                onClick={() => {
                  onOpenBridalBuilder();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-1.5 p-1.5 rounded bg-white border border-[#eae7e7] text-[#1c1b1b] font-medium col-span-2"
              >
                <span className="material-symbols-outlined text-[16px] text-[#4e051a]">featured_seasonal_and_gifts</span>
                <span>Bridal Box Builder (15% Off)</span>
              </button>
            )}

            <button
              onClick={() => {
                onOpenFitGuide();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 text-[#4e051a] font-semibold col-span-2 pt-1"
            >
              <span className="material-symbols-outlined text-[16px]">straighten</span>
              <span>Cup &amp; Band Sizing Guide</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
