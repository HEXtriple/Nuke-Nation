//Tower Defense Game
let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.width = "100%";
canvas.style.height = "100%";
let c = canvas.getContext("2d");

// ------------------------------------------------- Game Variables ------------------------------------------------- //

let munny = 0;
let lives = 10;
let timer = document.getElementById("timer");
let score = document.getElementById("score");
let gameover = false;

let xPosDot = Math.floor(Math.random() * (0.8 * canvas.width - 200) + 200);
let yPosDot = Math.floor(Math.random() * (0.8 * canvas.height - 200) + 200);

let yPosPaddel = Math.floor(Math.random() * (0.8 * canvas.height - 200) + 200);
let yPosPaddel2 = Math.floor(Math.random() * (0.8 * canvas.height - 200) + 200);

const xPosPaddel = canvas.width/6;
const xPosPaddel2 = canvas.width - canvas.width/6;

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

/*
let asdad ()=> setInterval( {
  localStorage.setItem("munny", munny);
  localStorage.setItem("lives", lives);
  localStorage.setItem("time", time);
})1000;
*/

let myTimer = setInterval(update, updateFrequency);
let myTimer2 = setInterval(PaddelAI, updateFrequency);

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

  clearCanvas()
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

function paddelCollisionDetectionTM(){
  //Paddel 1
  if (xPosDot + sizeDot > xPosPaddel && xPosDot < xPosPaddel + widthSizePaddel && yPosDot + sizeDot > yPosPaddel && yPosDot < yPosPaddel + heightSizePaddel) {
    dxDot = -dxDot;
  }

  //Paddel 2
  if (xPosDot + sizeDot > xPosPaddel2 && xPosDot < xPosPaddel2 + widthSizePaddel && yPosDot + sizeDot > yPosPaddel2 && yPosDot < yPosPaddel2 + heightSizePaddel) {
    dxDot = -dxDot;
  }
}

function paddelCanvasCollide(){
  //Stop the paddle1 from going out of the canvas
  if (yPosPaddel < 0 ) {
    yPosPaddel = 0;
  }

  if (yPosPaddel > canvas.height - heightSizePaddel ) {
    yPosPaddel = canvas.height - heightSizePaddel;
  }

  //Stop the paddle2 from going out of the canvas
  if (yPosPaddel2 < 0 ) {
    yPosPaddel2 = 0;
  }

  if (yPosPaddel2 > canvas.height - heightSizePaddel ) {
    yPosPaddel2 = canvas.height - heightSizePaddel;
  }
}

// Då respektive kvadrat kommer till en ytterkant ska de studsa
function checkBounce() {
  if (xPosDot < 0 || xPosDot > canvas.width - sizeDot) {
    dxDot = -dxDot;
  }

  if (yPosDot < 0 || yPosDot > canvas.height - sizeDot) {
    dyDot = -dyDot;
  }

  if (xPosDot < 0) {
    lives--;
    alert("AI wins!");
    document.location.reload();
  }
  
  if (xPosDot > canvas.width - sizeDot) {
    alert("Player wins!");
    document.location.reload();
  }
}


function clearCanvas() {
  c.fillStyle = "rgba(0, 0, 0, 0.2)"
  c.fillRect(0, 0, canvas.width, canvas.height)
}

function drawRects(){
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

function PaddelAI(){
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
  if (localStorage.getItem("munny") != null) {
    munny = localStorage.getItem("munny");
    lives = localStorage.getItem("lives");
    time = localStorage.getItem("time");
    game();
  } else {
    firstBoot();
  }
}

function firstBoot() {
  coreGameLoop();
}


function starterScreen() {
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
  c.fillText(
    "Press for nuke pong",
    canvas.width / 2,
    canvas.height / 2 + 200
  );
}


//------------------------------------------------- Game Loops -------------------------------------------------//

function healthBar() {
  c.fillStyle = "green";
  c.fillRect(0, 0, 100, 10);

  c.fillStyle = "white";
  c.font = "30px Arial";
  c.fillText("Lives: " + lives, 10, 100);
}

function scoreTracking() {
  c.fillText("Score: " + score, 10, 50);
  c.fillText("Munny: " + munny, 10, 150);
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

///Enemy 0 
const enemy0 = new Image();
enemy0.src = "./Objects/Enemies/EnemyLVL0.png";

function drawEnemy0() {
  enemy0.onload = () => {
    c.drawImage(enemy0, 0, 0);
  };
}

//Enemy 1
const enemy1 = new Image();
enemy1.src = "./Objects/Enemies/EnemyLVL1.png";

function drawEnemy1() {
  enemy1.onload = () => {
    c.drawImage(enemy1, 0, 0, canvas.width, canvas.height);
  };
}

//Enemy 2
const enemy2 = new Image();
enemy2.src = "./Objects/Enemies/EnemyLVL2.png";

function drawEnemy2() {
  enemy2.onload = () => {
    c.drawImage(enemy2, 0, 0, canvas.width, canvas.height);
  };
}

//Enemy 3
const enemy3 = new Image();
enemy3.src = "./Objects/Enemies/EnemyLVL3.png";

function drawEnemy3() {
  enemy3.onload = () => {
    c.drawImage(enemy3, 0, 0, canvas.width, canvas.height);
  };
}



