document.addEventListener("DOMContentLoaded", () => {
  /* ------------------------------------------------
                    CURSOR
--------------------------------------------------- */
  const cursor = document.querySelector("#cursor");
  const cursorCircle = cursor.querySelector(".cursor__circle");

  const mouse = { x: -100, y: -100 }; // mouse pointer's coordinates
  const pos = { x: 0, y: 0 }; // cursor's coordinates
  const speed = 0.1; // between 0 and 1

  const updateCoordinates = (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  };

  window.addEventListener("mousemove", updateCoordinates);

  function getAngle(diffX, diffY) {
    return (Math.atan2(diffY, diffX) * 180) / Math.PI;
  }

  function getSqueeze(diffX, diffY) {
    const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
    const maxSqueeze = 0.15;
    const accelerator = 1500;
    return Math.min(distance / accelerator, maxSqueeze);
  }

  const updateCursor = () => {
    const diffX = Math.round(mouse.x - pos.x);
    const diffY = Math.round(mouse.y - pos.y);

    pos.x += diffX * speed;
    pos.y += diffY * speed;

    const angle = getAngle(diffX, diffY);
    const squeeze = getSqueeze(diffX, diffY);

    const scale = "scale(" + (1 + squeeze) + ", " + (1 - squeeze) + ")";
    const rotate = "rotate(" + angle + "deg)";
    const translate = "translate3d(" + pos.x + "px ," + pos.y + "px, 0)";

    cursor.style.transform = translate;
    cursorCircle.style.transform = rotate + scale;
  };

  function loop() {
    updateCursor();
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);

  const cursorModifiers = document.querySelectorAll("[cursor-class]");

  cursorModifiers.forEach((curosrModifier) => {
    curosrModifier.addEventListener("mouseenter", function () {
      const className = this.getAttribute("cursor-class");
      cursor.classList.add(className);
    });

    curosrModifier.addEventListener("mouseleave", function () {
      const className = this.getAttribute("cursor-class");
      cursor.classList.remove(className);
    });
  });
 
  
});

/* ------------------------------------------------
                  IMAGE
--------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.4
  };

  // IMAGE ANIMATION

  let revealCallback = (entries) => {
    entries.forEach((entry) => {
      let container = entry.target;

      if (entry.isIntersecting) {
        console.log(container);
        container.classList.add("animating");
        return;
      }

      if (entry.boundingClientRect.top > 0) {
        container.classList.remove("animating");
      }
    });
  };

  let revealObserver = new IntersectionObserver(revealCallback, options);

  document.querySelectorAll(".home__reveal").forEach((reveal) => {
    revealObserver.observe(reveal);
  });

  // TEXT ANIMATION

  let fadeupCallback = (entries) => {
    entries.forEach((entry) => {
      let container = entry.target;
      container.classList.add("not-fading-up");

      if (entry.isIntersecting) {
        container.classList.add("fading-up");
        return;
      }

      if (entry.boundingClientRect.top > 0) {
        container.classList.remove("fading-up");
      }
    });
  };

  let fadeupObserver = new IntersectionObserver(fadeupCallback, options);

  document.querySelectorAll(".home__fadeup").forEach((fadeup) => {
    fadeupObserver.observe(fadeup);
  });
});
