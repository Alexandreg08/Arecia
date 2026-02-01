// Menu mobile toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Smooth scroll pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Fermer le menu mobile si ouvert
            navMenu.classList.remove('active');
        }
    });
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
document.querySelectorAll('.massage-card, .tarif-card, .bienfait-card, .temoignage-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Données des tarifs
const tarifsData = {
    '30': {
        title: 'Offre 30 minutes - 45€',
        price: '45€',
        includes: [
            'Massage relaxant ou énergisant au choix',
            'Huiles essentielles de qualité',
            'Ambiance apaisante avec musique douce',
            'Serviettes et drap de massage',
            'Accès à l\'espace détente après la séance'
        ],
        description: 'Une pause détente rapide parfaite pour une pause déjeuner ou après le travail. Idéal pour se ressourcer rapidement.'
    },
    '60': {
        title: 'Offre 60 minutes - 75€',
        price: '75€',
        includes: [
            'Massage complet relaxant ou énergisant',
            'Huiles essentielles de qualité',
            'Ambiance apaisante avec musique douce',
            'Serviettes et drap de massage',
            'Accès à l\'espace détente après la séance',
            'Thé ou café bio offert',
            'Temps de repos dans l\'espace nature'
        ],
        description: 'Le moment idéal de relaxation. Cette durée permet un massage complet de tout le corps pour une détente profonde et durable.'
    },
    '90': {
        title: 'Offre 90 minutes - 105€',
        price: '105€',
        includes: [
            'Massage complet bien-être personnalisé',
            'Combinaison de techniques adaptées à vos besoins',
            'Huiles essentielles de qualité',
            'Ambiance apaisante avec musique douce',
            'Serviettes et drap de massage',
            'Accès à l\'espace détente après la séance',
            'Thé ou café bio offert',
            'Temps de repos dans l\'espace nature',
            'Conseils en bien-être personnalisés'
        ],
        description: 'Une expérience complète de bien-être. Cette durée permet un travail approfondi sur toutes les zones du corps avec un temps de relaxation prolongé.'
    }
};

// Gestion de la modal des tarifs
const tarifModal = document.getElementById('tarifModal');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');
const modalClose = document.querySelector('.modal-close');
const tarifCards = document.querySelectorAll('.tarif-card');

// Ouvrir la modal au clic sur une carte tarif
tarifCards.forEach(card => {
    const btnDetails = card.querySelector('.btn-tarif-details');
    const tarifId = card.getAttribute('data-tarif');
    
    const openModal = () => {
        if (tarifsData[tarifId]) {
            const tarif = tarifsData[tarifId];
            modalTitle.textContent = tarif.title;
            
            let contentHTML = `
                <p class="tarif-price" style="text-align: center; font-size: 2rem; color: var(--color-accent); margin: 1rem 0;">${tarif.price}</p>
                <p style="color: var(--color-text-light); margin-bottom: 1.5rem; text-align: center;">${tarif.description}</p>
                <div class="tarif-includes">
                    <h3 style="color: var(--color-primary); margin-bottom: 1rem;">Cette offre comprend :</h3>
                    <ul>
            `;
            
            tarif.includes.forEach(item => {
                contentHTML += `<li>${item}</li>`;
            });
            
            contentHTML += `
                    </ul>
                </div>
            `;
            
            modalContent.innerHTML = contentHTML;
            tarifModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    };
    
    if (btnDetails) {
        btnDetails.addEventListener('click', (e) => {
            e.stopPropagation();
            openModal();
        });
    }
    
    // Permettre aussi de cliquer sur toute la carte
    card.addEventListener('click', (e) => {
        if (e.target !== btnDetails) {
            openModal();
        }
    });
});

// Fermer la modal
if (modalClose) {
    modalClose.addEventListener('click', () => {
        tarifModal.classList.remove('show');
        document.body.style.overflow = '';
    });
}

// Fermer la modal en cliquant en dehors
tarifModal.addEventListener('click', (e) => {
    if (e.target === tarifModal) {
        tarifModal.classList.remove('show');
        document.body.style.overflow = '';
    }
});

// Fermer la modal avec la touche Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (tarifModal && tarifModal.classList.contains('show')) {
            tarifModal.classList.remove('show');
            document.body.style.overflow = '';
        }
        if (massageModal && massageModal.classList.contains('show')) {
            massageModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }
});

