window.WG = {};

(function () {
  const screenLang = { en: 'en', ja: 'ja', menu: 'en' };
  const screenLabel = { menu: 'Language selection', en: 'English game', ja: '日本語ゲーム' };

  function showScreen(name) {
    document.querySelectorAll('[data-screen]').forEach(el => {
      el.hidden = el.dataset.screen !== name;
    });
    document.documentElement.lang = screenLang[name] || 'en';

    const announce = document.querySelector('[data-announce]');
    if (announce) announce.textContent = screenLabel[name] || '';
  }

  document.querySelectorAll('[data-target]').forEach(btn => {
    btn.addEventListener('click', () => showScreen(btn.dataset.target));
  });

  document.querySelectorAll('[data-back]').forEach(btn => {
    btn.addEventListener('click', () => showScreen('menu'));
  });
}());
