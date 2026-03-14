// DOM elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.nav-menu a');
const contactForm = document.getElementById('contactForm');

// ===== MOBILE HAMBURGER TOGGLE =====
if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        // change icon (optional)
        hamburger.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.textContent = '☰';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.textContent = '☰';
        }
    });
}

// ===== STICKY NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== SMOOTH SCROLLING FOR INTERNAL LINKS =====
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        // Only smooth-scroll if it's a same-page anchor (e.g., #section)
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
        // otherwise normal navigation (handled by href)
    });
});

// ===== FORM VALIDATION (Contact page) =====
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name')?.value.trim();
        const phone = document.getElementById('phone')?.value.trim();
        const message = document.getElementById('message')?.value.trim();
        const feedback = document.getElementById('formFeedback');

        // Basic validation
        if (!name || !phone || !message) {
            feedback.textContent = '❌ All fields are required.';
            feedback.style.color = '#C9A227';
            return;
        }

        if (phone.length < 10) {
            feedback.textContent = '❌ Please enter a valid phone number.';
            return;
        }

        // If valid – show success (normally you'd send data)
        feedback.textContent = '✓ Message sent (demo). We’ll reply via WhatsApp soon!';
        feedback.style.color = 'green';
        contactForm.reset();

        // Optional: clear after 4 seconds
        setTimeout(() => {
            feedback.textContent = '';
        }, 4000);
    });
}

// ===== ACTIVE PAGE HIGHLIGHT =====
(function setActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
})();

// ===== CLOSE MOBILE MENU ON RESIZE (if forced open) =====
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && navMenu?.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (hamburger) hamburger.textContent = '☰';
    }
});