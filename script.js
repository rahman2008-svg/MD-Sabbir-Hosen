/**
 * MD RAKIB ISLAM — Portfolio Scripts
 * Pure Vanilla JavaScript
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. CONFIGURATION & EDITABLE DATA
    const CONFIG = {
        typingRoles: [
            "Gamer",
            "Student",
            "Gaming Enthusiast",
            "Humanities Student",
            "Future Creator"
        ],
        games: [
            {
                name: "FREE FIRE",
                category: "Battle Royale",
                description: "A fast-paced competitive battle royale experience."
            },
            {
                name: "PUBG",
                category: "Battle Royale",
                description: "A competitive tactical battle royale experience."
            },
            {
                name: "CLASH OF CLANS",
                category: "Strategy",
                description: "A strategy and base-building game focused on planning and progression."
            },
            {
                name: "E-FOOTBALL",
                category: "Football / Sports",
                description: "A football gaming experience focused on matches, tactics and team play."
            }
        ],
        // Image portfolio paths
        galleryImages: [
            "assets/images/rakib-01.jpg",
            "assets/images/rakib-02.jpg",
            "assets/images/rakib-03.jpg",
            "assets/images/rakib-04.jpg",
            "assets/images/rakib-05.jpg",
            "assets/images/rakib-06.jpg",
            "assets/images/rakib-07.jpg",
            "assets/images/rakib-08.jpg",
            "assets/images/rakib-09.jpg",
            "assets/images/rakib-10.jpg"
        ]
    };

    // 2. MOBILE NAVIGATION
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");
    const navLinkItems = document.querySelectorAll(".nav-link");

    hamburger.addEventListener("click", () => {
        const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
        hamburger.setAttribute("aria-expanded", !isExpanded);
        navLinks.classList.toggle("active");
    });

    navLinkItems.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            hamburger.setAttribute("aria-expanded", "false");
        });
    });

    // 3. ACTIVE SECTION HIGHLIGHTING
    const sections = document.querySelectorAll("section[id]");
    window.addEventListener("scroll", () => {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute("id");
            const link = document.querySelector(`.nav-link[href*="${sectionId}"]`);
            if (link) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    link.classList.add("active");
                } else {
                    link.classList.remove("active");
                }
            }
        });
    });

    // 4. TYPING ANIMATION
    const typingTextElem = document.getElementById("typing-text");
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentRole = CONFIG.typingRoles[roleIndex];
        
        if (isDeleting) {
            typingTextElem.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingTextElem.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % CONFIG.typingRoles.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }
    typeEffect();

    // 5. RENDER GAMES CARDS
    const gamesContainer = document.getElementById("games-container");
    if (gamesContainer) {
        gamesContainer.innerHTML = CONFIG.games.map((game, index) => `
            <div class="game-card" data-reveal>
                <div class="game-card-bg"></div>
                <div class="game-number">GAME 0${index + 1}</div>
                <h3 class="game-title">${game.name}</h3>
                <span class="game-cat">${game.category}</span>
                <p class="game-desc">"${game.description}"</p>
            </div>
        `).join('');
    }

    // 6. GALLERY & LIGHTBOX SYSTEM
    const galleryGrid = document.getElementById("gallery-grid");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxClose = document.getElementById("lightbox-close");
    const lightboxOverlay = document.getElementById("lightbox-overlay");
    const lightboxPrev = document.getElementById("lightbox-prev");
    const lightboxNext = document.getElementById("lightbox-next");
    const lightboxCounter = document.getElementById("lightbox-counter");

    let currentImgIndex = 0;
    let loadedImages = [];

    // Dynamically build gallery with image verification
    CONFIG.galleryImages.forEach((src, idx) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            loadedImages.push({ src, originalIndex: idx });
            renderGallery();
        };
        img.onerror = () => {
            // Automatically skip missing files
        };
    });

    function renderGallery() {
        if (!galleryGrid) return;
        galleryGrid.innerHTML = loadedImages.map((item, index) => `
            <div class="gallery-item ${index === 0 ? 'featured' : ''}" data-index="${index}" data-reveal>
                <img src="${item.src}" alt="MD Rakib Islam Gallery Image ${index + 1}" class="gallery-img" loading="lazy">
                <div class="gallery-overlay">
                    <div class="view-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                    </div>
                </div>
            </div>
        `).join('');

        // Attach click triggers to newly rendered items
        document.querySelectorAll(".gallery-item").forEach(item => {
            item.addEventListener("click", () => {
                const idx = parseInt(item.getAttribute("data-index"), 10);
                openLightbox(idx);
            });
        });

        initScrollReveal(); // Re-trigger observer for dynamic cards
    }

    function openLightbox(index) {
        currentImgIndex = index;
        updateLightbox();
        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "auto";
    }

    function updateLightbox() {
        if (loadedImages.length === 0) return;
        lightboxImg.src = loadedImages[currentImgIndex].src;
        lightboxCounter.textContent = `${String(currentImgIndex + 1).padStart(2, '0')} / ${String(loadedImages.length).padStart(2, '0')}`;
    }

    function prevImage() {
        currentImgIndex = (currentImgIndex - 1 + loadedImages.length) % loadedImages.length;
        updateLightbox();
    }

    function nextImage() {
        currentImgIndex = (currentImgIndex + 1) % loadedImages.length;
        updateLightbox();
    }

    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    if (lightboxOverlay) lightboxOverlay.addEventListener("click", closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener("click", prevImage);
    if (lightboxNext) lightboxNext.addEventListener("click", nextImage);

    // Keyboard controls for Lightbox
    document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("active")) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === "ArrowRight") nextImage();
    });

    // Touch Swipe Support for Lightbox
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    lightbox.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) nextImage();
        if (touchEndX > touchStartX + 50) prevImage();
    }

    // 7. FLOATING CONTACT MENU
    const floatingBtn = document.getElementById("floating-btn");
    const floatingMenu = document.getElementById("floating-menu");

    if (floatingBtn && floatingMenu) {
        floatingBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            floatingMenu.classList.toggle("active");
        });

        document.addEventListener("click", (e) => {
            if (!floatingMenu.contains(e.target) && e.target !== floatingBtn) {
                floatingMenu.classList.remove("active");
            }
        });
    }

    // 8. BACK TO TOP BUTTON
    const backToTopBtn = document.getElementById("back-to-top");
    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add("visible");
        } else {
            backToTopBtn.classList.remove("visible");
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // 9. SCROLL REVEAL ANIMATION SYSTEM
    function initScrollReveal() {
        const revealElements = document.querySelectorAll("[data-reveal]");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => observer.observe(el));
    }
    
    initScrollReveal();
});
