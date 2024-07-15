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
let soundEffects = document.getElementById("soundEffects");
let loaderDiv = document.querySelectorAll(".loader");

choices.forEach(function (choice) {
  choice.addEventListener("click", function () {
    // play loading first
    //document.getElementById("playerGif").src = `images/loading.gif`;
    //document.getElementById("opponentGif").src = `images/loading.gif`;
    loaderDiv.forEach(function (loader) {
      loader.classList.remove("hidden");
      setTimeout(function () {
        loader.classList.add("hidden");
      }, 1500);
    });
    resultElement.innerText = "";
    disableButton(); // we disable the button

    // sound effects when buttons pressed
    soundEffects.src = "sounds/click.mp3";
    soundEffects.volume = 0.8;
    soundEffects.play();

    let playerChoice = choice.value;

    setTimeout(function () {
      playGame(playerChoice);
      startCountdown();
    }, 1500);
  });
});

function disableButton() {
  choices.forEach(function (button) {
    button.disabled = true;
    setTimeout(function () {
      button.disabled = false;
    }, 6600);
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

  setTimeout(function () {
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
      playerScoreElement.textContent = 0;
      opponentScoreElement.textContent = 0;
      soundEffects.src = "sounds/winnerSound.mp3";
      soundEffects.volume = 1;
      soundEffects.play();

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
    }
    if (opponentScore >= 3) {
      resultElement.textContent = `You LOSE!`;
      soundEffects.src = "sounds/loseSound.mp3";
      soundEffects.volume = 1;
      soundEffects.play();
      playerScore = 0;
      opponentScore = 0;
      playerScoreElement.textContent = 0;
      opponentScoreElement.textContent = 0;
      // confetti.js here
      const defaults = {
        spread: 760,
        ticks: 100,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
      };

      function shoot() {
        confetti({
          ...defaults,
          particleCount: 30,
          scalar: 1.2,
          shapes: ["circle", "square"],
          colors: ["#0000", "#0000", "#0000", "#0000", "#0000"],
        });

        confetti({
          ...defaults,
          particleCount: 100,
          scalar: 2,
          shapes: ["emoji"],
          shapeOptions: {
            emoji: {
              value: ["💩", "💀"],
            },
          },
        });
      }

      setTimeout(shoot, 0);
      setTimeout(shoot, 100);
      setTimeout(shoot, 200);

      // confetti.js here
    }
  }, 1500);
}

function startCountdown() {
  let x = 4;
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
      timerElement.textContent = x;
      clearInterval(countdownTimer);
    }
  }, 1000);
}
