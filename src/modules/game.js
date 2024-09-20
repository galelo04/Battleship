import { createPlayer } from './player';
import { renderer } from './renderer';
const game = (function () {
  const constructor = () => {
    const player = createPlayer('real');
    const computer = createPlayer('computer');
    renderer.render(player.getBoard(), computer.getBoard());
  };
  constructor();
})();

export { game };
