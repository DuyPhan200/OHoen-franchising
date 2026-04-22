# Design Document: Cháo Nghêu O Hoèn Redesign

## Overview

The Cháo Nghêu O Hoèn franchise website is a modern, responsive single-page application built with React and TypeScript. The website showcases franchise opportunities through 14 distinct sections, featuring interactive components (quiz, FAQ accordion, registration form), smooth scroll navigation, and comprehensive brand storytelling.

### Design Goals

- Create an immersive, conversion-focused landing page for franchise partners
- Implement responsive design across mobile (< 768px), tablet (768-1023px), and desktop (≥ 1024px) viewports
- Ensure accessibility compliance (WCAG 2.1 AA) for all interactive elements
- Optimize performance with lazy loading, code splitting, and efficient rendering
- Maintain consistent brand identity through color scheme and visual hierarchy

### Technology Stack

- **Framework**: React 18.2+ with TypeScript
- **Routing**: React Router DOM 7.14+
- **Styling**: CSS Modules for component-scoped styles
- **Build Tool**: Vite 5.0+
- **Testing**: Vitest + React Testing Library

## Architecture

### Component Hierarchy

```
App (Router)
└── ChaoNgheuPage
    ├── Header (fixed navigation)
    │   ├── Logo
    │   └── NavigationMenu
    ├── HeroSection
    │   ├── BackgroundPattern
    │   └── CTAButtons
    ├── BrandStorySection
    │   └── CoreValueCard (x3)
    ├── BrandIdentitySection
    │   └── LogoMeaningCard (x3)
    ├── MenuSection
    │   └── MenuItemCard (x2+)
    ├── OHSpicesSection
    │   └── SpiceProductCard (x4)
    ├── FishSauceComparisonSection
    │   └── ComparisonTable
    ├── TargetAudienceSection
    │   └── CriteriaListItem (multiple)
    ├── PartnerQuizSection
    │   ├── QuizQuestion (x10)
    │   ├── QuizResult
    │   └── QuizNavigation
    ├── InvestmentBenefitsSection
    │   └── BenefitCard (x4)
    ├── CommitmentSection
    │   └── CommitmentCard (multiple)
    ├── FAQSection
    │   └── AccordionItem (x5)
    ├── ProcessTimelineSection
    │   └── TimelineStep (x7)
    ├── RegistrationFormSection
    │   ├── FormField (multiple)
    │   ├── FormValidator
    │   └── SubmitButton
    └── Footer
```

### Routing Structure

```typescript
// Single-page application with hash-based section navigation
Routes:
  / → ChaoNgheuPage (default)
  
Section anchors (smooth scroll):
  #hero
  #brand-story
  #brand-identity
  #menu
  #oh-spices
  #fish-sauce
  #target-audience
  #quiz
  #investment-benefits
  #commitment
  #faq
  #process-timeline
  #registration
  #contact
```

### State Management Approach

**Local Component State** (useState):
- Quiz: current question index, selected answers, score, completion status
- Accordion: expanded item IDs (Set<string>)
- Form: field values, validation errors, submission status
- Navigation: mobile menu open/closed, active section

**No Global State Library Required**: The application is primarily presentational with isolated interactive components. Each component manages its own state independently.

### CSS Modules Organization

```
src/
├── styles/
│   ├── variables.module.css    # Brand colors, breakpoints, spacing
│   ├── mixins.module.css        # Reusable style patterns
│   └── global.css               # Reset, typography, base styles
└── components/
    └── [ComponentName]/
        ├── [ComponentName].tsx
        ├── [ComponentName].module.css
        └── [ComponentName].test.tsx
```

**CSS Variables** (variables.module.css):
```css
:root {
  /* Brand Colors */
  --color-primary-blue: #2563A8;
  --color-primary-blue-dark: #1E4D7B;
  --color-accent-yellow: #FDC500;
  --color-dark-blue-gray: #1B2E34;
  --color-white: #FFFFFF;
  --color-gray-light: #F5F5F5;
  
  /* Breakpoints */
  --breakpoint-mobile: 768px;
  --breakpoint-tablet: 1024px;
  
  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  --spacing-2xl: 4rem;
  
  /* Typography */
  --font-size-base: 16px;
  --font-size-h1: 3rem;
  --font-size-h2: 2.5rem;
  --font-size-h3: 2rem;
  --line-height-base: 1.6;
}
```

## Components and Interfaces

### Core Components

#### 1. ChaoNgheuPage

Main page component orchestrating all sections.

