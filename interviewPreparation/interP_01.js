
const persion = {
    name: 'Ashish',
    age: 37,
    city: 'Noida',
    greet : function() {
        console.log("Hello " + this.name);
    }
}

console.log(persion.name);
console.log(persion.age);
console.log(persion.city);  
persion.greet();

function sayHello() {
    console.log("Hello, I am the world!");
    return "Hello, I am the Ashish!";
}
sayHello();

const msg = sayHello();
console.log(msg);

const greet = function(name) {  
    return "Hello " + name;
    
}

console.log(greet("Ashish"));
