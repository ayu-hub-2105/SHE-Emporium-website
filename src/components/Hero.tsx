import React, { useState, useEffect, useRef } from 'react';
import imgHeroBra from '../assets/images/clovia_bra_banner_1790336287877.jpg';
import imgHeroLounge from '../assets/images/clovia_lounge_banner_1790336302362.jpg';
import imgHeroBridal from '../assets/images/clovia_bridal_banner_1790336312147.jpg';
import imgHeroSets from '../assets/images/clovia_matching_sets_hero_1790337329203.jpg';

interface HeroProps {
  onShopCollection: () => void;
  onExploreProduct: () => void;
  onOpenFitConcierge: () => void;
  onOpenBridalBuilder?: () => void;
}

interface HeroSlide {
  id: number;
  image: string;
  titlePrefix: string;
  titleHighlight: string;
  subtitle: string;
  cta1Text: string;
  cta1Action: 'shop' | 'bridal';
  cta2Text: string;
  statsLabel: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    image: imgHeroBra,
    titlePrefix: 'Everyday Comfort,',
    titleHighlight: 'Effortless Confidence.',
    subtitle: 'Ultra-breathable cotton & seamless T-shirt bras engineered for Indian weather and all-day ease. Zero pinch, wire-free support, and buttery-soft feel.',
    cta1Text: 'Shop Everyday Bras',
    cta1Action: 'shop',
    cta2Text: 'Explore Cotton Bras',
    statsLabel: 'Bestseller • T-Shirt & Cotton Bras'
  },
  {
    id: 2,
    image: imgHeroLounge,
    titlePrefix: 'Luxe Sleepwear &',
    titleHighlight: 'Cozy Loungewear.',
    subtitle: 'Indulge in breathable satin camisole sets, playful printed pyjamas, and featherlight robes designed for cozy mornings and restful nights.',
    cta1Text: 'Shop Sleepwear Collection',
    cta1Action: 'shop',
    cta2Text: 'View Satin Slips',
    statsLabel: 'Pure Satin & Breathable Cotton'
  },
  {
    id: 3,
    image: imgHeroBridal,
    titlePrefix: 'Bridal & Festive',
    titleHighlight: 'Glamour Collection.',
    subtitle: 'From plunge bras for deep-neck blouses to backless solutions and rich lace bralettes. Perfect fits curated for your wedding and festive trousseau.',
    cta1Text: 'Build Bridal Box (15% Off)',
    cta1Action: 'bridal',
    cta2Text: 'Explore Bridal Sets',
    statsLabel: 'Festive & Bridal Solutions'
  },
  {
    id: 4,
    image: imgHeroSets,
    titlePrefix: 'Coordinated Lace,',
    titleHighlight: 'Matching Lingerie Sets.',
    subtitle: 'Flattering plunge bralettes and coordinating seamless lace briefs designed for effortless elegance. Premium stretch lace that hugs every curve with zero chafing.',
    cta1Text: 'Shop Matching Sets',
    cta1Action: 'shop',
    cta2Text: 'Explore Intimates',
    statsLabel: '2-Piece Coordinated Sets'
  }
];

// Prepend last slide and append first slide for seamless infinite sliding effect
const EXTENDED_SLIDES = [
  HERO_SLIDES[HERO_SLIDES.length - 1], // index 0 (clone of last slide)
  ...HERO_SLIDES,                      // index 1..4 (real slides)
  HERO_SLIDES[0],                      // index 5 (clone of first slide)
];

