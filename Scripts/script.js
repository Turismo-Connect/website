//Google Analytics
if (typeof gtag === 'undefined') {
    window.gtag = function() {};
}

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

// TC BUTTON ONLY
const tcBtn = document.querySelector('.tc-btn');
if (tcBtn) {
    tcBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openContactForm('Demande d\'Audit');
    });
}

// ═══════════════════════════════════════════════════════════════
// MODAL FUNCTIONS - GLOBAL SCOPE (accessible from HTML)
// ═══════════════════════════════════════════════════════════════

function openContactForm(source = 'Contact') {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.style.display = 'flex';
        gtag('event', 'contact_form_open', {
            'event_category': 'engagement',
            'event_label': source
        });
    }
}

function closeContactForm() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    
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

    gtag('event', 'form_submit', {
        'event_category': 'engagement',
        'event_label': 'Contact Form',
        'value': formData.structure
    });

    const submissions = JSON.parse(localStorage.getItem('turismoConnectSubmissions')) || [];
    submissions.push(formData);
    localStorage.setItem('turismoConnectSubmissions', JSON.stringify(submissions));

    console.log('✅ Formulaire soumis :', formData);
    console.log('📊 Toutes les soumissions :', JSON.parse(localStorage.getItem('turismoConnectSubmissions')));

    document.getElementById('formSuccess').style.display = 'block';
    document.getElementById('contactForm').style.display = 'none';

    setTimeout(() => {
        document.getElementById('contactForm').reset();
        document.getElementById('contactForm').style.display = 'block';
        document.getElementById('formSuccess').style.display = 'none';
        closeContactForm();
    }, 3000);
}

// Fermer modal en cliquant dehors
window.addEventListener('click', function(event) {
    const modal = document.getElementById('contactModal');
    if (modal && event.target === modal) {
        closeContactForm();
    }
});

// Fermer modal avec toucher (iOS)
window.addEventListener('touchstart', function(event) {
    const modal = document.getElementById('contactModal');
    if (modal && event.target === modal) {
        closeContactForm();
    }
}, false);