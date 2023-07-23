{#key character}
	<span class="inline-block whitespace-pre" in:fly={{ y: -10, duration: 500 }}>
		{ character }
	</span>
{/key}
<script lang="ts">
import { fly } from 'svelte/transition';

export let character: string;
</script>