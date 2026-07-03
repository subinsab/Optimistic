import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../../internal/shared-styles.js';
import { badgeStyles } from './badge.styles.js';

export type BadgeVariant = 'neutral' | 'success' | 'error' | 'warning' | 'info';

/**
 * `<yds-badge>` — compact status label.
 *
 * @slot - Badge text.
 * @csspart badge - The badge container.
 */
@customElement('yds-badge')
export class YdsBadge extends LitElement {
  static styles = [sharedStyles, badgeStyles];

  /** Feedback variant. */
  @property({ reflect: true }) variant: BadgeVariant = 'neutral';

  /** Render a leading status dot. */
  @property({ type: Boolean }) dot = false;

  render() {
    return html`
      <span part="badge" class="badge">
        ${this.dot ? html`<span class="dot" aria-hidden="true"></span>` : nothing}
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'yds-badge': YdsBadge;
  }
}
