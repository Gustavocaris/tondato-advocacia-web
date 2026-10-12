/* Tondato Advogados Associados — interações do site */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  var header  = document.getElementById('topo-header');
  var burger  = document.getElementById('burger');
  var menu    = document.getElementById('menu');
  var overlay = document.getElementById('overlay');
  var toTop   = document.getElementById('toTop');

  /* ---------- Menu mobile ---------- */
  function abrirMenu() {
    menu.classList.add('aberto');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Fechar menu');
    overlay.hidden = false;
    requestAnimationFrame(function () { overlay.classList.add('on'); });
    document.body.style.overflow = 'hidden';
  }
  function fecharMenu() {
    menu.classList.remove('aberto');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Abrir menu');
    overlay.classList.remove('on');
    document.body.style.overflow = '';
    setTimeout(function () { overlay.hidden = true; }, 300);
  }
  burger.addEventListener('click', function () {
    menu.classList.contains('aberto') ? fecharMenu() : abrirMenu();
  });
  overlay.addEventListener('click', fecharMenu);
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', fecharMenu); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('aberto')) { fecharMenu(); burger.focus(); }
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 980 && menu.classList.contains('aberto')) fecharMenu();
  });

  /* ---------- Cabeçalho e botão "voltar ao topo" ao rolar ---------- */
  function aoRolar() {
    var y = window.scrollY || window.pageYOffset;
    header.classList.toggle('rolou', y > 10);
    toTop.classList.toggle('on', y > 700);
  }
  window.addEventListener('scroll', aoRolar, { passive: true });
  aoRolar();
  toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  /* ---------- Destaca no menu a seção visível ---------- */
  var links = Array.prototype.slice.call(menu.querySelectorAll('a[href^="#"]'));
  var secoes = links.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  if ('IntersectionObserver' in window) {
    var obsSecao = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (a) { a.classList.toggle('ativo', a.getAttribute('href') === '#' + en.target.id); });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secoes.forEach(function (s) { obsSecao.observe(s); });

    /* ---------- Animação suave ao aparecer ---------- */
    var obsReveal = new IntersectionObserver(function (entradas, obs) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('visivel'); obs.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { obsReveal.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('visivel'); });
  }

  /* ---------- Dúvidas: abre uma pergunta por vez ---------- */
  var perguntas = document.querySelectorAll('.faq-list details');
  perguntas.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) perguntas.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

  /* ---------- Ano atual no rodapé ---------- */
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();
