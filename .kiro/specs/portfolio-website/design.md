# Portfolio Website Design Document

## Overview

This document outlines the technical design for a modern, responsive portfolio website built with React and TypeScript. The website will showcase projects, integrate with the GitHub API, provide contact functionality, and deliver an exceptional user experience across all devices. The design emphasizes performance, maintainability, and professional aesthetics.

## Architecture

### Technology Stack

**Frontend Framework:**
- React 18+ with TypeScript for type safety and component-based architecture
- Vite as the build tool for fast development and optimized production builds

**Styling:**
- Tailwind CSS for utility-first styling and responsive design
- CSS modules or styled-components for component-specific styles where needed

**State Management:**
- React Context API for global state (theme, navigation)
- React Query (TanStack Query) for server state management and GitHub API caching

**Routing:**
- React Router for client-side routing (if multi-page) or smooth scroll navigation for single-page layout

**Form Handling:**
- React Hook Form for form validation and management
- EmailJS or similar service for contact form submissions

**API Integration:**
- Axios or Fetch API for GitHub API requests
- GitHub REST API v3 for fetching user and repository data

**Deployment:**
- Vercel, Netlify, or GitHub Pages for hosting
- Environment variables for API keys and configuration

### Architecture Pattern

Single Page Application (SPA) with component-based architecture:
- Modular components for reusability
- Container/Presentational component pattern
- Custom hooks for shared logic
- Lazy loading for performance optimization

## Components and Interfaces

### Component Hierarchy

```
App
├── Header (Navigation)
├── Hero (Landing Section)
├── About
├── Skills
├── Projects
│   └── ProjectCard (repeated)
├── GitHub
│   └── RepositoryCard (repeated)
├── Contact
│   └── ContactForm
└── Footer
```

### Core Components

#### 1. Header Component
```typescript
interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}
```

**Responsibilities:**
- Display navigation menu with links to sections
- Highlight active section based on scroll position
- Implement mobile hamburger menu
- Sticky positioning on scroll

#### 2. Hero Component
```typescript
interface HeroProps {
  name: string;
  title: string;
  tagline: string;
  avatarUrl: string;
  socialLinks: SocialLink[];
}

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
```

**Responsibilities:**
- Display developer name, title, and introduction
- Show professional photo/avatar
- Render social media links
- Include call-to-action buttons (View Projects, Contact)

#### 3. About Component
```typescript
interface AboutProps {
  bio: string;
  resumeUrl: string;
}
```

**Responsibilities:**
- Display detailed biography
- Provide resume download link
- Show professional highlights

#### 4. Skills Component
```typescript
interface SkillsProps {
  skillCategories: SkillCategory[];
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

interface Skill {
  name: string;
  icon: string;
  proficiency?: number;
}
```

**Responsibilities:**
- Display skills organized by category
- Render skill icons
- Show visual indicators for proficiency levels

#### 5. Projects Component
```typescript
interface ProjectsProps {
  projects: Project[];
}

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl: string;
  featured: boolean;
}
```

**Responsibilities:**
- Display featured projects in grid layout
- Render ProjectCard for each project
- Implement filtering or sorting options

#### 6. ProjectCard Component
```typescript
interface ProjectCardProps {
  project: Project;
}
```

**Responsibilities:**
- Display project thumbnail
- Show project title and description
- List technologies used
- Provide links to live demo and GitHub repo
- Implement hover effects

#### 7. GitHub Component
```typescript
interface GitHubProps {
  username: string;
}

interface GitHubProfile {
  name: string;
  bio: string;
  avatarUrl: string;
  publicRepos: number;
  followers: number;
}

interface Repository {
  id: number;
  name: string;
  description: string;
  language: string;
  stargazersCount: number;
  forksCount: number;
  htmlUrl: string;
}
```

**Responsibilities:**
- Fetch GitHub profile data
- Display pinned or featured repositories
- Show repository statistics
- Handle loading and error states

#### 8. Contact Component
```typescript
interface ContactProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
}

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
```

**Responsibilities:**
- Render contact form with validation
- Handle form submission
- Display success/error messages
- Provide alternative contact methods

