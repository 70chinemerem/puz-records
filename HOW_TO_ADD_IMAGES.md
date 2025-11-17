# How to Add Images to Your Music Dashboard

This guide shows you how to add cover images for tracks and playlists.

## Quick Start

### Step 1: Create Images Folder

Create a folder for your images:
```
puz-records/
├── src/
│   ├── images/          ← Create this folder
│   │   ├── with-you.jpg
│   │   ├── im-sorry.jpg
│   │   └── ...
│   ├── audio/
│   └── dashboard.js
```

### Step 2: Add Your Images

Place your image files in the `src/images/` folder. Supported formats:
- **JPG/JPEG** (recommended)
- **PNG**
- **WebP**

### Step 3: Update Track Data

In `src/dashboard.js`, add `coverImage` to your tracks:

```javascript
const SAMPLE_TRACKS = [
  { 
    id: 1, 
    title: 'with you', 
    artist: 'Davido Ft Omaly', 
    album: 'Flive', 
    duration: 225, 
    genre: 'Electronic', 
    color: 'from-blue-500 to-purple-600',
    audioUrl: 'src/audio/first.mp3',
    coverImage: 'src/images/with-you.jpg'  // ← Add this
  },
  // ... more tracks
];
```

## Where Images Are Used

### 1. Track Library Cards
- Shows cover image in the library grid
- Falls back to gradient background if no image

### 2. Music Player
- Shows album art in the player
- Updates when track changes

### 3. Playlists
- Playlist cover images (if you add them)
- Falls back to gradient if no image

## Image Path Examples

**Local files:**
```javascript
coverImage: 'src/images/song-cover.jpg'
coverImage: 'images/album-art.png'
coverImage: './src/images/track.jpg'
```

**External URLs:**
```javascript
coverImage: 'https://example.com/images/cover.jpg'
coverImage: 'https://cdn.example.com/artwork/album.png'
```

## Image Requirements

- **Recommended size:** 500x500px to 1000x1000px
- **Aspect ratio:** Square (1:1) works best
- **File size:** Keep under 500KB for fast loading
- **Format:** JPG for photos, PNG for graphics with transparency

## Fallback Behavior

If no `coverImage` is provided:
- A beautiful gradient background is used
- A music note icon is displayed
- The `color` property determines the gradient

## Example Track with Image

```javascript
{
  id: 1,
  title: 'My Song',
  artist: 'My Artist',
  album: 'My Album',
  duration: 240,
  genre: 'Pop',
  color: 'from-blue-500 to-purple-600',  // Fallback gradient
  audioUrl: 'src/audio/my-song.mp3',
  coverImage: 'src/images/my-song-cover.jpg'  // Cover image
}
```

## Tips

1. **Use consistent naming:** `song-title.jpg` or `artist-album.jpg`
2. **Optimize images:** Compress images to reduce file size
3. **Square images work best:** 1:1 aspect ratio
4. **Test image paths:** Make sure images load correctly
5. **Use relative paths:** Easier to manage than absolute URLs

## Troubleshooting

### Image doesn't show
- Check file path is correct (case-sensitive!)
- Verify file exists in the folder
- Check browser console for 404 errors
- Try using absolute path: `/src/images/cover.jpg`

### Image loads slowly
- Compress/optimize your images
- Use WebP format for smaller file sizes
- Consider using a CDN for external images

### Image looks stretched
- Use square images (1:1 aspect ratio)
- Recommended: 500x500px or 1000x1000px

## Quick Test

Add an image to a track and check:
1. Library section - should show the image
2. Music player - should show album art when playing
3. Playlists - should show cover if playlist has image

