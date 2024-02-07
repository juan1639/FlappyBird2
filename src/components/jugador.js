import { Settings } from "../scenes/settings.js";

// =========================================================================
export class Jugador {

    constructor(scene) {
        this.relatedScene = scene;
    }

    create(escena) {

        console.log(escena);
        const jugadorPosX = this.relatedScene.sys.game.config.width / 2;
        const jugadorPosY = this.relatedScene.sys.game.config.height / 2;

        this.jugador = this.relatedScene.physics.add.sprite(jugadorPosX, jugadorPosY, 'jugador');

        this.jugador.setData('game-over', false);
        this.jugador.setData('vel-y', Settings.getFuerzaAleteoPajaro());// fuerza del aleteo del pajaro

        const setVel_pajaro = escena !== 'game' ? 0 : Settings.getVelScroll();
        this.jugador.setData('vel-x', setVel_pajaro);

        this.jugador.setFlip(true).setAngle(0).setAlpha(1).setDepth(20);
        this.jugador.setX(jugadorPosX).setY(jugadorPosY);
        this.jugador.setVelocityX(this.jugador.getData('vel-x')).setVelocityY(0);
        this.jugador.setCollideWorldBounds(true);
        this.jugador.body.setAllowGravity(false);

        setTimeout(() => {
            this.jugador.body.setAllowGravity(true);
        }, 1900);

        this.relatedScene.anims.create({
            key: 'aleteo', 
            frames: this.relatedScene.anims.generateFrameNumbers('jugador', {start: 0, end: 19}),
            frameRate: 60,
            repeat: -1
        });

        this.controles = this.relatedScene.input.keyboard.createCursorKeys();

        this.relatedScene.input.on('pointerdown', () => {

            if (!this.jugador.body.allowGravity) return;

            // console.log('pointerdown');

            this.jugador.setVelocityY(-this.jugador.getData('vel-y'));
            this.jugador.anims.play('aleteo', true);
        });

        console.log(this.jugador);
    }

    update() {

        if (!this.jugador.body.allowGravity || this.jugador.getData('game-over')) return;

        if (
            this.controles.space.isDown ||
            this.controles.left.isDown ||
            this.controles.right.isDown ||
            this.controles.up.isDown ||
            this.controles.down.isDown
        ) {

            this.jugador.anims.play('aleteo', true);
            this.jugador.setVelocityY(-this.jugador.getData('vel-y'));
        }

        this.loop_jugador();
    }

    loop_jugador() {

        if (this.jugador.x >= this.relatedScene.sys.game.config.width * 2.5) {
            Settings.setResetTuberias(true);
            this.jugador.setX(-this.relatedScene.sys.game.config.width / 2);
        }
    }

    setTweensGameOver(jugador) {

        this.relatedScene.tweens.add({
            targets: jugador,
            angle: 360,
            ease: 'easeOut',
            duration: 1500,
            repeat: -1
        });
    }

    get() {
        return this.jugador;
    }
}
