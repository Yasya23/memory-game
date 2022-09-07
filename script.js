const cards = document.querySelectorAll(".game__card");

let flippedCard = false;
let firstCard = null;
let secondCard = null;
let thirdCard = null;
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
  thirdCard = this;

  checkForMatch();
}

function restartGame() {
  if (cardSum === 16) {
    alert("Ok");
  }
}

function checkForMatch() {
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
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
    resetSteps();
    restartGame(cardSum);
  }, 1000);
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetSteps();
  }, 1000);
}

function resetSteps() {
  flippedCard = false;
  firstCard = thirdCard;
  secondCard = null;
  lockBoard = false;
  console.log(cards.length);
}

(function mixCards() {
  cards.forEach((card) => {
    const position = Math.floor(Math.random() * 12);
    card.style.order = position;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));
