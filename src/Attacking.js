import Phaser from 'phaser'

export default class Attacking extends Phaser.Scene {
	constructor() {
		super('attacking')
	}

    init() {
        this.soul = undefined;
        this.cursor = undefined;
        this.enemyattack = undefined;
        this.attackbox = [];
        this.hp = 20;
        this.cooldown = 60;
    }

    preload() {
        this.load.image("attack1", "image/enemyattack1.png");
        this.load.image("attack2", "image/enemyattack2.png");
        this.load.image("attack3", "image/enemyattack3.png");
        this.load.image("attack4", "image/enemyattack4.png");
        this.load.image("battlescreen", "image/battlescreen.jpg");
        this.load.image("mercybutton1", "image/MercyButton1.png");
        this.load.image("mercybutton2", "image/MercyButton2.png");
        this.load.image("fightbutton1", "image/FightButton1.png");
        this.load.image("fightbutton2", "image/FightButton2.png");
        this.load.image("itembutton1", "image/ItemButton1.png");
        this.load.image("itembutton2", "image/ItemButton2.png");
        this.load.image("actbutton1", "image/ActButton1.png");
        this.load.image("actbutton2", "image/ActButton2.png");
        this.load.image("map", "image/Map.png");
        this.load.image("attackbox", "image/AttackBox.png");
        this.load.image("attackbar", "image/AttackBar.png");
        this.load.image("attack", "image/AttackBarBar.png");
        this.load.image("enemy1", "image/Enemy1.png");
        this.load.image("soul", "image/Soul.png");
    }

    create() {
        this.add.image(640, 360, 'map');
        this.add.image(660, 360, 'battlescreen').setScale(1.5);
        const monster = this.add.image(660, 320, 'enemy1');
        this.soul = this.createPlayer();
        this.enemyattack = this.createAttack();
        this.cursor = this.input.keyboard.createCursorKeys();
        this.attackbox = this.physics.add.staticGroup();
    
        // Adjust the size of the attackbox to match the white box size
        const attackBox = this.attackbox.create(660, 460, "attackbox").setScale(0.7);
        this.physics.world.enable(attackBox);
        attackBox.body.setSize(attackBox.displayWidth, attackBox.displayHeight);
    
        // Define the movement boundaries for the soul
        const bounds = {
            x: 575,    // Left boundary
            y: 375,    // Top boundary
            width: 170, // Width of the movement area
            height: 165 // Height of the movement area
        };
    
        this.physics.world.setBounds(bounds.x, bounds.y, bounds.width, bounds.height);
        this.soul.setCollideWorldBounds(true);
    
        // Create a border around the movement area
        const graphics = this.add.graphics();
        graphics.lineStyle(4, 0xffffff); // Border color and thickness
        graphics.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);
    
        // Setup collision callback
        this.physics.add.overlap(
            this.soul,
            this.enemyattack,
            this.collide,
            null,
            this // Pass 'this' as the context to the collide function
        );
    }

    createPlayer() {
        const soul = this.physics.add.sprite(660, 460, 'soul').setScale(0.075);
        soul.setCollideWorldBounds(true);
        return soul;
    }

    createAttack() {
        // Determine spawn side (left or right)
        const spawnSide = Math.random() < 0.5 ? 'left' : 'right';
        
        // Get game width and height from the configuration
        const gameWidth = this.sys.game.config.width;
        const gameHeight = this.sys.game.config.height;
        
        // Initial spawn position and movement parameters
        let spawnX, targetX;
        if (spawnSide === 'left') {
            spawnX = 0;
            targetX = 720; // Opposite side (right)
        } else {
            spawnX = 1280; // Opposite side (right)
            targetX = 0; // Opposite side (left)
        }
        
        // Random spawn Y position within a certain range
        const spawnY = Phaser.Math.Between(50, 720 - 50);
        
        // Create the attack sprite
        const attack = this.physics.add.sprite(spawnX, spawnY, 'attack1');
        this.enemyattack = attack;
        return attack;
        
        // Set velocity to move towards the target side
        const velocityX = spawnSide === 'left' ? 200 : -200; // Adjust speed as needed
        attack.setVelocity(velocityX, 0);
        
        // Store the attack sprite for later reference if needed
    }
    

    update() {
        if (this.cursor.left.isDown) {
            this.soul.setVelocity(-100, 0);
        } else if (this.cursor.right.isDown) {
            this.soul.setVelocity(100, 0);
        } else if (this.cursor.up.isDown) {
            this.soul.setVelocity(0, -100);
        } else if (this.cursor.down.isDown) {
            this.soul.setVelocity(0, 100);
        } else {
            this.soul.setVelocity(0, 0);
        }

        this.cooldown--;

        if (this.enemyattack) {
            if ((this.enemyattack.x <= 0 && this.enemyattack.body.velocity.x < 0) ||
                (this.enemyattack.x >= 1280 && this.enemyattack.body.velocity.x > 0)) {
                // Remove the attack sprite when it goes out of bounds
                this.enemyattack.destroy();
                this.createAttack(); // Spawn a new attack sprite
            }
        }

        }
        collide(soul, enemyattack) {
            if (this.cooldown < 0) {
                this.hp = this.hp - 1;
                console.log(this.hp);
                this.cooldown = 60;
                enemyattack.destroy(); // Destroy the enemy attack sprite
                this.createAttack(); // Spawn a new attack sprite
            }
        
        }
    





}