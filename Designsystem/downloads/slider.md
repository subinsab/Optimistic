# Slider — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Forms (26/54) | **Status:** Stable

---

## Overview

Range input for loan amount selection, tenure pickers, EMI budget filters, and LTV ratio inputs. Uses styled native `<input type="range">` with an overlaid fill track (CSS + JS), live value readout, optional tick labels, disabled state, and error state.

---

## Measurements

| Property           | Value                               |
|--------------------|-------------------------------------|
| Track height       | 4px                                 |
| Track radius       | 2px                                 |
| Track bg           | var(--border)                       |
| Fill colour        | #4065C5                             |
| Thumb size         | 20 × 20px                           |
| Thumb border       | 2.5px solid var(--bg-panel)         |
| Thumb shadow       | 0 1px 4px rgba(64,101,197,.3)       |
| Focus ring         | 0 0 0 5px rgba(64,101,197,.18)      |
| Active scale       | 1.15×                               |
| Disabled opacity   | 0.4                                 |
| Error fill         | #CD3546                             |
| Error thumb        | #CD3546                             |
| Label font         | 13px / 600                          |
| Value font         | 13px / 700 / #4065C5                |
| Helper font        | 11.5px / 400 / text-3               |
| Error msg font     | 11.5px / 400 / #CD3546              |

---

## HTML

```html
<div class="ym-slider-wrap">
  <div class="ym-slider-header">
    <label class="ym-slider-label" for="loanAmount">Loan Amount</label>
    <span class="ym-slider-value" id="loanAmountVal">₹25,00,000</span>
  </div>
  <div class="ym-slider-track">
    <div class="slider-track-bg"></div>
    <div class="slider-track-fill" id="loanAmountFill" style="width:50%"></div>
    <input
      class="ym-range"
      type="range"
      id="loanAmount"
      min="500000" max="50000000" step="100000" value="25000000"
      aria-valuemin="500000" aria-valuemax="50000000"
      aria-valuenow="25000000" aria-valuetext="₹25 lakhs"
      oninput="updateSlider(this,'loanAmountVal','loanAmountFill',formatCrore)"
    />
  </div>
  <div class="slider-ticks">
    <span class="slider-tick">₹5L</span>
    <span class="slider-tick">₹5Cr</span>
  </div>
</div>

<!-- Disabled -->
<div class="ym-slider-wrap disabled">
  ...
  <input class="ym-range" type="range" ... disabled />
  <div class="slider-helper">Rate assigned by system</div>
</div>

<!-- Error -->
<div class="ym-slider-wrap slider-error">
  ...
  <div class="slider-error-msg">LTV exceeds maximum allowed 80%</div>
</div>
```

---

## CSS

```css
.ym-slider-track { position: relative; height: 20px; display: flex; align-items: center; }
.slider-track-bg   { position: absolute; left: 0; right: 0; height: 4px; background: var(--border); border-radius: 2px; }
.slider-track-fill { position: absolute; left: 0; height: 4px; background: #4065C5; border-radius: 2px; pointer-events: none; }

.ym-range { -webkit-appearance: none; appearance: none; width: 100%; height: 4px; background: transparent; z-index: 1; position: relative; outline: none; cursor: pointer; }
.ym-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px; height: 20px; border-radius: 50%;
  background: #4065C5; border: 2.5px solid var(--bg-panel);
  box-shadow: 0 1px 4px rgba(64,101,197,.3); cursor: grab;
  transition: box-shadow 150ms, transform 150ms;
}
.ym-range:focus::-webkit-slider-thumb { box-shadow: 0 0 0 5px rgba(64,101,197,.18), 0 1px 4px rgba(64,101,197,.3); }
.ym-range:active::-webkit-slider-thumb { transform: scale(1.15); cursor: grabbing; }

/* Disabled */
.ym-slider-wrap.disabled .ym-range { pointer-events: none; opacity: .4; }
/* Error */
.ym-slider-wrap.slider-error .ym-range::-webkit-slider-thumb { background: #CD3546; }
.ym-slider-wrap.slider-error .slider-track-fill { background: #CD3546; }
.ym-slider-wrap.slider-error .ym-slider-value { color: #CD3546; }
```

---

## JavaScript

```javascript
function updateSlider(input, valId, fillId, formatter) {
  const pct = (input.value - input.min) / (input.max - input.min) * 100;
  document.getElementById(fillId).style.width = pct + '%';
  document.getElementById(valId).textContent = formatter(+input.value);
  input.setAttribute('aria-valuenow', input.value);
}

function formatCrore(v) {
  if (v >= 10000000) return '₹' + (v / 10000000).toFixed(1) + ' Cr';
  if (v >= 100000)   return '₹' + (v / 100000).toFixed(1) + ' L';
  return '₹' + v.toLocaleString('en-IN');
}

// Initialize all sliders on page load
document.querySelectorAll('.ym-range').forEach(input => {
  const pct = (input.value - input.min) / (input.max - input.min) * 100;
  const fill = input.previousElementSibling;
  if (fill?.classList.contains('slider-track-fill')) fill.style.width = pct + '%';
});
```

---

## Accessibility

- Use `<input type="range">` — native keyboard support (arrow keys, Page Up/Down, Home/End)
- Always provide `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
- Provide `aria-valuetext` for formatted values (e.g. "₹25 lakhs" instead of "25000000")
- Associate the label via `<label for="inputId">` or `aria-label`
- Error state: add `aria-invalid="true"` and `aria-describedby` pointing to the error message

---

## Related Components

- **Input** (`input.html`) — text input for exact numeric entry alongside slider
- **Filter** (`filter.html`) — slider used inside filter panels
- **Tooltip** (`tooltip.html`) — floating tooltip above thumb for live value

---

*Yubi Market Design System · Slider v1.0.0 · Internal Use*
