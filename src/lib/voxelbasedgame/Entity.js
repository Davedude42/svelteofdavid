import { Vector3, Euler } from 'three';
import { GRAVITY, PLAYER_HEIGHT, PLAYER_RADIUS } from './Constants.js';

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
		let voxelPosition = (new Vector3()).copy(this.position).floor();

		voxelPosition.y += 1;

		if(this.game.getVectorVoxel(voxelPosition) != 0) {
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
	intersectingVoxels() {
		let res = [];

		let floorPosition = this.floorPosition();
		for (let x = floorPosition.x - 1; x <= floorPosition.x + 1; x++) {
			for (let z = floorPosition.z - 1; z <= floorPosition.z + 1; z++) {
				for (let y = floorPosition.y - 1; y <= floorPosition.y + Math.ceil(PLAYER_HEIGHT); y++) {
					
				}
			}
		}
	}
	flatSlideFromVelocity(velocity) {
		let flatVelocity = new Vector3();
		flatVelocity.copy(velocity);
		flatVelocity.y = 0;

		let neighbors = [[0,-1],[1,-1],[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,0]];

		// fall first so you know if you hit the ground

		this.position.y += velocity.y;

		let feetPos = this.position.clone();
		let headPos = this.position.clone().setY(this.position.y + PLAYER_HEIGHT);

		if(this.game.getVectorVoxel(feetPos.clone().floor()) != 0) { // if feet collided
			this.position.y = Math.ceil(this.position.y);

			this.isGrounded = true;
			this.velocity.y = 0;
		} else if(feetPos.y === Math.floor(feetPos.y) && this.game.getVectorVoxel(feetPos.clone().setY(feetPos.y-1).floor()) != 0) { // if on the ground
			this.isGrounded = true;
			this.velocity.y = 0;
		} else { // still falling
			this.isGrounded = false;
			this.fallDistance += velocity.y;

			// if head collided, after checking feet
			if(this.game.getVectorVoxel(headPos.floor()) != 0) { 
				this.position.y -= headPos.y - Math.floor(headPos.y); // subtract height that the head is collided
			}
		}

		// flat movement and sliding

		this.position.add(flatVelocity);

		let floorPosition = this.position.clone().floor();

		neighbors.forEach(neighbor => {
			let voxelPos = new Vector3(floorPosition.x + neighbor[0], floorPosition.y, floorPosition.z + neighbor[1]);

			if(this.game.getVectorVoxel(voxelPos) != 0) {
				// temporary variables to set edges for testing
				let testX = this.position.x;
				let testZ = this.position.z;
			
				// which edge is closest?
				if (testX < voxelPos.x)           testX = voxelPos.x;     // test left edge
				else if (testX > voxelPos.x + 1)  testX = voxelPos.x + 1; // right edge
				if (testZ < voxelPos.z)           testZ = voxelPos.z;     // top edge
				else if (testZ > voxelPos.z + 1)  testZ = voxelPos.z + 1; // bottom edge
			
				// A vector from the test point to the player position
				let distanceVector = new Vector3(this.position.x - testX, 0, this.position.z - testZ);

				if(distanceVector.length() < PLAYER_RADIUS) {
					// takes the distance vector and makes it the right length so the player circle can get pushed away from the test point
					let fixVector = distanceVector.clone().normalize().multiplyScalar(PLAYER_RADIUS - distanceVector.length());

					this.position.add(fixVector);
				}
			}
		});
	}
	addVelocityAndSlide(time) {

		// subtracts the amount of velocity to move by PLAYER_RADIUS each time
		let velocityLeft = this.velocity.length() * time;

		while(velocityLeft > 0) {
			if(velocityLeft > PLAYER_RADIUS) {
				this.flatSlideFromVelocity(this.velocity.clone().normalize().multiplyScalar(PLAYER_RADIUS)); // PLAYER_RADIUS
				velocityLeft -= PLAYER_RADIUS;
			} else {
				this.flatSlideFromVelocity(this.velocity.clone().normalize().multiplyScalar(velocityLeft)); // whatever is left
				velocityLeft = 0;
			}
		}
	}
}