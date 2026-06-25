(function () {
  "use strict";

  /* ----------------------------------------------------
     SMOOTH SCROLL FOR ALL IN-PAGE ANCHOR LINKS
  ---------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', id);
    });
  });

  /* ----------------------------------------------------
     SKILLS ACCORDION — EXPAND / COLLAPSE
  ---------------------------------------------------- */
  document.querySelectorAll('[data-skill-category]').forEach(function (category) {
    var header = category.querySelector('.skill-category-header');
    header.addEventListener('click', function () {
      var isOpen = category.classList.contains('is-open');

      document.querySelectorAll('[data-skill-category]').forEach(function (other) {
        if (other !== category) {
          other.classList.remove('is-open');
          other.querySelector('.skill-category-header').setAttribute('aria-expanded', 'false');
        }
      });

      category.classList.toggle('is-open', !isOpen);
      header.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  /* ----------------------------------------------------
     SCROLL REVEAL — IntersectionObserver
  ---------------------------------------------------- */
  var revealTargets = document.querySelectorAll('[data-reveal], [data-reveal-group]');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ----------------------------------------------------
     RESUME BUTTON FALLBACK
     If resume.pdf hasn't been added yet, gracefully scroll
     to the resume section instead of a broken download.
  ---------------------------------------------------- */
  document.querySelectorAll('[data-resume-download], [data-resume-view]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      fetch(btn.getAttribute('href'), { method: 'HEAD' })
        .then(function (res) {
          if (!res.ok) throw new Error('missing');
        })
        .catch(function () {
          e.preventDefault();
          var resumeSection = document.querySelector('#resume');
          if (resumeSection) resumeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
  });

  /* ----------------------------------------------------
     NAVBAR — SUBTLE SCROLLED STATE
  ---------------------------------------------------- */
  var navbarInner = document.querySelector('.navbar-inner');
  if (navbarInner) {
    window.addEventListener('scroll', function () {
      navbarInner.style.boxShadow = window.scrollY > 40
        ? '0 12px 32px rgba(0,0,0,0.35)'
        : 'none';
    }, { passive: true });
  }

  const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if(menuToggle && navLinks){

    menuToggle.addEventListener('click', function(){

    navLinks.classList.toggle('active');

    navbarInner.classList.toggle('menu-open');

});

document.querySelectorAll('.nav-links a').forEach(function(link){

    link.addEventListener('click', function(){

        navLinks.classList.remove('active');
        navbarInner.classList.remove('menu-open');

    });

});

}

/* ----------------------------------------------------
   ACTIVE NAV LINK (SCROLL SPY)
---------------------------------------------------- */

const sections = document.querySelectorAll("section[id], header[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", function () {

    let current = "";

    sections.forEach(function(section){

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if(window.scrollY >= sectionTop){
            current = section.getAttribute("id");
        }

    });

    navItems.forEach(function(link){

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){
            link.classList.add("active");
        }

    });

});

})();