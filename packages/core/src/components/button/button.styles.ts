import { css } from 'lit';

export const buttonStyles = css`
  :host {
    display: inline-block;
  }
  :host([full-width]) {
    display: block;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--yds-button-gap, 8px);
    width: 100%;
    border: 1px solid transparent;
    border-radius: var(--yds-button-radius, 6px);
    font-family: var(--yds-font-family-base, Inter, system-ui, sans-serif);
    font-size: var(--yds-font-size-s1, 13px);
    font-weight: var(--yds-font-weight-bold, 700);
    line-height: var(--yds-font-line-height-s1, 20px);
    letter-spacing: var(--yds-font-letter-spacing-snug, -0.01em);
    cursor: pointer;
    white-space: nowrap;
    transition: background-color 0.15s ease, border-color 0.15s ease, transform 0.1s ease;
    user-select: none;
  }
  .btn:active:not(:disabled) {
    transform: translateY(0.5px);
  }

  /* Sizes */
  :host([size='sm']) .btn {
    min-height: var(--yds-button-size-sm-height, 30px);
    padding: var(--yds-button-size-sm-padding-y, 6px) var(--yds-button-size-sm-padding-x, 12px);
  }
  :host([size='md']) .btn,
  .btn {
    min-height: var(--yds-button-size-md-height, 36px);
    padding: var(--yds-button-size-md-padding-y, 8px) var(--yds-button-size-md-padding-x, 16px);
  }
  :host([size='lg']) .btn {
    min-height: var(--yds-button-size-lg-height, 44px);
    padding: var(--yds-button-size-lg-padding-y, 12px) var(--yds-button-size-lg-padding-x, 24px);
  }

  /* Variants */
  :host([variant='primary']) .btn {
    background: var(--yds-button-primary-bg, #fd7149);
    color: var(--yds-button-primary-text, #fff);
  }
  :host([variant='primary']) .btn:hover:not(:disabled) {
    background: var(--yds-button-primary-bg-hover, #fd5e32);
  }
  :host([variant='primary']) .btn:active:not(:disabled) {
    background: var(--yds-button-primary-bg-active, #fc3a04);
  }

  :host([variant='secondary']) .btn {
    background: var(--yds-button-secondary-bg, #fff);
    color: var(--yds-button-secondary-text, #121926);
    border-color: var(--yds-button-secondary-border, #e3e8ef);
  }
  :host([variant='secondary']) .btn:hover:not(:disabled) {
    background: var(--yds-button-secondary-bg-hover, #f1f5f9);
  }

  :host([variant='danger']) .btn {
    background: var(--yds-button-danger-bg, #cd3546);
    color: var(--yds-button-danger-text, #fff);
  }
  :host([variant='danger']) .btn:hover:not(:disabled) {
    background: var(--yds-button-danger-bg-hover, #a81c31);
  }

  :host([variant='ghost']) .btn {
    background: transparent;
    color: var(--yds-button-ghost-text, #697586);
  }
  :host([variant='ghost']) .btn:hover:not(:disabled) {
    background: var(--yds-button-ghost-bg-hover, #f1f5f9);
  }

  :host([variant='link']) .btn {
    background: transparent;
    color: var(--yds-button-link-text, #4065c5);
    padding-left: 0;
    padding-right: 0;
    min-height: auto;
    text-decoration: none;
  }
  :host([variant='link']) .btn:hover:not(:disabled) {
    text-decoration: underline;
  }

  /* Focus */
  .btn:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--yds-color-focus-ring, rgba(129, 175, 242, 0.45));
    border-color: var(--yds-color-border-focus, #81aff2);
  }

  /* Disabled */
  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Loading */
  .spinner {
    width: 1em;
    height: 1em;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  :host([loading]) .label {
    opacity: 0.7;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
