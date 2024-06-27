export default class PopoverGallery extends HTMLElement {
  declare linkEls: NodeListOf<HTMLAnchorElement>;

  connectedCallback(): void {
    if(this.isPopoverSupported()) {
      this.linkEls = this.querySelectorAll<HTMLAnchorElement>(":scope > a[id]");

      // Create popover with large image
      this.linkEls.forEach((linkEl) => {
        const altText= linkEl.querySelector("img[alt]")?.getAttribute("alt") ?? "";

        const popoverNode =  this.htmlAsNode(`
          <div id="${linkEl.id}-popover" class="popover-gallery--popover" popover>
            <button
              popovertarget="${linkEl.id}-popover"
              popovertargetaction="hide"
              class="popover-gallery--button">
              <span class="popover-gallery--visually-hidden">${this.dataset.popoverTextClose ?? "Close"}</span>
              <img src="${linkEl.getAttribute("href")}" alt="${altText}">
            </button>
          </div>
        `);

        this.append(popoverNode);
      });

      // Replace link with popover button
      this.linkEls.forEach((linkEl) => {
        const buttonEl = this.htmlAsNode(
          `
            <button class="popover-gallery--button" popovertarget="${linkEl.id}-popover" popovertargetaction="show">
              ${linkEl.innerHTML}
            </button>`);

        this.replaceChild(buttonEl, linkEl);
      });

      this.addStylesToPage();
    }
  }

  htmlAsNode(html: string): Node {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.cloneNode(true);
  }

  isPopoverSupported(): boolean {
    return (
      typeof HTMLElement !== 'undefined' &&
      typeof HTMLElement.prototype === 'object' &&
      'popover' in HTMLElement.prototype
    );
  }

  addStylesToPage(): void {
    // TODO Only style once!
    // language=css
    const css: string = `
      :root {

      }

      .popover-gallery--button {
        border: none;
        margin: 0;
        padding: 0;
        width: auto;
        overflow: visible;
        background: transparent;
        color: inherit;
        font: inherit;
        line-height: normal;
        -webkit-font-smoothing: inherit;
        -moz-osx-font-smoothing: inherit;
        -webkit-appearance: none;
      }

      [popovertargetaction="show"].popover-gallery--button {
        cursor: zoom-in;
      }

      [popovertargetaction="hide"].popover-gallery--button {
        cursor: zoom-out;
      }

      .popover-gallery--button img {
        display: block;
      }

      .popover-gallery--popover {
        box-sizing: border-box;
        background-color: transparent;
        margin-inline: auto;
        border: 0;
      }

      .popover-gallery--visually-hidden {
        position: absolute;
        overflow: hidden;
        width: 1px;
        height: 1px;
        white-space: nowrap;
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
      }

      .popover-gallery--popover img {
        display: block;
        max-height: 100dvh;
        max-width: 100%;
      }
    `;

    const stylesheet = new CSSStyleSheet();
    stylesheet.replaceSync(css)
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, stylesheet];
  }
}
