document.addEventListener("DOMContentLoaded", showTitle);

let canvas, ctx;
let snakeLength, snakeSpeed;
let snakeArray;
let gameWidth, gameHeight, gameScore;

function setup() {
  gameWidth = 600;
  gameHeight = 600;
  gameScore = 0;
  snakeLength = 200;
  snakeSpeed = 1;
  snakeArray = [];
  snakeArray.push({x:0,y:0,dir:"r"});

  canvas = document.getElementById("canvas");
  canvas.setAttribute('width', gameWidth);
  canvas.setAttribute('height', gameHeight);
  ctx = canvas.getContext("2d");
}

function showTitle () {
  setup();
  ctx.font = "60px Tahoma";
  ctx.strokeText("SNAKE", 150, 250);
  ctx.fillStyle = "green";
  ctx.fillRect(snakeArray[0].x, snakeArray[0].y, 20, 20);
}

let gameLoop = function () {
  ctx.clearRect(0, 0, gameWidth, gameHeight);
  snakeArray[0].x += 20;
  ctx.fillRect(snakeArray[0].x, snakeArray[0].y, 20, 20);
};

let timer = setInterval(function (){
      gameLoop();
},1000/30);