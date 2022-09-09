const cards = document.querySelectorAll(".game__card");
const winMessage = document.querySelector(".game__win");
const newGameButton = document.querySelector(".game__button");

let flippedCard = false;
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let cardSum = 0;

function flipCard() {
  if (this === firstCard || lockBoard === true) {
    return;
  }

  this.classList.add("flip");

  if (!flippedCard) {
    flippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  const card1 = firstCard.dataset.framework;
  const card2 = secondCard.dataset.framework;
  if (card1 === card2) {
    removeCards();
  } else {
    unflipCards();
  }
}

function removeCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.add("hide");
    secondCard.classList.add("hide");
    cardSum += 2;
    winGame(cardSum);
    resetHistory();
  }, 500);
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetHistory();
  }, 500);
}

function resetHistory() {
  flippedCard = false;
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function winGame() {
  setTimeout(() => {
    if (cardSum === 2) {
      winMessage.classList.add("block");
    }
  }, 500);
}

function newGame() {
  setTimeout(() => {
    winMessage.classList.remove("block");
    cards.forEach((card) => card.classList.remove("hide", "flip"));
  }, 500);
}

(function mixCards() {
  cards.forEach((card) => {
    const position = Math.floor(Math.random() * 12);
    card.style.order = position;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));
newGameButton.addEventListener("click", newGame);
