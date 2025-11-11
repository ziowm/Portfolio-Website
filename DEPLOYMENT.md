# Deployment Guide

This guide provides detailed instructions for deploying your portfolio website to various hosting platforms.

## Prerequisites

Before deploying, ensure you have:

1. ✅ Completed all environment variable setup
2. ✅ Tested the build locally (`npm run build && npm run preview`)
3. ✅ Committed all changes to Git
4. ✅ Pushed your code to GitHub

## Quick Start

### Option 1: Vercel (Recommended)

**Why Vercel?**
- Zero configuration
- Automatic HTTPS
- Global CDN
- Instant preview deployments
- Built-in analytics

**Steps:**

1. Visit [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project"
3. Import your repository
4. Configure environment variables:
   ```
   VITE_GITHUB_USERNAME=your-username
   VITE_EMAILJS_SERVICE_ID=your-service-id
   VITE_EMAILJS_TEMPLATE_ID=your-template-id
   VITE_EMAILJS_PUBLIC_KEY=your-public-key
   ```
5. Click "Deploy"

That's it! Vercel will automatically:
- Detect Vite configuration
- Build your project
- Deploy to a production URL
- Set up preview deployments for PRs

### Option 2: Netlify

**Why Netlify?**
- Simple deployment
- Form handling
- Split testing
- Serverless functions support

**Steps:**

1. Visit [netlify.com](https://netlify.com) and sign in
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select your repository
4. Build settings are auto-detected from `netlify.toml`
5. Add environment variables in Site Settings → Environment Variables
6. Click "Deploy site"

### Option 3: GitHub Pages

**Why GitHub Pages?**
- Free for public repositories
- Simple setup
- Good for static sites

**Steps:**

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json`:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. Update `vite.config.ts`:
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

5. Enable GitHub Pages:
   - Go to repository Settings → Pages
   - Select `gh-pages` branch
   - Save

**Note:** Environment variables need to be handled differently for GitHub Pages since it's a static host. Consider using GitHub Actions to inject them during build.

## Environment Variables Setup

### Vercel

1. Go to your project dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable:
   - Variable name: `VITE_GITHUB_USERNAME`
   - Value: `your-username`
   - Environment: Production, Preview, Development
4. Repeat for all variables
5. Redeploy to apply changes

### Netlify

1. Go to Site Settings → Environment Variables
2. Click "Add a variable"
3. Enter key and value
4. Click "Create variable"
5. Trigger a new deploy from Deploys tab

### GitHub Actions

Add secrets in repository settings:

1. Go to Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add each secret:
   - `VITE_GITHUB_USERNAME`
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`

## Custom Domain Setup

### Vercel

1. Go to Project Settings → Domains
2. Add your domain (e.g., `yourname.com`)
3. Follow DNS configuration instructions:
   - Add A record pointing to Vercel's IP
   - Or add CNAME record pointing to your Vercel URL
4. Wait for DNS propagation (can take up to 48 hours)
5. SSL certificate is automatically provisioned

### Netlify

1. Go to Site Settings → Domain Management
2. Click "Add custom domain"
3. Enter your domain
4. Configure DNS:
   - Add A record: `75.2.60.5`
   - Or add CNAME to your Netlify subdomain
5. Enable HTTPS in Domain Settings

### GitHub Pages

1. Add a `CNAME` file to the `public` folder:
   ```
   yourname.com
   ```
2. Configure DNS with your domain provider:
   - Add A records pointing to GitHub's IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
3. Enable HTTPS in repository settings

## CI/CD Setup

### GitHub Actions

The project includes two workflows:

#### 1. CI Workflow

Automatically runs on push and PR:
- Code quality checks
- Build verification
- Lighthouse audit

**No setup required** - works out of the box once you add secrets.

#### 2. Deploy Preview Workflow

Creates preview deployments for PRs.

**Setup:**

1. Get Vercel token:
   - Go to Vercel Account Settings → Tokens
   - Create a new token
   - Add as `VERCEL_TOKEN` secret in GitHub

2. Get Vercel IDs:
   ```bash
   npm i -g vercel
   vercel login
   vercel link
   ```
   - Copy `.vercel/project.json` values
   - Add `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` as GitHub secrets

3. Push a PR to test

### Vercel Git Integration (Recommended)

Instead of GitHub Actions, use Vercel's built-in integration:

1. In Vercel dashboard, your project is already connected to GitHub
2. Automatic deployments happen on:
   - Push to main → Production deployment
   - Push to PR → Preview deployment
3. Deployment status appears in GitHub PRs
4. No additional configuration needed

### Netlify Git Integration

Similar to Vercel:

1. Connect repository in Netlify
2. Automatic deployments on push
3. Preview deployments for PRs
4. Build status in GitHub

## Monitoring and Analytics

### Vercel Analytics

1. Go to your project dashboard
2. Navigate to Analytics tab
3. Enable Web Analytics
4. Add to your site:
   ```typescript
   import { Analytics } from '@vercel/analytics/react';
   
   function App() {
     return (
       <>
         <YourApp />
         <Analytics />
       </>
     );
   }
   ```

### Netlify Analytics

1. Go to Site Settings → Analytics
2. Enable Netlify Analytics (paid feature)
3. View traffic and performance data

### Google Analytics (Free)

1. Create a Google Analytics account
2. Get your tracking ID
3. Add to `index.html`:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

## Performance Optimization

### Before Deployment

1. Run build and check bundle size:
   ```bash
   npm run build
   ```
   - Check `dist/stats.html` for bundle analysis
   - Ensure gzipped bundle < 200KB

2. Run Lighthouse audit:
   ```bash
   npm run audit
   ```
   - Aim for scores > 90 in all categories

3. Test preview build:
   ```bash
   npm run preview
   ```
   - Test all functionality
   - Check console for errors

### After Deployment

1. Run Lighthouse on production URL
2. Check Core Web Vitals in Google Search Console
3. Monitor error logs in hosting platform
4. Set up uptime monitoring (e.g., UptimeRobot)

## Troubleshooting

### Build Fails

**Issue:** Build fails with environment variable errors

**Solution:**
- Verify all environment variables are set in hosting platform
- Check variable names match exactly (case-sensitive)
- Ensure no trailing spaces in values

**Issue:** TypeScript errors during build

**Solution:**
```bash
npm run build
```
Fix any type errors locally first.

### Deployment Issues

**Issue:** Site shows 404 or blank page

**Solution:**
- Check build output directory is `dist`
- Verify `vercel.json` or `netlify.toml` configuration
- Check browser console for errors

**Issue:** Environment variables not working

**Solution:**
- Ensure variables start with `VITE_` prefix
- Redeploy after adding variables
- Check variables are set for correct environment (production/preview)

### Performance Issues

**Issue:** Slow load times

**Solution:**
- Check bundle size in `dist/stats.html`
- Optimize images (use WebP format)
- Enable CDN caching
- Check Lighthouse report for specific issues

**Issue:** GitHub API rate limiting

**Solution:**
- Implement caching (already configured with React Query)
- Consider using GitHub personal access token
- Add fallback content for when API fails

## Security Checklist

Before going live:

- [ ] All environment variables are set correctly
- [ ] No sensitive data in source code
- [ ] HTTPS is enabled
- [ ] Security headers are configured (in `vercel.json`/`netlify.toml`)
- [ ] Dependencies are up to date (`npm audit`)
- [ ] Contact form has rate limiting (via EmailJS)
- [ ] CSP headers are configured (optional)

## Post-Deployment

1. **Test everything:**
   - Navigation
   - Contact form
   - GitHub integration
   - Responsive design
   - All links

2. **Set up monitoring:**
   - Uptime monitoring
   - Error tracking (Sentry)
   - Analytics

3. **Share your portfolio:**
   - Add to LinkedIn
   - Include in resume
   - Share on social media

4. **Keep it updated:**
   - Add new projects regularly
   - Update skills as you learn
   - Keep dependencies updated

## Support

If you encounter issues:

1. Check hosting platform documentation:
   - [Vercel Docs](https://vercel.com/docs)
   - [Netlify Docs](https://docs.netlify.com)
   - [GitHub Pages Docs](https://docs.github.com/pages)

2. Review build logs in hosting dashboard

3. Check GitHub Actions logs for CI/CD issues

4. Verify environment variables are set correctly

## Next Steps

After successful deployment:

1. Set up a custom domain
2. Enable analytics
3. Configure error monitoring
4. Set up automated backups
5. Create a maintenance schedule
6. Plan content updates

Happy deploying! 🚀
