# Complete Explanation of index.html

## 📄 Document Structure

### **Lines 1-11: HTML Document Head**

```1:11:index.html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description"
    content="Puz Records - Discover the next generation of music. Home to innovative artists and groundbreaking releases.">
  <title>Puz Records | Discover the Next Generation of Music</title>
  <link rel="stylesheet" href="src/style.css">
</head>
```

**Explanation**:
- **Line 1**: `<!DOCTYPE html>` - Declares HTML5 document type
- **Line 2**: `<html lang="en">` - Root element, sets language to English for accessibility
- **Line 5**: `<meta charset="UTF-8">` - Character encoding (supports all languages and special characters)
- **Line 6**: `<meta name="viewport">` - Responsive design meta tag
  - `width=device-width`: Sets viewport width to device width
  - `initial-scale=1.0`: No zoom on page load
- **Line 7-8**: SEO meta description (appears in search results)
- **Line 9**: Page title (shown in browser tab)
- **Line 10**: Links to CSS stylesheet

---

## 🧭 Navigation Bar (Lines 14-101)

### **Main Navigation Container (Lines 15-16)**

```15:16:index.html
  <nav class="fixed top-0 left-0 right-0 z-50 glass-effect">
    <div class="container mx-auto px-4 py-4">
```

**Classes Explained**:
- `fixed top-0 left-0 right-0`: Sticks nav to top of viewport
- `z-50`: High z-index (stays above other content)
- `glass-effect`: Custom glassmorphism style (backdrop blur, transparency)
- `container mx-auto`: Centers content, max-width container
- `px-4 py-4`: Horizontal and vertical padding

### **Logo Section (Lines 18-21)**

```18:21:index.html
        <!-- Logo -->
        <a href="#home" class="text-2xl font-display font-bold text-gradient">
          PUZ RECORDS
        </a>
```

**Classes Explained**:
- `text-2xl`: Large text size (1.5rem)
- `font-display`: Uses Poppins font (from tailwind.config.js)
- `font-bold`: Bold weight (700)
- `text-gradient`: Custom gradient text (blue → purple → pink)

### **Desktop Navigation Links (Lines 23-30)**

```23:30:index.html
        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <a href="#home" class="nav-link hover:text-blue-400 transition-colors">Home</a>
          <a href="#about" class="nav-link hover:text-blue-400 transition-colors">About</a>
          <a href="#artists" class="nav-link hover:text-blue-400 transition-colors">Artists</a>
          <a href="#releases" class="nav-link hover:text-blue-400 transition-colors">Releases</a>
          <a href="#contact" class="nav-link hover:text-blue-400 transition-colors">Contact</a>
        </div>
```

**Classes Explained**:
- `hidden md:flex`: Hidden on mobile, flex on medium+ screens
- `items-center`: Vertically centers items
- `space-x-8`: Horizontal spacing between links (2rem)
- `hover:text-blue-400`: Color change on hover
- `transition-colors`: Smooth color transition

### **Authentication Buttons (Lines 32-41)**

```32:41:index.html
        <!-- Auth Buttons -->
        <div class="hidden md:flex items-center gap-4">
          <a href="login.html" class="px-4 py-2 glass-effect rounded-lg text-sm hover:bg-white/20 transition-all">
            Sign In
          </a>
          <a href="register.html"
            class="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-sm font-semibold hover:shadow-lg transition-all">
            Sign Up
          </a>
        </div>
```

**Classes Explained**:
- `gap-4`: Space between buttons (1rem)
- `glass-effect`: Transparent background with blur
- `bg-gradient-to-r from-blue-500 to-purple-600`: Gradient background
- `hover:shadow-lg`: Shadow appears on hover
- `rounded-lg`: Rounded corners

### **Search Button (Lines 43-50)**

```43:50:index.html
        <!-- Search Button -->
        <button id="search-btn" class="hidden md:flex items-center text-gray-100 hover:text-blue-400 transition-colors"
          aria-label="Search">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
```

**Explanation**:
- `id="search-btn"`: JavaScript target for click handler
- `aria-label="Search"`: Accessibility label for screen readers
- SVG: Magnifying glass icon (Heroicons)

### **Mobile Menu Button (Lines 52-57)**

```52:57:index.html
        <!-- Mobile Menu Button -->
        <button id="mobile-menu-btn" class="md:hidden text-gray-100 focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
```

**Classes Explained**:
- `md:hidden`: Visible on mobile, hidden on desktop
- `focus:outline-none`: Removes default focus outline
- SVG: Hamburger menu icon (3 horizontal lines)

