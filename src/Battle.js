import Phaser from 'phaser';

export default class Battle extends Phaser.Scene {
    constructor() {
        super('battle');
    }

    init() {
        this.textbox = undefined;
        this.attack1 = undefined;
        this.fightButton = undefined;
        this.actButton = undefined;
        this.mercyButton = undefined;
        this.itemButton = undefined;
        this.enemyhealth1 = 42;
        this.isMoving = false; // Initialize isMoving
        this.attackPositions = [960, 330]; // Define the positions for movement
        this.currentTargetIndex = 0; // Index to track the current target position
    }

    preload() {
        this.load.image('battlescreen', 'image/battlescreen.jpg');
        this.load.image('mercybutton1', 'image/MercyButton1.png');
        this.load.image('mercybutton2', 'image/MercyButton2.png');
        this.load.image('fightbutton1', 'image/FightButton1.png');
        this.load.image('fightbutton2', 'image/FightButton2.png');
        this.load.image('itembutton1', 'image/ItemButton1.png');
        this.load.image('itembutton2', 'image/ItemButton2.png');
        this.load.image('actbutton1', 'image/ActButton1.png');
        this.load.image('actbutton2', 'image/ActButton2.png');
        this.load.image('map', 'image/Map.png');
        this.load.image('textbox', 'image/DialogBox.jpg');
        this.load.image('attackbar', 'image/AttackBar.png');
        this.load.image('attack', 'image/AttackBarBar.png');
        this.load.image('enemy1', 'image/Enemy1.png');
    }

    create() {
        this.add.image(640, 360, 'map');
        this.add.image(660, 360, 'battlescreen').setScale(1.5);
        this.add.image(950, 595, 'mercybutton1').setScale(1.2);
        this.add.image(750, 595, 'itembutton1').setScale(1.2);
        this.add.image(545, 595, 'actbutton1').setScale(1.2);
        this.fightButton = this.add.image(345, 595, 'fightbutton1').setScale(1.2);
        this.textbox = this.add.image(660, 460, 'textbox').setScale(0.7);
        this.attack1 = this.add.image(660, 460, 'attackbar').setScale(1.2);
        this.add.image(660, 320, 'enemy1');
        this.attack = this.add.sprite(320, 460, 'attack').setScale(1.2);
        this.attack.setInteractive();
        this.actButton = this.add.image(545, 595, 'actbutton1').setScale(1.2);
        this.mercyButton = this.add.image(950, 595, 'mercybutton1').setScale(1.2);
        this.itemButton = this.add.image(750, 595, 'itembutton1').setScale(1.2);
        
        // Set interactive and handle pointer events for buttons
        this.fightButton.setInteractive();
        this.actButton.setInteractive();
        this.mercyButton.setInteractive();
        this.itemButton.setInteractive();

        this.fightButton.on('pointerdown', () => {
            this.actButton.setTexture('actbutton1');
            this.mercyButton.setTexture('mercybutton1');
            this.itemButton.setTexture('itembutton1');
            this.isMoving = !this.isMoving;
            this.moveAttack();
            this.attack1.visible = true;
            this.textbox.visible = true;
            this.attack.visible = true;

            if (this.fightButton.texture.key === 'fightbutton1') {
                this.fightButton.setTexture('fightbutton2');
            } else {
                this.fightButton.setTexture('fightbutton1');
            }
        });

        this.actButton.on('pointerdown', () => {
            this.fightButton.setTexture('fightbutton1');
            this.mercyButton.setTexture('mercybutton1');
            this.itemButton.setTexture('itembutton1');

            if (this.actButton.texture.key === 'actbutton1') {
                this.actButton.setTexture('actbutton2');
            } else {
                this.actButton.setTexture('actbutton1');
            }
        });

        this.mercyButton.on('pointerdown', () => {
            this.fightButton.setTexture('fightbutton1');
            this.actButton.setTexture('actbutton1');
            this.itemButton.setTexture('itembutton1');

            if (this.mercyButton.texture.key === 'mercybutton1') {
                this.mercyButton.setTexture('mercybutton2');
            } else {
                this.mercyButton.setTexture('mercybutton1');
            }
        });

        this.itemButton.on('pointerdown', () => {
            this.fightButton.setTexture('fightbutton1');
            this.mercyButton.setTexture('mercybutton1');
            this.actButton.setTexture('actbutton1');

            if (this.itemButton.texture.key === 'itembutton1') {
                this.itemButton.setTexture('itembutton2');
            } else {
                this.itemButton.setTexture('itembutton1');
            }
        });

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    moveAttack() {
        if (!this.isMoving) return;

        // Define the target position
        const targetPosition = this.attackPositions[this.currentTargetIndex];

        // Add tween for animation
        this.tweens.add({
            targets: this.attack,
            x: targetPosition,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                // Update the target index to alternate positions
                this.currentTargetIndex = (this.currentTargetIndex + 1) % this.attackPositions.length;
                // Call moveAttack again if isMoving is still true
                if (this.isMoving) {
                    this.moveAttack();
                }
            }
        });
    }

    HitDetection() {
        const distanceFromCenter = Math.abs(this.attack.x - 640); // Assuming 640 is the center x-coordinate

        const maxDistance = 320;
        const maxDamage = 25;
        let damage = maxDamage - Math.round((distanceFromCenter / maxDistance) * maxDamage);
        this.enemyhealth1 -= damage;
        console.log(`Damage dealt: ${damage}`);
        console.log(`Enemy health now: ${this.enemyhealth1}`);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            console.log("Spacebar pressed");
            if (this.isMoving) {
                this.textbox.visible = false;
                this.attack1.visible = false;
                this.attack.visible = false;
                this.isMoving = false;
                this.fightButton.setTexture('fightbutton1');
                this.HitDetection();
                // Replace 'attacking' with your actual attacking scene key
                this.scene.start('attacking'); 
            }
        }

         // Call moveAttack() to animate attack bar if isMoving is true
    }
}
