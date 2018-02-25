const GAME_WIDTH = document.body.clientWidth;
const GAME_HEIGHT = window.innerHeight;

class TitleScene extends Phaser.Scene {
    constructor(test) {
      super({
        key: 'TitleScene'
      });
    }
    preload() {

    }
    create() {
        var text1 = this.add.text(100, 200, 'WonderTroll', { font: '50px Arial', fill: '#ffffff' });

        var text2 = this.add.text(100, 400, 'Du er en troll, og skal spamme så meget som muligt, det vil sige overleve så længe du kan,/n inden en mod banner dig. Let? Tro om igen!', { font: '18px Arial', fill: '#ffffff' });

        var text3 = this.add.text(100, GAME_HEIGHT - 100, 'Tryk x for at starte spillet ', { font: '18px Arial', fill: '#ffffff' });

        this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    }
    update(time, delta) {
        if(this.startKey.isDown){
            this.scene.start('GameScene');
        }
    }
}

export default TitleScene;