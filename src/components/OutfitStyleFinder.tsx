import React, { useState } from 'react';
import { Product } from '../types';
import { formatINR } from '../utils/formatCurrency';

interface OutfitStyleFinderProps {
  products: Product[];
  onOpenPDP: (product: Product) => void;
  onAddToCart: (product: Product, size?: string, colorHex?: string) => void;
  onClose?: () => void;
}

interface OutfitOption {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  recommendedCategory: string;
  tips: string;
  productIds: number[];
}

export const OUTFIT_OPTIONS: OutfitOption[] = [
  {
    id: 'saree',
    title: 'Saree & Traditional Drape',
    subtitle: 'Saree & Petticoat Contouring',
    icon: 'styler',
    description: 'Perfect for silk, chiffon, georgette sarees and lehengas. Gives a smooth hourglass silhouette without traditional drawstring bulges.',
    recommendedCategory: 'Shapewear',
    tips: 'Target: Mermaid Saree Shaper with targeted compression and side slit for effortless walking and sitting.',
    productIds: [12, 11] // Mermaid Saree Shaper, High-Waist Cincher
  },
  {
    id: 'kurti',
    title: 'Kurti & Salwar Kameez',
    subtitle: 'Kurti & Salwar Suit Elegance',
    icon: 'checkroom',
    description: 'Everyday breathable coverage for cotton, georgette, or silk kurtis. Zero apex show-through and non-chafing all-day comfort.',
    recommendedCategory: 'Bras',
    tips: 'Target: Seamless Moulded T-Shirt Bra or Full-Coverage Wirefree Support.',
    productIds: [4, 7] // Seamless T-Shirt bra, Everyday Cotton
  },
  {
    id: 'deep-neck',
    title: 'Deep Neck Blouse & Gown',
    subtitle: 'Deep Plunge & Backless Choli',
    icon: 'flare',
    description: 'Designed for wedding blouses, plunging V-necks, sweetheart cuts, and backless gowns with zero visible straps.',
    recommendedCategory: 'Bras',
    tips: 'Target: Plunge Lace Balconette or Multi-Way Strapless Convertibles.',
    productIds: [2, 1] // Chantilly plunge, Balconette
  },
  {
    id: 'western',
    title: 'T-Shirt, Denim & Western',
    subtitle: 'T-Shirts, Jeans & Formals',
    icon: 'apparel',
    description: 'Invisible under snug t-shirts, bodycon tops, and business shirts. Smooth cups with ultra-soft breathable microfibre.',
    recommendedCategory: 'Bras',
    tips: 'Target: Ultra-Smooth Contour Seamless with laser-cut seamless brief.',
    productIds: [4, 10] // T-shirt bra, Bralette
  },
  {
    id: 'bridal',
    title: 'Bridal Lehenga & Trousseau',
    subtitle: 'Royal Wedding & Honeymoon',
    icon: 'diamond',
    description: 'Heavy lehenga waist support, structured bodice contouring, and luxurious French silk trousseau sets.',
    recommendedCategory: 'Bridal',
    tips: 'Target: Imperial Chantilly Corset Set + Pure Mulberry Silk Keepsake Robe.',
    productIds: [13, 6] // Imperial Bridal Corset, Silk Slip
  }
];

