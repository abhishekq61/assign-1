interface ShopifyProduct {
  id: number;
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  created_at: string;
  handle: string;
  updated_at: string;
  published_at: string;
  template_suffix?: any;
  published_scope: string;
  tags: string;
  variants: Variant[];
  options: Option[];
  images: Image[];
  image: Image;
}

interface Image {
  id: number;
  product_id: number;
  position: number;
  created_at: string;
  updated_at: string;
  alt?: any;
  width: number;
  height: number;
  src: string;
  variant_ids: any[];
}

interface Option {
  id: number;
  product_id: number;
  name: string;
  position: number;
  values: string[];
}

interface Variant {
  id: number;
  product_id: number;
  title: string;
  price: string;
  sku: string;
  position: number;
  compare_at_price: string;
  fulfillment_service: string;
  inventory_management: string;
  option1: string;
  option2: string;
  option3?: any;
  created_at: string;
  updated_at: string;
  taxable: boolean;
  barcode?: any;
  grams: number;
  image_id?: any;
  weight: number;
  weight_unit: string;
  requires_shipping: boolean;
}
