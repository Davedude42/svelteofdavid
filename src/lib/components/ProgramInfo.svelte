<style>
.program-info {
	position: fixed;
	top: 8px;
	right: 8px;

	border-radius: 20px;

	transition: width 0.5s, height 0.5s;
}
.program-info > div {
	position: absolute;
	top: 0px;
	left: 0px;
}
.program-info > div::-webkit-scrollbar {
  width: 4px;
	border-radius: 2px;
}

/* Track */
.program-info > div::-webkit-scrollbar-track {
  background: rgb(255 255 255 / 0.4);
	border-radius: 2px;
}

/* Handle */
.program-info > div::-webkit-scrollbar-thumb {
  background: rgb(0 0 0 / 0.3);
	border-radius: 2px;
}

.program-info.open {
	width: 240px;
	height: 260px;
}
.program-info.closed {
	width: 40px;
	height: 40px;
}
</style>
<div class={`program-info bg-gray-500/60 hover:bg-gray-500/70 overflow-hidden cursor-pointer ${visible ? 'open' : 'closed'}`} on:click={toggleOpen} on:keypress={toggleOpen}>
	{#if visible}
		<div class="p-2 break-words overflow-y-auto" style="width: 236px; height: 260px;" transition:fade>
			<slot />
		</div>
	{:else}
		<div class="flex flex-row items-center justify-center" style="width: 40px; height: 40px;" transition:fade>
			?
		</div>
	{/if}
</div>
<script>
import { fade } from 'svelte/transition';
let visible = false;

function toggleOpen() {
	visible = !visible;
}
</script>