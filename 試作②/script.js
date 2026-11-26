/* ============================================================
   Hair Salon RICHE — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------
       1. 現在ページのナビゲーションアクティブ化
       -------------------------------------------------- */
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.header__menu-link, .mobile-nav__link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage) {
        link.classList.add('is-active');
      } else if (currentPage === '' && href === 'index.html') {
        link.classList.add('is-active');
      }
    });

    /* --------------------------------------------------
       2. ヘッダースクロール変化（縮小 ＆ 透過背景ぼかし）
       -------------------------------------------------- */
    const header = document.querySelector('.header');
    if (header) {
      const handleScroll = () => {
        header.classList.toggle('is-scrolled', window.scrollY > 30);
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    }

    /* --------------------------------------------------
       3. スマホ用ハンバーガーメニュー＆ドロワー
       -------------------------------------------------- */
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');

        if (hamburger && mobileNav) {
          const toggleMenu = (open) => {
            const isOpen = typeof open === 'boolean' ? open : !hamburger.classList.contains('is-active');
            hamburger.classList.toggle('is-active', isOpen);
            mobileNav.classList.toggle('is-open', isOpen);
            document.body.classList.toggle('is-locked', isOpen);
          };

          hamburger.addEventListener('click', () => toggleMenu());

          // ドロワー内のリンククリック時にメニューを閉じる
          mobileNav.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('click', () => {
              toggleMenu(false);
            });
          });
            }

  /* --------------------------------------------------
     4. ヒーロースライダー（トップページ用 自動スライドショー）
     -------------------------------------------------- */
  const slides = document.querySelectorAll('.hero__slide');
            if (slides.length > 1) {
              let currentSlide = 0;
              const intervalMs = 5500;

              setInterval(() => {
                slides[currentSlide].classList.remove('is-active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('is-active');
              }, intervalMs);
            }

            /* --------------------------------------------------
               5. スクロールフェードイン（IntersectionObserver）
               -------------------------------------------------- */
            const fadeElements = document.querySelectorAll('.fade-in');
            if (fadeElements.length && 'IntersectionObserver' in window) {
              const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                  if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                  }
                });
              }, {
                root: null,
                threshold: 0.15,
                rootMargin: '0px 0px -40px 0px'
              });

              fadeElements.forEach(el => observer.observe(el));
            } else {
              // 未対応ブラウザ用フォールバック
              fadeElements.forEach(el => el.classList.add('is-visible'));
            }

                    /* --------------------------------------------------
                       6. 自社WEB予約モーダル制御
                       -------------------------------------------------- */
                    const modalOverlay = document.getElementById('webReservationModal');
                    const modalCloseBtn = modalOverlay ? modalOverlay.querySelector('.modal-close') : null;
                    const reserveButtons = document.querySelectorAll('[data-open-modal="reservation"]');
                    const stylistSelect = document.getElementById('reserveStylist');
                    const reservationForm = document.getElementById('reservationForm');

                    if (modalOverlay) {
                      // モーダルを開く
                      const openModal = (stylistName = '') => {
                        if (stylistSelect && stylistName) {
                          // スタイリスト指名ボタンから開いた場合、該当スタイリストを自動選択
                          const options = Array.from(stylistSelect.options);
                          const match = options.find(opt => opt.value === stylistName || opt.text.includes(stylistName));
                          if (match) {
                            stylistSelect.value = match.value;
                          }
                        }
                        modalOverlay.classList.add('is-active');
                        document.body.classList.add('is-locked');
                      };

                      // モーダルを閉じる
                      const closeModal = () => {
                        modalOverlay.classList.remove('is-active');
                        // ハンバーガーが開いていなければロック解除
                        if (!mobileNav || !mobileNav.classList.contains('is-open')) {
                          document.body.classList.remove('is-locked');
                        }
                      };

                      // 予約ボタン群にイベント付与
                      reserveButtons.forEach(btn => {
                        btn.addEventListener('click', (e) => {
                          e.preventDefault();
                          const stylistName = btn.getAttribute('data-stylist') || '';
                          openModal(stylistName);
                        });
                    });

                // 閉じるボタン
                if (modalCloseBtn) {
                  modalCloseBtn.addEventListener('click', closeModal);
                }

                // モーダル外側（背景）クリックで閉じる
                modalOverlay.addEventListener('click', (e) => {
                  if (e.target === modalOverlay) {
                    closeModal();
                  }
                });

                // ESCキーで閉じる
                window.addEventListener('keydown', (e) => {
                  if (e.key === 'Escape' && modalOverlay.classList.contains('is-active')) {
                    closeModal();
                  }
                });

                // 予約フォーム送信ハンドラ（送信完了デモ）
                if (reservationForm) {
                  reservationForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const submitBtn = reservationForm.querySelector('.form-submit-btn');
                    const originalText = submitBtn.textContent;
                    submitBtn.disabled = true;
                    submitBtn.textContent = '予約リクエスト送信中...';

                    setTimeout(() => {
                      alert('予約リクエストを受け付けました。当サロンからの確認メールをお待ちください。（※デモ動作用）');
                      reservationForm.reset();
                      submitBtn.disabled = false;
                      submitBtn.textContent = originalText;
                      closeModal();
                    }, 800);
                  });
                }
              }

});
