# Implementation Tasks: Cháo Nghêu O Hoèn Redesign

## Phase 1: Project Setup and Foundation

### 1.1 Setup CSS Variables and Global Styles
- [x] Create `src/styles/variables.module.css` with brand colors, breakpoints, spacing
- [x] Create `src/styles/global.css` with CSS reset and base typography
- [x] Create `src/styles/mixins.module.css` with reusable style patterns
- [-] Test CSS variables are accessible across components

### 1.2 Create Base Component Structure
- [~] Create `src/components/ChaoNgheuPage/` directory
- [~] Create `ChaoNgheuPage.tsx` with basic structure
- [~] Create `ChaoNgheuPage.module.css`
- [~] Create `ChaoNgheuPage.test.tsx`
- [~] Update App.tsx routing to include ChaoNgheuPage route

### 1.3 Setup Data Files
- [~] Create `src/data/quizData.ts` with 10 quiz questions
- [ ] Create `src/data/faqData.ts` with 5 FAQ items
- [ ] Create `src/data/timelineData.ts` with 7 process steps
- [ ] Create `src/data/investmentOptions.ts` with investment tiers
- [ ] Create TypeScript interfaces for all data structures

## Phase 2: Static Sections Implementation

### 2.1 Implement HeroSection Component
- [ ] Create `src/components/ChaoNgheuHeroSection/` directory
- [ ] Implement component with blue gradient background
- [ ] Add white grid pattern overlay
- [ ] Add hero title and tagline
- [ ] Create CTAButtons component with 2 buttons
- [ ] Implement responsive styles (mobile/tablet/desktop)
- [ ] Write unit tests for HeroSection
- [ ] Verify accessibility (ARIA labels, semantic HTML)

### 2.2 Implement BrandStorySection Component
- [ ] Create `src/components/BrandStorySection/` directory
- [ ] Create CoreValueCard sub-component
- [ ] Implement 3 core values: "Tử tế", "Tận tâm", "Nguyên bản"
- [ ] Add icons for each value
- [ ] Implement responsive grid layout (1 col mobile, 3 col desktop)
- [ ] Write unit tests
- [ ] Verify responsive behavior at all breakpoints

