import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../../internal/shared-styles.js';
import { buttonStyles } from './button.styles.js';
import type { ButtonVariant, ButtonSize, ButtonType } from './button.types.js';

/**
 * `<yds-button>` — primary interactive control.
 *
 * @slot - Button label.
 * @slot start - Leading icon.
 * @slot end - Trailing icon.
 * @fires yds-click - Dispatched on activation (not fired when disabled/loading).
 * @csspart button - The native button element.
 */
@customElement('yds-button')
export class YdsButton extends LitElement {
  static styles = [sharedStyles, buttonStyles];

  /** Visual variant. */
  @property({ reflect: true }) variant: ButtonVariant = 'primary';

  /** Size. */
  @property({ reflect: true }) size: ButtonSize = 'md';

  /** Native button type. */
  @property() type: ButtonType = 'button';

  /** Disable the button. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Show a loading spinner and block interaction. */
  @property({ type: Boolean, reflect: true }) loading = false;

  /** Stretch to fill the container width. */
  @property({ type: Boolean, reflect: true, attribute: 'full-width' }) fullWidth = false;

  private _onClick(e: Event) {
    if (this.disabled || this.loading) {
      e.stopImmediatePropagation();
      e.preventDefault();
      return;
    }
    this.dispatchEvent(
      new CustomEvent('yds-click', { bubbles: true, composed: true }),
    );
  }

  render() {
    return html`
      <button
        part="button"
        class="btn"
        type=${this.type}
        ?disabled=${this.disabled || this.loading}
        aria-busy=${this.loading ? 'true' : nothing}
        @click=${this._onClick}
      >
        ${this.loading
          ? html`<span class="spinner" aria-hidden="true"></span>`
          : html`<slot name="start"></slot>`}
        <span class="label"><slot></slot></span>
        <slot name="end"></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'yds-button': YdsButton;
  }
}
