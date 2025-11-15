/**
 * Dashboard JavaScript
 * Handles navigation, section switching, mobile menu, and interactions
 */

// Import authentication functions
import { logout, getCurrentUser, isAuthenticated } from './auth.js';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Check authentication first
  checkAuth();
  
  initMobileMenu();
  initNavigation();
  initSearch();
  initLogout();
  initSettings();
  initPlaylistActions();
  loadUserProfile();
});

/**
 * Check if user is authenticated, redirect if not
 */
function checkAuth() {
  if (!isAuthenticated()) {
    window.location.href = 'login.html';
    return;
  }
}

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const sidebar = document.getElementById('sidebar');
  const mobileOverlay = document.getElementById('mobile-overlay');
  
  if (mobileMenuBtn && sidebar) {
    mobileMenuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('-translate-x-full');
      if (mobileOverlay) {
        mobileOverlay.classList.toggle('hidden');
      }
    });
  }
  
  // Close sidebar when clicking overlay
  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', () => {
      sidebar.classList.add('-translate-x-full');
      mobileOverlay.classList.add('hidden');
    });
  }
  
  // Close sidebar when clicking nav items on mobile
  const navItems = document.querySelectorAll('.dashboard-nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        sidebar.classList.add('-translate-x-full');
        if (mobileOverlay) {
          mobileOverlay.classList.add('hidden');
        }
      }
    });
  });
}

/**
 * Initialize dashboard navigation between sections
 */
function initNavigation() {
  const navItems = document.querySelectorAll('.dashboard-nav-item');
  const sections = document.querySelectorAll('.dashboard-section');
  
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all nav items
      navItems.forEach(nav => nav.classList.remove('active', 'bg-blue-500/20', 'text-blue-400'));
      
      // Add active class to clicked item
      item.classList.add('active', 'bg-blue-500/20', 'text-blue-400');
      
      // Hide all sections
      sections.forEach(section => section.classList.add('hidden'));
      
      // Show selected section
      const targetSection = item.dataset.section;
      const section = document.getElementById(targetSection);
      if (section) {
        section.classList.remove('hidden');
        section.classList.add('animate-fade-in-up');
      }
    });
  });
  
  // Handle hash navigation on page load
  const hash = window.location.hash.substring(1);
  if (hash) {
    const targetNav = document.querySelector(`[data-section="${hash}"]`);
    if (targetNav) {
      targetNav.click();
    }
  }
}

/**
 * Initialize search functionality
 */
function initSearch() {
  const searchInput = document.querySelector('header input[type="text"]');
  
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      
      // In production, this would filter/search through the user's library
      console.log('Searching for:', query);
      
      // You can implement search logic here
      // For example, filter visible items based on query
    });
    
    // Handle Enter key
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        // Perform search
        console.log('Performing search:', searchInput.value);
      }
    });
  }
}

/**
 * Initialize logout functionality
 */
function initLogout() {
  const logoutBtn = document.getElementById('logout-btn');
  
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      // Show confirmation dialog
      if (confirm('Are you sure you want to log out?')) {
        // Call logout function from auth.js
        logout();
      }
    });
  }
}

/**
 * Load and display user profile information
 */
function loadUserProfile() {
  const user = getCurrentUser();
  
  if (user) {
    // Update user name in sidebar
    const userNameElements = document.querySelectorAll('p.font-semibold');
    userNameElements.forEach(el => {
      if (el.textContent.includes('John Doe') || el.closest('.flex.items-center.gap-3')) {
        const nameParts = user.fullName ? user.fullName.split(' ') : ['User'];
        el.textContent = user.fullName || 'User';
        
        // Update initials in avatar
        const avatar = el.closest('.flex.items-center.gap-3')?.querySelector('.rounded-full');
        if (avatar && nameParts.length >= 2) {
          const initials = nameParts[0][0] + nameParts[1][0];
          avatar.textContent = initials.toUpperCase();
        }
      }
    });
    
    // Update welcome message
    const welcomeHeading = document.querySelector('#overview h1');
    if (welcomeHeading && user.fullName) {
      const firstName = user.fullName.split(' ')[0];
      welcomeHeading.textContent = `Welcome Back, ${firstName}!`;
    }
    
    // Update email in settings if exists
    const emailInput = document.querySelector('#settings input[type="email"]');
    if (emailInput && user.email) {
      emailInput.value = user.email;
    }
    
    // Update display name in settings
    const nameInput = document.querySelector('#settings input[type="text"]');
    if (nameInput && user.fullName) {
      nameInput.value = user.fullName;
    }
  }
}

