import MOD_IMAGES from './Mods';

const GAME_WIDTH = document.body.clientWidth;
const GAME_HEIGHT = window.innerHeight;


var Bullet = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,
    initialize: function Bullet (scene) {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');

        this.speed = 0;
        this.born = 0;
    },

    fire: function (player) {
        this.setPosition(player.x, player.y);
        this.speed = Phaser.Math.GetSpeed(200, 1);

        this.born = 0;
    },

    update: function (time, delta) {
        this.y -= this.speed * delta;
        this.born += delta;

        if (this.born > 6000)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }
});

class GameScene extends Phaser.Scene {
    constructor(test) {
      super({
        key: 'GameScene'
      });

      this.lastFired = 0;
    }
    preload() {
        this.load.image('logo', '/assets/logo.jpg');
        this.load.image('mod-1', MOD_IMAGES[0]);
    
        //this.load.spritesheet('ship', '/assets/troll-ship3.png', { frameWidth: 28, frameHeight: 21 });
    }
    create() {

        // Add Controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    
        this.createBulletEmitter();
        //var logo = this.add.image(50, 50, 'logo');
    
        this.player = this.impact.add.sprite(GAME_WIDTH / 2, GAME_HEIGHT - 50, 'ship').setDepth(1);
        this.player.setMaxVelocity(1000).setFriction(800, 600).setPassive();

    
        //  Bullets
        this.bullets = this.add.group({ classType: Bullet, runChildUpdate: true });
    
        
        this.text = this.add.text(10, 10, '', { font: '16px Courier', fill: '#00ff00' }).setDepth(1).setScrollFactor(0);

        this.impact.world.on('COLLIDE_EVENT', collide);


        function collide (event) {
            //  The event has the following properties:

            //  event.bodyA
            //  event.bodyB
            //  event.gameObjectA (the GO linked to bodyA, if any)
            //  event.gameObjectB (the GO linked to bodyB, if any)
            //  event.axis (either 'x' or 'y')

            console.log('collide!');
        }


        //  Create a floor using setBounds
        //  x, y, width, height, left, right, top, bottom (true = our floor)
        //this.impact.world.setBounds(0, 0, GAME_WIDTH, GAME_HEIGHT, false, false, false, true);
        //this.impact.world.setAvsB([ this.player, this.bullets ]);


    
    }
    update(time, delta) {
       
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
            console.log('Fire is down!');
        }

        if (this.cursors.space.isDown && time > this.lastFired)
        {
            console.log('Send a rocket!');
            var bullet = this.bullets.get();
            bullet.setActive(true);
            bullet.setVisible(true);

            if (bullet) {
                bullet.fire(this.player);

                this.lastFired = time + 400;
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

        if(Math.random() > 0.97) {
            this.greateModerator()
        }
    }

    createBulletEmitter ()
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

    greateModerator () {
        //  Create some random aliens moving slowly around
    
        var x = Phaser.Math.Between(100, 3100);
        var y = -50;
    
        var face = this.impact.add.sprite(x, y, 'mod-1');
    
        face.setBodyScale(1);
        //face.setVelocity(Phaser.Math.Between(20, 60), Phaser.Math.Between(20, 60));
       
        if (this.born > 6000)
        {
            this.setActive(false);
            this.setVisible(false);
        }
        
        //face.vel.x *= -0.1;
    
    }
}


export default GameScene;