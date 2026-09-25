import React, { useState, useEffect } from 'react';
import { Product, ProductColor } from '../types';
import { formatINR } from '../utils/formatCurrency';
import imgPureLaceBra from '../assets/images/pure_lace_bra_1790157170886.jpg';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, colorHex: string) => void;
  onOpenPDP: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenPDP
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || '34B');
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  if (!product || !selectedColor) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white max-w-2xl w-full shadow-2xl border border-[#f0eded] relative overflow-hidden animate-in fade-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#1c1b1b] hover:text-[#4e051a] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[3/4] md:aspect-auto bg-[#f0eded] overflow-hidden">
            <img
              src={product.mainImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = imgPureLaceBra;
              }}
              className="w-full h-full object-cover object-center"
            />
            {product.tag && (
              <span className="absolute top-3 left-3 bg-[#4e051a] text-white text-[9px] uppercase px-2 py-0.5 tracking-widest font-bold">
                {product.tag}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col justify-between text-left">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#6c5b4c] font-semibold">
                {product.category}
              </span>
              <h3 className="font-serif text-[22px] text-[#4e051a] font-medium mt-1 mb-2">
                {product.name}
              </h3>

              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-serif text-[20px] font-bold text-[#4e051a] tabular-nums">
                  {formatINR(product.price)}
                </span>
                <span className="text-[13px] text-[#877274] line-through tabular-nums">
                  {formatINR(product.originalPrice)}
                </span>
              </div>

              <p className="text-[13px] text-[#544244] leading-relaxed mb-4 font-light line-clamp-3">
                {product.description}
              </p>

              {/* Color Swatches */}
              <div className="mb-4">
                <span className="text-[10px] uppercase tracking-wider text-[#1c1b1b] font-semibold block mb-1.5">
                  Shade: <span className="font-normal text-[#4e051a]">{selectedColor.name}</span>
                </span>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`w-6 h-6 rounded-full cursor-pointer transition-transform ${
                        selectedColor.name === c.name
                          ? 'ring-2 ring-[#4e051a] ring-offset-2 scale-110'
                          : ''
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-6">
                <span className="text-[10px] uppercase tracking-wider text-[#1c1b1b] font-semibold block mb-1.5">
                  Select Size
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 text-[11px] font-semibold uppercase cursor-pointer transition-colors ${
                        selectedSize === sz
                          ? 'bg-[#4e051a] text-white'
                          : 'bg-[#f0eded] text-[#1c1b1b] hover:bg-[#eae7e7]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  onAddToCart(product, selectedSize, selectedColor.hex);
                  onClose();
                }}
                className="w-full bg-[#4e051a] hover:bg-[#6b1d2f] text-white py-3 text-[10px] uppercase tracking-[0.16em] font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                <span>Add To Boutique Bag</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenPDP(product);
                }}
                className="w-full text-center text-[10px] uppercase tracking-wider text-[#4e051a] font-bold underline py-1 hover:text-[#6b1d2f] cursor-pointer"
              >
                View Full Atelier Details →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
