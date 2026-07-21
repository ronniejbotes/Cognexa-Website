/*
 * Cognexa — js/scroll.js
 * GSAP + ScrollTrigger choreography for "The Automation Line".
 *
 * Contract notes:
 * - Classic script (no import/export). Defines window.CognexaScroll only.
 * - init() is called by main.js ONLY when the 3D scene is active, the user
 *   has not requested reduced motion, and GSAP + ScrollTrigger have loaded.
 * - CSS never pre-hides content. Every reveal is a gsap.from(...) tween, so
 *   the hidden "from" state exists only while this choreography is running.
 *   With JS disabled (or body.no-3d) all content stays fully visible.
 * - All tweens animate transform/opacity (autoAlpha) only.
 * - All scroll animation is scrubbed or scroll-toggled — never time-based.
 * - ScrollTriggers are created in top-to-bottom page order:
 *   page progress → hero → services driver → stations → process (pin) →
 *   work → metrics → contact.
 * - No markers.
 */
(function () {
  'use strict';

  /* gsap.matchMedia context for the desktop process ring — kept at module
     scope so a re-entrant init() can revert the previous one. */
  var ringMedia = null;

  /* Guarded bridge to the Three.js particle engine (js/scene.js).
     A scene error must never break scrolling. */
  function sceneCall(method, value) {
    var scene = window.CognexaScene;
    if (scene && typeof scene[method] === 'function') {
      try {
        scene[method](value);
      } catch (err) {
        /* Decorative layer only — swallow and keep scrolling. */
      }
    }
  }

  /* The ghost number is the huge outlined "01"–"04" behind each station
     heading. The contract does not pin its class name down, so resolve it
     defensively: known class candidates first, then any leaf element inside
     the station whose entire text is "01".."09". */
  function findGhost(station) {
    var el = station.querySelector(
      '.station-ghost, .ghost-number, .ghost-num, .station-number, .station-num'
    );
    if (el) return el;
    var nodes = station.querySelectorAll('*');
    for (var i = 0; i < nodes.length; i++) {
      if (
        nodes[i].children.length === 0 &&
        /^0\d$/.test((nodes[i].textContent || '').trim())
      ) {
        return nodes[i];
      }
    }
    return null;
  }

  window.CognexaScroll = {
    init: function init() {
      if (!window.gsap || !window.ScrollTrigger) return;

      var gsap = window.gsap;
      var ScrollTrigger = window.ScrollTrigger;
      var html = document.documentElement;
      var clamp = gsap.utils.clamp;

      gsap.registerPlugin(ScrollTrigger);

      /* Re-entrant: if init ever runs again (e.g. after a reduced-motion
         round-trip handled by main.js), rebuild everything from scratch.
         This site owns every ScrollTrigger on the page. */
      ScrollTrigger.getAll().forEach(function (trigger) {
        if (trigger.animation) trigger.animation.kill();
        trigger.kill();
      });
      if (ringMedia) {
        ringMedia.revert();
        ringMedia = null;
      }

      /* ------------------------------------------------------------------
       * 1. Whole-page progress
       *    → CSS var --scroll-progress (nav progress bar)
       *    → CognexaScene.setProgress (camera drift + hue shift)
       * ------------------------------------------------------------------ */
      function applyPageProgress(self) {
        /* self.progress already spans 0 → max from cached measurements —
           no layout-forcing DOM reads on the scroll hot path. */
        var p = self.progress;
        html.style.setProperty('--scroll-progress', String(p));
        sceneCall('setProgress', p);
      }

      ScrollTrigger.create({
        trigger: document.body,
        start: 0,
        end: 'max',
        scrub: true,
        onUpdate: applyPageProgress,
        onRefresh: applyPageProgress
      });

      /* ------------------------------------------------------------------
       * 2. Hero scrub-out — content lifts and fades as the line starts;
       *    the scroll cue disappears almost immediately.
       * ------------------------------------------------------------------ */
      var hero = document.querySelector('#hero');
      var heroInner = document.querySelector('.hero-inner');
      var scrollCue = document.querySelector('.scroll-cue');

      if (hero && (heroInner || scrollCue)) {
        var heroTl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true
          }
        });
        if (scrollCue) {
          heroTl.to(scrollCue, { autoAlpha: 0, duration: 0.2 }, 0);
        }
        if (heroInner) {
          heroTl.to(heroInner, {
            y: function () { return -0.08 * window.innerHeight; },
            autoAlpha: 0.15,
            duration: 1
          }, 0);
        }
      }

      /* ------------------------------------------------------------------
       * 3. Formation driver — one scrub across all of #services maps page
       *    position to the continuous formation index 0..4. The 4.6/−0.3
       *    tuning holds each formation steady while its station text is
       *    centered.
       * ------------------------------------------------------------------ */
      var services = document.querySelector('#services');

      function applyFormation(self) {
        /* Tuned so formation i is fully formed exactly while station i's
           sticky panel is centered: stations are 150vh each (600vh total),
           the trigger range spans 700vh (top bottom → bottom top), and each
           panel holds during the first 50vh of its station. */
        sceneCall('setFormation', clamp(0, 4, self.progress * 4.67 + 0.165));
      }

      if (services) {
        ScrollTrigger.create({
          trigger: services,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          onUpdate: applyFormation,
          onRefresh: applyFormation,
          onToggle: function (self) {
            /* Outside the stations the site falls back to the default
               blue accent. */
            if (!self.isActive) html.setAttribute('data-accent', 'blue');
          }
        });
      }

      /* ------------------------------------------------------------------
       * 4. Stations — per station: ghost-number parallax (scrub), content
       *    reveal (gsap.from, toggle-based), and accent sync on <html>.
       * ------------------------------------------------------------------ */
      var stations = services
        ? Array.prototype.slice.call(services.querySelectorAll('.station'))
        : [];

      stations.forEach(function (station) {
        /* Ghost number parallax: drifts ±6vh across the station's pass. */
        var ghost = findGhost(station);
        if (ghost) {
          gsap.fromTo(
            ghost,
            { y: function () { return 0.06 * window.innerHeight; } },
            {
              y: function () { return -0.06 * window.innerHeight; },
              ease: 'none',
              scrollTrigger: {
                trigger: station,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
                invalidateOnRefresh: true
              }
            }
          );
        }

        /* Content reveal. gsap.from's default immediateRender applies the
           hidden from-state only once this init runs — CSS itself never
           hides anything, so no-JS / no-3d visitors see everything. */
        var inner = station.querySelector('.station-inner');
        if (inner && inner.children.length) {
          /* The ghost number lives inside the panel but has its own parallax
             scrub — keep it out of the reveal so the two never fight over y.
             opacity (not autoAlpha): visibility:hidden would drop the
             .station-link anchors out of the keyboard tab order. */
          var revealChildren = Array.prototype.slice
            .call(inner.children)
            .filter(function (child) { return child !== ghost; });
          gsap.from(revealChildren, {
            y: 32,
            opacity: 0,
            duration: 0.6,
            stagger: 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: station,
              start: 'top 65%',
              toggleActions: 'play none none reverse'
            }
          });
        }

        /* Accent sync: while a station occupies the viewport center, its
           accent (blue | green | purple) is mirrored onto <html> so CSS can
           recolor eyebrows, links and the nav progress bar. */
        var accent = station.getAttribute('data-accent');
        if (accent) {
          ScrollTrigger.create({
            trigger: station,
            start: 'top center',
            end: 'bottom center',
            onToggle: function (self) {
              if (self.isActive) html.setAttribute('data-accent', accent);
            }
          });
        }
      });

      /* ------------------------------------------------------------------
       * 5. Process — circular 3D ring. While #process is pinned, vertical
       *    scroll scrubs the ring's rotation (scroll back = it rewinds);
       *    when the user pauses, the ring drifts slowly on its own.
       *    Below 900px and in every fallback mode the cards remain the
       *    swipeable scroll-snap strip — no pin, no ring.
       * ------------------------------------------------------------------ */
      var processSection = document.querySelector('#process');
      var processTrack = processSection
        ? processSection.querySelector('.process-track')
        : null;
      var processSteps = processTrack
        ? Array.prototype.slice.call(processTrack.querySelectorAll('.process-step'))
        : [];

      if (processSection && processTrack && processSteps.length > 1) {
        ringMedia = gsap.matchMedia();
        ringMedia.add('(min-width: 900px)', function () {
          var stepCount = processSteps.length;
          var anglePer = 360 / stepCount;
          var scrubRot = 0;  /* scroll-driven — reverses when scrolling back */
          var idleRot = 0;   /* slow drift accumulated while the user pauses */
          var lastScrubAt = 0;
          var rafId = null;
          var pinActive = false;

          function ringRadius() {
            return Math.max(340, Math.min(520, window.innerWidth * 0.34));
          }

          /* Static per-card placement around the ring; transform order
             (rotateY then translateZ) matters, so set it as a raw string. */
          function layout() {
            var radius = ringRadius();
            processSteps.forEach(function (step, i) {
              step.style.transform =
                'rotateY(' + (i * anglePer) + 'deg) translateZ(' + radius + 'px)';
            });
          }

          function render() {
            var total = scrubRot + idleRot;
            processTrack.style.transform = 'rotateY(' + total + 'deg)';
            for (var i = 0; i < stepCount; i++) {
              var rel = ((i * anglePer + total) % 360 + 360) % 360;
              var facing = rel > 180 ? 360 - rel : rel; /* 0 = front */
              processSteps[i].style.opacity =
                String(Math.max(0.12, 1 - facing / 140).toFixed(3));
            }
          }

          function idleTick(now) {
            rafId = window.requestAnimationFrame(idleTick);
            if (!pinActive || document.hidden) return;
            if (now - lastScrubAt < 150) return; /* user is driving */
            idleRot -= 0.05;
            render();
          }

          layout();
          render();

          var driver = { p: 0 };
          gsap.to(driver, {
            p: 1,
            ease: 'none',
            onUpdate: function () {
              scrubRot = -driver.p * anglePer * (stepCount - 1);
              lastScrubAt = performance.now();
              render();
            },
            scrollTrigger: {
              trigger: processSection,
              pin: true,
              scrub: 1,
              start: 'top top',
              end: '+=1800',
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onRefresh: function () {
                layout();
                render();
              },
              onToggle: function (self) {
                pinActive = self.isActive;
              }
            }
          });

          rafId = window.requestAnimationFrame(idleTick);

          /* Cleanup when leaving the breakpoint (or on re-init): the strip
             fallback must get untouched cards back. */
          return function () {
            if (rafId !== null) window.cancelAnimationFrame(rafId);
            rafId = null;
            processTrack.style.transform = '';
            processSteps.forEach(function (step) {
              step.style.transform = '';
              step.style.opacity = '';
            });
          };
        });
      }

      /* ------------------------------------------------------------------
       * 6. Work — batched card reveals + pointer-fine 3D tilt.
       * ------------------------------------------------------------------ */
      /* Canvas stays at full brightness everywhere — headings that sit over
         it get a soft text-shadow scrim in CSS instead of dimming particles. */
      if (document.querySelector('.work-card')) {
        ScrollTrigger.batch('.work-card', {
          start: 'top 85%',
          once: true,
          onEnter: function (batch) {
            gsap.from(batch, {
              y: 40,
              autoAlpha: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: 'power3.out'
            });
          }
        });

        /* Hover tilt: precise pointers only, transform-only, max ±6deg,
           springs back on pointerleave. */
        if (window.matchMedia('(pointer: fine)').matches) {
          Array.prototype.slice
            .call(document.querySelectorAll('.work-card'))
            .forEach(function (card) {
              if (card.getAttribute('data-tilt-bound') === '1') return;
              card.setAttribute('data-tilt-bound', '1');

              gsap.set(card, { transformPerspective: 700 });
              var tiltX = gsap.quickTo(card, 'rotationX', {
                duration: 0.45,
                ease: 'power2.out'
              });
              var tiltY = gsap.quickTo(card, 'rotationY', {
                duration: 0.45,
                ease: 'power2.out'
              });

              /* Rect is cached on pointerenter (while the card is untilted)
                 — reading it per pointermove forces layout against GSAP's
                 concurrent transform writes, and a rotated card's bounding
                 box drifts anyway. */
              var tiltRect = null;
              card.addEventListener('pointerenter', function () {
                tiltRect = card.getBoundingClientRect();
              });

              card.addEventListener(
                'pointermove',
                function (event) {
                  if (document.body.classList.contains('no-3d')) return;
                  if (!tiltRect || !tiltRect.width || !tiltRect.height) return;
                  var px = clamp(-1, 1, ((event.clientX - tiltRect.left) / tiltRect.width) * 2 - 1);
                  var py = clamp(-1, 1, ((event.clientY - tiltRect.top) / tiltRect.height) * 2 - 1);
                  tiltX(py * -6);
                  tiltY(px * 6);
                },
                { passive: true }
              );

              card.addEventListener('pointerleave', function () {
                tiltRect = null;
                tiltX(0);
                tiltY(0);
              });
            });
        }
      }

      /* ------------------------------------------------------------------
       * 7. Metrics — batched tile reveal (counter animation lives in
       *    main.js, independent of GSAP).
       * ------------------------------------------------------------------ */
      if (document.querySelector('.metric')) {
        ScrollTrigger.batch('.metric', {
          start: 'top 85%',
          once: true,
          onEnter: function (batch) {
            gsap.from(batch, {
              y: 32,
              autoAlpha: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: 'power3.out'
            });
          }
        });
      }

      /* ------------------------------------------------------------------
       * 8. Contact — batched reveal of the section's blocks; particles dim
       *    further so the form stays readable.
       * ------------------------------------------------------------------ */
      var contact = document.querySelector('#contact');
      if (contact) {
        var contactRoot = contact.querySelector('.contact-inner') || contact;
        var contactItems = Array.prototype.slice.call(contactRoot.children);
        if (contactItems.length) {
          ScrollTrigger.batch(contactItems, {
            start: 'top 85%',
            once: true,
            onEnter: function (batch) {
              gsap.from(batch, {
                y: 32,
                autoAlpha: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: 'power3.out'
              });
            }
          });
        }

      }

      /* Settle every start/end/pin measurement now that all triggers exist. */
      ScrollTrigger.refresh();
    }
  };
})();
