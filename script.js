// Hamburger menu toggle function (for onclick in HTML)
function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const userMenu = document.querySelector('.user');
    
    if (hamburger && userMenu) {
        hamburger.classList.toggle('active');
        userMenu.classList.toggle('active');
    }
}

// Main DOMContentLoaded event listener - consolidated all functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get references for mobile menu (used by other functions)
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.user');
    
    // Dropdown functionality for mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('.link');
        
        if (dropdownLink) {
            dropdownLink.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent default link behavior
                e.stopPropagation(); // Stop event from bubbling up
                
                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active');
            });
        }
    });
    
    // Prevent dropdown menu from closing when clicking inside it
    dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        if (dropdownMenu) {
            dropdownMenu.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent event bubbling
            });
        }
    });
    
    // Handle regular navigation links (non-dropdown links)
    const regularLinks = document.querySelectorAll('.user .link:not(.dropdown .link)');
    regularLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Close mobile menu when clicking regular navigation links
            const hamburger = document.querySelector('.hamburger');
            const mobileMenu = document.querySelector('.user');
            if (hamburger && mobileMenu) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    });
    
    // Handle dropdown menu item clicks
    const dropdownMenuLinks = document.querySelectorAll('.dropdown-menu a');
    dropdownMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Close both dropdown and mobile menu when clicking dropdown items
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            const hamburger = document.querySelector('.hamburger');
            const mobileMenu = document.querySelector('.user');
            if (hamburger && mobileMenu) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    });
    
    // Handle clicks outside
    document.addEventListener('click', function(e) {
        // Close mobile menu if clicking outside of it
        if (mobileMenu && !e.target.closest('.user') && !e.target.closest('.hamburger')) {
            const hamburger = document.querySelector('.hamburger');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
            mobileMenu.classList.remove('active');
        }
        
        // Close dropdowns if clicking outside of them (but keep mobile menu open)
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // Initialize scroll animations
    const animatedElements = document.querySelectorAll('.serv .div, .pro, .mentor');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
    
    // Smooth scrolling for internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Product card hover effects
    const productCards = document.querySelectorAll('.pro');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Service card click tracking (for analytics)
    const serviceCards = document.querySelectorAll('.serv a');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceName = this.querySelector('h3').textContent;
            console.log(`Service clicked: ${serviceName}`);
            // Add analytics tracking here if needed
        });
    });
    
    // Optimize marquee animation performance
    const marqueeContent = document.querySelector('.marquee-content');
    if (marqueeContent) {
        marqueeContent.style.willChange = 'transform';
    }
    
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Initialize hero background
    changeHeroBackground();
    setInterval(changeHeroBackground, 3000);
});

// Hero background image rotation
const heroSection = document.querySelector('.hero');
const heroImages = [
    'url("../Bg_images/image1.jpg")',
    'url("../Bg_images/image2.jpg")',
    'url("../Bg_images/image3.jpg")',
    'url("../Bg_images/image4.jpg")',
];

let currentImageIndex = 0;

function changeHeroBackground() {
    if (heroSection) {
        heroSection.style.backgroundImage = heroImages[currentImageIndex];
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
    }
}

// Mentor slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    const slider = document.querySelector('.slider');
    if (slider) {
        slider.style.transform = `translateX(-${index * 100}%)`;
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Auto-advance mentor slider
setInterval(nextSlide, 4000); // Change every 4 seconds

// Back to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide back to top button based on scroll position
window.addEventListener('scroll', function() {
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    }
});

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.serv .div, .pro, .mentor');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(20, 23, 55, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.transition = 'all 0.3s ease';
        } else {
            navbar.style.backgroundColor = 'transparent';
            navbar.style.backdropFilter = 'none';
        }
    }
});

// Enhanced dropdown menu functionality for desktop
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector('.dropdown-menu');
        let timeout;
        
        // Only apply hover effects on desktop (non-mobile)
        if (window.innerWidth > 768) {
            dropdown.addEventListener('mouseenter', function() {
                clearTimeout(timeout);
                menu.style.opacity = '1';
                menu.style.visibility = 'visible';
                menu.style.transform = 'translateX(-50%) translateY(0)';
            });
            
            dropdown.addEventListener('mouseleave', function() {
                timeout = setTimeout(() => {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                    menu.style.transform = 'translateX(-50%) translateY(10px)';
                }, 100);
            });
        }
    });
});

// Form validation for quote requests (if form exists)
function validateQuoteForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            input.style.borderColor = '#d1d5db';
        }
    });
    
    return isValid;
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const userMenu = document.querySelector('.user');
        
        if (hamburger && hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            userMenu.classList.remove('active');
        }
    }
    
    // Arrow keys for mentor slider
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    animateOnScroll();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);