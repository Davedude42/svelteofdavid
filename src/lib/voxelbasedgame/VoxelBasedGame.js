import * as THREE from 'three';

import { toChunkId } from './Constants.js';
import { Chunk } from './Chunk.js';
import { Player } from './Player.js';

export class VoxelBasedGame {

	chunks;
	renderChunk;

	player;

	constructor() {
		this.chunks = {};
		this.renderChunk = (cx, xz) => {}

		this.player = new Player(this, new THREE.Vector3(0, 95, 0));
	}
	getChunk(cx, cz) {
		return this.chunks[toChunkId(cx, cz)];
	}
	createChunk(cx, cz) {
		let chunk = new Chunk(cx, cz);
		this.chunks[toChunkId(cx, cz)] = chunk;
		return chunk;
	}
	onRenderChunk(func) {
		this.renderChunk = func;
	}

	getVoxel(x, y, z) {
		let cx = Math.floor(x / 16);
		let cz = Math.floor(z / 16);

		let chunk = this.getChunk(cx, cz);

		if(chunk === undefined) {
			return undefined;
		} else {
			return chunk.getVoxel(x - cx*16, y, z - cz*16);
		}
	}
	getVectorVoxel(pos) {
		let cx = Math.floor(pos.x / 16);
		let cz = Math.floor(pos.z / 16);

		let chunk = this.getChunk(cx, cz);

		if(chunk === undefined) {
			return undefined;
		} else {
			return chunk.getVoxel(pos.x - cx*16, pos.y, pos.z - cz*16);
		}
	}

	generateWorld() {
		for (let cx = -2; cx < 2; cx++) {
			for (let cz = -2; cz < 2; cz++) {
				
				let chunk = this.createChunk(cx, cz);
				chunk.generate();
				this.renderChunk(cx, cz);
			}
		}
	}

	step(time, keyMap) {
		this.player.step(time, keyMap);
	}
}