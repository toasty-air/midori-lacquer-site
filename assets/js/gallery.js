// ギャラリーの写真をクリックすると拡大表示する。1作品に複数の写真があれば、
// 左右のスワイプ・矢印ボタン・キーボードの左右キーで切り替えられる（大規模改修の領域）
(function () {
  var dialog = document.querySelector('.lightbox');
  if (!dialog || typeof dialog.showModal !== 'function') return;

  var img = dialog.querySelector('.lightbox__img');
  var stage = dialog.querySelector('.lightbox__stage');
  var title = dialog.querySelector('.lightbox__title');
  var titleEn = dialog.querySelector('.lightbox__title-en');
  var meta = dialog.querySelector('.lightbox__meta');
  var dots = dialog.querySelector('.lightbox__dots');

  var srcs = [];
  var index = 0;

  function show(i) {
    index = (i + srcs.length) % srcs.length;
    img.src = srcs[index];
    Array.prototype.forEach.call(dots.children, function (d, n) {
      d.className = n === index ? 'is-current' : '';
    });
    // 隣の写真を先に読み込んでおく（切り替えを速くする。開くまでは読み込まない）
    if (srcs.length > 1) {
      [index + 1, index - 1].forEach(function (n) {
        new Image().src = srcs[(n + srcs.length) % srcs.length];
      });
    }
  }

  document.querySelectorAll('.work__open').forEach(function (btn) {
    btn.addEventListener('click', function () {
      srcs = [btn.dataset.src];
      var extra = btn.parentNode.querySelectorAll('.work__extra li');
      Array.prototype.forEach.call(extra, function (li) {
        if (li.dataset.src) srcs.push(li.dataset.src);
      });
      img.alt = btn.dataset.title || '';
      title.textContent = btn.dataset.title || '';
      titleEn.textContent = btn.dataset.titleEn || '';
      meta.textContent = btn.dataset.meta || '';
      dots.innerHTML = srcs.map(function () { return '<span></span>'; }).join('');
      dialog.classList.toggle('lightbox--single', srcs.length < 2);
      show(0);
      dialog.showModal();
    });
  });

  dialog.querySelector('.lightbox__prev').addEventListener('click', function () { show(index - 1); });
  dialog.querySelector('.lightbox__next').addEventListener('click', function () { show(index + 1); });

  dialog.addEventListener('keydown', function (e) {
    if (srcs.length < 2) return;
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });

  // スワイプ（指・ペンの横の動き）で切り替える
  var startX = null;
  stage.addEventListener('pointerdown', function (e) { startX = e.clientX; });
  stage.addEventListener('pointerup', function (e) {
    if (startX === null || srcs.length < 2) { startX = null; return; }
    var dx = e.clientX - startX;
    startX = null;
    if (Math.abs(dx) > 40) show(dx < 0 ? index + 1 : index - 1);
  });
  stage.addEventListener('pointercancel', function () { startX = null; });

  // 「CLOSE」ボタン、または写真以外の余白をクリックで閉じる
  dialog.querySelector('.lightbox__close').addEventListener('click', function () {
    dialog.close();
  });
  dialog.addEventListener('click', function (e) {
    if (e.target === dialog || e.target.tagName === 'FIGURE') dialog.close();
  });
})();
