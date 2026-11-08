/* BOLDr Careers blog: tool guide helpers (7 Nov 2026). Loaded by tool guides only.
   1. Signed-in readers: any link with data-member-label switches to that label, and to
      data-member-href when set (the tool's route in the app). The "New to BOLDr Careers?"
      box hides for them. Sign-in is read from the Supabase session the app keeps in this
      browser (same site, nothing is sent anywhere).
   2. Video key moments: ?t=<seconds> in the address starts the guide's video there,
      so the Clip links in the structured data land on the right step. */
(function () {
  var member = false;
  try {
    for (var i = 0; i < localStorage.length; i++) {
      var k = localStorage.key(i);
      if (!/^sb-.+-auth-token$/.test(k)) continue;
      var v = JSON.parse(localStorage.getItem(k) || 'null');
      var exp = v && (v.expires_at || (v.currentSession && v.currentSession.expires_at));
      if (v && (!exp || exp * 1000 > Date.now())) { member = true; break; }
    }
    // the app keeps its own sign-in in bc.session (7 Nov 2026)
    var bc = JSON.parse(localStorage.getItem('bc.session') || 'null');
    if (bc && bc.access_token && (bc.refresh_token || (bc.expires_at && bc.expires_at * 1000 > Date.now()))) member = true;
  } catch (e) {}
  // visitors: sign-up remembers the tool and opens it once the plan is chosen
  if (!member) Array.prototype.forEach.call(document.querySelectorAll('a[data-tool][href="/app.html#/signup"]'), function (a) {
    a.setAttribute('href', '/app.html#/signup?next=' + encodeURIComponent(a.getAttribute('data-tool')));
    a.addEventListener('click', function () { try { localStorage.setItem('boldr.guide.from', a.getAttribute('data-tool')); } catch (e) {} });
  });
  if (member) Array.prototype.forEach.call(document.querySelectorAll('a[data-member-href]'), function (a) {
    a.addEventListener('click', function () { try { localStorage.setItem('boldr.guide.to', JSON.stringify({ tool: a.getAttribute('data-tool'), at: Date.now() })); } catch (e) {} });
  });
  if (member) {
    document.documentElement.classList.add('is-member');
    Array.prototype.forEach.call(document.querySelectorAll('[data-member-label]'), function (a) {
      a.textContent = a.getAttribute('data-member-label');
      var h = a.getAttribute('data-member-href');
      if (h) a.setAttribute('href', h);
    });
  }
  try {
    var t = parseInt(new URLSearchParams(location.search).get('t'), 10);
    var box = document.getElementById('video'), vid = box && box.querySelector('video');
    if (vid && t > 0) {
      var go = function () { try { vid.currentTime = t; } catch (e) {} };
      if (vid.readyState >= 1) go(); else { vid.preload = 'metadata'; vid.addEventListener('loadedmetadata', go, { once: true }); }
      box.scrollIntoView({ block: 'center' });
    }
  } catch (e) {}
})();
