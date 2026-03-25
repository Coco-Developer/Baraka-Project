/* ════════════════════════════════════════
   PARTÍCULAS — lentas y ascendentes
════════════════════════════════════════ */
(function () {
  var C = document.getElementById('particles');
  var n = 0, MAX = 30;

  function make(bot) {
    if (n >= MAX) return;
    var el  = document.createElement('div');
    el.className = 'pt';
    var sz  = (Math.random() * 3.5 + 1.5).toFixed(1);
    var dur = (Math.random() * 35 + 55).toFixed(1);
    var dx  = ((Math.random() - .5) * 100).toFixed(0);
    var op  = (Math.random() * .28 + .15).toFixed(2);
    var b   = (bot !== undefined) ? bot : 0;
    var del = (bot !== undefined)
      ? '-' + (Math.random() * parseFloat(dur) * .88).toFixed(1) + 's'
      : (Math.random() * 4).toFixed(1) + 's';
    el.style.cssText =
      'width:'  + sz  + 'px;' +
      'height:' + sz  + 'px;' +
      'left:'   + (Math.random() * 100).toFixed(1) + '%;' +
      'bottom:' + b   + '%;'  +
      '--d:'    + dur + 's;'  +
      '--delay:' + del + ';'  +
      '--dx:'   + dx  + 'px;' +
      '--op:'   + op  + ';'   +
      'animation-delay:' + del + ';';
    C.appendChild(el);
    n++;
    setTimeout(function () { el.remove(); n--; }, (parseFloat(dur) + 5) * 1000);
  }

  /* Sembrar partículas en toda la altura al cargar */
  for (var i = 0; i < 26; i++) {
    (function () { setTimeout(function () { make(Math.random() * 105); }, i * 200); })();
  }
  /* Generación continua lenta */
  setInterval(function () { make(); }, 1600);
}());

/* ════════════════════════════════════════
   NAV FLOTANTE
════════════════════════════════════════ */
var nav = document.getElementById('nav');
var links = nav ? nav.querySelectorAll('a') : [];
var ids = ['hero', 'nosotros', 'productos', 'packs', 'contacto'];
var secs = ids.map(function (id) { return document.getElementById(id); });

window.addEventListener('scroll', function () {
  if (!nav) return;
  var sy = window.scrollY;
  nav.classList.toggle('show', sy > 300);
  var cur = 0;
  secs.forEach(function (s, i) { if (s && sy >= s.offsetTop - 170) cur = i; });
  links.forEach(function (a, i) { a.classList.toggle('on', i === cur); });
}, { passive: true });

links.forEach(function (a) {
  a.addEventListener('click', function (e) {
    e.preventDefault();
    var t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ════════════════════════════════════════
   FORMULARIO → WHATSAPP
════════════════════════════════════════ */
var ctForm = document.getElementById('ctForm');
if (ctForm) ctForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var f   = e.target;
  var nombre = (f.elements['nombre'] && f.elements['nombre'].value || '').trim();
  var email = (f.elements['email'] && f.elements['email'].value || '').trim();
  var telefono = (f.elements['telefono'] && f.elements['telefono'].value || '').trim();
  var mensaje = (f.elements['mensaje'] && f.elements['mensaje'].value || '').trim();
  var status = document.getElementById('formStatus');

  // Validación básica
  if (!nombre || !email || !telefono || !mensaje) {
    status.textContent = 'Por favor completa todos los campos.';
    status.className = 'ct-form-status error';
    status.style.display = 'block';
    return;
  }
  var emailOk = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
  if (!emailOk) {
    status.textContent = 'Por favor ingresá un email válido.';
    status.className = 'ct-form-status error';
    status.style.display = 'block';
    return;
  }

  // Construir texto para WhatsApp
  var texto = 'Hola! Soy ' + nombre + '.\n\n' +
              'Mensaje: ' + mensaje + '\n\n';
  if (email) texto += 'Email: ' + email + '\n';
  if (telefono) texto += 'Teléfono: ' + telefono + '\n';

  // Redirigir a WhatsApp
  var url = 'https://wa.me/5493547590813?text=' + encodeURIComponent(texto);
  window.open(url, '_blank');

  // Mostrar confirmación
  status.textContent = '✓ Abriendo WhatsApp...';
  status.className = 'ct-form-status success';
  status.style.display = 'block';

  // Limpiar formulario
  setTimeout(function () {
    f.reset();
    status.style.display = 'none';
  }, 2000);
});
