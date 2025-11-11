# Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features GitHub integration, contact form, and optimized performance.

## Features

- 🎨 Modern, responsive design with Tailwind CSS
- 🚀 Fast performance with Vite and optimized bundle splitting
- 📱 Mobile-first responsive layout
- 🔗 GitHub API integration to showcase repositories
- 📧 Contact form with EmailJS integration
- ♿ WCAG 2.1 AA accessibility compliant
- 🎭 Smooth animations and transitions
- 📊 Performance monitoring with Lighthouse

## Tech Stack

- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 4
- **State Management:** React Query (TanStack Query)
- **Form Handling:** React Hook Form
- **Email Service:** EmailJS
- **Icons:** React Icons
- **HTTP Client:** Axios

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Edit `.env` and add your configuration:
```env
# Your GitHub username
VITE_GITHUB_USERNAME=your-github-username

# EmailJS credentials (get from https://www.emailjs.com/)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GITHUB_USERNAME` | Your GitHub username for fetching repositories | Yes |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID for contact form | Yes |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID for contact form | Yes |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key for authentication | Yes |

#### Setting up EmailJS

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Add an email service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - `from_name` - Sender's name
   - `from_email` - Sender's email
   - `message` - Message content
   - `to_name` - Your name (recipient)
4. Copy your Service ID, Template ID, and Public Key to `.env`

### Development

Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Building for Production

Build the project:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Code Quality

Format code:
```bash
npm run format
```

Check formatting:
```bash
npm run format:check
```

Lint code:
```bash
npm run lint
```

### Performance Audit

Run Lighthouse audit:
```bash
npm run audit
```

This will build the project, start a preview server, and run Lighthouse analysis.

## Deployment

The project is configured for deployment on multiple platforms. Choose one based on your preference:

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com) and sign in
3. Click "New Project" and import your repository
4. Configure environment variables in the Vercel dashboard:
   - `VITE_GITHUB_USERNAME`
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
5. Deploy! Vercel will automatically detect the Vite configuration

The `vercel.json` file includes:
- Optimized caching headers for static assets
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- SPA routing configuration
- HTTPS is enabled by default

### Deploy to Netlify

