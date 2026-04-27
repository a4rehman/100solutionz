// EmailJS Initialization
(function () {
    if (typeof emailjs !== 'undefined' && typeof CONFIG !== 'undefined') {
        emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY);
    }
})();

// Visitor Tracking
async function trackVisitor() {
    const sessionKey = 'visitor_notified';
    if (sessionStorage.getItem(sessionKey)) return;

    try {
        const response = await fetch('https://freeipapi.com/api/json');
        const data = await response.json();

        const templateParams = {
            subject: 'New Organic Visitor Alert',
            name: 'New Organic Visitor',
            email: 'organic_visitor@100solutionz.com',
            message: `Visitor Info:
Location: ${data.cityName}, ${data.countryName}
IP Address: ${data.ipAddress}
Direct Page: ${window.location.pathname}`,
            visitor_info: `Location: ${data.cityName}, ${data.countryName} | IP: ${data.ipAddress}`
        };

        await emailjs.send(CONFIG.EMAILJS_SERVICE_ID, CONFIG.EMAILJS_TRACKING_TEMPLATE_ID, templateParams);
        sessionStorage.setItem(sessionKey, 'true');
    } catch (error) {
        console.error('Visitor tracking failed:', error);
    }
}

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('.btn-submit');
        const originalText = btn.textContent;

        btn.textContent = 'Sending...';
        btn.disabled = true;

        const templateParams = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        try {
            await emailjs.send(CONFIG.EMAILJS_SERVICE_ID, CONFIG.EMAILJS_TEMPLATE_ID, templateParams);
            alert('Your request has been sent! We will book a call with you soon.');
            contactForm.reset();
        } catch (error) {
            console.error('Failed to send message:', error);
            alert('Oops! Something went wrong. Please try again later.');
        } finally {
            btn.textContent = originalText;
            btn.disabled = false;
        }
    });
}

// Start tracking on load
window.addEventListener('load', trackVisitor);

// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Theme Toggle (with persistence)
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    const icon = themeToggle.querySelector('i');

    // Load saved theme
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
        if (icon) icon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');

        if (isLight) {
            if (icon) icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            if (icon) icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Intersection Observer for Reveal Animations
const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

document.querySelectorAll('.section, .info-card, .hero-content').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});