```typescript
interface ChaoNgheuPageProps {
  onNavigate?: (path: string) => void;
}

const ChaoNgheuPage: React.FC<ChaoNgheuPageProps> = ({ onNavigate }) => {
  // Renders all 14 sections in order
  // Manages scroll spy for navigation highlighting
};
```

#### 2. NavigationMenu

Fixed header navigation with smooth scroll and mobile hamburger menu.

```typescript
interface NavigationItem {
  id: string;
  label: string;
  href: string; // Section anchor
}

interface NavigationMenuProps {
  items: NavigationItem[];
  activeSection?: string;
  onNavigate?: (href: string) => void;
}
```

**Features**:
- Fixed positioning with backdrop blur
- Active section highlighting via IntersectionObserver
- Mobile hamburger menu with slide animation
- Keyboard navigation support (Tab, Enter, Escape)

#### 3. PartnerQuizSection

Interactive quiz component with 10 questions and scoring.

```typescript
interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

interface QuizOption {
  id: string;
  text: string;
  score: number; // Points awarded for this answer
}

interface QuizResult {
  totalScore: number;
  interpretation: string;
  recommendation: string;
}

interface PartnerQuizSectionProps {
  questions: QuizQuestion[];
  onComplete?: (result: QuizResult) => void;
}
```

**State Management**:
```typescript
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [answers, setAnswers] = useState<Map<string, string>>(new Map());
const [isComplete, setIsComplete] = useState(false);
const [result, setResult] = useState<QuizResult | null>(null);
```

**Scoring Logic**:
- Each answer has a score value (0-10 points)
- Total score range: 0-100
- Interpretation tiers:
  - 0-40: "Cần cân nhắc thêm"
  - 41-70: "Có tiềm năng phù hợp"
  - 71-100: "Rất phù hợp"

#### 4. FAQSection (Accordion)

Expandable FAQ list with smooth animations.

```typescript
interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  allowMultipleExpanded?: boolean; // Default: true
}
```

**State Management**:
```typescript
const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

const toggleItem = (id: string) => {
  setExpandedIds(prev => {
    const next = new Set(prev);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    return next;
  });
};
```

**Accessibility**:
- ARIA attributes: `aria-expanded`, `aria-controls`, `role="button"`
- Keyboard support: Enter/Space to toggle
- Focus management

#### 5. RegistrationFormSection

Multi-field form with validation and submission handling.

```typescript
interface FormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  investmentCapital: string; // Dropdown value
  notes?: string;
}

interface FormErrors {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  investmentCapital?: string;
}

interface RegistrationFormSectionProps {
  onSubmit: (data: FormData) => Promise<void>;
  investmentOptions: InvestmentOption[];
}

interface InvestmentOption {
  value: string;
  label: string;
}
```

**Validation Rules**:
```typescript
const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};
  
  // Full name: required, min 2 characters
  if (!data.fullName.trim()) {
    errors.fullName = 'Vui lòng nhập họ tên';
  } else if (data.fullName.trim().length < 2) {
    errors.fullName = 'Họ tên phải có ít nhất 2 ký tự';
  }
  
  // Phone: required, Vietnamese format (10 digits starting with 0)
  const phoneRegex = /^0\d{9}$/;
  if (!data.phoneNumber.trim()) {
    errors.phoneNumber = 'Vui lòng nhập số điện thoại';
  } else if (!phoneRegex.test(data.phoneNumber.trim())) {
    errors.phoneNumber = 'Số điện thoại không hợp lệ (10 số, bắt đầu bằng 0)';
  }
  
  // Email: required, valid format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim()) {
    errors.email = 'Vui lòng nhập email';
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = 'Email không hợp lệ';
  }
  
  // Investment capital: required
  if (!data.investmentCapital) {
    errors.investmentCapital = 'Vui lòng chọn mức vốn đầu tư';
  }
  
  return errors;
};
```

#### 6. ProcessTimelineSection

Visual timeline showing 7 franchise process steps.

```typescript
interface TimelineStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
}

interface ProcessTimelineSectionProps {
  steps: TimelineStep[];
  layout?: 'horizontal' | 'vertical' | 'alternating'; // Responsive
}
```

**Responsive Layout**:
- Mobile: Vertical timeline
- Tablet: Vertical timeline with larger spacing
- Desktop: Alternating left/right layout

#### 7. Reusable Card Components

**CoreValueCard**:
```typescript
interface CoreValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}
```

**MenuItemCard**:
```typescript
interface MenuItemCardProps {
  name: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}
```

**BenefitCard**:
```typescript
interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}
```

## Data Models

### Quiz Data Structure

