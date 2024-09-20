import { createBoard } from './gameBoard';
import { getRandomIntInclusive } from './gameBoard';
function createPlayer(type) {
  const _type = type;
  const board = createBoard();
  const constructor = () => {
    board.placeShipsRandomly();
  };

  const play = (posX, posY) => {
    if (_type === 'real') return personPlay(posX, posY);
    return computerPlay();
  };
  const personPlay = (posX, posY) => {
    return board.receiveAttack(posX, posY);
  };
  const computerPlay = () => {
    let posX = getRandomIntInclusive(0, 9);
    let posY = getRandomIntInclusive(0, 9);
    let attack = board.receiveAttack(posX, posY);
    while (!attack) {
      posX = getRandomIntInclusive(0, 9);
      posY = getRandomIntInclusive(0, 9);
      attack = board.receiveAttack(posX, posY);
    }
    return attack;
  };
  constructor();
  return { play };
}

export { createPlayer };
