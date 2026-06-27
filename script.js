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
    'PANIC','PAPER','PARK','PARSE','PARTY','PASTE','PATCH','PAUSE',
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

  // ── Screen management ──────────────────────────────────────────
  const screenLang  = { en: 'en', menu: 'en' };
  const screenLabel = { menu: 'Select game', en: 'English game' };

  function showScreen(name) {
    document.querySelectorAll('[data-screen]').forEach(el => {
      el.hidden = el.dataset.screen !== name;
    });
    document.documentElement.lang = screenLang[name] || 'en';
    live(screenLabel[name] || '');
    if (name === 'en') initGame();
  }

  document.querySelectorAll('[data-target]').forEach(btn => {
    btn.addEventListener('click', () => showScreen(btn.dataset.target));
  });
  document.querySelectorAll('[data-back]').forEach(btn => {
    btn.addEventListener('click', () => showScreen('menu'));
  });

  // ── English game ───────────────────────────────────────────────
  const ROWS = 6;
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

  // ── Stats (localStorage) ───────────────────────────────────────
  const STATS_KEY = 'wg_stats';

  function defaultStats() {
    return { played: 0, won: 0, currentStreak: 0, bestStreak: 0 };
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
    document.querySelectorAll('[data-stat="streak"]').forEach(el => { el.textContent = s.currentStreak; });
    document.querySelectorAll('[data-stat="best"]').forEach(el => { el.textContent = s.bestStreak; });
  }

  const SHARE_EMOJI = { correct: '🟩', present: '🟨', absent: '⬛' };
  const SHARE_URL   = 'https://nyeinchan-lwin.github.io/wordguess/';

  let eng = {};

  function initGame() {
    eng = {
      answer:       pickWord(),
      currentRow:   0,
      currentInput: '',
      gameOver:     false,
      toastTimer:   null,
      history:      [],
    };
    buildGrid();
    buildKeyboard();
    setModal(null);
  }

  // Scoped DOM helpers
  function qs(sel)       { return document.querySelector(`[data-screen="en"] ${sel}`); }
  function getTile(r, c) { return qs(`[data-tile="${r}-${c}"]`); }
  function getRow(r)     { return qs(`[data-row="${r}"]`); }

  function buildGrid() {
    const grid = qs('[data-grid]');
    if (!grid) return;
    grid.innerHTML = '';
    for (let r = 0; r < ROWS; r++) {
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

  function submitGuess() {
    if (eng.currentInput.length < COLS) {
      shakeRow(eng.currentRow);
      toast('Not enough letters');
      return;
    }

    if (!VALID_SET.has(eng.currentInput)) {
      shakeRow(eng.currentRow);
      toast('Not a valid word');
      return;
    }

    const guess   = eng.currentInput;
    const states  = evaluate(guess, eng.answer);
    eng.history.push(states);
    revealRow(eng.currentRow, guess, states);

    const won        = states.every(s => s === 'correct');
    const lastRow    = eng.currentRow === ROWS - 1;
    const flipDone   = (COLS - 1) * FLIP_STAGGER + FLIP_MS;
    const postReveal = flipDone + POST_FLIP_MS;

    if (won) {
      eng.gameOver = true;
      const stats = updateStats(true);
      setTimeout(() => bounceRow(eng.currentRow), flipDone);
      const winDelay = flipDone + (COLS - 1) * BOUNCE_STAGGER + BOUNCE_MS + 200;
      setTimeout(() => { renderStats(stats); setModal(`Solved in ${eng.currentRow + 1}!`, 'win'); }, winDelay);
    } else if (lastRow) {
      eng.gameOver = true;
      const stats = updateStats(false);
      setTimeout(() => { renderStats(stats); setModal('The answer was', 'lose', eng.answer); }, postReveal);
    } else {
      eng.currentRow++;
      eng.currentInput = '';
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
    const action = overlay.querySelector('[data-modal-action]');
    if (action) setTimeout(() => action.focus(), 50);
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

  // ── Screen-reader live region ──────────────────────────────────
  function live(msg) {
    const el = document.querySelector('[data-announce]');
    if (el) el.textContent = msg;
  }

  // ── Share result ───────────────────────────────────────────────
  function buildShareText() {
    const won   = eng.history.length > 0 &&
                  eng.history[eng.history.length - 1].every(s => s === 'correct');
    const score = won ? eng.history.length : 'X';
    const grid  = eng.history
      .map(states => states.map(s => SHARE_EMOJI[s]).join(''))
      .join('\n');
    return `WordGuess ${score}/6\n\n${grid}\n\nPlay: ${SHARE_URL}`;
  }

  function shareResult() {
    const text = buildShareText();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => toast('Copied!'));
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      toast('Copied!');
    }
  }

  document.addEventListener('click', e => {
    if (e.target.closest('[data-modal-share]')) shareResult();
  });

  // ── Stats overlay ──────────────────────────────────────────────
  document.addEventListener('click', e => {
    const overlay = document.querySelector('[data-stats-overlay]');
    if (!overlay) return;
    if (e.target.closest('[data-stats-open]')) {
      renderStats(loadStats());
      overlay.hidden = false;
      const close = overlay.querySelector('[data-stats-close]');
      if (close) setTimeout(() => close.focus(), 50);
    }
    if (e.target.closest('[data-stats-close]')) {
      overlay.hidden = true;
    }
  });

  // ── Physical keyboard ──────────────────────────────────────────
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const statsOverlay = document.querySelector('[data-stats-overlay]');
      if (statsOverlay && !statsOverlay.hidden) { statsOverlay.hidden = true; return; }
    }
    const enScreen = document.querySelector('[data-screen="en"]');
    if (!enScreen || enScreen.hidden) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    handleKey(e.key === 'Backspace' ? '⌫' : e.key);
  });

  // ── Play Again ─────────────────────────────────────────────────
  document.addEventListener('click', e => {
    if (e.target.closest('[data-modal-action]')) initGame();
  });

}());
