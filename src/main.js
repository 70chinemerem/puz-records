/**
 * Main JavaScript file for Puz Records website
 * Handles navigation, mobile menu, form submission, smooth scrolling, and all interactive features
 */

// Import authentication functions
import { isAuthenticated, getCurrentUser, logout } from './auth.js';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all functionality
  initAuthNavigation();
  initMobileMenu();
  initSmoothScroll();
  initContactForm();
  initScrollAnimations();
  initActiveNavLinks();
  initSearch();
  initMusicPlayer();
  initStatistics();
  initNewsletter();
  initBackToTop();
  initModals();
  initFilters();
  initToast();
});

/**
 * Initialize authentication-based navigation updates
 */
function initAuthNavigation() {
  const isAuth = isAuthenticated();
  const user = getCurrentUser();
  
  // Get navigation elements
  const authButtonsContainer = document.querySelector('.auth-buttons-container');
  const userMenuContainer = document.querySelector('.user-menu-container');
  const mobileAuthButtons = document.querySelector('.mobile-auth-buttons');
  const mobileUserMenu = document.querySelector('.mobile-user-menu');
  
  if (isAuth && user) {
    // Show user menu, hide auth buttons
    if (authButtonsContainer) authButtonsContainer.classList.add('hidden');
    if (userMenuContainer) {
      userMenuContainer.classList.remove('hidden');
      userMenuContainer.classList.add('flex');
    }
    if (mobileAuthButtons) mobileAuthButtons.classList.add('hidden');
    if (mobileUserMenu) {
      mobileUserMenu.classList.remove('hidden');
      mobileUserMenu.classList.add('flex');
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
    if (mobileAuthButtons) mobileAuthButtons.classList.remove('hidden');
    if (mobileUserMenu) {
      mobileUserMenu.classList.add('hidden');
      mobileUserMenu.classList.remove('flex');
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
      // Form submitted - in production, send to API

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

      showToast('Message sent successfully!', 'success');
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
 * Initialize search functionality
 */
function initSearch() {
  const searchBtn = document.getElementById('search-btn');
  const searchOverlay = document.getElementById('search-overlay');
  const searchInput = document.getElementById('search-input');
  const closeSearch = document.getElementById('close-search');
  const searchResults = document.getElementById('search-results');

  // Sample data for search
  const searchData = [
    { type: 'artist', name: 'Nova Wave', genre: 'Electronic • Synthwave', description: 'Pioneering electronic music' },
    { type: 'artist', name: 'Echo Valley', genre: 'Indie • Alternative', description: 'Intimate indie anthems' },
    { type: 'artist', name: 'Midnight Drive', genre: 'Hip-Hop • R&B', description: 'Smooth R&B vibes' },
    { type: 'release', name: 'Neon Dreams', artist: 'Nova Wave', type: 'Album', year: '2024' },
    { type: 'release', name: 'City Lights', artist: 'Echo Valley', type: 'EP', year: '2024' },
    { type: 'release', name: 'After Hours', artist: 'Midnight Drive', type: 'Single', year: '2024' },
    { type: 'release', name: 'Summer Vibes', artist: 'Various Artists', type: 'Compilation', year: '2024' },
  ];

  // Open search overlay
  if (searchBtn && searchOverlay) {
    searchBtn.addEventListener('click', () => {
      searchOverlay.classList.remove('hidden');
      searchOverlay.classList.add('flex');
      searchInput.focus();
    });
  }

  // Close search overlay
  if (closeSearch && searchOverlay) {
    closeSearch.addEventListener('click', () => {
      searchOverlay.classList.add('hidden');
      searchOverlay.classList.remove('flex');
      searchInput.value = '';
      searchResults.innerHTML = '';
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !searchOverlay.classList.contains('hidden')) {
      searchOverlay.classList.add('hidden');
      searchOverlay.classList.remove('flex');
      searchInput.value = '';
      searchResults.innerHTML = '';
    }
  });

  // Search functionality
  if (searchInput && searchResults) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();

      if (query.length === 0) {
        searchResults.innerHTML = '';
        return;
      }

      // Filter search data
      const results = searchData.filter(item => {
        const searchableText = `${item.name} ${item.artist || ''} ${item.genre || ''} ${item.description || ''}`.toLowerCase();
        return searchableText.includes(query);
      });

      // Display results
      if (results.length === 0) {
        searchResults.innerHTML = '<p class="text-gray-400 text-center py-4">No results found</p>';
      } else {
        searchResults.innerHTML = results.map(item => {
          if (item.type === 'artist') {
            return `
              <div class="p-3 glass-effect rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                <div class="font-semibold">${item.name}</div>
                <div class="text-sm text-gray-400">${item.genre}</div>
              </div>
            `;
          } else {
            return `
              <div class="p-3 glass-effect rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                <div class="font-semibold">${item.name}</div>
                <div class="text-sm text-gray-400">${item.artist} • ${item.type} • ${item.year}</div>
              </div>
            `;
          }
        }).join('');
      }
    });
  }
}

/**
 * Initialize music player functionality
 */
function initMusicPlayer() {
  const player = document.getElementById('music-player');
  const playPauseBtn = document.getElementById('player-play-pause');
  const prevBtn = document.getElementById('player-prev');
  const nextBtn = document.getElementById('player-next');
  const closeBtn = document.getElementById('player-close');
  const audio = document.getElementById('audio-element');
  const playIcon = document.getElementById('play-icon');
  const pauseIcon = document.getElementById('pause-icon');
  const playerTitle = document.getElementById('player-title');
  const playerArtist = document.getElementById('player-artist');
  const playerProgress = document.getElementById('player-progress');
  const playerCurrentTime = document.getElementById('player-current-time');
  const playerDuration = document.getElementById('player-duration');
  const playerAlbumArt = document.getElementById('player-album-art');
  const playReleaseBtns = document.querySelectorAll('.play-release-btn');

  let isPlaying = false;
  let currentTrack = null;

  // Sample tracks data (in production, these would be real audio URLs)
  const tracks = [
    { title: 'Neon Dreams', artist: 'Nova Wave', url: '#', duration: '3:45', gradient: 'from-blue-500 to-purple-600' },
    { title: 'City Lights', artist: 'Echo Valley', url: '#', duration: '4:12', gradient: 'from-purple-500 to-pink-600' },
    { title: 'After Hours', artist: 'Midnight Drive', url: '#', duration: '3:28', gradient: 'from-pink-500 to-orange-600' },
    { title: 'Summer Vibes', artist: 'Various Artists', url: '#', duration: '3:55', gradient: 'from-orange-500 to-yellow-600' },
  ];

  // Play release button handlers
  playReleaseBtns.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const releaseCard = btn.closest('.release-card');
      if (releaseCard) {
        const title = releaseCard.dataset.title;
        const artist = releaseCard.dataset.artist;
        playTrack(tracks[index] || { title, artist, url: '#', duration: '3:30', gradient: 'from-blue-500 to-purple-600' });
      }
    });
  });

  // Play track function
  function playTrack(track) {
    currentTrack = track;
    playerTitle.textContent = track.title;
    playerArtist.textContent = track.artist;
    playerDuration.textContent = track.duration;
    playerAlbumArt.className = `w-16 h-16 bg-gradient-to-br ${track.gradient} rounded-lg flex-shrink-0`;

    // Show player
    player.classList.remove('translate-y-full');

    // In production, set audio.src = track.url and play
    // For demo, we'll just show the player
    showToast(`Now playing: ${track.title}`, 'info');
  }

  // Play/Pause toggle
  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      if (isPlaying) {
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
        // audio.play();
      } else {
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
        // audio.pause();
      }
    });
  }

  // Update progress (simulated)
  function updateProgress() {
    if (isPlaying && currentTrack) {
      // In production, use audio.currentTime and audio.duration
      const current = 120; // seconds
      const total = 225; // seconds
      const percent = (current / total) * 100;
      playerProgress.style.width = `${percent}%`;
      playerCurrentTime.textContent = formatTime(current);
    }
  }

  // Format time helper
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  // Close player
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      player.classList.add('translate-y-full');
      isPlaying = false;
      playIcon.classList.remove('hidden');
      pauseIcon.classList.add('hidden');
      // audio.pause();
    });
  }

  // Update progress periodically
  setInterval(updateProgress, 1000);
}

