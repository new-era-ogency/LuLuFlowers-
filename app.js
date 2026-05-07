/**
 * Lulu Flower Boutique — checkout state machine with localStorage persistence
 * and navigation guards (rehydrate to last valid step on refresh).
 */

const STORAGE_KEY = "lulu-flower-boutique-checkout-v1";
const LANG_STORAGE_KEY = "lulu-flower-boutique-lang-v1";

/** @typedef {'en' | 'ua' | 'bg'} AppLang */

/** @type {Record<AppLang, Record<string, string>>} */
const I18N = {
  en: {
    doc_title: "Lulu Flower Boutique",
    meta_desc:
      "Lulu Flower Boutique — premium floral arrangements, multilingual checkout with surprise-friendly delivery previews.",
    brand_tagline: "Flower Boutique",
    nav_shop: "Shop",
    nav_checkout: "Checkout",
    hero_title: "Arrangements crafted for fleeting moments.",
    hero_sub:
      "Mobile-first luxury florals — soft palettes, tactile finishes, and a checkout that survives refresh.",
    hero_cta: "Explore the catalogue",
    catalog_title: "Seasonal arrangements",
    catalog_intro: "Refine bouquets by blossom type and palette. Filters update instantly with no reloads.",
    catalog_add: "Add",
    catalog_show_single: "Showing {{n}} arrangement",
    catalog_show_multi: "Showing {{n}} arrangements",
    filter_flower_type: "Flower type",
    filter_color_palette: "Colour palette",
    filter_all: "All",
    filter_roses: "Roses",
    filter_peonies: "Peonies",
    filter_nude: "Nude",
    filter_pastel: "Pastel",
    checkout_title: "Checkout",
    checkout_sub:
      "Checkout snapshots sync to localStorage; navigation guards reopen the freshest valid milestone without wiping data.",
    step_idle: "Start",
    step_cart: "Cart",
    step_recipient: "Recipient",
    step_delivery: "Delivery",
    step_payment: "Pay",
    idle_heading: "Start your order",
    idle_hint_plain: "Add bouquets from the",
    idle_hint_link: "catalogue",
    idle_hint_suffix: ",",
    idle_hint_order: "continue here.",
    idle_hint_fallback: "Need a turnkey studio bundle?",
    idle_hint_fallback2: " Tap",
    idle_hint_fallback3: ".",
    idle_hint_fallback_strong: "Order",
    btn_order: "Order",
    cart_heading: "Your selection",
    btn_continue: "Continue",
    btn_back: "Back",
    recipient_heading: "Recipient & message",
    surprise_label: "Surprise delivery",
    surprise_hint: "Hide the sender name on the stationery until arrival.",
    sender_label: "Sender name",
    sender_ph: "Alex Morgan",
    recipient_name_label: "Recipient name",
    recipient_name_ph: "Jordan Lee",
    recipient_phone_label: "Phone",
    recipient_phone_ph: "+359 …",
    gift_msg_label: "Gift message (optional)",
    gift_msg_ph: "Thinking of you",
    btn_continue_delivery: "Continue to delivery",
    delivery_heading: "Delivery schedule",
    delivery_intro: "Reserve courier capacity — slots hard-close once they fill.",
    delivery_date_label: "Delivery date",
    delivery_slot_label: "Time slot",
    slot_pick: "Select a slot",
    slot_morning: "Morning · 09:00–12:00",
    slot_afternoon: "Afternoon · 12:00–17:00",
    slot_evening: "Evening · 17:00–21:00",
    btn_continue_payment: "Continue to payment",
    payment_heading: "Payment",
    payment_intro:
      "Express rails mirror Apple Pay / Google Pay UX; Stripe would vault cards separately in production.",
    btn_pay_wallet: "Pay with Stripe / Apple Pay",
    btn_pay_card_demo: "Pay with card (demo)",
    wallet_processing: "Processing…",
    thank_title: "Thank you",
    thank_body: "This preview persists on-device only until live gateways are flipped on.",
    thank_surprise: "Surprise shipping keeps the sender private on the stationery.",
    thank_sender_visible: "We will surface the sender as",
    thank_sender_hidden: "Sender identity stays hidden until the bouquet arrives.",
    btn_new_order: "New order",
    status_machine: "Machine state",
    status_persist: "· persisted locally",
    err_cart_empty: "Please add bouquets from the catalogue first.",
    err_recipient: "Recipient name and a reachable phone number are required.",
    err_delivery: "Choose a delivery day plus morning, afternoon, or evening.",
    err_delivery_past: "Past dates cannot be booked.",
    err_generic: "We couldn't advance checkout.",
    err_go_back: "That rewind is not permitted yet.",
    catalog_added: "Added",
  },
  ua: {
    doc_title: "«Lulu Flower Boutique»",
    meta_desc:
      "Lulu Flower Boutique — люксові композиції, сюрприз-доставка та три мовні інтерфейси.",
    brand_tagline: "Квіткова бутик-крамниця",
    nav_shop: "Каталог",
    nav_checkout: "Чекаут",
    hero_title: "Композиції для живих спогадів.",
    hero_sub:
      "Люкс у мобільному форматі — мʼякі палітри, тактильні деталі та чекаут, що зберігається після оновлення сторінки.",
    hero_cta: "Переглянути каталог",
    catalog_title: "Сезонні композиції",
    catalog_intro: "Чіткіший вибір за типом квітів і палітрою без перезавантажень.",
    catalog_add: "Додати",
    catalog_show_single: "Показано {{n}} композицію",
    catalog_show_multi: "Показано {{n}} композиції",
    filter_flower_type: "Тип квітів",
    filter_color_palette: "Палітра",
    filter_all: "Усі",
    filter_roses: "Троянди",
    filter_peonies: "Півонії",
    filter_nude: "Нюдові",
    filter_pastel: "Пастель",
    checkout_title: "Офорлення",
    checkout_sub:
      "Стан синхронізується локально та повертає вас до останньої валідної хвилі без втрат.",
    step_idle: "Почин",
    step_cart: "Кошик",
    step_recipient: "Отримувач",
    step_delivery: "Доставка",
    step_payment: "Оплата",
    idle_heading: "Розпочати замовлення",
    idle_hint_plain: "Додайте букет із",
    idle_hint_link: "каталогу",
    idle_hint_suffix: ",",
    idle_hint_order: " або продовжте тут.",
    idle_hint_fallback: "Чи забронювати авторський мікс?",
    idle_hint_fallback2: " Натисніть",
    idle_hint_fallback3: ".",
    idle_hint_fallback_strong: "Замовити",
    btn_order: "Замовити",
    cart_heading: "Обрані позиції",
    btn_continue: "Далі",
    btn_back: "Назад",
    recipient_heading: "Отримувач та листівка",
    surprise_label: "Сюрприз-доставка",
    surprise_hint: "Імʼя відправника залишається скритим до вручення букета.",
    sender_label: "Імʼя відправника",
    sender_ph: "Олексій Коваленко",
    recipient_name_label: "Імʼя отримувача",
    recipient_name_ph: "Марія Шевченко",
    recipient_phone_label: "Телефон",
    recipient_phone_ph: "+380 …",
    gift_msg_label: "Побажання (необовʼязково)",
    gift_msg_ph: "Я поруч із думками про тебе",
    btn_continue_delivery: "Обрати час доставки",
    delivery_heading: "Розклад доставки",
    delivery_intro: "Кожний слот обмежений — ми підтверджуємо одразу після перевірки курʼєра.",
    delivery_date_label: "Дата доставки",
    delivery_slot_label: "Часовий інтервал",
    slot_pick: "Оберіть інтервал",
    slot_morning: "Ранок · 09:00–12:00",
    slot_afternoon: "День · 12:00–17:00",
    slot_evening: "Вечір · 17:00–21:00",
    btn_continue_payment: "Перейти до оплати",
    payment_heading: "Оплата",
    payment_intro:
      "Експресоплата подібна до Apple Pay / Google Pay, а карту б токенізував Stripe у продакшені.",
    btn_pay_wallet: "Оплатити через Stripe / Apple Pay",
    btn_pay_card_demo: "Демо-оплата карткою",
    wallet_processing: "Обробляємо…",
    thank_title: "Дякуємо",
    thank_body: "Чернетка замовлення збережена лише в цьому браузері.",
    thank_surprise: "Сюрприз-режим приховує відправника на картці.",
    thank_sender_visible: "Відправник буде зазначений як",
    thank_sender_hidden: "Імʼя відправника дочекається моменту доставки.",
    btn_new_order: "Нове замовлення",
    status_machine: "Стан машини",
    status_persist: "· збережено локально",
    err_cart_empty: "Спочатку додайте букети з каталогу.",
    err_recipient: "Потрібні імʼя отримувача та телефон.",
    err_delivery: "Оберіть дату та часовий інтервал.",
    err_delivery_past: "Минуле недоступне для бронювання.",
    err_generic: "Не вдалося перейти далі.",
    err_go_back: "Неможливо повернутися на цей крок.",
    catalog_added: "Додано",
  },
  bg: {
    doc_title: "„Lulu Flower Boutique“",
    meta_desc:
      "Lulu Flower Boutique — луксозни аранжировки, сюрприз доставка и многоезичен чекаут.",
    brand_tagline: "Цветна бутик работилница",
    nav_shop: "Каталог",
    nav_checkout: "Поръчка",
    hero_title: "Аранжировки за чупливи моменти.",
    hero_sub:
      "Лукс в мобилен формат — меки палитри, богати текстури и чекаут, който оцелява при опресняване.",
    hero_cta: "Към каталога",
    catalog_title: "Сезонни аранжировки",
    catalog_intro: "Филтрирайте по вид цвят и палитра без презареждане.",
    catalog_add: "Добави",
    catalog_show_single: "Показваме {{n}} аранжировка",
    catalog_show_multi: "Показваме {{n}} аранжировки",
    filter_flower_type: "Вид цвят",
    filter_color_palette: "Палитра",
    filter_all: "Всички",
    filter_roses: "Рози",
    filter_peonies: "Божури",
    filter_nude: "Nude",
    filter_pastel: "Пастел",
    checkout_title: "Плащане",
    checkout_sub:
      "Състоянието се записва локално, а защитните стъпки връщат към последния валиден етап без загуба.",
    step_idle: "Старт",
    step_cart: "Кошница",
    step_recipient: "Получател",
    step_delivery: "Доставка",
    step_payment: "Плащане",
    idle_heading: "Започнете поръчката",
    idle_hint_plain: "Добавете букет от",
    idle_hint_link: "каталога",
    idle_hint_suffix: ",",
    idle_hint_order: "продължете тук.",
    idle_hint_fallback: "Или заявете студиен микс.",
    idle_hint_fallback2: " Натиснете",
    idle_hint_fallback3: ".",
    idle_hint_fallback_strong: "Поръчай",
    btn_order: "Поръчай",
    cart_heading: "Вашата селекция",
    btn_continue: "Напред",
    btn_back: "Назад",
    recipient_heading: "Получател и послание",
    surprise_label: "Изненадваща доставка",
    surprise_hint: "Скриваме името на подателя върху картичката до доставката.",
    sender_label: "Име на подателя",
    sender_ph: "Алекс Петров",
    recipient_name_label: "Име на получателя",
    recipient_name_ph: "Йордан Димитров",
    recipient_phone_label: "Телефон",
    recipient_phone_ph: "+359 …",
    gift_msg_label: "Послание (по избор)",
    gift_msg_ph: "Мисля за теб",
    btn_continue_delivery: "Към доставката",
    delivery_heading: "График на доставката",
    delivery_intro: "Резервирайте прозорец — капацитетът на куриерите е ограничен.",
    delivery_date_label: "Дата на доставка",
    delivery_slot_label: "Времеви прозорец",
    slot_pick: "Изберете слот",
    slot_morning: "Сутрин · 09:00–12:00",
    slot_afternoon: "Следобед · 12:00–17:00",
    slot_evening: "Вечер · 17:00–21:00",
    btn_continue_payment: "Към плащането",
    payment_heading: "Плащане",
    payment_intro:
      "Експрес плащането наподобява Apple Pay / Google Pay; картите биха минали през Stripe.",
    btn_pay_wallet: "Плати със Stripe / Apple Pay",
    btn_pay_card_demo: "Демо плащане с карта",
    wallet_processing: "Обработка…",
    thank_title: "Благодарим",
    thank_body: "Черновата остава само в този браузър до реални плащания.",
    thank_surprise: "Сюрприз режим скрива подателя до предаването.",
    thank_sender_visible: "Ще отбележим подателя като",
    thank_sender_hidden: "Подателят остава скрит до доставката.",
    btn_new_order: "Нова поръчка",
    status_machine: "Състояние",
    status_persist: "· записано локално",
    err_cart_empty: "Добавете продукти от каталога.",
    err_recipient: "Нужни са име и телефон на получателя.",
    err_delivery: "Изберете дата и часови прозорец.",
    err_delivery_past: "Не приемаме минали дати.",
    err_generic: "Неуспешен преход.",
    err_go_back: "Няма връщане към тази стъпка.",
    catalog_added: "Добавено",
  },
};

