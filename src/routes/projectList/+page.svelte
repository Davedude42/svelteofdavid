<style>
.projects-grid {
	display: grid;
	grid-template-columns: min(40rem, 100%);
	gap: 1rem;
	justify-content: center;
}
.project-item {
	display: grid;
	grid-template-columns: 8rem 1fr;
	grid-template-rows: min-content 1fr;
	row-gap: 1rem;
	column-gap: 2rem;

	padding: 1rem;

	font-weight: 500;
}
.project-item img {
	height: 8rem;
}
</style>
<div class="relative flex-grow flex flex-col items-stretch">
	<div class="flex flex-row items-stretch justify-center h-12 p-4 box-content">
		<div class="flex flex-row items-center justify-center px-4 min-w-[192px] thick-black-border bg-white text-2xl font-IBMPlexMono font-medium box-content">
			Projects
		</div>
	</div>
	<div class="projects-grid p-4 font-">
		<a class="project-item thick-black-border comic-shadow bg-white hover:bg-lighter" href="/project/voxelbasedgame">
			<img src={vbgImage} alt="My mindcraft" class="row-span-2 thick-black-border" />
			<div class="font-IBMPlexMono text-2xl">Voxel Based Game</div>
			<div class="text-lg">A completely original idea, one of a kind</div>
		</a>
		<a class="project-item thick-black-border comic-shadow bg-white hover:bg-lighter" href="/project/lightblue">
			<img src={lightblueImage} alt="A board of Light Blue" class="row-span-2 thick-black-border" />
			<div class="font-IBMPlexMono text-2xl">Light Blue</div>
			<div class="text-lg">Who knew computers could be good at chess?</div>
		</a>
		<a class="project-item thick-black-border comic-shadow bg-white hover:bg-lighter" href="/project/ledlights">
			<img src={lightblueImage} alt="Light Emitting Diodes" class="row-span-2 thick-black-border" />
			<div class="font-IBMPlexMono text-2xl">LED Lights</div>
			<div class="text-lg">My strip of Light Emitting Diodes</div>
		</a>
	</div>
</div>
<!--
<div class="flex-grow flex flex-col items-center w-full">
	<div class="p-8 text-5xl text-center">Projects</div>
	<div class="grid grid-cols-1 justify-items-stretch gap-6 py-6" style="max-width: 700px;">
		<a class="program-grid p-4 bg-gray-100 hover:bg-gray-200" href="/project/voxelbasedgame">
			<img src="https://i.kym-cdn.com/entries/icons/original/000/000/107/smily.jpg" class="program-image" alt="My mindcraft" />
			<div class="program-title">
				Voxel Based Game
			</div>
			<div class="program-description">
				A completely original idea, one of a kind
			</div>
		</a>
		<a class="program-grid p-4 bg-gray-100 hover:bg-gray-200" href="/project/lightblue">
			<img src="https://i.kym-cdn.com/entries/icons/original/000/000/107/smily.jpg" class="program-image" alt="Light blue" />
			<div class="program-title">
				Light Blue
			</div>
			<div class="program-description">
				My capstone from 7th grade is back and better than ever!
			</div>
		</a>
		<a class="program-grid p-4 bg-gray-100 hover:bg-gray-200" href="/project/lightblue">
			<img src="https://i.kym-cdn.com/entries/icons/original/000/000/107/smily.jpg" class="program-image" alt="Light blue" />
			<div class="program-title">
				LED Lights
			</div>
			<div class="program-description">
				My strip of Light Emitting Diodes
			</div>
		</a>
	</div>
	<div class="p-8 text-5xl text-center">Toys</div>
	<div class="grid grid-cols-2 justify-items-stretch gap-6 py-6" style="max-width: 1300px;">
		<a class="program-grid p-4 bg-gray-100 hover:bg-gray-200" href="/project/voxelbasedgame">
			<img src="https://i.kym-cdn.com/entries/icons/original/000/000/107/smily.jpg" class="program-image" alt="My mindcraft" />
			<div class="program-title">
				Sand.box
			</div>
			<div class="program-description">
				sand, water, acid... fire
			</div>
		</a>
		<a class="program-grid p-4 bg-gray-100 hover:bg-gray-200" href="/project/lightblue">
			<img src="https://i.kym-cdn.com/entries/icons/original/000/000/107/smily.jpg" class="program-image" alt="Light blue" />
			<div class="program-title">
				Gravity
			</div>
			<div class="program-description">
				Take a break from the world by smashing some circles against each other
			</div>
		</a>
		<a class="program-grid p-4 bg-gray-100 hover:bg-gray-200" href="/project/lightblue">
			<img src="https://i.kym-cdn.com/entries/icons/original/000/000/107/smily.jpg" class="program-image" alt="Light blue" />
			<div class="program-title">
				Tuition Live Stream
			</div>
			<div class="program-description">
				Appreciate what your parents provide for you!
			</div>
		</a>
	</div>
</div>
-->
<script>
import vbgImage from '$lib/assets/imgs/projects/voxelbasedgame.jpg';
import lightblueImage from '$lib/assets/imgs/projects/lightblue.jpg';
</script>