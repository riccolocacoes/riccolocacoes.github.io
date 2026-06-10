document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header
    const header = document.querySelector('.main-header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run on init in case page is refreshed scrolled down

    // 2. Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            menuToggle.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', isOpen);
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                menuToggle.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 3. Scrollspy (Active Link Tracking on scroll)
    const sections = document.querySelectorAll('section[id], header[id]');
    
    const scrollspy = () => {
        let currentSectionId = 'inicio';
        const scrollPosition = window.scrollY + 150; // offset header height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', scrollspy);
    scrollspy(); // Run on load
});
