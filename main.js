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
let imageChange = document.getElementById("congratulations");

choices.forEach(function (choice) {
  choice.addEventListener("click", function () {
    let playerChoice = choice.value;
    //console.log(playerChoice);
    //console.log(playerScore);
    //console.log(opponentScore);
    playGame(playerChoice);
    disableButton();
    startCountdown();
  });
});

function disableButton() {
  choices.forEach(function (button) {
    button.disabled = true;
    setTimeout(function () {
      button.disabled = false;
    }, 3000);
  });
}

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

  if (playerScore >= 3) {
    resultElement.textContent = `Congratulations you won!!`;
    playerScore = 0;
    opponentScore = 0;

    // confetti.js library down here
    const count = 300,
      defaults = {
        origin: { y: 0.5 },
      };

    function fire(particleRatio, opts) {
      confetti(
        Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio),
        })
      );
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });

    // confetti.js library up here

    setTimeout(function () {
      imageChange.src = "images/rock-paper-scissors.png";
    }, 3000);
  }

  if (opponentScore >= 3) {
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
      resultElement.textContent = "Make a choice!";
      timerElement.textContent = 3;
      clearInterval(countdownTimer);
    }
  }, 1000);
}
