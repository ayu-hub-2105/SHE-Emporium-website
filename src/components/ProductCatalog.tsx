import React from 'react';
import { Product, CategoryType } from '../types';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  products: Product[];
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  wishlistIds: number[];
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size?: string, colorHex?: string) => void;
  onOpenPDP: (product: Product) => void;
  onOpenFitGuide: () => void;
}

interface CategorySectionDef {
  category: CategoryType;
  title: string;
  subtitle: string;
  badge: string;
}

const CATEGORY_SECTIONS: CategorySectionDef[] = [
  {
    category: 'Bras',
    title: 'Bras & Bralettes',
    subtitle: 'French floral lace balconettes & zero-dig invisible wireless T-shirt bras',
    badge: 'Everyday Comfort'
  },
  {
    category: 'Panties',
    title: 'Panties & Everyday Briefs',
    subtitle: 'Zero-VPL laser-cut seamless hipsters & luxury French scalloped lace bikini briefs',
    badge: 'Essential Cotton'
  },
  {
    category: 'Camisoles & Slips',
    title: 'Camisoles & Inner Slips',
    subtitle: 'Lenzing modal stretch kurti slips & 22-Momme pure mulberry silk chemises',
    badge: 'Wardrobe Staple'
  },
  {
    category: 'Sleepwear',
    title: 'Mulberry Silk Sleepwear',
    subtitle: 'Champagne bias-cut nighties & emerald silk kimono lounge wraps',
    badge: 'Pure Silk Satin'
  },
  {
    category: 'Lingerie Sets',
    title: 'Coordinated Lingerie Sets',
    subtitle: 'Noir Chantilly suspender garter sets & royal navy 2-piece bralette sets',
    badge: 'Couture 2-Piece'
  },
  {
    category: 'Shapewear',
    title: 'Sculptwear & Saree Shapers',
    subtitle: 'Instant hourglass tummy control bodysuits & mermaid drape saree shapers',
    badge: 'Instant Slim'
  },
  {
    category: 'Bridal',
    title: 'Bridal & Festive Intimates',
    subtitle: 'Imperial crimson zardozi corsets & ivory Chantilly trousseau sets',
    badge: 'Heirloom Trousseau'
  }
];

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  onOpenPDP,
  onOpenFitGuide
}) => {
  const filteredProducts = products.filter((p) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'New Arrivals') return p.isNew || p.tag?.includes('NEW');
    if (selectedCategory === 'Sale') return p.isSale || p.originalPrice > p.price;
    return p.category === selectedCategory;
  });

  return (
    <div className="w-full bg-[#f6f3f2] py-8 sm:py-14" id="catalog-anchor">
      <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 md:px-16">
        {/* Catalog Header & Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 sm:pb-8 gap-4 text-left border-b border-[#eae7e7]">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#4e051a]"></span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#6c5b4c] font-semibold">
                Curated Indian Atelier Collection • 2 Designs Per Category
              </span>
            </div>
            <h2 className="font-serif text-[24px] sm:text-[32px] md:text-[38px] text-[#4e051a] mt-1 font-medium leading-tight">
              Curated Intimates Showcase
            </h2>
            <p className="text-[12.5px] sm:text-[13.5px] text-[#544244] mt-1 max-w-xl">
              Handpicked essential styles across bras, panties, camisoles, sleepwear, shapewear, and bridal intimates. Each piece features a 100% unique design.
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => onSelectCategory('All')}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 text-[10px] uppercase tracking-wider font-semibold transition-all cursor-pointer rounded-xs ${
                selectedCategory === 'All'
                  ? 'bg-[#4e051a] text-white shadow-sm'
                  : 'bg-white text-[#1c1b1b] hover:text-[#4e051a] border border-[#eae7e7]'
              }`}
            >
              All Showcase
            </button>
            <button
              onClick={() => onSelectCategory('Bras')}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 text-[10px] uppercase tracking-wider font-semibold transition-all cursor-pointer rounded-xs ${
                selectedCategory === 'Bras'
                  ? 'bg-[#4e051a] text-white shadow-sm'
                  : 'bg-white text-[#1c1b1b] hover:text-[#4e051a] border border-[#eae7e7]'
              }`}
            >
              Bras
            </button>
            <button
              onClick={() => onSelectCategory('Panties')}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 text-[10px] uppercase tracking-wider font-semibold transition-all cursor-pointer rounded-xs ${
                selectedCategory === 'Panties'
                  ? 'bg-[#4e051a] text-white shadow-sm'
                  : 'bg-white text-[#1c1b1b] hover:text-[#4e051a] border border-[#eae7e7]'
              }`}
            >
              Panties
            </button>
            <button
              onClick={() => onSelectCategory('Camisoles & Slips')}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 text-[10px] uppercase tracking-wider font-semibold transition-all cursor-pointer rounded-xs ${
                selectedCategory === 'Camisoles & Slips'
                  ? 'bg-[#4e051a] text-white shadow-sm'
                  : 'bg-white text-[#1c1b1b] hover:text-[#4e051a] border border-[#eae7e7]'
              }`}
            >
              Camisoles &amp; Slips
            </button>
            <button
              onClick={() => onSelectCategory('Lingerie Sets')}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 text-[10px] uppercase tracking-wider font-semibold transition-all cursor-pointer rounded-xs ${
                selectedCategory === 'Lingerie Sets'
                  ? 'bg-[#4e051a] text-white shadow-sm'
                  : 'bg-white text-[#1c1b1b] hover:text-[#4e051a] border border-[#eae7e7]'
              }`}
            >
              Lingerie Sets
            </button>
            <button
              onClick={() => onSelectCategory('Sleepwear')}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 text-[10px] uppercase tracking-wider font-semibold transition-all cursor-pointer rounded-xs ${
                selectedCategory === 'Sleepwear'
                  ? 'bg-[#4e051a] text-white shadow-sm'
                  : 'bg-white text-[#1c1b1b] hover:text-[#4e051a] border border-[#eae7e7]'
              }`}
            >
              Sleepwear
            </button>
            <button
              onClick={() => onSelectCategory('Shapewear')}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 text-[10px] uppercase tracking-wider font-semibold transition-all cursor-pointer rounded-xs ${
                selectedCategory === 'Shapewear'
                  ? 'bg-[#4e051a] text-white shadow-sm'
                  : 'bg-white text-[#1c1b1b] hover:text-[#4e051a] border border-[#eae7e7]'
              }`}
            >
              Shapewear
            </button>
            <button
              onClick={() => onSelectCategory('Bridal')}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 text-[10px] uppercase tracking-wider font-semibold transition-all cursor-pointer rounded-xs ${
                selectedCategory === 'Bridal'
                  ? 'bg-[#4e051a] text-white shadow-sm'
                  : 'bg-white text-[#1c1b1b] hover:text-[#4e051a] border border-[#eae7e7]'
              }`}
            >
              Bridal
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* CASE 1: 'All' VIEW - Organized Clean Category Rows (2 each)   */}
        {/* ------------------------------------------------------------- */}
        {selectedCategory === 'All' ? (
          <div className="space-y-12 sm:space-y-16 mt-8">
            {CATEGORY_SECTIONS.map((sec) => {
              const categoryProds = products.filter((p) => p.category === sec.category);
              if (categoryProds.length === 0) return null;

              return (
                <section
                  key={sec.category}
                  className="bg-white p-4 sm:p-7 md:p-8 rounded-xs border border-[#eae7e7] shadow-xs text-left"
                >
                  {/* Category Section Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#f0eded] gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-[0.16em] bg-[#ffd9dd] text-[#4e051a] px-2 py-0.5 font-bold rounded-xs">
                          {sec.badge}
                        </span>
                        <span className="text-[11px] text-[#6c5b4c] font-medium">
                          • 2 Exclusive Styles
                        </span>
                      </div>
                      <h3 className="font-serif text-[20px] sm:text-[24px] text-[#4e051a] font-medium mt-1">
                        {sec.title}
                      </h3>
                      <p className="text-[12px] sm:text-[13px] text-[#544244] mt-0.5">
                        {sec.subtitle}
                      </p>
                    </div>

                    <button
                      onClick={() => onSelectCategory(sec.category)}
                      className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-bold text-[#4e051a] hover:text-[#6b1d2f] hover:translate-x-0.5 transition-all cursor-pointer self-start sm:self-auto shrink-0 bg-[#f6f3f2] px-3.5 py-1.5 rounded-xs"
                    >
                      <span>Explore {sec.title}</span>
                      <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                    </button>
                  </div>

                  {/* Curated 2-Product Showcase: Perfectly balanced 2-column grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto">
                    {categoryProds.slice(0, 2).map((prod) => (
                      <ProductCard
                        key={prod.id}
                        product={prod}
                        isWishlisted={wishlistIds.includes(prod.id)}
                        onToggleWishlist={onToggleWishlist}
                        onQuickView={onQuickView}
                        onAddToCart={onAddToCart}
                        onOpenPDP={onOpenPDP}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          /* ------------------------------------------------------------- */
          /* CASE 2: Single Category Selected (2 products displayed)      */
          /* ------------------------------------------------------------- */
          <div className="mt-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#6c5b4c] font-bold">
                  Filtered by Category
                </span>
                <h3 className="font-serif text-[22px] sm:text-[28px] text-[#4e051a] font-medium">
                  {selectedCategory}
                </h3>
              </div>
              <button
                onClick={() => onSelectCategory('All')}
                className="text-[11px] uppercase tracking-wider font-bold text-[#4e051a] underline cursor-pointer"
              >
                View All Categories
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {filteredProducts.slice(0, 2).map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  isWishlisted={wishlistIds.includes(prod.id)}
                  onToggleWishlist={onToggleWishlist}
                  onQuickView={onQuickView}
                  onAddToCart={onAddToCart}
                  onOpenPDP={onOpenPDP}
                />
              ))}
            </div>
          </div>
        )}

        {/* Personalized Fit Concierge Assistance Banner */}
        <div className="mt-12 sm:mt-16 p-5 sm:p-7 bg-[#f0eded] flex flex-col md:flex-row items-center justify-between gap-5 shadow-xs text-left rounded-xs border border-[#eae7e7]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#4e051a] text-white flex items-center justify-center shrink-0 rounded-xs shadow-sm">
              <span className="material-symbols-outlined text-[24px] sm:text-[28px]">straighten</span>
            </div>
            <div>
              <h4 className="font-serif text-[16px] sm:text-[18px] text-[#4e051a] font-semibold">
                Unsure of your Indian or International Cup & Band Size?
              </h4>
              <p className="text-[12px] sm:text-[13px] text-[#544244]">
                Our Ahmedabad boutique fit consultants provide free discreet sizing guidance on WhatsApp.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenFitGuide}
            className="shrink-0 bg-[#4e051a] hover:bg-[#6b1d2f] text-white px-6 sm:px-8 py-3 sm:py-3.5 text-[10.5px] sm:text-[11px] uppercase tracking-[0.14em] font-semibold transition-all cursor-pointer rounded-xs"
          >
            Launch Fit Concierge
          </button>
        </div>
      </div>
    </div>
  );
};
