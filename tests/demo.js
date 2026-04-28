let message = 'Hello';
console.log(message);

//console.log("Hello JavaScript");

function add (a,b){

    return(a+b)
}


console.log("Sum of two number: ", add(4,12));

function Employee(name, salary) {
  this.name = name;
  this.salary = salary;
}

const emp1 = new Employee("Amit", 50000);

console.log(emp1.name); // Amit

let user = {
  name: "Ashish",
  age: 37
};

console.log(user.name); // Ashish
console.log(user.age); // 37