/** @type {AppLang} */
let currentLang = loadStoredLang();

function loadStoredLang() {
  try {
    const raw = localStorage.getItem(LANG_STORAGE_KEY);
    if (raw === "ua" || raw === "bg" || raw === "en") return raw;
  } catch {
    /* ignore */
  }
  return "en";
}

function persistLang(lang) {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    /* ignore */
  }
}

/** @param {string} template @param {Record<string, string | number>} vars */
function interpolate(template, vars) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, token) => String(vars[token] ?? ""));
}

/** @param {string} key */
function t(key) {
  const pack = I18N[currentLang] || I18N.en;
  const fallback = I18N.en[key] || key;
  return pack[key] ?? fallback;
}

function refreshIdleHint() {
  const wrap = document.getElementById("panel-idle-hint");
  if (!wrap) return;
  wrap.innerHTML = `
    <span data-i18n-text="idle_hint_plain"></span>&nbsp;<a href="#catalog" data-i18n-text="idle_hint_link"></a><span data-i18n-text="idle_hint_suffix"></span>&nbsp;<span data-i18n-text="idle_hint_order"></span>
    <br /><span data-i18n-text="idle_hint_fallback"></span><span data-i18n-text="idle_hint_fallback2"></span><strong data-i18n-text="idle_hint_fallback_strong"></strong><span data-i18n-text="idle_hint_fallback3"></span>
  `;
  wrap.querySelectorAll("[data-i18n-text]").forEach((node) => {
    const key = node.getAttribute("data-i18n-text");
    if (!key) return;
    if (node.tagName === "A") {
      node.textContent = t(key);
      return;
    }
    node.textContent = t(key);
  });
}

