import { Iniciar } from './scenes/iniciar.js';
import { MenuPrincipal } from './scenes/menuprincipal.js';
import { Prenivel } from './scenes/prenivel.js';
import { Game } from './scenes/game.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [Iniciar, MenuPrincipal, Prenivel, Game],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 1500},
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  // audio: {
  //   disableWebAudio: true
  // }
}

var game = new Phaser.Game(config);
