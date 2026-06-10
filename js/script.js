/* Particulas de fondo */
(function () {
  var particlesContainer = document.getElementById('particles');
  var activeParticles = 0;
  var maxParticles = 30;

  function spawnParticle(bottom) {
    if (!particlesContainer || activeParticles >= maxParticles) return;

    var particle = document.createElement('div');
    particle.className = 'pt';

    var size = (Math.random() * 3.5 + 1.5).toFixed(1);
    var duration = (Math.random() * 35 + 55).toFixed(1);
    var drift = ((Math.random() - 0.5) * 100).toFixed(0);
    var opacity = (Math.random() * 0.28 + 0.15).toFixed(2);
    var startBottom = (bottom !== undefined) ? bottom : 0;
    var delay = (bottom !== undefined)
      ? '-' + (Math.random() * parseFloat(duration) * 0.88).toFixed(1) + 's'
      : (Math.random() * 4).toFixed(1) + 's';

    particle.style.cssText =
      'width:' + size + 'px;' +
      'height:' + size + 'px;' +
      'left:' + (Math.random() * 100).toFixed(1) + '%;' +
      'bottom:' + startBottom + '%;' +
      '--d:' + duration + 's;' +
      '--delay:' + delay + ';' +
      '--dx:' + drift + 'px;' +
      '--op:' + opacity + ';' +
      'animation-delay:' + delay + ';';

    particlesContainer.appendChild(particle);
    activeParticles += 1;

    setTimeout(function () {
      particle.remove();
      activeParticles -= 1;
    }, (parseFloat(duration) + 5) * 1000);
  }

  for (var i = 0; i < 26; i += 1) {
    (function (index) {
      setTimeout(function () {
        spawnParticle(Math.random() * 105);
      }, index * 200);
    }(i));
  }

  setInterval(function () {
    spawnParticle();
  }, 1600);
}());

/* Navegacion */
var nav = document.getElementById('nav');
var navLinks = nav ? nav.querySelectorAll('a') : [];
var sectionIds = ['hero', 'nosotros', 'productos', 'packs', 'contacto'];
var sections = sectionIds.map(function (id) { return document.getElementById(id); });

window.addEventListener('scroll', function () {
  if (!nav) return;

  var scrollY = window.scrollY;
  var currentSection = 0;

  nav.classList.toggle('show', scrollY > 300);

  sections.forEach(function (section, index) {
    if (section && scrollY >= section.offsetTop - 170) currentSection = index;
  });

  navLinks.forEach(function (link, index) {
    link.classList.toggle('on', index === currentSection);
  });
}, { passive: true });

navLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    var target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

function formatCurrency(value) {
  return '$' + value.toLocaleString('es-AR');
}

function buildWhatsAppUrl(message) {
  return 'https://wa.me/5493547590813?text=' + encodeURIComponent(message);
}

/* Formulario -> WhatsApp */
var ctForm = document.getElementById('ctForm');
if (ctForm) {
  ctForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var form = e.target;
    var nombre = (form.elements.nombre && form.elements.nombre.value || '').trim();
    var email = (form.elements.email && form.elements.email.value || '').trim();
    var telefono = (form.elements.telefono && form.elements.telefono.value || '').trim();
    var mensaje = (form.elements.mensaje && form.elements.mensaje.value || '').trim();
    var status = document.getElementById('formStatus');

    if (!nombre || !email || !telefono || !mensaje) {
      status.textContent = 'Por favor completa todos los campos.';
      status.className = 'ct-form-status error';
      status.style.display = 'block';
      return;
    }

    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      status.textContent = 'Por favor ingresá un email válido.';
      status.className = 'ct-form-status error';
      status.style.display = 'block';
      return;
    }

    var text = 'Hola! Soy ' + nombre + '.\n\nMensaje: ' + mensaje + '\n\n';
    if (email) text += 'Email: ' + email + '\n';
    if (telefono) text += 'Teléfono: ' + telefono + '\n';

    window.open(buildWhatsAppUrl(text), '_blank');

    status.textContent = '✓ Abriendo WhatsApp...';
    status.className = 'ct-form-status success';
    status.style.display = 'block';

    setTimeout(function () {
      form.reset();
      status.style.display = 'none';
    }, 2000);
  });
}

