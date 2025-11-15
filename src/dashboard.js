/**
 * Dashboard JavaScript
 * Comprehensive dashboard with full data management and interactive features
 */

// Import authentication functions
import { logout, getCurrentUser, isAuthenticated } from './auth.js';

// Sample music data - In production, this would come from an API
const SAMPLE_TRACKS = [
  { id: 1, title: 'Neon Dreams', artist: 'Nova Wave', album: 'Neon Dreams', duration: 225, genre: 'Electronic', color: 'from-blue-500 to-purple-600' },
  { id: 2, title: 'City Lights', artist: 'Echo Valley', album: 'Urban Nights', duration: 198, genre: 'Indie', color: 'from-purple-500 to-pink-600' },
  { id: 3, title: 'After Hours', artist: 'Midnight Drive', album: 'Late Night Sessions', duration: 245, genre: 'Jazz', color: 'from-pink-500 to-orange-600' },
  { id: 4, title: 'Electric Pulse', artist: 'Synth Masters', album: 'Digital Age', duration: 210, genre: 'Electronic', color: 'from-blue-500 to-cyan-600' },
  { id: 5, title: 'Ocean Breeze', artist: 'Coastal Sounds', album: 'Beach Vibes', duration: 195, genre: 'Ambient', color: 'from-cyan-500 to-blue-600' },
  { id: 6, title: 'Mountain Peak', artist: 'Nature Sounds', album: 'Natural World', duration: 230, genre: 'Ambient', color: 'from-green-500 to-emerald-600' },
  { id: 7, title: 'Sunset Boulevard', artist: 'City Vibes', album: 'Urban Life', duration: 205, genre: 'Pop', color: 'from-orange-500 to-red-600' },
  { id: 8, title: 'Midnight Jazz', artist: 'Smooth Operators', album: 'Jazz Collection', duration: 240, genre: 'Jazz', color: 'from-purple-500 to-indigo-600' },
  { id: 9, title: 'Digital Dreams', artist: 'Tech Beats', album: 'Future Sounds', duration: 220, genre: 'Electronic', color: 'from-indigo-500 to-purple-600' },
  { id: 10, title: 'Acoustic Morning', artist: 'Folk Tales', album: 'Morning Coffee', duration: 215, genre: 'Folk', color: 'from-yellow-500 to-orange-600' }
];

// Data Management System
class DashboardData {
  constructor() {
    this.userId = getCurrentUser()?.email || 'default';
    this.initData();
  }

  initData() {
    // Initialize data if it doesn't exist
    if (!localStorage.getItem(`dashboard_library_${this.userId}`)) {
      localStorage.setItem(`dashboard_library_${this.userId}`, JSON.stringify(SAMPLE_TRACKS));
    }
    if (!localStorage.getItem(`dashboard_playlists_${this.userId}`)) {
      localStorage.setItem(`dashboard_playlists_${this.userId}`, JSON.stringify([
        { id: 1, name: 'My Favorites', tracks: [1, 2, 3], isPublic: false, createdAt: new Date().toISOString() },
        { id: 2, name: 'Chill Vibes', tracks: [4, 5, 6], isPublic: true, createdAt: new Date().toISOString() }
      ]));
    }
    if (!localStorage.getItem(`dashboard_favorites_${this.userId}`)) {
      localStorage.setItem(`dashboard_favorites_${this.userId}`, JSON.stringify([1, 2, 3]));
    }
    if (!localStorage.getItem(`dashboard_recent_${this.userId}`)) {
      localStorage.setItem(`dashboard_recent_${this.userId}`, JSON.stringify([
        { trackId: 1, playedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
        { trackId: 2, playedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() },
        { trackId: 3, playedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() }
      ]));
    }
    if (!localStorage.getItem(`dashboard_downloads_${this.userId}`)) {
      localStorage.setItem(`dashboard_downloads_${this.userId}`, JSON.stringify([]));
    }
    if (!localStorage.getItem(`dashboard_settings_${this.userId}`)) {
      localStorage.setItem(`dashboard_settings_${this.userId}`, JSON.stringify({
        audioQuality: 'high',
        publicPlaylists: false,
        showActivity: true,
        theme: 'dark'
      }));
    }
    if (!localStorage.getItem(`dashboard_accountType_${this.userId}`)) {
      localStorage.setItem(`dashboard_accountType_${this.userId}`, JSON.stringify({
        type: 'Premium',
        plan: 'Premium Membership',
        features: ['Unlimited streaming', 'High quality audio', 'Offline downloads', 'Ad-free experience'],
        storage: { used: 2.4, total: 10, unit: 'GB' }
      }));
    }
    if (!localStorage.getItem(`dashboard_notifications_${this.userId}`)) {
      // Initialize with some sample notifications
      const sampleNotifications = [
        {
          id: Date.now() - 86400000,
          type: 'system',
          title: 'Welcome to Puz Records!',
          message: 'Start exploring your music library and create your first playlist.',
          read: false,
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          action: null
        },
        {
          id: Date.now() - 3600000,
          type: 'activity',
          title: 'New music available',
          message: 'Check out the latest tracks added to your library.',
          read: false,
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          action: { type: 'navigate', target: '#library' }
        }
      ];
      localStorage.setItem(`dashboard_notifications_${this.userId}`, JSON.stringify(sampleNotifications));
    }
  }

  getLibrary() {
    return JSON.parse(localStorage.getItem(`dashboard_library_${this.userId}`) || '[]');
  }

  getPlaylists() {
    return JSON.parse(localStorage.getItem(`dashboard_playlists_${this.userId}`) || '[]');
  }

  getFavorites() {
    return JSON.parse(localStorage.getItem(`dashboard_favorites_${this.userId}`) || '[]');
  }

  getRecent() {
    return JSON.parse(localStorage.getItem(`dashboard_recent_${this.userId}`) || '[]');
  }

  getDownloads() {
    return JSON.parse(localStorage.getItem(`dashboard_downloads_${this.userId}`) || '[]');
  }

  getSettings() {
    return JSON.parse(localStorage.getItem(`dashboard_settings_${this.userId}`) || '{}');
  }

  getAccountType() {
    return JSON.parse(localStorage.getItem(`dashboard_accountType_${this.userId}`) || JSON.stringify({
      type: 'Premium',
      plan: 'Premium Membership',
      features: ['Unlimited streaming', 'High quality audio', 'Offline downloads', 'Ad-free experience'],
      storage: { used: 2.4, total: 10, unit: 'GB' }
    }));
  }

  updateAccountType(accountData) {
    const current = this.getAccountType();
    const updated = { ...current, ...accountData };
    localStorage.setItem(`dashboard_accountType_${this.userId}`, JSON.stringify(updated));
  }

  getNotifications() {
    return JSON.parse(localStorage.getItem(`dashboard_notifications_${this.userId}`) || '[]');
  }

  addNotification(notification) {
    const notifications = this.getNotifications();
    const newNotification = {
      id: Date.now(),
      type: notification.type || 'system',
      title: notification.title || 'Notification',
      message: notification.message || '',
      read: false,
      timestamp: new Date().toISOString(),
      action: notification.action || null
    };
    notifications.unshift(newNotification);
    // Keep only last 100 notifications
    const updated = notifications.slice(0, 100);
    localStorage.setItem(`dashboard_notifications_${this.userId}`, JSON.stringify(updated));
    return newNotification;
  }

  markAsRead(notificationId) {
    const notifications = this.getNotifications();
    const updated = notifications.map(n =>
      n.id === notificationId ? { ...n, read: true } : n
    );
    localStorage.setItem(`dashboard_notifications_${this.userId}`, JSON.stringify(updated));
  }

  markAllAsRead() {
    const notifications = this.getNotifications();
    const updated = notifications.map(n => ({ ...n, read: true }));
    localStorage.setItem(`dashboard_notifications_${this.userId}`, JSON.stringify(updated));
  }

  deleteNotification(notificationId) {
    const notifications = this.getNotifications();
    const updated = notifications.filter(n => n.id !== notificationId);
    localStorage.setItem(`dashboard_notifications_${this.userId}`, JSON.stringify(updated));
  }

  clearAllNotifications() {
    localStorage.setItem(`dashboard_notifications_${this.userId}`, JSON.stringify([]));
  }

  addToFavorites(trackId) {
    const favorites = this.getFavorites();
    if (!favorites.includes(trackId)) {
      favorites.push(trackId);
      localStorage.setItem(`dashboard_favorites_${this.userId}`, JSON.stringify(favorites));
    }
  }

  removeFromFavorites(trackId) {
    const favorites = this.getFavorites();
    const updated = favorites.filter(id => id !== trackId);
    localStorage.setItem(`dashboard_favorites_${this.userId}`, JSON.stringify(updated));
  }

  addToRecent(trackId) {
    const recent = this.getRecent();
    // Remove if already exists
    const filtered = recent.filter(r => r.trackId !== trackId);
    // Add to beginning
    filtered.unshift({ trackId, playedAt: new Date().toISOString() });
    // Keep only last 50
    const updated = filtered.slice(0, 50);
    localStorage.setItem(`dashboard_recent_${this.userId}`, JSON.stringify(updated));
  }

  createPlaylist(playlistData) {
    const playlists = this.getPlaylists();
    const newPlaylist = {
      id: Date.now(),
      name: playlistData.name || 'New Playlist',
      description: playlistData.description || '',
      tracks: playlistData.tracks || [],
      isPublic: playlistData.isPublic || false,
      coverImage: playlistData.coverImage || null,
      color: playlistData.color || 'from-blue-500 to-purple-600',
      tags: playlistData.tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    playlists.push(newPlaylist);
    localStorage.setItem(`dashboard_playlists_${this.userId}`, JSON.stringify(playlists));
    return newPlaylist;
  }

  deletePlaylist(playlistId) {
    const playlists = this.getPlaylists();
    const updated = playlists.filter(p => p.id !== playlistId);
    localStorage.setItem(`dashboard_playlists_${this.userId}`, JSON.stringify(updated));
  }

  addTrackToPlaylist(playlistId, trackId) {
    const playlists = this.getPlaylists();
    const playlist = playlists.find(p => p.id === playlistId);
    if (playlist && !playlist.tracks.includes(trackId)) {
      playlist.tracks.push(trackId);
      localStorage.setItem(`dashboard_playlists_${this.userId}`, JSON.stringify(playlists));
    }
  }

  removeTrackFromPlaylist(playlistId, trackId) {
    const playlists = this.getPlaylists();
    const playlist = playlists.find(p => p.id === playlistId);
    if (playlist) {
      playlist.tracks = playlist.tracks.filter(id => id !== trackId);
      localStorage.setItem(`dashboard_playlists_${this.userId}`, JSON.stringify(playlists));
    }
  }

  downloadTrack(trackId) {
    const downloads = this.getDownloads();
    if (!downloads.includes(trackId)) {
      downloads.push(trackId);
      localStorage.setItem(`dashboard_downloads_${this.userId}`, JSON.stringify(downloads));
    }
  }

  removeDownload(trackId) {
    const downloads = this.getDownloads();
    const updated = downloads.filter(id => id !== trackId);
    localStorage.setItem(`dashboard_downloads_${this.userId}`, JSON.stringify(updated));
  }

  updateSettings(settings) {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(`dashboard_settings_${this.userId}`, JSON.stringify(updated));
  }
}

// Initialize data manager
const dataManager = new DashboardData();

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Check authentication first
  checkAuth();

  // Initialize all features
  initMobileMenu();
  initNavigation();
  initSearch();
  initLogout();
  initSettings();
  initPlaylistActions();
  initProfile();
  initMusicPlayer();
  initAccountType();
  initNotificationSystem(); // Initialize notification system
  loadUserProfile();
  loadAccountType(); // Load account type on page load
  loadOverview();
  initLibrary();
  initFavorites();
  initRecent();
  initDownloads();
  initNotifications();
  initNotificationIcon(); // Initialize notification icon functionality
  initQuickActions();
  updateNotificationBadge(); // Update badge on page load
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

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', () => {
      sidebar.classList.add('-translate-x-full');
      mobileOverlay.classList.add('hidden');
    });
  }

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

      navItems.forEach(nav => nav.classList.remove('active', 'bg-blue-500/20', 'text-blue-400'));
      item.classList.add('active', 'bg-blue-500/20', 'text-blue-400');

      sections.forEach(section => section.classList.add('hidden'));

      const targetSection = item.dataset.section;
      const section = document.getElementById(targetSection);
      if (section) {
        section.classList.remove('hidden');
        section.classList.add('animate-fade-in-up');

        // Load section-specific data
        if (targetSection === 'overview') loadOverview();
        else if (targetSection === 'library') initLibrary();
        else if (targetSection === 'playlists') loadPlaylists();
        else if (targetSection === 'favorites') initFavorites();
        else if (targetSection === 'recent') initRecent();
        else if (targetSection === 'downloads') initDownloads();
        else if (targetSection === 'notifications') loadNotifications();
        else if (targetSection === 'profile') loadProfile();
      }
    });
  });

  const hash = window.location.hash.substring(1);
  if (hash) {
    const targetNav = document.querySelector(`[data-section="${hash}"]`);
    if (targetNav) {
      targetNav.click();
    }
  }
}

/**
 * Initialize search functionality across all sections
 */
function initSearch() {
  const searchInput = document.querySelector('header input[type="text"]');

  if (searchInput) {
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      const query = e.target.value.toLowerCase().trim();

      searchTimeout = setTimeout(() => {
        performSearch(query);
      }, 300);
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        performSearch(searchInput.value.toLowerCase().trim());
      }
    });
  }
}

/**
 * Perform search across library
 */
