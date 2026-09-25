import { Product } from '../types';
import imgPureLaceBra from '../assets/images/pure_lace_bra_1790157170886.jpg';
import imgMinimizerBra from '../assets/images/minimizer_bra_1790157968636.jpg';
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

// Supporting gallery images for high-fidelity multi-angle views
import imgPushUpBra from '../assets/images/push_up_bra_1790157271587.jpg';
import imgStraplessCorsetBra from '../assets/images/strapless_corset_bra_1790157929829.jpg';
import imgIndianLaceHero from '../assets/images/indian_lace_hero_1790336160254.jpg';
import imgCloviaBraBanner from '../assets/images/clovia_bra_banner_1790336287877.jpg';
import imgCloviaLoungeBanner from '../assets/images/clovia_lounge_banner_1790336302362.jpg';
import imgCloviaBridalBanner from '../assets/images/clovia_bridal_banner_1790336312147.jpg';

// Category style expansion image assets
import imgPantyThongLace from '../assets/images/panty_thong_lace_1790339606990.jpg';
import imgPantyHighwaistBrief from '../assets/images/panty_highwaist_brief_1790339619193.jpg';
import imgPantyBoyshortModal from '../assets/images/panty_boyshort_modal_1790339644676.jpg';
import imgCamisolePaddedBra from '../assets/images/camisole_padded_bra_1790339660503.jpg';
import imgCamisoleMaxiSlip from '../assets/images/camisole_maxi_slip_1790339675955.jpg';
import imgShapewearThighSlimmer from '../assets/images/shapewear_thigh_slimmer_1790339690995.jpg';
import imgShapewearWaistCincher from '../assets/images/shapewear_waist_cincher_1790339709282.jpg';
import imgSleepwearPajamaSilk from '../assets/images/sleepwear_pajama_silk_1790339724064.jpg';
import imgBridalRobeCathedral from '../assets/images/bridal_robe_cathedral_1790339740316.jpg';
import imgSetsBabydollSheer from '../assets/images/sets_babydoll_sheer_1790339754872.jpg';
import imgBraDeepPlunge from '../assets/images/bra_deep_plunge_1790339772587.jpg';

/**
 * Curated 2-Products Per Category Collection:
 * 100% Unique, dedicated, crystal-clear HD imagery for every single product.
 * Covers all essential Indian intimate categories:
 * - Bras & Bralettes (2)
 * - Panties & Briefs (2)
 * - Camisoles & Inner Slips (2)
 * - Sleepwear & Loungewear (2)
 * - Lingerie Sets (2)
 * - Shapewear & Saree Shapers (2)
 * - Bridal & Festive Intimates (2)
 */
