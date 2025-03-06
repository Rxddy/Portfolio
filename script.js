document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('open');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Image carousel functionality
    const profileImages = document.querySelectorAll('.profile-image');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;
    
    function changeImage(index) {
        // Remove active class from all images and indicators
        profileImages.forEach(img => img.classList.remove('active'));
        indicators.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current image and indicator
        profileImages[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentIndex = index;
    }
    
    // Set up indicator click events
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            changeImage(index);
        });
    });
    
    // Auto-rotate images every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % profileImages.length;
        changeImage(currentIndex);
    }, 5000);
    
    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Show/hide projects based on filter
            projects.forEach(project => {
                if (filter === 'all' || project.getAttribute('data-category') === filter) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });
    
    // Dark mode toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            // Save theme preference
            const isDarkMode = body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });
    }
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (mainNav.classList.contains('open')) {
                mainNav.classList.remove('open');
                mobileMenuToggle.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 30,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission with validation
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Basic form validation
            const nameInput = contactForm.querySelector('input[name="name"]');
            const emailInput = contactForm.querySelector('input[name="email"]');
            const messageInput = contactForm.querySelector('textarea[name="message"]');
            
            let isValid = true;
            
            if (!nameInput.value.trim()) {
                nameInput.style.borderColor = 'var(--error-color)';
                isValid = false;
            } else {
                nameInput.style.borderColor = 'var(--border-color)';
            }
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                emailInput.style.borderColor = 'var(--error-color)';
                isValid = false;
            } else {
                emailInput.style.borderColor = 'var(--border-color)';
            }
            
            if (!messageInput.value.trim()) {
                messageInput.style.borderColor = 'var(--error-color)';
                isValid = false;
            } else {
                messageInput.style.borderColor = 'var(--border-color)';
            }
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Reveal animations for sections
    const revealElements = document.querySelectorAll('section');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const revealTop = element.getBoundingClientRect().top;
            
            if (revealTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    }
    
    // Initial check
    checkReveal();
    
    // Check on scroll
    window.addEventListener('scroll', checkReveal);
});