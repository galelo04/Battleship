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
  const ships = Array(10);
  const gameBoard = Array(10);
  let NOSunkShips;

  const constructor = () => {
    for (let i = 0; i < 10; i++) {
      gameBoard[i] = Array(10).fill(null); // Initialize each row separately
    }
    const lengthsOfShips = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    for (let i = 0; i < ships.length; i++) {
      const ship = createShip(lengthsOfShips[i]);
      ships[i] = ship;
    }
    NOSunkShips = 0;
  };

  const placeShipsRandomly = () => {
    for (let i = 0; i < ships.length; i++) {
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
    const upEdge = startPosY === 0;
    const botEdge = direction ? startPosY + shipLength === 10 : startPosY === 9;
    const leftEdge = startPosX === 0;
    const rightEdge = !direction
      ? startPosX + shipLength === 10
      : startPosX === 9;

    if (startPosX > 9 || startPosX < 0 || startPosY > 9 || startPosY < 0)
      return false;
    if (direction) {
      //true --> vertical
      if (startPosY + shipLength > 9) return false;
      for (let i = 0; i < shipLength; i++) {
        if (gameBoard[startPosY + i][startPosX]) return false;
      }
      if (!upEdge) {
        gameBoard[startPosY - 1][startPosX] = '/';
        if (!leftEdge) gameBoard[startPosY - 1][startPosX - 1] = '/';
        if (!rightEdge) gameBoard[startPosY - 1][startPosX + 1] = '/';
      }
      for (let i = 0; i < shipLength; i++) {
        if (!leftEdge) gameBoard[startPosY + i][startPosX - 1] = '/';
        gameBoard[startPosY + i][startPosX] = shipId + 1;
        if (!rightEdge) gameBoard[startPosY + i][startPosX + 1] = '/';
      }
      if (!botEdge) {
        gameBoard[startPosY + shipLength][startPosX] = '/';
        if (!leftEdge) gameBoard[startPosY + shipLength][startPosX - 1] = '/';
        if (!rightEdge) gameBoard[startPosY + shipLength][startPosX + 1] = '/';
      }
    }
    if (!direction) {
      // false --> horizontal
      if (startPosX + shipLength > 9) return false;
      for (let i = 0; i < shipLength; i++) {
        if (gameBoard[startPosY][startPosX + i]) return false;
      }
      if (!leftEdge) {
        gameBoard[startPosY][startPosX - 1] = '/';
        if (!upEdge) gameBoard[startPosY - 1][startPosX - 1] = '/';
        if (!botEdge) gameBoard[startPosY + 1][startPosX - 1] = '/';
      }
      for (let i = 0; i < shipLength; i++) {
        if (!upEdge) gameBoard[startPosY - 1][startPosX + i] = '/';
        gameBoard[startPosY][startPosX + i] = shipId + 1;
        if (!botEdge) gameBoard[startPosY + 1][startPosX + i] = '/';
      }
      if (!rightEdge) {
        gameBoard[startPosY][startPosX + shipLength] = '/';
        if (!upEdge) gameBoard[startPosY - 1][startPosX + shipLength] = '/';
        if (!botEdge) gameBoard[startPosY + 1][startPosX + shipLength] = '/';
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
    if (gameBoard[posY][posX] && gameBoard[posY][posX] !== '/') {
      ships[gameBoard[posY][posX] - 1].hit();
      if (ships[gameBoard[posY][posX] - 1].isSunk()) {
        NOSunkShips++;
      }
      gameBoard[posY][posX] = 0;
    } else gameBoard[posY][posX] = -1;
    return gameBoard[posY][posX];
  };

  const checkLoss = () => {
    return NOSunkShips === ships.length;
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
