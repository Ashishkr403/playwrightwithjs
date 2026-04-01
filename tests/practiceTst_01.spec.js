const {test, expect}= require("@playwright/test");

let a=10;
let b=30;
let c;

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
    await page.locator("#mousehover").hover();
    const frameID = page.frameLocator("#courses-iframe");
    await frameID.locator("li a[href*='lifetime-access']:visible").click();
    const textf = await frameID.locator(".text h2").textContent();
     console.log(textf.split(" ")[1]);
    //frame.locator
    
/*  const frametst= page.locator('iframe[name="iframe-name"]').contentFrame().getByRole('link', { name: 'NEW All Access plan' });
    await frametst.click(); */
    // function to add two numbers
    c=a+b;
    console.log("Sum of A and B = ",c);



    
    

    await page.pause();

});
