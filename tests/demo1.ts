
import {expect, type Page, type Locator} from "@playwright/test";


let message : String = 'Hello';
let message1 : number = 6;

console.log("Hello TypeScript");
let isActive : boolean = true;
let numerarr : number [] = [1,2,4,9];
let data : any = "This could be anything"
data = 2;

console.log(message,message1,isActive,numerarr, data);


function add (a:number, b:number):number 
{

    return(a+b)
}
console.log("Sum of two number: ", add(4,12));

let user2 = {
    name : "Ashish",
    age: 37
};
console.log(user2.name); // Ashish
console.log(user2.age); // 37
console.log("I am Typescript programmer");

// but as to kiya hi nhi

let users : {name: string, age: number} = {
    name : "Ashish",
    age: 37
};
console.log(users.name);

class CartPage
{
    page : Page;
    cartProducts : Locator;
    productsText : Locator;
    cart : Locator;
    orders : Locator;
    checkout : Locator;
constructor(page: Page)
{
    this.page = page;
    this.cartProducts = page.locator("div li").first();
    this.productsText = page.locator(".card-body b");
    this.cart =  page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    this.checkout = page.locator("text=Checkout");

}
}