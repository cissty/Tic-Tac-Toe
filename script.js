
//store the gameboard as an array inside of a Gameboard object
//players are also going to be stored in objects
//control the flow of the game itself.

const firstSection = document.querySelector('.menu')
const secondSection = document.querySelector('.game-board')
const container = document.querySelector('.main-container');
const playerTexts = document.querySelector('.players-texts')
const yourTurn = document.querySelector('.player-turn')
const aiTexts = document.querySelector('.ai-texts')
const divNodeList = document.querySelectorAll('.div')
const aiSelection = document.getElementById('ai-selection')
const playerSelection = document.getElementById('player-selection')
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const modalText = document.getElementById('modal-text')
const arrow = document.getElementById('back-arrow')

aiSelection.addEventListener('click', () =>{
    firstSection.style.display = 'none' 
    secondSection.style.display = 'flex'
    aiTexts.style.display = 'block'
    arrow.style.display = 'block'
})

playerSelection.addEventListener('click', () =>{
    firstSection.style.display = 'none' 
    secondSection.style.display = 'flex'
    playerTexts.style.display = 'grid'
    arrow.style.display = 'block'

})


const GameBoard = {
    gameBoard: [divNodeList[0], divNodeList[1], divNodeList[2],
                divNodeList[3], divNodeList[4], divNodeList[5],
                divNodeList[6], divNodeList[7], divNodeList[8],
                ],
}

let currentPlayer = 'X';
let newTurn = "Player 1's turn."


    const againstPlayer =  (() => {
    
    const detectMarker = divNodeList.forEach(function(el){
        el.addEventListener('click', () => {
            el.textContent = currentPlayer;
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

            newTurn = newTurn === "Player 1's turn." ? "Player 2's turn." : "Player 1's turn."
            yourTurn.textContent = newTurn;
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
            
            function checkWin(player) {
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
            }
            
            if (checkWin('X')) {
              modalText.textContent = `Player 1 has won the game. `
              modal.style.display = "block";
             
            } else if (checkWin('O')) {
              modalText.textContent = `Player 2 has won the game. `
              modal.style.display = "block";
            }
             
            let allBoxesNotEmpty = true;
            for (let i = 0; i < divNodeList.length; i++) {
              if (divNodeList[i].textContent.trim() === '') {
                allBoxesNotEmpty = false;
                break;
              }
            }

            if (allBoxesNotEmpty) {
              modalText.textContent = `It's a tie `
              modal.style.display = "block";
            }
          })

    })
    
    return {
        detectMarker
    }
})();

span.onclick = function() {
  modal.style.display = "none";
  location.reload()
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    location.reload()
  }
}

arrow.onclick = function(){
  location.reload()
}

