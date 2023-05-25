const firstSection = document.querySelector('.menu');
const secondSection = document.querySelector('.game-board');
const container = document.querySelector('.main-container');
const playerTexts = document.querySelector('.players-texts');
const yourTurn = document.querySelector('.player-turn');
const aiTexts = document.querySelector('.ai-texts');
const divNodeList = document.querySelectorAll('.div');
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const modalText = document.getElementById('modal-text');
const arrow = document.getElementById('back-arrow');
const aiSelection = document.getElementById('ai-selection');
const playerSelection = document.getElementById('player-selection');

let currentPlayer = 'X';
let newTurn = "Player 1's turn.";
let gameMode = 'player'; // player vs. player

const againstPlayer = (() => {
  const checkWin = (player) => {
    const winningCombinations = [
      // Rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonals
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
      if (
        divNodeList[combination[0]].textContent === player &&
        divNodeList[combination[1]].textContent === player &&
        divNodeList[combination[2]].textContent === player
      ) {
        return true; // Win condition met
      }
    }
    return false; // No win condition met
  };

  const isGameOver = () => {
    if (checkWin('X')) {
      modalText.textContent = "Player 1 has won the game.";
      modal.style.display = "block";
      return true;
    } else if (checkWin('O')) {
      modalText.textContent = "Player 2 has won the game.";
      modal.style.display = "block";
      return true;
    }

    const emptyBoxes = getEmptyBoxes();
    if (emptyBoxes.length === 0) {
      modalText.textContent = "It's a tie.";
      modal.style.display = "block";
      return true;
    }

    return false;
  };

  const playerTurn = (el) => {
    if (!el.textContent && !isGameOver()) {
      el.textContent = currentPlayer;
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    newTurn = newTurn === "Player 1's turn." ? "Player 2's turn." : "Player 1's turn.";
    yourTurn.textContent = newTurn;

    el.classList.add('clicked');
    setTimeout(() => {
      el.classList.remove('clicked');
    }, 500);
  };

  const aiTurn = () => {
    if (!isGameOver() && currentPlayer === 'O') {
      const bestMoveIndex = minimax(0, 'O');
      divNodeList[bestMoveIndex].textContent = currentPlayer;
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  };

  const getEmptyBoxes = () => {
    return Array.from(divNodeList).reduce((emptyBoxes, box, index) => {
      if (!box.textContent) {
        emptyBoxes.push(index);
      }
      return emptyBoxes;
    }, []);
  };

  const minimax = (depth, player) => {
    if (checkWin('X')) {
      return depth - 10; // Player 1 wins
    } else if (checkWin('O')) {
      return 10 - depth; // Player 2 (computer) wins
    } else if (getEmptyBoxes().length === 0) {
      return 0; // It's a tie
    }

    const scores = [];
    const moves = [];

    getEmptyBoxes().forEach((index) => {
      divNodeList[index].textContent = player;

      if (player === 'X') {
        scores.push(minimax(depth + 1, 'O'));
      } else {
        scores.push(minimax(depth + 1, 'X'));
      }

      moves.push(index);
      divNodeList[index].textContent = '';
    });

    const bestMoveIndex = player === 'X' ? moves[scores.indexOf(Math.max(...scores))] : moves[scores.indexOf(Math.min(...scores))];
    return bestMoveIndex;
  };

  divNodeList.forEach((el) => {
    el.addEventListener('click', () => {
      if (gameMode === 'player') {
        playerTurn(el);
      } else if (gameMode === 'ai') {
        if (currentPlayer === 'X') {
          playerTurn(el);
        }
      }

      if (gameMode === 'ai') {
        aiTurn();
      }
    });
  });

  return {
    setGameMode: (mode) => {
      gameMode = mode;
    }
  };
})();

aiSelection.addEventListener('click', () => {
  firstSection.style.display = 'none';
  secondSection.style.display = 'flex';
  aiTexts.style.display = 'block';
  arrow.style.display = 'block';

  againstPlayer.setGameMode('ai');
});

playerSelection.addEventListener('click', () => {
  firstSection.style.display = 'none';
  secondSection.style.display = 'flex';
  playerTexts.style.display = 'grid';
  arrow.style.display = 'block';

  againstPlayer.setGameMode('player');
});

span.onclick = function() {
  modal.style.display = "none";
  location.reload();
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    location.reload();
  }
};

arrow.onclick = function(){
  location.reload();
};
