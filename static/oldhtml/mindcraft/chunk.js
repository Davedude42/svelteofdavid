import { materials } from './materials.js';
import { generateVoxel } from './generator.js';
import * as noise from './perlin.js';
import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';

export class Chunk {
	constructor (cx, cz) {
		this.cx = cx;
		this.cz = cz;

		this.id = cx + 'x' + cz;

		this.voxels = [];

		this.geometry;
		this.mesh;
	}
	getQuickVoxel(x, y, z) {
		return this.voxels[y][x*16 + z];
	}
	getLocalVoxel(x, y, z) {
		return /*this.voxels[y] == 0 ? 0 : */this.voxels[y][x*16 + z];
	}
	setLocalVoxel(id, x, y, z) {
		this.voxels[y][x*16 + z] = id;
	}
	getSlowVoxel(x, y, z) {
		if(y < 0 || y >= 256 || x < 0 || x >= 16 || z < 0 || z >= 16)
			return -1;
		else
			return this.voxels[y][x*16 + z];
	}
	generate(seed) {
		noise.seed(seed);
		this.voxels = [];
		let grasses = [];
		for(var y = 0; y < 256; y++) {
			let arr = new Uint16Array(16*16);
			let allZero = true;
			for (let x = 0; x < 16; x++) {
				const absX = this.cx * 16 + x;
				for (let z = 0; z < 16; z++) {
					const absZ = this.cz * 16 + z;
					arr[x*16 + z] = generateVoxel(noise, seed, absX, y, absZ);
					if(arr[x*16 + z] != 0) {
						allZero = false;
					}
				}
				/*if(allZero)
					this.voxels[y] = 0;
				else*/
					this.voxels[y] = arr;
			}
		}
	}
	createMesh(globalGetVoxel, material) {
		const positions = [];
    const normals = [];
    const uvs = [];
    const indices = [];

		for(let y = 0; y < 256; y++) {
			if(this.voxels[y] === 0)
				continue;
			for(let x = 0; x < 16; x++) {
				const absX = this.cx * 16 + x;
				for (let z = 0; z < 16; z++) {
					const absZ = this.cz * 16 + z;
					let voxel = this.getQuickVoxel(x, y, z);
					if(voxel === 0)
						continue;
					const uvVoxel = voxel - 1;
					for (const {dir, corners, uvRow} of faces) {
						let neighbor = this.getSlowVoxel(
							x + dir[0],
							y + dir[1],
							z + dir[2]);
						if(neighbor === -1) {
							neighbor = globalGetVoxel(absX + dir[0], y, absZ + dir[2]);
						}
						
						if(neighbor <= 0 || (neighbor === 4 && voxel !== 4)) {
							const ndx = positions.length / 3;
							for (const {pos, uv} of corners) {
								positions.push(pos[0] + absX, pos[1] + y, pos[2] + absZ);
                  normals.push(...dir);
                  uvs.push(
                        (uvVoxel +   uv[0]) * 16 / 256,
                    1 - (uvRow + 1 - uv[1]) * 16 / 64);
							}
							indices.push(
								ndx, ndx + 1, ndx + 2,
								ndx + 2, ndx + 1, ndx + 3,
							);
						}
					}
				}
			}
		}
		if(!this.geometry)
			this.geometry = new THREE.BufferGeometry();
		const positionNumComponents = 3;
		const normalNumComponents = 3;
		const uvNumComponents = 2;
		this.geometry.setAttribute(
				'position',
				new THREE.BufferAttribute(new Float32Array(positions), positionNumComponents));
		this.geometry.setAttribute(
				'normal',
				new THREE.BufferAttribute(new Float32Array(normals), normalNumComponents));
		this.geometry.setAttribute(
				'uv',
				new THREE.BufferAttribute(new Float32Array(uvs), uvNumComponents));
		this.geometry.setIndex(indices);
		this.geometry.computeBoundingSphere();
		this.mesh = new THREE.Mesh(this.geometry, material);
		this.mesh.name = this.cx + ':' + this.cz;
		return this.mesh;
	}
	async storeString() {
		let ret = "";
		let current = -1;   
		let number = 0;
		for (let y = 0; y < 256; y++) {
			for (let i = 0; i < 256; i++) {
				let val = this.voxels[y][i];
				if(val === current)
					++number;
				else {
					ret += String.fromCharCode(number);
					ret += String.fromCharCode((current<<8)>>>8);
					current = val;
					number = 1;
				}
			}
		}
		localStorage.setItem(this.id, ret);
	}
	async grabString(str) {
		this.voxels = [];
		for (let i = 0; i < 256; i++) {
			this.voxels.push(new Uint16Array(16*16));
		}
		let y = 0;
		let index = 0;
		let len = 0;
		for (let i = 0; i < str.length; i += 2) {
			let number = str.charCodeAt(i);
			let val = str.charCodeAt(i+1);
			for (let j = 0; j < number; j++) {
				this.voxels[y][index] = val;
				index++;
				if(index > 255){
					index = 0;
					y++;
				}
				len++;
			}
		}
	}
}

