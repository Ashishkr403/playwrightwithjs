import { expect, test } from '@playwright/test';
test('Browser Context Playwright Test', async ({page})=>
{
   const email = "ashishkr403@zohomail.com";
   const productName = "ZARA COAT 3"
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.getByPlaceholder("email@example.com").fill("ashishkr403@zohomail.com");
   await page.getByPlaceholder("enter your passsword").fill("Rama@403");
   await page.getByRole("button",{name:"Login"}).click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();

   await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).
   getByRole("button",{name:"Add To Cart"}).click();
   await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();
   //await page.locator("div li").first().waitFor();
   await page.waitForLoadState('networkidle');
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();
   await page.getByRole("button",{name:"Checkout"}).click();
   await page.locator("select.input.ddl").nth(0).selectOption("08");
   await page.locator("select.input.ddl").nth(1).selectOption("26");
   await page.locator("input.input.txt").nth(3).fill("123");        // CVV
   //await page.locator("input.input.txt").nth(2).fill("Ashish");     // Name
   //await page.getByRole('button', { name: 'Login' }).click();
   //await page.getByLabel('CVV Code ?').fill("403");
   console.log(await page.getByLabel("CVV Code ?").count());



   //await page.locator("[placeholder*='Country']").pressSequentially("ind");
   await page.getByPlaceholder("Select Country").pressSequentially("ind");
   await page.getByRole("button",{name:"India"}).nth(1).click();
   await page.getByText("PLACE ORDER").click();
   await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();

   
   await page.pause();
}
);

