/**
 * 株式会社NextBridge コーポレートサイト - メインJavaScript
 * ==========================================================================
 * このファイルでは以下の機能を実装しています：
 * 1. ヘッダースクロール制御（固定ヘッダーへの影追加）
 * 2. ハンバーガーメニュー（SP用ナビゲーション開閉）
 * 3. アクティブナビリンク管理
 * 4. カウントアップアニメーション（実績数字）
 * 5. お問い合わせフォームのバリデーション・送信完了メッセージ
 * 6. スクロールアニメーション（FadeIn）
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------
   * 1. ヘッダー：スクロール時にシャドウを追加
   * ------------------------------------------------------------------ */
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // 初期状態でも確認
  }

  /* ------------------------------------------------------------------
   * 2. ハンバーガーメニュー（SP用）
   * ------------------------------------------------------------------ */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const body = document.body;

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.classList.toggle('is-open');
      navMenu.classList.toggle('is-active', isOpen);
      body.style.overflow = isOpen ? 'hidden' : ''; // 背景スクロール防止
      navToggle.setAttribute('aria-expanded', isOpen.toString());
    });

    // メニュー内リンクをクリックしたら自動的に閉じる
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('is-open');
        navMenu.classList.remove('is-active');
        body.style.overflow = '';
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // オーバーレイ（メニュー外）クリックで閉じる
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && navMenu.classList.contains('is-active')) {
        navToggle.classList.remove('is-open');
        navMenu.classList.remove('is-active');
        body.style.overflow = '';
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ------------------------------------------------------------------
   * 3. アクティブナビゲーションリンクの設定
   *    現在のページのURLを元に、対応するリンクに .active クラスを付与
   * ------------------------------------------------------------------ */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkFile = href.split('/').pop();
    const isActive =
      linkFile === currentPath ||
      (currentPath === '' && linkFile === 'index.html') ||
      (currentPath === 'index.html' && linkFile === 'index.html');
    link.classList.toggle('active', isActive);
  });

  /* ------------------------------------------------------------------
   * 4. カウントアップアニメーション
   *    .metric-number または data-count 属性を持つ要素に対して実行
   *    IntersectionObserver で画面内に入ったタイミングで開始
   * ------------------------------------------------------------------ */
  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

  function countUp(el, target, duration = 2000, isFloat = false, decimalPlaces = 1) {
    const startTime = performance.now();
    const startVal = 0;

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      const current = startVal + (target - startVal) * eased;

      if (isFloat) {
        el.textContent = current.toFixed(decimalPlaces);
      } else {
        // 3桁区切りカンマ
        el.textContent = Math.floor(current).toLocaleString('ja-JP');
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        // 最終値を正確に表示
        if (isFloat) {
          el.textContent = target.toFixed(decimalPlaces);
        } else {
          el.textContent = target.toLocaleString('ja-JP');
        }
      }
    };
    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || entry.target.dataset.counted) return;
      entry.target.dataset.counted = 'true';

      const el = entry.target;
      const raw = el.dataset.count;
      if (!raw) return;

      const isFloat = raw.includes('.');
      const value = parseFloat(raw);
      countUp(el, value, 2000, isFloat, isFloat ? (raw.split('.')[1] || '').length : 0);
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('[data-count]').forEach(el => {
    counterObserver.observe(el);
  });

  /* ------------------------------------------------------------------
   * 5. スクロールフェードインアニメーション
   *    .fade-in クラスを持つ要素が画面内に入ったらアニメーション実行
   * ------------------------------------------------------------------ */
  const style = document.createElement('style');
  style.textContent = `
    .fade-in {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .fade-in.is-visible {
      opacity: 1;
      transform: translateY(0);
    }
    .fade-in.delay-1 { transition-delay: 0.1s; }
    .fade-in.delay-2 { transition-delay: 0.2s; }
    .fade-in.delay-3 { transition-delay: 0.3s; }
    .fade-in.delay-4 { transition-delay: 0.4s; }
    .fade-in.delay-5 { transition-delay: 0.5s; }
  `;
  document.head.appendChild(style);

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => {
    fadeObserver.observe(el);
  });

  /* ------------------------------------------------------------------
   * 6. お問い合わせフォーム バリデーション & 送信完了メッセージ
   *    フォームの id が "contactForm" または "contactFormTop" の場合に動作
   * ------------------------------------------------------------------ */
  const contactForms = document.querySelectorAll('.contact-form-js');

  contactForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // 簡易バリデーション
      let isValid = true;
      const requiredFields = form.querySelectorAll('[required]');
      requiredFields.forEach(field => {
        const wrapper = field.closest('.form-group') || field.parentElement;
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#EF4444';
          field.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.15)';
        } else {
          field.style.borderColor = '';
          field.style.boxShadow = '';
        }
      });

      // チェックボックス確認（プライバシーポリシー）
      const privacyCheck = form.querySelector('[name="privacy"]');
      if (privacyCheck && !privacyCheck.checked) {
        isValid = false;
        const lbl = privacyCheck.closest('.form-check') || privacyCheck.parentElement;
        lbl.style.color = '#EF4444';
        setTimeout(() => { lbl.style.color = ''; }, 2500);
      }

      if (!isValid) {
        showFormMessage(form, 'error', '入力必須項目を確認してください。プライバシーポリシーへの同意もお願いします。');
        return;
      }

      // 送信ボタンをローディング状態に
      const submitBtn = form.querySelector('[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = '送信中...';
      submitBtn.disabled = true;

      // 擬似的な送信処理（実際のAPIに差し替え可能）
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        form.reset();
        showFormMessage(form, 'success',
          '✅ お問い合わせを受け付けました。担当者より2営業日以内にご連絡いたします。ありがとうございました。'
        );
      }, 1200);
    });

    // 入力時にエラースタイルをリセット
    form.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('input', () => {
        field.style.borderColor = '';
        field.style.boxShadow = '';
      });
    });
  });

  function showFormMessage(form, type, text) {
    // 既存メッセージを削除
    const existing = form.querySelector('.form-status-msg');
    if (existing) existing.remove();

    const msg = document.createElement('div');
    msg.className = `form-status-msg ${type}`;
    msg.textContent = text;
    form.appendChild(msg);

    // スムーズにスクロール
    msg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // 成功時は8秒後に自動消去
    if (type === 'success') {
      setTimeout(() => { msg.style.opacity = '0'; setTimeout(() => msg.remove(), 500); }, 8000);
    }
  }

  /* ------------------------------------------------------------------
   * 7. サービスページ：タブ切り替え（オプション）
   * ------------------------------------------------------------------ */
  const tabBtns = document.querySelectorAll('[data-tab-target]');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tabTarget;
      document.querySelectorAll('[data-tab-panel]').forEach(panel => {
        panel.style.display = panel.dataset.tabPanel === target ? 'block' : 'none';
      });
      document.querySelectorAll('[data-tab-target]').forEach(b => {
        b.classList.toggle('active', b.dataset.tabTarget === target);
      });
    });
  });

  /* ------------------------------------------------------------------
   * 8. 採用情報ページ：アコーディオン（職種詳細の展開/格納）
   * ------------------------------------------------------------------ */
  document.querySelectorAll('.job-card-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.job-card');
      const detail = card.querySelector('.job-card-detail');
      if (!detail) return;

      const isOpen = detail.classList.toggle('is-open');
      detail.style.maxHeight = isOpen ? detail.scrollHeight + 'px' : '0';
      btn.textContent = isOpen ? '詳細を閉じる ▲' : '詳細を見る ▼';
    });
  });

  // アコーディオン用スタイル
  const accStyle = document.createElement('style');
  accStyle.textContent = `
    .job-card-detail {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .job-card-detail.is-open { overflow: visible; }
  `;
  document.head.appendChild(accStyle);

}); // end DOMContentLoaded
