import { game } from './game';

const UI = (function () {
  let board;
  const constructor = () => {
    cacheDOM();
    bindEvents();
  };
  const cacheDOM = () => {
    board = document.querySelector('#board1');
  };
  const bindEvents = () => {
    board.addEventListener('click', (event) => {
      const posX = event.target.getAttribute('data-set-x');
      const posY = event.target.getAttribute('data-set-y');
      console.log('hello');
      game.handleAttack(+posX, +posY);
    });
  };
  constructor();
})();
export { UI };
