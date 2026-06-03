/* =============================================
   JORGE ESTRATEGA — JAVASCRIPT PRINCIPAL
   ============================================= */

// ─── FADE IN AL SCROLL ────────────────────────
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// ─── NAVBAR SCROLL ────────────────────────────
const nav = document.querySelector('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

// ─── HAMBURGER MENU ───────────────────────────
const hamburger = document.querySelector('.nav-hamburger');
const navMobile = document.querySelector('.nav-mobile');

if (hamburger && navMobile) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMobile.classList.toggle('open');
    const isOpen = navMobile.classList.contains('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Cerrar al hacer clic en un enlace
  navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMobile.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

// ─── CONTADOR ANIMADO ─────────────────────────
function animateCounter(el, target, suffix = '', prefix = '') {
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = prefix + current.toLocaleString('es-CO') + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      animateCounter(el, target, suffix, prefix);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));

// ─── FAQ ACORDEÓN ─────────────────────────────
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');

    // Cerrar todos
    document.querySelectorAll('.faq-item.open').forEach(openItem => {
      openItem.classList.remove('open');
      openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });

    // Abrir el clickeado (si no estaba abierto)
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// ─── SMOOTH SCROLL PARA ANCHORS ───────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── FORMULARIO DE CONTACTO ───────────────────
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    // Simular envío (reemplazar con lógica real)
    setTimeout(() => {
      btn.textContent = '¡Mensaje enviado!';
      btn.style.background = '#27ae60';
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.disabled = false;
        contactForm.reset();
      }, 3000);
    }, 1000);
  });
}

// ─── ACTIVE LINK EN NAVBAR ────────────────────
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
  const linkPath = link.getAttribute('href') || '';
  if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
    link.style.color = '#fff';
    link.style.fontWeight = '600';
  }
});
