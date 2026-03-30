const { test, expect, request } = require('@playwright/test');

const loginPayload = {
    userEmail: "ashishkr403@gmail.com",
    userPassword: "Playwright@123"
};

let token;

// ✅ Step 1: Get token once
test.beforeAll(async () => {
    const apiContext = await request.newContext();

    const loginResponse = await apiContext.post(
        "https://rahulshettyacademy.com/api/ecom/auth/login",
        { data: loginPayload }
    );

    expect(loginResponse.ok()).toBeTruthy();

    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;

    console.log("Token Generated:", token);
});


// ✅ Step 2: Use token in UI test
test('Place the order', async ({ page }) => {

    // Inject token into localStorage
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    const email = "ashishkr403@gmail.com";
    const productName = "ZARA COAT 3";

    await page.goto("https://rahulshettyacademy.com/client/");

    const products = page.locator(".card-body");
    await page.locator(".card-body b").first().waitFor();

    const count = await products.count();

    // ✅ Add product to cart
    for (let i = 0; i < count; ++i) {
        const title = await products.nth(i).locator("b").textContent();

        if (title?.trim() === productName) {
            await products.nth(i).locator("text=Add to Cart").click();
            break;
        }
    }

    // ✅ Go to cart
    await page.locator("[routerlink*='cart']").click();
    await page.waitForLoadState('networkidle');

    await expect(page.locator(`h3:has-text("${productName}")`)).toBeVisible();

    // ✅ Checkout
    await page.locator("text=Checkout").click();

    await page.locator("select.input.ddl").nth(0).selectOption("08");
    await page.locator("select.input.ddl").nth(1).selectOption("26");
    await page.locator("input.input.txt").nth(3).fill("123");

    // ✅ Select country
    await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 100 });

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

    // ✅ Verify email
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);

    // ✅ Place order
    await page.locator(".btnn.action__submit.ng-star-inserted").click();

    await expect(page.locator(".hero-primary"))
        .toContainText("Thankyou for the order");

    // ✅ Capture order ID
    const orderId = await page.locator("label.ng-star-inserted").textContent();
    console.log("Order ID:", orderId);

    // ✅ Go to orders
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();

    const rows = page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();

        if (orderId.trim().includes(rowOrderId.trim())) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    // ✅ Verify order details
    const orderDetailsId = await page.locator(".col-text").textContent();

    expect(orderId.trim().includes(orderDetailsId.trim())).toBeTruthy();
});