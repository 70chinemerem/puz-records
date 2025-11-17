# Puz Records - Music Dashboard

A modern, feature-rich music dashboard application with playlist management, audio playback, and user profile features.

![Puz Records](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-Private-red)

## 🎵 Features

### Core Features
- **User Authentication** - Secure login and registration with form validation
- **Music Library** - Browse and manage your music collection
- **Music Player** - Full-featured audio player with controls (play, pause, next, previous, shuffle, repeat, volume)
- **Playlist Management** - Create, edit, and delete playlists with custom covers
- **Favorites System** - Save and manage favorite tracks
- **Downloads** - Track downloaded music with delete functionality
- **Notifications** - Activity feed and notification center
- **User Profile** - Detailed profile with statistics and activity
- **Account Types** - Free, Premium, and Pro subscription plans
- **Search** - Search across library, playlists, favorites, and recent tracks

### Design Features
- **Modern UI** - Glassmorphism design with gradient accents
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Dark Theme** - Beautiful dark color scheme
- **Smooth Animations** - Polished transitions and hover effects
- **Image Support** - Cover images for tracks and playlists

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   cd puz-records
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The production build will be in the `dist/` folder.

## 📁 Project Structure

```
puz-records/
├── src/
│   ├── audio/          # Audio files (MP3, OGG, WAV, M4A)
│   ├── images/         # Cover images (JPG, PNG, WebP)
│   ├── videos/         # Video files
│   ├── auth.js         # Authentication logic
│   ├── dashboard.js    # Dashboard functionality
│   ├── landing.js      # Landing page scripts
│   ├── main.js         # Main website scripts
│   └── style.css       # Global styles
├── index.html          # Main website page
├── landing.html        # Landing/marketing page
├── login.html          # Login page
├── register.html       # Registration page
├── dashboard.html      # Dashboard page
├── package.json        # Dependencies
└── vite.config.js      # Vite configuration
```

## 🎨 Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Styling with Tailwind CSS
- **JavaScript (ES6+)** - Vanilla JavaScript, no frameworks
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server

## 📖 Documentation

- **[PROJECT_EXPLANATION.md](./PROJECT_EXPLANATION.md)** - Complete project overview
- **[HOW_TO_ADD_AUDIO.md](./HOW_TO_ADD_AUDIO.md)** - Guide for adding audio files
- **[HOW_TO_ADD_IMAGES.md](./HOW_TO_ADD_IMAGES.md)** - Guide for adding cover images
- **[AUDIO_SETUP.md](./AUDIO_SETUP.md)** - Audio setup instructions
- **[AUDIO_URL_GUIDE.md](./AUDIO_URL_GUIDE.md)** - Understanding audio URLs
- **[AUDIO_TROUBLESHOOTING.md](./AUDIO_TROUBLESHOOTING.md)** - Audio troubleshooting
- **[DEBUG_AUDIO.md](./DEBUG_AUDIO.md)** - Audio debugging guide

## ⚙️ Configuration

### Adding Audio Files

1. Place audio files in `src/audio/` folder
2. Update `SAMPLE_TRACKS` in `src/dashboard.js`:
   ```javascript
   {
     id: 1,
     title: 'Song Title',
     artist: 'Artist Name',
     audioUrl: 'src/audio/song.mp3'
   }
   ```

See [HOW_TO_ADD_AUDIO.md](./HOW_TO_ADD_AUDIO.md) for detailed instructions.

### Adding Cover Images

1. Place images in `src/images/` folder
2. Update track data:
   ```javascript
   {
     id: 1,
     title: 'Song Title',
     coverImage: 'src/images/cover.jpg'
   }
   ```

See [HOW_TO_ADD_IMAGES.md](./HOW_TO_ADD_IMAGES.md) for detailed instructions.

## 🔐 Authentication

**Current Status**: Demo Mode (localStorage)

The current authentication system uses browser localStorage for demonstration purposes. This is suitable for:
- ✅ Prototyping
- ✅ Demos
- ✅ Development

**For Production**: Backend API integration is required.

### API Integration Points

In `src/auth.js`, replace the simulated API calls (lines 311-317 and 388-394) with actual API endpoints:

```javascript
// Registration
const response = await fetch('/api/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ fullName, email, password })
});

// Login
const response = await fetch('/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
```

## 🎯 Usage

### For End Users

1. **Sign Up**: Create an account at `/register.html`
2. **Sign In**: Login at `/login.html`
3. **Dashboard**: Access your music dashboard
4. **Play Music**: Click on any track to play
5. **Create Playlists**: Use the "Create Playlist" button
6. **Manage Library**: Browse, search, and filter your music

### For Developers

- All dashboard functionality is in `src/dashboard.js`
- Authentication logic is in `src/auth.js`
- Styling uses Tailwind CSS classes
- Data is stored in localStorage (demo mode)

## 🐛 Troubleshooting

### Audio Not Playing
- Check browser console for errors
- Verify audio file path is correct
- Ensure audio file exists
- Use direct audio file URLs (not streaming service pages)
- See [AUDIO_TROUBLESHOOTING.md](./AUDIO_TROUBLESHOOTING.md)

### Images Not Showing
- Verify image file exists
- Check image path is correct
- Ensure image format is supported (JPG, PNG, WebP)
- See [HOW_TO_ADD_IMAGES.md](./HOW_TO_ADD_IMAGES.md)

### Build Issues
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`
- Check Node.js version: `node --version` (should be v14+)

## 📝 Development Notes

### Code Style
- ES6+ JavaScript
- Modular code structure
- Comprehensive comments
- Error handling throughout

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Performance
- Optimized for fast loading
- Lazy loading recommended for images
- Audio files should be compressed

## 🔄 Future Enhancements

Potential features for future versions:
- [ ] Backend API integration
- [ ] Real-time sync across devices
- [ ] Social features (sharing, following)
- [ ] Advanced search filters
- [ ] Music recommendations
- [ ] Offline mode support
- [ ] Progressive Web App (PWA)

## 📄 License

This project is private and proprietary.

## 👥 Support

For questions or issues:
1. Check the documentation files
2. Review troubleshooting guides
3. Check browser console for errors

## 🎉 Credits

Built with modern web technologies and best practices.

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Status**: Production Ready (with backend integration needed for full functionality)

