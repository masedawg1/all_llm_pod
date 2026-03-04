// nav-loader.js
// Usage: <script src="nav-loader.js" data-page="index"></script>
// The data-page attribute on the script tag identifies the current page.

(function () {
  const script = document.currentScript;
  const currentPage = script ? script.getAttribute('data-page') : null;

  fetch('nav.html')
    .then(r => r.text())
    .then(html => {
      const nav = document.getElementById('shared-nav');
      if (!nav) return;
      nav.innerHTML = html;

      // Mark the active page link
      if (currentPage) {
        nav.querySelectorAll('.nav-item[data-page]').forEach(a => {
          if (a.getAttribute('data-page') === currentPage) {
            a.classList.add('active');
          }
        });
      }

      // If the page has on-this-page anchor links, append them after load
      // Each page can define window.NAV_ANCHORS = [{href, label}, ...]
      if (window.NAV_ANCHORS && window.NAV_ANCHORS.length) {
        const label = document.createElement('div');
        label.className = 'nav-section-label';
        label.textContent = 'On This Page';
        nav.insertBefore(label, nav.querySelector('.nav-footer'));

        window.NAV_ANCHORS.forEach(({ href, label: text }) => {
          const a = document.createElement('a');
          a.href = href;
          a.className = 'nav-item';
          a.textContent = text;
          nav.insertBefore(a, nav.querySelector('.nav-footer'));
        });
      }
    })
    .catch(err => console.warn('nav-loader: could not load nav.html', err));
})();
