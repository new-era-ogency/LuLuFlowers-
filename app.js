/**
 * Lulu Flower Boutique — visual catalog & editorial content (showcase only).
 *
 * Privacy Compliance: This site does not collect or store any user data.
 * All content is for informational purposes. No localStorage or cookies.
 * Motion uses CSS transforms/transitions and the Intersection Observer API only.
 */

/** @typedef {'en' | 'bg' | 'ua'} Lang */
/** @typedef {'mono' | 'author' | 'wedding'} CategoryId */

/**
 * @typedef {{
 *   id: string;
 *   category: CategoryId;
 *   titleKey: string;
 *   image: string;
 *   altKey: string;
 *   priceFrom: number;
 *   descriptionKey: string;
 * }} CatalogItem
 */

/**
 * @typedef {{ id: string; textKey: string; nameKey: string; rating: number }} ReviewItem
 */

/** @type {Record<Lang, Record<string, string>>} */
const DICTIONARY = {
  en: {
    doc_title: "Lulu Flower Boutique | Visual catalog",
    meta_desc:
      "Mono-bouquets, author mixes, and wedding decor — Lulu Flower Boutique. Prices and atelier philosophy.",
    lang_group_label: "Language",

    logo_sub: "Flower Boutique",
    nav_about: "About us",
    nav_catalog: "Catalog",
    nav_reviews: "Reviews",
    nav_contacts: "Contacts",

    hero_tagline: "The Art of Gifting Emotions",
    hero_sub: "Sofia · Editorial florals",
    hero_alt: "Premium editorial bouquet — blush tones and silk ribbon",

    about_kicker: "Atelier Philosophy",
    about_heading: "Floristry as a quiet art form",
    about_p1:
      "Lulu Flower Boutique treats stems, silence, and symmetry with the same reverence a gallery gives canvas and light.",
    about_p2:
      "We design for bespoke emotions rather than impulse — tonal restraint, tactile ribbon, gestures that linger after delivery.",
    about_p3: "Everything leaving the bench is authored, calibrated, and never algorithmic.",

    catalog_title: "The collection",
    catalog_intro: "Three lines of work — transparent pricing anchors each piece.",

    price_line: "from €{{amount}}",

    cat_mono: "Mono-bouquets",
    cat_author: "Author mixes",
    cat_wedding: "Wedding decor",

    btn_instagram: "View on Instagram",

    prod_mono_1: "Blush Monolith",
    prod_mono_2: "Ivory Cloud",
    prod_mono_3: "Dust Lilac Column",
    prod_auth_1: "Atelier Edith",
    prod_auth_2: "Velvet Ribbon Study",
    prod_auth_3: "Clair de Lune Mix",
    prod_wed_1: "Ceremony Urn",
    prod_wed_2: "Aisle Pew Markers",
    prod_wed_3: "Head Table Garland",

    desc_mono_1: "A single-tone column of heirloom roses tied with silk organza.",
    desc_mono_2: "Elevated ivory garden roses in a matte tonal sleeve.",
    desc_mono_3: "Slim vertical mono study in softened lilac pastels.",

    desc_auth_1: "Architectural layering of seasonal stems — ribbon chosen to match stationery.",
    desc_auth_2: "Muted blush anchored by grey-green foliage and velvet wrap.",
    desc_auth_3: "Moonlit pastel spectrum with tactile stem-on-stem pacing.",

    desc_wed_1: "Statement urn vignette calibrated for vows and veil movement.",
    desc_wed_2: "Pew choreography with tonal ribbon echoing aisle runners.",
    desc_wed_3: "Low garden garland bridging dinnerware — peony-forward pacing.",

    alt_mono_1: "Hand-tied mono bouquet in blush roses",
    alt_mono_2: "Tall ivory rose composition in matte wrap",
    alt_mono_3: "Slim vertical bouquet in lilac pastel",
    alt_auth_1: "Editorial mixed stems with silk ribbon detail",
    alt_auth_2: "Garden roses layered with tonal foliage",
    alt_auth_3: "Pastel lilac bouquet with silver-green accents",
    alt_wed_1: "Statement urn arrangement for ceremony backdrop",
    alt_wed_2: "Pew-end floral bundles along chapel aisle",
    alt_wed_3: "Low garland weaving peonies for head table",

    reviews_title: "Client letters",
    reviews_subword: "Handwritten admiration from guests who entrusted Lulu with the gesture.",

    rating_label: "{{n}} stars out of five",
    verified_badge: "Verified purchase",

    rev_1_name: "Elena V.",
    rev_2_name: "Dimitar K.",
    rev_3_name: "Mira & Alex",
    rev_4_name: "Jordan M.",

    rev_1_body:
      "Ribbon matched our invitation stock — courier arrived before the luncheon course; the blush never bruised.",
    rev_2_body:
      "Quarterly corporate gifting simplified: invoices read as calm as their bouquets look on camera.",
    rev_3_body: "Guests still ask which Milan atelier flew in — it was Sofia, quietly.",
    rev_4_body: "Pale palette without mourning clichés — your team paced the room like stagehands.",

    footer_title: "Connect",
    footer_sub: "Follow the work — showcase only; no inquiries captured here.",
    link_instagram: "Instagram",
    link_whatsapp: "WhatsApp",
    link_telegram: "Telegram",
    footer_handle: "@lulu.flower.boutique",
  },

  bg: {
    doc_title: "„Lulu Flower Boutique“ | Визуален каталог",
    meta_desc:
      "Моно-букети, авторски миксове и сватбен декор — Lulu Flower Boutique. Цени и философия на ателието.",
    lang_group_label: "Език",

    logo_sub: "Цветен бутик",
    nav_about: "За нас",
    nav_catalog: "Каталог",
    nav_reviews: "Отзиви",
    nav_contacts: "Контакти",

    hero_tagline: "Изкуството да даряваш емоции",
    hero_sub: "София · Редакционни цветни композиции",
    hero_alt: "Луксозен букет в нежни тонове с панделка",

    about_kicker: "Философия на ателието",
    about_heading: "Флористиката като тиха изкуствена форма",
    about_p1:
      "Lulu Flower Boutique отнася се към стъблата, тишината и симетрията със същото внимание, с което галерията гледа на платно и светлина.",
    about_p2:
      "Проектираме за емоции по поръчка, не за импулс — тонална сдържаност, тактилна панделка, жестове, които остават след доставката.",
    about_p3: "Всичко, което напуска работната маса, е авторско, калибрирано и никога шаблонно.",

    catalog_title: "Колекцията",
    catalog_intro: "Три линии работа — ясна ценова рамка за всяка композиция.",

    price_line: "от {{amount}} €",

    cat_mono: "Моно-букети",
    cat_author: "Авторски миксове",
    cat_wedding: "Сватбен декор",

    btn_instagram: "Виж в Instagram",

    prod_mono_1: "Нежен монолит",
    prod_mono_2: "Слонова облачност",
    prod_mono_3: "Лилав столб",
    prod_auth_1: "Ателие Edith",
    prod_auth_2: "Велурена панделка",
    prod_auth_3: "Лунен микс",
    prod_wed_1: "Урна за церемония",
    prod_wed_2: "Маркери за среден път",
    prod_wed_3: "Гирлянд за главна маса",

    desc_mono_1: "Еднотонна колона от наследствени рози с органза панделка.",
    desc_mono_2: "Високи слонови градински рози в матов тонален плик.",
    desc_mono_3: "Вертикално моно изследване в омекчени лилави пастели.",

    desc_auth_1: "Архитектурно подреждане на сезонни стъбла — панделка в тон с поканите.",
    desc_auth_2: "Заглушен руж, фиксиран със сиво-зелено и велур.",
    desc_auth_3: "Пастелен „лунен“ спектър с тактилен ритъм стъбло върху стъбло.",

    desc_wed_1: "Изразителна урна за обред — калибрирана спрямо обет и воал.",
    desc_wed_2: "Пътека по пейките с панделка в ритъм с пистата.",
    desc_wed_3: "Нисък градински гирлянд с фокус върху божури за масата на домакините.",

    alt_mono_1: "Моно букет с нежни рози в руж",
    alt_mono_2: "Вертикална композиция със слонови рози",
    alt_mono_3: "С висок лилав минимализъм",
    alt_auth_1: "Смесени авторски стъбла и панделка",
    alt_auth_2: "Градински рози и тоново зелено",
    alt_auth_3: "Лилав минимализъм със зелени акценти",
    alt_wed_1: "Изразителна урна за верница",
    alt_wed_2: "Цветни пакетчета по пътеката към олтаря",
    alt_wed_3: "Гирлянд за масата на домакините",

    reviews_title: "Писма от клиенти",
    reviews_subword: "Ръкописна благодарност от гости, поверили жеста на Lulu.",

    rating_label: "{{n}} от пет звезди",
    verified_badge: "Потвърдена поръчка",

    rev_1_name: "Елена В.",
    rev_2_name: "Димитър К.",
    rev_3_name: "Мира и Алекс",
    rev_4_name: "Йордан М.",

    rev_1_body:
      "Панделката съвпадна с хартията на поканите — куриерът преди обяда; ружът остана без петна.",
    rev_2_body:
      "Корпоративно подаряване на тримесечие — фактурите са толкова спокойни, колкото букетите на камера.",
    rev_3_body: "Гостите още питат кое миланско ателие е „докарало“ — това беше София, тихо.",
    rev_4_body: "Светла палитра без клишета за траур — екипът движеше залата като сценични работници.",

    footer_title: "Връзка",
    footer_sub: "Следете процеса — само витрина; без заявки тук.",
    link_instagram: "Instagram",
    link_whatsapp: "WhatsApp",
    link_telegram: "Telegram",
    footer_handle: "@lulu.flower.boutique",
  },

  ua: {
    doc_title: "Lulu Flower Boutique | Візуальний каталог",
    meta_desc:
      "Моно-букети, авторські мікси та весільний декор — Lulu Flower Boutique. Ціни та філософія ательє.",
    lang_group_label: "Мова",

    logo_sub: "Квітковий бутик",
    nav_about: "Про нас",
    nav_catalog: "Каталог",
    nav_reviews: "Відгуки",
    nav_contacts: "Контакти",

    hero_tagline: "Мистецтво дарувати емоції",
    hero_sub: "Софія · Редакційні флоральні композиції",
    hero_alt: "Преміум букет у пастельних тонах із стрічкою — Lulu Flower Boutique",

    about_kicker: "Філософія ательє",
    about_heading: "Флористика як тиха форма мистецтва",
    about_p1:
      "Lulu Flower Boutique ставиться до стебел, тиші та симетрії з тим самим шанобливим спокоєм, з яким галерея ставиться до полотна й світла.",
    about_p2:
      "Ми проектуємо під емоції на замовлення, а не під імпульс — тональна стриманість, тактильна стрічка, жести, що лишаються після доставки.",
    about_p3: "Усе, що залишає лаву, — авторське, відкаліброване й ніколи шаблонне.",

    catalog_title: "Колекція",
    catalog_intro: "Три лінії роботи — прозоре ціноутворення для кожної композиції.",

    price_line: "Ціна від {{amount}} €",

    cat_mono: "Моно-букети",
    cat_author: "Авторські мікси",
    cat_wedding: "Весільний декор",

    btn_instagram: "Дивитись в Instagram",

    prod_mono_1: "Рожевий моноліт",
    prod_mono_2: "Слонова хмаринка",
    prod_mono_3: "Ліловий стовп",
    prod_auth_1: "Ательє Edith",
    prod_auth_2: "Велюрова стрічка",
    prod_auth_3: "Мікс Clare de Lune",
    prod_wed_1: "Ваза для церемонії",
    prod_wed_2: "Квіткові маркери на проході",
    prod_wed_3: "Гірлянда для президіуму",

    desc_mono_1: "Однотонна колона спадкових троянд, перев’язана шовковою органзою.",
    desc_mono_2: "Піднесені слонові садові троянди в матовому тональному рукаві.",
    desc_mono_3: "Витончений вертикальний моно-етюд у пом’якшених лілових пастелях.",

    desc_auth_1: "Архітектурне нашарування сезонних стебел — стрічка підібрана під запрошення.",
    desc_auth_2: "Приглушений рожевий на сіро-зеленому фоні та у велюровій обгортці.",
    desc_auth_3: "Пастельний місячний спектр із тактильним ритмом стебло до стебла.",

    desc_wed_1: "Виразна урнова виньєтка, відкалібрована під обітницю та рух фати.",
    desc_wed_2: "Оркестровка на лавах із тональною стрічкою в ритмі проходу.",
    desc_wed_3: "Низька садова гірлянда до сервіровки — акцент на півоніях.",

    alt_mono_1: "Моно-букет із рожевих троянд",
    alt_mono_2: "Висока композиція зі слонових троянд у матовій обгортці",
    alt_mono_3: "Вузький вертикальний букет у ліловій пастелі",
    alt_auth_1: "Редакційний мікс стебел із шовковою стрічкою",
    alt_auth_2: "Садові троянди з тональним листям",
    alt_auth_3: "Пастельно-ліловий букет із срібно-зеленими акцентами",
    alt_wed_1: "Виразна урна для фону церемонії",
    alt_wed_2: "Квіткові зв’язки на лавах каплиці",
    alt_wed_3: "Низька гірлянда з півоніями для президіуму",

    reviews_title: "Листи клієнтів",
    reviews_subword: "Рукописна вдячність від гостей, які довірили жест Lulu.",

    rating_label: "{{n}} зірок із п’яти",
    verified_badge: "Підтверджене замовлення",

    rev_1_name: "Олена В.",
    rev_2_name: "Дмитро К.",
    rev_3_name: "Міра та Олекс",
    rev_4_name: "Йордан М.",

    rev_1_body:
      "Стрічка збіглася з папером запрошень — кур’єр до обіду; рожевий жодної плями.",
    rev_2_body:
      "Квартальні корпоративні подарунки стали простішими: рахунки такі ж спокійні, як букети в кадрі.",
    rev_3_body: "Гості досі питають, з якого міланського ательє прилетіло — це була тиха Софія.",
    rev_4_body:
      "Світла палітра без траурних кліше — ваша команда рухалася залом, як сценічні працівники.",

    footer_title: "Зв’язок",
    footer_sub: "Слідкуйте за роботою — лише вітрина; без збору заявок тут.",
    link_instagram: "Instagram",
    link_whatsapp: "WhatsApp",
    link_telegram: "Telegram",
    footer_handle: "@lulu.flower.boutique",
  },
};

