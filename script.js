// let gameSeq = [];
// let userSeq = [];

// let btns = ["yellow", "green", "red", "purple"];

// let startGame = false;
// let level = 0;

// let h2 = document.querySelector("h2");

// document.addEventListener("keypress", function () {
//   if (startGame == false) {
//     console.log("game is started");
//     startGame = true;

//     levelUp();
//   }
// });

// function gameFlash(btn) {
//   btn.classList.add("flash");
//   setTimeout(function () {
//     btn.classList.remove("flash");
//   }, 200);
// }

// function userFlash(btn) {
//   btn.classList.add("userflash");
//   setTimeout(function () {
//     btn.classList.remove("userflash");
//   }, 200);
// }

// function levelUp() {
//   userSeq = [];
//   level++;
//   h2.innerText = `Level ${level}`;

//   // random Btn Flash
//   let randomBtnsIndx = Math.floor(Math.random() * btns.length);
//   let randomColors = btns[randomBtnsIndx];
//   let randomBtn = document.querySelector(`.${randomColors}`);
//   gameSeq.push(randomColors);
//   console.log(gameSeq);
//   gameFlash(randomBtn);
// }

// function checkAns(index) {
//   if (userSeq[index] == gameSeq[index]) {
//     if (userSeq.length == gameSeq.length) {
//       setTimeout(levelUp, 500);
//     }
//   } else {
//     h2.innerHTML = `Game Over! Your score was <b>${level}.</b><br>Press any to start the game.`;
//     document.body.style.backgroundColor = "red";
//     setTimeout(function () {
//       document.body.style.backgroundColor = "white";
//     }, 150);
//     reset();
//   }
// }

// function btnPress() {
//   let btn = this;
//   userFlash(btn);

//   userColor = btn.getAttribute("id");
//   userSeq.push(userColor);

//   checkAns(userSeq.length - 1);
// }

// let allBtns = document.querySelectorAll(".btn");
// for (btn of allBtns) {
//   btn.addEventListener("click", btnPress);
// }

// function reset() {
//   startGame = false;
//   gameSeq = [];
//   userSeq = [];
//   level = 0;
// }







// Game variables
let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "green", "red", "purple"];
let startGame = false;
let level = 0;
let highScore = localStorage.getItem("simonHighScore")
  ? parseInt(localStorage.getItem("simonHighScore"))
  : 0;

// DOM elements
const levelDisplay = document.getElementById("levelDisplay");
const highScoreDisplay = document.getElementById("highScore");
const statusDisplay = document.getElementById("statusDisplay");
const messageElement = document.getElementById("message");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const instructionElement = document.getElementById("instruction");

// Initialize high score display
highScoreDisplay.innerText = highScore;

// Start button event listener
startBtn.addEventListener("click", startGameSession);

// Reset button event listener
resetBtn.addEventListener("click", resetGame);

// Keyboard start
document.addEventListener("keypress", function (e) {
  if (!startGame && e.key.toLowerCase() !== " ") {
    startGameSession();
  }
});

// Button click handlers
function setupButtonListeners() {
  let allBtns = document.querySelectorAll(".btn");
  allBtns.forEach((btn) => {
    btn.addEventListener("click", btnPress);
  });
}

function startGameSession() {
  if (startGame) return;
  console.log("Game started!");
  startGame = true;
  gameSeq = [];
  userSeq = [];
  level = 0;
  messageElement.innerText = "";
  messageElement.classList.remove("success", "error");
  statusDisplay.innerText = "Playing";
  instructionElement.innerText = "Watch the sequence...";
  startBtn.disabled = true;
  levelUp();
}

function levelUp() {
  userSeq = [];
  level++;
  levelDisplay.innerText = level;
  messageElement.innerText = `Level ${level}`;
  messageElement.classList.remove("error");
  messageElement.classList.add("success");

  // Random button flash
  setTimeout(() => {
    let randomBtnsIndx = Math.floor(Math.random() * btns.length);
    let randomColors = btns[randomBtnsIndx];
    let randomBtn = document.querySelector(`.${randomColors}`);
    gameSeq.push(randomColors);
    console.log("Game Sequence:", gameSeq);
    gameFlash(randomBtn);
  }, 500);
}

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => {
    btn.classList.remove("userflash");
  }, 250);
}

function btnPress(event) {
  if (!startGame) return;

  let btn = event.currentTarget;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  console.log("User pressed:", userColor);

  checkAns(userSeq.length - 1);
}

function checkAns(index) {
  if (userSeq[index] === gameSeq[index]) {
    if (userSeq.length === gameSeq.length) {
      // Level complete
      messageElement.innerText = "✓ Correct! Level complete";
      messageElement.classList.remove("error");
      messageElement.classList.add("success");
      setTimeout(levelUp, 500);
    }
  } else {
    // Game Over
    gameOver();
  }
}

function gameOver() {
  console.log("Game Over!");
  startGame = false;
  messageElement.innerText = `❌ Wrong! Game Over`;
  messageElement.classList.remove("success");
  messageElement.classList.add("error");
  statusDisplay.innerText = "Game Over";
  instructionElement.innerText = "Press Start to play again";

  // Flash red background
  document.body.style.animation = "none";
  setTimeout(() => {
    document.body.style.animation = "";
  }, 10);

  // Update high score if current level is higher
  if (level > highScore) {
    highScore = level;
    localStorage.setItem("simonHighScore", highScore);
    highScoreDisplay.innerText = highScore;
    messageElement.innerText = `❌ Wrong! 🏆 New High Score: ${level}`;
    messageElement.style.fontSize = "1.1rem";
  } else {
    messageElement.innerText = `❌ Wrong! Your Score: ${level}`;
  }

  // Reset for next game
  setTimeout(() => {
    levelDisplay.innerText = "0";
    startBtn.disabled = false;
  }, 1000);

  reset();
}

function reset() {
  gameSeq = [];
  userSeq = [];
  level = 0;
  statusDisplay.innerText = "Ready";
}

function resetGame() {
  startGame = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
  levelDisplay.innerText = "0";
  messageElement.innerText = "";
  statusDisplay.innerText = "Ready";
  instructionElement.innerText = "Press Start to begin or any key on keyboard";
  startBtn.disabled = false;
}

// Setup button listeners on page load
setupButtonListeners();
