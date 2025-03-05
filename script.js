document.addEventListener('DOMContentLoaded', () => {
    // Image Carousel
    const images = document.querySelectorAll('.profile-image');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;

    function changeImage(index) {
        // Remove active class from all images and indicators
        images.forEach(img => img.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));

        // Add active class to current image and indicator
        images[index].classList.add('active');
        indicators[index].classList.add('active');
    }

    // Add click event to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            changeImage(currentIndex);
        });
    });

    // Automatic image rotation
    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        changeImage(currentIndex);
    }, 5000);

    // Scroll Reveal Animation
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('hidden');
        observer.observe(section);
    });
});