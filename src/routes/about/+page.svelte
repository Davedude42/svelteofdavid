<style>
.about-outside {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4rem;
	
	margin-top: 80px;
	margin-bottom: 2rem;
}

.me-and-journey {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 0px;

	padding: 0 1rem;
}
@media only screen and (min-width: 64rem) {
	.me-and-journey {
		flex-direction: row;
		align-items: start;
		gap: 4rem;
	}
}

.arrow-list {
	padding-left: 1rem;
}
.arrow-list li {
	padding: 6px 0;
	padding-left: 1rem;
}
.arrow-list li::marker {
  content: "\f061";
  font-family: FontAwesome;
}

.languages-list {
	counter-reset: langs;
	@apply font-IBMPlexMono;
}
.languages-list li:before {
  counter-increment: langs;
	content: counter(langs);
	
	display: inline-block;

	width: 3rem;
	padding: 1px 0;
	padding-right: 0.5rem;
	margin-right: 1rem;

	@apply bg-neutral-200 text-neutral-400;

	text-align: right;
}
.languages-list li.extra-bump:before {
	margin-right: 36px;
}

.work-experience {
	align-self: stretch;
	display: flex;
	flex-direction: column;
	align-items: center;

	width: 100%;
	border-left: none;
	border-right: none;

	@apply bg-primary;
}
</style>
<div class="about-outside">
	<div class="me-and-journey">
		<div class="flex flex-col items-center gap-8" style="flex: 0 1 18rem;">
			<ThickBlackContent>
				<img src={mee} alt="It's me!! With my LED lights too." />
			</ThickBlackContent>
			<ThickBlackContent elementClass="bg-secondary">
				<p class="font-IBMPlexMono font-bold text-lg">I'm <span class="bg-white">&nbsp;David Haroldsen&nbsp;</span></p>
				<p class="pt-4 font-medium">I'm a Freshman at BYU, and as you can tell, I program.</p>
			</ThickBlackContent>
		</div>
		<div class="flex flex-col gap-8" style="flex: 0 1 30rem; padding-top: 2rem;">
			<ThickBlackContent elementClass="row-span-2">
				<p class="font-IBMPlexMono font-semibold text-lg pb-2">My Journey</p>
				<ul class="arrow-list py-2">
					<li>Started programming in 5th grade.</li>
					<li>Mostly self taught from videos and docs on the internet.</li>
					<li>Got this website as a Christmas gift in 2018.<br>(it's been a good gift)</li>
					<li>Have been updating it since.</li>
				</ul>
			</ThickBlackContent>
			<ThickBlackContent elementClass="row-span-2" elementStyle="padding: 0;">
				<div class="relative flex flex-row items-center justify-center gap-2 bg-neutral-300 h-10 px-3 font-IBMPlexMono font-semibold text-base">
					<div class="absolute left-3 top-3 text-xs">
						<i class="fa-solid fa-square text-red-500"></i>
						<i class="fa-solid fa-square text-yellow-500"></i>
						<i class="fa-solid fa-square text-green-500"></i>
					</div>
					Languages/Techs I've learned
				</div>
				<ol class="languages-list">
					<li>HTML/CSS/Javascript</li>
					<li>Tailwind</li>
					<li>Node</li>
					<li class="extra-bump">Vue</li>
					<li class="extra-bump">Nuxt</li>
					<li class="extra-bump">Svelte (this site)</li>
					<li class="extra-bump">React</li>
					<li>PHP: Hypertext Preprocessor</li>
					<li>SQL</li>
					<li>Python</li>
					<li>Java</li>
					<li>TI Basic &lt;3</li>
				</ol>
			</ThickBlackContent>
		</div>
	</div>
	<div class="work-experience thick-black-border">
		<h2 class="p-6 pb-0 font-semibold text-3xl font-IBMPlexMono">Work Experience</h2>
		<div class="flex flex-row justify-start sm:justify-center gap-6 p-6 w-full overflow-x-auto">
			<a href="/experience" class="contents">
				<OutlandishButton elementStyle="width: 280px; height: 350px;" elementClass="flex-shrink-0 flex flex-col items-center justify-evenly !p-3">
					<img src={swimmy} alt="Swimmy" class="thick-black-border">	
					<div class="font-IBMPlexMono text-lg">Swimage</div>
					<div class="text-base">2 Years designing web portal</div>
				</OutlandishButton>
			</a>
			<div style="width: 220px; height: 350px; border: 4px dashed white; opacity: 0.4;" class="flex-shrink-0 flex flex-row items-center justify-center p-4 text-xl font-bold text-white">
				More experience<br>coming soon...
			</div>
		</div>
	</div>
</div>
<script lang="ts">
import ThickBlackContent from "$lib/components/ThickBlackContent.svelte";
import OutlandishButton from "$lib/components/OutlandishButton.svelte";

import mee from '$lib/assets/imgs/mee.jpg';
import swimmy from '$lib/assets/imgs/about/swimmy.jpg';
</script>