import { Settings } from "../scenes/settings.js";

// ============================================================================
export class Tuberias {

    static NRO_TUBERIAS = 20;
    static sizeX = 80;

    static FIJO_LARGA = 0.15;
    static MIN_LARGA = 0.40;
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

        this.elegir_tuberias(inicio);
        this.crear_tweens(inicio, this.array_elegidas);

        this.tuberias.children.iterate((pipe, index) => {

            pipe.setData('larga', this.set_altura_pipe(Settings.getPuntos().score));

            if (inicio) {

                pipe.setDepth(10);
                pipe.body.setAllowGravity(false).setImmovable(true);

                if (index % 2 === 0) {
                    pipe.setOrigin(0.5, 0);

                } else {
                    pipe.setOrigin(0.5, 1);
                }
            }

            if (index % 2 === 0) {
                pipe.setScale(1.2, pipe.getData('larga')).setFlipY(true);
                
            } else {

                pipe.setScale(1.2, pipe.getData('larga')).setFlipY(false);
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

    elegir_tuberias(inicio) {

        this.array_elegidas = [];
        let cuantas;

        if (!inicio) {
            cuantas = Math.floor(Settings.getPuntos().score / 50) + 3;
            if (cuantas > 20) cuantas = 20;
        
        } else {
            cuantas = 1;
        }

        for (let i = 0; i < cuantas; i ++) {
            do {
                this.elegida = Phaser.Utils.Array.GetRandom(this.tuberias.getChildren());
            } while (this.array_elegidas.includes(this.elegida));
    
            this.array_elegidas.push(this.elegida);
        }
    }

    crear_tweens(inicio, elegidas) {

        if (!inicio) this.interpolacion.remove();

        this.interpolacion = this.relatedScene.tweens.add({
            targets: elegidas,
            scaleY: Phaser.Math.FloatBetween(0.5, Tuberias.MAX_LARGA),
            ease: 'Sine.easeOut',
            yoyo: true,
            hold: 500,
            duration: Phaser.Math.Between(1200, 2400),
            repeat: -1
        });
    }

    get() {
        return this.tuberias;
    }
}
