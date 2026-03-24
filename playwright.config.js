// @ts-check
import { chromium, defineConfig, devices, expect } from '@playwright/test';
import { trace } from 'node:console';
import { report } from 'node:process';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 40*1000,
  expect : {
    timeout: 40*1000,
  },
  //reporter : 'html',

  use: {
   
    browserName : 'chromium',
    //screenshot: 'off',
    //trace: 'off'  //'retain-on-failure' is save only fail cases'on', 'off'

  },

});
module.exports = config 

