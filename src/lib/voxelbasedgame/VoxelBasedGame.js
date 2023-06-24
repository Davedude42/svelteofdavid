import * as THREE from 'three';

import { Chunk } from './Chunk.js';
import { Player } from './Player.js';

export class VoxelBasedGame {

	chunks;
	renderChunk;

	player;

	constructor() {
		this.chunks = {};
		this.renderChunk = (cx, xz) => {}

		this.player = new Player();
	}
	getChunk(cx, cz) {
		return this.chunks[cx + 'x' + cz];
	}
	createChunk(cx, cz) {
		let chunk = new Chunk(cx, cz);
		this.chunks[cx + 'x' + cz] = chunk;
		return chunk;
	}
	onRenderChunk(func) {
		this.renderChunk = func;
	}

	generateWorld() {
		for (let cx = -3; cx < 3; cx++) {
			for (let cz = -3; cz < 3; cz++) {
				
				let chunk = this.createChunk(cx, cz);
				chunk.generate();
				this.renderChunk(cx, cz);
			}
		}
	}

	step() {

	}
}