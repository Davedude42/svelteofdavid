<style>

.collapse-outside {
	overflow: hidden;
	transition: width 700ms, color 400ms;
	width: var(--collapse-outside-width, min-content);

	color: rgb(0 0 0 / 100);
}

.outside-corner-menu:not(:hover) .collapse-outside-active:not(.force-open) {
	width: 0px;
	color: rgb(0 0 0 / 0);
}

</style>

<div class="group outside-corner-menu fixed left-0 top-0 flex flex-row min-w-[360px] p-2 overflow-visible font-Mulish">
	<div class="corner-menu flex flex-row items-center p-1.5 pr-3 bg-gray-500/60 rounded-full font-[600] whitespace-nowrap" id="corner-menu">
		<a class="flex flex-row items-center pr-1 hover:underline cursor-pointer" href="/">
			<img class="w-7 h-7 mr-2 transform group-hover:rotate-180 transition-transform duration-[700ms]" src={logo} alt="Cute little aperature--It's my logo!">
			David Haroldsen
		</a>
		<div class="collapse-outside overflow-hidden force-open" id="collapse-outside">
			<div class="flex flex-row pl-4 collapse-inside">
				<a class="px-3 hover:underline cursor-pointer" href="/about">About</a>
				<a class="px-3 hover:underline cursor-pointer" href="/projectList">Projects</a>
			</div>
		</div>
		<!-- I have to add this freakin element because otherwise svelte ignores my css >:( -->
		<div class="collapse-outside-active"></div>    
	</div>
</div>
<div class="flex flex-col h-full-fr">
	<slot />
</div>
<script lang="ts">
	import "../app.css";

	import logo from '$lib/assets/imgs/dodgerblueSmallBlack.png';
</script>