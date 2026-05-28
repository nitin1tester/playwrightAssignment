import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 3 : 3,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 2,
  /** Global timeout */
  timeout: 30000,          // ← each test max 30 seconds
  globalTimeout: 300000,   // ← entire test suite max 300 seconds

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['allure-playwright'],
    ['playwright-html-reporter', { 
      testFolder: 'tests',
      title: 'Playwright HTML Report',
      project: 'Swag Labs',
      release: '9.87.6',
      testEnvironment: 'PROD',
      embedAssets: true,
      embedAttachments: true,
      outputFolder: 'playwright-html-report',
      minifyAssets: true,
      startServer: false,
    }]
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'https://www.saucedemo.com/',
 

    trace: 'on-first-retry',
    headless: !!process.env.CI, // false locally and true in CI
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'

  },

  metadata: {
    appUsername: "standard_user",
    appPassword: "secret_sauce"
  },

  /* Configure projects for major browsers */
  projects: [

    {
      name: 'API',
      workers: 1,
      testMatch: /.*api.*\.spec\.ts/,
    },

    // {
    //   name: 'chromium',
    //   testMatch: /.*ui.*\.spec\.ts/,
    //   use: { ...devices['Desktop Chrome'] },
    // },

    {
      name: 'firefox',
      workers: 2,
      testMatch: /.*ui.*\.spec\.ts/,
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      workers: 2,
      testMatch: /.*ui.*\.spec\.ts/,
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    {
      name: 'Google Chrome',
      workers: 2,
      testMatch: /.*ui.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        launchOptions: {
          args: ['--start-maximized'],
          ignoreDefaultArgs: ['--window-size=1280,720']
        },
      },
    },
  ],
});