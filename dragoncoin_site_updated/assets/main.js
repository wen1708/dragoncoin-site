// =========================================================
// DragonCoin Whitepaper Enhancements
// Back-to-Top Button + Scroll Reveal Animation
// =========================================================

(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ==== 回到顶部按钮 ====
  const toTopBtn = document.createElement('button');
  toTopBtn.id = 'toTopBtn';
  toTopBtn.setAttribute('aria-label', 'Back to top');
  toTopBtn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 5l7 7-1.4 1.4L13 9.8V20h-2V9.8L6.4 13.4 5 12z"/>
    </svg>
    <span class="mono" style="font-size:13px">Top</span>
  `;
  document.body.appendChild(toTopBtn);

  const showAt = 400;
  const toggleTopBtn = () => {
    if (window.scrollY > showAt) {
      toTopBtn.classList.add('show');
    } else {
      toTopBtn.classList.remove('show');
    }
  };
  toggleTopBtn();
  window.addEventListener('scroll', toggleTopBtn, { passive: true });

  toTopBtn.addEventListener('click', () => {
    if (prefersReduced) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // ==== 滚动淡入动画 ====
  const hero = document.querySelector('.hero');
  const sections = document.querySelectorAll('.whitepaper-content > section');

  if (hero) hero.classList.add('reveal');
  sections.forEach(sec => sec.classList.add('reveal'));

  if (prefersReduced) {
    if (hero) hero.classList.add('show');
    sections.forEach(sec => sec.classList.add('show'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        io.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.08
  });

  if (hero) io.observe(hero);
  sections.forEach(sec => io.observe(sec));
})();
