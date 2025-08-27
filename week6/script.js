const topHeading = document.querySelector("h1");
console.log(topHeading);
console.log(topHeading.textContent);
topHeading.textContent = "This is the new heading";
topHeading.style.color = "pink";

const firstParagraph = document.querySelector("p");
console.log(firstParagraph);
console.log(firstParagraph.textContent);
firstParagraph.textContent = "This is the new paragraph";

const h2Headings = document.querySelectorAll("#second-heading");
console.log(h2Headings);
console.log(h2Headings.textContent);

const allParagraphs = document.querySelectorAll("p");
console.log(allParagraphs);
// console.log(allParagraphs.textContent);
for (let i = 0; i < allParagraphs.length; i++) {
  console.log("Paragraph", i + 1, ":", allParagraphs[i].textContent);
  allParagraphs[i].style.backgroundColor = "lightblue";
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
