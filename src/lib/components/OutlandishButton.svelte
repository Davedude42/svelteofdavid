<style>
.outlandish-button {
	padding: 8px;
	border: 4px solid black;

	background-color: white;

	box-shadow: 4px 4px black;

	@apply font-semibold;
}

.outlandish-button:hover {
	@apply bg-lighter;
}

.outlandish-button:active {
	transform: translate(4px, 4px);

	box-shadow: none;
}
</style>
<button class={"outlandish-button " + elementClass} style={elementStyle} on:click={() => emit('click')}>
	<slot />
</button>
<script lang="ts">
import { createEventDispatcher } from 'svelte';

export let elementClass: string = '';
export let elementStyle: string = '';

const emit = createEventDispatcher();
</script>