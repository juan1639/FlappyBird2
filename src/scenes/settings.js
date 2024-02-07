
// ====================================================================================
export class Settings {

    static screen = {
        width: 800,
        height: 600,
        numberWidths: 4,
        numberHeights: 1
    };

    static puntos = {
        score: 0,
        incPuntos: 50
    };

    static hi = 550;
    static vidas = 3;
    
    static fuerzaAleteoPajaro = 200;
    static velScroll = 200;
    static incProgresivoVelScroll = 500;
    static resetTuberias = false;

    static cameraScores = {
        x: 0,
        y: 0,
        ancho: 800,
        alto: 45,
        scrollX: 0,
        scrollY: -50
    };

    static cameraGameover = {
        x: 0,
        y: 270,
        ancho: 800,
        alto: 220,
        scrollX: 0,
        scrollY: 700
    };

    // -----------------------------------------------
    static getScreen() {
        return Settings.screen;
    }

    static getPuntos() {
        return Settings.puntos;
    }

    static getRecord() {
        return Settings.hi;
    }

    static getVidas() {
        return Settings.vidas;
    }

    static getResetTuberias() {
        return Settings.resetTuberias;
    }

    static getFuerzaAleteoPajaro() {
        return Settings.fuerzaAleteoPajaro;
    }

    static getVelScroll() {
        return Settings.velScroll;
    }

    static getIncProgresivoVelScroll() {
        return Settings.incProgresivoVelScroll;
    }

    static getCameraScores() {
        return Settings.cameraScores;
    }

    static getCameraGameover() {
        return Settings.cameraGameover;
    }

    // -----------------------------------------------
    static setPuntos(ptos) {
        Settings.puntos.score = ptos;
    }

    static setRecord(hiScore) {
        Settings.hi = hiScore;
    }

    static setVidas(lifes) {
        Settings.vidas = lifes;
    }

    static setResetTuberias(bool) {
        Settings.resetTuberias = bool;
    }

    static setFuerzaAleteoPajaro(fuerza) {
        Settings.fuerzaAleteoPajaro = fuerza;
    }

    static setVelScroll(velScroll) {
        Settings.velScroll = velScroll;
    }

    static setCameraScores(x, y, ancho, alto, scrollX, scrollY) {
        Settings.cameraScores.x = x;
        Settings.cameraScores.y = y;
        Settings.cameraScores.ancho = ancho;
        Settings.cameraScores.alto = alto;
        Settings.cameraScores.scrollX = scrollX;
        Settings.cameraScores.scrollY = scrollY;
    }

    static setCameraGameover(x, y, ancho, alto, scrollX, scrollY) {
        Settings.cameraGameover.x = x;
        Settings.cameraGameover.y = y;
        Settings.cameraGameover.ancho = ancho;
        Settings.cameraGameover.alto = alto;
        Settings.cameraGameover.scrollX = scrollX;
        Settings.cameraGameover.scrollY = scrollY;
    }
}
