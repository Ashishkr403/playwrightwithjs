/* class OrdersHistoryPage
{
constructor(page)
{
    this.page = page;
this.ordersTable = page.locator("tbody");
this.rows = page.locator("tbody tr");
this.orderdIdDetails =page.locator(".col-text");
}
async searchOrderAndSelect(orderId)
{

    await this.ordersTable.waitFor();
for(let i =0; i<await this.rows.count(); ++i)
 {
    const rowOrderId =await this.rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId))
    {
        await this.rows.nth(i).locator("button").first().click();
        break;
    }
 }

}

async getOrderId()
{
    return await this.orderdIdDetails.textContent();
}

}
module.exports = {OrdersHistoryPage};
 */

const { expect } = require('@playwright/test');

class OrdersHistoryPage {
    constructor(page) {
        this.page = page;

        this.ordersTable = page.locator("table tbody").first();
        this.rows = this.ordersTable.locator("tr");

        // Order details page locator
        this.orderIdDetails = page.locator(".col-text");
    }

    async searchOrderAndSelect(orderId) {
        await this.ordersTable.waitFor();
        await this.rows.first().waitFor();

        const count = await this.rows.count();

        for (let i = 0; i < count; ++i) {

            const rowOrderId = await this.rows.nth(i)
                .locator("td")
                .first()
                .textContent();

            console.log("Row Order ID:", rowOrderId);

            if (rowOrderId?.trim().includes(orderId.trim())) {

                await this.rows.nth(i)
                    .locator("button")
                    .first()
                    .click();

                break;
            }
        }
    }

    async getOrderId() {
        await this.orderIdDetails.waitFor();
        return await this.orderIdDetails.textContent();
    }
}

module.exports = { OrdersHistoryPage };