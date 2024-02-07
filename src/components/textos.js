import { centrar_txt } from "../functions/functions.js";

// =======================================================================
export class Textos {

    // -----------------------------------------------------------
    constructor(scene) {
        this.relatedScene = scene;
    }

    create(args) {

        const {
            x, y, texto, size, style, offx, offy, col, blr, fillShadow, fll, family, screenWidth, multip
        } = args;

        console.log(args);

        this.txt = this.relatedScene.add.text(x, y, texto, {
            fontSize: size + 'px',
            fontStyle: style,
            shadow: {
                offsetX: offx,
                offsetY: offy,
                color: col,
                blur: blr,
                fill: fillShadow
            },
            fill: fll,
            fontFamily: family
        });
        this.txt.setDepth(25);

        this.centrar(texto, screenWidth, multip);
        this.crear_tweens(texto);

        console.log(this.txt);
    }

    crear_tweens(texto) {

        const array_tweens = [
            ' Preparado... '
        ];

        array_tweens.forEach(tween => {

            if (tween.slice(0, 5) === texto.slice(0, 5)) {

                this.relatedScene.tweens.add({
                    targets: this.txt,
                    alpha: 0,
                    ease: 'easeOut',
                    duration: 1500
                });
            }
        });

        // ----------------------------------------------
        const array_tweens2 = [
            ' Flappy Jon '
        ];

        array_tweens2.forEach(tween => {

            if (tween === texto) {

                this.relatedScene.tweens.add({
                    targets: this.txt,
                    y: Math.floor(this.relatedScene.sys.game.config.height / 5),
                    ease: 'Elastic',
                    duration: 2000
                });
            }
        });
    }

    centrar(texto, screenWidth, multip) {

        const centrarTxt = [
            ' Flappy Jon ',
            ' Game Over '
        ];

        centrarTxt.forEach(centra => {
            if (texto.slice(0, 5) === centra.slice(0, 5)) this.txt.setX(centrar_txt(this.txt, screenWidth * multip));
        });
    }

    get() {
        return this.txt;
    }
}
