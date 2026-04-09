# HeroImage Component Usage Examples

The HeroImage component provides optimized image rendering with WebP support, responsive srcset, lazy loading, and error handling.

## Basic Usage

```tsx
import HeroImage from './components/HeroImage';

// Simple usage with just src and alt
<HeroImage
  src="/images/hero.jpg"
  alt="Vietnamese dishes including phở, bánh mì, and chả giò"
/>
```

## With Lazy Loading (Default)

```tsx
// Lazy loading is enabled by default
<HeroImage
  src="/images/hero.jpg"
  alt="Vietnamese dishes"
  loading="lazy"
/>

// For above-the-fold images, use eager loading
<HeroImage
  src="/images/hero.jpg"
  alt="Vietnamese dishes"
  loading="eager"
/>
```

## With Loading Placeholder

```tsx
// Show a blurred placeholder while the main image loads
<HeroImage
  src="/images/hero.jpg"
  alt="Vietnamese dishes"
  placeholder="/images/hero-placeholder.jpg"
/>
```

## With WebP Support and Fallback

```tsx
// Modern browsers will use WebP, older browsers fall back to JPEG
<HeroImage
  src="/images/hero.jpg"
  alt="Vietnamese dishes"
  webpSrc="/images/hero.webp"
/>
```

## With Responsive Srcset

```tsx
// Provide different image sizes for different viewport widths
<HeroImage
  src="/images/hero-1920w.jpg"
  alt="Vietnamese dishes"
  srcSet="/images/hero-320w.jpg 320w, /images/hero-768w.jpg 768w, /images/hero-1024w.jpg 1024w, /images/hero-1920w.jpg 1920w"
/>
```

## Full Featured Example (Recommended)

```tsx
// Combine all features for optimal performance
<HeroImage
  src="/images/hero-1920w.jpg"
  alt="Vietnamese dishes including phở, bánh mì, and chả giò"
  webpSrc="/images/hero-1920w.webp"
  srcSet="/images/hero-320w.jpg 320w, /images/hero-768w.jpg 768w, /images/hero-1024w.jpg 1024w, /images/hero-1920w.jpg 1920w"
  webpSrcSet="/images/hero-320w.webp 320w, /images/hero-768w.webp 768w, /images/hero-1024w.webp 1024w, /images/hero-1920w.webp 1920w"
  placeholder="/images/hero-placeholder.jpg"
  loading="eager"
/>
```

## Image Preparation Guidelines

### 1. Create Multiple Sizes

Generate images at these widths:
- 320px (mobile)
- 768px (tablet)
- 1024px (desktop)
- 1920px (wide desktop)

### 2. Create WebP Versions

Convert all images to WebP format for better compression:

```bash
# Using cwebp (WebP encoder)
cwebp -q 80 hero-320w.jpg -o hero-320w.webp
cwebp -q 80 hero-768w.jpg -o hero-768w.webp
cwebp -q 80 hero-1024w.jpg -o hero-1024w.webp
cwebp -q 80 hero-1920w.jpg -o hero-1920w.webp
```

### 3. Create Placeholder

Create a small, blurred version for the loading state:

```bash
# Using ImageMagick
convert hero.jpg -resize 20x -blur 0x8 hero-placeholder.jpg
```

## Error Handling

The component automatically handles image loading errors:

```tsx
<HeroImage
  src="/images/broken-image.jpg"
  alt="Vietnamese dishes"
/>
// Will display "Image failed to load" message if the image fails
```

## Performance Benefits

- **WebP Format**: 25-35% smaller file size compared to JPEG
- **Responsive Srcset**: Browser loads only the appropriate image size
- **Lazy Loading**: Images load only when needed (below-the-fold)
- **Placeholder**: Prevents layout shift and provides visual feedback

## Browser Support

- **WebP**: Chrome, Firefox, Edge, Safari 14+
- **Picture Element**: All modern browsers
- **Lazy Loading**: Chrome, Firefox, Edge, Safari 15.4+
- **Fallback**: JPEG/PNG works in all browsers

## Requirements Satisfied

- ✅ 4.1: Full-width image display
- ✅ 4.2: Maintains aspect ratio
- ✅ 4.3: Optimized file size with WebP
- ✅ 4.4: Loading placeholder state
- ✅ 4.5: Error handling for failed loads
- ✅ 9.1: Lazy loading optimization
- ✅ 9.3: Modern image formats with fallbacks
