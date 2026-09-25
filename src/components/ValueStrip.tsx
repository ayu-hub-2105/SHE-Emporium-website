import React from 'react';

export const ValueStrip: React.FC = () => {
  return (
    <div className="w-full bg-white py-4 shadow-sm border-b border-[#f0eded]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#4e051a] text-[24px]">verified</span>
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-wider font-semibold text-[#1c1b1b]">100% Imported</p>
            <p className="text-[11px] text-[#544244] font-light">Lyon Lace &amp; Milan Silk</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#4e051a] text-[24px]">spa</span>
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-wider font-semibold text-[#1c1b1b]">OEKO-TEX Certified</p>
            <p className="text-[11px] text-[#544244] font-light">Zero toxic nickel or dyes</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#4e051a] text-[24px]">architecture</span>
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-wider font-semibold text-[#1c1b1b]">Precision Ergonomics</p>
            <p className="text-[11px] text-[#544244] font-light">Engineered zero-dig straps</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#4e051a] text-[24px]">package_2</span>
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-wider font-semibold text-[#1c1b1b]">Discreet Eco-Luxury</p>
            <p className="text-[11px] text-[#544244] font-light">Unmarked rigid boxes</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#4e051a] text-[24px]">electric_bolt</span>
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-wider font-semibold text-[#1c1b1b]">48h Express Air</p>
            <p className="text-[11px] text-[#544244] font-light">Complimentary over ₹499</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#4e051a] text-[24px]">sync_alt</span>
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-wider font-semibold text-[#1c1b1b]">15-Day Exchange</p>
            <p className="text-[11px] text-[#544244] font-light">Sister-size concierge service</p>
          </div>
        </div>
      </div>
    </div>
  );
};
