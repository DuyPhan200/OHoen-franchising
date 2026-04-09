# Hero Image Optimization Guide

## Overview

This guide provides best practices for optimizing hero images to achieve excellent performance metrics (FCP < 1.5s, LCP < 2.5s, CLS < 0.1) as specified in Requirements 9.1, 9.2, 9.3, and 9.4.

## Image Compression and Optimization

### Recommended Image Specifications

**Full-size Hero Image:**
- Format: WebP (primary) + JPEG (fallback)
- Dimensions: 1920x1080px (16:9 aspect ratio)
- File size target: < 150KB for WebP, < 200KB for JPEG
- Quality: 80-85% for JPEG, 75-80% for WebP

**Responsive Variants:**
```
hero-image-1920w.webp  (1920x1080) - Desktop wide
hero-image-1280w.webp  (1280x720)  - Desktop
hero-image-768w.webp   (768x432)   - Tablet
hero-image-480w.webp   (480x270)   - Mobile
```

**Blur-up Placeholder:**
- Format: JPEG (base64 encoded inline or separate file)
- Dimensions: 40x23px (tiny version)
- File size: < 2KB
- Quality: 20-30%
- Purpose: Provides instant visual feedback while main image loads

### Compression Tools

**Command-line tools:**
```bash
# WebP conversion with optimization
cwebp -q 80 hero-image.jpg -o hero-image.webp

# JPEG optimization
jpegoptim --max=85 --strip-all hero-image.jpg

# Generate responsive variants
convert hero-image.jpg -resize 1280x720 hero-image-1280w.jpg
convert hero-image.jpg -resize 768x432 hero-image-768w.jpg
convert hero-image.jpg -resize 480x270 hero-image-480w.jpg

# Generate blur placeholder
convert hero-image.jpg -resize 40x23 -quality 30 hero-image-placeholder.jpg
```

