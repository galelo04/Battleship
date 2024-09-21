import { createPlayer } from './player';
import { renderer } from './renderer';
const game = (function () {
  let player;
  let computer;
  const constructor = () => {
    player = createPlayer('real');
    computer = createPlayer('computer');
    renderer.render(player.getBoard(), computer.getBoard());
  };
  const handleAttack = (posX, posY) => {
    if (player.play(posX, posY)) {
      renderer.render(player.getBoard(), computer.getBoard());
      setTimeout(computer.play(), 1000);
      renderer.render(player.getBoard(), computer.getBoard());
      return true;
    }
    return false;
  };
  constructor();
  return { handleAttack };
})();

export { game };
