const {test, expect}= require("@playwright/test");

test("practice test", async({page}) => {

await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
await expect(page.locator("#displayed-text")).toBeVisible();
await page.locator("#hide-textbox").click();
await expect(page.locator("#displayed-text")).toBeHidden();
// ✅ Handle alert (Confirm box)
    page.on('dialog', async (dialog) => {
        console.log(dialog.message());  // print alert message
        await dialog.accept();          // click OK
    });
   
    await page.locator("#confirmbtn").click();
    await page.pause();

});