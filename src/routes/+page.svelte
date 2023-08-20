<style>
.console-welcome {
	flex-direction: column-reverse;
}
@media only screen and (min-width: 768px) {
	.console-welcome {
		flex-direction: row;
	}
}
</style>
<div class="flex flex-col items-center justify-center p-4" style="padding-top: 120px;">
	<div class="console-welcome flex gap-4" style="width: 100%; max-width: 800px;">
		<img src={meImage} alt="meee" class="thick-black-border comic-shadow block self-center" style="height: 400px;" />
		<pre class="flex-grow thick-black-border comic-shadow p-6 text-white bg-neutral-800 font-IBMPlexMono whitespace-pre-wrap" bind:this={typewriterElement}>{@html typewriterText}</pre>
	</div>
</div>
<div class="fixed bottom-4 left-4 flex flex-row items-center gap-4">
	<a href="https://github.com/Davedude42" class="flex flex-row items-center justify-center w-12 h-12 thick-black-border bg-white hover:bg-lighter text-2xl">
		<i class="fa-brands fa-github"></i>
	</a>
	<a href="https://www.instagram.com/davedude.42/" class="flex flex-row items-center justify-center w-12 h-12 thick-black-border bg-white hover:bg-lighter text-2xl">
		<i class="fa-brands fa-instagram"></i>
	</a>
</div>
<script lang="ts">
import { onMount, onDestroy } from 'svelte';
import continentalDivideImage from '$lib/assets/imgs/continentaldivide.jpg';
import greatDayImage from '$lib/assets/imgs/greatday.jpg';

let whichText: number = Math.floor(Math.random() * 2);

let text: string = `
<span style="background-color: dodgerblue; color: black; font-weight: 600;"> Welcome! </span>  
      
You may be wondering...  
 - What is this place?  
 - Why am I here?  
 - Who is this <span style="color: dodgerblue; font-weight: 600;">fine young man</span> ${['standing next to the <a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Continental_Divide_of_the_Americas" class="hover:underline">Continental Divide</a>?', 'wearing a toga while embracing that it\'s a great day to be a redwing?'][whichText]}\u200b\u200b\u200b\u200b\u200b\u200b

To answer all of these questions and more, navigate to the About section.  
  
If you really don't care, skip straight to the Projects section.\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b Up to you.  
`.trim();

let meImage: any = [continentalDivideImage, greatDayImage][whichText];

let typewriterText: string = text;
let typewriterIndex: number = 0;
let typewriterInterval: any;
let typewriterElement: HTMLPreElement;

function type() {
	if(text.charAt(typewriterIndex) == '<') {
		while (text.charAt(typewriterIndex) != '>') {
			typewriterText += text.charAt(typewriterIndex);
			typewriterIndex++;
		}
		typewriterText += text.charAt(typewriterIndex);
		typewriterIndex++;
	}
	typewriterText += text.charAt(typewriterIndex);
	
	typewriterIndex++;

	if(typewriterIndex === text.length) {
		clearInterval(typewriterInterval);
	}
}

onMount(() => {
	typewriterElement.style.height = typewriterElement.offsetHeight + 'px';
	
	typewriterText = '';
	typewriterIndex = 0;

	typewriterInterval = setInterval(type, 30);
});

onDestroy(() => {
	clearInterval(typewriterInterval);
});
</script>