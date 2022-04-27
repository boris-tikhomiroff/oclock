// console.log(date);
// console.log(date.toTimeString());
//Date 26/04/2022
// console.log(date.toLocaleDateString("fr-FR"));
//Date 26/04/2022, 16:59:41
// console.log(date.toLocaleString("fr-FR"));
// 16:59:41
// console.log(date.toLocaleTimeString("fr-FR"));

document.addEventListener("DOMContentLoaded", () => {
  const timerInput = document.querySelector(".timer__input");
  const timerButton = document.querySelector(".timer__button");
  const upButton = document.querySelector(".up");
  const downButton = document.querySelector(".down");
  let timerIntval = null;

  function clock() {
    const now = new Date();
    const hours = document.querySelector(".clock__hours");
    const time = now.toLocaleTimeString("fr-FR");
    hours.innerHTML = time;
    console.log(time);
  }

  function timer() {
    // document.addEventListener("keydown", (event) => {
    //   switch (event.key) {
    //     case "ArrowUp":
    //       timerInput.value++;
    //       break;
    //     case "ArrowDown":
    //       if (timerInput.value <= 0) {
    //         timerInput.value = 0;
    //       } else {
    //         timerInput.value--;
    //       }
    //       break;
    //   }
    // });
    
    upButton.addEventListener("click", (event) => {
      timerInput.value++;
    });

    downButton.addEventListener("click", (event) => {
      if (timerInput.value <= 0) {
        timerInput.value = 0;
      } else {
        timerInput.value--;
      }
    });

    timerButton.addEventListener("click", () => {
      if (timerIntval === null) {
        timerIntval = setInterval(() => {
          if (timerInput.value <= 0) {
            timerInput.value = 0;
            clearInterval(timerIntval);
            timerIntval = null;
            window.alert("Terminus, tout le monde descend !");
          } else {
            timerInput.value--;
          }
        }, 1000);
      } else {
        clearInterval(timerIntval);
        timerIntval = null;
      }
    });
  }

  function stopWatch() {

  }

  setInterval(clock, 1000);
  timer();
  stopWatch();
});
