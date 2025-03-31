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

window.addEventListener("keydown", changeDirection);
let direction = "Right";
function changeDirection(e) {
  if (e.key == "ArrowRight" && direction != "Left" && direction != "Right") {
    direction = "Right";
  } else if (
    e.key == "ArrowLeft" &&
    direction != "Right" &&
    direction != "Left"
  ) {
    direction = "Left";
  } else if (e.key == "ArrowUp" && direction != "Down" && direction != "Up") {
    direction = "Up";
  } else if (e.key == "ArrowDown" && direction != "Up" && direction != "Down") {
    direction = "Down";
  }
  //console.log(direction);
  //window.removeEventListener("keydown", changeDirection);
}

function draw() {
  //初始更新全黑
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    //console.log(array[i]);
    if (i == 0) {
      ctx.fillStyle = "lightgreen";
    } else {
      ctx.fillStyle = "lightblue";
    }
    ctx.strokeStyle = "white";
    //x y width height
    ctx.fillRect(snake[i].x, -snake[i].y, unit, unit);
    ctx.strokeRect(snake[i].x, -snake[i].y, unit, unit);

    //console.log(snake[i].x + " " + snake[i].y);
  }

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction == "Right") {
    snakeX += unit;
  } else if (direction == "Left") {
    snakeX -= unit;
  } else if (direction == "Up") {
    snakeY += unit;
  } else if (direction == "Down") {
    snakeY -= unit;
  }

  let newHead = { x: snakeX, y: snakeY };

  snake.pop();
  snake.unshift(newHead);
}

let myGame = setInterval(draw, 100);

console.log(snake);
