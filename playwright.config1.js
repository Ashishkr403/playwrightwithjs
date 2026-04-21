const { defineConfig, devices } = require('@playwright/test');
const { on } = require('node:cluster');

module.exports = defineConfig({
  testDir: './tests',
  retries: 2,

  timeout: 40 * 1000,

  expect: {
    timeout: 40 * 1000,
  },

  // reporter: 'html',

  projects: [   // ✅ correct key (projects)
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: on,
        trace: on,  // for log generation
        video: 'retain-on-failure',
        ignoreHTTPSErrors: true,
        permissions: ['geolocation'],
        //...devices['Galaxy S24 landscape']  // mobile app testing
      },
    },

    {
      name: 'Chrome',
      use: {
        browserName: 'chromium',
        viewport : {width:720, height:720},  // this help to check that the website is responsive or not -- you can change width and height
        headless: false,
      },
    },
  ],
});

//npx playwright test tests/ClientApp_Rahul.spec.js --headed --config playwright.config1.js --project=safari

// above cli is for custom run