module.exports = function (wallaby) {
  return {
    // Project name for Wallaby
    name: 'Aura Spring Cleaning Tests',

    // Automatic configuration for Next.js/React project
    autoDetect: true,

    // Files to include in testing
    files: [
      'app/**/*.{ts,tsx,js,jsx}',
      'components/**/*.{ts,tsx,js,jsx}',
      'lib/**/*.{ts,tsx,js,jsx}',
      'utils/**/*.{ts,tsx,js,jsx}',
      '!**/*.test.{ts,tsx,js,jsx}',
      '!**/*.spec.{ts,tsx,js,jsx}',
      '!**/node_modules/**',
      '!**/.next/**',
      '!**/dist/**',
      '!**/build/**'
    ],

    // Test files pattern
    tests: [
      '**/*.test.{ts,tsx,js,jsx}',
      '**/*.spec.{ts,tsx,js,jsx}',
      '!**/node_modules/**',
      '!**/.next/**'
    ],

    // Environment configuration
    env: {
      type: 'node',
      runner: 'node',
      params: {
        env: 'NODE_ENV=test'
      }
    },

    // TypeScript/Babel compilation
    compilers: {
      '**/*.{ts,tsx}': wallaby.compilers.typeScript({
        module: 'commonjs',
        jsx: 'react',
        esModuleInterop: true,
        allowSyntheticDefaultImports: true
      }),
      '**/*.{js,jsx}': wallaby.compilers.babel()
    },

    // Test framework setup
    testFramework: 'jest',

    // Setup files and configurations
    setup: function (wallaby) {
      const jestConfig = require('./jest.config.js');
      wallaby.testFramework.configure(jestConfig);
    },

    // Performance and debugging settings
    runMode: 'onsave',
    trace: true,
    debug: true,
    
    // Coverage settings
    reportConsoleErrorAsError: true,
    lowCoverageThreshold: 50,

    // Hints and suggestions
    hints: {
      ignoreCoverage: /istanbul ignore/,
      testFileSelection: {
        include: /\.test\.|\.spec\./,
        exclude: /node_modules/
      }
    },

    // Worker configuration
    workers: {
      initial: 1,
      regular: 1,
      restart: true
    },

    // Display settings
    filesWithNoCoverageCalculated: [
      '**/*.config.js',
      '**/*.config.ts',
      '**/migrations/**',
      '**/scripts/**'
    ],

    // Advanced settings
    delays: {
      run: 0
    },

    maxConsoleMessagesPerTest: 100,
    maxTraceSteps: 999999,

    // Test timeout
    testTimeout: 10000
  };
};