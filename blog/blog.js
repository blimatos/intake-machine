/* BOLDr Careers blog: sticky header and mobile menu (from the site pages). */
// sticky header: full width at top, pill once scrolled (Monad pattern)
(function(){var h=document.getElementById('hdr'),b=document.getElementById('burger'),m=document.getElementById('mnav');
function s(){h.classList.toggle('stuck',window.scrollY>40)}s();addEventListener('scroll',s,{passive:true});
b.addEventListener('click',function(){var o=h.classList.toggle('open');b.setAttribute('aria-expanded',o)});
m.addEventListener('click',function(e){if(e.target.tagName==='A'){h.classList.remove('open')}});})();
// one reveal moment for the product visuals only
(function(){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.25});document.querySelectorAll('[data-reveal]').forEach(function(el){io.observe(el)});})();
/* BOLDr Careers blog, round 3 (3 Nov 2026): search, section filter, type, sort and "show more" on the blog home; the "On this page" list on posts. Works without it: every card is a plain link. */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var hdr = $('.hdr'); if (hdr) document.documentElement.style.setProperty('--hdr-h', hdr.offsetHeight + 'px');
  var grid = $('#bx-grid');
  if (grid) {
    var cards = $$('.bx-card', grid), S = { q: '', s: 'all', t: 'all', sort: 'latest', more: false };
    var home = $$('[data-home]'), count = $('#bx-count'), empty = $('#bx-empty'), moreW = $('#bx-more') && $('#bx-more').parentNode;
    var names = {}; $$('.bx-chips a').forEach(function (a) { names[a.getAttribute('data-s')] = a.firstChild && a.textContent.replace(/\s*\d+\s*$/, '').trim(); });
    var run = function () {
      var q = S.q.trim().toLowerCase(), plain = !q && S.s === 'all' && S.t === 'all', shown = 0, i = 0;
      home.forEach(function (el) { el.hidden = !plain; });
      var list = cards.slice();
      if (S.sort === 'quick') list.sort(function (a, b) { return (+a.getAttribute('data-m')) - (+b.getAttribute('data-m')); });
      else list.sort(function (a, b) { return String(b.getAttribute('data-d')).localeCompare(String(a.getAttribute('data-d'))); });
      list.forEach(function (c) { grid.appendChild(c); });
      list.forEach(function (c) {
        var ok = (S.s === 'all' || c.getAttribute('data-s') === S.s) && (S.t === 'all' || c.getAttribute('data-t') === S.t) && (!q || q.split(/\s+/).every(function (w) { return c.getAttribute('data-x').indexOf(w) >= 0; }));
        if (plain && c.hasAttribute('data-top')) ok = false;
        if (ok) { i++; if (plain && !S.more && i > 9) ok = false; }
        c.hidden = !ok; if (ok) shown++;
      });
      var total = plain ? shown + $$('[data-top]', grid).length : shown;
      if (moreW) moreW.hidden = !(plain && !S.more && i > 9);
      if (empty) empty.hidden = total > 0;
      if (count) count.textContent = !total ? 'No posts match.' : q ? total + (total === 1 ? ' answer' : ' answers') + ' for “' + S.q.trim() + '”' : plain ? (shown ? 'Latest posts' : 'More posts are on their way.') : total + (total === 1 ? ' post' : ' posts') + (S.s === 'all' ? '' : ' in ' + (names[S.s] || ''));
    };
    $$('.bx-chips a').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); S.s = a.getAttribute('data-s'); $$('.bx-chips a').forEach(function (x) { x.setAttribute('aria-pressed', x === a ? 'true' : 'false'); }); run(); }); });
    var ty = $('#bx-type'); if (ty) ty.addEventListener('change', function () { S.t = ty.value; run(); });
    var so = $('#bx-sort'); if (so) so.addEventListener('change', function () { S.sort = so.value; run(); });
    var mb = $('#bx-more'); if (mb) mb.addEventListener('click', function () { S.more = true; run(); });
    var qi = $('#bx-q'), form = $('[data-search]');
    if (qi) qi.addEventListener('input', function () { S.q = qi.value; run(); });
    if (form) form.addEventListener('submit', function (e) { e.preventDefault(); S.q = qi.value; run(); if (count) count.scrollIntoView({ block: 'center', behavior: 'smooth' }); });
    try { var u = new URLSearchParams(location.search).get('q'); if (u && qi) { qi.value = u; S.q = u; } } catch (e) {}
    run();
  }
  var toc = $('.bx-toc');
  if (toc) {
    var links = $$('a[href^="#"]', toc), left = $('.bx-left', toc), mins = left ? +left.getAttribute('data-mins') || 0 : 0, bar = $('.bx-bar i', toc), lab = left && $('span', left);
    var spy = function () {
      var cur = links.length ? links[0] : null;
      links.forEach(function (a) { var el = document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1))); if (el && el.getBoundingClientRect().top < innerHeight * 0.3) cur = a; });
      links.forEach(function (a) { a.classList.toggle('on', a === cur); });
      var h = document.documentElement, pr = Math.min(1, Math.max(0, scrollY / Math.max(1, h.scrollHeight - innerHeight)));
      if (bar) bar.style.width = (pr * 100) + '%';
      if (lab && mins) { var l = Math.ceil(mins * (1 - pr)); lab.textContent = pr < 0.02 ? mins + ' min read' : l <= 0 ? 'You’re at the end' : mins + ' min read · about ' + l + ' min left'; }
    };
    addEventListener('scroll', spy, { passive: true }); spy();
  }
})();