const INSTAGRAM_URL = "https://www.instagram.com/lulu.flower.boutique/";

/** @type {CatalogItem[]} */
const CATALOG = [
  {
    id: "mono-1",
    category: "mono",
    titleKey: "prod_mono_1",
    altKey: "alt_mono_1",
    descriptionKey: "desc_mono_1",
    priceFrom: 85,
    image:
      "https://images.unsplash.com/photo-1518895949257-7621c3cc7863?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "mono-2",
    category: "mono",
    titleKey: "prod_mono_2",
    altKey: "alt_mono_2",
    descriptionKey: "desc_mono_2",
    priceFrom: 92,
    image:
      "https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "mono-3",
    category: "mono",
    titleKey: "prod_mono_3",
    altKey: "alt_mono_3",
    descriptionKey: "desc_mono_3",
    priceFrom: 98,
    image:
      "https://images.unsplash.com/photo-1606800052052-a008424f005d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "author-1",
    category: "author",
    titleKey: "prod_auth_1",
    altKey: "alt_auth_1",
    descriptionKey: "desc_auth_1",
    priceFrom: 118,
    image:
      "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "author-2",
    category: "author",
    titleKey: "prod_auth_2",
    altKey: "alt_auth_2",
    descriptionKey: "desc_auth_2",
    priceFrom: 132,
    image:
      "https://images.unsplash.com/photo-1520763185298-88b09729bef9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "author-3",
    category: "author",
    titleKey: "prod_auth_3",
    altKey: "alt_auth_3",
    descriptionKey: "desc_auth_3",
    priceFrom: 148,
    image:
      "https://images.unsplash.com/photo-1518709268805-7e549936bccd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "wed-1",
    category: "wedding",
    titleKey: "prod_wed_1",
    altKey: "alt_wed_1",
    descriptionKey: "desc_wed_1",
    priceFrom: 540,
    image:
      "https://images.unsplash.com/photo-1519225420380-c29a6d4c6c3c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "wed-2",
    category: "wedding",
    titleKey: "prod_wed_2",
    altKey: "alt_wed_2",
    descriptionKey: "desc_wed_2",
    priceFrom: 210,
    image:
      "https://images.unsplash.com/photo-1464366400600-716238677860?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "wed-3",
    category: "wedding",
    titleKey: "prod_wed_3",
    altKey: "alt_wed_3",
    descriptionKey: "desc_wed_3",
    priceFrom: 320,
    image:
      "https://images.unsplash.com/photo-1520854221050-0f463730265d?auto=format&fit=crop&w=800&q=80",
  },
];