#### 9. Footer Component
```typescript
interface FooterProps {
  socialLinks: SocialLink[];
  copyrightYear: number;
}
```

**Responsibilities:**
- Display copyright information
- Show social links
- Include back-to-top button

### Custom Hooks

#### useGitHub Hook
```typescript
interface UseGitHubReturn {
  profile: GitHubProfile | null;
  repositories: Repository[];
  isLoading: boolean;
  error: Error | null;
}

function useGitHub(username: string): UseGitHubReturn;
```

**Responsibilities:**
- Fetch GitHub user profile
- Fetch user repositories
- Cache API responses
- Handle rate limiting

#### useIntersectionObserver Hook
```typescript
function useIntersectionObserver(
  elementRef: RefObject<Element>,
  options?: IntersectionObserverInit
): boolean;
```

**Responsibilities:**
- Detect when elements enter viewport
- Enable lazy loading
- Trigger animations on scroll

#### useScrollSpy Hook
```typescript
function useScrollSpy(sectionIds: string[]): string;
```

**Responsibilities:**
- Track active section based on scroll position
- Update navigation highlighting

## Data Models

### Configuration Data

**portfolioData.ts:**
```typescript
interface PortfolioData {
  personal: PersonalInfo;
  about: AboutInfo;
  skills: SkillCategory[];
  projects: Project[];
  contact: ContactInfo;
}

interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  avatarUrl: string;
  githubUsername: string;
}

interface AboutInfo {
  bio: string;
  resumeUrl: string;
}

interface ContactInfo {
  email: string;
  socialLinks: SocialLink[];
}
```

This data will be stored in a TypeScript configuration file for easy updates.

### API Response Models

**GitHub API Responses:**
```typescript
interface GitHubUserResponse {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubRepoResponse {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
}
```

## Error Handling

### GitHub API Error Handling

**Rate Limiting:**
- Implement exponential backoff for rate limit errors
- Display user-friendly message when rate limit exceeded
- Cache responses to minimize API calls

**Network Errors:**
- Show fallback content when GitHub API is unavailable
- Display error message with retry option
- Log errors for debugging

**Invalid Data:**
- Validate API responses before rendering
- Provide default values for missing data
- Handle empty repository lists gracefully

### Form Validation Errors

**Client-Side Validation:**
- Validate email format using regex
- Ensure all required fields are filled
- Display inline error messages
- Disable submit button until form is valid

**Submission Errors:**
- Handle email service failures gracefully
- Display error message with alternative contact methods
- Implement retry mechanism

### Loading States

- Display skeleton loaders for GitHub data
- Show spinner for form submission
- Implement progressive loading for images
- Provide visual feedback for all async operations

## Testing Strategy

### Unit Testing

**Framework:** Vitest or Jest with React Testing Library

**Test Coverage:**
- Component rendering and props
- Custom hooks logic
- Utility functions
- Form validation logic
- API response parsing

**Example Tests:**
- ProjectCard renders with correct data
- useGitHub hook fetches and transforms data correctly
- ContactForm validates email format
- Skills component groups skills by category

### Integration Testing

**Test Scenarios:**
- Navigation scrolls to correct sections
- Contact form submission flow
- GitHub data fetching and display
- Responsive layout changes

### End-to-End Testing

**Framework:** Playwright or Cypress (optional)

**Test Scenarios:**
- Complete user journey from landing to contact
- Mobile navigation functionality
- External links open correctly
- Form submission success flow

### Performance Testing

**Metrics to Monitor:**
- Lighthouse scores (Performance, Accessibility, Best Practices, SEO)
- First Contentful Paint (FCP) < 1.5s
- Largest Contentful Paint (LCP) < 2.5s
- Time to Interactive (TTI) < 3.5s
- Cumulative Layout Shift (CLS) < 0.1

**Tools:**
- Lighthouse CI for automated performance testing
- WebPageTest for detailed performance analysis
- Bundle analyzer for identifying large dependencies

## Design System

### Color Palette

