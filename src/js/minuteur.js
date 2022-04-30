document.addEventListener("DOMContentLoaded", () => {
  let display = document.querySelector(".countdown__display");
  let startButton = document.querySelector(".countdown__start");
  let resetButton = document.querySelector(".countdown__reset");
  let minutes = document.querySelector(".controls__min");
  let seconds = document.querySelector(".controls__sec");
  let hours = document.querySelector(".controls__h");
  let container = document.querySelector(".controls__container");
  let controls = document.querySelector(".controls");
  console.log(controls);
  let int = null;
  let timeInputs = document.querySelectorAll('input[type="number"]');
  let span = document.querySelectorAll("span");
  let para = document.querySelector("p");

  for (let i = 0; i < timeInputs.length; i++) {
    timeInputs[i].addEventListener("input", (e) => {
      if (e.target.value < 10) {
        span[i].innerHTML = "0" + e.target.value;
      } else {
        span[i].innerHTML = e.target.value;
      }
      console.log(e.target.value);
    });
  }

  function timer() {
    let s = seconds.value;
    let m = minutes.value;
    let h = hours.value;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    if (s != 0) {
      console.log(s);
      seconds.value--;
    } else if (minutes.value != 0 && seconds.value == 0) {
      seconds.value = 59;
      minutes.value--;
    } else if (hours.value != 0 && minutes.value == 0) {
      minutes.value = 59;
      seconds.value = 59;
      hours.value--;
    } else if (hours.value <= 0 && minutes.value <= 0 && seconds.value <= 0) {
      clearInterval(int);
      int = null;
    }

    // display.innerHTML = `${h} : ${m} : ${s}`;
    span[0].innerHTML = h;
    span[1].innerHTML = m;
    span[2].innerHTML = s;

    return;
  }

  function startStop() {
    if (
      seconds.value == 0 &&
      minutes.value == 0 &&
      hours.value == 0 &&
      int === null
    ) {
      // DO AN ACTION (ne pas créer un nouverau paragraphe, faire une annimation sur celui existant)
      para.innerHTML = "Spécifiez un minuteur";
    } else if (int === null) {
      int = setInterval(timer, 1000);
    } else {
      clearInterval(int);
      int = null;
    }
  }

  function reset() {
    clearInterval(int);
    int = null;
    // display.innerHTML = "00 : 00 : 00";
    span[0].innerHTML = "00";
    span[1].innerHTML = "00";
    span[2].innerHTML = "00";
    hours.value = 0;
    minutes.value = 0;
    seconds.value = 0;
  }

  function tt() {
    if (
      seconds.value == 0 &&
      minutes.value == 0 &&
      hours.value == 0 &&
      int === null
    ) {
    } else {
      controls.classList.add("not-visible");
    }

    return;
  }

  function dd() {
    controls.classList.remove("not-visible");
  }

  startButton.addEventListener("click", () => {
    tt();
    startStop();
  });
  resetButton.addEventListener("click", () => {
    reset();
    dd();
  });
});
