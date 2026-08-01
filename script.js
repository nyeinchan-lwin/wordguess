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

  // ── Extra valid words for other lengths ───────────────────────
  const EXTRA_4 = [
    'ACHE','ACME','ACRE','AGED','AHEM','AIDE','ALAS','ALSO','ARCH','AREA','ARMY',
    'AVID','AXLE','BABE','BACK','BAIT','BAKE','BALD','BALE','BALL','BAND','BANE',
    'BANK','BARE','BARK','BARN','BASE','BATH','BEAD','BEAM','BEAN','BEAR','BEAT',
    'BEEF','BEEN','BEER','BELL','BELT','BEND','BENT','BEST','BIKE','BILL','BIND',
    'BIRD','BITE','BLEW','BLOB','BLOG','BLOW','BLUE','BLUR','BOAR','BOAT','BODY',
    'BOLD','BOLT','BOMB','BOND','BONE','BOOK','BOOM','BOOT','BORE','BORN','BOSS',
    'BOTH','BOWL','BULK','BULL','BUMP','BURN','BURY','BUSH','BUSY','BUZZ','CAFE',
    'CAGE','CAKE','CALL','CALM','CAME','CAMP','CANE','CAPE','CARD','CARE','CART',
    'CASE','CASH','CAST','CAVE','CELL','CHAT','CHEF','CHIN','CHIP','CHOP','CITY',
    'CLAD','CLAM','CLAN','CLAP','CLAW','CLAY','CLIP','CLOT','CLUB','CLUE','COAL',
    'COAT','CODE','COIL','COIN','COLD','COLT','COME','COOK','COOL','COPE','COPY',
    'CORD','CORE','CORK','CORN','COST','COZY','CRAB','CREW','CROP','CROW','CURE',
    'CURL','CUTE','DALE','DAME','DAMP','DARE','DARK','DART','DASH','DATA','DAWN',
    'DEAD','DEAF','DEAL','DEAR','DECK','DEED','DEEM','DEEP','DEER','DEMO','DENY',
    'DESK','DIAL','DICE','DIET','DIME','DINE','DIRT','DISC','DISH','DOCK','DOES',
    'DOME','DONE','DOOM','DOOR','DOSE','DOWN','DRAG','DRAW','DREW','DRIP','DROP',
    'DRUM','DUAL','DUCK','DUDE','DUEL','DUKE','DULL','DUMB','DUMP','DUNE','DUSK',
    'DUST','DUTY','DYED','EACH','EARL','EARN','EASE','EAST','EASY','EDGE','EDIT',
    'ELSE','EMIT','ENVY','EPIC','EVEN','EVER','EVIL','EXAM','EXPO','EYES','FACE',
    'FACT','FADE','FAIL','FAIR','FAKE','FALL','FAME','FANG','FARE','FARM','FAST',
    'FATE','FAWN','FEAR','FEAT','FEED','FEEL','FEET','FELL','FELT','FEND','FERN',
    'FEST','FEUD','FILE','FILL','FILM','FIND','FINE','FIRE','FIRM','FISH','FIST',
    'FLAG','FLAK','FLAM','FLAN','FLAP','FLAT','FLAW','FLEA','FLED','FLEW','FLEX',
    'FLIP','FLIT','FLOG','FLOW','FOAM','FOIL','FOLD','FOLK','FOND','FONT','FOOD',
    'FOOL','FOOT','FORD','FORE','FORK','FORM','FORT','FOUL','FOUR','FREE','FROG',
    'FROM','FUEL','FULL','FUME','FUND','FUSE','FURY','FUSS','GALE','GAME','GAPE',
    'GARB','GATE','GAVE','GAZE','GEAR','GENE','GIFT','GIRL','GIST','GIVE','GLAD',
    'GLEE','GLEN','GLOW','GLUE','GOAT','GOES','GOLD','GOLF','GONE','GOOD','GOOF',
    'GORE','GRAB','GRAM','GRAY','GREW','GRID','GRIM','GRIN','GRIP','GRIT','GROW',
    'GULF','GUST','GUTS','HACK','HAIL','HAIR','HALE','HALF','HALL','HALT','HAND',
    'HANG','HARE','HARM','HARP','HASH','HASP','HATE','HAUL','HAVE','HAZE','HEAD',
    'HEAL','HEAP','HEAR','HEAT','HEEL','HELD','HELL','HELP','HERB','HERD','HERE',
    'HERO','HIDE','HIGH','HIKE','HILL','HILT','HIND','HINT','HIRE','HOLD','HOLE',
    'HOME','HONE','HOOD','HOOK','HOPE','HORN','HOST','HOUR','HOWL','HUGE','HULL',
    'HUMP','HUNG','HUNT','HURL','HURT','HUSK','HYPE','ICON','IDEA','INCH','INTO',
    'IRON','ISLE','ITCH','ITEM','JACK','JAIL','JAMS','JAVA','JAZZ','JERK','JEST',
    'JIVE','JOIN','JOKE','JOLT','JUMP','JUNE','JURY','JUST','KEEN','KEEP','KEPT',
    'KEYS','KICK','KIDS','KILL','KIND','KING','KISS','KITE','KNEE','KNEW',
    'KNIT','KNOB','KNOT','KNOW','LACE','LACK','LADY','LAID','LAKE','LAMB','LAME',
    'LAMP','LAND','LANE','LARD','LARK','LASH','LAST','LATE','LAWN','LAWS','LEAD',
    'LEAF','LEAK','LEAN','LEAP','LEFT','LEND','LENS','LESS','LICK','LIED','LIFE',
    'LIFT','LIKE','LIMB','LIME','LIMP','LINE','LINK','LION','LIST','LIVE','LOAD',
    'LOAF','LOAN','LOCK','LOFT','LONE','LONG','LOOK','LOOP','LORD','LORE','LOSE',
    'LOSS','LOST','LOTS','LOUD','LOVE','LUCK','LUMP','LUNG','LURE','LURK','LUSH',
    'LUST','LYNX','MACE','MADE','MAID','MAIL','MAKE','MALE','MALL','MALT',
    'MANE','MANY','MARE','MARK','MARS','MASH','MASK','MASS','MAST','MATE','MAZE',
    'MEAL','MEAN','MEAT','MEEK','MEET','MELD','MELT','MEMO','MEND','MENU','MERE',
    'MESH','MESS','MICA','MICE','MILD','MILE','MILK','MILL','MIME','MIND','MINE',
    'MINT','MIRE','MISS','MIST','MOAT','MOCK','MODE','MOLD','MOLE','MOLT','MONK',
    'MOOD','MOON','MOOR','MORE','MOSS','MOST','MOTH','MOVE','MUCH','MUCK','MULE',
    'MULL','MUSE','MUSH','MUST','MUTE','MYTH','NAIL','NAME','NAVY','NEAR','NEAT',
    'NECK','NEED','NEST','NEWS','NEXT','NICE','NINE','NODE','NONE','NOON','NORM',
    'NOSE','NOTE','NOUN','NUDE','NULL','OAKS','OATH','OBEY','ODDS','OGRE','OILY',
    'OMEN','OMIT','ONCE','ONLY','ONTO','OPUS','ORAL','OVEN','OVER','PACE','PACK',
    'PAGE','PAID','PAIL','PAIN','PAIR','PALE','PALM','PANE','PARK','PART','PASS',
    'PAST','PATH','PAVE','PEAK','PEAL','PEAR','PEAT','PECK','PEEL','PEER','PELT',
    'PEND','PERK','PERM','PEST','PICK','PIER','PIKE','PILE','PILL','PINE','PINK',
    'PIPE','PLAN','PLAY','PLEA','PLOD','PLOT','PLOW','PLOY','PLUG','PLUM','PLUS',
    'POEM','POET','POLE','POLL','POLO','POND','PONY','POOL','POOR','POPE','PORE',
    'PORK','PORT','POSE','POSH','POST','POUR','PRAY','PREY','PRIM','PROP','PROW',
    'PULL','PULP','PUMP','PUNK','PURE','PUSH','QUIT','QUIZ','RACE','RACK','RAFT',
    'RAGE','RAID','RAIL','RAIN','RAKE','RAMP','RANG','RANK','RARE','RASH','RATE',
    'RAVE','READ','REAL','REAP','REAR','REED','REEF','REEL','REIN','RELY','RENT',
    'REST','RICE','RICH','RIDE','RIFT','RIND','RING','RIOT','RIPE','RISE','RISK',
    'ROAD','ROAM','ROAR','ROBE','ROCK','RODE','ROLE','ROLL','ROOF','ROOM','ROOT',
    'ROPE','ROSE','ROSY','ROUT','RUDE','RUIN','RULE','RUMP','RUNG','RUSH','RUST',
    'SACK','SAFE','SAGE','SAID','SAIL','SAKE','SALE','SALT','SAND','SANE','SANG',
    'SANK','SASH','SAVE','SCAN','SCAR','SEAL','SEAM','SEAT','SECT','SEED','SEEK',
    'SEEM','SEEN','SELF','SELL','SEND','SENT','SHED','SHIN','SHIP','SHOE','SHOO',
    'SHOP','SHOT','SHOW','SHUT','SICK','SIDE','SIFT','SIGH','SIGN','SILK','SING',
    'SINK','SITE','SIZE','SKIN','SKIP','SLAB','SLAG','SLAM','SLAP','SLAT','SLAW',
    'SLED','SLEW','SLID','SLIM','SLIP','SLIT','SLOT','SLOW','SLUG','SLUM','SMOG',
    'SNAP','SNAG','SNIP','SNOB','SNOT','SNOW','SNUB','SNUG','SOAK','SOAP','SOAR',
    'SOCK','SODA','SOFA','SOFT','SOIL','SOLD','SOLE','SOME','SONG','SOON','SOOT',
    'SORE','SORT','SOUL','SOUP','SOUR','SPAN','SPAR','SPEC','SPED','SPIN','SPIT',
    'SPOT','SPUN','SPUR','STAB','STAG','STAR','STAY','STEM','STEP','STEW','STIR',
    'STOP','STUB','STUD','STUN','SUCH','SUIT','SULK','SUNG','SUNK','SURE','SURF',
    'SWAN','SWAP','SWIM','SWUM','TABS','TACK','TAIL','TAKE','TALE','TALK','TALL',
    'TAME','TANG','TANK','TAPE','TAPS','TARN','TART','TASK','TEAM','TEAR','TELL',
    'TEMP','TEND','TENT','TERM','TEST','TEXT','THAN','THAT','THEM','THEN','THEY',
    'THIN','THIS','TICK','TIDE','TIDY','TIED','TIER','TILE','TILL','TILT','TIME',
    'TINY','TIRE','TOAD','TOIL','TOLD','TOLL','TOMB','TONE','TOOK','TOOL','TOPS',
    'TORE','TORN','TOSS','TOUR','TOWN','TRAP','TRAY','TREE','TREK','TRIM','TRIO',
    'TRIP','TROD','TROT','TRUE','TUBE','TUCK','TUFT','TUNA','TUNE','TURF','TURN',
    'TUSK','TUTU','TWIG','TWIN','TYPE','UGLY','UNDO','UNIT','UPON','URGE','USED',
    'VAIN','VALE','VANE','VARY','VAST','VEIL','VEIN','VENT','VERB','VERY','VEST',
    'VETO','VIAL','VICE','VIED','VIEW','VINE','VISA','VOID','VOLT','VOTE','WADE',
    'WAGE','WAIL','WAIT','WAKE','WALK','WALL','WAND','WANT','WARD','WARM','WARN',
    'WARP','WART','WARY','WASH','WASP','WAVE','WAVY','WAXY','WEAK','WEAN','WEAR',
    'WEED','WEEK','WEEP','WELD','WELL','WENT','WERE','WEST','WHAT','WHEN','WHOM',
    'WICK','WIDE','WIFE','WILD','WILL','WILT','WILY','WIND','WINE','WING','WINK',
    'WIPE','WIRE','WISE','WISH','WITH','WOKE','WOLF','WOOD','WOOL','WORD','WORE',
    'WORK','WORM','WORN','WOVE','WRAP','WREN','YARD','YARN','YEAR','YELL','YOGA',
    'YOKE','YOUR','ZEAL','ZERO','ZINC','ZONE','ZOOM',
  ];

  // 5-letter words missing from ANSWERS that were previously misfiled in the
  // other length lists.
  const EXTRA_5 = [
    'CRAZY','RENEW',
  ];

  const EXTRA_6 = [
    'ABSORB','ACCEPT','ACCESS','ACROSS','ACTION','ACTIVE','ACTUAL','ADVICE',
    'ADVISE','AFFORD','AGENDA','ALMOST','AMOUNT','ANIMAL','ANNUAL','ANSWER',
    'ANYONE','ANYWAY','APPEAL','ARCTIC','ARMOUR','AROUND','ARREST','ARRIVE',
    'ARTIST','ASSUME','ATTACH','ATTACK','ATTEND','BASKET','BATTLE','BEAUTY',
    'BECOME','BEFORE','BEHIND','BELONG','BESIDE','BEYOND','BISHOP','BITTER',
    'BLANKS','BLINDS','BOTHER','BOTTOM','BOUNCE','BRANCH','BREATH','BRIDGE',
    'BRIGHT','BROKEN','BRONZE','BROWSE','BUCKET','BUDGET','BUNDLE','BURDEN',
    'BUREAU','BUTTON','CANDLE','CANNON','CANVAS','CARBON','CAREER','CASTLE',
    'CASUAL','CAUGHT','CAUSES','CENTER','CHANCE','CHANGE','CHARGE','CHOSEN',
    'CHURCH','CIRCLE','CLIENT','CLOSET','COFFEE','COLUMN','COMBAT','COMEDY',
    'COMMON','COMPLY','CONVEY','CORNER','COSTLY','COTTON','COUNTY','COUPLE',
    'COURSE','CUSTOM','DAMAGE','DANGER','DEALER','DECADE','DECIDE',
    'DEFECT','DEFEND','DEFINE','DEGREE','DEMAND','DEPLOY','DEPUTY','DESERT',
    'DESIGN','DESIRE','DETAIL','DETECT','DEVICE','DIFFER','DINNER','DIRECT',
    'DOMAIN','DOUBLE','DRAGON','DRIVEN','DURING','EASILY','EATING','EDITOR','EFFECT',
    'EFFORT','EMPIRE','ENABLE','ENDURE','ENERGY','ENGAGE','ENGINE','ENOUGH',
    'ENSURE','ENTIRE','ENTITY','EQUITY','ESCAPE','ESTATE','EVOLVE','EXCEED',
    'EXCEPT','EXCUSE','EXOTIC','EXPAND','EXPECT','EXPERT','EXPORT','EXTEND',
    'EXTENT','FABRIC','FACTOR','FAIRLY','FAMILY','FAMOUS','FARMER','FATHER',
    'FELINE','FELLOW','FEMALE','FIERCE','FIGURE','FILTER','FINALE','FINGER',
    'FLIGHT','FLOWER','FLYING','FOREST','FORGET','FORMAL','FORMAT','FORMER',
    'FOSTER','FOURTH','FREEZE','FRENCH','FRIEND','FROZEN','FUTURE','GALAXY',
    'GARDEN','GATHER','GENTLY','GLOBAL','GOLDEN','GOSPEL','GOVERN','GROUND','GROWTH',
    'GUITAR','HANDLE','HAPPEN','HARDLY','HEALTH','HEAVEN','HEIGHT','HIDDEN',
    'HOLDER','HOLLOW','HONEST','HORROR','HUNGER','HUNTER','IGNORE','IMPACT',
    'IMPORT','IMPOSE','INCOME','INDEED','INFORM','INJURY','INSERT','INSIDE',
    'INSIST','INTACT','INTEND','INTENT','INVEST','ISLAND','ITSELF','JACKET',
    'JUNGLE','JUNIOR','KINDLY','KNIGHT','LAUNCH','LAWYER','LAYOUT','LEADER',
    'LEGACY','LENGTH','LESSON','LETTER','LIKELY','LINEUP','LINKED','LIQUID',
    'LISTEN','LITTLE','LIVELY','LOCATE','LONELY','LOVELY','MAINLY','MANAGE',
    'MANNER','MARKET','MASTER','MATTER','MEDIUM','MEMBER','MEMORY','MENTAL',
    'MENTOR','METHOD','MIDDLE','MIGHTY','MINUTE','MIRROR','MODERN','MODEST',
    'MOMENT','MONKEY','MORTAL','MOSTLY','MOTHER','MOTION','MOTIVE','MURDER',
    'MUSCLE','MUSEUM','MUTUAL','MYSELF','NARROW','NATION','NATURE','NEARBY',
    'NEARLY','NEEDLE','NORMAL','NOTICE','NOTION','OBJECT','OBTAIN','OCCUPY',
    'OFFEND','OFFICE','OPPOSE','OPTION','ORANGE','ORIGIN','OUTPUT','OXYGEN',
    'PALACE','PARISH','PATROL','PATRON','PEANUT','PENCIL',
    'PHRASE','PICKLE','PIGEON','PILLAR','PLANET','PLAYER','PLEASE',
    'PLENTY','POCKET','POETRY','POISON','POLICE','POLICY','POLISH','POORLY',
    'PORTAL','POSTER','POTATO','POUNCE','PRAYER','PREFER','PRETTY','PRINCE',
    'PRISON','PROFIT','PROPER','PROVEN','PUBLIC','PURSUE','PUZZLE','QUARRY',
    'QUARTZ','RABBIT','RANDOM','RATHER','READER','REASON','RECALL','RECORD',
    'REDUCE','REFORM','REFUSE','REGARD','REGIME','REGION','REGRET','REJECT',
    'RELATE','RELIEF','REMAIN','REMOTE','REMOVE','RENDER','REPEAT',
    'REPLAY','REPORT','RESIST','RESORT','RESULT','RETAIL','RETAIN','RETIRE',
    'RETURN','REVEAL','REVIEW','REVOLT','REWARD','RIBBON','RITUAL','ROBUST',
    'ROCKET','RUBBER','RUGGED','RUSTIC','SACRED','SAFARI','SAFETY','SALARY',
    'SAMPLE','SAVAGE','SCHEME','SCHOOL','SCREEN','SCRIPT','SEARCH','SEASON',
    'SECRET','SECTOR','SECURE','SELECT','SENIOR','SERIES','SETTLE','SEVERE',
    'SHADOW','SHIELD','SIGNAL','SILENT','SIMPLE','SIMPLY','SINGLE','SISTER',
    'SKETCH','SLEEVE','SMOOTH','SOCCER','SOCIAL','SOFTLY','SOLELY','SOLEMN',
    'SOLVED','SOUGHT','SOURCE','SPIRIT','SPREAD','SPRING','SQUARE','STATIC',
    'STATUS','STEADY','STEREO','STOLEN','STRAIN','STRAND','STREAM','STREET',
    'STRESS','STRICT','STRIKE','STRING','STROKE','STRONG','STRUCK','STUDIO',
    'SUBMIT','SUBTLE','SUDDEN','SUFFER','SUMMER','SUMMIT','SUNDAY','SUPPLY',
    'SURELY','SURVEY','SWITCH','SYMBOL','TACKLE','TALENT','TARGET','TEMPLE',
    'TENANT','TENDER','TERROR','THANKS','THEORY','THIRTY','THREAD','THREAT',
    'THRILL','THRIVE','THRONE','TIMBER','TISSUE','TONGUE','TOWARD','TRAVEL',
    'TREATY','TRIBAL','TROPHY','TRYING','TUNNEL','TURKEY','UNFAIR','UNFOLD','UNIQUE',
    'UNLESS','UNLIKE','UNVEIL','UPDATE','UPHOLD','URGENT','USEFUL','VALLEY',
    'VARIES','VENDOR','VESSEL','VIABLE','VIOLET','VIRTUE','VISION','VOLUME',
    'WANDER','WEALTH','WEAPON','WEIGHT','WINTER','WISDOM','WITHIN','WONDER','WORKER',
    'WORTHY','WRITER','YELLOW',
  ];

  const EXTRA_7 = [
    'ABILITY','ABSENCE','ACADEMY','ACCOUNT','ACHIEVE','ACQUIRE','ADDRESS',
    'ADVANCE','ALREADY','ANOTHER','ANXIETY','ANYBODY','APPLIED','ARRANGE',
    'ARTICLE','ATTEMPT','BALANCE','BARGAIN','BATTERY','BEARING','BEDROOM',
    'BELIEVE','BENEATH','BENEFIT','BESIDES','BISHOPS','BIZARRE','BLANKET',
    'BOTHERS','BOUNCED','BREATHE','BROADER','BROTHER',
    'CABINET','CAPABLE','CAPITAL','CAPTAIN','CAPTURE','CAREFUL','CAUTION',
    'CEILING','CERTAIN','CHAMBER','CHANNEL','CHAPTER','CHARITY','CHICKEN',
    'CIRCUIT','CITIZEN','CLASSIC','CLIMATE','CLOSING','CLUSTER','COASTAL',
    'COLLECT','COLLEGE','COMFORT','COMMAND','COMMENT','COMPACT','COMPANY',
    'COMPARE','COMPETE','COMPLEX','CONCERN','CONFIRM','CONNECT','CONSIST',
    'CONTACT','CONTAIN','CONTENT','CONTEXT','CONTROL','CONVERT','CORRECT',
    'COUNCIL','COUNTRY','COURAGE','CREATOR','CRICKET','CRIMSON','CRYSTAL',
    'CULTURE','CURRENT','CURTAIN','CUSTOMS','DEALING','DECIDED',
    'DECLINE','DEFAULT','DEFENCE','DEFICIT','DELIVER','DENSITY','DEPOSIT',
    'DIGITAL','DISPLAY','DISPUTE','DIVERSE','DOCTORS','DONATED',
    'DRESSED','DYNAMIC','EAGERLY','ECONOMY','EDITION','ELDERLY','ELEMENT',
    'EMERGED','EMPLOYE','ENABLED','ENDLESS','ENFORCE','ENHANCE',
    'ENQUIRE','EPISODE','EQUALLY','ESSENCE','EVIDENT','EXAMINE','EXAMPLE',
    'EXCITED','EXCLUDE','EXHIBIT','EXPENSE','EXPLAIN','EXPLOIT','EXPLORE',
    'EXTREME','FACTORY','FACULTY','FASHION','FEATURE','FICTION','FINALLY',
    'FINANCE','FINDING','FOREIGN','FOREVER','FORMULA','FORTUNE','FORWARD',
    'FOUNDER','FREEDOM','FURTHER','GATEWAY','GENERAL','GENETIC','GENUINE',
    'GLIMPSE','GRAVITY','GRADUAL','GRANITE',
    'GREATER','HABITAT','HANDFUL','HARMONY','HARVEST','HEALTHY','HELPFUL',
    'HEROISM','HIGHWAY','HISTORY','HOLIDAY','HONESTY','HORIZON','HOSTILE',
    'HUNDRED','HUNTING','HUSBAND','ILLNESS','IMAGINE','IMMENSE',
    'IMPLIED','IMPROVE','INCLUDE','INDEXED','INITIAL','INQUIRY',
    'INSIGHT','INSPECT','INSTALL','INSTANT','INTEGER','INTERIM','INVOLVE',
    'JOURNAL','JOURNEY','JUSTICE','JUSTIFY','KITCHEN','LANDING','LARGELY',
    'LASTING','LIBERAL','LIBERTY','LIBRARY','LICENSE','LIMITED','LOGICAL',
    'LOYALTY','MACHINE','MADNESS','MANAGER','MANKIND','MASSIVE','MASTERS',
    'MATTERS','MAXIMUM','MEASURE','MEDICAL','MEETING','MENTION','MESSAGE',
    'MINERAL','MINIMAL','MINIMUM','MIRACLE','MISSION','MISTAKE','MIXTURE',
    'MONITOR','MONTHLY','MORNING','MYSTERY','NATURAL','NEITHER','NETWORK',
    'NOTABLE','NOTHING','NUCLEAR','NURSING','OBSCURE','OBSERVE','OFFENSE',
    'OFFICER','OPINION','ORGANIC','OUTLINE','OUTSIDE','OVERALL','PACIFIC',
    'PACKAGE','PAINTER','PARKING','PARTIAL','PARTNER','PASSAGE','PASSING',
    'PASSION','PATIENT','PATTERN','PAYMENT','PEASANT','PENALTY','PENSION','PERFECT',
    'PERFORM','PERSIST','PHANTOM','PHONICS','PHYSICS','PICTURE','PIONEER',
    'PLASTIC','PLATTER','PLAYERS','PLAYFUL','POINTER','POLITIC',
    'POPULAR','PORTION','POVERTY','PREDICT','PREMIER','PREMIUM','PREPARE',
    'PRESENT','PREVENT','PRIMARY','PRIVACY','PRIVATE','PROBLEM','PROCEED',
    'PROCESS','PRODUCE','PRODUCT','PROFILE','PROGRAM','PROJECT','PROMISE',
    'PROMOTE','PROTECT','PROTEIN','PROTEST','PROVIDE','PUBLISH','PURPOSE',
    'QUALIFY','QUARTER','RADICAL','RAINBOW','REALITY','REALIZE','RECEIPT',
    'RECEIVE','RECOVER','REDUCED','REFLECT','REGULAR','RELATED','RELEASE',
    'REMAINS','REMOVAL','REPLACE','REQUIRE','RESERVE','RESOLVE','RESPECT',
    'RESPOND','RESTORE','RETREAT','REVIVAL','RIGGING','ROBBERY',
    'ROLLING','ROMANCE','ROUNDED','ROUTINE','RUNNING','SATISFY','SCHOLAR',
    'SCIENCE','SCRATCH','SECTION','SEGMENT','SERIOUS','SERVICE','SESSION',
    'SETTING','SHELTER','SILENCE','SILICON','SIMILAR','SINCERE','SKILLED',
    'SOLDIER','SOMEHOW','SPEAKER','SPECIAL','SPONSOR','STADIUM','STORAGE',
    'STRANGE','STUDENT','SUBJECT','SUCCEED','SUCCESS','SUGGEST','SURFACE',
    'SURPLUS','SURVIVE','SUSPECT','SUSTAIN','TEACHER','THEATRE','THERAPY',
    'THOUGHT','THROUGH','TONIGHT','TOTALLY','TOURIST','TRAGEDY','TRAINER',
    'TROUBLE','TYPICAL','UNAWARE','UNDERGO','UNIFORM',
    'UNKNOWN','UNUSUAL','UPGRADE','VARIETY','VENTURE','VERBOSE',
    'VERSION','VETERAN','VILLAGE','VIOLENT','VISIBLE','WARRIOR',
    'WEATHER','WEBSITE','WELCOME','WELFARE','WESTERN','WHETHER','WHISPER',
    'WINNING','WORKING','WORSHIP','WRAPPED','WRITING','WRITTEN',
  ];

  // Merge into VALID_SET
  EXTRA_4.forEach(w => VALID_SET.add(w));
  EXTRA_5.forEach(w => VALID_SET.add(w));
  EXTRA_6.forEach(w => VALID_SET.add(w));
  EXTRA_7.forEach(w => VALID_SET.add(w));

  // ── Themed word lists ───────────────────────────────────────────
  const THEMES = {
    animals:   ['TIGER','EAGLE','SHARK','WHALE','SNAKE','HORSE','ZEBRA','WOLF','BEAR','DEER','MOUSE','BIRD','FROG','GOAT','LION','CAMEL','FOX','CRANE','RAVEN','PILOT','MOOSE','OTTER','HAWK','KOALA','PANDA','BUFFALO','JAGUAR','PENGUIN','DOLPHIN','SALMON'],
    countries: ['FRANCE','JAPAN','KENYA','INDIA','CHINA','EGYPT','BRAZIL','MEXICO','ITALY','SPAIN','TURKEY','NORWAY','SWEDEN','POLAND','GREECE','CUBA','IRAQ','IRAN','LAOS','MALI','OMAN','PERU','FIJI','CHAD','GUAM','NIUE','PALAU','SAMOA','TONGA','NAURU'],
    food:      ['PASTA','CHEESE','GRAPE','MELON','SPICE','BREAD','BUTTER','CREAM','HONEY','LEMON','OLIVE','PEACH','RICE','SUGAR','TOAST','MANGO','BERRY','CIDER','COCOA','CURRY','GHERKIN','NOODLE','RADISH','SALSA','STEAK','TOFU','WAFFLE','YOGURT','ZESTY'],
    sports:    ['TENNIS','GOLF','BOXING','CRICKET','RUGBY','HOCKEY','KARATE','POLO','SQUASH','SURFING','FENCING','ROWING','DIVING','SKIING','ARCHERY','BOWLING','CLIMBING','JAVELIN','LACROSSE','SAILING'],
    science:   ['ATOM','VIRUS','ORBIT','GENES','LASER','NERVE','CELL','FORCE','GRAVITY','ENERGY','PROTON','NEUTRON','PHOTON','QUARK','GENE','ENZYME','NUCLEUS','PLASMA','VACUUM','SPECTRUM'],
    nature:    ['RIVER','OCEAN','STORM','CLOUD','FIELD','FLORA','CORAL','MEADOW','FOREST','DESERT','ISLAND','PLAINS','TUNDRA','VOLCANO','CANYON','GLACIER','LAGOON','MARSH','TROPIC'],
    music:     ['TEMPO','CHORD','BASS','DRUM','FLUTE','HARP','PIANO','TRUMPET','GUITAR','VIOLIN','CELLO','LYRIC','MELODY','RHYTHM','BALLAD','CHORUS','TREBLE','BANJO','UKULELE','SAXOPHONE'],
    movies:    ['FILM','CINEMA','DRAMA','COMEDY','ACTION','HORROR','THRILLER','ROMANCE','FANTASY','SCIFI','SCRIPT','DIRECTOR','ACTRESS','ACTOR','SCREEN','PLOT','GENRE','SCENE','TRAILER','STUDIO'],
    tech:      ['CODE','DATA','CHIP','WIFI','MODEM','BYTES','PIXEL','CLOUD','ROBOT','CYBER','HACKER','SERVER','MOUSE','DISK','ROUTER','PYTHON','ARRAY','BINARY','LOGIC','CACHE'],
    history:   ['ROME','FORT','KING','QUEEN','CASTLE','SWORD','SHIELD','THRONE','BATTLE','EMPIRE','PHARAOH','KNIGHT','MEDIEVAL','DYNASTY','REVOLUTION','PYRAMID','TEMPLE','ARSENAL','CONQUEST','HERITAGE'],
    art:       ['PAINT','BRUSH','COLOR','DRAFT','SKETCH','CANVAS','SCULPT','GALLERY','MUSEUM','PORTRAIT','DRAWING','WATERCOLOR','FRESCO','MOSAIC','POTTERY','DESIGN','PATTERN','TEXTILE','MURALS','FRAME'],
  };

  // Themed answers have to be guessable as well, or a themed game cannot be
  // won: the player is refused the very word they are being asked for.
  Object.values(THEMES).flat().forEach(w => VALID_SET.add(w));

  function pickWord(theme) {
    const settings = loadSettings();
    const len = settings.wordLength || 5;

    // Build candidate pool filtered by length
    let pool;
    if (theme && theme !== 'all' && THEMES[theme]) {
      pool = THEMES[theme].filter(w => w.length === len);
    } else {
      pool = ANSWERS.filter(w => w.length === len);
    }

    if (pool.length === 0) {
      // Fallback: use any word of the right length from all themes
      const allThemed = Object.values(THEMES).flat().filter(w => w.length === len);
      pool = allThemed.length > 0 ? allThemed : ANSWERS.filter(w => w.length === len);
    }

    return pool[Math.floor(Math.random() * pool.length)];
  }

  // ── Daily challenge (date-seeded) ───────────────────────────────
  const DAILY_KEY = 'wg_daily';

  function todayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  // Theme of the day — cycles through non-"all" themes
  const DAILY_THEMES = ['animals', 'countries', 'food', 'sports', 'science', 'nature', 'music', 'movies', 'tech', 'history', 'art'];

  function getDailyTheme() {
    const dateStr = todayStr();
    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) {
      hash = ((hash << 5) - hash + dateStr.charCodeAt(i)) | 0;
    }
    return DAILY_THEMES[Math.abs(hash) % DAILY_THEMES.length];
  }

  function pickDailyWord() {
    const dateStr = todayStr();
    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) {
      hash = ((hash << 5) - hash + dateStr.charCodeAt(i)) | 0;
    }
    const settings = loadSettings();
    const len = settings.wordLength || 5;
    const theme = settings.theme || 'all';

    // Build pool: filter by theme and length
    let pool;
    if (theme !== 'all' && THEMES[theme]) {
      pool = THEMES[theme].filter(w => w.length === len);
    } else {
      pool = ANSWERS.filter(w => w.length === len);
    }

    if (pool.length === 0) {
      // Fallback: any word of the right length
      pool = ANSWERS.filter(w => w.length === len);
    }
    if (pool.length === 0) return ANSWERS[Math.abs(hash) % ANSWERS.length];
    return pool[Math.abs(hash) % pool.length];
  }

  function loadDaily() {
    return safeGet(DAILY_KEY);
  }

  function saveDaily(data) {
    const prev = loadDaily();
    safeSet(DAILY_KEY, data);
    // Track total daily challenges completed (only count new completions)
    if (data.done && data.date === todayStr() && !(prev && prev.done && prev.date === todayStr())) {
      const count = (safeGet('wg_daily_count') || 0) + 1;
      safeSet('wg_daily_count', count);
    }
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
      initGame(pendingDaily, pendingTournament);
      pendingDaily = false;
      pendingTournament = false;
    }
  }

  let pendingDaily = false;
  let pendingTournament = false;

  document.querySelectorAll('[data-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      pendingDaily = !!btn.dataset.daily;
      pendingTournament = !!btn.dataset.tournament;
      showScreen(btn.dataset.target);
    });
  });
  document.querySelectorAll('[data-back]').forEach(btn => {
    btn.addEventListener('click', () => showScreen('menu'));
  });

  // ── Challenge mode (multiplayer via URL params) ───────────────
  function getChallengeParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      word:  params.get('w'),
      theme: params.get('t'),
      len:   params.get('l'),
    };
  }

  function isChallengeMode() {
    return !!getChallengeParams().word;
  }

  function generateChallengeLink(word, theme, len) {
    const base = window.location.origin + window.location.pathname;
    return `${base}?w=${word}&t=${theme || 'all'}&l=${len || 5}`;
  }

  // ── Tournament mode ───────────────────────────────────────────
  const TOURNAMENT_KEY = 'wg_tournament';

  // Weekly tournament rotates theme every 7 days
  function getTournamentTheme() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((now - startOfYear) / 86400000);
    const weekNum = Math.floor(dayOfYear / 7);
    return DAILY_THEMES[weekNum % DAILY_THEMES.length];
  }

  function getTournamentWeek() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((now - startOfYear) / 86400000);
    return Math.floor(dayOfYear / 7);
  }

  function loadTournament() {
    return safeGet(TOURNAMENT_KEY) || { week: null, played: 0, won: 0, streak: 0 };
  }

  function saveTournament(data) {
    safeSet(TOURNAMENT_KEY, data);
  }

  function resetTournamentIfNewWeek() {
    const current = getTournamentWeek();
    const saved = loadTournament();
    if (saved.week !== current) {
      saveTournament({ week: current, played: 0, won: 0, streak: 0 });
    }
  }

  function updateTournamentStats(won) {
    resetTournamentIfNewWeek();
    const t = loadTournament();
    t.played++;
    if (won) {
      t.won++;
      t.streak++;
    } else {
      t.streak = 0;
    }
    saveTournament(t);
    return t;
  }

  function buildTournamentShareText() {
    resetTournamentIfNewWeek();
    const data = loadTournament();
    const theme = getTournamentTheme();
    const emoji = { animals: '🐾', countries: '🌍', food: '🍽️', sports: '⚽', science: '🔬', nature: '🌿', music: '🎵', movies: '🎬', tech: '💻', history: '📜', art: '🎨' }[theme] || '';
    const pct = data.played ? Math.round((data.won / data.played) * 100) : 0;
    return `WordGuess Tournament ${emoji} ${t('theme_' + theme)}\n📅 Week ${data.week}\n🎮 ${data.played} played · ${pct}% win · 🔥 ${data.streak} streak\n\nPlay: ${SHARE_URL}`;
  }

  // ── English game ───────────────────────────────────────────────
  let COLS = 5;
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

  // ── Sound effects (Web Audio API) ─────────────────────────────
  let audioCtx = null;

  function getAudioCtx() {
    if (!audioCtx) {
      try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
      catch { return null; }
    }
    return audioCtx;
  }

  const Sound = {
    click() {
      const ctx = getAudioCtx(); if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = 800;
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
      osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.03);
    },
    buzz() {
      const ctx = getAudioCtx(); if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = 200;
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.1);
    },
    ding() {
      const ctx = getAudioCtx(); if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(523, ctx.currentTime);       // C5
      osc.frequency.setValueAtTime(659, ctx.currentTime + 0.12); // E5
      osc.frequency.setValueAtTime(784, ctx.currentTime + 0.24); // G5
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.5);
    },
  };

  // ── Safe localStorage helpers ─────────────────────────────────
  function safeGet(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch {
      return null;
    }
  }

  function safeSet(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      toast(t('storage_error'));
      return false;
    }
  }

  // ── Settings (localStorage) ─────────────────────────────────────
  const SETTINGS_KEY = 'wg_settings';

  function defaultSettings() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return { dark: prefersDark, hc: false, easy: false, hard: false, theme: 'all', wordLength: 5, sound: true };
  }

  function loadSettings() {
    return Object.assign(defaultSettings(), safeGet(SETTINGS_KEY));
  }

  function saveSettings(s) {
    safeSet(SETTINGS_KEY, s);
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
    const icon = key === 'dark' ? (s[key] ? ' 🌙' : ' ☀️') : '';
    toast(`${label} ${state}${icon}`);
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

  // Update the tries count and word length in rule text based on current mode
  function updateRuleTries() {
    const s = loadSettings();
    const tries = (s.easy) ? 8 : 6;
    const wordLen = s.wordLength || 5;
    const lang = getLanguage();
    let base = t('htp_rule');
    if (lang === 'en') {
      // English: "Guess the hidden 5-letter word in 6 tries."
      base = base.replace(/\d+(?=-letter)/, wordLen);
      base = base.replace(/\d+(?=\s+tries)/, tries);
    } else {
      // Myanmar: replace first number (word length) and second number (tries)
      const nums = base.match(/\d+/g);
      if (nums && nums.length >= 2) {
        base = base.replace(nums[0], String(wordLen));
        base = base.replace(nums[1], String(tries));
      }
    }
    document.querySelectorAll('[data-i18n="htp_rule"]').forEach(el => {
      el.textContent = base;
    });
  }

  // Apply on load
  applySettings();
  applyTranslations();
  syncLangButtons();
  syncThemeButtons();
  syncWordLengthButtons();
  updateDailyThemeBanner();

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

  // ── Theme selector ─────────────────────────────────────────────
  function syncThemeButtons() {
    const settings = loadSettings();
    document.querySelectorAll('[data-theme]').forEach(btn => {
      const isActive = btn.dataset.theme === settings.theme;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive);
    });
  }

  // Daily theme banner
  function updateDailyThemeBanner() {
    const el = document.querySelector('[data-daily-theme-banner]');
    if (!el) return;
    const dailyTheme = getDailyTheme();
    const emoji = { animals: '🐾', countries: '🌍', food: '🍽️', sports: '⚽', science: '🔬', nature: '🌿', music: '🎵', movies: '🎬', tech: '💻', history: '📜', art: '🎨' }[dailyTheme] || '';
    el.textContent = `${emoji} ${t('daily_theme')}: ${t('theme_' + dailyTheme)}`;
    el.hidden = false;
  }

  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-theme]');
    if (!btn) return;
    const s = loadSettings();
    s.theme = btn.dataset.theme;
    saveSettings(s);
    syncThemeButtons();
    // Announce theme to screen readers
    const themeName = btn.dataset.theme === 'all' ? t('theme_all') : t('theme_' + btn.dataset.theme);
    live(t('theme_announce', { theme: themeName }));
  });

  // ── Word length selector ──────────────────────────────────────
  function syncWordLengthButtons() {
    const settings = loadSettings();
    document.querySelectorAll('[data-word-length]').forEach(btn => {
      const isActive = Number(btn.dataset.wordLength) === (settings.wordLength || 5);
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive);
    });
  }

  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-word-length]');
    if (!btn) return;
    const s = loadSettings();
    s.wordLength = Number(btn.dataset.wordLength);
    saveSettings(s);
    syncWordLengthButtons();
  });

  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-lang]');
    if (!btn) return;
    setLanguage(btn.dataset.lang);
    syncLangButtons();
  });

  // ── Stats (localStorage) ───────────────────────────────────────
  const STATS_KEY = 'wg_stats';
  const THEME_KEYS = ['all', 'animals', 'countries', 'food', 'sports', 'science', 'nature', 'music', 'movies', 'tech', 'history', 'art'];

  function emptyThemeStats() {
    return { played: 0, won: 0, currentStreak: 0, bestStreak: 0, distribution: [0, 0, 0, 0, 0, 0] };
  }

  function defaultStats() {
    const stats = {};
    THEME_KEYS.forEach(k => { stats[k] = emptyThemeStats(); });
    return stats;
  }

  function loadStats() {
    const raw = safeGet(STATS_KEY);
    // Migration: if old flat format, wrap as {all: oldStats}
    if (raw && typeof raw.played === 'number') {
      const migrated = defaultStats();
      migrated.all = Object.assign(emptyThemeStats(), raw);
      saveStats(migrated);
      return migrated;
    }
    return Object.assign(defaultStats(), raw || {});
  }

  function saveStats(s) {
    safeSet(STATS_KEY, s);
  }

  let activeStatsTheme = 'all';

  function updateStats(won) {
    const s = loadStats();
    const settings = loadSettings();
    const themeKey = settings.theme && settings.theme !== 'all' ? settings.theme : 'all';

    // Update per-theme stats
    ['all', themeKey].forEach(key => {
      if (!s[key]) s[key] = emptyThemeStats();
      s[key].played++;
      if (won) {
        s[key].won++;
        s[key].currentStreak++;
        if (s[key].currentStreak > s[key].bestStreak) s[key].bestStreak = s[key].currentStreak;
        const guessNum = eng.history.length;
        const maxGuesses = eng.rows || 6;
        if (guessNum >= 1 && guessNum <= maxGuesses) {
          while (s[key].distribution.length < maxGuesses) s[key].distribution.push(0);
          s[key].distribution[guessNum - 1]++;
        }
      } else {
        s[key].currentStreak = 0;
      }
    });

    saveStats(s);
    return s;
  }

  function renderStats(s) {
    const statsData = s || loadStats();
    const themeStats = statsData[activeStatsTheme] || emptyThemeStats();
    const pct = themeStats.played ? Math.round((themeStats.won / themeStats.played) * 100) : 0;

    document.querySelectorAll('[data-stat="played"]').forEach(el => { el.textContent = themeStats.played; });
    document.querySelectorAll('[data-stat="win-pct"]').forEach(el => { el.textContent = pct; });
    document.querySelectorAll('[data-stat="streak"]').forEach(el => {
      el.textContent = themeStats.currentStreak > 0 ? `${themeStats.currentStreak} 🔥` : themeStats.currentStreak;
    });
    document.querySelectorAll('[data-stat="best"]').forEach(el => { el.textContent = themeStats.bestStreak; });

    // Distribution chart
    const maxDist = Math.max(...themeStats.distribution, 1);
    document.querySelectorAll('[data-dist]').forEach(container => {
      container.innerHTML = '';
      const distLen = themeStats.distribution.length;
      for (let i = 0; i < distLen; i++) {
        const count = themeStats.distribution[i] || 0;
        const pctBar = Math.round((count / maxDist) * 100);
        const row = document.createElement('div');
        row.className = 'dist-row';
        row.innerHTML = `<span class="dist-label">${i + 1}</span><div class="dist-bar-wrap"><div class="dist-bar" style="width:${pctBar}%"></div></div><span class="dist-count">${count}</span>`;
        container.appendChild(row);
      }
    });

    // Sync theme tabs — roving tabindex: only the selected tab is in tab order
    document.querySelectorAll('[data-stats-theme]').forEach(btn => {
      const isActive = btn.dataset.statsTheme === activeStatsTheme;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive);
      btn.tabIndex = isActive ? 0 : -1;
      if (isActive) {
        const panel = document.querySelector('[data-stats-panel]');
        if (panel && btn.id) panel.setAttribute('aria-labelledby', btn.id);
      }
    });
  }

  // ── Achievement system ────────────────────────────────────────
  const ACHIEVEMENTS_KEY = 'wg_achievements';

  const ACHIEVEMENTS = [
    { id: 'first_win',    emoji: '🏆', nameKey: 'ach_first_win',    descKey: 'ach_first_win_desc' },
    { id: 'on_fire',      emoji: '🔥', nameKey: 'ach_on_fire',      descKey: 'ach_on_fire_desc' },
    { id: 'unstoppable',  emoji: '⚡', nameKey: 'ach_unstoppable',  descKey: 'ach_unstoppable_desc' },
    { id: 'perfectionist',emoji: '🎯', nameKey: 'ach_perfectionist',descKey: 'ach_perfectionist_desc' },
    { id: 'speed_demon',  emoji: '⏱️', nameKey: 'ach_speed_demon',  descKey: 'ach_speed_demon_desc' },
    { id: 'theme_master', emoji: '🎓', nameKey: 'ach_theme_master', descKey: 'ach_theme_master_desc' },
    { id: 'word_wizard',  emoji: '🧙', nameKey: 'ach_word_wizard',  descKey: 'ach_word_wizard_desc' },
    { id: 'century',      emoji: '💯', nameKey: 'ach_century',      descKey: 'ach_century_desc' },
    { id: 'all_rounder',  emoji: '🎲', nameKey: 'ach_all_rounder',  descKey: 'ach_all_rounder_desc' },
    { id: 'daily_devotee',emoji: '📅', nameKey: 'ach_daily_devotee',descKey: 'ach_daily_devotee_desc' },
    { id: 'collector',    emoji: '🏅', nameKey: 'ach_collector',    descKey: 'ach_collector_desc' },
    { id: 'completionist',emoji: '👑', nameKey: 'ach_completionist',descKey: 'ach_completionist_desc' },
  ];

  function loadAchievements() {
    return safeGet(ACHIEVEMENTS_KEY) || [];
  }

  function saveAchievements(list) {
    safeSet(ACHIEVEMENTS_KEY, list);
  }

  function hasAchievement(id) {
    return loadAchievements().includes(id);
  }

  function unlockAchievement(id) {
    if (hasAchievement(id)) return false;
    const list = loadAchievements();
    list.push(id);
    saveAchievements(list);
    const ach = ACHIEVEMENTS.find(a => a.id === id);
    if (ach) toast(`${ach.emoji} ${t(ach.nameKey)}`);
    renderAchievements();
    return true;
  }

  function checkAchievements(won) {
    if (!won) return;
    const s = loadStats();
    const allStats = s.all || { played: 0, won: 0, currentStreak: 0, bestStreak: 0 };

    // First Win
    unlockAchievement('first_win');

    // On Fire (3-game streak)
    if (allStats.currentStreak >= 3) unlockAchievement('on_fire');

    // Unstoppable (5-game streak)
    if (allStats.currentStreak >= 5) unlockAchievement('unstoppable');

    // Perfectionist (win in 1 guess)
    if (eng.history.length === 1) unlockAchievement('perfectionist');

    // Speed Demon (win in under 60 seconds)
    if (eng.startTime) {
      const elapsed = (Date.now() - eng.startTime) / 1000;
      if (elapsed < 60) unlockAchievement('speed_demon');
    }

    // Word Wizard (50 wins)
    if (allStats.won >= 50) unlockAchievement('word_wizard');

    // Century (100 wins)
    if (allStats.won >= 100) unlockAchievement('century');

    // Theme Master (win with every theme)
    const settings = loadSettings();
    if (settings.theme && settings.theme !== 'all') {
      const themeWins = safeGet('wg_theme_wins') || {};
      themeWins[settings.theme] = true;
      safeSet('wg_theme_wins', themeWins);
      const themeList = Object.keys(THEMES);
      if (themeList.every(t => themeWins[t])) unlockAchievement('theme_master');
    }

    // All-Rounder (win with 3+ word lengths)
    const lenWins = safeGet('wg_length_wins') || {};
    lenWins[settings.wordLength || 5] = true;
    safeSet('wg_length_wins', lenWins);
    if (Object.keys(lenWins).length >= 3) unlockAchievement('all_rounder');

    // Daily Devotee (play 7 daily challenges)
    const dailyCount = safeGet('wg_daily_count') || 0;
    if (dailyCount >= 7) unlockAchievement('daily_devotee');

    // Collector (5 achievements)
    if (loadAchievements().length >= 5) unlockAchievement('collector');

    // Completionist (all achievements)
    if (loadAchievements().length >= ACHIEVEMENTS.length) unlockAchievement('completionist');
  }

  function renderAchievements() {
    const container = document.querySelector('[data-achievements]');
    if (!container) return;
    container.innerHTML = '';
    const unlocked = loadAchievements();
    ACHIEVEMENTS.forEach(ach => {
      const isUnlocked = unlocked.includes(ach.id);
      const card = document.createElement('div');
      card.className = 'achievement-card' + (isUnlocked ? ' unlocked' : '');
      card.innerHTML = `
        <span class="achievement-emoji">${isUnlocked ? ach.emoji : '🔒'}</span>
        <span class="achievement-name">${isUnlocked ? t(ach.nameKey) : '???'}</span>
        <span class="achievement-desc">${isUnlocked ? t(ach.descKey) : ''}</span>
      `;
      container.appendChild(card);
    });
  }

  const SHARE_EMOJI = { correct: '🟩', present: '🟨', absent: '⬛' };
  const SHARE_URL   = 'https://nyeinchan-lwin.github.io/wordguess/';

  let eng = {};

  function initGame(daily, tournament) {
    const isDaily = !!daily;
    const isTournament = !!tournament;
    const challenge = getChallengeParams();
    const isChallenge = isChallengeMode();
    const alreadyDone = isDaily && isDailyComplete();
    const settings = loadSettings();
    COLS = isChallenge ? (challenge.len ? Number(challenge.len) : 5) : (settings.wordLength || 5);
    const rows = (isDaily || !settings.easy) ? 6 : 8;
    eng = {
      answer:       isChallenge ? challenge.word.toUpperCase() : (isDaily ? pickDailyWord() : pickWord(settings.theme)),
      daily:        isDaily,
      tournament:   isTournament,
      challenge:    isChallenge,
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
    // Show challenge banner if in challenge mode
    const challengeBanner = document.querySelector('[data-challenge-banner]');
    if (challengeBanner) challengeBanner.hidden = !isChallenge;
    // Show mode badge
    const badge = document.querySelector('[data-mode-badge]');
    if (badge) {
      const THEME_EMOJI = { animals: '🐾', countries: '🌍', food: '🍽️', sports: '⚽', science: '🔬', nature: '🌿', music: '🎵', movies: '🎬', tech: '💻', history: '📜', art: '🎨' };
      const parts = [];
      if (isTournament) {
        const tTheme = getTournamentTheme();
        const emoji = THEME_EMOJI[tTheme] || '';
        parts.push(`🏆 ${t('tournament')} ${emoji}`);
      }
      if (isDaily && !isTournament) parts.push(t('daily'));
      if (settings.easy && !isDaily) parts.push('Easy (8/8)');
      if (settings.hard) parts.push('Hard');
      if (settings.theme && settings.theme !== 'all' && !isDaily && !isTournament) {
        const emoji = THEME_EMOJI[settings.theme] || '';
        parts.push(`${emoji} ${t('theme_' + settings.theme)}`);
      }
      if (parts.length > 0) {
        badge.textContent = parts.join(' · ');
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
  let submitting = false;

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
    if (loadSettings().sound) Sound.click();
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
    if (submitting) return;

    if (eng.currentInput.length < COLS) {
      shakeRow(eng.currentRow);
      toast(t('not_enough'));
      if (loadSettings().sound) Sound.buzz();
      return;
    }

    if (!VALID_SET.has(eng.currentInput)) {
      shakeRow(eng.currentRow);
      toast(t('not_valid'));
      if (loadSettings().sound) Sound.buzz();
      return;
    }

    if (!validateHardMode(eng.currentInput)) {
      shakeRow(eng.currentRow);
      if (loadSettings().sound) Sound.buzz();
      return;
    }

    submitting = true;

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
      checkAchievements(true);
      if (eng.tournament) updateTournamentStats(true);
      submitting = false;
      if (eng.daily) saveDaily({ date: todayStr(), done: true, won: true, guesses: eng.history.map((_, i) => getGuessText(i)), history: eng.history });
      setTimeout(() => { bounceRow(eng.currentRow); fireConfetti(); if (loadSettings().sound) Sound.ding(); }, flipDone);
      const winDelay = flipDone + (COLS - 1) * BOUNCE_STAGGER + BOUNCE_MS + 200;
      setTimeout(() => {
        const settings = loadSettings();
        activeStatsTheme = settings.theme || 'all';
        renderStats(stats);
        setModal(t('solved', { n: eng.currentRow + 1 }), 'win');
      }, winDelay);
    } else if (lastRow) {
      eng.gameOver = true;
      stopTimer();
      updateHintButton();
      const stats = updateStats(false);
      if (eng.tournament) updateTournamentStats(false);
      submitting = false;
      if (eng.daily) saveDaily({ date: todayStr(), done: true, won: false, guesses: eng.history.map((_, i) => getGuessText(i)), history: eng.history });
      setTimeout(() => {
        const settings = loadSettings();
        activeStatsTheme = settings.theme || 'all';
        renderStats(stats);
        setModal(t('answer_was'), 'lose', eng.answer);
      }, postReveal);
    } else {
      eng.currentRow++;
      eng.currentInput = '';
      updateGuessCounter();
      submitting = false;
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
    // Recomputed on every Tab, not cached: the stats tablist uses a roving tabindex,
    // so which elements are tabbable changes while the modal is open. Elements with
    // tabindex="-1" must be excluded or they become bogus trap boundaries.
    function tabbables() {
      return Array.from(modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]'
      )).filter(el => el.tabIndex >= 0 && !el.disabled && !el.hidden);
    }

    const initial = tabbables();
    if (initial.length === 0) return;

    function handler(e) {
      if (e.key !== 'Tab') return;

      const focusable = tabbables();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

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
    initial[0].focus();

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
    const settings = loadSettings();
    const THEME_EMOJI = { animals: '🐾', countries: '🌍', food: '🍽️', sports: '⚽', science: '🔬', nature: '🌿' };
    let themeLine = '';
    if (settings.theme && settings.theme !== 'all') {
      const emoji = THEME_EMOJI[settings.theme] || '';
      themeLine = ` ${emoji} ${t('theme_' + settings.theme)}`;
    }
    return `WordGuess ${score}/${maxG}${themeLine}\n\n${grid}\n\nPlay: ${SHARE_URL}`;
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

  function shareChallenge() {
    if (!eng.answer) return;
    const settings = loadSettings();
    const link = generateChallengeLink(eng.answer, settings.theme, COLS);
    const text = `${t('challenge_challenge')}\n\n${link}`;
    copyToClipboard(text)
      .then(() => toast(t('copied')))
      .catch(() => toast(t('copied')));
  }

  function shareTournament() {
    const text = buildTournamentShareText();
    copyToClipboard(text)
      .then(() => toast(t('copied')))
      .catch(() => toast(t('copied')));
  }

  document.addEventListener('click', e => {
    if (e.target.closest('[data-modal-share]')) shareResult();
    if (e.target.closest('[data-challenge-share]')) shareChallenge();
    if (e.target.closest('[data-tournament-share]')) shareTournament();
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
      activeStatsTheme = 'all';
      renderStats(loadStats());
      renderAchievements();
      overlay.hidden = false;
      trapFocus(overlay);
    }
    if (e.target.closest('[data-stats-close]')) {
      overlay.hidden = true;
      if (statsOpener) { statsOpener.focus(); statsOpener = null; }
    }
    // Stats theme tab switching
    const themeBtn = e.target.closest('[data-stats-theme]');
    if (themeBtn && !overlay.hidden) {
      activeStatsTheme = themeBtn.dataset.statsTheme;
      renderStats(loadStats());
    }
  });

  // Stats tablist keyboard navigation (WAI-ARIA tabs pattern, automatic activation)
  document.addEventListener('keydown', e => {
    const tab = e.target.closest('[data-stats-theme]');
    if (!tab) return;
    const tablist = tab.closest('[data-stats-tablist]');
    if (!tablist) return;

    const tabs = Array.from(tablist.querySelectorAll('[data-stats-theme]'));
    const i = tabs.indexOf(tab);
    let next = -1;

    if (e.key === 'ArrowRight')     next = (i + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home')      next = 0;
    else if (e.key === 'End')       next = tabs.length - 1;
    else return;

    e.preventDefault();
    activeStatsTheme = tabs[next].dataset.statsTheme;
    renderStats(loadStats());
    tabs[next].focus();
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
      if (eng.daily || eng.tournament) {
        showScreen('menu');
      } else {
        initGame();
      }
    }
  });

}());
