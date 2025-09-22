// I should access the audio so that i can control with my button

const myAudio = document.querySelector("#my-audio");
console.log(myAudio);

// I need to access the play button

const playButton = document.querySelector("#play-button");
console.log(playButton);

// Let us add a click event listener so that when I click the button, the audio plays

playButton.addEventListener("click", playAudio);

function playAudio() {
  myAudio.play();
}

// I need to access the pause button

const pauseButton = document.querySelector("#pause-button");
console.log(pauseButton);

// Let us add a click event listener so that when I click the button, the audio pauses

pauseButton.addEventListener("click", pauseAudio);

function pauseAudio() {
  myAudio.pause();
}

//--------------------------------------------------------------
// My logic for creating a popping sound effect
// 1st i need to access the popping sound button
const popSound = document.querySelector("#pop-sound");
console.log(popSound);

// 2nd I need to add a click event listener so that when I click the button, the popping sound plays
const popButton = document.querySelector("#pop-button");
console.log(popButton);

popButton.addEventListener("click", popAudio);

function popAudio() {
  popSound.play();
}
//--------------------------------------------------------------

const myVideo = document.querySelector("#my-video");
console.log(myVideo);
