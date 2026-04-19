document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });

        // Accessibilité : Fermeture du menu avec la touche Échap (Escape)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans.forEach(span => span.classList.remove('active'));
                menuToggle.focus(); // Retourne le focus au bouton pour l'accessibilité (Tab)
            }
        });
    }

    // Animation au défilement (Simple Reveal)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal-on-scroll');
        observer.observe(section);
    });

    // Filtrage des événements par paramètre d'URL (catégorie)
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFilter = urlParams.get('cat');
    
    if (categoryFilter) {
        const eventCards = document.querySelectorAll('.events-grid .card');
        eventCards.forEach(card => {
            if (card.dataset.category && card.dataset.category !== categoryFilter) {
                card.style.display = 'none';
            }
        });
    }

    // Filtrage par menu déroulant (Toutes les catégories, Conférences, etc.)
    const categorySelect = document.querySelector('select.filter-item');
    if (categorySelect) {
        categorySelect.addEventListener('change', (e) => {
            const selectedCategory = e.target.value;
            const allCards = document.querySelectorAll('.events-grid .card');
            
            allCards.forEach(card => {
                const isMatch = selectedCategory === 'all' 
                                || card.dataset.category === selectedCategory 
                                || card.dataset.subcategory === selectedCategory;
                
                if (isMatch) {
                    card.style.display = ''; // Affiche la carte si ça correspond
                } else {
                    card.style.display = 'none'; // Masque sinon
                }
            });
        });
    }

    // Filtrage par dates (Aujourd'hui, Ce week-end, etc.)
    const timeFilters = document.querySelectorAll('.filters .filter-item:not(select)');
    timeFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            // Réinitialiser les styles
            timeFilters.forEach(b => {
                b.style.background = '';
                b.style.color = '';
                b.style.borderColor = '';
            });
            // Activer le bouton cliqué
            btn.style.background = 'var(--primary)';
            btn.style.borderColor = 'var(--primary)';
            btn.style.color = 'white';

            const filterText = btn.textContent.trim().toLowerCase();
            let targetTimeframe = 'all';
            if (filterText === "aujourd'hui") targetTimeframe = 'today';
            else if (filterText === 'ce week-end') targetTimeframe = 'weekend';
            else if (filterText === 'semaine prochaine') targetTimeframe = 'next-week';

            // Appliquer le filtre sur les cartes
            const allCards = document.querySelectorAll('.events-grid .card');
            allCards.forEach(card => {
                const timeframe = card.getAttribute('data-timeframe');
                if (targetTimeframe === 'all') {
                    card.style.display = '';
                } else if (timeframe === targetTimeframe || (targetTimeframe === 'weekend' && timeframe === 'today')) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Gestion dynamique de la page de détails des événements
    const eventId = urlParams.get('id');
    const titleElement = document.getElementById('detail-title');
    
    if (eventId && titleElement) {
        const eventsData = {
            'event1': { title: "Conférence Future Mobile", ext: "2026", date: "19 Avril 2026, 09:00", loc: "Casablanca, Maroc", price: "450 MAD", img: "images/event1.webp", desc: "Plongez dans le futur du développement mobile et du design responsive avec les meilleurs experts internationaux de la high tech.", tags: ["Tech & Innovation", "Développement Web"] },
            'event2': { title: "Concert Indie", ext: "Waves", date: "19 Avril 2026, 20:00", loc: "Rabat, Maroc", price: "250 MAD", img: "images/event2.webp", desc: "Une soirée immersive et électrisante avec les meilleurs talents de la scène locale et indépendante rock.", tags: ["Musique Live", "Rock Indépendant"] },
            'event3': { title: "Workshop UI/UX", ext: "Avancé", date: "23 Avril 2026, 14:00", loc: "Marrakech, Maroc", price: "Gratuit", img: "images/event3.webp", desc: "Apprenez les secrets de conception et concevez des interfaces qui captiveront vos utilisateurs finaux.", tags: ["Design & Créativité", "Interfaces Utilisateur"] },
            'event4': { title: "Masterclass Laravel &", ext: "AI", date: "25 Avril 2026, 10:00", loc: "En ligne", price: "990 MAD", img: "images/event4.webp", desc: "Comment intégrer l'intelligence artificielle générative de manière robuste au sein de vos applications Laravel modernes.", tags: ["Formation Pro", "Développement Backend"] },
            'event5': { title: "Jazz au Clair de", ext: "Lune", date: "05 Juin 2026, 21:00", loc: "Tanger, Maroc", price: "150 MAD", img: "images/event5.webp", desc: "Savourez la magie d'une nuit étoilée accompagnée des douces et mélancoliques vibrations d'un orchestre de Jazz pro.", tags: ["Concert Acoustique", "Jazz Traditionnel"] },
            'event6': { title: "Marketing Digital", ext: "Summit", date: "10 Juin 2026, 09:30", loc: "Agadir, Maroc", price: "600 MAD", img: "images/event6.webp", desc: "Toutes les dernières méthodologies de Growth Hacking et stratégie de communication expliquées par les CEO de la tech.", tags: ["Stratégie", "Growth Hacking"] },
            'event7': { title: "Séance Crossfit", ext: "Elite", date: "14 Juin 2026, 18:00", loc: "Oujda, Maroc", price: "200 MAD", img: "images/event7.png", desc: "Dépassez vos limites absolues lors de ce challenge sportif de haute intensité conçu pour forger votre endurance.", tags: ["Haute Intensité", "Sport & Santé"] },
            'event8': { title: "Retraite Yoga &", ext: "Pilates", date: "21 Juin 2026, 08:00", loc: "Ifrane, Maroc", price: "850 MAD", img: "images/event8.png", desc: "Reconnectez corps et esprit à travers des étirements profonds et des phases de méditation zen en pleine nature.", tags: ["Bien-être Yin", "Méditation Active"] },
            'event9': { title: "Festival Gnaoua &", ext: "Musiques", date: "26 Juin 2026, 19:00", loc: "Essaouira, Maroc", price: "300 MAD", img: "images/event9.png", desc: "Plongez dans l'héritage musical envoûtant et traditionnel des maîtres Gnaoua lors d'une soirée magique sous les lanternes.", tags: ["Musiques du Monde", "Héritage Culturel"] },
            'event10': { title: "L'Artisanat", ext: "Zellige", date: "02 Juillet 2026, 10:00", loc: "Fès, Maroc", price: "500 MAD", img: "images/event10.png", desc: "Venez découvrir les secrets ancestraux de la taille de faïence typique du folklore artisanal marocain.", tags: ["Artisanat Local", "Potiers & Faïence"] }
        };

        const activeEvent = eventsData[eventId];
        if(activeEvent) {
            document.getElementById('detail-img').src = activeEvent.img;
            titleElement.innerHTML = `${activeEvent.title} <span class="text-primary">${activeEvent.ext}</span>`;
            document.getElementById('detail-date').textContent = activeEvent.date;
            document.getElementById('detail-location').textContent = activeEvent.loc;
            document.getElementById('detail-price').textContent = activeEvent.price;
            document.getElementById('detail-desc').innerHTML = `<p>${activeEvent.desc}</p><p style="margin-top: 1rem;">Venez nombreux pour découvrir l'ensemble de notre programmation !</p>`;
            
            // Mise à jour dynamique des tags/boutons
            const tagsContainer = document.getElementById('detail-tags');
            if (tagsContainer && activeEvent.tags) {
                tagsContainer.innerHTML = '';
                activeEvent.tags.forEach(tag => {
                    tagsContainer.innerHTML += `<span style="background: var(--dark-light); padding: 0.5rem 1rem; border-radius: 50px; border: 1px solid var(--glass-border);">${tag}</span>`;
                });
            }
        }
    }
});
