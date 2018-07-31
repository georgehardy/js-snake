document.addEventListener("DOMContentLoaded", showTitle);

function showTitle () {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  ctx.font = "60px Tahoma";
  ctx.strokeText("SNAKE", 150, 250);
  ctx.fillStyle = "green";
  ctx.fillRect(300, 300, 100, 20);
}

