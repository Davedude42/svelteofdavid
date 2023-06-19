<style>
.meee-image {
	grid-row: 1 / 2;
	width: 16rem;
}
.meee-description {
	grid-row: 2 / 3;
}
.my-journey {
	grid-row: 3 / 4;
}
.more-about-me {
	grid-row: 4 / 5;
}
.about-grid {
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 16rem min-content min-content max-content;
	column-gap: 2rem;
	row-gap: 2rem;
	align-items: start;
	justify-items: center;
	
	width: 100%;
	max-width: 30rem;
}
@media only screen and (min-width: 768px) {
	.meee-image {
		grid-column: 1 / 2; 
		grid-row: 1 / 4;
	}
	.meee-description {
		grid-column: 1 / 2; 
		grid-row: 5 / 6;
	}
	.my-journey {
		grid-column: 2 / 3; 
		grid-row: 2 / 6;
	}
	.more-about-me {
		grid-column: 3 / 4;
		grid-row: 3 / 6;
	}
	.about-grid {
		grid-template-columns: 16rem 13fr 10fr;
		grid-template-rows: 2rem 3rem 11rem 1rem 1fr;
		row-gap: 0rem;

		width: 100%;
		max-width: 72rem;
	}
}
.slideshow-grid {
	display: grid;
	grid-template-rows: 1fr;
	align-items: stretch;
}

.slideshow-grid.transition {
	transition: transform 0.25s;
}

.rubikscube {
	background: url('/staticimgs/rubikscube.jpg');

	background-size: cover;
	background-position: center;
}
.catan {
	background: url('/staticimgs/catan.jpg');

	background-size: cover;
	background-position: center;
}
</style>
<div class="relative flex-grow flex flex-col items-center">
	<div class="flex flex-row items-stretch h-12 p-4 box-content">
		<div class="flex flex-row items-center justify-center px-4 min-w-[192px] thick-black-border bg-white text-2xl font-IBMPlexMono font-medium box-content">
			About
		</div>
	</div>
	<div class="about-grid p-4">
		<div class="meee-image thick-black-border comic-shadow bg-white p-4">
			<img src={mee} class="w-full h-full" alt="meeeee" />
		</div>
		<div class="meee-description p-4 thick-black-border comic-shadow bg-lighter font-medium">
			<h3 class="pb-4 text-lg font-IBMPlexMono">I'm <span class="bg-white">David Haroldsen</span></h3>
			<p class="">
				I'm going to be a Senior in High School, and as you can tell, I program.
			</p>
		</div>
		<div class="my-journey thick-black-border comic-shadow bg-lighter p-4 font-medium">
			<h3 class="flex flex-row items-center pb-2 text-2xl font-IBMPlexMono font-medium">
				<div class="flex-grow">
					My Journey
				</div>
				<div class="pr-3 text-4xl">
					<i class="fa-solid fa-person-hiking pr-3"></i><i class="fa-solid fa-mountain"></i>
				</div>
			</h3>
			<p class="py-2">
				I started programming way back in 5th grade. I got this website as a Christmas gift two years later in 2018; it's been a pretty good gift.
			</p>
			<p class="py-2">
				Now, I've been working for a small tech company doing their front-end development for about two years.
			</p>
			<p class="py-2">
				On my own, I have gotten to work with a few languages and technologies, including... 
			</p>
			<ul class="mt-2 p-4 thick-black-border bg-white font-IBMPlexMono font-medium">
				<li>&nbsp;1. HTML/CSS/Javascript</li>
				<li>&nbsp;2. Tailwind</li>
				<li>&nbsp;3. Node</li>
				<ul>
					<li>&nbsp;&nbsp;4. Vue</li>
					<li>&nbsp;&nbsp;5. Nuxt</li>
					<li>&nbsp;&nbsp;6. React</li>
					<li>&nbsp;&nbsp;7. Svelte (this site)</li>
				</ul>
				<li>&nbsp;8. PHP: Hypertext Preprocessor</li>
				<li>&nbsp;9. SQL</li>
				<li>10. Python</li>
				<li>11. Java</li>
				<li>12. TI Basic &lt;3</li>
				<li>13. Scratch</li>
				<li>14. git</li>
			</ul>
		</div>
		<div class="more-about-me thick-black-border comic-shadow bg-lighter p-4 font-medium">
			<h3 class="pb-2 text-2xl font-IBMPlexMono font-medium">
				More about me
			</h3>
			<p class="py-2">
				I do some things other than programming too every once in a while. Here is an interactive slideshow of other things I do:
			</p>
			<div class="relative mt-2 h-72 thick-black-border bg-white font-IBMPlexMono font-medium overflow-hidden box-content" bind:this={slideshow}>
				<div class="z-30 absolute left-0 top-1/3 px-1 py-2 thick-black-border border-l-0 bg-white hover:bg-gray-100 cursor-pointer" on:click={leftSlide}><i class="fa-solid fa-angle-left"></i></div>
				<div class="z-30 absolute right-0 top-1/3 px-1 py-2 thick-black-border border-r-0 bg-white hover:bg-gray-100 cursor-pointer" on:click={rightSlide}><i class="fa-solid fa-angle-right"></i></div>
				<div class="slideshow-grid h-full overflow-hidden" class:transition bind:this={slideshowGrid} style="transform: translateX({offsetGrid}px);">
					<div class="flex flex-col">
						<div class="flex-grow catan"></div>
						<div class="border-t-4 border-black p-4">
							3d Printed Catan<br>
							Hey, we should play sometime.
						</div>
					</div>
					<div class="flex flex-col">
						<div class="flex-grow rubikscube"></div>
						<div class="border-t-4 border-black p-4">
							Rubik's Cube<br>
							Record: 40 sec
						</div>
					</div>
					<div class="flex flex-col">
						<div class="flex-grow catan"></div>
						<div class="border-t-4 border-black p-4">
							3d Printed Catan<br>
							Hey, we should play sometime.
						</div>
					</div>
					<div class="flex flex-col">
						<div class="flex-grow rubikscube"></div>
						<div class="border-t-4 border-black p-4">
							Rubik's Cube<br>
							Record: 40 sec
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<svelte:window
  on:resize={slideshowWidth}
/>
<script>
import { onMount } from 'svelte';

import mee from '$lib/assets/imgs/mee.jpg';

let slideshow;
let slideshowGrid;

let nSlides = 2;

let width;

let slide = 0;

let transition = false;

let autoSlideInterval = setInterval(rightAutoSlide, 10000);

$: offsetGrid = -((slide + 1) * width);

function slideshowWidth() {

	width = slideshow.offsetWidth - 8;

	slideshow.style.width = width + 'px';
	slideshowGrid.style.width = ((nSlides + 2) * width) + 'px';
	slideshowGrid.style.gridTemplateColumns = `repeat(${nSlides + 2}, ${width}px)`;
}

function leftSlide() {
	clearInterval(autoSlideInterval);

	slide--;
	
	transition = true;

	setTimeout(() => {
		transition = false;
		if(slide <= -1) {
			slide = nSlides - 1;
		}
	}, 250);
}
function rightSlide() {
	clearInterval(autoSlideInterval);

	slide++;
	
	transition = true;

	setTimeout(() => {
		transition = false;
		if(slide >= nSlides) {
			slide = 0;
		}
	}, 250);
}
function rightAutoSlide() {
	slide++;
	
	transition = true;

	setTimeout(() => {
		transition = false;
		if(slide >= nSlides) {
			slide = 0;
		}
	}, 250);
}

onMount(slideshowWidth);

</script>