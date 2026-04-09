# Implementation Plan: Franchise Page

## Overview

This implementation plan breaks down the Franchise page feature into discrete coding tasks. The page will feature a sticky header with navigation and a hero section with a centered title. The implementation will reuse existing components (Logo, NavigationMenu, CTAButtons, HeroImage, MobileMenuToggle) and create new components (FranchisePage, Header, FranchiseHeroSection) to match the design from https://bunmee.co/franchise.

## Tasks

- [x] 1. Set up component structure and type definitions
  - Create FranchisePage, Header, and FranchiseHeroSection component directories
  - Add TypeScript interfaces to src/types/index.ts for HeaderProps, FranchisePageProps, and FranchiseHeroSectionProps
  - Create index.ts barrel exports for each new component
  - _Requirements: 11.1, 11.2_

- [ ] 2. Implement Header component with sticky positioning
  - [x] 2.1 Create Header component with three-section layout
    - Implement Header.tsx with left (Logo), center (NavigationMenu), and right (CTAButtons + MobileMenuToggle) sections
    - Use flexbox layout with justify-content: space-between
    - Accept onNavigate and activePath props
    - _Requirements: 1.1, 1.2, 1.5_
  
  - [x] 2.2 Implement sticky positioning and scroll shadow
    - Apply position: sticky with top: 0 and z-index: 100
    - Add useHeaderScroll hook to detect scroll position
    - Apply box-shadow when scrolled past top
    - Use passive scroll listener for performance
    - _Requirements: 1.3_
  
  - [x] 2.3 Style Header component with CSS Modules
    - Create Header.module.css with white background
    - Implement responsive padding (2rem desktop, 1rem mobile)
    - Add smooth shadow transition
    - _Requirements: 1.2, 1.5_
  
  - [ ]* 2.4 Write unit tests for Header component
    - Test sticky positioning class application
    - Test three-section layout rendering
    - Test scroll shadow behavior
    - Test responsive padding adjustments
    - _Requirements: 1.1, 1.2, 1.3_

