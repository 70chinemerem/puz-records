/**
 * Landing page JavaScript
 * Handles form submission, smooth scrolling, and animations
 */

// Import authentication functions
import { isAuthenticated, getCurrentUser, logout } from './auth.js';

// Import video file - Vite will process this and provide the correct path
import landingVideo from './videos/landing.mp4';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initVideoBackground();
  initAuthNavigation();
  initSignupForm();
  initSmoothScroll();
  initNavbarScroll();
  initScrollAnimations();
});

/**
 * Initialize video background with correct path and optimize loading
 * This ensures the video path is correctly resolved by Vite in production builds
 * and optimizes video loading for faster playback
 */
function initVideoBackground() {
  const videoSource = document.querySelector('video source');
  const video = document.querySelector('video');

  if (videoSource && landingVideo && video) {
    // Set preload to auto for faster loading (already in HTML, but ensure it's set)
    video.preload = 'auto';
    
    // Always use the imported video path - Vite will handle the correct path resolution
    // This ensures it works in both development and production builds
    videoSource.src = landingVideo;

    // Optimize video loading - start loading immediately
    video.load();

    // Try to play as soon as enough data is loaded (canplay event)
    // This reduces the delay before video starts playing
    const tryPlay = () => {
      if (video.readyState >= 3) { // HAVE_FUTURE_DATA or higher
        video.play().catch(err => {
          // Autoplay might be blocked by browser policy - this is normal
          // The video will still be ready to play when user interacts
          console.warn('Video autoplay may be blocked by browser policy:', err.message);
        });
      }
    };

    // Try to play when enough data is loaded
    video.addEventListener('canplay', tryPlay, { once: true });
    video.addEventListener('loadeddata', tryPlay, { once: true });

    // Fallback: try to play immediately if video is already loaded
    if (video.readyState >= 3) {
      tryPlay();
    } else {
      // If not ready, try to play as soon as possible
      video.play().catch(err => {
        // Will retry on canplay event
        console.warn('Video not ready yet, will retry:', err.message);
      });
    }

    // Ensure video loops seamlessly
    video.loop = true;
  }
}

/**
 * Initialize authentication-based navigation updates
 */
function initAuthNavigation() {
  const isAuth = isAuthenticated();
  const user = getCurrentUser();

  // Get navigation elements
  const authButtonsContainer = document.querySelector('.auth-buttons-container');
  const userMenuContainer = document.querySelector('.user-menu-container');

  if (isAuth && user) {
    // Show user menu, hide auth buttons
    if (authButtonsContainer) authButtonsContainer.classList.add('hidden');
    if (userMenuContainer) {
      userMenuContainer.classList.remove('hidden');
      userMenuContainer.classList.add('flex');
    }

    // Update user info
    const userNameElements = document.querySelectorAll('.user-name-display');
    const userAvatarElements = document.querySelectorAll('.user-avatar');

    userNameElements.forEach(el => {
      if (user.fullName) {
        el.textContent = user.fullName.split(' ')[0]; // First name only
      }
    });

    userAvatarElements.forEach(el => {
      if (user.fullName) {
        const initials = user.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        el.textContent = initials;
      }
    });
  } else {
    // Show auth buttons, hide user menu
    if (authButtonsContainer) authButtonsContainer.classList.remove('hidden');
    if (userMenuContainer) {
      userMenuContainer.classList.add('hidden');
      userMenuContainer.classList.remove('flex');
    }
  }

  // Handle logout
  const logoutButtons = document.querySelectorAll('.logout-btn');
  logoutButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm('Are you sure you want to log out?')) {
        logout();
      }
    });
  });
}

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
      // Form submitted - in production, send to API

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

