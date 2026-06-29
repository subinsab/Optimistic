import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../../internal/shared-styles.js';
import { inputStyles } from './input.styles.js';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

/**
 * `<yds-input>` — single-line text field. Form-associated so it participates
 * in native, React, and Angular forms.
 *
 * @slot start - Leading icon/adornment.
 * @slot end - Trailing icon/adornment.
 * @fires yds-input - On every keystroke. `detail.value` carries the value.
 * @fires yds-change - On commit (blur/enter). `detail.value` carries the value.
 * @csspart control - The input wrapper.
 */
@customElement('yds-input')
export class YdsInput extends LitElement {
  static styles = [sharedStyles, inputStyles];
  static formAssociated = true;

  private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  @property() label = '';
  @property() name = '';
  @property() value = '';
  @property() placeholder = '';
  @property() type: InputType = 'text';
  @property() helper = '';
  /** Error message; presence sets the invalid state. */
  @property() error = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: Boolean, reflect: true }) invalid = false;

  willUpdate() {
    this.invalid = !!this.error;
    this._internals.setFormValue(this.value);
  }

  private _onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    this._internals.setFormValue(this.value);
    this.dispatchEvent(
      new CustomEvent('yds-input', { detail: { value: this.value }, bubbles: true, composed: true }),
    );
  }

  private _onChange() {
    this.dispatchEvent(
      new CustomEvent('yds-change', { detail: { value: this.value }, bubbles: true, composed: true }),
    );
  }

  render() {
    const describedBy = this.helper || this.error ? 'yds-help' : undefined;
    return html`
      <div class="field">
        ${this.label
          ? html`<label class="label" for="native">
              ${this.label}${this.required ? html`<span class="required">*</span>` : nothing}
            </label>`
          : nothing}
        <div part="control" class="control">
          <slot name="start"></slot>
          <input
            id="native"
            .value=${this.value}
            type=${this.type}
            name=${this.name || nothing}
            placeholder=${this.placeholder || nothing}
            ?disabled=${this.disabled}
            ?required=${this.required}
            aria-invalid=${this.invalid ? 'true' : 'false'}
            aria-describedby=${describedBy ?? nothing}
            @input=${this._onInput}
            @change=${this._onChange}
          />
          <slot name="end"></slot>
        </div>
        ${this.error || this.helper
          ? html`<span id="yds-help" class="helper">${this.error || this.helper}</span>`
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'yds-input': YdsInput;
  }
}
