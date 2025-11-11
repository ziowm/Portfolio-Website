import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Bundle analyzer - generates stats.html after build
    visualizer({
      filename: './dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    // Target modern browsers for better compatibility
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    // Enable CSS code splitting for better caching
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks for better caching
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('@tanstack/react-query')) {
              return 'react-query';
            }
            if (id.includes('react-hook-form') || id.includes('@emailjs/browser')) {
              return 'form-vendor';
            }
            if (id.includes('react-icons')) {
              return 'icons';
            }
            if (id.includes('axios')) {
              return 'axios';
            }
            // Other node_modules go to vendor chunk
            return 'vendor';
          }
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Source maps for debugging
    sourcemap: false,
  },
  // CSS configuration for better browser compatibility
  css: {
    postcss: './postcss.config.js',
  },
  // Preview server configuration for testing caching headers
  preview: {
    headers: {
      // Cache static assets for 1 year
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  },
})
