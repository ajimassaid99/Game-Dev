import Phaser from 'phaser'

import Overworld from './Overworld.js'
import Attacking from './Attacking.js'
import Battle from './Battle.js'

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 1280,
	height: 720,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
		},
	},
	scene: [Overworld, Battle, Attacking],
}

export default new Phaser.Game(config)