1. Push your code to GitHub
2. Visit [Netlify](https://netlify.com) and sign in
3. Click "Add new site" → "Import an existing project"
4. Connect your repository
5. Configure environment variables in Netlify dashboard
6. Deploy!

The `netlify.toml` file includes:
- Build command and output directory
- SPA routing redirects
- Caching headers for assets
- Security headers
- HTTPS is enabled by default

### Deploy to GitHub Pages

1. Install the gh-pages package:
```bash
npm install --save-dev gh-pages
```

2. Add deployment scripts to `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update `vite.config.ts` with your repository name:
```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ... rest of config
})
```

4. Deploy:
```bash
npm run deploy
```

5. Enable GitHub Pages in repository settings (use gh-pages branch)

### Environment Variables in Production

Make sure to set all required environment variables in your hosting platform:

**Vercel:**
- Go to Project Settings → Environment Variables
- Add each variable with its value
- Redeploy to apply changes

**Netlify:**
- Go to Site Settings → Environment Variables
- Add each variable with its value
- Trigger a new deploy

**GitHub Pages:**
- Use GitHub Secrets for sensitive data
- Configure GitHub Actions workflow to inject variables during build

### Custom Domain

Both Vercel and Netlify support custom domains:

1. Add your domain in the platform's dashboard
2. Update your DNS records as instructed
3. SSL certificates are automatically provisioned

## CI/CD

The project includes GitHub Actions workflows for continuous integration and deployment.

### Workflows

#### CI Workflow (`.github/workflows/ci.yml`)

Runs on every push and pull request to `main` and `develop` branches:

- ✅ Code formatting check
- ✅ Linting
- ✅ Type checking
- ✅ Build verification
- ✅ Lighthouse performance audit (on PRs)
- ✅ Tests on Node.js 18.x and 20.x

#### Deploy Preview Workflow (`.github/workflows/deploy-preview.yml`)

Automatically deploys preview builds for pull requests:

- 🚀 Builds the project
- 🌐 Deploys to Vercel preview environment
- 💬 Comments on PR with preview URL

### Setting Up CI/CD

#### Required GitHub Secrets

Add these secrets in your GitHub repository settings (Settings → Secrets and variables → Actions):

**For Build:**
- `VITE_GITHUB_USERNAME` - Your GitHub username
- `VITE_EMAILJS_SERVICE_ID` - EmailJS service ID
- `VITE_EMAILJS_TEMPLATE_ID` - EmailJS template ID
- `VITE_EMAILJS_PUBLIC_KEY` - EmailJS public key

**For Vercel Deployment (optional):**
- `VERCEL_TOKEN` - Vercel authentication token
- `VERCEL_ORG_ID` - Your Vercel organization ID
- `VERCEL_PROJECT_ID` - Your Vercel project ID

**For Lighthouse CI (optional):**
- `LHCI_GITHUB_APP_TOKEN` - Lighthouse CI GitHub app token

#### Vercel Integration (Recommended)

Instead of using the deploy workflow, you can use Vercel's built-in GitHub integration:

1. Connect your repository in Vercel dashboard
2. Vercel will automatically:
   - Deploy on every push to main
   - Create preview deployments for PRs
   - Run build checks
   - Provide deployment status in PRs

#### Netlify Integration

Similar to Vercel, Netlify offers built-in GitHub integration:

1. Connect your repository in Netlify dashboard
2. Configure build settings (already in `netlify.toml`)
3. Automatic deployments on push and PR previews

### Lighthouse CI

The project includes Lighthouse CI configuration (`lighthouserc.js`) for automated performance testing:

- Runs on pull requests
- Tests performance, accessibility, best practices, and SEO
- Minimum score thresholds:
  - Performance: 90%
  - Accessibility: 90%
  - Best Practices: 90%
  - SEO: 90%

### Build Status Badge

Add a build status badge to your README:

```markdown
![CI](https://github.com/your-username/your-repo/workflows/CI/badge.svg)
```

## Customization

### Personal Information

Edit `src/data/portfolioData.ts` to update:
- Personal information (name, title, tagline)
- About section
- Skills and categories
- Featured projects
- Contact information and social links

### Styling

The project uses Tailwind CSS. Customize the theme in `tailwind.config.js`:
- Colors
- Fonts
- Spacing
- Breakpoints

### Images

Place your images in the `public` folder:
- `/avatar.jpg` - Your profile photo
- `/resume.pdf` - Your resume
- `/projects/*.jpg` - Project screenshots

## Project Structure

```
portfolio-website/
├── .github/
│   └── workflows/          # GitHub Actions CI/CD workflows
├── public/                 # Static assets
│   ├── avatar.jpg         # Your profile photo
│   ├── resume.pdf         # Your resume
│   └── projects/          # Project screenshots
├── src/
│   ├── components/        # React components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── GitHub.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── hooks/            # Custom React hooks
│   │   ├── useGitHub.ts
│   │   ├── useScrollSpy.ts
│   │   └── useIntersectionObserver.ts
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   │   ├── emailService.ts
│   │   └── smoothScroll.ts
│   ├── data/             # Configuration data
│   │   └── portfolioData.ts
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
├── .env.example          # Environment variables template
├── vercel.json           # Vercel deployment config
├── netlify.toml          # Netlify deployment config
├── lighthouserc.js       # Lighthouse CI config
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── package.json          # Dependencies and scripts
```

## Contributing

This is a personal portfolio project, but feel free to fork it and customize it for your own use!

## License

MIT License - feel free to use this project as a template for your own portfolio.

## Acknowledgments

- Built with [React](https://react.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Powered by [Vite](https://vitejs.dev/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
