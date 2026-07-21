/*
 * Cognexa — js/main.js
 * Boot + progressive enhancement: nav, metric counters, contact form,
 * footer year, and the 3D/scroll boot gate.
 *
 * Contract notes:
 * - Classic script (no import/export). Runs standalone: it must never throw
 *   if Three.js or GSAP failed to load — every use is feature-detected.
 * - Adds body.js-enabled immediately.
 * - Adds body.no-3d (and skips CognexaScroll.init) when the user prefers
 *   reduced motion, THREE is missing, or CognexaScene.init reports failure.
 *   CSS never pre-hides content, so the page is fully readable either way.
 */
(function () {
  'use strict';

  var body = document.body || document.documentElement;
  body.classList.add('js-enabled');

  var docEl = document.documentElement;

  var motionQuery =
    typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : null;

  function prefersReducedMotion() {
    return !!(motionQuery && motionQuery.matches);
  }

  /* ====================================================================
   * 3D boot gate
   * ================================================================== */
  var sceneActive = false;
  var pointerBound = false;
  var resizeBound = false;

  /* Viewport dims are cached — reading innerWidth/innerHeight per pointer
     event forces style/layout flushes in several engines. Refreshed by the
     debounced resize handler below. */
  var viewportW = window.innerWidth || 1;
  var viewportH = window.innerHeight || 1;

  function bindPointer() {
    if (pointerBound) return;
    pointerBound = true;
    window.addEventListener(
      'pointermove',
      function (event) {
        if (!sceneActive) return;
        var scene = window.CognexaScene;
        if (!scene || typeof scene.setPointer !== 'function') return;
        var x = (event.clientX / viewportW) * 2 - 1;
        var y = (event.clientY / viewportH) * 2 - 1;
        try {
          scene.setPointer(x, y);
        } catch (err) {
          /* decorative only */
        }
      },
      { passive: true }
    );
  }

  function bindResize() {
    if (resizeBound) return;
    resizeBound = true;
    var timer = null;
    window.addEventListener('resize', function () {
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(function () {
        timer = null;
        viewportW = window.innerWidth || 1;
        viewportH = window.innerHeight || 1;
        var scene = window.CognexaScene;
        if (sceneActive && scene && typeof scene.resize === 'function') {
          try {
            scene.resize();
          } catch (err) {
            /* decorative only */
          }
        }
        if (sceneActive && window.ScrollTrigger) {
          try {
            window.ScrollTrigger.refresh();
          } catch (err) {
            /* decorative only */
          }
        }
      }, 200);
    });
  }

  function boot3D() {
    var canvas = document.getElementById('scene-canvas');
    var scene = window.CognexaScene;
    /* The scroll choreography is part of the same enhancement bundle as the
       scene: CSS clips the process conveyor whenever body lacks .no-3d, so
       running the scene without ScrollTrigger would strand content. All or
       nothing. */
    var canRun =
      !prefersReducedMotion() &&
      !!window.THREE &&
      !!canvas &&
      !!scene &&
      typeof scene.init === 'function' &&
      !!window.gsap &&
      !!window.ScrollTrigger &&
      !!window.CognexaScroll &&
      typeof window.CognexaScroll.init === 'function';

    var ok = false;
    if (canRun) {
      try {
        /* scene.js supplies its own particleCount defaults
           (6000 desktop / 3000 under 768px). */
        ok = scene.init(canvas, {}) !== false;
      } catch (err) {
        ok = false;
      }
    }

    if (!ok) {
      sceneActive = false;
      body.classList.add('no-3d');
      return;
    }

    sceneActive = true;
    body.classList.remove('no-3d');
    bindPointer();
    bindResize();

    try {
      window.CognexaScroll.init();
    } catch (err) {
      /* Choreography failed — fall back to the static experience rather
         than leaving a scene without working scroll (clipped conveyor). */
      teardown3D();
    }
  }

  /* Tear the motion experience down (used when prefers-reduced-motion is
     enabled mid-session). Content returns to its plain, fully visible state. */
  function teardown3D() {
    body.classList.add('no-3d');

    if (sceneActive && window.CognexaScene && typeof window.CognexaScene.destroy === 'function') {
      try {
        window.CognexaScene.destroy();
      } catch (err) {
        /* decorative only */
      }
    }
    sceneActive = false;

    if (window.ScrollTrigger) {
      try {
        window.ScrollTrigger.getAll().forEach(function (trigger) {
          if (trigger.animation) trigger.animation.kill();
          trigger.kill();
        });
      } catch (err) {
        /* decorative only */
      }
    }

    if (window.gsap) {
      try {
        var animated = document.querySelectorAll(
          '.hero-inner, .scroll-cue, .station-inner > *, ' +
            '.station-ghost, .ghost-number, .ghost-num, ' +
            '.process-track, .process-step, .work-card, .metric, ' +
            '#contact > *, #contact .contact-inner > *'
        );
        if (animated.length) {
          window.gsap.killTweensOf(animated);
          window.gsap.set(animated, { clearProps: 'all' });
        }
      } catch (err) {
        /* decorative only */
      }
    }

    docEl.removeAttribute('data-accent');
    docEl.style.setProperty('--scroll-progress', '0');
  }

  function onMotionPreferenceChange() {
    if (prefersReducedMotion()) {
      teardown3D();
    } else {
      /* Motion allowed again: CognexaScroll.init is re-entrant and
         rebuilds its triggers from scratch. */
      boot3D();
    }
  }

  if (motionQuery) {
    if (typeof motionQuery.addEventListener === 'function') {
      motionQuery.addEventListener('change', onMotionPreferenceChange);
    } else if (typeof motionQuery.addListener === 'function') {
      motionQuery.addListener(onMotionPreferenceChange);
    }
  }

  /* ====================================================================
   * Mobile navigation
   * ================================================================== */
  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var menu = document.getElementById('nav-menu');
    if (!toggle || !menu) return;

    function isOpen() {
      return body.classList.contains('nav-open');
    }

    function setOpen(open) {
      body.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    setOpen(isOpen());

    toggle.addEventListener('click', function () {
      setOpen(!isOpen());
    });

    document.addEventListener('keydown', function (event) {
      if ((event.key === 'Escape' || event.key === 'Esc') && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });

    /* Close when a menu link is chosen (anchor navigation on one page). */
    menu.addEventListener('click', function (event) {
      var target = event.target;
      var link = target && typeof target.closest === 'function' ? target.closest('a') : null;
      if (link && isOpen()) setOpen(false);
    });
  }

  /* ====================================================================
   * Metric counters
   * Animates only the number node; prefix/suffix spans in the HTML are
   * untouched. Independent of GSAP. Reduced motion jumps to the value.
   * ================================================================== */
  var COUNTER_DURATION = 1200;

  function findNumberNode(metric) {
    var root = metric.querySelector('.metric-value') || metric;

    /* Prefer an explicit hook if the HTML provides one. */
    var hook = root.querySelector('.metric-num, .metric-number, [data-count-value]');
    if (hook) return hook;

    /* Otherwise, the first text node that is purely a number. */
    if (typeof document.createTreeWalker === 'function' && window.NodeFilter) {
      var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
      var node;
      while ((node = walker.nextNode())) {
        if (/^\s*\d+\s*$/.test(node.nodeValue || '')) return node;
      }
    }
    return null;
  }

  function writeNumber(node, value) {
    var text = String(value);
    if (node.nodeType === 3) {
      node.nodeValue = text;
    } else {
      node.textContent = text;
    }
  }

  function runCounter(metric) {
    var target = parseInt(metric.getAttribute('data-count'), 10);
    if (isNaN(target)) return;
    var node = findNumberNode(metric);
    if (!node) return;

    if (prefersReducedMotion() || typeof window.requestAnimationFrame !== 'function') {
      writeNumber(node, target);
      return;
    }

    var startTime = null;
    function frame(now) {
      if (startTime === null) startTime = now;
      var t = Math.min(1, (now - startTime) / COUNTER_DURATION);
      var eased = 1 - Math.pow(1 - t, 3); /* ease-out cubic */
      writeNumber(node, Math.round(target * eased));
      if (t < 1) {
        window.requestAnimationFrame(frame);
      } else {
        writeNumber(node, target);
      }
    }
    window.requestAnimationFrame(frame);
  }

  function initCounters() {
    var metrics = Array.prototype.slice.call(
      document.querySelectorAll('.metric[data-count]')
    );
    if (!metrics.length) return;

    if (!('IntersectionObserver' in window)) {
      metrics.forEach(function (metric) {
        var target = parseInt(metric.getAttribute('data-count'), 10);
        var node = findNumberNode(metric);
        if (!isNaN(target) && node) writeNumber(node, target);
      });
      return;
    }

    var observer = new window.IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target); /* once */
          runCounter(entry.target);
        });
      },
      { threshold: 0.4 }
    );

    metrics.forEach(function (metric) {
      observer.observe(metric);
    });
  }

  /* ====================================================================
   * Contact form — validate, then compose a mailto. No backend.
   * ================================================================== */
  var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var CONTACT_EMAIL = 'hello@cognexa.co.za';

  function requiredMessage(field) {
    var name = (field.getAttribute('name') || field.id || '').toLowerCase();
    if (name.indexOf('email') !== -1) return 'Please add your email address.';
    if (name.indexOf('name') !== -1) return 'Please add your name.';
    if (name.indexOf('message') !== -1) return 'Tell us a little about what you need.';
    return 'This field is required.';
  }

  function clearFormErrors(form) {
    Array.prototype.slice
      .call(form.querySelectorAll('.field-error'))
      .forEach(function (el) {
        if (el.parentNode) el.parentNode.removeChild(el);
      });
    Array.prototype.slice
      .call(form.querySelectorAll('[aria-invalid="true"]'))
      .forEach(function (field) {
        field.removeAttribute('aria-invalid');
        var describedBy = field.getAttribute('aria-describedby');
        if (describedBy && describedBy.indexOf('error-') === 0) {
          field.removeAttribute('aria-describedby');
        }
      });
  }

  function addFieldError(field, message) {
    var error = document.createElement('p');
    error.className = 'field-error';
    error.setAttribute('role', 'alert');
    var id =
      'error-' +
      (field.id || field.getAttribute('name') || Math.random().toString(36).slice(2));
    error.id = id;
    error.textContent = message;

    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', id);

    if (field.parentNode) {
      field.parentNode.insertBefore(error, field.nextSibling);
    }
  }

  function fieldValue(form, name) {
    var field =
      (form.elements && form.elements.namedItem && form.elements.namedItem(name)) ||
      form.querySelector('[name="' + name + '"]');
    return field && typeof field.value === 'string' ? field.value.trim() : '';
  }

  function setFormNote(form, message) {
    var note = form.querySelector('.form-note');
    if (!note) {
      note = document.createElement('p');
      note.className = 'form-note';
      note.setAttribute('role', 'status');
      form.appendChild(note);
    }
    note.textContent = message;
  }

  function initForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    /* JS handles validation; keep native bubbles off. */
    form.setAttribute('novalidate', '');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      clearFormErrors(form);

      var invalid = [];
      Array.prototype.slice
        .call(form.querySelectorAll('input, textarea, select'))
        .forEach(function (field) {
          var type = (field.getAttribute('type') || '').toLowerCase();
          if (type === 'submit' || type === 'button' || type === 'hidden') return;

          var value = (field.value || '').trim();
          if (field.hasAttribute('required') && !value) {
            invalid.push(field);
            addFieldError(field, requiredMessage(field));
          } else if (
            (type === 'email' || field.type === 'email') &&
            value &&
            !EMAIL_PATTERN.test(value)
          ) {
            invalid.push(field);
            addFieldError(field, 'Enter a valid email address, like name@company.com.');
          }
        });

      if (invalid.length) {
        invalid[0].focus();
        return;
      }

      var name = fieldValue(form, 'name');
      var email = fieldValue(form, 'email');
      var company = fieldValue(form, 'company');
      var message = fieldValue(form, 'message');

      var subject = 'Website enquiry from ' + (name || 'the Cognexa site');
      var lines = ['Name: ' + name, 'Email: ' + email];
      if (company) lines.push('Company: ' + company);
      lines.push('', 'Message:', message);

      var mailto =
        'mailto:' +
        CONTACT_EMAIL +
        '?subject=' +
        encodeURIComponent(subject) +
        '&body=' +
        encodeURIComponent(lines.join('\r\n'));

      setFormNote(form, 'Opening your mail app…');
      window.location.href = mailto;
    });
  }

  /* ====================================================================
   * Footer year
   * ================================================================== */
  function initYear() {
    var year = String(new Date().getFullYear());

    var el = document.querySelector('#year, .footer-year, [data-year]');
    if (el) {
      el.textContent = year;
      return;
    }

    /* Fallback: rewrite the year inside the footer's copyright text node. */
    var footer = document.querySelector('.site-footer');
    if (!footer || typeof document.createTreeWalker !== 'function' || !window.NodeFilter) {
      return;
    }
    var walker = document.createTreeWalker(footer, NodeFilter.SHOW_TEXT, null);
    var node;
    while ((node = walker.nextNode())) {
      if (/\b20\d{2}\b/.test(node.nodeValue || '')) {
        node.nodeValue = node.nodeValue.replace(/\b20\d{2}\b/, year);
        return;
      }
    }
  }

  /* ====================================================================
   * Boot
   * ================================================================== */
  function init() {
    initNav();
    initCounters();
    initForm();
    initYear();
    boot3D();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
