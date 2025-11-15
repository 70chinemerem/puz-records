/**
 * Landing page JavaScript
 * Handles form submission, smooth scrolling, and animations
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initSignupForm();
  initSmoothScroll();
  initNavbarScroll();
  initScrollAnimations();
});

/**
 * Initialize signup form handling
 */
function initSignupForm() {
  const signupForm = document.getElementById('landing-signup-form');
  const successMessage = document.getElementById('signup-success');
  
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(signupForm);
      const firstName = document.getElementById('first-name').value;
      const lastName = document.getElementById('last-name').value;
      const email = document.getElementById('signup-email').value;
      
      // Simulate form submission (replace with actual API call)
      console.log('Signup submitted:', { firstName, lastName, email });
      
      // Show success message
      if (successMessage) {
        successMessage.classList.remove('hidden');
        signupForm.reset();
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Optional: Hide form after success
        setTimeout(() => {
          signupForm.style.opacity = '0.5';
        }, 500);
      }
      
      // In production, send data to your backend API
      // Example:
      // fetch('/api/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ firstName, lastName, email })
      // })
      // .then(response => response.json())
      // .then(data => {
      //   // Handle success
      // })
      // .catch(error => {
      //   // Handle error
      // });
    });
  }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
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
 * Initialize navbar scroll effect (change opacity/background on scroll)
 */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('bg-gray-900/80');
        navbar.classList.remove('bg-transparent');
      } else {
        navbar.classList.remove('bg-gray-900/80');
        navbar.classList.add('bg-transparent');
      }
    });
  }
}

/**
 * Initialize scroll-triggered animations
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
  
  // Observe all sections and feature cards
  const animatedElements = document.querySelectorAll('section > div, .glass-effect');
  animatedElements.forEach((el, index) => {
    // Add staggered animation delay
    el.style.animationDelay = `${index * 0.1}s`;
    observer.observe(el);
  });
}

/**
 * Add parallax effect to hero section (optional)
 */
function initParallax() {
  const hero = document.getElementById('home');
  
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.3;
      
      if (scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${rate}px)`;
      }
    });
  }
}

// Optional: Uncomment to enable parallax effect
// initParallax();

