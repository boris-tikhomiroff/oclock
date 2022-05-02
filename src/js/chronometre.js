document.addEventListener("DOMContentLoaded", () => {
  // DOM CONTENT
  const startButton = document.getElementById("startTimer");
  const resetButton = document.getElementById("resetTimer");
  const lap = document.querySelector(".lapTimer");
  let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  let timerRef = document.querySelector(".timerDisplay");
  let int = null;
  let functionIsRunning = false;
  let ul = document.querySelector("ul");

  function deleteChild() {
    let el = document.querySelector("ul");

    let child = el.lastElementChild;
    while (child) {
      el.removeChild(child);
      child = el.lastElementChild;
    }
  }

  function reset() {
    if (int !== null) {
      clearInterval(int);
      int = null;
    }
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    timerRef.innerHTML = "00 : 00 : 00 : 000 ";
  }

  function startStop() {
    if (int === null) {
      int = setInterval(displayTimer, 10);
    } else {
      clearInterval(int);
      int = null;
      functionIsRunning = false;
    }
  }

  function displayTimer() {
    milliseconds += 10;
    if (milliseconds == 1000) {
      functionIsRunning = true;
      milliseconds = 0;
      seconds++;
      if (seconds == 60) {
        seconds = 0;
        minutes++;
        if (minutes == 60) {
          minutes = 0;
          hours++;
        }
      }
    }
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms =
      milliseconds < 10
        ? "00" + milliseconds
        : milliseconds < 100
        ? "0" + milliseconds
        : milliseconds;

    timerRef.innerHTML = ` ${h} : ${m} : ${s} : ${ms}`;
  }

  function lapButton() {
    if (!functionIsRunning) {
      // Rendre le button Lap innactive
      console.log("cest vide");
    } else {
      let li = document.createElement("li");
      li.appendChild(document.createTextNode(timerRef.innerText));
      ul.appendChild(li);
    }
  }

  // Event LISTENERS
  lap.addEventListener("click", lapButton);
  resetButton.addEventListener("click", () => {
    deleteChild();
    reset();
  });
  startButton.addEventListener("click", () => {
    startStop();
  });
});