function applyI18n() {
  document.documentElement.lang = currentLang === "ua" ? "uk" : currentLang;

  const docTitle = document.querySelector("title");
  if (docTitle) docTitle.textContent = t("doc_title");

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", t("meta_desc"));

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (!key) return;
    node.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    if (!(node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement)) return;
    const key = node.getAttribute("data-i18n-placeholder");
    if (!key) return;
    node.placeholder = t(key);
  });

  document.querySelectorAll("[data-i18n-step]").forEach((node) => {
    const step = node.getAttribute("data-i18n-step");
    if (!step) return;
    /** @type {Record<string,string>} */
    const map = {
      idle: "step_idle",
      cart: "step_cart",
      recipient: "step_recipient",
      delivery: "step_delivery",
      payment: "step_payment",
    };
    const key = map[step];
    if (key) node.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-slot-opt]").forEach((node) => {
    if (!(node instanceof HTMLOptionElement)) return;
    const slot = node.getAttribute("data-i18n-slot-opt");
    if (!slot) return;
    /** @type {Record<string,string>} */
    const map = {
      placeholder: "slot_pick",
      morning: "slot_morning",
      afternoon: "slot_afternoon",
      evening: "slot_evening",
    };
    const key = map[slot];
    if (key) node.textContent = t(key);
  });

  document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
    if (!(btn instanceof HTMLButtonElement)) return;
    const lang = btn.dataset.langBtn;
    btn.classList.toggle("is-active", lang === currentLang);
    btn.setAttribute("aria-pressed", lang === currentLang ? "true" : "false");
  });

  refreshIdleHint();
  restoreWalletButtonCopy();
}

