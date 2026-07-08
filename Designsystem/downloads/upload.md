# Upload — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Forms (28/54) | **Status:** Stable

---

## Overview

File upload component for KYC documents, bank statements, ITR files, and ID proofs. Includes a drag-and-drop dropzone with hidden input, a file list with per-file upload progress bars, success/error/loading status icons, and a compact button-style variant.

---

## Variants

| Variant        | Description                                      |
|----------------|--------------------------------------------------|
| Dropzone       | Large clickable/draggable area, icon + text      |
| Button         | Compact inline button wrapping hidden `<input>`  |
| Error state    | `.upload-error` on dropzone, red border + icon   |

---

## Measurements

| Property             | Value                              |
|----------------------|------------------------------------|
| Dropzone border      | 2px dashed var(--border)           |
| Dropzone radius      | 14px                               |
| Dropzone padding     | 36px 24px                          |
| Drag-over border     | #4065C5                            |
| Drag-over bg         | rgba(64,101,197,.04)               |
| Icon tile            | 48px × 48px / 12px radius          |
| File item radius     | 10px                               |
| File item padding    | 10px 14px                          |
| File icon tile       | 36px × 36px / 8px radius           |
| Progress bar height  | 3px                                |
| Progress bar radius  | 2px                                |
| Progress colour      | #4065C5                            |
| Error progress       | #CD3546                            |
| Status icon size     | 22px circle                        |
| Remove button        | 24px × 24px / 6px radius           |

---

## HTML

```html
<!-- Dropzone -->
<div class="ym-dropzone"
     ondragover="handleDragOver(event)"
     ondragleave="handleDragLeave(event)"
     ondrop="handleDrop(event)"
     role="button"
     aria-label="Upload files — drag and drop or click to browse">

  <input type="file" multiple accept=".pdf,.jpg,.png"
         onchange="handleFileSelect(this)"
         aria-hidden="true" tabindex="-1" />

  <div class="dropzone-icon"><!-- SVG --></div>
  <div class="dropzone-title">Drop files here or click to browse</div>
  <div class="dropzone-sub">Upload KYC documents, bank statements</div>
  <div class="dropzone-types">PDF, JPG, PNG · Max 10 MB per file</div>
</div>

<!-- File list -->
<div class="ym-file-list" id="fileList">

  <div class="ym-file-item">
    <div class="file-icon file-icon-pdf"><!-- SVG --></div>
    <div class="file-content">
      <div class="file-name">PAN_Card.pdf</div>
      <div class="file-size">124 KB</div>
      <div class="file-progress-wrap">
        <div class="file-progress-bar" style="width:100%"></div>
      </div>
    </div>
    <div class="file-status">
      <div class="file-status-icon file-status-ok"><!-- ✓ SVG --></div>
    </div>
    <button class="file-remove-btn" aria-label="Remove file"><!-- × SVG --></button>
  </div>

</div>

<!-- Compact button -->
<label class="ym-upload-btn">
  <!-- Upload SVG -->
  Upload Document
  <input type="file" accept=".pdf,.jpg,.png">
</label>
```

---

## CSS

```css
.ym-dropzone {
  border: 2px dashed var(--border); border-radius: 14px;
  background: var(--bg-panel); padding: 36px 24px;
  text-align: center; cursor: pointer; position: relative;
  transition: border-color 160ms, background 160ms;
}
.ym-dropzone:hover,
.ym-dropzone.drag-over { border-color: #4065C5; background: rgba(64,101,197,.04); }
.ym-dropzone input[type="file"] { position: absolute; inset: 0; opacity: 0; cursor: pointer; }

.ym-file-list { display: flex; flex-direction: column; gap: 8px; margin-top: 16px; }
.ym-file-item { display: flex; align-items: center; gap: 10px; padding: 10px 14px; background: var(--bg-panel); border: 1px solid var(--border); border-radius: 10px; }

.file-progress-wrap { height: 3px; background: var(--border); border-radius: 2px; overflow: hidden; margin-top: 5px; }
.file-progress-bar { height: 100%; background: #4065C5; border-radius: 2px; transition: width 300ms ease; }

.file-status-icon { width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.file-status-ok    { background: rgba(63,144,43,.15); color: #3F902B; }
.file-status-error { background: rgba(205,53,70,.15); color: #CD3546; }

/* Error dropzone */
.ym-dropzone.upload-error { border-color: #CD3546; background: rgba(205,53,70,.03); }
```

---

## JavaScript

```javascript
function handleDragOver(e) { e.preventDefault(); e.currentTarget.classList.add('drag-over'); }
function handleDragLeave(e) { e.currentTarget.classList.remove('drag-over'); }
function handleDrop(e) {
  e.preventDefault();
  e.currentTarget.classList.remove('drag-over');
  addFiles([...e.dataTransfer.files]);
}
function handleFileSelect(input) {
  addFiles([...input.files]);
  input.value = ''; // reset for re-selection of same file
}

function addFiles(files) {
  const list = document.getElementById('fileList');
  files.forEach(file => {
    const item = createFileItem(file);
    list.appendChild(item);
    simulateUpload(item.querySelector('.file-progress-bar'));
  });
}

function formatSize(bytes) {
  if (bytes < 1024)    return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}
```

---

## Accessibility

- Dropzone: `role="button"` with `aria-label` describing accept types and action
- Hidden file input: `aria-hidden="true"` and `tabindex="-1"` — the wrapper provides keyboard focus
- File list items: `role="listitem"` within `role="list"` on `.ym-file-list`
- Remove button: `aria-label="Remove [filename]"` for screen reader clarity
- Error state: `aria-describedby` on the dropzone pointing to the error message element
- Upload progress: use `aria-valuenow` / `aria-valuemin` / `aria-valuemax` on progress bars, `aria-label="Uploading [filename]"`

---

## Related Components

- **Input** (`input.html`) — text inputs for file name or notes alongside upload
- **Loader** (`loader.html`) — progress spinner for long uploads
- **Notification** (`notification.html`) — upload success/failure banner

---

*Yubi Market Design System · Upload v1.0.0 · Internal Use*
