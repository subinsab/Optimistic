import { css } from 'lit';

export const badgeStyles = css`
  :host {
    display: inline-flex;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: var(--yds-badge-gap, 4px);
    padding: var(--yds-badge-padding-y, 2px) var(--yds-badge-padding-x, 8px);
    border: 1px solid transparent;
    border-radius: var(--yds-badge-radius, 9999px);
    font-family: var(--yds-font-family-base, Inter, system-ui, sans-serif);
    font-size: var(--yds-font-size-s5, 10px);
    line-height: var(--yds-font-line-height-s5, 14px);
    font-weight: var(--yds-font-weight-bold, 700);
    letter-spacing: 0.02em;
    white-space: nowrap;
  }
  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }

  :host([variant='neutral']) .badge,
  .badge {
    background: var(--yds-badge-neutral-bg, #f1f5f9);
    border-color: var(--yds-badge-neutral-border, #e3e8ef);
    color: var(--yds-badge-neutral-text, #697586);
  }
  :host([variant='success']) .badge {
    background: var(--yds-badge-success-bg, #f0fdf4);
    border-color: var(--yds-badge-success-border, #b8f5d0);
    color: var(--yds-badge-success-text, #166534);
  }
  :host([variant='error']) .badge {
    background: var(--yds-badge-error-bg, #fff1f1);
    border-color: var(--yds-badge-error-border, #ffbfbf);
    color: var(--yds-badge-error-text, #871426);
  }
  :host([variant='warning']) .badge {
    background: var(--yds-badge-warning-bg, #fffbeb);
    border-color: var(--yds-badge-warning-border, #fedf84);
    color: var(--yds-badge-warning-text, #7a3010);
  }
  :host([variant='info']) .badge {
    background: var(--yds-badge-info-bg, #eff6ff);
    border-color: var(--yds-badge-info-border, #bfdbfe);
    color: var(--yds-badge-info-text, #1e3a8a);
  }
`;
