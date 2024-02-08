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

    static NRO_TUBERIAS = 5;
    static sizeX = 80;

    static FIJO_LARGA = 0.15;
    static MIN_LARGA = 0.4;
    static MAX_LARGA = 0.87;

    static ALTURA_PIXELS = 300;

    // ----------------------------------------------------------------
    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {

        this.array_elegidas = [];

        this.moviles = this.relatedScene.physics.add.group();

        for (let i = 0; i < TuberiasMoviles.NRO_TUBERIAS; i ++) {

            do {
                this.elegida = Phaser.Math.Between(8, this.relatedScene.tuberias.get().getChildren().length - 1);
            } while (this.elegida % 2 !== 0 || this.array_elegidas.includes(this.elegida));

            this.array_elegidas.push(this.elegida);
    
            this.relatedScene.tuberias.get().getChildren()[this.elegida].disableBody(true, true);
            this.relatedScene.tuberias.get().getChildren()[this.elegida + 1].disableBody(true, true);

            this.moviles.create(this.relatedScene.tuberias.get().getChildren()[this.elegida].x, 0, 'pipe');
            this.moviles.create(
                this.relatedScene.tuberias.get().getChildren()[this.elegida].x,
                this.relatedScene.sys.game.config.height,
                'pipe'
            );
        }

        this.crear_resetear_tuberias(true);

        console.log(this.moviles);
    }

    update() {

        this.mover_tuberias();

        if (Settings.getResetTuberias()) {

            Settings.setResetTuberias(false);
            this.crear_resetear_tuberias(false);
        }
    }

    crear_resetear_tuberias(inicio) {

        const long = this.array_elegidas.length;

        for (let i = 0; i < long; i ++) {

            const ele = this.array_elegidas[i];
            this.array_elegidas.push(ele);
        }

        this.moviles.children.iterate((pipe, index) => {

            pipe.setData('larga', this.relatedScene.tuberias.get().getChildren()[this.array_elegidas[index]].getData('larga'));
            pipe.setData('min', 0.2);
            pipe.setData('max', Phaser.Math.FloatBetween(TuberiasMoviles.MIN_LARGA, TuberiasMoviles.MAX_LARGA));
            pipe.setData('vel-y', Phaser.Math.FloatBetween(0.004, 0.006));
            pipe.setAlpha(1);

            if (inicio) {

                if (index % 2 === 0) {
                    pipe.setOrigin(0.5, 0).setFlipY(true);
                } else {
                    pipe.setOrigin(0.5, 1).setFlipY(false);
                }

                pipe.setDepth(10);
                pipe.body.setAllowGravity(false).setImmovable(true);

            }

            if (index % 2 === 0) {
                pipe.setScale(1.2, pipe.getData('min'));

            } else {

                pipe.setScale(1.2, pipe.getData('min'));
                pipe.setY(this.relatedScene.sys.game.config.height);
                pipe.setData('vel-y', -pipe.getData('vel-y'));
            }
        });
    }

    mover_tuberias() {

        this.moviles.children.iterate((pipe, index) => {

            if (index % 2 === 0) {

                if (pipe.getData('vel-y') > 0 && pipe.getData('min') >= pipe.getData('max')) {
            
                    pipe.setData('vel-y', -pipe.getData('vel-y'));
                }
                
                if (pipe.getData('vel-y') < 0 && pipe.getData('min') <= TuberiasMoviles.FIJO_LARGA) {
                    
                    pipe.setData('vel-y', Math.abs(pipe.getData('vel-y')));
                }
            }

            pipe.setData('min', pipe.getData('min') + pipe.getData('vel-y'));
            pipe.setScale(1.2, pipe.getData('min'));

            if (index % 2 !== 0) pipe.setData('vel-y', 0);
        });

        const contrario = this.moviles.getChildren()[0].getData('vel-y');

        this.moviles.children.iterate((pipe, index) => {

            if (index % 2 !== 0) pipe.setData('vel-y', contrario);
        });
    }

    get() {
        return this.moviles;
    }
}
