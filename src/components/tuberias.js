import { Settings } from "../scenes/settings.js";

// ============================================================================
export class Tuberias {

    static NRO_TUBERIAS = 20;
    static sizeX = 80;

    static FIJO_LARGA = 0.15;
    static MIN_LARGA = 0.4;
    static MAX_LARGA = 0.88;

    static ALTURA_PIXELS = 300;

    // ----------------------------------------------------------------
    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {

        this.tuberias = this.relatedScene.physics.add.group();

        for (let i = 0; i < Tuberias.NRO_TUBERIAS; i ++) {

            this.tuberias.create(i * Tuberias.sizeX + Math.floor(Tuberias.sizeX / 2), 0, 'pipe');
            this.tuberias.create(
                i * Tuberias.sizeX + Math.floor(Tuberias.sizeX / 2),
                this.relatedScene.sys.game.config.height,
                'pipe'
            );
        }

        this.crear_resetear_tuberias(true);

        console.log(this.tuberias);
    }

    update() {

        if (Settings.getResetTuberias()) {

            Settings.setResetTuberias(false);
            this.crear_resetear_tuberias(false);
        }
    }

    crear_resetear_tuberias(inicio) {

        if (!inicio) {

            const { score, incPuntos } = Settings.getPuntos();

            Settings.setPuntos(score + incPuntos);
            this.relatedScene.marcadorPtos.update(' Puntos: ', Settings.getPuntos().score);
        }

        this.tuberias.children.iterate((pipe, index) => {

            pipe.setData('larga', this.set_altura_pipe(Settings.getPuntos().score));

            if (inicio) {

                pipe.setOrigin(0.5, 0).setDepth(10);
                pipe.body.setAllowGravity(false).setImmovable(true);
            }

            if (index % 2 === 0) {

                pipe.setScale(1.2, pipe.getData('larga')).setFlipY(true);
                
            } else {

                pipe.setScale(1.2, pipe.getData('larga')).setFlipY(false);

                if (inicio) {
                    pipe.setY(pipe.y - Math.floor(Tuberias.ALTURA_PIXELS * pipe.getData('larga')));

                } else {

                    pipe.setY(this.relatedScene.sys.game.config.height - Math.floor(Tuberias.ALTURA_PIXELS * pipe.getData('larga')));
                }
            }
        });
    }

    set_altura_pipe(puntos) {

        let max_larga = Tuberias.MIN_LARGA + puntos / 1000;
        if (max_larga >= Tuberias.MAX_LARGA) max_larga = Tuberias.MAX_LARGA;
        
        let min_larga = Tuberias.FIJO_LARGA + puntos / 3000;
        if (min_larga >= Tuberias.MAX_LARGA) min_larga = Tuberias.MAX_LARGA;

        return Phaser.Math.FloatBetween(min_larga, max_larga);
    }

    get() {
        return this.tuberias;
    }
}

// ============================================================================
//  Tuberias Moviles
//  
// ============================================================================
export class TuberiasMoviles {

    static NRO_TUBERIAS = 2;
    static sizeX = 80;

    static FIJO_LARGA = 0.15;
    static MIN_LARGA = 0.4;
    static MAX_LARGA = 0.87;

    static VELOCIDAD = 0.005;

    static ALTURA_PIXELS = 300;

    // ----------------------------------------------------------------
    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {

        this.moviles = this.relatedScene.physics.add.group();
        
        

        console.log(this.moviles);
    }

    update() {
        
    }

    get() {
        return this.moviles;
    }
}
