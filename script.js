/* =========================================================
   MD. SABBIR HOSEN — PORTFOLIO SCRIPT
   Organized in logical sections. All editable content lives
   in the CONFIG block below so it can be updated in one place.
   ========================================================= */

/* ============ CONFIG (EDIT HERE) ============ */

// Add or edit skills. percentage is only shown once verified —
// keep isPlaceholder:true until real levels are confirmed.
const skills = [
  { name: "Digital Skills", level: "Developing", percentage: 40, icon: "fa-solid fa-laptop-code", isPlaceholder: true },
  { name: "Creative Skills", level: "Developing", percentage: 45, icon: "fa-solid fa-palette", isPlaceholder: true },
  { name: "Communication", level: "Developing", percentage: 50, icon: "fa-solid fa-comments", isPlaceholder: true },
  { name: "Online Work", level: "Developing", percentage: 35, icon: "fa-solid fa-globe", isPlaceholder: true },
  { name: "Learning & Development", level: "Developing", percentage: 55, icon: "fa-solid fa-seedling", isPlaceholder: true }
];

// Add or edit services offered.
const services = [
  { title: "Digital Services", description: "General digital support and freelance work, tailored to each project's needs.", icon: "fa-solid fa-display" },
  { title: "Creative Work", description: "Creative tasks and content built around a client's specific goals.", icon: "fa-solid fa-wand-magic-sparkles" },
  { title: "Online Projects", description: "Project-based online work, coordinated remotely from start to finish.", icon: "fa-solid fa-diagram-project" },
  { title: "Custom Projects", description: "Open to discussing custom project requests — details available on request.", icon: "fa-solid fa-gears" }
];

// Add real projects here as they're verified. Leave empty to show the empty state.
const projects = [
  // { title: "", description: "", image: "assets/images/sabbir-01.jpg", tags: [], link: "" }
];

// Add real certificates here. Leave empty to auto-hide the section.
const certificates = [
  // { title: "", organization: "", year: "", image: "", verificationLink: "" }
];

// Gallery images already rendered in index.html; listed here for the lightbox.
const galleryImages = [
  { src: "assets/images/sabbir-01.jpg", alt: "MD. Sabbir Hosen — gallery photo 1" },
  { src: "assets/images/sabbir-02.jpg", alt: "MD. Sabbir Hosen — gallery photo 2" },
  { src: "assets/images/sabbir-03.jpg", alt: "MD. Sabbir Hosen — gallery photo 3" },
  { src: "assets/images/sabbir-04.jpg", alt: "MD. Sabbir Hosen — gallery photo 4" },
  { src: "assets/images/sabbir-05.jpg", alt: "MD. Sabbir Hosen — gallery photo 5" },
  { src: "assets/images/sabbir-06.jpg", alt: "MD. Sabbir Hosen — gallery photo 6" },
  { src: "assets/images/sabbir-07.jpg", alt: "MD. Sabbir Hosen — gallery photo 7" },
  { src: "assets/images/sabbir-08.jpg", alt: "MD. Sabbir Hosen — gallery photo 8" },
  { src: "assets/images/sabbir-09.jpg", alt: "MD. Sabbir Hosen — gallery photo 9" },
  { src: "assets/images/sabbir-10.jpg", alt: "MD. Sabbir Hosen — gallery photo 10" }
];

const typingWords = ["Freelancer", "Student", "Digital Creator", "Creative Professional"];

/* ============ STATE ============ */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initMobileMenu();
  initActiveSection();
  initTypingEffect();
  initScrollReveal();
  renderSkills();
  renderServices();
  renderProjects();
  renderCertificates();
  initGalleryLightbox();
  initContactMenu();
  initBackToTop();
  initParticles();
});

