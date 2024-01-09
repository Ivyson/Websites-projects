let buttonref = document.querySelectorAll(".Buttonoptions");
let popmessage = document.querySelector(".popup");
let newgamebutt = document.getElementById("NewGame");
let exitgamebutt = document.getElementById("ExitGame");
let resetbutt = document.getElementById("Restart");
let message = document.getElementById("Message");
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
}

function checkTie() {
  return !board.includes("");
}

function handleCellClick(index) {
  if (!gameActive || board[index] !== "") {
    return;
  }

  board[index] = currentPlayer;
  renderBoard();

  const winner = checkWinner();
  if (winner) {
    endGame(`Player ${winner} wins!`);
  } else if (checkTie()) {
    endGame("It's a tie!");
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (currentPlayer === "O" && gameActive) {
      makeBotMove();
    }
  }
}

function renderBoard() {
  buttonref.forEach((button, index) => {
    button.textContent = board[index];
  });
}

function makeBotMove() {
  const availableMoves = board.reduce((acc, cell, index) => {
    if (cell === "") {
      acc.push(index);
    }
    return acc;
  }, []);

  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  const botMove = availableMoves[randomIndex];

  board[botMove] = "O";
  renderBoard();

  const botWinner = checkWinner();
  if (botWinner) {
    endGame(`Player ${botWinner} wins!`);
  } else if (checkTie()) {
    endGame("It's a tie!");
  }
}

function endGame(message) {
  gameActive = false;
  popmessage.classList.remove("hide");
  message.textContent = message;
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  popmessage.classList.add("hide");
  renderBoard();
}

buttonref.forEach((button, index) => {
  button.addEventListener("click", () => handleCellClick(index));
});

resetbutt.addEventListener("click", resetGame);
newgamebutt.addEventListener("click", resetGame);
exitgamebutt.addEventListener("click", () => {
  popmessage.classList.add("hide");
  gameActive = false;
});

// Initial render
renderBoard();
