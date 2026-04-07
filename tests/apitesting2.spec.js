import { expect, test  } from "@playwright/test";
import path from "node:path";


test.afterAll (async ({browser})=> {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill("ashishkr403@zohomail.com");
   await page.locator("#userPassword").fill("Rama@403");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
/* 
   👉 Ye line current browser/session ka login data save kar deti hai file me
📦 Isme kya save hota hai?
Cookies 🍪
Local Storage
Session Storage
👉 Matlab: user already logged-in state save ho jaata hai */


   await context.storageState({path: 'state.json'});


})