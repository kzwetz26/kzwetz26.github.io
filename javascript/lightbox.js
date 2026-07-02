const lightbox = document.getElementById("lightbox");
const image = document.querySelector(".lightbox-img");
const close = document.querySelector(".lightbox .close");

let galleryImages = [];
let currentIndex = 0;

function openLightbox(idx) {
    currentIndex = idx;
    const img = galleryImages[currentIndex];
    image.src = img.src;
    image.alt = img.alt || '';
    lightbox.style.display = "flex";
    updateNavVisibility();
}

function updateNavVisibility() {
    const left = lightbox.querySelector('.nav-arrow.left');
    const right = lightbox.querySelector('.nav-arrow.right');
    if (!left || !right) return;
    left.style.display = (galleryImages.length > 1) ? 'flex' : 'none';
    right.style.display = (galleryImages.length > 1) ? 'flex' : 'none';
}

document.querySelectorAll('.image').forEach((item, idx) => {
    const img = item.querySelector('img');
    if (img) galleryImages.push(img);
    item.addEventListener('click', () => openLightbox(idx));
});

// create nav arrows if not present
function ensureArrows() {
    if (!lightbox) return;
    if (!lightbox.querySelector('.nav-arrow.left')) {
        const left = document.createElement('div');
        left.className = 'nav-arrow left';
        left.innerHTML = '&#10094;';
        left.addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });
        lightbox.appendChild(left);
    }
    if (!lightbox.querySelector('.nav-arrow.right')) {
        const right = document.createElement('div');
        right.className = 'nav-arrow right';
        right.innerHTML = '&#10095;';
        right.addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });
        lightbox.appendChild(right);
    }
}

function prevImage() {
    if (galleryImages.length <= 1) return;
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    const img = galleryImages[currentIndex];
    image.src = img.src;
    image.alt = img.alt || '';
}

function nextImage() {
    if (galleryImages.length <= 1) return;
    currentIndex = (currentIndex + 1) % galleryImages.length;
    const img = galleryImages[currentIndex];
    image.src = img.src;
    image.alt = img.alt || '';
}

ensureArrows();

close.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

// keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox || lightbox.style.display !== 'flex') return;
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'Escape') lightbox.style.display = 'none';
});