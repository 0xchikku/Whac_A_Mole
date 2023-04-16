
const gridContainer = document.querySelector('.grid-container');
const scoreDisplay = document.querySelector('.score');
const timeLeftDisplay = document.querySelector('.time-left');
const mole = document.querySelector('.mole');
const buttonDisplay = document.querySelector('.btn');

let startStopGameButton;
const squares = [];
let noOfSquare = 9;
let score = 0
scoreDisplay.textContent = score;
let countDown = 30;
timeLeftDisplay.textContent = countDown;
let molePosition = null;
let moveMoleTimerId = null;
let countDownTimerId = null;


function createButton() {
    const button = document.createElement('button');
    button.textContent = 'Start';
    button.classList.add('start-stop-game');
    button.addEventListener('click', switchButton);
    startStopGameButton = button;
    buttonDisplay.append(button);
}

function removeMoleFromAllSquare(){
    squares.forEach( square => {
        square.classList.remove('mole');
    });
    molePosition = null;
}

function randomPosition(){
    return Math.floor(Math.random() * 9);
}

function checkHit(){
    if(Number(this.id) === molePosition){
        molePosition = null;
        score++;
        updateScore(score);
    }else{
        console.log('Miss');
    }
}

function createSquareElement(index) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.setAttribute('id',index);
    square.addEventListener('mousedown', checkHit)
    return square;
}

function generateSquare(){
    for(let i = 0; i < noOfSquare; i++) {
        const square = createSquareElement(i);
        squares.push(square);
        gridContainer.append(square);
    }
    updateScore();
}

function addMoleToRandomSquare(){
    removeMoleFromAllSquare();
    molePosition = randomPosition()
    const randomSquare = squares[molePosition];
    randomSquare.classList.add('mole');
}

function moveMole() {
    moveMoleTimerId = setInterval(addMoleToRandomSquare, 650);
}

function updateScore(score = 0){
    scoreDisplay.textContent = score;
}

function updateTimeLeft(countDown) {
    timeLeftDisplay.textContent = countDown;
}

function startCountDown() {
    countDown--;
    updateTimeLeft(countDown)
    if(countDown === 0) {
        alert(`Game over! Your Score: ${score}`);
        stopGame();
        countDown = 30;
        score = 0
        updateTimeLeft(countDown);
        updateScore();
    }
}

function startGame() {
    moveMole();
    startStopGameButton.textContent = 'Stop';
    countDownTimerId = setInterval(startCountDown, 1000);
}

function stopGame() {
    clearInterval(countDownTimerId);
    clearInterval(moveMoleTimerId);
    removeMoleFromAllSquare();
    startStopGameButton.textContent = 'Start';
}

function switchButton() {
    if(this.textContent === 'Start'){
        startGame();
    } else {
        stopGame();
    }
}

function main(){
    createButton();
    generateSquare();
}

main();