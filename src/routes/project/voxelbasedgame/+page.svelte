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
	<canvas class="threeCanvas" bind:this={canvas}></canvas>
</div>
<script>
import { VoxelBasedGame } from '$lib/voxelbasedgame/VoxelBasedGame';
import { Renderer } from '$lib/voxelbasedgame/Renderer';


import { onMount } from 'svelte';
import ProgramInfo from '$lib/components/ProgramInfo.svelte';


let canvas;
let ctx;

let game;
let renderer;

let lastStepTime;

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

	game.step(newStepTime - lastStepTime);

	lastStepTime = newStepTime;

	renderer.frame();
}
</script>