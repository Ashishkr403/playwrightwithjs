/* What are filter, map and reduce --- Why, how, where and when to use

🔹 1. filter() – Data ko chhantna (select karna)
👉 Kya hai?

filter() kisi array se condition ke basis par elements select karta hai

👉 Kyun use karte hain?
Jab aapko kuch specific items chahiye ho
Example: sirf even numbers, ya sirf passed students
👉 Kaise use karte hain?
let numbers = [1, 2, 3, 4, 5, 6];

let even = numbers.filter(num => num % 2 === 0);

console.log(even); // [2, 4, 6]
👉 Real example:
let students = [
  { name: "A", marks: 80 },
  { name: "B", marks: 35 }
];

let passed = students.filter(s => s.marks >= 40);
🔹 2. map() – Data ko transform karna
👉 Kya hai?

map() har element par kaam karke naya array return karta hai

👉 Kyun use karte hain?
Jab aapko data modify / convert karna ho
Example: marks ko percentage banana
👉 Kaise use karte hain?
let numbers = [1, 2, 3];

let square = numbers.map(num => num * num);

console.log(square); // [1, 4, 9]
👉 Real example:
let users = [
  { name: "Ashish", age: 30 },
  { name: "Rahul", age: 25 }
];

let names = users.map(user => user.name);
🔹 3. reduce() – Sabko combine karke ek value banana
👉 Kya hai?

reduce() poore array ko process karke ek single value return karta hai

👉 Kyun use karte hain?
Sum nikalna
Count karna
Complex calculations
👉 Kaise use karte hain?
let numbers = [1, 2, 3, 4];

let sum = numbers.reduce((acc, num) => acc + num, 0);

console.log(sum); // 10

👉 Yahan:

acc = accumulator (result store karta hai)
0 = initial value
🔥 Teeno ka combo use (Real world example)
let students = [
  { name: "A", marks: 80 },
  { name: "B", marks: 30 },
  { name: "C", marks: 70 }
];

let total = students
  .filter(s => s.marks >= 40)   // pass students
  .map(s => s.marks)            // sirf marks
  .reduce((acc, m) => acc + m, 0); // total

console.log(total); // 150
📌 Kaha kaha use kar sakte hain?

✅ API response handle karne mein
✅ UI data show karne mein (React, Angular, etc.)
✅ Reports / calculations mein
✅ Data cleaning aur transformation mein
✅ Testing automation (aap Playwright use kar rahe ho — waha bhi useful hai)

🧠 Short Summary
Method	Kaam
filter	Data select karta hai
map	Data modify karta hai
reduce	Data ko ek value mein convert karta hai

🔥 1. Iteration / Loop type methods (loop ki jagah use hote hain)
✅ forEach()
Har element par loop chalata hai
Return kuch nahi karta
let arr = [1,2,3];
arr.forEach(x => console.log(x));
🔍 2. Search / Condition check methods
✅ find()
First matching element return karta hai
let arr = [10, 20, 30];
let result = arr.find(x => x > 15); // 20
✅ findIndex()
Index return karta hai
arr.findIndex(x => x > 15); // 1
✅ some()
Agar koi ek bhi match kare → true
arr.some(x => x > 25); // true
✅ every()
Agar sab match kare → true
arr.every(x => x > 5); // true
🔄 3. Transformation methods (map ke jese)
✅ flat()
Nested array ko simple banata hai
[1, [2, 3]].flat(); // [1,2,3]
✅ flatMap()
map + flat combo
[1,2,3].flatMap(x => [x, x*2]);
// [1,2,2,4,3,6]
➕ 4. Add / Remove / Modify
✅ push() / pop()
End se add/remove
✅ shift() / unshift()
Start se add/remove
✅ splice()
Beech se add/remove
let arr = [1,2,3];
arr.splice(1,1); // [1,3]
📦 5. Combine / Copy methods
✅ concat()
[1,2].concat([3,4]); // [1,2,3,4]
✅ slice()
Copy banata hai
[1,2,3].slice(1); // [2,3]
🔢 6. Sorting & reversing
✅ sort()
[3,1,2].sort(); // [1,2,3]
✅ reverse()
[1,2,3].reverse(); // [3,2,1]
🔤 7. Convert methods
✅ join()
[1,2,3].join("-"); // "1-2-3"
✅ toString()
[1,2,3].toString(); // "1,2,3"
🧠 Important baat (INTERVIEW POINT 🔥)

👉 Sabse important aur commonly used:

map
filter
reduce
forEach
find
some
every

👉 Total array methods:
👉 30+ methods hain JavaScript mein 😄

🎯 Real-world usage (tumhare kaam ke hisaab se)

Since tum QA + Automation (Playwright) mein ho:

👉 Ye methods use hote hain:

API response validate karne mein
Table data verify karne mein
Logs filtering mein
Report generation mein
🚀 Simple Trick yaad rakhne ke liye
map → change karo
filter → select karo
reduce → combine karo
find → ek item dhoondo
some/every → condition check karo


*/