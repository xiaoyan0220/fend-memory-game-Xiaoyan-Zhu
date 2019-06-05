/*
 * Create a list that holds all of your cards
 */



const listItems = document.getElementsByClassName("card");


// console.log(listItems);

const arrListItems = Array.prototype.slice.call(listItems);

const shuffledArray = shuffle(arrListItems);

// console.log(shuffledArray);

let newList = '';
for (i=0; i<shuffledArray.length; i++) {
	newList += shuffledArray[i].outerHTML;
}

function shuffleCards () {
	document.getElementById("deck").innerHTML = newList;
}


//Cards are revealed 
let openCards = [];
let matchedCards = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */





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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one) --- revealCard()
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one) --- addOpenCard()
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one) --- matchCards()
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one) --- hideCards()
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one) --- updateMoveCounter()
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)  --- checkIfWon()
 */




var matchedCount = 0;
var moveCount = 0;


const allCards = document.getElementsByClassName('card');


shuffleCards();


//click function
	document.body.addEventListener('click', function(e) {
		
		
	if (e.target.classList.contains("card") && (document.querySelectorAll('.show').length < 2)) {	
		if (document.querySelectorAll('.card').length == 16 && moveCount === 0) {
			runTimer();
		}
	
		let classMatch = e.target.querySelector('i').className;																	
			if (openCards.length < 1) {  
				revealCard(e);
				addOpenCard(e);
				
			} else { 
					if (openCards.includes(classMatch)) {
						matchedCards.push(classMatch);
						revealCard(e);
						matchCards();
						updateMoveCount();
						openCards = [];
					} else {
						revealCard(e);
						hideCards();

					}
			}

	}  else {
		console.log("clicked outside cards");
	}
});	



// moves counting


function updateMoveCount () {
	moveCount += 1;
	if (moveCount === 1) {
		document.getElementById("moves-made").innerHTML =moveCount+" Move";
	} else {
		document.getElementById("moves-made").innerHTML =moveCount+" Moves";
	}

	adjustStars();
	
	// console.log(moveCount);
}


function matchCards() {
	
		matchedCount += 1;
		setTimeout(function() {
		matchingCards = document.querySelectorAll(".show");
		for (let i = 0; i< matchingCards.length; i++) {
			matchingCards[i].className = "card match";
			}
		console.log(matchingCards);
		checkIfWon();
		}, 1000);
}

function hideCards () {
	openCards = [];
	displayedCards = document.querySelectorAll(".show");
	
// cards hidden
	
	setTimeout(function() { 
		
		console.log(displayedCards);
		for (let i = 0; i< displayedCards.length; i++) {
			displayedCards[i].className = "card";
			}
			}, 1000);
		updateMoveCount();

	}


function revealCard(e) {
	e.target.classList.add('show', 'open');
	e.target.classList.remove('not-shown');
	}

// 
function addOpenCard (e) {
	let classMatch = e.target.querySelector('i').className;
	openCards.push(classMatch);
	}

//game completed model pop out

function checkIfWon () {
	if (matchedCount === 8) {
		stopTimer();
		successModal.style.display='block';
		document.getElementById('success-message').innerHTML = "You completed the game in "+moveCount+" moves in "+completedTime+"!";
	if (moveCount > 0 && moveCount < 13) {
		document.getElementById('star-rating-message').innerHTML = "<i class='fa fa-star'><i class='fa fa-star'><i class='fa fa-star'>";
	}
	if (moveCount > 13 && moveCount < 19) {
	document.getElementById('star-rating-message').innerHTML = "<i class='fa fa-star'><i class='fa fa-star'>";
	}
	if (moveCount > 19 && moveCount < 26) {
	document.getElementById('star-rating-message').innerHTML = "<i class='fa fa-star'><i class='fa fa-star-half'>";
	}

	if(moveCount > 26) {
		document.getElementById('star-rating-message').innerHTML = "<i class='fa fa-star'> You get one star. Try to complete in less moves next time.";
	}
}
		closeModal();
		

	}


function playAgain () {
	playAgainButton.addEventListener('click', restartGame);
	displayTimer.textContent = "0:00";
}

//closing modal
function closeModal () {
	closeModalButton.addEventListener('click', function () {
		successModal.style.display = 'none';
	});	
	window.addEventListener('click', windowCloseModal);
	playAgain();
}

function windowCloseModal (e) {
	if (e.target == successModal) {
		successModal.style.display = 'none';
	}
}


// loop all cards and set class to not-shown

function restartGame () {

	for (let i = 0; i< allCards.length; i++) {
			allCards[i].className = "card";
			}

	//everything starts over
	
	shuffleCards();
	moveCount = 0;
	document.getElementById("moves-made").innerHTML = moveCount;
	openCards = [];
	matchedCards = [];
	matchingCards = '';
	displayedCards = '';

	
	successModal.style.display = 'none';
	stopTimer();
	displayTimer.textContent = "0:00";

	document.getElementById("moves-made").innerHTML =moveCount+" Moves";

}


//timer
const displayTimer = document.querySelector('#timer');
let clock;

let timerStart;
let timeNow;
let timerEnd;

let secondsElapsed;
let minutesElapsed;
let secondsRounded;
let secondsFormatted;
let timeElapsed;

let completedTime;

let clickToRun;



function runTimer() {
	timerStart = Date.now();
	clock = setInterval(function() {
	displayTime(clock);
	}, 1000)

	//remove it
	document.removeEventListener('click', runTimer);
}


function stopTimer() {

	clearInterval(clock);
	completedTime = document.querySelector('#timer').textContent;

	// console.log(complated time);
}

function displayTime(clock) {
	timeNow = Date.now();
	secondsElapsed = (timeNow - timerStart) / 1000;
	minutesElapsed = Math.floor(secondsElapsed / 60);
	secondsRounded = Math.floor(secondsElapsed % 60);
	secondsFormatted = secondsRounded < 10 ? '0'+secondsRounded: secondsRounded;
	timeElapsed = minutesElapsed+":"+secondsFormatted;
	displayTimer.textContent = timeElapsed;

}


//star rating
const starRating = document.getElementsByClassName('stars')[0];

function adjustStars () {
	if (moveCount > 0 && moveCount < 13) {
		starRating.innerHTML = "<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li><li><i class='fa fa-star-half'></i></li>";
	}
	if (moveCount > 13 && moveCount < 19) {
		starRating.innerHTML = "<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li>";
	}
	if (moveCount > 19 && moveCount < 26) {
		starRating.innerHTML = "<li><i class='fa fa-star'></i></li><li><i class='fa fa-star-half'></i></li>";
	}

	if(moveCount > 26) {
		starRating.innerHTML = "<li><i class='fa fa-star'></i></li>";
	}
}


//success modal after completing the game
const successModal = document.getElementById('success-modal');

// close button for the model
const closeModalButton = document.getElementsByClassName('close-button')[0];

// game restart button
const playAgainButton = document.getElementById('button-restart');
const restartButton = document.getElementsByClassName("restart")[0];

restartButton.addEventListener('click', restartGame);



