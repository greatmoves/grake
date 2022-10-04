const grid_size = 8;

const Up = "ArrowUp";
const Down = "ArrowDown";
const Left = "ArrowLeft";
const Right = "ArrowRight";

var gamegrid = document.getElementById("gamegrid");
var score = document.getElementById("score");

window.addEventListener("keydown", (event) => {
    setTimeout(() => {
        var x = event.key;
        if(x === "ArrowUp" && snake.direction !== Down) {
           snake.setDirection(Up);
        }
        if(x === "ArrowLeft" && snake.direction !== Right) {
            snake.setDirection(Left);
        }
        if(x === "ArrowRight" && snake.direction !== Left) {
            snake.setDirection(Right);
        }
        if(x === "ArrowDown" && snake.direction !== Up) {
            snake.setDirection(Down);
        }
        
    
    }, 1)
})

window.onload = () => {
    init();
    loop();
}

function loop() {
    gameloop = setInterval(update, 500);
}

function update() {
    snake.move();
    eatApple();
    hitWall();
    // draw();
    
}


class Apple {
    constructor() {

        while(true) {
            let onsnek = false;

            this.x = Math.floor(Math.random() * grid_size);
            this.y = Math.floor(Math.random() * grid_size);

            for (let index = 0; index < snake.body.length; index++) {
                if(this.x === snake.body[index].x && this.y === snake.body[index].y) {
                    onsnek = true;
                }
                
            }

            if(!onsnek || num_apples >= 63) {
                break;
            }
        }
        

    }
}

class Snake {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.body = [{x:this.x, y: this.y}];
        this.direction = Right;
    }

    setDirection(direction) {
        this.direction = direction;
    }

    move() {
        let newBody;
        if(this.direction === Right) {
            newBody = {
                x: this.body[this.body.length - 1].x,
                y: this.body[this.body.length - 1].y + this.size
            }
        }

        else if(this.direction === Left) {
            newBody = {
                x: this.body[this.body.length - 1].x,
                y: this.body[this.body.length - 1].y - this.size
            }
        }

        else if(this.direction === Up) {
            newBody = {
                x: this.body[this.body.length - 1].x - this.size,
                y: this.body[this.body.length - 1].y,
            }
        }
        else if(this.direction === Down) {
            newBody = {
                x: this.body[this.body.length - 1].x + this.size,
                y: this.body[this.body.length - 1].y
            }
        }
        this.body.shift();
        this.body.push(newBody);

    }
}

function eatApple() {
    // console.log(snake.body[snake.body.length -1].x);
    // console.log(snake.body[snake.body.length -1].y);
    if(snake.body[snake.body.length -1].x == apple.x && snake.body[snake.body.length -1].y == apple.y) {
        snake.body[snake.body.length] = {x: apple.x, y: apple.y};
        num_apples += 1
        apple = new Apple();

    }
}

function hitWall() {
     var head = {x:snake.body[snake.body.length-1].x, y:snake.body[snake.body.length-1].y}
    if(head.x < 0 || head.x >= grid_size) {
        // make lose function
        clearInterval(gameloop);

    }
    else if(head.y < 0 || head.y >= grid_size) {
        // make lose function
        clearInterval(gameloop);
       
    } else {
        draw();
    }
}


function init() {

    for (let x = 0; x < grid_size; x++) {
        gamegrid.insertRow()
        for (let y = 0; y < grid_size; y++) {
            gamegrid.rows[x].insertCell()
        }
    }

}

function draw() {
    for (let x = 0; x < grid_size; x++) {
        for (let y = 0; y < grid_size; y++) {
            gamegrid.rows[x].cells[y].style.backgroundColor = 'white';
        }
        
    }

    gamegrid.rows[apple.x].cells[apple.y].style.backgroundColor = 'red';


    for (let index = 0; index < snake.body.length; index++) {
        gamegrid.rows[snake.body[index].x].cells[snake.body[index].y].style.backgroundColor = 'LawnGreen';
        
    }
    score.innerText = "Score: " + num_apples;
    gamegrid.rows[snake.body[snake.body.length-1].x].cells[snake.body[snake.body.length-1].y].style.backgroundColor = 'Green';
}




var gameloop;
var num_apples = 0;
let snake = new Snake(3,0,1);
let apple = new Apple();
