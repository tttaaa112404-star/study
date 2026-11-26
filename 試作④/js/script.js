/**
 * Trattoria SOLE（トラットリア ソーレ）公式Webサイト
 * 共通JavaScript（js/script.js）
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. ヘッダーのスクロール制御（透過から背景表示への切り替え）
     ========================================================================== */
  const header = document.getElementById('site-header');
  const handleHeaderScroll = () => {
    if (!header) return;
    if (window.scrollY > 80) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll(); // 初回ロード時実行


  /* ==========================================================================
     2. モバイル用ハンバーガーメニュー開閉制御
     ========================================================================== */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileBackdrop = document.getElementById('mobile-backdrop');

  const openMobileMenu = () => {
    hamburgerBtn?.classList.add('is-active');
    hamburgerBtn?.setAttribute('aria-expanded', 'true');
    mobileDrawer?.classList.add('is-open');
    mobileBackdrop?.classList.add('is-visible');
    document.body.style.overflow = 'hidden'; // 背景スクロール固定
  };

  const closeMobileMenu = () => {
    hamburgerBtn?.classList.remove('is-active');
    hamburgerBtn?.setAttribute('aria-expanded', 'false');
    mobileDrawer?.classList.remove('is-open');
    mobileBackdrop?.classList.remove('is-visible');
    document.body.style.overflow = '';
  };

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = hamburgerBtn.classList.contains('is-active');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  // 背景クリックで閉じる
  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMobileMenu);
  }

  // ESCキーで閉じる
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer?.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });


  /* ==========================================================================
     3. カレントページのナビゲーションアクティブ自動判定
     ========================================================================== */
  const currentPath = window.location.pathname;
  const currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';

  const navLinks = document.querySelectorAll('.nav-links-list a, .mobile-nav-links a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const cleanHref = href.split('#')[0];
    if (cleanHref === currentFile || (currentFile === '' && cleanHref === 'index.html')) {
      link.classList.add('active');
    }
  });


  /* ==========================================================================
     4. スクロールフェードインアニメーション（Intersection Observer）
     ========================================================================== */
  const fadeElements = document.querySelectorAll('.fade-in-element');

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.12
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in-view');
          observer.unobserve(entry.target); // 一度表示されたら監視解除
        }
      });
    }, observerOptions);

    fadeElements.forEach(el => fadeObserver.observe(el));
  } else {
    // 古いブラウザ向けフォールバック
    fadeElements.forEach(el => el.classList.add('is-in-view'));
  }


  /* ==========================================================================
     5. 予約フォームのバリデーション ＆ 送信完了演出（reservation.html）
     ========================================================================== */
  const reserveForm = document.getElementById('reservation-form');
  const confirmationPanel = document.getElementById('reservation-confirmation');

  if (reserveForm) {
    const dateInput = document.getElementById('res-date');
    const timeInput = document.getElementById('res-time');
    const guestsInput = document.getElementById('res-guests');
    const nameInput = document.getElementById('res-name');
    const telInput = document.getElementById('res-tel');
    const emailInput = document.getElementById('res-email');
    const requestsInput = document.getElementById('res-requests');

    // 過去日付を選択できないよう、本日の日付を min 属性にセット
    if (dateInput) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      dateInput.min = `${yyyy}-${mm}-${dd}`;
    }

    // エラー表示のヘルパー関数
    const setFieldError = (inputElement, errorElementId, message) => {
      inputElement.classList.add('form-input-error');
      const errorMsgEl = document.getElementById(errorElementId);
      if (errorMsgEl) {
        errorMsgEl.textContent = message;
        errorMsgEl.style.display = 'block';
      }
    };

    const clearFieldError = (inputElement, errorElementId) => {
      inputElement.classList.remove('form-input-error');
      const errorMsgEl = document.getElementById(errorElementId);
      if (errorMsgEl) {
        errorMsgEl.textContent = '';
        errorMsgEl.style.display = 'none';
      }
    };

    // 各入力フィールドのリアルタイムエラークリア
    const inputsWithFeedback = [
      { input: dateInput, errorId: 'error-res-date' },
      { input: timeInput, errorId: 'error-res-time' },
      { input: guestsInput, errorId: 'error-res-guests' },
      { input: nameInput, errorId: 'error-res-name' },
      { input: telInput, errorId: 'error-res-tel' },
      { input: emailInput, errorId: 'error-res-email' }
    ];

    inputsWithFeedback.forEach(item => {
      if (item.input) {
        item.input.addEventListener('input', () => clearFieldError(item.input, item.errorId));
        item.input.addEventListener('change', () => clearFieldError(item.input, item.errorId));
      }
    });

    // フォーム送信時のチェック
    reserveForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let hasError = false;
      let firstErrorField = null;

      // 1. 日付チェック
      const dateVal = dateInput.value;
      if (!dateVal) {
        setFieldError(dateInput, 'error-res-date', 'ご希望日を選択してください。');
        hasError = true;
        firstErrorField = firstErrorField || dateInput;
      } else if (dateVal < dateInput.min) {
        setFieldError(dateInput, 'error-res-date', '本日以降の日付を選択してください。');
        hasError = true;
        firstErrorField = firstErrorField || dateInput;
      } else {
        clearFieldError(dateInput, 'error-res-date');
      }

      // 2. 時間チェック
      if (!timeInput.value) {
        setFieldError(timeInput, 'error-res-time', 'ご希望時間を選択してください。');
        hasError = true;
        firstErrorField = firstErrorField || timeInput;
      } else {
        clearFieldError(timeInput, 'error-res-time');
      }

      // 3. 人数チェック（1〜10名）
      const guestsVal = parseInt(guestsInput.value, 10);
      if (!guestsInput.value || isNaN(guestsVal) || guestsVal < 1 || guestsVal > 10) {
        setFieldError(guestsInput, 'error-res-guests', 'ご人数を1名〜10名から選択してください。');
        hasError = true;
        firstErrorField = firstErrorField || guestsInput;
      } else {
        clearFieldError(guestsInput, 'error-res-guests');
      }

      // 4. お名前チェック
      if (!nameInput.value.trim()) {
        setFieldError(nameInput, 'error-res-name', 'お名前を入力してください。');
        hasError = true;
        firstErrorField = firstErrorField || nameInput;
      } else {
        clearFieldError(nameInput, 'error-res-name');
      }

      // 5. 電話番号チェック（10〜11桁、ハイフン任意）
      const telPattern = /^(0\d{1,4}-?\d{1,4}-?\d{3,4}|0[789]0-?\d{4}-?\d{4})$/;
      const telVal = telInput.value.trim();
      if (!telVal) {
        setFieldError(telInput, 'error-res-tel', 'お電話番号を入力してください。');
        hasError = true;
        firstErrorField = firstErrorField || telInput;
      } else if (!telPattern.test(telVal)) {
        setFieldError(telInput, 'error-res-tel', '正しい電話番号の形式で入力してください（例：090-1234-5678）。');
        hasError = true;
        firstErrorField = firstErrorField || telInput;
      } else {
        clearFieldError(telInput, 'error-res-tel');
      }

      // 6. メールアドレスチェック
      const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      const emailVal = emailInput.value.trim();
      if (!emailVal) {
        setFieldError(emailInput, 'error-res-email', 'メールアドレスを入力してください。');
        hasError = true;
        firstErrorField = firstErrorField || emailInput;
      } else if (!emailPattern.test(emailVal)) {
        setFieldError(emailInput, 'error-res-email', '有効なメールアドレスの形式で入力してください。');
        hasError = true;
        firstErrorField = firstErrorField || emailInput;
      } else {
        clearFieldError(emailInput, 'error-res-email');
      }

      // エラーがある場合は最初の入力欄へフォーカスして終了
      if (hasError) {
        firstErrorField?.focus();
        return;
      }

      // 正常入力時：確認メッセージ演出の表示
      const summaryDate = document.getElementById('summary-date');
      const summaryTime = document.getElementById('summary-time');
      const summaryGuests = document.getElementById('summary-guests');
      const summaryName = document.getElementById('summary-name');
      const summaryTel = document.getElementById('summary-tel');
      const summaryEmail = document.getElementById('summary-email');

      if (summaryDate) summaryDate.textContent = dateInput.value;
      if (summaryTime) summaryTime.textContent = timeInput.value;
      if (summaryGuests) summaryGuests.textContent = `${guestsInput.value} 名様`;
      if (summaryName) summaryName.textContent = nameInput.value;
      if (summaryTel) summaryTel.textContent = telInput.value;
      if (summaryEmail) summaryEmail.textContent = emailInput.value;

      reserveForm.style.display = 'none';
      if (confirmationPanel) {
        confirmationPanel.style.display = 'block';
        confirmationPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

});
