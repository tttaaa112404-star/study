/**
 * URBAN CLOSET - High-End E-Commerce Showcase Script
 * Pure Vanilla JavaScript with dynamic SPA router, cart drawer, search overlay,
 * category filtering, sorting, lightbox modal, and responsive interactions.
 */

// ==========================================
// 1. Product Master Data (Specified 12 Items)
// High-resolution Unsplash photos on neutral/white backgrounds
// ==========================================
const PRODUCTS_DATA = [
  {
    id: 1,
    name: 'オーバーサイズTシャツ',
    enName: 'Oversized Boxy Tee',
    price: 6500,
    category: 'TOPS',
    badge: 'NEW',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=1000&q=80'
    ],
    description: '度目を詰めた超長綿ヘビーウェイト天竺を使用した、構築的なボックスシルエットTシャツ。首元のリブは程よく詰まり、1枚でもインナーでも上品なモード感を醸し出します。'
  },
  {
    id: 2,
    name: 'ワイドテーパードパンツ',
    enName: 'Wide Tapered Trousers',
    price: 12000,
    category: 'BOTTOMS',
    badge: 'POPULAR',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1000&q=80'
    ],
    description: '深めのツータックから裾に向かって滑らかにテーパードする美しいライン。上質なウールライクなポリエステル素材により、シワになりにくくドレープ性に富んだ一本です。'
  },
  {
    id: 3,
    name: 'リネンシャツ',
    enName: 'Relaxed Linen Shirt',
    price: 9800,
    category: 'TOPS',
    badge: '',
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&w=1000&q=80'
    ],
    description: '高品質なフレンチリネンを洗いざらしで仕上げた清涼感あるレギュラーカラーシャツ。計算されたドロップショルダーと長めの着丈で、羽織りとしても重宝します。'
  },
  {
    id: 4,
    name: 'コーチジャケット',
    enName: 'Matte Nylon Coach Jacket',
    price: 18000,
    category: 'OUTERWEAR',
    badge: 'RECOMMEND',
    images: [
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1000&q=80'
    ],
    description: '光沢を抑えたマットタフタ生地によるミニマルなコーチジャケット。裾のドローコードでシルエットの変化が楽しめ、裾口には高級感あるメタルアジャスターを配置。'
  },
  {
    id: 5,
    name: 'クロップドフーディ',
    enName: 'Heavyweight Cropped Hoodie',
    price: 11000,
    category: 'TOPS',
    badge: '',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1000&q=80'
    ],
    description: '14オンスの極厚裏起毛スウェット素材を採用。フードの立ち上がりが美しく、ワイドパンツやスカートとも好相性な絶妙な着丈バランスに仕上げています。'
  },
  {
    id: 6,
    name: 'カーゴパンツ',
    enName: 'Modern Minimal Cargo',
    price: 14500,
    category: 'BOTTOMS',
    badge: '',
    images: [
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'ミリタリー特有の野暮ったさを削ぎ落とし、マチを抑えたフラットポケットでモードに昇華。裾のドローコードでストレートからジョガー風まで対応。'
  },
  {
    id: 7,
    name: 'ドローストリングバッグ',
    enName: 'Drawstring Leather Bag',
    price: 5500,
    category: 'ACCESSORIES',
    badge: '',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'しなやかなヴィーガンレザーを使用した巾着型ショルダーバッグ。スマートフォンと財布、小物がすっきり収まる都市生活にジャストなサイズ感。'
  },
  {
    id: 8,
    name: 'ステンカラーコート',
    enName: 'Minimal Bal Collar Coat',
    price: 28000,
    category: 'OUTERWEAR',
    badge: 'KEY PIECE',
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80'
    ],
    description: '尾州産の最高級梳毛ウールブレンド生地を使用。無駄を徹底的に排除した比翼仕立てと大胆な着丈が、歩くたびにドラマチックな陰影を生み出します。'
  },
  {
    id: 9,
    name: 'リブニットベスト',
    enName: 'Wide Rib Knit Vest',
    price: 8800,
    category: 'TOPS',
    badge: '',
    images: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80'
    ],
    description: '深めのアームホールでシャツやTシャツとのレイヤードが自在。ドライタッチなコットンアクリル糸で編み立て、春先から秋口まで長く着用可能です。'
  },
  {
    id: 10,
    name: 'ナイロンショーツ',
    enName: 'Relaxed Nylon Shorts',
    price: 7200,
    category: 'BOTTOMS',
    badge: '',
    images: [
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=80'
    ],
    description: '撥水加工を施したワッシャーナイロン素材。膝上丈のゆったりとした渡り幅で、都会のアクティブなデイリースタイルに涼しさと軽やかさをプラス。'
  },
  {
    id: 11,
    name: 'ロゴキャップ',
    enName: 'Low Profile Logo Cap',
    price: 4800,
    category: 'ACCESSORIES',
    badge: '',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'フロントに同色のトーンオントーンで施された極細刺繍がアイコニック。浅めのクラウンとカーブバイザーが頭の形をすっきりと整えます。'
  },
  {
    id: 12,
    name: 'レイヤードロンT',
    enName: 'Heavyweight Long Sleeve Tee',
    price: 7800,
    category: 'TOPS',
    badge: 'STANDARD',
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'タフな双糸で編み上げた重厚感のあるロングスリーブTシャツ。袖リブのテンションを強めに設定し、たくし上げた際にも自然なボリュームが生まれます。'
  }
];