/* Packs armados -> WhatsApp */
document.querySelectorAll('.pack-card[data-pack-name]').forEach(function (card) {
  var link = card.querySelector('.pack-order-link');
  if (!link) return;

  var packName = card.getAttribute('data-pack-name');
  var packPrice = card.getAttribute('data-pack-price');

  // Recolectar sólo las listas que contienen cantidades (evita características/descripciones)
  var items = [];
  var lists = Array.prototype.slice.call(card.querySelectorAll('.pack-items'));
  lists.forEach(function (ul) {
    if (!ul.querySelector('.item-qty')) return; // skip lists without quantities
    Array.prototype.slice.call(ul.querySelectorAll('li')).forEach(function (li) {
      var name = li.querySelector('.item-name');
      var qty = li.querySelector('.item-qty');
      if (!name) return;
      if (qty) items.push(name.textContent.trim() + ': ' + qty.textContent.trim());
      else items.push(name.textContent.trim());
    });
  });

  // Mensaje conciso y práctico
  var message = 'Hola! Quiero encargar: ' + packName + '.\n\n';
  message += items.map(function (item) { return '- ' + item; }).join('\n');
  if (packPrice) message += '\n\nTotal: ' + packPrice;
  link.href = buildWhatsAppUrl(message);
});

/* Pack personalizado */
var customPackGrid = document.getElementById('customPackGrid');

