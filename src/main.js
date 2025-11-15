/**
 * Main JavaScript file for Puz Records website
 * Handles navigation, mobile menu, form submission, and smooth scrolling
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all functionality
  initMobileMenu();
  initSmoothScroll();
  initContactForm();
  initScrollAnimations();
  initActiveNavLinks();
});

/**
 * Initialize mobile menu toggle functionality
 */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');

      // Toggle hamburger icon to X
      const icon = mobileMenuBtn.querySelector('svg');
      if (icon) {
        icon.classList.toggle('rotate-90');
      }
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

/**
 * Initialize smooth scrolling for navigation links
 */
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Skip if it's just "#"
      if (href === '#' || href === '') {
        return;
      }

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();

        // Calculate offset for fixed navigation
        const navHeight = document.querySelector('nav')?.offsetHeight || 0;
        const targetPosition = target.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Initialize contact form submission handling
 */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');

      // Simulate form submission (replace with actual API call)
      // In a real application, you would send this data to a backend server
      console.log('Form submitted:', { name, email, message });

      // Show success message
      if (formMessage) {
        formMessage.classList.remove('hidden');
        formMessage.textContent = 'Thank you for your message! We\'ll get back to you soon.';
        formMessage.className = 'text-center text-sm text-green-400';

        // Reset form
        contactForm.reset();

        // Hide message after 5 seconds
        setTimeout(() => {
          formMessage.classList.add('hidden');
        }, 5000);
      }
    });
  }
}

/**
 * Initialize scroll animations for elements
 */
function initScrollAnimations() {
  // Create Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections and cards
  const animatedElements = document.querySelectorAll('section > div, .glass-effect');
  animatedElements.forEach(el => {
    observer.observe(el);
  });
}

/**
 * Initialize active navigation link highlighting based on scroll position
 */
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100; // Offset for fixed nav

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('text-blue-400', 'font-semibold');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('text-blue-400', 'font-semibold');
          }
        });
      }
    });
  }

  // Update on scroll
  window.addEventListener('scroll', updateActiveNavLink);

  // Initial update
  updateActiveNavLink();
}

/**
 * Add parallax effect to hero section (optional enhancement)
 */
function initParallaxEffect() {
  const hero = document.getElementById('home');

  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.5;

      if (scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${rate}px)`;
      }
    });
  }
}

// Optional: Uncomment to enable parallax effect
// initParallaxEffect();

