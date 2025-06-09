const board = Array(9).fill(null);
  let currentPlayer = 'X';
  let gameActive = true;

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
    [0, 4, 8], [2, 4, 6]             // Diagonales
  ];

  const boardElement = document.getElementById('board');
  const statusElement = document.getElementById('status');

  function createBoard() {
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
      const cellDiv = document.createElement('div');
      cellDiv.classList.add('cell');
      cellDiv.dataset.index = index;
      cellDiv.textContent = cell;
      cellDiv.addEventListener('click', handleCellClick);
      boardElement.appendChild(cellDiv);
    });
  }

  function handleCellClick(e) {
    const index = e.target.dataset.index;
    if (!gameActive || board[index]) return;

    board[index] = currentPlayer;
    createBoard();
    if (checkWinner()) {
      statusElement.textContent = `Ganó: ${currentPlayer}`;
      gameActive = false;
    } else if (board.every(cell => cell)) {
      statusElement.textContent = 'Empate';
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusElement.textContent = `Turno de: ${currentPlayer}`;
    }
  }

  function checkWinner() {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        document.querySelectorAll('.cell')[a].classList.add('winner');
        document.querySelectorAll('.cell')[b].classList.add('winner');
        document.querySelectorAll('.cell')[c].classList.add('winner');
        return true;
      }
    }
    return false;
  }

  function resetGame() {
    board.fill(null);
    currentPlayer = 'X';
    gameActive = true;
    statusElement.textContent = `Turno de: ${currentPlayer}`;
    createBoard();
  }

  createBoard();



/*
function createUser(name,marker) {
    let points = 0;
        const getPoints = () => points;
        const givePoints = () => points++;
    return {
        name: name,
        marker: marker,
        greet() {
            console.log(`Hello, my name is ${this.name} 
                and I have ${getPoints()} points.
                 My marker is ${this.marker}.`);
        },
        getPoints: getPoints,
        givePoints: givePoints  
}};

function winGame(player1, player2) {
    const winner = [player1, player2].find(p => p.getPoints() === 3);
    console.log(winner ? `${winner.name} has won!` : "It's a tie!!");
}

function playGame(player1,player2){
    //null
}



// test:
const user1 = createUser('Roma', 'X');
user1.givePoints(); 
user1.givePoints(); 
user1.givePoints();
const user2 = createUser('Juan', 'O');
user2.givePoints(); 
user2.givePoints();

user1.greet(); 
user2.greet();
winGame(user1,user2);

/******orignal**** 
function winGame(player1,player2){
    if (player1.getPoints() === 3){
        console.log(`${player1.name} has won ! `);
    } else if (player2.getPoints() === 3){
        console.log(`${player2.name} has won ! `);
    } else {
        console.log ("Its a tie !!");
    }
}*/
/***********simplificada***** */