export const INITIAL_PRODUCTS: Product[] = [
  // ==========================================
  // 1. BRAS & BRALETTES (2 Products)
  // ==========================================
  {
    id: 1,
    name: "Aurelia French Floral Lace Balconette Bra",
    category: "Bras",
    categoryDisplay: "Cup sizes: 32B to 38D • French Leavers Lace",
    tag: "BESTSELLER",
    price: 699,
    originalPrice: 1399,
    rating: 5.0,
    reviewsCount: 142,
    description: "Constructed with genuine Lyon leavers lace and flexible zero-dig titanium underwire for natural, unhurried lift. Designed to celebrate your authentic silhouette in sheer luxury.",
    sizes: ["32B", "34B", "34C", "36B", "36C", "38D"],
    colors: [
      { name: "Bordeaux Wine", hex: "#4e051a" },
      { name: "Champagne Nude", hex: "#e8d7c8" },
      { name: "Midnight Noir", hex: "#1c1b1b" }
    ],
    mainImage: imgPureLaceBra,
    galleryImages: [imgIndianLaceHero, imgPushUpBra],
    features: [
      "74% French Polyamide Chantilly, 18% Mulberry Silk Ribbon, 8% Elastane",
      "Featherlight memory foam 1/2 balcony cup lining for invisible natural lift",
      "Nickel-free Italian rose-gold sliders and triple hook-and-eye back closure",
      "Hypoallergenic OEKO-TEX certified skin-tested dye finish"
    ],
    stockCount: 184,
    sku: "SHE-AUR-9021",
    subType: "Balconette",
    isSale: true
  },
  {
    id: 2,
    name: "Second-Skin Seamless Wireless T-Shirt Bra",
    category: "Bras",
    categoryDisplay: "Cup sizes: 32A to 40C • Ultra-Soft Zero Wire",
    tag: "EVERYDAY LUXE",
    price: 499,
    originalPrice: 899,
    rating: 4.9,
    reviewsCount: 215,
    description: "Laser-cut ultrasonic bonded seams ensure zero dig-in under thin cotton kurtis, T-shirts and fitted tops. Breathable honeycomb core with ultra-soft micro-modal touch.",
    sizes: ["32B", "34B", "34C", "36B", "36C", "38C"],
    colors: [
      { name: "Champagne Nude", hex: "#e8d7c8" },
      { name: "Midnight Noir", hex: "#1c1b1b" },
      { name: "Pastel Blush", hex: "#ffdad8" }
    ],
    mainImage: imgMinimizerBra,
    galleryImages: [imgCloviaBraBanner, imgStraplessCorsetBra],
    features: [
      "Zero-wire ergonomic contour with patented 3D gel rib cage stabilizers",
      "Ultra-fine 40-gauge micro-modal lining for humid Indian weather",
      "Heat-bonded seamless edges that remain 100% invisible under sheer dresses",
      "Anti-bacterial OEKO-TEX certified breathable lining"
    ],
    stockCount: 140,
    sku: "SHE-SEC-1014",
    subType: "Wireless"
  },

  // ==========================================
  // 2. PANTIES & BRIEFS (2 Products)
  // ==========================================
  {
    id: 3,
    name: "Invisible Laser-Cut Seamless Hipster Panty (3-Pack)",
    category: "Panties",
    categoryDisplay: "Sizes: S to XXL • 0-No-Show Panty Lines",
    tag: "ESSENTIAL PACK",
    price: 549,
    originalPrice: 999,
    rating: 4.9,
    reviewsCount: 188,
    description: "Value pack of 3 ultra-stretch laser-cut hipster panties in everyday neutral tones. Zero elastic band pressure, absolutely no visible panty lines (VPL) under leggings, churidars, and trousers.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Trio Multi (Nude/Blush/Noir)", hex: "#e8d7c8" },
      { name: "All Midnight Noir", hex: "#1c1b1b" }
    ],
    mainImage: imgPantySeamlessPack,
    galleryImages: [imgPantySeamlessPack, imgMinimizerBra],
    features: [
      "85% Microfiber Polyamide, 15% Spandex with 100% pure organic cotton gusset",
      "True zero-edge bonded seams — guaranteed zero panty lines under tight clothing",
      "Moisture-wicking, 4-way stretch fabric engineered for all-day freshness",
      "Tagless itch-free comfort label"
    ],
    stockCount: 220,
    sku: "SHE-PNT-3011",
    subType: "Hipster",
    isSale: true
  },
  {
    id: 4,
    name: "Bordeaux Scalloped French Lace Low-Rise Bikini Brief",
    category: "Panties",
    categoryDisplay: "Sizes: S to XL • Sheer Chantilly Trim",
    tag: "LUXURY LACE",
    price: 399,
    originalPrice: 799,
    rating: 4.8,
    reviewsCount: 96,
    description: "Crafted with featherweight French floral scalloped lace, delicate gold charm accent, and ultra-soft cotton crotch lining. Sensuous low-rise bikini fit with gentle non-pinch waist.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Bordeaux Wine", hex: "#4e051a" },
      { name: "Midnight Noir", hex: "#1c1b1b" },
      { name: "Champagne Nude", hex: "#e8d7c8" }
    ],
    mainImage: imgPantyLaceBikini,
    galleryImages: [imgPantyLaceBikini, imgPureLaceBra],
    features: [
      "Imported floral scalloped Leavers lace with anti-fray edging",
      "Double-layered 100% breathable organic cotton hygienic gusset",
      "Low-rise hipster cut with medium cheeky coverage",
      "Handcrafted with Italian rose-gold emblem"
    ],
    stockCount: 165,
    sku: "SHE-PNT-3042",
    subType: "Bikini"
  },

  // ==========================================
  // 3. CAMISOLES & INNER SLIPS (2 Products)
  // ==========================================
  {
    id: 5,
    name: "Featherlight Modal Stretch Kurti Camisole",
    category: "Camisoles & Slips",
    categoryDisplay: "Sizes: S to 3XL • Adjustable Spaghetti Straps",
    tag: "WARDROBE STAPLE",
    price: 399,
    originalPrice: 699,
    rating: 4.9,
    reviewsCount: 310,
    description: "Essential inner spaghetti slip designed specially for Indian kurtis, suits, semi-sheer tops and blazers. Ultra-breathable Lenzing modal fabric ensures sweat-absorption and featherweight softness.",
    sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
    colors: [
      { name: "Champagne Nude", hex: "#e8d7c8" },
      { name: "Midnight Noir", hex: "#1c1b1b" },
      { name: "Pure White", hex: "#ffffff" }
    ],
    mainImage: imgCamisoleModalSlip,
    galleryImages: [imgCamisoleModalSlip, imgCloviaBraBanner],
    features: [
      "95% Micro-Modal, 5% Spandex for gentle 4-way contour stretch",
      "Flat-lock anti-chafing seams that sit flat under thin linen and georgette kurtis",
      "Adjustable rose-gold strap buckles for customized neckline depth",
      "Hip-length coverage that stays tucked in without rolling up"
    ],
    stockCount: 250,
    sku: "SHE-CAM-4010",
    subType: "Camisole",
    isSale: true
  },
  {
    id: 6,
    name: "Mulberry Silk Chemise Slip with Chantilly Lace Trim",
    category: "Camisoles & Slips",
    categoryDisplay: "Sizes: S to XXL • 22-Momme Organic Silk",
    tag: "HANDCRAFTED",
    price: 899,
    originalPrice: 1799,
    rating: 5.0,
    reviewsCount: 174,
    description: "Indulgent pure mulberry silk slip dress with delicate French lace along the neckline. Can be worn as an opulent inner slip under gowns and sarees or as a luxurious boudoir loungewear chemise.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Dusty Rose Pink", hex: "#ffd9dd" },
      { name: "Champagne Nude", hex: "#e8d7c8" },
      { name: "Midnight Noir", hex: "#1c1b1b" }
    ],
    mainImage: imgSilkChemiseSlip,
    galleryImages: [imgSilkChemiseSlip, imgSilkNightieSlip],
    features: [
      "Grade 6A Mulberry Silk with 22-Momme weight for liquid-drape luxury",
      "Natural silk amino acids promote skin hydration while you sleep",
      "French scalloped lace bustier with adjustable bias-cut drape",
      "French-seamed interior finishes preventing thread friction"
    ],
    stockCount: 95,
    sku: "SHE-SLP-4088",
    subType: "Full Slip"
  },

  // ==========================================
  // 4. SLEEPWEAR & LOUNGEWEAR (2 Products)
  // ==========================================
  {
    id: 7,
    name: "Champagne Nude Silk Nightie Slip & Loungewear",
    category: "Sleepwear",
    categoryDisplay: "Sizes: S to XXL • Fluid Bias-Cut Drape",
    tag: "BESTSELLER",
    price: 799,
    originalPrice: 1499,
    rating: 4.9,
    reviewsCount: 160,
    description: "Lustrous high-grade silk nightie slip tailored on the true bias to gently skim curves without clinging. Features a graceful V-neckline and slender adjustable straps.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Champagne Nude", hex: "#e8d7c8" },
      { name: "Bordeaux Wine", hex: "#4e051a" },
      { name: "Midnight Noir", hex: "#1c1b1b" }
    ],
    mainImage: imgSilkNightieSlip,
    galleryImages: [imgSilkNightieSlip, imgCloviaLoungeBanner],
    features: [
      "100% Mulberry silk satin with lustrous natural sheen",
      "Deep V-back silhouette with criss-cross delicate ties",
      "Temperature-regulating thermo-conductive natural fibers",
      "Discreet side slit for effortless fluidity"
    ],
    stockCount: 112,
    sku: "SHE-SLP-5022",
    subType: "Nightdress",
    isSale: true
  },
  {
    id: 8,
    name: "Emerald Luxe Silk Robe & Chemise Set",
    category: "Sleepwear",
    categoryDisplay: "Sizes: Free Size • Silk Kimono Wrap",
    tag: "LIMITED EDITION",
    price: 1299,
    originalPrice: 2499,
    rating: 5.0,
    reviewsCount: 88,
    description: "Regal emerald green pure silk lounge robe paired with matching inner chemise. Wide kimono sleeves and detachable sash belt provide ultimate royal comfort for relaxing at home.",
    sizes: ["Free Size (S to XXL)"],
    colors: [
      { name: "Emerald Green", hex: "#1b4d3e" },
      { name: "Bordeaux Wine", hex: "#4e051a" }
    ],
    mainImage: imgIndianSilkHero,
    galleryImages: [imgIndianSilkHero, imgCloviaLoungeBanner],
    features: [
      "Dual-piece ensemble: Kimono Dressing Gown + Bias-cut Chemise",
      "Generous wrap-around fit with interior anchor ties",
      "Deep patch pockets with French seam detailing",
      "Includes embroidered velvet travel storage pouch"
    ],
    stockCount: 70,
    sku: "SHE-SLP-5090",
    subType: "Robe Set"
  },

  // ==========================================
  // 5. LINGERIE SETS (2 Products)
  // ==========================================
  {
    id: 9,
    name: "Noir Corded Lace Bralette & Suspender Set",
    category: "Lingerie Sets",
    categoryDisplay: "Cup sizes: 32B to 38D • Includes Matching Brief",
    tag: "COUTURE ICON",
    price: 999,
    originalPrice: 1999,
    rating: 5.0,
    reviewsCount: 154,
    description: "Dramatic French noir corded lace set featuring an underwired lace balconette bralette, matching scalloped lace hipster brief, and detachable suspender garter harness.",
    sizes: ["32B", "34B", "34C", "36B", "36C", "38D"],
    colors: [
      { name: "Midnight Noir", hex: "#1c1b1b" },
      { name: "Bordeaux Wine", hex: "#4e051a" }
    ],
    mainImage: imgLingerieSetNoir,
    galleryImages: [imgLingerieSetNoir, imgPureLaceBra],
    features: [
      "Complete 3-piece coordinated lingerie set",
      "Detachable satin suspender garters with silicone grip fastenings",
      "Rose-gold plated custom hooks and eyelets",
      "Reinforced zero-dig underwire casing"
    ],
    stockCount: 92,
    sku: "SHE-SET-6012",
    subType: "3-Piece Set",
    isSale: true
  },
  {
    id: 10,
    name: "Royal Navy Coordinated 2-Piece Lace Set",
    category: "Lingerie Sets",
    categoryDisplay: "Cup sizes: 32B to 36D • Bralette + Boy-Short",
    tag: "TRENDING",
    price: 849,
    originalPrice: 1699,
    rating: 4.9,
    reviewsCount: 126,
    description: "Everyday luxury 2-piece set in rich royal navy blue lace. Features an unlined wireless longline bralette offering soft support paired with high-comfort boy-short briefs.",
    sizes: ["32B", "34B", "34C", "36B", "36C"],
    colors: [
      { name: "Royal Navy", hex: "#1b2a47" },
      { name: "Bordeaux Wine", hex: "#4e051a" }
    ],
    mainImage: imgCloviaMatchingSetsHero,
    galleryImages: [imgCloviaMatchingSetsHero, imgIndianLaceHero],
    features: [
      "Plush micro-elastic band with zero roll-up silicone grip",
      "Wireless racer-back conversion clasp option",
      "Breathable geometric floral lace that stays flat under outfits",
      "100% organic cotton inner cups and gusset lining"
    ],
    stockCount: 110,
    sku: "SHE-SET-6055",
    subType: "2-Piece Set"
  },

  // ==========================================
  // 6. SHAPEWEAR & SAREE SHAPERS (2 Products)
  // ==========================================
  {
    id: 11,
    name: "Hourglass Tummy Control Sculpting Body Shaper",
    category: "Shapewear",
    categoryDisplay: "Sizes: S to 3XL • Targeted Midriff Compression",
    tag: "INSTANT SLIM",
    price: 699,
    originalPrice: 1299,
    rating: 4.9,
    reviewsCount: 240,
    description: "High-compression seamless bodysuit that targets the tummy, waistline, and back bulge. Instant 2-inch waist reduction under bodycon western dresses, suits, and evening gowns.",
    sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
    colors: [
      { name: "Champagne Nude", hex: "#e8d7c8" },
      { name: "Midnight Noir", hex: "#1c1b1b" }
    ],
    mainImage: imgSculptingShapewear,
    galleryImages: [imgSculptingShapewear, imgMinimizerBra],
    features: [
      "PowerNet multi-zone compression panels with zero breathing restriction",
      "Anti-roll silicone grip strips along the upper torso ribbing",
      "Open-gusset ergonomic closure for hassle-free washroom visits",
      "Open-bust design to wear with your own favorite bra"
    ],
    stockCount: 175,
    sku: "SHE-SHP-7023",
    subType: "Body Shaper",
    isSale: true
  },
  {
    id: 12,
    name: "Seamless Mermaid Saree Silhouette Shaper Skirt",
    category: "Shapewear",
    categoryDisplay: "Sizes: S to XXL • Side Slit Easy Walking",
    tag: "MUST HAVE",
    price: 649,
    originalPrice: 1199,
    rating: 5.0,
    reviewsCount: 380,
    description: "The ultimate modern replacement for bulky cotton petticoats! Mermaid flaring at hem allows full ease of sitting, dancing, and walking while giving a flawless slim silhouette under heavy Kanjivaram and georgette sarees.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Royal Plum", hex: "#3e1c2e" },
      { name: "Champagne Nude", hex: "#e8d7c8" },
      { name: "Midnight Noir", hex: "#1c1b1b" },
      { name: "Ruby Maroon", hex: "#6b1d2f" }
    ],
    mainImage: imgSareeShaper,
    galleryImages: [imgSareeShaper, imgSculptingShapewear],
    features: [
      "Replaces bulky drawstring petticoats with zero waistband digging",
      "Knitted seamless microfiber fabric that firmly holds heavy silk sarees up to 1.5kg",
      "Bottom side-slit for effortless walking, climbing stairs, and car seating",
      "Targeted thigh and hip contouring for an elegant mermaid drape"
    ],
    stockCount: 290,
    sku: "SHE-SHP-7088",
    subType: "Saree Shaper"
  },

  // ==========================================
  // 7. BRIDAL & FESTIVE INTIMATES (2 Products)
  // ==========================================
  {
    id: 13,
    name: "Imperial Crimson Velvet Bridal Corset & Robe",
    category: "Bridal",
    categoryDisplay: "Sizes: 32B to 38DD • Zardozi Gold Trim",
    tag: "BRIDAL TROUSSEAU",
    price: 1499,
    originalPrice: 2999,
    rating: 5.0,
    reviewsCount: 118,
    description: "Masterpiece bridal trousseau corset crafted in rich royal crimson velvet with hand-embroidered antique gold zardozi thread accents. Designed for Indian wedding trousseau boxes and honeymoon glam.",
    sizes: ["32B", "34B", "34C", "36B", "36C", "38D"],
    colors: [
      { name: "Imperial Crimson", hex: "#6b1d2f" },
      { name: "Midnight Noir", hex: "#1c1b1b" }
    ],
    mainImage: imgIndianBridalHero,
    galleryImages: [imgIndianBridalHero, imgCloviaBridalBanner],
    features: [
      "Opulent plush velvet with flexible spiral steel boning for posture support",
      "Genuine gold thread metallic embroidery along the neckline",
      "Includes matching sheer crimson silk-chiffon wrap kimono",
      "Comes in heirloom She Emporium bridal trousseau keepsake trunk"
    ],
    stockCount: 65,
    sku: "SHE-BRL-8012",
    subType: "Bridal Corset",
    isSale: true
  },
  {
    id: 14,
    name: "Ivory Chantilly Lace Bridal Balconette Set",
    category: "Bridal",
    categoryDisplay: "Sizes: 32B to 36C • Seed Pearl Accents",
    tag: "HEIRLOOM",
    price: 1199,
    originalPrice: 2199,
    rating: 4.9,
    reviewsCount: 94,
    description: "Pure ivory French Chantilly lace balconette bra with matching lace bikini brief, adorned with hand-stitched seed pearl details. The ultimate bridal honeymoon set.",
    sizes: ["32B", "34B", "34C", "36B", "36C"],
    colors: [
      { name: "Heirloom Ivory", hex: "#fcf9f8" },
      { name: "Champagne Nude", hex: "#e8d7c8" }
    ],
    mainImage: imgBridalLingerieSet,
    galleryImages: [imgBridalLingerieSet, imgIndianBridalHero],
    features: [
      "Pure ivory imported Chantilly lace over sheer illusion mesh",
      "Hand-sewn freshwater seed pearls on center gore bridge",
      "Silicone-lined wings for optional strapless wear under wedding gowns",
      "Presented in an embossed rose-gold gift box"
    ],
    stockCount: 82,
    sku: "SHE-BRL-8045",
    subType: "Bridal Set"
  },

  // =========================================================================
  // ADDITIONAL CATEGORY EXPANSION PRODUCTS (Available in Category Screens)
  // =========================================================================

  // --- BRAS EXPANSION ---
  {
    id: 15,
    name: "Glamour Lift Gradient Push-Up Plunge Bra",
    category: "Bras",
    categoryDisplay: "Cup sizes: 32B to 36C • Gentle 1-Cup Lift",
    tag: "PUSH UP",
    price: 649,
    originalPrice: 1199,
    rating: 4.8,
    reviewsCount: 164,
    description: "Engineered with curved gradient foam cups for natural cleavage and smooth lift. Plunge front allows wear under deep-neck kurtis, blouses, and V-neck western outfits.",
    sizes: ["32B", "34B", "34C", "36B", "36C"],
    colors: [
      { name: "Crimson Berry", hex: "#6b1d2f" },
      { name: "Champagne Nude", hex: "#e8d7c8" },
      { name: "Midnight Noir", hex: "#1c1b1b" }
    ],
    mainImage: imgPushUpBra,
    galleryImages: [imgPushUpBra, imgPureLaceBra],
    features: [
      "Graduated foam crescent padding for natural upward lift",
      "Soft micro-sheen fabric with seamless cup silhouette",
      "Flexible underwire wrapped in double-brushed velvet channel",
      "Concealed side boning to smooth side bulges"
    ],
    stockCount: 110,
    sku: "SHE-GLM-3012",
    subType: "Push-Up",
    isSale: true
  },
  {
    id: 16,
    name: "Multiway Anti-Slip Strapless Bandeau Corset Bra",
    category: "Bras",
    categoryDisplay: "Cup sizes: 32B to 38C • 5-Way Convertible",
    tag: "STRAPLESS",
    price: 749,
    originalPrice: 1499,
    rating: 4.9,
    reviewsCount: 178,
    description: "Patented silicone grip lines the upper and lower bands so it stays firmly locked in place without slipping. Wear strapless, halter, cross-back, one-shoulder, or regular.",
    sizes: ["32B", "34B", "34C", "36B", "36C", "38C"],
    colors: [
      { name: "Champagne Nude", hex: "#e8d7c8" },
      { name: "Midnight Noir", hex: "#1c1b1b" }
    ],
    mainImage: imgStraplessCorsetBra,
    galleryImages: [imgStraplessCorsetBra, imgMinimizerBra],
    features: [
      "Medical-grade silicone grip ensures zero slipping during movement",
      "Includes both matching fabric straps and transparent clear straps",
      "Reinforced 4-hook back closure for ultimate stability",
      "Molded lightly contoured cups for a smooth, modest profile"
    ],
    stockCount: 95,
    sku: "SHE-STP-4401",
    subType: "Strapless",
    isSale: true
  },
  {
    id: 17,
    name: "Architectural Full-Coverage Minimizer Bra",
    category: "Bras",
    categoryDisplay: "Cup sizes: 34C to 40D • Reduces Bust by 1.5\"",
    tag: "MINIMIZER",
    price: 699,
    originalPrice: 1299,
    rating: 4.9,
    reviewsCount: 192,
    description: "Specifically engineered for fuller busts to distribute tissue comfortably and reduce bust projection by up to 1.5 inches without flattening. Wide cushioned straps prevent shoulder grooves.",
    sizes: ["34C", "34D", "36C", "36D", "38C", "38D", "40C", "40D"],
    colors: [
      { name: "Muted Taupe", hex: "#c2b4a5" },
      { name: "Midnight Noir", hex: "#1c1b1b" }
    ],
    mainImage: imgMinimizerBra,
    galleryImages: [imgMinimizerBra, imgPureLaceBra],
    features: [
      "Non-padded double-layered molded cups reduce button-gaping on shirts",
      "Ultra-wide 20mm cushioned shoulder straps to relieve upper back strain",
      "Breathable high-denier powernet wings for 360-degree back smoothing",
      "Enclosed flexi-underwires with zero skin poke guarantee"
    ],
    stockCount: 128,
    sku: "SHE-MIN-7819",
    subType: "Minimizer"
  },
  {
    id: 18,
    name: "Rose Champagne Deep Plunge Underwire Bra",
    category: "Bras",
    categoryDisplay: "Cup sizes: 32B to 36C • Deep Low-Cut Center",
    tag: "DEEP PLUNGE",
    price: 679,
    originalPrice: 1249,
    rating: 4.8,
    reviewsCount: 130,
    description: "Featuring an ultra-low center bridge designed for deep neckline bridal lehengas, plunging evening gowns, and party tops. Front rose-gold closure with silky smooth cups.",
    sizes: ["32B", "34B", "34C", "36B", "36C"],
    colors: [
      { name: "Rose Champagne", hex: "#eed5c5" },
      { name: "Midnight Noir", hex: "#1c1b1b" }
    ],
    mainImage: imgBraDeepPlunge,
    galleryImages: [imgBraDeepPlunge, imgPureLaceBra],
    features: [
      "Ultra-low U-shaped center gore wire for maximum plunging necklines",
      "Smooth micro-shimmer fabric invisible under delicate fabrics",
      "Rose-gold front swan-hook closure for easy on and off",
      "Convertible racerback criss-cross strap positioning"
    ],
    stockCount: 88,
    sku: "SHE-PLG-5510",
    subType: "Plunge",
    isSale: true
  },

  // --- PANTIES EXPANSION ---
  {
    id: 19,
    name: "Seamless High-Waist Tummy-Smoothing Brief",
    category: "Panties",
    categoryDisplay: "Sizes: M to 3XL • Light Midriff Smoothing",
    tag: "TUMMY CONTROL",
    price: 449,
    originalPrice: 799,
    rating: 4.8,
    reviewsCount: 154,
    description: "High-waist contour brief with dual-layer abdominal control band. Flattens lower belly bulges comfortably without pinching, with 100% organic cotton gusset for all-day freshness.",
    sizes: ["M", "L", "XL", "XXL", "3XL"],
    colors: [
      { name: "Blush Nude", hex: "#e8d7c8" },
      { name: "Midnight Noir", hex: "#1c1b1b" }
    ],
    mainImage: imgPantyHighwaistBrief,
    galleryImages: [imgPantyHighwaistBrief, imgPantySeamlessPack],
    features: [
      "Dual-layered elastic-free waistband sits right below the rib cage",
      "Zero dig-in leg openings prevent visible panty lines under trousers",
      "100% organic combed cotton inner gusset for skin health",
      "Anti-roll micro-ribbing ensures it stays in place all day"
    ],
    stockCount: 175,
    sku: "SHE-PNT-HW01",
    subType: "High-Waist",
    isSale: true
  },
  {
    id: 20,
    name: "Velvet Trim Scalloped Lace Low-Rise Thong",
    category: "Panties",
    categoryDisplay: "Sizes: S to XL • 100% Zero-Line Cut",
    tag: "NO-SHOW THONG",
    price: 399,
    originalPrice: 699,
    rating: 4.7,
    reviewsCount: 98,
    description: "Gossamer sheer French scalloped lace with ultra-thin string sides. Created to be entirely invisible under satin slip skirts, bodycon lehengas, and tight jeans.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Dusty Rose & Wine", hex: "#6b1d2f" },
      { name: "Midnight Noir", hex: "#1c1b1b" }
    ],
    mainImage: imgPantyThongLace,
    galleryImages: [imgPantyThongLace, imgPantyLaceBikini],
    features: [
      "Featherlight French stretch lace hugs hips with zero tension",
      "Narrow T-back string cut for total panty line invisibility",
      "Pure cotton antibacterial gusset lining",
      "Soft velvet waistband detail for romantic elegance"
    ],
    stockCount: 140,
    sku: "SHE-PNT-TH02",
    subType: "Thong"
  },
  {
    id: 21,
    name: "Ultra-Soft Modal Ribbed Anti-Chafing Boy Shorts",
    category: "Panties",
    categoryDisplay: "Sizes: S to XXL • Anti-Thigh Chafing",
    tag: "COMFORT LOUNGE",
    price: 479,
    originalPrice: 849,
    rating: 4.9,
    reviewsCount: 167,
    description: "Engineered with breathable Austrian modal fabric and extended leg length to stop inner-thigh chafing under heavy sarees, lehengas, and everyday dresses.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Heather Beige", hex: "#e4d9d0" },
      { name: "Charcoal Grey", hex: "#313030" }
    ],
    mainImage: imgPantyBoyshortModal,
    galleryImages: [imgPantyBoyshortModal, imgPantySeamlessPack],
    features: [
      "95% Lenzing Modal, 5% Spandex for cloud-soft touch",
      "4-inch inseam prevents inner thigh rubbing in warm weather",
      "Seamless tag-free inner construction avoids skin irritation",
      "Can be worn as loungewear, sleep shorts, or under-dress liners"
    ],
    stockCount: 160,
    sku: "SHE-PNT-BS03",
    subType: "Boy Shorts"
  },

  // --- CAMISOLES & INNER SLIPS EXPANSION ---
  {
    id: 22,
    name: "2-in-1 Built-In Padded Wire-Free Camisole",
    category: "Camisoles & Slips",
    categoryDisplay: "Sizes: S to XL • Built-In Foam Cups",
    tag: "2-IN-1 CAMI",
    price: 599,
    originalPrice: 1099,
    rating: 4.9,
    reviewsCount: 143,
    description: "No separate bra needed! Features built-in contour cups with an underbust support band and delicate lace sweetheart neckline that looks stunning under shirts and kurtis.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Ivory Cream", hex: "#fcf9f8" },
      { name: "Midnight Noir", hex: "#1c1b1b" }
    ],
    mainImage: imgCamisolePaddedBra,
    galleryImages: [imgCamisolePaddedBra, imgCamisoleModalSlip],
    features: [
      "Built-in seamless molded bra cups for modesty and smooth shape",
      "Concealed elastic chest band gives gentle wire-free support",
      "Premium modal spandex blend with 4-way stretch",
      "Adjustable rose-gold shoulder sliders"
    ],
    stockCount: 120,
    sku: "SHE-CAM-PD01",
    subType: "Padded Camisole",
    isSale: true
  },
  {
    id: 23,
    name: "Full-Length Anarkali Maxi Kurti Slip",
    category: "Camisoles & Slips",
    categoryDisplay: "Sizes: Free (S-XL), Plus (2XL-4XL) • Ankle Length",
    tag: "MAXI SLIP",
    price: 699,
    originalPrice: 1299,
    rating: 4.8,
    reviewsCount: 112,
    description: "Ankle-length anti-static fluid slip designed specifically for sheer georgette, chiffon, net, and chikankari long anarkalis and maxi gowns. Generous side slits ensure free movement.",
    sizes: ["Free Size (S-XL)", "Plus (2XL-4XL)"],
    colors: [
      { name: "Champagne Nude", hex: "#e8d7c8" },
      { name: "Crisp White", hex: "#ffffff" },
      { name: "Midnight Noir", hex: "#1c1b1b" }
    ],
    mainImage: imgCamisoleMaxiSlip,
    galleryImages: [imgCamisoleMaxiSlip, imgSilkChemiseSlip],
    features: [
      "Anti-cling, anti-static micro-satin fabric that glides with your dress",
      "Generous 12-inch side slits for easy walking and sitting",
      "Calibrated length prevents slip from peeking beneath anarkali hems",
      "Machine washable with quick-drying microfibers"
    ],
    stockCount: 105,
    sku: "SHE-CAM-MX02",
    subType: "Maxi Slip"
  },

  // --- LINGERIE SETS EXPANSION ---
  {
    id: 24,
    name: "Romantic Blush Chiffon Babydoll & Cheeky Panty Set",
    category: "Lingerie Sets",
    categoryDisplay: "Sizes: S to XL • 2-Piece Sheer Set",
    tag: "BABYDOLL",
    price: 1299,
    originalPrice: 2499,
    rating: 4.9,
    reviewsCount: 128,
    description: "Airy sheer pleated chiffon babydoll dress with French corded lace triangle cups, satin ribbon bow, and matching lace cheeky panty in blushing dusty rose.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Blush Rose", hex: "#ffdad8" },
      { name: "Midnight Noir", hex: "#1c1b1b" }
    ],
    mainImage: imgSetsBabydollSheer,
    galleryImages: [imgSetsBabydollSheer, imgLingerieSetNoir],
    features: [
      "Floaty empire-waist silhouette that flatters every body type",
      "Scalloped French eyelash lace over open soft triangle cups",
      "Includes coordinated cheeky sheer lace brief",
      "Adjustable criss-cross spaghetti back straps"
    ],
    stockCount: 75,
    sku: "SHE-SET-BD01",
    subType: "Babydoll Set",
    isSale: true
  },

  // --- SHAPEWEAR EXPANSION ---
  {
    id: 25,
    name: "Seamless High-Waist Mid-Thigh Slimmer Shorts",
    category: "Shapewear",
    categoryDisplay: "Sizes: S-M, L-XL, 2XL-3XL • Thigh & Waist Slimmer",
    tag: "THIGH SLIMMER",
    price: 899,
    originalPrice: 1699,
    rating: 4.9,
    reviewsCount: 156,
    description: "Full midriff-to-mid-thigh sculpting shorts with targeted compression panels. Smooths love handles, sculpts the waist, and shapes thighs with non-roll silicone bands.",
    sizes: ["S-M", "L-XL", "2XL-3XL"],
    colors: [
      { name: "Honey Bronze Nude", hex: "#d8beaa" },
      { name: "Midnight Noir", hex: "#1c1b1b" }
    ],
    mainImage: imgShapewearThighSlimmer,
    galleryImages: [imgShapewearThighSlimmer, imgSculptingShapewear],
    features: [
      "High-waist band reaches just below the bra line with silicone grip",
      "Firm targeted abdominal compression flatters bodycon dresses",
      "Seamless leg edge leaves no visible ridge across thighs",
      "Breathable open-gusset design for effortless bathroom breaks"
    ],
    stockCount: 130,
    sku: "SHE-SHP-TH01",
    subType: "Thigh Slimmer",
    isSale: true
  },
  {
    id: 26,
    name: "Breathable Mesh Steel-Boned Hourglass Waist Cincher",
    category: "Shapewear",
    categoryDisplay: "Sizes: S to XXL • 4 Flexible Steel Bones",
    tag: "WAIST CINCHER",
    price: 999,
    originalPrice: 1899,
    rating: 4.9,
    reviewsCount: 142,
    description: "Instantly snatches 2-3 inches off your waistline with 4 flexible memory-steel bones and powernet mesh. Provides excellent lumbar posture support under sarees and lehengas.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Champagne Nude", hex: "#e8d7c8" },
      { name: "Midnight Noir", hex: "#1c1b1b" }
    ],
    mainImage: imgShapewearWaistCincher,
    galleryImages: [imgShapewearWaistCincher, imgSareeShaper],
    features: [
      "4 spiral memory-steel bones prevent rolling up or curling while sitting",
      "3-row stainless steel hook-and-eye closure for adjustable tightness",
      "Porous honeycomb mesh guarantees continuous air circulation",
      "Accelerates hourglass posture without restricting breathing"
    ],
    stockCount: 115,
    sku: "SHE-SHP-WC02",
    subType: "Waist Cincher"
  },

  // --- SLEEPWEAR EXPANSION ---
  {
    id: 27,
    name: "22-Momme Pure Mulberry Silk Pajama & Trouser Set",
    category: "Sleepwear",
    categoryDisplay: "Sizes: S to XL • Grade 6A Pure Mulberry Silk",
    tag: "SILK PAJAMA",
    price: 2499,
    originalPrice: 4599,
    rating: 5.0,
    reviewsCount: 88,
    description: "Tailored long-sleeve notch-collar silk shirt with contrast white piping, mother-of-pearl buttons, and fluid relaxed-fit drawstring trousers in deep midnight navy.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Midnight Navy", hex: "#1c2a38" },
      { name: "Champagne Pearl", hex: "#e8d7c8" }
    ],
    mainImage: imgSleepwearPajamaSilk,
    galleryImages: [imgSleepwearPajamaSilk, imgSilkNightieSlip],
    features: [
      "100% Grade 6A Pure 22-Momme Mulberry Silk with natural luster",
      "Temperature-regulating amino acid weave nourishes skin overnight",
      "Mother-of-pearl handcrafted buttons and contrast piping",
      "Elasticated back with silk drawstring front for custom comfort"
    ],
    stockCount: 65,
    sku: "SHE-SLP-PJ01",
    subType: "Pajama Set",
    isSale: true
  },

  // --- BRIDAL EXPANSION ---
  {
    id: 28,
    name: "Cathedral Satin Embroidered Bridal Kimono Robe",
    category: "Bridal",
    categoryDisplay: "Sizes: Free (S-XL), Plus (2XL-4XL) • Wedding Robe",
    tag: "BRIDAL ROBE",
    price: 1899,
    originalPrice: 3499,
    rating: 4.9,
    reviewsCount: 95,
    description: "Heavyweight pearl-white bridal satin with floral cathedral lace embroidery along the flared bell sleeves and scalloped sweep hem. Includes detachable wide satin sash belt.",
    sizes: ["Free Size (S-XL)", "Plus (2XL-4XL)"],
    colors: [
      { name: "Pearl White", hex: "#ffffff" },
      { name: "Champagne Gold", hex: "#f0dfcf" }
    ],
    mainImage: imgBridalRobeCathedral,
    galleryImages: [imgBridalRobeCathedral, imgBridalLingerieSet],
    features: [
      "Ultra-soft liquid bridal satin with elegant drape and sheen",
      "Intricate floral lace along kimono bell sleeves and hemline",
      "Inner tie closures ensure the robe stays securely wrapped",
      "Packaged in an embossed rose-gold bridal trousseau keepsake box"
    ],
    stockCount: 60,
    sku: "SHE-BRL-RB01",
    subType: "Bridal Robe",
    isSale: true
  }
];

