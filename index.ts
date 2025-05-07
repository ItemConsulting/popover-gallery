let cssIsLoaded = false;

export default class PopoverGallery extends HTMLElement {
  declare linkEls: NodeListOf<HTMLAnchorElement>;

  connectedCallback(): void {
    if(this.isPopoverSupported()) {
      this.linkEls = this.querySelectorAll<HTMLAnchorElement>(":scope > a[id]");

      // Create popover with large image
      this.linkEls.forEach((linkEl) => {
        const altText= linkEl.querySelector("img[alt]")?.getAttribute("alt") ?? "";
        const caption = linkEl.querySelector("figcaption")?.innerHTML ?
          `<figcaption>${ linkEl.querySelector("figcaption")?.innerHTML}</figcaption>`
          : "";

        const imageMarkup = `
          <figure>
            <img src="${linkEl.getAttribute("href")}" alt="${altText}">
            ${caption}
          </figure>`

        const popoverNode =  this.htmlAsNode(`
          <div id="${linkEl.id}-popover" class="popover-gallery--popover" popover>
            <button
              popovertarget="${linkEl.id}-popover"
              popovertargetaction="hide"
              class="popover-gallery--button">
              <span class="popover-gallery--visually-hidden">${this.dataset.popoverTextClose ?? "Close"}</span>
              ${imageMarkup}
            </button>
          </div>
        `);

        this.append(popoverNode);
      });

      // Replace link with popover button
      this.linkEls.forEach((linkEl) => {
        const attrs = linkEl.getAttributeNames()
          .filter((attrName) => !["href", "target", "class"].includes(attrName))
          .map((attrName) => `${attrName}="${linkEl.getAttribute(attrName)}"`, "")
          .join(" ");

        const buttonEl = this.htmlAsNode(
          `
            <button class="popover-gallery--button ${linkEl.className}" ${attrs} popovertarget="${linkEl.id}-popover" popovertargetaction="show">
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
    if (cssIsLoaded) {
      return;
    }
    cssIsLoaded = true;

    // language=css
    const css: string = `
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

      .popover-gallery--popover {
        padding: 0;

        img {
          max-height: 100dvh;
          max-width: 100vw;
        }

        figure {
          display: flex;
          flex-direction: column;
          height: 100dvh;
          width: 100vw;
          align-items: center;
          justify-content: center;

          img {
            display: block;
            max-width: 100%;
            max-height: 95%;
            width: auto;
            height: auto;
          }
        }

        figcaption {
          flex-shrink: 0;
          background-color: Canvas;
        }
      }
    `;

    const stylesheet = new CSSStyleSheet();
    stylesheet.replaceSync(css)
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, stylesheet];
  }
}
