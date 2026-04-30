const { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber");
const { POManager } = require("../../pageObjects/POManager");
const { dashboardPage } = require("../../pageObjects/dashboardPage");
const{ cartPage } = require("../../pageObjects/cartPage");
const { ordersReviewPage } = require("../../pageObjects/ordersReviewPage");
const { ordersHistoryPage } = require("../../pageObjects/ordersHistoryPage");
const { expect } = require("@playwright/test");
const playwright = require("playwright");



         Given('a login to Ecommerce application with {string} and {string}', async function (username, password) {
           // Write code here that turns the phrase above into concrete actions
           
            const loginPage = this.poManager.getLoginPage();
            console.log("Opening URL...");
            await loginPage.goTo();
            console.log("Logging in...");
            await loginPage.validLogin(username, password);
            console.log("Logging done");
         });

       

          When('add product to cart {string}', async function (productName) {
           // Write code here that turns the phrase above into concrete actions
           const dashboardPage = this.poManager.getDashboardPage();
            await dashboardPage.searchProductAddCart(productName);
            await dashboardPage.navigateToCart();

         });

        

          Then('Verify {string} is displayed in the cart', async function (productName) {
           // Write code here that turns the phrase above into concrete actions
            const cartPage = this.poManager.getCartPage();
            await cartPage.VerifyProductIsDisplayed(productName);
            await cartPage.Checkout();
         });
       
          When('Enter valid details and place the order', async function () {
           // Write code here that turns the phrase above into concrete actions
            const ordersReviewPage = this.poManager.getOrdersReviewPage();
            await ordersReviewPage.searchCountryAndSelect("ind", "India");
            const orderId = await ordersReviewPage.SubmitAndGetOrderId();
            console.log(orderId);
         });
       
       
         Then('Verify order in present in the orderHistory', async function () {
           // Write code here that turns the phrase above into concrete actions
             const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
             await ordersHistoryPage.searchOrderAndSelect(orderId);
             expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
         });