import React, { useState } from 'react';
import { OrderDispatch } from '../types';
import { formatINR } from '../utils/formatCurrency';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeOrder: OrderDispatch | null;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  activeOrder
}) => {
  if (!isOpen) return null;

  const [inputQuery, setInputQuery] = useState(activeOrder?.orderId || 'SHE-IN-88912');
  const [searchedOrder, setSearchedOrder] = useState<OrderDispatch | null>(activeOrder);
  const [hasSearched, setHasSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;
    setHasSearched(true);
    // If matching active order or fallback demo order
    setSearchedOrder(activeOrder || {
      orderId: inputQuery.trim().toUpperCase(),
      date: 'Today',
      estimatedDelivery: 'Tomorrow by 2:00 PM',
      carrier: 'BlueDart Air Luxe Discreet',
      status: 'In Transit',
      currentHub: 'Ahmedabad Distribution Hub, Old City',
      items: [],
      total: 1299,
      packagingMode: '100% Plain Unbranded Secondary Shipping Box'
    });
  };

  const steps = [
    { title: 'Order Confirmed', subtitle: 'Atelier Quality Verification Passed', completed: true, icon: 'check_circle' },
    { title: 'Discreet Packaging', subtitle: 'Packed in plain unbranded keepsake box', completed: true, icon: 'inventory_2' },
    { title: 'Handed to Carrier', subtitle: 'BlueDart Express Air AWB generated', completed: true, icon: 'local_shipping' },
    { title: 'Out for Delivery', subtitle: 'Discreet courier arriving with sealed parcel', completed: false, current: true, icon: 'delivery_dining' },
    { title: 'Delivered Privately', subtitle: 'Doorstep hand-off without label exposure', completed: false, icon: 'task_alt' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 text-left">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden border border-[#eae7e7] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#eae7e7] flex items-center justify-between bg-[#fcf9f8]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#4e051a] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[19px]">local_shipping</span>
            </div>
            <div>
              <h3 className="font-serif text-[18px] sm:text-[20px] text-[#4e051a] font-bold">
                Live Discreet Order Tracking
              </h3>
              <p className="text-[11px] text-[#6c5b4c]">
                Real-time transit protocols for She Emporium intimate parcels
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-[#544244] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-[#6c5b4c]">
                search
              </span>
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Enter Order ID (e.g. SHE-IN-88912) or Mobile Number"
                className="w-full pl-9 pr-3 py-2 text-[12.5px] border border-[#eae7e7] rounded-xs focus:outline-none focus:border-[#4e051a]"
              />
            </div>
            <button
              type="submit"
              className="bg-[#4e051a] hover:bg-[#6b1d2f] text-white px-4 py-2 rounded-xs text-[11px] font-bold uppercase tracking-wider cursor-pointer"
            >
              Track
            </button>
          </form>

          {hasSearched && searchedOrder && (
            <div className="space-y-6">
              {/* Order Status Hero Card */}
              <div className="p-4 bg-[#fcf9f8] rounded border border-[#eae7e7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] uppercase tracking-wider text-[#6c5b4c] font-bold">
                      Order #{searchedOrder.orderId}
                    </span>
                    <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.2 rounded">
                      {searchedOrder.status}
                    </span>
                  </div>
                  <p className="font-serif text-[17px] text-[#4e051a] font-bold mt-0.5">
                    Estimated Delivery: {searchedOrder.estimatedDelivery}
                  </p>
                  <p className="text-[11.5px] text-[#544244] mt-0.5">
                    Current Location: <span className="font-semibold">{searchedOrder.currentHub}</span>
                  </p>
                </div>

                <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-[#eae7e7] w-full sm:w-auto">
                  <p className="text-[10.5px] uppercase tracking-wider text-[#6c5b4c]">Carrier</p>
                  <p className="text-[12px] font-bold text-[#1c1b1b]">{searchedOrder.carrier}</p>
                  <p className="text-[11px] font-bold text-emerald-700 mt-1 flex items-center gap-1 sm:justify-end">
                    <span className="material-symbols-outlined text-[13px]">shield</span>
                    100% Discreet Box
                  </p>
                </div>
              </div>

              {/* Progress Timeline Stepper */}
              <div>
                <p className="text-[11px] uppercase tracking-wider font-bold text-[#4e051a] mb-4">
                  Courier Transit Timeline
                </p>
                <div className="space-y-4">
                  {steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 relative">
                      {idx < steps.length - 1 && (
                        <div
                          className={`absolute left-3.5 top-7 bottom-0 w-[2px] -mb-4 ${
                            step.completed ? 'bg-emerald-600' : 'bg-[#eae7e7]'
                          }`}
                        />
                      )}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 ${
                          step.completed
                            ? 'bg-emerald-600 text-white'
                            : step.current
                            ? 'bg-[#4e051a] text-white ring-4 ring-[#4e051a]/15 animate-pulse'
                            : 'bg-[#f0eded] text-[#877274]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[15px]">{step.icon}</span>
                      </div>
                      <div className="flex-1 pb-1">
                        <div className="flex items-center justify-between">
                          <p
                            className={`text-[13px] font-bold ${
                              step.completed || step.current ? 'text-[#1c1b1b]' : 'text-[#877274]'
                            }`}
                          >
                            {step.title}
                          </p>
                          {step.current && (
                            <span className="text-[10px] font-bold text-[#4e051a] bg-[#4e051a]/10 px-2 py-0.5 rounded">
                              Current Phase
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#6c5b4c] font-light mt-0.5">
                          {step.subtitle}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Discreet Packaging Guarantee Notice */}
              <div className="p-3.5 bg-white border border-[#eae7e7] rounded flex items-center gap-3">
                <span className="material-symbols-outlined text-[24px] text-[#4e051a]">visibility_off</span>
                <div className="text-[11.5px] text-[#544244]">
                  <span className="font-bold text-[#1c1b1b]">Confidentiality Guarantee:</span> The outer box bears no store branding or mention of lingerie. Sender appears strictly as &apos;S.E. Logistics&apos;.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-[#eae7e7] bg-[#fcf9f8] flex items-center justify-between gap-3">
          <a
            href="https://wa.me/919909008789?text=Hello%20Sanjay%20Bhai,%20I%20need%20assistance%20tracking%20my%20order"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11.5px] font-bold text-[#25D366] hover:underline inline-flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[15px]">chat</span>
            <span>WhatsApp Sanjay Bhai for Delivery Help</span>
          </a>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#4e051a] hover:bg-[#6b1d2f] text-white text-[11px] font-bold uppercase rounded-xs cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
