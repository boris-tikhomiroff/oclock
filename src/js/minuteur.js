document.addEventListener("DOMContentLoaded", () => {
  // DOM CONTENT
  let display = document.querySelector(".countdown__display");
  let startButton = document.querySelector(".countdown__start");
  let resetButton = document.querySelector(".countdown__reset");
  let minutes = document.querySelector(".controls__min");
  let seconds = document.querySelector(".controls__sec");
  let hours = document.querySelector(".controls__h");
  let container = document.querySelector(".controls__container");
  let controls = document.querySelector(".controls");
  let int = null;
  let timeInputs = document.querySelectorAll('input[type="number"]');
  let span = document.querySelectorAll("span");
  let para = document.querySelector("p");
  let message = document.querySelector(".message");

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
      // console.log(s);
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
      dd();
      startButton.textContent = "Start";
      // window.alert("hello");
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
      // DO AN ACTION (ne pas cr??er un nouverau paragraphe, faire une annimation sur celui existant)
      // para.innerHTML = "Sp??cifiez un minuteur";
      message.innerText = "You have to specify a time.";
    } else if (int === null) {
      int = setInterval(timer, 1000);
      startButton.textContent = "Stop";
    } else {
      clearInterval(int);
      int = null;
      startButton.textContent = "Start";
    }
  }

  function reset() {
    if (hours.value <= 0 && minutes.value <= 0 && seconds.value <= 0) {
      // Ajouter Effect !
      for (let i = 0; i < timeInputs.length; i++) {
        // timeInputs[i].style.background = "red";
        message.innerText = "Set your timer using the inputs below.";
      }
    } else {
      clearInterval(int);
      int = null;
      // display.innerHTML = "00 : 00 : 00";
      span[0].innerHTML = "00";
      span[1].innerHTML = "00";
      span[2].innerHTML = "00";
      hours.value = 0;
      minutes.value = 0;
      seconds.value = 0;
      message.innerText = "Set your timer using the inputs below.";
      startButton.textContent = "Start";
    }
  }

  function showHide() {
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

  function remove() {
    controls.classList.remove("not-visible");
  }

  // Event LISTENERS
  startButton.addEventListener("click", () => {
    showHide();
    startStop();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "s") {
      showHide();
      startStop();
    }
  });
  resetButton.addEventListener("click", () => {
    reset();
    remove();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "q") {
      reset();
      remove();
    }
  });
});