function restoreWalletButtonCopy() {
  const wallet = /** @type {HTMLButtonElement | null} */ (document.getElementById("btn-pay-wallet"));
  if (wallet && !wallet.disabled) wallet.textContent = t("btn_pay_wallet");
}

function localISODate(d = new Date()) {
  const offset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - offset).toISOString().slice(0, 10);
}

/** @param {string} iso */
function utcMidnightMillis(iso) {
  const parts = iso.split("-").map(Number);
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return Number.NaN;
  const [y, mo, da] = parts;
  return new Date(y, mo - 1, da).getTime();
}

/** @param {string} isoDate */
function isDeliveryDateAllowed(isoDate) {
  if (!isoDate) return false;
  const selected = utcMidnightMillis(isoDate);
  if (Number.isNaN(selected)) return false;
  const today = utcMidnightMillis(localISODate());
  return selected >= today;
}

/** @param {AppLang} lang */
function setLang(lang) {
  if (lang !== "en" && lang !== "ua" && lang !== "bg") return;
  currentLang = lang;
  persistLang(lang);
  applyI18n();
  renderCatalog();
  render();
}

/** @typedef {'IDLE' | 'CART_FILLED' | 'RECIPIENT_INFO_VALIDATED' | 'DELIVERY_SLOT_SELECTED' | 'PAYMENT_PENDING' | 'ORDER_COMPLETED'} CheckoutMachineState */

/** @typedef {{ id: string; label: string; price: number }} CartLine */

/** @type {CheckoutMachineState[]} */
const ORDERED_STATES = [
  "IDLE",
  "CART_FILLED",
  "RECIPIENT_INFO_VALIDATED",
  "DELIVERY_SLOT_SELECTED",
  "PAYMENT_PENDING",
  "ORDER_COMPLETED",
];

/** @typedef {{ id: string, title: string, flowerType: 'roses' | 'peonies', palette: 'nude' | 'pastel', price: number, note: string }} CatalogProduct */

/** @type {CatalogProduct[]} */
const CATALOG = [
  {
    id: "edith",
    title: "Edith",
    flowerType: "roses",
    palette: "nude",
    price: 92,
    note: "Hand-tied garden roses, silk ribbon",
  },
  {
    id: "velvet-ribbon",
    title: "Velvet Ribbon",
    flowerType: "roses",
    palette: "nude",
    price: 98,
    note: "Blush tones, matte wrap",
  },
  {
    id: "amour-blush",
    title: "Amour Blush",
    flowerType: "roses",
    palette: "pastel",
    price: 105,
    note: "Roses layered with dusty lilac foliage",
  },
  {
    id: "clair-de-lune",
    title: "Clair de Lune",
    flowerType: "roses",
    palette: "pastel",
    price: 118,
    note: "Cool pastels — silver-green stems",
  },
  {
    id: "cloud-peony",
    title: "Cloud Peony",
    flowerType: "peonies",
    palette: "nude",
    price: 124,
    note: "Full peony globes, nude tissue",
  },
  {
    id: "silk-moon",
    title: "Silk Moon",
    flowerType: "peonies",
    palette: "nude",
    price: 132,
    note: "Layered whites on wheat paper",
  },
  {
    id: "lila-drift",
    title: "Lila Drift",
    flowerType: "peonies",
    palette: "pastel",
    price: 128,
    note: "Peonies with lavender accents",
  },
  {
    id: "prism-garden",
    title: "Prism Garden",
    flowerType: "peonies",
    palette: "pastel",
    price: 136,
    note: "Pastel field mix, tall vessel",
  },
];

/** @type {{ flowerType: 'all' | 'roses' | 'peonies'; palette: 'all' | 'nude' | 'pastel' }} */
let catalogFilters = { flowerType: "all", palette: "all" };

/** @param {'nude' | 'pastel'} palette */
function catalogVisualGradient(palette) {
  if (palette === "nude") {
    return "linear-gradient(152deg, #fff7f1 0%, #f0ddd2 38%, #e3cdc0 76%, #d9bfb0 100%)";
  }
  return "linear-gradient(148deg, #faf5ff 0%, #efdff2 42%, #e3cfe7 74%, #d8bfd8 100%)";
}

/** @param {string} value @returns {string} */
function escapeAttr(value) {
  return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

/** @param {string} value @returns {string} */
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getFilteredCatalog() {
  return CATALOG.filter((p) => {
    const typeOk = catalogFilters.flowerType === "all" || p.flowerType === catalogFilters.flowerType;
    const paletteOk = catalogFilters.palette === "all" || p.palette === catalogFilters.palette;
    return typeOk && paletteOk;
  });
}

function renderCatalogFilterChips() {
  const typeRow = document.getElementById("filter-type-row");
  const paletteRow = document.getElementById("filter-palette-row");
  if (!typeRow || !paletteRow) return;

  const typeOptions = [
    { key: "all", labelKey: "filter_all" },
    { key: "roses", labelKey: "filter_roses" },
    { key: "peonies", labelKey: "filter_peonies" },
  ];
  const paletteOptions = [
    { key: "all", labelKey: "filter_all" },
    { key: "nude", labelKey: "filter_nude" },
    { key: "pastel", labelKey: "filter_pastel" },
  ];

  typeRow.innerHTML = "";
  paletteRow.innerHTML = "";

  typeOptions.forEach((opt) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "filter-chip" + (catalogFilters.flowerType === opt.key ? " is-active" : "");
    btn.textContent = t(opt.labelKey);
    btn.setAttribute("aria-pressed", catalogFilters.flowerType === opt.key ? "true" : "false");
    btn.dataset.filterKind = "flowerType";
    btn.dataset.filterKey = opt.key;
    typeRow.appendChild(btn);
  });

  paletteOptions.forEach((opt) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "filter-chip" + (catalogFilters.palette === opt.key ? " is-active" : "");
    btn.textContent = t(opt.labelKey);
    btn.setAttribute("aria-pressed", catalogFilters.palette === opt.key ? "true" : "false");
    btn.dataset.filterKind = "palette";
    btn.dataset.filterKey = opt.key;
    paletteRow.appendChild(btn);
  });
}