function performSearch(query) {
  if (!query) {
    // Reset to show all items
    const currentSection = document.querySelector('.dashboard-section:not(.hidden)');
    if (currentSection) {
      if (currentSection.id === 'library') initLibrary();
      else if (currentSection.id === 'favorites') initFavorites();
      else if (currentSection.id === 'playlists') loadPlaylists();
      else if (currentSection.id === 'recent') initRecent();
    }
    return;
  }

  const currentSection = document.querySelector('.dashboard-section:not(.hidden)');
  if (!currentSection) return;

  const sectionId = currentSection.id;

  if (sectionId === 'library') {
    const library = dataManager.getLibrary();
    const filtered = library.filter(track =>
      track.title.toLowerCase().includes(query) ||
      track.artist.toLowerCase().includes(query) ||
      track.album.toLowerCase().includes(query) ||
      track.genre.toLowerCase().includes(query)
    );
    renderSearchResults('library', filtered, query);
  } else if (sectionId === 'favorites') {
    const favorites = dataManager.getFavorites();
    const library = dataManager.getLibrary();
    const favoriteTracks = library.filter(t => favorites.includes(t.id));
    const filtered = favoriteTracks.filter(track =>
      track.title.toLowerCase().includes(query) ||
      track.artist.toLowerCase().includes(query) ||
      track.album.toLowerCase().includes(query)
    );
    renderFavoritesSearchResults(filtered, query);
  } else if (sectionId === 'playlists') {
    const playlists = dataManager.getPlaylists();
    const filtered = playlists.filter(playlist =>
      playlist.name.toLowerCase().includes(query)
    );
    renderPlaylistsSearchResults(filtered, query);
  } else if (sectionId === 'recent') {
    const recent = dataManager.getRecent();
    const library = dataManager.getLibrary();
    const recentTracks = recent.map(r => library.find(t => t.id === r.trackId)).filter(Boolean);
    const filtered = recentTracks.filter(track =>
      track && (track.title.toLowerCase().includes(query) ||
        track.artist.toLowerCase().includes(query))
    );
    renderRecentSearchResults(filtered, query);
  }
}

/**
 * Render search results
 */
function renderSearchResults(sectionId, results, query) {
  if (sectionId === 'library') {
    const container = document.querySelector('#library-grid');
    if (container) {
      container.innerHTML = '';
      if (results.length === 0) {
        container.innerHTML = `<div class="col-span-full text-center py-12 text-gray-400">No results found for "${query}"</div>`;
      } else {
        results.forEach(track => {
          container.appendChild(createLibraryCard(track));
        });
      }
    }
  }
}

/**
 * Render favorites search results
 */
function renderFavoritesSearchResults(results, query) {
  const container = document.querySelector('#favorites-tbody');
  if (!container) return;

  container.innerHTML = '';

  if (results.length === 0) {
    container.innerHTML = `
      <tr>
        <td colspan="6" class="p-8 text-center text-gray-400">
          No favorites found for "${query}"
        </td>
      </tr>
    `;
    return;
  }

  results.forEach((track, index) => {
    const row = document.createElement('tr');
    row.className = 'hover:bg-white/5 cursor-pointer';
    row.innerHTML = `
      <td class="p-4">${index + 1}</td>
      <td class="p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br ${track.color} rounded"></div>
          <span class="font-semibold">${track.title}</span>
        </div>
      </td>
      <td class="p-4 text-gray-400">${track.artist}</td>
      <td class="p-4 text-gray-400">${track.album}</td>
      <td class="p-4 text-gray-400">${formatDate(new Date().toISOString())}</td>
      <td class="p-4 text-right text-gray-400">
        <div class="flex items-center justify-end gap-2">
          ${formatDuration(track.duration)}
          <button class="unfavorite-btn p-1 hover:bg-white/10 rounded" data-track-id="${track.id}">
            <svg class="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </button>
        </div>
      </td>
    `;

    row.querySelector('.unfavorite-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFavorite(track.id);
    });

    row.addEventListener('click', () => playTrack(track.id));
    container.appendChild(row);
  });
}

/**
 * Render playlists search results
 */
function renderPlaylistsSearchResults(results, query) {
  const container = document.querySelector('#playlists-grid');
  if (!container) return;

  container.innerHTML = '';

  if (results.length === 0) {
    container.innerHTML = `<div class="col-span-full text-center py-12 text-gray-400">No playlists found for "${query}"</div>`;
    return;
  }

  const library = dataManager.getLibrary();
  results.forEach(playlist => {
    const trackCount = playlist.tracks.length;
    const totalDuration = playlist.tracks.reduce((sum, trackId) => {
      const track = library.find(t => t.id === trackId);
      return sum + (track ? track.duration : 0);
    }, 0);

    const card = document.createElement('div');
    card.className = 'glass-effect rounded-xl p-6 hover-lift group cursor-pointer';
    card.dataset.playlistId = playlist.id;

    const coverStyle = playlist.coverImage
      ? `background-image: url(${playlist.coverImage}); background-size: cover; background-position: center;`
      : '';
    const coverClass = playlist.coverImage
      ? ''
      : `bg-gradient-to-br ${playlist.color || 'from-blue-500 to-purple-600'}`;

    card.innerHTML = `
      <div class="flex items-center gap-4 mb-4">
        <div class="w-16 h-16 ${coverClass} rounded-lg flex items-center justify-center flex-shrink-0" style="${coverStyle}">
          ${!playlist.coverImage ? `
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          ` : ''}
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1">
            <h3 class="font-semibold truncate">${playlist.name}</h3>
            ${playlist.isPublic ? `
              <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            ` : `
              <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            `}
          </div>
          ${playlist.description ? `<p class="text-xs text-gray-400 truncate mb-1">${playlist.description}</p>` : ''}
          <p class="text-sm text-gray-400">${trackCount} tracks • ${formatDuration(totalDuration)}</p>
          ${playlist.tags && playlist.tags.length > 0 ? `
            <div class="flex flex-wrap gap-1 mt-2">
              ${playlist.tags.slice(0, 3).map(tag => `
                <span class="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-full text-xs">${tag}</span>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-xs text-gray-500">${formatDate(playlist.createdAt)}</span>
        <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button class="play-playlist-btn p-2 hover:bg-white/10 rounded transition-colors" data-playlist-id="${playlist.id}" title="Play">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
          <button class="delete-playlist-btn p-2 hover:bg-red-500/20 rounded transition-colors text-red-400" data-playlist-id="${playlist.id}" title="Delete">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        </div>
      </div>
    `;

    card.querySelector('.play-playlist-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      playPlaylist(playlist.id);
    });

    card.querySelector('.delete-playlist-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      deletePlaylist(playlist.id);
    });

    card.addEventListener('click', () => {
      showPlaylistModal(playlist);
    });

    container.appendChild(card);
  });
}

/**
 * Render recent search results
 */
function renderRecentSearchResults(results, query) {
  const container = document.querySelector('#recent-grid');
  if (!container) return;

  container.innerHTML = '';

  if (results.length === 0) {
    container.innerHTML = `<div class="col-span-full text-center py-12 text-gray-400">No recent tracks found for "${query}"</div>`;
    return;
  }

  const recent = dataManager.getRecent();
  results.forEach(track => {
    const recentItem = recent.find(r => r.trackId === track.id);
    if (recentItem) {
      const card = document.createElement('div');
      card.className = 'glass-effect rounded-xl p-4 hover-lift group cursor-pointer';
      card.innerHTML = `
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 bg-gradient-to-br ${track.color} rounded-lg"></div>
          <div class="flex-1 min-w-0">
            <h3 class="font-semibold truncate">${track.title}</h3>
            <p class="text-sm text-gray-400 truncate">${track.artist}</p>
            <p class="text-xs text-gray-500 mt-1">${formatDate(recentItem.playedAt)}</p>
          </div>
        </div>
      `;
      card.addEventListener('click', () => playTrack(track.id));
      container.appendChild(card);
    }
  });
}

/**
 * Initialize logout functionality
 */
function initLogout() {
  const logoutBtn = document.getElementById('logout-btn');

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to log out?')) {
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
    const userNameElements = document.querySelectorAll('.sidebar-user-name, p.font-semibold');
    userNameElements.forEach(el => {
      if (el.closest('.flex.items-center.gap-3') || el.classList.contains('sidebar-user-name')) {
        el.textContent = user.fullName || 'User';

        const avatar = el.closest('.flex.items-center.gap-3')?.querySelector('.rounded-full');
        if (avatar && user.fullName) {
          const nameParts = user.fullName.split(' ');
          const initials = nameParts.length >= 2
            ? (nameParts[0][0] + nameParts[1][0]).toUpperCase()
            : nameParts[0][0].toUpperCase();
          avatar.textContent = initials;
        }
      }
    });

    const welcomeHeading = document.querySelector('#overview h1');
    if (welcomeHeading && user.fullName) {
      const firstName = user.fullName.split(' ')[0];
      welcomeHeading.textContent = `Welcome Back, ${firstName}!`;
    }

    const emailInput = document.querySelector('#settings input[type="email"]');
    if (emailInput && user.email) {
      emailInput.value = user.email;
    }

    const nameInput = document.querySelector('#settings input[type="text"]');
    if (nameInput && user.fullName) {
      nameInput.value = user.fullName;
    }
  }
}

/**
 * Load overview section with statistics
 */
function loadOverview() {
  const library = dataManager.getLibrary();
  const playlists = dataManager.getPlaylists();
  const favorites = dataManager.getFavorites();
  const recent = dataManager.getRecent();

  // Calculate stats
  const totalTracks = library.length;
  const totalPlaylists = playlists.length;
  const totalFavorites = favorites.length;

  // Calculate listening time (simulated)
  const listeningTime = Math.floor(recent.length * 2.5); // hours

  // Update stats cards
  updateStatCard('Total Tracks', totalTracks, '+23 this month');
  updateStatCard('Playlists', totalPlaylists, `${playlists.filter(p => p.isPublic).length} public, ${playlists.filter(p => !p.isPublic).length} private`);
  updateStatCard('Listening Time', `${listeningTime}h`, 'This month');
  updateStatCard('Favorites', totalFavorites, 'Liked tracks');

  // Load recently played
  loadRecentlyPlayedPreview();
}

/**
 * Update stat card
 */
function updateStatCard(type, value, subtitle) {
  const cards = document.querySelectorAll('#overview .glass-effect');
  cards.forEach(card => {
    const title = card.querySelector('h3');
    if (title && title.textContent.includes(type)) {
      const valueEl = card.querySelector('.text-3xl');
      const subtitleEl = card.querySelector('.text-sm.text-gray-400');
      if (valueEl) valueEl.textContent = value;
      if (subtitleEl) subtitleEl.textContent = subtitle;
    }
  });
}

/**
 * Load recently played preview in overview
 */
function loadRecentlyPlayedPreview() {
  const container = document.querySelector('#recent-preview');
  if (!container) return;

  const recent = dataManager.getRecent().slice(0, 3);
  const library = dataManager.getLibrary();

  container.innerHTML = '';

  if (recent.length === 0) {
    container.innerHTML = '<p class="text-gray-400 text-center py-4">No recent plays</p>';
    return;
  }

  recent.forEach((item, index) => {
    const track = library.find(t => t.id === item.trackId);
    if (track) {
      const element = document.createElement('div');
      element.className = 'flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer';
      element.innerHTML = `
        <div class="w-12 h-12 bg-gradient-to-br ${track.color} rounded-lg"></div>
        <div class="flex-1 min-w-0">
          <p class="font-semibold truncate">${track.title}</p>
          <p class="text-sm text-gray-400 truncate">${track.artist}</p>
        </div>
        <span class="text-xs text-gray-500">${formatDate(item.playedAt)}</span>
      `;
      element.addEventListener('click', () => playTrack(track.id));
      container.appendChild(element);
    }
  });
}

/**
 * Initialize library section
 */
function initLibrary() {
  const container = document.querySelector('#library-grid');
  if (!container) return;

  const library = dataManager.getLibrary();
  container.innerHTML = '';

  library.forEach(track => {
    container.appendChild(createLibraryCard(track));
  });

  // Initialize filter tabs
  initLibraryFilters();
}

/**
 * Create library card element
 */
function createLibraryCard(track) {
  const favorites = dataManager.getFavorites();
  const isFavorite = favorites.includes(track.id);

  const card = document.createElement('div');
  card.className = 'glass-effect rounded-xl p-4 hover-lift group cursor-pointer';
  card.dataset.trackId = track.id;

  card.innerHTML = `
    <div class="w-full aspect-square bg-gradient-to-br ${track.color} rounded-lg mb-3 group-hover:scale-105 transition-transform relative overflow-hidden">
      <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
        <button class="play-track-btn w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-all" data-track-id="${track.id}">
          <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>
      </div>
    </div>
    <h3 class="font-semibold truncate mb-1">${track.title}</h3>
    <p class="text-sm text-gray-400 truncate">${track.artist}</p>
    <div class="mt-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <button class="favorite-btn p-1.5 hover:bg-white/10 rounded transition-colors ${isFavorite ? 'text-red-400' : ''}" data-track-id="${track.id}" title="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}">
        <svg class="w-4 h-4 ${isFavorite ? 'fill-current' : ''}" ${isFavorite ? 'fill="currentColor"' : 'fill="none"'} stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
      </button>
      <button class="add-to-playlist-btn p-1.5 hover:bg-white/10 rounded transition-colors" data-track-id="${track.id}" title="Add to playlist">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
      </button>
      <button class="download-btn p-1.5 hover:bg-white/10 rounded transition-colors" data-track-id="${track.id}" title="Download">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
        </svg>
      </button>
    </div>
  `;

  // Add event listeners
  card.querySelector('.play-track-btn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    playTrack(track.id);
  });

  card.querySelector('.favorite-btn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleFavorite(track.id);
    // Update button state
    const btn = card.querySelector('.favorite-btn');
    const svg = btn.querySelector('svg');
    const favorites = dataManager.getFavorites();
    const isFav = favorites.includes(track.id);
    if (isFav) {
      btn.classList.add('text-red-400');
      svg.setAttribute('fill', 'currentColor');
      btn.title = 'Remove from favorites';
    } else {
      btn.classList.remove('text-red-400');
      svg.setAttribute('fill', 'none');
      btn.title = 'Add to favorites';
    }
  });

  card.querySelector('.add-to-playlist-btn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    showAddToPlaylistMenu(track.id);
  });

  card.querySelector('.download-btn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    downloadTrack(track.id);
  });

  card.addEventListener('click', () => playTrack(track.id));

  return card;
}

