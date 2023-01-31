'use strict';
//starting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting variables

let scores, currentScore, activePlayer, playing;

//functions
const init = function() {
    //starting conditions

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}
// rolling dice functionality

btnRoll.addEventListener('click', function() {
    if(playing) {
    // 1. Generate a random dice roll
    const dice = Math.trunc(Math.random()*6+ 1);
    // 2. display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`
    // 3. Check if rolled 1 if true, 
    if(dice !== 1) {
        // Add dice to current score.
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
       
    } else {
        // switch player
        switchPlayer();
        }
    }
});

// hold option

btnHold.addEventListener('click', function() {

    if(playing) {
    //1. add current score to score of active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    //2. check if score is already at least 100, if so finnish game,
    if(scores[activePlayer] >= 20){
        //Finish game, add a player--winner class
        playing = false;
        //get rid of roll dice
        diceEl.classList.add('hidden');

        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        //after 1 player wins we need to remove active player class
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

    } else {
    //if not switch player
    switchPlayer();
    }
}});

btnNew.addEventListener('click', init)

