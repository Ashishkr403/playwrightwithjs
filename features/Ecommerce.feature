Feature: Ecommerce Validations

Scenario: Placing Order

Given a login to Ecommerce application with "ashishkr403@gmail.com" and "Playwright@123"
When add product to cart "ZARA COAT 3"
Then Verify "ZARA COAT 3" is displayed in the cart
When Enter valid details and place the order
Then Verify order in present in the orderHistory