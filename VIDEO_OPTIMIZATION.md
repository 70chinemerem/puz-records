# Video Background Optimization Guide

## Changes Made

I've optimized your video background for faster playback:

### 1. Added `preload="auto"` ✅
- Starts loading the video immediately when the page loads
- Reduces delay before playback starts

### 2. Added `loop` attribute ✅
- Video will loop seamlessly
- Better user experience

### 3. Optimized JavaScript Loading ✅
- Video starts playing as soon as enough data is loaded (`canplay` event)
- Doesn't wait for entire video to download
- Multiple fallback attempts to start playback

## Current Video File

Your video file is **~62MB** (`landing-BLbNodCh.mp4`). This is quite large and can cause slow loading.

## Further Optimization Options

### Option 1: Compress the Video (Recommended)

**Target size:** 5-15MB for web use

**Tools:**
1. **FFmpeg** (Free, Command Line):
   ```bash
   # Install FFmpeg first
   brew install ffmpeg  # macOS
   # or
   sudo apt-get install ffmpeg  # Linux
   
   # Compress video (recommended settings)
   ffmpeg -i src/videos/landing.mp4 \
     -c:v libx264 \
     -preset slow \
     -crf 28 \
     -c:a aac \
     -b:a 128k \
     -movflags +faststart \
     -vf "scale=1920:1080" \
     src/videos/landing-optimized.mp4
   ```

2. **HandBrake** (Free, GUI):
   - Download: https://handbrake.fr
   - Use "Web" preset
   - Adjust quality slider (RF 28-30 for good quality/size balance)

3. **Online Tools:**
   - CloudConvert: https://cloudconvert.com
   - FreeConvert: https://www.freeconvert.com

**Recommended Settings:**
- **Resolution:** 1920x1080 (Full HD) or 1280x720 (HD) if acceptable
- **Bitrate:** 2-5 Mbps for video, 128kbps for audio
- **Codec:** H.264 (MP4) for compatibility
- **Frame Rate:** 30fps (or 24fps if original is 24fps)
- **Fast Start:** Enable (allows playback while downloading)

### Option 2: Use Multiple Formats

Add WebM format for better compression (smaller file size):

```html
<video autoplay muted playsinline loop preload="auto">
  <source src="src/videos/landing.webm" type="video/webm">
  <source src="src/videos/landing.mp4" type="video/mp4">
</video>
```

**Convert to WebM:**
```bash
ffmpeg -i src/videos/landing.mp4 \
  -c:v libvpx-vp9 \
  -b:v 2M \
  -c:a libopus \
  -b:a 128k \
  src/videos/landing.webm
```

### Option 3: Use Video CDN

Host video on a CDN for faster delivery:
- **Cloudinary** (free tier)
- **AWS S3 + CloudFront**
- **Vercel Blob Storage**
- **Bunny CDN**

### Option 4: Lazy Load Video

Only load video when user scrolls to section (if video is below fold):

```javascript
// Only load video when in viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const video = entry.target;
      video.load();
      video.play();
    }
  });
});

const video = document.querySelector('video');
if (video) {
  observer.observe(video);
}
```

## Current Implementation

Your video now:
- ✅ Loads immediately (`preload="auto"`)
- ✅ Starts playing as soon as enough data is available
- ✅ Loops seamlessly
- ✅ Has optimized JavaScript loading

## Testing

After optimizing, test:
1. **Network Speed:**
   - Fast 3G: Should start playing within 2-3 seconds
   - Slow 3G: May take 5-10 seconds (consider lower quality)

2. **Browser DevTools:**
   - Open Network tab
   - Check video file size and load time
   - Look for "fast start" in video metadata

## Quick Compression Command

If you have FFmpeg installed, run this in your project root:

```bash
# Create optimized version
ffmpeg -i src/videos/landing.mp4 \
  -c:v libx264 \
  -preset medium \
  -crf 28 \
  -c:a aac \
  -b:a 128k \
  -movflags +faststart \
  src/videos/landing-optimized.mp4

# Replace original (backup first!)
mv src/videos/landing.mp4 src/videos/landing-original.mp4
mv src/videos/landing-optimized.mp4 src/videos/landing.mp4
```

This should reduce file size by 60-80% while maintaining good quality.

## Expected Results

- **Before:** 62MB, slow loading
- **After:** 8-15MB, fast loading
- **Playback:** Starts within 1-2 seconds on good connections

---

**Note:** The current optimizations will help, but compressing the video file will have the biggest impact on loading speed.

