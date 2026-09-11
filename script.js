/* Alex Carter — Portfolio interactions */
(function () {
  'use strict';

  /* ---- Mobile navigation ---- */
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    menu.classList.toggle('open');
  });

  menu.querySelectorAll('.nav__link').forEach(link =>
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      menu.classList.remove('open');
    })
  );

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll('.reveal, .skill');
  const io = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach(el => io.observe(el));

  /* ---- Animated stat counters ---- */
  const counters = document.querySelectorAll('.stat__num');
  const counterIO = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        counterIO.unobserve(el);
        const target = +el.dataset.count;
        const duration = 1400;
        const start = performance.now();
        const tick = now => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(eased * target);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach(c => counterIO.observe(c));

  /* ---- Navbar background on scroll ---- */
  const nav = document.getElementById('nav');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      nav.style.background = window.scrollY > 40
        ? 'rgba(10,10,18,0.92)'
        : 'rgba(10,10,18,0.7)';
      ticking = false;
    });
  });

  /* ---- Contact form (demo handling) ---- */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    status.className = 'form__status';
    if (!name || !email || !message) {
      status.textContent = 'Please fill in your name, email, and message.';
      status.classList.add('err');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.textContent = 'Please enter a valid email address.';
      status.classList.add('err');
      return;
    }
    status.textContent = `Thanks, ${name}! Your message has been sent — I'll reply within 24 hours.`;
    status.classList.add('ok');
    form.reset();
  });
})();