// Lookbook Photos (9 Editorial Cuts)
const LOOKBOOK_ITEMS = [
  { id: 1, title: 'LOOK 01 / 09', caption: 'Monochrome Tailoring & Volume', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80' },
  { id: 2, title: 'LOOK 02 / 09', caption: 'Structural Linen & Wide Silhouette', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80' },
  { id: 3, title: 'LOOK 03 / 09', caption: 'Fluid Geometry in Motion', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80' },
  { id: 4, title: 'LOOK 04 / 09', caption: 'Atmosphere & Wool Bal Collar', image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=80' },
  { id: 5, title: 'LOOK 05 / 09', caption: 'Urban Minimalist Layering', image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=80' },
  { id: 6, title: 'LOOK 06 / 09', caption: 'Negative Space & Knit Texture', image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=1200&q=80' },
  { id: 7, title: 'LOOK 07 / 09', caption: 'Matte Nylon & Modern Proportion', image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1200&q=80' },
  { id: 8, title: 'LOOK 08 / 09', caption: 'Form, Fabric and Pure Lines', image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=80' },
  { id: 9, title: 'LOOK 09 / 09', caption: '2025 Spring Silhouette Finale', image: 'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=1200&q=80' }
];

// App State
let currentCategory = 'ALL';
let currentSort = 'featured';
let shoppingBag = [
  { productId: 1, size: 'M', color: 'Black', qty: 1 },
  { productId: 2, size: 'L', color: 'Charcoal', qty: 1 }
];
let currentLightboxIndex = 0;

// ==========================================
// 2. Initialization & DOMContentLoaded
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initRouter();
  initHeaderScroll();
  initFullscreenNav();
  initCartDrawer();
  initSearchOverlay();
  initProductList();
  initHomeNewArrivals();
  initLookbook();
  initContactForm();
  initFaqAccordion();
  initNewsletterForm();
  updateCartBadge();
});

// ==========================================
// 3. SPA Router & Smooth Page Switcher
// ==========================================
function navigateTo(hash) {
  window.location.hash = hash;
}

function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  handleRoute(); // Initial run

  // Intercept all internal [data-nav] links
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-nav]');
    if (link) {
      e.preventDefault();
      const targetHash = link.getAttribute('data-nav');
      navigateTo(targetHash);
    }
  });
}

function handleRoute() {
  const fullHash = window.location.hash || '#';
  const cleanHash = fullHash.replace('#', '') || 'home';

  // Smooth scroll to top on page transition
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Close overlays if open
  closeFullscreenNav();
  closeSearchOverlay();

  // Route matching
  if (cleanHash.startsWith('products/')) {
    const id = parseInt(cleanHash.split('/')[1], 10);
    showProductDetail(id);
  } else {
    showPageView(cleanHash);
  }
}

function showPageView(viewName) {
  const validViews = ['home', 'products', 'about', 'lookbook', 'contact'];
  const targetView = validViews.includes(viewName) ? viewName : 'home';

  document.querySelectorAll('.page-view').forEach(view => {
    view.classList.remove('is-active');
  });

  const activeEl = document.querySelector(`.page-view[data-view="${targetView}"]`);
  if (activeEl) {
    activeEl.classList.add('is-active');
  }

  // Update active links in full screen nav
  document.querySelectorAll('.fullscreen-nav-anchor').forEach(item => {
    const itemNav = item.getAttribute('data-nav') || '';
    if (itemNav.replace('#', '') === targetView) {
      item.style.color = 'var(--color-black)';
      item.style.fontWeight = '400';
    } else {
      item.style.color = '';
      item.style.fontWeight = '';
    }
  });
}

// ==========================================
// 4. Header Scroll Effect
// ==========================================
function initHeaderScroll() {
  const header = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('is-scrolled');
    } else {
      header?.classList.remove('is-scrolled');
    }
  });
}

