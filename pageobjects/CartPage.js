
const { test, expect } = require('@playwright/test');

class CartPage {                    
    constructor(page) {
        this.page = page;
        this.checkout = page.locator("text=Checkout");
    }       

    async VerifyProductIsDisplayed(productName) {
        await this.page.waitForLoadState('networkidle');
        const product = this.page.locator(".cartSection h3").filter({ hasText: productName });
        await expect(product).toBeVisible();
    }


    async Checkout() {
        await this.checkout.click();
    }
}

module.exports = { CartPage };





