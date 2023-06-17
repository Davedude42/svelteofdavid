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
	voxels
</div>
<script>
import { onMount } from 'svelte';
import ProgramInfo from '$lib/components/ProgramInfo.svelte';

let canvas;
let ctx;

onMount(() => {
	
});
</script>