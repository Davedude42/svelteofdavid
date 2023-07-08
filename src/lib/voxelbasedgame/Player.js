import { Vector3 } from 'three';
import { PLAYER_SPEED, JUMP_SPEED, PLAYER_ACCELERATION, PLAYER_FRICTION } from './Constants.js';
import { Entity } from './Entity.js';

export class Player extends Entity {
	constructor(game, position) {
		super(game, position);

		this.gravity = true;
	}
	flatMovement(time, keyMap) {
		let flatAcceleration = new Vector3(0, 0, 0);

		if(keyMap.KeyW > 0) {
			flatAcceleration.add(new Vector3(Math.sin(-this.euler.y), 0, -Math.cos(-this.euler.y)));
		}
		if(keyMap.KeyS > 0) {
			flatAcceleration.add(new Vector3(-Math.sin(-this.euler.y), 0, Math.cos(-this.euler.y)));
		}
		if(keyMap.KeyA > 0) {
			flatAcceleration.add(new Vector3(-Math.cos(-this.euler.y), 0, -Math.sin(-this.euler.y)));
		}
		if(keyMap.KeyD > 0) {
			flatAcceleration.add(new Vector3(Math.cos(-this.euler.y), 0, Math.sin(-this.euler.y)));
		}

		// cap at player acceleration
		flatAcceleration.normalize().multiplyScalar(PLAYER_ACCELERATION * time);

		let vy = this.velocity.y;

		this.velocity.y = 0;

		let scalar = this.velocity.length();
		this.velocity.normalize().multiplyScalar(Math.max(0, scalar - PLAYER_FRICTION * time)); // friction
		this.velocity.add(flatAcceleration);

		this.velocity.clampLength(-PLAYER_SPEED, PLAYER_SPEED);

		this.velocity.y = vy;
	}
	step(time, keyMap) {
		this.fall(time);
		
		if(keyMap.Space === 1) {
			this.velocity.y = JUMP_SPEED;
		}

		this.flatMovement(time, keyMap);
		
		this.addVelocity(time);
		this.fallDistance += this.velocity.y * time;

		this.pushUp();
	}
}