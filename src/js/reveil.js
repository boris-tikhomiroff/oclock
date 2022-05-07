document.addEventListener("DOMContentLoaded", () => {
  const audio = new Audio("/src/audio/alarm.wav");
  const setButton = document.querySelector(".control__setButton");
  const clearButton = document.querySelector(".control__clearButton");
  const alarmInput = document.querySelector(".alarm__input");
  const userMessage = document.querySelector(".alarm__text");
  const nextAlarm = document.querySelector("article > ul:first-of-type");
  const pastAlarm = document.querySelector(
    "ul:not(article > ul:first-of-type)"
  );
  let displayMessage = null;
  audio.loop = true;
  let alarmTime = null;
  let alarmTimeout = null;
  let options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    weekday: "long",
  };

  // Créé l'alarm set les listes !
  function displayAlarm(newAlarm) {
    // Besoin d'alarm time pour le "son".
    alarmTime = alarmInput.value;
    let li = document.createElement("li");

    // User alarm:
    let time = newAlarm;
    let userAlarm = new Date(time);
    console.log(`USER : ${userAlarm}`);

    // Current Time
    let current = new Date();
    console.log(`ACTUEL : ${current}`);

    let sum = Date.parse(newAlarm) - Date.parse(current);
    // let date = new Date(sum).toLocaleTimeString("fr-FR", {
    //   hour: "2-digit",
    //   minute: "2-digit",
    //   second: "2-digit",
    // });
    let hours = new Date(sum).getHours() - 1;
    let min = new Date(sum).getMinutes();
    let sec = new Date(sum).getSeconds();
    console.log(hours, min, sec);

    if (Date.parse(current) < Date.parse(newAlarm)) {
      // console.log("alarme à venir");
      li.innerHTML = `${userAlarm.toLocaleTimeString("fr-FR", options)} ${
        userMessage.value
      } - in ${formatTime(hours)} : ${formatTime(min)} : ${formatTime(sec)}.`;
      nextAlarm.appendChild(li);
    } else {
      // console.log("alarme passée");
      li.innerHTML = `${userAlarm.toLocaleTimeString("fr-FR", options)} ${
        userMessage.value
      }`;
      pastAlarm.appendChild(li);
    }

    if (time) {
      // const current = new Date();
      // const timeToAlarm = new Date(alarmTime);
      if (current.getTime() < userAlarm.getTime()) {
        let message = userMessage.value;
        const timeout = userAlarm.getTime() - current.getTime();

        console.log(message);

        let alarmTimeout = setTimeout(() => audio.play(), timeout);
        setTimeout(() => window.alert(message), timeout);
      }
    } else {
      // INDIQUER A L'USER D'ECRIRE UN MESSAGE
      console.log("hello");
    }
  }

  function clearAlarm() {
    audio.pause();
    if (alarmTimeout) {
      clearTimeout(alarmTimeout);
      alert("Reveil cleared");
    }
  }

  function timer() {
    const date = new Date();
    let display = document.querySelector(".display");
    let hours = formatTime(date.getHours());
    let min = formatTime(date.getMinutes());
    let sec = formatTime(date.getSeconds());
    let clock = hours + ":" + min + ":" + sec;
    display.innerHTML = clock;
  }

  function formatTime(time) {
    if (time < 10) {
      return "0" + time;
    }
    return time;
  }

  function cleanInput() {
    return (userMessage.value = "");
  }

  /// EVENTS LISTENERS
  setButton.addEventListener("click", () => {
    displayAlarm(alarmInput.value);
    cleanInput();
    // setAlarme();
    // console.log(alarmInput.value);
  });
  clearButton.addEventListener("click", () => {
    clearAlarm();
  });

  setInterval(timer, 1000);
});
