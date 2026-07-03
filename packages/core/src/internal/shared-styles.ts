import { css } from 'lit';

/**
 * Shared host primitives. Every component imports this so focus rings,
 * box-sizing, and font inheritance are consistent. Components reference
 * ONLY --yds-* CSS variables (with sensible fallbacks) — never raw hex.
 */
export const sharedStyles = css`
  :host {
    box-sizing: border-box;
    font-family: var(--yds-font-family-base, Inter, system-ui, sans-serif);
  }
  :host *,
  :host *::before,
  :host *::after {
    box-sizing: border-box;
  }
  :host([hidden]) {
    display: none !important;
  }
  .focus-ring:focus-visible {
    outline: none;
    border-color: var(--yds-color-border-focus, #81aff2);
    box-shadow: 0 0 0 3px var(--yds-color-focus-ring, rgba(129, 175, 242, 0.45));
  }
`;
