/**
 * @yubi/angular — Angular integration for the Yubi Design System.
 *
 * Importing this package registers the custom elements (side effect of
 * importing @yubi/core). `YubiModule` re-exports a ControlValueAccessor so
 * `<yds-input>` works with `ngModel` and reactive forms, and applies
 * CUSTOM_ELEMENTS_SCHEMA so all `yds-*` tags are allowed in templates.
 */
import {
  Directive,
  ElementRef,
  HostListener,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule,
} from '@angular/forms';

// Side effect: defines all yds-* custom elements.
import '@yubi/core';

/**
 * Binds `<yds-input>` to Angular forms.
 * Usage: `<yds-input [(ngModel)]="email" name="email"></yds-input>`
 */
@Directive({
  selector: 'yds-input[ngModel], yds-input[formControl], yds-input[formControlName]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YdsInputValueAccessor),
      multi: true,
    },
  ],
})
export class YdsInputValueAccessor implements ControlValueAccessor {
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private el: ElementRef<HTMLElement & { value: string; disabled: boolean }>) {}

  @HostListener('yds-input', ['$event'])
  handleInput(event: CustomEvent<{ value: string }>) {
    this.onChange(event.detail.value);
  }

  @HostListener('yds-change')
  handleChange() {
    this.onTouched();
  }

  writeValue(value: string): void {
    this.el.nativeElement.value = value ?? '';
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.el.nativeElement.disabled = isDisabled;
  }
}

@NgModule({
  declarations: [YdsInputValueAccessor],
  imports: [FormsModule],
  exports: [YdsInputValueAccessor],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class YubiModule {}
