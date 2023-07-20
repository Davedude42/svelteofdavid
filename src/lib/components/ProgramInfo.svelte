<style>
.program-info {
	position: fixed;
	top: 1rem;
	right: 1rem;

	display: flex;
	flex-direction: column;
	align-items: stretch;

	background-color: white;

	transition: width 0.5s, height 0.5s;

	overflow: hidden;
	cursor: pointer;

	z-index: 1000;
}
.program-info:hover {
	@apply bg-gray-100;
}

.program-info.open {
	width: 18rem;
	height: 16rem;
}

.program-info.closed {
	width: 3rem;
	height: 3rem;
}


</style>
<div class={`thick-black-border program-info ${visible ? 'open' : 'closed'}`} on:click={toggleOpen} on:keypress={toggleOpen}>
	{#if visible}
		<div class="p-2 break-words overflow-y-auto" style="width: 17.5rem; height: 15.5rem;" in:fade|local={{ delay: 250, duration: 250 }} out:fade|local={{ duration: 250 }}>
			<slot />
		</div>
	{:else}
		<div class="artificially-center" in:fade|local={{ delay: 250, duration: 250 }} out:fade|local={{ duration: 250 }}>
			<i class="fa-solid fa-question"></i>
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