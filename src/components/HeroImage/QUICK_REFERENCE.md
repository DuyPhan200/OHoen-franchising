# Hero Image Performance - Quick Reference

## TL;DR

Task 11.1 implements 4 key optimizations to achieve LCP < 2.5s and CLS < 0.1:

1. ✅ **Preloading** - Images start loading immediately
2. ✅ **Blur-up** - Smooth loading transition
3. ✅ **Aspect Ratio** - No layout shift
4. ✅ **Compression** - Optimized file sizes

## Quick Setup

### 1. Prepare Your Images

```bash
# Generate optimized images (example using ImageMagick)
convert hero.jpg -quality 85 -resize 1920x1080 hero-image.jpg
cwebp -q 80 hero-image.jpg -o hero-image.webp
convert hero.jpg -quality 30 -resize 40x23 hero-placeholder.jpg
```

**Target sizes:**
- Main image (WebP): < 150KB
- Main image (JPEG): < 200KB  
- Placeholder: < 2KB

### 2. Add Preload Links

In `index.html`:
```html
<link rel="preload" as="image" href="/hero-image.jpg" fetchpriority="high" />
<link rel="preload" as="image" href="/hero-image.webp" type="image/webp" fetchpriority="high" />
```

### 3. Use the Component

```tsx
<HeroImage
  src="/hero-image.jpg"
  alt="Your alt text"
  loading="eager"
  webpSrc="/hero-image.webp"
  placeholder="/hero-placeholder.jpg"
  aspectRatio="16/9"
/>
```

## Performance Checklist

Before deploying:

- [ ] Images compressed to target sizes
- [ ] WebP version created
- [ ] Placeholder generated (< 2KB)
- [ ] Preload links added to index.html
- [ ] Aspect ratio specified
- [ ] Tested on 3G (LCP < 2.5s)
- [ ] Lighthouse score > 90
- [ ] CLS < 0.1

## Testing

```bash
# Run tests
npm test

# Build
npm run build

# Lighthouse audit
lighthouse http://localhost:5173 --view
```

## Key Metrics

| Metric | Target | How to Achieve |
|--------|--------|----------------|
| LCP | < 2.5s | Preload + compression |
| CLS | < 0.1 | Aspect ratio container |
| FCP | < 1.5s | Preload + eager loading |

## Common Issues

**Issue:** High LCP
- ✅ Reduce image file size
- ✅ Add preload links
- ✅ Use CDN

**Issue:** Layout shift
- ✅ Set aspectRatio prop
- ✅ Verify container dimensions

**Issue:** Placeholder not showing
- ✅ Check file exists
- ✅ Verify file size < 2KB

## Full Documentation

See `IMAGE_OPTIMIZATION_GUIDE.md` for complete details.