// Bouton réserver dans la modal
const modalReserveBtn = document.querySelector('.modal-reserve');
if (modalReserveBtn) {
    modalReserveBtn.addEventListener('click', () => {
        tarifModal.classList.remove('show');
        document.body.style.overflow = '';
        // Scroll vers le formulaire de contact
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Données des massages avec leur histoire
const massagesData = {
    'relaxant': {
        title: 'Massage Relaxant',
        icon: '🌙',
        origin: 'Le massage relaxant trouve ses origines dans les traditions ancestrales de nombreuses cultures, notamment en Asie et en Europe. Inspiré des techniques suédoises du XIXe siècle et des pratiques orientales millénaires, il combine le meilleur des deux mondes.',
        popularity: 'Très populaire en Europe de l\'Ouest, particulièrement en France, en Suisse et en Belgique, ce type de massage est aujourd\'hui l\'un des plus demandés dans les centres de bien-être.',
        whatToExpect: 'Vous pouvez vous attendre à une expérience douce et enveloppante. Les mouvements sont lents, fluides et profonds, visant à détendre chaque muscle. L\'ambiance est apaisante, avec une musique douce et des huiles essentielles relaxantes. Vous ressentirez une sensation de légèreté et de bien-être profond qui peut durer plusieurs heures après la séance.',
        techniques: [
            'Effleurages doux et enveloppants',
            'Pétrissages légers pour dénouer les tensions',
            'Pressions douces sur les points de tension',
            'Mouvements circulaires pour détendre les muscles'
        ]
    },
    'energisant': {
        title: 'Massage Energisant',
        icon: '⚡',
        origin: 'Le massage énergisant s\'inspire des techniques dynamiques venues d\'Asie, notamment de la Thaïlande et de l\'Inde. Il combine des mouvements tonifiants avec des pressions rythmées pour réveiller l\'énergie vitale du corps.',
        popularity: 'Particulièrement apprécié dans les pays scandinaves et en Amérique du Nord, ce massage gagne en popularité en France, surtout auprès des personnes actives cherchant à recharger leurs batteries.',
        whatToExpect: 'Préparez-vous à une séance dynamique et revitalisante ! Les mouvements sont plus rapides et tonifiants que dans un massage relaxant. Vous ressentirez une stimulation de la circulation sanguine et une sensation d\'énergie qui se réveille. Idéal le matin ou après une journée chargée, ce massage vous redonnera vitalité et dynamisme.',
        techniques: [
            'Mouvements rapides et tonifiants',
            'Tapotements pour stimuler la circulation',
            'Pressions fermes sur les points d\'énergie',
            'Mouvements ascendants pour réveiller le corps'
        ]
    },
    'bien-etre': {
        title: 'Massage Bien-être',
        icon: '🌸',
        origin: 'Le massage bien-être est une approche moderne et holistique qui puise ses racines dans plusieurs traditions : le massage suédois, les techniques orientales, et les pratiques de bien-être contemporaines. Il s\'adapte aux besoins individuels de chaque personne.',
        popularity: 'En plein essor en France et dans toute l\'Europe, cette approche personnalisée répond à la demande croissante de soins sur mesure. Elle est particulièrement populaire dans les centres de bien-être et les spas.',
        whatToExpect: 'Cette expérience est entièrement adaptée à vos besoins du moment. Lors d\'un échange préalable, nous déterminerons ensemble les zones à travailler et les techniques les plus appropriées. Vous bénéficierez d\'une combinaison de techniques choisies spécialement pour vous, créant une expérience unique de détente et de bien-être.',
        techniques: [
            'Techniques adaptées à vos besoins',
            'Combinaison de mouvements doux et tonifiants',
            'Travail sur les zones spécifiques demandées',
            'Approche holistique du bien-être'
        ]
    }
};

// Gestion de la modal des massages
const massageModal = document.getElementById('massageModal');
const massageModalTitle = document.getElementById('massageModalTitle');
const massageModalContent = document.getElementById('massageModalContent');
const massageModalClose = massageModal ? massageModal.querySelector('.modal-close') : null;
const massageCards = document.querySelectorAll('.massage-card');

// Ouvrir la modal au clic sur une carte massage
massageCards.forEach(card => {
    const btnInfo = card.querySelector('.btn-massage-info');
    const massageId = card.getAttribute('data-massage');
    
    const openMassageModal = () => {
        if (massagesData[massageId]) {
            const massage = massagesData[massageId];
            massageModalTitle.innerHTML = `<span style="font-size: 2rem; margin-right: 10px;">${massage.icon}</span> ${massage.title}`;
            
            let contentHTML = `
                <div style="margin-bottom: 1.5rem;">
                    <h3 style="color: var(--color-primary); margin-bottom: 0.8rem; font-size: 1.2rem;">📜 Origines</h3>
                    <p style="color: var(--color-text-light); line-height: 1.8; margin-bottom: 1rem;">${massage.origin}</p>
                </div>
                <div style="margin-bottom: 1.5rem;">
                    <h3 style="color: var(--color-primary); margin-bottom: 0.8rem; font-size: 1.2rem;">🌍 Popularité</h3>
                    <p style="color: var(--color-text-light); line-height: 1.8; margin-bottom: 1rem;">${massage.popularity}</p>
                </div>
                <div style="margin-bottom: 1.5rem;">
                    <h3 style="color: var(--color-primary); margin-bottom: 0.8rem; font-size: 1.2rem;">✨ À quoi s'attendre</h3>
                    <p style="color: var(--color-text-light); line-height: 1.8; margin-bottom: 1rem;">${massage.whatToExpect}</p>
                </div>
                <div style="background-color: var(--color-bg); padding: var(--spacing-sm); border-radius: var(--border-radius);">
                    <h3 style="color: var(--color-primary); margin-bottom: 0.8rem; font-size: 1.2rem;">💆 Techniques utilisées</h3>
                    <ul style="list-style: none; padding: 0;">
            `;
            
            massage.techniques.forEach(technique => {
                contentHTML += `<li style="padding: 8px 0; padding-left: 25px; position: relative; color: var(--color-text-light);"><span style="position: absolute; left: 0; color: var(--color-primary);">•</span> ${technique}</li>`;
            });
            
            contentHTML += `
                    </ul>
                </div>
            `;
            
            massageModalContent.innerHTML = contentHTML;
            massageModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    };
    
    if (btnInfo) {
        btnInfo.addEventListener('click', (e) => {
            e.stopPropagation();
            openMassageModal();
        });
    }
    
    // Permettre aussi de cliquer sur toute la carte
    card.addEventListener('click', (e) => {
        if (e.target !== btnInfo && !e.target.closest('.btn-massage-info')) {
            openMassageModal();
        }
    });
});

// Fermer la modal des massages
if (massageModalClose) {
    massageModalClose.addEventListener('click', () => {
        massageModal.classList.remove('show');
        document.body.style.overflow = '';
    });
}

// Fermer la modal en cliquant en dehors
if (massageModal) {
    massageModal.addEventListener('click', (e) => {
        if (e.target === massageModal) {
            massageModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
}

// Fermer la modal avec la touche Escape (géré globalement plus haut, mais on s'assure que ça fonctionne)
// Le code existant gère déjà cela pour la modal tarif, on peut réutiliser la même logique

// Bouton réserver dans la modal massage
const modalReserveMassageBtn = document.querySelector('.modal-reserve-massage');
if (modalReserveMassageBtn) {
    modalReserveMassageBtn.addEventListener('click', () => {
        massageModal.classList.remove('show');
        document.body.style.overflow = '';
        // Scroll vers le formulaire de contact
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Gestion des FAQ (accordéon)
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (question) {
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fermer toutes les autres FAQ
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle l'item actuel
            item.classList.toggle('active', !isActive);
        });
    }
});

// Amélioration du formulaire de contact
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupération des données du formulaire
        const serviceTypeSelect = document.getElementById('service-type');
        const dureeSelect = document.getElementById('duree');
        
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            serviceType: serviceTypeSelect ? serviceTypeSelect.value : '',
            duree: dureeSelect ? dureeSelect.value : '',
            date: document.getElementById('date').value,
            message: document.getElementById('message').value
        };
        
        // Validation basique
        if (!formData.name || !formData.email || !formData.phone || !formData.message || !formData.serviceType) {
            alert('Veuillez remplir tous les champs obligatoires (*)');
            return;
        }
        
        // Ici, vous pourrez ajouter la logique d'envoi (API, email, etc.)
        console.log('Formulaire soumis:', formData);
        
        // Message de confirmation amélioré
        let confirmMessage = 'Merci ' + formData.name + ' pour votre demande !\n\n';
        if (formData.serviceType && serviceTypeSelect) {
            confirmMessage += 'Service demandé : ' + serviceTypeSelect.options[serviceTypeSelect.selectedIndex].text + '\n';
        }
        if (formData.duree && dureeSelect) {
            confirmMessage += 'Durée : ' + dureeSelect.options[dureeSelect.selectedIndex].text + '\n';
        }
        if (formData.date) {
            confirmMessage += 'Date souhaitée : ' + new Date(formData.date).toLocaleDateString('fr-FR') + '\n';
        }
        confirmMessage += '\nJe vous répondrai dans les plus brefs délais à l\'adresse ' + formData.email;
        
        alert(confirmMessage);
        
        // Réinitialiser le formulaire
        contactForm.reset();
    });
}

// Définir la date minimale pour le champ date (aujourd'hui)
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Afficher/masquer le champ durée selon le type de service
const serviceTypeSelect = document.getElementById('service-type');
const dureeGroup = document.getElementById('duree-group');
const dureeSelect = document.getElementById('duree');

if (serviceTypeSelect && dureeGroup) {
    serviceTypeSelect.addEventListener('change', function() {
        const selectedValue = this.value;
        // Afficher le champ durée uniquement pour les massages
        if (selectedValue && selectedValue.startsWith('massage-')) {
            dureeGroup.style.display = 'block';
        } else {
            dureeGroup.style.display = 'none';
            if (dureeSelect) {
                dureeSelect.value = '';
            }
        }
    });
}

