import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../../internal/shared-styles.js';
import { modalStyles } from './modal.styles.js';

export type ModalSize = 'sm' | 'md' | 'lg';

/**
 * `<yds-modal>` — centered dialog with overlay.
 *
 * @slot - Body content.
 * @slot footer - Footer actions (right-aligned).
 * @fires yds-close - Requested close (overlay click, Escape, or close button).
 * @csspart panel - The dialog panel.
 */
@customElement('yds-modal')
export class YdsModal extends LitElement {
  static styles = [sharedStyles, modalStyles];

  /** Controls visibility. */
  @property({ type: Boolean, reflect: true }) open = false;

  /** Dialog width. */
  @property({ reflect: true }) size: ModalSize = 'md';

  /** Accessible title (also rendered in the header). */
  @property() heading = '';

  /** Disable closing on overlay click / Escape. */
  @property({ type: Boolean, attribute: 'no-dismiss' }) noDismiss = false;

  connectedCallback() {
    super.connectedCallback();
    this._onKeydown = this._onKeydown.bind(this);
    document.addEventListener('keydown', this._onKeydown);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._onKeydown);
  }

  private _onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && this.open && !this.noDismiss) this._requestClose();
  }
  private _requestClose() {
    this.dispatchEvent(new CustomEvent('yds-close', { bubbles: true, composed: true }));
  }
  private _onOverlay(e: MouseEvent) {
    if (e.target === e.currentTarget && !this.noDismiss) this._requestClose();
  }

  render() {
    if (!this.open) return nothing;
    return html`
      <div class="overlay" @click=${this._onOverlay}>
        <div
          part="panel"
          class="panel"
          role="dialog"
          aria-modal="true"
          aria-label=${this.heading || nothing}
        >
          <div class="header">
            <span class="title">${this.heading}</span>
            <button class="close" aria-label="Close" @click=${this._requestClose}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </button>
          </div>
          <div class="body"><slot></slot></div>
          <div class="footer"><slot name="footer"></slot></div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'yds-modal': YdsModal;
  }
}
