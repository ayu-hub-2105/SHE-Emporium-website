import React, { useState } from 'react';
import { Product, CategoryType } from '../types';
import { formatINR } from '../utils/formatCurrency';

// Local High-Definition Studio Image Assets (Guaranteed 100% Reliable Loading)
import imgPureLaceBra from '../assets/images/pure_lace_bra_1790157170886.jpg';
import imgMinimizerBra from '../assets/images/minimizer_bra_1790157968636.jpg';
import imgPushUpBra from '../assets/images/push_up_bra_1790157271587.jpg';
import imgStraplessCorsetBra from '../assets/images/strapless_corset_bra_1790157929829.jpg';
import imgPantySeamlessPack from '../assets/images/panty_seamless_pack_1790337482796.jpg';
import imgPantyLaceBikini from '../assets/images/panty_lace_bikini_1790337504431.jpg';
import imgCamisoleModalSlip from '../assets/images/camisole_modal_slip_1790337523985.jpg';
import imgSilkChemiseSlip from '../assets/images/silk_chemise_slip_1790337543180.jpg';
import imgSilkNightieSlip from '../assets/images/silk_nightie_slip_1790157206139.jpg';
import imgIndianSilkHero from '../assets/images/indian_silk_hero_1790336126575.jpg';
import imgLingerieSetNoir from '../assets/images/lingerie_set_noir_1790157186797.jpg';
import imgCloviaMatchingSetsHero from '../assets/images/clovia_matching_sets_hero_1790337329203.jpg';
import imgSculptingShapewear from '../assets/images/sculpting_shapewear_1790157221949.jpg';
import imgSareeShaper from '../assets/images/saree_shaper_1790157290893.jpg';
import imgIndianBridalHero from '../assets/images/indian_bridal_hero_1790336137740.jpg';
import imgBridalLingerieSet from '../assets/images/bridal_lingerie_set_1790157235163.jpg';

interface AdminViewProps {
  products: Product[];
  onUpdateStock: (id: number, delta: number) => void;
  onAddProduct: (newProd: Product) => void;
  onEditProduct?: (updatedProd: Product) => void;
  onDeleteProduct?: (id: number) => void;
  onResetCatalog?: () => void;
  onNavigateHome: () => void;
  onNavigateToCategory?: (cat: CategoryType) => void;
  onNavigateToPDP?: (prod: Product) => void;
  onShowToast: (msg: string) => void;
}

// 16 Verified High-Resolution Local Presets for 1-Click Selection in Admin
const IMAGE_PRESETS = [
  {
    name: 'French Floral Lace Balconette',
    url: imgPureLaceBra,
    category: 'Bras'
  },
  {
    name: 'Seamless Wireless T-Shirt Bra',
    url: imgMinimizerBra,
    category: 'Bras'
  },
  {
    name: 'Plunge Push-Up Cleavage Bra',
    url: imgPushUpBra,
    category: 'Bras'
  },
  {
    name: 'Strapless Multiway Corset Bra',
    url: imgStraplessCorsetBra,
    category: 'Bras'
  },
  {
    name: 'Seamless Laser-Cut Hipster Panties',
    url: imgPantySeamlessPack,
    category: 'Panties'
  },
  {
    name: 'Scalloped French Lace Bikini Brief',
    url: imgPantyLaceBikini,
    category: 'Panties'
  },
  {
    name: 'Featherlight Modal Kurti Camisole',
    url: imgCamisoleModalSlip,
    category: 'Camisoles & Slips'
  },
  {
    name: 'Pure Mulberry Silk Chemise Slip',
    url: imgSilkChemiseSlip,
    category: 'Camisoles & Slips'
  },
  {
    name: 'Champagne Bias-Cut Silk Nightie',
    url: imgSilkNightieSlip,
    category: 'Sleepwear'
  },
  {
    name: 'Emerald Silk Robe & Kimono',
    url: imgIndianSilkHero,
    category: 'Sleepwear'
  },
  {
    name: 'Noir Chantilly Lace Bralette & Garter',
    url: imgLingerieSetNoir,
    category: 'Lingerie Sets'
  },
  {
    name: 'Royal Navy 2-Piece Lace Set',
    url: imgCloviaMatchingSetsHero,
    category: 'Lingerie Sets'
  },
  {
    name: 'Hourglass Sculpting Tummy Shaper',
    url: imgSculptingShapewear,
    category: 'Shapewear'
  },
  {
    name: 'Mermaid Silhouette Saree Shaper',
    url: imgSareeShaper,
    category: 'Shapewear'
  },
  {
    name: 'Imperial Crimson Velvet Bridal Corset',
    url: imgIndianBridalHero,
    category: 'Bridal'
  },
  {
    name: 'Ivory Chantilly Lace Bridal Set',
    url: imgBridalLingerieSet,
    category: 'Bridal'
  }
];

