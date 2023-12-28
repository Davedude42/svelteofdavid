<style>
.thick-black-content {
	padding: 1rem;
	border: 4px solid black;
}

</style>
<section class={"thick-black-content " + elementClass} style={elementStyle}>
	<slot />
</section>
<script lang="ts">

export let elementClass: string = '';
export let elementStyle: string = '';

</script>