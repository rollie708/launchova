/* ==========================================================================
   LAUNCHOVA — Interactions
   Scroll reveal, mobile nav, FAQ accordion, discovery tabs, active states.
   ========================================================================== */
(function(){
  'use strict';

  // --- Scroll reveal ---
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // --- Staggered reveal for process items ---
  const processObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const items = entry.target.querySelectorAll('.process-item');
        items.forEach((item, i) => {
          setTimeout(() => item.classList.add('in'), i * 140);
        });
        processObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -100px 0px' });

  const processSection = document.querySelector('.process');
  if(processSection) processObserver.observe(processSection);

  // --- Mobile navigation ---
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navClose = document.querySelector('.nav-close');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

  function closeMenu(){
    if(mobileMenu) mobileMenu.classList.remove('open');
    if(menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
  }

  if(menuBtn && mobileMenu){
    menuBtn.addEventListener('click', () => {
      const open = !mobileMenu.classList.contains('open');
      mobileMenu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open);
    });
  }

  if(navClose){
    navClose.addEventListener('click', closeMenu);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if(window.innerWidth < 700) closeMenu();
    });
  });

  // Close mobile menu on escape
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closeMenu();
  });

  // --- Active nav link on scroll ---
  const sections = document.querySelectorAll('section[id]');
  const headerLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  function setActiveLink(){
    let current = '';
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const headerHeight = 80;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight;
      const sectionBottom = sectionTop + section.offsetHeight;
      if(scrollY >= sectionTop && scrollY < sectionBottom){
        current = section.getAttribute('id');
      }
    });

    headerLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  window.addEventListener('load', setActiveLink);

  // --- FAQ accordion ---
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close others
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
      });

      if(!isOpen){
        item.classList.add('open');
      }
    });
  });

  // --- Discovery tabs ---
  const tabs = document.querySelectorAll('.discovery-tab');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // --- Illustrative labels: subtle pulse ---
  document.querySelectorAll('.illustrative-label').forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.opacity = '0.8';
      el.style.borderColor = 'rgba(255,255,255,0.35)';
    });
    el.addEventListener('mouseleave', () => {
      el.style.opacity = '';
      el.style.borderColor = '';
    });
  });

  // --- Year in footer ---
  const yr = document.getElementById('yr');
  if(yr) yr.textContent = new Date().getFullYear();

  // --- Navbar blur on scroll ---
  const nav = document.querySelector('.nav');
  if(nav){
    window.addEventListener('scroll', () => {
      if(window.scrollY > 40){
        nav.style.background = 'rgba(4,4,6,0.82)';
      } else {
        nav.style.background = 'rgba(4,4,6,0.72)';
      }
    }, { passive: true });
  }

})();
