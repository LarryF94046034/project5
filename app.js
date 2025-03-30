const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d"); //回傳canvas drawing context，drawing context可畫圖

//單位
const unit = 20;
const row = canvas.height / unit; // 320/20=16
const column = canvas.width / unit; //~~

//snake
let snake = [];
snake[0] = { x: 80, y: 0 };
snake[1] = { x: 60, y: 0 };
snake[2] = { x: 40, y: 0 };
snake[3] = { x: 20, y: 0 };

for (var i = 0; i < snake.length; i++) {
  //console.log(array[i]);
  if (i == 0) {
    ctx.fillStyle = "lightgreen";
  } else {
    ctx.fillStyle = "lightblue";
  }
  ctx.strokeStyle = "white";
  //x y width height
  ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
  ctx.strokeRect(snake[i].x, snake[i].y, unit, unit);
}

console.log(snake);
