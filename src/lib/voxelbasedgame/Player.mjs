import { Entity } from './Entity.mjs';

export class Player extends Entity {
	x;
	y;
	constructor(x, y) {
		super(x, y);
	}
}