const faces = [
  { // left
    uvRow: 1,
    dir: [ -1,  0,  0, ],
    corners: [
      { pos: [ 0, 1, 0 ], uv: [ 0, 1 ], },
      { pos: [ 0, 0, 0 ], uv: [ 0, 0 ], },
      { pos: [ 0, 1, 1 ], uv: [ 1, 1 ], },
      { pos: [ 0, 0, 1 ], uv: [ 1, 0 ], },
    ],
  },
  { // right
    uvRow: 1,
    dir: [  1,  0,  0, ],
    corners: [
      { pos: [ 1, 1, 1 ], uv: [ 0, 1 ], },
      { pos: [ 1, 0, 1 ], uv: [ 0, 0 ], },
      { pos: [ 1, 1, 0 ], uv: [ 1, 1 ], },
      { pos: [ 1, 0, 0 ], uv: [ 1, 0 ], },
    ],
  },
  { // bottom
    uvRow: 2,
    dir: [  0, -1,  0, ],
    corners: [
      { pos: [ 1, 0, 1 ], uv: [ 1, 0 ], },
      { pos: [ 0, 0, 1 ], uv: [ 0, 0 ], },
      { pos: [ 1, 0, 0 ], uv: [ 1, 1 ], },
      { pos: [ 0, 0, 0 ], uv: [ 0, 1 ], },
    ],
  },
  { // top
    uvRow: 0,
    dir: [  0,  1,  0, ],
    corners: [
      { pos: [ 0, 1, 1 ], uv: [ 1, 1 ], },
      { pos: [ 1, 1, 1 ], uv: [ 0, 1 ], },
      { pos: [ 0, 1, 0 ], uv: [ 1, 0 ], },
      { pos: [ 1, 1, 0 ], uv: [ 0, 0 ], },
    ],
  },
  { // back
    uvRow: 1,
    dir: [  0,  0, -1, ],
    corners: [
      { pos: [ 1, 0, 0 ], uv: [ 0, 0 ], },
      { pos: [ 0, 0, 0 ], uv: [ 1, 0 ], },
      { pos: [ 1, 1, 0 ], uv: [ 0, 1 ], },
      { pos: [ 0, 1, 0 ], uv: [ 1, 1 ], },
    ],
  },
  { // front
    uvRow: 1,
    dir: [  0,  0,  1, ],
    corners: [
      { pos: [ 0, 0, 1 ], uv: [ 0, 0 ], },
      { pos: [ 1, 0, 1 ], uv: [ 1, 0 ], },
      { pos: [ 0, 1, 1 ], uv: [ 0, 1 ], },
      { pos: [ 1, 1, 1 ], uv: [ 1, 1 ], },
    ],
  },
];