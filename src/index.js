import 'phaser';

const GAME_WIDTH = document.body.clientWidth;
const GAME_HEIGHT = window.innerHeight;

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
    scene: {
        preload: preload,
        create: create,
        update: update,
        extend: {
            minimap: null,
            player: null,
            cursors: null,
            thrust: null,
            flares: null,
            bullets: null,
            lastFired: 0,
            text: null,
            createBulletEmitter: createBulletEmitter
        }
    }
};

var game = new Phaser.Game(config);

function preload () {
    this.load.image('logo', '/assets/logo.jpg');
    this.load.spritesheet('ship', '/assets/troll-ship3.png', { frameWidth: 28, frameHeight: 21 });
}

function create () {

    var Bullet = new Phaser.Class({
        Extends: Phaser.GameObjects.Image,
        initialize:

        function Bullet (scene)
        {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');

            this.speed = 0;
            this.born = 0;
        },

        fire: function (player)
        {
            this.setPosition(player.x, player.y);
            this.speed = Phaser.Math.GetSpeed(200, 1);

            this.born = 0;
        },

        update: function (time, delta)
        {
            this.y -= this.speed * delta;
            this.born += delta;

            if (this.born > 2000)
            {
                this.setActive(false);
                this.setVisible(false);
            }
        }

    });

    this.createBulletEmitter();
    //var logo = this.add.image(50, 50, 'logo');

    this.player = this.impact.add.sprite(GAME_WIDTH / 2, GAME_HEIGHT - 50, 'ship').setDepth(1);
    this.player.setMaxVelocity(1000).setFriction(800, 600).setPassive();

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    //  Bullets

    this.bullets = this.add.group({ classType: Bullet, runChildUpdate: true });

    this.text = this.add.text(10, 10, '', { font: '16px Courier', fill: '#00ff00' }).setDepth(1).setScrollFactor(0);


}

function update (time, delta) {

    if (this.cursors.left.isDown) {
        this.player.setAccelerationX(-800);
        this.player.flipX = true;
    } else if (this.cursors.right.isDown) {
        this.player.setAccelerationX(800);
        this.player.flipX = false;
    } else {
        this.player.setAccelerationX(0);
    }

    if (this.keySpace.isDown)
    {
        console.log('spacebar.. FIRE BANANAS!');
    }

    if (this.cursors.space.isDown && time > this.lastFired)
    {
        var bullet = this.bullets.get();
        bullet.setActive(true);
        bullet.setVisible(true);

        if (bullet)
        {
            bullet.fire(this.player);

            this.lastFired = time + 500;
        }
    }

    //  Emitters to bullets
    if (this.bullets) {
        this.bullets.children.each(function(b) {
            if (b.active)
            {
                this.flares.setPosition(b.x, b.y);
                this.flares.setSpeed(b.speed + 500 * -1);
                this.flares.emitParticle(1);
            }
        }, this);
    }

    this.text.setText('Horizontal velocity: ' + Math.floor(this.player.vel.x));

}

function createBulletEmitter ()
{
    this.flares = this.add.particles('flares').createEmitter({
        x: 1600,
        y: 200,
        angle: { min: 85, max: 95 },
        scale: { start: 0.3, end: 0.1 },
        blendMode: 'ADD',
        lifespan: 500,
        on: false
    });
}


function greateModerators () {

}
