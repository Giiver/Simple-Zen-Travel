document.addEventListener('DOMContentLoaded', function() {
    
    const header = document.getElementById('header');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');
    const scrollTop = document.getElementById('scroll-top');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
            document.body.style.overflow = '';
        });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
            document.body.style.overflow = '';
        });
    });
    
    function handleScroll() {
        if (window.scrollY > 100) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    header.classList.add('header--scrolled');
                    scrollTop.classList.add('visible');
                } else {
                    header.classList.remove('header--scrolled');
                    scrollTop.classList.remove('visible');
                }
                
                updateActiveNavLink();
            });
        }
        
        if (window.scrollY > 100) {
            header.classList.add('header--scrolled');
            scrollTop.classList.add('visible');
        } else {
            header.classList.remove('header--scrolled');
            scrollTop.classList.remove('visible');
        }
        
        updateActiveNavLink();
    }
    
    // Stacked images slider
    const stackedImages = document.querySelectorAll('.stacked-image');
    if (stackedImages.length > 0) {
        let currentPositions = [1, 2, 3]; // Track which image is in which position
        
        function rotateImages() {
            // Add transitioning class for fade effect
            stackedImages.forEach(img => {
                img.classList.add('transitioning');
            });
            
            // Wait for fade out, then change positions
            setTimeout(() => {
                // Rotate positions: 1->3, 2->1, 3->2
                currentPositions = [currentPositions[2], currentPositions[0], currentPositions[1]];
                
                // Apply new classes based on positions
                stackedImages.forEach((img, index) => {
                    // Remove all position classes
                    img.classList.remove('stacked-image--1', 'stacked-image--2', 'stacked-image--3');
                    
                    // Find which position this image should be in
                    const positionIndex = currentPositions.indexOf(index + 1);
                    const newPosition = positionIndex + 1;
                    
                    // Add the new position class
                    img.classList.add(`stacked-image--${newPosition}`);
                });
                
                // Remove transitioning class for fade in after position transition completes
                setTimeout(() => {
                    stackedImages.forEach(img => {
                        img.classList.remove('transitioning');
                    });
                }, 800); // Match the CSS transition duration (0.8s)
            }, 300);
        }
        
        // Rotate images every 4 seconds
        setInterval(rotateImages, 4000);
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }
    
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.style.getPropertyValue('--delay') || '0s';
                entry.target.style.transitionDelay = delay;
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
    
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Message envoyé !';
                submitBtn.style.background = '#28a745';
                
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const experienceCards = document.querySelectorAll('.experience-card');
    
    experienceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '';
        });
    });
    
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            pricingCards.forEach(c => {
                if (c !== this) {
                    c.style.opacity = '0.7';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            pricingCards.forEach(c => {
                c.style.opacity = '';
            });
        });
    });
    
    function animateCounters() {
        const counters = document.querySelectorAll('.stat__value, .badge-number');
        
        counters.forEach(counter => {
            const text = counter.textContent;
            const hasSymbol = text.includes('$') || text.includes('%');
            const numericValue = parseInt(text.replace(/[^0-9]/g, ''));
            
            if (isNaN(numericValue)) return;
            
            let current = 0;
            const increment = numericValue / 50;
            const duration = 1500;
            const stepTime = duration / 50;
            
            const timer = setInterval(() => {
                current += increment;
                
                if (current >= numericValue) {
                    counter.textContent = text;
                    clearInterval(timer);
                } else {
                    let displayValue = Math.floor(current);
                    if (text.includes('$')) {
                        displayValue = displayValue + '$';
                    } else if (text.includes('%')) {
                        displayValue = displayValue + '%';
                    }
                    counter.textContent = displayValue;
                }
            }, stepTime);
        });
    }
    
    const statsSection = document.querySelector('.ambassadeur__stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
    
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
    } else {
        const lazyImageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    lazyImageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => lazyImageObserver.observe(img));
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('show-menu')) {
            navMenu.classList.remove('show-menu');
            document.body.style.overflow = '';
        }
    });
    
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    navLinks.forEach((link, index) => {
        link.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const nextLink = navLinks[index + 1] || navLinks[0];
                nextLink.focus();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prevLink = navLinks[index - 1] || navLinks[navLinks.length - 1];
                prevLink.focus();
            }
        });
    });
    
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    console.log('Zen Travel - Site loaded successfully');
});