/** @type {ReviewItem[]} */
const REVIEWS = [
  { id: "r1", nameKey: "rev_1_name", textKey: "rev_1_body", rating: 5 },
  { id: "r2", nameKey: "rev_2_name", textKey: "rev_2_body", rating: 5 },
  { id: "r3", nameKey: "rev_3_name", textKey: "rev_3_body", rating: 5 },
  { id: "r4", nameKey: "rev_4_name", textKey: "rev_4_body", rating: 5 },
];

const PLACEHOLDER_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 10'%3E%3Crect fill='%23F5E6E0' width='8' height='10'/%3E%3C/svg%3E";

/** @type {Lang} */
let currentLang = "en";

/** @type {IntersectionObserver | null} */
let revealObserver = null;

function prefersReducedMotion() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

function replayHeroHeading() {
  const h1 = document.getElementById("hero-tagline");
  const sub = document.querySelector(".hero__sub-motion");
  if (!h1) return;
  if (prefersReducedMotion()) {
    h1.classList.remove("hero-tagline--playing");
    sub?.classList.remove("hero__sub--playing");
    return;
  }
  h1.classList.remove("hero-tagline--playing");
  void h1.offsetWidth;
  h1.classList.add("hero-tagline--playing");
  if (sub) {
    sub.classList.remove("hero__sub--playing");
    void sub.offsetWidth;
    sub.classList.add("hero__sub--playing");
  }
}

