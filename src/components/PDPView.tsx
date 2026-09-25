import React, { useState } from 'react';
import { Product, ProductColor } from '../types';
import { formatINR } from '../utils/formatCurrency';
import imgPureLaceBra from '../assets/images/pure_lace_bra_1790157170886.jpg';

interface PDPViewProps {
  product: Product;
  onAddToCart: (product: Product, size: string, colorHex: string, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onOpenFitGuide: () => void;
  onNavigateHome: () => void;
  onOpenReviewModal?: () => void;
}

export const PDPView: React.FC<PDPViewProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onOpenFitGuide,
  onNavigateHome,
  onOpenReviewModal
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '34B');
  const [quantity, setQuantity] = useState(1);

  // Indian Pincode Delivery Checker State
  const [pincode, setPincode] = useState('380001');
  const [checkedPincode, setCheckedPincode] = useState<string | null>('380001');

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length === 6) {
      setCheckedPincode(pincode.trim());
    }
  };

  const isAhmedabadOrGujarat = checkedPincode?.startsWith('38');

  const handleOrderWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Sanjay Bhai, I would like to order from She Emporium (Ahmedabad):\n` +
      `• Product: ${product.name}\n` +
      `• Price: ${formatINR(product.price)}\n` +
      `• Selected Size: ${selectedSize}\n` +
      `• Selected Color: ${selectedColor.name}\n` +
      `• Quantity: ${quantity}\n` +
      `• Pincode: ${checkedPincode || 'Ahmedabad'}\n` +
      `Please confirm availability and dispatch.`
    );
    window.open(`https://wa.me/919909008789?text=${text}`, '_blank');
  };

  // Accordion open states
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    craft: true,
    courier: false,
    exchange: false
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const images = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.mainImage];

  const currentImage = images[selectedImageIndex] || product.mainImage;
  const savings = product.originalPrice - product.price;
  const discountPercent = Math.round((savings / product.originalPrice) * 100);

  return (
    <div className="w-full py-12 bg-[#fcf9f8] text-left">
      <div className="max-w-[1440px] mx-auto px-4 md:px-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-[#544244] mb-8">
          <button
            onClick={onNavigateHome}
            className="hover:text-[#4e051a] cursor-pointer transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={onNavigateHome}
            className="hover:text-[#4e051a] cursor-pointer transition-colors"
          >
            {product.category}
          </button>
          <span>/</span>
          <span className="text-[#4e051a] font-bold truncate max-w-md">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Gallery Column */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3 shrink-0 overflow-x-auto md:overflow-visible">
              {images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`cursor-pointer w-20 h-24 bg-[#f0eded] overflow-hidden transition-all ${
                    selectedImageIndex === idx
                      ? 'ring-2 ring-[#4e051a]'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} - view ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = imgPureLaceBra;
                    }}
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>

            {/* Main Hero Image */}
            <div className="relative flex-1 aspect-[3/4] bg-[#f0eded] overflow-hidden shadow-lg">
              <img
                src={currentImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = imgPureLaceBra;
                }}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />
              <span className="absolute top-4 left-4 bg-[#4e051a] text-white text-[10px] uppercase px-3 py-1 tracking-widest font-bold">
                {product.tag || 'Haute Atelier'}
              </span>
              <div className="absolute bottom-4 right-4 bg-white/85 backdrop-blur-md px-3 py-1.5 flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold text-[#1c1b1b]">
                <span className="material-symbols-outlined text-[16px]">360</span>
                <span>Atelier 360 View</span>
              </div>
            </div>
          </div>

          {/* Details & Purchase Column */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#6c5b4c] font-semibold">
                SHE EMPORIUM PRIVATE SALON
              </span>
              <span className="text-[11px] text-[#877274] font-mono">{product.sku}</span>
            </div>

            <h1 className="font-serif text-[32px] md:text-[38px] text-[#4e051a] mt-1 mb-2 font-medium leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <div className="flex text-[#4e051a]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <span className="text-[11px] font-semibold text-[#1c1b1b]">4.95 / 5.0</span>
                <span className="text-[#544244]">•</span>
                <span className="text-[10px] underline text-[#544244]">
                  {product.reviewsCount} Atelier Verified Reviews
                </span>
              </div>
              {onOpenReviewModal && (
                <button
                  type="button"
                  onClick={onOpenReviewModal}
                  className="text-[11px] font-bold text-[#4e051a] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">rate_review</span>
                  <span>Write Review</span>
                </button>
              )}
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 mb-5 pb-3 border-b border-[#f0eded]">
              <span className="font-serif text-[28px] font-bold text-[#4e051a] tabular-nums">
                {formatINR(product.price)}
              </span>
              <span className="font-serif text-[18px] text-[#877274] line-through tabular-nums">
                {formatINR(product.originalPrice)}
              </span>
              <span className="px-2 py-0.5 bg-[#ffd9dd] text-[#400013] text-[10px] uppercase font-bold">
                Save {discountPercent}% ({formatINR(savings)})
              </span>
              <span className="text-[11px] text-[#544244] ml-auto">Inclusive of all duties</span>
            </div>

            {/* Color Selector */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] uppercase tracking-wider text-[#1c1b1b] font-semibold">
                  Select Shade: <span className="font-normal text-[#4e051a]">{selectedColor.name}</span>
                </label>
                <span className="text-[11px] text-[#877274] font-mono">
                  {product.colors.length} Shades Available
                </span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`w-9 h-9 rounded-full shadow-md transition-all cursor-pointer ${
                      selectedColor.name === c.name
                        ? 'ring-2 ring-[#4e051a] ring-offset-2 scale-105'
                        : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] uppercase tracking-wider text-[#1c1b1b] font-semibold">
                  Cup &amp; Band Size (IN/UK):
                </label>
                <button
                  onClick={onOpenFitGuide}
                  className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#4e051a] underline font-bold cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">straighten</span>
                  Calculate My Size
                </button>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3 py-2.5 text-center text-[11px] uppercase font-semibold transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-[#4e051a] text-white'
                        : 'bg-[#f0eded] text-[#1c1b1b] hover:bg-[#eae7e7]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-[10px] text-[#6c5b4c] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">info</span>
                Sister size recommendation: If {selectedSize} feels snug in the band, try an adjacent sister size.
              </p>
            </div>

            {/* Quantity & CTAs */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center bg-[#f0eded] px-2 py-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-10 flex items-center justify-center font-bold text-lg hover:text-[#4e051a] cursor-pointer"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-[13px] tabular-nums">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-10 flex items-center justify-center font-bold text-lg hover:text-[#4e051a] cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => onAddToCart(product, selectedSize, selectedColor.hex, quantity)}
                className="flex-1 bg-[#4e051a] hover:bg-[#6b1d2f] text-white py-4 px-6 text-[11px] uppercase tracking-[0.16em] font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#4e051a]/20 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                <span>Add To Boutique Bag</span>
              </button>

              <button
                aria-label="Wishlist"
                onClick={() => onToggleWishlist(product)}
                className="w-12 h-12 bg-[#f0eded] hover:bg-[#eae7e7] flex items-center justify-center text-[#4e051a] transition-colors cursor-pointer"
              >
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={isWishlisted ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  favorite
                </span>
              </button>
            </div>

            {/* Feature 1: Order via WhatsApp direct button */}
            <button
              type="button"
              onClick={handleOrderWhatsApp}
              className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 px-5 text-[11.5px] uppercase tracking-wider font-bold rounded-xs shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-colors mb-5"
            >
              <span className="material-symbols-outlined text-[19px]">chat</span>
              <span>Order via WhatsApp with Sanjay Bhai</span>
            </button>

            {/* Feature 2: Indian PIN Code Delivery & COD Checker Widget */}
            <div className="p-3.5 sm:p-4 bg-white border border-[#eae7e7] rounded-xs mb-5 text-left">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase font-bold tracking-wider text-[#4e051a] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                  Delivery &amp; COD Verification
                </span>
                <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  Discreet Air Courier
                </span>
              </div>

              <form onSubmit={handleCheckPincode} className="flex gap-2 mb-2.5">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit PIN code (e.g. 380001)"
                  className="flex-1 px-3 py-2 border border-[#eae7e7] rounded-xs text-[12px] font-mono focus:outline-none focus:border-[#4e051a]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#4e051a] text-white text-[11px] font-bold uppercase tracking-wider rounded-xs hover:bg-[#6b1d2f] cursor-pointer"
                >
                  Check PIN
                </button>
              </form>

              {checkedPincode && (
                <div className="space-y-1.5 text-[11.5px] text-[#544244] animate-in fade-in duration-200">
                  {isAhmedabadOrGujarat ? (
                    <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                      <span className="material-symbols-outlined text-[16px]">bolt</span>
                      <span>⚡ Express Same-Day / 24-Hr Delivery available in Ahmedabad ({checkedPincode})!</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-stone-800 font-semibold">
                      <span className="material-symbols-outlined text-[16px] text-emerald-600">check_circle</span>
                      <span>Delivers in 2-3 business days to PIN {checkedPincode} via Priority Courier</span>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between text-[11px] text-[#6c5b4c] pt-2 border-t border-[#f0eded] gap-2">
                    <span className="flex items-center gap-1 font-medium">
                      <span className="material-symbols-outlined text-[14px] text-emerald-600">payments</span>
                      Cash on Delivery (COD) Available
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <span className="material-symbols-outlined text-[14px] text-[#4e051a]">visibility_off</span>
                      100% Plain Unbranded Secondary Box
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Checkout Security Pill */}
            <div className="p-3 bg-[#f6f3f2] mb-5 flex items-center justify-between text-[13px] text-[#544244]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4e051a] text-[20px]">inventory_2</span>
                <span>Discreet luxury packaging guaranteed</span>
              </div>
              <span className="font-semibold text-[#4e051a]">In Stock (Mumbai Atelier)</span>
            </div>

            {/* Accordion Details */}
            <div className="space-y-2 border-t border-[#f0eded] pt-3">
              {/* Item 1 */}
              <div className="border-b border-[#f0eded] pb-2">
                <button
                  onClick={() => toggleAccordion('craft')}
                  className="w-full flex items-center justify-between py-2 text-left text-[11px] uppercase tracking-wider text-[#1c1b1b] font-semibold cursor-pointer"
                >
                  <span>The Architecture &amp; Fabric Craft</span>
                  <span className="material-symbols-outlined text-[18px]">
                    {openAccordions.craft ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {openAccordions.craft && (
                  <div className="text-[13px] text-[#544244] pb-2 leading-relaxed space-y-1 font-light">
                    {product.features.map((feat, i) => (
                      <p key={i}>• {feat}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* Item 2 */}
              <div className="border-b border-[#f0eded] pb-2">
                <button
                  onClick={() => toggleAccordion('courier')}
                  className="w-full flex items-center justify-between py-2 text-left text-[11px] uppercase tracking-wider text-[#1c1b1b] font-semibold cursor-pointer"
                >
                  <span>Discreet Courier &amp; Delivery Protocols</span>
                  <span className="material-symbols-outlined text-[18px]">
                    {openAccordions.courier ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {openAccordions.courier && (
                  <div className="text-[13px] text-[#544244] pb-2 leading-relaxed font-light">
                    Shipped in a plain, sturdy, unbranded secondary shipping box. The internal presentation is an ivory linen keepsake box with satin pull-ribbon. No mention of intimate apparel on the outside air waybill label.
                  </div>
                )}
              </div>

              {/* Item 3 */}
              <div className="border-b border-[#f0eded] pb-2">
                <button
                  onClick={() => toggleAccordion('exchange')}
                  className="w-full flex items-center justify-between py-2 text-left text-[11px] uppercase tracking-wider text-[#1c1b1b] font-semibold cursor-pointer"
                >
                  <span>15-Day Luxury Exchange Guarantee</span>
                  <span className="material-symbols-outlined text-[18px]">
                    {openAccordions.exchange ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {openAccordions.exchange && (
                  <div className="text-[13px] text-[#544244] pb-2 leading-relaxed font-light">
                    If the cup depth or underband does not fit with absolute perfection, our concierge will exchange for your calculated sister size free of charge, with complimentary doorstep pickup across 18,000+ PIN codes.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
