const playwright = require("playwright");
const { POManager } = require("../../pageObjects/POManager");
const { Before, After, BeforeStep, AfterStep, Status} = require("@cucumber/cucumber");
const { after } = require("node:test");

Before ( async function () {

console.log("Step started");
           const browser = await playwright.chromium.launch({ headless: false });
            console.log("Browser launched");
            const context = await browser.newContext();
            this.page = await context.newPage(); 
           this.poManager = new POManager(this.page);
            

} );


BeforeStep ( async function () {

console.log("I am executing before each step"); 
} );

AfterStep ( async function ({result}){

    if(result.status === "FAILED"){
        console.log("Step failed, taking screenshot...");
        const screenshot = await this.page.screenshot();
        this.attach(screenshot, "image/png");
    }   

console.log("I am executing after each step"); 
} );

After ( async function () {

console.log("I am last to execute");

} );