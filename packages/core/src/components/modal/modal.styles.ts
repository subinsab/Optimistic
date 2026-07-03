import { css } from 'lit';

export const modalStyles = css`
  :host {
    display: none;
  }
  :host([open]) {
    display: block;
  }
  .overlay {
    position: fixed;
    inset: 0;
    z-index: var(--yds-z-index-modal, 1100);
    background: var(--yds-modal-overlay, rgba(0, 0, 0, 0.45));
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--yds-space-200, 16px);
    animation: fade 0.15s ease;
  }
  .panel {
    width: 100%;
    max-width: var(--yds-modal-width-md, 560px);
    max-height: calc(100vh - 32px);
    display: flex;
    flex-direction: column;
    background: var(--yds-modal-bg, #fff);
    border-radius: var(--yds-modal-radius, 16px);
    box-shadow: var(--yds-modal-shadow, 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04));
    animation: pop 0.15s ease;
  }
  :host([size='sm']) .panel {
    max-width: var(--yds-modal-width-sm, 480px);
  }
  :host([size='lg']) .panel {
    max-width: var(--yds-modal-width-lg, 640px);
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--yds-space-200, 16px);
    padding: var(--yds-modal-padding, 32px) var(--yds-modal-padding, 32px) var(--yds-modal-gap-header, 20px);
  }
  .title {
    font-size: var(--yds-font-size-h3, 24px);
    line-height: var(--yds-font-line-height-h3, 32px);
    font-weight: var(--yds-font-weight-bold, 700);
    color: var(--yds-modal-title-text, #121926);
  }
  .close {
    flex: none;
    width: 32px;
    height: 32px;
    display: grid;
    place-items: center;
    border: none;
    border-radius: var(--yds-radius-md, 6px);
    background: transparent;
    color: var(--yds-color-text-muted, #9aa3b2);
    cursor: pointer;
  }
  .close:hover {
    background: var(--yds-color-bg-hover, #f1f5f9);
  }
  .body {
    padding: 0 var(--yds-modal-padding, 32px);
    overflow-y: auto;
    font-size: var(--yds-font-size-b2, 16px);
    line-height: var(--yds-font-line-height-b2, 24px);
    color: var(--yds-modal-body-text, #697586);
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    gap: var(--yds-modal-footer-gap, 16px);
    padding: var(--yds-modal-gap-footer, 24px) var(--yds-modal-padding, 32px) var(--yds-modal-padding, 32px);
  }
  .footer:empty {
    display: none;
  }
  @keyframes fade {
    from { opacity: 0; }
  }
  @keyframes pop {
    from { opacity: 0; transform: translateY(8px) scale(0.98); }
  }
`;
