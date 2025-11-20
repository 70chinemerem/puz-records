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
  initMobileMenu();
});

/**
 * Initialize video background with correct path and optimize loading
 * This ensures the video path is correctly resolved by Vite in production builds
 * and optimizes video loading for faster playback with comprehensive error handling
 */
function initVideoBackground() {
  const videoSource = document.querySelector('video source');
  const video = document.querySelector('video');

  if (!video) {
    console.error('Video element not found');
    return;
  }

  if (!videoSource) {
    console.error('Video source element not found');
    return;
  }

  if (!landingVideo) {
    console.error('Landing video import not available');
    return;
  }

  // Set preload to auto for faster loading
  video.preload = 'auto';

  // Always use the imported video path - Vite will handle the correct path resolution
  // This ensures it works in both development and production builds
  videoSource.src = landingVideo;
  console.log('Video source set to:', landingVideo);

  // Add comprehensive error handling
  video.addEventListener('error', (e) => {
    const error = video.error;
    if (error) {
      let errorMsg = 'Unknown error';
      switch (error.code) {
        case error.MEDIA_ERR_ABORTED:
          errorMsg = 'Video loading was aborted';
          break;
        case error.MEDIA_ERR_NETWORK:
          errorMsg = 'Network error - video file not found or CORS issue';
          break;
        case error.MEDIA_ERR_DECODE:
          errorMsg = 'Video decode error - file may be corrupted';
          break;
        case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
          errorMsg = 'Video format not supported';
          break;
      }
      console.error('Video error:', errorMsg, error);
    }
  });

  // Log loading progress
  video.addEventListener('loadstart', () => {
    console.log('Video loading started');
  });

  video.addEventListener('loadedmetadata', () => {
    console.log('Video metadata loaded, duration:', video.duration);
  });

  video.addEventListener('loadeddata', () => {
    console.log('Video data loaded, readyState:', video.readyState);
  });

  video.addEventListener('canplay', () => {
    console.log('Video can play, readyState:', video.readyState);
  });

  video.addEventListener('canplaythrough', () => {
    console.log('Video can play through');
  });

  // Optimize video loading - start loading immediately
  video.load();

  // Try to play as soon as enough data is loaded
  const tryPlay = () => {
    // Check if page is visible (not in background tab)
    if (document.hidden) {
      console.log('Page is hidden, will retry when visible');
      return;
    }

    if (video.readyState >= 3) { // HAVE_FUTURE_DATA or higher
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Video playback started successfully');
          })
          .catch(err => {
            // Handle specific browser power-saving pause
            if (err.name === 'NotAllowedError' ||
              err.message.includes('interrupted') ||
              err.message.includes('paused to save power')) {
              console.log('Video paused by browser power-saving, will retry when page is visible');
              // Will retry when page becomes visible
            } else {
              // Other autoplay blocking
              console.warn('Video autoplay blocked:', err.name, err.message);
            }
          });
      }
    } else {
      console.log('Video not ready yet, readyState:', video.readyState);
    }
  };

  // Retry playing when page becomes visible (handles power-saving pause)
  const handleVisibilityChange = () => {
    if (!document.hidden && video.paused && video.readyState >= 3) {
      console.log('Page became visible, retrying video playback');
      video.play().catch(err => {
        console.log('Retry failed:', err.message);
      });
    }
  };

  // Listen for page visibility changes
  document.addEventListener('visibilitychange', handleVisibilityChange);

  // Also retry when window gains focus
  window.addEventListener('focus', () => {
    if (video.paused && video.readyState >= 3) {
      console.log('Window focused, retrying video playback');
      video.play().catch(err => {
        console.log('Focus retry failed:', err.message);
      });
    }
  });

  // Try to play when enough data is loaded
  video.addEventListener('canplay', tryPlay, { once: true });
  video.addEventListener('loadeddata', tryPlay, { once: true });
  video.addEventListener('canplaythrough', tryPlay, { once: true });

  // Handle when video is paused by browser (power-saving)
  video.addEventListener('pause', () => {
    // Only log if paused by browser, not by user
    if (video.readyState >= 3 && !video.ended) {
      console.log('Video paused (possibly by browser power-saving)');
    }
  });

  // Retry when video becomes playable after being paused
  video.addEventListener('playing', () => {
    console.log('Video is now playing');
  });

  // Fallback: try to play immediately if video is already loaded
  if (video.readyState >= 3 && !document.hidden) {
    tryPlay();
  } else {
    // If not ready, try to play as soon as possible
    setTimeout(() => {
      if (video.readyState >= 2 && !document.hidden) { // HAVE_CURRENT_DATA or higher
        tryPlay();
      }
    }, 100);
  }

  // Ensure video loops seamlessly
  video.loop = true;

  // Ensure muted and playsinline are set (required for autoplay)
  video.muted = true;
  video.setAttribute('playsinline', '');
  video.setAttribute('autoplay', '');
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

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const menuClose = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-menu-overlay');

  // Open menu
  if (menuBtn && mobileMenu && mobileOverlay) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('translate-x-full');
      mobileOverlay.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    });
  }

  // Close menu
  const closeMenu = () => {
    if (mobileMenu && mobileOverlay) {
      mobileMenu.classList.add('translate-x-full');
      mobileOverlay.classList.add('hidden');
      document.body.style.overflow = ''; // Restore scroll
    }
  };

  if (menuClose) {
    menuClose.addEventListener('click', closeMenu);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMenu);
  }

  // Close menu when clicking on menu links
  const menuLinks = mobileMenu?.querySelectorAll('a');
  if (menuLinks) {
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });
  }

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('translate-x-full')) {
      closeMenu();
    }
  });

  // Handle logout button in mobile menu
  const logoutBtn = mobileMenu?.querySelector('.logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      logout();
      closeMenu();
      window.location.href = 'index.html';
    });
  }
}

