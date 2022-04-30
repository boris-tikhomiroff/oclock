document.addEventListener("DOMContentLoaded", () => {
  const para = document.querySelector("p");

  function clock() {
    const now = new Date();
    const clock = document.querySelector(".horloge");
    const time = now.toLocaleTimeString("fr-FR");
    clock.innerHTML = time;
  }

  function dateOftheDay() {
    const now = new Date();
    const date = now.toLocaleDateString("fr-FR", {
      dateStyle: "full",
    });
    para.innerHTML = date;
    console.log(date);
  }
  dateOftheDay();

  setInterval(clock, 1000);
});