function bindScrollReveals() {
  if (revealObserver) {
    revealObserver.disconnect();
    revealObserver = null;
  }

  const pending = document.querySelectorAll(".js-reveal:not(.is-revealed)");
  if (!pending.length) return;

  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    pending.forEach((node) => node.classList.add("is-revealed"));
    return;
  }

  revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        obs.unobserve(entry.target);
      });
    },
    { root: null, rootMargin: "0px 0px -7% 0px", threshold: 0.06 }
  );

  pending.forEach((node) => revealObserver?.observe(node));
}

/**
 * Soft cross-fade during language swaps (showcase-only; nothing stored client-side).
 * @param {() => void} updateFn
 */
function runWithLangFade(updateFn) {
  const layer = document.getElementById("page-motion");
  if (!layer || prefersReducedMotion()) {
    updateFn();
    replayHeroHeading();
    bindScrollReveals();
    return;
  }
  layer.classList.add("is-lang-dim");
  window.setTimeout(() => {
    updateFn();
    layer.classList.remove("is-lang-dim");
    replayHeroHeading();
    bindScrollReveals();
  }, 260);
}

/**
 * @param {string} template
 * @param {Record<string, string | number>} vars
 */
function interpolate(template, vars) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => String(vars[key] ?? ""));
}

