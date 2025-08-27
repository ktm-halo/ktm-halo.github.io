const topHeading = document.querySelector("h1");
console.log(topHeading);
console.log(topHeading.textContent);
topHeading.textContent = "This is the new heading";
topHeading.style.color = "pink";

const firstParagraph = document.querySelector("p");
console.log(firstParagraph);
console.log(firstParagraph.textContent);
firstParagraph.textContent = "This is the new paragraph";
firstParagraph.innerHTML += "<span> New element</span>";

const mySection = document.querySelector("section");
console.log(mySection);
let mynewContent = `
<h2> this is an image of cat</h2>
<p> do you like it? </p>
`;
mySection.innerHTML += mynewContent;
const h2Headings = document.querySelectorAll("#second-heading");
console.log(h2Headings);
console.log(h2Headings.textContent);

const allParagraphs = document.querySelectorAll("p");
console.log(allParagraphs);
// console.log(allParagraphs.textContent);
for (let i = 0; i < allParagraphs.length; i++) {
  console.log("Paragraph", i + 1, ":", allParagraphs[i].textContent);
  allParagraphs[i].style.backgroundColor = "rgb(155, 254, 254);";
  //   allParagraphs[i].textContent = `This is paragraph`;
  allParagraphs[i].classList.add("para-style");
}

const allAnother = document.querySelectorAll(".another");
console.log(allAnother);
for (let i = 0; i < allAnother.length; i++) {
  console.log(
    "Element with class 'another'",
    i + 1,
    ":",
    allAnother[i].textContent
  );
}

function toggleMe() {
  const myImg = document.querySelector("img");
  console.log(myImg);
  myImg.classList.toggle("round");
}

const myImg = document.querySelector("img");
console.log(myImg);
myImg.addEventListener("mouseover", addMe);
myImg.addEventListener("mouseout", removeMe);

function addMe() {
  myImg.classList.add("round");
}

function removeMe() {
  myImg.classList.remove("round");
}

function handleClick() {
  console.log("did you click me?");
  topHeading.textContent = "My cart";
}
