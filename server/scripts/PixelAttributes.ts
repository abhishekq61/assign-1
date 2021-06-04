//view->addtocart->initiatecheckout
export class PixelAttributes {
  //usually product group
  content_type?: string;
  //id of product
  content_ids?: number[];
  //amount
  value?: number;
  // no of products added to cart
  num_items?: number;
  //product name
  content_name?: string;
  currency?: string;
  content_category?: string;
  contents?: {
    id: string,
    quantity: number
  }[];

  [prop: string]: any;
}
