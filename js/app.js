// List that holds all cards
let cards = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt',
				'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'
			  ];
cards = cards.concat(cards);

//Function that creates the cards
function generateCard(card){
	return`<li class="card" data-card="${card}"> <i class="fa ${card}"></i></li>`;
}



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


let movesMade = 0;
const moveCounter = document.querySelector('.moves');

let timerStart = false;


let timerMin = document.querySelector('.minutes');
let timerSec = document.querySelector('.seconds');
let min = 0;
let sec = 0;
let timerCount = null;

let starCount = 3;
let starRating = [];

let openCards = [];
let cardsMatched = 0;

let endGame = false;



//Get Modal element
const modal = document.querySelector('.modal');
//Get Modal Play Again Button
const tryAgain = document.querySelector('.play-again');
//Get Modal Stars Class
const finalStars = document.querySelector('.final-stars');
//Get Modal Time Class
const finalTime = document.querySelector('.time');
//Get Modal Moves Class
const finalMoves = document.querySelector('.final-moves');

//Creates board and shuffles cards
function createBoard(){
	const deck = document.querySelector('.deck');
 	const cardHTML = shuffle(cards).map(function(card){
 		return generateCard(card);
 	});

 	deck.innerHTML = cardHTML.join('');

	moveCounter.innerText = movesMade;
}


//Compares cards to eachother and if all cards are matched runs gameOver
function compareCards() {
	if(openCards.length == 2) {

		starSystem();

		if (openCards[0].dataset.card == openCards[1].dataset.card) {
			openCards[0].classList.add('match');
			openCards[1].classList.add('match');
			openCards = [];
			cardsMatched ++;
			if (cardsMatched == 8) {
 				gameOver();
 			}
		} else {
			openCards[0].classList.add('wrong');
			openCards[1].classList.add('wrong');
			setTimeout(function(){
				removeCards();
			}, 1000);
		}

		counter();
	}

}

// Hides card if they do not match
function removeCards() {
		openCards.forEach(function(card){
			card.classList.remove('open', 'show', 'wrong');
			openCards = [];
		});
}

//Counts how many moves are made and converts to text for html
function counter() {
 	movesMade += 1;
 	moveCounter.innerText = movesMade;
}

// Grabs star for Star Rating system
const stars = document.querySelectorAll('ul.stars li');

stars.forEach(function(star){
 	starRating.push(star);
});

// Function that manages the star rating system
 function starSystem() {
 	if (movesMade == 10) {
 		starRating[2].style.visibility = "hidden";
 		starCount --;
 	} else if (movesMade == 14) {
 		starRating[1].style.visibility = "hidden";
 		starCount --;
 	}
 }

//End Game Function to Open Modal
function openModal() {
 	modal.style.display = "flex";
 	finalStars.innerHTML += `Stars Rating: ${starCount} out of 3`;
 	finalTime.innerHTML += `Time: ${min}:${sec}`;
 	finalMoves.innerHTML += `Moves: ${movesMade}`;
}


// Function that allows you to click the card, runs the function to compare cards, and starts the timer on the first click
function clickCard() {
	const selectCard = document.querySelectorAll('.card');
	selectCard.forEach(function(card){
		card.addEventListener('click', function(e){
			if (openCards.length < 2){
				if (!card.classList.contains ('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
					card.classList.add('open', 'show');
					openCards.push(card);
					compareCards();
					timer();
				}
			}
		});
 	});
}
//Function that runs the timer
function timer() {
	if (timerStart == false){
	 	timerStart = true;
		timerCount = setInterval(function () {
			sec ++;
			if (sec < 60){
				timerSec.innerText = sec.toLocaleString(undefined,{minimumIntegerDigits: 2});
			} else{
				sec = 0;
				min ++;
				timerSec.innerText = sec.toLocaleString(undefined,{minimumIntegerDigits: 2});
				timerMin.innerText = min.toLocaleString(undefined,{minimumIntegerDigits: 2});
				}
		}, 1000);
	}
}

// Function to end the game, stop the timer, and open the modal pop up
function gameOver() {
 	endGame = true;
 	stopTimer();
	openModal();
}

//Function to Stop Timer
function stopTimer(){
	clearInterval(timerCount);
}

 //Restart Game
 const restartButton = document.querySelector('.restart');
 restartButton.addEventListener('click', function() {
 	document.location.reload();
 });

//Try again button
 tryAgain.addEventListener('click', function() {
 	document.location.reload();
 });

createBoard();
clickCard();



