# Project Images

This folder contains images for portfolio projects.

## Image Optimization Guidelines

To ensure optimal performance, follow these guidelines when adding project images:

### Recommended Specifications
- **Format**: WebP (with JPG/PNG fallback) or optimized JPG
- **Dimensions**: 800x600px (4:3 aspect ratio)
- **File Size**: < 200KB per image
- **Quality**: 80-85% compression

### Optimization Tools

**Online Tools:**
- [TinyPNG](https://tinypng.com/) - PNG/JPG compression
- [Squoosh](https://squoosh.app/) - Advanced image optimization
- [CloudConvert](https://cloudconvert.com/) - Format conversion

**CLI Tools:**
```bash
# Using ImageMagick
convert input.jpg -quality 85 -resize 800x600^ -gravity center -extent 800x600 output.jpg

# Using sharp (Node.js)
npm install sharp
npx sharp input.jpg -o output.jpg --resize 800 600 --quality 85
```

### Current Images

The placeholder SVG images in this folder are lightweight and should be replaced with actual project screenshots following the guidelines above.

### Lazy Loading

The ProjectCard component automatically implements lazy loading for all project images using the native `loading="lazy"` attribute, which defers loading of off-screen images until the user scrolls near them.

### Responsive Images

For better performance across devices, consider using responsive images:

```html
<img
  srcset="image-400.jpg 400w, image-800.jpg 800w, image-1200.jpg 1200w"
  sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
  src="image-800.jpg"
  alt="Project screenshot"
/>
```

This is already handled by the browser when using properly sized images.
