# How to Add Audio Files to Your Music Dashboard

This guide will show you how to add audio files to tracks in both the **Library section** and **Profile section**.

## Quick Start

### Step 1: Create Audio Folder

Create a folder called `audio/` in your project root directory:

```
puz-records/
├── audio/              ← Create this folder
│   ├── neon-dreams.mp3
│   ├── city-lights.mp3
│   └── ...
├── dashboard.html
├── src/
│   └── dashboard.js
└── ...
```

### Step 2: Add Your Audio Files

Place your audio files in the `audio/` folder. Make sure the file names match what you'll use in the code.

**Supported formats:**
- MP3 (recommended - best compatibility)
- OGG
- WAV
- M4A

### Step 3: Update Track Data in `src/dashboard.js`

Open `src/dashboard.js` and find the `SAMPLE_TRACKS` array (around line 15). Update each track to include the `audioUrl` property:

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
    audioUrl: 'audio/neon-dreams.mp3'  // ← Add this line
  },
  { 
    id: 2, 
    title: 'City Lights', 
    artist: 'Echo Valley', 
    album: 'Urban Nights', 
    duration: 198, 
    genre: 'Indie', 
    color: 'from-purple-500 to-pink-600',
    audioUrl: 'audio/city-lights.mp3'  // ← Add this line
  },
  // ... continue for all tracks
];
```

### Step 4: File Path Examples

**Local files (in your project):**
```javascript
audioUrl: 'audio/neon-dreams.mp3'
audioUrl: 'assets/audio/song.mp3'
audioUrl: './audio/track.mp3'
```

**External URLs (from internet/CDN):**
```javascript
audioUrl: 'https://example.com/audio/song.mp3'
audioUrl: 'https://cdn.example.com/music/track.mp3'
```

## How It Works in Library Section

When you click a track in the **My Library** section:
1. The `playTrack(track.id)` function is called
2. It finds the track in your library data
3. If the track has an `audioUrl`, it loads and plays the audio file
4. The music player appears at the bottom with controls

**Example:**
- Click any track card in "My Library"
- The audio file specified in `audioUrl` will start playing
- You can control playback with the player controls

## How It Works in Profile Section

The profile section shows:
- **Recent Activity**: Tracks you've recently played
- **Top Genres**: Your most listened genres

When you click a track from recent activity:
1. Same `playTrack(track.id)` function is used
2. Audio plays from the `audioUrl` in the track data
3. Works exactly like the library section

## Complete Example

Here's a complete example of how to add audio to a track:

```javascript
// In src/dashboard.js, update SAMPLE_TRACKS:

const SAMPLE_TRACKS = [
  {
    id: 1,
    title: 'My Awesome Song',
    artist: 'My Artist Name',
    album: 'My Album',
    duration: 240,  // Duration in seconds (will auto-detect from file)
    genre: 'Pop',
    color: 'from-blue-500 to-purple-600',
    audioUrl: 'audio/my-awesome-song.mp3'  // Path to your audio file
  }
];
```

**File structure:**
```
puz-records/
├── audio/
│   └── my-awesome-song.mp3  ← Your audio file here
└── src/
    └── dashboard.js         ← Update track data here
```

## Adding Audio to Existing Tracks

If you already have tracks without audio:

1. **Add the audio file** to your `audio/` folder
2. **Update the track** in `SAMPLE_TRACKS` to include `audioUrl`
3. **Clear localStorage** (or the track will use old data):
   - Open browser console (F12)
   - Run: `localStorage.clear()`
   - Refresh the page

## Testing

1. Open `dashboard.html` in your browser
2. Go to **My Library** section
3. Click on any track
4. The audio should start playing
5. Check the music player at the bottom for controls

## Troubleshooting

### Audio doesn't play
- ✅ Check browser console (F12) for errors
- ✅ Verify file path is correct (case-sensitive!)
- ✅ Ensure file exists in the `audio/` folder
- ✅ Check file format (use MP3 for best compatibility)

### "Error loading audio file" message
- The file path might be wrong
- The file might not exist
- Check the browser console for specific error

### Old tracks still showing (no audio)
- Clear localStorage: `localStorage.clear()` in browser console
- Refresh the page
- The new track data with `audioUrl` will be loaded

### CORS errors (for external URLs)
- If using external URLs, ensure the server allows CORS
- Or use local files instead

## Tips

1. **Use MP3 format** for best browser compatibility
2. **Keep file names simple** (no spaces, use hyphens: `my-song.mp3`)
3. **Test one track first** before adding all tracks
4. **File paths are case-sensitive** - `audio/Song.mp3` ≠ `audio/song.mp3`
5. **Duration is auto-detected** - you don't need to set it manually if the file has metadata

## Summary

✅ Create `audio/` folder  
✅ Add audio files  
✅ Update `audioUrl` in track data  
✅ Works in both Library and Profile sections automatically!  

The same `playTrack()` function handles audio playback for all sections, so once you add `audioUrl` to your tracks, they'll work everywhere!

