import * as THREE from 'three';

import { CAMERA_HEIGHT, PLAYER_RADIUS } from './Constants.js';

import textureMap from '$lib/voxelbasedgame/texturemap.png';

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

// Add directional lights to scene
function dirLight(x, y, z, brightness) {
	let light = new THREE.DirectionalLight(0xffffff, brightness*1.5);
	light.position.set(x, y, z);
	return light;
}

export class Renderer {
	renderer;

	fov = 75;
	aspect;
	near = 0.001;
	far = 1000;

	camera;
	scene;

	loader;
	texture;
	material;

	axesHelper;
	playerRadiusHelper;

	meshes;

	constructor(canvas, game) {
		this.canvas = canvas;

		this.game = game;

		this.meshes = [];
	}
	initialize() {
		this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
		this.renderer.setSize( window.innerWidth, window.innerHeight );

		this.aspect = (window.innerWidth) / window.innerHeight;
		
		this.camera = new THREE.PerspectiveCamera( this.fov, this.aspect, this.near, this.far );
		this.camera.position.set(0, 0, 0);
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color('lightblue');
		
		this.axesHelper = new THREE.AxesHelper( 1 );
		this.axesHelper.position.set(0, 90, 0);
		this.scene.add(this.axesHelper);

		const geometry = new THREE.CircleGeometry(PLAYER_RADIUS, 32); 
		const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); 
		this.playerRadiusHelper = new THREE.Mesh(geometry, material); 
		this.playerRadiusHelper.position.set(0, 90, 0);
		this.playerRadiusHelper.rotateX(-Math.PI/2);
		this.scene.add(this.playerRadiusHelper);

		this.loader = new THREE.TextureLoader();

		this.texture = this.loader.load(textureMap, function () {});
		this.texture.magFilter = THREE.NearestFilter;
		this.texture.minFilter = THREE.NearestFilter;

		this.material = new THREE.MeshLambertMaterial({
			map: this.texture,
			alphaTest: 0.1,
			transparent: true,
		});

		let dirLights = [];

		dirLights.push(dirLight(10, 0, 0, 0.6));
		dirLights.push(dirLight(-10, 0, 0, 0.6));
		dirLights.push(dirLight(0, 0, 10, 0.4));
		dirLights.push(dirLight(0, 0, -10, 0.4));
		dirLights.push(dirLight(0, 10, 0, 0.5));
		dirLights.push(dirLight(0, -10, 0, 0.5));

		for (let i = 0; i < dirLights.length; i++) {
			this.scene.add(dirLights[i]);
		}

		this.scene.fog = new THREE.Fog(new THREE.Color('lightblue'), (this.game.renderDistance - 2) * 16, this.game.renderDistance * 16 );
	}
	renderChunk(cx, cz) {

		const positions = [];
    const normals = [];
    const uvs = [];
    const indices = [];

		let chunk = this.game.getChunk(cx, cz);

		if(!chunk) {
			console.error(`${cx} ${cz} not valid chunk to render`);

			return;
		}

		for(let y = 0; y < 256; y++) {
			for(let x = 0; x < 16; x++) {
				const absX = cx * 16 + x;
				for (let z = 0; z < 16; z++) {
					const absZ = cz * 16 + z;
					let voxel = chunk.getVoxel(x, y, z);
					if(voxel === 0)
						continue;
					const uvVoxel = voxel - 1;
					for (const {dir, corners, uvRow} of faces) {
						let neighbor = this.game.getVoxel(
							absX + dir[0],
							   y + dir[1],
							absZ + dir[2]);
						
						if(neighbor <= 0) {
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

		let geometry = new THREE.BufferGeometry();

		const positionNumComponents = 3;
		const normalNumComponents = 3;
		const uvNumComponents = 2;
		geometry.setAttribute(
				'position',
				new THREE.BufferAttribute(new Float32Array(positions), positionNumComponents));
		geometry.setAttribute(
				'normal',
				new THREE.BufferAttribute(new Float32Array(normals), normalNumComponents));
		geometry.setAttribute(
				'uv',
				new THREE.BufferAttribute(new Float32Array(uvs), uvNumComponents));
		geometry.setIndex(indices);
		geometry.computeBoundingSphere();

		if(chunk.id in this.meshes) {
			this.meshes[chunk.id].removeFromParent();
		}

		let mesh = new THREE.Mesh(geometry, this.material);
		mesh.name = chunk.id;
		
		this.meshes[chunk.id] = mesh;

		this.scene.add(mesh);
	}
	frame() {
		this.camera.position.copy(this.game.player.position);
		this.camera.position.y += CAMERA_HEIGHT;

		this.playerRadiusHelper.position.copy(this.game.player.position);
		this.playerRadiusHelper.position.y += 0.05;

		this.camera.quaternion.setFromEuler(this.game.player.euler);
	
		this.renderer.render(this.scene, this.camera);
	}
}