### **Mobile Navigation Menu (Lines 60-79)**

```60:79:index.html
      <!-- Mobile Navigation -->
      <div id="mobile-menu" class="hidden md:hidden mt-4 pb-4">
        <div class="flex flex-col space-y-4">
          <a href="#home" class="nav-link hover:text-blue-400 transition-colors">Home</a>
          <a href="#about" class="nav-link hover:text-blue-400 transition-colors">About</a>
          <a href="#artists" class="nav-link hover:text-blue-400 transition-colors">Artists</a>
          <a href="#releases" class="nav-link hover:text-blue-400 transition-colors">Releases</a>
          <a href="#contact" class="nav-link hover:text-blue-400 transition-colors">Contact</a>
          <div class="pt-4 border-t border-white/10 flex flex-col gap-2">
            <a href="login.html"
              class="px-4 py-2 glass-effect rounded-lg text-sm hover:bg-white/20 transition-all text-center">
              Sign In
            </a>
            <a href="register.html"
              class="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-sm font-semibold hover:shadow-lg transition-all text-center">
              Sign Up
            </a>
          </div>
        </div>
      </div>
```

**Classes Explained**:
- `hidden md:hidden`: Hidden by default, shown on mobile when toggled
- `flex flex-col`: Vertical flex layout
- `space-y-4`: Vertical spacing between items
- `border-t border-white/10`: Top border (10% opacity white)
- `text-center`: Centers button text

### **Search Overlay (Lines 82-100)**

```82:100:index.html
    <!-- Search Overlay -->
    <div id="search-overlay"
      class="hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-50 items-start justify-center pt-32">
      <div class="container mx-auto px-4 max-w-2xl">
        <div class="glass-effect rounded-2xl p-6">
          <div class="flex items-center gap-4 mb-4">
            <input type="text" id="search-input" placeholder="Search artists, releases, songs..."
              class="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              autocomplete="off">
            <button id="close-search" class="text-gray-400 hover:text-white transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div id="search-results" class="max-h-96 overflow-y-auto space-y-2"></div>
        </div>
      </div>
    </div>
```

**Classes Explained**:
- `fixed inset-0`: Full-screen overlay
- `bg-black/80`: 80% opacity black background
- `backdrop-blur-sm`: Blurs content behind overlay
- `max-w-2xl`: Maximum width constraint
- `flex-1`: Input takes remaining space
- `focus:ring-2 focus:ring-blue-500`: Blue ring on focus
- `max-h-96 overflow-y-auto`: Scrollable results container

---

## 🔔 Toast & Back to Top (Lines 103-112)

### **Toast Container (Lines 103-104)**

```103:104:index.html
  <!-- Toast Notification Container -->
  <div id="toast-container" class="fixed top-20 right-4 z-50 space-y-2"></div>
```

**Explanation**:
- Container for dynamic toast notifications
- `fixed top-20 right-4`: Positioned top-right
- `space-y-2`: Vertical spacing between toasts

### **Back to Top Button (Lines 106-112)**

```106:112:index.html
  <!-- Back to Top Button -->
  <button id="back-to-top"
    class="fixed bottom-8 right-8 z-40 glass-effect p-3 rounded-full hover:bg-white/20 transition-all opacity-0 pointer-events-none">
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
    </svg>
  </button>
```

**Classes Explained**:
- `opacity-0 pointer-events-none`: Hidden initially (shown via JavaScript on scroll)
- `rounded-full`: Perfect circle
- SVG: Up arrow icon

---

## 🎵 Music Player (Lines 114-162)

```114:162:index.html
  <!-- Music Player -->
  <div id="music-player"
    class="fixed bottom-0 left-0 right-0 glass-effect border-t border-white/20 z-40 transform translate-y-full transition-transform duration-300">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex-shrink-0"
          id="player-album-art"></div>
        <div class="flex-1 min-w-0">
          <h4 id="player-title" class="font-semibold truncate">No track selected</h4>
          <p id="player-artist" class="text-sm text-gray-400 truncate">Select a track to play</p>
          <div class="flex items-center gap-2 mt-2">
            <span id="player-current-time" class="text-xs text-gray-500">0:00</span>
            <div class="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
              <div id="player-progress" class="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                style="width: 0%"></div>
            </div>
            <span id="player-duration" class="text-xs text-gray-500">0:00</span>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button id="player-prev" class="p-2 hover:bg-white/10 rounded-full transition-colors">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </button>
          <button id="player-play-pause"
            class="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:shadow-lg transition-all">
            <svg id="play-icon" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            <svg id="pause-icon" class="w-6 h-6 hidden" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
            </svg>
          </button>
          <button id="player-next" class="p-2 hover:bg-white/10 rounded-full transition-colors">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>
          <button id="player-close" class="p-2 hover:bg-white/10 rounded-full transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <audio id="audio-element" preload="metadata"></audio>
  </div>
```

