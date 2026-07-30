(function () {

  // ── Answer word list (200+ common 5-letter words) ─────────────
  const ANSWERS = [
    'CRANE','SLATE','TRACE','ARISE','STALE','SNARE','IRATE','AROSE',
    'LATER','SANER','CRATE','TEARS','NOTES','STORE','STONE','TIRED',
    'TONES','RATES','PLAIN','RAISE','GROAN','SPORT','LIGHT','MIGHT',
    'RIGHT','NIGHT','SIGHT','FIGHT','HEART','STEAM','CREAM','DREAM',
    'GREAT','BREAD','BREAK','BROWN','BRAVE','GRACE','GRANT','GRAND',
    'GRAPE','GRASP','GRASS','GRAVE','PLACE','PLANE','PLANT','PLATE',
    'BLEND','BLIND','BLOCK','BLOOD','BLOOM','BOARD','BOAST','BOUND',
    'BRAIN','BRAND','CLASH','CLASS','CLEAN','CLEAR','CLIMB','CLOSE',
    'CLOUD','COUNT','COVER','CRAFT','CRASH','CRISP','CROSS','CROWD',
    'CROWN','CURVE','CYCLE','DAILY','DANCE','DEPTH','DRIFT','DRINK',
    'DRIVE','EARLY','EARTH','EIGHT','ELITE','EMPTY','EQUAL','EXIST',
    'FAINT','FAITH','FALSE','FANCY','FAULT','FEAST','FENCE','FIELD',
    'FIRST','FIXED','FLAME','FLASH','FLEET','FLOAT','FLOOR','FLOUR',
    'FLUID','FOCUS','FORCE','FORGE','FORTH','FOUND','FRAME','FRANK',
    'FRESH','FRONT','FROST','FRUIT','FULLY','FUNNY','GIANT','GIVEN',
    'GLARE','GLASS','GLEAM','GLIDE','GLOBE','GLOOM','GLORY','GLOVE',
    'GRADE','GREET','GROVE','GUARD','GUESS','GUEST','GUIDE','GUILD',
    'GUILT','GUISE','GUSTO','HASTY','HASTE','HAVEN','HEDGE','HENCE',
    'HINGE','HOIST','HONEY','HORSE','HOTEL','HOUSE','HUMAN','HUMID',
    'HURRY','IDEAL','IMAGE','IMPLY','INDEX','INFER','INNER','INPUT',
    'INTER','IONIC','ISSUE','IVORY','JEWEL','JUICE','JUMPY','JUROR',
    'KAYAK','KNIFE','KNOCK','KNOWN','LABEL','LADEN','LARGE','LASER',
    'LAUGH','LAYER','LEARN','LEASE','LEAST','LEAVE','LEGAL','LEMON',
    'LEVEL','LIGHT','LIMIT','LINER','LINEN','LITER','LIVER','LOCAL',
    'LODGE','LOGIC','LOOSE','LOWER','LUCKY','LYING','MAGIC','MAJOR',
    'MAKER','MANOR','MAPLE','MARCH','MARSH','MATCH','MAYOR','MEDIA',
    'MERCY','MERGE','MERIT','METAL','METER','MINOR','MINUS','MIRTH',
    'MIXED','MODEL','MONEY','MONKS','MONTH','MORAL','MOTEL','MOTOR',
    'MOUNT','MOUSE','MOUTH','MOVIE','MUDDY','MUSIC','NAIVE','NERVE',
    'NEVER','NEWER','NOBLE','NOISE','NORTH','NOVEL','NURSE','NYMPH',
    'OCCUR','OCEAN','OFFER','OFTEN','OLIVE','ONION','ORDER','ORGAN',
    'OTHER','OUTER','OWNED','OWNER','OXIDE','OZONE','PAINT','PANEL',
    'PANIC','PAPER','PARSE','PARTY','PASTE','PATCH','PAUSE',
    'PEACE','PEARL','PENAL','PENNY','PERCH','PHASE','PHONE','PHOTO',
    'PIANO','PILOT','PITCH','PIXEL','PIZZA','PLAZA','PLEAD','PLUCK',
    'PLUMB','PLUME','PLUMP','PLUNK','PLUSH','POINT','POKER','POLAR',
    'POWER','PRESS','PRICE','PRIDE','PRIME','PRINT','PRIOR','PROBE',
    'PROSE','PROUD','PROVE','PROWL','PULSE','PUNCH','PUPIL','PUSHY',
    'QUEEN','QUERY','QUEST','QUEUE','QUICK','QUIET','QUITE','QUOTA',
    'QUOTE','RABBI','RADAR','RADIO','RALLY','RANCH','RANGE','RAPID',
    'RATIO','REACH','READY','REALM','REBEL','REFER','REIGN','RELAX',
    'REPAY','REPEL','REPLY','RIDER','RIDGE','RISKY','RIVET','RIVER',
    'ROBOT','ROCKY','ROUGE','ROUGH','ROUND','ROUTE','ROVER','ROYAL',
    'RUDER','RULER','RURAL','RUSTY','SADLY','SAINT','SALAD','SAUCE',
    'SCALE','SCENE','SCOPE','SCORE','SCOUT','SENSE','SERVE','SETUP',
    'SEVEN','SHADE','SHAKE','SHALL','SHAME','SHAPE','SHARE','SHARK',
    'SHARP','SHAVE','SHEAR','SHEEP','SHELF','SHELL','SHIFT','SHINE',
    'SHIRT','SHOCK','SHORE','SHORT','SHOUT','SHOVE','SHOWN','SHRUG',
    'SIEGE','SIGMA','SINCE','SIXTH','SIXTY','SKILL','SKIMP','SKIRT',
    'SKULL','SLANT','SLEEK','SLEEP','SLEET','SLICK','SLIDE','SLOPE',
    'SLOTH','SLUMP','SMALL','SMART','SMELL','SMILE','SMOKE','SNACK',
    'SNAKE','SOLAR','SOLID','SOLVE','SORRY','SOUTH','SPACE','SPARE',
    'SPARK','SPEAK','SPEAR','SPEND','SPICE','SPIKE','SPILL','SPINE',
    'SPITE','SPLIT','SPOKE','SPOON','SPRAY','SPREE','SQUAD','STAFF',
    'STAGE','STAIN','STAKE','STALL','STAMP','STAND','STARE','STARK',
    'START','STAYS','STEAL','STEEP','STEER','STERN','STICK','STIFF',
    'STILL','STING','STOCK','STOMP','STORM','STORY','STOUT','STOVE',
    'STRAP','STRAW','STRAY','STRIP','STRUT','STUCK','STUDY','STUFF',
    'STUMP','STUNG','STYLE','SUGAR','SUITE','SUNNY','SUPER','SURGE',
    'SWIFT','SWILL','SWOOP','SWORD','TABLE','TASTE','TEACH','TEMPO',
    'TENSE','TENTH','TERMS','THORN','THOSE','THREE','THREW','THROW',
    'THUMB','TIDAL','TIGER','TIMER','TITLE','TOAST','TOKEN','TOOTH',
    'TOPIC','TOTAL','TOUCH','TOUGH','TOWER','TOXIC','TRACK','TRADE',
    'TRAIL','TRAIN','TRAIT','TRAMP','TRASH','TREND','TRIAL','TRIBE',
    'TRICK','TRIED','TROOP','TRUCK','TRULY','TRUNK','TRUST','TRUTH',
    'TUMOR','TUNER','TUNIC','TUPLE','TWICE','TWIST','TYPED','ULTRA',
    'UNCLE','UNDUE','UNTIL','UPPER','UPSET','URBAN','USAGE','USUAL',
    'UTTER','VALID','VALUE','VALVE','VIDEO','VIGOR','VIRAL','VIRUS',
    'VISOR','VISTA','VITAL','VIVID','VOCAL','VOICE','VOTER','WAIST',
    'WALTZ','WASTE','WATCH','WATER','WEARY','WEAVE','WEDGE','WEIRD',
    'WHALE','WHEAT','WHEEL','WHERE','WHICH','WHILE','WHIRL','WHITE',
    'WHOLE','WHOSE','WIDER','WITCH','WOMAN','WORLD','WORRY','WORSE',
    'WORST','WORTH','WOULD','WRIST','WROTE','YACHT','YEARN','YIELD',
    'YOUNG','YOURS','YOUTH','ZEBRA','ZESTY','ZONAL',
  ];

  // ── Extra valid guesses (uncommon but real words) ──────────────
  const EXTRA_VALID = [
    'AAHED','AALII','ABACI','ABACK','ABAFT','ABASE','ABASH','ABATE',
    'ABBOT','ABBEY','ABHOR','ABIDE','ABLER','ABODE','ABOMA','ABOON',
    'ABORE','ABORT','ABOUT','ABOVE','ABRIS','ABUSE','ABUTS','ABYSS',
    'ACIDS','ACING','ACMES','ACORN','ACRES','ACTED','ACUTE','ADAGE',
    'ADAGIO','ADDER','ADDON','ADEPT','ADMIT','ADOBE','ADOPT','ADORE',
    'ADORN','ADRIFT','ADULT','AFTER','AGAVE','AGAZE','AGILE','AGING',
    'AGLOW','AGONY','AGREE','AHEAD','AIDED','AIDES','AIOLI','AIRED',
    'AISLE','AKIMBO','ALARM','ALBUM','ALGAE','ALIAS','ALIBI','ALIEN',
    'ALIGN','ALIKE','ALLAY','ALLEY','ALLOT','ALLOW','ALONE','ALONG',
    'ALOOF','ALOUD','ALTAR','ALTER','AMBER','AMBLE','AMEND','AMINO',
    'AMISS','AMINE','AMITY','AMOUR','AMPLE','AMUSE','ANGEL','ANGER',
    'ANGLE','ANGRY','ANGST','ANKLE','ANNEX','ANNOY','ANTIC','ANVIL',
    'APART','APPLE','APTLY','ARCED','ARDOR','ARGOT','ARMOR','AROMA',
    'ARRAY','ATONE','ATTIC','AUDIT','AUGUR','AVAIL','AVID','AVOID',
    'AWFUL','AWOKE','AXIAL','BABEL','BADGE','BADLY','BAGEL','BAGGY',
    'BAKED','BALER','BALMY','BANAL','BANDY','BARGE','BARON','BASAL',
    'BATCH','BAYOU','BEARS','BEAST','BEIGE','BELLE','BELOW','BERTH',
    'BEVEL','BIRCH','BLAZE','BLESS','BLIMP','BLISS','BLURT','BOGIE',
    'BOLTS','BONES','BOOZE','BOXER','BROIL','BROOD','BROTH','BUDGE',
    'BUGGY','BULGE','BUOYS','BURLY','BUTCH','BUYER','CABAL','CABIN',
    'CABLE','CADET','CAIRN','CAMEL','CAPER','CASTE','CEDAR','CELLO',
    'CHAFE','CHANT','CHAOS','CHARM','CHASM','CHEAP','CHEAT','CHECK',
    'CHEEK','CHEER','CHESS','CHEST','CHIEF','CHILD','CHILL','CHIMP',
    'CHOIR','CHORE','CHOSE','CHUCK','CHURN','CIDER','CINCH','CIVIC',
    'CIVIL','CLAMP','CLANG','CLANK','CLAP','CLASH','CLASP','CLAW',
    'CLEFT','CLERK','CLICK','CLIFF','CLING','CLINK','CLOAK','CLOD',
    'CLOG','CLOUT','COBRA','COMET','COMIC','COMMA','CONIC','CREAK',
    'CREEK','CREEP','CRIMP','CROAK','CROOK','CROON','CRUEL','CRUMB',
    'DAINTY','DAISY','DALLY','DECOY','DELTA','DEMON','DEPOT','DERBY',
    'DICEY','DIODE','DIRTY','DISCO','DITTY','DIVER','DIZZY','DOGMA',
    'DOLLY','DONOR','DOOZY','DOWDY','DOWRY','DOZER','DUSKY','DWARF',
    'EAGER','EAGLE','EASEL','EBONY','EDICT','EFFACE','EGRET','EJECT',
    'ELUDE','EMOTE','ENVOY','EPOXY','EQUIP','ERODE','ERRANT','ESSAY',
    'ETHER','EVOKE','EXACT','EXERT','EXILE','EXTRA','EXULT','FABLE',
    'FACET','FIEND','FIERY','FILMY','FINAL','FINCH','FIORD','FLECK',
    'FLICK','FLOCK','FLUTE','FOAMY','FOLIO','FOLLY','FRAIL','FREAK',
    'FROND','FROZE','FRUGAL','GLEAM','GLOSSY','GNASH','GOING','GORGE',
    'GOUTY','GRAIN','GRAIL','GRIME','GRIMY','GRIPE','GROAN','GROIN',
    'HATCH','HAUNT','HEIST','HELIX','HERBY','HERON','HIPPO','HIPPY',
    'HOARY','HOMER','HORDE','HORNY','HUNKY','IGLOO','INANE','INEPT',
    'INERT','INKED','INLET','INTER','INTRO','IOTAS','IRKED','ITCHY',
    'JALOPY','JOKER','JOLLY','JOUST','KNAVE','KNEEL','KNELL','KNELT',
    'KNOTS','KUDOS','LAPEL','LARVA','LATCH','LATCH','LEECH','LEGGY',
    'LILAC','LIMBO','LITHE','LIVID','LOFTY','LOGIC','LORRY','LOUSY',
    'LUSTY','MACAW','MANIC','MELEE','MERCY','MOTIF','MUCUS','MURKY',
    'MUSTY','MYRRH','NEEDY','NEWSY','NIFTY','NIXIE','NONCE','NUTTY',
    'ODDLY','OFFAL','OLDIE','OPTIC','ORBIT','ORCHID','OTTER','OVARY',
    'OVOID','OWING','OXIDE','PANDA','PANSY','PAPAL','PATSY','PEEVE',
    'PENAL','PESKY','PETTY','PEWIT','PICKY','PIGGY','PINEY','PIPIT',
    'PITHY','PLAID','PLAIT','PLASM','PLEAD','PLONK','PLOW','PLOY',
    'POLKA','POPPY','POUCH','POUTY','PRISM','PRIVY','PROXY','PRUNE',
    'PSALM','PUBIC','PUDGY','PUPPY','PURGE','PYGMY','QUASI','QUIRK',
    'RABBI','RABID','RAINY','RANDY','RASPY','RATTY','REBUS','RECUR',
    'REEDY','REGAL','RETCH','RHINO','RIGOR','RINSE','RIPEN','RODEO',
    'ROOMY','ROWDY','RUDDY','RUGBY','RULER','RUPEE','SAGAS','SAGGY',
    'SAPPY','SATAY','SAVVY','SCALD','SCALP','SCALY','SCAMP','SCANT',
    'SCARE','SCARF','SCONE','SCOOP','SCORN','SCOUR','SCOWL','SCRAM',
    'SCRAP','SCRUB','SEEDY','SHAKY','SHARD','SHEAF','SHIED','SHIRE',
    'SHRUB','SHUCK','SIGMA','SILLY','SILKY','SIREN','SKIMP','SLIMY',
    'SNARL','SNEER','SNIDE','SNOWY','SNIFF','SOGGY','SOPPY','SPLAY',
    'SPOOL','SPORE','SPURN','STAID','STAPLE','STEED','STOIC','STOKE',
    'STOMP','SWAMP','SWATH','SWEAR','SWEAT','SWEPT','SWILL','SWINE',
    'SWIPE','SWIRL','SYRUP','TACKY','TAPIR','TAUNT','TAWNY','TESTY',
    'THANE','THONG','THORN','THROB','THROE','TIBIA','TIDBIT','TIPSY',
    'TOPAZ','TOUCHY','TROTH','TROUT','TRUCK','TRUSS','TUBER','TUMMY',
    'TUTOR','TWERP','TWILL','TYING','UDDER','UNFIT','UNION','UNITE',
    'UNITY','UNIFY','UNZIP','VAUNT','VENOM','VERGE','VERSE','VERVE',
    'VIGIL','VILLA','VIXEN','VOGUE','VOILA','VOUCH','VOWEL','WACKY',
    'WADED','WADER','WAGER','WAGON','WALRUS','WARTY','WAVER','WEEDY',
    'WETLY','WHELP','WHIFF','WHIM','WHINE','WISPY','WITTY','WOKEN',
    'WOOZY','WORMY','WRATH','WRING','YODEL','YOKEL','ZAPPY','ZIPPY',
  ];

  const VALID_SET = new Set([...ANSWERS, ...EXTRA_VALID]);

  function pickWord() {
    return ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
  }

  // ── Daily challenge (date-seeded) ───────────────────────────────
  const DAILY_KEY = 'wg_daily';

  function todayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function pickDailyWord() {
    const dateStr = todayStr();
    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) {
      hash = ((hash << 5) - hash + dateStr.charCodeAt(i)) | 0;
    }
    return ANSWERS[Math.abs(hash) % ANSWERS.length];
  }

  function loadDaily() {
    try { return JSON.parse(localStorage.getItem(DAILY_KEY)); }
    catch { return null; }
  }

  function saveDaily(data) {
    localStorage.setItem(DAILY_KEY, JSON.stringify(data));
  }

  function isDailyComplete() {
    const d = loadDaily();
    return d && d.date === todayStr() && d.done;
  }

  // ── Screen management ──────────────────────────────────────────
  const screenLang  = { en: 'en' };
  const screenLabel = { menu: 'Select game', en: 'English game' };

  function showScreen(name) {
    document.querySelectorAll('[data-screen]').forEach(el => {
      if (el.dataset.screen === name) {
        el.hidden = false;
        el.style.opacity = '0';
        requestAnimationFrame(() => {
          el.style.opacity = '1';
        });
      } else {
        el.style.opacity = '0';
        setTimeout(() => { el.hidden = true; }, 200);
      }
    });
    document.documentElement.lang = screenLang[name] || 'en';
    live(screenLabel[name] || '');
    if (name === 'en') {
      initGame(pendingDaily);
      pendingDaily = false;
    }
  }

  let pendingDaily = false;

  document.querySelectorAll('[data-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      pendingDaily = !!btn.dataset.daily;
      showScreen(btn.dataset.target);
    });
  });
  document.querySelectorAll('[data-back]').forEach(btn => {
    btn.addEventListener('click', () => showScreen('menu'));
  });

  // ── English game ───────────────────────────────────────────────
  const COLS = 5;
  const FLIP_MS        = 250;
  const FLIP_STAGGER   = 50;
  const POST_FLIP_MS   = 400;
  const BOUNCE_MS      = 500;
  const BOUNCE_STAGGER = 80;

  const KB_LAYOUT = [
    ['Q','W','E','R','T','Y','U','I','O','P'],
    ['A','S','D','F','G','H','J','K','L'],
    ['Enter','Z','X','C','V','B','N','M','⌫'],
  ];

  // ── Settings (localStorage) ─────────────────────────────────────
  const SETTINGS_KEY = 'wg_settings';

  function defaultSettings() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return { dark: prefersDark, hc: false, easy: false, hard: false };
  }

  function loadSettings() {
    try { return Object.assign(defaultSettings(), JSON.parse(localStorage.getItem(SETTINGS_KEY))); }
    catch { return defaultSettings(); }
  }

  function saveSettings(s) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
  }

  function applySettings() {
    const s = loadSettings();
    document.body.classList.toggle('dark', s.dark);
    document.body.classList.toggle('hc', s.hc);
    document.querySelectorAll('[data-setting]').forEach(el => {
      el.checked = s[el.dataset.setting] || false;
    });
  }

  function toggleSetting(key) {
    // Warn when toggling hard mode mid-game
    if (key === 'hard' && eng.currentRow > 0 && !eng.gameOver) {
      toast(t('hard_mid_game'));
      return;
    }
    const s = loadSettings();
    s[key] = !s[key];
    saveSettings(s);
    applySettings();
    updateRuleTries();
    // Show feedback toast
    const label = t(key + '_mode') || t(key);
    const state = s[key] ? t('on') : t('off');
    toast(`${label} ${state}`);
    // Update badge after toggle
    if (key === 'easy' || key === 'hard') {
      const badge = document.querySelector('[data-mode-badge]');
      const settings = loadSettings();
      if (badge) {
        if (settings.easy && !eng.daily) {
          badge.textContent = 'Easy (8/8)';
          badge.hidden = false;
        } else if (settings.hard) {
          badge.textContent = 'Hard';
          badge.hidden = false;
        } else {
          badge.hidden = true;
        }
      }
    }
  }

  // Update the tries count in rule text based on current mode
  function updateRuleTries() {
    const s = loadSettings();
    const tries = (s.easy) ? 8 : 6;
    const base = t('htp_rule');
    // Replace the number before "tries" (handles both "6 tries" and "၆ ကြိုးစားခန့်မှန်းချက်")
    document.querySelectorAll('[data-i18n="htp_rule"]').forEach(el => {
      el.textContent = base.replace(/\d+/, tries);
    });
  }

  // Apply on load
  applySettings();
  applyTranslations();
  syncLangButtons();

  // Settings overlay open/close
  let settingsOpener = null;

  document.addEventListener('click', e => {
    const overlay = document.querySelector('[data-settings-overlay]');
    if (!overlay) return;
    if (e.target.closest('[data-settings-open]')) {
      settingsOpener = e.target.closest('[data-settings-open]');
      applySettings();
      overlay.hidden = false;
      trapFocus(overlay);
    }
    if (e.target.closest('[data-settings-close]')) {
      overlay.hidden = true;
      if (settingsOpener) { settingsOpener.focus(); settingsOpener = null; }
    }
  });

  document.addEventListener('change', e => {
    if (e.target.matches('[data-setting]')) {
      toggleSetting(e.target.dataset.setting);
    }
  });

  // ── Language switcher ──────────────────────────────────────────
  function syncLangButtons() {
    const lang = getLanguage();
    document.querySelectorAll('[data-lang]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    // Update how-to-play button text
    const howtoBtn = document.querySelector('[data-howto-toggle]');
    if (howtoBtn) {
      const details = document.querySelector('[data-howto-details]');
      const expanded = details && details.open;
      howtoBtn.textContent = t('how_to_play') + (expanded ? ' ▴' : ' ▾');
    }
  }

  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-lang]');
    if (!btn) return;
    setLanguage(btn.dataset.lang);
    syncLangButtons();
  });

  // ── Stats (localStorage) ───────────────────────────────────────
  const STATS_KEY = 'wg_stats';

  function defaultStats() {
    return { played: 0, won: 0, currentStreak: 0, bestStreak: 0, distribution: [0, 0, 0, 0, 0, 0] };
  }

  function loadStats() {
    try { return Object.assign(defaultStats(), JSON.parse(localStorage.getItem(STATS_KEY))); }
    catch { return defaultStats(); }
  }

  function saveStats(s) {
    localStorage.setItem(STATS_KEY, JSON.stringify(s));
  }

  function updateStats(won) {
    const s = loadStats();
    s.played++;
    if (won) {
      s.won++;
      s.currentStreak++;
      if (s.currentStreak > s.bestStreak) s.bestStreak = s.currentStreak;
      const guessNum = eng.history.length;
      const maxGuesses = eng.rows || 6;
      if (guessNum >= 1 && guessNum <= maxGuesses) {
        // Ensure distribution array is large enough
        while (s.distribution.length < maxGuesses) s.distribution.push(0);
        s.distribution[guessNum - 1]++;
      }
    } else {
      s.currentStreak = 0;
    }
    saveStats(s);
    return s;
  }

  function renderStats(s) {
    const pct = s.played ? Math.round((s.won / s.played) * 100) : 0;
    document.querySelectorAll('[data-stat="played"]').forEach(el => { el.textContent = s.played; });
    document.querySelectorAll('[data-stat="win-pct"]').forEach(el => { el.textContent = pct; });
    document.querySelectorAll('[data-stat="streak"]').forEach(el => {
      el.textContent = s.currentStreak > 0 ? `${s.currentStreak} 🔥` : s.currentStreak;
    });
    document.querySelectorAll('[data-stat="best"]').forEach(el => { el.textContent = s.bestStreak; });
    // Distribution chart
    const maxDist = Math.max(...s.distribution, 1);
    document.querySelectorAll('[data-dist]').forEach(container => {
      container.innerHTML = '';
      const distLen = s.distribution.length;
      for (let i = 0; i < distLen; i++) {
        const count = s.distribution[i] || 0;
        const pctBar = Math.round((count / maxDist) * 100);
        const row = document.createElement('div');
        row.className = 'dist-row';
        row.innerHTML = `<span class="dist-label">${i + 1}</span><div class="dist-bar-wrap"><div class="dist-bar" style="width:${pctBar}%"></div></div><span class="dist-count">${count}</span>`;
        container.appendChild(row);
      }
    });
  }

  const SHARE_EMOJI = { correct: '🟩', present: '🟨', absent: '⬛' };
  const SHARE_URL   = 'https://nyeinchan-lwin.github.io/wordguess/';

  let eng = {};

  function initGame(daily) {
    const isDaily = !!daily;
    const alreadyDone = isDaily && isDailyComplete();
    const settings = loadSettings();
    const rows = (isDaily || !settings.easy) ? 6 : 8;
    eng = {
      answer:       isDaily ? pickDailyWord() : pickWord(),
      daily:        isDaily,
      rows:         rows,
      currentRow:   0,
      currentInput: '',
      gameOver:     alreadyDone,
      toastTimer:   null,
      history:      [],
      hintUsed:     false,
    };
    buildGrid();
    buildKeyboard();
    setModal(null);
    updateHintButton();
    updateGuessCounter();
    startTimer();
    // Show mode badge
    const badge = document.querySelector('[data-mode-badge]');
    if (badge) {
      if (settings.easy && !isDaily) {
        badge.textContent = 'Easy (8/8)';
        badge.hidden = false;
      } else if (settings.hard) {
        badge.textContent = 'Hard';
        badge.hidden = false;
      } else {
        badge.hidden = true;
      }
    }

    // If daily already completed today, show result
    if (alreadyDone) {
      const saved = loadDaily();
      eng.history = saved.history || [];
      eng.currentRow = eng.history.length;
      // Replay tiles visually
      eng.history.forEach((states, r) => {
        const guess = saved.guesses[r];
        if (guess) revealRowSilent(r, guess, states);
      });
      const won = eng.history.length > 0 &&
                  eng.history[eng.history.length - 1].every(s => s === 'correct');
      if (won) {
        setTimeout(() => setModal(t('solved', { n: eng.history.length }), 'win'), 300);
      } else {
        setTimeout(() => setModal(t('answer_was'), 'lose', eng.answer), 300);
      }
    }
  }

  // Silent row reveal (no animation, used for daily replay)
  function revealRowSilent(rowIdx, guess, states) {
    for (let i = 0; i < COLS; i++) {
      const t = getTile(rowIdx, i);
      if (!t) continue;
      t.textContent = guess[i];
      t.dataset.state = states[i];
      t.setAttribute('aria-label', `${guess[i]} ${states[i]}`);
      updateKey(guess[i], states[i]);
    }
  }

  // Scoped DOM helpers
  function qs(sel)       { return document.querySelector(`[data-screen="en"] ${sel}`); }
  function getTile(r, c) { return qs(`[data-tile="${r}-${c}"]`); }
  function getRow(r)     { return qs(`[data-row="${r}"]`); }

  function buildGrid() {
    const grid = qs('[data-grid]');
    if (!grid) return;
    grid.innerHTML = '';
    const rows = eng.rows || 6;
    for (let r = 0; r < rows; r++) {
      const rowEl = document.createElement('div');
      rowEl.className = 'grid-row';
      rowEl.setAttribute('role', 'row');
      rowEl.dataset.row = r;
      for (let c = 0; c < COLS; c++) {
        const t = document.createElement('div');
        t.className = 'tile';
        t.setAttribute('role', 'gridcell');
        t.setAttribute('aria-label', 'Empty');
        t.dataset.state = 'empty';
        t.dataset.tile  = `${r}-${c}`;
        rowEl.appendChild(t);
      }
      grid.appendChild(rowEl);
    }
  }

  function buildKeyboard() {
    const kb = qs('[data-keyboard]');
    if (!kb) return;
    kb.innerHTML = '';
    KB_LAYOUT.forEach(keys => {
      const rowEl = document.createElement('div');
      rowEl.className = 'keyboard-row';
      keys.forEach(k => {
        const btn = document.createElement('button');
        btn.className = 'key' + (k.length > 1 ? ' key--wide' : '');
        btn.textContent = k;
        btn.dataset.key = k;
        btn.type = 'button';
        btn.addEventListener('click', () => handleKey(k));
        rowEl.appendChild(btn);
      });
      kb.appendChild(rowEl);
    });
  }

  // ── Input handling ─────────────────────────────────────────────
  function handleKey(key) {
    if (eng.gameOver) return;
    if (key === '⌫' || key === 'Backspace') return deleteLetter();
    if (key === 'Enter')                     return submitGuess();
    if (/^[A-Za-z]$/.test(key))             addLetter(key.toUpperCase());
  }

  function addLetter(letter) {
    if (eng.currentInput.length >= COLS) return;
    const col = eng.currentInput.length;
    const t   = getTile(eng.currentRow, col);
    if (!t) return;
    eng.currentInput += letter;
    t.textContent = letter;
    t.dataset.state = 'tbd';
    t.setAttribute('aria-label', letter);
    t.classList.remove('tile--pop');
    void t.offsetWidth;          // reflow to restart animation
    t.classList.add('tile--pop');
  }

  function deleteLetter() {
    if (!eng.currentInput.length) return;
    eng.currentInput = eng.currentInput.slice(0, -1);
    const t = getTile(eng.currentRow, eng.currentInput.length);
    if (!t) return;
    t.textContent = '';
    t.dataset.state = 'empty';
    t.setAttribute('aria-label', 'Empty');
  }

  // ── Hard Mode validation ───────────────────────────────────────
  function validateHardMode(guess) {
    const s = loadSettings();
    if (!s.hard) return true;

    for (let r = 0; r < eng.history.length; r++) {
      const prevGuess = getGuessText(r);
      const prevStates = eng.history[r];

      for (let c = 0; c < COLS; c++) {
        if (prevStates[c] === 'correct' && guess[c] !== prevGuess[c]) {
          toast(t('hard_green', { pos: c + 1, letter: prevGuess[c] }));
          return false;
        }
      }

      for (let c = 0; c < COLS; c++) {
        if (prevStates[c] === 'present' && !guess.includes(prevGuess[c])) {
          toast(t('hard_yellow', { letter: prevGuess[c] }));
          return false;
        }
      }

      for (let c = 0; c < COLS; c++) {
        if (prevStates[c] === 'absent') {
          const letter = prevGuess[c];
          const isHinted = eng.history.some((states, ri) =>
            ri < r && states.some((s, ci) => s !== 'absent' && getGuessText(ri)[ci] === letter)
          );
          if (!isHinted && guess.includes(letter)) {
            toast(t('hard_absent', { letter }));
            return false;
          }
        }
      }
    }
    return true;
  }

  function submitGuess() {
    if (eng.currentInput.length < COLS) {
      shakeRow(eng.currentRow);
      toast(t('not_enough'));
      return;
    }

    if (!VALID_SET.has(eng.currentInput)) {
      shakeRow(eng.currentRow);
      toast(t('not_valid'));
      return;
    }

    if (!validateHardMode(eng.currentInput)) {
      shakeRow(eng.currentRow);
      return;
    }

    const guess   = eng.currentInput;
    const states  = evaluate(guess, eng.answer);
    eng.history.push(states);
    revealRow(eng.currentRow, guess, states);

    const won        = states.every(s => s === 'correct');
    const lastRow    = eng.currentRow === (eng.rows || 6) - 1;
    const flipDone   = (COLS - 1) * FLIP_STAGGER + FLIP_MS;
    const postReveal = flipDone + POST_FLIP_MS;

    if (won) {
      eng.gameOver = true;
      stopTimer();
      updateHintButton();
      const stats = updateStats(true);
      if (eng.daily) saveDaily({ date: todayStr(), done: true, won: true, guesses: eng.history.map((_, i) => getGuessText(i)), history: eng.history });
      setTimeout(() => { bounceRow(eng.currentRow); fireConfetti(); }, flipDone);
      const winDelay = flipDone + (COLS - 1) * BOUNCE_STAGGER + BOUNCE_MS + 200;
      setTimeout(() => { renderStats(stats); setModal(t('solved', { n: eng.currentRow + 1 }), 'win'); }, winDelay);
    } else if (lastRow) {
      eng.gameOver = true;
      stopTimer();
      updateHintButton();
      const stats = updateStats(false);
      if (eng.daily) saveDaily({ date: todayStr(), done: true, won: false, guesses: eng.history.map((_, i) => getGuessText(i)), history: eng.history });
      setTimeout(() => { renderStats(stats); setModal(t('answer_was'), 'lose', eng.answer); }, postReveal);
    } else {
      eng.currentRow++;
      eng.currentInput = '';
      updateGuessCounter();
    }
  }

  // ── Evaluation (standard Wordle algorithm) ─────────────────────
  function evaluate(guess, answer) {
    const result   = Array(COLS).fill('absent');
    const ansChars = answer.split('');
    const gChars   = guess.split('');

    // Pass 1 — exact matches
    for (let i = 0; i < COLS; i++) {
      if (gChars[i] === ansChars[i]) {
        result[i]   = 'correct';
        ansChars[i] = null;
        gChars[i]   = null;
      }
    }
    // Pass 2 — present but wrong position
    for (let i = 0; i < COLS; i++) {
      if (!gChars[i]) continue;
      const j = ansChars.indexOf(gChars[i]);
      if (j !== -1) {
        result[i]   = 'present';
        ansChars[j] = null;
      }
    }
    return result;
  }

  // ── Tile reveal animation ──────────────────────────────────────
  function getGuessText(rowIdx) {
    let word = '';
    for (let c = 0; c < COLS; c++) {
      const t = getTile(rowIdx, c);
      word += t ? t.textContent : '';
    }
    return word;
  }
  function revealRow(rowIdx, guess, states) {
    for (let i = 0; i < COLS; i++) {
      const t = getTile(rowIdx, i);
      const s = states[i];
      setTimeout(() => {
        t.classList.add('tile--flip');
        // Change colour at the exact midpoint (tile is edge-on, invisible)
        setTimeout(() => {
          t.dataset.state = s;
          t.setAttribute('aria-label', `${guess[i]} ${s}`);
        }, FLIP_MS / 2);
        t.addEventListener('animationend', () => t.classList.remove('tile--flip'), { once: true });
      }, i * FLIP_STAGGER);
    }

    // Update keyboard keys once all tiles have finished flipping
    const allDone = (COLS - 1) * FLIP_STAGGER + FLIP_MS;
    setTimeout(() => {
      states.forEach((s, i) => updateKey(guess[i], s));
      live(`${guess}: ${states.join(', ')}`);
    }, allDone);
  }

  const KEY_RANK = { correct: 3, present: 2, absent: 1 };

  function updateKey(letter, state) {
    const btn = qs(`[data-key="${letter}"]`);
    if (!btn) return;
    if ((KEY_RANK[state] || 0) > (KEY_RANK[btn.dataset.state] || 0)) {
      btn.dataset.state = state;
    }
  }

  // ── Win bounce ─────────────────────────────────────────────────
  function bounceRow(rowIdx) {
    for (let i = 0; i < COLS; i++) {
      const t = getTile(rowIdx, i);
      setTimeout(() => {
        t.classList.add('tile--bounce');
        t.addEventListener('animationend', () => t.classList.remove('tile--bounce'), { once: true });
      }, i * BOUNCE_STAGGER);
    }
  }

  // ── Row shake ──────────────────────────────────────────────────
  function shakeRow(r) {
    const rowEl = getRow(r);
    if (!rowEl) return;
    rowEl.classList.remove('grid-row--shake');
    void rowEl.offsetWidth;
    rowEl.classList.add('grid-row--shake');
    rowEl.addEventListener('animationend', () => rowEl.classList.remove('grid-row--shake'), { once: true });
  }

  // ── End-game modal ─────────────────────────────────────────────
  function setModal(message, result, word) {
    const overlay = qs('[data-modal]');
    const card    = qs('[data-modal] .modal-card');
    const msgEl   = qs('[data-modal-message]');
    const wordEl  = qs('[data-modal-word]');
    if (!overlay) return;
    if (message === null) {
      overlay.hidden = true;
      if (card) card.removeAttribute('data-result');
      return;
    }
    if (msgEl)  msgEl.textContent = message;
    if (wordEl) { wordEl.textContent = word || ''; wordEl.hidden = !word; }
    if (card)   card.dataset.result = result || '';
    overlay.hidden = false;
    live(word ? `${message} ${word}` : message);
    trapFocus(overlay);
  }

  // ── Toast notification ─────────────────────────────────────────
  function toast(msg) {
    const el = document.querySelector('[data-toast]');
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    live(msg);
    clearTimeout(eng.toastTimer);
    eng.toastTimer = setTimeout(() => { el.hidden = true; }, 1200);
  }

  // ── Confetti ───────────────────────────────────────────────────
  const CONFETTI_COLORS = ['#538d4e', '#8a7000', '#d4a017', '#e85d3a', '#4a90d9', '#9b59b6'];

  function fireConfetti() {
    const container = document.querySelector('[data-confetti]');
    if (!container) return;
    container.hidden = false;
    container.innerHTML = '';
    for (let i = 0; i < 60; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      const left = Math.random() * 100;
      const delay = Math.random() * 0.8;
      const duration = 1.5 + Math.random() * 1.5;
      const size = 6 + Math.random() * 8;
      const shape = Math.random() > 0.5 ? '50%' : '0';
      piece.style.cssText = `
        left: ${left}%;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: ${shape};
        animation: confetti-fall ${duration}s ease-out ${delay}s forwards;
      `;
      container.appendChild(piece);
    }
    setTimeout(() => { container.hidden = true; }, 3500);
  }

  // ── Screen-reader live region ──────────────────────────────────
  function live(msg) {
    const el = document.querySelector('[data-announce]');
    if (el) el.textContent = msg;
  }

  // ── Focus trap for modals ──────────────────────────────────────
  function trapFocus(modal) {
    const focusable = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    function handler(e) {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    modal.addEventListener('keydown', handler);
    first.focus();

    // Auto-remove trap when modal closes
    const observer = new MutationObserver(() => {
      if (modal.hidden) {
        modal.removeEventListener('keydown', handler);
        observer.disconnect();
      }
    });
    observer.observe(modal, { attributes: true, attributeFilter: ['hidden'] });
  }

  // ── Share result ───────────────────────────────────────────────
  function buildShareText() {
    const won   = eng.history.length > 0 &&
                  eng.history[eng.history.length - 1].every(s => s === 'correct');
    const score = won ? eng.history.length : 'X';
    const grid  = eng.history
      .map(states => states.map(s => SHARE_EMOJI[s]).join(''))
      .join('\n');
    const maxG = eng.rows || 6;
    return `WordGuess ${score}/${maxG}\n\n${grid}\n\nPlay: ${SHARE_URL}`;
  }

  function copyToClipboard(text) {
    return new Promise((resolve, reject) => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(resolve).catch(reject);
      } else {
        try {
          const ta = document.createElement('textarea');
          ta.value = text;
          ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          resolve();
        } catch (e) {
          reject(e);
        }
      }
    });
  }

  function shareResult() {
    const text = buildShareText();
    copyToClipboard(text)
      .then(() => toast(t('copied')))
      .catch(() => toast(t('copied')));
  }

  document.addEventListener('click', e => {
    if (e.target.closest('[data-modal-share]')) shareResult();
  });

  // ── Game timer ──────────────────────────────────────────────────
  let timerInterval = null;

  function startTimer() {
    stopTimer();
    eng.startTime = Date.now();
    const el = document.querySelector('[data-game-timer]');
    if (!el) return;
    timerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - eng.startTime) / 1000);
      const min = Math.floor(elapsed / 60);
      const sec = elapsed % 60;
      el.textContent = `${min}:${String(sec).padStart(2, '0')}`;
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  // ── Guess counter ────────────────────────────────────────────────
  function updateGuessCounter() {
    const el = document.querySelector('[data-guess-counter]');
    if (!el) return;
    const remaining = (eng.rows || 6) - eng.currentRow;
    el.textContent = `${remaining}/${eng.rows || 6}`;
    el.toggleAttribute('data-low', remaining <= 1);
  }

  // ── Hint function ────────────────────────────────────────────────
  function updateHintButton() {
    const btn = document.querySelector('[data-hint]');
    if (!btn) return;
    if (eng.gameOver || eng.hintUsed) {
      btn.disabled = true;
      btn.innerHTML = eng.hintUsed ? '💡 ' + t('hint_used') : '💡 Hint';
    } else {
      btn.disabled = false;
      btn.innerHTML = '💡 Hint';
    }
  }

  function giveHint() {
    if (eng.gameOver || eng.hintUsed) return;

    // Find positions not yet known to be correct from past guesses
    const candidates = [];
    for (let c = 0; c < COLS; c++) {
      const alreadyCorrect = eng.history.some(states => states[c] === 'correct');
      if (!alreadyCorrect) candidates.push(c);
    }

    if (candidates.length === 0) {
      toast(t('all_revealed'));
      return;
    }

    const pickIdx = candidates[Math.floor(Math.random() * candidates.length)];
    const hintLetter = eng.answer[pickIdx];
    eng.hintUsed = true;

    toast(t('hint_letter', { letter: hintLetter, pos: pickIdx + 1 }));
    updateHintButton();
  }

  document.addEventListener('click', e => {
    if (e.target.closest('[data-hint]')) giveHint();
  });

  // ── How-to-play toggle ───────────────────────────────────────────
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-howto-toggle]');
    if (!btn) return;
    const details = document.querySelector('[data-howto-details]');
    if (!details) return;
    details.open = !details.open;
    btn.setAttribute('aria-expanded', details.open);
    btn.textContent = t('how_to_play') + (details.open ? ' ▴' : ' ▾');
  });

  // ── Stats overlay ──────────────────────────────────────────────
  let statsOpener = null;

  document.addEventListener('click', e => {
    const overlay = document.querySelector('[data-stats-overlay]');
    if (!overlay) return;
    if (e.target.closest('[data-stats-open]')) {
      statsOpener = e.target.closest('[data-stats-open]');
      renderStats(loadStats());
      overlay.hidden = false;
      trapFocus(overlay);
    }
    if (e.target.closest('[data-stats-close]')) {
      overlay.hidden = true;
      if (statsOpener) { statsOpener.focus(); statsOpener = null; }
    }
  });

  // ── Physical keyboard ──────────────────────────────────────────
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const settingsOverlay = document.querySelector('[data-settings-overlay]');
      if (settingsOverlay && !settingsOverlay.hidden) {
        settingsOverlay.hidden = true;
        if (settingsOpener) { settingsOpener.focus(); settingsOpener = null; }
        return;
      }
      const statsOverlay = document.querySelector('[data-stats-overlay]');
      if (statsOverlay && !statsOverlay.hidden) {
        statsOverlay.hidden = true;
        if (statsOpener) { statsOpener.focus(); statsOpener = null; }
        return;
      }
      const gameModal = qs('[data-modal]');
      if (gameModal && !gameModal.hidden) { gameModal.hidden = true; return; }
    }
    const enScreen = document.querySelector('[data-screen="en"]');
    if (!enScreen || enScreen.hidden) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    handleKey(e.key === 'Backspace' ? '⌫' : e.key);
  });

  // ── Play Again ─────────────────────────────────────────────────
  document.addEventListener('click', e => {
    if (e.target.closest('[data-modal-action]')) {
      if (eng.daily) {
        showScreen('menu');
      } else {
        initGame();
      }
    }
  });

}());
