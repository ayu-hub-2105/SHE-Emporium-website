import React, { useState } from 'react';
import { Product } from '../types';
import { formatINR } from '../utils/formatCurrency';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const popularTags = ['Balconette', 'Mulberry Silk', 'Chantilly', 'Bridal', 'Shapewear', 'Wireless'];

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.categoryDisplay.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 pt-20">
      <div className="bg-white max-w-2xl w-full p-6 shadow-2xl border border-[#f0eded] text-left animate-in fade-in duration-150">
        <div className="flex items-center gap-3 pb-3 border-b border-[#f0eded]">
          <span className="material-symbols-outlined text-[#4e051a] text-[24px]">search</span>
          <input
            type="text"
            autoFocus
            placeholder="Search Chantilly lace, silk slips, cup sizes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-[16px] text-[#1c1b1b] focus:outline-none placeholder:text-[#877274]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#877274] hover:text-[#1c1b1b] p-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">clear</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="text-[#544244] hover:text-[#4e051a] p-1 cursor-pointer ml-2"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Popular Tags */}
        <div className="py-4">
          <span className="text-[10px] uppercase tracking-wider text-[#6c5b4c] font-semibold block mb-2">
            Popular Atelier Curations:
          </span>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-3 py-1 bg-[#f6f3f2] text-[11px] text-[#1c1b1b] hover:bg-[#4e051a] hover:text-white transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Live Search Results */}
        {query.trim() && (
          <div className="max-h-80 overflow-y-auto divide-y divide-[#f0eded] mt-2 border-t border-[#f0eded]">
            {filtered.length === 0 ? (
              <p className="py-6 text-center text-[13px] text-[#544244]">
                No creations found matching "{query}". Try searching for "Silk" or "Bras".
              </p>
            ) : (
              filtered.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => {
                    onSelectProduct(prod);
                    onClose();
                  }}
                  className="py-3 flex items-center gap-3 hover:bg-[#fcf9f8] px-2 cursor-pointer transition-colors"
                >
                  <div
                    className="w-12 h-14 bg-[#f0eded] bg-cover bg-center shrink-0"
                    style={{ backgroundImage: `url('${prod.mainImage}')` }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-[#4e051a] truncate">{prod.name}</p>
                    <p className="text-[11px] text-[#544244]">{prod.categoryDisplay}</p>
                  </div>
                  <span className="font-serif font-bold text-[15px] text-[#4e051a] tabular-nums">
                    {formatINR(prod.price)}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