**Key Features**:
- `translate-y-full`: Hidden below viewport initially
- `flex-shrink-0`: Album art doesn't shrink
- `truncate`: Text overflow ellipsis
- `flex-1 min-w-0`: Track info takes remaining space
- Progress bar: `width: 0%` updated via JavaScript
- Control buttons: Previous, Play/Pause, Next, Close
- `<audio>` element: HTML5 audio player (hidden)

---

## 🏠 Hero Section (Lines 164-196)

```164:196:index.html
  <!-- Hero Section -->
  <section id="home" class="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
    <!-- Animated background gradient -->
    <div class="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-pink-900/50 animate-pulse">
    </div>

    <div class="container mx-auto px-4 text-center relative z-10">
      <h1 class="text-6xl md:text-8xl font-display font-bold mb-6 text-gradient animate-fade-in-up">
        PUZ RECORDS
      </h1>
      <p class="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in-up"
        style="animation-delay: 0.2s">
        Discover the next generation of music. Home to innovative artists and groundbreaking releases.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style="animation-delay: 0.4s">
        <a href="#releases"
          class="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all hover-lift">
          Explore Releases
        </a>
        <a href="#artists"
          class="px-8 py-3 glass-effect rounded-full font-semibold hover:bg-white/20 transition-all hover-lift">
          Meet Our Artists
        </a>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
    </div>
  </section>
```

**Classes Explained**:
- `min-h-screen`: Full viewport height
- `pt-20`: Padding-top (accounts for fixed nav)
- `animate-pulse`: Pulsing background animation
- `text-6xl md:text-8xl`: Responsive text (larger on desktop)
- `animate-fade-in-up`: Custom fade-in animation
- `animation-delay`: Staggered animations
- `hover-lift`: Lifts on hover (custom class)
- `animate-bounce`: Bouncing scroll indicator

---

## 📊 Statistics Section (Lines 198-220)

```198:220:index.html
  <!-- Statistics Section -->
  <section id="statistics" class="py-16 bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div class="text-center">
          <div class="text-4xl md:text-5xl font-display font-bold text-gradient mb-2" data-count="50">0</div>
          <p class="text-gray-400">Artists</p>
        </div>
        <div class="text-center">
          <div class="text-4xl md:text-5xl font-display font-bold text-gradient mb-2" data-count="200">0</div>
          <p class="text-gray-400">Releases</p>
        </div>
        <div class="text-center">
          <div class="text-4xl md:text-5xl font-display font-bold text-gradient mb-2" data-count="10">0</div>
          <p class="text-gray-400">Million Streams</p>
        </div>
        <div class="text-center">
          <div class="text-4xl md:text-5xl font-display font-bold text-gradient mb-2" data-count="15">0</div>
          <p class="text-gray-400">Years Experience</p>
        </div>
      </div>
    </div>
  </section>
```

**Key Features**:
- `data-count`: JavaScript reads this to animate counter
- `grid grid-cols-2 md:grid-cols-4`: 2 columns mobile, 4 desktop
- Numbers start at "0" and animate to target value

---

## ℹ️ About Section (Lines 222-268)

```222:268:index.html
  <!-- About Section -->
  <section id="about" class="py-20 bg-gray-800/50">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-display font-bold text-center mb-12 text-gradient">
          About Us
        </h2>
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <div class="space-y-4">
            <p class="text-lg text-gray-300 leading-relaxed">
              Puz Records is a forward-thinking record label dedicated to discovering and nurturing the next generation
              of musical talent. We believe in the power of innovation, creativity, and authentic expression.
            </p>
            <p class="text-lg text-gray-300 leading-relaxed">
              Our mission is to provide a platform for artists to share their unique voices with the world, while
              maintaining the highest standards of artistic integrity and production quality.
            </p>
            <p class="text-lg text-gray-300 leading-relaxed">
              Since our founding, we've been committed to pushing boundaries and exploring new sonic territories across
              genres.
            </p>
          </div>
          <div class="glass-effect rounded-2xl p-8 hover-lift">
            <h3 class="text-2xl font-display font-semibold mb-4">Our Values</h3>
            <ul class="space-y-3">
              <li class="flex items-start">
                <span class="text-blue-400 mr-3">✓</span>
                <span>Innovation in sound and production</span>
              </li>
              <li class="flex items-start">
                <span class="text-blue-400 mr-3">✓</span>
                <span>Artist development and support</span>
              </li>
              <li class="flex items-start">
                <span class="text-blue-400 mr-3">✓</span>
                <span>Creative freedom and expression</span>
              </li>
              <li class="flex items-start">
                <span class="text-blue-400 mr-3">✓</span>
                <span>Community and collaboration</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
```

