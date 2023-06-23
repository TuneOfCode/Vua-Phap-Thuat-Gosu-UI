"use strict";
/**
 * Frame1
 */
const btnMenuList = document.querySelector(".frame1__header-button-menu-list");
const frame1HeaderMenuMobile = document.querySelector(
  ".frame1__header-menu-mobile"
);

btnMenuList.addEventListener("click", () => {
  if (frame1HeaderMenuMobile.classList.contains("show")) {
    frame1HeaderMenuMobile.classList.remove("show");
  } else {
    frame1HeaderMenuMobile.classList.toggle("show");
  }
});

/**
 * Frame2
 */
const joinedCountNumber = document.querySelector(
  ".joined-classroom__count-number span"
);
const timeline = document.querySelector(".joined-classroom__timeline");
const progressTimeLine = document.querySelector(
  ".joined-classroom__timeline-progress--active"
);
const pointers = {
  500: {
    className: "pointer__1--active",
    percent: 20,
  },
  1000: {
    className: "pointer__2--active",
    percent: 40,
  },
  2000: {
    className: "pointer__3--active",
    percent: 60,
  },
  5000: {
    className: "pointer__4--active",
    percent: 80,
  },
  10000: {
    className: "pointer__endpoint--active",
    percent: 100,
  },
};

joinedCountNumber.addEventListener("input", () => {
  setTimeout(() => {
    timeline.classList.remove("pointer__1--active");
    timeline.classList.remove("pointer__2--active");
    timeline.classList.remove("pointer__3--active");
    timeline.classList.remove("pointer__4--active");
    timeline.classList.remove("pointer__endpoint--active");
    const value = +joinedCountNumber.textContent;
    const mapValue = Object.keys(pointers).find((key) => +key === value);
    if (mapValue) {
      timeline.classList.add(pointers[mapValue].className);
      progressTimeLine.style.width = `${pointers[mapValue].percent}%`;
      return;
    }
    if (value < 100) {
      progressTimeLine.style.width = "3%";
      return;
    }
    if (value < 500) {
      progressTimeLine.style.width = `${(value / 100) * 4}%`;
      console.log("value: ", value, "_", `${(value / 100) * 4}%}`);
      return;
    }
    let percent = value < 1000 ? (value / 100) * 2 : (value / 1000) * 4;
    let pointer = 0;

    for (let i = 0; i < Object.keys(pointers).length; i++) {
      if (value >= Object.keys(pointers)[i]) {
        pointer = Object.keys(pointers)[i];
      }
    }
    if (pointers[pointer]) {
      percent += pointers[pointer].percent;
      timeline.classList.add(pointers[pointer].className);
    }
    console.log("pointer", pointer, `${percent}%`);
    progressTimeLine.style.width = `${percent}%`;
  }, 2000);
});