```typescript
// Static quiz data (can be moved to JSON file)
const quizData: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Bạn có kinh nghiệm trong ngành F&B không?',
    options: [
      { id: 'q1-a', text: 'Có, trên 5 năm', score: 10 },
      { id: 'q1-b', text: 'Có, 1-5 năm', score: 7 },
      { id: 'q1-c', text: 'Chưa có nhưng sẵn sàng học hỏi', score: 5 },
      { id: 'q1-d', text: 'Chưa có và chưa chắc chắn', score: 2 }
    ]
  },
  // ... 9 more questions
];
```

### FAQ Data Structure

```typescript
const faqData: FAQItem[] = [
  {
    id: 'faq1',
    question: 'Vốn đầu tư ban đầu là bao nhiêu?',
    answer: 'Vốn đầu tư ban đầu dao động từ 500 triệu đến 1 tỷ đồng, tùy thuộc vào quy mô và vị trí cửa hàng.'
  },
  {
    id: 'faq2',
    question: 'Thời gian hoàn vốn dự kiến?',
    answer: 'Thời gian hoàn vốn trung bình từ 18-24 tháng, tùy thuộc vào hiệu quả vận hành và vị trí kinh doanh.'
  },
  // ... 3 more FAQs
];
```

### Investment Options Data

```typescript
const investmentOptions: InvestmentOption[] = [
  { value: '500m-700m', label: '500 - 700 triệu VNĐ' },
  { value: '700m-1b', label: '700 triệu - 1 tỷ VNĐ' },
  { value: '1b-1.5b', label: '1 - 1.5 tỷ VNĐ' },
  { value: '1.5b+', label: 'Trên 1.5 tỷ VNĐ' }
];
```

### Timeline Steps Data

```typescript
const timelineSteps: TimelineStep[] = [
  {
    id: 'step1',
    stepNumber: 1,
    title: 'Đăng ký thông tin',
    description: 'Điền form đăng ký và gửi thông tin liên hệ'
  },
  {
    id: 'step2',
    stepNumber: 2,
    title: 'Tư vấn ban đầu',
    description: 'Gặp gỡ đội ngũ tư vấn để hiểu rõ mô hình'
  },
  // ... 5 more steps
];
```

## Error Handling

### Form Submission Errors

```typescript
enum FormSubmissionError {
  NETWORK_ERROR = 'NETWORK_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  TIMEOUT = 'TIMEOUT'
}

const handleFormSubmit = async (data: FormData) => {
  try {
    setIsSubmitting(true);
    setSubmissionError(null);
    
    const response = await submitRegistration(data);
    
    if (response.ok) {
      setSubmissionSuccess(true);
      resetForm();
    } else {
      throw new Error(FormSubmissionError.SERVER_ERROR);
    }
  } catch (error) {
    if (error instanceof TypeError) {
      setSubmissionError({
        type: FormSubmissionError.NETWORK_ERROR,
        message: 'Không thể kết nối. Vui lòng kiểm tra kết nối mạng.'
      });
    } else {
      setSubmissionError({
        type: FormSubmissionError.SERVER_ERROR,
        message: 'Có lỗi xảy ra. Vui lòng thử lại sau.'
      });
    }
  } finally {
    setIsSubmitting(false);
  }
};
```

### Image Loading Errors

```typescript
const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.src = '/placeholder-image.jpg'; // Fallback image
  e.currentTarget.alt = 'Image unavailable';
};

<img 
  src={imageSrc} 
  alt={imageAlt}
  onError={handleImageError}
  loading="lazy"
/>
```

### Quiz Validation Errors

```typescript
const handleQuizSubmit = () => {
  // Validate all questions answered
  if (answers.size < questions.length) {
    setValidationError('Vui lòng trả lời tất cả câu hỏi trước khi nộp bài');
    return;
  }
  
  calculateResult();
};
```

## Testing Strategy

### Unit Testing Approach

**Component Testing** (React Testing Library):
- Render tests: Verify all sections render with correct content
- Interaction tests: Button clicks, form inputs, accordion toggles
- Validation tests: Form validation rules, quiz scoring logic
- Accessibility tests: ARIA attributes, keyboard navigation, focus management

**Example Test Cases**:

