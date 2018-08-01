document.addEventListener("DOMContentLoaded", showTitle);
document.addEventListener("keydown", keyDownHandler, false);

let canvas, ctx;
let snakeLength, snakeSpeed;
let snakeArray;
let applePos = [];
let powerupPos = [];
let gameWidth, gameHeight, gameScore;
let direction;
let ultiCount, ultiActive;
let walls;

function setup() {
  gameWidth = 500;
  gameHeight = 400;
  blockSize = 20;
  gameScore = 0;
  snakeLength = 200;
  snakeSpeed = 1;
  snakeArray = [];
  direction = "r";
  walls = false;

  //snakeArray.push({ x: 15, y: 15 });
  snakeArray.push({ x: 0, y: 0 });

  canvas = document.getElementById("canvas");
  canvas.setAttribute('width', gameWidth);
  canvas.setAttribute('height', gameHeight);
  ctx = canvas.getContext("2d");

  applePos = getRandomBlock();
}

function showTitle() {
  setup();
  ctx.font = "60px Tahoma";
  ctx.strokeText("SNAKE", 150, 250);
  ctx.fillStyle = "green";
}

function drawSnake() {
  ctx.fillStyle = "purple";
  ctx.fillRect(snakeArray[0].x, snakeArray[0].y, blockSize, blockSize);
  ctx.fillStyle = "green";
  for (let i = 1; i < snakeArray.length; i++) {
    ctx.fillRect(snakeArray[i].x, snakeArray[i].y, blockSize, blockSize);
  }
}

function drawApple() {
  ctx.fillRect(applePos.x, applePos.y, blockSize, blockSize);
  ctx.beginPath();
  ctx.arc(applePos.x + (blockSize / 2), applePos.y + (blockSize / 2), blockSize / 4, 0, 2 * Math.PI);
  ctx.stroke();
}

function gameLoop() {
  //check dot collision
  //randomly generate bonus pickup
  //draw snake movement
  //check for wrap

  ctx.clearRect(0, 0, gameWidth, gameHeight);
  let removeTail = true;
  let head = { x: snakeArray[0].x, y: snakeArray[0].y };

  switch (checkCollision(head.x, head.y)) {
    case "body":
      console.log("eatsnake");
      showTitle();
      break;
    case "apple":
      gameScore += 5;
      applePos = getRandomBlock();
      removeTail = false;
      break;
    case "powerup":
      removeTail = false;
      break;
  }

  switch (direction) {
    case "u":
      head.y -= blockSize;
      break;
    case "d":
      head.y += blockSize;
      break;
    case "l":
      head.x -= blockSize;
      break;
    case "r":
      head.x += blockSize;
      break;
  }

  if (walls) {
    if (head.x > gameWidth || head.x < 0 || head.y > gameHeight || head.y < 0) console.log("gameover");
  }
  else {
    if (head.x > gameWidth) head.x = 0;
    if (head.x < 0) head.x = gameWidth;
    if (head.y > gameHeight) head.y = 0;
    if (head.y < 0) head.y = gameHeight;
  }

  snakeArray.unshift(head);
  if (removeTail) snakeArray.pop();
  //console.log(head.x + "," + head.y);




  drawSnake();
  drawApple();


  /*

  ctx.fillStyle = "red";
  ctx.fillRect(randX*blockSize, randY*blockSize, 15, 15);
  */
  //let pos = getRandomBlock();



  let pup = getRandomBlock();
  //ctx.fillRect(pup.x, pup.y, 15, 15);
  ctx.beginPath();
  ctx.arc(pup.x + (blockSize / 2), pup.y + (blockSize / 2), blockSize / 4, 0, 2 * Math.PI);
  ctx.stroke();

}
let timer = setInterval(function () { gameLoop(); }, 1000 / 20);


function getRandomBlock() {
  let randX = blockSize * (Math.floor(Math.random() * (gameWidth - blockSize) / blockSize));
  let randY = blockSize * (Math.floor(Math.random() * (gameHeight - blockSize) / blockSize));
  if (checkCollision(randX, randY) == null) return { x: randX, y: randY };
  return getRandomBlock();
}

function checkCollision(x, y) {
  if (x === applePos.x && y === applePos.y) {
    return "apple";
  }

  if (x === powerupPos.x && y === powerupPos.y) {
    return "powerup";
  }

  for (var i = 1; i < snakeArray.length; i++) {
    if (x === snakeArray[i].x && y === snakeArray[i].y) {
      if (i == 0) return "head";
      return "body";
    }
  }
  return null;
}

function keyDownHandler(e) {
  console.log(e.which || e.keyCode);
  if (e.keyCode == 38 || e.keyCode == 87) {
    if (direction != "d") direction = "u";
  }
  if (e.keyCode == 40 || e.keyCode == 83) {
    if (direction != "u") direction = "d";
  }
  if (e.keyCode == 37 || e.keyCode == 65) {
    if (direction != "r") direction = "l";
  }
  if (e.keyCode == 39 || e.keyCode == 68) {
    if (direction != "l") direction = "r";
  }
  if (e.keyCode == 113) {
    // ultiActivate(); 
  }
  console.log(direction);
}