function renderProductGrid() {
  const grid = document.getElementById("product-grid");
  const countEl = document.getElementById("catalog-count");
  if (!grid) return;

  const items = getFilteredCatalog();
  if (countEl) {
    const template = items.length === 1 ? t("catalog_show_single") : t("catalog_show_multi");
    countEl.textContent = interpolate(template, { n: items.length });
  }

  grid.innerHTML = items
    .map((product, idx) => {
      const flowerLabel = product.flowerType === "roses" ? "Roses" : "Peonies";
      const paletteLabel = product.palette === "nude" ? "Nude" : "Pastel";
      const gradient = catalogVisualGradient(product.palette);
      const delay = idx * 48;
      return `
<article class="product-card" role="listitem" style="--card-delay:${delay}ms;--visual-gradient:${gradient}">
  <div class="product-card__visual" aria-hidden="true"></div>
  <div class="product-card__body">
    <div class="product-card__badges">
      <span class="product-badge">${escapeHtml(flowerLabel)}</span>
      <span class="product-badge">${escapeHtml(paletteLabel)}</span>
    </div>
    <h3 class="product-card__title">${escapeHtml(product.title)}</h3>
    <p class="product-card__meta">${escapeHtml(product.note)}</p>
    <div class="product-card__row">
      <span class="product-card__price">€${product.price.toFixed(2)}</span>
      <button type="button" class="btn-mini" data-add-product="${escapeAttr(product.id)}">${escapeHtml(t("catalog_add"))}</button>
    </div>
  </div>
</article>`;
    })
    .join("");
}

function renderCatalog() {
  renderCatalogFilterChips();
  renderProductGrid();
}

/**
 * @param {string} productId
 * @returns {CatalogProduct | undefined}
 */
function findCatalogProduct(productId) {
  return CATALOG.find((p) => p.id === productId);
}

/** @param {CatalogProduct} product */
function addProductLine(product) {
  const flowerLabel = product.flowerType === "roses" ? "Roses" : "Peonies";
  const paletteLabel = product.palette === "nude" ? "Nude" : "Pastel";
  store.cartLines.push({
    id: product.id,
    label: `${product.title} · ${flowerLabel}, ${paletteLabel}`,
    price: product.price,
  });
  persistStore(store);
}

function bindCatalogInteractions() {
  document.getElementById("filter-type-row")?.addEventListener("click", onCatalogFilterClick);
  document.getElementById("filter-palette-row")?.addEventListener("click", onCatalogFilterClick);
  document.getElementById("product-grid")?.addEventListener("click", onProductGridClick);
}

/** @param {MouseEvent} event */
function onCatalogFilterClick(event) {
  const target = /** @type {HTMLElement} */ (event.target);
  const chip = target.closest(".filter-chip");
  if (!chip) return;

  const kind = chip.dataset.filterKind;
  const key = chip.dataset.filterKey;

  if (kind === "flowerType") {
    catalogFilters = { ...catalogFilters, flowerType: /** @type {'all' | 'roses' | 'peonies'} */ (key || "all") };
  }
  if (kind === "palette") {
    catalogFilters = { ...catalogFilters, palette: /** @type {'all' | 'nude' | 'pastel'} */ (key || "all") };
  }

  renderCatalog();
}

/** @param {MouseEvent} event */
function onProductGridClick(event) {
  const target = /** @type {HTMLElement} */ (event.target);
  const btn = target.closest("[data-add-product]");
  if (!(btn instanceof HTMLButtonElement)) return;

  const id = btn.getAttribute("data-add-product") || "";
  const product = findCatalogProduct(id);
  if (!product) return;

  addProductLine(product);
  btn.disabled = true;
  const previous = t("catalog_add");
  btn.textContent = t("catalog_added");
  window.setTimeout(() => {
    btn.disabled = false;
    btn.textContent = previous;
  }, 1100);
}

/**
 * @typedef {Object} CheckoutStore
 * @property {CheckoutMachineState} machineState
 * @property {CartLine[]} cartLines
 * @property {boolean} surpriseDelivery
 * @property {string} senderName
 * @property {string} recipientName
 * @property {string} recipientPhone
 * @property {string} giftMessage
 * @property {string} deliveryDate
 * @property {string} deliverySlot
 * @property {number} version
 */

/** @type {CheckoutStore} */
const defaultStore = () => ({
  machineState: "IDLE",
  cartLines: [],
  surpriseDelivery: false,
  senderName: "",
  recipientName: "",
  recipientPhone: "",
  giftMessage: "",
  deliveryDate: "",
  deliverySlot: "",
  version: 3,
});

/** @returns {CheckoutStore} */
function loadStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultStore();
    const parsed = JSON.parse(raw);
    const base = defaultStore();
    if (typeof parsed !== "object" || parsed === null) return base;
    return {
      ...base,
      ...parsed,
      cartLines: Array.isArray(parsed.cartLines) ? parsed.cartLines : [],
      surpriseDelivery: typeof parsed.surpriseDelivery === "boolean" ? parsed.surpriseDelivery : base.surpriseDelivery,
      senderName: typeof parsed.senderName === "string" ? parsed.senderName : base.senderName,
      machineState: isValidMachineState(parsed.machineState) ? parsed.machineState : "IDLE",
    };
  } catch {
    return defaultStore();
  }
}

