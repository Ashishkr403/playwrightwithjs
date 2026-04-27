const base = require('@playwright/test');


//yha hum apna fixture bna rhe hai customtest fixture jese ki hum (test, expect) fixture bnate hai
exports.customtest = base.test.extend({
  testDataForOrder: {
    username: "ashishkr403@gmail.com",
    password: "Playwright@123",
    productName: "ADIDAS ORIGINAL"
  }
});