**Layout**:
- Two-column grid on desktop
- Left: Mission text
- Right: Values list in glass card
- `leading-relaxed`: Increased line height for readability

---

## 🎤 Artists Section (Lines 270-316)

```270:316:index.html
  <!-- Artists Section -->
  <section id="artists" class="py-20">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl md:text-5xl font-display font-bold text-center mb-12 text-gradient">
        Our Artists
      </h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Artist Card 1 -->
        <div class="glass-effect rounded-2xl p-6 hover-lift group cursor-pointer artist-card" data-artist="Nova Wave"
          data-genre="Electronic • Synthwave">
          <div
            class="w-full h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300">
          </div>
          <h3 class="text-2xl font-display font-semibold mb-2">Nova Wave</h3>
          <p class="text-gray-400 mb-4">Electronic • Synthwave</p>
          <p class="text-gray-300">Pioneering the future of electronic music with innovative soundscapes and mesmerizing
            beats.</p>
          <button class="mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium">View Details →</button>
        </div>
        <!-- ... more cards ... -->
      </div>
    </div>
  </section>
```

**Key Features**:
- `data-artist` & `data-genre`: JavaScript reads these for modal
- `group`: Enables group hover effects
- `group-hover:scale-105`: Image scales on card hover
- `cursor-pointer`: Shows hand cursor
- Responsive grid: 1 col mobile, 2 tablet, 3 desktop

---

## 🎵 Releases Section (Lines 318-423)

### **Filter Controls (Lines 325-343)**

```325:343:index.html
      <!-- Filter and Sort Controls -->
      <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 max-w-6xl mx-auto">
        <div class="flex flex-wrap gap-2">
          <button class="filter-btn active px-4 py-2 glass-effect rounded-full text-sm hover:bg-white/20 transition-all"
            data-filter="all">All</button>
          <button class="filter-btn px-4 py-2 glass-effect rounded-full text-sm hover:bg-white/20 transition-all"
            data-filter="album">Albums</button>
          <button class="filter-btn px-4 py-2 glass-effect rounded-full text-sm hover:bg-white/20 transition-all"
            data-filter="ep">EPs</button>
          <button class="filter-btn px-4 py-2 glass-effect rounded-full text-sm hover:bg-white/20 transition-all"
            data-filter="single">Singles</button>
        </div>
        <select id="sort-select"
          class="px-4 py-2 glass-effect rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="name">Name A-Z</option>
        </select>
      </div>
```

**Features**:
- `data-filter`: JavaScript uses this to filter releases
- `active`: Indicates selected filter
- Sort dropdown: Changes sort order

### **Release Cards (Lines 345-421)**

```347:363:index.html
        <div class="release-card glass-effect rounded-xl p-4 hover-lift group cursor-pointer" data-type="album"
          data-artist="Nova Wave" data-date="2024-01-15" data-title="Neon Dreams">
          <div class="relative">
            <div
              class="w-full aspect-square bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300">
            </div>
            <button
              class="absolute bottom-6 right-6 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity play-release-btn">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
          <h3 class="font-semibold mb-1">Neon Dreams</h3>
          <p class="text-sm text-gray-400 mb-2">Nova Wave</p>
          <p class="text-xs text-gray-500">2024 • Album</p>
        </div>
```

**Data Attributes**:
- `data-type`: Filter category (album/ep/single)
- `data-artist`: Artist name
- `data-date`: Release date (for sorting)
- `data-title`: Release title

**Play Button**:
- `opacity-0`: Hidden by default
- `group-hover:opacity-100`: Shows on card hover
- `play-release-btn`: JavaScript target

---

## 📧 Newsletter Section (Lines 425-443)