/** @param {string} key */
function t(key) {
  const row = DICTIONARY[currentLang];
  return row[key] ?? DICTIONARY.en[key] ?? key;
}

/** @param {number} amount */
function formatPriceLine(amount) {
  return interpolate(t("price_line"), { amount: String(amount) });
}

/** @param {number} n */
function starString(n) {
  return "★".repeat(Math.max(0, Math.min(5, Math.round(n))));
}

function applyI18n() {
  const docLang = currentLang === "bg" ? "bg" : currentLang === "ua" ? "uk" : "en";
  document.documentElement.lang = docLang;

  const titleEl = document.querySelector("title");
  if (titleEl) titleEl.textContent = t("doc_title");

  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", t("meta_desc"));

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key) el.textContent = t(key);
  });

  const langGroup = document.querySelector("[data-i18n-aria]");
  if (langGroup) {
    const key = langGroup.getAttribute("data-i18n-aria");
    if (key) langGroup.setAttribute("aria-label", t(key));
  }

  document.querySelectorAll("[data-lang]").forEach((btn) => {
    if (!(btn instanceof HTMLButtonElement)) return;
    btn.setAttribute("aria-pressed", btn.getAttribute("data-lang") === currentLang ? "true" : "false");
  });

  const heroImg = document.getElementById("hero-image");
  if (heroImg instanceof HTMLImageElement) {
    heroImg.alt = t("hero_alt");
  }
}

