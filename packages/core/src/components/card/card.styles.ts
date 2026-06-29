import { css } from 'lit';

export const cardStyles = css`
  :host {
    display: block;
  }
  .card {
    display: flex;
    flex-direction: column;
    background: var(--yds-card-bg, #fff);
    border: 1px solid var(--yds-card-border, #e3e8ef);
    border-radius: var(--yds-card-radius, 12px);
    padding: var(--yds-card-padding, 24px);
    box-shadow: var(--yds-card-shadow, 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06));
    transition: box-shadow 0.15s ease, transform 0.1s ease;
  }
  :host([compact]) .card {
    border-radius: var(--yds-card-radius-compact, 8px);
    padding: var(--yds-space-200, 16px);
  }
  :host([interactive]) .card {
    cursor: pointer;
  }
  :host([interactive]) .card:hover {
    box-shadow: var(--yds-card-shadow-hover, 0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.05));
    transform: translateY(-1px);
  }
  ::slotted([slot='eyebrow']) {
    font-size: var(--yds-font-size-s3, 11px);
    font-weight: var(--yds-font-weight-bold, 700);
    letter-spacing: var(--yds-font-letter-spacing-wide, 0.04em);
    text-transform: uppercase;
    color: var(--yds-card-eyebrow-text, #9aa3b2);
    margin: 0 0 var(--yds-space-100, 8px);
  }
  ::slotted([slot='title']) {
    font-size: var(--yds-font-size-h5, 18px);
    line-height: var(--yds-font-line-height-h5, 24px);
    font-weight: var(--yds-font-weight-bold, 700);
    color: var(--yds-card-title-text, #121926);
    margin: 0 0 var(--yds-card-gap-title, 8px);
  }
  .body {
    font-size: var(--yds-font-size-b3, 14px);
    line-height: var(--yds-font-line-height-b3, 22px);
    color: var(--yds-card-body-text, #697586);
  }
  ::slotted([slot='actions']) {
    margin-top: var(--yds-card-gap-action, 16px);
    display: flex;
    gap: var(--yds-space-100, 8px);
  }
`;
