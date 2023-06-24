import { Entity } from './Entity.js';

export class Player extends Entity {
	x;
	y;
	constructor(x, y) {
		super(x, y);
	}
}