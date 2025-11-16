# Audio Troubleshooting Guide

## Issue: Audio Not Playing

### Step 1: Check File Path

Your audio file is at: `src/audio/first.mp3`

**Important:** The path in `audioUrl` should be relative to where `dashboard.html` is located, not where `dashboard.js` is located.

Since `dashboard.html` is in the root folder, the path should be:
```javascript
audioUrl: 'src/audio/first.mp3'  // ✅ Correct (if dashboard.html is in root)
```

**OR** if you move the audio folder to the root:
```javascript
audioUrl: 'audio/first.mp3'  // ✅ Also correct
```

### Step 2: Check Browser Console

1. Open your browser's Developer Tools (F12)
2. Go to the **Console** tab
3. Click on a track to play it
4. Look for error messages:
   - `404 Not Found` = File path is wrong
   - `CORS error` = File access issue
   - `NotAllowedError` = Browser autoplay blocked
   - `NetworkError` = File can't be loaded

### Step 3: Verify File Exists

Check that the file actually exists:
- File location: `/Users/chinemeremv/Desktop/my-projects/puz-records/src/audio/first.mp3`
- Make sure the file name matches exactly (case-sensitive!)

### Step 4: Test File Path Directly

Try opening the file directly in your browser:
```
file:///Users/chinemeremv/Desktop/my-projects/puz-records/src/audio/first.mp3
```

Or if using a local server:
```
http://localhost:PORT/src/audio/first.mp3
```

### Step 5: Common Issues & Solutions

#### Issue: "404 Not Found" Error
**Solution:** 
- Check file path is correct
- Make sure file exists
- Try using absolute path or moving file to root `audio/` folder

#### Issue: "NotAllowedError: play() failed"
**Solution:**
- Browser autoplay policy requires user interaction
- Click the play button in the music player (not just the track)
- This is normal browser behavior

#### Issue: "CORS policy" Error
**Solution:**
- If using `file://` protocol, use a local server instead
- Run: `python -m http.server 8000` or use Vite dev server
- Access via `http://localhost:8000/dashboard.html`

#### Issue: Audio loads but doesn't play
**Solution:**
1. Check browser console for errors
2. Click the play button manually
3. Check volume is not muted
4. Verify audio file is not corrupted

### Step 6: Debug Code

Add this to your browser console to test:
```javascript
// Test if audio element exists
const audio = document.getElementById('audio-player');
console.log('Audio element:', audio);

// Test loading a file
audio.src = 'src/audio/first.mp3';
audio.load();
audio.play().then(() => {
  console.log('Audio playing!');
}).catch(err => {
  console.error('Error:', err);
});
```

### Step 7: Clear Cache

If you updated the track data:
1. Open browser console (F12)
2. Run: `localStorage.clear()`
3. Refresh the page
4. Try playing again

### Quick Fixes

1. **Try different path formats:**
   ```javascript
   audioUrl: 'src/audio/first.mp3'     // Relative from root
   audioUrl: './src/audio/first.mp3'   // Explicit relative
   audioUrl: '/src/audio/first.mp3'    // Absolute from root
   ```

2. **Move audio to root folder:**
   - Move `src/audio/first.mp3` to `audio/first.mp3`
   - Update: `audioUrl: 'audio/first.mp3'`

3. **Use a local server:**
   ```bash
   # In your project root
   python -m http.server 8000
   # Then visit: http://localhost:8000/dashboard.html
   ```

### Still Not Working?

1. Check browser console for specific error messages
2. Verify the audio file plays in other applications (VLC, etc.)
3. Try a different audio file to rule out file corruption
4. Test in a different browser
5. Check file permissions

