import React, { useState } from 'react';
import { Product } from '../types';
import { formatINR } from '../utils/formatCurrency';

interface BridalBoxBuilderModalProps {
  products: Product[];
  isOpen: boolean;
  onClose: () => void;
  onAddBoxToCart: (boxItems: { product: Product; size: string; color: string }[], boxStyle: string, giftNote: string) => void;
  onShowToast: (msg: string) => void;
}

export const BridalBoxBuilderModal: React.FC<BridalBoxBuilderModalProps> = ({
  products,
  isOpen,
  onClose,
  onAddBoxToCart,
  onShowToast
}) => {
  if (!isOpen) return null;

  // Filter available options for 3 slots
  const sleepwearOptions = products.filter((p) => p.category === 'Sleepwear');
  const braSetOptions = products.filter((p) => p.category === 'Lingerie Sets' || p.category === 'Bridal');
  const shaperOptions = products.filter((p) => p.category === 'Shapewear' || p.category === 'Bras');

  const [selectedRobe, setSelectedRobe] = useState<Product>(sleepwearOptions[0] || products[0]);
  const [selectedBraSet, setSelectedBraSet] = useState<Product>(braSetOptions[0] || products[1]);
  const [selectedShaper, setSelectedShaper] = useState<Product>(shaperOptions[0] || products[2]);

  const [robeSize, setRobeSize] = useState<string>('M');
  const [braSetSize, setBraSetSize] = useState<string>('34B');
  const [shaperSize, setShaperSize] = useState<string>('M');

  const [boxStyle, setBoxStyle] = useState<'bordeaux' | 'ivory'>('bordeaux');
  const [giftNote, setGiftNote] = useState<string>('Wishing you a lifetime of elegance & happiness on your wedding day.');

  const subtotal = selectedRobe.price + selectedBraSet.price + selectedShaper.price;
  const discount = Math.round(subtotal * 0.15); // 15% bridal combo privilege
  const comboTotal = subtotal - discount;

  const handleConfirm = () => {
    onAddBoxToCart(
      [
        { product: selectedRobe, size: robeSize, color: selectedRobe.colors[0].name },
        { product: selectedBraSet, size: braSetSize, color: selectedBraSet.colors[0].name },
        { product: selectedShaper, size: shaperSize, color: selectedShaper.colors[0].name }
      ],
      boxStyle === 'bordeaux' ? 'Royal Bordeaux with Gold Crest Keepsake Box' : 'Pearl Ivory with Satin Pull-Ribbon Box',
      giftNote
    );
    onShowToast('3-Piece Bridal Trousseau Keepsake Box added to your bag with 15% discount!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 text-left">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-2xl overflow-hidden border border-[#eae7e7] max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#eae7e7] flex items-center justify-between bg-[#fcf9f8]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#4e051a] text-white flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[20px]">featured_seasonal_and_gifts</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-[18px] sm:text-[22px] text-[#4e051a] font-bold">
                  Bespoke Bridal Trousseau Box Builder
                </h3>
                <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  Save 15%
                </span>
              </div>
              <p className="text-[11.5px] sm:text-[12px] text-[#6c5b4c]">
                Curate a 3-piece heirloom trousseau in luxury satin-lined keepsake packaging with embossed note.
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

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Slot 1: Mulberry Silk Sleepwear */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[12px] uppercase font-bold tracking-wider text-[#4e051a] flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#4e051a] text-white flex items-center justify-center text-[10px]">1</span>
                Step 1: Choose Pure Silk Sleepwear / Robe
              </label>
              <span className="text-[11.5px] font-serif font-bold text-[#4e051a]">
                {formatINR(selectedRobe.price)}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {sleepwearOptions.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedRobe(item)}
                  className={`p-2 rounded border cursor-pointer transition-all ${
                    selectedRobe.id === item.id
                      ? 'border-[#4e051a] bg-[#fcf9f8] ring-1 ring-[#4e051a]'
                      : 'border-[#eae7e7] hover:border-[#4e051a]/40'
                  }`}
                >
                  <img src={item.mainImage} alt={item.name} referrerPolicy="no-referrer" className="w-full h-24 object-cover rounded mb-1.5" />
                  <p className="text-[11px] font-bold text-[#1c1b1b] truncate">{item.name}</p>
                  <p className="text-[10px] text-[#6c5b4c]">{formatINR(item.price)}</p>
                </div>
              ))}
            </div>
            {/* Size for Slot 1 */}
            <div className="mt-2 flex items-center gap-2 text-[11px]">
              <span className="text-[#6c5b4c]">Size:</span>
              {['S', 'M', 'L', 'XL'].map((s) => (
                <button
                  key={s}
                  onClick={() => setRobeSize(s)}
                  className={`px-2 py-0.5 border rounded-xs font-semibold cursor-pointer ${
                    robeSize === s ? 'bg-[#4e051a] text-white border-[#4e051a]' : 'border-[#eae7e7]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Slot 2: Bridal Lace Bra Set */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[12px] uppercase font-bold tracking-wider text-[#4e051a] flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#4e051a] text-white flex items-center justify-center text-[10px]">2</span>
                Step 2: Choose Chantilly Lace or Bridal Set
              </label>
              <span className="text-[11.5px] font-serif font-bold text-[#4e051a]">
                {formatINR(selectedBraSet.price)}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {braSetOptions.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedBraSet(item)}
                  className={`p-2 rounded border cursor-pointer transition-all ${
                    selectedBraSet.id === item.id
                      ? 'border-[#4e051a] bg-[#fcf9f8] ring-1 ring-[#4e051a]'
                      : 'border-[#eae7e7] hover:border-[#4e051a]/40'
                  }`}
                >
                  <img src={item.mainImage} alt={item.name} referrerPolicy="no-referrer" className="w-full h-24 object-cover rounded mb-1.5" />
                  <p className="text-[11px] font-bold text-[#1c1b1b] truncate">{item.name}</p>
                  <p className="text-[10px] text-[#6c5b4c]">{formatINR(item.price)}</p>
                </div>
              ))}
            </div>
            {/* Size for Slot 2 */}
            <div className="mt-2 flex items-center gap-2 text-[11px]">
              <span className="text-[#6c5b4c]">Cup & Band:</span>
              {['32B', '34B', '34C', '36B', '36C'].map((s) => (
                <button
                  key={s}
                  onClick={() => setBraSetSize(s)}
                  className={`px-2 py-0.5 border rounded-xs font-semibold cursor-pointer ${
                    braSetSize === s ? 'bg-[#4e051a] text-white border-[#4e051a]' : 'border-[#eae7e7]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Slot 3: Saree Shaper / Babydoll */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[12px] uppercase font-bold tracking-wider text-[#4e051a] flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#4e051a] text-white flex items-center justify-center text-[10px]">3</span>
                Step 3: Choose Saree Shaper / Contour Layer
              </label>
              <span className="text-[11.5px] font-serif font-bold text-[#4e051a]">
                {formatINR(selectedShaper.price)}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {shaperOptions.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedShaper(item)}
                  className={`p-2 rounded border cursor-pointer transition-all ${
                    selectedShaper.id === item.id
                      ? 'border-[#4e051a] bg-[#fcf9f8] ring-1 ring-[#4e051a]'
                      : 'border-[#eae7e7] hover:border-[#4e051a]/40'
                  }`}
                >
                  <img src={item.mainImage} alt={item.name} referrerPolicy="no-referrer" className="w-full h-24 object-cover rounded mb-1.5" />
                  <p className="text-[11px] font-bold text-[#1c1b1b] truncate">{item.name}</p>
                  <p className="text-[10px] text-[#6c5b4c]">{formatINR(item.price)}</p>
                </div>
              ))}
            </div>
            {/* Size for Slot 3 */}
            <div className="mt-2 flex items-center gap-2 text-[11px]">
              <span className="text-[#6c5b4c]">Size:</span>
              {['S', 'M', 'L', 'XL'].map((s) => (
                <button
                  key={s}
                  onClick={() => setShaperSize(s)}
                  className={`px-2 py-0.5 border rounded-xs font-semibold cursor-pointer ${
                    shaperSize === s ? 'bg-[#4e051a] text-white border-[#4e051a]' : 'border-[#eae7e7]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Box Style & Custom Note */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#eae7e7]">
            <div>
              <label className="text-[11px] uppercase font-bold tracking-wider text-[#4e051a] block mb-2">
                Keepsake Presentation Box:
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2.5 p-2.5 border rounded-xs cursor-pointer hover:bg-[#fcf9f8]">
                  <input
                    type="radio"
                    name="boxStyle"
                    checked={boxStyle === 'bordeaux'}
                    onChange={() => setBoxStyle('bordeaux')}
                    className="accent-[#4e051a]"
                  />
                  <div>
                    <p className="text-[12px] font-bold text-[#1c1b1b]">Royal Bordeaux Burgundy Box</p>
                    <p className="text-[10.5px] text-[#6c5b4c]">Heavy board with gold hot-stamped atelier crest</p>
                  </div>
                </label>
                <label className="flex items-center gap-2.5 p-2.5 border rounded-xs cursor-pointer hover:bg-[#fcf9f8]">
                  <input
                    type="radio"
                    name="boxStyle"
                    checked={boxStyle === 'ivory'}
                    onChange={() => setBoxStyle('ivory')}
                    className="accent-[#4e051a]"
                  />
                  <div>
                    <p className="text-[12px] font-bold text-[#1c1b1b]">Pearl Ivory Keepsake Box</p>
                    <p className="text-[10.5px] text-[#6c5b4c]">Ivory linen finish with champagne satin pull-ribbon</p>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label className="text-[11px] uppercase font-bold tracking-wider text-[#4e051a] block mb-2">
                Embossed Gift Calligraphy Note:
              </label>
              <textarea
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                rows={3}
                className="w-full p-2.5 text-[12px] border border-[#eae7e7] rounded-xs focus:outline-none focus:border-[#4e051a] resize-none"
                placeholder="Enter personal love message to be handwritten on luxury parchment..."
              />
            </div>
          </div>
        </div>

        {/* Pricing Summary Footer */}
        <div className="p-4 sm:p-5 border-t border-[#eae7e7] bg-[#fcf9f8] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-left w-full sm:w-auto">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-[#6c5b4c] font-semibold">Trousseau Value</p>
              <p className="text-[13px] line-through text-[#877274]">{formatINR(subtotal)}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-emerald-800 font-bold">15% Bundle Privilege</p>
              <p className="text-[13px] text-emerald-700 font-semibold">-{formatINR(discount)}</p>
            </div>
            <div className="pl-3 border-l border-[#eae7e7]">
              <p className="text-[10px] uppercase tracking-wider text-[#4e051a] font-bold">Bundle Price</p>
              <p className="font-serif text-[20px] font-bold text-[#4e051a]">{formatINR(comboTotal)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-[#eae7e7] text-[#544244] text-[11px] font-bold uppercase rounded-xs cursor-pointer hover:bg-black/5"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-6 py-2.5 bg-[#4e051a] hover:bg-[#6b1d2f] text-white text-[11.5px] font-bold uppercase tracking-wider rounded-xs shadow-md cursor-pointer transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[17px]">shopping_bag</span>
              <span>Add Box to Bag ({formatINR(comboTotal)})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
