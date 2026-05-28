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
const loginSoundBtn = document.getElementById("loginSoundBtn");
const memeBtn = document.getElementById("memeBtn");
const hypeBtn = document.getElementById("hypeBtn");
const finaleBlastBtn = document.getElementById("finaleBlastBtn");
const goofyFinalBtn = document.getElementById("goofyFinalBtn");
const memeLine = document.getElementById("memeLine");

const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");
let confettiPieces = [];
let audioContext;

const memeMessages = [
  "Meme Meter: Panic dancing activated 🕺",
  "POV: Teddy is the event manager now 🧸📣",
  "Breaking News: Bestie too iconic to handle 💅",
  "Alert: Goofy levels crossing safe limits 🤪",
  "Mission status: Maximum fun, zero seriousness 🎊",
];

function showPage(pageKey) {
  Object.values(pages).forEach((page) => page.classList.remove("page--active"));
  pages[pageKey].classList.add("page--active");
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createConfettiBurst(x = window.innerWidth / 2, y = window.innerHeight / 3, amount = 120) {
  for (let i = 0; i < amount; i += 1) {
    confettiPieces.push({
      x,
      y,
      size: Math.random() * 8 + 4,
      speedX: (Math.random() - 0.5) * 9,
      speedY: Math.random() * -8 - 2,
      gravity: 0.14 + Math.random() * 0.08,
      rotate: Math.random() * 360,
      rotateSpeed: (Math.random() - 0.5) * 12,
      color: ["#ff5eb6", "#ffd166", "#8ce99a", "#7dd3fc", "#ffa8a8"][Math.floor(Math.random() * 5)],
      life: 120 + Math.random() * 30,
    });
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confettiPieces = confettiPieces.filter((piece) => piece.life > 0);

  confettiPieces.forEach((piece) => {
    piece.x += piece.speedX;
    piece.y += piece.speedY;
    piece.speedY += piece.gravity;
    piece.rotate += piece.rotateSpeed;
    piece.life -= 1;

    ctx.save();
    ctx.translate(piece.x, piece.y);
    ctx.rotate((piece.rotate * Math.PI) / 180);
    ctx.fillStyle = piece.color;
    ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 0.6);
    ctx.restore();
  });

  requestAnimationFrame(animateConfetti);
}

// Simple goofy sound generator using WebAudio.
function playGoofySound(type = "pop") {
  audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
  const now = audioContext.currentTime;

  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(audioContext.destination);

  if (type === "hype") {
    osc.type = "square";
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.exponentialRampToValueAtTime(780, now + 0.22);
    filter.type = "highpass";
  } else if (type === "sad") {
    osc.type = "triangle";
    osc.frequency.setValueAtTime(340, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.35);
    filter.type = "lowpass";
  } else {
    osc.type = "sine";
    osc.frequency.setValueAtTime(620, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.2);
    filter.type = "bandpass";
  }

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.15, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

  osc.start(now);
  osc.stop(now + 0.45);
}

// Hide loading overlay shortly after initial render.
window.addEventListener("load", () => {
  resizeCanvas();
  animateConfetti();
  setTimeout(() => loader.classList.add("hidden"), 900);
});

window.addEventListener("resize", resizeCanvas);

// Move from login to surprise question page.
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  showPage("question");
  playGoofySound("hype");
  createConfettiBurst(window.innerWidth / 2, window.innerHeight / 2, 90);
});

// Move to final magical page.
yesBtn.addEventListener("click", () => {
  showPage("yes");
  playGoofySound("hype");
  createConfettiBurst(window.innerWidth / 2, window.innerHeight / 2, 170);
});

// Move to funny dramatic NO page.
noBtn.addEventListener("click", () => {
  showPage("no");
  playGoofySound("sad");
});

// Return from NO page to question page.
goBackBtn.addEventListener("click", () => {
  showPage("question");
  playGoofySound("pop");
});

loginSoundBtn.addEventListener("click", () => playGoofySound("pop"));

memeBtn.addEventListener("click", () => {
  playGoofySound("pop");
  memeLine.textContent = memeMessages[Math.floor(Math.random() * memeMessages.length)];
});

hypeBtn.addEventListener("click", () => {
  playGoofySound("hype");
  createConfettiBurst(window.innerWidth * 0.45, window.innerHeight * 0.38, 120);
});

finaleBlastBtn.addEventListener("click", () => {
  playGoofySound("hype");
  createConfettiBurst(window.innerWidth / 2, window.innerHeight / 2, 220);
});

goofyFinalBtn.addEventListener("click", () => {
  playGoofySound("pop");
  createConfettiBurst(window.innerWidth * 0.2, window.innerHeight * 0.25, 70);
  createConfettiBurst(window.innerWidth * 0.8, window.innerHeight * 0.3, 70);
});
