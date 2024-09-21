const renderer = (function () {
  const render = (board1, board2) => {
    renderBoard(board1, 1);
    renderBoard(board2, 2);
  };
  const renderBoard = (board, boardNum) => {
    const boardDiv = document.querySelector(`#board${boardNum}`);
    boardDiv.innerHTML = '';
    let i = 0;
    board.forEach((row) => {
      let j = 0;
      row.forEach((cell) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        cellDiv.setAttribute('data-set-x', j);
        cellDiv.setAttribute('data-set-y', i);
        if (cell === -1) cellDiv.classList.add('miss');
        else if (cell === 0) cellDiv.classList.add('hit');
        if (cell && cell !== '/') cellDiv.classList.add('ship');
        boardDiv.appendChild(cellDiv);
        j++;
      });
      i++;
    });
  };
  return { render };
})();

export { renderer };
