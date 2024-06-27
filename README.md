# Custom component for animating opening an image link in a popover

[![npm version](https://badge.fury.io/js/@itemconsulting%2Fpopover-gallery.svg)](https://badge.fury.io/js/@itemconsulting%2Fpopover-gallery)

A custom elements that replaces links to images with buttons that opens that image in a popover.

## Usage

Register the custom element with JavaScript.

```javascript
import PopoverGallery from "@itemconsulting/popover-gallery";

if (!window.customElements.get("popover-gallery")) {
  window.customElements.define("popover-gallery", PopoverGallery);
}
```

Use the custom element to wrap a set of images in links.

```html
<popover-gallery data-popover-text-close="Lukk">
  <a href="image1-large.jpg" id="pg-image-1" target="_blank">
    <img src="image1-thumb.jpg" alt="" />
  </a>

  <a href="image2-large.jpg" id="pg-image-2" target="_blank">
    <img src="image2-thumb.jpg" alt="" />
  </a>
</popover-gallery>
```
