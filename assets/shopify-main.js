window.adConfig = {
  pixelId: '{PixelId}'
};

(async function () {
  let count = 0;
  while (count < 10) {
    if (window["ShopifyPixelHelper"]) {
      window["ShopifyPixelHelper"].init(window.adConfig.pixelId);
      return;
    }
    await new Promise((res) => {
      setTimeout(() => res(), 1000)
    })
    count = count + 1;
  }
})();
