
// ================================================================================
export class FondoScroll {

    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {

        this.fondoscroll = this.relatedScene.add.image(
            -this.relatedScene.sys.game.config.width, 0, 'fondo-scroll'
        ).setOrigin(0, 0).setDepth(0);

        console.log(this.fondoscroll);
    }
    
    get() {
        return this.fondoscroll;
    }
}
