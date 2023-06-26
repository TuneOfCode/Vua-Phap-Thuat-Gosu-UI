"use strict";
/**
 * Frame1
 */
// Nút toggle menu topbar cho mobile
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
// Kiểm tra thanh thời gian
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
// Nút toggle menu treo
const btnToggleMenuTreo = document.querySelector(".frame1__menu-treo-arrow");
const menuTreo = document.querySelector(".frame1__menu-treo");

btnToggleMenuTreo.addEventListener("click", () => {
  if (menuTreo.style.right === "-14%") {
    menuTreo.style.right = "2%";
  } else {
    menuTreo.style.right = "-14%";
  }
});

/**
 * Frame3
 */
const popup = document.querySelector(".popup");
const loginComp = document.querySelector(".frame3__content-login");
const registerComp = document.querySelector(
  ".frame3__content-register-classroom"
);
// Đã đăng nhập trước đó
document.body.onload = function () {
  if (localStorage.getItem("username")) {
    loginComp.classList.remove("show-flex");
    if (localStorage.getItem("isJoined") === "true") {
      registerComp.classList.remove("show");
      myClassroomComp.classList.add("show");
    } else {
      registerComp.classList.add("show");
      myClassroomComp.classList.remove("show");
    }
  }
};
const myClassroomComp = document.querySelector(".frame3__content-my-classroom");
// Xử lý khi đóng popup
const btnClosePopup = document.querySelector(".content-header__close");
btnClosePopup.addEventListener("click", function () {
  popup.classList.remove("show");
  const popupActive = document.querySelector(
    btnClosePopup.getAttribute("close-popup")
  );
  popupActive.classList.remove("show");
});

// Xử lý khi bật popup
function openPopup(btnActive) {
  const popupJoinClass = document.querySelector(
    btnActive.getAttribute("open-popup")
  );
  popup.classList.add("show");
  btnClosePopup.setAttribute(
    "close-popup",
    btnActive.getAttribute("open-popup")
  );
  popupJoinClass.classList.add("show");
}

// Nút gia nhập lớp học
const btnsJoinClass = document.querySelectorAll(".btn__join-classroom");
for (let btnJoinClass of btnsJoinClass) {
  btnJoinClass.addEventListener("click", function () {
    openPopup(btnJoinClass);
    const txtFullname = document.querySelector('input[name="txtFullname"]');
    const txtEmail = document.querySelector('input[name="txtEmail"]');
    txtFullname.value = "My Admin";
    txtEmail.value = "admin@gosu.com";
    localStorage.setItem("isJoined", true);
  });
}

// Nút đồng ý gia nhập lớp học
const btnJoinClassroomSubmit = document.querySelector(
  ".btn__join-classroom-submit"
);
btnJoinClassroomSubmit.addEventListener("click", function () {
  loginComp.classList.remove("show-flex");
  registerComp.classList.remove("show");
  myClassroomComp.classList.add("show");
  popup.classList.remove("show");
  document.querySelector("#popup__join-classroom").classList.remove("show");
});

// Nút xem lớp học
const btnsWatchClass = document.querySelectorAll(".btn__watch-classroom");
for (let btnWatchClass of btnsWatchClass) {
  btnWatchClass.addEventListener("click", function () {
    openPopup(btnWatchClass);
  });
}

// Nút tạo mới lớp học
const btnsCreateClass = document.querySelectorAll(
  ".area-button__create-classroom"
);
for (let btnCreateClass of btnsCreateClass) {
  btnCreateClass.addEventListener("click", function () {
    openPopup(btnCreateClass);
  });
}

// Nút xem bảng xếp hạng
const btnsRanking = document.querySelectorAll(".area-button__show-rank");
for (let btnRanking of btnsRanking) {
  btnRanking.addEventListener("click", function () {
    openPopup(btnRanking);
  });
}

