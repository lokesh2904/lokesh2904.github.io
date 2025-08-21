document.addEventListener('DOMContentLoaded', () => {

    // --- THEME TOGGLE ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggleBtn.querySelector('i');

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('light');
        body.classList.toggle('dark');
        
        if (body.classList.contains('dark')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
        initParticles();
    });

    // --- NAVBAR SCROLL EFFECTS ---
    const navbar = document.querySelector('.navbar');
    const scrollProgressBar = document.querySelector('.scroll-progress-bar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / scrollableHeight);
        scrollProgressBar.style.transform = `scaleX(${scrolled})`;
    });

    // --- SCROLL REVEAL ANIMATIONS ---
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    revealElements.forEach(el => observer.observe(el));
    
    // --- TYPING ANIMATION ---
    const typingElement = document.getElementById('typing-animation');
    const text = "Software Engineer and Web Development Enthusiast";
    let index = 0;
    function type() {
        if (typingElement && index < text.length) {
            typingElement.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, 100);
        }
    }
    type();

    // --- PROJECT MODAL LOGIC ---
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const closeModalBtn = modal.querySelector('.close-btn');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const project = {
                image: card.querySelector('img').src,
                title: card.querySelector('h3').innerText,
                description: card.querySelector('p').innerText,
                tags: Array.from(card.querySelectorAll('.tags span')).map(span => span.innerText),
                link: "#" // You can add a data attribute to the card for a real link
            };
            
            document.getElementById('modal-img').src = project.image;
            document.getElementById('modal-title').innerText = project.title;
            document.getElementById('modal-description').innerText = project.description;
            document.getElementById('modal-tags').innerHTML = project.tags.map(t => `<span>${t}</span>`).join('');
            document.getElementById('modal-link').href = project.link;
            modal.classList.add('visible');
        });
    });

    closeModalBtn.addEventListener('click', () => modal.classList.remove('visible'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('visible');
        }
    });

    // --- EASTER EGG ---
    const logo = document.getElementById('logo');
    let clickCount = 0;
    logo.addEventListener('click', (e) => {
        e.preventDefault();
        clickCount++;
        if (clickCount === 3) {
            alert('🎉 You found the Easter Egg! Thanks for visiting! 🎉');
            clickCount = 0;
        }
        setTimeout(() => {
            clickCount = 0;
        }, 1000);
    });

    // --- CONTACT FORM ---
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const button = this.querySelector('button');
        button.innerText = 'Sending...';
        
        setTimeout(() => {
            button.innerText = 'Message Sent!';
            button.style.backgroundColor = '#28a745';
            this.reset();
            setTimeout(() => {
                button.innerText = 'Send Message';
                button.style.backgroundColor = '';
            }, 3000);
        }, 1500);
    });

    // --- PARTICLES.JS BACKGROUND ---
    function initParticles() {
        const isDarkMode = body.classList.contains('dark');
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                "particles": {
                    "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                    "color": { "value": isDarkMode ? "#58a6ff" : "#0366d6" },
                    "shape": { "type": "circle" },
                    "opacity": { "value": 0.5, "random": true },
                    "size": { "value": 3, "random": true },
                    "line_linked": { "enable": true, "distance": 150, "color": isDarkMode ? "#30363d" : "#e1e4e8", "opacity": 0.4, "width": 1 },
                    "move": { "enable": true, "speed": 2, "direction": "none", "straight": false }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" } },
                    "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } }, "push": { "particles_nb": 4 } }
                },
                "retina_detect": true
            });
        }
    }
    initParticles();
});
