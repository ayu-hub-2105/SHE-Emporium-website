import React, { useState } from 'react';
import { CategoryType } from '../types';
import { REAL_STORE_DATA } from '../data/storeData';

interface FooterProps {
  onSelectCategory: (cat: CategoryType) => void;
  onOpenFitGuide: () => void;
  onOpenStoreModal?: () => void;
  onNavigate: (view: 'store' | 'category' | 'pdp' | 'checkout' | 'account' | 'admin', category?: CategoryType) => void;
  onShowToast: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenFitGuide,
  onOpenStoreModal,
  onNavigate,
  onShowToast
}) => {
  const [email, setEmail] = useState('');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onShowToast("Welcome to She Emporium! Exclusive updates sent to " + email);
    setEmail('');
  };

  return (
    <footer className="w-full bg-[#1c1b1b] text-white pt-16 pb-8 text-left border-t border-[#313030]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 lg:px-16">
        {/* Upper 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-[#313030]">
          {/* Brand & Ahmedabad Store Col */}
          <div className="lg:col-span-2 space-y-4 pr-0 lg:pr-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#4e051a] text-[#fcf9f8] flex items-center justify-center border border-[#dac0c2]/30">
                <span className="font-serif font-bold text-[16px] text-[#e8d7c8]">SE</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-[18px] tracking-[0.14em] text-white font-bold leading-none">
                  SHE EMPORIUM
                </span>
                <span className="text-[8.5px] tracking-[0.3em] text-[#dac0c2] uppercase font-semibold mt-0.5">
                  LUXURY INTIMATES • AHMEDABAD
                </span>
              </div>
            </div>

            <p className="text-[12.5px] text-[#dac0c2] leading-relaxed font-light">
              Ahmedabad&apos;s premier destination for genuine branded lingerie, French lace bras, silk sleepwear, and saree shapewear.
            </p>

            {/* Real Store Details Card */}
            <div className="bg-[#242222] p-4 rounded-sm border border-[#3a3838] space-y-2 text-[12px]">
              <div className="flex items-center justify-between">
                <span className="text-amber-400 font-bold flex items-center gap-1 text-[13px]">
                  <span>★</span>
                  <span>4.7 Rating (15 Google Reviews)</span>
                </span>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded uppercase font-bold">
                  Open 9:30 AM - 9:30 PM
                </span>
              </div>

              <div className="text-[#dac0c2] space-y-1 pt-1">
                <p className="flex items-start gap-1.5">
                  <span className="material-symbols-outlined text-[15px] text-amber-400 shrink-0 mt-0.5">location_on</span>
                  <span>{REAL_STORE_DATA.address}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[15px] text-amber-400 shrink-0">call</span>
                  <a href={`tel:${REAL_STORE_DATA.phone}`} className="hover:underline text-white font-medium">
                    {REAL_STORE_DATA.displayPhone} (Sanjay Bhai)
                  </a>
                </p>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <a
                  href={REAL_STORE_DATA.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold text-amber-300 hover:underline inline-flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[13px]">map</span>
                  Directions
                </a>
                <span className="text-white/30">•</span>
                <a
                  href={`https://wa.me/${REAL_STORE_DATA.whatsapp}?text=Hello%20Sanjay%20Bhai,%20I%20have%20an%20inquiry%20about%20She%20Emporium`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold text-emerald-400 hover:underline inline-flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[13px]">chat</span>
                  WhatsApp Us
                </a>
                {onOpenStoreModal && (
                  <>
                    <span className="text-white/30">•</span>
                    <button
                      onClick={onOpenStoreModal}
                      className="text-[11px] font-bold text-[#e8d7c8] hover:underline cursor-pointer"
                    >
                      Store Timings
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Shop Curations */}
          <div className="space-y-3">
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#dac0c2] font-semibold">
              Shop Curations
            </h4>
            <ul className="space-y-2 text-[12px] text-[#f6f3f2]/80">
              <li>
                <button
                  onClick={() => onSelectCategory('Bras')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Bras &amp; Bralettes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Panties')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Panties &amp; Briefs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Camisoles & Slips')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Camisoles &amp; Inner Slips
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Lingerie Sets')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Matching Lingerie Sets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Sleepwear')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Silk Sleep Chemises &amp; Slips
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Shapewear')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Saree Shapers &amp; Waist Cinchers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Bridal')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Bridal Trousseau &amp; Corsets
                </button>
              </li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div className="space-y-3">
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#dac0c2] font-semibold">
              Client Concierge
            </h4>
            <ul className="space-y-2 text-[12px] text-[#f6f3f2]/80">
              <li>
                <button
                  onClick={onOpenFitGuide}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Virtual Fit Calculator
                </button>
              </li>
              {onOpenStoreModal && (
                <li>
                  <button
                    onClick={onOpenStoreModal}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Lal Darwaja Store Hours
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={() => onNavigate('account')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Discreet Order Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={() => onShowToast("100% Genuine Branded Lingerie guarantee backed by She Emporium.")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Authenticity Guarantee
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin')}
                  className="hover:text-white transition-colors cursor-pointer text-[#e8d7c8] font-medium"
                >
                  Admin Portal (Add Products)
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter / Exclusive Club */}
          <div className="space-y-3">
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#dac0c2] font-semibold">
              She Emporium Club
            </h4>
            <p className="text-[12px] text-[#dac0c2] leading-relaxed font-light">
              Receive special offers on premium lingerie brands and new seasonal collections.
            </p>
            <form onSubmit={handleNewsletter} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#313030] text-white p-2.5 text-[12px] placeholder:text-[#877274] border border-[#544244] focus:outline-none focus:border-[#dac0c2]"
              />
              <button
                type="submit"
                className="w-full bg-[#4e051a] hover:bg-[#6b1d2f] text-white py-2.5 text-[10px] uppercase tracking-[0.16em] font-semibold transition-colors cursor-pointer"
              >
                Join Private Club
              </button>
            </form>
          </div>
        </div>

        {/* Trust Badges Strip */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4 text-[11px] text-[#dac0c2] border-b border-[#313030]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#dac0c2] text-[18px]">verified_user</span>
            <span>100% Discreet Packaging (No Brand Label on Box)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#dac0c2] text-[18px]">verified</span>
            <span>All Authentic Genuine Brands</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#dac0c2] text-[18px]">store</span>
            <span>Physical Store at Lal Darwaja, Ahmedabad</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[10px] text-[#dac0c2]/60 gap-2">
          <p>© 2026 She Emporium. All Rights Reserved. Relief Rd, Lal Darwaja, Ahmedabad, Gujarat 380001.</p>
          <div className="flex gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Discreet Packaging Protocol</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