/**
 * Show menu to add track to playlist
 */
function showAddToPlaylistMenu(trackId) {
  const playlists = dataManager.getPlaylists();
  const library = dataManager.getLibrary();
  const track = library.find(t => t.id === trackId);
  if (!track) return;

  const menu = document.createElement('div');
  menu.className = 'fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4';
  menu.innerHTML = `
    <div class="glass-effect rounded-xl p-6 max-w-md w-full">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-display font-bold">Add "${track.title}" to Playlist</h2>
        <button class="close-playlist-menu p-2 hover:bg-white/10 rounded-lg transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div class="space-y-2 max-h-64 overflow-y-auto mb-4">
        ${playlists.length === 0
      ? '<p class="text-gray-400 text-center py-4">No playlists yet. Create one first!</p>'
      : playlists.map(playlist => {
        const hasTrack = playlist.tracks.includes(trackId);
        return `
                <button class="select-playlist-btn w-full flex items-center justify-between p-3 glass-effect rounded-lg hover:bg-white/10 transition-all ${hasTrack ? 'opacity-50 cursor-not-allowed' : ''}" 
                        data-playlist-id="${playlist.id}" ${hasTrack ? 'disabled' : ''}>
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4 6h16M4 12h16M4 18h16"/>
                      </svg>
                    </div>
                    <div class="text-left">
                      <p class="font-semibold">${playlist.name}</p>
                      <p class="text-xs text-gray-400">${playlist.tracks.length} tracks</p>
                    </div>
                  </div>
                  ${hasTrack ? '<span class="text-xs text-gray-500">Already added</span>' : '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>'}
                </button>
              `;
      }).join('')
    }
      </div>
      <button class="create-new-playlist-btn w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg transition-all">
        + Create New Playlist
      </button>
    </div>
  `;

  menu.querySelector('.close-playlist-menu')?.addEventListener('click', () => menu.remove());
  menu.addEventListener('click', (e) => {
    if (e.target === menu) menu.remove();
  });

  menu.querySelectorAll('.select-playlist-btn:not([disabled])').forEach(btn => {
    btn.addEventListener('click', () => {
      const playlistId = parseInt(btn.dataset.playlistId);
      const playlist = playlists.find(p => p.id === playlistId);
      dataManager.addTrackToPlaylist(playlistId, trackId);
      showNotification(`Added to "${playlist.name}"`, 'success');

      // Add to notification center
      if (track && playlist) {
        dataManager.addNotification({
          type: 'activity',
          title: 'Track Added to Playlist',
          message: `"${track.title}" has been added to "${playlist.name}".`,
          action: { type: 'navigate', target: '#playlists' }
        });
        updateNotificationBadge();
      }

      loadPlaylists();
      menu.remove();
    });
  });

  menu.querySelector('.create-new-playlist-btn')?.addEventListener('click', () => {
    menu.remove();
    createPlaylist().then(() => {
      if (playlists.length > 0) {
        const newPlaylist = dataManager.getPlaylists()[dataManager.getPlaylists().length - 1];
        dataManager.addTrackToPlaylist(newPlaylist.id, trackId);
        showNotification(`Created and added to "${newPlaylist.name}"`, 'success');
        loadPlaylists();
      }
    });
  });

  document.body.appendChild(menu);
}

/**
 * Initialize library filters
 */
function initLibraryFilters() {
  const filterTabs = document.querySelectorAll('#library .filter-tab');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active', 'bg-blue-500/20', 'text-blue-400'));
      tab.classList.add('active', 'bg-blue-500/20', 'text-blue-400');

      const filter = tab.textContent.trim();
      filterLibrary(filter);
    });
  });
}

/**
 * Filter library by type
 */
function filterLibrary(filter) {
  const library = dataManager.getLibrary();
  let filtered = library;

  if (filter === 'Albums') {
    // Group by album
    const albums = {};
    library.forEach(track => {
      if (!albums[track.album]) {
        albums[track.album] = track;
      }
    });
    filtered = Object.values(albums);
  } else if (filter === 'Artists') {
    // Group by artist
    const artists = {};
    library.forEach(track => {
      if (!artists[track.artist]) {
        artists[track.artist] = track;
      }
    });
    filtered = Object.values(artists);
  } else if (filter === 'Songs') {
    filtered = library;
  }

  const container = document.querySelector('#library-grid');
  if (container) {
    container.innerHTML = '';
    filtered.forEach(track => {
      container.appendChild(createLibraryCard(track));
    });
  }
}

/**
 * Initialize favorites section
 */
function initFavorites() {
  const container = document.querySelector('#favorites tbody');
  if (!container) return;

  const favorites = dataManager.getFavorites();
  const library = dataManager.getLibrary();
  const favoriteTracks = library.filter(t => favorites.includes(t.id));

  container.innerHTML = '';

  if (favoriteTracks.length === 0) {
    container.innerHTML = `
      <tr>
        <td colspan="6" class="p-8 text-center text-gray-400">
          No favorites yet. Start liking tracks to see them here!
        </td>
      </tr>
    `;
    return;
  }

  favoriteTracks.forEach((track, index) => {
    const row = document.createElement('tr');
    row.className = 'hover:bg-white/5 cursor-pointer';
    row.innerHTML = `
      <td class="p-4">${index + 1}</td>
      <td class="p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br ${track.color} rounded"></div>
          <span class="font-semibold">${track.title}</span>
        </div>
      </td>
      <td class="p-4 text-gray-400">${track.artist}</td>
      <td class="p-4 text-gray-400">${track.album}</td>
      <td class="p-4 text-gray-400">${formatDate(new Date().toISOString())}</td>
      <td class="p-4 text-right text-gray-400">
        <div class="flex items-center justify-end gap-2">
          ${formatDuration(track.duration)}
          <button class="unfavorite-btn p-1 hover:bg-white/10 rounded" data-track-id="${track.id}">
            <svg class="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </button>
        </div>
      </td>
    `;

    row.querySelector('.unfavorite-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFavorite(track.id);
    });

    row.addEventListener('click', () => playTrack(track.id));
    container.appendChild(row);
  });
}

/**
 * Initialize recently played section
 */
function initRecent() {
  const container = document.querySelector('#recent-grid');
  if (!container) return;

  const recent = dataManager.getRecent();
  const library = dataManager.getLibrary();

  container.innerHTML = '';

  if (recent.length === 0) {
    container.innerHTML = '<div class="col-span-full text-center py-12 text-gray-400">No recent plays</div>';
    return;
  }

  recent.forEach(item => {
    const track = library.find(t => t.id === item.trackId);
    if (track) {
      const card = document.createElement('div');
      card.className = 'glass-effect rounded-xl p-4 hover-lift group cursor-pointer';
      card.innerHTML = `
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 bg-gradient-to-br ${track.color} rounded-lg"></div>
          <div class="flex-1 min-w-0">
            <h3 class="font-semibold truncate">${track.title}</h3>
            <p class="text-sm text-gray-400 truncate">${track.artist}</p>
            <p class="text-xs text-gray-500 mt-1">${formatDate(item.playedAt)}</p>
          </div>
        </div>
      `;
      card.addEventListener('click', () => playTrack(track.id));
      container.appendChild(card);
    }
  });
}

/**
 * Initialize downloads section
 */
function initDownloads() {
  const container = document.querySelector('#downloads .glass-effect');
  if (!container) return;

  const downloads = dataManager.getDownloads();
  const library = dataManager.getLibrary();
  const downloadedTracks = library.filter(t => downloads.includes(t.id));

  if (downloadedTracks.length === 0) {
    container.innerHTML = '<p class="text-gray-400 text-center py-8">No downloads yet. Start downloading your favorite tracks!</p>';
    return;
  }

  container.innerHTML = `
    <div class="space-y-3">
      ${downloadedTracks.map(track => `
        <div class="flex items-center gap-4 p-3 hover:bg-white/5 rounded-lg group transition-all" data-track-id="${track.id}">
          <div class="w-12 h-12 bg-gradient-to-br ${track.color} rounded-lg flex-shrink-0"></div>
          <div class="flex-1 min-w-0">
            <h3 class="font-semibold truncate">${track.title}</h3>
            <p class="text-sm text-gray-400 truncate">${track.artist}</p>
          </div>
          <div class="flex items-center gap-2">
            <button class="play-track-btn px-4 py-2 glass-effect rounded-lg hover:bg-white/20 transition-all text-sm" data-track-id="${track.id}">
              Play
            </button>
            <button class="delete-download-btn p-2 glass-effect rounded-lg hover:bg-red-500/20 text-red-400 transition-all opacity-0 group-hover:opacity-100 hover:scale-110" data-track-id="${track.id}" title="Remove from downloads">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  container.querySelectorAll('.play-track-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const trackId = parseInt(btn.dataset.trackId);
      playTrack(trackId);
    });
  });

  container.querySelectorAll('.delete-download-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const trackId = parseInt(btn.dataset.trackId);
      deleteDownload(trackId);
    });
  });
}

/**
 * Load playlists section
 */
function loadPlaylists() {
  const container = document.querySelector('#playlists-grid');
  if (!container) return;

  const playlists = dataManager.getPlaylists();
  const library = dataManager.getLibrary();

  container.innerHTML = '';

  playlists.forEach(playlist => {
    const trackCount = playlist.tracks.length;
    const totalDuration = playlist.tracks.reduce((sum, trackId) => {
      const track = library.find(t => t.id === trackId);
      return sum + (track ? track.duration : 0);
    }, 0);

    const card = document.createElement('div');
    card.className = 'glass-effect rounded-xl p-6 hover-lift group cursor-pointer';
    card.dataset.playlistId = playlist.id;

    const coverStyle = playlist.coverImage
      ? `background-image: url(${playlist.coverImage}); background-size: cover; background-position: center;`
      : '';
    const coverClass = playlist.coverImage
      ? ''
      : `bg-gradient-to-br ${playlist.color || 'from-blue-500 to-purple-600'}`;

    card.innerHTML = `
      <div class="flex items-center gap-4 mb-4">
        <div class="w-16 h-16 ${coverClass} rounded-lg flex items-center justify-center flex-shrink-0" style="${coverStyle}">
          ${!playlist.coverImage ? `
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          ` : ''}
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1">
            <h3 class="font-semibold truncate">${playlist.name}</h3>
            ${playlist.isPublic ? `
              <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            ` : `
              <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            `}
          </div>
          ${playlist.description ? `<p class="text-xs text-gray-400 truncate mb-1">${playlist.description}</p>` : ''}
          <p class="text-sm text-gray-400">${trackCount} tracks • ${formatDuration(totalDuration)}</p>
          ${playlist.tags && playlist.tags.length > 0 ? `
            <div class="flex flex-wrap gap-1 mt-2">
              ${playlist.tags.slice(0, 3).map(tag => `
                <span class="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-full text-xs">${tag}</span>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-xs text-gray-500">${formatDate(playlist.createdAt)}</span>
        <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button class="play-playlist-btn p-2 hover:bg-white/10 rounded transition-colors" data-playlist-id="${playlist.id}" title="Play">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
          <button class="delete-playlist-btn p-2 hover:bg-red-500/20 rounded transition-colors text-red-400" data-playlist-id="${playlist.id}" title="Delete">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        </div>
      </div>
    `;

    card.querySelector('.play-playlist-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      playPlaylist(playlist.id);
    });

    card.querySelector('.delete-playlist-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      deletePlaylist(playlist.id);
    });

    card.addEventListener('click', () => {
      // Show playlist details (could open a modal)
      showPlaylistDetails(playlist.id);
    });

    container.appendChild(card);
  });
}

/**
 * Initialize playlist actions
 */
function initPlaylistActions() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    if (btn.textContent.includes('New Playlist') || btn.textContent.includes('Create New Playlist')) {
      e.preventDefault();
      createPlaylist();
    }
  });
}

/**
 * Create new playlist with sophisticated modal
 */
function createPlaylist(initialTrackId = null) {
  return new Promise((resolve) => {
    showCreatePlaylistModal(initialTrackId, resolve);
  });
}

/**
 * Show create playlist modal
 */