/**
 * Initialize statistics counter animation
 */
function initStatistics() {
  const counters = document.querySelectorAll('[data-count]');

  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateCounter(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach(counter => {
    observer.observe(counter);
  });

  function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }
}

/**
 * Initialize newsletter subscription
 */
function initNewsletter() {
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterMessage = document.getElementById('newsletter-message');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('newsletter-email').value;

      // Simulate subscription (replace with actual API call)
      // Newsletter subscription - in production, send to API

      if (newsletterMessage) {
        newsletterMessage.textContent = 'Thank you for subscribing!';
        newsletterMessage.className = 'mt-4 text-sm text-green-400';
      }

      newsletterForm.reset();
      showToast('Successfully subscribed to newsletter!', 'success');

      // Clear message after 5 seconds
      setTimeout(() => {
        if (newsletterMessage) {
          newsletterMessage.textContent = '';
        }
      }, 5000);
    });
  }
}

/**
 * Initialize back to top button
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/**
 * Initialize modals for artist/release details
 */
function initModals() {
  const modal = document.getElementById('detail-modal');
  const closeModal = document.getElementById('close-modal');
  const modalContent = document.getElementById('modal-content');
  const artistCards = document.querySelectorAll('.artist-card');

  // Close modal
  if (closeModal && modal) {
    closeModal.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    });

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    });
  }

  // Artist card click handlers
  artistCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't open modal if clicking the "View Details" button
      if (e.target.tagName === 'BUTTON') {
        e.stopPropagation();
      }

      const artist = card.dataset.artist;
      const genre = card.dataset.genre;

      if (modal && modalContent) {
        modalContent.innerHTML = `
          <div class="space-y-6">
            <div class="w-full h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl"></div>
            <div>
              <h2 class="text-3xl font-display font-bold mb-2 text-gradient">${artist}</h2>
              <p class="text-gray-400 mb-4">${genre}</p>
              <p class="text-gray-300 leading-relaxed">
                ${card.querySelector('p.text-gray-300')?.textContent || 'Artist information coming soon.'}
              </p>
            </div>
            <div class="flex gap-4">
              <button class="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg transition-all">
                Follow Artist
              </button>
              <button class="px-6 py-3 glass-effect rounded-lg font-semibold hover:bg-white/20 transition-all">
                View Releases
              </button>
            </div>
          </div>
        `;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      }
    });
  });
}

