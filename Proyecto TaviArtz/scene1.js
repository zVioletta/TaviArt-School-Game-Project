class Scene1 extends Phaser.Scene {
    
    //! Global variables
    character;
    gameObjects;

    arrowKeys; //! Character movement

    background; //! Background
    gifts; //! Score additions

    trampoline;

    key;
    hasKey;
    rectangle;

    follower; //! Enemy follower
    overlapping;
    angle;

    lifes;
    life;

    score;
    scoreText;

    //! Constructor for game initialization
    constructor() {
        super({
            key: "Scene1",
            physics: {
                arcade: {
                    debug: false,
                    gravity: { y: 300 }
                }
            }
        });
    }
    
    preload() {
        //TODO Create or use new ASSETS for the game and import them here.
        //! Background
        this.load.image("Sc1_bgScene1", "resources/Scene1/bgScene1.png"); //* Main background

        //! Character creation
        this.load.atlas("Sc1_character", "resources/Scene1/gato.png", "resources/Scene1/gato.json"); //* Character
        
        //! Objects/Props atlas
        // this.load.atlas("Sc1_gameObjects", "resources/Scene1/gameObjects.png", "resources/Scene1/gameObjects.json"); //* Game objects
        this.load.atlas("Sc1_animPine", "resources/Scene1/pino.png", "resources/Scene1/pine.json"); //* Pine tree
        this.load.atlas("Sc1_trampoline", "resources/Scene1/trampolin.png", "resources/Scene1/trampoline.js"); //* Trampoline

        //! Take on count this line for next atlas sources, you can just copy and paste this
        // this.load.atlas("x source", "resources/Scene/x.png", "resources/Scene/x.json");

        //! Objects/Props images
        this.load.image("Sc1_casa", "resources/Scene1/casa.png"); //* House
        this.load.image("Sc1_casa2", "resources/Scene1/casa2.png"); //* Second House
        this.load.image("Sc1_wall", "resources/Scene1/muro.png"); //* Wall
        this.load.image("Sc1_flag", "resources/Scene1/banderin.png"); //* Flag
        this.load.image("Sc1_boxes", "resources/Scene1/cajas.png"); //* Boxes

        //! Gifts
        this.load.image("Sc1_gift", "resources/Scene1/coin.png"); //* Left side

        //! World limits and climbing wall
        this.load.image("Sc1_floor", "resources/Scene1/piso.png"); //* Floor
        this.load.image("Sc1_side", "resources/Scene1/lado.png"); //* Left side for collision
        this.load.image("Sc1_wallClimb", "resources/Scene1/muroEscalada.png"); //* Wall
        this.load.image("Sc1_stone", "resources/Scene1/piedra.png"); //* Stone
        

        //! Enemy follower
        this.load.image("Sc1_follower", "resources/Scene1/follower.png"); //* Follower
        
        //! Life
        this.load.image("Sc1_life", "resources/Scene1/vida.png"); //* Life
        
        //! Take on count this line for next resources, be it images or sprites for the game, you can just copy and paste this
        // this.load.image("x image", "resources/Scene1/x.png");

        //! Key spritesheet
        this.load.spritesheet("Sc1_key", "resources/Scene1/llave.png", { frameWidth: 187, frameHeight: 128 }); //* Key animation sprite
    }

    //! Create functions on a separate function to keep the code clean and organized.
    createAnimationPine() {
        this.anims.create({
            key: "Sc1_animPine",
            frames: this.anims.generateFrameNames("animPine", {
                prefix: "pine_",
                end: 32,
                frameRate: 60,
                zeroPad: 4
            }),
            repeat: -1
        });
    }
    
    createCharacter() {
        this.character = this.physics.add.sprite(410, 200, "character");
        this.character.setBounce(0.2);
        // this.character.setCollideWorldBounds(true);
        this.character.setSize(50, 50, true);
        this.character.setScale(1, 1);
        this.character.setOffset(0, 0);
    }

    createAnimationCharacter() {
        this.anims.create({
            key: "Sc1_idle",
            frames: this.anims.generateFrameNames("Sc1_character", {
                prefix: "idle_",
                end: 6,
                frameRate: 12,
                zeroPad: 4
            }),
            repeat: -1
        });

        this.anims.create({
            key: "Sc1_walk",
            frames: this.anims.generateFrameNames("Sc1_character", {
                prefix: "walk_",
                end: 6,
                frameRate: 12,
                zeroPad: 4
            }),
            repeat: -1
        });
    }

    createGameObjects() {
        this.gameObjects = this.physics.add.staticGroup();
        // * Create objects, take on count keynames.

        // ! General props
        this.gameObjects.create(220, 520, "gameObjects", "Sc1_casa1"); // * House
        this.gameObjects.create(1030, 484, "gameObjects", "Sc1_casa2"); // * Second House
        this.gameObjects.create(730, 578, "gameObjects", "Sc1_wall"); // * Wall
        this.gameObjects.create(872, 470, "gameObjects", "Sc1_flag"); // * Flag
        this.gameObjects.create(511, 582, "gameObjects", "Sc1_boxes"); // * Boxes
        
        //! World limits
        this.gameObjects.create(1153, 635, "gameObjects", "Sc1_piso"); // * Floor
        this.gameObjects.create(0, 300, "gameObjects", "Sc1_side"); // * Left side limit
        this.gameObjects.create(2340, 300, "gameObjects", "Sc1_side"); // * Right side limit

        //! Climbing wall and stones
        this.gameObjects.create(1800, 392, "Sc1_wallClimb"); // * Climbable Wall

        this.gameObjects.create(1730, 530, "Sc1_stone"); // * Stone
        this.gameObjects.create(1870, 530, "Sc1_stone"); // * Stone
        
        this.gameObjects.create(1730, 430, "Sc1_stone"); // * Stone
        this.gameObjects.create(1870, 430, "Sc1_stone"); // * Stone

        this.gameObjects.create(1730, 330, "Sc1_stone"); // * Stone
        this.gameObjects.create(1870, 330, "Sc1_stone"); // * Stone

        this.gameObjects.create(1730, 230, "Sc1_stone"); // * Stone
        this.gameObjects.create(1870, 230, "Sc1_stone"); // * Stone
        // this.gameObjects.create(x, y, "Sc1_stone"); // ! Additional Stones
    }

    createGifts() {
        this.gifts = this.physics.add.group();
        for (var i = 0; i < 18; i++) {
            var gift = this.gifts.create(i * 67 + 20 + Phaser.Math.Between(0, 12), 150, "Sc1_gift");
        }
    }

    collectGifts(character, gift) {
        gift.disableBody(true, true);
        this.score += 1;
        // console.log(this.score);
        this.scoreText.setText("Score: " + this.score);
    }

    createAnimationTrampoline() {
        this.anims.create({
            key: "Sc1_trampJump",
            frames: [   { key: 'Sc1_trampoline', frame: 'traSalto_0000'},
                        { key: 'Sc1_trampoline', frame: 'traSalto_0001'}, 
                        { key: 'Sc1_trampoline', frame: 'traSalto_0002'},
                        { key: 'Sc1_trampoline', frame: 'traSalto_0001'},
                        { key: 'Sc1_trampoline', frame: 'traSalto_0000'},
            ],
            frameRate: 40,
            repeat: 3
        });
    }

    createKey () {
        // this.add.rectangle(2240, 108, 180, 100, 0x00f000, .5); // * Key hitbox for testing purposes
        this.key = this.add.sprite(2240, 108, "Sc1_key");
    }

    createAnimationKey() {
        this.anims.create({
            key: "Sc1_animKey",
            frames: this.anims.generateFrameNumbers("Sc1_key", { frames: [0, 1, 2, 3, 2, 1, 0] }),
            frameRate: 40,
            repeat: -1
        });
    }
    
    //! Enemy follower creation
    createFollower() {
        this.follower = this.physics.add.sprite(370, 500, "Sc1_follower");
        this.follower.body.setAllowGravity(false);
        this.overlapping = 150;
        this.physics.add.overlap(this.character, this.follower, null, () => {
            this.overlapping -= 1;
            var children = this.lifes.getChildren();
            if (children.length > 0 && this.overlapping % 20 == 0) {
                children[children.length - 1].destroy();
                }
            if (this.overlapping <= 0) {
                // Go to game over scene
                this.scene.start("GameOver");
            }
        });
        this.angle = 0;
        this.time.addEvent({ delay: 2000, callback: this.enabler, callbackScope: this, loop: true });
    }

    //! Enemy follower aggro
    enabler() {
        this.physics.moveTo(this.follower, this.character.x, this.character.y, Phaser.Math.Between(80, 160));
        this.follower.setAngle(this.angle);
        this.angle += 1;
    }

    createLifes() {
        this.lifes = this.add.group();
        for (var i = 0; i < 7; ++i) {
            this.life = this.add.sprite(i * 16 + 100, 100, "Sc1_life").setScrollFactor(0);
            this.lifes.add(this.life);
        }
        this.lifes.fixedToCamera = true;
    }

    createScoreText() {
        this.scoreText = this.add.text(0, 0, "Score: ", { font: "32px Arial", fill: "#ff0000", align: "center" }).setScrollFactor(0);
        this.scoreText.fixedToCamera = true;
    }

    create() {
        this.score = 0;

        this.background = this.add.image(0, 0, "Sc1_bgScene1").setOrigin(0, 0);
        this.hasKey = false;
        this.pine = this.add.sprite(450, 348, "Sc1_fondo");
        this.pine.play("Sc1_animPine", true);
        
        this.createCharacter();
        this.createGameObjects();
        this.createAnimationPine();
        this.createAnimationCharacter();

        this.createGifts();

        this.createKey();
        this.createAnimationKey();

        this.createAnimationTrampoline();

        this.createFollower();

        this.createLifes();

        this.createScoreText();
        
        
        // this.character = this.add.sprite(900, 500, "character");
        // this.character.play("Sc1_idle", true);
        
        // this.character = this.add.sprite(450, 500, "character").setScale(-1, 1);
        // this.character.anims.play("Sc1_walk", true);
        
        this.arrowKeys = this.input.keyboard.createCursorKeys();
        
        this.cameras.main.setBounds(0, 0, 2304, 648);
        this.cameras.main.setFollowOffset(200, 0);
        this.cameras.main.startFollow(this.character);
        
        this.key.anims.play("Sc1_animKey", true);
        
        this.trampoline = this.physics.add.sprite(1280, 286, "Sc1_trampoline");
        this.trampoline.setScale(0.4, 0.4);
        
        this.physics.add.collider(this.character, this.gameObjects);
        this.physics.add.collider(this.gifts, this.gameObjects);
        this.physics.add.overlap(this.character, this.gifts, this.collectGifts, null, this);
        this.physics.add.collider(this.character, this.trampoline);
        this.physics.add.collider(this.trampoline, this.gameObjects);
    }

    update() {	
        //! Key collection and destruction
        if (this.character.body.x >= 2100 && this.character.body.x <= 2100 + 180 && this.character.body.y >= 108 && this.character.body.y <= 108 + 100 && this.hasKey == false) {
            this.key.destroy();
            this.hasKey = true;
        }

        //! Character movement
        if (this.arrowKeys.right.isDown) {
            this.character.setScale(1, 1);
            this.character.setOffset(0, 0);
            this.character.setVelocityX(160);
            this.character.anims.play("Sc1_walk", true);
        } else if (this.arrowKeys.left.isDown) {
            this.character.setScale(-1, 1);
            this.character.setOffset(50, 0);
            this.character.setVelocityX(-160);
            this.character.anims.play("Sc1_walk", true);
        } else {
            this.character.setScale(1, 1);
            this.character.setOffset(0, 0);
            this.character.setVelocityX(0);
            this.character.anims.play("Sc1_idle", true);
        }

        //! Trampoline jump
        if (this.character.body.x >= this.trampoline.body.x && this.character.body.x <= this.trampoline.body.x + 150 && this.trampoline.body.y >= this.character.body.y && this.trampoline.body.y <= this.character.body.y + 80 && this.arrowKeys.up.isDown) {
            this.trampoline.anims.play("Sc1_trampJump");
            this.character.setVelocityY(-430);
        } else if (this.arrowKeys.up.isDown && this.character.body.onFloor()) {
            //! Jump while on the floor
            this.character.setVelocityY(-280);
            this.character.anims.play("Sc1_walk", true);
        }
    }
}