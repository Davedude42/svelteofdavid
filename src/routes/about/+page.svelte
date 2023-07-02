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
.scene {
	position: relative;
	width: 100%;

	perspective: 1000px;

	overflow: hidden;
}
.carousel {
	position: absolute;
	
	width: 100%;
	height: 100%;

  transform-style: preserve-3d;

	
}
.carousel-cell {
	display: flex;
	flex-direction: column;

	position: absolute;
	top: 10px;
	left: 10px;

	width: 190px;
	height: 140px;
	border: 4px solid black;
	
	background-color: white;

	@apply font-IBMPlexMono;
}

.carousel-cell img {
	position: absolute;
	inset: 0px;

	width: 100%;
	height: 100%;

	object-fit: cover;
	object-position: center;
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
		<div class="more-about-me thick-black-border flex flex-col comic-shadow bg-lighter p-4 font-medium">
			<h3 class="pb-2 text-2xl font-IBMPlexMono font-medium">
				More about me
			</h3>
			<p class="py-2">
				I do some things other than programming too every once in a while. Here is an interactive slideshow of other things I do:
			</p>
			<div class="scene" bind:this={sceneEl}>
				<div class="carousel" bind:this={carouselEl}>
					<div class="carousel-cell">
						<div class="flex-grow relative overflow-hidden">
							<img src={scouts} alt="big ol rubik's cube">
						</div>
						<div class="p-4 border-t-4 border-black">
							<p class="pb-1 font-bold">Boy Scouts</p>
							<p class="text-sm">I am more outdoorsy than the average person.</p>
						</div>
					</div>
					<div class="carousel-cell">
						<div class="flex-grow relative overflow-hidden">
							<img src={rubikscube} alt="big ol rubik's cube">
						</div>
						<div class="p-4 border-t-4 border-black">
							<p class="pb-1 font-bold">Rubik's Cube</p>
							<p class="text-sm">3x3 Record: 40 sec</p>
						</div>
					</div>
					<div class="carousel-cell">
						<div class="flex-grow relative overflow-hidden">
							<img src={catan} alt="big ol rubik's cube">
						</div>
						<div class="p-4 border-t-4 border-black">
							<p class="pb-1 font-bold">3d Printed Catan</p>
							<p class="text-sm">Hey, we should play sometime</p>
						</div>
					</div>
					<div class="carousel-cell">
						<div class="flex-grow relative overflow-hidden">
							<img src={catan} alt="big ol rubik's cube">
						</div>
						<div class="p-4 border-t-4 border-black">
							<p class="pb-1 font-bold">3d Printed Catan</p>
							<p class="text-sm">Hey, we should play sometime</p>
						</div>
					</div>
					<div class="carousel-cell">
						<div class="flex-grow relative overflow-hidden">
							<img src={catan} alt="big ol rubik's cube">
						</div>
						<div class="p-4 border-t-4 border-black">
							<p class="pb-1 font-bold">3d Printed Catan</p>
							<p class="text-sm">Hey, we should play sometime</p>
						</div>
					</div>
				</div>
			</div>
			<div class="flex flex-row gap-2" style="padding: 10px; padding-top: 0px;">
				<button class="flex-1 thick-black-border h-10 bg-white hover:bg-gray-100 active:bg-gray-200" on:click={prevSlide}><i class="fa-solid fa-chevron-left"></i></button>
				<button class="flex-1 thick-black-border h-10 bg-white hover:bg-gray-100 active:bg-gray-200" on:click={nextSlide}><i class="fa-solid fa-chevron-right"></i></button>
			</div>
		</div>
	</div>
</div>
<svelte:window
	on:resize={recreateCarousel}
/>
<script>
import { onMount } from 'svelte';

import mee from '$lib/assets/imgs/mee.jpg';
import rubikscube from '$lib/assets/imgs/about/rubikscube.jpg';
import catan from '$lib/assets/imgs/about/catan.jpg';
import scouts from '$lib/assets/imgs/about/scouts.jpg';

let sceneEl;
let carouselEl;

let cellWidth = 0;
let cellHeight = 0;

let selectedCell = 0;

function recreateCarousel() {
	let w = carouselEl.offsetWidth;
	let h = w;

	sceneEl.style.height = h + 'px';

	cellWidth = w - 20;
	cellHeight = h - 20;

	let kiddies = carouselEl.children;

	let theta = 360 / kiddies.length;
	let depth = (w / 2) / Math.tan((theta / 2)/180*Math.PI);

	for (let i = 0; i < kiddies.length; i++) {
		kiddies[i].style.width = cellWidth + 'px';
		kiddies[i].style.height = cellHeight + 'px';

		kiddies[i].style.transform = `rotateY(${theta * i}deg) translateZ(${depth}px)`;

		/*let nearestYouCouldCallIt = selectedCell;
		if(selectedCell < i) {
			while(Math.abs(nearestYouCouldCallIt - i) > kiddies.length / 2) nearestYouCouldCallIt += kiddies.length;
		}
		if(selectedCell > i) {
			while(Math.abs(nearestYouCouldCallIt - i) > kiddies.length / 2) nearestYouCouldCallIt -= kiddies.length;
		}

		if(Math.abs(nearestYouCouldCallIt - i) <= 1) {
			kiddies[i].style.opacity = 1;
		} else {
			kiddies[i].style.opacity = 0;
		}*/
	}

	carouselEl.style.transform = `translateZ(-${depth}px) rotateY(${-theta * selectedCell}deg)`;
	setTimeout(() => carouselEl.style.transition = 'transform 0.5s', 100);
}

function prevSlide() {
	selectedCell--;

	recreateCarousel();
}
function nextSlide() {
	selectedCell++;

	recreateCarousel();
}

onMount(recreateCarousel);
</script>