/* ============ NAVIGATION ============ */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ============ MOBILE MENU ============ */
function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("mobileMenu");
  const backdrop = document.getElementById("mobileBackdrop");
  const links = menu.querySelectorAll("[data-nav-mobile]");

  function openMenu() {
    menu.classList.add("open");
    backdrop.classList.add("open");
    hamburger.classList.add("open");
    hamburger.setAttribute("aria-expanded", "true");
    menu.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    menu.classList.remove("open");
    backdrop.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  hamburger.addEventListener("click", () => {
    menu.classList.contains("open") ? closeMenu() : openMenu();
  });
  backdrop.addEventListener("click", closeMenu);
  links.forEach(link => link.addEventListener("click", closeMenu));
  window.addEventListener("keydown", e => {
    if (e.key === "Escape" && menu.classList.contains("open")) closeMenu();
  });
}

/* ============ ACTIVE SECTION DETECTION ============ */
function initActiveSection() {
  const sections = document.querySelectorAll("main > section[id]");
  const navLinks = document.querySelectorAll("[data-nav]");
  const mobileLinks = document.querySelectorAll("[data-nav-mobile]");

  const setActive = id => {
    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
    mobileLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach(section => observer.observe(section));
}

/* ============ TYPING EFFECT ============ */
function initTypingEffect() {
  const el = document.getElementById("typingText");
  if (!el) return;

  if (prefersReducedMotion) {
    el.textContent = typingWords[0];
    return;
  }

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;
  const typeSpeed = 90;
  const deleteSpeed = 45;
  const holdTime = 1400;
  const maxLoops = typingWords.length * 2; // avoid an annoying infinite loop
  let loops = 0;

  function tick() {
    const word = typingWords[wordIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = word.slice(0, charIndex);
      if (charIndex === word.length) {
        if (loops >= maxLoops) return;
        deleting = true;
        setTimeout(tick, holdTime);
        return;
      }
      setTimeout(tick, typeSpeed);
    } else {
      charIndex--;
      el.textContent = word.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % typingWords.length;
        loops++;
        if (loops >= maxLoops) {
          el.textContent = typingWords[typingWords.length - 1];
          return;
        }
        setTimeout(tick, 300);
        return;
      }
      setTimeout(tick, deleteSpeed);
    }
  }
  tick();
}

/* ============ SCROLL REVEAL ============ */
function initScrollReveal() {
  const targets = document.querySelectorAll("[data-reveal]");
  if (prefersReducedMotion) {
    targets.forEach(t => t.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach(t => observer.observe(t));
}

/* ============ SKILLS ============ */
function renderSkills() {
  const grid = document.getElementById("skillsGrid");
  if (!grid) return;

  grid.innerHTML = skills.map(skill => `
    <div class="skill-card" data-reveal>
      <div class="skill-top">
        <span class="skill-icon"><i class="${skill.icon}"></i></span>
        <div>
          <div class="skill-name">${skill.name}</div>
          <div class="skill-level">${skill.level}${skill.isPlaceholder ? " · placeholder" : ""}</div>
        </div>
      </div>
      <div class="skill-bar-track">
        <div class="skill-bar-fill" data-target="${skill.percentage}"></div>
      </div>
    </div>
  `).join("");

  // re-run reveal for newly injected nodes
  initScrollReveal();

  const bars = grid.querySelectorAll(".skill-bar-fill");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = `${bar.dataset.target}%`;
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.4 });
  bars.forEach(bar => observer.observe(bar));
}

/* ============ SERVICES ============ */
function renderServices() {
  const grid = document.getElementById("servicesGrid");
  if (!grid) return;

  grid.innerHTML = services.map(service => `
    <div class="service-card" data-reveal>
      <span class="service-icon"><i class="${service.icon}"></i></span>
      <h3>${service.title}</h3>
      <p>${service.description}</p>
    </div>
  `).join("");

  initScrollReveal();
}

