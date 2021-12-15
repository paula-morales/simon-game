let sequence = [];
let playerSequence = [];
let level = 0;
let playerName= '';

const startButton = document.querySelector('[data-role=js-start-button]');
const info = document.querySelector('[data-role=js-info]');
const tilesContainer = document.querySelector('[data-role=tiles-container]');
const headerTitle = document.querySelector('[data-role=title]');
const alertContainer = document.querySelector('[data-role=js-alert]');
const alertText = document.querySelector('[data-role=js-alert] p');
const alertCloseButton = document.querySelector('[data-role=js-close-alert]');
const alertSaveButton = document.querySelector('[data-role=js-save-name]');

function restartGame(text) {
    tilesContainer.classList.add('tiles-container--no-clickable');
    alertText.textContent = text
    alertContainer.classList.remove('simon-game__alert--hidden')
    sequence = [];
    playerSequence = [];
    level = 0;
    startButton.classList.remove('start-button--hidden');
    headerTitle.textContent = 'Simon Game';
    info.textContent = `Player: ${playerName}`
}
  
function playerTurn() {
    tilesContainer.classList.remove('tiles-container--no-clickable');
    const remainingTaps = sequence.length - playerSequence.length;

    info.textContent = `${playerName ? playerName : 'Player 1'} playing 🎮 ${remainingTaps} remaining tap${remainingTaps > 1 ? 's' : ''}`;
}

function activateTile(color) {
    const tile = document.querySelector(`[data-color='${color}']`);
    const sound = document.querySelector(`[data-sound='${color}']`);

    tile.classList.add('active');
    sound.play();

    setTimeout(() => {
        tile.classList.remove('active');
    }, 400);
}
  
function playRound(nextSequence) {
    nextSequence.forEach((color, index) => {
        setTimeout(() => {
            activateTile(color);
        }, (index + 1) * 600);
    });
}
  
function nextStep() {
    const tiles = ['red', 'green', 'blue', 'yellow'];
    const random = tiles[Math.floor(Math.random() * tiles.length)];

    return random;
}
  
function nextRound() {
    level += 1;

    tilesContainer.classList.add('tiles-container--no-clickable');
    info.textContent = 'Computer is playing 💻';
    headerTitle.textContent = `Level ${level} of 20`;


    const nextSequence = [...sequence];
    nextSequence.push(nextStep());
    playRound(nextSequence);

    sequence = [...nextSequence];
    setTimeout(() => {
        playerTurn();
    }, level * 600 + 1000);
}

function handleClick(color) {
    playerSequence.push(color)
    const index = playerSequence.length - 1;
    const sound = document.querySelector(`[data-sound='${color}']`);
    sound.play();

    const remainingTaps = sequence.length - playerSequence.length;

    if (playerSequence[index] !== sequence[index]) {
        restartGame('Oops! Game over 🎮 ❌');
        return;
    }

    if (remainingTaps===0) tilesContainer.classList.add('tiles-container--no-clickable')

    if (playerSequence.length === sequence.length) {
        if (playerSequence.length === 20) {
            restartGame('Congrats! You completed all the levels 🤩');
            return
        }

        playerSequence = [];
        info.textContent = 'Yaay! 🎉';
        setTimeout(() => {
            nextRound();
        }, 1000);
        return;
    }

    info.textContent = `${playerName ? playerName : 'Player 1'} playing 🎮 ${remainingTaps} remaining tap${remainingTaps > 1 ? 's' : ''}`;

}

function startGame() {
    startButton.classList.add('start-button--hidden');
    info.classList.remove('info--hidden');
    info.textContent = 'Computer is playing 💻';
    nextRound();
}
  
startButton.addEventListener('click', startGame);

alertCloseButton.addEventListener('click', event => {
    alertContainer.classList.add('simon-game__alert--hidden', 'simon-game__input--hidden')
});

alertSaveButton.addEventListener('click', event => {
    playerName = document.querySelector('#name').value
    alertContainer.classList.add('simon-game__alert--hidden', 'simon-game__input--hidden')
    if (playerName){
        info.textContent = `Player: ${playerName}`
        info.classList.remove('info--hidden');
    }
});

tilesContainer.addEventListener('click', event => {
    const { color } = event.target.dataset;
    
    if (color) handleClick(color);
});

