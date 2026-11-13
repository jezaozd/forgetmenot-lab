(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // проекты из @forgetmenot_lab; sel — кадр, который обведён
  var P = [
    { id: 'DdJFWdxEVq_', t: 'Agent Provocateur', m: 'Показ · Гостиный двор · сентябрь 2026', r: 'концепция, стиль, организация, реализация', sel: 6 },
    { id: 'DVF4jBQCNqG', t: 'Chaumet', m: 'Ужин · Maison Revka, Дубай', r: 'идея и продакшн', sel: 0 },
    { id: 'DegnWgujv1X', t: 'LUJE BY MUBO', m: 'Светский ужин к открытию · ENZO Hotel Moscow · октябрь 2026', r: 'идея, концепция, реализация', sel: 1 },
    { id: 'DWGuuvlDXBQ', t: 'OMA', m: 'Открытие ресторана · Москва · март 2026', r: 'продакшн и реализация', sel: 3 },
    { id: 'DVO1y3RjY8B', t: '2Mood', m: 'Ужин и презентация капсулы · особняк на Волхонке · сентябрь 2025', r: 'идея и продакшн', sel: 0 },
    { id: 'DWRAI14DZH3', t: 'Ekonika × Yuliawave', m: 'Презентация капсулы · МАММ · апрель 2025', r: 'продакшн и реализация', sel: 2 },
    { id: 'DcdfkzFkTjX', t: 'Alina Issa × Yulia Posh', m: 'Презентация капсулы · KM20 Food · июнь 2025', r: 'продакшн', sel: 3 },
    { id: 'DYyrQ2eDi7D', t: 'Freeage', m: 'Презентация, лукбук и ужин на 70 гостей · Regent', r: 'идея и продакшн, стиль — Мухина', sel: 1 },
    { id: 'DY4nN4ijBaC', t: 'VI Community', m: 'Закрытие 7-го сезона · филиал Ельцин-центра в Москве', r: 'продакшн', sel: 4 },
    { id: 'DWVVP-5CGRo', t: 'Private birthday', m: 'Частный день рождения · Париж', r: 'продакшн и реализация', sel: 0 },
    { id: 'Db8iDEtlzBM', t: 'Запуск Forget Me Not Lab', m: 'Ужин в честь открытия агентства · Regent', r: 'колбы вместо ваз', sel: 3 }
  ];
  var all = [];
  P.forEach(function (p, pi) { for (var i = 0; i < 8; i++) all.push({ p: pi, i: i }); });

  function src(p, i, big) { return 'img/' + (big ? 'l/' : 's/') + P[p].id + '_' + i + '.webp'; }

  // неровное кольцо, как обводка восковым карандашом
  function ring() {
    var pts = [], n = 26, start = Math.random() * 6.28;
    for (var k = 0; k <= n + 3; k++) {
      var a = start + k / n * 6.2832;
      var w = 1 + Math.sin(k * 1.7) * .03 + (Math.random() - .5) * .04 + k * .003;
      pts.push([50 + Math.cos(a) * 47 * w, 50 + Math.sin(a) * 47 * w]);
    }
    var d = 'M' + pts[0][0].toFixed(1) + ' ' + pts[0][1].toFixed(1);
    for (var j = 1; j < pts.length - 1; j++) {
      var mx = (pts[j][0] + pts[j + 1][0]) / 2, my = (pts[j][1] + pts[j + 1][1]) / 2;
      d += ' Q' + pts[j][0].toFixed(1) + ' ' + pts[j][1].toFixed(1) + ' ' + mx.toFixed(1) + ' ' + my.toFixed(1);
    }
    return '<svg class="ring" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="' + d + '"/></svg>';
  }

  var frameNo = 0;
  function frame(p, i, sel) {
    frameNo++;
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'fr' + (sel ? ' sel pre' : '');
    b.dataset.p = p; b.dataset.i = i;
    b.setAttribute('aria-label', P[p].t + ', кадр ' + (i + 1) + ' — открыть крупно');
    b.innerHTML = '<img data-src="' + src(p, i) + '" alt="" width="300" height="400" decoding="async">' + ring() +
      '<span class="no" aria-hidden="true">' + frameNo + '<b>' + frameNo + 'A</b></span>';
    return b;
  }
  function strip(list, label) {
    var s = document.createElement('div');
    s.className = 'strip';
    list.forEach(function (f) { s.appendChild(frame(f.p, f.i, f.sel)); });
    return s;
  }

  /* ---------- первый экран: лист с лучшими кадрами разных проектов ---------- */
  var hero = $('#heroSheet');
  var picks = [[0, 6], [1, 0], [2, 1], [4, 0], [3, 3], [5, 2], [6, 3], [10, 3],
               [0, 0], [1, 4], [2, 3], [7, 1], [8, 4], [4, 6], [9, 0], [5, 6],
               [1, 6], [0, 2], [3, 0], [7, 0], [2, 0], [10, 7], [6, 1], [4, 3]];
  var circled = { 1: 'вот этот', 13: 'обложка' };
  for (var row = 0; row < 3; row++) {
    var list = picks.slice(row * 8, row * 8 + 8).map(function (x, k) { return { p: x[0], i: x[1], sel: !!circled[row * 8 + k] }; });
    var st = strip(list);
    hero.appendChild(st);
    var cap = document.createElement('div');
    cap.className = 'strip-cap'; cap.setAttribute('aria-hidden', 'true');
    cap.innerHTML = '<span>FMNL 400 · лист ' + (row + 1) + '</span><span>' + ['Москва', 'Дубай', 'Париж'][row] + '</span>';
    hero.appendChild(cap);
  }
  Object.keys(circled).forEach(function (k) {
    var fr = $$('.fr', hero)[k];
    var n = document.createElement('span');
    n.className = 'pen'; n.textContent = circled[k]; n.setAttribute('aria-hidden', 'true');
    n.style.left = '8%'; n.style.top = '-30px';
    fr.appendChild(n);
  });

  /* ---------- проекты: по полосе на событие ---------- */
  var box = $('#strips');
  P.forEach(function (p, pi) {
    var a = document.createElement('article');
    a.className = 'proj';
    a.innerHTML = '<div><h3>' + p.t + '</h3><p class="meta">' + p.m + '</p><p class="role">' + p.r + '</p></div>';
    var list = []; for (var i = 0; i < 8; i++) list.push({ p: pi, i: i, sel: i === p.sel });
    var st = strip(list);
    st.style.setProperty('--r', ((pi % 3) - 1) * .35 + 'deg');
    a.appendChild(st);
    box.appendChild(a);
  });

  /* ---------- кадры проявляются каскадом по номерам ---------- */
  function develop(stripEl) {
    $$('img[data-src]', stripEl).forEach(function (im, k) {
      im.onload = function () { setTimeout(function () { im.classList.add('on'); }, calm ? 0 : k * 70); };
      im.src = im.dataset.src; im.removeAttribute('data-src');
    });
    // обводка рисуется после проявки
    $$('.fr.pre', stripEl).forEach(function (fr) {
      fr.classList.remove('sel');
      setTimeout(function () { fr.classList.add('sel'); fr.classList.remove('pre'); }, calm ? 0 : 900);
    });
  }
  var strips = $$('.strip');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { develop(e.target); io.unobserve(e.target); } });
    }, { rootMargin: '200px 0px' });
    strips.forEach(function (s) { io.observe(s); });
  } else strips.forEach(develop);

  /* ---------- лупа ---------- */
  var loupe = $('#loupe'), fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  if (fine && loupe) {
    document.addEventListener('pointermove', function (e) {
      var fr = e.target.closest && e.target.closest('.fr');
      if (!fr) { loupe.classList.remove('on'); return; }
      var im = $('img', fr), r = fr.getBoundingClientRect();
      var z = 2.6, w = r.width * z, h = r.height * z;
      var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      loupe.style.backgroundImage = 'url(' + (im.currentSrc || im.src) + ')';
      loupe.style.backgroundSize = w + 'px ' + h + 'px';
      loupe.style.backgroundPosition = (100 - x * w) + 'px ' + (100 - y * h) + 'px';
      loupe.style.left = (e.clientX - 100) + 'px';
      loupe.style.top = (e.clientY - 100) + 'px';
      loupe.classList.add('on');
    }, { passive: true });
  }

  /* ---------- крупный просмотр ---------- */
  var lb = $('#lb'), lbImg = $('#lbImg'), lbCap = $('#lbCap'), lbN = $('#lbN'), cur = 0, last = null;
  function show(k) {
    cur = (k + all.length) % all.length;
    var f = all[cur];
    lbImg.src = src(f.p, f.i, true);
    lbImg.alt = P[f.p].t + ', кадр ' + (f.i + 1);
    lbCap.textContent = P[f.p].t + ' — ' + P[f.p].m;
    lbN.textContent = (f.i + 1) + ' / 8';
  }
  document.addEventListener('click', function (e) {
    var fr = e.target.closest && e.target.closest('.fr');
    if (!fr || !lb) return;
    last = fr;
    var p = +fr.dataset.p, i = +fr.dataset.i;
    // клик обводит кадр, как редактор на листе
    if (!fr.classList.contains('sel')) fr.classList.add('sel');
    show(p * 8 + i);
    if (lb.showModal) lb.showModal(); else lb.setAttribute('open', '');
  });
  if (lb) {
    $('.lb-x', lb).addEventListener('click', function () { lb.close(); });
    $('#lbPrev').addEventListener('click', function () { show(cur - 1); });
    $('#lbNext').addEventListener('click', function () { show(cur + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
    lb.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') show(cur + 1);
      if (e.key === 'ArrowLeft') show(cur - 1);
    });
    lb.addEventListener('close', function () { if (last) last.focus({ preventScroll: true }); });
  }

  /* ---------- запрос ---------- */
  var form = $('#form'), ferr = $('#ferr'), fnote = $('#fnote');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var who = form.elements.who;
    if (who.value.trim().length < 2) {
      who.setAttribute('aria-invalid', 'true');
      ferr.textContent = 'Напишите компанию или своё имя, чтобы агентство знало, кому отвечать.';
      who.focus(); return;
    }
    who.setAttribute('aria-invalid', 'false'); ferr.textContent = '';
    var kind = (form.querySelector('input[name="kind"]:checked') || {}).value;
    var text = 'Екатерина, здравствуйте! Хотим обсудить событие с Forget Me Not Lab.\n' + who.value.trim() +
      '\nФормат: ' + kind + (form.elements.when.value.trim() ? '\nГород и дата: ' + form.elements.when.value.trim() : '') +
      (form.elements.guests.value.trim() ? '\nГостей: ' + form.elements.guests.value.trim() : '');
    var open = function () { window.open('https://t.me/mukhinss', '_blank', 'noopener'); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { fnote.textContent = 'Текст скопирован. Вставьте его в Telegram, который открылся в новой вкладке.'; open(); }, open);
    } else open();
  });
})();
