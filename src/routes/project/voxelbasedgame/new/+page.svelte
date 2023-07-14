<style>
.threeCanvas {
	position: fixed;
	top: 0px;
	left: 0px;

	width: 100vw;
	height: calc(var(--vh) * 100);

	user-select: none;
}

.crosshair {
	position: fixed;
	top: 50%;
	left: 50%;

	font-size: 30px;
  line-height: 30px;

	/*backdrop-filter: invert(100%) grayscale(100%);
	background-clip: text;
	-webkit-background-clip: text;*/
	color: black;

	transform: translate(-50%, -50%);

	pointer-events: none;
}
</style>
<div>
	<div class="absolute top-0 right-0 z-50 whitespace-pre-line">
		{ console }
	</div>
	<canvas class="threeCanvas" bind:this={canvas} on:click={click} on:mousemove={mousemove}></canvas>
	<div class="crosshair">+</div>
</div>
<svelte:window on:keydown={keydown} on:keyup={keyup} />
<script>
import { VoxelBasedGame } from '$lib/voxelbasedgame/VoxelBasedGame.js';
import { Renderer } from '$lib/voxelbasedgame/Renderer.js';

import { SENSITIVITY } from '$lib/voxelbasedgame/Constants.js';

import { onMount } from 'svelte';
import ProgramInfo from '$lib/components/ProgramInfo.svelte';


let canvas;
let ctx;

let game;
let renderer;

let lastStepTime;

let keyMap = {
	KeyW: 0,
	KeyA: 0,
	KeyS: 0,
	KeyD: 0,
};

let frameNumber = 0;

let console = '';
let frameSpeed = 0;

onMount(() => {
	game = new VoxelBasedGame();
	game.onRenderChunk(renderChunk);

	renderer = new Renderer(canvas, game);

	renderer.initialize();

	game.generateWorld();

	lastStepTime = performance.now();

	step();
});

async function renderChunk(cx, cz) {
	renderer.renderChunk(cx, cz);
}

function step() {
	requestAnimationFrame(step);

	let newStepTime = performance.now();

	game.step(newStepTime - lastStepTime, keyMap);

	if(frameNumber % 10 === 0)
		frameSpeed = (newStepTime - lastStepTime);

	for (const key in keyMap) {
		if(keyMap[key] === 1) keyMap[key] = 2;
	}

	lastStepTime = newStepTime;

	renderer.frame();

	let angleX = game.player.euler.x / Math.PI * 180;
	let angleY = game.player.euler.y / Math.PI * 180;
	
	console = `
	${ (1/(frameSpeed/1000)).toFixed(0) } FPS
	${ game.player.position.x.toFixed(2) } ${ game.player.position.y.toFixed(2) } ${ game.player.position.z.toFixed(2) }
	${ game.player.velocity.x.toFixed(2) } ${ game.player.velocity.y.toFixed(2) } ${ game.player.velocity.z.toFixed(2) }
	${ game.player.isGrounded ? 'grounded' : 'falling' }
	${ angleX.toFixed(1) } ${ angleY.toFixed(1) }
	`.trim();

	frameNumber++;
}

function click(event) {
	canvas.requestPointerLock()
}
function keydown(event) {
	let key = event.code;

	keyMap[key] = 1;
}
function keyup(event) {
	let key = event.code;

	keyMap[key] = 0;
}
function mousemove(event) {
	const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
	const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
	game.player.euler.y -= movementX * SENSITIVITY;
	game.player.euler.x -= movementY * SENSITIVITY;
	game.player.euler.x = Math.min(Math.max(game.player.euler.x, -Math.PI/2+0.01), Math.PI/2-0.01);

}
</script>