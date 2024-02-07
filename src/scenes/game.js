// =========================================================================================
//  F l a p p y  J o n
// 
// -----------------------------------------------------------------------------------------
import { FondoScroll } from '../components/fondoscroll.js';
import { Jugador } from '../components/jugador.js';
import { Tuberias, TuberiasMoviles } from '../components/tuberias.js';
import { Marcador } from '../components/marcador.js';
import { Textos } from '../components/textos.js';
import { BotonNuevaPartida, BotonFullScreen } from '../components/boton-nuevapartida.js';
import { play_sonidos, colisionYgameover } from '../functions/functions.js';
import { Settings } from './settings.js';

// ============================================================================
export class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'game' });
  }

  init() {

    this.fondoscroll = new FondoScroll(this);
    this.jugador = new Jugador(this);
    this.tuberias = new Tuberias(this);
    this.moviles = new TuberiasMoviles(this);

    const ancho = this.sys.game.config.width;
    const alto = this.sys.game.config.height;

    this.marcadorPtos = new Marcador(this, {
      x: 10, y: -50, size: 35, txt: ' Puntos: ', color: '#fff', id: 0
    });

    this.marcadorHi = new Marcador(this, {
      x: Math.floor(ancho / 2), y: -50, size: 35, txt: ' Record: ', color: '#fff', id: 2
    });

    this.botonfullscreen = new BotonFullScreen(this, {
      id: 'boton-fullscreen', x: Math.floor(this.sys.game.config.width / 1.1), y: -25,
      ang: 0, scX: 0.8, scY: 0.6 
    });

    this.txt = new Textos(this);
    this.botoninicio = new BotonNuevaPartida(this);
  }

  preload() {
    
    // loader(this);
  }

  create() {

    this.sonidos_set();
    this.set_camerasMain();
    this.set_cameras_marcadores();
    this.set_cameras_gameover();

    this.jugador.create(this.scene.key);
    this.fondoscroll.create();
    this.tuberias.create();
    // this.moviles.create(this.tuberias.get().getChildren()[Tuberias.NRO_TUBERIAS * 2 - 1].x);

    this.marcadorPtos.create();
    this.marcadorHi.create();
    // this.jugadorSV.create();
    this.botonfullscreen.create();

    this.texto_preparado();

    this.mouse_showXY = {
      create: this.add.text(this.jugador.get().x, this.jugador.get().y - 100, ' ', { fill: '#111' }),
      show_mouseXY: true
    }

    this.cameras.main.startFollow(this.jugador.get());

    this.crear_colliders();
  }
  
  // ================================================================
  update() {

    // this.pointer_showXY(this.mouse_showXY);
    this.jugador.update();
    this.fondoscroll.update();
    this.tuberias.update();
    // this.moviles.update();

    if (this.txt.get() && !this.jugador.get().getData('game-over')) this.txt.get().setX(this.jugador.get().x + 50);
  }

  // ================================================================
  sonidos_set() {

    this.sonidoMusicaFondo = this.sound.add('musica-fondo');
    if (!this.sonidoMusicaFondo.isPlaying) play_sonidos(this.sonidoMusicaFondo, true, 0.7);

    this.sonidoDieT1 = this.sound.add('dieT1');
    this.sonidoDieT2 = this.sound.add('dieT2');
    this.sonidoMonedaMario = this.sound.add('moneda-mario');
    this.sonidoGameOver = this.sound.add('gameover');
  }
  
  // ================================================================
  set_camerasMain() {

    const { numberWidths, numberHeights } = Settings.getScreen();

    this.cameras.main.setBounds(
      -800, 0,
      Math.floor(this.sys.game.config.width * numberWidths), Math.floor(this.sys.game.config.height * numberHeights)
    );

    this.physics.world.setBounds(
      -800, 0,
      Math.floor(this.sys.game.config.width * numberWidths), Math.floor(this.sys.game.config.height * numberHeights)
    );

    console.log(this.physics.world);
  }

  // ================================================================
  set_cameras_marcadores() {

    var { x, y, ancho, alto, scrollX, scrollY } = Settings.getCameraScores();
    
    this.mapa_scores = this.cameras.add(x, y, ancho, alto).setZoom(0.9).setName('view-scores').setAlpha(0.9).setOrigin(0, 0);
    this.mapa_scores.scrollX = scrollX;
    this.mapa_scores.scrollY = scrollY;
    // console.log(this.mapa_scores);
  }

  // ================================================================
  set_cameras_gameover() {

    var { x, y, ancho, alto, scrollX, scrollY } = Settings.getCameraGameover();
    
    this.mapa_gameover = this.cameras.add(x, y, ancho, alto).setZoom(1).setName('view-gameover').setAlpha(1).setOrigin(0, 0);
    this.mapa_gameover.scrollX = scrollX;
    this.mapa_gameover.scrollY =scrollY;
    // console.log(this.mapa_scores);
  }

  // ================================================================
  texto_preparado() {

    const left = Math.floor(this.sys.game.config.width / 2.2);
    const top = Math.floor(this.sys.game.config.height / 2);

    this.txt.create({
        x: left, y: top, texto: ' Preparado... ',
        size: 30, style: 'bold', oofx: 1, offy: 1, col: '#fff', blr: 15,
        fillShadow: true, fll: '#3a1', family: 'verdana, arial, sans-serif',
        screenWidth: this.sys.game.config.width, multip: 1
    });

    setTimeout(() => this.txt.get().destroy(), 1900);
  }

  // ================================================================
  crear_colliders() {

    this.physics.add.collider(this.jugador.get(), this.tuberias.get(), (jugador, tuberia) => {

      colisionYgameover(jugador, this);

    }, (jugador, tuberia) => {

      if (jugador.getData('game-over')) return false;
      return true;
    });

    // ----------------------------------------------------------
    this.physics.add.collider(this.jugador.get(), this.moviles.get(), (jugador, moviles) => {

      colisionYgameover(jugador, this);

    }, (jugador, moviles) => {

      if (jugador.getData('game-over')) return false;
      return true;
    }, this);
  }

  // ================================================================
  pointer_showXY({create, show_mouseXY}) {
    
    if (!show_mouseXY) return;
    
    const pointer = this.input.activePointer;
    // console.log(pointer.worldX, pointer.worldY);
    
    create.setText([
      `x: ${pointer.worldX}`,
      `y: ${pointer.worldY}`
    ]).setX(this.jugador.get().x).setY(this.jugador.get().y - 170);
  }
}
