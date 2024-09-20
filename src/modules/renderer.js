const renderer = (function () {
  const render = (board1, board2) => {
    renderBoard(board1, 1);
    renderBoard(board2, 2);
  };
  const renderBoard = (board, boardNum) => {
    const boardDiv = document.querySelector(`#board${boardNum}`);
    board.forEach((row) => {
      row.forEach((cell) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        if (cell && cell !== '/') cellDiv.classList.add('ship');
        boardDiv.appendChild(cellDiv);
      });
    });
  };
  return { render };
})();

export { renderer };
