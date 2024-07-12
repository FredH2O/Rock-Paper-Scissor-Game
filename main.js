// rock paper scissor

let resultElement = document.getElementById("result");
let opponent = ["rock", "paper", "scissors"];
let choices = document.querySelectorAll(".choice");
let timerElement = document.getElementById("timer");
let countdownTimer;
let playerScoreElement = document.getElementById("player-score");
let opponentScoreElement = document.getElementById("computer-score");
let playerScore = 0;
let opponentScore = 0;

choices.forEach(function (choice) {
  choice.addEventListener("click", function () {
    let playerChoice = choice.value;
    console.log(playerChoice); // just checking the value
    console.log(playerScore);
    console.log(opponentScore);
    playGame(playerChoice);
    startCountdown();
  });
});

function playGame(playerChoice) {
  let opponentChoiceIndex = Math.floor(Math.random() * opponent.length);
  let opponentChoice = opponent[opponentChoiceIndex];

  document.getElementById("playerGif").src = `images/${playerChoice}.gif`;
  document.getElementById("playerGif").alt =
    playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1);

  document.getElementById("opponentGif").src = `images/${opponentChoice}.gif`;
  document.getElementById("opponentGif").alt =
    opponentChoice.charAt(0).toUpperCase() + opponentChoice.slice(1);

  if (playerChoice === opponentChoice) {
    resultElement.textContent = "It's a Draw! 😐";
  } else if (
    (playerChoice === "rock" && opponentChoice === "scissors") ||
    (playerChoice === "paper" && opponentChoice === "rock") ||
    (playerChoice === "scissors" && opponentChoice === "paper")
  ) {
    resultElement.textContent = "You Win! 😄";
    playerScore++;
  } else {
    resultElement.textContent = "You Lose! 💀";
    opponentScore++;
  }

  playerScoreElement.textContent = playerScore;
  opponentScoreElement.textContent = opponentScore;

  if (playerScore >= 10) {
    resultElement.textContent = `Congratulations you won!!`;
    document.getElementById("congratulations").src = "images/Confetti.gif";
    playerScore = 0;
    opponentScore = 0;
  }

  if (opponentScore >= 10) {
    resultElement.textContent = `Computer WON!`;
    playerScore = 0;
    opponentScore = 0;
  }
}

function startCountdown() {
  let x = 3;
  timerElement.textContent = x;

  if (countdownTimer) {
    clearInterval(countdownTimer);
  }
  countdownTimer = setInterval(function () {
    x--;
    timerElement.textContent = x;

    if (x <= 0) {
      document.getElementById("playerGif").src = "";
      document.getElementById("playerGif").alt = "";
      document.getElementById("opponentGif").src = "";
      document.getElementById("opponentGif").alt = "";
      resultElement.textContent = "";
      clearInterval(countdownTimer);
    }
  }, 1000);
}
