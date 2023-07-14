import * as THREE from 'three';

import { toChunkId } from './Constants.js';
import { Chunk } from './Chunk.js';
import { Player } from './Player.js';

export class VoxelBasedGame {

	chunks;
	renderChunk;

	player;

	renderDistance = 4;

	constructor() {
		this.chunks = {};
		this.renderChunk = (cx, xz) => {}

		this.player = new Player(this, new THREE.Vector3(0.5, 95, 0.5));

		this.player.onChangeChunk(this.generateAroundPlayer);
	}

	getChunk(cx, cz) {
		return this.chunks[toChunkId(cx, cz)];
	}

	// Creates a blank chunk
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

	renderAllChunks() {
		for (const id in this.chunks) {
			this.renderChunk(this.chunks[id].cx, this.chunks[id].cz).then(() => console.log(id));
		}
	}

	async generateAroundPlayer() {
		console.log(this);

		let playercx = Math.floor(this.player.position.x / 16);
		let playercz = Math.floor(this.player.position.z / 16);

		let chunksLeftToGenerate = [];

		for (const id in this.chunks) {
			if(Math.abs(this.chunks[id].cx - playercx) > this.renderDistance || Math.abs(this.chunks[id].cz - playercz) > this.renderDistance) {
				delete this.chunks[id];
			}
		}

		// generate all the chunk asynchronously
		for (let cx = playercx - this.renderDistance; cx <= playercx + this.renderDistance; cx++) {
			for (let cz = playercz - this.renderDistance; cz <= playercz + this.renderDistance; cz++) {

				// chunk not already existing
				if(this.getChunk(cx, cz) === undefined) {
					let chunk = this.createChunk(cx, cz);

					chunksLeftToGenerate.push(chunk.id);

					chunk.generate().then(() => {
						let index = chunksLeftToGenerate.indexOf(chunk.id);
						chunksLeftToGenerate.splice(index, 1);
						
						// all of the chunks have generated
						if(chunksLeftToGenerate.length === 0) {
							this.renderAllChunks();
						}
					});
				}
			}
		}
	}

	generateWorld() {
		let chunksLeftToGenerate = [];

		// generate all the chunk asyncrnously
		for (let cx = -this.renderDistance; cx < this.renderDistance; cx++) {
			for (let cz = -this.renderDistance; cz < this.renderDistance; cz++) {
				
				let chunk = this.createChunk(cx, cz);
				
				chunksLeftToGenerate.push(chunk.id);

				chunk.generate().then(() => {
					let index = chunksLeftToGenerate.indexOf(chunk.id);

					chunksLeftToGenerate.splice(index, 1);

					// all of the chunks have generated
					if(chunksLeftToGenerate.length === 0) {
						for (let cx = -this.renderDistance; cx < this.renderDistance; cx++) {
							for (let cz = -this.renderDistance; cz < this.renderDistance; cz++) {
								this.renderChunk(cx, cz);
							}
						}
					}
				});
			}
		}
	}

	step(time, keyMap) {
		this.player.step(time, keyMap);
	}
}