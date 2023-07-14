
import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';
import { materials } from './materials.js';

export class Chunk {
	constructor (cx, cz) {
		this.cx = cx;
		this.cz = cz;
		this.voxels = new Uint8Array(16*16*256);
		this.mesh;
	}
	setLocalVoxel (x, y, z, val) {
		this.voxels[y*16*16 + x*16 + z] = val;
	}
	getLocalVoxel (x, y, z) {
		if(x < 0 || x >= 16 || z < 0 || z >= 16 || y < 0 || y >= 256)
			return 0;
		else
			return this.voxels[y*16*16 + x*16 + z];
	}
	generate(seed) {
		noise.seed(seed);
		for (let x = 0; x < 16; x++) {
			for (let z = 0; z < 16; z++) {
				let grass = 64+Math.round(noise.simplex2((this.cx*16 + x) / 30, (this.cz*16 + z) / 30) * 3);
				for (let y = 0; y < 256; y++) {
					let cave = noise.simplex3((this.cx*16 + x) / 30, y / 15, (this.cz*16 + z) / 30);
					let val = 0;
					if(cave > 0.6)
						val = 0;
					else if(y == grass) {
						val = 1;
					}
					else if(y < grass) 
						val = 2;
					this.setLocalVoxel(x, y, z, val);
				}
			}
		}
	}
	createMesh (parent, textures) {
		let positions = [];
		let normals = [];
		let indices = [];
		let uvs = [];
		for (let x = 0; x < 16; x++) {
			for (let y = 0; y < 256; y++) {
				for (let z = 0; z < 16; z++) {
					let voxel = this.getLocalVoxel(x, y, z);
					if(voxel != 0) {
						const uvVoxel = voxel - 1;
						for (const {dir, corners, uvRow} of faces) { 
							let faceVoxel = parent.getVoxel(this.cx*16 + x + dir[0], y + dir[1], this.cz*16 + z + dir[2]);
							if(faceVoxel === 0 || (materials[voxel].transparent === false && materials[faceVoxel].transparent === true)) {
								const ndx = positions.length / 3;
								for (const {pos, uv} of corners) {
									positions.push(this.cx*16 + x + pos[0], y + pos[1], this.cz*16 + z + pos[2]);
									normals.push(...dir);
									uvs.push((uvVoxel +   uv[0]) * 16 / 256, 1 - (uvRow + 1 - uv[1]) * 16 / 64);
								}
								indices.push(ndx, ndx+1, ndx+2, ndx+2, ndx+1, ndx+3);
							}
						}
					}
				}
			}
		}
		const geometry = new THREE.BufferGeometry();
		const material = new THREE.MeshLambertMaterial({
			map: textures,
			alphaTest: 0.1,
			transparent: true,
		});
		geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
		geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(normals), 3));
		geometry.setAttribute(
			'uv',
			new THREE.BufferAttribute(new Float32Array(uvs), 2));
		geometry.setIndex(indices);
		this.mesh = new THREE.Mesh(geometry, material);
		return this.mesh;
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