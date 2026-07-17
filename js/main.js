/* PT Bajeng Maritime Indonesia — interactions */
(function () {
  'use strict';

  // Mobile nav
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      toggle.classList.toggle('active');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.classList.remove('active');
      });
    });
  }

  // Header shadow on scroll
  var header = document.getElementById('header');
  window.addEventListener('scroll', function () {
    if (header) header.classList.toggle('scrolled', window.scrollY > 12);
  });

  // Scroll reveal
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
          if (e.target.querySelector('[data-count]') || e.target.hasAttribute('data-count')) {
            countUp(e.target);
          }
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // Count-up for stats
  function countUp(scope) {
    var nums = scope.matches && scope.matches('[data-count]') ? [scope] : scope.querySelectorAll('[data-count]');
    nums.forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10) || 0;
      var start = 0, dur = 1100, t0 = null;
      function step(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1);
        el.textContent = Math.floor(start + (target - start) * (0.5 - Math.cos(p * Math.PI) / 2));
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }
  // observe stat wrappers explicitly
  document.querySelectorAll('.stat.reveal').forEach(function (s) {
    if ('IntersectionObserver' in window) {
      var so = new IntersectionObserver(function (en) {
        en.forEach(function (x) { if (x.isIntersecting) { countUp(x.target); so.unobserve(x.target); } });
      }, { threshold: 0.4 });
      so.observe(s);
    }
  });

  // Footer year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Contact form -> mailto (static, no backend)
  window.BMI = window.BMI || {};
  window.BMI.sendMail = function (e) {
    e.preventDefault();
    var f = e.target;
    var nama = f.nama.value.trim();
    var email = f.email.value.trim();
    var perusahaan = f.perusahaan.value.trim();
    var pesan = f.pesan.value.trim();
    var subject = encodeURIComponent('Permintaan Informasi dari ' + nama);
    var body = encodeURIComponent(
      'Nama: ' + nama + '\n' +
      'Email: ' + email + '\n' +
      'Perusahaan: ' + (perusahaan || '-') + '\n\n' +
      'Pesan:\n' + pesan
    );
    window.location.href = 'mailto:pt.bajengmaritimeindonesia@gmail.com?subject=' + subject + '&body=' + body;
    return false;
  };
})();
