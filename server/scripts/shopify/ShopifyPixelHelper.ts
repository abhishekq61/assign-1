import {PixelHelper} from "../PixelHelper";
import {PredefinedEvents} from "../PredefinedEvents";
import {HelperUtils} from "../HelperUtils";
import {add} from "winston";
import {ShopifyCheckout} from "./ShopifyCheckout";

class ShopifyPixelHelper {
  private pixelHelper: PixelHelper;
  private pixelId: string;

  constructor() {
  }

  init(pixelId: string) {
    this.pixelHelper = new PixelHelper(pixelId);
    this.pixelId = pixelId;
    this.pixelHelper.init().then(x => {
      return this.startTracking();
    })
  }

  private async startTracking() {
    let url = window.location.href;
    if (url.includes("products")) {
      await this.trackProductVisit()
      this.setAddToCartListener()
    }
    if (url.includes("thank_you") || url.includes("orders")) {
      await this.trackPurchaseCompleted()
    }
  }

  private setAddToCartListener() {
    let addToCartButton = HelperUtils.getValue(() => document.getElementsByName('add')[0])
    if (addToCartButton) {
      addToCartButton.addEventListener('click', () => {
        this.trackAddToCart();
      })
    }
  }



  async trackProductVisit() {
    let product = await this.getCurrentPageProduct()
    await this.pixelHelper.trackProductVisit({
      content_ids: [product.id],
      value: this.getPrice(product),
      content_name: product.title,
      currency: this.getCurrency()
    })
  }

  async trackAddToCart() {
    let product = await this.getCurrentPageProduct()
    await this.pixelHelper.trackAddToCart({
      content_ids: [product.id],
      value: this.getPrice(product),
      num_items: 1,
      content_name: product.title,
      currency: this.getCurrency()
    })
  }


  async trackPurchaseCompleted() {
    let checkout: ShopifyCheckout = HelperUtils.getValue(() => (window as any).Shopify.checkout);
    console.log("a3")
    if (checkout) {
      console.log("a4")
      await this.pixelHelper.trackPurchaseCompleted({
        content_ids: checkout.line_items.map(x => x.product_id),
        value: Number(checkout.total_price_set.shop_money.amount),
        num_items: checkout.line_items.map(x => x.quantity).reduce((a, b) => a + b, 0),
        content_name: null,
        currency: checkout.total_price_set.shop_money.currency_code,
        contents:checkout.line_items.map(x =>{
          return {
            id:x.product_id,
            quantity:x.quantity
          }
        })
      })
    }
  }

  async getCurrentPageProduct(): Promise<ShopifyProduct> {
    let url = window.location.href.split('?')[0]
    let product = (await (await fetch(url + ".json")).json()).product;
    return product;
  }

  getPrice(product: ShopifyProduct) {
    let price = HelperUtils.getValue(() => product.variants[0].price);
    if (price) {
      return Number(price);
    }
    return;
  }

  getCurrency() {
    return HelperUtils.getValue(() => (window as any).Shopify.currency.active);
  }
}

export = new ShopifyPixelHelper();
