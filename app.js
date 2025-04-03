const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d"); //回傳canvas drawing context，drawing context可畫圖

//單位
const unit = 20;
const row = canvas.height / unit; // 320/20=16
const column = canvas.width / unit; //~~

//snake
let snake = [];

function createSnake() {
  snake[0] = { x: 80, y: 0 };
  snake[1] = { x: 60, y: 0 };
  snake[2] = { x: 40, y: 0 };
  snake[3] = { x: 20, y: 0 };
}

//fruit
class Fruit {
  constructor() {
    //Math.random() 0~<1   //Xcolumn 0~<16    //Math.floor() 0~15整數  //Xunit  0Xunit~15Xunit
    this.x = Math.floor(Math.random() * column) * unit;
    this.y = Math.floor(Math.random() * row) * unit;
  }

  drawFruit() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, unit, unit);
  }

  pickALocation() {
    let overlapping = false;
    let new_X;
    let new_Y;

    function checkOverlap(new_X, new_Y) {
      overlapping = false;
      for (let i = 0; i < snake.length; i++) {
        //console.log snake[i]);
        if (new_X == snake[i].x && new_Y == -snake[i].y) {
          overlapping = true;
          return;
        } else {
          overlapping = false;
        }
      }
    }

    new_X = Math.floor(Math.random() * column) * unit;
    new_Y = Math.floor(Math.random() * row) * unit;

    while (overlapping) {
      checkOverlap(new_X, new_Y);
    }

    this.x = new_X;
    this.y = new_Y;
  }
}

//生成snake
createSnake();

//生成fruit
let myFruit = new Fruit();

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

  window.removeEventListener("keydown", changeDirection);
}

function draw() {
  //判斷蛇咬到自己
  for (let i = 1; i < snake.length; i++) {
    //console.log(array[i]);
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      clearInterval(myGame);
      alert("遊戲結束");
      return;
    }
  }

  //初始更新全黑
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //更新水果
  myFruit.drawFruit();

  //更新蛇
  for (let i = 0; i < snake.length; i++) {
    //console.log(array[i]);
    if (i == 0) {
      ctx.fillStyle = "lightgreen";
    } else {
      ctx.fillStyle = "lightblue";
    }
    ctx.strokeStyle = "white";

    //更新位置前，穿牆邏輯避免撞壁
    if (snake[i].x >= canvas.width) {
      snake[i].x = 0;
    }
    if (snake[i].x < 0) {
      snake[i].x = canvas.width - unit;
    }
    if (snake[i].y > 0) {
      snake[i].y = -canvas.height + unit;
    }
    if (snake[i].y <= -canvas.height) {
      snake[i].y = 0;
    }

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

  //console.log(snake[0].x + " S " + snake[0].y);
  //console.log(myFruit.x + " F " + myFruit.y);

  //穿牆
  //更新位置前，穿牆邏輯避免撞壁
  let checkSnakeX = snake[0].x;
  let checkSnakeY = snake[0].y;
  if (checkSnakeX >= canvas.width) {
    checkSnakeX = 0;
  }
  if (checkSnakeX < 0) {
    checkSnakeX = canvas.width - unit;
  }
  if (checkSnakeY > 0) {
    checkSnakeY = -canvas.height + unit;
  }
  if (checkSnakeY <= -canvas.height) {
    checkSnakeY = 0;
  }

  //是否吃到果實，決定pop
  if (checkSnakeX == myFruit.x && -checkSnakeY == myFruit.y) {
    //console.log("吃到了");
    myFruit.pickALocation();
  } else {
    snake.pop();
  }

  snake.unshift(newHead);

  window.addEventListener("keydown", changeDirection);
}

let myGame = setInterval(draw, 100);

console.log(snake);