/** @param {unknown} s @returns {s is CheckoutMachineState} */
function isValidMachineState(s) {
  return typeof s === "string" && ORDERED_STATES.includes(/** @type {CheckoutMachineState} */ (s));
}

/** @param {CheckoutStore} store */
function persistStore(store) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch (e) {
    console.warn("lulu-checkout: persistence failed", e);
  }
}

/**
 * Prerequisites for honoring a persisted machine state (navigation guard / refresh safety).
 * @param {CheckoutStore} store
 * @param {CheckoutMachineState} state
 */
function prerequisitesMet(store, state) {
  const hasCart = store.cartLines.length > 0;
  const recipientOk =
    store.recipientName.trim().length > 0 && store.recipientPhone.trim().length > 3;
  const deliveryOk =
    store.deliveryDate.trim().length > 0 &&
    store.deliverySlot.trim().length > 0 &&
    isDeliveryDateAllowed(store.deliveryDate);

  switch (state) {
    case "IDLE":
      return true;
    case "CART_FILLED":
      return hasCart;
    case "RECIPIENT_INFO_VALIDATED":
      return hasCart;
    case "DELIVERY_SLOT_SELECTED":
      return hasCart && recipientOk;
    case "PAYMENT_PENDING":
      return hasCart && recipientOk && deliveryOk;
    case "ORDER_COMPLETED":
      return true;
    default:
      return false;
  }
}

/**
 * After load or edits: clamp to the deepest state still justified by persisted data —
 * avoids losing progress on refresh and blocks impossible states.
 * @param {CheckoutStore} store
 */
function applyNavigationGuard(store) {
  let idx = ORDERED_STATES.indexOf(store.machineState);
  if (idx < 0) {
    store.machineState = "IDLE";
    return store;
  }
  while (idx > 0 && !prerequisitesMet(store, ORDERED_STATES[idx])) {
    idx -= 1;
  }
  store.machineState = ORDERED_STATES[idx];
  return store;
}

/** @param {CheckoutMachineState} from @param {CheckoutMachineState} to @returns {boolean} */
function canTransition(from, to) {
  const i = ORDERED_STATES.indexOf(from);
  const j = ORDERED_STATES.indexOf(to);
  if (i < 0 || j < 0) return false;
  if (j === i) return true;
  if (j === i + 1) return true;
  if (j < i) return true;
  return false;
}

/** @param {CheckoutStore} store @param {CheckoutMachineState} next @returns {{ ok: boolean, reason?: string }} */
function assertTransitionAllowed(store, next) {
  if (!canTransition(store.machineState, next)) {
    return { ok: false, reason: t("err_generic") };
  }
  if (next === "CART_FILLED" && store.cartLines.length === 0) {
    return { ok: false, reason: t("err_cart_empty") };
  }
  if (next === "DELIVERY_SLOT_SELECTED") {
    if (store.recipientName.trim().length === 0 || store.recipientPhone.trim().length <= 3) {
      return { ok: false, reason: t("err_recipient") };
    }
  }
  if (next === "PAYMENT_PENDING") {
    if (store.deliveryDate.trim().length === 0 || store.deliverySlot.trim().length === 0) {
      return { ok: false, reason: t("err_delivery") };
    }
    if (!isDeliveryDateAllowed(store.deliveryDate)) {
      return { ok: false, reason: t("err_delivery_past") };
    }
  }
  return { ok: true };
}

/** @type {CheckoutStore} */
let store = applyNavigationGuard(loadStore());

/**
 * @param {Partial<CheckoutStore>} patch
 * @param {{ transitionTo?: CheckoutMachineState, skipPersist?: boolean }} [opts]
 */
function commit(patch, opts = {}) {
  const next = { ...store, ...patch };
  if (opts.transitionTo) {
    const check = assertTransitionAllowed(next, opts.transitionTo);
    if (!check.ok) {
      return { ok: false, reason: check.reason };
    }
    next.machineState = opts.transitionTo;
  }
  store = applyNavigationGuard(next);
  if (!opts.skipPersist) persistStore(store);
  return { ok: true };
}

function readFormIntoStore() {
  const name = /** @type {HTMLInputElement | null} */ (document.getElementById("recipient-name"));
  const phone = /** @type {HTMLInputElement | null} */ (document.getElementById("recipient-phone"));
  const msg = /** @type {HTMLInputElement | null} */ (document.getElementById("gift-message"));
  const sender = /** @type {HTMLInputElement | null} */ (document.getElementById("sender-name"));
  const d = /** @type {HTMLInputElement | null} */ (document.getElementById("delivery-date"));
  const slotSelect = /** @type {HTMLSelectElement | null} */ (document.getElementById("delivery-slot"));
  const surpriseEl = /** @type {HTMLInputElement | null} */ (document.getElementById("surprise-delivery"));
  const surpriseDelivery = !!surpriseEl?.checked;
  const senderName = surpriseDelivery ? "" : sender?.value.trim() ?? "";

  commit({
    surpriseDelivery,
    senderName,
    recipientName: name?.value.trim() ?? "",
    recipientPhone: phone?.value.trim() ?? "",
    giftMessage: msg?.value.trim() ?? "",
    deliveryDate: d?.value.trim() ?? "",
    deliverySlot: slotSelect?.value.trim() ?? "",
  });
}

