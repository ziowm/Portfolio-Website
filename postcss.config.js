export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {
      // Target browsers for vendor prefixes
      overrideBrowserslist: [
        'last 2 Chrome versions',
        'last 2 Firefox versions',
        'last 2 Safari versions',
        'last 2 Edge versions',
        'iOS >= 12',
        'Android >= 6',
      ],
      // Add prefixes for flexbox, grid, and other modern CSS features
      flexbox: 'no-2009',
      grid: 'autoplace',
    },
  },
}
