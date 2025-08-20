// string variables = text variables alphanumeric
const myName = "Ha";
const myAge = 20;

console.log(myName, myAge);

// number variables add subtract multiply divide
let a = 10;
let b = 5;
let c = a + b;
console.log(c);
const id = 4016401;
const city = "Melbourne";
const uni = "RMIT University";

// objects: collection of related variables or data
const myStudentRecord = {
  name: "Ha",
  id: 4016401,
  city: "Melbourne",
};

console.log(myStudentRecord.name);
console.log(myStudentRecord.city);

const myAssignmentRecord = {
  id: 4016401,
  as1Score: 80,
  as2Score: 90,
  as3Score: 85,
};
const total =
  myAssignmentRecord.as1Score +
  myAssignmentRecord.as2Score +
  myAssignmentRecord.as3Score;
console.log(total);

// boolean = test condition check True or False
const isItEvening = true;
const isIRaining = false;

// back ticks
const myAdress = `RMIT University 124
latrobe st 

Melbourne is ${myName}'s adress `;
console.log(myAdress);
const myDetails = `Hello, I am ${myName}, I am study at  ${uni}`;
console.log(myDetails);

const student1 = "Alice";
const student2 = "Bob";
const student3 = "Charlie";
const student4 = "David";
console.log("hello", student1);
console.log("hello", student2);
console.log("hello", student3);
console.log("hello", student4);

let students = ["Alice", "Bob", "Charlie", "David", "Eve"];
// console.log("hello", students[0]);
// console.log("hello", students[1]);
// console.log("hello", students[2]);
// console.log("hello", students[3]);
// console.log("hello", students[4]);
console.log("array size", students.length);
for (let i = 0; i < students.length; i++) {
  console.log("value of i", i);
  console.log("hello", students[i]);
}

// let ids = [4016401, 4016402, 4016403, 4016404, 4016405];
// console.log(ids[2]);

// let score = 88;
// if (score >= 90) {
//   console.log("Hey you got HD");
//   console.log("You are awesome");
// } else if (score <= 80 && scrore > 70) {
//   console.log("Hey you got D");
// } else if (score <= 70 && scrore > 50) {
//   console.log("Hey you passed");
// } else if (score < 50) {
//   console.log("Sorry you failed");
// }
