import React, { useState, useMemo } from 'react';
import { Product, CategoryType } from '../types';
import { ProductCard } from './ProductCard';

import imgCloviaBraBanner from '../assets/images/clovia_bra_banner_1790336287877.jpg';
import imgPantySeamlessPack from '../assets/images/panty_seamless_pack_1790337482796.jpg';
import imgCamisoleModalSlip from '../assets/images/camisole_modal_slip_1790337523985.jpg';
import imgCloviaMatchingSetsHero from '../assets/images/clovia_matching_sets_hero_1790337329203.jpg';
import imgCloviaLoungeBanner from '../assets/images/clovia_lounge_banner_1790336302362.jpg';
import imgSareeShaper from '../assets/images/saree_shaper_1790157290893.jpg';
import imgCloviaBridalBanner from '../assets/images/clovia_bridal_banner_1790336312147.jpg';

interface CategoryViewProps {
  category: CategoryType;
  products: Product[];
  wishlistIds: number[];
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size?: string, colorHex?: string) => void;
  onOpenPDP: (product: Product) => void;
  onOpenFitGuide: () => void;
  onNavigateHome: () => void;
  onSelectCategory: (cat: CategoryType) => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  category,
  products,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  onOpenPDP,
  onOpenFitGuide,
  onNavigateHome,
  onSelectCategory
}) => {
  const [selectedSubtype, setSelectedSubtype] = useState<string>('All');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Metadata per category
  const categoryMeta: Record<string, { title: string; subtitle: string; description: string; bannerImage: string }> = {
    'Bras': {
      title: 'Bras & Bralettes',
      subtitle: 'Lyon Leavers Lace & Zero-Dig Architectural Ergonomics',
      description: 'Handcrafted with hypoallergenic titanium memory underwires, breathable honeycomb cores, and pure silk ribbon linings. Explore Balconette, Wireless, Push-Up, Strapless, Minimizer & Deep Plunge.',
      bannerImage: imgCloviaBraBanner
    },
    'Panties': {
      title: 'Panties & Everyday Briefs',
      subtitle: 'Zero-VPL Laser-Cut Seamless Hipsters & Scalloped French Lace',
      description: 'Engineered with 100% organic cotton gussets and ultra-fine microfibers. Zero digging, zero panty lines under Indian ethnic wear. Explore Hipster, Bikini, High-Waist, Thong & Anti-Chafing Boy Shorts.',
      bannerImage: imgPantySeamlessPack
    },
    'Camisoles & Slips': {
      title: 'Camisoles & Inner Slips',
      subtitle: 'Featherlight Modal Kurti Slips & 22-Momme Pure Silk Chemises',
      description: 'Essential layering under Indian kurtis, sheer georgettes, and workwear blazers. Anti-static, ultra-breathable. Explore Kurti Slips, 2-in-1 Padded Camisoles, Full-Length Anarkali Maxi Slips & Silk Chemises.',
      bannerImage: imgCamisoleModalSlip
    },
    'Lingerie Sets': {
      title: 'Couture Lingerie Sets',
      subtitle: 'Sensual Chantilly Lace, Silk Ribbons & Suspender Belts',
      description: 'Matching 2-piece and 3-piece sets featuring plunge bralettes, high-waisted cheeky briefs, gilded hardware suspender garters, and romantic sheer babydoll sets.',
      bannerImage: imgCloviaMatchingSetsHero
    },
    'Sleepwear': {
      title: 'Mulberry Silk Sleepwear',
      subtitle: '22-Momme Grade 6A Pure Mulberry Silk & Austrian Modal',
      description: 'Fluid bias-cut slip dresses, 22-momme tailored pajama trouser suits, and cathedral bell-sleeve kimono dressing gowns designed for effortless luxury.',
      bannerImage: imgCloviaLoungeBanner
    },
    'Shapewear': {
      title: 'Targeted Micro-Shapewear & Saree Shapers',
      subtitle: 'Seamless 360° Waist Contouring Without Suffocating Compression',
      description: 'Hourglass open-bust bodysuits, saree mermaid sculpting petticoats, mid-thigh slimmers, and non-roll steel-boned hourglass waist cinchers.',
      bannerImage: imgSareeShaper
    },
    'Bridal': {
      title: 'The Bridal Trousseau Edit',
      subtitle: 'Hand-Sewn Baroque Pearls, Heirloom Trunks & Cathedral Robes',
      description: 'Heirloom creations designed for the modern bride. Featuring crimson velvet corsets, ivory Chantilly trousseau sets, and cathedral satin embroidered robes.',
      bannerImage: imgCloviaBridalBanner
    },
    'New Arrivals': {
      title: 'Autumn / Winter New Arrivals',
      subtitle: 'Fresh Atelier Silhouettes & Seasonal Bordeaux Releases',
      description: 'Discover the latest additions to the SHE Emporium intimate wardrobe, featuring limited fabric cuts and innovative ergonomic constructions.',
      bannerImage: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=80'
    },
    'Sale': {
      title: 'Privilege Salon Sale',
      subtitle: 'Archival & Seasonal Reductions Up to 40% Off',
      description: 'Exclusive salon pricing on iconic Lyon Chantilly lace balconettes, pure mulberry silk slip gowns, and structured couture sets.',
      bannerImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80'
    }
  };

  const meta = categoryMeta[category] || {
    title: category,
    subtitle: 'SHE Emporium Intimate Couture',
    description: 'Curated luxury intimates crafted with European heritage techniques.',
    bannerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA10F6e3uGwi0YFoCHiQ4_gnhobcIbQFSRDhfOPxWW0TYmSp5pBnGGW4b81r6hqBX7uXJJLvCe7iqcyfTIMwBzgXky-ArTdfePbrqhGzTvtHPuj_zAOnAoMamsmBege-unvoOeu0qRtmZPv2iX58xLmMoTXWntQ1jmovJ60BNqIArieiBAKuk0PgF-vNJQpNkeTf_68OFchFKMJ1IIgMHfm3dk9uOFMyKNR36eJ4zPmTgbepjj0cHWm'
  };

  // Base products for this category
  const baseCategoryProducts = useMemo(() => {
    if (category === 'New Arrivals') {
      return products.filter((p) => p.isNew || p.tag?.includes('NEW'));
    }
    if (category === 'Sale') {
      return products.filter((p) => p.isSale || p.originalPrice > p.price);
    }
    return products.filter((p) => p.category === category);
  }, [category, products]);

  // Extract all unique subTypes
  const availableSubtypes = useMemo(() => {
    const set = new Set<string>();
    baseCategoryProducts.forEach((p) => {
      if (p.subType) set.add(p.subType);
    });
    return ['All', ...Array.from(set)];
  }, [baseCategoryProducts]);

  // Filtered & Sorted products
  const displayedProducts = useMemo(() => {
    let list = [...baseCategoryProducts];

    // Filter by Subtype
    if (selectedSubtype !== 'All') {
      list = list.filter((p) => p.subType === selectedSubtype);
    }

    // Filter by Size
    if (selectedSizeFilter !== 'All') {
      list = list.filter((p) => p.sizes.includes(selectedSizeFilter));
    }

    // Sort
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
    }

    return list;
  }, [baseCategoryProducts, selectedSubtype, selectedSizeFilter, sortBy]);

  return (
    <div className="w-full bg-[#fcf9f8] min-h-screen text-left">
      {/* Category Hero Banner - Clean on phone view */}
      <div className="relative w-full bg-[#1c1b1b] text-white overflow-hidden py-10 sm:py-16 md:py-24 border-b border-[#eae7e7]">
        <div
          className="absolute inset-0 bg-cover bg-[center_top] sm:bg-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url('${meta.bannerImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1b] via-[#1c1b1b]/80 to-transparent sm:bg-gradient-to-r sm:from-[#1c1b1b] sm:via-[#1c1b1b]/80 sm:to-transparent" />

        <div className="relative max-w-[1440px] mx-auto px-4 md:px-16 z-10 text-left">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-widest text-[#dac0c2] mb-3 sm:mb-6">
            <button
              onClick={onNavigateHome}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span>Atelier Collections</span>
            <span>/</span>
            <span className="text-white font-semibold">{category}</span>
          </nav>

          <span className="hidden sm:inline-block px-3 py-1 bg-[#4e051a] text-white text-[9px] uppercase tracking-[0.24em] font-bold mb-4">
            Curated Atelier Collection
          </span>

          <h1 className="font-serif text-[26px] sm:text-[36px] md:text-[54px] font-normal tracking-tight text-white leading-tight max-w-2xl">
            {meta.title}
          </h1>

          <p className="font-serif italic text-[14px] sm:text-[16px] md:text-[18px] text-[#dac0c2] mt-1 sm:mt-2 max-w-xl">
            {meta.subtitle}
          </p>

          <p className="hidden sm:block text-[13px] text-[#eae7e7] max-w-xl mt-3 leading-relaxed font-light">
            {meta.description}
          </p>

          <div className="mt-4 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={onOpenFitGuide}
              className="bg-[#4e051a] hover:bg-[#6b1d2f] text-white px-5 sm:px-6 py-2.5 sm:py-3 text-[10px] sm:text-[11px] uppercase tracking-[0.16em] font-semibold transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] sm:text-[18px]">straighten</span>
              <span>Find My Precision Fit</span>
            </button>
            <div className="text-[11px] sm:text-[12px] text-[#dac0c2] font-mono">
              {displayedProducts.length} Bespoke Patterns
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area with Filters & Grid */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-16 py-10">
        {/* Navigation Switcher Pills */}
        <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-[#eae7e7] mb-8 overflow-x-auto">
          {(['Bras', 'Panties', 'Camisoles & Slips', 'Lingerie Sets', 'Sleepwear', 'Shapewear', 'Bridal', 'Sale'] as CategoryType[]).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                onSelectCategory(cat);
                setSelectedSubtype('All');
                setSelectedSizeFilter('All');
              }}
              className={`px-4 py-2 text-[11px] uppercase tracking-wider font-semibold transition-all cursor-pointer whitespace-nowrap ${
                category === cat
                  ? 'bg-[#4e051a] text-white shadow-sm'
                  : 'bg-white border border-[#eae7e7] text-[#1c1b1b] hover:text-[#4e051a] hover:border-[#4e051a]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter & Sort Controls Bar */}
        <div className="bg-white p-4 md:p-5 border border-[#eae7e7] shadow-sm mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Subtype Pills */}
          {availableSubtypes.length > 1 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider text-[#6c5b4c] font-bold mr-1">
                Style:
              </span>
              {availableSubtypes.map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedSubtype(st)}
                  className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-medium transition-colors cursor-pointer ${
                    selectedSubtype === st
                      ? 'bg-[#4e051a] text-white font-bold'
                      : 'bg-[#f6f3f2] text-[#544244] hover:bg-[#eae7e7]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          )}

          {/* Sizing & Sort Dropdowns */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-[12px]">
              <label className="text-[10px] uppercase tracking-wider text-[#6c5b4c] font-bold">
                Size:
              </label>
              <select
                value={selectedSizeFilter}
                onChange={(e) => setSelectedSizeFilter(e.target.value)}
                className="bg-[#f6f3f2] border border-[#eae7e7] text-[#1c1b1b] px-3 py-1.5 text-[11px] uppercase focus:outline-none"
              >
                <option value="All">All Sizes</option>
                <option value="32B">32B</option>
                <option value="34B">34B</option>
                <option value="34C">34C</option>
                <option value="36B">36B</option>
                <option value="36C">36C</option>
                <option value="38D">38D</option>
                <option value="S">Small (S)</option>
                <option value="M">Medium (M)</option>
                <option value="L">Large (L)</option>
                <option value="XL">Extra Large (XL)</option>
              </select>
            </div>

            <div className="flex items-center gap-2 text-[12px]">
              <label className="text-[10px] uppercase tracking-wider text-[#6c5b4c] font-bold">
                Sort By:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#f6f3f2] border border-[#eae7e7] text-[#1c1b1b] px-3 py-1.5 text-[11px] focus:outline-none"
              >
                <option value="featured">Atelier Curation</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Client Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {displayedProducts.length === 0 ? (
          <div className="py-20 text-center bg-white border border-[#eae7e7] p-8">
            <span className="material-symbols-outlined text-[48px] text-[#dac0c2] mb-3">
              checkroom
            </span>
            <h3 className="font-serif text-[22px] text-[#4e051a] font-medium">
              No creations match the selected filters
            </h3>
            <p className="text-[13px] text-[#544244] mt-1 mb-6">
              Try resetting your size or style selection to view available atelier inventory.
            </p>
            <button
              onClick={() => {
                setSelectedSubtype('All');
                setSelectedSizeFilter('All');
              }}
              className="bg-[#4e051a] text-white px-6 py-2.5 text-[10px] uppercase tracking-wider font-semibold hover:bg-[#6b1d2f] cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedProducts.map((prod) => (
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
        )}

        {/* Bottom Concierge Helper Strip */}
        <div className="mt-16 p-8 bg-[#f6f3f2] border border-[#eae7e7] flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#4e051a] text-white flex items-center justify-center shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[28px]">support_agent</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#6c5b4c] font-bold">
                Private Consultation
              </span>
              <h4 className="font-serif text-[20px] text-[#4e051a] font-semibold">
                Require Sister-Sizing Guidance for {category}?
              </h4>
              <p className="text-[13px] text-[#544244] mt-0.5">
                Our master corsetieres calibrate cup depths, wire arcs, and band tensions via discreet WhatsApp consults.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenFitGuide}
              className="bg-white border border-[#4e051a] text-[#4e051a] hover:bg-[#4e051a] hover:text-white px-6 py-3 text-[11px] uppercase tracking-[0.14em] font-semibold transition-all cursor-pointer"
            >
              Fit Calculator
            </button>
            <button
              onClick={onNavigateHome}
              className="bg-[#4e051a] hover:bg-[#6b1d2f] text-white px-6 py-3 text-[11px] uppercase tracking-[0.14em] font-semibold transition-all cursor-pointer"
            >
              ← Back to Boutique
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
