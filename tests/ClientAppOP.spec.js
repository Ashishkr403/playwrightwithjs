import { expect, test } from '@playwright/test';

const { POManager } = require('../pageobjects/POManager');

test('Browser Context Playwright Test', async ({page})=>
{

   const poManager = new POManager(page);
   const username = "ashishkr403@gmail.com";
   const password = "Playwright@123";
   const productName = "ZARA COAT 3"
   const products = page.locator(".card-body");
   //const loginPage = new LoginPage(page);
   
   const loginPage = poManager.getLoginPage();
   await loginPage.goTo();
   await loginPage.validLogin(username, password);
   const dashboardPage = poManager.getDashboardPage();
   await dashboardPage.searchProductAddCart(productName);
   await dashboardPage.navigateToCart();  
   
   //await page.waitForLoadState('networkidle');
    // await page.locator(".card-body b").first().waitFor();
   //const allTitels = await page.locator(".card-body b").allTextContents();
   //console.log(allTitels);
   const count = await products.count();
   for(let i=0; i< count; ++i)
   {
      const title = await products.nth(i).locator("b").textContent();
      console.log("title: " + title);

      if(title?.trim() === productName)

         {
         //add to cart
         await products.nth(i).locator("text= Add to Cart").click();
         break;
         }
         
   }

   await page.waitForLoadState('networkidle');
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   //expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click();
   await page.locator("select.input.ddl").nth(0).selectOption("08");
   await page.locator("select.input.ddl").nth(1).selectOption("26");
   await page.locator("input.input.txt").nth(3).fill("123");        // CVV
   //await page.locator("input.input.txt").nth(2).fill("Ashish");     // Name
   //await page.getByRole('button', { name: 'Login' }).click();
   //await page.getByLabel('CVV Code ?').fill("403");
   //console.log("Count of CVV Code input: " + await page.getByLabel("CVV Code ?").count());



   //await page.locator("[placeholder*='Country']").pressSequentially("ind");
   await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
   const dropDown = page.locator(".ta-results");
   await dropDown.waitFor();
   const optionsCount = await dropDown.locator("button").count();
   for (let i=0; i<optionsCount; ++i)
   {
      const text = await dropDown.locator("button").nth(i).textContent();
      if (text === " India")
      {
         await dropDown.locator("button").nth(i).click();
         break;
      }
   }


   await expect(page.locator(".user__name [type='text']").first()).toHaveText(username);
   await page.locator(".btnn.action__submit.ng-star-inserted").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator("label[class='ng-star-inserted']").textContent();
   console.log("orderId: " + orderId);
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   
   const rows = await page.locator("tbody tr");

   for(let i=0; i < await rows.count(); i++)
   {
     const raworderid = await rows.nth(i).locator("th").textContent();
   
         if(orderId.includes(raworderid))
         {
            await rows.nth(i).locator("button").first().click();
            break;
         }
      
   }

  const orderiddetails = await page.locator(".col-text ").textContent();
  expect(orderId.includes(orderiddetails)).toBeTruthy();

  
   await page.pause();
}
);

