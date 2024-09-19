import { createShip } from './ship';

describe('ship test', () => {
  test('create a ship with a given length', () => {
    const ship = createShip(4);
    expect(ship.getLength()).toBe(4);
  });

  test("Ship can't be with length more than 5 or less than 2", () => {
    const ship = createShip(8);
    expect(ship.getLength()).toBeNull();
  });

  test('a ship is initially not sunk', () => {
    const ship = createShip(4);
    expect(ship.isSunk()).toBeFalsy();
  });

  test('a ship is initially with no hits', () => {
    const ship = createShip(3);
    expect(ship.getNOHits()).toBe(0);
  });

  test('a ship can be hit ', () => {
    const ship = createShip(2);
    ship.hit();
    expect(ship.getNOHits()).toBe(1);
  });

  test('a ship can be hit twice ', () => {
    const ship = createShip(2);
    ship.hit();
    ship.hit();
    expect(ship.getNOHits()).toBe(2);
  });

  test('a ship is sunk when the NOHits equals the length ', () => {
    const ship = createShip(2);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
