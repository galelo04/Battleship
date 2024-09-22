import { createBoard } from './gameBoard';
import { getRandomIntInclusive } from './gameBoard';
function createPlayer(type) {
  const _type = type;
  const board = createBoard();
  const constructor = () => {
    board.placeShipsRandomly();
  };

  const play = (posX, posY, opponentBoard) => {
    if (_type === 'real') return personPlay(posX, posY, opponentBoard);
    return computerPlay(opponentBoard);
  };
  const personPlay = (posX, posY, opponentBoard) => {
    return opponentBoard.receiveAttack(posX, posY) !== null;
  };
  const computerPlay = (opponentBoard) => {
    let posX = getRandomIntInclusive(0, 9);
    let posY = getRandomIntInclusive(0, 9);
    let attack = opponentBoard.receiveAttack(posX, posY);
    while (attack === null) {
      posX = getRandomIntInclusive(0, 9);
      posY = getRandomIntInclusive(0, 9);
      attack = opponentBoard.receiveAttack(posX, posY);
    }
    return attack;
  };
  const getBoard = () => {
    return board;
  };
  const checkLoss = () => {
    return board.checkLoss();
  };
  constructor();
  return { play, getBoard, checkLoss };
}

export { createPlayer };
