const CELL_SIZE = 20;
const CANVAS_SIZE = 400; 
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
const APPLE_IMAGE = new Image(); 
APPLE_IMAGE.src = "apple1.png";

const ULER_IMAGE = new Image(); 
ULER_IMAGE.src = "head_snake.png";
const BADAN_ULER_IMAGE = new Image(); 
BADAN_ULER_IMAGE.src = "body_snake.png";

const LIFE_IMAGE = new Image();
LIFE_IMAGE.src = "heart.png"

const game_over = new Audio("game-over.mp3");
const level_up = new Audio("levelUp.mp3");
const life_size = 100;
const life_count = 4;

const DIRECTION = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
}
let MOVE_INTERVAL = 100; 

let NYAWA = 4;
let LEVEL = 0;

const level_1 = { 
    startPos : { x: 5, y : 4}, 
    wall : [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
}

const level_2 = { 
    startPos : { x: 3, y : 4}, 
    wall : [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0]]
}

const level_3 = { 
    startPos : { x: 10, y : 10}, 
    wall : [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
}
const level_4 = { 
    startPos : { x: 5, y : 4}, 
    wall : [
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
}

const level_5 = { 
    startPos : { x: 0, y : 10}, 
    wall : [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0,  0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0,  0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1, 1,  1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0,  0, 0, 0, 0, 0, 0, 0, 0]]
}

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
    ctx.fillStyle = "#1ccc24"
    ctx.fillRect(0, 0, life_size, life_size);
    for(let i = 0; i < NYAWA; i++){
        ctx.drawImage(Image, x + (i * CELL_SIZE), y, CELL_SIZE, CELL_SIZE)
    }
}
function updateSpeed() {
    const speedParagraph = document.getElementById('speed-show');
    speedParagraph.innerText = `Speed : ${MOVE_INTERVAL} ms`;
}
function drawLevelTitle() {
    const levelTitle = document.getElementById("level-title");
    levelTitle.innerText = `LEVEL : ${LEVEL}`
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
        drawImage(ctx, apple3.position.x, apple3.position.y, APPLE_IMAGE);
        
        updateSpeed();
        let UIrenderer = document.getElementById('nyawa')
        let renderer = UIrenderer.getContext('2d');
        drawLife(renderer, 0, 0, LIFE_IMAGE);
        drawScore(snake1);
        drawLevelTitle();
        if(isPrime(snake1.score)){
            drawImage(ctx, heart1.position.x, heart1.position.y, LIFE_IMAGE);
        }
        
        if (LEVEL === 1) {
            drawLevel(ctx, level_1)
        }
        else if (LEVEL === 2) {
            drawLevel(ctx, level_2)
        }
        else if (LEVEL === 3) {
            drawLevel(ctx, level_3)
        }
        else if (LEVEL === 4) {
            drawLevel(ctx, level_4)
        }
        else if (LEVEL === 5) {
            drawLevel(ctx, level_5)
        }
    }, REDRAW_INTERVAL);
}
function drawLevel(ctx, level) {
    for(let i = 0; i < level.wall.length; i++) {
        for(let j = 0; j < level.wall[0].length; j++) {
            if (level.wall[i][j] === 1)
            {
                drawCell(ctx,  level.startPos.y + i, level.startPos.x + j, "black");
                
            }
        }
    }
}
function levelUP() {
    LEVEL += 1;
    MOVE_INTERVAL -= 10;
    level_up.play();
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
        
        
        snake.score++;
        if (snake.score % 10 == 0){
            levelUP();
        }
        snake.body.push({x: snake.head.x, y: snake.head.y});
    }
}
function eatlife(snake, heart) {
    if (snake.head.x == heart.position.x && snake.head.y == heart.position.y) {
        heart.position = initPosition();
        if (NYAWA >= 1 && NYAWA < 4){
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
                    break;
                }
            }
        }
    }
    return isCollide;
}
function checkMapCollision (snake, level) {
    let collide = false;
    for (let i = 0; i < level.wall.length; i++) {
        for (let j = 0; j < level.wall[0].length; j++){
            if (level.wall[i][j] === 1) {
                if (snake.head.x === level.startPos.y + i && snake.head.y === level.startPos.x + j){
                    console.log(`${snake.head.x} : ${snake.head.y} == ${level.startPos.x + i} : ${level.startPos.y + j}`)
                    collide = true;
                    break;
                }
            }
        }
    }
    return collide;
    
}
function collisionWithWall (snake) {
    let isCollide = false;
    if (LEVEL === 1) {
        isCollide = checkMapCollision(snake, level_1);
    }
    else if (LEVEL === 2) {
        isCollide = checkMapCollision(snake, level_2)
    }
    else if (LEVEL === 3) {
        isCollide = checkMapCollision(snake, level_3)
    }
    else if (LEVEL === 4) {
        isCollide = checkMapCollision(snake, level_4)
    }
    else if (LEVEL === 5) {
        isCollide = checkMapCollision(snake, level_5)
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
    if (!checkCollision([snake]) && !collisionWithWall(snake)) {
        setTimeout(function() {
            move(snake);
        }, MOVE_INTERVAL);
    } else {
        NYAWA -= 1;
        
        if (NYAWA > 0) {
            resetGame();
        }
        else {
            game_over.play();
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
    LEVEL = 0;
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