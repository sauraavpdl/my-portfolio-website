/* script.js */

// ── NAVBAR: scrolled state & active link ──────────────────────
const navbar = document.getElementById('navbar');
const navLinkEls = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

function updateNav() {
  // Scrolled border
  navbar.classList.toggle('scrolled', window.scrollY > 20);

  // Active link highlight
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  navLinkEls.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ── MOBILE HAMBURGER ──────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinkEls.forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── TYPEWRITER ────────────────────────────────────────────────
const phrases = [
  'QA Engineer.',
  'Bug Hunter.',
  'Test Automation Fan.',
  'Quality Advocate.',
];

let pIndex = 0;
let cIndex = 0;
let deleting = false;
const typedEl = document.getElementById('typedText');

function type() {
  const phrase = phrases[pIndex];

  if (!deleting) {
    typedEl.textContent = phrase.slice(0, ++cIndex);
    if (cIndex === phrase.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typedEl.textContent = phrase.slice(0, --cIndex);
    if (cIndex === 0) {
      deleting = false;
      pIndex = (pIndex + 1) % phrases.length;
    }
  }

  setTimeout(type, deleting ? 55 : 95);
}

type();

// ── SCROLL REVEAL ─────────────────────────────────────────────
const revealEls = document.querySelectorAll(
  '.about-text, .about-cards, .role-card, .skill-group, .project-card, .contact-container'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach(el => revealObserver.observe(el));

// ── ANIMATED COUNTERS ─────────────────────────────────────────
const statNums = document.querySelectorAll('.stat-num');

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1200;
  const step = target / (duration / 16);
  let current = 0;

  const tick = () => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current) + '+';
    if (current < target) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

statNums.forEach(el => counterObserver.observe(el));

// ── CONTACT FORM ──────────────────────────────────────────────
const form        = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', e => {
  e.preventDefault();

  const name    = form.name.value.trim();
  const email   = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) return;

  // Simulate send (replace with real fetch/emailjs/formspree etc.)
  const btn = form.querySelector('.submit-btn');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    form.reset();
    btn.textContent = 'Send Message';
    btn.disabled = false;
    formSuccess.style.display = 'block';
    setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
  }, 1200);
});