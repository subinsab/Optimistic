import { css } from 'lit';

export const inputStyles = css`
  :host {
    display: block;
  }
  .field {
    display: flex;
    flex-direction: column;
    gap: var(--yds-input-label-gap, 4px);
  }
  .label {
    font-size: var(--yds-font-size-s1, 13px);
    line-height: var(--yds-font-line-height-s1, 20px);
    font-weight: var(--yds-font-weight-bold, 700);
    color: var(--yds-input-label-text, #121926);
  }
  .required {
    color: var(--yds-color-text-error, #cd3546);
    margin-left: 2px;
  }
  .control {
    display: flex;
    align-items: center;
    gap: var(--yds-space-100, 8px);
    height: var(--yds-input-height, 38px);
    padding: var(--yds-input-padding-y, 8px) var(--yds-input-padding-x, 12px);
    background: var(--yds-input-bg, #fff);
    border: 1px solid var(--yds-input-border, #e3e8ef);
    border-radius: var(--yds-input-radius, 6px);
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }
  .control:hover {
    border-color: var(--yds-input-border-hover, #cdd5df);
  }
  .control:focus-within {
    border-color: var(--yds-input-border-focus, #81aff2);
    box-shadow: 0 0 0 3px var(--yds-color-focus-ring, rgba(129, 175, 242, 0.45));
  }
  :host([invalid]) .control {
    border-color: var(--yds-input-border-error, #cd3546);
  }
  :host([invalid]) .control:focus-within {
    box-shadow: 0 0 0 3px var(--yds-color-focus-ring-error, rgba(220, 38, 38, 0.3));
  }
  input {
    flex: 1;
    min-width: 0;
    border: none;
    outline: none;
    background: transparent;
    font-family: var(--yds-font-family-base, Inter, system-ui, sans-serif);
    font-size: var(--yds-font-size-b3, 14px);
    color: var(--yds-input-text, #121926);
  }
  input::placeholder {
    color: var(--yds-input-placeholder, #9aa3b2);
  }
  :host([disabled]) .control {
    background: var(--yds-input-disabled-bg, #e3e8ef);
    cursor: not-allowed;
  }
  :host([disabled]) input {
    color: var(--yds-input-disabled-text, #cdd5df);
    cursor: not-allowed;
  }
  .helper {
    font-size: var(--yds-font-size-s2, 12px);
    line-height: var(--yds-font-line-height-s2, 18px);
    color: var(--yds-input-helper-text, #697586);
  }
  :host([invalid]) .helper {
    color: var(--yds-input-helper-error, #cd3546);
  }
  ::slotted([slot='start']),
  ::slotted([slot='end']) {
    display: inline-flex;
    color: var(--yds-color-text-muted, #9aa3b2);
  }
`;
