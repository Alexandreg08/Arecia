// Menu mobile toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

// Toutes les sections
const sections = document.querySelectorAll('section[id]');
const heroSection = document.getElementById('accueil');

// Fonction pour afficher une section et cacher les autres
function showSection(sectionId) {
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Si c'est l'accueil, bloquer le scroll
        if (sectionId === 'accueil') {
            body.classList.add('no-scroll');
            window.scrollTo(0, 0);
        } else {
            // Pour les autres sections, permettre le scroll mais seulement dans la section
            body.classList.remove('no-scroll');
            // S'assurer qu'on est en haut de la section
            window.scrollTo(0, 0);
            // Attendre un peu pour que la section soit affichée
            setTimeout(() => {
                targetSection.scrollTop = 0;
            }, 10);
        }
        
        // Mettre à jour l'URL
        window.history.pushState({ section: sectionId }, null, `#${sectionId}`);
    }
}

// Initialiser : afficher l'accueil par défaut
function init() {
    const hash = window.location.hash.slice(1); // Enlever le #
    if (hash && document.getElementById(hash)) {
        showSection(hash);
    } else {
        showSection('accueil');
    }
}

// Initialiser au chargement
init();

// Gérer les changements de hash (navigation navigateur)
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1);
    if (hash && document.getElementById(hash)) {
        showSection(hash);
    } else {
        showSection('accueil');
    }
});

// Menu mobile toggle
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Navigation par clic sur les liens du menu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').slice(1); // Enlever le #
        
        if (targetId && document.getElementById(targetId)) {
            showSection(targetId);
            // Fermer le menu mobile si ouvert
            navMenu.classList.remove('active');
        }
    });
});

// Empêcher le scroll avec la molette sur la page d'accueil
window.addEventListener('wheel', function(e) {
    if (body.classList.contains('no-scroll')) {
        e.preventDefault();
    }
}, { passive: false });

// Empêcher le scroll avec les touches fléchées sur l'accueil
window.addEventListener('keydown', function(e) {
    if (body.classList.contains('no-scroll')) {
        if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) {
            e.preventDefault();
        }
    }
});

// Empêcher le scroll vers le haut depuis les autres sections (pour ne pas revenir à l'accueil)
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const currentSection = document.querySelector('section.active');
    
    // Si on est sur une section autre que l'accueil
    if (currentSection && currentSection.id !== 'accueil') {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Si on essaie de scroller vers le haut et qu'on est déjà en haut de la section
        if (scrollTop < lastScrollTop && scrollTop <= 0) {
            // Empêcher de scroller au-delà du début de la section
            window.scrollTo(0, 0);
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    } else if (currentSection && currentSection.id === 'accueil') {
        // Si on est sur l'accueil, empêcher tout scroll
        window.scrollTo(0, 0);
    }
}, { passive: false });

// Gestion du formulaire de contact
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupération des données du formulaire
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        // Ici, vous pourrez ajouter la logique d'envoi (API, email, etc.)
        console.log('Formulaire soumis:', formData);
        
        // Message de confirmation (à améliorer dans une future branche)
        alert('Merci pour votre message ! Je vous répondrai dans les plus brefs délais.');
        
        // Réinitialiser le formulaire
        contactForm.reset();
    });
}

// Animation au scroll (optionnel, à améliorer dans une future branche)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les cartes pour l'animation
document.querySelectorAll('.massage-card, .tarif-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});
