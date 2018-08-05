document.addEventListener("DOMContentLoaded", loadFont);
document.addEventListener("keydown", keyDownHandler, false);

let canvas, ctx;
let difficulty, walls, framerate;
let gameInProgress;
let gameScore;

let powerupTimerActive = false;
let powerupInterval = 5000;
let powerupTime = 800;
let powerupValue;
let powerupCharge;
let ultimateActive;

let snakeLength, snakeSpeed;
let snakeArray;
let offScreen = {x:-50,y:-50}
let applePos = [];
let powerupPos = offScreen;

let gameWidth, gameHeight;
let direction;
//let ultiCount, ultiActive;



let gameTimer;
let drawTimer;
let powerTimer;
let ultiTimer;

function loadFont () {
  document.fonts.load('10pt "Russo One"').then(showTitle);
}

function showTitle() {
  setup();
  ctx.font = "100px Russo One";
  ctx.textAlign = "center";  
  ctx.strokeText("SNAKE", gameWidth/2, 125);

  ctx.font = "22px Russo One";
  ctx.fillText("Use arrows or WASD to move", gameWidth/2, 225);
  ctx.fillText("Press Q to activate ultimate", gameWidth/2, 275);
  ctx.font = "40px Russo One";
  ctx.strokeText("Press space to start", gameWidth/2, 350);
}

function settings() {
  console.log("test");
  difficulty = document.getElementById("difficulty").value;
  walls = document.getElementById("walls").value;
  framerate = document.getElementById("framerate").value;
  document.getElementById("canvas").classList = "dashed";
  if (walls == "true") { document.getElementById("canvas").classList = "solid"; }
}

function startGame(){
  settings();
  gameTimer = setInterval(function () { gameLoop(); }, 1000 / difficulty);
  drawTimer = setInterval(function () { drawLoop(); }, 1000 / framerate);
  document.getElementById("settings").classList = "hidden";
  gameInProgress = true;
}

function gameOver() {
  clearInterval(gameTimer);
  clearInterval(drawTimer);
  clearInterval(powerTimer);
  setup();
  ctx.font = "70px Russo One";
  ctx.textAlign = "center";  
  ctx.strokeText("GAME OVER", gameWidth/2, 100);
  ctx.font = "30px Russo One";
  ctx.fillText("Score: " + gameScore, gameWidth/2, 200);
  ctx.fillText("High Score: " + gameScore, gameWidth/2, 250);
  ctx.font = "35px Russo One";
  ctx.strokeText("Press space to play again", gameWidth/2, 350);
}

function setup() {
  document.getElementById("settings").classList = "";
  gameInProgress = false;
  gameWidth = 500;
  gameHeight = 400;
  blockSize = 20;
  gameScore = 0;
  snakeArray = [];
  direction = "r";
  powerupValue = 0;
  powerupTimerActive = false;
  powerupCharge = 0;
  ultimateActive = false;

  snakeArray.push({ x: 200, y: 200 });
  snakeArray.push({ x: 180, y: 200 });

  canvas = document.getElementById("canvas");
  canvas.setAttribute('width', gameWidth);
  canvas.setAttribute('height', gameHeight);
  ctx = canvas.getContext("2d");

  applePos = getRandomBlock();
}


function drawSnake() {
  ctx.fillStyle = "#2b8a0e";
  ctx.fillRect(snakeArray[0].x, snakeArray[0].y, blockSize, blockSize);
  ctx.fillStyle = "#3fb41c";
  for (let i = 1; i < snakeArray.length; i++) {
    ctx.fillRect(snakeArray[i].x, snakeArray[i].y, blockSize, blockSize);
  }
}

function drawApple() {

  ctx.beginPath();
  ctx.arc(applePos.x + (blockSize / 2), applePos.y + (blockSize / 2), blockSize / 4, 0, 2 * Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.lineWidth=0.5;
  ctx.stroke();
}

function drawPowerup() {
  
  ctx.save();
  ctx.fillStyle = "#f72bf7";
  ctx.translate(powerupPos.x + (blockSize / 2), powerupPos.y + (blockSize / 2));
  ctx.rotate(Math.PI / 4);
  ctx.scale(0.5,0.5)
  ctx.fillRect(-blockSize/2, -blockSize/2, blockSize, blockSize);
  ctx.strokeRect(-blockSize/2, -blockSize/2, blockSize, blockSize);

  ctx.restore();
}

function spawnPowerup() {
  clearInterval(powerTimer);
  powerupPos = getRandomBlock();
  powerupValue = powerupTime;
}

function activatePowerupTimer () {
  powerTimer = setInterval(function () { spawnPowerup(); }, powerupInterval);
  powerupPos = offScreen;
  powerupTimerActive = true;
}

function updatePowerup() {
  if (powerupValue > 0) powerupValue -= 20;
  if (powerupValue == 0) removePowerup();
}

function removePowerup() {
  powerupPos = offScreen;
  powerupValue = 0;
  powerupTimerActive = false;

}

function checkPowerup() {
  if (!powerupTimerActive) activatePowerupTimer();
  if (powerupTimerActive && powerupValue > 0) updatePowerup();
}

function activateUltimate() {

}

function revertUltimate() {
  
}

function gameLoop() {
  //check dot collision
  //randomly generate bonus pickup
  //draw snake movement
  //check for wrap

  let removeTail = true;
  let head = { x: snakeArray[0].x, y: snakeArray[0].y };


  checkPowerup();
  
  switch (checkCollision(head.x, head.y)) {
    case "body":
      console.log("eatsnake");
      gameOver();
      break;
    case "apple":
      gameScore += 10;
      applePos = getRandomBlock();
      removeTail = false;
      break;
    case "powerup":
      gameScore += 50;
      if (powerupCharge < 100) powerupCharge += 20;
      removePowerup();
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

  if (walls == "true") {
    if (head.x > gameWidth || head.x < 0 || head.y > gameHeight || head.y < 0) gameOver();
  }
  else {
    if (head.x > gameWidth - blockSize) head.x = 0;
    if (head.x < 0) head.x = gameWidth;
    if (head.y > gameHeight - blockSize) head.y = 0;
    if (head.y < 0) head.y = gameHeight;
  }

  snakeArray.unshift(head);
  if (removeTail) snakeArray.pop();

  
}
function drawLoop() {
  ctx.clearRect(0, 0, gameWidth, gameHeight);
  
  drawSnake();
  drawApple();
  drawPowerup();
  drawHUD();
  
  //console.log(powerTime);


}

function drawHUD() {
  ctx.fillStyle= "#0b4b35";
  ctx.font = "15px Trebuchet MS";
  ctx.textAlign = "left";  
  ctx.fillText(gameScore, 10, 20);
  ctx.textAlign = "right";
  if (powerupValue > 0) ctx.fillText(powerupValue, gameWidth - 10, 20);
  ctx.textAlign = "left";
  if (powerupCharge == 100) ctx.fillStyle= "red";
  ctx.fillText(powerupCharge+"%", 10, gameHeight - 10);

}



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
  //console.log(e.which || e.keyCode);
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
    if (powerupCharge == 100) activateUltimate(); 
  }
  if (e.keyCode == 32) {
    if(!gameInProgress) startGame(); 
  }
  //console.log(direction);
}
