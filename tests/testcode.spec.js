const { test, expect } = require("@playwright/test");

test("Calendar validations", async ({ page }) => {
  
//const eventTitle = `Test Event ${Date.now()}`;
await page.goto("https://eventhub.rahulshettyacademy.com/login");
await page.getByPlaceholder("you@email.com").fill("ashishkr403@zohomail.com");
await page.locator('input[id*="password"]').fill("Rama@403");
await page.getByRole("button",{name:"Sign In"}).click();


//Event Search
//Event Search
await page.getByTestId('nav-events').click();
await page.waitForLoadState('networkidle');
await page.getByPlaceholder("Search events, venues…").fill("Test Event 1774172613247");
// ✅ Event card dhundo
//const eventCard = page.locator('a[href*="/events"]').filter({ hasText: eventTitle }).first();
const eventCard = page.locator('a[href*="/events"]')
.filter({ hasText: "Test Event 1774172613247" });
await expect(eventCard).toBeVisible();
await expect(eventCard).toContainText("Test Event 1774172613247"); 
// //await eventCard.nth(0).click();  
await page.waitForLoadState('networkidle');
//console.log(chk);
console.log(await page.locator('.text-emerald-600').allTextContents());
//const seatText = await eventCard.getByText('seats available').textContent();
// .first().textContent();
//console.log("hoja thk",seatText);
// // ✅ parseInt — "150 seats available" → 150
// const seatsBeforeBooking = parseInt(seatText);

// console.log("Seats Before Booking:", seatsBeforeBooking); // 150

// const seatLocator = page.locator('.text-emerald-600')
//   .filter({ hasText: /seats available/i });

// await expect(seatLocator).toBeVisible();

// const seatText = await seatLocator.textContent();
// const seatsBeforeBooking = parseInt(seatText.trim());

// console.log("Seats Before Booking:", seatsBeforeBooking);

  


//console.log("Generated Event Title:", eventTitle);
await page.pause();
});