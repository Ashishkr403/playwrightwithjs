const { test, expect, request } = require('@playwright/test');

const loginPayload = {
    userEmail: "ashishkr403@gmail.com",
    userPassword: "Playwright@123"
};

test('api test', async () => {

    const apiContext = await request.newContext();

    const loginResponse = await apiContext.post(
        "https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginPayload
        }
    );

    expect(loginResponse.ok()).toBeTruthy();

    const loginResponseJson = await loginResponse.json();
    const token = loginResponseJson.token;

    console.log(token);
});
