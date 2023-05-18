//Tower Defense Game
let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.width = "100%";
canvas.style.height = "100%";
let c = canvas.getContext("2d");

// ------------------------------------------------- Game Variables ------------------------------------------------- //

let lives = 10;
let score;
let timer = document.getElementById("timer");
let gameover = false;

let xPosDot = Math.floor(Math.random() * (0.8 * canvas.width - 200) + 200);
let yPosDot = Math.floor(Math.random() * (0.8 * canvas.height - 200) + 200);

let yPosPaddel = Math.floor(Math.random() * (0.8 * canvas.height - 200) + 200);
let yPosPaddel2 = Math.floor(Math.random() * (0.8 * canvas.height - 200) + 200);

const xPosPaddel = canvas.width / 6;
const xPosPaddel2 = canvas.width - canvas.width / 6;

// Hastighet för respektive kvadrat, i x- och y-led
let dxDot = 3;
let dyDot = 2;

let paddelspeed = 10;

const sizeDot = 30;

const heightSizePaddel = 200;
const widthSizePaddel = 10;

// Variabler som håller reda på respektive kvadrats mittkoordinat
let xCenterDot = (xPosDot + xPosDot + sizeDot) / 2;
let yCenterDot = (yPosDot + yPosDot + sizeDot) / 2;

// Variabler för tidsmätning
let ticks = 0;
let runtime = 0;
const updateFrequency = 10; // millisekunder per steg


//save these items in local storage every 5 seconds
boot();

let saveState = setInterval(function () {
  localStorage.setItem("lives", lives);
  localStorage.setItem("time", time);
  localStorage.setItem("score", score);
}, 5000);

let GameUpdater = setInterval(update, updateFrequency);
let PaddleAIUpdater = setInterval(PaddelAI, updateFrequency);


//------------------------------------------------- Paddle Game ------------------------------------------------- //
document.onkeydown = function (e) {
  const key = e.key;
  switch (key) {
    case "ArrowUp":
      yPosPaddel = yPosPaddel - paddelspeed;
      break;
    case "ArrowDown":
      yPosPaddel = yPosPaddel + paddelspeed;
      break;
  }
};

// Ritar upp kvadraterna
function update() {
  // Håller koll på tiden som programmet varit igång
  ticks += 1;
  runtime = (ticks / 1000) * updateFrequency; // i sekunder
  timer.innerHTML = "Tid: " + runtime.toFixed(1) + " sekunder";

  //GameSpeed
  if (runtime % 10 == 0) {
    dxDot += 1;
    dyDot += 1;
  }

  clearCanvas();
  checkBounce();
  paddelCanvasCollide();
  paddelCollisionDetectionTM();
  healthBar();

  // Beräkna nytt läge
  xPosDot += dxDot;
  yPosDot += dyDot;

  xCenterDot = (xPosDot + xPosDot + sizeDot) / 2;
  yCenterDot = (yPosDot + yPosDot + sizeDot) / 2;

  drawRects();
}

function paddelCollisionDetectionTM() {
  //Paddel 1
  // check if the dot is within the horizontal range of the paddle
  let dotWithinPaddleX =
    xPosDot + sizeDot > xPosPaddel && xPosDot < xPosPaddel + widthSizePaddel;

  // check if the dot is within the vertical range of the paddle
  let dotWithinPaddleY =
    yPosDot + sizeDot > yPosPaddel && yPosDot < yPosPaddel + heightSizePaddel;

  // check if the dot overlaps with the paddle
  let dotOverlapsPaddle = dotWithinPaddleX && dotWithinPaddleY;

  // if the dot overlaps with the paddle, reverse its horizontal direction
  if (dotOverlapsPaddle) {
    dxDot = -dxDot;
  }

  //Paddel 2
  // check if the dot is within the horizontal range of the second paddle
  let dotWithinPaddle2X =
    xPosDot + sizeDot > xPosPaddel2 && xPosDot < xPosPaddel2 + widthSizePaddel;

  // check if the dot is within the vertical range of the second paddle
  let dotWithinPaddle2Y =
    yPosDot + sizeDot > yPosPaddel2 && yPosDot < yPosPaddel2 + heightSizePaddel;

  // check if the dot overlaps with the second paddle
  let dotOverlapsPaddle2 = dotWithinPaddle2X && dotWithinPaddle2Y;

  // if the dot overlaps with the second paddle, reverse its horizontal direction
  if (dotOverlapsPaddle2) {
    dxDot = -dxDot;
  }
}

