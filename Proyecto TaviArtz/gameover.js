class GameOver extends Phaser.Scene {
    
    // * HAVING MAJOR ERRORS WITH THIS CLASS

    constructor() {
        super({
            key: 'GameOver',
            type: Phaser.AUTO,
            physics: {
                default: 'matter',
                matter: {
                    debug: false,
                    gravity: {
                        x: 0,
                        y: 0
                    }
                }
            }
        });
        // console.log('In Constructor: GameOver');
    }
    
    // vec = new Phaser.Physics.Matter.Matter.Vector;

    preload() {
        this.load.image("Go_Background", "resources/GameOver/GameOver.jpg");
        this.load.image('car', 'resources/GameOver/car-yellow.png');
    }

    create() {
        this.add.tileSprite(576, 324, 1152, 648, "Go_Background");

        this.car = this.matter.add.image(576, 324, 'car');
        this.car.setAngle(-90);
        this.car.setScale(0.2);
        this.car.setMass(10);

        this.matter.world.setBounds(0, 0, 1152, 648);

        this.tracker1 = this.matter.add.rectangle(0, 0, 4, 4, 0x00ff00);
        this.tracker2 = this.matter.add.rectangle(0, 0, 4, 4, 0xff0000);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        const point1 = this.car.getTopRight();
        const point2 = this.car.getBottomRight();

        this.tracker1.setPosition(point1.x, point1.y);
        this.tracker2.setPosition(point2.x, point2.y);

        const speed = 0.03;
        const angle = this.vec.angle(point1, point2);

        const force = {x: Math.cos(angle) * speed, y: Math.sin(angle) * speed};

        if (this.cursors.up.isDown) {
            this.car.thrust(0.5);
            this.steer(this.vec.neg(force));
        } else if (this.cursors.down.isDown) {
            this.car.thrustBack(0.5);
            this.steer(force);
        }
    }

    steer(force) {
        if (this.cursors.left.isDown) {
            Phaser.Physics.Matter.Matter.Body.applyForce(this.car.body, this.car.getTopRight(), force);
        } else if (this.cursors.right.isDown) {
            Phaser.Physics.Matter.Matter.Body.applyForce(this.car.body, this.car.getBottomRight(), this.vec.neg(force));
        }
    }
}