// Shared across all pages; every block guards for elements that may be absent.
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// --- Mobile menu ---
const hamburger = document.getElementById('hamburger');
const siteNav = document.getElementById('siteNav');

if (hamburger && siteNav) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        siteNav.classList.toggle('open');
    });

    siteNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            siteNav.classList.remove('open');
        });
    });
}

// --- Active nav state for same-page anchors (home only) ---
const anchorLinks = document.querySelectorAll('.nav-link[href^="#"]');

function updateActiveNav() {
    if (!anchorLinks.length) return;
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;

    const scrollPosition = window.scrollY + window.innerHeight * 0.4;
    let currentId = sections[0].id;
    sections.forEach(section => {
        if (scrollPosition >= section.offsetTop) {
            currentId = section.id;
        }
    });

    anchorLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
}

// --- Back to top ---
const backToTopButton = document.getElementById('backToTop');

function toggleBackToTop() {
    if (!backToTopButton) return;
    backToTopButton.classList.toggle('visible', window.scrollY > 500);
}

if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
}

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

window.addEventListener('scroll', throttle(() => {
    updateActiveNav();
    toggleBackToTop();
}, 100));

document.addEventListener('DOMContentLoaded', () => {
    updateActiveNav();
    toggleBackToTop();
});

// --- Reveal on scroll ---
const revealElements = document.querySelectorAll('.reveal');

if (revealElements.length && 'IntersectionObserver' in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(el => observer.observe(el));
} else {
    revealElements.forEach(el => el.classList.add('visible'));
}

// --- Works gallery with lightbox (home only) ---
const GALLERY_IMAGES = Array.from({ length: 12 }, (_, i) => `assets/${i + 1}.png`);
const GALLERY_CAPTIONS = [
    'Капсула для работы для клиентки',
    'Рекомендации по подбору бижутерии для клиентки',
    'Карта стиля для клиентки. Рекомендации по выбору пальто',
    'Карта стиля для клиентки. Рекомендации по выбору сумок',
    'Карта стиля для клиентки. Рекомендации по выбору жакета',
    'Карта стиля для клиентки и рекомендации по подбору бижутерии',
    'Преображение клиентки. Шоппинг',
    'Глубокий анализ стиля клиентки через визуальные ассоциации',
    'Глубокий анализ стиля клиентки через визуальные ассоциации',
    'Глубокий анализ стиля клиентки через визуальные ассоциации',
    'Карта стиля. Рекомендации по выбору бомбера',
    'Глубокий анализ стиля клиентки через визуальные ассоциации'
];
const galleryGrid = document.getElementById('galleryGrid');
const lightbox = document.getElementById('lightbox');

if (galleryGrid && lightbox) {
    const lightboxStage = document.getElementById('lightboxStage');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const lightboxCaption = document.getElementById('lightboxCaption');
    let currentImageIndex = 0;

    const button = document.createElement('button');
    button.className = 'gallery-item';
    button.setAttribute('aria-label', 'Открыть фото во весь экран');

    const img = document.createElement('img');
    img.alt = 'Работы';
    img.decoding = 'async';

    const hint = document.createElement('span');
    hint.className = 'gallery-item-hint';
    hint.textContent = 'Открыть во весь экран';

    button.appendChild(img);
    button.appendChild(hint);
    button.addEventListener('click', () => openLightbox(currentImageIndex));
    galleryGrid.appendChild(button);

    const caption = document.createElement('p');
    caption.className = 'gallery-caption';
    galleryGrid.appendChild(caption);

    // Inline navigation under the image
    const nav = document.createElement('div');
    nav.className = 'gallery-nav';

    const prevBtn = document.createElement('button');
    prevBtn.className = 'gallery-nav-arrow';
    prevBtn.setAttribute('aria-label', 'Предыдущее фото');
    prevBtn.innerHTML = '&#8249;';
    prevBtn.addEventListener('click', () => showImage(currentImageIndex - 1));

    const nextBtn = document.createElement('button');
    nextBtn.className = 'gallery-nav-arrow';
    nextBtn.setAttribute('aria-label', 'Следующее фото');
    nextBtn.innerHTML = '&#8250;';
    nextBtn.addEventListener('click', () => showImage(currentImageIndex + 1));

    const navCounter = document.createElement('span');
    navCounter.className = 'gallery-nav-counter';

    nav.appendChild(prevBtn);
    nav.appendChild(nextBtn);
    nav.appendChild(navCounter);
    galleryGrid.appendChild(nav);

    function showImage(index) {
        currentImageIndex = (index + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
        lightbox.classList.remove('zoomed');
        const captionText = GALLERY_CAPTIONS[currentImageIndex] || '';
        img.src = GALLERY_IMAGES[currentImageIndex];
        img.alt = captionText || `Работа ${currentImageIndex + 1}`;
        caption.textContent = captionText;
        caption.hidden = !captionText;
        navCounter.textContent = `${currentImageIndex + 1} / ${GALLERY_IMAGES.length}`;
        lightboxImage.src = GALLERY_IMAGES[currentImageIndex];
        lightboxImage.alt = img.alt;
        lightboxCaption.textContent = captionText;
        lightboxCaption.hidden = !captionText;
        lightboxCounter.textContent = navCounter.textContent;
    }

    showImage(0);

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
}