if (customPackGrid) {
  var customPackConfig = window.BARAKA_PACK_CONFIG || [];

  var customPackState = {};
  var customPackTotal = document.getElementById('customPackTotal');
  var customPackMeta = document.getElementById('customPackMeta');
  var customPackOrder = document.getElementById('customPackOrder');
  var customPackClear = document.getElementById('customPackClear');
  var customPackSummaryList = document.getElementById('customPackSummaryList');
  var floatingPackSummary = document.getElementById('floatingPackSummary');
  var floatingPackTotal = document.getElementById('floatingPackTotal');
  var floatingPackCount = document.getElementById('floatingPackCount');
  var customPackBuilder = document.getElementById('customPackBuilder');

  customPackConfig.forEach(function (product) {
    customPackState[product.id] = {
      qty: 0,
      variantId: product.variants[0].id
    };
  });

  function getProduct(productId) {
    return customPackConfig.find(function (product) {
      return product.id === productId;
    });
  }

  function getVariant(product, variantId) {
    return product.variants.find(function (variant) {
      return variant.id === variantId;
    }) || product.variants[0];
  }

  function getEffectiveCount(product, selections) {
    if (!selections) return 0;
    if (product.pricingMode === 'perSelection') return selections;
    if (selections === 1) return product.minSelection;
    return product.minSelection + ((selections - 1) * product.increment);
  }

  function getLineSubtotal(productId) {
    var product = getProduct(productId);
    var state = customPackState[productId];
    var variant = getVariant(product, state.variantId);
    var effectiveCount = getEffectiveCount(product, state.qty);
    var exactTier = product.pricingTiers && product.pricingTiers.find(function (tier) {
      return tier.qty === effectiveCount;
    });

    if (exactTier) return exactTier.total;
    return effectiveCount * variant.price;
  }

  function getQtyLabel(product, qty) {
    if (!qty) return 'Sin agregar';
    return getEffectiveCount(product, qty) + ' ' + product.displayUnitLabel;
  }

  function getSummaryLabel(product, variant) {
    return product.name + ' - ' + variant.name;
  }

  function getCurrentPriceLabel(product, variant) {
    if (product.pricingMode === 'perSelection') return formatCurrency(variant.price);
    if (product.pricingTiers && product.pricingTiers.length) {
      return product.priceLabel + ' · ' + product.pricingTiers[0].label;
    }
    return product.priceLabel;
  }

  function buildProductCard(product) {
    var card = document.createElement('article');
    card.className = 'custom-item';
    card.setAttribute('data-product-id', product.id);

    var variantsMarkup = product.variants.map(function (variant, index) {
      return '<button type="button" class="custom-variant' + (index === 0 ? ' active' : '') + '" data-variant-id="' + variant.id + '">' + variant.name + '</button>';
    }).join('');

    card.innerHTML =
      '<div class="custom-item-head">' +
        '<div>' +
          '<div class="custom-item-name">' + product.name + '</div>' +
          '<div class="custom-item-rule">' + product.ruleLabel + '</div>' +
        '</div>' +
        '<div class="custom-item-price" data-role="price">' + product.priceLabel + '</div>' +
      '</div>' +
      '<div class="custom-item-variants">' + variantsMarkup + '</div>' +
      '<div class="custom-item-controls">' +
        '<div class="custom-stepper">' +
          '<button type="button" data-action="minus" aria-label="Quitar">-</button>' +
          '<div class="custom-stepper-value" data-role="qty">Sin agregar</div>' +
          '<button type="button" data-action="plus" aria-label="Agregar">+</button>' +
        '</div>' +
        '<div class="custom-item-subtotal">' +
          '<strong data-role="subtotal">$0</strong>' +
          '<span>Subtotal</span>' +
        '</div>' +
      '</div>';

    customPackGrid.appendChild(card);
  }

  function renderSummary(items) {
    if (!items.length) {
      customPackSummaryList.innerHTML = '<div class="custom-pack-summary-empty">Todavía no agregaste productos.</div>';
      return;
    }

    customPackSummaryList.innerHTML =
      '<ul class="custom-pack-summary-items">' +
      items.map(function (item) {
        return '<li class="custom-pack-summary-item"><span>' + item.label + '</span><span>' + item.price + '</span></li>';
      }).join('') +
      '</ul>';
  }

  function renderCustomPack() {
    var total = 0;
    var selectedLines = [];
    var summaryItems = [];

    customPackConfig.forEach(function (product) {
      var state = customPackState[product.id];
      var variant = getVariant(product, state.variantId);
      var card = customPackGrid.querySelector('[data-product-id="' + product.id + '"]');
      var qtyEl = card.querySelector('[data-role="qty"]');
      var subtotalEl = card.querySelector('[data-role="subtotal"]');
      var priceEl = card.querySelector('[data-role="price"]');
      var subtotal = getLineSubtotal(product.id);

      qtyEl.textContent = getQtyLabel(product, state.qty);
      subtotalEl.textContent = formatCurrency(subtotal);
      priceEl.textContent = getCurrentPriceLabel(product, variant);
      total += subtotal;

      card.querySelectorAll('.custom-variant').forEach(function (button) {
        button.classList.toggle('active', button.getAttribute('data-variant-id') === state.variantId);
      });

        if (state.qty > 0) {
          var count = getEffectiveCount(product, state.qty);
          var line = product.name;
          if (product.pricingMode === 'perSelection') line += ' (' + variant.name + ')';
          line += ': ' + count + ' ' + product.displayUnitLabel;
          selectedLines.push(line);
          summaryItems.push({
            label: product.name + (product.pricingMode === 'perSelection' ? ' · ' + variant.name : '') + ' — ' + count + ' ' + product.displayUnitLabel,
            price: formatCurrency(subtotal)
          });
        }
    });

    customPackTotal.textContent = formatCurrency(total);
    floatingPackTotal.textContent = formatCurrency(total);
    floatingPackCount.textContent = String(selectedLines.length);
    renderSummary(summaryItems);

    if (!selectedLines.length) {
      customPackMeta.textContent = 'Seleccioná productos para armar tu pedido.';
      customPackOrder.classList.add('disabled');
      customPackOrder.setAttribute('aria-disabled', 'true');
      customPackOrder.href = 'https://wa.me/5493547590813';
      return;
    }

    customPackMeta.textContent = selectedLines.length + ' producto(s) en tu selección.';
    customPackOrder.classList.remove('disabled');
    customPackOrder.setAttribute('aria-disabled', 'false');

    var message = 'Hola! Quiero encargar una picada personalizada:\n\n';
    message += selectedLines.map(function (line) { return '- ' + line; }).join('\n');
    message += '\n\nTotal: ' + formatCurrency(total);
    customPackOrder.href = buildWhatsAppUrl(message);
  }

  customPackConfig.forEach(buildProductCard);

  customPackGrid.addEventListener('click', function (e) {
    var action = e.target.getAttribute('data-action');
    var variantId = e.target.getAttribute('data-variant-id');
    var card = e.target.closest('[data-product-id]');
    if (!card) return;

    var productId = card.getAttribute('data-product-id');
    var state = customPackState[productId];

    if (variantId) {
      state.variantId = variantId;
      renderCustomPack();
      return;
    }

    if (!action) return;
    if (action === 'plus') state.qty += 1;
    if (action === 'minus' && state.qty > 0) state.qty -= 1;

    renderCustomPack();
  });

  customPackClear.addEventListener('click', function () {
    customPackConfig.forEach(function (product) {
      customPackState[product.id].qty = 0;
      customPackState[product.id].variantId = product.variants[0].id;
    });
    renderCustomPack();
  });

  floatingPackSummary.addEventListener('click', function () {
    var modal = document.getElementById('customPackModal');
    if (modal) openCustomModal();
  });

  renderCustomPack();

  /* Modal: abrir / cerrar (para el builder) */
  var modalEl = document.getElementById('customPackModal');
  function openCustomModal() {
    if (!modalEl) return;
    modalEl.classList.add('open');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // Focus trap: save previously focused element and focus first focusable inside modal
    previouslyFocused = document.activeElement;
    attachFocusTrap();
    var first = getFocusableElements()[0];
    if (first) first.focus();
  }
  function closeCustomModal() {
    if (!modalEl) return;
    modalEl.classList.remove('open');
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    detachFocusTrap();
    try { if (previouslyFocused) previouslyFocused.focus(); } catch (e) {}
  }

  document.querySelectorAll('.custom-pack-open').forEach(function (btn) {
    btn.addEventListener('click', function () { openCustomModal(); });
  });

  var previewBtn = document.getElementById('customPackPreview');
  if (previewBtn) previewBtn.addEventListener('click', openCustomModal);

  if (modalEl) {
    modalEl.addEventListener('click', function (e) {
      if (e.target.getAttribute('data-action') === 'close' || e.target.classList.contains('modal-close')) {
        closeCustomModal();
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeCustomModal();
    });
  }

  // --- Focus trap utilities ---
  var previouslyFocused = null;
  var focusTrapHandler = null;
  var focusableSelector = 'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

  function getFocusableElements() {
    if (!modalEl) return [];
    // Return all matching focusable elements inside the modal.
    // Avoid relying on layout properties (offsetWidth/height) which are not available in headless environments.
    return Array.prototype.slice.call(modalEl.querySelectorAll(focusableSelector));
  }

  function attachFocusTrap() {
    if (!modalEl) return;
    focusTrapHandler = function (e) {
      if (e.key !== 'Tab') return;
      var focusable = getFocusableElements();
      if (!focusable.length) {
        e.preventDefault();
        return;
      }
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      var active = document.activeElement;
      if (e.shiftKey) {
        if (active === first || active === modalEl) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', focusTrapHandler);
  }

  function detachFocusTrap() {
    if (focusTrapHandler) {
      document.removeEventListener('keydown', focusTrapHandler);
      focusTrapHandler = null;
    }
  }
}
