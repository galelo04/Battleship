function createShip(length) {
  let _length;
  let _sunk;
  let _NOHits;
  const constructor = (length) => {
    _length = length >= 2 && length <= 5 ? length : null;
    _sunk = false;
    _NOHits = 0;
  };

  const getLength = () => _length;
  const isSunk = () => _sunk;
  const getNOHits = () => _NOHits;

  const hit = () => {
    _NOHits++;
    if (_NOHits === length) _sunk = true;
  };

  constructor(length);
  return { getLength, isSunk, getNOHits, hit };
}

export { createShip };
