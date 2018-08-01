document.addEventListener("DOMContentLoaded", showTitle);
document.addEventListener("keydown", keyDownHandler, false);

let canvas, ctx;
let snakeLength, snakeSpeed;
let snakeArray;
let applePos;
let powerupPos;
let gameWidth, gameHeight, gameScore;
let direction;
let ultiCount, ultiActive;
let walls;

function setup() {
  gameWidth = 600;
  gameHeight = 600;
  blockSize = 15;
  gameScore = 0;
  snakeLength = 200;
  snakeSpeed = 1;
  snakeArray = [];
  direction = "r";
  walls = false;

  snakeArray.push({x:135,y:15});
  snakeArray.push({x:120,y:15});
  snakeArray.push({x:105,y:15});
  snakeArray.push({x:90,y:15});
  snakeArray.push({x:75,y:15});

  snakeArray.push({x:60,y:15});
  snakeArray.push({x:45,y:15});
  snakeArray.push({x:30,y:15});
  snakeArray.push({x:15,y:15});
  snakeArray.push({x:0,y:15});

  applePos = {x:45,y:90};
  powerupPos = {x:15,y:15};


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
}

function gameLoop() {
  //check dot collision
  //randomly generate bonus pickup
  //draw snake movement
  //check for wrap

  ctx.clearRect(0, 0, gameWidth, gameHeight);
  

  let head = {x:snakeArray[0].x, y:snakeArray[0].y};
  
  switch(direction) {
    case "u":
        head.y -= 15;
        break;
    case "d":
        head.y += 15;
        break;
    case "l":
        head.x -= 15;
        break;
    case "r":
        head.x += 15;
        break;
      }

  //console.log(head.x + "," + head.y);

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
  snakeArray.pop();
  //console.log(checkCollision(head.x,head.y));

  
  ctx.fillStyle = "purple";
  ctx.fillRect(snakeArray[0].x, snakeArray[0].y, 15, 15);
  ctx.fillStyle = "green";
  for (var i = 1; i < snakeArray.length; i++) {
    ctx.fillRect(snakeArray[i].x, snakeArray[i].y, 15, 15);
  }

  
  
  /*

  ctx.fillStyle = "red";
  ctx.fillRect(randX*blockSize, randY*blockSize, 15, 15);
  */
  //let pos = getRandomBlock();
 
  ctx.fillRect(applePos.x, applePos.y, 15, 15);
  ctx.beginPath();
  ctx.arc(applePos.x+(blockSize/2),applePos.y+(blockSize/2),blockSize/4,0,2*Math.PI);
  ctx.stroke();

  let pup = getRandomBlock();
  //ctx.fillRect(pup.x, pup.y, 15, 15);
  ctx.beginPath();
  ctx.arc(pup.x+(blockSize/2),pup.y+(blockSize/2),blockSize/4,0,2*Math.PI);
  ctx.stroke();

}
let timer = setInterval(function (){ gameLoop(); },1000/10);


function getRandomBlock () {
  let randX = blockSize * (Math.floor(Math.random() * (gameWidth-15) / blockSize));
  let randY = blockSize * (Math.floor(Math.random() * (gameHeight-15) / blockSize));
  if (checkCollision(randX,randY) == null) return {x:randX,y:randY};
  return getRandomBlock();
}

function checkCollision (x,y) {
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
  return;
}

function keyDownHandler(e) {
  console.log(e.which || e.keyCode);
  if(e.keyCode == 38 || e.keyCode == 87) {
    if (direction!= "d") direction = "u";
  }
  if(e.keyCode == 40 || e.keyCode == 83) {
    if (direction!= "u") direction = "d";
  }
  if(e.keyCode == 37 || e.keyCode == 65) {
    if (direction!= "r") direction = "l";
  }
  if(e.keyCode == 39 || e.keyCode == 68) {
    if (direction!= "l") direction = "r";
  }
  if(e.keyCode == 113) {
   // ultiActivate(); 
  }
  console.log(direction);
}