### 2.3 Implement BrandIdentitySection Component
- [ ] Create `src/components/BrandIdentitySection/` directory
- [ ] Create LogoMeaningCard sub-component
- [ ] Implement 3 logo meaning points with yellow accent (#FDC500)
- [ ] Implement responsive layout (1 col mobile, 2 col tablet, 3 col desktop)
- [ ] Write unit tests
- [ ] Verify color contrast ratios

### 2.4 Implement MenuSection Component
- [ ] Create `src/components/MenuSection/` directory
- [ ] Create MenuItemCard sub-component
- [ ] Implement card layout with image, name, description
- [ ] Add at least 2 menu items: "Cháo Nghêu", "Cháo Nghêu Đặc Biệt"
- [ ] Implement responsive grid (1 col mobile, 2 col desktop)
- [ ] Add image lazy loading
- [ ] Write unit tests
- [ ] Test image error handling

### 2.5 Implement OHSpicesSection Component
- [ ] Create `src/components/OHSpicesSection/` directory
- [ ] Create SpiceProductCard sub-component
- [ ] Implement 4 products: "Trà Quế Mật Ong", "Tiêu Đen", "Quế", "Mật Ong"
- [ ] Implement responsive grid (2 col mobile, 4 col desktop)
- [ ] Add product images with lazy loading
- [ ] Write unit tests

### 2.6 Implement FishSauceComparisonSection Component
- [ ] Create `src/components/FishSauceComparisonSection/` directory
- [ ] Create ComparisonTable sub-component
- [ ] Implement 2-column comparison table
- [ ] Add at least 5 comparison criteria
- [ ] Implement contrasting colors for columns
- [ ] Add horizontal scroll for mobile if needed
- [ ] Write unit tests
- [ ] Verify table accessibility (proper table markup)

### 2.7 Implement TargetAudienceSection Component
- [ ] Create `src/components/TargetAudienceSection/` directory
- [ ] Create CriteriaListItem sub-component
- [ ] Implement list of target criteria with icons
- [ ] Implement responsive spacing
- [ ] Write unit tests

### 2.8 Implement InvestmentBenefitsSection Component
- [ ] Create `src/components/InvestmentBenefitsSection/` directory
- [ ] Create BenefitCard sub-component
- [ ] Implement 4 investment benefits with icons
- [ ] Implement responsive grid (1 col mobile, 2x2 desktop)
- [ ] Write unit tests

### 2.9 Implement CommitmentSection Component
- [ ] Create `src/components/CommitmentSection/` directory
- [ ] Create CommitmentCard sub-component
- [ ] Implement commitment list with icons and descriptions
- [ ] Implement responsive layout (1 col mobile, 2 col tablet)
- [ ] Write unit tests

### 2.10 Implement Footer Component
- [ ] Create `src/components/ChaoNgheuFooter/` directory
- [ ] Add contact information (address, phone, email)
- [ ] Add social media links
- [ ] Add copyright text
- [ ] Apply dark blue-gray background (#1B2E34)
- [ ] Implement clickable phone and email links
- [ ] Implement responsive stacking for mobile
- [ ] Write unit tests
- [ ] Verify link accessibility

## Phase 3: Interactive Components Implementation

### 3.1 Implement PartnerQuizSection Component
- [ ] Create `src/components/PartnerQuizSection/` directory
- [ ] Create QuizQuestion sub-component
- [ ] Create QuizResult sub-component
- [ ] Create QuizNavigation sub-component
- [ ] Implement state management (currentQuestionIndex, answers, score)
- [ ] Implement question display with multiple choice options
- [ ] Implement answer selection with visual feedback
- [ ] Implement validation (all questions answered before submit)
- [ ] Implement scoring logic (0-100 points)
- [ ] Implement result interpretation (3 tiers: 0-40, 41-70, 71-100)
- [ ] Implement "retake quiz" functionality
- [ ] Implement mobile navigation (1 question at a time with prev/next buttons)
- [ ] Write unit tests for quiz logic
- [ ] Write unit tests for scoring calculation
- [ ] Write integration tests for complete quiz flow
- [ ] Verify keyboard navigation
- [ ] Verify accessibility (ARIA labels, focus management)

### 3.2 Implement FAQSection Component (Accordion)
- [ ] Create `src/components/FAQSection/` directory
- [ ] Create AccordionItem sub-component
- [ ] Implement state management (expandedIds Set)
- [ ] Implement toggle functionality (expand/collapse)
- [ ] Allow multiple items expanded simultaneously
- [ ] Implement smooth expand/collapse animation
- [ ] Add expand/collapse icon with state change
- [ ] Implement keyboard support (Enter key to toggle)
- [ ] Write unit tests for accordion behavior
- [ ] Write unit tests for keyboard navigation
- [ ] Verify accessibility (aria-expanded, aria-controls, role="button")
- [ ] Verify focus management

### 3.3 Implement RegistrationFormSection Component
- [ ] Create `src/components/RegistrationFormSection/` directory
- [ ] Create FormField sub-component
- [ ] Create FormValidator utility
- [ ] Implement form fields: fullName, phoneNumber, email, investmentCapital, notes
- [ ] Implement investment capital dropdown with predefined options
- [ ] Implement validation rules:
  - [ ] Full name: required, min 2 characters
  - [ ] Phone: required, Vietnamese format (10 digits starting with 0)
  - [ ] Email: required, valid email format
  - [ ] Investment capital: required
- [ ] Implement real-time validation on blur
- [ ] Implement form submission with loading state
- [ ] Implement success notification
- [ ] Implement error handling (network error, server error)
- [ ] Implement form reset after successful submission
- [ ] Prevent duplicate submissions (disable button during processing)
- [ ] Display required field indicators
- [ ] Implement responsive full-width fields on mobile
- [ ] Write unit tests for validation logic
- [ ] Write unit tests for form submission flow
- [ ] Write integration tests for complete form flow
- [ ] Verify accessibility (labels, error announcements, focus management)

### 3.4 Implement ProcessTimelineSection Component
- [ ] Create `src/components/ProcessTimelineSection/` directory
- [ ] Create TimelineStep sub-component
- [ ] Implement 7 timeline steps with step number, title, description
- [ ] Implement visual timeline connector between steps
- [ ] Implement responsive layouts:
  - [ ] Mobile: Vertical timeline
  - [ ] Tablet: Vertical timeline with larger spacing
  - [ ] Desktop: Alternating left/right layout
- [ ] Write unit tests
- [ ] Verify responsive behavior at all breakpoints

## Phase 4: Navigation and Routing

### 4.1 Implement Smooth Scroll Navigation
- [ ] Update NavigationMenu component for ChaoNgheuPage
- [ ] Add navigation items for all 14 sections
- [ ] Implement smooth scroll to section on link click
- [ ] Implement scroll spy with IntersectionObserver
- [ ] Highlight active section in navigation
- [ ] Implement fixed header with backdrop blur
- [ ] Write unit tests for scroll behavior
- [ ] Write integration tests for navigation flow

### 4.2 Implement Mobile Navigation Menu
- [ ] Add hamburger menu icon for mobile viewport
- [ ] Implement mobile menu drawer with slide animation
- [ ] Implement menu open/close state management
- [ ] Close menu after link click and scroll to section
- [ ] Implement keyboard support (Escape to close)
- [ ] Prevent body scroll when menu is open
- [ ] Write unit tests for mobile menu behavior
- [ ] Verify accessibility (focus trap, ARIA attributes)

### 4.3 Implement Skip Navigation Link
- [ ] Add skip navigation link at top of page
- [ ] Make it visible on keyboard focus
- [ ] Link to main content area
- [ ] Write unit tests
- [ ] Verify keyboard navigation

## Phase 5: Responsive Design Implementation

### 5.1 Implement Mobile Styles (< 768px)
- [ ] Apply mobile-specific styles to all sections
- [ ] Test font size scaling
- [ ] Test spacing and padding
- [ ] Test grid layouts (1 column)
- [ ] Test navigation menu (hamburger)
- [ ] Test form layout (full-width fields)
- [ ] Test timeline (vertical layout)
- [ ] Manual testing on real mobile devices (iOS, Android)

### 5.2 Implement Tablet Styles (768px - 1023px)
- [ ] Apply tablet-specific styles to all sections
- [ ] Test font size scaling
- [ ] Test spacing and padding
- [ ] Test grid layouts (2 columns)
- [ ] Test navigation menu (horizontal with reduced spacing)
- [ ] Manual testing on real tablet devices

### 5.3 Implement Desktop Styles (≥ 1024px)
- [ ] Apply desktop-specific styles to all sections
- [ ] Test font size scaling
- [ ] Test max-width container (1200px)
- [ ] Test grid layouts (3-4 columns)
- [ ] Test timeline (alternating layout)
- [ ] Test navigation menu (full horizontal)
- [ ] Manual testing on various desktop resolutions

### 5.4 Test Device Rotation
- [ ] Test layout re-render on orientation change
- [ ] Verify no layout breaks on rotation
- [ ] Test on real devices (portrait ↔ landscape)

## Phase 6: Accessibility Implementation

### 6.1 Implement Semantic HTML
- [ ] Use proper heading hierarchy (h1, h2, h3)
- [ ] Use semantic elements (section, nav, main, footer)
- [ ] Use proper list markup (ul, ol)
- [ ] Use proper table markup for comparison table
- [ ] Verify with HTML validator

### 6.2 Implement ARIA Attributes
- [ ] Add ARIA labels to icon buttons
- [ ] Add ARIA roles to sections
- [ ] Add aria-expanded to accordion items
- [ ] Add aria-controls to accordion buttons
- [ ] Add aria-live for form submission status
- [ ] Add aria-invalid for form validation errors
- [ ] Add aria-describedby for form field errors

### 6.3 Implement Keyboard Navigation
- [ ] Verify Tab order through all interactive elements
- [ ] Implement visible focus indicators (outline, ring)
- [ ] Implement Enter/Space activation for custom buttons
- [ ] Implement Escape key to close mobile menu
- [ ] Implement arrow keys for quiz navigation (optional)
- [ ] Test complete keyboard navigation flow
- [ ] Verify no keyboard traps

### 6.4 Implement Alt Text for Images
- [ ] Add descriptive alt text to all menu item images
- [ ] Add descriptive alt text to all spice product images
- [ ] Add descriptive alt text to all decorative images (or use alt="")
- [ ] Verify alt text quality with screen reader

### 6.5 Conduct Accessibility Audit
- [ ] Run automated accessibility tests (jest-axe)
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Test color contrast ratios (minimum 4.5:1)
- [ ] Test keyboard-only navigation
- [ ] Test with browser zoom (200%, 400%)
- [ ] Document accessibility compliance (WCAG 2.1 AA)

## Phase 7: Performance Optimization

### 7.1 Implement Code Splitting
- [ ] Lazy load PartnerQuizSection
- [ ] Lazy load FAQSection
- [ ] Lazy load ProcessTimelineSection
- [ ] Lazy load RegistrationFormSection
- [ ] Add Suspense boundaries with loading fallbacks
- [ ] Verify bundle sizes (< 200KB initial, < 100KB per chunk)

### 7.2 Implement Image Optimization
- [ ] Convert images to WebP format with JPEG/PNG fallback
- [ ] Implement responsive images with srcset
- [ ] Compress all images to < 200KB
- [ ] Implement lazy loading for below-the-fold images
- [ ] Use appropriate image dimensions (no oversized images)
- [ ] Test image loading performance

### 7.3 Implement CSS Optimization
- [ ] Add CSS containment to independent sections
- [ ] Minimize use of expensive CSS properties
- [ ] Use will-change sparingly for animations
- [ ] Verify CSS bundle size (< 50KB gzipped)

### 7.4 Implement JavaScript Optimization
- [ ] Debounce scroll event listeners (if any)
- [ ] Use IntersectionObserver for scroll spy
- [ ] Memoize quiz scoring calculation
- [ ] Use React.memo for pure presentational components
- [ ] Verify JavaScript bundle size (< 500KB gzipped)

### 7.5 Conduct Performance Testing
- [ ] Run Lighthouse audit (target: 90+ performance score)
- [ ] Measure First Contentful Paint (target: < 1.8s)
- [ ] Measure Largest Contentful Paint (target: < 2.5s)
- [ ] Measure Time to Interactive (target: < 3.8s)
- [ ] Measure Cumulative Layout Shift (target: < 0.1)
- [ ] Test on 3G network simulation
- [ ] Test on real mobile devices with slow connection

## Phase 8: Testing

### 8.1 Write Unit Tests for Static Sections
- [ ] Test HeroSection rendering
- [ ] Test BrandStorySection rendering
- [ ] Test BrandIdentitySection rendering
- [ ] Test MenuSection rendering
- [ ] Test OHSpicesSection rendering
- [ ] Test FishSauceComparisonSection rendering
- [ ] Test TargetAudienceSection rendering
- [ ] Test InvestmentBenefitsSection rendering
- [ ] Test CommitmentSection rendering
- [ ] Test Footer rendering and link behavior
- [ ] Achieve 80%+ test coverage

### 8.2 Write Unit Tests for Interactive Components
- [ ] Test PartnerQuizSection question display
- [ ] Test PartnerQuizSection answer selection
- [ ] Test PartnerQuizSection validation
- [ ] Test PartnerQuizSection scoring logic
- [ ] Test PartnerQuizSection result display
- [ ] Test FAQSection accordion toggle
- [ ] Test FAQSection keyboard navigation
- [ ] Test RegistrationFormSection validation rules
- [ ] Test RegistrationFormSection submission flow
- [ ] Test RegistrationFormSection error handling
- [ ] Achieve 80%+ test coverage

### 8.3 Write Integration Tests
- [ ] Test complete quiz flow (answer all → submit → view result → retake)
- [ ] Test complete form flow (fill → validate → submit → success)
- [ ] Test navigation flow (click menu → scroll to section → highlight active)
- [ ] Test mobile menu flow (open → click link → close → scroll)
- [ ] Test responsive layout changes on viewport resize

### 8.4 Write Accessibility Tests
- [ ] Run jest-axe on all components
- [ ] Test keyboard navigation for all interactive elements
- [ ] Test focus management for modals/drawers
- [ ] Test screen reader announcements (manual)
- [ ] Verify no accessibility violations

### 8.5 Write Responsive Tests
- [ ] Test mobile viewport (375px)
- [ ] Test tablet viewport (768px)
- [ ] Test desktop viewport (1024px, 1440px)
- [ ] Test orientation change behavior
- [ ] Verify layout integrity at all breakpoints

## Phase 9: Integration and Polish

### 9.1 Integrate All Sections into ChaoNgheuPage
- [ ] Import and render all 14 sections in correct order
- [ ] Verify section spacing and padding
- [ ] Verify smooth transitions between sections
- [ ] Test complete page scroll behavior
- [ ] Test page load performance

### 9.2 Implement Brand Color Scheme
- [ ] Verify blue gradient (#2563A8 to #1E4D7B) on hero sections
- [ ] Verify yellow accent (#FDC500) on CTAs and highlights
- [ ] Verify dark blue-gray (#1B2E34) on footer
- [ ] Verify white background with gray grid pattern on content sections
- [ ] Verify color contrast ratios (≥ 4.5:1)
- [ ] Verify consistent color scheme across all components

### 9.3 Implement Form Submission Backend Integration
- [ ] Create API endpoint for form submission (or mock)
- [ ] Implement form submission logic
- [ ] Handle success response
- [ ] Handle error responses (network, server, validation)
- [ ] Test form submission with real/mock API
- [ ] Implement logging for debugging

### 9.4 Add Loading States and Transitions
- [ ] Add loading spinner for form submission
- [ ] Add loading fallbacks for lazy-loaded components
- [ ] Add smooth transitions for accordion expand/collapse
- [ ] Add smooth transitions for mobile menu slide
- [ ] Add smooth scroll behavior for navigation
- [ ] Verify all animations are smooth (60fps)

### 9.5 Cross-Browser Testing
- [ ] Test on Chrome (latest)
- [ ] Test on Firefox (latest)
- [ ] Test on Safari (latest)
- [ ] Test on Edge (latest)
- [ ] Test on Mobile Safari (iOS 13+)
- [ ] Test on Chrome Android (latest)
- [ ] Document any browser-specific issues and fixes

## Phase 10: Final Review and Deployment

### 10.1 Code Review
- [ ] Review all component code for best practices
- [ ] Review CSS for consistency and maintainability
- [ ] Review TypeScript types for correctness
- [ ] Review test coverage and quality
- [ ] Address code review feedback

### 10.2 Content Review
- [ ] Verify all Vietnamese text is correct and natural
- [ ] Verify all images are high quality and appropriate
- [ ] Verify all links work correctly
- [ ] Verify contact information is accurate
- [ ] Get stakeholder approval on content

### 10.3 Final Testing
- [ ] Run full test suite (unit + integration + accessibility)
- [ ] Run Lighthouse audit on production build
- [ ] Test on real devices (mobile, tablet, desktop)
- [ ] Test on slow network (3G simulation)
- [ ] Verify no console errors or warnings
- [ ] Verify no broken links or images

### 10.4 Documentation
- [ ] Document component API and props
- [ ] Document data structures and formats
- [ ] Document deployment process
- [ ] Document environment variables and configuration
- [ ] Create user guide for content updates (if needed)

### 10.5 Deployment
- [ ] Build production bundle
- [ ] Verify bundle sizes meet targets
- [ ] Deploy to staging environment
- [ ] Conduct final testing on staging
- [ ] Deploy to production
- [ ] Monitor for errors and performance issues
- [ ] Set up analytics tracking (optional)

---

**Total Tasks**: 150+  
**Estimated Timeline**: 4-6 weeks (1 developer)  
**Priority**: High priority tasks are in Phase 1-4 (foundation, static sections, interactive components, navigation)