function showCreatePlaylistModal(initialTrackId = null, onSuccess = null) {
  const colorOptions = [
    { name: 'Blue', value: 'from-blue-500 to-purple-600' },
    { name: 'Purple', value: 'from-purple-500 to-pink-600' },
    { name: 'Pink', value: 'from-pink-500 to-orange-600' },
    { name: 'Green', value: 'from-green-500 to-emerald-600' },
    { name: 'Orange', value: 'from-orange-500 to-red-600' },
    { name: 'Cyan', value: 'from-cyan-500 to-blue-600' }
  ];

  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4';
  modal.innerHTML = `
    <div class="glass-effect rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-display font-bold">Create New Playlist</h2>
        <button class="close-create-playlist-modal p-2 hover:bg-white/10 rounded-lg transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <form id="create-playlist-form" class="space-y-6">
        <!-- Cover Image Section -->
        <div class="flex flex-col md:flex-row gap-6">
          <div class="flex-shrink-0">
            <label class="block text-sm font-medium mb-2">Cover Image</label>
            <div class="relative">
              <div id="playlist-cover-preview" class="w-48 h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center cursor-pointer group overflow-hidden">
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <svg class="w-16 h-16 text-white/50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              </div>
              <input type="file" id="playlist-cover-input" accept="image/*" class="hidden">
            </div>
            <button type="button" id="upload-cover-btn" class="mt-2 w-full px-4 py-2 glass-effect rounded-lg text-sm hover:bg-white/20 transition-all">
              Upload Cover Image
            </button>
          </div>

          <div class="flex-1 space-y-4">
            <!-- Playlist Name -->
            <div>
              <label for="playlist-name" class="block text-sm font-medium mb-2">Playlist Name <span class="text-red-400">*</span></label>
              <input 
                type="text" 
                id="playlist-name" 
                required
                placeholder="My Awesome Playlist"
                class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                maxlength="100"
              >
              <p class="text-xs text-gray-400 mt-1">Give your playlist a memorable name</p>
            </div>

            <!-- Description -->
            <div>
              <label for="playlist-description" class="block text-sm font-medium mb-2">Description</label>
              <textarea 
                id="playlist-description" 
                rows="3"
                placeholder="Describe your playlist..."
                class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 resize-none"
                maxlength="500"
              ></textarea>
              <p class="text-xs text-gray-400 mt-1"><span id="description-count">0</span>/500 characters</p>
            </div>
          </div>
        </div>

        <!-- Color Theme -->
        <div>
          <label class="block text-sm font-medium mb-3">Color Theme</label>
          <div class="grid grid-cols-6 gap-3">
            ${colorOptions.map((color, index) => `
              <button 
                type="button"
                class="color-option w-full h-12 bg-gradient-to-br ${color.value} rounded-lg border-2 border-transparent hover:scale-105 transition-all ${index === 0 ? 'ring-2 ring-blue-400' : ''}"
                data-color="${color.value}"
                data-color-name="${color.name}"
                title="${color.name}"
              ></button>
            `).join('')}
          </div>
          <input type="hidden" id="selected-color" value="${colorOptions[0].value}">
        </div>

        <!-- Privacy Settings -->
        <div>
          <label class="block text-sm font-medium mb-3">Privacy</label>
          <div class="space-y-2">
            <label class="flex items-center gap-3 p-4 glass-effect rounded-lg cursor-pointer hover:bg-white/10 transition-all">
              <input type="radio" name="playlist-privacy" value="private" checked class="w-4 h-4 text-blue-500">
              <div class="flex-1">
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                  <span class="font-semibold">Private</span>
                </div>
                <p class="text-sm text-gray-400">Only you can see this playlist</p>
              </div>
            </label>
            <label class="flex items-center gap-3 p-4 glass-effect rounded-lg cursor-pointer hover:bg-white/10 transition-all">
              <input type="radio" name="playlist-privacy" value="public" class="w-4 h-4 text-blue-500">
              <div class="flex-1">
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  <span class="font-semibold">Public</span>
                </div>
                <p class="text-sm text-gray-400">Anyone can discover and view this playlist</p>
              </div>
            </label>
          </div>
        </div>

        <!-- Tags (Optional) -->
        <div>
          <label for="playlist-tags" class="block text-sm font-medium mb-2">Tags (Optional)</label>
          <input 
            type="text" 
            id="playlist-tags" 
            placeholder="e.g., workout, chill, party (separate with commas)"
            class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
          >
          <p class="text-xs text-gray-400 mt-1">Add tags to help organize your playlists</p>
          <div id="tags-preview" class="mt-2 flex flex-wrap gap-2">
            <!-- Tags will appear here -->
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3 pt-4 border-t border-white/10">
          <button type="button" class="cancel-create-playlist flex-1 px-6 py-3 glass-effect rounded-lg font-semibold hover:bg-white/20 transition-all">
            Cancel
          </button>
          <button type="submit" class="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg transition-all">
            Create Playlist
          </button>
        </div>
      </form>
    </div>
  `;

  // Close modal handlers
  const closeBtn = modal.querySelector('.close-create-playlist-modal');
  const cancelBtn = modal.querySelector('.cancel-create-playlist');

  const closeModal = () => {
    modal.remove();
    if (onSuccess) onSuccess(null);
  };

  closeBtn?.addEventListener('click', closeModal);
  cancelBtn?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Cover image upload
  const coverPreview = modal.querySelector('#playlist-cover-preview');
  const coverInput = modal.querySelector('#playlist-cover-input');
  const uploadBtn = modal.querySelector('#upload-cover-btn');
  let coverImageData = null;

  coverPreview?.addEventListener('click', () => coverInput?.click());
  uploadBtn?.addEventListener('click', () => coverInput?.click());

  coverInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        coverImageData = event.target.result;
        coverPreview.style.backgroundImage = `url(${coverImageData})`;
        coverPreview.style.backgroundSize = 'cover';
        coverPreview.style.backgroundPosition = 'center';
        coverPreview.innerHTML = '';
      };
      reader.readAsDataURL(file);
    }
  });

  // Color selection
  const colorOptionButtons = modal.querySelectorAll('.color-option');
  const selectedColorInput = modal.querySelector('#selected-color');
  colorOptionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      colorOptionButtons.forEach(b => b.classList.remove('ring-2', 'ring-blue-400'));
      btn.classList.add('ring-2', 'ring-blue-400');
      if (selectedColorInput) {
        selectedColorInput.value = btn.dataset.color;
      }
    });
  });

  // Description character counter
  const descriptionInput = modal.querySelector('#playlist-description');
  const descriptionCount = modal.querySelector('#description-count');
  if (descriptionInput && descriptionCount) {
    descriptionInput.addEventListener('input', () => {
      descriptionCount.textContent = descriptionInput.value.length;
    });
  }

  // Tags input
  const tagsInput = modal.querySelector('#playlist-tags');
  const tagsPreview = modal.querySelector('#tags-preview');
  if (tagsInput && tagsPreview) {
    tagsInput.addEventListener('input', (e) => {
      const tags = e.target.value.split(',').map(t => t.trim()).filter(t => t);
      tagsPreview.innerHTML = tags.map(tag => `
        <span class="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">${tag}</span>
      `).join('');
    });
  }

  // Form submission
  const form = modal.querySelector('#create-playlist-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = modal.querySelector('#playlist-name');
      const descriptionInput = modal.querySelector('#playlist-description');
      const privacyInput = modal.querySelector('input[name="playlist-privacy"]:checked');
      const tagsInput = modal.querySelector('#playlist-tags');
      const colorInput = modal.querySelector('#selected-color');

      if (!nameInput || !nameInput.value.trim()) {
        showNotification('Please enter a playlist name', 'error');
        return;
      }

      const playlistData = {
        name: nameInput.value.trim(),
        description: descriptionInput?.value.trim() || '',
        isPublic: privacyInput?.value === 'public',
        coverImage: coverImageData,
        color: colorInput?.value || 'from-blue-500 to-purple-600',
        tags: tagsInput?.value.split(',').map(t => t.trim()).filter(t => t) || [],
        tracks: initialTrackId ? [initialTrackId] : []
      };

      const playlist = dataManager.createPlaylist(playlistData);
      showNotification(`Playlist "${playlist.name}" created successfully!`, 'success');

      // Add to notification center
      dataManager.addNotification({
        type: 'activity',
        title: 'Playlist Created',
        message: `"${playlist.name}" has been created successfully.`,
        action: { type: 'navigate', target: '#playlists' }
      });
      updateNotificationBadge();

      loadPlaylists();
      loadOverview();

      const currentSection = document.querySelector('.dashboard-section:not(.hidden)');
      if (currentSection && currentSection.id === 'profile') {
        loadProfile();
      }

      modal.remove();
      if (onSuccess) onSuccess(playlist);
    });
  }

  document.body.appendChild(modal);

  // Focus on name input
  const nameInput = modal.querySelector('#playlist-name');
  if (nameInput) {
    setTimeout(() => nameInput.focus(), 100);
  }
}

/**
 * Delete playlist
 */
function deletePlaylist(playlistId) {
  const playlists = dataManager.getPlaylists();
  const playlist = playlists.find(p => p.id === playlistId);

  if (confirm('Are you sure you want to delete this playlist?')) {
    dataManager.deletePlaylist(playlistId);
    showNotification('Playlist deleted', 'success');

    // Add to notification center
    if (playlist) {
      dataManager.addNotification({
        type: 'activity',
        title: 'Playlist Deleted',
        message: `"${playlist.name}" has been deleted.`,
        action: null
      });
      updateNotificationBadge();
    }

    loadPlaylists();
    loadOverview();
    const currentSection = document.querySelector('.dashboard-section:not(.hidden)');
    if (currentSection && currentSection.id === 'profile') {
      loadProfile();
    }
  }
}

/**
 * Play playlist
 */
function playPlaylist(playlistId) {
  const playlists = dataManager.getPlaylists();
  const playlist = playlists.find(p => p.id === playlistId);
  if (playlist && playlist.tracks.length > 0) {
    // Set queue to playlist tracks
    musicPlayer.queue = [...playlist.tracks];
    musicPlayer.currentIndex = 0;
    playTrack(playlist.tracks[0]);
    showNotification(`Playing "${playlist.name}"`, 'info');
  }
}

/**
 * Show playlist details
 */
function showPlaylistDetails(playlistId) {
  const playlists = dataManager.getPlaylists();
  const playlist = playlists.find(p => p.id === playlistId);
  if (!playlist) return;

  // Create and show playlist modal
  showPlaylistModal(playlist);
}

/**
 * Show playlist modal with tracks
 */
function showPlaylistModal(playlist) {
  const library = dataManager.getLibrary();
  const playlistTracks = library.filter(t => playlist.tracks.includes(t.id));

  // Create modal
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4';
  modal.innerHTML = `
    <div class="glass-effect rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-2xl font-display font-bold mb-1">${playlist.name}</h2>
          <p class="text-gray-400">${playlistTracks.length} track${playlistTracks.length !== 1 ? 's' : ''}</p>
        </div>
        <button class="close-playlist-modal p-2 hover:bg-white/10 rounded-lg transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div class="space-y-2">
        ${playlistTracks.length === 0
      ? '<p class="text-gray-400 text-center py-8">This playlist is empty</p>'
      : playlistTracks.map((track, index) => `
            <div class="flex items-center gap-3 p-3 glass-effect rounded-lg hover:bg-white/5 cursor-pointer group" data-track-id="${track.id}">
              <span class="text-gray-500 w-6 text-sm">${index + 1}</span>
              <div class="w-12 h-12 bg-gradient-to-br ${track.color} rounded-lg flex-shrink-0"></div>
              <div class="flex-1 min-w-0">
                <p class="font-semibold truncate">${track.title}</p>
                <p class="text-sm text-gray-400 truncate">${track.artist}</p>
              </div>
              <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button class="play-track-from-playlist p-2 hover:bg-white/10 rounded transition-colors" data-track-id="${track.id}">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
                <button class="remove-from-playlist p-2 hover:bg-red-500/20 rounded transition-colors text-red-400" data-track-id="${track.id}" data-playlist-id="${playlist.id}">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          `).join('')
    }
      </div>
      <div class="mt-6 flex gap-3">
        <button class="play-all-playlist flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg transition-all" data-playlist-id="${playlist.id}">
          Play All
        </button>
        <button class="add-tracks-to-playlist px-4 py-2 glass-effect rounded-lg hover:bg-white/20 transition-all" data-playlist-id="${playlist.id}">
          Add Tracks
        </button>
      </div>
    </div>
  `;

  // Add event listeners
  modal.querySelector('.close-playlist-modal')?.addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });

  modal.querySelectorAll('.play-track-from-playlist').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const trackId = parseInt(btn.dataset.trackId);
      playTrack(trackId);
    });
  });

  modal.querySelectorAll('.remove-from-playlist').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const trackId = parseInt(btn.dataset.trackId);
      const playlistId = parseInt(btn.dataset.playlistId);
      dataManager.removeTrackFromPlaylist(playlistId, trackId);
      showNotification('Track removed from playlist', 'success');
      loadPlaylists();
      modal.remove();
      showPlaylistModal(dataManager.getPlaylists().find(p => p.id === playlistId));
    });
  });

  modal.querySelector('.play-all-playlist')?.addEventListener('click', () => {
    if (playlistTracks.length > 0) {
      // Set queue to playlist tracks
      musicPlayer.queue = playlist.tracks;
      musicPlayer.currentIndex = 0;
      playTrack(playlist.tracks[0]);
      modal.remove();
    }
  });

  modal.querySelector('.add-tracks-to-playlist')?.addEventListener('click', () => {
    showAddTracksToPlaylistModal(playlist.id);
    modal.remove();
  });

  document.body.appendChild(modal);
}

/**
 * Show modal to add tracks to playlist
 */
function showAddTracksToPlaylistModal(playlistId) {
  const library = dataManager.getLibrary();
  const playlist = dataManager.getPlaylists().find(p => p.id === playlistId);
  if (!playlist) return;

  const availableTracks = library.filter(t => !playlist.tracks.includes(t.id));

  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4';
  modal.innerHTML = `
    <div class="glass-effect rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-display font-bold">Add Tracks to "${playlist.name}"</h2>
        <button class="close-add-tracks-modal p-2 hover:bg-white/10 rounded-lg transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div class="space-y-2 max-h-96 overflow-y-auto">
        ${availableTracks.length === 0
      ? '<p class="text-gray-400 text-center py-8">All tracks are already in this playlist</p>'
      : availableTracks.map(track => `
            <div class="flex items-center gap-3 p-3 glass-effect rounded-lg hover:bg-white/5 cursor-pointer group" data-track-id="${track.id}">
              <div class="w-12 h-12 bg-gradient-to-br ${track.color} rounded-lg flex-shrink-0"></div>
              <div class="flex-1 min-w-0">
                <p class="font-semibold truncate">${track.title}</p>
                <p class="text-sm text-gray-400 truncate">${track.artist}</p>
              </div>
              <button class="add-track-to-playlist-btn px-4 py-2 glass-effect rounded-lg hover:bg-white/20 transition-all text-sm" data-track-id="${track.id}" data-playlist-id="${playlistId}">
                Add
              </button>
            </div>
          `).join('')
    }
      </div>
    </div>
  `;

  modal.querySelector('.close-add-tracks-modal')?.addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });

  modal.querySelectorAll('.add-track-to-playlist-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const trackId = parseInt(btn.dataset.trackId);
      const playlistId = parseInt(btn.dataset.playlistId);
      dataManager.addTrackToPlaylist(playlistId, trackId);
      showNotification('Track added to playlist', 'success');
      loadPlaylists();
      modal.remove();
    });
  });

  document.body.appendChild(modal);
}

