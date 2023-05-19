//Tower Defense Game
let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.width = "100%";
canvas.style.height = "100%";
let c = canvas.getContext("2d");

boot();
// ------------------------------------------------- Game Variables ------------------------------------------------- //

//
let lives = 10;
let score = 0;
let round = 3;
let timer = document.getElementById("timer");
let gameover = false;
let isPaused = false;

//Generate random positions for the ball and paddles
let xPosDot = Math.floor(Math.random() * (0.8 * canvas.width - 200) + 200);
let yPosDot = Math.floor(Math.random() * (0.8 * canvas.height - 200) + 200);

let yPosPaddel = Math.floor(Math.random() * (0.8 * canvas.height - 200) + 200);
let yPosPaddel2 = Math.floor(Math.random() * (0.8 * canvas.height - 200) + 200);

const xPosPaddel = canvas.width / 6;
const xPosPaddel2 = canvas.width - canvas.width / 6;

// Variables for speed and direction
let dxDot = 3;
let dyDot = 2;

let paddleSpeed = 10;
let paddleAiSpeed = 10;

const sizeDot = 30;

const heightSizePaddel = 200;
const widthSizePaddel = 10;

// Variabler som håller reda på respektive kvadrats mittkoordinat
let xCenterDot = (xPosDot + xPosDot + sizeDot) / 2;
let yCenterDot = (yPosDot + yPosDot + sizeDot) / 2;

// Variables for timings
let ticks = 0;
let runtime = 0;
const updateFrequency = 1; // millisecond per step

let GameUpdater = setInterval(update, updateFrequency);
let PaddleAIUpdater = setInterval(PaddelAI, updateFrequency);
//save these items in local storage every 5 seconds

let saveState = setInterval(function () {
  localStorage.setItem("lives", lives);
  localStorage.setItem("time", time);
  localStorage.setItem("score", score);
}, 5000);

//------------------------------------------------- Paddle Game ------------------------------------------------- //
document.onkeydown = function (e) {
  const key = e.key;
  switch (key) {
    case "ArrowUp":
      if (isPaused) {
        return;
      } else {
        yPosPaddel = yPosPaddel - paddleSpeed;
        break;
      }
    case "ArrowDown":
      if (isPaused) {
        return;
      } else {
        yPosPaddel = yPosPaddel + paddleSpeed;
        break;
      }
    //check for enter key
    case "Enter":
      isPaused = !isPaused;
      break;
  }
};

// Draws the game objects on the canvas
function update() {
  //check if game is paused
  if (isPaused) {
    return;
  }

  ticking();

  clearCanvas();

  checkBounce();
  checkStatus();

  paddelCanvasCollide();
  paddelCollisionDetectionTM();

  healthBar();
  scoreTracking();

  xPosDot += dxDot;
  yPosDot += dyDot;

  xCenterDot = (xPosDot + xPosDot + sizeDot) / 2;
  yCenterDot = (yPosDot + yPosDot + sizeDot) / 2;

  drawRects();
}

function ticking() {
  // Checks the time that has passed since the game started
  ticks++;
  runtime = (ticks / 100) * updateFrequency; // seconds
  timer.innerHTML = "Time: " + runtime.toFixed(1) + "S"; // seconds

  //GameSpeed that increases every 30 seconds
  if (runtime % 30 == 0 && runtime != 0) {
    dxDot = dxDot * 1.2;
    dyDot = dyDot * 1.2;
    paddleSpeed = paddleSpeed * 1.2;
  }
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
  //If the ball's position is less than 0, the ball is outside the left border.
  //If the ball's position is greater than canvas.width, the ball is outside the right border.
  //In both cases, the ball's direction is reversed.
  if (xPosDot < 0 || xPosDot > canvas.width - sizeDot) {
    dxDot = -dxDot;
  }

  if (yPosDot < 0 || yPosDot > canvas.height - sizeDot) {
    dyDot = -dyDot;
  }

  if (xPosDot < 0) {
    lives--;
    generate_random_colliders();
  }

  if (xPosDot > canvas.width - sizeDot) {
    score++;
    generate_random_colliders();
  }
}

