import React, { useState } from 'react';
import { Product } from '../types';
import imgPureLaceBra from '../assets/images/pure_lace_bra_1790157170886.jpg';
import { formatINR } from '../utils/formatCurrency';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size?: string, colorHex?: string) => void;
  onOpenPDP: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  onOpenPDP
}) => {
  const [activeColor, setActiveColor] = useState(product.colors[0]);
  const [imgSrc, setImgSrc] = useState(product.mainImage);

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="product-item group flex flex-col bg-white shadow-sm hover:shadow-xl transition-all duration-300 text-left rounded-sm overflow-hidden border border-[#eae7e7]">
      {/* Visual Top Container */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#f3efee]">
        {product.tag && (
          <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10 bg-[#4e051a] text-white text-[9px] sm:text-[10px] px-2 py-0.5 sm:px-2.5 sm:py-1 uppercase tracking-widest font-bold shadow-xs">
            {product.tag}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          aria-label="Add to Wishlist"
          className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#544244] hover:text-[#4e051a] shadow-sm transition-colors cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
        >
          <span
            className={`material-symbols-outlined text-[18px] sm:text-[20px] transition-colors ${
              isWishlisted ? 'text-[#4e051a]' : ''
            }`}
            style={isWishlisted ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            favorite
          </span>
        </button>

        {/* Product Image with Fail-safe Fallback */}
        <div
          onClick={() => onOpenPDP(product)}
          className="w-full h-full relative cursor-pointer overflow-hidden bg-[#f3efee]"
        >
          <img
            src={imgSrc}
            alt={product.name}
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={() => {
              // Graceful fallback to guaranteed local asset
              setImgSrc(imgPureLaceBra);
            }}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Quick Actions Hover Overlay (Desktop) */}
        <div className="hidden sm:flex absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#381c1c]/90 via-[#381c1c]/50 to-transparent gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
          <button
            onClick={() => onQuickView(product)}
            className="flex-1 py-2.5 bg-white text-[#4e051a] text-[10px] uppercase tracking-wider font-bold hover:bg-[#fcf9f8] transition-colors text-center cursor-pointer shadow-sm"
          >
            Quick View
          </button>
          <button
            onClick={() => onAddToCart(product, product.sizes[0], activeColor.hex)}
            className="flex-1 py-2.5 bg-[#4e051a] text-white text-[10px] uppercase tracking-wider font-bold hover:bg-[#6b1d2f] transition-colors text-center cursor-pointer shadow-sm"
          >
            + Add to Bag
          </button>
        </div>
      </div>

      {/* Product Content / Metadata */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        {/* Rating Stars & Count */}
        <div className="flex items-center gap-1.5 mb-1">
          <div className="flex text-[#4e051a]">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className="material-symbols-outlined text-[13px] sm:text-[14px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
            ))}
          </div>
          <span className="text-[10px] text-[#544244]">({product.reviewsCount})</span>
        </div>

        {/* Title */}
        <h3
          onClick={() => onOpenPDP(product)}
          className="font-serif text-[15px] sm:text-[17px] text-[#4e051a] mb-1 line-clamp-1 hover:text-[#6b1d2f] cursor-pointer font-medium leading-tight"
        >
          {product.name}
        </h3>

        {/* Category Description */}
        <p className="text-[11.5px] sm:text-[12.5px] text-[#544244] mb-2 font-light line-clamp-1">
          {product.categoryDisplay}
        </p>

        {/* Color Swatches */}
        <div className="flex items-center gap-1.5 mb-2.5">
          {product.colors.map((color) => (
            <button
              key={color.name}
              title={color.name}
              onClick={() => setActiveColor(color)}
              className={`w-3.5 h-3.5 rounded-full shadow-inner cursor-pointer transition-all ${
                activeColor.name === color.name ? 'ring-1 ring-offset-1 ring-[#4e051a] scale-110' : ''
              }`}
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>

        {/* Pricing Baseline */}
        <div className="mt-auto flex items-baseline gap-2 pt-2 border-t border-[#f0eded]">
          <span className="font-serif text-[16px] sm:text-[18px] font-bold text-[#4e051a] tabular-nums">
            {formatINR(product.price)}
          </span>
          <span className="text-[11px] sm:text-[12.5px] text-[#877274] line-through tabular-nums">
            {formatINR(product.originalPrice)}
          </span>
          <span className="text-[9.5px] sm:text-[10px] text-[#4e051a] font-bold ml-auto uppercase tracking-wider">
            {discountPercent}% OFF
          </span>
        </div>

        {/* Mobile Quick Add Button (Directly Accessible on Phones) */}
        <div className="sm:hidden mt-2 pt-2 border-t border-[#f0eded] flex items-center gap-2">
          <button
            onClick={() => onAddToCart(product, product.sizes[0], activeColor.hex)}
            className="w-full py-1.5 bg-[#4e051a] text-white text-[11px] uppercase tracking-wider font-bold rounded-xs flex items-center justify-center gap-1.5 active:bg-[#6b1d2f]"
          >
            <span className="material-symbols-outlined text-[15px]">add_shopping_cart</span>
            <span>Add to Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
};
