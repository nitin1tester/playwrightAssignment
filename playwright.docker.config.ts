import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 10,
  timeout: 30000,

  reporter: [
    ['html'],
    ['list'],
    ['allure-playwright'],
    ['playwright-html-reporter', { 
      testFolder: 'tests',
      title: 'Swag Labs Docker Report',
      project: 'Swag Labs - Docker',
      release: '9.87.6',
      testEnvironment: 'DOCKER',
      embedAssets: true,
      embedAttachments: true,
      outputFolder: 'playwright-html-report-docker',
      minifyAssets: true,
      startServer: false,
    }]
  ],
  
  use: {
    trace: 'on-first-retry',
    headless: true,
    screenshot: 'on',
    video: 'on',
    baseURL: 'https://www.saucedemo.com/',

    httpCredentials: {
      username: 'admin',
      password: 'admin'
    },

    // Dynamic WebSocket endpoint - reads from environment variable
    connectOptions: {
      wsEndpoint: process.env.PLAYWRIGHT_SERVER_URL || 'ws://localhost:3000',
    },
  },

  metadata: {
    appUsername: 'standard_user',
    appPassword: 'secret_sauce'
  },

  projects: [
    {
      name: 'chromium-docker',
      use: {
        ...devices['Desktop Chrome'],
      }
    },

    {
      name: 'firefox-docker',
      use: {
        ...devices['Desktop Firefox'],
      }
    },

    {
      name: 'webkit-docker',
      use: {
        ...devices['Desktop Safari'],
      }
    },
  ],
});