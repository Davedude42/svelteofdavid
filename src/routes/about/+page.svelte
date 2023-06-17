<style>

.gradient-border {
	position: relative;

  border: solid 2px transparent;
	border-radius: 4px;

	background-color: white;
	background-clip: padding-box;
}

.gradient-border:before {
	content: '';
	position: absolute;
	top: -2px;
	right: -2px;
	bottom: -2px;
	left: -2px;
	z-index: -1;
	
	border-radius: inherit;

	background: linear-gradient(to bottom right, rgb(237, 245, 252), rgb(140, 196, 250));
}

</style>
<div class="flex-grow flex flex-col items-center w-full">
	<div class="p-8 text-5xl">About</div>
	<div class="grid grid-cols-6 flex-grow gap-8 p-8 w-full text-lg">
		<div class="col-span-2 bg-gray-100 p-4">
			<div class="text-2xl">
				About Me
			</div>
			<p class="p-2">
				I'm David Haroldsen. I am a Senior in High School and as you can tell, I've done some programming in my time.
			</p>
		</div>
		<div class="col-span-2 bg-gray-100 p-4">
			<div class="text-2xl">
				Languages
			</div>
			<p class="p-2">
				I started programming in 5th grade and have since learned a few languages, including:
			</p>
			<ol class="px-6 py-4 text-base font-IBMPlexMono bg-white">
				<li>&nbsp;1. HTML/CSS/Javascript</li>
				<li>&nbsp;2. Tailwind</li>
				<li>&nbsp;3. Node</li>
				<ol>
					<li>&nbsp;&nbsp;4. Vue</li>
					<li>&nbsp;&nbsp;5. Nuxt</li>
					<li>&nbsp;&nbsp;6. React</li>
					<li>&nbsp;&nbsp;7. Svelte (this site)</li>
				</ol>
				<li>&nbsp;8. PHP: Hypertext Preprocessor</li>
				<li>&nbsp;9. SQL</li>
				<li>10. Python</li>
				<li>11. Java</li>
				<li>12. TI Basic (the best one here)</li>
				<li>13. Scratch (:</li>
				<li>14. git</li>
			</ol>
		</div>
		<div class="col-span-2 bg-gray-100 p-4">
			<div class="text-2xl">
				Experience
			</div>
			<p class="p-2">
				I currently have a job at a small tech company making a web portal for their software. I have been working there for almost two years now.
			</p>
			<p class="p-2">
				I got this site as a Christmas gift way back in 2018, and I would say it's been a gift that keeps on giving.
			</p>
		</div>
	</div>
</div>