/* ============ PROJECTS ============ */
function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  if (!projects.length) {
    grid.innerHTML = `
      <div class="empty-state" data-reveal>
        <i class="fa-solid fa-hammer"></i>
        <p>Projects are currently being prepared.</p>
      </div>
    `;
    initScrollReveal();
    return;
  }

  grid.innerHTML = projects.map(project => `
    <div class="project-card" data-reveal>
      <img src="${project.image}" alt="${project.title}" loading="lazy">
      <div class="project-body">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tags">
          ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join("")}
        </div>
        ${project.link ? `<a href="${project.link}" class="project-link" target="_blank" rel="noopener">View project <i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : ""}
      </div>
    </div>
  `).join("");

  initScrollReveal();
}

/* ============ CERTIFICATES ============ */
function renderCertificates() {
  const section = document.getElementById("certificates");
  const grid = document.getElementById("certificatesGrid");
  if (!section || !grid) return;

  if (!certificates.length) {
    section.classList.add("is-hidden");
    return;
  }

  grid.innerHTML = certificates.map(cert => `
    <div class="certificate-card" data-reveal>
      <img src="${cert.image}" alt="${cert.title}" loading="lazy">
      <div>
        <h3>${cert.title}</h3>
        <p>${cert.organization}${cert.year ? " · " + cert.year : ""}</p>
      </div>
    </div>
  `).join("");

  initScrollReveal();
}

/* ============ GALLERY / LIGHTBOX ============ */
function initGalleryLightbox() {
  const items = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const counter = document.getElementById("lightboxCounter");
  const closeBtn = document.getElementById("lightboxClose");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");

  if (!items.length || !lightbox) return;

  let currentIndex = 0;
  let lastFocused = null;

  function pad(n) { return String(n).padStart(2, "0"); }

  function updateImage() {
    const img = galleryImages[currentIndex];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    counter.textContent = `${pad(currentIndex + 1)} / ${pad(galleryImages.length)}`;
  }

  function openLightbox(index) {
    currentIndex = index;
    lastFocused = document.activeElement;
    updateImage();
    lightbox.hidden = false;
    requestAnimationFrame(() => lightbox.classList.add("show"));
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("show");
    document.body.style.overflow = "";
    setTimeout(() => { lightbox.hidden = true; }, 350);
    if (lastFocused) lastFocused.focus();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    updateImage();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    updateImage();
  }

  items.forEach(item => {
    item.addEventListener("click", () => {
      openLightbox(Number(item.dataset.index));
    });
  });

  closeBtn.addEventListener("click", closeLightbox);
  nextBtn.addEventListener("click", showNext);
  prevBtn.addEventListener("click", showPrev);

  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });

  window.addEventListener("keydown", e => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });

  // swipe support
  let touchStartX = 0;
  lightbox.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener("touchend", e => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? showPrev() : showNext();
    }
  }, { passive: true });
}

/* ============ FLOATING CONTACT MENU ============ */
function initContactMenu() {
  const btn = document.getElementById("floatingBtn");
  const menu = document.getElementById("floatingMenu");
  if (!btn || !menu) return;

  function toggleMenu(force) {
    const open = force !== undefined ? force : !menu.classList.contains("open");
    menu.classList.toggle("open", open);
    btn.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-hidden", String(!open));
  }

  btn.addEventListener("click", e => {
    e.stopPropagation();
    toggleMenu();
  });

  document.addEventListener("click", e => {
    if (menu.classList.contains("open") && !menu.contains(e.target) && e.target !== btn) {
      toggleMenu(false);
    }
  });

  window.addEventListener("keydown", e => {
    if (e.key === "Escape" && menu.classList.contains("open")) toggleMenu(false);
  });
}

/* ============ BACK TO TOP ============ */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  const onScroll = () => {
    btn.classList.toggle("show", window.scrollY > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });
}

/* ============ AMBIENT PARTICLES ============ */
function initParticles() {
  const container = document.getElementById("particles");
  if (!container || prefersReducedMotion) return;

  const count = window.innerWidth < 768 ? 14 : 26;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.bottom = `${Math.random() * 20 - 10}%`;
    particle.style.animationDuration = `${14 + Math.random() * 16}s`;
    particle.style.animationDelay = `${Math.random() * 12}s`;
    fragment.appendChild(particle);
  }
  container.appendChild(fragment);
}

