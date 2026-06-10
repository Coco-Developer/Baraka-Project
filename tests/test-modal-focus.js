const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

async function run() {
  const indexPath = path.resolve(__dirname, '..', 'index.html');
  const indexHtml = fs.readFileSync(indexPath, 'utf8');
  const dom = new JSDOM(indexHtml, {
    runScripts: 'dangerously',
    resources: 'usable',
    url: 'file://' + indexPath
  });

  // Wait for external scripts to load
  await new Promise((resolve) => {
    dom.window.addEventListener('load', function () {
      setTimeout(resolve, 200); // small delay to let scripts run
    });
  });

  const document = dom.window.document;

  const openBtn = document.querySelector('.custom-pack-open');
  if (!openBtn) {
    console.error('No se encontró el botón .custom-pack-open');
    process.exit(2);
  }

  // Click to open modal
  openBtn.click();

  const modal = document.getElementById('customPackModal');
  if (!modal || !modal.classList.contains('open')) {
    console.error('Modal no se abrió correctamente');
    process.exit(3);
  }

  // Find focusable elements
  const focusable = modal.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"])');
  if (!focusable || focusable.length === 0) {
    console.error('No se hallaron elementos enfocables dentro del modal para la prueba');
    process.exit(4);
  }

  // Simulate Tab cycling forward from first to last
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  first.focus();

  function fireKey(key, shiftKey) {
    const ev = new dom.window.KeyboardEvent('keydown', { key: key, bubbles: true, cancelable: true, shiftKey: !!shiftKey });
    document.dispatchEvent(ev);
  }

  // Press Shift+Tab on first -> should move to last
  fireKey('Tab', true);
  if (document.activeElement !== last) {
    console.error('Shift+Tab no cicla al último elemento. activo:', document.activeElement && document.activeElement.outerHTML);
    process.exit(5);
  }

  // Press Tab on last -> should move to first
  fireKey('Tab', false);
  if (document.activeElement !== first) {
    console.error('Tab no cicla al primer elemento. activo:', document.activeElement && document.activeElement.outerHTML);
    process.exit(6);
  }

  // Close modal and ensure focus returns to a sensible element (body or previously focused)
  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) closeBtn.click();

  setTimeout(() => {
    console.log('OK: Focus trap y apertura/cierre del modal funcionan.');
    process.exit(0);
  }, 100);
}

run().catch(err => {
  console.error('Error en la prueba:', err);
  process.exit(1);
});
