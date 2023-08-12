<style>
  .program {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  iframe {
    flex-grow: 1;
  }

</style>
<div class="program" style="padding-top: 80px;">
	<ProgramInfo>
		<h2>Sand.box</h2>
		<p>Enjoy playing with the elements!</p>
		<p>Sorry, it doesn't fit on small screens.</p>
		<h4>Controls</h4>
		<p>Select an element and use your mouse or finger to place it.</p>
		<p>Press <kbd class="bg-neutral-600 text-white px-1 rounded-sm">V</kbd> to toggle viewing temperatures and <kbd class="bg-neutral-600 text-white px-1 rounded-sm">Space</kbd> to pause.</p>
	</ProgramInfo>
	<iframe src="/oldhtml/sand/index.html" scrolling="no" allow="fullscreen" on:load={setHeight} />
</div>
<script>
import ProgramInfo from "$lib/components/ProgramInfo.svelte";

function setHeight(event) {
	event.target.style.height = event.target.contentWindow.document.body.offsetHeight + 'px';
}
</script>