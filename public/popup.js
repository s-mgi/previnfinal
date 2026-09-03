/* Previn Court — "New Homes Are Starting Now" entry popup */
(function () {
  try {
    if (sessionStorage.getItem('pcPopupShown')) return;
  } catch (e) {}

  var ICON_HOME = '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M8 22 24 9l16 13"/><path d="M12 19v18h9V27h6v10h9V19"/></svg>';
  var ICON_AWARD = '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="24" cy="17" r="10"/><path d="m18 25-3 14 9-5 9 5-3-14"/><path d="M20 17.5 22.8 20 28 14.5"/></svg>';
  var ICON_PIN   = '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M24 43S9 29.8 9 18.5A15 15 0 0 1 39 18.5C39 29.8 24 43 24 43Z"/><circle cx="24" cy="18" r="5.5"/></svg>';
  var ICON_GIFT  = '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="8" y="19" width="32" height="8" rx="1"/><rect x="11" y="27" width="26" height="14" rx="1"/><path d="M24 19v22"/><path d="M24 19c-2-8-14-8-13-1 .5 4 8 3 13 1Z"/><path d="M24 19c2-8 14-8 13-1 -.5 4-8 3-13 1Z"/></svg>';
  var ICON_CAL   = '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="7" y="11" width="34" height="30" rx="2"/><path d="M7 19h34"/><path d="M15 6v9M33 6v9"/><path d="M14 26h4M22 26h4M30 26h4M14 33h4M22 33h4M30 33h4"/></svg>';

  var css = [
    /* ---------- overlay & shell ---------- */
    '#pc-popup-overlay{position:fixed;inset:0;z-index:10000;background:rgba(9,14,24,.8);',
    'display:flex;align-items:center;justify-content:center;padding:clamp(8px,2.4vh,26px);',
    'opacity:0;visibility:hidden;transition:opacity .4s ease,visibility .4s ease;',
    'font-family:"Raleway",sans-serif;box-sizing:border-box}',
    '#pc-popup-overlay *{box-sizing:border-box}',
    '#pc-popup-overlay.pc-open{opacity:1;visibility:visible}',

    '#pc-frame{position:relative;width:min(1100px,97vw);height:min(660px,88vh);',
    'background:#c9a250;padding:clamp(6px,1vw,14px);overflow:hidden;',
    'box-shadow:0 40px 100px rgba(0,0,0,.55);',
    'transform:translateY(26px) scale(.96);opacity:0;',
    'transition:transform .5s cubic-bezier(.2,.7,.2,1),opacity .4s ease;',
    'display:flex}',
    '#pc-popup-overlay.pc-open #pc-frame{transform:translateY(0) scale(1);opacity:1}',

    '#pc-popup{position:relative;width:100%;height:100%;display:flex;flex-direction:column;',
    'min-height:0;overflow:hidden;background:#fff}',

    '.pc-close{position:absolute;top:clamp(10px,1.8vh,18px);right:clamp(12px,1.8vw,20px);z-index:20;',
    'background:rgba(255,255,255,.55);border:none;border-radius:50%;',
    'font-size:clamp(18px,2.6vh,23px);line-height:1;color:#1c2b42;',
    'cursor:pointer;width:30px;height:30px;display:flex;align-items:center;justify-content:center;',
    'transition:transform .25s,background .2s,color .2s;font-weight:300}',
    '.pc-close:hover{transform:rotate(90deg);background:#b8952e;color:#fff}',

    /* ---------- top: content + image (angled divide) ---------- */
    '.pc-top{position:relative;flex:1 1 auto;min-height:0;overflow:hidden}',
    '.pc-right{position:absolute;inset:0;z-index:1;background-color:#1c2b42;',
    'background-size:cover;background-repeat:no-repeat;background-position:center 38%}',
    '.pc-left{position:absolute;top:0;left:0;bottom:0;width:min(49%,470px);z-index:2;background:#fff;',
    'clip-path:polygon(0 0,88% 0,100% 50%,88% 100%,0 100%);',
    'display:flex;align-items:center}',
    '.pc-left-inner{width:100%;max-width:82%;',
    'padding:clamp(16px,3.6vh,34px) 0 clamp(16px,3.6vh,34px) clamp(20px,3.4vw,44px)}',

    '.pc-mark{display:flex;flex-direction:column;align-items:center;text-align:center;',
    'margin-bottom:clamp(8px,1.8vh,16px)}',
    '.pc-logo{width:clamp(26px,4.6vh,42px);height:auto;margin-bottom:6px}',
    '.pc-brand{font-family:"Playfair Display",serif;font-weight:700;',
    'font-size:clamp(1.15rem,3vh,1.55rem);color:#1c2b42;letter-spacing:.05em}',
    '.pc-loc{font-size:clamp(.55rem,1.15vh,.66rem);letter-spacing:.17em;color:#b8952e;',
    'font-weight:700;margin-top:3px}',
    '.pc-rule{width:46px;height:1px;background:#c9a250;margin:0 auto clamp(10px,2.2vh,18px);opacity:.8}',

    '.pc-eyebrow-wrap{text-align:center;margin-bottom:clamp(10px,2.2vh,18px)}',
    '.pc-eyebrow{font-size:clamp(.68rem,1.5vh,.85rem);letter-spacing:.32em;color:#1c2b42;font-weight:600}',
    '.pc-headline{font-family:"Playfair Display",serif;font-weight:700;',
    'font-size:clamp(1.7rem,5.6vh,2.7rem);color:#b8952e;letter-spacing:.01em;line-height:1;',
    'margin:2px 0 8px}',

    '.pc-tiers{display:flex;margin-bottom:clamp(8px,1.6vh,12px)}',
    '.pc-tier{flex:1 1 0;min-width:0;padding:0 clamp(10px,1.8vw,20px) 0 0;',
    'border-right:1px solid #e2ddd0}',
    '.pc-tier:not(:first-child){padding-left:clamp(10px,1.8vw,20px)}',
    '.pc-tier:last-child{border-right:none;padding-right:0}',
    '.pc-tier-name{font-family:"Playfair Display",serif;font-size:clamp(.68rem,1.5vh,.85rem);',
    'font-weight:700;color:#1c2b42;letter-spacing:.01em}',
    '.pc-tier-sub{font-size:clamp(.46rem,.85vh,.55rem);letter-spacing:.05em;color:#7c8ba3;',
    'margin-top:3px;font-weight:600}',
    '.pc-tier-price{font-family:"Playfair Display",serif;font-weight:700;',
    'font-size:clamp(1.05rem,3vh,1.6rem);color:#1c2b42;margin-top:2px;white-space:nowrap;line-height:1}',
    '.pc-tier-price .pc-dollar{font-size:.62em}',
    '.pc-tier-price sup{font-size:.5em;position:relative;top:-1em}',
    '.pc-tier-hst{font-size:clamp(.44rem,.78vh,.52rem);letter-spacing:.03em;color:#b8952e;',
    'margin-top:3px;font-weight:700}',

    '.pc-fine{font-size:clamp(.5rem,.82vh,.58rem);color:#9aa5b5;line-height:1.45;',
    'padding-top:clamp(6px,1.4vh,10px);border-top:1px solid #f0ede4}',

    /* ---------- bonus bar ---------- */
    '.pc-bonus{position:relative;z-index:2;background:#c9a250;',
    'padding:clamp(10px,2vh,16px) clamp(18px,3vw,30px);display:flex;align-items:center;',
    'gap:clamp(10px,1.6vw,18px)}',
    '.pc-bonus-icon{flex-shrink:0;width:clamp(30px,5vh,44px);height:clamp(30px,5vh,44px);',
    'border-radius:50%;background:#1c2b42;display:flex;align-items:center;justify-content:center}',
    '.pc-bonus-icon svg{width:56%;height:56%;color:#c9a250}',
    '.pc-bonus-text{flex:1 1 auto;font-size:clamp(.66rem,1.3vh,.8rem);line-height:1.4;',
    'font-weight:500;color:#1c2b42}',
    '.pc-bonus-text .pc-bonus-title{font-weight:800;letter-spacing:.01em;display:block;',
    'font-size:clamp(.72rem,1.5vh,.92rem);margin-bottom:1px}',
    '.pc-bonus-text b{font-weight:800}',
    '.pc-bonus-note{flex-shrink:0;text-align:right;font-size:clamp(.48rem,.8vh,.56rem);',
    'line-height:1.5;max-width:230px;color:#4a3c17}',

    /* ---------- cta bar ---------- */
    '.pc-cta{position:relative;z-index:2;background:#152238;color:#fff;',
    'padding:clamp(12px,2.2vh,18px) clamp(18px,3vw,30px);display:flex;align-items:center;',
    'justify-content:space-between;gap:14px;flex-wrap:wrap}',
    '.pc-cta-left{display:flex;align-items:center;gap:12px}',
    '.pc-cta-icon{flex-shrink:0;width:clamp(22px,3.6vh,30px);height:clamp(22px,3.6vh,30px);color:#c9a250}',
    '.pc-cta-icon svg{width:100%;height:100%}',
    '.pc-cta-title{font-weight:800;font-size:clamp(.78rem,1.5vh,.95rem);letter-spacing:.02em}',
    '.pc-cta-sub{font-size:clamp(.56rem,1.05vh,.66rem);letter-spacing:.06em;color:#c9a250;',
    'margin-top:2px;font-weight:600}',
    '.pc-cta-btn{display:inline-flex;align-items:center;gap:9px;background:transparent;',
    'border:1px solid #c9a250;color:#c9a250;text-decoration:none;',
    'font-size:clamp(.6rem,1.15vh,.72rem);font-weight:800;letter-spacing:.1em;',
    'padding:clamp(9px,1.8vh,13px) clamp(16px,2vw,26px);white-space:nowrap;',
    'transition:background .2s,color .2s}',
    '.pc-cta-btn:hover{background:#c9a250;color:#152238}',

    /* ---------- feature strip ---------- */
    '.pc-features{position:relative;z-index:2;display:flex;background:#fff}',
    '.pc-feature{flex:1 1 0;min-width:0;display:flex;align-items:center;gap:10px;',
    'padding:clamp(8px,1.8vh,16px) clamp(10px,1.6vw,18px);border-top:1px solid #ece7da;',
    'border-right:1px solid #ece7da}',
    '.pc-feature:last-child{border-right:none}',
    '.pc-feature-icon{flex-shrink:0;width:clamp(18px,3.2vh,26px);height:clamp(18px,3.2vh,26px);color:#c9a250}',
    '.pc-feature-icon svg{width:100%;height:100%}',
    '.pc-feature-text{font-size:clamp(.52rem,1vh,.62rem);letter-spacing:.02em;line-height:1.35;',
    'color:#1c2b42;font-weight:700}',

    /* ---------- responsive ---------- */
    '@media(max-width:760px),(max-height:600px){',
    '  .pc-right{display:none}',
    '  .pc-left{position:relative;width:100%;clip-path:none;inset:auto}',
    '  .pc-left-inner{max-width:100%;padding:22px 22px 16px}',
    '  .pc-bonus-note{display:none}',
    '  .pc-features{flex-wrap:wrap}',
    '  .pc-feature{flex:1 1 50%;border-right:none}',
    '}',
    '@media(max-width:460px){',
    '  .pc-tiers{flex-wrap:wrap;row-gap:10px}',
    '  .pc-tier{flex:1 1 42%;border-right:none}',
    '  .pc-bonus,.pc-cta{padding:12px 18px}',
    '  .pc-cta{justify-content:center;text-align:center}',
    '  .pc-cta-left{width:100%;justify-content:center}',
    '}'
  ].join('');

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var overlay = document.createElement('div');
  overlay.id = 'pc-popup-overlay';
  overlay.innerHTML = [
    '<div id="pc-frame">',
    '<div id="pc-popup" role="dialog" aria-modal="true" aria-label="Previn Court new homes announcement">',
    '  <button class="pc-close" aria-label="Close">&times;</button>',
    '  <div class="pc-top">',
    '    <div class="pc-right" style="background-image:url(images/collections/50ft/hero.jpg)"></div>',
    '    <div class="pc-left"><div class="pc-left-inner">',
    '      <div class="pc-mark">',
    '        <img class="pc-logo" src="images/logo-icon.png" alt="">',
    '        <div class="pc-brand">PREVIN COURT</div>',
    '        <div class="pc-loc">WESTGATE VILLAGE, ALLISTON</div>',
    '      </div>',
    '      <div class="pc-rule"></div>',
    '      <div class="pc-eyebrow-wrap">',
    '        <div class="pc-eyebrow">NEW HOMES ARE</div>',
    '        <div class="pc-headline">STARTING NOW</div>',
    '        <div class="pc-rule"></div>',
    '      </div>',
    '      <div class="pc-tiers">',
    '        <div class="pc-tier">',
    '          <div class="pc-tier-name">32&rsquo; HOMES</div>',
    '          <div class="pc-tier-sub">STARTING IN THE</div>',
    '          <div class="pc-tier-price"><span class="pc-dollar">$</span>600s<sup>*</sup></div>',
    '          <div class="pc-tier-hst">WITH THE HST REBATE</div>',
    '        </div>',
    '        <div class="pc-tier">',
    '          <div class="pc-tier-name">40&rsquo; HOMES</div>',
    '          <div class="pc-tier-sub">STARTING IN THE</div>',
    '          <div class="pc-tier-price"><span class="pc-dollar">$</span>800s<sup>*</sup></div>',
    '          <div class="pc-tier-hst">WITH THE HST REBATE</div>',
    '        </div>',
    '        <div class="pc-tier">',
    '          <div class="pc-tier-name">50&rsquo; HOMES</div>',
    '          <div class="pc-tier-sub">STARTING IN THE</div>',
    '          <div class="pc-tier-price">LOW <span class="pc-dollar">$</span>800s<sup>*</sup></div>',
    '          <div class="pc-tier-hst">WITH THE HST REBATE</div>',
    '        </div>',
    '      </div>',
    '      <div class="pc-fine">*Prices include applicable HST rebate savings. Prices, sizes and specifications are subject to change without notice. E. &amp; O. E.</div>',
    '    </div></div>',
    '  </div>',
    '  <div class="pc-bonus">',
    '    <div class="pc-bonus-icon">' + ICON_GIFT + '</div>',
    '    <div class="pc-bonus-text"><span class="pc-bonus-title">BONUS INCENTIVES!</span>New Start &amp; Inventory Homes include ',
    '<b>D&eacute;cor Dollars for Upgrades + 5-Piece Appliance Package ($7,000 Value).</b></div>',
    '    <div class="pc-bonus-note">*Bonus incentives and offerings are subject to change without notice.<br>See Sales Representative for details. E. &amp; O. E.</div>',
    '  </div>',
    '  <div class="pc-cta">',
    '    <div class="pc-cta-left">',
    '      <div class="pc-cta-icon">' + ICON_CAL + '</div>',
    '      <div><div class="pc-cta-title">REGISTER TODAY</div><div class="pc-cta-sub">FOR EXCLUSIVE UPDATES &amp; EARLY ACCESS</div></div>',
    '    </div>',
    '    <a class="pc-cta-btn" href="models.html">EXPLORE THE COLLECTIONS &rarr;</a>',
    '  </div>',
    '  <div class="pc-features">',
    '    <div class="pc-feature"><div class="pc-feature-icon">' + ICON_HOME + '</div><div class="pc-feature-text">MODERN &amp; TRADITIONAL<br>HOME DESIGNS</div></div>',
    '    <div class="pc-feature"><div class="pc-feature-icon">' + ICON_AWARD + '</div><div class="pc-feature-text">LEGACY OF<br>CRAFTSMANSHIP</div></div>',
    '    <div class="pc-feature"><div class="pc-feature-icon">' + ICON_PIN + '</div><div class="pc-feature-text">A CONNECTED COMMUNITY<br>IN ALLISTON</div></div>',
    '    <div class="pc-feature"><div class="pc-feature-icon">' + ICON_GIFT + '</div><div class="pc-feature-text">LIMITED TIME<br>BONUS INCENTIVES</div></div>',
    '  </div>',
    '</div>',
    '</div>'
  ].join('');
  document.body.appendChild(overlay);

  function closePopup() {
    overlay.classList.remove('pc-open');
    try { sessionStorage.setItem('pcPopupShown', '1'); } catch (e) {}
  }

  overlay.querySelector('.pc-close').addEventListener('click', closePopup);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closePopup();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closePopup();
  });

  window.addEventListener('load', function () {
    setTimeout(function () {
      overlay.classList.add('pc-open');
    }, 900);
  });
})();
