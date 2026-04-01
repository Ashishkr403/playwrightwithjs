const { test, expect, request } = require('@playwright/test');

const loginPayload = {
    userEmail: "ashishkr403@gmail.com",
    userPassword: "Playwright@123"
};

let token;

// ✅ STEP 1: API se token lena
test.beforeAll(async () => {

    const apiContext = await request.newContext();

    const loginResponse = await apiContext.post(
        "https://rahulshettyacademy.com/api/ecom/auth/login",
        { data: loginPayload }
    );

    expect(loginResponse.ok()).toBeTruthy(); 

    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;

    console.log("TOKEN:", token);
});


// ✅ STEP 2: UI test start
test('Place the order', async ({ page }) => {

    // 🔹 Token inject karo (login bypass)
    await page.addInitScript((value) => {
        window.localStorage.setItem('token', value);
    }, token);

    const email = "ashishkr403@gmail.com";
    const productName = "ZARA COAT 3";

    // 🔹 Website open karo
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.waitForLoadState('networkidle');

    // 🔹 Confirm login success
    await expect(page.locator(".fa-sign-out")).toBeVisible();

    // 🔹 Products fetch karo
    const products = page.locator(".card-body");
    const count = await products.count();

    // 🔹 Product select karo
    for (let i = 0; i < count; ++i) {
        const title = await products.nth(i).locator("b").textContent();

        if (title?.trim() === productName) {

            await products.nth(i).locator("text=Add to Cart").click();

            // 🔹 Confirmation wait
            await page.locator("#toast-container").waitFor();

            break;
        }
    }

    // 🔹 Cart open karo
    await page.locator("[routerlink*='cart']").waitFor();
    await page.locator("[routerlink*='cart']").click();

    await page.waitForLoadState('networkidle');

    // 🔹 Product verify
    await expect(page.locator(`h3:has-text("${productName}")`)).toBeVisible();

    // 🔹 Checkout
    await page.locator("text=Checkout").click();

    await page.locator("select.input.ddl").nth(0).selectOption("08");
    await page.locator("select.input.ddl").nth(1).selectOption("26");
    await page.locator("input.input.txt").nth(3).fill("123");

    // 🔹 Country select
    await page.locator("[placeholder*='Country']")
        .pressSequentially("ind", { delay: 100 });

    const dropDown = page.locator(".ta-results");
    await dropDown.waitFor();

    const optionsCount = await dropDown.locator("button").count();

    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropDown.locator("button").nth(i).textContent();

        if (text.trim() === "India") {
            await dropDown.locator("button").nth(i).click();
            break;
        }
    }

    // 🔹 Email verify
    await expect(page.locator(".user__name [type='text']").first())
        .toHaveText(email);

    // 🔹 Place order
    await page.locator(".btnn.action__submit").click();

    await expect(page.locator(".hero-primary"))
        .toContainText("Thankyou for the order");

    // 🔹 Order ID capture
    const orderId = await page.locator("label.ng-star-inserted").textContent();
    console.log("ORDER ID:", orderId);

    // 🔹 Orders page open
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();

    const rows = page.locator("tbody tr");

    // 🔹 Order match
    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();

        if (orderId.trim().includes(rowOrderId.trim())) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    // 🔹 Final verification
    const orderDetailsId = await page.locator(".col-text").textContent();

    expect(orderId.trim().includes(orderDetailsId.trim())).toBeTruthy();
});