export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  variants: ProductVariant[];
  customizable: boolean;
  customizationOptions?: CustomizationOption[];
  printifyId?: string;
  printifyData?: PrintifyProduct;
  mockupImages?: string[];
  printAreas?: PrintArea[];
  tags?: string[];
  rating?: number;
  reviewCount?: number;
  bestseller?: boolean;
  new?: boolean;
  salePrice?: number;
  stockLevel?: 'in_stock' | 'low_stock' | 'out_of_stock';
}

export interface ProductVariant {
  id: string;
  name: string;
  color?: string;
  size?: string;
  price?: number; // Additional price if different from base
  inStock: boolean;
  printifyVariantId?: string;
  sku?: string;
  stockQuantity?: number;
}

export interface CustomizationOption {
  id: string;
  name: string;
  type: 'text' | 'image' | 'color' | 'position';
  required: boolean;
  options?: string[];
}

export interface PrintArea {
  id: string;
  name: string;
  width: number;
  height: number;
  position: 'front' | 'back' | 'left_sleeve' | 'right_sleeve' | 'other';
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  customization?: any;
  variant?: ProductVariant;
}

export interface User {
  id: string;
  name: string;
  email: string;
  address?: Address;
  orders?: Order[];
  wishlist?: string[];
  savedDesigns?: SavedDesign[];
}

export interface SavedDesign {
  id: string;
  name: string;
  productId: string;
  variantId: string;
  customization: any;
  previewImage: string;
  createdAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
  printifyOrderId?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  estimatedDelivery?: Date;
}

export interface PrintifyProduct {
  id: string;
  title: string;
  description: string;
  blueprint_id: string;
  print_provider_id: string;
  variants: PrintifyVariant[];
  print_areas: PrintifyPrintArea[];
  options: PrintifyOption[];
  images: PrintifyImage[];
  created_at: string;
  updated_at: string;
  visible: boolean;
  is_locked: boolean;
}

export interface PrintifyVariant {
  id: string;
  title: string;
  price: number;
  is_enabled: boolean;
  sku: string;
  options: Record<string, string>;
}

export interface PrintifyPrintArea {
  id: string;
  title: string;
  position: string;
  images: PrintifyImage[];
  placeholders: PrintifyPlaceholder[];
}

export interface PrintifyPlaceholder {
  position: string;
  height: number;
  width: number;
}

export interface PrintifyImage {
  id: string;
  file_name: string;
  preview_url: string;
  position: string;
  variant_ids: string[];
}

export interface PrintifyOption {
  id: string;
  title: string;
  type: string;
  values: PrintifyOptionValue[];
}

export interface PrintifyOptionValue {
  id: string;
  title: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: Date;
  verified: boolean;
  images?: string[];
  helpful: number;
  response?: {
    comment: string;
    date: Date;
  };
}