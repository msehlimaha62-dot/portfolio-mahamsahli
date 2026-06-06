/* =========================================================
   Maha Msahli — Portfolio · interactions
   ========================================================= */
(function () {
  'use strict';

  /* ---- Mobile nav ---- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.classList.remove('open');
        links.classList.remove('open');
      });
    });
  }

  /* ---- Nav background on scroll ---- */
  var nav = document.querySelector('.nav');
  function onScroll() {
    if (window.scrollY > 30) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Scroll reveal ---- */
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function () { entry.target.classList.add('visible'); }, i * 70);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });

  /* ---- Project tabs ---- */
  window.showProj = function (id, btn) {
    document.querySelectorAll('.proj-panel').forEach(function (p) { p.classList.remove('active'); });
    document.querySelectorAll('.proj-tab').forEach(function (t) { t.classList.remove('active'); });
    var panel = document.getElementById('proj-' + id);
    if (panel) panel.classList.add('active');
    if (btn) btn.classList.add('active');
  };

  /* ---- Gallery main swap ---- */
  window.swapMain = function (mainId, thumb) {
    var main = document.getElementById(mainId);
    if (main) main.querySelector('img').src = thumb.src;
    var grid = thumb.closest('.gallery-thumbs');
    if (grid) grid.querySelectorAll('img').forEach(function (t) { t.classList.remove('active'); });
    thumb.classList.add('active');
  };

  /* ---- Lightbox ---- */
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lb-img');
  window.openLightbox = function (src) {
    if (!lb || !lbImg) return;
    lbImg.src = src;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  window.closeLightbox = function () {
    if (!lb) return;
    lb.classList.remove('open');
    document.body.style.overflow = '';
  };
  if (lb) {
    lb.addEventListener('click', function (e) {
      if (e.target === lb || e.target.classList.contains('lb-close')) window.closeLightbox();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') window.closeLightbox();
  });

  /* ---- Footer year ---- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
