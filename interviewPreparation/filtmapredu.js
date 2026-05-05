const students = [
  { name: 'Alice', age: 20, grade: 85 },
  { name: 'Bob', age: 22, grade: 90 },
  { name: 'Charlie', age: 19, grade: 78 },
  { name: 'David', age: 21, grade: 92 },
];      

// Filter students with grade above 80
const topStudents = students.filter(student => student.grade > 80);
console.log("Top Students:", topStudents);

// Map to get an array of student names
const studentNames = topStudents.map(student => student.name);
console.log("Top Student Names:", studentNames);        

// Reduce to calculate the average grade of top students
const averageGrade = topStudents.reduce((sum, student) => sum + student.grade, 0) / topStudents.length;
console.log("Average Grade of Top Students:", averageGrade);    