export const CATEGORIES_LIST = [
  {
    id: 'Bras',
    name: 'Bras & Bralettes',
    tag: 'Balconette, Wireless, Plunge & Minimizer',
    startPrice: '₹499',
    desc: 'French lace balconettes, zero-dig T-shirt bras, push-up, strapless & full minimizers',
    image: imgPureLaceBra,
    colSpan: 'md:col-span-3 lg:col-span-4'
  },
  {
    id: 'Panties',
    name: 'Panties & Briefs',
    tag: 'Hipster, Bikini, Thong, High-Waist & Shorts',
    startPrice: '₹399',
    desc: 'Laser-cut zero-line hipsters, French lace bikinis, tummy control briefs, thongs & boy shorts',
    image: imgPantySeamlessPack,
    colSpan: 'md:col-span-3 lg:col-span-4'
  },
  {
    id: 'Camisoles & Slips',
    name: 'Camisoles & Inner Slips',
    tag: 'Kurti Slips, Padded Cami & Silk Chemises',
    startPrice: '₹399',
    desc: 'Modal stretch kurti slips, 2-in-1 padded camisoles, full-length anarkali maxi slips & silk slips',
    image: imgCamisoleModalSlip,
    colSpan: 'md:col-span-3 lg:col-span-4'
  },
  {
    id: 'Lingerie Sets',
    name: 'Couture Sets',
    tag: 'Garter Sets, 2-Piece & Babydoll Sets',
    startPrice: '₹849',
    desc: 'Noir lace garter sets, royal navy 2-piece sets, and romantic blush chiffon babydoll sets',
    image: imgLingerieSetNoir,
    colSpan: 'md:col-span-3 lg:col-span-4'
  },
  {
    id: 'Sleepwear',
    name: 'Mulberry Silk Sleepwear',
    tag: 'Nighties, Silk Pajama Sets & Kimono Robes',
    startPrice: '₹799',
    desc: 'Champagne bias-cut nighties, 22-momme pure silk pajama suits, and emerald lounge wraps',
    image: imgSilkNightieSlip,
    colSpan: 'md:col-span-3 lg:col-span-4'
  },
  {
    id: 'Shapewear',
    name: 'Shapewear & Saree Shapers',
    tag: 'Saree Shapers, Bodysuits & Waist Cinchers',
    startPrice: '₹649',
    desc: 'Instant hourglass bodysuits, mermaid saree silhouette shapers, thigh slimmers & steel-boned cinchers',
    image: imgSareeShaper,
    colSpan: 'md:col-span-3 lg:col-span-4'
  },
  {
    id: 'Bridal',
    name: 'Bridal Trousseau',
    tag: 'Velvet Corsets, Trousseau Sets & Robes',
    startPrice: '₹1,199',
    desc: 'Imperial crimson velvet corsets, ivory Chantilly trousseau sets, and cathedral satin bridal robes',
    image: imgIndianBridalHero,
    colSpan: 'md:col-span-6 lg:col-span-12'
  }
];