const PRESET_COLORS = [
  { name: 'Bordeaux Wine', hex: '#4e051a' },
  { name: 'Champagne Nude', hex: '#e8d7c8' },
  { name: 'Midnight Noir', hex: '#1c1b1b' },
  { name: 'Dusty Rose', hex: '#d9a5b3' },
  { name: 'Ivory Pearl', hex: '#fcf9f8' },
  { name: 'Royal Navy', hex: '#1b263b' },
  { name: 'Emerald Forest', hex: '#1b4332' }
];

export const AdminView: React.FC<AdminViewProps> = ({
  products,
  onUpdateStock,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onResetCatalog,
  onNavigateHome,
  onNavigateToCategory,
  onNavigateToPDP,
  onShowToast
}) => {
  // Navigation Tabs in Admin
  const [activeTab, setActiveTab] = useState<'inventory' | 'add-product'>('inventory');

  // Filter & Search in Inventory
  const [selectedSection, setSelectedSection] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Editing state
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  // Form State for Adding / Editing Real Products
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'Bras' | 'Panties' | 'Camisoles & Slips' | 'Lingerie Sets' | 'Sleepwear' | 'Shapewear' | 'Bridal'>('Bras');
  const [subType, setSubType] = useState('T-Shirt');
  const [price, setPrice] = useState<number>(499);
  const [originalPrice, setOriginalPrice] = useState<number>(899);
  const [description, setDescription] = useState(
    'Crafted with premium skin-friendly breathable cotton fabric, designed for all-day seamless comfort, smooth shaping, and zero-dig gentle support.'
  );
  const [stockCount, setStockCount] = useState<number>(50);
  const [tag, setTag] = useState('BESTSELLER');
  const [mainImage, setMainImage] = useState(IMAGE_PRESETS[0].url);

  // Features Bullet Points
  const [features, setFeatures] = useState<string[]>([
    '100% Breathable Combed Cotton Fabric',
    'Zero-wire contoured cups for natural, dig-free lift',
    'Broad non-slip adjustable shoulder straps',
    'Triple hook-and-eye back closure'
  ]);
  const [featureInput, setFeatureInput] = useState('');

  // Selected Sizes
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['32B', '34B', '36B', '38C']);
  const [customSizeInput, setCustomSizeInput] = useState('');

  // Selected Colors
  const [selectedColors, setSelectedColors] = useState<{ name: string; hex: string }[]>([
    PRESET_COLORS[0],
    PRESET_COLORS[1]
  ]);

  // Size chips options by category
  const commonCupSizes = ['30B', '32B', '32C', '34B', '34C', '36B', '36C', '38B', '38C', '40C'];
  const commonApparelSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', 'Free Size'];

  // Handle adding feature bullet
  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  // Toggle size
  const toggleSize = (s: string) => {
    if (selectedSizes.includes(s)) {
      if (selectedSizes.length > 1) {
        setSelectedSizes(selectedSizes.filter((sz) => sz !== s));
      } else {
        onShowToast("At least one size must remain selected.");
      }
    } else {
      setSelectedSizes([...selectedSizes, s]);
    }
  };

  // Add custom size
  const handleAddCustomSize = () => {
    if (customSizeInput.trim() && !selectedSizes.includes(customSizeInput.trim())) {
      setSelectedSizes([...selectedSizes, customSizeInput.trim()]);
      setCustomSizeInput('');
    }
  };

  // Toggle color
  const toggleColor = (col: { name: string; hex: string }) => {
    if (selectedColors.some((c) => c.name === col.name)) {
      if (selectedColors.length > 1) {
        setSelectedColors(selectedColors.filter((c) => c.name !== col.name));
      } else {
        onShowToast("At least one color must remain selected.");
      }
    } else {
      setSelectedColors([...selectedColors, col]);
    }
  };

  // Open Edit Form for an existing product
  const handleStartEdit = (prod: Product) => {
    setEditingProductId(prod.id);
    setName(prod.name);
    setCategory(prod.category as any);
    setSubType(prod.subType || 'Standard');
    setPrice(prod.price);
    setOriginalPrice(prod.originalPrice || Math.round(prod.price * 1.5));
    setDescription(prod.description);
    setStockCount(prod.stockCount);
    setTag(prod.tag || 'BESTSELLER');
    setMainImage(prod.mainImage);
    setFeatures(prod.features && prod.features.length ? prod.features : ['Premium fabric construction']);
    setSelectedSizes(prod.sizes && prod.sizes.length ? prod.sizes : ['32B', '34B', '36B']);
    setSelectedColors(prod.colors && prod.colors.length ? prod.colors : [PRESET_COLORS[0]]);
    setActiveTab('add-product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset form
  const handleResetForm = () => {
    setEditingProductId(null);
    setName('');
    setCategory('Bras');
    setSubType('T-Shirt');
    setPrice(499);
    setOriginalPrice(899);
    setDescription(
      'Crafted with premium skin-friendly breathable cotton fabric, designed for all-day seamless comfort, smooth shaping, and zero-dig gentle support.'
    );
    setStockCount(50);
    setTag('BESTSELLER');
    setMainImage(IMAGE_PRESETS[0].url);
    setFeatures([
      '100% Breathable Combed Cotton Fabric',
      'Zero-wire contoured cups for natural, dig-free lift',
      'Broad non-slip adjustable shoulder straps',
      'Triple hook-and-eye back closure'
    ]);
    setSelectedSizes(['32B', '34B', '36B', '38C']);
    setSelectedColors([PRESET_COLORS[0], PRESET_COLORS[1]]);
  };

  // Save product (Add or Edit)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      onShowToast("Please enter a product title.");
      return;
    }

    if (price <= 0) {
      onShowToast("Please enter a valid price in INR.");
      return;
    }

    const calculatedOriginalPrice = originalPrice && originalPrice > price ? originalPrice : Math.round(price * 1.5);
    const skuCode = `SHE-${category.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const productData: Product = {
      id: editingProductId || Date.now(),
      name: name.trim(),
      category,
      categoryDisplay: `Sizes: ${selectedSizes.join(', ')} • ${subType}`,
      tag,
      price: Number(price),
      originalPrice: Number(calculatedOriginalPrice),
      rating: 5.0,
      reviewsCount: 1,
      description: description.trim(),
      sizes: selectedSizes,
      colors: selectedColors,
      mainImage: mainImage || imgPureLaceBra,
      galleryImages: [mainImage || imgPureLaceBra],
      features,
      stockCount: Number(stockCount),
      sku: skuCode,
      subType,
      isNew: tag === 'NEW ARRIVAL',
      isSale: tag === 'SALE' || tag === 'HOT DEAL'
    };

    if (editingProductId && onEditProduct) {
      onEditProduct(productData);
      onShowToast(`Updated "${productData.name}" successfully!`);
    } else {
      onAddProduct(productData);
      onShowToast(`Added "${productData.name}" to ${category} section!`);
    }

    handleResetForm();
    setActiveTab('inventory');
  };

  // Filtered products list in table
  const filteredProducts = products.filter((p) => {
    if (selectedSection !== 'All' && p.category !== selectedSection) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.tag && p.tag.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const discountPercent = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div className="w-full min-h-screen py-10 bg-[#f6f3f2] text-left">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 w-full">
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#eae7e7] gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#4e051a]/10 text-[#4e051a] px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-[14px]">admin_panel_settings</span>
              She Emporium Admin Control
            </div>
            <h2 className="font-serif text-[26px] sm:text-[32px] text-[#4e051a] font-bold leading-tight">
              Product &amp; Storefront Admin Panel
            </h2>
            <p className="text-[13px] text-[#544244] mt-0.5">
              Add real intimate apparel products, select HD photos, configure Indian prices (₹), and manage inventory.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* View Storefront */}
            <button
              onClick={onNavigateHome}
              className="bg-white hover:bg-[#eae7e7] text-[#1c1b1b] px-4 py-2.5 rounded-xs text-[11px] uppercase tracking-wider font-bold border border-[#eae7e7] transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span className="material-symbols-outlined text-[16px]">storefront</span>
              <span>Back to Store</span>
            </button>

            {/* Toggle Add Product / Inventory */}
            {activeTab === 'inventory' ? (
              <button
                onClick={() => {
                  handleResetForm();
                  setActiveTab('add-product');
                }}
                className="bg-[#4e051a] hover:bg-[#6b1d2f] text-white px-5 py-2.5 rounded-xs text-[11px] uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                <span>+ Add New Product</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  handleResetForm();
                  setActiveTab('inventory');
                }}
                className="bg-[#4e051a] hover:bg-[#6b1d2f] text-white px-5 py-2.5 rounded-xs text-[11px] uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-[18px]">inventory_2</span>
                <span>View Products Catalog ({products.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#eae7e7] mb-8">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`pb-3 px-4 text-[12px] font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
              activeTab === 'inventory'
                ? 'border-[#4e051a] text-[#4e051a]'
                : 'border-transparent text-[#6c5b4c] hover:text-[#4e051a]'
            }`}
          >
            Inventory &amp; Stock Manager ({products.length})
          </button>
          <button
            onClick={() => {
              if (activeTab !== 'add-product') {
                handleResetForm();
              }
              setActiveTab('add-product');
            }}
            className={`pb-3 px-4 text-[12px] font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
              activeTab === 'add-product'
                ? 'border-[#4e051a] text-[#4e051a]'
                : 'border-transparent text-[#6c5b4c] hover:text-[#4e051a]'
            }`}
          >
            {editingProductId ? 'Edit Product' : '+ Add New Product'}
          </button>
        </div>

        {/* TAB 1: ADD OR EDIT PRODUCT FORM */}
        {activeTab === 'add-product' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Column */}
            <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-sm border border-[#eae7e7] shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#eae7e7] mb-6">
                <div>
                  <h3 className="font-serif text-[20px] font-bold text-[#4e051a]">
                    {editingProductId ? `Edit Product (ID #${editingProductId})` : 'Add New Real Intimate Product'}
                  </h3>
                  <p className="text-[12px] text-[#6c5b4c] mt-0.5">
                    {editingProductId
                      ? 'Modify existing product specifications, pricing, stock and images.'
                      : 'Create a new catalog item with pricing, size options, and HD photo gallery.'}
                  </p>
                </div>
                {editingProductId && (
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="text-[11px] font-bold text-[#ba1a1a] hover:underline cursor-pointer"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-6 text-left">
                {/* 1. Title & Tag */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] uppercase tracking-wider text-[#544244] font-bold mb-1.5">
                      Product Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aurelia French Floral Lace Balconette Bra"
                      className="w-full bg-[#fcf9f8] p-2.5 border border-[#eae7e7] rounded-xs text-[#1c1b1b] font-medium focus:outline-none focus:border-[#4e051a]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#544244] font-bold mb-1.5">
                      Promotional Tag
                    </label>
                    <select
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                      className="w-full bg-[#fcf9f8] p-2.5 border border-[#eae7e7] rounded-xs text-[#1c1b1b] focus:outline-none focus:border-[#4e051a]"
                    >
                      <option value="BESTSELLER">BESTSELLER</option>
                      <option value="NEW ARRIVAL">NEW ARRIVAL</option>
                      <option value="EVERYDAY LUXE">EVERYDAY LUXE</option>
                      <option value="WARDROBE STAPLE">WARDROBE STAPLE</option>
                      <option value="ESSENTIAL PACK">ESSENTIAL PACK</option>
                      <option value="BRIDAL TROUSSEAU">BRIDAL TROUSSEAU</option>
                      <option value="HOT DEAL">HOT DEAL</option>
                      <option value="SALE">SALE</option>
                    </select>
                  </div>
                </div>

                {/* 2. Category & SubType */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#544244] font-bold mb-1.5">
                      Primary Section / Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => {
                        const newCat = e.target.value as any;
                        setCategory(newCat);
                        const match = IMAGE_PRESETS.find((p) => p.category === newCat);
                        if (match) {
                          setMainImage(match.url);
                        }
                      }}
                      className="w-full bg-[#fcf9f8] p-2.5 border border-[#eae7e7] rounded-xs text-[#1c1b1b] focus:outline-none focus:border-[#4e051a] font-medium"
                    >
                      <option value="Bras">Bras &amp; Bralettes</option>
                      <option value="Panties">Panties &amp; Everyday Briefs</option>
                      <option value="Camisoles &amp; Slips">Camisoles &amp; Inner Slips</option>
                      <option value="Lingerie Sets">Lingerie Sets &amp; Babydolls</option>
                      <option value="Sleepwear">Sleepwear &amp; Silk Slips</option>
                      <option value="Shapewear">Shapewear &amp; Saree Shapers</option>
                      <option value="Bridal">Bridal Trousseau Collection</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#544244] font-bold mb-1.5">
                      Style / SubType
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. T-Shirt, Wireless, Balconette, Hipster, Camisole, Saree Shaper"
                      value={subType}
                      onChange={(e) => setSubType(e.target.value)}
                      className="w-full bg-[#fcf9f8] p-2.5 border border-[#eae7e7] rounded-xs text-[#1c1b1b] focus:outline-none focus:border-[#4e051a]"
                    />
                  </div>
                </div>

                {/* 3. Pricing in INR (Indian Market Rates) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-[#fcf9f8] rounded-xs border border-[#eae7e7]">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#4e051a] font-bold mb-1">
                      Selling Price (₹ INR) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 font-bold text-[#4e051a]">₹</span>
                      <input
                        type="number"
                        required
                        min="49"
                        max="50000"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="w-full pl-8 pr-3 py-2 bg-white border border-[#eae7e7] rounded-xs text-[#4e051a] font-bold text-[16px] focus:outline-none focus:border-[#4e051a]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#6c5b4c] font-bold mb-1">
                      MRP / Original Price (₹ INR)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-[#6c5b4c]">₹</span>
                      <input
                        type="number"
                        min="49"
                        max="50000"
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(Number(e.target.value))}
                        className="w-full pl-8 pr-3 py-2 bg-white border border-[#eae7e7] rounded-xs text-[#6c5b4c] font-medium text-[16px] focus:outline-none focus:border-[#4e051a]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col justify-center">
                    <span className="text-[10px] uppercase text-[#6c5b4c] font-bold">Calculated Discount</span>
                    <span className="text-[16px] font-bold text-emerald-700 mt-1">
                      {discountPercent > 0 ? `${discountPercent}% OFF` : 'Standard Price'}
                    </span>
                    <span className="text-[10px] text-[#544244]">Indian customer savings badge</span>
                  </div>
                </div>

                {/* 4. Product Description */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#544244] font-bold mb-1.5">
                    Product Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Write detailed descriptions about fabric, fit, support, and care..."
                    className="w-full bg-[#fcf9f8] p-3 border border-[#eae7e7] rounded-xs text-[#1c1b1b] focus:outline-none focus:border-[#4e051a] leading-relaxed"
                  />
                </div>

                {/* 5. Key Features Bullet Points */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#544244] font-bold mb-1.5">
                    Key Features &amp; Specifications
                  </label>
                  <div className="space-y-2 mb-3">
                    {features.map((f, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-[#fcf9f8] rounded-xs border border-[#eae7e7]">
                        <span className="text-[12px] text-[#2b2728]">✓ {f}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(idx)}
                          className="text-[#ba1a1a] hover:text-red-700 text-[11px] font-bold px-1.5 cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Add a new bullet point (e.g. Skin-friendly OEKO-TEX dye)"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddFeature();
                        }
                      }}
                      className="flex-1 bg-[#fcf9f8] p-2 border border-[#eae7e7] rounded-xs text-[12px] focus:outline-none focus:border-[#4e051a]"
                    />
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="bg-[#4e051a] text-white px-3 py-2 rounded-xs text-[11px] font-bold uppercase tracking-wider cursor-pointer"
                    >
                      + Add
                    </button>
                  </div>
                </div>

                {/* 6. Available Sizes */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#544244] font-bold">
                      Available Sizes (Click to Toggle)
                    </label>
                    <span className="text-[10px] text-[#6c5b4c]">Selected: {selectedSizes.join(', ')}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {(category === 'Bras' ? commonCupSizes : commonApparelSizes).map((sz) => {
                      const isSelected = selectedSizes.includes(sz);
                      return (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => toggleSize(sz)}
                          className={`px-3 py-1 rounded-xs text-[11px] font-semibold border transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-[#4e051a] text-white border-[#4e051a]'
                              : 'bg-white text-[#544244] border-[#eae7e7] hover:bg-[#f6f3f2]'
                          }`}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Add custom size (e.g. 42D or 3XL)"
                      value={customSizeInput}
                      onChange={(e) => setCustomSizeInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddCustomSize();
                        }
                      }}
                      className="w-48 bg-[#fcf9f8] p-1.5 border border-[#eae7e7] rounded-xs text-[11px] focus:outline-none focus:border-[#4e051a]"
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomSize}
                      className="bg-white border border-[#4e051a] text-[#4e051a] hover:bg-[#4e051a]/5 px-2.5 py-1.5 rounded-xs text-[10px] font-bold uppercase cursor-pointer"
                    >
                      + Add Size
                    </button>
                  </div>
                </div>

                {/* 7. Available Colors */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#544244] font-bold">
                      Available Colors
                    </label>
                    <span className="text-[10px] text-[#6c5b4c]">
                      Selected: {selectedColors.map((c) => c.name).join(', ')}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {PRESET_COLORS.map((col) => {
                      const isSelected = selectedColors.some((c) => c.name === col.name);
                      return (
                        <button
                          key={col.name}
                          type="button"
                          onClick={() => toggleColor(col)}
                          className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xs border text-[11px] transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#4e051a] bg-[#4e051a]/10 font-bold text-[#4e051a]'
                              : 'border-[#eae7e7] bg-white text-[#544244]'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/20"
                            style={{ backgroundColor: col.hex }}
                          />
                          <span>{col.name}</span>
                          {isSelected && <span>✓</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 8. Product Photo (URL & One-click Presets) */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#544244] font-bold mb-1.5">
                    Product Photo (Image URL or Studio Preset) *
                  </label>
                  <input
                    type="text"
                    required
                    value={mainImage}
                    onChange={(e) => setMainImage(e.target.value)}
                    placeholder="Paste image URL or choose a preset below..."
                    className="w-full bg-[#fcf9f8] p-2.5 border border-[#eae7e7] rounded-xs text-[#1c1b1b] focus:outline-none focus:border-[#4e051a] text-[12px] font-mono mb-2"
                  />

                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[11px] text-[#6c5b4c] font-medium">
                      Select high-definition studio photo from gallery:
                    </p>
                    <span className="text-[10px] text-[#4e051a] font-bold">
                      {IMAGE_PRESETS.length} Studio Assets Available
                    </span>
                  </div>

                  {/* High-Resolution Preset Photo Selector Grid */}
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5 p-3 bg-[#fcf9f8] rounded-xs border border-[#eae7e7]">
                    {IMAGE_PRESETS.map((preset, idx) => {
                      const isSelected = mainImage === preset.url;
                      return (
                        <button
                          key={idx}
                          type="button"
                          title={`${preset.name} (${preset.category})`}
                          onClick={() => setMainImage(preset.url)}
                          className={`group relative aspect-square rounded-xs overflow-hidden border-2 transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#4e051a] ring-2 ring-[#4e051a]/40 scale-105 z-10 shadow-md'
                              : 'border-[#eae7e7] opacity-80 hover:opacity-100 hover:border-[#6c5b4c]'
                          }`}
                        >
                          <img
                            src={preset.url}
                            alt={preset.name}
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = imgPureLaceBra;
                            }}
                            className="w-full h-full object-cover"
                          />
                          {isSelected && (
                            <div className="absolute inset-0 bg-[#4e051a]/30 flex items-center justify-center">
                              <span className="material-symbols-outlined text-white text-[18px] drop-shadow-md">
                                check_circle
                              </span>
                            </div>
                          )}
                          <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[8px] truncate px-1 py-0.5 text-center">
                            {preset.category}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 9. Stock Count */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#544244] font-bold mb-1.5">
                    Initial Stock Count
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10000"
                    value={stockCount}
                    onChange={(e) => setStockCount(Number(e.target.value))}
                    className="w-36 bg-[#fcf9f8] p-2 border border-[#eae7e7] rounded-xs text-[#1c1b1b] font-bold focus:outline-none focus:border-[#4e051a]"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-4 border-t border-[#eae7e7] flex items-center gap-3">
                  <button
                    type="submit"
                    className="bg-[#4e051a] hover:bg-[#6b1d2f] text-white px-7 py-3 rounded-xs text-[11.5px] uppercase tracking-wider font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span className="material-symbols-outlined text-[18px]">publish</span>
                    <span>{editingProductId ? 'Update Product in Store' : 'Publish Product to Storefront'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="bg-white border border-[#eae7e7] hover:bg-[#f6f3f2] text-[#544244] px-5 py-3 rounded-xs text-[11px] uppercase tracking-wider font-bold transition-colors cursor-pointer"
                  >
                    Reset Form
                  </button>
                </div>
              </form>
            </div>

            {/* Live Preview Column */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 bg-white p-5 rounded-sm border border-[#eae7e7] shadow-xs">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#eae7e7]">
                  <span className="text-[10px] uppercase tracking-wider text-[#6c5b4c] font-bold">
                    Live Product Preview
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                    Customer View
                  </span>
                </div>

                {/* Simulated Product Card with 100% Reliable HD Image */}
                <div className="rounded-sm border border-[#eae7e7] overflow-hidden bg-[#fcf9f8]">
                  <div className="relative aspect-[3/4] bg-[#f0eded] overflow-hidden">
                    <img
                      src={mainImage || imgPureLaceBra}
                      alt={name || 'Product Preview'}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = imgPureLaceBra;
                      }}
                      className="w-full h-full object-cover"
                    />
                    {tag && (
                      <span className="absolute top-2 left-2 bg-[#4e051a] text-white text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-xs shadow-xs">
                        {tag}
                      </span>
                    )}
                    {discountPercent > 0 && (
                      <span className="absolute top-2 right-2 bg-emerald-700 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-xs shadow-xs">
                        {discountPercent}% OFF
                      </span>
                    )}
                  </div>

                  <div className="p-3.5 text-left bg-white">
                    <div className="flex items-center justify-between text-[11px] text-[#6c5b4c] mb-1">
                      <span>{category}</span>
                      <span className="text-amber-500 font-bold">5.0 ★</span>
                    </div>

                    <h4 className="font-bold text-[13.5px] text-[#1c1b1b] leading-snug line-clamp-1 mb-1">
                      {name || 'Product Title'}
                    </h4>

                    <p className="text-[11px] text-[#544244] line-clamp-2 mb-2.5 font-light">
                      {description}
                    </p>

                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-[16px] font-bold text-[#4e051a]">
                        {formatINR(price)}
                      </span>
                      {originalPrice > price && (
                        <span className="text-[12px] text-[#877274] line-through">
                          {formatINR(originalPrice)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#f0eded] text-[10px] text-[#6c5b4c]">
                      <span>Sizes: {selectedSizes.slice(0, 3).join(', ')}{selectedSizes.length > 3 ? '...' : ''}</span>
                      <span className="text-emerald-700 font-bold">{stockCount} in stock</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-[#fcf9f8] rounded-xs border border-[#eae7e7] text-[11px] text-[#544244]">
                  <p className="font-semibold text-[#4e051a] mb-1">Instant Storefront Sync</p>
                  <p>
                    When you click &ldquo;Publish Product&rdquo;, it will immediately appear in the catalog, search bar, and respective collection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INVENTORY & PRODUCT MANAGEMENT TABLE */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-sm border border-[#eae7e7] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                {['All', 'Bras', 'Panties', 'Camisoles & Slips', 'Lingerie Sets', 'Shapewear', 'Sleepwear', 'Bridal'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedSection(cat)}
                    className={`px-3 py-1.5 rounded-xs text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      selectedSection === cat
                        ? 'bg-[#4e051a] text-white'
                        : 'bg-[#f6f3f2] text-[#544244] hover:bg-[#eae7e7]'
                    }`}
                  >
                    {cat === 'All' ? 'All Sections' : cat}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <span className="material-symbols-outlined absolute left-2.5 top-2 text-[16px] text-[#6c5b4c]">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search by title, SKU, tag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-[#f6f3f2] border border-[#eae7e7] rounded-xs text-[12px] focus:outline-none focus:border-[#4e051a]"
                />
              </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-white shadow-xs border border-[#eae7e7] rounded-sm overflow-hidden">
              <div className="p-4 border-b border-[#eae7e7] flex items-center justify-between bg-[#fcf9f8]">
                <h3 className="font-serif text-[17px] text-[#4e051a] font-bold">
                  Catalog Inventory ({filteredProducts.length} Products)
                </h3>
                {onResetCatalog && (
                  <button
                    onClick={onResetCatalog}
                    className="text-[11px] text-[#6c5b4c] hover:text-[#4e051a] underline cursor-pointer"
                  >
                    Restore Default Catalog
                  </button>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-[13px] text-left">
                  <thead className="bg-[#fcf9f8] text-[10px] uppercase tracking-wider text-[#6c5b4c] border-b border-[#eae7e7]">
                    <tr>
                      <th className="py-3 px-4 font-bold">Product</th>
                      <th className="py-3 px-4 font-bold">Section</th>
                      <th className="py-3 px-4 font-bold">Selling Price</th>
                      <th className="py-3 px-4 font-bold">Stock</th>
                      <th className="py-3 px-4 font-bold">Status</th>
                      <th className="py-3 px-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0eded]">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-[#f6f3f2]/60 transition-colors">
                        <td className="py-3 px-4 flex items-center gap-3">
                          <img
                            src={p.mainImage}
                            alt={p.name}
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = imgPureLaceBra;
                            }}
                            className="w-11 h-14 object-cover rounded-xs border border-[#eae7e7] shrink-0 bg-[#eae7e7]"
                          />
                          <div>
                            <p className="font-bold text-[#1c1b1b] leading-snug">{p.name}</p>
                            <div className="flex items-center gap-2 text-[11px] text-[#6c5b4c] mt-0.5">
                              <span className="font-mono">{p.sku}</span>
                              {p.tag && (
                                <span className="bg-[#4e051a]/10 text-[#4e051a] px-1.5 py-0.2 rounded text-[9px] font-bold">
                                  {p.tag}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <span className="bg-[#f6f3f2] text-[#544244] px-2 py-0.5 rounded text-[11px] font-medium">
                            {p.category}
                          </span>
                        </td>

                        <td className="py-3 px-4 font-serif font-bold text-[#4e051a]">
                          {formatINR(p.price)}
                          {p.originalPrice && p.originalPrice > p.price && (
                            <span className="block text-[10.5px] font-sans text-[#877274] line-through font-normal">
                              {formatINR(p.originalPrice)}
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-4 font-mono font-bold text-[#1c1b1b]">
                          {p.stockCount} units
                        </td>

                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 text-[9.5px] uppercase font-bold rounded ${
                              p.stockCount < 10
                                ? 'bg-red-100 text-red-800'
                                : p.stockCount < 25
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {p.stockCount < 10 ? 'Low Stock' : 'In Stock'}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            {/* Stock - */}
                            <button
                              onClick={() => onUpdateStock(p.id, Math.max(0, p.stockCount - 5))}
                              className="w-6 h-6 bg-[#f0eded] hover:bg-[#eae7e7] text-[#4e051a] font-bold text-xs flex items-center justify-center rounded-xs cursor-pointer"
                              title="Deduct 5 stock"
                            >
                              -
                            </button>
                            {/* Stock + */}
                            <button
                              onClick={() => onUpdateStock(p.id, p.stockCount + 10)}
                              className="w-6 h-6 bg-[#4e051a] hover:bg-[#6b1d2f] text-white font-bold text-xs flex items-center justify-center rounded-xs cursor-pointer"
                              title="Add 10 stock"
                            >
                              +
                            </button>

                            {/* Edit */}
                            <button
                              onClick={() => handleStartEdit(p)}
                              className="p-1 text-[#6c5b4c] hover:text-[#4e051a] hover:bg-black/5 rounded-xs transition-colors cursor-pointer ml-1"
                              title="Edit Product"
                            >
                              <span className="material-symbols-outlined text-[17px]">edit</span>
                            </button>

                            {/* Delete */}
                            {onDeleteProduct && (
                              <button
                                onClick={() => {
                                  onDeleteProduct(p.id);
                                  onShowToast(`Removed "${p.name}" from catalog.`);
                                }}
                                className="p-1 text-[#ba1a1a] hover:text-red-700 hover:bg-red-50 rounded-xs transition-colors cursor-pointer"
                                title="Delete Product"
                              >
                                <span className="material-symbols-outlined text-[17px]">delete</span>
                              </button>
                            )}

                            {/* View Live PDP */}
                            {onNavigateToPDP && (
                              <button
                                onClick={() => onNavigateToPDP(p)}
                                className="p-1 text-[#4e051a] hover:bg-[#4e051a]/10 rounded-xs transition-colors cursor-pointer"
                                title="View on Storefront"
                              >
                                <span className="material-symbols-outlined text-[17px]">visibility</span>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
