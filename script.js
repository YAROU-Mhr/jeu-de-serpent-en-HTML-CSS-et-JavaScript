const playBoard = document.querySelector(".play-board");

let foodX, foodY,
    snakeX = 5, snakeY = 5
velocityX = 0, velocityY = 0;

const changeFoodPosition = () => {
    //on passe de manière aléatoire 0-30 comme valeur pour la position de l'appas
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const changeDirection = (e) => {
    console.log(e);
    if (e.key === "ArrowUp") {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown") {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowRight") {
        velocityX = 1;
        velocityY = 0;
    } else if (e.key === "ArrowLeft") {
        velocityX = -1;
        velocityY = 0;
    }

    initGame();
}

const initGame = () => {
    snakeX += velocityX ;
    snakeY += velocityY ;
    let htmlMarkup = `<div class="food" style="grid-area:${foodY}/${foodX}"></div>`;
    htmlMarkup += `<div class="head" style="grid-area:${snakeY}/${snakeX}"></div>`;
    playBoard.innerHTML = htmlMarkup;
}
changeFoodPosition();

setInterval(initGame,125)
document.addEventListener("keydown", changeDirection)