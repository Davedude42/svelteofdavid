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
.project-item:active {
	transform: translate(4px, 4px);

	box-shadow: 2px 2px black;
}
.project-item img {
	height: 8rem;
}


.david-title-wrapper {
	display: flex;
	flex-direction: row;
	align-items: stretch;
	align-self: center;

	box-sizing: content-box;

	@apply h-12 py-4;
}

@media only screen and (min-width: 768px) and (max-width: 1272px) {
	.david-title-wrapper {
		align-self: start;
		padding-left: 510px;
	}
}

.david-title {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;

	min-width: 192px;
	border: 4px solid black;

	background-color: white;

	box-sizing: content-box;

	@apply px-4 text-2xl font-IBMPlexMono font-medium;
}
</style>
<div class="relative flex-grow flex flex-col items-stretch">
	<div class="david-title-wrapper">
		<div class="david-title">
			Projects
		</div>
	</div>
	<div class="projects-grid p-4">
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