function syncFormFromStore() {
  const name = /** @type {HTMLInputElement | null} */ (document.getElementById("recipient-name"));
  const phone = /** @type {HTMLInputElement | null} */ (document.getElementById("recipient-phone"));
  const msg = /** @type {HTMLInputElement | null} */ (document.getElementById("gift-message"));
  const sender = /** @type {HTMLInputElement | null} */ (document.getElementById("sender-name"));
  const d = /** @type {HTMLInputElement | null} */ (document.getElementById("delivery-date"));
  const slotSelect = /** @type {HTMLSelectElement | null} */ (document.getElementById("delivery-slot"));
  const surpriseEl = /** @type {HTMLInputElement | null} */ (document.getElementById("surprise-delivery"));
  if (name) name.value = store.recipientName;
  if (phone) phone.value = store.recipientPhone;
  if (msg) msg.value = store.giftMessage;
  if (sender) sender.value = store.surpriseDelivery ? "" : store.senderName;
  if (d) d.value = store.deliveryDate;
  if (slotSelect) slotSelect.value = store.deliverySlot;
  if (surpriseEl) surpriseEl.checked = store.surpriseDelivery;
}

function clearFieldErrors() {
  ["recipient-name", "recipient-phone", "sender-name", "delivery-date", "delivery-slot"].forEach((id) => {
    const el = document.getElementById(id);
    el?.classList.remove("invalid");
  });
  const boxes = ["cart-error", "recipient-error", "delivery-error"];
  boxes.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = "";
  });
}

/** @param {string[]} ids */
function focusFirstInvalid(ids) {
  for (let i = 0; i < ids.length; i += 1) {
    const el = document.getElementById(ids[i]);
    if (el && el.classList.contains("invalid")) {
      el.focus({ preventScroll: true });
      el.scrollIntoView({ block: "center", behavior: "smooth" });
      break;
    }
  }
}

function showValidationError(message, fieldIds = []) {
  fieldIds.forEach((id) => document.getElementById(id)?.classList.add("invalid"));
  const map = {
    IDLE: "cart-error",
    CART_FILLED: "cart-error",
    RECIPIENT_INFO_VALIDATED: "recipient-error",
    DELIVERY_SLOT_SELECTED: "delivery-error",
    PAYMENT_PENDING: "delivery-error",
  };
  const panel = map[store.machineState];
  const box = panel ? document.getElementById(panel) : null;
  if (box) box.textContent = message;
}

/** Maps machine state to visible panel key */
function panelKeyForState() {
  switch (store.machineState) {
    case "IDLE":
      return "idle";
    case "CART_FILLED":
      return "cart";
    case "RECIPIENT_INFO_VALIDATED":
      return "recipient";
    case "DELIVERY_SLOT_SELECTED":
      return "delivery";
    case "PAYMENT_PENDING":
      return "payment";
    case "ORDER_COMPLETED":
      return "complete";
    default:
      return "idle";
  }
}

function updateStepIndicators() {
  const order = ["idle", "cart", "recipient", "delivery", "payment"];
  const active = panelKeyForState();
  const activeIndex = order.indexOf(active === "complete" ? "payment" : active);

  document.querySelectorAll("[data-step-indicator]").forEach((el) => {
    const key = el.getAttribute("data-step-indicator");
    const idx = order.indexOf(key || "");
    el.classList.remove("active", "done");
    if (key === "idle" && store.machineState === "IDLE") {
      el.classList.add("active");
    } else if (idx >= 0) {
      if (idx < activeIndex) el.classList.add("done");
      if (idx === activeIndex && active !== "complete") el.classList.add("active");
    }
    if (active === "complete") {
      el.classList.add("done");
    }
  });
}

function updateSurpriseDeliveryUi() {
  const senderField = document.getElementById("sender-field");
  const senderInput = /** @type {HTMLInputElement | null} */ (document.getElementById("sender-name"));
  const surpriseEl = /** @type {HTMLInputElement | null} */ (document.getElementById("surprise-delivery"));
  if (surpriseEl) surpriseEl.checked = store.surpriseDelivery;
  if (senderField) senderField.hidden = store.surpriseDelivery;
  if (senderInput) {
    senderInput.toggleAttribute("disabled", store.surpriseDelivery);
    if (!store.surpriseDelivery) senderInput.value = store.senderName;
  }
}

function configureDeliveryInputs() {
  const d = /** @type {HTMLInputElement | null} */ (document.getElementById("delivery-date"));
  if (d) d.min = localISODate();
}

function updateThankSummary() {
  const el = document.getElementById("thank-summary");
  if (!el) return;
  if (store.machineState !== "ORDER_COMPLETED") {
    el.textContent = "";
    return;
  }
  const pieces = [t("thank_body")];
  if (store.surpriseDelivery) {
    pieces.push(t("thank_surprise"));
  } else if (store.senderName.trim().length > 0) {
    pieces.push(`${t("thank_sender_visible")} ${store.senderName.trim()}.`);
  } else {
    pieces.push(t("thank_sender_hidden"));
  }
  el.textContent = pieces.join(" ");
}

function render() {
  const panelKey = panelKeyForState();
  document.querySelectorAll(".step-panel").forEach((panel) => {
    const key = panel.getAttribute("data-panel");
    panel.classList.toggle("active", key === panelKey);
  });

  const status = document.getElementById("status-state");
  if (status) status.textContent = store.machineState;

  const summary = document.getElementById("cart-summary");
  if (summary && store.cartLines.length) {
    summary.textContent = store.cartLines.map((l) => `${l.label} — €${l.price.toFixed(2)}`).join(", ");
  }

  updateStepIndicators();
  configureDeliveryInputs();
  syncFormFromStore();
  updateSurpriseDeliveryUi();
  updateThankSummary();
}