/**
 * Initialize quick actions
 */
function initQuickActions() {
  const createPlaylistBtn = document.querySelector('#overview button:contains("Create New Playlist")');
  if (createPlaylistBtn) {
    createPlaylistBtn.addEventListener('click', createPlaylist);
  }

  const discoverBtn = document.querySelector('#overview button:contains("Discover New Music")');
  if (discoverBtn) {
    discoverBtn.addEventListener('click', () => {
      // Navigate to library or show recommendations
      document.querySelector('[data-section="library"]')?.click();
    });
  }
}

// Music Player State
const musicPlayer = {
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.7,
  isShuffled: false,
  repeatMode: 'off', // 'off', 'all', 'one'
  queue: [],
  currentIndex: -1,
  progressInterval: null
};

/**
 * Initialize music player
 */
function initMusicPlayer() {
  const player = document.getElementById('music-player');
  if (!player) return;

  // Play/Pause button
  const playPauseBtn = document.getElementById('player-play-pause-btn');
  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', togglePlayPause);
  }

  // Previous button
  const prevBtn = document.getElementById('player-prev-btn');
  if (prevBtn) {
    prevBtn.addEventListener('click', playPrevious);
  }

  // Next button
  const nextBtn = document.getElementById('player-next-btn');
  if (nextBtn) {
    nextBtn.addEventListener('click', playNext);
  }

  // Shuffle button
  const shuffleBtn = document.getElementById('player-shuffle-btn');
  if (shuffleBtn) {
    shuffleBtn.addEventListener('click', toggleShuffle);
  }

  // Repeat button
  const repeatBtn = document.getElementById('player-repeat-btn');
  if (repeatBtn) {
    repeatBtn.addEventListener('click', toggleRepeat);
  }

  // Progress bar
  const progressBar = document.getElementById('player-progress-bar');
  if (progressBar) {
    progressBar.addEventListener('click', seekTrack);
    progressBar.addEventListener('mousemove', (e) => {
      if (musicPlayer.duration > 0) {
        const rect = progressBar.getBoundingClientRect();
        const percent = ((e.clientX - rect.left) / rect.width) * 100;
        const hoverBar = document.getElementById('player-progress-hover');
        if (hoverBar) {
          hoverBar.style.width = `${Math.max(0, Math.min(100, percent))}%`;
        }
      }
    });
  }

  // Volume control
  const volumeBar = document.getElementById('player-volume-bar');
  if (volumeBar) {
    volumeBar.addEventListener('click', adjustVolume);
  }

  const volumeBtn = document.getElementById('player-volume-btn');
  if (volumeBtn) {
    volumeBtn.addEventListener('click', toggleMute);
  }

  // Favorite button
  const favoriteBtn = document.getElementById('player-favorite-btn');
  if (favoriteBtn) {
    favoriteBtn.addEventListener('click', () => {
      if (musicPlayer.currentTrack) {
        toggleFavorite(musicPlayer.currentTrack.id);
        updatePlayerFavoriteButton();
      }
    });
  }

  // Minimize button
  const minimizeBtn = document.getElementById('player-minimize-btn');
  if (minimizeBtn) {
    minimizeBtn.addEventListener('click', () => {
      player.classList.add('translate-y-full');
    });
  }

  // Queue button
  const queueBtn = document.getElementById('player-queue-btn');
  if (queueBtn) {
    queueBtn.addEventListener('click', showQueue);
  }
}

/**
 * Play track
 */
function playTrack(trackId) {
  const library = dataManager.getLibrary();
  const track = library.find(t => t.id === trackId);

  if (track) {
    // Add to recently played
    dataManager.addToRecent(trackId);

    // Set current track
    musicPlayer.currentTrack = track;
    musicPlayer.duration = track.duration;
    musicPlayer.currentTime = 0;
    musicPlayer.isPlaying = true;

    // Update queue if empty or if track is not in current queue
    if (musicPlayer.queue.length === 0 || !musicPlayer.queue.includes(trackId)) {
      musicPlayer.queue = library.map(t => t.id);
      musicPlayer.currentIndex = musicPlayer.queue.indexOf(trackId);
    } else {
      // Update current index if track is already in queue
      musicPlayer.currentIndex = musicPlayer.queue.indexOf(trackId);
    }

    // Show and update player
    showMusicPlayer();
    updatePlayerUI();
    startProgressTimer();

    // Update UI
    initRecent();
    loadRecentlyPlayedPreview();

    // Update all sections that might show this track
    const currentSection = document.querySelector('.dashboard-section:not(.hidden)');
    if (currentSection) {
      const sectionId = currentSection.id;
      if (sectionId === 'overview') loadOverview();
      else if (sectionId === 'library') initLibrary();
      else if (sectionId === 'recent') initRecent();
      else if (sectionId === 'profile') loadProfile();
    }
  }
}

/**
 * Show music player
 */
function showMusicPlayer() {
  const player = document.getElementById('music-player');
  if (player) {
    player.classList.remove('translate-y-full');
    // Adjust main content padding to account for player
    const main = document.querySelector('main');
    if (main) {
      main.style.paddingBottom = '100px';
    }
  }
}

/**
 * Update player UI
 */
function updatePlayerUI() {
  if (!musicPlayer.currentTrack) return;

  const track = musicPlayer.currentTrack;

  // Update track info
  const titleEl = document.getElementById('player-track-title');
  const artistEl = document.getElementById('player-track-artist');
  const albumArtEl = document.getElementById('player-album-art');
  const durationEl = document.getElementById('player-duration');
  const favoriteBtn = document.getElementById('player-favorite-btn');

  if (titleEl) titleEl.textContent = track.title;
  if (artistEl) artistEl.textContent = track.artist;
  if (durationEl) durationEl.textContent = formatDuration(track.duration);

  if (albumArtEl) {
    albumArtEl.className = `w-14 h-14 bg-gradient-to-br ${track.color} rounded-lg flex-shrink-0`;
    albumArtEl.innerHTML = `
      <div class="w-full h-full flex items-center justify-center text-white">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </div>
    `;
  }

  if (favoriteBtn) {
    favoriteBtn.classList.remove('hidden');
    updatePlayerFavoriteButton();
  }

  updatePlayPauseButton();
  updateProgress();
}

/**
 * Update play/pause button
 */
function updatePlayPauseButton() {
  const playIcon = document.getElementById('player-play-icon');
  const pauseIcon = document.getElementById('player-pause-icon');

  if (musicPlayer.isPlaying) {
    if (playIcon) playIcon.classList.add('hidden');
    if (pauseIcon) pauseIcon.classList.remove('hidden');
  } else {
    if (playIcon) playIcon.classList.remove('hidden');
    if (pauseIcon) pauseIcon.classList.add('hidden');
  }
}

/**
 * Update player favorite button
 */
function updatePlayerFavoriteButton() {
  const favoriteBtn = document.getElementById('player-favorite-btn');
  if (!favoriteBtn || !musicPlayer.currentTrack) return;

  const favorites = dataManager.getFavorites();
  const isFavorite = favorites.includes(musicPlayer.currentTrack.id);
  const svg = favoriteBtn.querySelector('svg');

  if (isFavorite) {
    favoriteBtn.classList.add('text-red-400');
    svg.setAttribute('fill', 'currentColor');
  } else {
    favoriteBtn.classList.remove('text-red-400');
    svg.setAttribute('fill', 'none');
  }
}

/**
 * Toggle play/pause
 */
function togglePlayPause() {
  if (!musicPlayer.currentTrack) return;

  musicPlayer.isPlaying = !musicPlayer.isPlaying;
  updatePlayPauseButton();

  if (musicPlayer.isPlaying) {
    startProgressTimer();
  } else {
    stopProgressTimer();
  }
}

/**
 * Start progress timer
 */
function startProgressTimer() {
  stopProgressTimer();

  musicPlayer.progressInterval = setInterval(() => {
    if (musicPlayer.isPlaying && musicPlayer.currentTrack) {
      musicPlayer.currentTime += 1;

      if (musicPlayer.currentTime >= musicPlayer.duration) {
        // Track finished
        if (musicPlayer.repeatMode === 'one') {
          musicPlayer.currentTime = 0;
        } else {
          playNext();
        }
      } else {
        updateProgress();
      }
    }
  }, 1000);
}

/**
 * Stop progress timer
 */
function stopProgressTimer() {
  if (musicPlayer.progressInterval) {
    clearInterval(musicPlayer.progressInterval);
    musicPlayer.progressInterval = null;
  }
}

/**
 * Update progress bar
 */
function updateProgress() {
  const progressEl = document.getElementById('player-progress');
  const currentTimeEl = document.getElementById('player-current-time');

  if (progressEl && musicPlayer.duration > 0) {
    const percent = (musicPlayer.currentTime / musicPlayer.duration) * 100;
    progressEl.style.width = `${percent}%`;
  }

  if (currentTimeEl) {
    currentTimeEl.textContent = formatDuration(musicPlayer.currentTime);
  }
}

/**
 * Seek track
 */
function seekTrack(e) {
  if (!musicPlayer.currentTrack || musicPlayer.duration === 0) return;

  const rect = e.currentTarget.getBoundingClientRect();
  const percent = ((e.clientX - rect.left) / rect.width);
  musicPlayer.currentTime = Math.floor(musicPlayer.duration * Math.max(0, Math.min(1, percent)));
  updateProgress();
}

/**
 * Play previous track
 */
function playPrevious() {
  if (musicPlayer.queue.length === 0) return;

  if (musicPlayer.currentIndex > 0) {
    musicPlayer.currentIndex--;
  } else {
    musicPlayer.currentIndex = musicPlayer.queue.length - 1;
  }

  const trackId = musicPlayer.queue[musicPlayer.currentIndex];
  playTrack(trackId);
}

/**
 * Play next track
 */
function playNext() {
  if (musicPlayer.queue.length === 0) return;

  if (musicPlayer.repeatMode === 'one') {
    musicPlayer.currentTime = 0;
    updateProgress();
    return;
  }

  if (musicPlayer.isShuffled) {
    musicPlayer.currentIndex = Math.floor(Math.random() * musicPlayer.queue.length);
  } else {
    if (musicPlayer.currentIndex < musicPlayer.queue.length - 1) {
      musicPlayer.currentIndex++;
    } else {
      if (musicPlayer.repeatMode === 'all') {
        musicPlayer.currentIndex = 0;
      } else {
        // Stop playing
        musicPlayer.isPlaying = false;
        updatePlayPauseButton();
        stopProgressTimer();
        return;
      }
    }
  }

  const trackId = musicPlayer.queue[musicPlayer.currentIndex];
  playTrack(trackId);
}

/**
 * Toggle shuffle
 */
function toggleShuffle() {
  musicPlayer.isShuffled = !musicPlayer.isShuffled;
  const shuffleBtn = document.getElementById('player-shuffle-btn');
  if (shuffleBtn) {
    if (musicPlayer.isShuffled) {
      shuffleBtn.classList.add('text-blue-400');
    } else {
      shuffleBtn.classList.remove('text-blue-400');
    }
  }
}

/**
 * Toggle repeat
 */
function toggleRepeat() {
  const modes = ['off', 'all', 'one'];
  const currentIndex = modes.indexOf(musicPlayer.repeatMode);
  musicPlayer.repeatMode = modes[(currentIndex + 1) % modes.length];

  const repeatBtn = document.getElementById('player-repeat-btn');
  if (repeatBtn) {
    const svg = repeatBtn.querySelector('svg');
    if (musicPlayer.repeatMode === 'off') {
      repeatBtn.classList.remove('text-blue-400');
      if (svg) svg.setAttribute('fill', 'none');
    } else if (musicPlayer.repeatMode === 'all') {
      repeatBtn.classList.add('text-blue-400');
      if (svg) svg.setAttribute('fill', 'none');
    } else if (musicPlayer.repeatMode === 'one') {
      repeatBtn.classList.add('text-blue-400');
      if (svg) svg.setAttribute('fill', 'currentColor');
    }
  }
}

/**
 * Adjust volume
 */
function adjustVolume(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  musicPlayer.volume = percent;

  const volumeLevel = document.getElementById('player-volume-level');
  if (volumeLevel) {
    volumeLevel.style.width = `${percent * 100}%`;
  }

  updateVolumeIcon();
}

/**
 * Toggle mute
 */
function toggleMute() {
  const savedVolume = musicPlayer.volume;
  if (musicPlayer.volume > 0) {
    musicPlayer.volume = 0;
  } else {
    musicPlayer.volume = savedVolume || 0.7;
  }

  const volumeLevel = document.getElementById('player-volume-level');
  if (volumeLevel) {
    volumeLevel.style.width = `${musicPlayer.volume * 100}%`;
  }

  updateVolumeIcon();
}

/**
 * Update volume icon
 */
