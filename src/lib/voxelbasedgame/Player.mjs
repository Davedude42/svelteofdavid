import { Entity } from './Entity';

export class Player extends Entity {
	x;
	y;
	constructor(x, y) {
		super(x, y);
	}
}