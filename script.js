document.addEventListener("DOMContentLoaded", () => {
    
    /* =========================================================
       1. Dynamic Typing & Deleting Effect (Hero Section)
    ========================================================= */
    const roles = ["Frontend Engineer", "BIT Student", "UI/UX Enthusiast", "Web Developer"];
    const heroTitle = document.querySelector(".detail-container h3");
    
    if (heroTitle) {
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeEffect() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                heroTitle.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                heroTitle.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentRole.length) {
                typeSpeed = 2000; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500; // Pause before typing next word
            }

            setTimeout(typeEffect, typeSpeed);
        }
        
        typeEffect();
    }


    /* =========================================================
       2. Scroll Reveal Animations (IntersectionObserver)
    ========================================================= */
    const revealElements = document.querySelectorAll(
        "section, .skill-category, .skill-category-glass-panel, .education-category, .bottom-container"
    );

    // Apply base inline CSS for the initial state before reveal
    revealElements.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    observer.unobserve(entry.target); // Reveal once
                }
            });
        },
        { threshold: 0.15 }
    );

    revealElements.forEach((el) => revealObserver.observe(el));


    /* =========================================================
       3. 3D Card Tilt Effect on Mouse Move
    ========================================================= */
    const cards = document.querySelectorAll(
        ".skill-category, .skill-category-glass-panel, .education-category"
    );

    cards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // Mouse position X relative to card
            const y = e.clientY - rect.top;  // Mouse position Y relative to card

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg rotation
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
        });
    });


    /* =========================================================
       4. Button Ripple Click Effect
    ========================================================= */
    const buttons = document.querySelectorAll(".buttons button");

    buttons.forEach((btn) => {
        btn.style.position = "relative";
        btn.style.overflow = "hidden";

        btn.addEventListener("click", function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const circle = document.createElement("span");
            circle.style.position = "absolute";
            circle.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
            circle.style.borderRadius = "50%";
            circle.style.pointerEvents = "none";
            circle.style.width = circle.style.height = `${Math.max(rect.width, rect.height) * 2}px`;
            circle.style.left = `${x - Math.max(rect.width, rect.height)}px`;
            circle.style.top = `${y - Math.max(rect.width, rect.height)}px`;
            circle.style.transform = "scale(0)";
            circle.style.transition = "transform 0.6s ease-out, opacity 0.6s ease-out";

            this.appendChild(circle);

            requestAnimationFrame(() => {
                circle.style.transform = "scale(1)";
                circle.style.opacity = "0";
            });

            setTimeout(() => circle.remove(), 600);
        });
    });


    /* =========================================================
       5. ScrollSpy: Highlight Nav Links as You Scroll
    ========================================================= */
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");

    window.addEventListener("scroll", () => {
        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.style.color = "#aaa";
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.style.color = "#00ff9c";
            }
        });
    });
});