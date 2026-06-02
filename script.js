// Check if user prefers reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Smooth scroll to sections
function smoothScrollTo(targetId) {
    const target = document.querySelector(targetId);
    if (!target) return;

    if (prefersReducedMotion) {
        target.scrollIntoView();
    } else {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navContainer = document.getElementById('navContainer');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navContainer.classList.toggle('open');
});

// Handle navigation link clicks
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        smoothScrollTo(targetId);

        // Close mobile menu after clicking a link
        hamburger.classList.remove('active');
        navContainer.classList.remove('open');
    });
});

// Handle CTA button clicks
const ctaButtons = document.querySelectorAll('.cta-button');
ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScrollTo('#contact');
    });
});

// Update active navigation state based on scroll position
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100; // Offset for sticky nav

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Back to top button functionality
const backToTopButton = document.getElementById('backToTop');

function toggleBackToTop() {
    if (window.scrollY > 500) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
}

backToTopButton.addEventListener('click', () => {
    smoothScrollTo('#hero');
});

// Throttle function for better performance
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Event listeners with throttling
const throttledUpdateNav = throttle(updateActiveNav, 100);
const throttledToggleBackToTop = throttle(toggleBackToTop, 100);

window.addEventListener('scroll', () => {
    throttledUpdateNav();
    throttledToggleBackToTop();
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNav();
    toggleBackToTop();
});
