import { createShip } from './ship';

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

// board numbers details
/*
    ships:
    1 --> Carrier ship length 5 (id 0)
    2 --> Battleship ship length 4 (id 1)
    3 --> Destroyer ship length 3 (id 2)
    4 --> Submarine ship length 3 (id 3)
    5 --> Patrol boat length 2 (id 4)

    other:
    -1   --> miss
    0    --> hit
    null --> empty cell  

*/

function createBoard() {
  const ships = Array(5);
  const gameBoard = Array(10);
  let NOSunkShips;

  const constructor = () => {
    gameBoard.fill().map(() => Array(10).fill(null));
    const lengthsOfShips = [5, 4, 3, 3, 2];
    for (let i = 0; i < 5; i++) {
      const ship = createShip(lengthsOfShips[i]);
      ships[i] = ship;
    }
    NOSunkShips = 0;
  };

  const placeShipsRandomly = () => {
    for (let i = 0; i < 5; i++) {
      let direction = getRandomIntInclusive(0, 1);
      let startPosX = getRandomIntInclusive(0, 9);
      let startPosY = getRandomIntInclusive(0, 9);
      while (!placeShipOnBoard(startPosX, startPosY, i, direction)) {
        direction = getRandomIntInclusive(0, 1);
        startPosX = getRandomIntInclusive(0, 9);
        startPosY = getRandomIntInclusive(0, 9);
      }
    }
    return true;
  };

  const placeShipOnBoard = (startPosX, startPosY, shipId, direction) => {
    const shipLength = ships[shipId].getLength();
    if (startPosX > 9 || startPosX < 0 || startPosY > 9 || startPosY < 0)
      return false;
    if (direction) {
      //true --> vertical
      if (startPosY + shipLength > 9) return false;
      for (let i = 0; i < shipLength; i++) {
        if (gameBoard[startPosY + i][startPosX]) return false;
      }
      for (let i = 0; i < shipLength; i++) {
        gameBoard[startPosY + i][startPosX] = shipId + 1;
      }
    }
    if (!direction) {
      // false --> horizontal
      if (startPosX + shipLength > 9) return false;
      for (let i = 0; i < shipLength; i++) {
        if (gameBoard[startPosY][startPosX + i]) return false;
      }
      for (let i = 0; i < shipLength; i++) {
        gameBoard[startPosY][startPosX + i] = shipId + 1;
      }
    }
    return true;
  };

  const receiveAttack = (posX, posY) => {
    if (
      posX > 9 ||
      posX < 0 ||
      posY > 9 ||
      posY < 0 ||
      gameBoard[posY][posX] === -1 ||
      gameBoard[posY][posX] === 0
    )
      return null;
    if (gameBoard[posY][posX]) {
      ships[gameBoard[posY][posX] - 1].hit();
      if (ships[gameBoard[posY][posX] - 1].isSunk()) {
        NOSunkShips++;
      }
      gameBoard[posY][posX] = 0;
    } else gameBoard[posY][posX] = -1;
    return gameBoard[posY][posX];
  };

  const checkLoss = () => {
    return NOSunkShips === 5;
  };

  const getBoard = () => {
    return gameBoard.map((row) => [...row]);
  };

  constructor();

  return {
    placeShipOnBoard,
    placeShipsRandomly,
    receiveAttack,
    checkLoss,
    getBoard,
  };
}
export { createBoard, getRandomIntInclusive };
