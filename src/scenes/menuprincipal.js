import { loader } from './loader.js';
import { Textos } from '../components/textos.js';
import { FondoScroll } from '../components/fondoscroll.js';
import { centrar_txt, play_sonidos } from '../functions/functions.js';
import { Settings } from './settings.js';
import { BotonNuevaPartida } from '../components/boton-nuevapartida.js';

// =================================================================================
export class MenuPrincipal extends Phaser.Scene {

    // -------------------------------------------------
    constructor() {
        super({ key: 'menuprincipal' });
    }

    init() {

        Settings.setPuntos(0);
        Settings.setVidas(3);
        Settings.setVelScroll(200);

        this.fondoscroll = new FondoScroll(this);
        this.botoninicio = new BotonNuevaPartida(this);
        this.txt = new Textos(this);
    } 
    
    preload() {
        
        const txt = this.add.text(
            Math.floor(this.sys.game.config.width / 2), Math.floor(this.sys.game.config.height / 2),
            ' Cargando...', {
                fontSize: '50px',
                fill: '#ffa',
                fontFamily: 'verdana, arial, sans-serif'
            }
        );
        
        txt.setX(centrar_txt(txt, this.sys.game.config.width));
        
        loader(this);
    }
    
    create() {
        
        this.sonidoMenuSelect = this.sound.add('moneda-mario');

        const aparecerBoton = 1900;

        this.fondoscroll.create();
        
        // -----------------------------------------------------------
        const left = Math.floor(this.sys.game.config.width / 5.2);
        const top = -200;

        this.txt.create({
            x: left, y: top, texto: ' Flappy Jon ',
            size: 100, style: 'bold', oofx: 1, offy: 1, col: '#fff', blr: 15,
            fillShadow: true, fll: '#e81', family: 'verdana, arial, sans-serif',
            screenWidth: this.sys.game.config.width, multip: 1
        });
        
        this.add.timeline([
            {
                at: aparecerBoton,
                run: () => {
                    this.botoninicio.create('prenivel', false);
                }
            }
        ]).play();

        play_sonidos(this.sonidoMenuSelect, false, 0.7);

        console.log(this.txt);
    }
}
