module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run preview',
      startServerReadyPattern: 'Local:',
      url: ['http://localhost:4173'],
      numberOfRuns: 3,
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        // Allow larger bundle for feature-rich portfolio
        'resource-summary:script:size': ['warn', { maxNumericValue: 250000 }],
        // Relax some rules for third-party integrations
        'unused-javascript': 'off',
        'uses-long-cache-ttl': 'warn',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
