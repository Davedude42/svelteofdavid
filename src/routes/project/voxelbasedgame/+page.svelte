<style>
.threeCanvas {
	position: fixed;
	top: 0px;
	left: 0px;

	width: 100vw;
	height: calc(var(--vh) * 100);

	user-select: none;
}
</style>
{#if false}
	<ProgramInfo>
		<div class="text-center font-medium">Voxel Based Game</div>
		<p class="py-0.5 text-sm">
			This is my voxel based game, based on nothing that has existed before.
		</p>
		<div class="py-0.5 text-sm">
			<div class="font-medium">Controls</div>
			<ul class="pl-4">
				<li>WASD to move</li>
				<li>Click to hide mouse</li>
			</ul>
		</div>
		<div class="py-0.5 text-sm">
			<div class="font-medium">Mobile Controls</div>
			<ul class="pl-4">
				<li>Joycon to move</li>
				<li>Swipe to pan</li>
			</ul>
		</div>
	</ProgramInfo>
{/if}
<div>
	<div class="absolute top-0 right-0 z-50">
		{ console }<br>
		frame: { frameSpeed.toFixed(1) }ms<br>
		FPS: { (1/(frameSpeed/1000)).toFixed(0) }
	</div>
	<canvas class="threeCanvas" bind:this={canvas} on:click={click} on:mousemove={mousemove}></canvas>
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

function renderChunk(cx, cz) {
	renderer.renderChunk(cx, cz);
}

function step() {
	requestAnimationFrame(step);

	let newStepTime = performance.now();

	game.step(newStepTime - lastStepTime, keyMap);
	frameSpeed = (newStepTime - lastStepTime);

	for (const key in keyMap) {
		if(keyMap[key] === 1) keyMap[key] = 2;
	}

	lastStepTime = newStepTime;

	renderer.frame();
	
	console = `${ game?.player?.position?.x?.toFixed(2) } ${ game?.player?.position?.y?.toFixed(2) } ${ game?.player?.position?.z?.toFixed(2) }`;
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