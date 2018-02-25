import 'phaser';

import TitleScene from './TitleScene';
import GameScene from './GameScene';


const GAME_WIDTH = document.body.clientWidth;
const GAME_HEIGHT = window.innerHeight;

console.log('hehe');

var config = {
    type: Phaser.AUTO,
    parent: 'wondertroll',
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    physics: {
        default: 'impact',
        impact: {
            gravity: 100,
            maxVelocity: 1000,
            setBounds: {
                x: 0,
                y: 0,
                width: GAME_WIDTH,
                height: GAME_HEIGHT,
                thickness: 32
            }
        }
    },
    scene: [
        //TitleScene,
        GameScene
        // GameOverScene
    ]
};

var game = new Phaser.Game(config);