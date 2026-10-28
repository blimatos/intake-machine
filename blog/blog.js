/* BOLDr Careers blog: sticky header and mobile menu (from the site pages). */
// sticky header: full width at top, pill once scrolled (Monad pattern)
(function(){var h=document.getElementById('hdr'),b=document.getElementById('burger'),m=document.getElementById('mnav');
function s(){h.classList.toggle('stuck',window.scrollY>40)}s();addEventListener('scroll',s,{passive:true});
b.addEventListener('click',function(){var o=h.classList.toggle('open');b.setAttribute('aria-expanded',o)});
m.addEventListener('click',function(e){if(e.target.tagName==='A'){h.classList.remove('open')}});})();
// one reveal moment for the product visuals only
(function(){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.25});document.querySelectorAll('[data-reveal]').forEach(function(el){io.observe(el)});})();
