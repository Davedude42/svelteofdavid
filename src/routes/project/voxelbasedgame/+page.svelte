<style>
  .program {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  iframe {
    flex-grow: 1;
  }

	h4 {
		padding-top: 6px;
		font-weight: 500;
		text-transform: uppercase;
		@apply text-xs font-IBMPlexMono;
	}
	p {
		@apply text-sm;
	}
</style>
<div class="program">
	<ProgramInfo>
		<h2 class="font-semibold font-IBMPlexMono">Voxel Based Game</h2>
		<p class="py-1">Made with THREE.js and my tears.</p>
		<h4>Controls</h4>
		<p>WASD to move and click to hide mouse</p>
		<h4>Mobile Controls</h4>
		<p>Swipe around and use the buttons. Sorry, no movement for u</p>
	</ProgramInfo>
	<iframe src="/oldhtml/mindcraft/index.html" scrolling="no" allow="fullscreen" on:load={setHeight} />
</div>
<script>
import ProgramInfo from "$lib/components/ProgramInfo.svelte";

function setHeight(event) {
	event.target.style.height = event.target.contentWindow.document.body.offsetHeight + 'px';
}
</script>