**Primary Colors:**
- Primary: Modern blue (#3B82F6) for CTAs and links
- Secondary: Accent color (#8B5CF6) for highlights
- Dark: (#1F2937) for text and dark mode backgrounds
- Light: (#F9FAFB) for backgrounds and light mode

**Semantic Colors:**
- Success: (#10B981) for success messages
- Error: (#EF4444) for error states
- Warning: (#F59E0B) for warnings
- Info: (#3B82F6) for informational messages

### Typography

**Font Families:**
- Headings: Inter or Poppins (bold, modern)
- Body: Inter or System UI (readable, professional)

**Font Scales:**
- H1: 3rem (48px) - Hero title
- H2: 2.25rem (36px) - Section titles
- H3: 1.5rem (24px) - Subsection titles
- Body: 1rem (16px) - Regular text
- Small: 0.875rem (14px) - Captions and labels

### Spacing System

Using Tailwind's spacing scale (4px base unit):
- xs: 0.5rem (8px)
- sm: 1rem (16px)
- md: 1.5rem (24px)
- lg: 2rem (32px)
- xl: 3rem (48px)
- 2xl: 4rem (64px)

### Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
- Wide: > 1280px

### Animation and Transitions

**Principles:**
- Subtle and purposeful animations
- Consistent timing functions (ease-in-out)
- Respect user's motion preferences (prefers-reduced-motion)

**Common Animations:**
- Fade in on scroll for sections
- Hover effects on cards and buttons
- Smooth scroll for navigation
- Loading skeletons for async content

## Accessibility

### WCAG 2.1 AA Compliance

**Color Contrast:**
- Minimum 4.5:1 for normal text
- Minimum 3:1 for large text
- Test all color combinations

**Keyboard Navigation:**
- All interactive elements accessible via keyboard
- Visible focus indicators
- Logical tab order
- Skip to main content link

**Screen Reader Support:**
- Semantic HTML elements
- ARIA labels where needed
- Alt text for all images
- Descriptive link text

**Responsive Text:**
- Minimum 14px font size on mobile
- Text remains readable when zoomed to 200%
- No horizontal scrolling required

## Performance Optimization

### Image Optimization

- Use WebP format with fallbacks
- Implement responsive images with srcset
- Lazy load images below the fold
- Compress images to < 200KB each
- Use CDN for image delivery

### Code Splitting

- Lazy load route components
- Split vendor bundles
- Dynamic imports for heavy components
- Tree shaking for unused code

### Caching Strategy

- Cache GitHub API responses (5-minute TTL)
- Service worker for offline support (optional)
- Browser caching for static assets
- CDN caching for global delivery

### Bundle Size

- Target < 200KB initial bundle (gzipped)
- Minimize dependencies
- Use lightweight alternatives where possible
- Analyze bundle with webpack-bundle-analyzer

## Deployment and CI/CD

### Build Process

1. Run TypeScript type checking
2. Run linting (ESLint)
3. Run unit tests
4. Build production bundle
5. Run Lighthouse CI
6. Deploy to hosting platform

### Environment Variables

```
VITE_GITHUB_USERNAME=ziowm
VITE_EMAILJS_SERVICE_ID=xxx
VITE_EMAILJS_TEMPLATE_ID=xxx
VITE_EMAILJS_PUBLIC_KEY=xxx
```

### Hosting Recommendations

**Vercel (Recommended):**
- Zero-config deployment
- Automatic HTTPS
- Global CDN
- Preview deployments for PRs

**Alternatives:**
- Netlify: Similar features to Vercel
- GitHub Pages: Free for public repos
- Cloudflare Pages: Fast global CDN

## Security Considerations

- No sensitive data in client-side code
- Environment variables for API keys
- HTTPS only
- Content Security Policy headers
- Rate limiting for contact form
- Input sanitization for form data
- CORS configuration for API requests

## Future Enhancements

- Dark mode toggle
- Blog section with MDX support
- Internationalization (i18n)
- Analytics integration (privacy-focused)
- Animated background or particles
- Project filtering by technology
- Testimonials section
- Timeline/experience section
