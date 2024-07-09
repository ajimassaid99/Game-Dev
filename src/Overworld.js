import Phaser from 'phaser'

export default class Overworld extends Phaser.Scene {
	constructor() {
		super('over-world')
	}

	init(){
    
		this.speed = 100;
		this.tiles = [];
		this.cursor = undefined
		this.battleBtn = undefined
		}
	
		preload() {
		this.load.spritesheet('Frisk', 'image/Frisk4.5.png', {
			frameWidth: 152,
			frameHeight: 221
		  });
	
		this.load.image("Map","image/Map.png")
		this.load.image("Tile1","image/Tile1.png")
		this.load.image("Tile2","image/Tile2.png")
			
		}
	
		create() {
			this.add.image(640, 360,'Map')
		this.battleBtn = this.add.image(200, 400, 'Tile2').setInteractive().setScale(0.5);
	
			
	
			this.tiles=this.physics.add.staticGroup()
	
			this.tiles.create(600, 400, "Tile1");
	
			this.player = this.createPlayer();
			
			this.physics.add.collider(this.player, this.tiles);
			
			this.cursor = this.input.keyboard.createCursorKeys();
	
			this.anims.create({
			  key: "down",
			  frames: [{ key: "Frisk", frame: 1 }],
			  frameRate: 20,
			});
	
			this.anims.create({
			  key: "left",
			  frames: [{ key: "Frisk", frame: 4 }],
			  frameRate: 20,
			});
	
			this.anims.create({
			  key: "right",
			  frames: [{ key: "Frisk", frame: 2 }],
			  frameRate: 20,
			});
	
			this.anims.create({
			  key: "up",
			  frames: [{ key: "Frisk", frame: 3 }],
			  frameRate: 20,
			});
	
			this.battleBtn.once("pointerup", () => {
			  this.scene.start("battle"); // This is the code to switch scenes. Filled with the key written in the super code in the constructor method
		  },this);
	
		}
	  
	
		createPlayer(){
			const player = this.physics.add.sprite(200, 450,'Frisk')
			return player
		}
	
		update(){
			if (this.cursor.left.isDown) {
				this.player.setVelocity(-100, 0);
				this.player.anims.play("left", true);
			  } else if (this.cursor.right.isDown) {
				this.player.setVelocity(100, 0);
				this.player.anims.play("right", true);
			  } else if (this.cursor.up.isDown) {
				this.player.setVelocity(0, -100);
				this.player.anims.play("up", true)
			  } else if (this.cursor.down.isDown) {
				this.player.setVelocity(0, 100);
				this.player.anims.play("down", true)
			  } else {
				this.player.setVelocity(0,0)
			  }
		}
}
