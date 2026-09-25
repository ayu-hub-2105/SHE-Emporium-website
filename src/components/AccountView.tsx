import React from 'react';
import { OrderDispatch } from '../types';

interface AccountViewProps {
  activeOrder: OrderDispatch | null;
  onOpenFitGuide: () => void;
  onShowToast: (msg: string) => void;
  onNavigateHome: () => void;
}

export const AccountView: React.FC<AccountViewProps> = ({
  activeOrder,
  onOpenFitGuide,
  onShowToast,
  onNavigateHome
}) => {
  return (
    <div className="w-full py-8 md:py-12 bg-[#fcf9f8] text-left">
      <div className="max-w-[1200px] mx-auto px-4 md:px-16 w-full">
        {/* Top Back Navigation Bar */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-wider font-bold text-[#4e051a] hover:text-[#6b1d2f] py-2 px-3.5 bg-white border border-[#dac0c2] shadow-2xs rounded-xs cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back to Store</span>
          </button>
          <span className="text-[11px] text-[#6c5b4c] font-medium hidden sm:inline">
            Customer Profile &amp; Sizing Hub
          </span>
        </div>

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-[#f0eded] gap-4 mb-8 bg-white p-5 sm:p-6 border rounded-xs shadow-2xs">
          <div>
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#6c5b4c] font-bold">
              Client Private Salon
            </span>
            <h2 className="font-display-md text-[#4e051a] mt-1 font-serif text-[26px] sm:text-[30px] font-medium">
              Madame Singhania
            </h2>
            <p className="text-[13px] text-[#544244] mt-0.5">
              Atelier VIP Member Since 2023 • Saved Cup: 34B / French 90B
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenFitGuide}
              className="px-3.5 py-2 bg-[#4e051a] text-white text-[10px] uppercase tracking-wider font-semibold hover:bg-[#6b1d2f] transition-colors cursor-pointer shadow-xs rounded-xs flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">straighten</span>
              <span>Cup &amp; Band Sizing Guide</span>
            </button>
            <button
              onClick={() => onShowToast("Connecting to Private Atelier WhatsApp Concierge...")}
              className="px-3.5 py-2 bg-[#f0eded] text-[#4e051a] text-[10px] uppercase tracking-wider font-semibold hover:bg-[#eae7e7] transition-colors cursor-pointer rounded-xs"
            >
              Concierge WhatsApp
            </button>
          </div>
        </div>

        {/* Cup & Band Sizing Guide Showcase Card */}
        <div className="bg-white p-5 sm:p-6 shadow-xs border border-[#f0eded] mb-8 rounded-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#f0eded] gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#ffd9dd]/40 flex items-center justify-center text-[#4e051a] shrink-0">
                <span className="material-symbols-outlined text-[22px]">straighten</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#6c5b4c] font-bold">
                  Bespoke Measurement Profile
                </span>
                <h3 className="font-serif text-[18px] text-[#4e051a] font-semibold">
                  Cup &amp; Band Sizing Guide &amp; Sister Sizes
                </h3>
              </div>
            </div>

            <button
              onClick={onOpenFitGuide}
              className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 bg-[#4e051a] hover:bg-[#6b1d2f] text-white text-[10px] uppercase tracking-wider font-bold cursor-pointer rounded-xs shadow-xs transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">tune</span>
              <span>Open Precision Sizing Guide</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            <div className="bg-[#fcf9f8] p-3.5 border border-[#f0eded] rounded-xs text-center">
              <span className="text-[10px] uppercase text-[#877274] font-medium block">Saved Primary</span>
              <span className="font-serif font-bold text-[22px] text-[#4e051a]">34B</span>
              <span className="text-[10px] text-[#544244] block mt-0.5">UK / Indian Standard</span>
            </div>
            <div className="bg-[#fcf9f8] p-3.5 border border-[#f0eded] rounded-xs text-center">
              <span className="text-[10px] uppercase text-[#877274] font-medium block">Snug Sister</span>
              <span className="font-serif font-bold text-[22px] text-[#4e051a]">32C</span>
              <span className="text-[10px] text-[#544244] block mt-0.5">Firm architectural grip</span>
            </div>
            <div className="bg-[#fcf9f8] p-3.5 border border-[#f0eded] rounded-xs text-center">
              <span className="text-[10px] uppercase text-[#877274] font-medium block">Comfort Sister</span>
              <span className="font-serif font-bold text-[22px] text-[#4e051a]">36A</span>
              <span className="text-[10px] text-[#544244] block mt-0.5">Relaxed ribcage stretch</span>
            </div>
            <div className="bg-[#fcf9f8] p-3.5 border border-[#f0eded] rounded-xs text-center">
              <span className="text-[10px] uppercase text-[#877274] font-medium block">French Couture</span>
              <span className="font-serif font-bold text-[22px] text-[#4e051a]">90B</span>
              <span className="text-[10px] text-[#544244] block mt-0.5">Leavers Lace Paris</span>
            </div>
          </div>
        </div>

        {/* Active Order Status Card */}
        <div className="bg-white p-6 shadow-sm border border-[#f0eded] mb-8 rounded-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#f0eded] gap-2 mb-6">
            <div>
              <span className="text-[10px] text-[#6c5b4c] uppercase font-bold tracking-widest">
                Active Dispatch Tracker
              </span>
              <h3 className="font-serif text-[20px] text-[#4e051a] font-semibold">
                Order #{activeOrder ? activeOrder.orderId : 'SHE-IN-88912'}
              </h3>
              <p className="text-[13px] text-[#544244]">
                Discreet Air Transit • BlueDart Priority Luxe • ETA: Tomorrow by 2:00 PM
              </p>
            </div>
            <span className="px-3 py-1 bg-[#ffd9dd] text-[#4e051a] text-[10px] uppercase tracking-wider font-bold self-start md:self-auto rounded-xs">
              {activeOrder?.status || 'Out For Air Transit'}
            </span>
          </div>

          {/* Visual Stepper */}
          <div className="py-6 px-2">
            <div className="relative flex items-center justify-between">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#f0eded] w-full z-0" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#4e051a] w-3/4 z-0 transition-all duration-700" />

              {/* Step 1 */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#4e051a] text-white flex items-center justify-center text-[11px] shadow-md">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#4e051a] font-bold mt-2">
                  Placed
                </span>
                <span className="text-[11px] text-[#544244] font-mono">14 Oct, 09:30</span>
              </div>

              {/* Step 2 */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#4e051a] text-white flex items-center justify-center text-[11px] shadow-md">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#4e051a] font-bold mt-2">
                  Discreetly Packed
                </span>
                <span className="text-[11px] text-[#544244] font-mono">14 Oct, 14:15</span>
              </div>

              {/* Step 3 */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#4e051a] text-white flex items-center justify-center text-[11px] shadow-md ring-4 ring-[#4e051a]/20">
                  <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#4e051a] font-bold mt-2">
                  In Transit
                </span>
                <span className="text-[11px] text-[#4e051a] font-mono font-bold">Mumbai Hub</span>
              </div>

              {/* Step 4 */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#eae7e7] text-[#877274] flex items-center justify-center text-[11px]">
                  <span className="material-symbols-outlined text-[16px]">home</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#877274] font-bold mt-2">
                  Delivered
                </span>
                <span className="text-[11px] text-[#877274] font-mono">Pending</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#f0eded] flex flex-col sm:flex-row items-start sm:items-center justify-between text-[13px] mt-4 gap-2 rounded-xs">
            <span className="text-[#1c1b1b]">Need an urgent sister-size swap or delivery reschedule?</span>
            <button
              onClick={() => onShowToast("Fitting concierge dispatched to assist you.")}
              className="text-[10px] uppercase tracking-wider text-[#4e051a] font-bold underline cursor-pointer"
            >
              Contact Fitting Concierge
            </button>
          </div>
        </div>

        {/* Back to Boutique Button */}
        <div className="text-center pt-2">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] font-semibold text-[#4e051a] hover:text-[#6b1d2f] cursor-pointer py-2.5 px-5 border border-[#dac0c2] bg-white rounded-xs shadow-2xs transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Return to Atelier Collections</span>
          </button>
        </div>
      </div>
    </div>
  );
};
