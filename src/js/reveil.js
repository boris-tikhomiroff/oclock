// document.addEventListener("DOMContentLoaded", () => {
//   const display = document.getElementById("clock");
//   const clearButton = document.querySelector(".clear-alarm");
//   const setButton = document.querySelector(".set-alarm");
//   const userDate = document.querySelector("input[type=datetime-local]");
//   let ul = document.querySelector("ul");
//   const audio = new Audio(
//     "https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3"
//   );
//   audio.loop = true;
//   let alarmTime = null;
//   let alarmTimeout = null;

//   function updateTime() {
//     const date = new Date();

//     const hour = formatTime(date.getHours());
//     const minutes = formatTime(date.getMinutes());
//     const seconds = formatTime(date.getSeconds());

//     display.innerText = `${hour} : ${minutes} : ${seconds}`;
//   }

//   function formatTime(time) {
//     if (time < 10) {
//       return "0" + time;
//     }
//     return time;
//   }

//   function setAlarmTime(value) {
//     alarmTime = value;
//   }

//   function displayAlarm() {
//     let li = document.createElement("li");
//     li.appendChild(document.createTextNode(userDate.value));
//     ul.appendChild(li);
//   }

//   function setAlarm() {
//     if (alarmTime) {
//       const current = new Date();
//       const timeToAlarm = new Date(alarmTime);

//       if (timeToAlarm > current) {
//         const timeout = timeToAlarm.getTime() - current.getTime();
//         alarmTimeout = setTimeout(() => audio.play(), timeout);
//         alert("Alarm set");
//         displayAlarm();
//       }
//     }
//     console.log("setalarm");
//   }

//   function clearAlarm() {
//     audio.pause();
//     if (alarmTimeout) {
//       clearTimeout(alarmTimeout);
//       alert("Alarm cleared");
//     }
//     console.log("hello");
//   }

//   clearButton.addEventListener("click", () => {
//     clearAlarm();
//   });
//   setButton.addEventListener("click", () => {
//     setAlarm();
//   });
//   userDate.addEventListener("change", () => {
//     setAlarmTime(userDate.value);
//   });

//   setInterval(updateTime, 1000);
// });

document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("clock");
  const userDate = document.querySelector("input[type=datetime-local]");
  const alarmButton = document.querySelector(".alarm__button");
  const nextAlarm = document.querySelector("ul:first-of-type");
  const pastAlarm = document.querySelector("ul:not(ul:first-of-type)");
  let timeoutId = [];
  let i = 0;
  let options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    weekday: "long",
  };

  // TEST
  // let date1 = new Date();
  // let date2 = new Date(new Date().valueOf() + 1000 * 3600 * 24);

  // if (date1.getTime() < date2.getTime()) {
  //   alert("Correct");
  // } else {
  //   alert("Incorrect");
  // }

  // TEST

  function setAlarm() {
    let alarm = userDate.value;
    // userDate.value = "";

    if (alarm !== "") {
      let current = new Date();
      let userAlarm = new Date(alarm);
      let duration = userAlarm - current;

      //   if (duration < 0) {
      //     // alert("Time has already passed");
      //   } else {
      // displayAlarm(
      //   userAlarm.toLocaleDateString("fr-FR", {
      //     year: "2-digit",
      //     month: "2-digit",
      //     day: "2-digit",
      //     hour: "2-digit",
      //     minute: "2-digit",
      //     second: "2-digit",
      //   })
      // );
      displayAlarm(userAlarm);

      timeoutId[i++] = setTimeout(() => {
        if (duration >= 0) {
          alert("Reveil");
        }
      }, duration);
      //   }
    } else {
      alert("Select Alarm Time !!!");
    }
  }

  function displayAlarm(alarm) {
    let li = document.createElement("li");
    let time = new Date(alarm);
    let userAlarm = time.getTime();
    let current = new Date();

    let x = userAlarm - current;
    let hours = formatTime(new Date(x).getHours() - 1);
    let min = formatTime(new Date(x).getMinutes());
    // console.log(sum);

    if (userAlarm > current) {
      // console.log("prochainement");
      li.appendChild(
        // document.createTextNode(`à ${hours}:${min}:${sec} dans x temps`)
        document.createTextNode(
          `le ${time.toLocaleString("fr-FR", options)} dans ${hours}h:${min}`
        )
      );
      nextAlarm.appendChild(li);
    } else {
      li.appendChild(
        // document.createTextNode(`à ${hours}:${min}:${sec} passé`)
        document.createTextNode(`le ${time.toLocaleString()} passé`)
      );
      pastAlarm.appendChild(li);
    }
  }

  function clock() {
    const date = new Date();
    const hour = formatTime(date.getHours());
    const minutes = formatTime(date.getMinutes());
    const seconds = formatTime(date.getSeconds());

    display.innerText = `${hour} : ${minutes} : ${seconds}`;
  }

  function toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum / 1000;
  }

  function formatTime(time) {
    if (time < 10) {
      return "0" + time;
    }
    return time;
  }

  //  EVENT LISTENERS //
  alarmButton.addEventListener("click", (e) => {
    //Call setAlarm function
    e.preventDefault();
    setAlarm();
  });

  //handle delete alarm event for removing the li from thelist
  //   ul.addEventListener("click", (e) => {
  //     removeAlarm(e.target);
  //   });

  setInterval(clock, 1000);
});
