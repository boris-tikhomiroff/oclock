document.addEventListener("DOMContentLoaded", () => {
  let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  let timerRef = document.querySelector(".timerDisplay");
  let int = null;
  let ul = document.querySelector("ul");
  let functionIsRunning = false;

  function deleteChild() {
    let e = document.querySelector("ul");

    //e.firstElementChild can be used.
    let child = e.lastElementChild;
    while (child) {
      e.removeChild(child);
      child = e.lastElementChild;
    }
  }

  const startButton = document.getElementById("startTimer");

  // document.getElementById("startTimer").addEventListener("click", () => {
  //   if (int !== null) {
  //     clearInterval(int);
  //   }
  //   int = setInterval(displayTimer, 10);
  // });

  document.getElementById("pauseTimer").addEventListener("click", () => {
    clearInterval(int);
  });

  document.getElementById("resetTimer").addEventListener("click", () => {
    clearInterval(int);
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    timerRef.innerHTML = "00 : 00 : 00 : 000 ";
    // ul.removeChild(ul);
    deleteChild();
  });

  function startStop() {
    if (int === null) {
      int = setInterval(displayTimer, 10);
    } else {
      clearInterval(int);
      int = null;
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

  const lap = document.querySelector(".lapTimer");

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

  lap.addEventListener("click", lapButton);
  startButton.addEventListener("click", () => {
    startStop();
  });
});
