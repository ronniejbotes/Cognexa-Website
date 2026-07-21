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

  /* Google Apps Script web-app URL (lead sheet + email notification).
     While empty, submissions fall back to composing a mailto. */
  var INTAKE_ENDPOINT = '';

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
   * Intake — CTA implosion questionnaire.
   * Every link to #contact collapses the page into the particle ball,
   * big-bangs into a step-by-step form, then restores the page on close.
   * Works without GSAP/WebGL too (plain fade, same questionnaire).
   * ================================================================== */
  function sceneCondense(v) {
    var scene = window.CognexaScene;
    if (scene && typeof scene.setCondense === 'function') {
      try {
        scene.setCondense(v);
      } catch (err) {
        /* decorative only */
      }
    }
  }

  function initIntake() {
    var overlay = document.getElementById('intake');
    var form = document.getElementById('intake-form');
    if (!overlay || !form) return;

    form.setAttribute('novalidate', '');

    var steps = Array.prototype.slice.call(
      form.querySelectorAll('.intake-step:not(.intake-success)')
    );
    var successStep = form.querySelector('.intake-success');
    var progressBar = overlay.querySelector('.intake-progress-bar');
    var closeBtn = overlay.querySelector('.intake-close');
    var total = steps.length;
    var current = 0;
    var isOpen = false;
    var lastFocus = null;
    var condense = { v: 0 };
    var pageEls = null;

    var SERVICE_BY_STATION = {
      'station-chat': 'Chatbots & WhatsApp automation',
      'station-voice': 'AI voice agents',
      'station-workflow': 'Workflow automation',
      'station-web': '3D web experiences'
    };

    function setProgress(fraction) {
      if (progressBar) progressBar.style.transform = 'scaleX(' + fraction + ')';
    }

    function focusStep(step) {
      var target =
        step.querySelector('input:checked') ||
        step.querySelector('input, textarea, .intake-close-done');
      if (target && typeof target.focus === 'function') {
        try {
          target.focus({ preventScroll: true });
        } catch (err) {
          target.focus();
        }
      }
    }

    function showStep(i) {
      current = i;
      steps.forEach(function (step, idx) {
        step.classList.toggle('active', idx === i);
      });
      if (successStep) successStep.classList.remove('active');
      setProgress((i + 1) / (total + 1));
      window.setTimeout(function () {
        focusStep(steps[i]);
      }, 60);
    }

    function showSuccess() {
      steps.forEach(function (step) {
        step.classList.remove('active');
      });
      if (successStep) {
        successStep.classList.add('active');
        setProgress(1);
        window.setTimeout(function () {
          focusStep(successStep);
        }, 60);
      }
    }

    function validateStep(step) {
      clearFormErrors(form);
      var invalid = null;
      var choices = step.querySelectorAll('input[type="radio"], input[type="checkbox"]');
      if (choices.length) {
        var needsOne =
          step.hasAttribute('data-require-one') || step.querySelector('input[required]');
        if (needsOne && !step.querySelector('input:checked')) {
          var options = step.querySelector('.intake-options');
          var error = document.createElement('p');
          error.className = 'field-error';
          error.setAttribute('role', 'alert');
          error.textContent =
            step.getAttribute('data-require-one') || 'Pick one to carry on.';
          if (options && options.parentNode) {
            options.parentNode.insertBefore(error, options.nextSibling);
          }
          invalid = choices[0];
        }
      } else {
        Array.prototype.slice
          .call(step.querySelectorAll('input, textarea'))
          .forEach(function (field) {
            if (invalid) return;
            var type = (field.getAttribute('type') || '').toLowerCase();
            var value = (field.value || '').trim();
            if (field.hasAttribute('required') && !value) {
              addFieldError(field, requiredMessage(field));
              invalid = field;
            } else if (type === 'email' && value && !EMAIL_PATTERN.test(value)) {
              addFieldError(field, 'Enter a valid email address, like name@company.com.');
              invalid = field;
            }
          });
      }
      if (invalid) {
        invalid.focus();
        return false;
      }
      return true;
    }

    function next() {
      if (!validateStep(steps[current])) return;
      if (current < total - 1) showStep(current + 1);
    }

    function back() {
      clearFormErrors(form);
      if (current > 0) showStep(current - 1);
    }

    function fieldVal(name) {
      var el = form.elements.namedItem(name);
      if (!el) return '';
      if (typeof el.value === 'string') return el.value.trim();
      return '';
    }

    /* Multi-select groups: every checked value, comma-joined. */
    function checkedVals(name) {
      return Array.prototype.slice
        .call(form.querySelectorAll('input[name="' + name + '"]:checked'))
        .map(function (el) { return el.value; })
        .join(', ');
    }

    function setSuccessCopy(text) {
      var sub = successStep ? successStep.querySelector('.intake-sub') : null;
      if (sub && text) sub.textContent = text;
    }

    function submitViaMailto() {
      var lines = [
        'Name: ' + fieldVal('name'),
        'Email: ' + fieldVal('email'),
        'Business: ' + fieldVal('company'),
        'What they do: ' + fieldVal('industry'),
        'Interested in: ' + checkedVals('service'),
        'Biggest time drains: ' + checkedVals('pain')
      ];
      var message = fieldVal('message');
      if (message) lines.push('', 'Notes:', message);
      var mailto =
        'mailto:' + CONTACT_EMAIL +
        '?subject=' + encodeURIComponent('Build enquiry — ' + (fieldVal('company') || fieldVal('name'))) +
        '&body=' + encodeURIComponent(lines.join('\r\n'));
      setSuccessCopy('Your answers are in your mail app, ready to send — we reply within one business day.');
      showSuccess();
      window.location.href = mailto;
    }

    function submitIntake() {
      if (!validateStep(steps[current])) return;

      if (!INTAKE_ENDPOINT || typeof window.fetch !== 'function') {
        submitViaMailto();
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      var submitLabel = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }

      var payload = {
        name: fieldVal('name'),
        email: fieldVal('email'),
        company: fieldVal('company'),
        industry: fieldVal('industry'),
        service: checkedVals('service'),
        pain: checkedVals('pain'),
        message: fieldVal('message'),
        page: window.location.href
      };

      /* Body as a plain string keeps this a "simple" request (no CORS
         preflight), which Apps Script web apps require. */
      window
        .fetch(INTAKE_ENDPOINT, {
          method: 'POST',
          body: JSON.stringify(payload),
          redirect: 'follow',
          keepalive: true
        })
        .then(function (response) {
          if (!response.ok) throw new Error('HTTP ' + response.status);
          setSuccessCopy("We've got your answers — we reply within one business day.");
          showSuccess();
        })
        .catch(function () {
          /* Network hiccup: fall back to the mail app so the lead is
             never lost. */
          submitViaMailto();
        })
        .then(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitLabel;
          }
        });
    }

    function getPageEls() {
      if (!pageEls) {
        pageEls = [];
        ['main', '.site-nav', '.site-footer'].forEach(function (sel) {
          var el = document.querySelector(sel);
          if (el) pageEls.push(el);
        });
      }
      return pageEls;
    }

    function canAnimate() {
      return !!window.gsap && sceneActive && !prefersReducedMotion();
    }

    function revealOverlay() {
      overlay.hidden = false;
      body.classList.add('intake-open');
      void overlay.offsetWidth; /* flush so the opacity transition runs */
      overlay.classList.add('is-open');
    }

    function open(preselectService) {
      if (isOpen) return;
      isOpen = true;
      lastFocus = document.activeElement;
      clearFormErrors(form);

      if (preselectService) {
        var radio = form.querySelector(
          'input[name="service"][value="' + preselectService + '"]'
        );
        if (radio) radio.checked = true;
      }

      if (canAnimate()) {
        var gsap = window.gsap;
        var mainEl = document.querySelector('main');
        var originY = window.scrollY + window.innerHeight * 0.5;
        var tl = gsap.timeline();
        /* 1. the site implodes toward the viewport center… */
        tl.to(getPageEls(), {
          scale: 0.7,
          autoAlpha: 0,
          duration: 0.65,
          ease: 'power3.in',
          overwrite: 'auto',
          transformOrigin: function (i, el) {
            return el === mainEl ? '50% ' + originY + 'px' : '50% 50%';
          }
        }, 0);
        /* …while the particles collapse into a small dense ball… */
        tl.to(condense, {
          v: 1,
          duration: 0.75,
          ease: 'power3.in',
          onUpdate: function () { sceneCondense(condense.v); }
        }, 0);
        /* …then the big bang, resolving into the questionnaire. */
        tl.add(function () {
          showStep(0);
          revealOverlay();
        });
        tl.to(condense, {
          v: -0.55,
          duration: 0.5,
          ease: 'expo.out',
          onUpdate: function () { sceneCondense(condense.v); }
        }, '+=0.15');
        tl.to(condense, {
          v: 0,
          duration: 1.4,
          ease: 'power2.out',
          onUpdate: function () { sceneCondense(condense.v); }
        });
      } else {
        showStep(0);
        revealOverlay();
      }
    }

    function close() {
      if (!isOpen) return;
      isOpen = false;
      overlay.classList.remove('is-open');
      body.classList.remove('intake-open');
      window.setTimeout(function () {
        overlay.hidden = true;
      }, 320);
      clearFormErrors(form);
      if (window.gsap) {
        window.gsap.killTweensOf(condense);
        condense.v = 0;
        sceneCondense(0);
        window.gsap.to(getPageEls(), {
          scale: 1,
          autoAlpha: 1,
          duration: 0.5,
          ease: 'power3.out',
          overwrite: 'auto',
          clearProps: 'transform,opacity,visibility'
        });
      }
      if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    }

    /* "Not sure — recommend for me" is exclusive with concrete picks. */
    form.addEventListener('change', function (event) {
      var t = event.target;
      if (!t || t.name !== 'service' || !t.checked) return;
      var boxes = form.querySelectorAll('input[name="service"]');
      Array.prototype.forEach.call(boxes, function (box) {
        if (t.value === 'Not sure yet') {
          if (box !== t) box.checked = false;
        } else if (box.value === 'Not sure yet') {
          box.checked = false;
        }
      });
    });

    form.addEventListener('click', function (event) {
      var t = event.target;
      if (!t || typeof t.closest !== 'function') return;
      if (t.closest('.intake-next')) next();
      else if (t.closest('.intake-back')) back();
      else if (t.closest('.intake-close-done')) close();
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      submitIntake();
    });

    if (closeBtn) closeBtn.addEventListener('click', close);

    form.addEventListener('keydown', function (event) {
      if (event.key !== 'Enter') return;
      var inTextarea = event.target && event.target.tagName === 'TEXTAREA';
      if (inTextarea && !(event.metaKey || event.ctrlKey)) return;
      event.preventDefault();
      if (successStep && successStep.classList.contains('active')) {
        close();
      } else if (current === total - 1) {
        submitIntake();
      } else {
        next();
      }
    });

    overlay.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' || event.key === 'Esc') {
        close();
        return;
      }
      if (event.key !== 'Tab') return;
      /* simple focus trap over currently visible controls */
      var focusables = overlay.querySelectorAll(
        'a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])'
      );
      var visible = Array.prototype.filter.call(focusables, function (el) {
        return el.offsetParent !== null;
      });
      if (!visible.length) return;
      var first = visible[0];
      var last = visible[visible.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    /* Every CTA pointing at #contact starts the sequence. Station CTAs
       pre-select their service in step 5. */
    document.addEventListener('click', function (event) {
      var link =
        event.target && typeof event.target.closest === 'function'
          ? event.target.closest('a[href="#contact"]')
          : null;
      if (!link) return;
      event.preventDefault();
      var explicit = link.getAttribute('data-intake-service');
      var station = link.closest('.station');
      open(explicit || (station ? SERVICE_BY_STATION[station.id] : null));
    });
  }

  /* ====================================================================
   * Work loops — play the project videos only while visible; posters
   * everywhere else (reduced motion, no JS, data saver).
   * ================================================================== */
  function initWorkVideos() {
    var videos = Array.prototype.slice.call(document.querySelectorAll('.work-media'));
    if (!videos.length || prefersReducedMotion()) return;
    if (!('IntersectionObserver' in window)) return;

    var observer = new window.IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var video = entry.target;
          if (entry.isIntersecting) {
            video.muted = true; /* belt & braces for autoplay policies */
            var played = video.play();
            if (played && typeof played.catch === 'function') {
              played.catch(function () { /* poster stays — fine */ });
            }
          } else if (!video.paused) {
            video.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    videos.forEach(function (video) {
      observer.observe(video);
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
    initIntake();
    initWorkVideos();
    initYear();
    boot3D();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
