// Menu mobile toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;
const heroSection = document.getElementById('accueil');

// Empêcher le scroll sur la page d'accueil
function preventScrollOnHomepage() {
    if (window.location.hash === '' || window.location.hash === '#accueil') {
        body.classList.add('no-scroll');
    } else {
        body.classList.remove('no-scroll');
    }
}

// Initialiser l'état du scroll
preventScrollOnHomepage();

// Observer les changements de hash pour gérer le scroll
window.addEventListener('hashchange', () => {
    preventScrollOnHomepage();
});

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Smooth scroll pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            // Si on clique sur un lien autre que l'accueil, permettre le scroll
            if (targetId !== '#accueil') {
                body.classList.remove('no-scroll');
            }
            
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Mettre à jour l'URL sans déclencher de scroll
            window.history.pushState(null, null, targetId);
            
            // Fermer le menu mobile si ouvert
            navMenu.classList.remove('active');
        }
    });
});

// Empêcher le scroll avec la molette sur la page d'accueil
let isOnHomepage = () => {
    return window.location.hash === '' || window.location.hash === '#accueil';
};

window.addEventListener('wheel', function(e) {
    if (isOnHomepage() && body.classList.contains('no-scroll')) {
        e.preventDefault();
    }
}, { passive: false });

// Empêcher le scroll avec les touches fléchées
window.addEventListener('keydown', function(e) {
    if (isOnHomepage() && body.classList.contains('no-scroll')) {
        if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) {
            e.preventDefault();
        }
    }
});

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