// Nút login
const btnLogin = document.querySelector(".login__submit");
const popupApprove = document.querySelector("#popup__approve");
btnLogin.addEventListener("click", function () {
  const txtUsername = document.querySelector('input[name="txtUsername"]');
  const txtPassword = document.querySelector('input[name="txtPassword"]');
  localStorage.setItem("username", txtUsername.value);
  if (txtUsername.value === "admin" && txtPassword.value === "123") {
    // // hiển tuỳ chọn duyệt
    // popup.classList.add("show");
    // popupApprove.classList.add("show");
    // btnClosePopup.setAttribute("close-popup", "#popup__approve");
    // lưu trong localstorage
    txtUsername.value = "";
    txtPassword.value = "";
  }
  loginComp.classList.remove("show-flex");
  registerComp.classList.add("show");
});

// Nút xem thông báo
const btnsNotification = document.querySelectorAll(
  ".my-classroom__detail-notify"
);
for (let btnNotification of btnsNotification) {
  btnNotification.addEventListener("click", function () {
    const numberNotifications = document.querySelector(
      ".my-classroom__detail-notify span"
    );
    if (localStorage.getItem("username") === "admin") {
      numberNotifications.textContent = 3;
      popup.classList.add("show");
      popupApprove.classList.add("show");
      btnClosePopup.setAttribute("close-popup", "#popup__approve");
    } else {
      numberNotifications.textContent = 1;
      openPopup(btnNotification);
    }
  });
}

// Nút chia sẻ sự kiện
const btnsShareEvent = document.querySelectorAll(".btn__share-event");
for (let btnShareEvent of btnsShareEvent) {
  btnShareEvent.addEventListener("click", function () {
    openPopup(btnShareEvent);
  });
}

// Nút copy link
const contentLinkShare = document.querySelector(".body-content__input input");
const btnCopyLink = document.querySelector(".btn__copy-link");
btnCopyLink.addEventListener("click", async function () {
  try {
    navigator.clipboard.writeText(contentLinkShare.value);
    alert("Đã copy link");
  } catch (error) {
    alert("Không thể copy link vì: ", error);
  }
});

/**
 * Frame4
 */
// Nút chuyển đổi slide
const btnsSlide = document.querySelectorAll(".area-button-slide___item");
const mainSlide = document.querySelector(".main__screen-slide img");
const mainSlideMobile = document.querySelector(
  ".main__screen-slide--mobile img"
);
const slides = [
  {
    id: 1,
    slug: "tinhlinh",
  },
  {
    id: 2,
    slug: "nguhon",
  },
  {
    id: 3,
    slug: "treomay",
  },
  {
    id: 4,
    slug: "kyngo",
  },
  {
    id: 5,
    slug: "dautruong",
  },
];
for (let i = 1; i <= btnsSlide.length; i++) {
  btnsSlide[i - 1].addEventListener("click", function () {
    mainSlide.src = `./assets/images/frame4/pc-img-${slides[i - 1].slug}.png`;
    mainSlideMobile.src = `./assets/images/frame4/mb-img-${
      slides[i - 1].slug
    }.png`;
    for (let btnSlide of btnsSlide) {
      btnSlide.classList.remove("area-button-slide___item--active");
    }
    btnsSlide[i - 1].classList.add("area-button-slide___item--active");
  });
}

// Tự động chuyển slide sau 2s
let indexSlide = 1;
setInterval(() => {
  mainSlide.src = `./assets/images/frame4/pc-img-${
    slides[indexSlide - 1].slug
  }.png`;
  mainSlideMobile.src = `./assets/images/frame4/mb-img-${
    slides[indexSlide - 1].slug
  }.png`;
  for (let btnSlide of btnsSlide) {
    btnSlide.classList.remove("area-button-slide___item--active");
  }
  btnsSlide[indexSlide - 1].classList.add("area-button-slide___item--active");
  indexSlide++;
  if (indexSlide > 5) {
    indexSlide = 1;
  }
}, 2000);