function paddelCanvasCollide() {
  //Stop the paddle1 from going out of the canvas
  if (yPosPaddel < 0) {
    yPosPaddel = 0;
  }

  if (yPosPaddel > canvas.height - heightSizePaddel) {
    yPosPaddel = canvas.height - heightSizePaddel;
  }

  //Stop the paddle2 from going out of the canvas
  if (yPosPaddel2 < 0) {
    yPosPaddel2 = 0;
  }

  if (yPosPaddel2 > canvas.height - heightSizePaddel) {
    yPosPaddel2 = canvas.height - heightSizePaddel;
  }
}

//Check for edge bounce
function checkBounce() {
  if (xPosDot < 0 || xPosDot > canvas.width - sizeDot) {
    dxDot = -dxDot;
  }

  if (yPosDot < 0 || yPosDot > canvas.height - sizeDot) {
    dyDot = -dyDot;
  }

  if (xPosDot < 0) {
    lives--;
  }

  if (xPosDot > canvas.width - sizeDot) {
    score++;
  }
}

function checkStatus() {
  if (lives <= 0) {
    alert("AI wins!");
    document.location.reload();
  }

  if (score == 3) {
    alert("Player wins!");
    document.location.reload();
  }
}

function clearCanvas() {
  c.fillStyle = "rgba(0, 0, 0, 0.2)";
  c.fillRect(0, 0, canvas.width, canvas.height);
}

function drawRects() {
  // Den röda kvadraten ritas i sitt nya läge
  c.fillStyle = "red";
  c.fillRect(xPosDot, yPosDot, sizeDot, sizeDot);

  // Den vita paddeln (rektangel) ritas i sitt nya läge
  c.fillStyle = "white";
  c.fillRect(xPosPaddel, yPosPaddel, widthSizePaddel, heightSizePaddel);

  // Den vita paddeln (rektangel) ritas i sitt nya läge
  c.fillStyle = "white";
  c.fillRect(xPosPaddel2, yPosPaddel2, widthSizePaddel, heightSizePaddel);
}

function PaddelAI() {
  if (yPosPaddel2 < yCenterDot) {
    yPosPaddel2 = yPosPaddel2 + paddelspeed;
  }

  if (yPosPaddel2 > yCenterDot) {
    yPosPaddel2 = yPosPaddel2 - paddelspeed;
  }
}

// ------------------------------------------------- init ------------------------------------------------- //

function boot() {
  //check if files have been saved
  if (localStorage.getItem("score") != null) {
    lives = localStorage.getItem("lives");
    score = localStorage.getItem("score");
    time = localStorage.getItem("time");
    game();
  } else {
    firstBoot();
  }
}

function firstBoot() {
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.font = "30px Arial";
  c.fillStyle = "white";
  c.textAlign = "center";
  c.fillText("Welcome to Nuke-Nation", canvas.width / 2, canvas.height / 4);
  c.fillText(
    "Press for normal pong",
    canvas.width / 2,
    canvas.height / 2 + 100
  );
  c.fillText("Press for nuke pong", canvas.width / 2, canvas.height / 2 + 200);
}

//------------------------------------------------- Game Loops -------------------------------------------------//

function healthBar() {
  c.fillStyle = "red";
  c.fillRect(canvas.width / 4, 0, canvas.width, 10);

  //depends on lives
  c.fillStyle = "green";
  c.fillRect(canvas.width / 4, 0, canvas.width, 10);

  c.fillStyle = "white";
  c.font = "30px Arial";
  c.fillText("Lives: " + lives, 10, 100);
}

function scoreTracking() {
  c.fillStyle = "white";
  c.font = "30px Arial";
  c.fillText("Score: " + score, 10, 50);
  if (lives <= 0) {
    clearInterval(timerInterval);
    clearInterval(gameInterval);
    gameoverScreen();
  }
}

// ------------------------------------------------- Game Objects  ------------------------------------------------- //

//Draw Map
const map = new Image();
map.src = "./Objects/GameMaps/MapLVL0.png";

function drawMap() {
  map.onload = () => {
    c.drawImage(map, 0, 0);
  };
}

