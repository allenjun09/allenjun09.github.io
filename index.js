// ===== DOM Elements =====
const nav = document.getElementById('nav');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

// ===== Navigation Scroll Effect =====
let lastScroll = 0;
const navHeight = 70;

function handleNavScroll() {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class for background
    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
}

// ===== Mobile Navigation Toggle =====
function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
}

function closeMobileMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
}

// ===== Smooth Scrolling =====
function smoothScroll(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    
    if (targetId === '#') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - navHeight;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
    
    // Close mobile menu after clicking a link
    closeMobileMenu();
}

// ===== Active Navigation Link Highlighting =====
function highlightNavLink() {
    const scrollPosition = window.pageYOffset + navHeight + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== Section Visibility Animation (Intersection Observer) =====
function handleSectionVisibility() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// ===== Contact Form Handling =====
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Basic validation
    if (!name || !email || !message) {
        showFormMessage('Please fill in all fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission (frontend only)
    // In production, this would send data to a backend
    showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
    
    // Reset form
    contactForm.reset();
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.classList.remove('success', 'error');
        formMessage.style.display = 'none';
    }, 5000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = 'form-message ' + type;
    formMessage.style.display = 'block';
}

// ===== Typing Effect for Hero (Optional Enhancement) =====
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===== Skill Cards Hover Effect =====
function initializeSkillCardEffects() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 30px -15px rgba(2, 12, 27, 0.7)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });
}

// ===== Project Cards Hover Effect =====
function initializeProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 30px -15px rgba(2, 12, 27, 0.7)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });
}

// ===== Interest Cards Hover Effect =====
function initializeInterestCardEffects() {
    const interestCards = document.querySelectorAll('.interest-card');
    
    interestCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 30px -15px rgba(2, 12, 27, 0.7)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });
}

// ===== Close Mobile Menu on Outside Click =====
function handleOutsideClick(e) {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !navToggle.contains(e.target)) {
        closeMobileMenu();
    }
}

// ===== Close Mobile Menu on Escape Key =====
function handleEscapeKey(e) {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
}

// ===== Initialize All Event Listeners =====
function initializeEventListeners() {
    // Scroll events
    window.addEventListener('scroll', handleNavScroll);
    window.addEventListener('scroll', highlightNavLink);
    
    // Mobile menu toggle
    navToggle.addEventListener('click', toggleMobileMenu);
    
    // Smooth scrolling for all navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', smoothScroll);
    });
    
    // Close mobile menu on outside click
    document.addEventListener('click', handleOutsideClick);
    
    // Close mobile menu on Escape key
    document.addEventListener('keydown', handleEscapeKey);
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

// ===== Initialize Everything on DOM Load =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize event listeners
    initializeEventListeners();
    
    // Initialize section visibility animations
    handleSectionVisibility();
    
    // Initialize hover effects
    initializeSkillCardEffects();
    initializeProjectCardEffects();
    initializeInterestCardEffects();
    
    // Initial scroll check (in case page loads scrolled)
    handleNavScroll();
    highlightNavLink();
    
    // Add loaded class to body for potential CSS animations
    document.body.classList.add('loaded');
});

// ===== Prevent Layout Shift on Page Load =====
window.addEventListener('load', function() {
    // Remove any loading states
    document.body.classList.add('fully-loaded');
});

// ===== PROJECT GALLERY MODAL & CAROUSEL =====

// Modal Elements
const galleryModal = document.getElementById('gallery-modal');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const openGalleryBtn = document.getElementById('open-gallery');

// Carousel Elements
const carouselInner = document.getElementById('carousel-inner');
const carouselSlides = document.querySelectorAll('.carousel-slide');
const carouselPrev = document.getElementById('carousel-prev');
const carouselNext = document.getElementById('carousel-next');
const carouselDots = document.querySelectorAll('.carousel-dot');
const currentSlideEl = document.getElementById('current-slide');
const totalSlidesEl = document.getElementById('total-slides');

let currentSlide = 0;
const totalSlides = carouselSlides.length;

// Initialize total slides display
if (totalSlidesEl) {
    totalSlidesEl.textContent = totalSlides;
}

// ===== Modal Functions =====
function openModal() {
    if (galleryModal) {
        galleryModal.classList.add('active');
        galleryModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        // Reset to first slide when opening
        goToSlide(0);
        // Focus on close button for accessibility
        if (modalClose) {
            modalClose.focus();
        }
    }
}

function closeModal() {
    if (galleryModal) {
        galleryModal.classList.remove('active');
        galleryModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        // Return focus to the trigger button
        if (openGalleryBtn) {
            openGalleryBtn.focus();
        }
    }
}

// ===== Carousel Functions =====
function goToSlide(index) {
    // Handle wrap-around
    if (index < 0) {
        index = totalSlides - 1;
    } else if (index >= totalSlides) {
        index = 0;
    }
    
    currentSlide = index;
    
    // Update carousel position
    if (carouselInner) {
        carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    // Update active states for slides
    carouselSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
    });
    
    // Update active states for dots
    carouselDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
    
    // Update counter
    if (currentSlideEl) {
        currentSlideEl.textContent = currentSlide + 1;
    }
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function prevSlide() {
    goToSlide(currentSlide - 1);
}

// ===== Modal Event Listeners =====
function initializeModalListeners() {
    // Open modal when clicking on project image
    if (openGalleryBtn) {
        openGalleryBtn.addEventListener('click', openModal);
        openGalleryBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal();
            }
        });
    }
    
    // Close modal when clicking close button
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking overlay
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }
    
    // Carousel navigation buttons
    if (carouselPrev) {
        carouselPrev.addEventListener('click', prevSlide);
    }
    
    if (carouselNext) {
        carouselNext.addEventListener('click', nextSlide);
    }
    
    // Carousel dot indicators
    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // Keyboard navigation for modal and carousel
    document.addEventListener('keydown', handleModalKeyboard);
}

function handleModalKeyboard(e) {
    // Only handle if modal is open
    if (!galleryModal || !galleryModal.classList.contains('active')) {
        return;
    }
    
    switch (e.key) {
        case 'Escape':
            closeModal();
            break;
        case 'ArrowLeft':
            prevSlide();
            break;
        case 'ArrowRight':
            nextSlide();
            break;
    }
}

// ===== Touch/Swipe Support for Carousel =====
let touchStartX = 0;
let touchEndX = 0;

function initializeTouchSupport() {
    if (!carouselInner) return;
    
    carouselInner.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carouselInner.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            nextSlide();
        } else {
            // Swipe right - previous slide
            prevSlide();
        }
    }
}

// Initialize modal and carousel when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeModalListeners();
    initializeTouchSupport();
});
