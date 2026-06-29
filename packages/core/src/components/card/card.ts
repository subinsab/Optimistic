import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../../internal/shared-styles.js';
import { cardStyles } from './card.styles.js';

/**
 * `<yds-card>` — content container.
 *
 * @slot eyebrow - Optional uppercase eyebrow label.
 * @slot title - Card title.
 * @slot - Body content.
 * @slot actions - Footer actions.
 * @csspart card - The card surface.
 */
@customElement('yds-card')
export class YdsCard extends LitElement {
  static styles = [sharedStyles, cardStyles];

  /** Tighter padding + radius. */
  @property({ type: Boolean, reflect: true }) compact = false;

  /** Adds hover elevation + pointer affordance. */
  @property({ type: Boolean, reflect: true }) interactive = false;

  render() {
    return html`
      <div part="card" class="card">
        <slot name="eyebrow"></slot>
        <slot name="title"></slot>
        <div class="body"><slot></slot></div>
        <slot name="actions"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'yds-card': YdsCard;
  }
}