/**
 * Initialize filter and sort functionality for releases
 */
function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const sortSelect = document.getElementById('sort-select');
  const releasesGrid = document.getElementById('releases-grid');
  const releaseCards = document.querySelectorAll('.release-card');

  let currentFilter = 'all';

  // Filter button handlers
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active', 'bg-blue-500/30'));
      btn.classList.add('active', 'bg-blue-500/30');

      currentFilter = btn.dataset.filter;
      applyFilters();
    });
  });

  // Sort handler
  if (sortSelect) {
    sortSelect.addEventListener('change', applyFilters);
  }

  function applyFilters() {
    const sortValue = sortSelect?.value || 'newest';
    let visibleCards = Array.from(releaseCards);

    // Apply filter
    if (currentFilter !== 'all') {
      visibleCards = visibleCards.filter(card => card.dataset.type === currentFilter);
    }

    // Apply sort
    visibleCards.sort((a, b) => {
      if (sortValue === 'newest') {
        return new Date(b.dataset.date) - new Date(a.dataset.date);
      } else if (sortValue === 'oldest') {
        return new Date(a.dataset.date) - new Date(b.dataset.date);
      } else if (sortValue === 'name') {
        return a.dataset.title.localeCompare(b.dataset.title);
      }
      return 0;
    });

    // Hide all cards
    releaseCards.forEach(card => {
      card.style.display = 'none';
    });

    // Show filtered and sorted cards with animation
    visibleCards.forEach((card, index) => {
      setTimeout(() => {
        card.style.display = 'block';
        card.classList.add('animate-fade-in-up');
      }, index * 50);
    });
  }
}

/**
 * Initialize toast notification system
 */
function initToast() {
  // Toast function is available globally
  window.showToast = function (message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    const colors = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      info: 'bg-blue-500',
      warning: 'bg-yellow-500'
    };

    toast.className = `${colors[type] || colors.info} text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-up flex items-center gap-2`;
    toast.innerHTML = `
      <span>${message}</span>
      <button class="ml-2 hover:opacity-75" onclick="this.parentElement.remove()">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>
    `;

    toastContainer.appendChild(toast);

    // Auto remove after 5 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 5000);
  };
}