/**
 * Initialize settings form handling
 */
function initSettings() {
  const settingsSection = document.getElementById('settings');
  
  if (settingsSection) {
    // Handle profile form submission
    const profileForm = settingsSection.querySelector('form');
    if (profileForm) {
      profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(profileForm);
        
        // In production, send to API
        console.log('Updating profile:', Object.fromEntries(formData));
        
        // Show success message
        showNotification('Profile updated successfully!', 'success');
      });
    }
    
    // Handle audio quality selection
    const qualityInputs = settingsSection.querySelectorAll('input[name="quality"]');
    qualityInputs.forEach(input => {
      input.addEventListener('change', (e) => {
        console.log('Audio quality changed to:', e.target.value);
        // In production, save preference to backend
      });
    });
    
    // Handle privacy toggles
    const privacyToggles = settingsSection.querySelectorAll('input[type="checkbox"]');
    privacyToggles.forEach(toggle => {
      toggle.addEventListener('change', (e) => {
        const setting = e.target.closest('label').querySelector('span').textContent;
        console.log(`${setting}:`, e.target.checked);
        // In production, save preference to backend
      });
    });
  }
}

/**
 * Initialize playlist actions
 */
function initPlaylistActions() {
  // Handle "Create New Playlist" button
  const createPlaylistBtns = document.querySelectorAll('button:contains("Create New Playlist"), button:contains("+ New Playlist")');
  
  // Better approach: use data attributes or specific IDs
  document.addEventListener('click', (e) => {
    if (e.target.textContent.includes('New Playlist') || e.target.closest('button')?.textContent.includes('New Playlist')) {
      e.preventDefault();
      
      const playlistName = prompt('Enter playlist name:');
      if (playlistName && playlistName.trim()) {
        // In production, create playlist via API
        console.log('Creating playlist:', playlistName);
        showNotification(`Playlist "${playlistName}" created!`, 'success');
        
        // Refresh playlists section
        // loadPlaylists();
      }
    }
  });
  
  // Handle playlist card clicks
  const playlistCards = document.querySelectorAll('#playlists .glass-effect');
  playlistCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't trigger if clicking menu button
      if (e.target.closest('button')) return;
      
      const playlistName = card.querySelector('h3')?.textContent;
      console.log('Opening playlist:', playlistName);
      // In production, navigate to playlist detail page
    });
  });
}

/**
 * Show notification toast
 */
function showNotification(message, type = 'info') {
  // Create toast element
  const toast = document.createElement('div');
  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500'
  };
  
  toast.className = `fixed top-20 right-4 ${colors[type] || colors.info} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-up`;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  // Remove after 3 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/**
 * Format duration helper
 */
function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Format date helper
 */
function formatDate(date) {
  const now = new Date();
  const diff = now - new Date(date);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return `${Math.floor(days / 30)} months ago`;
}

/**
 * Load user data (simulated)
 */
function loadUserData() {
  // In production, fetch from API
  return {
    name: 'John Doe',
    email: 'john.doe@example.com',
    membership: 'Premium',
    stats: {
      tracks: 1247,
      playlists: 42,
      listeningTime: 127,
      favorites: 389
    }
  };
}

/**
 * Initialize data loading
 */
function initDataLoading() {
  // Load user data on dashboard load
  const userData = loadUserData();
  
  // Update UI with user data
  // This would be called when switching to overview section
  console.log('User data loaded:', userData);
}

// Initialize data loading
initDataLoading();

