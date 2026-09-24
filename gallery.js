// ギャラリーの写真をクリックすると拡大表示する（大規模改修の領域）
(function () {
  var dialog = document.querySelector('.lightbox');
  if (!dialog || typeof dialog.showModal !== 'function') return;

  var img = dialog.querySelector('.lightbox__img');
  var title = dialog.querySelector('.lightbox__title');
  var titleEn = dialog.querySelector('.lightbox__title-en');
  var meta = dialog.querySelector('.lightbox__meta');

  document.querySelectorAll('.work__open').forEach(function (btn) {
    btn.addEventListener('click', function () {
      img.src = btn.dataset.src;
      img.alt = btn.dataset.title || '';
      title.textContent = btn.dataset.title || '';
      titleEn.textContent = btn.dataset.titleEn || '';
      meta.textContent = btn.dataset.meta || '';
      dialog.showModal();
    });
  });

  // 「CLOSE」ボタン、または写真以外の余白をクリックで閉じる
  dialog.querySelector('.lightbox__close').addEventListener('click', function () {
    dialog.close();
  });
  dialog.addEventListener('click', function (e) {
    if (e.target === dialog || e.target.tagName === 'FIGURE') dialog.close();
  });
})();
