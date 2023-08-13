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

.david-title-wrapper {
	display: flex;
	flex-direction: row;
	align-items: stretch;

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
.code li {
	display: flex;
	flex-direction: row;
}
.code span {
	width: 48px;
	text-align: end;
	padding: 0 6px;
	margin-right: 14px;

	flex-shrink: 0;

	font-weight: 400;

	@apply bg-gray-200;
}

</style>
<div class="relative flex-grow flex flex-col items-center" style="margin-top: 80px;">
	<div class="about-grid p-4">
		<div class="meee-image thick-black-border comic-shadow bg-white p-4">
			<img src={mee} class="w-full h-full" alt="meeeee" />
		</div>
		<div class="meee-description p-4 thick-black-border comic-shadow bg-secondary">
			<h3 class="pb-4 text-lg font-semibold font-IBMPlexMono">I'm <span class="bg-white">David Haroldsen</span></h3>
			<p class="font-semibold">
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
			<p class="py-2 font-semibold">
				I started programming way back in 5th grade. I got this website as a Christmas gift two years later in 2018; it's been a pretty good gift.
			</p>
			<p class="py-2 font-semibold">
				Now, I've been working for a small tech company doing their front-end development for about two years.
			</p>
			<p class="py-2 font-semibold">
				On my own, I have gotten to work with a few languages and technologies, including... 
			</p>
			<ul class="mt-2 pr-2 thick-black-border bg-white font-IBMPlexMono font-medium code">
				<li class="items-end"><span style="padding-top: 10px;">1</span>HTML/CSS/Javascript</li>
				<li><span>2</span>Tailwind</li>
				<li><span>3</span>Node</li>
				<li><span style="margin-right: 36px;">4</span>Vue</li>
				<li><span style="margin-right: 36px;">5</span>Nuxt</li>
				<li><span style="margin-right: 36px;">6</span>React</li>
				<li><span style="margin-right: 36px;">7</span>Svelte (this site)</li>
				<li><span>8</span>PHP: Hypertext Preprocessor</li>
				<li><span>9</span>SQL</li>
				<li><span>10</span>Python</li>
				<li><span>11</span>Java</li>
				<li><span>12</span>TI Basic &lt;3</li>
				<li><span>13</span>Scratch</li>
				<li><span style="padding-bottom: 10px;">14</span>git</li>
			</ul>
		</div>
		<div class="more-about-me thick-black-border flex flex-col comic-shadow bg-lighter p-4 font-medium">
			<h3 class="pb-2 text-2xl font-IBMPlexMono font-medium">
				More about me
			</h3>
			<p class="py-2 font-semibold">
				I do some things other than programming too every once in a while. Here is an interactive slideshow of other things I do:
			</p>
			<div class="scene" bind:this={sceneEl}>
				<div class="carousel" bind:this={carouselEl}>
					<div class="carousel-cell">
						<div class="flex-grow relative overflow-hidden">
							<img src={scouts} alt="boy scouts shirt">
						</div>
						<div class="p-4 border-t-4 border-black">
							<p class="pb-1 font-bold">Boy Scouts</p>
							<p class="text-sm">I am more outdoorsy than the average person.</p>
						</div>
					</div>
					<div class="carousel-cell">
						<div class="flex-grow relative overflow-hidden">
							<img src={mads} alt="singers">
						</div>
						<div class="p-4 border-t-4 border-black">
							<p class="pb-1 font-bold">Madrigals</p>
							<p class="text-sm">I really enjoy singing, even though I'm a bass.</p>
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
							<img src={schobo} alt="amazing scholastic bowlers">
						</div>
						<div class="p-4 border-t-4 border-black">
							<p class="pb-1 font-bold">Scholastic Bowl</p>
							<p class="text-sm">Our team went to NAQT Nationals the last two years.</p>
						</div>
					</div>
				</div>
			</div>
			<div class="flex flex-row gap-2" style="padding: 10px; padding-top: 0px;">
				<button class="flex-1 thick-black-border h-10 bg-white hover:bg-lighter active:bg-primary" on:click={prevSlide}><i class="fa-solid fa-chevron-left"></i></button>
				<button class="flex-1 thick-black-border h-10 bg-white hover:bg-lighter active:bg-primary" on:click={nextSlide}><i class="fa-solid fa-chevron-right"></i></button>
			</div>
		</div>
	</div>
</div>
<svelte:window
	on:resize={recreateCarousel}
/>
<script>
import { onDestroy, onMount } from 'svelte';

import mee from '$lib/assets/imgs/mee.jpg';
import rubikscube from '$lib/assets/imgs/about/rubikscube.jpg';
import scouts from '$lib/assets/imgs/about/scouts.jpg';
import mads from '$lib/assets/imgs/about/mads.jpg';
import schobo from '$lib/assets/imgs/about/naqt.jpg';

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

		let correctedSelectedCell = selectedCell;

		while(correctedSelectedCell < 0) correctedSelectedCell += kiddies.length;
		while(correctedSelectedCell >= kiddies.length) correctedSelectedCell -= kiddies.length;

		if(correctedSelectedCell == i) {
			kiddies[i].style.opacity = 1;
		} else {
			kiddies[i].style.opacity = 0;
		}
	}

	carouselEl.style.transform = `translateZ(-${depth}px) rotateY(${-theta * selectedCell}deg)`;
	setTimeout(() => {
		carouselEl.style.transition = 'transform 0.5s';
		for (let i = 0; i < kiddies.length; i++) {
			kiddies[i].style.transition = 'opacity 0.5s';
		}
	}, 100);
}

function prevSlide() {
	clearInterval(int);

	selectedCell--;

	recreateCarousel();
}
function nextSlide() {
	clearInterval(int);

	selectedCell++;

	recreateCarousel();
}

let int;

onMount(() => {
	int = setInterval(() => {
		selectedCell++;

		recreateCarousel();
	}, 10000);

	recreateCarousel();
});

onDestroy(() => {
	clearInterval(int);
})
</script>