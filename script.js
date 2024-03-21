const playBoard = document.querySelector(".play-board");
const controls = document.querySelectorAll(".controls i");
let scoreTag = document.querySelector(".score span");
let hightScoreTag = document.querySelector(".hight-score");


const gridSize = 30;
let foodX, foodY, snakeX = 5, snakeY = 5, snakeBody = [],
    velocityX = 0, velocityY = 0,
    gameOver = false, setIntervalId, score = 0;
//prendre le meilleurs score localement
let hightScore = localStorage.getItem("hight-score") || 0;
hightScoreTag.innerText = `Meilleur score: ${hightScore}`;

const changeFoodPosition = () => {
    //on passe de manière aléatoire 0-30 comme valeur pour la position de l'appas
    foodX = Math.floor(Math.random() * gridSize) + 1;
    foodY = Math.floor(Math.random() * gridSize) + 1;
}

const handleGameOver = () => {
    //réinitialiser le timer et  recharger la page après l'alert
    clearInterval(setIntervalId);
    alert("Vous venez de perdre la partie! clikez sur ok pour reprendre la partie!");
    location.reload();
}

const changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
    // console.log(velocityX,velocityY);

    initGame();
}

controls.forEach(key => {
    key.addEventListener("click", () => changeDirection({ key: key.dataset.key }));
})


const initGame = () => {
    if (gameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area:${foodY}/${foodX}"></div>`;

    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX, foodY]);
        // console.log(snakeBody);
        score++;//incrementer le score de un
        hightScore = score >= hightScore ? score : hightScore;
        localStorage.setItem("hight-score", hightScore);

        scoreTag.innerText = score;
        hightScoreTag.innerText = `Meilleur score: ${hightScore}`;
    }
    //pour que le cors du serpent suive
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1]
    }

    //position départ
    snakeBody[0] = [snakeX, snakeY];

    //changement du mouvement
    snakeX += velocityX;
    snakeY += velocityY;

    //vérifier si le serpent est hors de la grille
    if (snakeX <= 0 || snakeX > gridSize || snakeY <= 0 || snakeY > gridSize) {
        gameOver = true;
    }

    //création de div par rapport a la taille du serpent après repa 
    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="head" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;

        //si la tête touche le corps c'est mort
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }

    playBoard.innerHTML = htmlMarkup;
}

changeFoodPosition();

setIntervalId = setInterval(initGame, 125)
document.addEventListener("keydown", changeDirection)