// ==========================================
// 5. Fullscreen Hamburger Nav
// ==========================================
function initFullscreenNav() {
  const trigger = document.querySelector('.menu-trigger-btn');
  const closeBtn = document.querySelector('.overlay-close-btn');

  trigger?.addEventListener('click', openFullscreenNav);
  closeBtn?.addEventListener('click', closeFullscreenNav);
}

function openFullscreenNav() {
  const overlay = document.querySelector('.fullscreen-nav-overlay');
  overlay?.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeFullscreenNav() {
  const overlay = document.querySelector('.fullscreen-nav-overlay');
  overlay?.classList.remove('is-open');
  document.body.style.overflow = '';
}

// ==========================================
// 6. Slide-in Cart Drawer UI
// ==========================================
function initCartDrawer() {
  const cartBtn = document.querySelector('[data-action="open-cart"]');
  const backdrop = document.querySelector('.cart-drawer-backdrop');
  const panel = document.querySelector('.cart-drawer-panel');
  const closeBtn = document.querySelector('.cart-drawer-close-btn');

  const openDrawer = () => {
    renderCartDrawerItems();
    backdrop?.classList.add('is-visible');
    panel?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    backdrop?.classList.remove('is-visible');
    panel?.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  cartBtn?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', closeDrawer);

  window.openCartDrawer = openDrawer;
  window.closeCartDrawer = closeDrawer;
}

function updateCartBadge() {
  const badge = document.querySelector('.cart-indicator-badge');
  const count = shoppingBag.reduce((sum, item) => sum + item.qty, 0);
  if (badge) {
    badge.textContent = count;
    badge.classList.add('bump');
    setTimeout(() => badge.classList.remove('bump'), 300);
  }
}

function renderCartDrawerItems() {
  const listEl = document.querySelector('.cart-drawer-items-list');
  const subtotalEl = document.querySelector('#cart-subtotal-val');
  const progressText = document.querySelector('.shipping-progress-text');
  const progressBarFill = document.querySelector('.shipping-progress-bar-fill');

  if (!listEl) return;

  if (shoppingBag.length === 0) {
    listEl.innerHTML = `
      <div style="text-align: center; padding: 4rem 1rem; color: var(--color-gray);">
        <p style="font-size: 0.95rem; margin-bottom: 1.5rem;">Shopping Bag is empty.</p>
        <button class="btn-minimal btn-minimal-outline" onclick="closeCartDrawer(); navigateTo('#products');">Shop Collection</button>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = '¥0';
    if (progressBarFill) progressBarFill.style.width = '0%';
    if (progressText) progressText.textContent = '¥20,000以上のご注文で国内送料無料';
    return;
  }

  let subtotal = 0;
  listEl.innerHTML = shoppingBag.map((item, index) => {
    const prod = PRODUCTS_DATA.find(p => p.id === item.productId);
    if (!prod) return '';
    const itemTotal = prod.price * item.qty;
    subtotal += itemTotal;

    return `
      <div class="cart-drawer-item">
        <img src="${prod.images[0]}" alt="${prod.name}" class="cart-drawer-item-img">
        <div class="cart-drawer-item-info">
          <div>
            <h4 class="cart-drawer-item-name">${prod.name}</h4>
            <p class="cart-drawer-item-variant">${item.color} / Size: ${item.size}</p>
            <p class="cart-drawer-item-price">&yen;${prod.price.toLocaleString()} &times; ${item.qty}</p>
          </div>
          <button type="button" class="cart-drawer-item-remove" onclick="removeCartItem(${index})">Remove</button>
        </div>
      </div>
    `;
  }).join('');

  if (subtotalEl) {
    subtotalEl.textContent = `¥${subtotal.toLocaleString()}`;
  }

  // Shipping threshold: ¥20,000
  const freeThreshold = 20000;
  const remaining = freeThreshold - subtotal;
  const progressPercent = Math.min(100, Math.round((subtotal / freeThreshold) * 100));

  if (progressBarFill) {
    progressBarFill.style.width = `${progressPercent}%`;
  }
  if (progressText) {
    if (remaining <= 0) {
      progressText.innerHTML = `<strong>送料無料</strong> が適用されました。`;
    } else {
      progressText.innerHTML = `あと <strong>¥${remaining.toLocaleString()}</strong> で送料無料です。`;
    }
  }
}

function removeCartItem(index) {
  shoppingBag.splice(index, 1);
  updateCartBadge();
  renderCartDrawerItems();
}
window.removeCartItem = removeCartItem;

// ==========================================
// 7. Search Overlay UI with Live Filtering
// ==========================================
function initSearchOverlay() {
  const searchBtn = document.querySelector('[data-action="open-search"]');
  const overlay = document.querySelector('.search-modal-overlay');
  const closeBtn = document.querySelector('.search-modal-close-row button');
  const input = document.querySelector('#search-keyword-input');
  const resultsContainer = document.querySelector('.search-live-results');
  const tags = document.querySelectorAll('.search-tag-pill');

  const openSearch = () => {
    overlay?.classList.add('is-open');
    input?.focus();
    document.body.style.overflow = 'hidden';
  };

  searchBtn?.addEventListener('click', openSearch);
  closeBtn?.addEventListener('click', closeSearchOverlay);

  // Live filter
  input?.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    renderSearchResults(query);
  });

  // Quick tags
  tags.forEach(tag => {
    tag.addEventListener('click', () => {
      const kw = tag.textContent.trim();
      if (input) {
        input.value = kw;
        renderSearchResults(kw.toLowerCase());
      }
    });
  });

  // ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSearchOverlay();
      closeCartDrawer();
      closeFullscreenNav();
      closeLightbox();
    }
  });
}

function closeSearchOverlay() {
  const overlay = document.querySelector('.search-modal-overlay');
  overlay?.classList.remove('is-open');
  document.body.style.overflow = '';
}

function renderSearchResults(query) {
  const container = document.querySelector('.search-live-results');
  if (!container) return;

  if (!query) {
    container.innerHTML = '';
    return;
  }

  const matches = PRODUCTS_DATA.filter(p => {
    return p.name.toLowerCase().includes(query) ||
           p.enName.toLowerCase().includes(query) ||
           p.category.toLowerCase().includes(query);
  });

  if (matches.length === 0) {
    container.innerHTML = `<p style="color:var(--color-gray); font-size:0.9rem; padding: 1rem 0;">「${query}」に一致する商品は見つかりませんでした。</p>`;
    return;
  }

  container.innerHTML = matches.map(prod => `
    <div class="search-result-item" onclick="closeSearchOverlay(); navigateTo('#products/${prod.id}');">
      <img src="${prod.images[0]}" alt="${prod.name}" class="search-result-thumb">
      <div>
        <p style="font-size:0.75rem; letter-spacing:0.15em; color:var(--color-gray);">${prod.category}</p>
        <h4 style="font-size:0.95rem; font-weight:400;">${prod.name}</h4>
        <p style="font-size:0.85rem; font-weight:400;">&yen;${prod.price.toLocaleString()}</p>
      </div>
    </div>
  `).join('');
}

// ==========================================
// 8. Product List View (Grid, Filter, Sort)
// ==========================================
function initProductList() {
  const filterTabs = document.querySelectorAll('.filter-tab-btn');
  const sortSelect = document.querySelector('#product-sort-select');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      currentCategory = tab.getAttribute('data-filter') || 'ALL';
      renderProductsGrid();
    });
  });

  sortSelect?.addEventListener('change', () => {
    currentSort = sortSelect.value;
    renderProductsGrid();
  });

  renderProductsGrid();
}

function renderProductsGrid() {
  const grid = document.querySelector('#all-products-grid');
  const countEl = document.querySelector('#product-count-display');
  if (!grid) return;

  // 1. Filter
  let list = PRODUCTS_DATA.filter(item => {
    if (currentCategory === 'ALL') return true;
    return item.category === currentCategory;
  });

  // 2. Sort
  if (currentSort === 'price-asc') {
    list.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'price-desc') {
    list.sort((a, b) => b.price - a.price);
  } else {
    list.sort((a, b) => a.id - b.id);
  }

  // Update count display
  if (countEl) {
    countEl.textContent = `${list.length} ITEMS`;
  }

  // Render cards (Uniform 3x4 grid)
  grid.innerHTML = list.map(item => `
    <article class="product-item-card" onclick="navigateTo('#products/${item.id}')">
      <div class="product-item-media">
        <img src="${item.images[0]}" alt="${item.name}" class="base-image" loading="lazy">
        <img src="${item.images[1]}" alt="${item.name} alternative view" class="alt-image" loading="lazy">
      </div>
      <div class="product-item-meta">
        <span class="product-item-brand">URBAN CLOSET</span>
        <h3 class="product-item-name">${item.name}</h3>
        <p class="product-item-price">&yen;${item.price.toLocaleString()} <small style="color:var(--color-gray);">(税込)</small></p>
      </div>
    </article>
  `).join('');
}

// ==========================================
// 9. Home Page New Arrivals (4 Items)
// ==========================================
function initHomeNewArrivals() {
  const container = document.querySelector('#home-new-arrivals-grid');
  if (!container) return;

  // First 4 items
  const newArrivals = PRODUCTS_DATA.slice(0, 4);
  container.innerHTML = newArrivals.map(item => `
    <article class="product-item-card" onclick="navigateTo('#products/${item.id}')">
      <div class="product-item-media">
        <img src="${item.images[0]}" alt="${item.name}" class="base-image" loading="lazy">
        <img src="${item.images[1]}" alt="${item.name} alternative view" class="alt-image" loading="lazy">
      </div>
      <div class="product-item-meta">
        <span class="product-item-brand">URBAN CLOSET</span>
        <h3 class="product-item-name">${item.name}</h3>
        <p class="product-item-price">&yen;${item.price.toLocaleString()} <small style="color:var(--color-gray);">(税込)</small></p>
      </div>
    </article>
  `).join('');
}

// ==========================================
// 10. Product Detail Dynamic Renderer
// ==========================================
function showProductDetail(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId) || PRODUCTS_DATA[0];
  const container = document.querySelector('#product-detail-container');
  if (!container) return;

  // Hide other views, show detail view
  document.querySelectorAll('.page-view').forEach(v => v.classList.remove('is-active'));
  const detailView = document.querySelector('.page-view[data-view="product-detail"]');
  detailView?.classList.add('is-active');

  // Related products (4 items excluding current)
  const related = PRODUCTS_DATA.filter(p => p.id !== product.id).slice(0, 4);

  container.innerHTML = `
    <!-- Breadcrumb -->
    <nav class="detail-breadcrumb-nav" aria-label="パンくずリスト">
      <a href="#home" data-nav="#home">HOME</a> / 
      <a href="#products" data-nav="#products">PRODUCTS</a> / 
      <span class="current-item">${product.name}</span>
    </nav>

    <!-- Main Detail Layout -->
    <div class="detail-main-layout">
      <!-- Gallery Column -->
      <div class="detail-gallery-column">
        <!-- 4 Thumbnails -->
        <div class="detail-thumbnail-strip" aria-label="サムネイル一覧">
          ${product.images.map((imgSrc, i) => `
            <div class="thumbnail-box ${i === 0 ? 'is-selected' : ''}" onclick="switchDetailImage(this, '${imgSrc}')">
              <img src="${imgSrc}" alt="${product.name} view ${i + 1}">
            </div>
          `).join('')}
        </div>

        <!-- Primary Large View -->
        <div class="detail-primary-view">
          <img id="detail-main-stage-img" src="${product.images[0]}" alt="${product.name}">
        </div>
      </div>

      <!-- Info Column -->
      <div class="detail-info-column">
        <p class="detail-brand-title">URBAN CLOSET / ${product.category}</p>
        <h1 class="detail-product-title">${product.name}</h1>
        <p style="font-size:0.85rem; color:var(--color-gray); margin-bottom:1rem; letter-spacing:0.1em;">${product.enName}</p>

        <div class="detail-price-row">
          <span class="detail-price-text">&yen;${product.price.toLocaleString()} <small style="font-size:0.85rem; color:var(--color-gray); font-weight:300;">(税込)</small></span>
          <span class="detail-stock-badge">IN STOCK</span>
        </div>

        <!-- Color Selector -->
        <div class="detail-selector-group">
          <div class="selector-label-line">
            <span>COLOR: <strong id="detail-active-color-name">Black</strong></span>
          </div>
          <div class="color-swatches-row">
            <span class="color-swatch-circle is-active" style="background-color:#0A0A0A;" onclick="selectProductColor(this, 'Black')" title="Black"></span>
            <span class="color-swatch-circle" style="background-color:#F5F5F5;" onclick="selectProductColor(this, 'White')" title="White"></span>
            <span class="color-swatch-circle" style="background-color:#6B7280;" onclick="selectProductColor(this, 'Gray')" title="Gray"></span>
          </div>
        </div>

        <!-- Size Selector -->
        <div class="detail-selector-group">
          <div class="selector-label-line">
            <span>SIZE: <strong id="detail-active-size-name">M</strong></span>
            <a href="#" onclick="alert('【サイズチャート】\\nユニセックス仕様です。通常よりワンサイズ落とすとジャストフィット、普段のサイズで程よいオーバーサイズ感を楽しめます。'); return false;" style="font-size:0.75rem; text-decoration:underline; color:var(--color-gray);">Size Guide</a>
          </div>
          <div class="size-options-row">
            <button type="button" class="size-option-btn" onclick="selectProductSize(this, 'S')">S</button>
            <button type="button" class="size-option-btn is-active" onclick="selectProductSize(this, 'M')">M</button>
            <button type="button" class="size-option-btn" onclick="selectProductSize(this, 'L')">L</button>
            <button type="button" class="size-option-btn" onclick="selectProductSize(this, 'XL')">XL</button>
          </div>
        </div>

        <!-- Add To Cart Button -->
        <div style="margin-bottom: 2.5rem;">
          <button type="button" id="btn-add-cart-detail" class="btn-minimal btn-minimal-black btn-full-width" onclick="handleAddToCart(${product.id})">
            ADD TO CART
          </button>
        </div>

        <!-- Description -->
        <p class="detail-description-copy">${product.description}</p>

        <!-- Minimal Size Guide Table -->
        <div style="margin-top: 2rem;">
          <h4 style="font-size:0.78rem; letter-spacing:0.18em; text-transform:uppercase; margin-bottom:0.5rem; color:var(--color-gray);">SPECIFICATION &amp; SIZING (cm)</h4>
          <table class="size-guide-minimal-table">
            <thead>
              <tr>
                <th>SIZE</th>
                <th>着丈</th>
                <th>身幅</th>
                <th>肩幅</th>
                <th>袖丈</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>S</td><td>68</td><td>58</td><td>52</td><td>57</td></tr>
              <tr><td>M</td><td>71</td><td>61</td><td>54</td><td>59</td></tr>
              <tr><td>L</td><td>74</td><td>64</td><td>56</td><td>61</td></tr>
              <tr><td>XL</td><td>77</td><td>67</td><td>58</td><td>63</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Related Products -->
    <section class="section-spacer" style="border-top: 1px solid var(--color-border-subtle); margin-top: 6rem;">
      <div class="section-heading-wrap">
        <div>
          <span class="section-eyebrow">Curated Selection</span>
          <h2 class="section-title-large">Related Products</h2>
        </div>
        <a href="#products" data-nav="#products" class="view-more-link">View All &rarr;</a>
      </div>

      <div class="products-uniform-grid home-four-grid">
        ${related.map(item => `
          <article class="product-item-card" onclick="navigateTo('#products/${item.id}')">
            <div class="product-item-media">
              <img src="${item.images[0]}" alt="${item.name}" class="base-image" loading="lazy">
              <img src="${item.images[1]}" alt="${item.name} alternative view" class="alt-image" loading="lazy">
            </div>
            <div class="product-item-meta">
              <span class="product-item-brand">URBAN CLOSET</span>
              <h3 class="product-item-name">${item.name}</h3>
              <p class="product-item-price">&yen;${item.price.toLocaleString()} <small style="color:var(--color-gray);">(税込)</small></p>
            </div>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}

function switchDetailImage(thumbEl, newSrc) {
  document.querySelectorAll('.thumbnail-box').forEach(b => b.classList.remove('is-selected'));
  thumbEl.classList.add('is-selected');
  const mainImg = document.querySelector('#detail-main-stage-img');
  if (mainImg) {
    mainImg.src = newSrc;
  }
}
window.switchDetailImage = switchDetailImage;

function selectProductColor(el, colorName) {
  document.querySelectorAll('.color-swatch-circle').forEach(s => s.classList.remove('is-active'));
  el.classList.add('is-active');
  const label = document.querySelector('#detail-active-color-name');
  if (label) label.textContent = colorName;
}
window.selectProductColor = selectProductColor;

function selectProductSize(el, sizeName) {
  document.querySelectorAll('.size-option-btn').forEach(b => b.classList.remove('is-active'));
  el.classList.add('is-active');
  const label = document.querySelector('#detail-active-size-name');
  if (label) label.textContent = sizeName;
}
window.selectProductSize = selectProductSize;

function handleAddToCart(productId) {
  const btn = document.querySelector('#btn-add-cart-detail');
  const colorName = document.querySelector('#detail-active-color-name')?.textContent || 'Black';
  const sizeName = document.querySelector('#detail-active-size-name')?.textContent || 'M';

  if (btn) {
    btn.textContent = 'ADDED TO CART';
    btn.style.backgroundColor = '#16A34A';
    btn.style.borderColor = '#16A34A';
  }

  // Push to bag
  const existing = shoppingBag.find(i => i.productId === productId && i.size === sizeName && i.color === colorName);
  if (existing) {
    existing.qty += 1;
  } else {
    shoppingBag.push({ productId, size: sizeName, color: colorName, qty: 1 });
  }

  updateCartBadge();

  setTimeout(() => {
    if (btn) {
      btn.textContent = 'ADD TO CART';
      btn.style.backgroundColor = '';
      btn.style.borderColor = '';
    }
    openCartDrawer();
  }, 500);
}
window.handleAddToCart = handleAddToCart;

// ==========================================
// 11. Lookbook & Lightbox Modal
// ==========================================
function initLookbook() {
  const grid = document.querySelector('#lookbook-gallery-grid');
  if (!grid) return;

  grid.innerHTML = LOOKBOOK_ITEMS.map((item, index) => `
    <div class="lookbook-grid-card" onclick="openLightbox(${index})">
      <img src="${item.image}" alt="${item.caption}" loading="lazy">
      <div class="lookbook-card-caption-overlay">
        <span class="lookbook-cut-badge">${item.title}</span>
      </div>
    </div>
  `).join('');

  // Close & Nav
  const closeBtn = document.querySelector('.lightbox-btn-close');
  const prevBtn = document.querySelector('.lightbox-arrow-nav.nav-prev');
  const nextBtn = document.querySelector('.lightbox-arrow-nav.nav-next');
  const modal = document.querySelector('.lightbox-modal-wrap');

  closeBtn?.addEventListener('click', closeLightbox);
  prevBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    changeLightbox(-1);
  });
  nextBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    changeLightbox(1);
  });
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!modal?.classList.contains('is-active')) return;
    if (e.key === 'ArrowLeft') changeLightbox(-1);
    if (e.key === 'ArrowRight') changeLightbox(1);
  });
}

function openLightbox(index) {
  currentLightboxIndex = index;
  renderLightboxContent();
  const modal = document.querySelector('.lightbox-modal-wrap');
  modal?.classList.add('is-active');
  document.body.style.overflow = 'hidden';
}
window.openLightbox = openLightbox;

function closeLightbox() {
  const modal = document.querySelector('.lightbox-modal-wrap');
  modal?.classList.remove('is-active');
  document.body.style.overflow = '';
}
window.closeLightbox = closeLightbox;

function changeLightbox(direction) {
  currentLightboxIndex = (currentLightboxIndex + direction + LOOKBOOK_ITEMS.length) % LOOKBOOK_ITEMS.length;
  renderLightboxContent();
}

function renderLightboxContent() {
  const item = LOOKBOOK_ITEMS[currentLightboxIndex];
  const imgEl = document.querySelector('#lightbox-active-img');
  const numEl = document.querySelector('#lightbox-active-number');

  if (imgEl && item) {
    imgEl.src = item.image;
    imgEl.alt = item.caption;
  }
  if (numEl && item) {
    numEl.textContent = `${item.title} — ${item.caption}`;
  }
}

// ==========================================
// 12. Contact Form & FAQ Accordion
// ==========================================
function initContactForm() {
  const form = document.querySelector('#inquiry-contact-form');
  const feedback = document.querySelector('#contact-feedback-box');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');

    if (submitBtn) {
      submitBtn.textContent = 'SENDING...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = 'MESSAGE SENT';
        form.reset();

        if (feedback) {
          feedback.style.display = 'block';
          feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        setTimeout(() => {
          submitBtn.textContent = 'SEND MESSAGE';
          submitBtn.disabled = false;
        }, 3500);
      }, 600);
    }
  });
}

function initFaqAccordion() {
  const triggers = document.querySelectorAll('.faq-accordion-trigger');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-accordion-item');
      item?.classList.toggle('is-open');
    });
  });
}

// ==========================================
// 13. Newsletter Form
// ==========================================
function initNewsletterForm() {
  const form = document.querySelector('#site-newsletter-form');
  const toast = document.querySelector('#newsletter-success-toast');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    if (input && input.value.trim()) {
      input.value = '';
      if (toast) {
        toast.style.display = 'block';
        setTimeout(() => {
          toast.style.display = 'none';
        }, 4000);
      }
    }
  });
}
