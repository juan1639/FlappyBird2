import { Settings } from "../scenes/settings.js";
import { Textos } from "../components/textos.js";

// =================================================================================
function colisionYgameover(jugador, scene) {

  jugador.setData('game-over', true);
  jugador.setVelocityX(0);
  scene.jugador.setTweensGameOver(jugador);

  scene.sonidoMusicaFondo.pause();
  play_sonidos(scene.sonidoDieT2, false, 0.9);

  if (Settings.getPuntos().score > Settings.getRecord()) Settings.setRecord(Settings.getPuntos().score);

  scene.tuberias.get().children.iterate(pipe => pipe.setData('vel-x', Settings.getVelScroll()));

  scene.txt = new Textos(scene);

  scene.add.timeline(
    {
      at: 1900,
      run: () => {
        const left = Math.floor(scene.sys.game.config.width / 2);
        const top = Math.floor(scene.sys.game.config.height + 100);

        scene.txt.create({
            x: left, y: top, texto: ' Game Over ',
            size: 90, style: 'bold', oofx: 1, offy: 1, col: '#fff', blr: 15,
            fillShadow: true, fll: '#e51', family: 'verdana, arial, sans-serif',
            screenWidth: scene.sys.game.config.width, multip: 1
        });

        scene.botoninicio.create('prenivel', true);
        play_sonidos(scene.sonidoGameOver, false, 0.9);
      }
    }
  ).play();
}

// =================================================================================
function centrar_txt(texto, anchoScreen) {
  
  console.log(texto.width);
  return Math.floor(anchoScreen / 2 - texto.width / 2);
}

// =================================================================================
function play_sonidos(id, loop, volumen) {

  id.volume = volumen;
  id.loop = loop;
  id.play();
}

export {
  colisionYgameover,
  centrar_txt,
  play_sonidos
};
