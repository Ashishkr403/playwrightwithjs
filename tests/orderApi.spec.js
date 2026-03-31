const { test, expect, request } = require('@playwright/test');

const loginPayload = {
    userEmail: "ashishkr403@gmail.com",
    userPassword: "Playwright@123"
};

const orderPayload = {
    "orders": [
        {
            country: "Cuba",
            productOrderedId: "6960eae1c941646b7a8b3ed3"
        }
    ]
};

let token;
let orderId;

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

    const orderResponse = await apiContext.post(
        "https://rahulshettyacademy.com/api/ecom/order/create-order",
        { 
            data: orderPayload,
            headers:{
                'authorization' : token,
                'content-type'  : 'application/json'
            }
         }
    );
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
     orderId = orderResponseJson.orders[0];

});

// ✅ Step 2: Use token in UI test
test('Place the order', async ({ page }) => {

    // Inject token into localStorage
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

// ✅ Navigate URL
    await page.goto("https://rahulshettyacademy.com/client/");
  
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