function refreshCatalogCardCopy() {
  document.querySelectorAll(".product-card__title[data-title-key]").forEach((el) => {
    const key = el.getAttribute("data-title-key");
    if (key) el.textContent = t(key);
  });
  document.querySelectorAll(".product-card__desc[data-desc-key]").forEach((el) => {
    const key = el.getAttribute("data-desc-key");
    if (key) el.textContent = t(key);
  });
  document.querySelectorAll(".product-card__price-tag[data-price-amount]").forEach((el) => {
    const raw = el.getAttribute("data-price-amount");
    const amt = raw ? Number(raw) : Number.NaN;
    if (!Number.isNaN(amt)) el.textContent = formatPriceLine(amt);
  });
  document.querySelectorAll(".btn-instagram[data-i18n-label]").forEach((el) => {
    el.textContent = t("btn_instagram");
  });
  refreshLazyImageAlts();
}

function refreshLazyImageAlts() {
  document.querySelectorAll(".product-card img[data-alt-key]").forEach((node) => {
    if (!(node instanceof HTMLImageElement)) return;
    const key = node.getAttribute("data-alt-key");
    if (key) node.alt = t(key);
  });
}

function observeLazyImages(root) {
  const imgs = /** @type {NodeListOf<HTMLImageElement>} */ (root.querySelectorAll("img[data-src]"));
  if (!imgs.length) return;

  if (!("IntersectionObserver" in window)) {
    imgs.forEach((img) => {
      const ds = img.dataset.src;
      if (ds) {
        img.src = ds;
        img.classList.add("is-loaded");
      }
    });
    return;
  }

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const img = /** @type {HTMLImageElement} */ (entry.target);
        const src = img.dataset.src;
        if (!src) {
          obs.unobserve(img);
          return;
        }
        img.removeAttribute("data-src");
        const markLoaded = () => img.classList.add("is-loaded");
        img.onload = markLoaded;
        img.onerror = markLoaded;
        img.src = src;
        if (img.complete && img.naturalHeight > 0) markLoaded();
        obs.unobserve(img);
      });
    },
    { root: null, rootMargin: "120px", threshold: 0.02 }
  );

  imgs.forEach((img) => io.observe(img));
}

/** @param {CategoryId} category */
function gridForCategory(category) {
  const el = document.querySelector(`[data-category-grid="${category}"]`);
  return el instanceof HTMLElement ? el : null;
}

function renderCatalog() {
  const byCat = /** @type {Record<CategoryId, CatalogItem[]>} */ ({
    mono: [],
    author: [],
    wedding: [],
  });

  CATALOG.forEach((item) => {
    byCat[item.category].push(item);
  });

  /** @type {CategoryId[]} */
  const keys = ["mono", "author", "wedding"];
  let globalCardStagger = 0;
  keys.forEach((cat) => {
    const mount = gridForCategory(cat);
    if (!mount) return;
    mount.replaceChildren();

    byCat[cat].forEach((item) => {
      const article = document.createElement("article");
      article.className = "product-card js-reveal";
      article.style.setProperty("--stagger", String(globalCardStagger));
      globalCardStagger += 1;

      const media = document.createElement("div");
      media.className = "product-card__media";

      const photo = document.createElement("div");
      photo.className = "product-card__photo";

      const img = document.createElement("img");
      img.src = PLACEHOLDER_IMG;
      img.dataset.src = item.image;
      img.setAttribute("data-alt-key", item.altKey);
      img.alt = t(item.altKey);
      img.width = 800;
      img.height = 1000;
      img.decoding = "async";

      photo.appendChild(img);

      const priceRow = document.createElement("div");
      priceRow.className = "product-card__price-row";

      const priceTag = document.createElement("p");
      priceTag.className = "product-card__price-tag";
      priceTag.setAttribute("data-price-amount", String(item.priceFrom));
      priceTag.textContent = formatPriceLine(item.priceFrom);

      priceRow.appendChild(priceTag);

      media.appendChild(photo);
      media.appendChild(priceRow);

      const body = document.createElement("div");
      body.className = "product-card__body";

      const h = document.createElement("h4");
      h.className = "product-card__title";
      h.setAttribute("data-title-key", item.titleKey);
      h.textContent = t(item.titleKey);

      const desc = document.createElement("p");
      desc.className = "product-card__desc";
      desc.setAttribute("data-desc-key", item.descriptionKey);
      desc.textContent = t(item.descriptionKey);

      const a = document.createElement("a");
      a.href = INSTAGRAM_URL;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.className = "btn-instagram";
      a.setAttribute("data-i18n-label", "btn_instagram");
      a.textContent = t("btn_instagram");

      body.appendChild(h);
      body.appendChild(desc);
      body.appendChild(a);
      article.appendChild(media);
      article.appendChild(body);
      mount.appendChild(article);
    });
  });

  const catalogRoot = document.getElementById("catalog");
  if (catalogRoot instanceof HTMLElement) observeLazyImages(catalogRoot);
}

