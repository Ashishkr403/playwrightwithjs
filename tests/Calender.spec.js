const { test, expect } = require("@playwright/test");

test("Calendar validations", async ({ page }) => {
  const monthNumber = "10";
  const date = "29";
  const year = "2024";
  const expectedList = [monthNumber,date,year];

  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
  await page.locator(".react-date-picker__wrapper").click();

  // Step 1: Click the label to go to year/decade view
  await page.locator(".react-calendar__navigation__label").click();

  // Step 2: Click again if needed to reach decade view (shows range of years)
  await page.locator(".react-calendar__navigation__label").click();

  // Step 3: Click the target year from the decade view
  await page.locator(".react-calendar__tile").getByText(year, { exact: true }).click();

  // Step 4: Click the target month (0-based index)
  await page.locator(".react-calendar__year-view__months__month")
    .nth(Number(monthNumber) - 1)
    .click();

  // Step 5: Click the target date
  await page.locator(`//abbr[text()='${date}']`).click();
  const inputs =await page.locator(".react-date-picker__inputGroup__input")

  for(let i=0; i<expectedList.length; i++)
  {
    const value = await inputs.nth(i).inputValue();
    expect(value).toEqual(expectedList[i]);
  }
  await page.pause();
});