// SMOOTH SCROLLING FOR ANCHOR LINKS
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

// BUTTON HOVER EFFECTS
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.05)';
    });
    button.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});

// CONTACT BUTTON NAVIGATION
document.querySelector('.nav-btn').addEventListener('click', function() {
    openContactForm('Contact - Navigation');
});

// TC BUTTON & CONTACT BUTTON
document.querySelectorAll('.tc-btn, .bouton-contact').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        openContactForm('CTA Button');
    });
});

// ═══════════════════════════════════════════════════════════════
// MODAL FUNCTIONS - GLOBAL SCOPE (accessible from HTML)
// ═══════════════════════════════════════════════════════════════

function openContactForm(source = 'Contact') {
    const modal = document.getElementById('contactModal');
    modal.classList.add('active');
    
    // Envoyer événement à Google Analytics
    gtag('event', 'contact_form_open', {
        'event_category': 'engagement',
        'event_label': source
    });
}

function closeContactForm() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'none';
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    // Récupérer les données du formulaire
    const formData = {
        nom: document.getElementById('nom').value,
        email: document.getElementById('email').value,
        telephone: document.getElementById('telephone').value,
        structure: document.getElementById('structure').value,
        message: document.getElementById('message').value,
        newsletter: document.getElementById('newsletter').checked,
        date: new Date().toISOString(),
        source: 'Formulaire Turismo Connect'
    };

    // Envoyer à Google Analytics
    gtag('event', 'form_submit', {
        'event_category': 'engagement',
        'event_label': 'Contact Form',
        'value': formData.structure
    });

    // Sauvegarder dans localStorage (pour vérification locale)
    const submissions = JSON.parse(localStorage.getItem('turismoConnectSubmissions')) || [];
    submissions.push(formData);
    localStorage.setItem('turismoConnectSubmissions', JSON.stringify(submissions));

    // LOG dans la console pour vérification
    console.log('✅ Formulaire soumis :', formData);
    console.log('📊 Toutes les soumissions :', JSON.parse(localStorage.getItem('turismoConnectSubmissions')));

    // Afficher message de succès
    document.getElementById('formSuccess').style.display = 'block';
    document.getElementById('contactForm').style.display = 'none';

    // Réinitialiser après 3 secondes
    setTimeout(() => {
        document.getElementById('contactForm').reset();
        document.getElementById('contactForm').style.display = 'block';
        document.getElementById('formSuccess').style.display = 'none';
        closeContactForm();
    }, 3000);
}

// Fermer modal en cliquant dehors
window.onclick = function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target === modal) {
        modal.classList.remove('active');
    }
};