import React from 'react';
import imgHeroLace from '../assets/images/indian_lace_hero_1790336160254.jpg';

interface AtelierStoryProps {
  onScheduleFitting: () => void;
}

export const AtelierStory: React.FC<AtelierStoryProps> = ({ onScheduleFitting }) => {
  return (
    <div className="w-full bg-[#e5e2e1] py-16 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
        {/* Story Text */}
        <div className="lg:col-span-6 flex flex-col pr-0 lg:pr-8">
          <span className="text-[10px] uppercase tracking-[0.24em] text-[#6c5b4c] font-semibold">
            Atelier Craft &amp; Provenance
          </span>
          <h2 className="font-display-md text-[#4e051a] mt-2 mb-4 font-serif">
            Engineered for Confidence. Worn like Second Skin.
          </h2>
          <p className="text-[18px] text-[#544244] leading-relaxed mb-6 font-light">
            Founded with a singular conviction: luxury intimate apparel must elevate womanhood without confinement. We source delicate Chantilly laces from century-old looms in Lyon, France, and seamlessly combine them with temperature-regulating Mulberry silks.
          </p>

          <div className="space-y-3 mb-8 text-[13px] text-[#1c1b1b]">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#4e051a] text-[20px] shrink-0 mt-0.5">
                check_circle
              </span>
              <p>
                <strong>Sensory Underwiring:</strong> Flexible titanium-coated titanium arches that flex with your breathing rhythm instead of pressing against ribs.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#4e051a] text-[20px] shrink-0 mt-0.5">
                check_circle
              </span>
              <p>
                <strong>Hypoallergenic Dyes:</strong> Certified skin-gentle pH balances formulated especially for tropical Indian climates.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#4e051a] text-[20px] shrink-0 mt-0.5">
                check_circle
              </span>
              <p>
                <strong>Strict Privacy Protocol:</strong> Every parcel departs in double-walled, fragrance-sealed matte obsidian rigid boxes with no branded exterior label.
              </p>
            </div>
          </div>

          <div>
            <button
              onClick={onScheduleFitting}
              className="bg-[#4e051a] text-white px-8 py-3.5 text-[11px] uppercase tracking-[0.14em] font-semibold hover:bg-[#6b1d2f] transition-all cursor-pointer"
            >
              Schedule Atelier Fitting
            </button>
          </div>
        </div>

        {/* Story Visual & Floating Quote */}
        <div className="lg:col-span-6 relative mt-8 lg:mt-0">
          <div className="relative w-full aspect-[4/5] bg-[#f0eded] overflow-hidden shadow-2xl">
            <img
              src={imgHeroLace}
              alt="SHE French Atelier Craftsmanship"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Floating badge detail */}
          <div className="absolute -bottom-6 -left-6 bg-[#fcf9f8] p-5 shadow-xl max-w-xs border border-[#f0eded]">
            <p className="font-serif text-[18px] text-[#4e051a] italic">
              "Sensuality is an intimate conversation with oneself."
            </p>
            <p className="text-[10px] text-[#6c5b4c] uppercase tracking-widest mt-2 font-semibold">
              — SHE Atelier Director
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
