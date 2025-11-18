# Video Not Playing - Troubleshooting Guide

## What I've Added

I've improved the video initialization with:
- ✅ Comprehensive error handling
- ✅ Detailed console logging for debugging
- ✅ Multiple playback attempts at different loading stages
- ✅ Better autoplay handling

## How to Debug

### Step 1: Open Browser Console

1. Open your deployed site: `https://puz-records.netlify.app`
2. Press `F12` or right-click → Inspect
3. Go to the **Console** tab

### Step 2: Check Console Messages

You should see messages like:
- ✅ `Video source set to: [URL]`
- ✅ `Video loading started`
- ✅ `Video metadata loaded, duration: [number]`
- ✅ `Video can play, readyState: [number]`
- ✅ `Video playback started successfully`

### Step 3: Check for Errors

Look for error messages:
- ❌ `Video element not found` - HTML issue
- ❌ `Video source element not found` - HTML issue
- ❌ `Landing video import not available` - JavaScript import issue
- ❌ `Video error: Network error` - File not found or CORS issue
- ❌ `Video autoplay blocked` - Browser policy (normal, video will play on interaction)

## Common Issues & Solutions

### Issue 1: Video File Not Found (Network Error)

**Symptoms:**
- Console shows: `Video error: Network error - video file not found or CORS issue`
- Network tab shows 404 for video file

**Solutions:**
1. **Check video file exists in build:**
   ```bash
   ls -lh dist/assets/landing-*.mp4
   ```

2. **Verify video is included in build:**
   - Check `dist/assets/` folder
   - Video should have a hashed filename like `landing-BLbNodCh.mp4`

3. **Rebuild if needed:**
   ```bash
   npm run build
   ```

4. **Check Netlify deployment:**
   - Go to Netlify dashboard
   - Check if video file is in the deployed files
   - File size should be ~62MB

### Issue 2: Browser Autoplay Blocked

**Symptoms:**
- Console shows: `Video autoplay blocked: NotAllowedError`
- Video doesn't play automatically

**Solutions:**
- This is **normal browser behavior**
- Video will play when user interacts with the page (scroll, click, etc.)
- The video is still loaded and ready
- You can add a "Click to play" button if needed

### Issue 3: CORS Issues

**Symptoms:**
- Console shows: `Video error: Network error`
- Network tab shows CORS error

**Solutions:**
1. **Check Netlify headers:**
   - Ensure video files are served with proper CORS headers
   - Add to `public/_headers`:
   ```
   /assets/*.mp4
     Access-Control-Allow-Origin: *
   ```

2. **Or use Netlify redirects:**
   - Create `public/_redirects`:
   ```
   /assets/*.mp4  /assets/:splat.mp4 200
   ```

### Issue 4: Video Format Not Supported

**Symptoms:**
- Console shows: `Video format not supported`

**Solutions:**
1. **Check video codec:**
   - Should be H.264 (MP4)
   - Check with: `ffprobe src/videos/landing.mp4`

2. **Re-encode if needed:**
   ```bash
   ffmpeg -i src/videos/landing.mp4 \
     -c:v libx264 \
     -profile:v baseline \
     -level 3.0 \
     -pix_fmt yuv420p \
     -c:a aac \
     -movflags +faststart \
     src/videos/landing-fixed.mp4
   ```

### Issue 5: Video Too Large / Slow Loading

**Symptoms:**
- Video takes very long to load
- Console shows loading messages but no playback

**Solutions:**
1. **Compress the video** (see `VIDEO_OPTIMIZATION.md`)
2. **Use a CDN** for video hosting
3. **Add loading indicator** while video loads

## Quick Test

Open browser console and run:

```javascript
// Check if video element exists
const video = document.querySelector('video');
console.log('Video element:', video);

// Check video source
const source = document.querySelector('video source');
console.log('Video source:', source?.src);

// Check video state
if (video) {
  console.log('Video readyState:', video.readyState);
  console.log('Video paused:', video.paused);
  console.log('Video muted:', video.muted);
  console.log('Video error:', video.error);
  
  // Try to play manually
  video.play().then(() => {
    console.log('✅ Video can play!');
  }).catch(err => {
    console.error('❌ Video play error:', err);
  });
}
```

## Network Tab Check

1. Open **Network** tab in DevTools
2. Filter by "Media"
3. Reload page
4. Check if video file loads:
   - ✅ **200 OK** - File loads successfully
   - ❌ **404** - File not found
   - ❌ **CORS error** - CORS issue
   - ❌ **Network error** - Connection issue

## Expected Behavior

1. **Page loads** → Video element found
2. **Video source set** → Console: "Video source set to: [URL]"
3. **Video starts loading** → Console: "Video loading started"
4. **Metadata loads** → Console: "Video metadata loaded"
5. **Video can play** → Console: "Video can play"
6. **Video plays** → Console: "Video playback started successfully"

## Still Not Working?

1. **Check console for specific errors**
2. **Check Network tab for video file**
3. **Verify video file exists in `dist/assets/`**
4. **Try accessing video URL directly:**
   ```
   https://puz-records.netlify.app/assets/landing-BLbNodCh.mp4
   ```
5. **Check browser compatibility** - Try different browser
6. **Clear browser cache** and reload

---

**The improved code now has comprehensive logging. Check your browser console to see exactly what's happening!**

