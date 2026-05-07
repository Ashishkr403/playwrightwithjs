
/* console.log("Start");
console.log("Middle");
console.log("End");

console.log("Start");
console.log("Middle");
setTimeout(function() {
    console.log("Inside setTimeout");
}, 2000);
console.log("End");
 */

// Callback function example

function loginUser(callback) {
  console.log("Calling Login API...");

  setTimeout(() => {
    console.log("Login Successful ✅");
    callback();  // calling the callback after API success
  }, 2000);
}

function validateDashboard() {
  console.log("Validating Dashboard UI...");
}

// Execute test
loginUser(validateDashboard);