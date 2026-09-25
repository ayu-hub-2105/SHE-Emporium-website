import React from 'react';
import { CATEGORIES_LIST } from '../data/products';
import { CategoryType } from '../types';

interface CategoryMosaicProps {
  onSelectCategory: (cat: CategoryType) => void;
}

export const CategoryMosaic: React.FC<CategoryMosaicProps> = ({ onSelectCategory }) => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-16 py-12 w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 text-left">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#6c5b4c] font-semibold">
            Bespoke Architecture
          </span>
          <h2 className="font-display-md text-[#4e051a] mt-1 font-serif">
            Shop by Atelier Category
          </h2>
        </div>
        <p className="text-[15px] text-[#544244] max-w-md font-light leading-relaxed">
          Each archetype is meticulously patterned over 18 months, marrying architectural underwiring with gossamer European textiles.
        </p>
      </div>

      {/* 5 Luxury Visual Cards (Asymmetric Mosaic) */}
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
        {CATEGORIES_LIST.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectCategory(item.id as CategoryType)}
            className={`cursor-pointer group relative ${item.colSpan} h-[420px] md:h-[440px] overflow-hidden bg-[#f0eded] shadow-md`}
          >
            <img
              src={item.image}
              alt={item.name}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#4e051a]/85 via-transparent to-transparent" />
            
            {item.tag === 'Flagship Icon' && (
              <span className="absolute top-4 left-4 bg-white/90 text-[#4e051a] px-3 py-1 text-[10px] uppercase tracking-widest font-bold shadow-sm">
                Flagship Icon
              </span>
            )}

            <div className="absolute bottom-0 left-0 w-full p-6 text-white text-left">
              <span className="text-[10px] uppercase tracking-widest text-[#ffd9dd] font-semibold block mb-1">
                {item.tag}
              </span>
              <h3 className="font-serif text-[24px] font-medium text-white mb-1">
                {item.name}
              </h3>
              <p className="text-[13px] text-[#f6f3f2] mb-3 opacity-90 font-light line-clamp-2">
                {item.desc}
              </p>
              <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#f6decb] font-bold group-hover:translate-x-1 transition-transform">
                Explore Curation <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
