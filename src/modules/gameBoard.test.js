import { createBoard } from './gameBoard';
describe('gameBoard tests', () => {
  let board;
  beforeEach(() => {
    board = createBoard();
  });
  test('initialize board', () => {});

  test('place a ship the start index out of boarders horizontally', () => {
    expect(board.placeShipOnBoard(12, 5, 2, false)).toBeFalsy();
  });

  test('place a ship the start index out of boarders vertically', () => {
    expect(board.placeShipOnBoard(12, 5, 2, true)).toBeFalsy();
  });

  test('place a ship not contained in the border horizontally', () => {
    expect(board.placeShipOnBoard(7, 2, 0, false)).toBeFalsy();
  });

  test('place a ship not contained in the border vertically', () => {
    expect(board.placeShipOnBoard(2, 7, 0, true)).toBeFalsy();
  });

  test('place a ship correctly horizontally', () => {
    expect(board.placeShipOnBoard(2, 2, 2, false)).toBeTruthy();
  });

  test('place a ship correctly vertically', () => {
    expect(board.placeShipOnBoard(2, 2, 2, true));
  });

  test('place a ship overlapping another ship', () => {
    board.placeShipOnBoard(2, 2, 0, true);
    expect(board.placeShipOnBoard(1, 4, 1, false)).toBeFalsy();
  });

  test('place ships on board randomly', () => {
    expect(board.placeShipsRandomly()).toBeTruthy();
  });

  test('receive attack out of board ', () => {
    expect(board.receiveAttack(15, 15)).toBeNull();
  });

  test('receive attack on attacked ship', () => {
    board.placeShipOnBoard(2, 2, 0, true);
    board.receiveAttack(2, 2);
    expect(board.receiveAttack(2, 2)).toBeNull();
  });

  test('receive attack on missed spot', () => {
    board.receiveAttack(2, 2);
    expect(board.receiveAttack(2, 2)).toBeNull();
  });

  test('receive attack miss', () => {
    board.placeShipOnBoard(2, 2, 0, true);
    expect(board.receiveAttack(1, 1)).toBe(-1);
  });

  test('receive attack on a ship', () => {
    board.placeShipOnBoard(2, 2, 0, true);
    expect(board.receiveAttack(2, 2)).toBe(0);
  });
});
