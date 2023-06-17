<style>
.program-grid {
	display: grid;
	grid-template-rows: min-content 1fr;
	grid-template-columns: 140px 1fr;
	align-items: stretch;
	row-gap: 8px;
	column-gap: 30px;
	
	height: 140px;
	box-sizing: content-box;

	transition: max-width 0.5s;
}
.program-grid img.program-image {
	grid-row: 1 / span 2;
	grid-column: 1 / span 1;
}
.program-grid .program-title {
	grid-row: 1 / span 1;
	grid-column: 2 / span 1;

	@apply text-2xl;
}
.program-grid .program-description {
	grid-row: 2 / span 1;
	grid-column: 2 / span 1;

	@apply pl-6 text-lg;
}
</style>
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