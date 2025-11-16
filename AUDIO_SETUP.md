# Audio Setup Guide

## How to Add Audio Files to Your Music Dashboard

### Step 1: Create Audio Folder
Create a folder in your project root called `audio/` (or `assets/audio/`):

```
puz-records/
├── audio/
│   ├── neon-dreams.mp3
│   ├── city-lights.mp3
│   └── ...
├── dashboard.html
└── src/
```

### Step 2: Add Audio Files
Place your audio files in the `audio/` folder. Supported formats:
- **MP3** (recommended - best compatibility)
- **OGG** (good for web)
- **WAV** (uncompressed, larger files)
- **M4A** (Apple format)

### Step 3: Update Track Data
In `src/dashboard.js`, update the `SAMPLE_TRACKS` array to include `audioUrl` for each track:

```javascript
const SAMPLE_TRACKS = [
  { 
    id: 1, 
    title: 'Neon Dreams', 
    artist: 'Nova Wave', 
    album: 'Neon Dreams', 
    duration: 225, 
    genre: 'Electronic', 
    color: 'from-blue-500 to-purple-600',
    audioUrl: 'src/audio/first.mp3'  // Add this
  },
  // ... more tracks
];
```

### Step 4: Using External URLs
You can also use external URLs (e.g., from a CDN or cloud storage):

```javascript
audioUrl: 'https://example.com/audio/neon-dreams.mp3'
```

### Step 5: Test
1. Open `dashboard.html` in a browser
2. Click on any track to play
3. The audio should start playing automatically

## Features Implemented

✅ Real audio playback using HTML5 Audio API
✅ Play/Pause controls
✅ Progress bar with seeking
✅ Volume control
✅ Next/Previous track
✅ Shuffle and Repeat modes
✅ Queue management
✅ Automatic track progression
✅ Error handling for missing files

## Troubleshooting

### Audio doesn't play
- Check browser console for errors
- Verify file paths are correct
- Ensure audio files are in the correct location
- Check browser autoplay policies (may require user interaction)

### CORS Issues
If loading from external URLs, ensure CORS headers are properly set on the server.

### File Format Issues
- Use MP3 for best compatibility
- Ensure files are not corrupted
- Check file size (very large files may load slowly)

## Browser Compatibility

- ✅ Chrome/Edge (full support)
- ✅ Firefox (full support)
- ✅ Safari (full support)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- The player falls back to simulated playback if no `audioUrl` is provided
- Audio duration is automatically detected from the file
- Volume is saved and restored between sessions
- Progress updates in real-time during playback

