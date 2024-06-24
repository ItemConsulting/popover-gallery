import type { Meta, StoryObj } from '@storybook/web-components';
import PopoverGallery from "./index";

window.customElements.define("popover-gallery", PopoverGallery);

type PopoverGalleryArgs = {
  popoverClose?: string;
  popoverCloseAriaLabel?: string;
}

export default {
  title: 'Popover Gallery',
  render: (args): string => `
    <popover-gallery
      data-popover-close="${args.popoverClose}"
      data-popover-close-aria-label="${args.popoverCloseAriaLabel}">

      <a href="eggman.jpg" id="pg-image-1" target="_blank">
        <img src="eggman-thumb.jpg" alt="Eggman" />
      </a>

      <a href="capman.jpg" id="pg-image-2" target="_blank">
        <img src="capman-thumb.jpg" alt="Capman" />
      </a>
    </popover-gallery>
    `,
} satisfies Meta<PopoverGalleryArgs>

export const popoverGallery: StoryObj<PopoverGalleryArgs> = {
  args: {
    popoverClose: "×",
    popoverCloseAriaLabel: "Close",
  },
};
