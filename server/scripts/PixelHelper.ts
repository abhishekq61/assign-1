import {PredefinedEvents} from "./PredefinedEvents";
import {PixelAttributes} from "./PixelAttributes";

export class PixelHelper {
  constructor(private pixelId) {
  }

  init() {
    return new Promise((res) => {
      let fbFunction = (f, b, e, v, n, t, s) => {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod ?
            n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s)
      };
      fbFunction(window as any, document, 'script',
        'https://connect.facebook.net/en_US/fbevents.js', null, null, null);
      this.fbq('init', this.pixelId);
      this.fbq('track', 'PageView');
      res();
    })

  }

  track(eventName: string, eventData: PixelAttributes) {
    let isPredefined = this.isPredefinedEvent(eventName);
    let eventType = '';
    if (isPredefined) {
      eventType = 'trackSingle';
    } else {
      eventType = 'trackSingleCustom';
    }
    eventType = 'track'
    console.log(eventType, this.pixelId, eventName, eventData)
    this.fbq(eventType, eventName, eventData);
  }

  get fbq() {
    return (window as any).fbq;
  }

  isPredefinedEvent(eventName: any) {
    return !!PredefinedEvents[eventName]
  }

  //todo what is currency? shopcurrency or presentment currency
  async trackProductVisit(data: {
    content_ids: number[],
    value: number,
    content_name: string
    currency: string
  }) {
    this.track(PredefinedEvents[PredefinedEvents.ViewContent],
      Object.assign(data, {
        content_type: "product_group",
        content_category: null
      }))
  }

//todo : get count
  async trackAddToCart(data: {
    content_ids: number[]
    value: number
    num_items: number
    content_name: string
    currency: string
  }) {
    this.track(PredefinedEvents[PredefinedEvents.AddToCart],
      Object.assign(data, {
        content_type: "product_group",
        content_category: null
      }))
  }

  //todo: content name
  async trackPurchaseCompleted(data: {
    content_ids: number[]
    value: number
    num_items: number
    content_name: string
    currency: string
    contents: {
      id: string,
      quantity: number
    }[]
  }) {
    this.track(PredefinedEvents[PredefinedEvents.Purchase],
      Object.assign(data, {
        content_type: "product_group",
        content_category: null
      }))
  }
}
