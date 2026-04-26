/* ============================================
   PLANET CRAFTER GUIDE - SCRIPTS
   Interactividad, animaciones y starfield
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // === STARFIELD CANVAS ===
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    let stars = [];
    let animationId;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createStars(count = 200) {
        stars = [];
        for (let i = 0; i < count; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                speed: Math.random() * 0.3 + 0.05,
                opacity: Math.random() * 0.8 + 0.2,
                twinkleSpeed: Math.random() * 0.02 + 0.005,
                twinklePhase: Math.random() * Math.PI * 2
            });
        }
    }

    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => {
            star.twinklePhase += star.twinkleSpeed;
            const opacity = star.opacity * (0.5 + 0.5 * Math.sin(star.twinklePhase));

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200, 220, 255, ${opacity})`;
            ctx.fill();

            // Slow movement
            star.y += star.speed;
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }
        });

        animationId = requestAnimationFrame(drawStars);
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    resizeCanvas();
    createStars();

    if (!prefersReducedMotion) {
        drawStars();
    } else {
        // Draw static stars once
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200, 220, 255, ${star.opacity})`;
            ctx.fill();
        });
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
        createStars();
    });


    // === NAVBAR SCROLL EFFECT ===
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('backToTop');

    function handleScroll() {
        const scrollY = window.scrollY;

        // Navbar style
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }

        // Active nav link
        updateActiveNav();
    }

    window.addEventListener('scroll', handleScroll, { passive: true });


    // === BACK TO TOP ===
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // === MOBILE NAV TOGGLE ===
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });


    // === ACTIVE NAV LINK ON SCROLL ===
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id], header[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.querySelectorAll('a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }


    // === TERRAFORMATION TABS ===
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;

            // Remove active from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Activate clicked
            btn.classList.add('active');
            document.getElementById(`tab-${tabId}`).classList.add('active');
        });
    });


    // === RESOURCE FILTER ===
    const filterBtns = document.querySelectorAll('.filter-btn');
    const resourceCards = document.querySelectorAll('.resource-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter cards
            resourceCards.forEach(card => {
                if (filter === 'all' || card.dataset.rarity === filter) {
                    card.classList.remove('hidden');
                    // Trigger re-animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.opacity = '';
                        card.style.transform = '';
                    }, 50);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });


    // === MACHINES ACCORDION ===
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');

            // Close all
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
            });

            // Toggle clicked
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });


    // === FADE IN ON SCROLL (Intersection Observer) ===
    const fadeElements = document.querySelectorAll('.fade-in');

    if (!prefersReducedMotion) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        fadeElements.forEach(el => fadeObserver.observe(el));
    } else {
        // Show all immediately if reduced motion
        fadeElements.forEach(el => el.classList.add('visible'));
    }


    // === SMOOTH SCROLL FOR ALL ANCHOR LINKS ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = navbar.offsetHeight;
                const targetPos = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });
            }
        });
    });


    // === LANGUAGE PREFERENCE ===
    const langBtn = document.querySelector('.lang-btn');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const href = langBtn.getAttribute('href');
            if (href === 'en.html') {
                localStorage.setItem('pc-lang', 'en');
            } else if (href === 'es.html') {
                localStorage.setItem('pc-lang', 'es');
            }
        });
    }

    // Save current page language
    if (document.documentElement.lang === 'en') {
        localStorage.setItem('pc-lang', 'en');
    } else if (document.documentElement.lang === 'es') {
        localStorage.setItem('pc-lang', 'es');
    }

});
