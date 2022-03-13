const CELL_SIZE = 20;
const CANVAS_SIZE = 600; 
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
const APPLE_IMAGE = new Image(); 
APPLE_IMAGE.src = "apple.png";

const APPLE_EMAS_IMAGE = new Image(); 
APPLE_EMAS_IMAGE.src = "apple-emas.jpg";

const ULER_IMAGE = new Image(); 
ULER_IMAGE.src = "uler.jpeg";
const BADAN_ULER_IMAGE = new Image(); 
BADAN_ULER_IMAGE.src = "badanUlar.jpg";

const LIFE_IMAGE = new Image();
LIFE_IMAGE.src = "Heart.jpg"

const DIRECTION = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
}
let MOVE_INTERVAL = 100; 
let NYAWA = 4;

function initPosition() {
    return {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
    }
}

function initHeadAndBody() {
    let head = initPosition();
    let body = [{x: head.x, y: head.y}];
    return {
        head: head,
        body: body,
    }
}

function initDirection() {
    return Math.floor(Math.random() * 4);
}

function initSnake(color) {
    return {
        color: color,
        ...initHeadAndBody(),
        direction: initDirection(),
        score: 0,
    }
}
let snake1 = initSnake("purple");

let apple1 = { 
    position: initPosition(),
}
let apple3 = { 
    position: initPosition(),
    bonus:true, 
}
let heart1 = { 
    position: initPosition(),
 
}

function drawCell(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawScore(snake) {
    let scoreCanvas;
    if (snake.color == snake1.color) {
        scoreCanvas = document.getElementById("score1Board");
    }
    else if (snake.color == snake3.color){
        scoreCanvas = document.getElementById("score3Board");
    } 
    else {
        scoreCanvas = document.getElementById("score2Board");
    }
    let scoreCtx = scoreCanvas.getContext("2d");

    scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    scoreCtx.font = "30px Arial";
    scoreCtx.fillStyle = snake.color
    scoreCtx.fillText(snake.score, 10, scoreCanvas.scrollHeight / 2);
}

function drawImage(ctx, x, y, Image) {
    ctx.drawImage(Image, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawLife(ctx, x, y, Image) {
    for(let i = 0; i < NYAWA; i++){
        ctx.drawImage(Image, x + (i * CELL_SIZE), y, CELL_SIZE, CELL_SIZE)
    }
}
function draw() {
    setInterval(function() {
        let snakeCanvas = document.getElementById("snakeBoard");
        let ctx = snakeCanvas.getContext("2d");

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        
        drawImage(ctx, snake1.head.x, snake1.head.y, ULER_IMAGE);
        for (let i = 1; i < snake1.body.length; i++) {
            drawImage(ctx, snake1.body[i].x, snake1.body[i].y, BADAN_ULER_IMAGE);
        }
        drawImage(ctx, apple1.position.x, apple1.position.y, APPLE_IMAGE);
        drawImage(ctx, apple3.position.x, apple3.position.y, APPLE_EMAS_IMAGE);
        drawImage(ctx, heart1.position.x, heart1.position.y, LIFE_IMAGE);
        drawLife(ctx, 0, 0, LIFE_IMAGE);
        drawScore(snake1);
    }, REDRAW_INTERVAL);
}
    function isPrime(num) {

     if (num === 2) {
       return true;
       } else if (num > 1) {
         for (var i = 2; i < num; i++) {
  
        if (num % i !== 0) {
          return true;
        } else if (num === i * i) {
          return false
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  
  }
function teleport(snake) {
    if (snake.head.x < 0) {
        snake.head.x = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.x >= WIDTH) {
        snake.head.x = 0;
    }
    if (snake.head.y < 0) {
        snake.head.y = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.y >= HEIGHT) {
        snake.head.y = 0;
    }
}

function eat(snake, apple) {
    if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
        apple.position = initPosition();
        if (apple.bonus) {
            snake.score = snake.score + 5 
        }
        else {
            snake.score++;
        }
        snake.body.push({x: snake.head.x, y: snake.head.y});
    }
}
function eatlife(snake, heart) {
    if (snake.head.x == heart.position.x && snake.head.y == heart.position.y) {
        heart.position = initPosition();
        if (NYAWA > 1 && NYAWA < 4){
            NYAWA += 1;
        }
    }
}
function moveLeft(snake) {
    snake.head.x--;
    teleport(snake);
    eat(snake, apple1);
    eat(snake, apple3);
    eatlife(snake, heart1);
}

function moveRight(snake) {
    snake.head.x++;
    teleport(snake);
    eat(snake, apple1);
    eat(snake, apple3);
    eatlife(snake, heart1);
}

function moveDown(snake) {
    snake.head.y++;
    teleport(snake);
    eat(snake, apple1);
    eat(snake, apple3);
    eatlife(snake, heart1);
}

function moveUp(snake) {
    snake.head.y--;
    teleport(snake);
    eat(snake, apple1);
    eat(snake, apple3);
    eatlife(snake, heart1);
}

function checkCollision(snakes) {
    let isCollide = false;
    //this
    for (let i = 0; i < snakes.length; i++) {
        for (let j = 0; j < snakes.length; j++) {
            for (let k = 1; k < snakes[j].body.length; k++) {
                if (snakes[i].head.x == snakes[j].body[k].x && snakes[i].head.y == snakes[j].body[k].y) {
                    isCollide = true;
                }
            }
        }
    }
    if (isCollide) {
        
        
    }
    return isCollide;
}

function move(snake) {
    switch (snake.direction) {
        case DIRECTION.LEFT:
            moveLeft(snake);
            break;
        case DIRECTION.RIGHT:
            moveRight(snake);
            break;
        case DIRECTION.DOWN:
            moveDown(snake);
            break;
        case DIRECTION.UP:
            moveUp(snake);
            break;
    }
    moveBody(snake);
    if (!checkCollision([snake])) {
        setTimeout(function() {
            move(snake);
        }, MOVE_INTERVAL);
    } else {
        NYAWA -= 1;
        if (NYAWA > 0) {
            resetGame();
        }
        else {
            restartGame();
        }
        initGame();

    }
}

function resetGame() {
    const score = snake1.score;
    snake1 = initSnake("purple");
    snake1.score = score;
}
function restartGame() {
    snake1 = initSnake("purple");
    alert('Game Over')
    NYAWA = 4;
    MOVE_INTERVAL = 100;
}
function moveBody(snake) {
    snake.body.unshift({ x: snake.head.x, y: snake.head.y });
    snake.body.pop();
}

function turn(snake, direction) {
    const oppositeDirections = {
        [DIRECTION.LEFT]: DIRECTION.RIGHT,
        [DIRECTION.RIGHT]: DIRECTION.LEFT,
        [DIRECTION.DOWN]: DIRECTION.UP,
        [DIRECTION.UP]: DIRECTION.DOWN,
    }

    if (direction !== oppositeDirections[snake.direction]) {
        snake.direction = direction;
    }
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        turn(snake1, DIRECTION.LEFT);
    } else if (event.key === "ArrowRight") {
        turn(snake1, DIRECTION.RIGHT);
    } else if (event.key === "ArrowUp") {
        turn(snake1, DIRECTION.UP);
    } else if (event.key === "ArrowDown") {
        turn(snake1, DIRECTION.DOWN);
    }
})

function initGame() {
    move(snake1);
}
initGame();