```425:443:index.html
  <!-- Newsletter Section -->
  <section id="newsletter" class="py-16 bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30">
    <div class="container mx-auto px-4">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-display font-bold mb-4 text-gradient">Stay Updated</h2>
        <p class="text-gray-300 mb-8">Subscribe to our newsletter for the latest releases, artist news, and exclusive
          content.</p>
        <form id="newsletter-form" class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input type="email" id="newsletter-email" placeholder="Enter your email" required
            class="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400">
          <button type="submit"
            class="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all hover-lift whitespace-nowrap">
            Subscribe
          </button>
        </form>
        <div id="newsletter-message" class="mt-4 text-sm"></div>
      </div>
    </div>
  </section>
```

**Features**:
- Email validation (`type="email"`)
- Responsive layout (stacked mobile, side-by-side desktop)
- `whitespace-nowrap`: Prevents button text wrapping
- Message container for success/error feedback

---

## 📬 Contact Section (Lines 445-510)

```445:510:index.html
  <!-- Contact Section -->
  <section id="contact" class="py-20">
    <div class="container mx-auto px-4">
      <div class="max-w-2xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-display font-bold text-center mb-12 text-gradient">
          Get In Touch
        </h2>
        <form id="contact-form" class="glass-effect rounded-2xl p-8 space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium mb-2">Name</label>
            <input type="text" id="name" name="name" required
              class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your name">
          </div>
          <div>
            <label for="email" class="block text-sm font-medium mb-2">Email</label>
            <input type="email" id="email" name="email" required
              class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your.email@example.com">
          </div>
          <div>
            <label for="message" class="block text-sm font-medium mb-2">Message</label>
            <textarea id="message" name="message" rows="5" required
              class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Your message..."></textarea>
          </div>
          <button type="submit"
            class="w-full px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all hover-lift">
            Send Message
          </button>
          <div id="form-message" class="hidden text-center text-sm"></div>
        </form>

        <!-- Social Links -->
        <div class="mt-12 text-center">
          <p class="text-gray-400 mb-4">Follow us on social media</p>
          <div class="flex justify-center space-x-6">
            <a href="#" class="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Instagram">
              <!-- SVG icons for Instagram, Twitter, YouTube, Spotify -->
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
```

**Form Features**:
- All fields required
- Proper labels for accessibility
- `resize-none`: Prevents textarea resizing
- Social media icons with `aria-label` for accessibility

---

## 🦶 Footer (Lines 512-519)

```512:519:index.html
  <!-- Footer -->
  <footer class="py-8 border-t border-gray-800">
    <div class="container mx-auto px-4 text-center">
      <p class="text-gray-400">
        &copy; 2024 Puz Records. All rights reserved.
      </p>
    </div>
  </footer>
```

**Simple footer** with copyright notice.

---

## 🪟 Modal (Lines 521-535)

```521:535:index.html
  <!-- Artist/Release Modal -->
  <div id="detail-modal" class="hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-50 items-center justify-center p-4">
    <div class="glass-effect rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <button id="close-modal" class="float-right text-gray-400 hover:text-white transition-colors mb-4">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <div id="modal-content" class="clear-both">
          <!-- Modal content will be dynamically inserted here -->
        </div>
      </div>
    </div>
  </div>
```

**Modal Features**:
- `hidden`: Initially hidden
- `backdrop-blur-sm`: Blurs background
- `max-h-[90vh]`: Prevents overflow
- `overflow-y-auto`: Scrollable if content is long
- Content inserted dynamically via JavaScript

---

## 📜 Script Tag (Line 537)

```537:537:index.html
  <script type="module" src="src/main.js"></script>
```

**Loads main JavaScript**:
- `type="module"`: ES6 module syntax
- Handles all interactive features

---

## 🎨 Design Patterns Used

1. **Responsive Design**: Mobile-first with breakpoints
2. **Component-Based**: Reusable card patterns
3. **Data Attributes**: Store metadata for JavaScript
4. **Semantic HTML**: Proper section/article/footer tags
5. **Accessibility**: ARIA labels, proper form labels
6. **Progressive Enhancement**: Works without JavaScript

---

## 🔑 Key Interactive Elements

1. **Navigation**: Smooth scroll, mobile menu toggle
2. **Search**: Overlay with real-time results
3. **Music Player**: Fixed bottom player
4. **Filters**: Release filtering and sorting
5. **Modals**: Artist/release detail popups
6. **Forms**: Newsletter and contact forms
7. **Animations**: Fade-in, hover effects, counters

---

This HTML structure provides a solid foundation for a modern, interactive music platform website!

