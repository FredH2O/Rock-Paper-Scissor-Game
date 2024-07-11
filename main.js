// rock paper scissor game

let resultElement = document.getElementById("result");
let opponent = ["rock", "paper", "scissors"];
let choices = document.querySelectorAll(".choice");

choices.forEach(function (choice) {
  choice.addEventListener("click", function () {
    let playerChoice = choice.value;

    let opponentChoiceIndex = Math.floor(Math.random() * opponent.length);
    let opponentChoice = opponent[opponentChoiceIndex];

    if (playerChoice === "rock") {
      // rock outcome
      if (opponentChoice === "scissors") {
        resultElement.textContent = "You Win!";
      } else if (opponentChoice === "paper") {
        resultElement.textContent = "You Lose";
      } else {
        resultElement.textContent = "It's a Draw";
      }
    } else if (playerChoice === "paper") {
      // paper outcome
      if (opponentChoice === "rock") {
        resultElement.textContent = "You Win!";
      } else if (opponentChoice === "scissors") {
        resultElement.textContent = "You Lose";
      } else {
        resultElement.textContent = "It's a Draw";
      }
    } else if (playerChoice === "scissors") {
      // scissors outcome
      if (opponentChoice === "paper") {
        resultElement.textContent = "You Win!";
      } else if (opponentChoice === "rock") {
        resultElement.textContent = "You Lose";
      } else {
        resultElement.textContent = "It's a Draw";
      }
    }
  });
});