**Online tools:**
- [Squoosh](https://squoosh.app/) - Visual compression tool
- [TinyPNG](https://tinypng.com/) - Automated compression
- [ImageOptim](https://imageoptim.com/) - Mac app for optimization

**Build-time optimization:**
Consider using Vite plugins for automatic image optimization:
```bash
npm install vite-plugin-imagemin --save-dev
```

## Implementation Examples

### Basic Usage with Optimized Images

```tsx
<HeroImage
  src="/images/hero-image.jpg"
  alt="Delicious Vietnamese dishes"
  loading="eager"
  webpSrc="/images/hero-image.webp"
  placeholder="/images/hero-image-placeholder.jpg"
  aspectRatio="16/9"
/>
```

### With Responsive srcSet

```tsx
<HeroImage
  src="/images/hero-image-1920w.jpg"
  alt="Delicious Vietnamese dishes"
  loading="eager"
  webpSrc="/images/hero-image-1920w.webp"
  webpSrcSet="/images/hero-image-480w.webp 480w, /images/hero-image-768w.webp 768w, /images/hero-image-1280w.webp 1280w, /images/hero-image-1920w.webp 1920w"
  srcSet="/images/hero-image-480w.jpg 480w, /images/hero-image-768w.jpg 768w, /images/hero-image-1280w.jpg 1280w, /images/hero-image-1920w.jpg 1920w"
  placeholder="/images/hero-image-placeholder.jpg"
  aspectRatio="16/9"
/>
```

### With Base64 Inline Placeholder

```tsx
const blurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...";

<HeroImage
  src="/images/hero-image.jpg"
  alt="Delicious Vietnamese dishes"
  loading="eager"
  webpSrc="/images/hero-image.webp"
  placeholder={blurDataURL}
  aspectRatio="16/9"
/>
```

## Performance Optimizations Implemented

### 1. Image Preloading (Requirement 9.1)

Critical hero images are preloaded in `index.html`:
```html
<link rel="preload" as="image" href="/hero-image.jpg" fetchpriority="high" />
<link rel="preload" as="image" href="/hero-image.webp" type="image/webp" fetchpriority="high" />
```

**Benefits:**
- Starts downloading image before React hydration
- Reduces Largest Contentful Paint (LCP)
- Prioritizes critical assets

### 2. Blur-up Loading Technique (Requirement 9.2)

The component displays a tiny, blurred placeholder while the full image loads:

**How it works:**
1. Tiny placeholder (< 2KB) loads instantly
2. Placeholder is scaled and heavily blurred (20px blur)
3. Full image fades in smoothly when loaded (0.3s transition)
4. Placeholder is removed after full image loads

**Benefits:**
- Perceived performance improvement
- Smooth visual transition
- Better user experience

### 3. Layout Shift Prevention (Requirement 9.4)

The component uses CSS `aspect-ratio` to reserve space:

```tsx
<div className={styles.imageContainer} style={{ aspectRatio: '16/9' }}>
  {/* Image content */}
</div>
```

**Benefits:**
- Prevents Cumulative Layout Shift (CLS)
- Maintains stable layout during image load
- Target: CLS < 0.1

### 4. Modern Image Formats (Requirement 9.3)

Uses `<picture>` element with WebP and fallback:

```html
<picture>
  <source type="image/webp" srcSet="hero.webp" />
  <source srcSet="hero.jpg" />
  <img src="hero.jpg" alt="..." />
</picture>
```

**Benefits:**
- 25-35% smaller file sizes with WebP
- Automatic fallback for older browsers
- Faster load times

### 5. Async Decoding

The component uses `decoding="async"` attribute:

```tsx
<img decoding="async" ... />
```

**Benefits:**
- Prevents blocking main thread during image decode
- Improves Time to Interactive (TTI)
- Better perceived performance

## Performance Metrics Targets

Based on Requirements 9.1, 9.2, 9.3, 9.4:

| Metric | Target | Implementation |
|--------|--------|----------------|
| First Contentful Paint (FCP) | < 1.5s | Preloading, eager loading |
| Largest Contentful Paint (LCP) | < 2.5s | Optimized images, preloading |
| Cumulative Layout Shift (CLS) | < 0.1 | Aspect ratio container |
| Image File Size | < 150KB (WebP) | Compression, optimization |
| Placeholder Size | < 2KB | Tiny blur placeholder |

## Testing Performance

### Using Lighthouse

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse http://localhost:5173 --view
```

**Check these metrics:**
- Performance score > 90
- LCP < 2.5s
- CLS < 0.1
- Properly sized images

### Using WebPageTest

1. Visit [webpagetest.org](https://www.webpagetest.org/)
2. Enter your URL
3. Select "3G" connection for realistic testing
4. Check:
   - Start Render time
   - Largest Contentful Paint
   - Cumulative Layout Shift

### Manual Testing

**Network throttling:**
```
Chrome DevTools > Network tab > Throttling > Slow 3G
```

**Verify:**
- Placeholder appears immediately
- Smooth transition to full image
- No layout jumping
- Image loads within 2-3 seconds on 3G

## CDN Recommendations

For production, serve images through a CDN with automatic optimization:

**Recommended CDNs:**
- **Cloudflare Images** - Automatic format conversion, resizing
- **Cloudinary** - Advanced image transformations
- **imgix** - Real-time image processing
- **AWS CloudFront + S3** - Scalable, cost-effective

**Example with Cloudinary:**
```tsx
const cloudinaryUrl = "https://res.cloudinary.com/demo/image/upload/w_1920,f_auto,q_auto/hero-image.jpg";

<HeroImage
  src={cloudinaryUrl}
  alt="Vietnamese dishes"
  loading="eager"
/>
```

## Checklist

Before deploying hero images to production:

- [ ] Images compressed to target file sizes (< 150KB WebP, < 200KB JPEG)
- [ ] WebP format generated with JPEG fallback
- [ ] Responsive variants created (480w, 768w, 1280w, 1920w)
- [ ] Blur placeholder generated (< 2KB)
- [ ] Preload links added to index.html
- [ ] Aspect ratio specified to prevent CLS
- [ ] Tested on 3G connection (LCP < 2.5s)
- [ ] Lighthouse performance score > 90
- [ ] CLS < 0.1 verified
- [ ] Images served from CDN (production)

## Troubleshooting

### Issue: High LCP (> 2.5s)

**Solutions:**
- Reduce image file size further
- Ensure preload links are present
- Use CDN for faster delivery
- Check server response times

### Issue: High CLS (> 0.1)

**Solutions:**
- Verify aspect ratio is set correctly
- Ensure container has explicit dimensions
- Check for dynamic content above image

### Issue: Placeholder not showing

**Solutions:**
- Verify placeholder file exists and is accessible
- Check file size (should be < 2KB)
- Ensure placeholder prop is passed correctly

### Issue: WebP not loading

**Solutions:**
- Verify browser supports WebP
- Check MIME type configuration on server
- Ensure fallback JPEG is present

## Additional Resources

- [Web.dev Image Optimization Guide](https://web.dev/fast/#optimize-your-images)
- [MDN Picture Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture)
- [WebP Format Documentation](https://developers.google.com/speed/webp)
- [Core Web Vitals](https://web.dev/vitals/)
