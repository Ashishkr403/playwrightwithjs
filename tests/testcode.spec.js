const { test, expect } = require("@playwright/test");

test("Calendar validations", async ({ page }) => {
  
//const eventTitle = `Test Event ${Date.now()}`;
await page.goto("https://eventhub.rahulshettyacademy.com/events");

// Located by data-testid
  const eventCards = page.getByTestId('event-card');
  await expect(eventCards.first()).toBeVisible();

  // Scan all visible event cards for the one matching our created title
  const targetCard = eventCards.filter({ hasText: "Test Event 1774172613247" }).first();
  await expect(targetCard).toBeVisible({ timeout: 5000 });


await page.pause();
});