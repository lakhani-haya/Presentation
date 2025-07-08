// Smooth scroll animations and interactions
class SmoothScrollAnimations {
    constructor() {
        this.sections = document.querySelectorAll('.section');
        this.currentSection = 0;
        this.isScrolling = false;
        
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupScrollEffects();
        this.setupSmoothNavigation();
        this.setupParallaxEffects();
        this.setupTypingEffect();
        
        // Show first section immediately
        if (this.sections.length > 0) {
            this.sections[0].classList.add('visible');
        }
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.3,
            rootMargin: '-10% 0px -10% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    this.animateSection(entry.target);
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        }, options);

        this.sections.forEach(section => {
            observer.observe(section);
        });
    }

    animateSection(section) {
        // Animate elements within the section with staggered delays
        const animatableElements = section.querySelectorAll(
            '.skill-category, .timeline-item, .value-item, .stat-item, .contact-link'
        );

        animatableElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.transform = 'translateY(0)';
                element.style.opacity = '1';
            }, index * 100);
        });

        // Special animation for snapshot section
        if (section.classList.contains('about-section')) {
            this.animateSnapshot(section);
        }

        // Special animation for academic section
        if (section.classList.contains('academic-section')) {
            this.animateAcademicTimeline(section);
        }

        // Special animation for projects section
        if (section.classList.contains('projects-section')) {
            this.animateProjectCards(section);
        }

        // Special animation for skills section
        if (section.classList.contains('skills-section')) {
            this.animateSkillsSection(section);
        }
    }

    animateSnapshot(section) {
        const flags = section.querySelectorAll('.flag');
        const plane = section.querySelector('.flying-plane');
        const quote = section.querySelector('.main-quote p');
        const markers = section.querySelectorAll('.country-marker');

        // Animate quote typing effect
        if (quote && !quote.classList.contains('animated')) {
            quote.classList.add('animated');
            const text = quote.textContent;
            quote.textContent = '';
            this.typeText(quote, text, 50);
        }

        // Add interactive hover effects to flags and markers
        flags.forEach((flag, index) => {
            flag.addEventListener('mouseenter', () => {
                this.showCountryInfo(flag, index);
                this.highlightMarker(markers[index]);
            });
            
            flag.addEventListener('mouseleave', () => {
                this.hideCountryInfo();
                this.unhighlightMarker(markers[index]);
            });
        });

        // Add click events to markers
        markers.forEach((marker, index) => {
            marker.addEventListener('click', () => {
                this.focusOnCountry(marker, index);
            });
        });

        // Restart plane animation when section becomes visible
        if (plane) {
            plane.style.animation = 'none';
            setTimeout(() => {
                plane.style.animation = 'flyAlongPath 8s ease-in-out infinite';
            }, 500);
        }
    }

    highlightMarker(marker) {
        if (marker) {
            marker.style.fill = 'var(--soft-pink)';
            marker.style.transform = 'scale(1.5)';
        }
    }

    unhighlightMarker(marker) {
        if (marker) {
            marker.style.fill = 'var(--accent-pink)';
            marker.style.transform = 'scale(1)';
        }
    }

    animateProjectCards(section) {
        const projectCards = section.querySelectorAll('.project-card');
        const projectIcons = section.querySelectorAll('.project-icon');
        
        // Reset animations first
        projectCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
        });

        // Animate each card with staggered delay
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transition = 'all 0.8s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                
                // Add special effect to project icon
                const projectIcon = projectIcons[index];
                if (projectIcon) {
                    projectIcon.style.animation = 'iconBounce 0.6s ease forwards';
                }
            }, index * 200 + 300); // Staggered timing
        });

        // Add enhanced hover effects
        projectCards.forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.02)';
                projectIcons[index].style.transform = 'scale(1.2) rotate(10deg)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                projectIcons[index].style.transform = 'scale(1) rotate(0deg)';
            });
        });
    }

    animateSkillsSection(section) {
        const skillCategories = section.querySelectorAll('.skill-category');
        const skillItems = section.querySelectorAll('.skill-item');
        const skillBubbles = section.querySelectorAll('.skill-bubble');
        
        // Add hover effects for skill items
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-3px) scale(1.1)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add interactive effects for skill bubbles
        skillBubbles.forEach((bubble, index) => {
            bubble.addEventListener('mouseenter', () => {
                // Pause floating animation temporarily
                bubble.style.animationPlayState = 'paused';
                bubble.style.transform = 'scale(1.15)';
            });
            
            bubble.addEventListener('mouseleave', () => {
                // Resume floating animation
                bubble.style.animationPlayState = 'running';
                bubble.style.transform = 'scale(1)';
            });
        });
    }

    focusOnCountry(marker, index) {
        const countryNames = ['Pakistan', 'Bosnia', 'Oklahoma'];
        const countryDetails = [
            'Where my journey began - rich culture and strong family values shaped my foundation.',
            'Taught me resilience and adaptability - experiencing different perspectives broadened my world view.',
            'Growing and thriving - building my career while embracing American opportunities and innovation.'
        ];

        // Create a modal or expanded view
        const modal = document.createElement('div');
        modal.className = 'country-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3>${countryNames[index]}</h3>
                <p>${countryDetails[index]}</p>
            </div>
        `;

        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 50);

        // Close modal functionality
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 300);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.opacity = '0';
                setTimeout(() => modal.remove(), 300);
            }
        });
    }

    showCountryInfo(flag, index) {
        const countryInfo = [
            { name: 'Pakistan', info: 'Born here - where my journey began' },
            { name: 'Bosnia', info: 'Shaped by culture and resilience' },
            { name: 'Oklahoma', info: 'Growing and thriving today' }
        ];

        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'country-tooltip';
        tooltip.innerHTML = `
            <strong>${countryInfo[index].name}</strong><br>
            ${countryInfo[index].info}
        `;
        
        flag.parentElement.appendChild(tooltip);
        
        // Position tooltip
        setTimeout(() => {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateY(-10px)';
        }, 50);
    }

    hideCountryInfo() {
        const tooltips = document.querySelectorAll('.country-tooltip');
        tooltips.forEach(tooltip => {
            tooltip.style.opacity = '0';
            setTimeout(() => tooltip.remove(), 300);
        });
    }

    setupScrollEffects() {
        window.addEventListener('scroll', () => {
            this.updateScrollProgress();
            this.parallaxBackground();
        });
    }

    updateScrollProgress() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax effect for hero section
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    }

    parallaxBackground() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.profile-image');
        
        parallaxElements.forEach(element => {
            const speed = 0.3;
            element.style.transform = `translateY(${scrolled * speed}px) scale(${1 + scrolled * 0.0001})`;
        });
    }

    setupSmoothNavigation() {
        // Add smooth scrolling for any navigation links (if added later)
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }

    setupTypingEffect() {
        // Add typing effect to hero tagline
        const tagline = document.querySelector('.hero-tagline');
        if (tagline) {
            const text = tagline.textContent;
            tagline.textContent = '';
            
            setTimeout(() => {
                this.typeText(tagline, text, 100);
            }, 1000);
        }
    }

    typeText(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                element.style.borderRight = 'none'; // Remove cursor
            }
        }, speed);
    }
}

// Enhanced interaction effects
class InteractionEffects {
    constructor() {
        this.init();
    }

    init() {
        this.setupHoverEffects();
        this.setupClickEffects();
        this.setupMouseFollower();
        this.setupProfilePictureInteraction();
    }

    setupHoverEffects() {
        // Add magnetic effect to contact links
        const contactLinks = document.querySelectorAll('.contact-link');
        contactLinks.forEach(link => {
            link.addEventListener('mouseenter', (e) => {
                this.addMagneticEffect(e.target);
            });

            link.addEventListener('mouseleave', (e) => {
                this.removeMagneticEffect(e.target);
            });
        });

        // Add glow effect to skill categories
        const skillCategories = document.querySelectorAll('.skill-category');
        skillCategories.forEach(category => {
            category.addEventListener('mouseenter', () => {
                category.style.boxShadow = '0 20px 50px rgba(255, 105, 180, 0.2)';
            });

            category.addEventListener('mouseleave', () => {
                category.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
            });
        });
    }

    addMagneticEffect(element) {
        element.addEventListener('mousemove', this.magneticMove);
    }

    removeMagneticEffect(element) {
        element.removeEventListener('mousemove', this.magneticMove);
        element.style.transform = 'translateX(0) translateY(0)';
    }

    magneticMove(e) {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        e.target.style.transform = `translateX(${x * 0.1}px) translateY(${y * 0.1}px)`;
    }

    setupClickEffects() {
        // Add ripple effect to clickable elements
        const clickableElements = document.querySelectorAll('.contact-link, .skill-category, .value-item');
        
        clickableElements.forEach(element => {
            element.addEventListener('click', (e) => {
                this.createRippleEffect(e);
            });
        });
    }

    createRippleEffect(e) {
        const ripple = document.createElement('span');
        const rect = e.currentTarget.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 105, 180, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            pointer-events: none;
        `;

        e.currentTarget.style.position = 'relative';
        e.currentTarget.style.overflow = 'hidden';
        e.currentTarget.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    setupMouseFollower() {
        // Create a subtle cursor follower
        const follower = document.createElement('div');
        follower.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(255, 105, 180, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            transform: translate(-50%, -50%);
        `;
        document.body.appendChild(follower);

        document.addEventListener('mousemove', (e) => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        });

        // Hide follower when mouse leaves window
        document.addEventListener('mouseleave', () => {
            follower.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            follower.style.opacity = '1';
        });
    }

    setupProfilePictureInteraction() {
        const profilePic = document.querySelector('#profile-pic');
        if (profilePic) {
            profilePic.addEventListener('click', () => {
                // Add a fun rotation effect when clicked
                profilePic.style.transform = 'rotate(360deg) scale(1.1)';
                setTimeout(() => {
                    profilePic.style.transform = 'rotate(0deg) scale(1)';
                }, 600);
            });

            // Add file input for changing profile picture
            profilePic.addEventListener('dblclick', () => {
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = 'image/*';
                
                fileInput.addEventListener('change', (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            profilePic.src = e.target.result;
                        };
                        reader.readAsDataURL(file);
                    }
                });
                
                fileInput.click();
            });
        }
    }
}

// Statistics counter animation
class StatsCounter {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    animateCounter(element) {
        const target = element.textContent;
        if (target === '∞') return; // Skip infinity symbol

        const numericTarget = parseInt(target.replace('+', ''));
        let current = 0;
        const increment = numericTarget / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericTarget) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (target.includes('+') ? '+' : '');
            }
        }, 30);
    }
}

// Timeline animation
class TimelineAnimation {
    constructor() {
        this.timelineItems = document.querySelectorAll('.timeline-item');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.3 });

        this.timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(50px)';
            item.style.transition = `all 0.6s ease ${index * 0.1}s`;
            observer.observe(item);
        });
    }
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .hero-tagline {
        border-right: 2px solid #ff69b4;
        white-space: nowrap;
        overflow: hidden;
        animation: blink-caret 1s infinite;
    }
    
    @keyframes blink-caret {
        from, to {
            border-color: transparent;
        }
        50% {
            border-color: #ff69b4;
        }
    }
    
    /* Smooth transitions for all interactive elements */
    * {
        transition-property: transform, opacity, color, background-color, border-color, box-shadow;
    }
`;
document.head.appendChild(style);

// Initialize all animations and effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SmoothScrollAnimations();
    new InteractionEffects();
    new StatsCounter();
    new TimelineAnimation();
    
    // Add a loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Handle window resize
window.addEventListener('resize', () => {
    // Recalculate positions for animations
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        if (section.classList.contains('visible')) {
            section.style.transform = 'translateY(0)';
        }
    });
});
