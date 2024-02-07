
// =================================================================================
export function loader(scene) {

  // scene.load.json('settings', '../src/json/settings.json');

  scene.load.image('fondo-scroll', './src/img/fondo-cielo3200x600.png');

  scene.load.image('boton-nueva-partida', './src/img/boton-start.png');
  scene.load.spritesheet('boton-fullscreen', './src/img/boton-fullscreen.png', {frameWidth: 64, frameHeight: 64});
  
  scene.load.spritesheet('jugador', './src/img/bird64x72.png', {frameWidth: 64, frameHeight: 62});
  scene.load.image('pipe', './src/img/pipe.png');

  // -------------------------------------------------------------------------
  scene.load.audio('musica-fondo', './src/audio/8-bit-arcade-1.mp3');
  scene.load.audio('dieT1', './src/audio/dieThrow1.ogg');
  scene.load.audio('dieT2', './src/audio/dieThrow2.ogg');
  scene.load.audio('moneda-mario', './src/audio/p-ping.mp3');
  scene.load.audio('gameover', './src/audio/gameover.mp3');
}
