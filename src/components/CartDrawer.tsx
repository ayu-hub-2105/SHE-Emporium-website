import React, { useState } from 'react';
import { CartItem } from '../types';
import { formatINR, formatINRSigned } from '../utils/formatCurrency';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartId: string, qty: number) => void;
  onRemoveItem: (cartId: string) => void;
  onProceedToCheckout: () => void;
  onExploreCollections: () => void;
  subtotal: number;
  discount: number;
  total: number;
  appliedCoupon: string;
  onApplyCoupon: (code: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onExploreCollections,
  subtotal,
  discount,
  total,
  appliedCoupon,
  onApplyCoupon
}) => {
  const [couponInput, setCouponInput] = useState('');

  if (!isOpen) return null;

  const freeShippingThreshold = 499;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden text-left pointer-events-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Panel - Full width on phone, 430px on sm+, no side clipping */}
      <div className="fixed inset-y-0 right-0 w-full sm:w-[430px] max-w-full bg-white shadow-2xl flex flex-col z-10 max-h-screen overflow-hidden">
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
            <span className="material-symbols-outlined text-[#4e051a] text-[20px]">shopping_bag</span>
            <h2 className="font-serif text-[18px] sm:text-[20px] text-[#4e051a] font-medium">
              Boutique Bag ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#544244] hover:text-[#4e051a] p-1.5 cursor-pointer rounded-full hover:bg-[#f0eded] flex items-center justify-center"
            aria-label="Close Bag"
            title="Close"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="px-4 sm:px-5 py-2.5 bg-[#f6f3f2] border-b border-[#f0eded] shrink-0">
          <div className="flex justify-between text-[11px] font-semibold text-[#1c1b1b] mb-1.5">
            <span className="truncate pr-2">
              {isFreeShipping
                ? '🎉 Complimentary Discreet Express Shipping Unlocked!'
                : `Add ${formatINR(freeShippingThreshold - subtotal)} more for Free Express`}
            </span>
            <span className="font-mono shrink-0">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#eae7e7] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#4e051a] transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items Scroll */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 min-h-[300px]">
              <span className="material-symbols-outlined text-[48px] text-[#dac0c2] mb-3">
                shopping_bag
              </span>
              <p className="font-serif text-[18px] text-[#4e051a] font-medium mb-1">
                Your boutique bag is empty
              </p>
              <p className="text-[13px] text-[#544244] mb-5 max-w-xs">
                Select a bespoke piece from our private salon collections.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExploreCollections();
                }}
                className="bg-[#4e051a] text-white px-6 py-3 text-[10px] uppercase tracking-wider font-semibold hover:bg-[#6b1d2f] cursor-pointer shadow-sm"
              >
                Explore Atelier Collections
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 sm:gap-4 p-3 bg-[#fcf9f8] border border-[#f0eded] relative group rounded-xs"
              >
                <div className="w-18 h-22 sm:w-20 sm:h-24 bg-[#f0eded] shrink-0 overflow-hidden rounded-xs">
                  <img
                    src={item.product.mainImage}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-serif text-[14px] sm:text-[15px] font-semibold text-[#4e051a] truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#877274] hover:text-[#ba1a1a] p-0.5 cursor-pointer shrink-0 transition-colors"
                        title="Remove item"
                        aria-label="Remove item"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>

                    <p className="text-[11px] sm:text-[12px] text-[#544244] mt-0.5 truncate">
                      <span
                        className="inline-block w-2.5 h-2.5 rounded-full mr-1.5 align-middle"
                        style={{ backgroundColor: item.selectedColor.hex }}
                      />
                      {item.selectedColor.name} • Size: <strong>{item.selectedSize}</strong>
                    </p>
                  </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#f0eded]">
                      <div className="flex items-center border border-[#dac0c2] bg-white rounded-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center font-bold text-sm hover:bg-[#f0eded] cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-7 sm:w-8 text-center text-[12px] font-bold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center font-bold text-sm hover:bg-[#f0eded] cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                    <span className="font-serif font-bold text-[15px] sm:text-[16px] text-[#4e051a] tabular-nums">
                      {formatINR(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 bg-[#fcf9f8] border-t border-[#f0eded] space-y-2.5 shrink-0">
            {/* Coupon Form */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Coupon (try LUXESHE10)"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                className="flex-1 bg-white px-2.5 py-1.5 text-[11px] sm:text-[12px] uppercase tracking-wider text-[#1c1b1b] border border-[#f0eded] focus:outline-none rounded-xs"
              />
              <button
                type="button"
                onClick={() => {
                  if (couponInput) onApplyCoupon(couponInput.trim());
                  setCouponInput('');
                }}
                className="bg-[#6c5b4c] hover:bg-[#534436] text-white px-3 py-1.5 text-[10px] uppercase tracking-wider font-semibold cursor-pointer rounded-xs"
              >
                Apply
              </button>
            </div>

            {appliedCoupon && (
              <div className="flex items-center justify-between text-[11px] text-[#4e051a] bg-[#ffd9dd]/30 p-2 rounded-xs">
                <span>Coupon {appliedCoupon} Active</span>
                <span className="font-bold tabular-nums">{formatINRSigned(discount)}</span>
              </div>
            )}

            {/* Totals */}
            <div className="space-y-1 text-[12px] sm:text-[13px] text-[#544244]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#1c1b1b] font-medium tabular-nums">
                  {formatINR(subtotal)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#4e051a]">
                  <span>Privilege Savings</span>
                  <span className="tabular-nums font-medium">{formatINRSigned(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Discreet Courier</span>
                <span className="text-[#4e051a] font-bold">
                  {isFreeShipping ? 'FREE' : formatINR(150)}
                </span>
              </div>
              <div className="flex justify-between text-[15px] sm:text-[16px] font-serif font-bold text-[#4e051a] pt-1.5 border-t border-[#f0eded]">
                <span>Estimated Total</span>
                <span className="tabular-nums">{formatINR(total)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full bg-[#4e051a] hover:bg-[#6b1d2f] text-white py-3 text-[11px] uppercase tracking-[0.16em] font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer rounded-xs"
            >
              <span className="material-symbols-outlined text-[17px]">lock</span>
              <span>Proceed to Discreet Checkout</span>
            </button>

            <button
              type="button"
              onClick={() => {
                const itemsList = cartItems
                  .map((item, idx) => `${idx + 1}. ${item.product.name} (Size: ${item.selectedSize}, Qty: ${item.quantity}) - ${formatINR(item.product.price * item.quantity)}`)
                  .join('\n');
                const message = encodeURIComponent(
                  `Hello Sanjay Bhai, I would like to order my shopping bag from She Emporium (Ahmedabad):\n\n` +
                  `${itemsList}\n\n` +
                  `Total Bag Value: ${formatINR(total)}\n` +
                  `Please assist with delivery to my doorstep.`
                );
                window.open(`https://wa.me/919909008789?text=${message}`, '_blank');
              }}
              className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-2.5 text-[11px] uppercase tracking-wider font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer rounded-xs"
            >
              <span className="material-symbols-outlined text-[17px]">chat</span>
              <span>Order Bag via WhatsApp</span>
            </button>

            <p className="text-center text-[9.5px] sm:text-[10px] text-[#877274] uppercase tracking-wider">
              100% Blind Packaging • Complimentary Size Exchanges
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