function renderAbout() {
  const root = document.getElementById("about-root");
  if (!root) return;
  root.replaceChildren();
  root.className = "about__inner js-reveal";
  root.style.setProperty("--stagger", "0");

  const kicker = document.createElement("p");
  kicker.className = "about__kicker";
  kicker.textContent = t("about_kicker");

  const h2 = document.createElement("h2");
  h2.className = "about__heading";
  h2.id = "about-heading-root";
  h2.textContent = t("about_heading");

  const prose = document.createElement("div");
  prose.className = "about__prose";
  ["about_p1", "about_p2", "about_p3"].forEach((key) => {
    const p = document.createElement("p");
    p.textContent = t(key);
    prose.appendChild(p);
  });

  root.appendChild(kicker);
  root.appendChild(h2);
  root.appendChild(prose);
}

function renderReviews() {
  const headMount = document.getElementById("reviews-root-heading");
  const listMount = document.getElementById("reviews-root");
  if (!headMount || !listMount) return;

  headMount.replaceChildren();
  const h2 = document.createElement("h2");
  h2.id = "reviews-heading-root";
  h2.textContent = t("reviews_title");
  const sub = document.createElement("p");
  sub.textContent = t("reviews_subword");
  headMount.appendChild(h2);
  headMount.appendChild(sub);

  listMount.replaceChildren();
  REVIEWS.forEach((rev, idx) => {
    const article = document.createElement("article");
    article.className = "review-card js-reveal";
    article.style.setProperty("--stagger", String(idx));
    article.setAttribute("role", "listitem");

    const meta = document.createElement("div");
    meta.className = "review-card__meta";

    const starsWrap = document.createElement("div");
    starsWrap.className = "review-card__stars";
    const sr = document.createElement("span");
    sr.className = "sr-only-rating";
    sr.textContent = interpolate(t("rating_label"), { n: String(rev.rating) });
    const stars = document.createElement("span");
    stars.setAttribute("aria-hidden", "true");
    stars.textContent = starString(rev.rating);
    starsWrap.appendChild(sr);
    starsWrap.appendChild(stars);

    const badge = document.createElement("span");
    badge.className = "review-card__verified";
    badge.textContent = t("verified_badge");

    meta.appendChild(starsWrap);
    meta.appendChild(badge);

    const q = document.createElement("blockquote");
    q.textContent = t(rev.textKey);

    const cite = document.createElement("cite");
    cite.textContent = t(rev.nameKey);

    article.appendChild(meta);
    article.appendChild(q);
    article.appendChild(cite);
    listMount.appendChild(article);
  });
}

function refreshAllDynamicContent() {
  renderAbout();
  renderCatalog();
  renderReviews();
  refreshCatalogCardCopy();
}

function wireLangSwitch() {
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      if (lang !== "en" && lang !== "bg" && lang !== "ua") return;
      if (lang === currentLang) return;
      currentLang = lang;
      runWithLangFade(() => {
        applyI18n();
        refreshAllDynamicContent();
      });
    });
  });
}

function wireSmoothScroll() {
  document.querySelectorAll("[data-smooth-scroll]").forEach((el) => {
    el.addEventListener("click", (e) => {
      const sel = el.getAttribute("data-smooth-scroll");
      if (!sel) return;
      const target = document.querySelector(sel);
      if (!(target instanceof HTMLElement)) return;
      e.preventDefault();

      const header = document.querySelector(".site-header");
      const offset = (header?.getBoundingClientRect().height ?? 0) + 12;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: Math.max(0, top),
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    });
  });
}

wireLangSwitch();
wireSmoothScroll();
applyI18n();
refreshAllDynamicContent();
replayHeroHeading();
bindScrollReveals();
