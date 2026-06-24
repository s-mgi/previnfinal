(function(){
  var el = document.getElementById('site-footer');
  if (!el) return;
  el.innerHTML = [
    '<div class="foot-col rv vis">',
    '  <a href="index.html">Home</a>',
    '  <a href="about.html">About</a>',
    '  <a href="community.html">Community</a>',
    '</div>',
    '<div class="foot-col rv d1 vis">',
    '  <a href="models.html">Models</a>',
    '  <a href="gallery.html">Resources</a>',
    '  <a href="contact.html">Contact</a>',
    '</div>',
    '<div class="foot-center rv d2 vis">',
    '  <img src="images/logo-full.png" alt="Previn Court Homes" style="height:55px;width:auto;display:block;margin:0 auto">',
    '  <div class="foot-copy">&copy;2026 Previn Court Homes.</div>',
    '</div>',
    '<div class="foot-addr rv d3 vis">',
    '  <span>212 WALKER BOULEVARD,</span>',
    '  <span>ALLISTON, ONTARIO</span>',
    '  <span class="phone">705-434-0255</span>',
    '</div>'
  ].join('\n');
})();
