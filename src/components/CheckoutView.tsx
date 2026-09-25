import React, { useState } from 'react';
import { CartItem } from '../types';
import { formatINR, formatINRSigned } from '../utils/formatCurrency';

interface CheckoutViewProps {
  cartItems: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  onPlaceOrder: (details: {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
    packaging: string;
    paymentMethod: string;
  }) => void;
  onNavigateHome: () => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  cartItems,
  subtotal,
  discount,
  total,
  onPlaceOrder,
  onNavigateHome
}) => {
  const [firstName, setFirstName] = useState('Aanya');
  const [lastName, setLastName] = useState('Singhania');
  const [phone, setPhone] = useState('+91 98201 44920');
  const [address, setAddress] = useState('Apt 14B, The Sea Crest, Worli Sea Face');
  const [city, setCity] = useState('Mumbai');
  const [pincode, setPincode] = useState('400030');
  const [packaging, setPackaging] = useState('signature');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'nb' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('aanya@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4111 •••• •••• 9012');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthorizing(true);
    setTimeout(() => {
      onPlaceOrder({
        firstName,
        lastName,
        phone,
        address,
        city,
        pincode,
        packaging: packaging === 'signature' ? 'The Signature Atelier Box' : 'Minimalist Eco Courier',
        paymentMethod: paymentMethod.toUpperCase()
      });
      setIsAuthorizing(false);
    }, 1200);
  };

  return (
    <div className="w-full py-12 bg-[#f6f3f2] text-left">
      <div className="max-w-[1200px] mx-auto px-4 md:px-16 w-full">
        <div className="mb-8 text-center max-w-lg mx-auto">
          <span className="text-[10px] uppercase tracking-[0.24em] text-[#6c5b4c] font-bold">
            End-to-End Encrypted Salon Checkout
          </span>
          <h2 className="font-display-md text-[#4e051a] mt-1 font-serif">
            Discreet Order Completion
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Client Coordinates */}
            <div className="bg-white p-6 shadow-sm border border-[#f0eded]">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#f0eded]">
                <span className="w-6 h-6 rounded-full bg-[#4e051a] text-white flex items-center justify-center text-[10px] font-bold">
                  1
                </span>
                <h3 className="font-serif text-[18px] text-[#4e051a] font-medium">
                  Private Delivery Coordinates
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#544244] block mb-1 font-semibold">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-[#f6f3f2] p-3 text-[#1c1b1b] focus:outline-none focus:ring-1 focus:ring-[#4e051a] border border-[#f0eded]"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#544244] block mb-1 font-semibold">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-[#f6f3f2] p-3 text-[#1c1b1b] focus:outline-none focus:ring-1 focus:ring-[#4e051a] border border-[#f0eded]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[10px] uppercase tracking-wider text-[#544244] block mb-1 font-semibold">
                    Confidential Phone (For Courier OTP only)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#f6f3f2] p-3 text-[#1c1b1b] focus:outline-none focus:ring-1 focus:ring-[#4e051a] border border-[#f0eded]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[10px] uppercase tracking-wider text-[#544244] block mb-1 font-semibold">
                    Apartment, Building, Street Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-[#f6f3f2] p-3 text-[#1c1b1b] focus:outline-none focus:ring-1 focus:ring-[#4e051a] border border-[#f0eded]"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#544244] block mb-1 font-semibold">
                    City / Region
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#f6f3f2] p-3 text-[#1c1b1b] focus:outline-none focus:ring-1 focus:ring-[#4e051a] border border-[#f0eded]"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#544244] block mb-1 font-semibold">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full bg-[#f6f3f2] p-3 text-[#1c1b1b] focus:outline-none focus:ring-1 focus:ring-[#4e051a] border border-[#f0eded]"
                  />
                </div>
              </div>

              {/* Packaging Selector */}
              <div className="mt-6 p-4 bg-[#f6f3f2] border border-[#f0eded]">
                <label className="text-[10px] uppercase tracking-wider text-[#4e051a] font-bold block mb-2">
                  Discreet Packaging Mode
                </label>
                <div className="space-y-2 text-[13px]">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="packaging"
                      value="signature"
                      checked={packaging === 'signature'}
                      onChange={() => setPackaging('signature')}
                      className="accent-[#4e051a]"
                    />
                    <span className="text-[#1c1b1b] font-medium">
                      The Signature Atelier Box (Unbranded outer, silk gift box inside) — Complimentary
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="packaging"
                      value="eco"
                      checked={packaging === 'eco'}
                      onChange={() => setPackaging('eco')}
                      className="accent-[#4e051a]"
                    />
                    <span className="text-[#1c1b1b]">
                      Minimalist Eco Courier (Recycled zero-plastic mailer, fully unbranded)
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Step 2: Payment Gateway */}
            <div className="bg-white p-6 shadow-sm border border-[#f0eded]">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#f0eded]">
                <span className="w-6 h-6 rounded-full bg-[#4e051a] text-white flex items-center justify-center text-[10px] font-bold">
                  2
                </span>
                <h3 className="font-serif text-[18px] text-[#4e051a] font-medium">
                  Encrypted Payment Gateway
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 text-center text-[10px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    paymentMethod === 'upi'
                      ? 'bg-[#f0eded] ring-1 ring-[#4e051a] text-[#4e051a]'
                      : 'bg-[#f6f3f2] text-[#1c1b1b] hover:bg-[#f0eded]'
                  }`}
                >
                  Instant UPI
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 text-center text-[10px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'bg-[#f0eded] ring-1 ring-[#4e051a] text-[#4e051a]'
                      : 'bg-[#f6f3f2] text-[#1c1b1b] hover:bg-[#f0eded]'
                  }`}
                >
                  Credit / Debit
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('nb')}
                  className={`p-3 text-center text-[10px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    paymentMethod === 'nb'
                      ? 'bg-[#f0eded] ring-1 ring-[#4e051a] text-[#4e051a]'
                      : 'bg-[#f6f3f2] text-[#1c1b1b] hover:bg-[#f0eded]'
                  }`}
                >
                  Net Banking
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 text-center text-[10px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'bg-[#f0eded] ring-1 ring-[#4e051a] text-[#4e051a]'
                      : 'bg-[#f6f3f2] text-[#1c1b1b] hover:bg-[#f0eded]'
                  }`}
                >
                  Discreet COD
                </button>
              </div>

              {/* Dynamic Payment Details Panel */}
              <div className="p-4 bg-[#f6f3f2] border border-[#f0eded]">
                {paymentMethod === 'upi' && (
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-[#4e051a] mb-2">
                      Scan QR or Enter UPI VPA (Google Pay / PhonePe / BHIM)
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="e.g. mobile@okaxis or aanya@okhdfcbank"
                        className="flex-1 bg-white p-2.5 text-[13px] text-[#1c1b1b] focus:outline-none border border-[#f0eded]"
                      />
                      <button
                        type="button"
                        className="bg-[#4e051a] text-white px-4 py-2 text-[10px] uppercase tracking-wider font-semibold hover:bg-[#6b1d2f]"
                      >
                        Verify
                      </button>
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-3 text-[13px]">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#544244] block mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-white p-2.5 text-[#1c1b1b] font-mono focus:outline-none border border-[#f0eded]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-[#544244] block mb-1">
                          Expiry MM/YY
                        </label>
                        <input
                          type="text"
                          defaultValue="08/29"
                          className="w-full bg-white p-2.5 text-[#1c1b1b] font-mono focus:outline-none border border-[#f0eded]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-[#544244] block mb-1">
                          CVV
                        </label>
                        <input
                          type="password"
                          defaultValue="•••"
                          maxLength={4}
                          className="w-full bg-white p-2.5 text-[#1c1b1b] font-mono focus:outline-none border border-[#f0eded]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'nb' && (
                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-bold text-[#4e051a] block mb-2">
                      Select Private Bank
                    </label>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="w-full bg-white p-2.5 text-[13px] text-[#1c1b1b] focus:outline-none border border-[#f0eded]"
                    >
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>State Bank of India</option>
                      <option>Axis Bank</option>
                      <option>Kotak Mahindra Bank</option>
                    </select>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="text-[13px] text-[#544244]">
                    <p className="font-semibold text-[#1c1b1b] mb-1">
                      Discreet Cash on Delivery Available
                    </p>
                    <p>
                      Courier agent will carry exact change in a sealed privacy envelope. An OTP verification is sent upon delivery arrival.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Summary Column */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 shadow-sm border border-[#f0eded] sticky top-28">
              <h3 className="font-serif text-[18px] text-[#4e051a] font-medium mb-4 pb-2 border-b border-[#f0eded]">
                Order Summary ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} Curations)
              </h3>

              {/* Items Mini List */}
              <div className="space-y-3 mb-4 max-h-56 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div
                      className="w-14 h-16 bg-[#f0eded] bg-cover bg-center shrink-0"
                      style={{ backgroundImage: `url('${item.product.mainImage}')` }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-[#4e051a] truncate">
                        {item.product.name}
                      </p>
                      <p className="text-[12px] text-[#544244]">
                        {item.selectedColor.name} • {item.selectedSize} • Qty: {item.quantity}
                      </p>
                      <p className="font-serif text-[15px] text-[#1c1b1b] font-bold mt-0.5 tabular-nums">
                        {formatINR(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Discount code banner */}
              <div className="flex items-center justify-between p-2.5 bg-[#ffd9dd]/30 mb-4 border border-[#ffd9dd]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#4e051a] text-[18px]">sell</span>
                  <span className="text-[10px] font-bold uppercase text-[#4e051a]">
                    LUXESHE10 Applied
                  </span>
                </div>
                <span className="text-[11px] font-bold text-[#4e051a] tabular-nums">
                  {formatINRSigned(discount)}
                </span>
              </div>

              {/* Totals */}
              <div className="space-y-2 text-[13px] text-[#1c1b1b] pb-3 border-b border-[#f0eded]">
                <div className="flex justify-between">
                  <span className="text-[#544244]">Subtotal</span>
                  <span className="tabular-nums font-medium">{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#544244]">Salon Privileges (10% Welcome)</span>
                  <span className="text-[#4e051a] font-medium tabular-nums">{formatINRSigned(discount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#544244]">Discreet Express Courier</span>
                  <span className="text-[#4e051a] font-bold uppercase text-[12px]">FREE</span>
                </div>
              </div>

              <div className="flex items-baseline justify-between py-3">
                <span className="font-serif text-[18px] font-semibold text-[#4e051a]">Total Payable</span>
                <span className="font-serif text-[24px] font-bold text-[#4e051a] tabular-nums">
                  {formatINR(total)}
                </span>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isAuthorizing || cartItems.length === 0}
                className="w-full bg-[#4e051a] hover:bg-[#6b1d2f] disabled:bg-[#877274] text-white py-4 text-[11px] uppercase tracking-[0.16em] font-semibold transition-all shadow-lg shadow-[#4e051a]/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">lock</span>
                <span>
                  {isAuthorizing ? 'Authorizing Encryption...' : 'Confirm & Authorize Order'}
                </span>
              </button>

              <p className="text-center text-[10px] text-[#544244] uppercase tracking-wider mt-3">
                Billing Statement appears discreetly as "SHE CORP RETAIL"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