- [ ] 3. Enhance NavigationMenu with active state support
  - [x] 3.1 Update NavigationMenu to accept activePath prop
    - Modify NavigationMenu.tsx interface to include optional activePath prop
    - Apply active class to menu item matching activePath
    - Pass activePath="/franchise" from Header component
    - _Requirements: 3.6_
  
  - [x] 3.2 Add active state styling to NavigationMenu
    - Update NavigationMenu.module.css with .active class
    - Set active link color to red (#DC2626)
    - Ensure hover state works with active state
    - _Requirements: 3.6, 3.7_
  
  - [ ]* 3.3 Write unit tests for active state
    - Test active class application when activePath matches
    - Test red color styling for active link
    - Test that only one link has active state
    - _Requirements: 3.6_

- [ ] 4. Implement FranchiseHeroSection component
  - [x] 4.1 Create FranchiseHeroSection with image and title
    - Implement FranchiseHeroSection.tsx with HeroImage and title overlay
    - Use relative positioning for container, absolute for image
    - Center title both horizontally and vertically with flexbox
    - Accept imageSrc, imageAlt, and optional title props (default: "FRANCHISE")
    - _Requirements: 6.1, 6.5, 6.6_
  
  - [x] 4.2 Style hero section with responsive heights
    - Create FranchiseHeroSection.module.css
    - Set min-height: 500px for desktop (≥1024px)
    - Set min-height: 300px for mobile (<1024px)
    - Apply background-size: cover, background-position: center
    - _Requirements: 6.2, 6.4, 8.4_
  
  - [x] 4.3 Style hero title with typography and shadow
    - Use clamp() for responsive font sizing (2rem to 6rem)
    - Apply white color (#FFFFFF) with extra bold weight
    - Add text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5)
    - Use letter-spacing: 0.1em for visual impact
    - _Requirements: 6.6, 6.7, 6.8, 6.9_
  
  - [ ]* 4.4 Write unit tests for FranchiseHeroSection
    - Test image rendering with correct src and alt
    - Test title rendering with default and custom text
    - Test responsive min-height application
    - Test title styling (color, font-size, shadow)
    - _Requirements: 6.1, 6.2, 6.5, 6.6_

- [x] 5. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Implement FranchisePage main component
  - [x] 6.1 Create FranchisePage component structure
    - Implement FranchisePage.tsx with Header and FranchiseHeroSection
    - Accept heroImageSrc, heroImageAlt, and onNavigate props
    - Use vertical flexbox layout (flex-direction: column)
    - Pass activePath="/franchise" to Header
    - _Requirements: 11.3, 11.4_
  
  - [x] 6.2 Style FranchisePage with CSS Modules
    - Create FranchisePage.module.css
    - Set min-height: 100vh for full viewport coverage
    - Ensure no layout shift between header and hero section
    - _Requirements: 11.2_
  
  - [ ]* 6.3 Write unit tests for FranchisePage
    - Test Header and FranchiseHeroSection rendering
    - Test prop passing to child components
    - Test onNavigate callback propagation
    - Test activePath="/franchise" passed to Header
    - _Requirements: 11.3_

- [ ] 7. Implement responsive behavior
  - [x] 7.1 Add responsive styles for desktop layout
    - Show Logo, NavigationMenu, CTAButtons, and MobileMenuToggle in Header
    - Set hero min-height to max(500px, 60vh)
    - Use clamp(4rem, 8vw, 6rem) for title font size
    - _Requirements: 7.1, 7.2, 7.3_
  
  - [x] 7.2 Add responsive styles for mobile/tablet layout
    - Hide NavigationMenu when viewport < 1024px
    - Hide CTAButtons when viewport < 1024px
    - Show only Logo and MobileMenuToggle in Header
    - Set hero min-height to 300px
    - Use clamp(2rem, 6vw, 3rem) for title font size
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_
  
  - [ ]* 7.3 Write integration tests for responsive behavior
    - Test layout at 320px, 768px, 1024px, and 1920px viewports
    - Test NavigationMenu visibility at breakpoints
    - Test CTAButtons visibility at breakpoints
    - Test hero section height adjustments
    - Test title font size scaling
    - _Requirements: 7.1, 7.2, 8.1, 8.2, 8.4, 8.5_

- [ ] 8. Implement accessibility features
  - [x] 8.1 Add semantic HTML and ARIA attributes
    - Use <header role="banner"> for Header component
    - Use <nav role="navigation"> in NavigationMenu
    - Ensure Logo has descriptive alt text
    - Add aria-label to MobileMenuToggle
    - Use <section role="main"> for hero section
    - _Requirements: 9.1, 9.2, 9.5, 9.6_
  
  - [x] 8.2 Implement keyboard navigation support
    - Ensure all navigation links are keyboard accessible
    - Ensure CTA buttons are keyboard accessible
    - Add visible focus indicators (2px solid outline)
    - Test Tab order follows logical flow
    - _Requirements: 9.3, 9.4, 9.7_
  
  - [ ]* 8.3 Write accessibility tests
    - Test semantic HTML structure with testing-library
    - Test keyboard navigation with Tab and Enter keys
    - Test focus indicators visibility
    - Run axe-core accessibility audit
    - _Requirements: 9.1, 9.3, 9.4, 9.7_

- [ ] 9. Verify color contrast requirements
  - [x] 9.1 Verify navigation and button contrast ratios
    - Verify gray-black (#1F2937) on white meets 4.5:1 ratio
    - Verify red (#DC2626) on white meets 4.5:1 ratio
    - Verify white on red (#DC2626) meets 4.5:1 ratio
    - Verify hamburger icon red on white is clearly visible
    - _Requirements: 10.1, 10.2, 10.3, 10.5_
  
  - [x] 9.2 Verify hero title contrast with shadow
    - Test white title text visibility against various background images
    - Ensure text-shadow provides sufficient contrast
    - Adjust shadow if needed for readability
    - _Requirements: 10.4_

- [x] 10. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 11. Integration and routing setup
  - [x] 11.1 Wire FranchisePage into application routing
    - Add /franchise route to routing configuration
    - Pass heroImageSrc and heroImageAlt props
    - Connect onNavigate callback to router navigation
    - _Requirements: 11.6_
  
  - [x] 11.2 Test navigation flows
    - Test Logo click navigates to homepage
    - Test FRANCHISE link stays on current page
    - Test other navigation links navigate to correct pages
    - Test CTA buttons navigate to order pages
    - _Requirements: 2.3, 3.9, 4.7, 4.8_
  
  - [ ]* 11.3 Write integration tests for navigation
    - Test full page navigation flow
    - Test active state persists during interactions
    - Test browser back/forward buttons work correctly
    - _Requirements: 2.3, 3.9, 4.7, 4.8_

- [x] 12. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Reuse existing components (Logo, NavigationMenu, CTAButtons, HeroImage, MobileMenuToggle) for consistency
- New components (FranchisePage, Header, FranchiseHeroSection) follow existing architecture patterns
- All viewport sizes from 320px to 1920px are supported
