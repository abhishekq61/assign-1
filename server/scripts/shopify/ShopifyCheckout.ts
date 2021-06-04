export interface TaxLine {
  price: string;
  rate: number;
  title: string;
  channel_liable: boolean;
}

export interface ShopMoney {
  amount: string;
  currency_code: string;
}

export interface PresentmentMoney {
  amount: string;
  currency_code: string;
}

export interface TotalPriceSet {
  shop_money: ShopMoney;
  presentment_money: PresentmentMoney;
}

export interface Properties {
}

export interface TaxLine2 {
  price: string;
  rate: number;
  title: string;
  channel_liable: boolean;
}

export interface LineItem {
  id: string;
  key: string;
  product_id: any;
  variant_id: any;
  sku: string;
  vendor: string;
  title: string;
  variant_title: string;
  image_url: string;
  taxable: boolean;
  requires_shipping: boolean;
  gift_card: boolean;
  price: string;
  compare_at_price: string;
  line_price: string;
  properties: Properties;
  quantity: number;
  grams: number;
  fulfillment_service: string;
  applied_discounts: any[];
  tax_lines: TaxLine2[];
}

export interface ShippingRate {
  handle: string;
  price: string;
  title: string;
  tax_lines: any[];
}

export interface ShippingAddress {
  id: number;
  first_name: string;
  last_name: string;
  phone?: any;
  company?: any;
  address1: string;
  address2: string;
  city: string;
  province: string;
  province_code: string;
  country: string;
  country_code: string;
  zip: string;
}

export interface CreditCard {
  first_name: string;
  last_name: string;
  first_digits: string;
  last_digits: string;
  brand: string;
  expiry_month: number;
  expiry_year: number;
  customer_id: number;
}

export interface BillingAddress {
  id: number;
  first_name: string;
  last_name: string;
  phone?: any;
  company?: any;
  address1: string;
  address2: string;
  city: string;
  province: string;
  province_code: string;
  country: string;
  country_code: string;
  zip: string;
}

export interface ShopifyCheckout {
  created_at: Date;
  currency: string;
  customer_id: number;
  customer_locale: string;
  email: string;
  location_id?: any;
  order_id: number;
  payment_due: string;
  payment_url: string;
  phone?: any;
  presentment_currency: string;
  reservation_time?: any;
  reservation_time_left: number;
  requires_shipping: boolean;
  source_name: string;
  source_identifier?: any;
  source_url?: any;
  subtotal_price: string;
  taxes_included: boolean;
  tax_exempt: boolean;
  tax_lines: TaxLine[];
  token: string;
  total_price: string;
  total_price_set: TotalPriceSet;
  total_tax: string;
  updated_at: Date;
  version: string;
  line_items: LineItem[];
  gift_cards: any[];
  shipping_rate: ShippingRate;
  shipping_address: ShippingAddress;
  credit_card: CreditCard;
  billing_address: BillingAddress;
  discount?: any;
}
