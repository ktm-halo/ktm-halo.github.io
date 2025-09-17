// --------------------------------
// 1st course of action: get acccess to the video
const myVideo = document.querySelector("#my-video");
console.log(myVideo);
// --------------------------------

// --------------------------------
// play pause logic
// 1. get access to the button
const playPauseButton = document.querySelector("#play-pause-button");
console.log(playPauseButton);
// 2. add event listener for the click on this button
playPauseButton.addEventListener("click", toggleVideo);

const playPauseImg = document.querySelector("#play-pause-img");
console.log(playPauseImg);
// 3. write the callback function that needs to play or pause the video
function toggleVideo() {
  if (myVideo.paused || myVideo.ended) {
    myVideo.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v2.png";
  } else {
    myVideo.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v2.png";
  }
}
// --------------------------------

// --------------------------------
// mute unmute logic
// 1. get access to the button
const muteUnmuteButton = document.querySelector("#mute-unmute-button");
console.log(muteUnmuteButton);
// 2. add event listener for the click on this button
muteUnmuteButton.addEventListener("click", toggleAudio);

const muteUnmuteImg = document.querySelector("#mute-unmute-img");
console.log(muteUnmuteImg);
// 3. write the callback function that needs to play or pause the video
function toggleAudio() {
  if (myVideo.muted) {
    myVideo.mute = false;
    muteUnmuteImg.src =
      "https://img.icons8.com/ios-glyphs/30/high-volume--v2.png";
  } else {
    myVideo.mute = true;
    muteUnmuteImg.src = "https://img.icons8.com/ios-glyphs/30/mute--v1.png";
  }
}
// --------------------------------

// --------------------------------
// fast foward logic
// 1. get access to the button
const fastFowardButton = document.querySelector("#fast-foward-button");
console.log(fastFowardButton);
// 2. add event listener for the click on this button
fastFowardButton.addEventListener("click", fastFowardVideo);

const fastFowardImg = document.querySelector("#fast-foward-img");
console.log(fastFowardImg);
// 3. write the callback function that needs to play or pause the video
function fastFowardVideo() {
  if (myVideo.playbackRate === 1.0) {
    myVideo.playbackRate = 2.0;
  } else {
    myVideo.playbackRate === 1.0;
  }
}
// --------------------------------

// --------------------------------
// stepping logic
// 1. get access to the button
const step1Button = document.querySelector("#step1-button");
console.log(step1Button);

const step2Button = document.querySelector("#step2-button");
console.log(step2Button);
// 2. add event listener for the click on this button
step1Button.addEventListener("click", gotoStep1);
step2Button.addEventListener("click", gotoStep2);

// 3. write the callback function that individual step
function gotoStep1() {
  myVideo.currentTime = 17;
}
function gotoStep2() {
  myVideo.currentTime = 43;
}
// --------------------------------

// --------------------------------
// likes logic
// 1. get access to the button
const heartButton = document.querySelector("#heart-button");
console.log(heartButton);
//1.2 get access to the text area and i should  also create a counter
let likes = 0;
const likesText = document.querySelector("#likes");
console.log(likesText);

// 2. add event listener for the click on this button
heartButton.addEventListener("click", displayLikes);

// 3. write the callback function that individual step
function displayLikes() {
  likes++;
  likesText.textContent = likes;
}
// --------------------------------

// --------------------------------
// progess bar logic
// 1. get access to the button
const progressBar = document.querySelector("#progress-bar");
console.log(progressBar);

myVideo.addEventListener("timeupdate", updateProgress);

function updateProgress() {
  let duration = (myVideo.currentTime / myVideo.duration) * 100;
  //   console.log(duration);
  progressBar.style.width = duration + "%";
}
// --------------------------------

// --------------------------------
// fullscreen logic
// 1. get access to the button

const fullScreenButton = document.querySelector("#fullscreen-button");
console.log(fullScreenButton);

// 2. add event listener for the click on this button
fullScreenButton.addEventListener("click", goFullScreen);
myVideo.addEventListener("dblclick", goFullScreen);

// 3. write the callback function that individual step
function goFullScreen() {
  if (!document.fullscreenElement) {
    myVideo.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}
// --------------------------------
