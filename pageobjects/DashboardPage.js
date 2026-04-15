class DashboardPage 
{
    constructor(page)
    {
        //this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
    
    }

    async searchProductAddCart(productName){

        const allTitels = await this.productsText.allTextContents();
        console.log(allTitels);
       const count = await this.products.count();
   for(let i=0; i< count; ++i)
   {
      const title = await this.products.nth(i).locator("b").textContent();
      console.log(title);

      if(title?.trim() === productName)

         {
         //add to cart
         await this.products.nth(i).locator("text= Add to Cart").click();
         break;
         }
        }
    }
    async navigateToCart()
                    {

        await this.cart.click();
                    }
         

}

module.exports = { DashboardPage };
