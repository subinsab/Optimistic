/* Yubi Market Design System — Blob download, works on file:// and http:// */
function downloadMd(content, filename) {
  var blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  var url  = URL.createObjectURL(blob);
  var a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function () { URL.revokeObjectURL(url); }, 300);
}
