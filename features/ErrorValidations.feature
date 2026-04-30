Feature: Ecommerce2 Validations


//Scenario: Invalid Login Error Validation

//Given a login to Ecommerce2 application with "ashishkr403@gmail.com" and "Playwright@123"
//Then Verify the error message "Incorrect username/password." is displayed

@smoke
Scenario Outline:  Invalid Login Error Validation

Given a login to Ecommerce2 application with "<username>" and "<password>"
Then Verify the error message "Incorrect username/password." is displayed


Examples:   
| username                | password         |
| gjhjhjggjhjhjhj         | jhgjhgh7866hv    |
| ashishkr403@gmail.com   | Playwright@123   |
| john.doe@gmail.com      | Password@123     |
       