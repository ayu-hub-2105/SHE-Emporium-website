import React, { useState, useEffect } from 'react';
import { REAL_STORE_DATA, StoreReview } from '../data/storeData';

interface AhmedabadStoreSectionProps {
  onOpenStoreModal: () => void;
  onOpenFitGuide: () => void;
  onOpenWriteReview?: () => void;
  customReviews?: StoreReview[];
}

export const AhmedabadStoreSection: React.FC<AhmedabadStoreSectionProps> = ({
  onOpenStoreModal,
  onOpenFitGuide,
  onOpenWriteReview,
  customReviews = []
}) => {
  const reviews = [...customReviews, ...REAL_STORE_DATA.reviews];
  const totalReviewsCount = reviews.length;

  // Active index for rotating / flipping carousel
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  // Modal to see all reviews
  const [isAllReviewsModalOpen, setIsAllReviewsModalOpen] = useState(false);
  const [modalFilter, setModalFilter] = useState<'all' | 'with-owner-reply' | 'top-rated'>('all');
  const [modalSearch, setModalSearch] = useState('');

  // Dedicated Full Review Reader Modal
  const [selectedReviewForDetail, setSelectedReviewForDetail] = useState<StoreReview | null>(null);

  // Auto-rotate / flip every 4.5 seconds when not paused and no modals open
  useEffect(() => {
    if (isPaused || isAllReviewsModalOpen || selectedReviewForDetail) return;

    const timer = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused, isAllReviewsModalOpen, selectedReviewForDetail]);

  const handleNext = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % totalReviewsCount);
      setIsFlipping(false);
    }, 250);
  };

  const handlePrev = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + totalReviewsCount) % totalReviewsCount);
      setIsFlipping(false);
    }, 250);
  };

  // Reader modal navigation handlers
  const handleDetailNext = () => {
    if (!selectedReviewForDetail) return;
    const curIdx = reviews.findIndex((r) => r.id === selectedReviewForDetail.id);
    const nextIdx = (curIdx + 1) % totalReviewsCount;
    setSelectedReviewForDetail(reviews[nextIdx]);
  };

  const handleDetailPrev = () => {
    if (!selectedReviewForDetail) return;
    const curIdx = reviews.findIndex((r) => r.id === selectedReviewForDetail.id);
    const prevIdx = (curIdx - 1 + totalReviewsCount) % totalReviewsCount;
    setSelectedReviewForDetail(reviews[prevIdx]);
  };

  // Keyboard navigation for reader modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedReviewForDetail(null);
      } else if (selectedReviewForDetail && e.key === 'ArrowRight') {
        handleDetailNext();
      } else if (selectedReviewForDetail && e.key === 'ArrowLeft') {
        handleDetailPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedReviewForDetail]);

  // Visible reviews on Desktop (3 items)
  const desktopVisibleReviews: StoreReview[] = [
    reviews[currentIndex % totalReviewsCount],
    reviews[(currentIndex + 1) % totalReviewsCount],
    reviews[(currentIndex + 2) % totalReviewsCount]
  ];

  // Visible review on Phone (1 item)
  const mobileVisibleReview: StoreReview = reviews[currentIndex % totalReviewsCount];

  // Filtered reviews for the "See All Reviews" Modal
  const modalFilteredReviews = reviews.filter((rev) => {
    if (modalFilter === 'with-owner-reply' && !rev.ownerReply) return false;
    if (modalFilter === 'top-rated' && rev.rating !== 5) return false;
    if (modalSearch.trim()) {
      const q = modalSearch.toLowerCase();
      return (
        rev.author.toLowerCase().includes(q) ||
        rev.content.toLowerCase().includes(q) ||
        (rev.ownerReply && rev.ownerReply.content.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <section className="w-full bg-[#fcf9f8] py-12 sm:py-16 border-t border-b border-[#eae7e7] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 text-left">
        {/* Header Block with Google Reviews Badge */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#4e051a]/10 text-[#4e051a] px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase mb-3">
              <span className="material-symbols-outlined text-[16px]">store</span>
              Flagship Lingerie Store in Ahmedabad
            </div>
            <h2 className="font-serif text-[26px] sm:text-[32px] md:text-[38px] text-[#4e051a] font-medium leading-tight">
              She Emporium, Lal Darwaja
            </h2>
            <p className="text-[13.5px] sm:text-[14.5px] text-[#544244] max-w-2xl font-light mt-1.5 leading-relaxed">
              Old City&apos;s trusted family boutique for 100% genuine branded lingerie, bras, bridal trousseau sets, and bespoke fit consultations by Sanjay Bhai.
            </p>
          </div>

          {/* Google Verified Rating Card */}
          <div className="bg-white p-4 sm:p-5 rounded-lg border border-[#eae7e7] shadow-xs flex items-center gap-4 shrink-0">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#fcf9f8] flex items-center justify-center border border-[#eae7e7] shrink-0">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[20px] sm:text-[22px] text-[#1c1b1b]">{REAL_STORE_DATA.rating}</span>
                <div className="flex text-amber-500 text-[16px] sm:text-[17px]">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
              </div>
              <p className="text-[11.5px] text-[#6c5b4c] font-medium">
                {REAL_STORE_DATA.totalReviews} Verified Google Reviews
              </p>
            </div>
          </div>
        </div>

        {/* Store Highlights & Quick Actions Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {/* Address Card */}
          <div className="bg-white p-4 sm:p-5 rounded-sm border border-[#eae7e7] shadow-xs">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#4e051a] text-[22px] mt-0.5">location_on</span>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#6c5b4c] font-bold">Store Address</p>
                <p className="text-[12.5px] sm:text-[13px] text-[#1c1b1b] font-medium mt-1 leading-snug">
                  Relief Rd, opp. HDFC BANK, Old City, Lal Darwaja, Ahmedabad, Gujarat 380001
                </p>
                <div className="mt-2.5">
                  <a
                    href={REAL_STORE_DATA.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-[#4e051a] hover:underline"
                  >
                    <span className="material-symbols-outlined text-[15px]">map</span>
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Working Hours Card */}
          <div className="bg-white p-4 sm:p-5 rounded-sm border border-[#eae7e7] shadow-xs">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#4e051a] text-[22px] mt-0.5">schedule</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-wider text-[#6c5b4c] font-bold">Store Hours</p>
                  <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.2 rounded font-bold uppercase">
                    Open Today
                  </span>
                </div>
                <p className="text-[12.5px] sm:text-[13px] text-[#1c1b1b] font-medium mt-1">
                  Mon – Sat: 9:30 am – 9:30 pm
                </p>
                <p className="text-[11.5px] text-[#544244]">
                  Sunday: 10:30 am – 7:30 pm
                </p>
                <button
                  onClick={onOpenStoreModal}
                  className="mt-1.5 text-[11.5px] font-semibold text-[#4e051a] hover:underline block cursor-pointer"
                >
                  View full week schedule
                </button>
              </div>
            </div>
          </div>

          {/* Direct Contact Card with Sanjay Bhai */}
          <div className="bg-white p-4 sm:p-5 rounded-sm border border-[#eae7e7] shadow-xs">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#4e051a] text-[22px] mt-0.5">call</span>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#6c5b4c] font-bold">Call / WhatsApp</p>
                <p className="text-[14px] sm:text-[15px] font-serif font-bold text-[#4e051a] mt-0.5">
                  +91 {REAL_STORE_DATA.phone}
                </p>
                <p className="text-[11px] text-[#544244]">Contact: Sanjay Bhai / She Emporium Team</p>
                <div className="mt-2.5 flex items-center gap-2">
                  <a
                    href={`tel:${REAL_STORE_DATA.phone}`}
                    className="bg-[#4e051a] text-white px-3 py-1.5 rounded-xs text-[10.5px] font-bold tracking-wider uppercase inline-flex items-center gap-1 hover:bg-[#6b1d2f]"
                  >
                    <span className="material-symbols-outlined text-[13px]">call</span>
                    Call Now
                  </a>
                  <a
                    href={`https://wa.me/${REAL_STORE_DATA.whatsapp}?text=Hello%20Sanjay%20Bhai,%20I%20am%20interested%20in%20lingerie%20at%20She%20Emporium`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] text-white px-3 py-1.5 rounded-xs text-[10.5px] font-bold tracking-wider uppercase inline-flex items-center gap-1 hover:opacity-90"
                  >
                    <span className="material-symbols-outlined text-[13px]">chat</span>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rotating Client Reviews Header Strip */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#eae7e7]">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-[20px] sm:text-[23px] text-[#4e051a] font-semibold">
                Customer Testimonials
              </h3>
              <span className="bg-[#4e051a]/10 text-[#4e051a] px-2 py-0.5 rounded-full text-[10px] font-bold">
                Auto-Rotating
              </span>
            </div>
            <p className="text-[12px] sm:text-[13px] text-[#544244] mt-0.5">
              Verified Google feedback • Showing recent customer experiences
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Prev / Next Carousel Controls */}
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-sm border border-[#eae7e7] shadow-2xs">
              <button
                onClick={handlePrev}
                aria-label="Previous Review"
                className="w-7 h-7 flex items-center justify-center rounded-xs text-[#4e051a] hover:bg-[#4e051a]/10 transition-colors cursor-pointer"
                title="Previous Review"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <span className="text-[11px] font-mono text-[#6c5b4c] px-1 font-semibold">
                {currentIndex + 1}/{totalReviewsCount}
              </span>
              <button
                onClick={handleNext}
                aria-label="Next Review"
                className="w-7 h-7 flex items-center justify-center rounded-xs text-[#4e051a] hover:bg-[#4e051a]/10 transition-colors cursor-pointer"
                title="Next Review"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>

            {/* "Write a Review" Button */}
            {onOpenWriteReview && (
              <button
                onClick={onOpenWriteReview}
                className="bg-white hover:bg-[#fcf9f8] text-[#4e051a] border border-[#4e051a] px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xs text-[11px] sm:text-[11.5px] uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">rate_review</span>
                <span>Write Review</span>
              </button>
            )}

            {/* "See All Reviews" Button */}
            <button
              onClick={() => setIsAllReviewsModalOpen(true)}
              className="bg-[#4e051a] hover:bg-[#6b1d2f] text-white px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xs text-[11px] sm:text-[11.5px] uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <span>See All Reviews ({totalReviewsCount})</span>
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </button>
          </div>
        </div>

        {/* ROTATING REVIEWS CAROUSEL (Compact, non-stretching layout) */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Desktop View: Exactly 3 Reviews visible at once with flip/fade transition */}
          <div
            className={`hidden md:grid md:grid-cols-3 gap-5 transition-all duration-300 ${
              isFlipping ? 'opacity-40 scale-[0.98]' : 'opacity-100 scale-100'
            }`}
          >
            {desktopVisibleReviews.map((rev, idx) => (
              <div
                key={`${rev.id}-${idx}`}
                onClick={() => setSelectedReviewForDetail(rev)}
                className="bg-white p-5 sm:p-6 rounded-sm border border-[#eae7e7] shadow-xs flex flex-col justify-between hover:border-[#4e051a] hover:shadow-md transition-all duration-200 min-h-[255px] group border-t-2 border-t-[#4e051a] cursor-pointer"
                title="Click to read full review"
              >
                <div>
                  {/* Author Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-[#4e051a]/10 text-[#4e051a] flex items-center justify-center font-bold text-[13px] shrink-0">
                        {rev.avatarText}
                      </div>
                      <div>
                        <h4 className="text-[13.5px] font-bold text-[#1c1b1b] leading-tight group-hover:text-[#4e051a] transition-colors">
                          {rev.author}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[10.5px] text-[#6c5b4c]">
                          <span>{rev.reviewsCountText || 'Verified Reviewer'}</span>
                          {rev.userType === 'Local Guide' && (
                            <span className="bg-amber-100 text-amber-800 px-1 py-0.2 rounded text-[9px] font-semibold">
                              Guide
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10.5px] text-[#6c5b4c] font-medium">{rev.timeAgo}</span>
                  </div>

                  {/* Stars & Platform */}
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex text-amber-500 text-[14px]">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <span className="text-[10px] text-[#6c5b4c] bg-[#f6f3f2] px-1.5 py-0.5 rounded font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px] text-amber-500">verified</span>
                      Google
                    </span>
                  </div>

                  {/* Review Quote */}
                  <p className="text-[12.5px] text-[#2b2728] leading-relaxed italic line-clamp-3">
                    &ldquo;{rev.content}&rdquo;
                  </p>
                </div>

                <div className="mt-3">
                  {/* Owner Reply Snippet if available */}
                  {rev.ownerReply && (
                    <div className="mb-2.5 pt-2 border-t border-[#f0eded] bg-[#fcf9f8] p-2 rounded-xs text-[11px]">
                      <div className="flex items-center gap-1 text-[#4e051a] font-bold mb-0.5">
                        <span className="material-symbols-outlined text-[13px]">reply</span>
                        <span>Sanjay Bhai (Owner)</span>
                      </div>
                      <p className="text-[#544244] line-clamp-1 leading-snug font-light">
                        {rev.ownerReply.content}
                      </p>
                    </div>
                  )}

                  {/* Click to Read Full Review Button */}
                  <div className="pt-2 border-t border-[#f0eded] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedReviewForDetail(rev);
                      }}
                      className="text-[11.5px] font-bold text-[#4e051a] group-hover:text-[#6b1d2f] inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read Full Review</span>
                      <span className="material-symbols-outlined text-[14px] transition-transform group-hover:translate-x-1">
                        arrow_forward
                      </span>
                    </button>
                    <span className="text-[10px] text-[#877274] uppercase tracking-wider font-semibold">
                      Full Details
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile View: Exactly 1 Review visible with clean flip/slide animation */}
          <div
            className={`block md:hidden transition-all duration-300 ${
              isFlipping ? 'opacity-40 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            <div
              onClick={() => setSelectedReviewForDetail(mobileVisibleReview)}
              className="bg-white p-5 rounded-sm border border-[#eae7e7] shadow-xs flex flex-col justify-between border-t-2 border-t-[#4e051a] cursor-pointer active:bg-[#fcf9f8]"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#4e051a]/10 text-[#4e051a] flex items-center justify-center font-bold text-[13px]">
                      {mobileVisibleReview.avatarText}
                    </div>
                    <div>
                      <h4 className="text-[13.5px] font-bold text-[#1c1b1b] leading-tight">
                        {mobileVisibleReview.author}
                      </h4>
                      <div className="flex items-center gap-1.5 text-[10.5px] text-[#6c5b4c]">
                        <span>{mobileVisibleReview.reviewsCountText || 'Verified Reviewer'}</span>
                        {mobileVisibleReview.userType === 'Local Guide' && (
                          <span className="bg-amber-100 text-amber-800 px-1 py-0.2 rounded text-[9px] font-semibold">
                            Local Guide
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10.5px] text-[#6c5b4c]">{mobileVisibleReview.timeAgo}</span>
                </div>

                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex text-amber-500 text-[14px]">
                    {Array.from({ length: mobileVisibleReview.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <span className="text-[10px] text-[#6c5b4c] bg-[#f6f3f2] px-1.5 py-0.5 rounded font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px] text-amber-500">verified</span>
                    Google
                  </span>
                </div>

                <p className="text-[13px] text-[#2b2728] leading-relaxed italic line-clamp-3">
                  &ldquo;{mobileVisibleReview.content}&rdquo;
                </p>
              </div>

              <div className="mt-3">
                {mobileVisibleReview.ownerReply && (
                  <div className="mb-2.5 pt-2 border-t border-[#f0eded] bg-[#fcf9f8] p-2 rounded-xs text-[11px]">
                    <div className="flex items-center gap-1 text-[#4e051a] font-bold mb-0.5">
                      <span className="material-symbols-outlined text-[13px]">reply</span>
                      <span>Sanjay Bhai (Owner Reply)</span>
                    </div>
                    <p className="text-[#544244] line-clamp-1 leading-snug font-light">
                      {mobileVisibleReview.ownerReply.content}
                    </p>
                  </div>
                )}

                {/* Mobile Read Full Review Action */}
                <div className="pt-2 border-t border-[#f0eded] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedReviewForDetail(mobileVisibleReview);
                    }}
                    className="text-[12px] font-bold text-[#4e051a] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read Full Review</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                  <span className="text-[10px] text-[#877274] uppercase tracking-wider font-semibold">
                    Click to Open
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Dots Indicator for Rotating Progress */}
          <div className="flex items-center justify-center gap-1.5 mt-5">
            {reviews.slice(0, Math.min(10, totalReviewsCount)).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsFlipping(true);
                  setTimeout(() => {
                    setCurrentIndex(i);
                    setIsFlipping(false);
                  }, 200);
                }}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  currentIndex % 10 === i ? 'w-6 bg-[#4e051a]' : 'w-1.5 bg-[#dac0c2] hover:bg-[#877274]'
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Footer callout inside section */}
        <div className="mt-8 p-5 sm:p-6 bg-white border border-[#eae7e7] rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#4e051a] text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">verified</span>
            </div>
            <div>
              <h4 className="font-serif text-[15px] sm:text-[16px] text-[#4e051a] font-semibold">
                Looking for Bespoke Sizing &amp; Fitting in Ahmedabad?
              </h4>
              <p className="text-[12px] text-[#544244]">
                Visit our Lal Darwaja store or use our Virtual Fit Concierge to find your exact band and cup size.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenFitGuide}
              className="px-3.5 py-2 bg-white border border-[#4e051a] text-[#4e051a] hover:bg-[#4e051a]/5 text-[10.5px] uppercase tracking-wider font-bold rounded-xs cursor-pointer"
            >
              Fit Concierge
            </button>
            <button
              onClick={onOpenStoreModal}
              className="px-4 py-2 bg-[#4e051a] hover:bg-[#6b1d2f] text-white text-[10.5px] uppercase tracking-wider font-bold rounded-xs shadow-xs cursor-pointer"
            >
              Store Map &amp; Info
            </button>
          </div>
        </div>
      </div>

      {/* ALL REVIEWS POPUP MODAL ("See All Reviews" Click) */}
      {isAllReviewsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-lg shadow-2xl flex flex-col overflow-hidden text-left border border-[#eae7e7]">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-[#eae7e7] flex items-center justify-between bg-[#fcf9f8]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-500 text-[22px]">star</span>
                  <h3 className="font-serif text-[20px] sm:text-[22px] text-[#4e051a] font-bold">
                    All Customer Reviews ({totalReviewsCount})
                  </h3>
                </div>
                <p className="text-[12px] text-[#6c5b4c]">
                  Authentic Google Reviews for She Emporium • Lal Darwaja, Ahmedabad
                </p>
              </div>
              <button
                onClick={() => setIsAllReviewsModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-[#544244] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="p-4 border-b border-[#eae7e7] flex flex-col sm:flex-row items-center justify-between gap-3 bg-white">
              {/* Filter Tabs */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setModalFilter('all')}
                  className={`px-3 py-1.5 rounded-xs text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    modalFilter === 'all'
                      ? 'bg-[#4e051a] text-white'
                      : 'bg-[#f6f3f2] text-[#544244] hover:bg-[#eae7e7]'
                  }`}
                >
                  All ({totalReviewsCount})
                </button>
                <button
                  onClick={() => setModalFilter('top-rated')}
                  className={`px-3 py-1.5 rounded-xs text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    modalFilter === 'top-rated'
                      ? 'bg-[#4e051a] text-white'
                      : 'bg-[#f6f3f2] text-[#544244] hover:bg-[#eae7e7]'
                  }`}
                >
                  5-Star Only
                </button>
                <button
                  onClick={() => setModalFilter('with-owner-reply')}
                  className={`px-3 py-1.5 rounded-xs text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    modalFilter === 'with-owner-reply'
                      ? 'bg-[#4e051a] text-white'
                      : 'bg-[#f6f3f2] text-[#544244] hover:bg-[#eae7e7]'
                  }`}
                >
                  Owner Replies
                </button>
              </div>

              {/* Search input */}
              <div className="relative w-full sm:w-64">
                <span className="material-symbols-outlined absolute left-2.5 top-2 text-[16px] text-[#6c5b4c]">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search reviews..."
                  value={modalSearch}
                  onChange={(e) => setModalSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-[#f6f3f2] border border-[#eae7e7] rounded-xs text-[12px] focus:outline-none focus:border-[#4e051a]"
                />
              </div>
            </div>

            {/* Reviews Scrollable List */}
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[60vh] space-y-4">
              {modalFilteredReviews.length === 0 ? (
                <div className="text-center py-10 text-[#6c5b4c]">
                  <p className="text-[14px]">No reviews found matching your filter.</p>
                </div>
              ) : (
                modalFilteredReviews.map((rev) => (
                  <div
                    key={rev.id}
                    onClick={() => setSelectedReviewForDetail(rev)}
                    className="p-4 rounded-sm border border-[#eae7e7] bg-white hover:border-[#4e051a] hover:shadow-xs transition-all cursor-pointer group"
                    title="Click to read full review"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#4e051a]/10 text-[#4e051a] flex items-center justify-center font-bold text-[12px] group-hover:bg-[#4e051a] group-hover:text-white transition-colors">
                          {rev.avatarText}
                        </div>
                        <div>
                          <h4 className="text-[13px] font-bold text-[#1c1b1b] leading-tight group-hover:text-[#4e051a] transition-colors">
                            {rev.author}
                          </h4>
                          <span className="text-[10.5px] text-[#6c5b4c]">
                            {rev.reviewsCountText || 'Verified Reviewer'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex text-amber-500 text-[13px]">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                        </div>
                        <span className="text-[10.5px] text-[#6c5b4c]">{rev.timeAgo}</span>
                      </div>
                    </div>

                    <p className="text-[12.5px] text-[#2b2728] leading-relaxed italic pl-10">
                      &ldquo;{rev.content}&rdquo;
                    </p>

                    {rev.ownerReply && (
                      <div className="mt-3 ml-10 p-2.5 rounded-xs bg-[#fcf9f8] border-l-2 border-[#4e051a] text-[11.5px]">
                        <div className="flex items-center gap-1 text-[#4e051a] font-bold mb-0.5">
                          <span className="material-symbols-outlined text-[13px]">reply</span>
                          <span>{rev.ownerReply.author}</span>
                          <span className="text-[10px] text-[#6c5b4c] font-normal">({rev.ownerReply.timeAgo})</span>
                        </div>
                        <p className="text-[#544244] font-light">{rev.ownerReply.content}</p>
                      </div>
                    )}

                    <div className="pl-10 mt-2.5 pt-2 border-t border-[#f0eded]/80 flex items-center justify-between text-[11px]">
                      <span className="text-[#4e051a] font-bold group-hover:underline inline-flex items-center gap-1">
                        <span>Click to view full review</span>
                        <span className="material-symbols-outlined text-[13px] transition-transform group-hover:translate-x-1">
                          arrow_forward
                        </span>
                      </span>
                      <span className="text-[10px] text-[#877274]">Google Verified</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#eae7e7] bg-[#fcf9f8] flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px]">
              <div className="flex items-center gap-2 text-[#6c5b4c]">
                <span className="material-symbols-outlined text-[16px] text-amber-500">verified</span>
                <span>Ratings verified on Google Maps for She Emporium Ahmedabad</span>
              </div>
              <a
                href={REAL_STORE_DATA.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#4e051a] hover:bg-[#6b1d2f] text-white px-4 py-2 rounded-xs text-[11px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5"
              >
                <span>Write a Review on Google</span>
                <span className="material-symbols-outlined text-[14px]">rate_review</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* INDIVIDUAL FULL REVIEW READER MODAL */}
      {selectedReviewForDetail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 text-left"
          onClick={() => setSelectedReviewForDetail(null)}
        >
          <div
            className="bg-white w-full max-w-xl rounded-lg shadow-2xl overflow-hidden border border-[#eae7e7] max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-[#eae7e7] flex items-center justify-between bg-[#fcf9f8]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white border border-[#eae7e7] flex items-center justify-center p-1.5 shadow-2xs">
                  <svg className="w-full h-full" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif text-[17px] sm:text-[18px] text-[#4e051a] font-bold leading-tight">
                    Google Customer Review
                  </h3>
                  <p className="text-[11px] text-[#6c5b4c]">
                    She Emporium • Lal Darwaja, Relief Road, Ahmedabad
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedReviewForDetail(null)}
                className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-[#544244] cursor-pointer transition-colors"
                aria-label="Close review"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
              {/* Reviewer Profile */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#4e051a] text-white flex items-center justify-center font-bold text-[16px] shadow-xs">
                    {selectedReviewForDetail.avatarText}
                  </div>
                  <div>
                    <h4 className="text-[15px] sm:text-[16px] font-bold text-[#1c1b1b]">
                      {selectedReviewForDetail.author}
                    </h4>
                    <div className="flex items-center gap-2 text-[11.5px] text-[#6c5b4c] mt-0.5">
                      <span>{selectedReviewForDetail.reviewsCountText || 'Verified Reviewer'}</span>
                      {selectedReviewForDetail.userType && (
                        <span className="bg-[#4e051a]/10 text-[#4e051a] font-bold px-1.5 py-0.2 rounded text-[10px]">
                          {selectedReviewForDetail.userType}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <span className="text-[11.5px] text-[#877274] shrink-0 font-medium">
                  {selectedReviewForDetail.timeAgo}
                </span>
              </div>

              {/* Star Rating & Verified Pill */}
              <div className="flex items-center justify-between py-2.5 px-3 bg-[#fcf9f8] rounded-sm border border-[#eae7e7]">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-500 text-[18px]">
                    {Array.from({ length: selectedReviewForDetail.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <span className="text-[13px] font-bold text-[#1c1b1b]">
                    {selectedReviewForDetail.rating}.0 / 5.0
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <span className="material-symbols-outlined text-[13px]">verified</span>
                  Verified Google Customer
                </span>
              </div>

              {/* Full Review Text (Zero Truncation) */}
              <div className="bg-[#fcf9f8] p-5 sm:p-6 rounded-md border border-[#eae7e7] shadow-2xs relative">
                <div className="text-[32px] leading-none text-[#4e051a]/20 font-serif mb-1 select-none">
                  &ldquo;
                </div>
                <p className="font-serif text-[15.5px] sm:text-[17px] text-[#1c1b1b] leading-relaxed font-normal whitespace-pre-wrap">
                  {selectedReviewForDetail.content}
                </p>
                <div className="text-[32px] leading-none text-[#4e051a]/20 font-serif text-right mt-1 select-none">
                  &rdquo;
                </div>
              </div>

              {/* Owner Response if present (Full text) */}
              {selectedReviewForDetail.ownerReply && (
                <div className="bg-amber-50/60 p-4 sm:p-5 rounded-md border-l-4 border-[#4e051a] border-t border-r border-b border-[#eae7e7] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#4e051a] text-white flex items-center justify-center shadow-xs">
                        <span className="material-symbols-outlined text-[14px]">store</span>
                      </div>
                      <div>
                        <p className="text-[12.5px] font-bold text-[#4e051a]">
                          {selectedReviewForDetail.ownerReply.author}
                        </p>
                        <p className="text-[10px] text-[#6c5b4c]">
                          Store Owner Response (Sanjay Bhai)
                        </p>
                      </div>
                    </div>
                    <span className="text-[10.5px] text-[#877274]">
                      {selectedReviewForDetail.ownerReply.timeAgo}
                    </span>
                  </div>
                  <p className="text-[13px] sm:text-[13.5px] text-[#3d3133] leading-relaxed font-light pl-9 whitespace-pre-wrap">
                    {selectedReviewForDetail.ownerReply.content}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer with Carousel Navigation */}
            <div className="p-3 sm:p-4 border-t border-[#eae7e7] bg-[#fcf9f8] flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleDetailPrev}
                  className="px-2.5 py-1.5 bg-white border border-[#eae7e7] hover:border-[#4e051a] text-[#4e051a] text-[11px] font-bold rounded-xs flex items-center gap-1 cursor-pointer transition-colors"
                  title="Previous Review"
                >
                  <span className="material-symbols-outlined text-[15px]">chevron_left</span>
                  <span className="hidden sm:inline">Previous</span>
                </button>
                <span className="text-[11px] font-mono text-[#6c5b4c] px-1">
                  {reviews.findIndex((r) => r.id === selectedReviewForDetail.id) + 1} of {totalReviewsCount}
                </span>
                <button
                  type="button"
                  onClick={handleDetailNext}
                  className="px-2.5 py-1.5 bg-white border border-[#eae7e7] hover:border-[#4e051a] text-[#4e051a] text-[11px] font-bold rounded-xs flex items-center gap-1 cursor-pointer transition-colors"
                  title="Next Review"
                >
                  <span className="hidden sm:inline">Next</span>
                  <span className="material-symbols-outlined text-[15px]">chevron_right</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={REAL_STORE_DATA.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-white border border-[#eae7e7] hover:border-[#4e051a] text-[#4e051a] text-[11px] font-bold uppercase tracking-wider rounded-xs flex items-center gap-1 transition-colors"
                >
                  <span>Google Maps</span>
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedReviewForDetail(null)}
                  className="px-4 py-1.5 bg-[#4e051a] hover:bg-[#6b1d2f] text-white text-[11px] font-bold uppercase tracking-wider rounded-xs cursor-pointer shadow-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
