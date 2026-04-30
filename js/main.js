/* ═══════════════════════════════════════════════════════════
   JORGE D. BALLESTERO — MAIN.JS
   Theme toggle, scroll reveals, navigation, mobile menu
   ═══════════════════════════════════════════════════════════ */

   (function () {
    'use strict';

    // ── Theme Toggle ──
    const themeBtn = document.getElementById('theme-btn');
    const html = document.documentElement;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    }

    themeBtn.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });

    // ── Scroll-triggered reveal ──
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // ── Staggered children reveal ──
    const revealChildrenEls = document.querySelectorAll('.reveal-children');
    const childrenObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                childrenObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    revealChildrenEls.forEach(el => childrenObserver.observe(el));

    // ── Nav scroll effect ──
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.pageYOffset > 40);
    }, { passive: true });

    // ── Mobile menu ──
    const hamburger = document.getElementById('hamburger');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        mobileOverlay.classList.toggle('open');
        document.body.style.overflow = mobileOverlay.classList.contains('open') ? 'hidden' : '';
    }

    hamburger.addEventListener('click', toggleMobileMenu);
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileOverlay.classList.contains('open')) toggleMobileMenu();
        });
    });

    // ── Smooth scroll ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // ── Active nav highlighting ──
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        const scrollPos = window.pageYOffset + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + section.offsetHeight) {
                navLinksAll.forEach(link => {
                    link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--text-primary)' : '';
                });
            }
        });
    }, { passive: true });

})();