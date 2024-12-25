// Updated portfolio items data with local images
const portfolioItems = [
    {
        title: 'Portfolio Website',
        description: 'Wix based responsive portfolio website with booking',
        image: '../img/hero1.png',
        category: 'Wix',
        id: 'project1'
    },
    {
        title: 'Digital Marketing Agency Website',
        description: 'Wordpress website with custom theme',
        image: '../img/hero2.png',
        category: 'Wordpress',
        id: 'project2'
    },
    {
        title: 'Custom 3D Action Toys Website',
        description: 'Colorfull full responsive custom 3d model website',
        image: '../img/hero3.png',
        category: 'Wix',
        id: 'project3'
    },
    {
        title: 'Athletic Performance Training Website',
        description: 'Professional wordpress website for a training center showcasing clients strength',
        image: '../img/hero4.png',
        category: 'Wordpress',
        id: 'project4'
    },
    {
        title: 'AI Learning LMS',
        description: 'Custom Wix website with wix LMS with advanced features',
        image: '../img/hero5.png',
        category: 'Wix',
        id: 'project5'
    },
    {
        title: 'Therepist Website',
        description: 'Wix website with event booking functionality',
        image: '../img/hero6.png',
        category: 'Wix',
        id: 'project6'
    }
];

// Load portfolio items
function loadPortfolio() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    // Clear existing items first
    portfolioGrid.innerHTML = '';
    
    portfolioItems.forEach(item => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.innerHTML = `
            <a href="projects/${item.id}.html">
                <img src="${item.image}" alt="${item.title}">
                <div class="portfolio-info">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <span class="category">${item.category}</span>
                </div>
            </a>
        `;
        portfolioGrid.appendChild(portfolioItem);
    });
}

// Single DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    // Initialize portfolio
    loadPortfolio();
    
    // Initialize testimonials slider
    initTestimonialsSlider();
    
    // Set minimum date for deadline
    const deadlineInput = document.getElementById('deadline');
    if (deadlineInput) {
        const today = new Date().toISOString().split('T')[0];
        deadlineInput.min = today;
    }
    
    // Initialize smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Mobile Menu Functionality
const menuIcon = document.querySelector('.menu-icon');
const mobileMenu = document.querySelector('.mobile-menu');
const closeBtn = document.querySelector('.close-btn');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

menuIcon.addEventListener('click', () => {
    mobileMenu.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
});

mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// Testimonials Slideshow
function initTestimonialsSlider() {
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    const testimonials = document.querySelectorAll('.testimonial-card');
    const sliderControls = document.querySelector('.slider-controls');
    
    // Determine number of slides based on screen width
    const isMobile = window.innerWidth <= 768;
    const slidesPerView = isMobile ? 1 : 3;
    const totalSlides = Math.ceil(testimonials.length / slidesPerView);
    
    let currentSlide = 0;
    let slideInterval;

    // Clear existing dots
    sliderControls.innerHTML = '';

    // Create slider dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (i === 0) dot.classList.add('active');
        sliderControls.appendChild(dot);
    }

    const dots = document.querySelectorAll('.slider-dot');

    function updateSlide(index) {
        const offset = index * -100;
        testimonialsGrid.style.transform = `translateX(${offset}%)`;
        
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlide(currentSlide);
    }

    // Click events for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlide(currentSlide);
            resetInterval();
        });
    });

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 8000);
    }

    // Initialize auto-sliding
    resetInterval();

    // Handle window resize
    window.addEventListener('resize', () => {
        const newIsMobile = window.innerWidth <= 768;
        if (newIsMobile !== isMobile) {
            location.reload(); // Reload page to reinitialize slider
        }
    });
}

function initEmailJS() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Add your EmailJS public key
} 