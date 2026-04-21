const base = require('@playwright/test');

exports.customtest = base.test.extend({
  testDataForOrder: {
    username: "ashishkr403@gmail.com",
    password: "Playwright@123",
    productName: "ADIDAS ORIGINAL"
  }
});