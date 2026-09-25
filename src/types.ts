export type CategoryType = 'All' | 'Bras' | 'Panties' | 'Camisoles & Slips' | 'Lingerie Sets' | 'Sleepwear' | 'Shapewear' | 'Bridal' | 'New Arrivals' | 'Sale';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: number;
  name: string;
  category: 'Bras' | 'Panties' | 'Camisoles & Slips' | 'Lingerie Sets' | 'Sleepwear' | 'Shapewear' | 'Bridal';
  categoryDisplay: string;
  tag?: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  description: string;
  sizes: string[];
  colors: ProductColor[];
  mainImage: string;
  galleryImages: string[];
  features: string[];
  stockCount: number;
  sku: string;
  isNew?: boolean;
  isSale?: boolean;
  subType?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
}

export interface OrderDispatch {
  orderId: string;
  date: string;
  estimatedDelivery: string;
  carrier: string;
  status: 'Placed' | 'Discreetly Packed' | 'In Transit' | 'Delivered';
  currentHub: string;
  items: CartItem[];
  total: number;
  packagingMode: string;
}
