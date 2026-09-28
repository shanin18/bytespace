import { defineConfig, devices } from '@playwright/test';
const port = process.env.PLAYWRIGHT_PORT || '3000';
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  timeout: 45000,
  expect: { timeout: 12000 },
  use: {
    baseURL: `http://localhost:${port}`,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    launchOptions: process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {},
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `npm run start -- --port ${port}`,
    url: `http://localhost:${port}`,
    reuseExistingServer: true,
    timeout: 60000,
  },
});
