// Small helper to switch between page sections with fade/scale transitions.
const pages = {
  login: document.querySelector('[data-page="login"]'),
  question: document.querySelector('[data-page="question"]'),
  no: document.querySelector('[data-page="no"]'),
  yes: document.querySelector('[data-page="yes"]'),
};

const loader = document.getElementById("loader");
const loginForm = document.getElementById("loginForm");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const goBackBtn = document.getElementById("goBackBtn");

function showPage(pageKey) {
  Object.values(pages).forEach((page) => page.classList.remove("page--active"));
  pages[pageKey].classList.add("page--active");
}

// Hide loading overlay shortly after initial render.
window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("hidden"), 900);
});

// Move from login to surprise question page.
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  showPage("question");
});

// Move to final magical page.
yesBtn.addEventListener("click", () => {
  showPage("yes");
});

// Move to funny dramatic NO page.
noBtn.addEventListener("click", () => {
  showPage("no");
});

// Return from NO page to question page.
goBackBtn.addEventListener("click", () => {
  showPage("question");
});
