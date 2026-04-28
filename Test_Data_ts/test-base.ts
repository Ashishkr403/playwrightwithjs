
import { test as baseTest } from '@playwright/test';

interface TestDataForOrder
{
    username: string;
    password: string;
    productName: string;
};


//yha hum apna fixture bna rhe hai customtest fixture jese ki hum (test, expect) fixture bnate hai
export const customtest = baseTest.extend<{testDataForOrder: TestDataForOrder}>({
  testDataForOrder:  {
    username: "ashishkr403@gmail.com",
    password: "Playwright@123",
    productName: "ADIDAS ORIGINAL"
  }
});