export const OutfitStyleFinder: React.FC<OutfitStyleFinderProps> = ({
  products,
  onOpenPDP,
  onAddToCart,
  onClose
}) => {
  const [selectedOutfitId, setSelectedOutfitId] = useState<string>('saree');

  const currentOutfit = OUTFIT_OPTIONS.find((o) => o.id === selectedOutfitId) || OUTFIT_OPTIONS[0];

  const matchedProducts = products.filter((p) =>
    currentOutfit.productIds.includes(p.id)
  );

  // Fallback if specific IDs aren't found
  const displayProducts = matchedProducts.length > 0
    ? matchedProducts
    : products.filter((p) => p.category === currentOutfit.recommendedCategory).slice(0, 2);

  return (
    <div className="w-full bg-[#fcf9f8] p-5 sm:p-8 rounded-sm border border-[#eae7e7] shadow-xs text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#eae7e7]">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-[#4e051a]/10 text-[#4e051a] px-2.5 py-0.5 rounded-full text-[10.5px] font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
            Smart Outfit-to-Innerwear Matcher
          </div>
          <h3 className="font-serif text-[22px] sm:text-[26px] text-[#4e051a] font-medium leading-tight">
            What are you wearing today?
          </h3>
          <p className="text-[12.5px] sm:text-[13px] text-[#544244] font-light mt-0.5">
            Select your Indian or Western attire to discover the exact engineered innerwear recommended by our atelier.
          </p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="self-start sm:self-center w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-[#544244] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        )}
      </div>

      {/* Outfit Selector Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mt-5">
        {OUTFIT_OPTIONS.map((outfit) => {
          const isSelected = outfit.id === selectedOutfitId;
          return (
            <button
              key={outfit.id}
              onClick={() => setSelectedOutfitId(outfit.id)}
              className={`p-3 rounded-xs border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-[#4e051a] bg-white shadow-sm ring-1 ring-[#4e051a]'
                  : 'border-[#eae7e7] bg-white hover:border-[#4e051a]/40 hover:bg-[#fcf9f8]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="material-symbols-outlined text-[22px] text-[#4e051a]">
                  {outfit.icon}
                </span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-[#4e051a]"></span>
                )}
              </div>
              <div>
                <p className="text-[12px] sm:text-[12.5px] font-bold text-[#1c1b1b] leading-snug">
                  {outfit.title}
                </p>
                <p className="text-[10px] text-[#6c5b4c] mt-0.5 font-medium">
                  {outfit.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Recommended Solution Card */}
      <div className="mt-6 p-4 sm:p-5 bg-white border border-[#eae7e7] rounded-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#f0eded]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-[16px] sm:text-[18px] text-[#4e051a] font-bold">
                Atelier Fit Prescription for {currentOutfit.title}
              </span>
              <span className="text-[10.5px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-bold">
                Verified Match
              </span>
            </div>
            <p className="text-[12.5px] text-[#544244] mt-1 font-light leading-relaxed">
              {currentOutfit.description}
            </p>
          </div>

          <div className="bg-[#fcf9f8] px-3.5 py-2 rounded border border-[#eae7e7] text-[11px] text-[#6c5b4c] shrink-0">
            <span className="font-bold text-[#4e051a] block mb-0.5">Atelier Tip:</span>
            {currentOutfit.tips}
          </div>
        </div>

        {/* Matched Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
          {displayProducts.map((prod) => (
            <div
              key={prod.id}
              className="flex gap-3.5 p-3 rounded bg-[#fcf9f8] border border-[#eae7e7] hover:border-[#4e051a]/40 transition-colors"
            >
              <img
                src={prod.mainImage}
                alt={prod.name}
                className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded shrink-0 cursor-pointer"
                onClick={() => onOpenPDP(prod)}
              />
              <div className="flex flex-col justify-between flex-1 text-left min-w-0">
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] text-[#6c5b4c] uppercase tracking-wider font-semibold">
                    <span>{prod.category}</span>
                    <span>•</span>
                    <span className="text-amber-600">★ {prod.rating}</span>
                  </div>
                  <h4
                    onClick={() => onOpenPDP(prod)}
                    className="font-serif text-[13.5px] sm:text-[14.5px] font-bold text-[#1c1b1b] hover:text-[#4e051a] cursor-pointer truncate mt-0.5"
                  >
                    {prod.name}
                  </h4>
                  <p className="text-[11.5px] text-[#6c5b4c] line-clamp-1 mt-0.5">
                    {prod.categoryDisplay || prod.features[0] || prod.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#eae7e7] mt-2">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-serif text-[15px] sm:text-[16px] font-bold text-[#4e051a]">
                      {formatINR(prod.price)}
                    </span>
                    {prod.originalPrice > prod.price && (
                      <span className="text-[11px] text-[#877274] line-through">
                        {formatINR(prod.originalPrice)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onOpenPDP(prod)}
                      className="px-2.5 py-1 text-[11px] font-semibold text-[#4e051a] hover:bg-[#4e051a]/5 rounded transition-colors cursor-pointer"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => onAddToCart(prod)}
                      className="bg-[#4e051a] hover:bg-[#6b1d2f] text-white px-3 py-1 text-[10.5px] uppercase tracking-wider font-bold rounded-xs shadow-xs transition-colors cursor-pointer"
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
