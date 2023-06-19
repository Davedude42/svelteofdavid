import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import textureMap from '$lib/voxelbasedgame/texturemap.png';

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

	controls;
	axesHelper;

	constructor(canvas, game) {
		this.canvas = canvas;

		this.game = game;
	}
	initialize() {
		this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
		this.renderer.setSize( window.innerWidth, window.innerHeight );

		this.aspect = (window.innerWidth) / window.innerHeight;
		
		this.camera = new THREE.PerspectiveCamera( this.fov, this.aspect, this.near, this.far );
		this.camera.position.set(0, 91.7, 0);
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color('lightblue');

		this.controls = new OrbitControls(this.camera, this.canvas);
		this.controls.target.set(0, 70, 0);
		this.controls.update();
		
		this.axesHelper = new THREE.AxesHelper( 1 );
		this.axesHelper.position.set(0, 90, 0);
		this.scene.add( this.axesHelper );

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
	}
	frame() {
		this.controls.update();
	
		this.renderer.render( this.scene, this.camera );
	}
}