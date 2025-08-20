function checkWeather() {
  const body = document.querySelector("body");
  const temp = document.querySelector("#myTemp");
  console.log(temp);
  const t = temp.value;
  console.log(t);
  if (t > 40) {
    console.log("It's too hot outside");
  } else if (t <= 40 && t > 30) {
    console.log("It's sunny and warm");
  } else if (t <= 30 && t > 18) {
    console.log("It's a nice day");
  } else if (t <= 18 && t > 8) {
    console.log("It's quite cold");
  } else if (t <= 8) {
    console.log("It's freezing outside");
  }
}
