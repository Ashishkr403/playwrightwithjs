const { test, expect } = require("@playwright/test");

test("Calendar validations", async ({ page }) => {
  
const eventTitle = `Test Event ${Date.now()}`;
const seats = 150;
await page.goto("https://eventhub.rahulshettyacademy.com/login");
await page.getByPlaceholder("you@email.com").fill("ashishkr403@zohomail.com");
await page.locator('input[id*="password"]').fill("Rama@403");
await page.getByRole("button",{name:"Sign In"}).click();
await expect(page.getByRole("link", {name: 'Browse Events →'})).toBeVisible();
await page.getByRole("link", {name: 'Browse Events →'}).click();
await page.getByRole("button",{name: 'Add New Event'}).click();
await page.locator("input[id*='event-title']").fill(eventTitle);
await page.getByPlaceholder("Describe the event…").fill("it focuses on practical applications in agriculture, healthcare, education, and governance.");
await page.locator("select[id*='category']").selectOption("Conference");
await page.locator("input[id*='city']").fill("Delhi");
await page.locator("input[id*='venue']").fill("Sector 12");
await page.getByRole('textbox', { name: 'Event Date & Time*' }).fill("2026-06-12T10:00");
await page.locator("input[id*='price']").fill("10");
await page.locator("input[id*='total']").fill(seats.toString());
await page.locator("input[id*='image-url-(optional)']").fill("https://www.abc.com");
await page.getByRole("button",{name:'+ Add Event'}).click();
await expect(page.getByText('✓Event created!×')).toBeVisible();

//Event Search
await page.getByTestId('nav-events').click();
await page.waitForLoadState('networkidle');
await page.getByPlaceholder("Search events, venues…").fill(eventTitle);
// ✅ Event card dhundo
const eventCard = page.locator('a').filter({ hasText: eventTitle });
await expect(page.locator('a').filter({ hasText: eventTitle })).toBeVisible();
//console.log(chk);
// ✅ Span se text lo — class "text-emerald-600" unique hai

// ✅ parseInt — "150 seats available" → 150
const seatsBeforeBooking = parseInt(seatText);

console.log("Seats Before Booking:", seatsBeforeBooking); // 150
//getByRole('link', { name: 'Test Event' })






console.log("Generated Event Title:", eventTitle);





await page.pause();
});