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
<<<<<<< HEAD
await page.waitForLoadState('networkidle');
await page.getByPlaceholder("Search events, venues…").fill(eventTitle);
// ✅ Event card dhundo
const eventCard = page.locator('a').filter({ hasText: eventTitle });
await expect(page.locator('a').filter({ hasText: eventTitle })).toBeVisible();
//console.log(chk);
// ✅ Span se text lo — class "text-emerald-600" unique hai
=======
// Located by data-testid
  const eventCards = page.getByTestId('event-card');
  await expect(eventCards.first()).toBeVisible();
>>>>>>> 70e4944 (Initial commit)

  // Scan all visible event cards for the one matching our created title
  const targetCard = eventCards.filter({ hasText: eventTitle }).first();
  await expect(targetCard).toBeVisible({ timeout: 5000 });

  // Capture seat count before booking
  const seatsBeforeBooking = parseInt(await targetCard.getByText('seat').first().innerText());
  console.log(`Seats before booking: ${seatsBeforeBooking}`);

  // Located by data-testid inside the matched card
  await targetCard.getByTestId('book-now-btn').click();
//getByRole('link', { name: 'Test Event' })

//----------------fill booking form----------------
  const ticketCount = page.locator("#ticket-count");
  await expect(ticketCount).toHaveText("1");
  await page.getByLabel("Full Name").fill("Ram");
await page.locator("#customer-email").fill("ram@example.com");
await page.getByPlaceholder("+91 98765 43210").fill("9876543210");
await page.locator(".confirm-booking-btn").click();
const bookingRefEL = page.locator(".booking-ref ").first();
await expect(bookingRefEL).toBeVisible();
const bookingRef = (await bookingRefEL.innerText()).trim();
  expect(bookingRef.charAt(0)).toBe(eventTitle.trim().charAt(0).toUpperCase());

  console.log(`Booking confirmed. Ref: ${bookingRef}`);

  //------verify booking-------

   await page.getByRole('link', { name: 'View My Bookings' }).click();
     // Located by id
  const bookingCards = page.locator('#booking-card');
  await expect(bookingCards.first()).toBeVisible();
   // Find the card that contains our booking ref (via CSS class inside the card)
    const matchingCard = bookingCards.filter({ has: page.locator('.booking-ref', { hasText: bookingRef }) });
    await expect(matchingCard).toBeVisible();
  
    // Verify event title also appears in the same card
    await expect(matchingCard).toContainText(eventTitle);
  
    console.log(`Booking card found in My Bookings for ref: ${bookingRef}`);
  
   
    await page.getByTestId('nav-events').click();
    await expect(eventCards.first()).toBeVisible();
  
    
    const updatedCard       = eventCards.filter({ hasText: eventTitle }).first();
    await expect(updatedCard).toBeVisible();
  
    const seatsAfterBooking = parseInt(await updatedCard.getByText('seat').first().innerText());
    console.log(`Seats after booking: ${seatsAfterBooking}`);
  
    // present booking should reduce available seats by 1
    expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);

await page.pause();
});