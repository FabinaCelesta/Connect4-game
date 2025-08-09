const ROWS = 6;
const COLS = 7;
let board = [];
let currentPlayer = 'red';
const gameBoard = document.getElementById('gameBoard');
const statusText = document.getElementById('status');

function createBoard() {
  gameBoard.innerHTML = '';
  board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener('click', () => handleClick(col));
      gameBoard.appendChild(cell);
    }
  }
}

function handleClick(col) {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (!board[row][col]) {
      board[row][col] = currentPlayer;
      const cell = document.querySelector(
        `.cell[data-row='${row}'][data-col='${col}']`
      );
      cell.classList.add(currentPlayer);
      if (checkWin(row, col)) {
        const winner = currentPlayer === 'red' ? '1' : '2';
window.location.href = `winner.html?player=${winner}`;

        return;
      }
      currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
      statusText.textContent = `${currentPlayer === 'red' ? "Player 1's Turn (Red)" : "Player 2's Turn (Yellow)"}`;
      return;
    }
  }
}

function disableBoard() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => cell.style.pointerEvents = 'none');
}

function checkWin(r, c) {
  return (
    checkDir(r, c, 0, 1) || // Horizontal
    checkDir(r, c, 1, 0) || // Vertical
    checkDir(r, c, 1, 1) || // Diagonal down-right
    checkDir(r, c, 1, -1)   // Diagonal down-left
  );
}

function checkDir(row, col, rowDir, colDir) {
  let count = 1;
  count += countConsecutive(row, col, rowDir, colDir);
  count += countConsecutive(row, col, -rowDir, -colDir);
  return count >= 4;
}

function countConsecutive(row, col, rowDir, colDir) {
  let count = 0;
  let r = row + rowDir;
  let c = col + colDir;

  while (
    r >= 0 && r < ROWS &&
    c >= 0 && c < COLS &&
    board[r][c] === currentPlayer
  ) {
    count++;
    r += rowDir;
    c += colDir;
  }

  return count;
}

function resetGame() {
  currentPlayer = 'red';
  statusText.textContent = "Player 1's Turn (Red)";
  createBoard();
}

createBoard();

function startGame() {
  document.getElementById('welcomeScreen').style.display = 'none';
  document.getElementById('gameArea').style.display = 'block';
  createBoard();
}
