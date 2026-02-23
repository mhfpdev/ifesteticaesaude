const burger = document.getElementById("burgerBtn");
const menu = document.querySelector(".burger-area");
const closeBtn = document.getElementById("closeBtn");
const overlay = document.getElementById("close-overlay");
const links = document.querySelectorAll(".burger-area a");

burger.addEventListener("click", () => {
  menu.classList.add("open");
  overlay.classList.add("show");
});

closeBtn.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);

links.forEach(link => {
    link.addEventListener("click", closeMenu);
});

function closeMenu() {
  menu.classList.remove("open");
  overlay.classList.remove("show");
}
