import "./Objects(women).js";

//Tower Defense Game
let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.width = "100%";
canvas.style.height = "100%";
let c = canvas.getContext("2d");

const EASYMODEMUNNY = 500;
const NORMALMODEMUNNY = 250;
const HARDMODEMUNNY = 150;

let munny = 0;
let lives = 10;
let timer = document.getElementById("timer");



function coreGameLoop(){
  starterScreen();
  c.clearCanvas();
  c.fillStyle = "black";
}

function starterScreen(){
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.font = "30px Arial";
  c.fillStyle = "white";
  c.textAlign = "center";
  c.fillText("Welcome to Nuke-Nation", canvas.width/2, canvas.height/4);
  c.fillText("Press Space to start", canvas.width/2, canvas.height/2 + 50);
  c.fillText("Press 1 for Easy Mode", canvas.width/2, canvas.height/2 + 100);
  c.fillText("Press 2 for Normal Mode", canvas.width/2, canvas.height/2 + 150);
  c.fillText("Press 3 for Hard Mode", canvas.width/2, canvas.height/2 + 200);
  document.onkeydown = function (e) {
    const key = e.key;
    switch (key) {
      case " ":
        menu();
        break;
      case "1":
        munny = EASYMODEMUNNY;
        game();
        break;
      case "2":
        munny = NORMALMODEMUNNY;
        game();
        break;
      case "3":
        munny = HARDMODEMUNNY;
        game();
        break;
    }
  };
}

function gameoverScreen(){
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.font = "30px Arial";
  c.fillStyle = "white";
  c.textAlign = "center";
  c.fillText("Game Over", canvas.width/2, canvas.height/2);
  c.fillText("Press Space to restart", canvas.width/2, canvas.height/2 + 50);
}

function menu(){
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

function saveGame(){
  localStorage.setItem("munny", munny);
  localStorage.setItem("lives", lives);
}

coreGameLoop()