function updateVolumeIcon() {
  const volumeIcon = document.getElementById('player-volume-icon');
  if (!volumeIcon) return;

  if (musicPlayer.volume === 0) {
    volumeIcon.innerHTML = `
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clip-rule="evenodd"></path>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path>
    `;
  } else if (musicPlayer.volume < 0.5) {
    volumeIcon.innerHTML = `
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
    `;
  } else {
    volumeIcon.innerHTML = `
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M6.343 6.343L4.93 4.93A1 1 0 003.515 6.343L5.93 8.757a6 6 0 000 6.486l-2.415 2.414a1 1 0 001.414 1.415l1.414-1.415a9 9 0 000-12.728z"></path>
    `;
  }
}

/**
 * Show queue
 */
function showQueue() {
  if (musicPlayer.queue.length === 0) {
    showNotification('Queue is empty', 'info');
    return;
  }

  const library = dataManager.getLibrary();
  const queueTracks = musicPlayer.queue.map(id => library.find(t => t.id === id)).filter(Boolean);

  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4';
  modal.innerHTML = `
    <div class="glass-effect rounded-xl p-6 max-w-md w-full max-h-96 overflow-y-auto">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-display font-bold">Queue</h2>
        <button class="close-queue-modal p-2 hover:bg-white/10 rounded-lg transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div class="space-y-2">
        ${queueTracks.map((track, index) => `
          <div class="flex items-center gap-3 p-3 glass-effect rounded-lg hover:bg-white/5 cursor-pointer ${index === musicPlayer.currentIndex ? 'bg-blue-500/20 border border-blue-500/50' : ''}" 
               data-track-index="${index}">
            <div class="w-10 h-10 bg-gradient-to-br ${track.color} rounded-lg flex-shrink-0"></div>
            <div class="flex-1 min-w-0">
              <p class="font-semibold truncate text-sm">${track.title}</p>
              <p class="text-xs text-gray-400 truncate">${track.artist}</p>
            </div>
            ${index === musicPlayer.currentIndex ? '<span class="text-xs text-blue-400">Now Playing</span>' : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `;

  modal.querySelector('.close-queue-modal')?.addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });

  modal.querySelectorAll('[data-track-index]').forEach(item => {
    item.addEventListener('click', () => {
      const index = parseInt(item.dataset.trackIndex);
      musicPlayer.currentIndex = index;
      playTrack(musicPlayer.queue[index]);
      modal.remove();
    });
  });

  document.body.appendChild(modal);
}

/**
 * Initialize account type management
 */
function initAccountType() {
  const upgradeBtn = document.getElementById('upgrade-account-btn');
  if (upgradeBtn) {
    upgradeBtn.addEventListener('click', showAccountTypeModal);
  }
}

/**
 * Show account type management modal
 */
function showAccountTypeModal() {
  const accountType = dataManager.getAccountType();
  const plans = [
    {
      name: 'Free',
      plan: 'Free Membership',
      price: '$0',
      period: 'forever',
      features: ['Basic streaming', 'Standard quality', 'Limited downloads', 'Ads included'],
      storage: { total: 2, unit: 'GB' },
      color: 'from-gray-500 to-gray-700'
    },
    {
      name: 'Premium',
      plan: 'Premium Membership',
      price: '$9.99',
      period: 'per month',
      features: ['Unlimited streaming', 'High quality audio', 'Offline downloads', 'Ad-free experience'],
      storage: { total: 10, unit: 'GB' },
      color: 'from-blue-500 to-purple-600',
      popular: true
    },
    {
      name: 'Pro',
      plan: 'Pro Membership',
      price: '$19.99',
      period: 'per month',
      features: ['Everything in Premium', 'Ultra HD audio', 'Unlimited downloads', 'Priority support', 'Early access'],
      storage: { total: 50, unit: 'GB' },
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4';
  modal.innerHTML = `
    <div class="glass-effect rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-display font-bold">Manage Your Plan</h2>
        <button class="close-account-modal p-2 hover:bg-white/10 rounded-lg transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div class="mb-6 p-4 glass-effect rounded-lg">
        <p class="text-sm text-gray-400 mb-2">Current Plan</p>
        <p class="text-xl font-semibold">${accountType.plan}</p>
      </div>

      <div class="grid md:grid-cols-3 gap-4">
        ${plans.map(plan => {
    const isCurrent = plan.name === accountType.type;
    return `
            <div class="glass-effect rounded-xl p-6 relative ${isCurrent ? 'ring-2 ring-blue-500' : ''} ${plan.popular ? 'border-2 border-blue-500/50' : ''}">
              ${plan.popular ? `
                <div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span class="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-xs font-semibold">Most Popular</span>
                </div>
              ` : ''}
              <div class="text-center mb-4">
                <h3 class="text-xl font-display font-bold mb-2">${plan.name}</h3>
                <div class="mb-4">
                  <span class="text-3xl font-bold">${plan.price}</span>
                  <span class="text-sm text-gray-400">/${plan.period === 'forever' ? 'forever' : 'month'}</span>
                </div>
              </div>
              <ul class="space-y-2 mb-6">
                ${plan.features.map(feature => `
                  <li class="flex items-start gap-2 text-sm">
                    <svg class="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span>${feature}</span>
                  </li>
                `).join('')}
                <li class="flex items-start gap-2 text-sm">
                  <svg class="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>${plan.storage.total} ${plan.storage.unit} storage</span>
                </li>
              </ul>
              <button class="select-plan-btn w-full px-4 py-3 rounded-lg font-semibold transition-all ${isCurrent
        ? 'bg-gray-700 text-gray-300 cursor-not-allowed'
        : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg'
      }" 
              data-plan-name="${plan.name}" 
              ${isCurrent ? 'disabled' : ''}>
                ${isCurrent ? 'Current Plan' : plan.name === 'Free' ? 'Downgrade' : 'Upgrade'}
              </button>
            </div>
          `;
  }).join('')}
      </div>

      <div class="mt-6 p-4 glass-effect rounded-lg">
        <h3 class="font-semibold mb-2">Billing Information</h3>
        <div class="space-y-2 text-sm text-gray-400">
          <p>Next billing date: ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
          <p>Payment method: •••• •••• •••• 4242</p>
          <button class="text-blue-400 hover:text-blue-300 transition-colors">Update payment method</button>
        </div>
      </div>
    </div>
  `;

  modal.querySelector('.close-account-modal')?.addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });

  modal.querySelectorAll('.select-plan-btn:not([disabled])').forEach(btn => {
    btn.addEventListener('click', () => {
      const planName = btn.dataset.planName;
      const selectedPlan = plans.find(p => p.name === planName);

      if (selectedPlan) {
        const action = planName === 'Free' ? 'downgrade to' : planName === accountType.type ? 'keep' : 'upgrade to';
        if (action === 'keep') return;

        if (confirm(`Are you sure you want to ${action} ${selectedPlan.plan}?`)) {
          dataManager.updateAccountType({
            type: selectedPlan.name,
            plan: selectedPlan.plan,
            features: selectedPlan.features,
            storage: {
              used: accountType.storage?.used || 0,
              total: selectedPlan.storage.total,
              unit: selectedPlan.storage.unit
            }
          });

          showNotification(`Plan updated to ${selectedPlan.plan}!`, 'success');
          loadAccountType();
          loadProfile();
          modal.remove();
        }
      }
    });
  });

  document.body.appendChild(modal);
}

/**
 * Load account type information
 */
function loadAccountType() {
  const accountType = dataManager.getAccountType();

  const accountTypeDisplay = document.getElementById('account-type-display');
  const accountFeatures = document.getElementById('account-features');
  const storageDisplay = document.getElementById('storage-display');
  const storageProgress = document.getElementById('storage-progress');

  if (accountTypeDisplay) {
    accountTypeDisplay.textContent = accountType.plan || 'Premium Membership';
  }

  if (accountFeatures && accountType.features) {
    accountFeatures.innerHTML = accountType.features.map(feature => `
      <span class="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">${feature}</span>
    `).join('');
  }

  if (storageDisplay && accountType.storage) {
    const { used, total, unit } = accountType.storage;
    storageDisplay.textContent = `${used} ${unit} of ${total} ${unit}`;
  }

  if (storageProgress && accountType.storage) {
    const { used, total } = accountType.storage;
    const percent = (used / total) * 100;
    storageProgress.style.width = `${Math.min(100, percent)}%`;
  }

  // Update sidebar membership badge
  const sidebarBadge = document.getElementById('sidebar-member-type');
  if (sidebarBadge && accountType.type) {
    sidebarBadge.textContent = `${accountType.type} Member`;
  }

  // Update profile header badge
  const profileBadge = document.querySelector('#profile .text-blue-300');
  if (profileBadge && accountType.type) {
    const badgeText = profileBadge.textContent;
    if (badgeText.includes('Premium') || badgeText.includes('Member')) {
      profileBadge.innerHTML = `
        <svg class="w-4 h-4 inline-block mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        ${accountType.plan}
      `;
    }
  }
}

/**
 * Toggle favorite
 */
function toggleFavorite(trackId) {
  const favorites = dataManager.getFavorites();
  const isFavorite = favorites.includes(trackId);
  const library = dataManager.getLibrary();
  const track = library.find(t => t.id === trackId);

  if (isFavorite) {
    dataManager.removeFromFavorites(trackId);
    showNotification('Removed from favorites', 'info');

    // Add to notification center
    if (track) {
      dataManager.addNotification({
        type: 'activity',
        title: 'Removed from Favorites',
        message: `"${track.title}" by ${track.artist} has been removed from your favorites.`,
        action: { type: 'navigate', target: '#favorites' }
      });
      updateNotificationBadge();
    }
  } else {
    dataManager.addToFavorites(trackId);
    showNotification('Added to favorites', 'success');

    // Add to notification center
    if (track) {
      dataManager.addNotification({
        type: 'activity',
        title: 'Added to Favorites',
        message: `"${track.title}" by ${track.artist} has been added to your favorites.`,
        action: { type: 'navigate', target: '#favorites' }
      });
      updateNotificationBadge();
    }
  }

  // Update UI in all relevant sections
  initFavorites();
  loadOverview();
  updateFavoriteButtons();

  // Update player favorite button if track is playing
  if (musicPlayer.currentTrack && musicPlayer.currentTrack.id === trackId) {
    updatePlayerFavoriteButton();
  }

  // Update library if visible
  const currentSection = document.querySelector('.dashboard-section:not(.hidden)');
  if (currentSection && currentSection.id === 'library') {
    initLibrary();
  }

  // Update profile if visible
  if (currentSection && currentSection.id === 'profile') {
    loadProfile();
  }
}

/**
 * Update favorite button states
 */
function updateFavoriteButtons() {
  const favorites = dataManager.getFavorites();
  document.querySelectorAll('.favorite-btn').forEach(btn => {
    const trackId = parseInt(btn.dataset.trackId);
    const isFavorite = favorites.includes(trackId);
    const svg = btn.querySelector('svg');
    if (svg) {
      if (isFavorite) {
        svg.classList.add('text-red-400');
        svg.setAttribute('fill', 'currentColor');
      } else {
        svg.classList.remove('text-red-400');
        svg.setAttribute('fill', 'none');
      }
    }
  });
}

/**
 * Download track
 */
function downloadTrack(trackId) {
  const library = dataManager.getLibrary();
  const track = library.find(t => t.id === trackId);

  if (track) {
    dataManager.downloadTrack(trackId);
    showNotification(`Downloading "${track.title}"...`, 'info');

    // Update downloads section if visible
    const currentSection = document.querySelector('.dashboard-section:not(.hidden)');
    if (currentSection && currentSection.id === 'downloads') {
      setTimeout(() => {
        showNotification(`"${track.title}" downloaded successfully!`, 'success');

        // Add to notification center
        dataManager.addNotification({
          type: 'activity',
          title: 'Download Complete',
          message: `"${track.title}" by ${track.artist} has been downloaded successfully.`,
          action: { type: 'navigate', target: '#downloads' }
        });
        updateNotificationBadge();

        initDownloads();
      }, 500);
    } else {
      setTimeout(() => {
        showNotification(`"${track.title}" downloaded successfully!`, 'success');

        // Add to notification center
        dataManager.addNotification({
          type: 'activity',
          title: 'Download Complete',
          message: `"${track.title}" by ${track.artist} has been downloaded successfully.`,
          action: { type: 'navigate', target: '#downloads' }
        });
        updateNotificationBadge();
      }, 500);
    }
  }
}

/**
 * Delete download with sophisticated modal and undo functionality
 */
let deletedDownloadData = null;
let undoTimeout = null;

function deleteDownload(trackId) {
  const library = dataManager.getLibrary();
  const track = library.find(t => t.id === trackId);

  if (!track) return;

  // Store deleted data for undo
  deletedDownloadData = {
    trackId: trackId,
    track: { ...track },
    timestamp: Date.now()
  };

  // Create sophisticated delete modal
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4';
  modal.innerHTML = `
    <div class="glass-effect rounded-xl p-6 max-w-md w-full transform scale-95 opacity-0 transition-all duration-300">
      <div class="flex items-center gap-4 mb-6">
        <div class="w-16 h-16 bg-gradient-to-br ${track.color} rounded-xl flex items-center justify-center flex-shrink-0">
          <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="text-xl font-display font-bold mb-1 truncate">${track.title}</h3>
          <p class="text-sm text-gray-400 truncate">${track.artist}</p>
        </div>
        <button class="close-delete-modal p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <div class="mb-6">
        <div class="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg mb-4">
          <div class="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
          <div class="flex-1">
            <p class="font-semibold text-red-300 mb-1">Remove from Downloads?</p>
            <p class="text-sm text-gray-400">This will remove the track from your downloaded music. You can download it again anytime.</p>
          </div>
        </div>
      </div>

      <div class="flex gap-3">
        <button class="cancel-delete-download flex-1 px-6 py-3 glass-effect rounded-lg font-semibold hover:bg-white/20 transition-all">
          Cancel
        </button>
        <button class="confirm-delete-download flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-red-500/50 transition-all">
          Remove
        </button>
      </div>
    </div>
  `;

  // Animate modal in
  requestAnimationFrame(() => {
    const modalContent = modal.querySelector('.glass-effect');
    modalContent.classList.remove('scale-95', 'opacity-0');
    modalContent.classList.add('scale-100', 'opacity-100');
  });

  // Close handlers
  const closeBtn = modal.querySelector('.close-delete-modal');
  const cancelBtn = modal.querySelector('.cancel-delete-download');

  const closeModal = () => {
    const modalContent = modal.querySelector('.glass-effect');
    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-95', 'opacity-0');
    setTimeout(() => modal.remove(), 300);
    deletedDownloadData = null;
  };

  closeBtn?.addEventListener('click', closeModal);
  cancelBtn?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Confirm delete
  const confirmBtn = modal.querySelector('.confirm-delete-download');
  confirmBtn?.addEventListener('click', () => {
    // Animate deletion
    const modalContent = modal.querySelector('.glass-effect');
    modalContent.classList.add('scale-95', 'opacity-0');

    setTimeout(() => {
      modal.remove();

      // Perform deletion
      dataManager.removeDownload(trackId);

      // Show success notification with undo option
      showDeleteNotificationWithUndo(track);

      // Add to notification center
      dataManager.addNotification({
        type: 'activity',
        title: 'Download Removed',
        message: `"${track.title}" by ${track.artist} has been removed from your downloads.`,
        action: null
      });
      updateNotificationBadge();

      // Reload downloads section with animation
      animateDownloadRemoval(trackId);
    }, 300);
  });

  document.body.appendChild(modal);
}

/**
 * Show delete notification with undo option
 */
function showDeleteNotificationWithUndo(track) {
  // Show notification and get its ID
  const notificationId = showNotification(
    `"${track.title}" removed from downloads`,
    'success',
    6000 // Longer duration for undo
  );

  // Create undo button in notification after a short delay
  setTimeout(() => {
    // Find notification by ID
    const notification = document.querySelector(`[data-notification-id="${notificationId}"]`);

    if (notification && deletedDownloadData) {
      const content = notification.querySelector('.flex-1');
      if (content) {
        const undoBtn = document.createElement('button');
        undoBtn.className = 'ml-3 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-medium transition-all border border-white/20';
        undoBtn.textContent = 'Undo';
        undoBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          undoDownloadDeletion();
          if (notification.parentElement) {
            notification.remove();
          }
        });
        content.appendChild(undoBtn);
      }
    }
  }, 200);

  // Auto-remove undo data after timeout
  if (undoTimeout) clearTimeout(undoTimeout);
  undoTimeout = setTimeout(() => {
    deletedDownloadData = null;
  }, 6000);
}

/**
 * Undo download deletion
 */
function undoDownloadDeletion() {
  if (!deletedDownloadData) return;

  const { trackId } = deletedDownloadData;

  // Restore download
  dataManager.downloadTrack(trackId);

  // Show success notification
  showNotification('Download restored', 'success');

  // Add to notification center
  dataManager.addNotification({
    type: 'activity',
    title: 'Download Restored',
    message: `"${deletedDownloadData.track.title}" has been restored to your downloads.`,
    action: null
  });
  updateNotificationBadge();

  // Reload downloads section
  initDownloads();

  // Clear undo data
  deletedDownloadData = null;
  if (undoTimeout) {
    clearTimeout(undoTimeout);
    undoTimeout = null;
  }
}

/**
 * Animate download removal
 */
function animateDownloadRemoval(trackId) {
  const container = document.querySelector('#downloads .glass-effect');
  if (!container) {
    initDownloads();
    return;
  }

  const trackElement = container.querySelector(`[data-track-id="${trackId}"]`)?.closest('.group');
  if (trackElement) {
    // Animate out
    trackElement.style.transition = 'all 0.3s ease-out';
    trackElement.style.opacity = '0';
    trackElement.style.transform = 'translateX(-20px)';
    trackElement.style.maxHeight = trackElement.offsetHeight + 'px';

    setTimeout(() => {
      trackElement.style.maxHeight = '0';
      trackElement.style.marginBottom = '0';
      trackElement.style.paddingTop = '0';
      trackElement.style.paddingBottom = '0';

      setTimeout(() => {
        // Reload if there are still downloads, otherwise show empty state
        const downloads = dataManager.getDownloads();
        if (downloads.length > 0) {
          initDownloads();
        } else {
          container.innerHTML = '<p class="text-gray-400 text-center py-8">No downloads yet. Start downloading your favorite tracks!</p>';
        }
      }, 300);
    }, 300);
  } else {
    initDownloads();
  }
}

/**
 * Initialize settings form handling
 */
function initSettings() {
  const settingsSection = document.getElementById('settings');
  if (!settingsSection) return;

  const settings = dataManager.getSettings();

  // Load saved settings
  const qualityInputs = settingsSection.querySelectorAll('input[name="quality"]');
  qualityInputs.forEach(input => {
    if (input.value === settings.audioQuality) {
      input.checked = true;
    }
  });

  const privacyToggles = settingsSection.querySelectorAll('input[type="checkbox"]');
  privacyToggles.forEach(toggle => {
    const label = toggle.closest('label');
    if (label) {
      const text = label.querySelector('span')?.textContent;
      if (text?.includes('public')) {
        toggle.checked = settings.publicPlaylists || false;
      } else if (text?.includes('activity')) {
        toggle.checked = settings.showActivity !== false;
      }
    }
  });

  // Handle profile form submission
  const profileForm = settingsSection.querySelector('#profile-form');
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      saveProfileSettings();
    });
  }

  // Handle audio quality selection
  qualityInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      dataManager.updateSettings({ audioQuality: e.target.value });
      showNotification('Audio quality preference saved', 'success');
    });
  });

  // Handle privacy toggles
  privacyToggles.forEach(toggle => {
    toggle.addEventListener('change', (e) => {
      const label = toggle.closest('label');
      if (label) {
        const text = label.querySelector('span')?.textContent;
        if (text?.includes('public')) {
          dataManager.updateSettings({ publicPlaylists: e.target.checked });
        } else if (text?.includes('activity')) {
          dataManager.updateSettings({ showActivity: e.target.checked });
        }
        showNotification('Privacy setting updated', 'success');
      }
    });
  });
}

/**
 * Save profile settings
 */
function saveProfileSettings() {
  const nameInput = document.querySelector('#settings input[type="text"]');
  const emailInput = document.querySelector('#settings input[type="email"]');

  if (nameInput && emailInput) {
    const user = getCurrentUser();
    if (user) {
      user.fullName = nameInput.value;
      user.email = emailInput.value;
      localStorage.setItem('user', JSON.stringify(user));
      showNotification('Profile updated successfully!', 'success');
      loadUserProfile();
    }
  }
}

/**
 * Notification system with enhanced features
 */
const notificationQueue = [];
let notificationContainer = null;

/**
 * Initialize notification container
 */
function initNotificationSystem() {
  if (!notificationContainer) {
    notificationContainer = document.createElement('div');
    notificationContainer.id = 'notification-container';
    notificationContainer.className = 'fixed top-4 right-4 z-[100] flex flex-col gap-3 pointer-events-none';
    document.body.appendChild(notificationContainer);
  }
}

/**
 * Show notification toast with enhanced features
 */
function showNotification(message, type = 'info', duration = 4000) {
  // Initialize notification system if not already done
  initNotificationSystem();

  const notificationId = Date.now();
  const icons = {
    success: `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    `,
    error: `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    `,
    info: `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    `,
    warning: `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
      </svg>
    `
  };

  const colors = {
    success: {
      bg: 'bg-green-500/20',
      border: 'border-green-500/50',
      text: 'text-green-300',
      icon: 'text-green-400',
      progress: 'bg-green-400'
    },
    error: {
      bg: 'bg-red-500/20',
      border: 'border-red-500/50',
      text: 'text-red-300',
      icon: 'text-red-400',
      progress: 'bg-red-400'
    },
    info: {
      bg: 'bg-blue-500/20',
      border: 'border-blue-500/50',
      text: 'text-blue-300',
      icon: 'text-blue-400',
      progress: 'bg-blue-400'
    },
    warning: {
      bg: 'bg-yellow-500/20',
      border: 'border-yellow-500/50',
      text: 'text-yellow-300',
      icon: 'text-yellow-400',
      progress: 'bg-yellow-400'
    }
  };

  const colorScheme = colors[type] || colors.info;
  const icon = icons[type] || icons.info;

  const toast = document.createElement('div');
  toast.dataset.notificationId = notificationId;
  toast.className = `notification-toast glass-effect ${colorScheme.border} border-l-4 rounded-xl shadow-2xl pointer-events-auto min-w-[320px] max-w-[420px] transform translate-x-full opacity-0 transition-all duration-300 ease-out`;

  toast.innerHTML = `
    <div class="p-4">
      <div class="flex items-start gap-3">
        <!-- Icon -->
        <div class="flex-shrink-0 ${colorScheme.icon} mt-0.5">
          ${icon}
        </div>
        
        <!-- Content -->
        <div class="flex-1 min-w-0">
          <p class="${colorScheme.text} font-medium text-sm leading-relaxed">${message}</p>
        </div>
        
        <!-- Close Button -->
        <button class="notification-close-btn flex-shrink-0 ${colorScheme.text} hover:opacity-70 transition-opacity p-1 rounded" aria-label="Close notification">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <!-- Progress Bar -->
      <div class="mt-3 h-0.5 bg-gray-700/50 rounded-full overflow-hidden">
        <div class="notification-progress h-full ${colorScheme.progress} rounded-full transition-all ease-linear" style="width: 100%"></div>
      </div>
    </div>
  `;

  // Add to container
  notificationContainer.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.classList.remove('translate-x-full', 'opacity-0');
      toast.classList.add('translate-x-0', 'opacity-100');
    });
  });

  // Start progress bar animation
  const progressBar = toast.querySelector('.notification-progress');
  if (progressBar) {
    progressBar.style.transition = `width ${duration}ms linear`;
    progressBar.style.width = '0%';
  }

  // Auto-dismiss
  const autoDismiss = setTimeout(() => {
    dismissNotification(toast);
  }, duration);

  // Close button handler
  const closeBtn = toast.querySelector('.notification-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      clearTimeout(autoDismiss);
      dismissNotification(toast);
    });
  }

  // Add to queue for tracking
  notificationQueue.push({
    id: notificationId,
    element: toast,
    timeout: autoDismiss
  });

  return notificationId;
}

/**
 * Dismiss notification with animation
 */
function dismissNotification(toast) {
  if (!toast || !toast.parentElement) return;

  toast.classList.remove('translate-x-0', 'opacity-100');
  toast.classList.add('translate-x-full', 'opacity-0');

  setTimeout(() => {
    if (toast.parentElement) {
      toast.remove();
    }
    // Remove from queue
    const notificationId = parseInt(toast.dataset.notificationId);
    const index = notificationQueue.findIndex(n => n.id === notificationId);
    if (index > -1) {
      notificationQueue.splice(index, 1);
    }
  }, 300);
}

/**
 * Clear all notifications
 */
function clearAllNotifications() {
  notificationQueue.forEach(notification => {
    if (notification.timeout) {
      clearTimeout(notification.timeout);
    }
    dismissNotification(notification.element);
  });
  notificationQueue.length = 0;
}

/**
 * Initialize notifications section
 */
function initNotifications() {
  const markAllReadBtn = document.getElementById('mark-all-read-btn');
  const clearAllBtn = document.getElementById('clear-all-notifications-btn');
  const filterBtns = document.querySelectorAll('.notification-filter-btn');

  if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', () => {
      dataManager.markAllAsRead();
      loadNotifications();
      updateNotificationBadge();
    });
  }

  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all notifications?')) {
        dataManager.clearAllNotifications();
        loadNotifications();
        updateNotificationBadge();
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active', 'bg-white/10'));
      btn.classList.add('active', 'bg-white/10');
      const filter = btn.dataset.filter;
      loadNotifications(filter);
    });
  });
}

/**
 * Load notifications
 */
let currentNotificationFilter = 'all';
function loadNotifications(filter = 'all') {
  currentNotificationFilter = filter;
  const container = document.getElementById('notifications-container');
  const emptyState = document.getElementById('notifications-empty');

  if (!container) return;

  let notifications = dataManager.getNotifications();

  // Apply filter
  if (filter === 'unread') {
    notifications = notifications.filter(n => !n.read);
  } else if (filter === 'read') {
    notifications = notifications.filter(n => n.read);
  } else if (filter === 'system') {
    notifications = notifications.filter(n => n.type === 'system');
  } else if (filter === 'activity') {
    notifications = notifications.filter(n => n.type === 'activity');
  }

  // Sort by timestamp (newest first)
  notifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  container.innerHTML = '';

  if (notifications.length === 0) {
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  notifications.forEach(notification => {
    const notificationEl = createNotificationElement(notification);
    container.appendChild(notificationEl);
  });
}

/**
 * Create notification element
 */
function createNotificationElement(notification) {
  const div = document.createElement('div');
  div.className = `glass-effect rounded-xl p-4 hover-lift transition-all ${!notification.read ? 'border-l-4 border-blue-500' : ''}`;

  const icons = {
    system: `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
      </svg>
    `,
    activity: `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
      </svg>
    `,
    success: `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    `,
    error: `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    `
  };

  const icon = icons[notification.type] || icons.system;
  const timeAgo = formatNotificationTime(notification.timestamp);

  div.innerHTML = `
    <div class="flex items-start gap-3">
      <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
        ${icon}
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between gap-2">
          <div class="flex-1 min-w-0">
            <h3 class="font-semibold text-sm ${!notification.read ? 'text-white' : 'text-gray-300'}">${notification.title}</h3>
            <p class="text-sm text-gray-400 mt-1">${notification.message}</p>
            <p class="text-xs text-gray-500 mt-2">${timeAgo}</p>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0">
            ${!notification.read ? `
              <button class="mark-read-btn p-1 hover:bg-white/10 rounded transition-colors" data-notification-id="${notification.id}" title="Mark as read">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </button>
            ` : ''}
            <button class="delete-notification-btn p-1 hover:bg-red-500/20 rounded transition-colors text-red-400" data-notification-id="${notification.id}" title="Delete">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        ${notification.action ? `
          <button class="notification-action-btn mt-3 px-4 py-2 glass-effect rounded-lg text-sm hover:bg-white/20 transition-all" data-action='${JSON.stringify(notification.action)}'>
            ${notification.action.type === 'navigate' ? 'View' : 'Action'}
          </button>
        ` : ''}
      </div>
    </div>
  `;

  // Mark as read button
  const markReadBtn = div.querySelector('.mark-read-btn');
  if (markReadBtn) {
    markReadBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dataManager.markAsRead(notification.id);
      loadNotifications(currentNotificationFilter);
      updateNotificationBadge();
    });
  }

  // Delete button
  const deleteBtn = div.querySelector('.delete-notification-btn');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dataManager.deleteNotification(notification.id);
      loadNotifications(currentNotificationFilter);
      updateNotificationBadge();
    });
  }

  // Action button
  const actionBtn = div.querySelector('.notification-action-btn');
  if (actionBtn && notification.action) {
    actionBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (notification.action.type === 'navigate') {
        const navItem = document.querySelector(`[data-section="${notification.action.target.replace('#', '')}"]`);
        if (navItem) navItem.click();
      }
    });
  }

  // Click to mark as read
  if (!notification.read) {
    div.addEventListener('click', () => {
      dataManager.markAsRead(notification.id);
      loadNotifications(currentNotificationFilter);
      updateNotificationBadge();
    });
  }

  return div;
}

/**
 * Format notification time
 */
function formatNotificationTime(timestamp) {
  const now = new Date();
  const date = new Date(timestamp);
  const diff = now - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return date.toLocaleDateString();
}

/**
 * Update notification badge in sidebar and top bar
 */
function updateNotificationBadge() {
  const sidebarBadge = document.getElementById('notification-badge');
  const topBadge = document.getElementById('top-notification-badge');

  const notifications = dataManager.getNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  // Update sidebar badge
  if (sidebarBadge) {
    if (unreadCount > 0) {
      sidebarBadge.classList.remove('hidden');
      sidebarBadge.textContent = unreadCount > 9 ? '9+' : unreadCount.toString();
      sidebarBadge.className = sidebarBadge.className.replace('w-2 h-2', 'min-w-[18px] h-[18px] px-1 text-xs flex items-center justify-center');
    } else {
      sidebarBadge.classList.add('hidden');
    }
  }

  // Update top bar badge
  if (topBadge) {
    if (unreadCount > 0) {
      topBadge.classList.remove('hidden');
      topBadge.classList.add('flex');
      topBadge.textContent = unreadCount > 9 ? '9+' : unreadCount.toString();
    } else {
      topBadge.classList.add('hidden');
      topBadge.classList.remove('flex');
    }
  }
}

/**
 * Initialize notification icon functionality
 */
function initNotificationIcon() {
  const iconBtn = document.getElementById('notification-icon-btn');
  const dropdown = document.getElementById('notification-dropdown');
  const viewAllLink = document.getElementById('view-all-notifications');

  if (!iconBtn || !dropdown) return;

  // Toggle dropdown on click
  iconBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isHidden = dropdown.classList.contains('hidden');

    if (isHidden) {
      dropdown.classList.remove('hidden');
      dropdown.classList.add('flex', 'flex-col');
      loadNotificationDropdown();
    } else {
      dropdown.classList.add('hidden');
      dropdown.classList.remove('flex', 'flex-col');
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && !iconBtn.contains(e.target)) {
      dropdown.classList.add('hidden');
      dropdown.classList.remove('flex', 'flex-col');
    }
  });

  // View all notifications link
  if (viewAllLink) {
    viewAllLink.addEventListener('click', () => {
      dropdown.classList.add('hidden');
      dropdown.classList.remove('flex', 'flex-col');
      const navItem = document.querySelector('[data-section="notifications"]');
      if (navItem) {
        navItem.click();
      }
    });
  }
}

/**
 * Load notifications in dropdown
 */
function loadNotificationDropdown() {
  const container = document.getElementById('notification-dropdown-list');
  const emptyState = document.getElementById('notification-dropdown-empty');

  if (!container) return;

  const notifications = dataManager.getNotifications();
  const recentNotifications = notifications.slice(0, 5); // Show only 5 most recent

  container.innerHTML = '';

  if (recentNotifications.length === 0) {
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  recentNotifications.forEach(notification => {
    const notificationEl = createDropdownNotificationElement(notification);
    container.appendChild(notificationEl);
  });
}

/**
 * Create notification element for dropdown
 */
function createDropdownNotificationElement(notification) {
  const div = document.createElement('div');
  div.className = `p-3 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${!notification.read ? 'bg-blue-500/5' : ''}`;

  const icons = {
    system: `
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
      </svg>
    `,
    activity: `
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
      </svg>
    `,
    success: `
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    `,
    error: `
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    `
  };

  const icon = icons[notification.type] || icons.system;
  const timeAgo = formatNotificationTime(notification.timestamp);

  div.innerHTML = `
    <div class="flex items-start gap-3">
      <div class="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white mt-0.5">
        ${icon}
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between gap-2">
          <div class="flex-1 min-w-0">
            <h4 class="font-semibold text-sm ${!notification.read ? 'text-white' : 'text-gray-300'} truncate">${notification.title}</h4>
            <p class="text-xs text-gray-400 mt-0.5 line-clamp-2">${notification.message}</p>
            <p class="text-xs text-gray-500 mt-1">${timeAgo}</p>
          </div>
          ${!notification.read ? `
            <div class="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
          ` : ''}
        </div>
      </div>
    </div>
  `;

  // Click to mark as read and navigate
  div.addEventListener('click', () => {
    if (!notification.read) {
      dataManager.markAsRead(notification.id);
      updateNotificationBadge();
      loadNotificationDropdown();
    }

    // Navigate if action exists
    if (notification.action && notification.action.type === 'navigate') {
      const navItem = document.querySelector(`[data-section="${notification.action.target.replace('#', '')}"]`);
      if (navItem) {
        navItem.click();
      }
    } else {
      // Default to notifications section
      const navItem = document.querySelector('[data-section="notifications"]');
      if (navItem) navItem.click();
    }

    // Close dropdown
    const dropdown = document.getElementById('notification-dropdown');
    if (dropdown) {
      dropdown.classList.add('hidden');
      dropdown.classList.remove('flex', 'flex-col');
    }
  });

  return div;
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
  const dateObj = new Date(date);
  const diff = now - dateObj;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor(diff / (1000 * 60));

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} week${Math.floor(days / 7) > 1 ? 's' : ''} ago`;
  return `${Math.floor(days / 30)} month${Math.floor(days / 30) > 1 ? 's' : ''} ago`;
}

/**
 * Initialize profile section
 */
function initProfile() {
  // Handle "View Profile" button in sidebar
  const viewProfileBtn = document.getElementById('view-profile-btn');
  if (viewProfileBtn) {
    viewProfileBtn.addEventListener('click', () => {
      document.querySelector('[data-section="profile"]')?.click();
    });
  }

  // Handle "Edit Profile" button
  const editProfileBtn = document.getElementById('edit-profile-btn');
  if (editProfileBtn) {
    editProfileBtn.addEventListener('click', () => {
      document.querySelector('[data-section="settings"]')?.click();
    });
  }

  // Handle avatar edit button
  const editAvatarBtn = document.getElementById('edit-avatar-btn');
  if (editAvatarBtn) {
    editAvatarBtn.addEventListener('click', () => {
      // Create file input for avatar upload
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.style.display = 'none';
      input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const avatar = document.getElementById('profile-avatar');
            if (avatar) {
              avatar.style.backgroundImage = `url(${event.target.result})`;
              avatar.style.backgroundSize = 'cover';
              avatar.style.backgroundPosition = 'center';
              avatar.textContent = '';
              showNotification('Avatar updated successfully!', 'success');
            }
          };
          reader.readAsDataURL(file);
        }
      });
      document.body.appendChild(input);
      input.click();
      setTimeout(() => input.remove(), 100);
    });
  }
}

