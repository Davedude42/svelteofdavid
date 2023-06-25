import { Vector3, Euler } from 'three';
import { GRAVITY } from './Constants.js';

export class Entity {
	game;
	gravity;

	position;
	velocity;
	euler;

	fallDistance;
	isGrounded;

	constructor(game, position) {

		this.game = game;

		this.position = new Vector3();
		this.position.copy(position);

		this.velocity = new Vector3(0, 0, 0);

		this.euler = new Euler(0, 0, 0, 'YXZ')

		this.fallDistance = 0;
	}
	fall(time) {
		this.velocity.y += GRAVITY * time;
	}
	pushUp() {
		let floored = (new Vector3()).copy(this.position).floor();

		if(this.game.getVectorVoxel(floored) != 0) {
			this.position.y = Math.ceil(this.position.y);
			this.velocity.y = 0;

			this.fallDistance = 0;
			this.isGrounded = true;
		} else {
			this.isGrounded = false;
		}
	}
	addVelocity(time) {
		this.position.add((new Vector3()).copy(this.velocity).multiplyScalar(time));
	}
	step(time) {
		if(this.gravity) {
			this.fall(time);
		}

		this.addVelocity(time);
		this.fallDistance += this.velocity.y * time;

		this.pushUp();
	}
}