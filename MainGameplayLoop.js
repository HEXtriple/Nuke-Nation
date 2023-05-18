//Tower Defense Game
let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.width = "100%";
canvas.style.height = "100%";
let c = canvas.getContext("2d");

//boot()
coreGameLoop();

// ------------------------------------------------- init ------------------------------------------------- //

function boot() {
  //check if files have been saved
  if (localStorage.getItem("munny") != null) {
    munny = localStorage.getItem("munny");
    lives = localStorage.getItem("lives");
    time = localStorage.getItem("time");
    game();
  } else {
    firstBoot();
  }
}

function firstBoot(){
  coreGameLoop();
}

// ------------------------------------------------- Game Variables ------------------------------------------------- //
const EASYMODEMUNNY = 500;
const NORMALMODEMUNNY = 250;
const HARDMODEMUNNY = 150;

let munny = 0;
let lives = 10;
let timer = document.getElementById("timer");
let score = document.getElementById("score");
let gameover = false;



// ------------------------------------------------- Splash Screens ------------------------------------------------- //
function starterScreen() {
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.font = "30px Arial";
  c.fillStyle = "white";
  c.textAlign = "center";
  c.fillText("Welcome to Nuke-Nation", canvas.width / 2, canvas.height / 4);
  c.fillText("Press Space to start", canvas.width / 2, canvas.height / 2 + 50);
  c.fillText(
    "Press 1 for Easy Mode",
    canvas.width / 2,
    canvas.height / 2 + 100
  );
  c.fillText(
    "Press 2 for Normal Mode",
    canvas.width / 2,
    canvas.height / 2 + 150
  );
  c.fillText(
    "Press 3 for Hard Mode",
    canvas.width / 2,
    canvas.height / 2 + 200
  );
  while (true) {
    document.onkeydown = function (e) {
      const key = e.key;
      switch (key) {
        case " ":
          return;
        case "1":
          munny = EASYMODEMUNNY;
        case "2":
          munny = NORMALMODEMUNNY;
        case "3":
          munny = HARDMODEMUNNY;
      }
    };
  }
}



function menu() {
  starterScreen();
  document.onkeydown = function (e) {
    const key = e.key;
    switch (key) {
      case "1":
        munny = EASYMODEMUNNY;
        lives = 10;
        game();
        break;
      case "2":
        munny = NORMALMODEMUNNY;
        lives = 10;
        game();
        break;
      case "3":
        munny = HARDMODEMUNNY;
        lives = 10;
        game();
        break;
    }
  };
}

function saveGame() {
  localStorage.setItem("munny", munny);
  localStorage.setItem("lives", lives);
  localStorage.setItem("time", time);
}



//------------------------------------------------- Game Loops -------------------------------------------------//

function healthBar() {
  c.fillStyle = "green";
  c.fillRect(0, 0, 100, 10);
}

function gameTracking() {
  let time = 0;
  let timerInterval = setInterval(function () {
    time++;
    timer.innerHTML = time;
  }, 1000);
  
  let gameInterval = setInterval(function () {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = "white";
    c.font = "30px Arial";
    c.fillText("Score: " + score, 10, 50);
    c.fillText("Munny: " + munny, 10, 150);
    if (lives <= 0) {
      gameover = true;
      gameoverSound.play();
      clearInterval(timerInterval);
      clearInterval(gameInterval);
      gameoverScreen();
    }
  }, 1000 / 60);

  let livesInterval = setInterval(function () {
    c.fillStyle = "white";
    c.font = "30px Arial";
    c.fillText("Lives: " + lives, 10, 100);
  }, 1000 / 60);
}

function coreGameLoop() {
  starterScreen();
  c.clearCanvas();
  c.fillStyle = "black";
  menu();
}


// ------------------------------------------------- End Game ------------------------------------------------- //
function gameoverScreen() {
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.font = "30px Arial";
  c.fillStyle = "white";
  c.textAlign = "center";
  c.fillText("Game Over", canvas.width / 2, canvas.height / 2);
  c.fillText(
    "Press Space to restart",
    canvas.width / 2,
    canvas.height / 2 + 50
  );
}