```typescript
// PartnerQuizSection.test.tsx
describe('PartnerQuizSection', () => {
  it('displays first question on mount', () => {
    render(<PartnerQuizSection questions={mockQuestions} />);
    expect(screen.getByText(mockQuestions[0].question)).toBeInTheDocument();
  });
  
  it('prevents submission when not all questions answered', () => {
    render(<PartnerQuizSection questions={mockQuestions} />);
    const submitButton = screen.getByRole('button', { name: /nộp bài/i });
    fireEvent.click(submitButton);
    expect(screen.getByText(/vui lòng trả lời tất cả câu hỏi/i)).toBeInTheDocument();
  });
  
  it('calculates correct score based on answers', () => {
    // Test scoring logic with known answers
  });
});

// FAQSection.test.tsx
describe('FAQSection', () => {
  it('expands accordion item on click', () => {
    render(<FAQSection items={mockFAQs} />);
    const question = screen.getByText(mockFAQs[0].question);
    fireEvent.click(question);
    expect(screen.getByText(mockFAQs[0].answer)).toBeVisible();
  });
  
  it('supports keyboard navigation with Enter key', () => {
    render(<FAQSection items={mockFAQs} />);
    const question = screen.getByText(mockFAQs[0].question);
    fireEvent.keyDown(question, { key: 'Enter' });
    expect(screen.getByText(mockFAQs[0].answer)).toBeVisible();
  });
});

// RegistrationFormSection.test.tsx
describe('RegistrationFormSection', () => {
  it('displays validation error for invalid email', async () => {
    render(<RegistrationFormSection onSubmit={mockSubmit} investmentOptions={mockOptions} />);
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);
    expect(await screen.findByText(/email không hợp lệ/i)).toBeInTheDocument();
  });
  
  it('disables submit button during submission', async () => {
    render(<RegistrationFormSection onSubmit={mockSubmit} investmentOptions={mockOptions} />);
    // Fill form with valid data
    const submitButton = screen.getByRole('button', { name: /gửi đăng ký/i });
    fireEvent.click(submitButton);
    expect(submitButton).toBeDisabled();
  });
});
```

### Integration Testing

**Page-Level Tests**:
- Smooth scroll navigation between sections
- Mobile menu open/close behavior
- Form submission flow (validation → submission → success/error)
- Quiz completion flow (answer questions → submit → view results → retake)

### Responsive Testing

**Viewport Testing**:
```typescript
describe('Responsive Layout', () => {
  it('displays mobile layout on small screens', () => {
    global.innerWidth = 375;
    global.dispatchEvent(new Event('resize'));
    render(<ChaoNgheuPage />);
    // Assert mobile-specific layout
  });
  
  it('displays desktop layout on large screens', () => {
    global.innerWidth = 1440;
    global.dispatchEvent(new Event('resize'));
    render(<ChaoNgheuPage />);
    // Assert desktop-specific layout
  });
});
```

### Accessibility Testing

**A11y Test Cases**:
- Color contrast ratios (minimum 4.5:1 for text)
- Keyboard navigation (Tab order, Enter/Space activation)
- Screen reader announcements (ARIA labels, roles, live regions)
- Focus indicators visibility
- Skip navigation link functionality

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