/**
 * Load profile section data
 */
function loadProfile() {
  const user = getCurrentUser();
  const library = dataManager.getLibrary();
  const playlists = dataManager.getPlaylists();
  const favorites = dataManager.getFavorites();
  const recent = dataManager.getRecent();

  // Update profile header
  if (user) {
    const profileName = document.getElementById('profile-name-display');
    const profileEmail = document.getElementById('profile-email-display');
    const profileEmailInfo = document.getElementById('profile-email-info');
    const profileAvatar = document.getElementById('profile-avatar');
    const memberSince = document.getElementById('member-since');

    if (profileName) profileName.textContent = user.fullName || 'User';
    if (profileEmail) profileEmail.textContent = user.email || 'No email';
    if (profileEmailInfo) profileEmailInfo.textContent = user.email || 'No email';

    if (profileAvatar && user.fullName) {
      const nameParts = user.fullName.split(' ');
      const initials = nameParts.length >= 2
        ? (nameParts[0][0] + nameParts[1][0]).toUpperCase()
        : nameParts[0][0].toUpperCase();
      profileAvatar.textContent = initials;
    }

    if (memberSince) {
      memberSince.textContent = new Date().getFullYear();
    }
  }

  // Update statistics
  const profileTracks = document.getElementById('profile-tracks');
  const profilePlaylists = document.getElementById('profile-playlists');
  const profileTime = document.getElementById('profile-time');
  const profileFavorites = document.getElementById('profile-favorites');

  if (profileTracks) profileTracks.textContent = library.length.toLocaleString();
  if (profilePlaylists) profilePlaylists.textContent = playlists.length;
  if (profileTime) {
    const listeningTime = Math.floor(recent.length * 2.5);
    profileTime.textContent = `${listeningTime}h`;
  }
  if (profileFavorites) profileFavorites.textContent = favorites.length;

  // Update overview stats if visible
  const overviewSection = document.getElementById('overview');
  if (overviewSection && !overviewSection.classList.contains('hidden')) {
    loadOverview();
  }

  // Load recent activity
  loadProfileActivity();

  // Load top genres
  loadProfileGenres();

  // Load account type information
  loadAccountType();
}