export const Hero: React.FC<HeroProps> = ({
  onShopCollection,
  onExploreProduct,
  onOpenFitConcierge,
  onOpenBridalBuilder,
}) => {
  // virtualIndex starts at 1, corresponding to HERO_SLIDES[0]
  const [virtualIndex, setVirtualIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const slideTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Touch gesture support for mobile & tablet swiping
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Active slide index for indicators and text
  const activeSlideIndex = (virtualIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
  const currentSlide = HERO_SLIDES[activeSlideIndex];

  const nextSlide = () => {
    setIsTransitioning(true);
    setVirtualIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setVirtualIndex((prev) => prev - 1);
  };

  const goToSlide = (index: number) => {
    setIsTransitioning(true);
    setVirtualIndex(index + 1);
  };

  // Infinite seamless loop transition handler
  const handleTransitionEnd = () => {
    if (virtualIndex >= EXTENDED_SLIDES.length - 1) {
      // Reached cloned first slide, instantly jump back to real first slide without animation
      setIsTransitioning(false);
      setVirtualIndex(1);
    } else if (virtualIndex <= 0) {
      // Reached cloned last slide, instantly jump back to real last slide without animation
      setIsTransitioning(false);
      setVirtualIndex(HERO_SLIDES.length);
    }
  };

  // Re-enable transition on the next frame after resetting virtualIndex
  useEffect(() => {
    if (!isTransitioning) {
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [isTransitioning]);

  // Auto-play timer: slides every 4.5 seconds
  useEffect(() => {
    if (isPaused) return;

    slideTimerRef.current = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => {
      if (slideTimerRef.current) {
        clearInterval(slideTimerRef.current);
      }
    };
  }, [virtualIndex, isPaused]);

  // Touch handlers for mobile and tablet swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      nextSlide(); // swiped left -> next
    } else if (distance < -minSwipeDistance) {
      prevSlide(); // swiped right -> previous
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className="relative w-full min-h-[82vh] sm:min-h-[85vh] flex items-center justify-start overflow-hidden bg-[#160f12] select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Image Carousel Track - Physically slides horizontally with noticeable out-and-in motion */}
      <div
        className={`absolute inset-0 flex h-full ${
          isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''
        } will-change-transform`}
        style={{
          transform: `translateX(-${virtualIndex * 100}%)`,
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {EXTENDED_SLIDES.map((slide, index) => (
          <div
            key={`${slide.id}-${index}`}
            className="relative w-full h-full shrink-0 overflow-hidden"
          >
            <img
              src={slide.image}
              alt={`${slide.titlePrefix} ${slide.titleHighlight}`}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center transform-gpu scale-100"
              loading={index === 1 ? 'eager' : 'lazy'}
            />
            {/* Crisp atmospheric contrast gradient that keeps the photo super sharp while keeping text readable */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent sm:via-black/25" />
          </div>
        ))}
      </div>

      {/* Atmospheric bottom vignette for flawless seamless transition into the page */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#160f12] via-transparent to-black/20 pointer-events-none z-1" />

      {/* Content Container */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-16 py-12 sm:py-16 flex flex-col items-start justify-center text-left">
        {/* Hero Title with Key Animation */}
        <h1
          key={`title-${currentSlide.id}`}
          className="font-display-lg text-white max-w-2xl font-light tracking-tight leading-[1.08] mb-4 text-[32px] sm:text-[44px] md:text-[54px] animate-in fade-in slide-in-from-right-4 duration-500"
        >
          {currentSlide.titlePrefix} <br />
          <span className="italic font-normal text-[#ffd9dd]">
            {currentSlide.titleHighlight}
          </span>
        </h1>

        {/* Hero Narrative */}
        <p
          key={`desc-${currentSlide.id}`}
          className="font-body-lg text-[#f0eded] max-w-xl mb-7 leading-relaxed font-light text-[13.5px] sm:text-[15px] animate-in fade-in slide-in-from-right-3 duration-500"
        >
          {currentSlide.subtitle}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
          <button
            onClick={() => {
              if (currentSlide.cta1Action === 'bridal' && onOpenBridalBuilder) {
                onOpenBridalBuilder();
              } else {
                onShopCollection();
              }
            }}
            className="bg-[#6b1d2f] hover:bg-[#4e051a] text-white px-6 sm:px-8 py-3.5 sm:py-4 text-[11px] uppercase tracking-[0.16em] font-semibold transition-all duration-300 shadow-xl shadow-[#4e051a]/30 hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer rounded-xs"
          >
            <span>{currentSlide.cta1Text}</span>
            <span className="material-symbols-outlined text-[17px]">arrow_forward</span>
          </button>

          <button
            onClick={onExploreProduct}
            className="bg-white/15 backdrop-blur-md hover:bg-white/25 text-white px-6 sm:px-8 py-3.5 sm:py-4 text-[11px] uppercase tracking-[0.16em] font-semibold transition-all duration-300 cursor-pointer rounded-xs border border-white/20"
          >
            {currentSlide.cta2Text}
          </button>

          <button
            onClick={onOpenFitConcierge}
            className="flex items-center gap-1.5 text-white hover:text-[#ffd9dd] text-[11px] uppercase tracking-[0.14em] font-semibold py-3 px-2 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-[#ffd9dd]">straighten</span>
            <span>Virtual Fit Concierge</span>
          </button>
        </div>

        {/* Subtle trust stats ticker */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-4 border-t border-white/20 max-w-2xl text-white w-full">
          <div>
            <p className="font-serif text-[18px] sm:text-[20px] font-semibold text-[#ffd9dd]">100%</p>
            <p className="text-[9.5px] uppercase tracking-wider text-[#e5e2e1]">Discreet Packaging</p>
          </div>
          <div>
            <p className="font-serif text-[18px] sm:text-[20px] font-semibold text-[#ffd9dd]">Same Day</p>
            <p className="text-[9.5px] uppercase tracking-wider text-[#e5e2e1]">Ahmedabad Delivery</p>
          </div>
          <div>
            <p className="font-serif text-[18px] sm:text-[20px] font-semibold text-[#ffd9dd]">24k+</p>
            <p className="text-[9.5px] uppercase tracking-wider text-[#e5e2e1]">Curated Women in India</p>
          </div>
          <div>
            <p className="font-serif text-[18px] sm:text-[20px] font-semibold text-[#ffd9dd]">OEKO-TEX®</p>
            <p className="text-[9.5px] uppercase tracking-wider text-[#e5e2e1]">Certified Gentle Dyes</p>
          </div>
        </div>
      </div>

      {/* Manual Slide Navigation Arrows (< and >) */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/75 text-white/90 hover:text-white backdrop-blur-md flex items-center justify-center transition-all duration-300 cursor-pointer border border-white/20 hover:scale-105 shadow-xl"
      >
        <span className="material-symbols-outlined text-[22px] sm:text-[26px]">chevron_left</span>
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/75 text-white/90 hover:text-white backdrop-blur-md flex items-center justify-center transition-all duration-300 cursor-pointer border border-white/20 hover:scale-105 shadow-xl"
      >
        <span className="material-symbols-outlined text-[22px] sm:text-[26px]">chevron_right</span>
      </button>

      {/* Carousel Pagination Dots / Progress Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/35 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === activeSlideIndex;
          return (
            <button
              key={slide.id}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'w-7 sm:w-9 bg-[#ffd9dd] shadow-[0_0_8px_rgba(255,217,221,0.8)]'
                  : 'w-2 sm:w-2.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          );
        })}
        <span className="text-[10px] text-[#ffd9dd] font-mono ml-2 inline tracking-wider">
          0{activeSlideIndex + 1} / 0{HERO_SLIDES.length}
        </span>
      </div>
    </div>
  );
};
