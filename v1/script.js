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

// Expandable service details toggle (whole summary row is clickable)
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    const summary = card.querySelector('.service-summary');
    const trigger = card.querySelector('.service-trigger');
    if (!summary || !trigger) return;

    summary.addEventListener('click', () => {
        const isOpen = card.classList.toggle('open');
        trigger.setAttribute('aria-expanded', String(isOpen));
    });
});

// Update active navigation state based on scroll position
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;

    // Reference line at 40% of the viewport: the section crossing it is "current"
    const scrollPosition = window.scrollY + window.innerHeight * 0.4;
    let currentId = sections[0].id;
    sections.forEach(section => {
        if (scrollPosition >= section.offsetTop) {
            currentId = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
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

// Works gallery with lightbox
const GALLERY_IMAGE_COUNT = 45;
const galleryGrid = document.getElementById('galleryGrid');
const lightbox = document.getElementById('lightbox');
const lightboxStage = document.getElementById('lightboxStage');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCounter = document.getElementById('lightboxCounter');
let currentImageIndex = 0;

if (galleryGrid) {
    const button = document.createElement('button');
    button.className = 'gallery-item';
    button.setAttribute('aria-label', `Открыть галерею работ (${GALLERY_IMAGE_COUNT} фото)`);

    const img = document.createElement('img');
    img.src = 'assets/1.png';
    img.alt = 'Работы';
    img.decoding = 'async';

    const hint = document.createElement('span');
    hint.className = 'gallery-item-hint';
    hint.textContent = `Смотреть все работы — ${GALLERY_IMAGE_COUNT} фото`;

    button.appendChild(img);
    button.appendChild(hint);
    button.addEventListener('click', () => openLightbox(0));
    galleryGrid.appendChild(button);
}

function showImage(index) {
    currentImageIndex = (index + GALLERY_IMAGE_COUNT) % GALLERY_IMAGE_COUNT;
    lightbox.classList.remove('zoomed');
    lightboxImage.src = `assets/${currentImageIndex + 1}.png`;
    lightboxImage.alt = `Работа ${currentImageIndex + 1}`;
    lightboxCounter.textContent = `${currentImageIndex + 1} / ${GALLERY_IMAGE_COUNT}`;
}

function openLightbox(index) {
    showImage(index);
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    document.getElementById('lightboxClose').focus();
}

function closeLightbox() {
    lightbox.hidden = true;
    lightbox.classList.remove('zoomed');
    document.body.style.overflow = '';
}

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click', () => showImage(currentImageIndex - 1));
document.getElementById('lightboxNext').addEventListener('click', () => showImage(currentImageIndex + 1));

// Click on the backdrop (not the image or buttons) closes the lightbox
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightboxStage) {
        closeLightbox();
    }
});

// Click on the image toggles zoom, centered on the click point
lightboxImage.addEventListener('click', (e) => {
    const wasZoomed = lightbox.classList.contains('zoomed');
    if (wasZoomed) {
        lightbox.classList.remove('zoomed');
        return;
    }
    const rect = lightboxImage.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    lightbox.classList.add('zoomed');
    lightboxStage.scrollLeft = lightboxImage.offsetWidth * relX - lightboxStage.clientWidth / 2;
    lightboxStage.scrollTop = lightboxImage.offsetHeight * relY - lightboxStage.clientHeight / 2;
});

document.addEventListener('keydown', (e) => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(currentImageIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentImageIndex + 1);
});

// Swipe navigation on touch screens (disabled while zoomed, where touch pans)
let touchStartX = 0;
let touchStartY = 0;

lightboxStage.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
    touchStartY = e.changedTouches[0].clientY;
}, { passive: true });

lightboxStage.addEventListener('touchend', (e) => {
    if (lightbox.classList.contains('zoomed')) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const deltaY = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
        showImage(currentImageIndex + (deltaX < 0 ? 1 : -1));
    }
}, { passive: true });
