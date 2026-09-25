import React from 'react';
import { Product } from '../types';
import { formatINR } from '../utils/formatCurrency';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onMoveToBag: (product: Product) => void;
  onExploreCollections: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onMoveToBag,
  onExploreCollections
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden text-left pointer-events-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer - Full width on phone, 420px max on sm+, no side clipping or horizontal overflow */}
      <div className="fixed inset-y-0 right-0 w-full sm:w-[420px] max-w-full bg-white shadow-2xl flex flex-col z-10 max-h-screen overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#f0eded] flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="text-[#544244] hover:text-[#4e051a] p-1 -ml-1 cursor-pointer sm:hidden rounded-full hover:bg-[#f0eded] flex items-center justify-center"
              aria-label="Back"
              title="Back"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
            <span className="material-symbols-outlined text-[#4e051a] text-[20px]">favorite</span>
            <h2 className="font-serif text-[18px] sm:text-[20px] text-[#4e051a] font-medium">
              Private Wishlist ({wishlistProducts.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#544244] hover:text-[#4e051a] p-1.5 cursor-pointer rounded-full hover:bg-[#f0eded] flex items-center justify-center"
            aria-label="Close Wishlist"
            title="Close"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
          {wishlistProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 min-h-[300px]">
              <span className="material-symbols-outlined text-[48px] text-[#dac0c2] mb-3">
                favorite_border
              </span>
              <p className="font-serif text-[18px] text-[#4e051a] font-medium mb-1">
                Your wishlist is empty
              </p>
              <p className="text-[13px] text-[#544244] mb-5 max-w-xs">
                Save your favorite leavers lace pieces to revisit or acquire anytime.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExploreCollections();
                }}
                className="bg-[#4e051a] text-white px-6 py-3 text-[10px] uppercase tracking-wider font-semibold hover:bg-[#6b1d2f] cursor-pointer shadow-sm"
              >
                Explore Atelier
              </button>
            </div>
          ) : (
            wishlistProducts.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 sm:gap-4 p-3 bg-[#fcf9f8] border border-[#f0eded] relative rounded-xs"
              >
                <div className="w-18 h-22 sm:w-20 sm:h-24 bg-[#f0eded] shrink-0 overflow-hidden rounded-xs">
                  <img
                    src={item.mainImage}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-serif text-[14px] sm:text-[15px] font-semibold text-[#4e051a] truncate">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => onRemoveFromWishlist(item)}
                        className="text-[#877274] hover:text-[#ba1a1a] p-0.5 cursor-pointer shrink-0 transition-colors"
                        title="Remove from wishlist"
                        aria-label="Remove item"
                      >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                      </button>
                    </div>

                    <p className="text-[11px] sm:text-[12px] text-[#544244] mt-0.5">{item.category}</p>
                    <p className="font-serif font-bold text-[15px] sm:text-[16px] text-[#4e051a] mt-1 tabular-nums">
                      {formatINR(item.price)}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      onMoveToBag(item);
                      onRemoveFromWishlist(item);
                    }}
                    className="mt-2.5 bg-[#4e051a] text-white py-2 px-3 text-[10px] uppercase tracking-wider font-semibold hover:bg-[#6b1d2f] transition-colors flex items-center justify-center gap-1.5 cursor-pointer rounded-xs shadow-xs w-full"
                  >
                    <span className="material-symbols-outlined text-[14px]">shopping_bag</span>
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
