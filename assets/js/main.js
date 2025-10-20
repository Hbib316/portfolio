// ========================================
// Particles.js Configuration
// ========================================
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#00d9ff'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#00d9ff',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        }
    },
    retina_detect: true
});

// ========================================
// Typed.js Animation
// ========================================
if (document.getElementById('typed')) {
    const typed = new Typed('#typed', {
        strings: [
            'Étudiant ingénieur en Électronique Industrielle',
            'Spécialisé en contrôle industriel et énergies renouvelables',
            'Passionné par IA et IoT'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        backDelay: 2000
    });
}

// ========================================
// Toggle Mode Clair/Sombre
// ========================================
const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle';
themeToggle.innerHTML = '<div class="theme-toggle-slider">🌙</div>';
themeToggle.setAttribute('aria-label', 'Changer le thème');

// Ajouter le toggle à la navigation
const navContainer = document.querySelector('nav .container');
if (navContainer) {
    navContainer.appendChild(themeToggle);
}

// Charger le thème sauvegardé
const currentTheme = sessionStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.querySelector('.theme-toggle-slider').textContent = '☀️';
}

// Événement de clic pour changer le thème
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    themeToggle.querySelector('.theme-toggle-slider').textContent = isLight ? '☀️' : '🌙';
    sessionStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// ========================================
// Bouton Retour en Haut
// ========================================
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.setAttribute('aria-label', 'Retour en haut');
document.body.appendChild(scrollToTopBtn);

// Afficher/masquer le bouton selon le scroll
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Retour en haut au clic
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// Navigation Active State (Fixé)
// ========================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && (href.includes(current) || (current === '' && href.includes('index')))) {
            link.classList.add('active');
        }
    });
});

// ========================================
// Smooth Scroll
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// Animations au Scroll (Intersection Observer)
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observer les éléments
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.card, .education-item, .stat-card, .event-card');
    elements.forEach(el => observer.observe(el));
});

// ========================================
// Video Player (Corrigé)
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('chatbotVideo');
    const playBtn = document.getElementById('playButton');

    if (video && playBtn) {
        // Masquer le bouton play quand la vidéo démarre
        video.addEventListener('play', () => {
            playBtn.classList.add('hidden');
        });

        // Afficher le bouton play quand la vidéo est en pause
        video.addEventListener('pause', () => {
            playBtn.classList.remove('hidden');
        });

        // Afficher le bouton play quand la vidéo se termine
        video.addEventListener('ended', () => {
            playBtn.classList.remove('hidden');
        });

        // Clic sur le bouton play
        playBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (video.paused) {
                video.play().catch(err => {
                    console.error('Erreur de lecture:', err);
                });
            }
        });

        // Clic sur la vidéo pour play/pause
        video.addEventListener('click', () => {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });

        // Gestion des erreurs
        video.addEventListener('error', (e) => {
            console.error('Erreur vidéo:', e);
            playBtn.classList.add('hidden');
            const errorMsg = document.createElement('p');
            errorMsg.style.color = '#ff6b6b';
            errorMsg.style.textAlign = 'center';
            errorMsg.style.padding = '2rem';
            errorMsg.textContent = '⚠️ Vidéo non disponible. Vérifiez le chemin du fichier.';
            video.parentElement.appendChild(errorMsg);
        });
    }
});

// ========================================
// Gallery Lightbox
// ========================================
function initGalleryLightbox() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        z-index: 9999;
        display: none;
        align-items: center;
        justify-content: center;
    `;
    
    lightbox.innerHTML = `
        <div class="lightbox-content" style="position: relative; max-width: 90%; max-height: 90%;">
            <button class="lightbox-close" style="position: absolute; top: -40px; right: 0; background: none; border: none; color: white; font-size: 2rem; cursor: pointer;">
                <i class="fas fa-times"></i>
            </button>
            <img src="" alt="" style="max-width: 100%; max-height: 90vh; border-radius: 10px;">
        </div>
    `;
    
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    // Ouvrir la lightbox
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    // Fermer la lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Fermer avec Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
}

// Initialiser la lightbox
if (document.querySelector('.gallery-item')) {
    initGalleryLightbox();
}