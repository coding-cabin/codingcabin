//  mobile navigation
const buttonOpen = document.querySelector(".nav__inner--mobile button");
const buttonClose = document.querySelector(".close-btn");
const wrapper = document.querySelector(".wrapper__mobile");

buttonOpen.addEventListener("click", function (e) {
  wrapper.classList.add("is-shown");
  this.setAttribute("aria-expanded", "true");
  document.body.setAttribute("aria-hidden", "true");

  e.preventDefault();
});

buttonClose.addEventListener("click", function (e) {
  wrapper.classList.remove("is-shown");
  buttonOpen.setAttribute("aria-expanded", "false");
  document.body.setAttribute("aria-hidden", "false");
  e.preventDefault();
});

// active state link
const currentLink = location.pathname;
const navLink = document.querySelectorAll(".nav__inner--links ul li a");
navLink.forEach(function (item, idx) {
  if (item.getAttribute("href") === currentLink) {
    item.parentElement.classList.add("active");
  }
});

// dark mode
const btn_dark = document.querySelector(".btn-dark a");
const currentTheme = localStorage.getItem("theme");

if (currentTheme == "dark") {
  document.body.classList.add("dark-theme");
  btn_dark.innerHTML = `<svg viewBox="0 0 15 15" fill="hsl(60, 100%, 68%)" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M1.66 11.362A6.5 6.5 0 007.693.502a7 7 0 11-6.031 10.86z" stroke="currentColor" stroke-linejoin="round"></path></svg>`;
} else {
  btn_dark.innerHTML = `<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M7.5 1.5v-1m0 13.99v-.998m6-5.997h1m-13 0h-1m2-4.996l-1-1m12 0l-1 1m-10 9.993l-1 1m12 0l-1-1m-2-4.997a2.999 2.999 0 01-3 2.998 2.999 2.999 0 113-2.998z" stroke="currentColor" stroke-linecap="square"></path></svg>`;
}

btn_dark.addEventListener("click", function (e) {
  e.preventDefault();
  this.classList.toggle("dark-actived");

  document.body.classList.toggle("dark-theme");

  let theme = "light";

  if (document.body.classList.contains("dark-theme")) {
    theme = "dark";
    this.innerHTML = `<svg viewBox="0 0 15 15" fill="hsl(60, 100%, 68%)" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M1.66 11.362A6.5 6.5 0 007.693.502a7 7 0 11-6.031 10.86z" stroke="currentColor" stroke-linejoin="round"></path></svg>`;
  } else {
    this.innerHTML = `<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M7.5 1.5v-1m0 13.99v-.998m6-5.997h1m-13 0h-1m2-4.996l-1-1m12 0l-1 1m-10 9.993l-1 1m12 0l-1-1m-2-4.997a2.999 2.999 0 01-3 2.998 2.999 2.999 0 113-2.998z" stroke="currentColor" stroke-linecap="square"></path></svg>`;
  }

  localStorage.setItem("theme", theme);
});

const pagItems = document.querySelectorAll(".pagination__item");

for (let i = 0; i < pagItems.length; i++) {
  let counter = i + 1;
  let string = "Page " + counter;

  if (pagItems[i].getAttribute("aria-current")) {
    string = "Page " + counter + ", Current Page";
  }

  pagItems[i].setAttribute("aria-label", string);
}