function checkStatus() {
  if (round == 11) {
    alert("Player wins!");
    document.location.reload();
  }
  if (lives <= 0) {
    alert("AI wins!");
    document.location.reload();
  }

  if (score == round) {
    round += 2;
    alert("Round " + round + "!");
  }
}

function clearCanvas() {
  c.fillStyle = "rgba(0, 0, 0, 0.2)";
  c.fillRect(0, 0, canvas.width, canvas.height);
}

function drawRects() {
  // The red dot (rectangle) is drawn in its new position
  c.fillStyle = "red";
  c.fillRect(xPosDot, yPosDot, sizeDot, sizeDot);

  // the white paddel (rectangle) is drawn in its new position
  c.fillStyle = "white";
  c.fillRect(xPosPaddel, yPosPaddel, widthSizePaddel, heightSizePaddel);

  // the white paddel (AI) (rectangle) is drawn in its new position
  c.fillStyle = "white";
  c.fillRect(xPosPaddel2, yPosPaddel2, widthSizePaddel, heightSizePaddel);
}

function PaddelAI() {
  if (yPosPaddel2 < yCenterDot) {
    yPosPaddel2 = yPosPaddel2 + paddleAiSpeed;
  }

  if (yPosPaddel2 > yCenterDot) {
    yPosPaddel2 = yPosPaddel2 - paddleAiSpeed;
  }
}

// ------------------------------------------------- init ------------------------------------------------- //

function boot() {
  //check if files have been saved
  if (localStorage.getItem("score") != null) {
    lives = localStorage.getItem("lives");
    score = localStorage.getItem("score");
    time = localStorage.getItem("time");
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
  c.fillText(
    "Welcome to Nuke-Nation Pong",
    canvas.width / 2,
    canvas.height / 4
  );
  c.fillText(
    "Remember to press Space to pause",
    canvas.width / 2,
    canvas.height / 2
  );
  c.fillText("Press Enter to start", canvas.width / 2, canvas.height / 1.5);
  //check for enter key
  //create async function
  const work = async () => {
    //wait for keypress
    document.onkeydown = function (e) {
      const key = e.key;
      switch (key) {
        case "Enter":
          game_start_countdown();
          break;
      }
    };
  };
}

//------------------------------------------------- Game Loops -------------------------------------------------//

function game_start_countdown() {
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.font = "30px Arial";
  c.fillStyle = "white";
  c.textAlign = "center";
  c.fillText("3", canvas.width / 2, canvas.height / 4);
  sleep(1000);
  c.fillText("2", canvas.width / 2, canvas.height / 2);
  sleep(1000);
  c.fillText("1", canvas.width / 2, canvas.height / 1.5);
  sleep(1000);
}

function healthBar() {
  c.fillStyle = "red";
  c.fillRect(canvas.width / 4, 0, canvas.width / 2, 10);

  //Draw the green health bar, the width is depended on the current health
  c.fillStyle = "green";
  c.fillRect(canvas.width / 4, 0, (canvas.width / 2) * (lives / 10), 10);

  c.fillStyle = "white";
  c.font = "30px Arial";
  c.fillText("Lives: " + lives, 100, 100);
}

function scoreTracking() {
  c.fillStyle = "white";
  c.font = "30px Arial";
  c.fillText("Score: " + score, 100, 125);
  if (lives <= 0) {
    clearInterval(timerInterval);
    clearInterval(gameInterval);
    gameoverScreen();
  }
}

// ------------------------------------------------- Game Objects  ------------------------------------------------- //

function generate_random_colliders() {
  let colliders = [];
  for (let i = 0; i < 10; i++) {
    let collider = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      width: 50,
      height: 50,
    };
    colliders.push(collider);
  }
  return colliders;
}

//Draw Map
const map = new Image();
map.src = "./Objects/GameMaps/MapLVL0.png";

function drawMap() {
  map.onload = () => {
    c.drawImage(map, 0, 0);
  };
}