describe('Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<ChaoNgheuPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Performance Testing

**Metrics to Monitor**:
- First Contentful Paint (FCP) < 1.8s
- Largest Contentful Paint (LCP) < 2.5s
- Time to Interactive (TTI) < 3.8s
- Cumulative Layout Shift (CLS) < 0.1

**Testing Approach**:
- Lighthouse CI in build pipeline
- Manual testing with Chrome DevTools Performance tab
- Network throttling tests (3G simulation)

### Test Coverage Goals

- Unit tests: 80%+ coverage for components with logic (Quiz, Form, Accordion)
- Integration tests: All critical user flows (navigation, form submission, quiz completion)
- Accessibility tests: All interactive components
- Responsive tests: Key breakpoints (375px, 768px, 1024px, 1440px)

## Responsive Breakpoints

### Breakpoint Strategy

```css
/* Mobile First Approach */

/* Base styles: Mobile (< 768px) */
.container {
  padding: var(--spacing-sm);
  font-size: 14px;
}

/* Tablet (768px - 1023px) */
@media (min-width: 768px) {
  .container {
    padding: var(--spacing-md);
    font-size: 16px;
  }
}

/* Desktop (≥ 1024px) */
@media (min-width: 1024px) {
  .container {
    padding: var(--spacing-lg);
    max-width: 1200px;
    margin: 0 auto;
  }
}

/* Large Desktop (≥ 1440px) */
@media (min-width: 1440px) {
  .container {
    max-width: 1400px;
  }
}
```

### Component-Specific Responsive Behavior

**HeroSection**:
- Mobile: Full viewport height, stacked layout, font-size: 2rem
- Tablet: font-size: 2.5rem, adjusted padding
- Desktop: font-size: 3rem, max-width container

**Grid Layouts** (Menu, Spices, Benefits):
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3-4 columns (depending on content)

**NavigationMenu**:
- Mobile: Hamburger menu with slide-in drawer
- Tablet: Horizontal menu with reduced spacing
- Desktop: Full horizontal menu with hover effects

**ProcessTimeline**:
- Mobile: Vertical timeline with left-aligned steps
- Tablet: Vertical timeline with larger spacing
- Desktop: Alternating left/right layout or horizontal timeline

**Typography Scale**:
```css
/* Mobile */
--font-size-h1: 2rem;
--font-size-h2: 1.75rem;
--font-size-h3: 1.5rem;
--font-size-body: 14px;

/* Tablet */
@media (min-width: 768px) {
  --font-size-h1: 2.5rem;
  --font-size-h2: 2rem;
  --font-size-h3: 1.75rem;
  --font-size-body: 16px;
}

/* Desktop */
@media (min-width: 1024px) {
  --font-size-h1: 3rem;
  --font-size-h2: 2.5rem;
  --font-size-h3: 2rem;
  --font-size-body: 16px;
}
```

## Performance Optimization Strategy

### Code Splitting

```typescript
// Lazy load non-critical sections
const PartnerQuizSection = lazy(() => import('./components/PartnerQuizSection'));
const FAQSection = lazy(() => import('./components/FAQSection'));
const ProcessTimelineSection = lazy(() => import('./components/ProcessTimelineSection'));

// Critical sections loaded immediately
import HeroSection from './components/HeroSection';
import BrandStorySection from './components/BrandStorySection';
```

### Image Optimization

**Strategy**:
- Use WebP format with JPEG/PNG fallback
- Implement responsive images with `srcset`
- Lazy load images below the fold
- Compress images to < 200KB per image
- Use appropriate dimensions (no oversized images)

```typescript
<picture>
  <source srcSet="/images/menu-item.webp" type="image/webp" />
  <source srcSet="/images/menu-item.jpg" type="image/jpeg" />
  <img 
    src="/images/menu-item.jpg" 
    alt="Cháo Nghêu"
    loading="lazy"
    width="400"
    height="300"
  />
</picture>
```

### CSS Optimization

- Use CSS containment for independent sections
- Minimize CSS bundle size with tree-shaking
- Avoid expensive CSS properties (box-shadow on scroll, complex filters)
- Use `will-change` sparingly for animations

```css
.section {
  contain: layout style paint;
}

.animatedElement {
  will-change: transform;
  transition: transform 0.3s ease;
}
```

### JavaScript Optimization

- Debounce scroll event listeners
- Use IntersectionObserver for scroll spy (more efficient than scroll events)
- Memoize expensive calculations (quiz scoring)
- Use `React.memo` for pure presentational components

```typescript
// Scroll spy with IntersectionObserver
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    { threshold: 0.5 }
  );
  
  sections.forEach(section => observer.observe(section));
  
  return () => observer.disconnect();
}, []);
```

### Bundle Size Targets

- Initial bundle: < 200KB (gzipped)
- Total JavaScript: < 500KB (gzipped)
- Total CSS: < 50KB (gzipped)
- Per-route chunks: < 100KB (gzipped)

### Caching Strategy

```typescript
// Service Worker for static asset caching (optional enhancement)
// Cache-Control headers for images, CSS, JS
// CDN for static assets
```

## Implementation Notes

### Development Workflow

1. Set up project structure with CSS Modules
2. Implement static sections first (Hero, Brand Story, Menu, etc.)
3. Implement interactive components (Quiz, Accordion, Form)
4. Add responsive styles for all breakpoints
5. Implement smooth scroll navigation
6. Add accessibility features (ARIA, keyboard navigation)
7. Optimize performance (lazy loading, code splitting)
8. Write unit and integration tests
9. Conduct accessibility audit
10. Performance testing and optimization

### Browser Support

- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- Mobile Safari: iOS 13+
- Chrome Android: Last 2 versions

### Accessibility Compliance

Target: WCAG 2.1 Level AA

**Key Requirements**:
- Color contrast: 4.5:1 for normal text, 3:1 for large text
- Keyboard navigation: All interactive elements accessible via keyboard
- Screen reader support: Proper semantic HTML and ARIA attributes
- Focus indicators: Visible focus states for all interactive elements
- Skip navigation: Skip to main content link
- Form labels: All form inputs have associated labels
- Error identification: Clear error messages for form validation

### Localization Considerations

All text content is in Vietnamese. For future internationalization:
- Extract all text strings to separate language files
- Use i18n library (e.g., react-i18next)
- Support Vietnamese and English initially

---

**Design Document Version**: 1.0  
**Last Updated**: 2024  
**Status**: Ready for Implementation
