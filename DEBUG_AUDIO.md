# Audio Debugging Guide

## Quick Debug Steps

### 1. Open Browser Console
Press `F12` or right-click → Inspect → Console tab

### 2. Check for Initial Messages
When the page loads, you should see:
- ✅ Audio element exists in DOM
- ✅ Audio element found and initialized
- ✅ musicPlayer.audioElement is set

### 3. Click on a Track
When you click "with you" track, you should see:
- 🎵 Attempting to play: with you
- 📁 Audio URL: src/audio/first.mp3
- 📂 Setting audio source to: src/audio/first.mp3
- ✅ Audio loaded, waiting for metadata...
- 📊 Metadata loaded. Duration: [number]
- ✅ Audio can play now
- ▶️ Attempting to play audio...
- ✅ Audio playback started successfully!

### 4. Common Errors

#### Error: "Audio element NOT found"
**Fix:** Make sure `<audio id="audio-player">` exists in `dashboard.html`

#### Error: "Network error - file not found"
**Fix:** 
- Check file path: `src/audio/first.mp3`
- Make sure file exists at that location
- Try different path: `./src/audio/first.mp3` or `/src/audio/first.mp3`

#### Error: "NotAllowedError"
**Fix:** 
- Browser autoplay is blocked
- Click the play button in the music player manually
- This is normal browser behavior

#### Error: "CORS policy"
**Fix:**
- Use a local server instead of `file://` protocol
- Run: `python -m http.server 8000`
- Visit: `http://localhost:8000/dashboard.html`

### 5. Test Audio Manually

Open browser console and run:

```javascript
// Test 1: Check if audio element exists
const audio = document.getElementById('audio-player');
console.log('Audio element:', audio);

// Test 2: Try loading and playing
audio.src = 'src/audio/first.mp3';
audio.load();
audio.play().then(() => {
  console.log('✅ Audio plays!');
}).catch(err => {
  console.error('❌ Error:', err);
});

// Test 3: Check file accessibility
fetch('src/audio/first.mp3')
  .then(r => {
    if (r.ok) {
      console.log('✅ File exists and is accessible');
    } else {
      console.error('❌ File not found:', r.status);
    }
  })
  .catch(err => {
    console.error('❌ Network error:', err);
  });
```

### 6. Check File Path

Your current path: `src/audio/first.mp3`

**If using a local server:**
- Path should work as-is: `src/audio/first.mp3`

**If using file:// protocol:**
- May need absolute path or different format
- Better to use a local server

### 7. Still Not Working?

1. **Clear localStorage:**
   ```javascript
   localStorage.clear();
   location.reload();
   ```

2. **Check file exists:**
   - Go to: `http://localhost:8000/src/audio/first.mp3`
   - Should download or play the file

3. **Try different path formats:**
   ```javascript
   // In dashboard.js, try:
   audioUrl: './src/audio/first.mp3'
   // or
   audioUrl: '/src/audio/first.mp3'
   // or
   audioUrl: 'http://localhost:8000/src/audio/first.mp3'
   ```

4. **Check browser console for specific error messages**

