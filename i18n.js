// ── Display language translations ────────────────────────────────
const TRANSLATIONS = {
  en: {
    htp_rule:      'Guess the hidden 5-letter word in 6 tries.',
    htp_desc:      'After each guess, the tiles change colour to show how close you are.',
    green:         'Green — right letter, right spot',
    yellow:        'Yellow — right letter, wrong spot',
    gray:          'Gray — letter not in the word',
    htp_hint:      'Use your keyboard or tap the on-screen keys. Stuck? Press 💡 Hint to reveal one letter.',
    random:        'Random',
    daily:         'Daily Challenge',
    stats:         'Stats',
    back:          '← Back',
    settings:      'Settings',
    dark_mode:     'Dark Mode',
    high_contrast: 'High Contrast',
    easy_mode:     'Easy Mode (8 guesses)',
    hard_mode:     'Hard Mode',
    hard_green:    'Position {pos} must be {letter}',
    hard_yellow:   'Guess must contain {letter}',
    hard_absent:   '{letter} not in target',
    hard_mid_game: 'Cannot change Hard Mode during a game',
    close:         'Close',
    play_again:    'Play Again',
    share:         'Share result',
    copied:        'Copied! ✓',
    not_enough:    'Not enough letters',
    not_valid:     'Not a valid word',
    hint_used:     '💡 Hint used',
    hint_letter:   '💡 Hint: "{letter}" is in position {pos}',
    all_revealed:  'All letters already revealed!',
    solved:        'Solved in {n}!',
    answer_was:    'The answer was',
    played:        'Played',
    win_pct:       'Win %',
    streak:        'Streak',
    best:          'Best',
    correct:       'Correct',
    present:       'Present',
    absent:        'Absent',
    how_to_play:   'How to Play',
    language:      'Language',
  },
  my: {
    htp_rule:      'အက္ခရာ ၅ လုံးပါဝင်သော ဝှက်ထားသည့် စကားလုံးကို ကြိုးစားခန့်မှန်းပါ။',
    htp_desc:      'တစ်ကြိမ် ခန့်မှန်းပြီးတိုင်း ကွက်လပ်များ၏ အရောင်ပြောင်းသွားမည်ဖြစ်ပြီး၊ သင့်ခန့်မှန်းချက် မည်မျှနီးစပ်ကြောင်း ပြသပေးပါမည်။',
    green:         'အစိမ်းရောင် — စာလုံးလည်းမှန်၊ နေရာလည်းမှန်သည်',
    yellow:        'အဝါရောင် — စာလုံးမှန်သော်လည်း နေရာမှားနေသည်',
    gray:          'မီးခိုးရောင် — ထိုစာလုံးသည် စကားလုံးထဲတွင် မပါဝင်ပါ',
    htp_hint:      'သင့်ကီးဘုတ်ကို အသုံးပြုပါ သို့မဟုတ် စခရင်ပေါ်ရှိ ခလုတ်များကို နှိပ်ပါ။ မစဉ်းစားနိုင်တော့ပါက စာလုံးတစ်လုံး ဖော်ထုတ်ရန် 💡 Hint ခလုတ်ကို နှိပ်ပါ။',
    random:        'ကျပန်း',
    daily:         'နေ့စဉ် စိန်ခေါ်မှု',
    stats:         'စာရင်းအင်း',
    back:          '← နောက်သို့',
    settings:      'ဆက်တင်များ',
    dark_mode:     'အမှောင်မုဒ်',
    high_contrast: 'မြင့်မားသော contrast',
    easy_mode:     'လွယ်ကူသော မုဒ် (ကြိုးစားခန့်မှန်းချက် ၈)',
    hard_mode:     'ခက်ခဲသော မုဒ်',
    hard_green:    'နေရာ {pos} တွင် {letter} ဖြစ်ရမည်',
    hard_yellow:   'ခန့်မှန်းချက်တွင် {letter} ပါဝင်ရမည်',
    hard_absent:   '{letter} သည် ဖြေရှင်းချက်တွင် မပါဝင်ပါ',
    hard_mid_game: 'ဂိမ်းအတွင်းတွင် ခက်ခဲသော မုဒ်ကို ပြောင်းလဲ၍ မရပါ',
    close:         'ပိတ်',
    play_again:    'ပြန်ကစား',
    share:         'ရလဒ်မျှဝေ',
    copied:        'ကူးယူပြီးပါပြီ။ ✓',
    not_enough:    'အက္ခရာ မလုံလောက်ပါ',
    not_valid:     'မှန်ကန်သော စကားလုံး မဟုတ်ပါ',
    hint_used:     '💡 အကြံပြုပြီးပါပြီ',
    hint_letter:   '💡 အကြံပြုချက် — "{letter}" သည် နေရာ {pos} တွင် ရှိသည်',
    all_revealed:  'အက္ခရာအားလုံး ဖော်ပြပြီးပါပြီ။',
    solved:        '{n} ခုဖြင့် ဖြေရှင်းပြီးပါပြီ။',
    answer_was:    'အဖြေမှာ',
    played:        'ကစားပြီး',
    win_pct:       'နိုင်ခဲ့ %',
    streak:        'ဆက်တိုက်',
    best:          'အကောင်းဆုံး',
    correct:       'မှန်',
    present:       'ပါဝင်',
    absent:        'မပါဝင်',
    how_to_play:   'ဘယ်လိုကစားရမလဲ',
    language:      'ဘာသာစကား',
  },
};

const LANG_KEY = 'wg_lang';

function getLanguage() {
  try { return localStorage.getItem(LANG_KEY) || 'en'; }
  catch { return 'en'; }
}

function t(key, params) {
  const lang = getLanguage();
  let str = (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || TRANSLATIONS.en[key] || key;
  if (params) {
    Object.keys(params).forEach(k => {
      str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), params[k]);
    });
  }
  return str;
}

function setLanguage(lang) {
  try { localStorage.setItem(LANG_KEY, lang); } catch {}
  applyTranslations();
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  // Update the tries count in rule text based on current mode
  if (typeof updateRuleTries === 'function') updateRuleTries();
}
