const { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const playwright = require("playwright");



  Given('a login to Ecommerce2 application with {string} and {string}', async function (username, password) {
           // Write code here that turns the phrase above into concrete actions
            await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   // css and xpath
         console.log(await this.page.title());
         await this.page.locator('#username').fill(username);
         await this.page.locator("[type='password']").fill(password);
         await this.page.locator('#signInBtn').click();
         });
       

       

         Then('Verify the error message {string} is displayed', async function (errorMessage) {

    console.log("Hi Ashish " + await this.page.locator("[style*='block']").textContent());

    await expect(this.page.locator("[style*='block']")).toContainText(errorMessage);

});