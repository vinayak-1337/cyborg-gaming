const mobileNavOpen = document.querySelector("#mobile-nav-open");
const mobileNavClose = document.querySelector("#mobile-nav-close");
const headerRight = document.querySelector("#header__right");

mobileNavOpen.addEventListener("click", () => {
  headerRight.style.width = "130px";
});

mobileNavClose.addEventListener("click", ()=> {
  headerRight.style.width = "0";
})