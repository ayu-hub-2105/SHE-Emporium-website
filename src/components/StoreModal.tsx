import React from 'react';
import { REAL_STORE_DATA } from '../data/storeData';

interface StoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFitGuide?: () => void;
}

export const StoreModal: React.FC<StoreModalProps> = ({
  isOpen,
  onClose,
  onOpenFitGuide
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-lg shadow-2xl overflow-y-auto border border-[#eae7e7]">
        {/* Modal Header */}
        <div className="sticky top-0 bg-[#4e051a] text-white px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#fcf9f8]/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px] text-[#e8d7c8]">store</span>
            </div>
            <div>
              <h3 className="font-serif text-[18px] font-bold tracking-wide">
                She Emporium — Ahmedabad Salon
              </h3>
              <p className="text-[11px] text-[#e8d7c8] tracking-widest uppercase">
                4.7 ★ (15 Google Reviews) • Lal Darwaja
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 text-left">
          {/* Top summary badge */}
          <div className="bg-[#fcf9f8] p-4 rounded-sm border border-[#eae7e7] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex text-amber-500 text-[18px]">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span className="text-amber-500">★</span>
              </div>
              <div>
                <p className="text-[14px] font-bold text-[#1c1b1b]">
                  4.7 Google Rating (15 Reviews)
                </p>
                <p className="text-[12px] text-[#544244]">
                  Lingerie &amp; Hosiery store in Ahmedabad, Gujarat
                </p>
              </div>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-[11px] px-2.5 py-1 rounded font-bold uppercase tracking-wider">
              Open Today
            </span>
          </div>

          {/* Address & Navigation */}
          <div>
            <h4 className="text-[12px] uppercase tracking-wider font-bold text-[#6c5b4c] mb-2">
              Exact Store Location
            </h4>
            <div className="p-4 bg-white border border-[#eae7e7] rounded-sm">
              <p className="text-[14px] text-[#1c1b1b] font-medium leading-relaxed">
                Relief Rd, opp. HDFC BANK, Old City, EXACTLY, Lal Darwaja, Ahmedabad, Gujarat 380001
              </p>
              <p className="text-[12px] text-[#544244] mt-1">
                Landmark: Directly opposite HDFC Bank, Lal Darwaja Main Road
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <a
                  href={REAL_STORE_DATA.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#4e051a] text-white px-4 py-2 rounded-sm text-[12px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5 hover:bg-[#6b1d2f]"
                >
                  <span className="material-symbols-outlined text-[16px]">directions</span>
                  Get Directions in Google Maps
                </a>
                <a
                  href={`https://wa.me/${REAL_STORE_DATA.whatsapp}?text=Hello%20Sanjay%20Bhai,%20I%20am%20visiting%20She%20Emporium%20store`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white px-4 py-2 rounded-sm text-[12px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5 hover:opacity-90"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  WhatsApp Location
                </a>
              </div>
            </div>
          </div>

          {/* Store Hours Schedule */}
          <div>
            <h4 className="text-[12px] uppercase tracking-wider font-bold text-[#6c5b4c] mb-2">
              Operating Hours
            </h4>
            <div className="border border-[#eae7e7] rounded-sm divide-y divide-[#eae7e7] text-[13px]">
              {REAL_STORE_DATA.hours.map((item) => (
                <div key={item.day} className="px-4 py-2 flex items-center justify-between hover:bg-[#fcf9f8]">
                  <span className="font-medium text-[#1c1b1b]">{item.day}</span>
                  <span className="text-[#544244] font-mono">{item.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Owner & Fitting Concierge */}
          <div className="bg-[#4e051a]/5 p-4 rounded-sm border border-[#4e051a]/10">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#4e051a] text-[24px]">support_agent</span>
              <div>
                <h5 className="text-[13px] font-bold text-[#4e051a]">
                  Personal Consultation with Sanjay Bhai
                </h5>
                <p className="text-[12px] text-[#544244] mt-0.5 leading-relaxed">
                  Call directly at <span className="font-bold text-[#1c1b1b]">99090 08789</span> for private bridal trousseau consultations, custom sizing assistance, or store availability before your visit.
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <a
                    href="tel:9909008789"
                    className="inline-flex items-center gap-1 text-[12px] font-bold text-[#4e051a] hover:underline"
                  >
                    <span className="material-symbols-outlined text-[16px]">call</span>
                    Call: 99090 08789
                  </a>
                  {onOpenFitGuide && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenFitGuide();
                      }}
                      className="text-[12px] font-bold text-[#4e051a] hover:underline cursor-pointer"
                    >
                      Open Size Guide Calculator
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#fcf9f8] px-6 py-4 border-t border-[#eae7e7] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-white border border-[#eae7e7] text-[#1c1b1b] font-medium text-[12px] uppercase tracking-wider rounded-sm hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
