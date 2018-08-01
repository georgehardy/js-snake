document.addEventListener("DOMContentLoaded", showTitle);
document.addEventListener("keydown", keyDownHandler, false);

let canvas, ctx;
let snakeLength, snakeSpeed;
let snakeArray;
let gameWidth, gameHeight, gameScore;
let direction;
let ultiCount, ultiActive; 

function setup() {
  gameWidth = 600;
  gameHeight = 600;
  gameScore = 0;
  snakeLength = 200;
  snakeSpeed = 1;
  snakeArray = [];
  direction = "r";

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
  snakeArray.unshift(head);
  snakeArray.pop();
  
  for (let i = 0; i < snakeArray.length; i++) {
    ctx.fillRect(snakeArray[i].x, snakeArray[i].y, 15, 15);
  }
  
}

let timer = setInterval(function (){ gameLoop(); },1000/20);

function keyDownHandler(e) {
  if(e.keyCode == 38 || e.keyCode == 119) {
    if (direction!= "d") direction = "u";
  }
  if(e.keyCode == 40 || e.keyCode == 115) {
    if (direction!= "u") direction = "d";
  }
  if(e.keyCode == 37 || e.keyCode == 97) {
    if (direction!= "r") direction = "l";
  }
  if(e.keyCode == 39 || e.keyCode == 100) {
    if (direction!= "l") direction = "r";
  }
  if(e.keyCode == 113) {
   // ultiActivate(); 
  }
  console.log(direction);
}