// ——— Actions: Order button path (IDLE → CART_FILLED → RECIPIENT_INFO_VALIDATED) ———

function actionOrderFromIdle() {
  clearFieldErrors();
  const lines = store.cartLines.length
    ? store.cartLines.slice()
    : [{ id: "atelier-studio-mix", label: "Atelier Studio Mix (curated fallback)", price: 89 }];
  const res = commit({ cartLines: lines }, { transitionTo: "CART_FILLED" });
  if (!res.ok) {
    showValidationError(res.reason ?? t("err_generic"), []);
    render();
    return;
  }
  render();
}

function actionOrderFromCart() {
  clearFieldErrors();
  const res = commit({}, { transitionTo: "RECIPIENT_INFO_VALIDATED" });
  if (!res.ok) {
    showValidationError(res.reason ?? t("err_generic"), []);
    render();
    return;
  }
  render();
}

function actionOrderFromRecipient() {
  clearFieldErrors();
  readFormIntoStore();
  const res = commit({}, { transitionTo: "DELIVERY_SLOT_SELECTED" });
  if (!res.ok) {
    const fields = ["recipient-name", "recipient-phone"];
    showValidationError(res.reason ?? t("err_recipient"), fields);
    render();
    focusFirstInvalid(fields);
    return;
  }
  render();
}

function actionContinueDelivery() {
  clearFieldErrors();
  readFormIntoStore();
  const res = commit({}, { transitionTo: "PAYMENT_PENDING" });
  if (!res.ok) {
    const fields = ["delivery-date", "delivery-slot"];
    showValidationError(res.reason ?? t("err_delivery"), fields);
    render();
    focusFirstInvalid(fields);
    return;
  }
  render();
}

function actionMockWalletPayment() {
  clearFieldErrors();
  const wallet = /** @type {HTMLButtonElement | null} */ (document.getElementById("btn-pay-wallet"));
  const card = /** @type {HTMLButtonElement | null} */ (document.getElementById("btn-complete-payment"));
  if (wallet) {
    wallet.disabled = true;
    wallet.textContent = t("wallet_processing");
  }
  if (card) card.disabled = true;
  window.setTimeout(() => {
    commit({}, { transitionTo: "ORDER_COMPLETED" });
    if (wallet) wallet.disabled = false;
    if (card) card.disabled = false;
    restoreWalletButtonCopy();
    render();
    restoreWalletButtonCopy();
  }, 720);
}

function actionCompletePayment() {
  clearFieldErrors();
  commit({}, { transitionTo: "ORDER_COMPLETED" });
  render();
}

/** @param {CheckoutMachineState} target */
function actionGoBack(target) {
  clearFieldErrors();
  const res = commit({}, { transitionTo: target });
  if (!res.ok) {
    showValidationError(res.reason ?? t("err_go_back"), []);
  }
  render();
}

function actionReset() {
  store = defaultStore();
  persistStore(store);
  clearFieldErrors();
  catalogFilters = { flowerType: "all", palette: "all" };
  renderCatalog();
  applyI18n();
  render();
}

function wireEvents() {
  document.getElementById("btn-order")?.addEventListener("click", actionOrderFromIdle);
  document.getElementById("btn-order-cart")?.addEventListener("click", actionOrderFromCart);
  document.getElementById("btn-order-recipient")?.addEventListener("click", actionOrderFromRecipient);

  document.getElementById("btn-continue-delivery")?.addEventListener("click", actionContinueDelivery);
  document.getElementById("btn-pay-wallet")?.addEventListener("click", actionMockWalletPayment);
  document.getElementById("btn-complete-payment")?.addEventListener("click", actionCompletePayment);
  document.getElementById("btn-reset-flow")?.addEventListener("click", actionReset);

  document.getElementById("btn-back-cart")?.addEventListener("click", () => actionGoBack("IDLE"));
  document.getElementById("btn-back-recipient")?.addEventListener("click", () => actionGoBack("CART_FILLED"));
  document.getElementById("btn-back-delivery")?.addEventListener("click", () =>
    actionGoBack("RECIPIENT_INFO_VALIDATED")
  );
  document.getElementById("btn-back-payment")?.addEventListener("click", () =>
    actionGoBack("DELIVERY_SLOT_SELECTED")
  );

  ["recipient-name", "recipient-phone", "sender-name", "gift-message"].forEach((id) => {
    document.getElementById(id)?.addEventListener("input", () => {
      readFormIntoStore();
      persistStore(store);
      updateSurpriseDeliveryUi();
    });
  });

  document.getElementById("delivery-date")?.addEventListener("change", () => {
    readFormIntoStore();
    persistStore(store);
  });
  document.getElementById("delivery-slot")?.addEventListener("change", () => {
    readFormIntoStore();
    persistStore(store);
  });

  document.getElementById("surprise-delivery")?.addEventListener("change", () => {
    readFormIntoStore();
    persistStore(store);
    updateSurpriseDeliveryUi();
  });

  document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = /** @type {HTMLElement} */ (btn).dataset.langBtn;
      if (lang === "en" || lang === "ua" || lang === "bg") setLang(lang);
    });
  });
}

store = applyNavigationGuard(store);
wireEvents();
bindCatalogInteractions();
applyI18n();
renderCatalog();
render();