/**
 * Load profile activity
 */
function loadProfileActivity() {
  const container = document.getElementById('profile-activity');
  if (!container) return;

  const recent = dataManager.getRecent().slice(0, 5);
  const library = dataManager.getLibrary();
  const playlists = dataManager.getPlaylists();

  container.innerHTML = '';

  if (recent.length === 0 && playlists.length === 0) {
    container.innerHTML = '<p class="text-gray-400 text-center py-4">No recent activity</p>';
    return;
  }

  // Add recent plays
  recent.forEach(item => {
    const track = library.find(t => t.id === item.trackId);
    if (track) {
      const activityItem = document.createElement('div');
      activityItem.className = 'flex items-center gap-3 p-3 glass-effect rounded-lg hover:bg-white/5 transition-colors';
      activityItem.innerHTML = `
        <div class="w-10 h-10 bg-gradient-to-br ${track.color} rounded-lg flex items-center justify-center flex-shrink-0">
          <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-semibold truncate text-sm">Played "${track.title}"</p>
          <p class="text-xs text-gray-400 truncate">${formatDate(item.playedAt)}</p>
        </div>
      `;
      container.appendChild(activityItem);
    }
  });

  // Add playlist creation activity (if any)
  if (playlists.length > 0) {
    const latestPlaylist = playlists[playlists.length - 1];
    const activityItem = document.createElement('div');
    activityItem.className = 'flex items-center gap-3 p-3 glass-effect rounded-lg hover:bg-white/5 transition-colors';
    activityItem.innerHTML = `
      <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
        <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </div>
      <div class="flex-1 min-w-0">
        <p class="font-semibold truncate text-sm">Created playlist "${latestPlaylist.name}"</p>
        <p class="text-xs text-gray-400 truncate">${formatDate(latestPlaylist.createdAt)}</p>
      </div>
    `;
    container.appendChild(activityItem);
  }
}

/**
 * Load profile genres
 */
function loadProfileGenres() {
  const container = document.getElementById('profile-genres');
  if (!container) return;

  const library = dataManager.getLibrary();

  // Count genres
  const genreCount = {};
  library.forEach(track => {
    genreCount[track.genre] = (genreCount[track.genre] || 0) + 1;
  });

  // Sort by count
  const sortedGenres = Object.entries(genreCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  container.innerHTML = '';

  if (sortedGenres.length === 0) {
    container.innerHTML = '<p class="text-gray-400 text-center py-4">No genre data available</p>';
    return;
  }

  sortedGenres.forEach(([genre, count], index) => {
    const genreItem = document.createElement('div');
    genreItem.className = 'flex items-center justify-between p-3 glass-effect rounded-lg';
    genreItem.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-2xl font-bold text-gray-500">${index + 1}</span>
        <div>
          <p class="font-semibold">${genre}</p>
          <p class="text-xs text-gray-400">${count} track${count > 1 ? 's' : ''}</p>
        </div>
      </div>
      <div class="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div class="h-full bg-gradient-to-r from-purple-500 to-pink-600" style="width: ${(count / library.length) * 100}%"></div>
      </div>
    `;
    container.appendChild(genreItem);
  });
}
