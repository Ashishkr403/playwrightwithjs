import { expect, test } from '@playwright/test';
test('Browser Context Playwright Test', async ({browser})=>
{
   const context = await browser.newContext();
   const page = await context.newPage();
   const userName = page.locator('#username');
   const signIn = page.locator('#signInBtn');
   const cardTitles = page.locator(".card-body a");
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   // css and xpath
   await page.locator('#username').fill("rahulshettyacademyashish");
   await page.locator("[type='password']").fill("Learning@830$3mK2");
   await page.locator('#signInBtn').click();
   console.log("Hi Ashish "+await page.locator("[style*='block']").textContent());
   await userName.fill("");
   await userName.fill("rahulshettyacademy");
   await signIn.click();
   console.log(await page.locator(".card-body a").first().textContent());
   console.log(await cardTitles.nth(1).textContent());
   const allTitles = await cardTitles.allTextContents();
   console.log(allTitles);

})
   test.only('UI Controls', async ({page})=>
   {
 await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName =  page.locator("#username");
    const password = page.locator("#password");
    const SignIn = page.locator("#signInBtn");
    const dropDown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents-request']");
    await dropDown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class","blinkingText");





    //await page.pause();




   }
   );
/* test('page Context playwright Test', async ({page})=>
{
   //const context = await browser.newContext();
   //const page = await context.newPage();
   await page.goto("https://google.com");
   //get title - assertion
   console.log(await page.title());
   await expect(page).toHaveTitle("Google");
} 
   );
*/
