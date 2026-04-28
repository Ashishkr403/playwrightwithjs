import { test, expect } from '@playwright/test';
import { customtest } from '../Test_Data_ts/test-base';
import { POManager } from '../pageobjects_ts/POManager';

// Direct JSON import (clean way)
const dataset = require('../Test_Data/placeorderTest_Data.json');

for (const data of dataset) {

  test(`Client App login for ${data.productName}`, async ({ page }) => {

    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");

    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);

    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);

    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
  });
}


// 🔥 Custom fixture test
customtest.only(`Client App login`, async ({ page, testDataForOrder }) => {

  const poManager = new POManager(page);

  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(testDataForOrder.productName);
  await dashboardPage.navigateToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
  await cartPage.Checkout();

  const ordersReviewPage = poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("ind", "India");

  const orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(orderId);

  const ordersHistoryPage = poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(orderId);

  expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});