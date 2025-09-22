let a = 10;
let b = 5;

// declaring or defining a function //
function add(a, b) {
  let c = a + b;
  console.log("value of c", c);
  return c;
}
function subtract(a, b) {
  let f = a - b;
  console.log("value of f", f);
  return f;
}

function greet(name) {
  let newName = name.toUpperCase();
  let msg = "";
  if (name === "Alice") {
    let msg = "HELLO " + newName;
  } else {
    msg = "Sorry I don't know you";
  }
  console.log(msg);
  return msg;
}

let name = "Alice";
greet(name);

greet("Bob");

//calling of a function //
let sum = add(a, b);
console.log("value of sum", sum);
let sum2 = add(20, 30);
let d = 100;
let e = 200;
let sum3 = add(d, e);
console.log("value of sum", sum3);
let balance = subtract(500, 200);
console.log("value of balance", balance);
