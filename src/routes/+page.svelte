<style>
.home-grid {
	display: grid;
	grid-template-columns: 1fr 300px;
	align-items: center;
	justify-items: center;

	width: 1000px;
	height: 100vh;

	max-width: 100vw;
}
</style>
<div class="flex flex-col items-center justify-center w-screen h-screen">
	<div class="home-grid p-4">
		<div class="flex flex-col items-center gap-3">
			<div class="text-6xl">Welcome</div>
			<div class="font-IBMPlexMono">
				to my namesake website
			</div>
		</div>
		<div class="thick-black-border comic-shadow flex flex-col">
			<img src={continentalDivideImage} alt="meee" />
			<div class="p-3">Look at this <span class="font-bold">fine young man</span> standing at the Continental Divide. That's me.</div>
		</div>
	</div>
	<div class="absolute bottom-4 left-4 flex flex-row items-center gap-4">
		<a href="https://github.com/Davedude42" class="flex flex-row items-center justify-center w-12 h-12 thick-black-border bg-white hover:bg-lighter text-2xl">
			<i class="fa-brands fa-github"></i>
		</a>
		<a href="https://www.instagram.com/davedude.42/" class="flex flex-row items-center justify-center w-12 h-12 thick-black-border bg-white hover:bg-lighter text-2xl">
			<i class="fa-brands fa-instagram"></i>
		</a>
	</div>
</div>
<script lang="ts">
import continentalDivideImage from '$lib/assets/imgs/continentaldivide.jpg';
</script>