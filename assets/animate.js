/* GSVMCH — animations (v7 add-on, loaded after lang.js)
   Scroll reveal (IntersectionObserver), stats count-up, language-change
   re-run. No external libraries. Does nothing if JS is off (elements stay
   visible: .reveal is only added here, and hidden only under html.js). */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  /* ---------- Mobile nav toggle (hamburger) ---------- */
  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.querySelector('nav.main');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mainNav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        document.body.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var BN = { '০': 0, '১': 1, '২': 2, '৩': 3, '৪': 4, '৫': 5, '৬': 6, '৭': 7, '৮': 8, '৯': 9 };
  var BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

  function toLatin(s) {
    return s.replace(/[০-৯]/g, function (d) { return BN[d]; });
  }
  function toBengali(n) {
    return String(n).replace(/[0-9]/g, function (d) { return BN_DIGITS[+d]; });
  }

  /* ---------- Scroll reveal ---------- */
  var SELECTOR = 'main section, .card, .shortcut, .spec-card, ' +
    '.gallery figure, .founder-strip, .stats-band, .notice-box, ' +
    '.about-wrap > *, .bottom3 > *, form, .table-wrap, .empty, .cta-btn, .chip, .finder-result';
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(SELECTOR));

  revealEls.forEach(function (el, i) {
    el.classList.add('reveal');
    /* stagger siblings inside the same grid */
    var parent = el.parentElement;
    if (parent) {
      var sibs = Array.prototype.filter.call(parent.children, function (c) {
        return c.classList.contains('reveal');
      });
      var idx = sibs.indexOf(el);
      if (idx > 0 && idx < 6) el.style.transitionDelay = (idx * 70) + 'ms';
    }
    /* About photo slides in from the left, About text from the right */
    if (el.classList.contains('about-photo')) el.classList.add('reveal-left');
    if (el.classList.contains('about-text')) el.classList.add('reveal-right');
  });

  function revealNow(el) { el.classList.add('in'); }

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(revealNow);
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { revealNow(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Stats count-up ---------- */
  var statEls = Array.prototype.slice.call(
    document.querySelectorAll('.stats-band .stat b'));

  function parseStat(el) {
    var text = el.textContent || '';
    var latin = toLatin(text);
    var m = latin.match(/^(\d+)/);
    if (!m) return null;
    var suffix = latin.slice(m[1].length);
    var bengali = /[০-৯]/.test(text);
    return { target: parseInt(m[1], 10), suffix: suffix, bengali: bengali };
  }

  function formatStat(n, parsed) {
    var num = parsed.bengali ? toBengali(n) : String(n);
    return num + parsed.suffix;
  }

  function countUp(el) {
    var parsed = parseStat(el);
    if (!parsed) return;
    var parent = el.closest('.stat');
    if (parent) parent.classList.add('counting');
    if (reduceMotion) { el.textContent = formatStat(parsed.target, parsed); return; }
    var start = null, dur = 1200;
    if (el._raf) cancelAnimationFrame(el._raf);
    function frame(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = formatStat(Math.round(parsed.target * eased), parsed);
      if (p < 1) el._raf = requestAnimationFrame(frame);
      else if (parent) parent.classList.remove('counting');
    }
    el._raf = requestAnimationFrame(frame);
  }

  var counted = new WeakSet();
  function countOnce(el) {
    if (counted.has(el)) return;
    counted.add(el);
    countUp(el);
  }

  if (statEls.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      statEls.forEach(countOnce);
    } else {
      var sio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { countOnce(e.target); sio.unobserve(e.target); }
        });
      }, { threshold: 0.4 });
      statEls.forEach(function (el) { sio.observe(el); });
    }
  }

  /* ---------- Language change (lang.js fires 'gsvmch-lang') ---------- */
  document.addEventListener('gsvmch-lang', function () {
    /* lang.js swapped the text; re-run the count with the new digits. */
    statEls.forEach(function (el) {
      counted.delete(el);
      countUp(el);
    });
    /* Reveal again in case layout shifted after the text swap. */
    revealEls.forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) revealNow(el);
    });
  });
})();
