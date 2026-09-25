import React, { useState } from 'react';

interface FitGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveSize: (size: string) => void;
}

export const FitGuideModal: React.FC<FitGuideModalProps> = ({
  isOpen,
  onClose,
  onSaveSize
}) => {
  const [underbust, setUnderbust] = useState<number>(30);
  const [overbust, setOverbust] = useState<number>(34);

  if (!isOpen) return null;

  // Calculate bra size
  const calculateSize = () => {
    const roundedUnder = Math.round(underbust);
    let band = roundedUnder % 2 === 0 ? roundedUnder + 4 : roundedUnder + 5;
    if (roundedUnder >= 36) {
      band = roundedUnder % 2 === 0 ? roundedUnder + 2 : roundedUnder + 3;
    }
    const diff = Math.max(0, Math.round(overbust - underbust));
    const cups = ['AA', 'A', 'B', 'C', 'D', 'DD', 'E', 'F'];
    const cupIndex = Math.min(cups.length - 1, Math.max(1, diff));
    const calculatedCup = cups[cupIndex] || 'B';
    const primarySize = `${band}${calculatedCup}`;

    // Sister sizes
    const snugSisterBand = band - 2;
    const snugSisterCup = cups[Math.min(cups.length - 1, cupIndex + 1)] || calculatedCup;
    const snugSister = `${snugSisterBand}${snugSisterCup}`;

    const comfortSisterBand = band + 2;
    const comfortSisterCup = cups[Math.max(0, cupIndex - 1)] || calculatedCup;
    const comfortSister = `${comfortSisterBand}${comfortSisterCup}`;

    // French sizing: +15cm / standard
    const frBand = band + 15;
    const euBand = band - 5;

    return {
      primarySize,
      snugSister,
      comfortSister,
      band,
      cup: calculatedCup,
      frSize: `${frBand}${calculatedCup}`,
      euSize: `${euBand}${calculatedCup}`
    };
  };

  const result = calculateSize();

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto pointer-events-auto">
      <div className="bg-[#fcf9f8] max-w-xl w-full p-4 sm:p-6 md:p-8 shadow-2xl border border-[#f0eded] text-left relative my-auto max-h-[92vh] flex flex-col rounded-xs">
        {/* Top Back and Navigation Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-[#f0eded] mb-4 shrink-0">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-bold text-[#4e051a] hover:text-[#6b1d2f] py-1 px-2.5 bg-white border border-[#dac0c2] rounded-xs cursor-pointer shadow-2xs transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back</span>
          </button>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#6c5b4c] font-bold">
            Cup &amp; Band Sizing Guide
          </span>
          <button
            onClick={onClose}
            className="text-[#544244] hover:text-[#4e051a] p-1 cursor-pointer rounded-full hover:bg-[#f0eded]"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto space-y-5 pr-1">
          <div>
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#6c5b4c] font-bold">
              Virtual Fit Concierge
            </span>
            <h3 className="font-serif text-[22px] sm:text-[26px] text-[#4e051a] font-medium mt-1">
              Precision Cup &amp; Band Algorithm
            </h3>
            <p className="text-[12px] sm:text-[13px] text-[#544244] mt-1">
              Calibrated to French Leavers Lace and zero-dig ergonomic underwire construction.
            </p>
          </div>

          {/* Input sliders */}
          <div className="space-y-5 bg-white p-4 sm:p-5 border border-[#f0eded] rounded-xs">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[11px] uppercase tracking-wider font-semibold text-[#1c1b1b]">
                  1. Snug Underbust (Inches)
                </label>
                <span className="font-serif font-bold text-[18px] text-[#4e051a]">
                  {underbust}"
                </span>
              </div>
              <input
                type="range"
                min={26}
                max={44}
                step={0.5}
                value={underbust}
                onChange={(e) => setUnderbust(parseFloat(e.target.value))}
                className="w-full accent-[#4e051a] cursor-pointer"
              />
              <p className="text-[10px] text-[#877274] mt-1">
                Measure directly beneath breasts, keeping tape parallel to floor and snug against ribs.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[11px] uppercase tracking-wider font-semibold text-[#1c1b1b]">
                  2. Fullest Overbust (Inches)
                </label>
                <span className="font-serif font-bold text-[18px] text-[#4e051a]">
                  {overbust}"
                </span>
              </div>
              <input
                type="range"
                min={28}
                max={52}
                step={0.5}
                value={overbust}
                onChange={(e) => setOverbust(parseFloat(e.target.value))}
                className="w-full accent-[#4e051a] cursor-pointer"
              />
              <p className="text-[10px] text-[#877274] mt-1">
                Measure around fullest part of bust while wearing an unpadded soft bra.
              </p>
            </div>
          </div>

          {/* Result Showcase */}
          <div className="p-4 sm:p-5 bg-[#f0eded] border border-[#dac0c2] rounded-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#dac0c2]">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#6c5b4c] font-bold">
                  Your Atelier Primary Size
                </span>
                <p className="font-serif text-[34px] sm:text-[38px] text-[#4e051a] font-bold leading-none mt-1">
                  {result.primarySize}
                </p>
                <p className="text-[11px] text-[#544244] mt-1">
                  Ideal balance of architectural support and rib cage comfort
                </p>
              </div>

              <div className="text-left sm:text-right space-y-1">
                <p className="text-[11px] text-[#544244]">
                  Snug Sister Size: <strong className="text-[#4e051a]">{result.snugSister}</strong>
                </p>
                <p className="text-[11px] text-[#544244]">
                  Comfort Sister Size: <strong className="text-[#4e051a]">{result.comfortSister}</strong>
                </p>
              </div>
            </div>

            {/* International equivalents */}
            <div className="grid grid-cols-4 gap-2 pt-3 text-center text-[11px]">
              <div className="bg-white/80 p-2 rounded-xs">
                <span className="text-[9px] uppercase text-[#877274] block">UK / IN</span>
                <span className="font-bold text-[#4e051a]">{result.primarySize}</span>
              </div>
              <div className="bg-white/80 p-2 rounded-xs">
                <span className="text-[9px] uppercase text-[#877274] block">FR / ES</span>
                <span className="font-bold text-[#4e051a]">{result.frSize}</span>
              </div>
              <div className="bg-white/80 p-2 rounded-xs">
                <span className="text-[9px] uppercase text-[#877274] block">EU</span>
                <span className="font-bold text-[#4e051a]">{result.euSize}</span>
              </div>
              <div className="bg-white/80 p-2 rounded-xs">
                <span className="text-[9px] uppercase text-[#877274] block">US</span>
                <span className="font-bold text-[#4e051a]">{result.primarySize}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Back & Save */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-3 mt-3 border-t border-[#f0eded] shrink-0">
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-[11px] uppercase tracking-wider text-[#544244] hover:text-[#1c1b1b] font-semibold bg-white border border-[#dac0c2] rounded-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Back</span>
          </button>
          <button
            onClick={() => {
              onSaveSize(result.primarySize);
              onClose();
            }}
            className="bg-[#4e051a] hover:bg-[#6b1d2f] text-white px-5 py-2.5 text-[10px] uppercase tracking-[0.14em] font-semibold transition-all shadow-sm cursor-pointer rounded-xs text-center"
          >
            Save {result.primarySize} To My Salon Profile
          </button>
        </div>
      </div>
    </div>
  );
};
