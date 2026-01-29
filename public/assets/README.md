# Public Assets

This folder contains static assets that are served as-is without processing.

## Structure

- **images/** - Large images, photos, and graphics that don't need optimization
- **videos/** - Video files (mp4, webm, etc.)
- **models/** - 3D models (glb, gltf, obj, etc.)

## Usage

Reference these assets using absolute paths from the root:
```tsx
<img src="/assets/images/hero-image.jpg" alt="Hero" />
<video src="/assets/videos/demo.mp4" />
```
