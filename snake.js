document.addEventListener("DOMContentLoaded", showTitle);

let canvas, ctx;
let snakeLength, snakeSpeed;
let gameWidth, gameHeight, gameScore;

function setup() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  gameWidth = 600;
  gameHeight = 600;
  gameScore = 0;
  snakeLength = 200;
  snakeSpeed = 1;
}

function showTitle () {
  setup();
  ctx.font = "60px Tahoma";
  ctx.strokeText("SNAKE", 150, 250);
  ctx.fillStyle = "green";
  ctx.fillRect(300, 300, snakeLength, 20);
}

