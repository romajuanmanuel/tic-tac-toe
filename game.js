
  function createUser(name, marker) {
    let points = 0;
    const getPoints = () => points;
    const givePoints = () => points++;
    return {
      name,
      marker,
      getPoints,
      givePoints
    };
  }

  const playerX = createUser("Player 1", "X");
  const playerO = createUser("Player 2", "O");
  let currentPlayer = playerX;
  let board = Array(9).fill(null);
  let gameActive = true;

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
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

    board[index] = currentPlayer.marker;
    createBoard();

    if (checkWinner()) {
      currentPlayer.givePoints();
      statusElement.textContent = `Winner: ${currentPlayer.name} (${currentPlayer.marker}) — Points: ${currentPlayer.getPoints()}`;
      gameActive = false;
    } else if (board.every(cell => cell)) {
      statusElement.textContent = 'Its a tie';
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === playerX ? playerO : playerX;
      statusElement.textContent = `${currentPlayer.name} (${currentPlayer.marker}) turn.`;
    }
  }

  function checkWinner() {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        const cells = document.querySelectorAll('.cell');
        cells[a].classList.add('winner');
        cells[b].classList.add('winner');
        cells[c].classList.add('winner');
        return true;
      }
    }
    return false;
  }

  function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = playerX;
    gameActive = true;
    statusElement.textContent = `${currentPlayer.name} (${currentPlayer.marker}) turn`;
    createBoard();
  }

  createBoard();

