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
    if (player.play(posX, posY, computer.getBoard())) {
      renderer.render(player.getBoard(), computer.getBoard());
      if (computer.checkLoss()) {
        alert('you won');
        if (confirm('play again')) constructor();
      } else {
        computer.play(null, null, player.getBoard());
        renderer.render(player.getBoard(), computer.getBoard());
        if (player.checkLoss()) {
          alert('you lost');
          if (confirm('play again')) constructor();
        }
      }
      return true;
    }
    return false;
  };
  constructor();
  return { handleAttack };
})();

export { game };
