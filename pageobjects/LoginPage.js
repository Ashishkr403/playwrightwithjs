class LoginPage {

    constructor(page) {
        this.page = page; // Store the page object for later use and ab isko class ke andar khi bhi use kr sakte ager asa nhi krenge to goto method ko use nhi kr payege

        this.signInButton = page.getByRole('button', { name: 'Login' });
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    
    }
    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(username, password) {

   await this.userName.fill(username);
   await this.password.fill(password);
   await this.signInButton.click({ force: true });


    }

}


module.exports = { LoginPage };