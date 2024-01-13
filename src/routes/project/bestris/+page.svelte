<style>
	.bestris-bg {
		background: rgb(70,67,254);
		background: radial-gradient(circle, rgba(70,67,254,1) 36%, rgba(250,55,184,1) 100%);
	}
	.bestris-bg:hover {
		background: rgb(70,67,254);
	}
	.bestris-bg:active {
		transform: translate(4px, 4px);

		box-shadow: none;
	}
</style>
<div style="padding-top: 80px;" class="flex flex-col sm:flex-row gap-x-16 gap-y-8 p-8 justify-center items-center">
	<div class="flex-shrink-0 flex flex-row sm:flex-col self-stretch justify-center gap-4">
		<img src={bestrisIcon} class="thick-black-border rounded-full" style="width: 12rem; height: 12rem;" alt="bestris icon" />
		<img src={bestris} class="thick-black-border rounded-full" style="width: 12rem; height: 12rem;" alt="demo of bestris" />
	</div>
	<div class="flex flex-col self-start gap-8">
		<article class="thick-black-border w-full p-4" style="max-width: 500px;">
			<p class="pb-4">
				This is <span class="font-bold">Bestris</span>.
			</p>
			<p>
				It is my game for the Samsung watch, and it currently has over <span class="font-bold">23,000 downloads</span> on the Galaxy Store.
			</p>
		</article>
		<article class="thick-black-border w-full p-4" style="max-width: 500px;">
			<p class="pb-4">
				It all started back in 2021. I was looking for games for my Samsung watch and noticed that most of them were garbage. So I decided to make one myself.
			</p>
			<p>
				If you have a Samsung watch, then you should buy it. If you don't have a Samsung watch, then <span class="font-semibold">you should buy a Samsung watch so you can buy it</span>.
			</p>
		</article>
		<a class="thick-black-border w-full p-3 comic-shadow bestris-bg text-white text-center text-xl font-bold" style="max-width: 500px;" href="https://galaxy.store/bestris1">
			Bestris on the Galaxy Store
		</a>
	</div>
</div>
<script>
import bestrisIcon from '$lib/assets/imgs/projects/bestris.jpg';
import bestris from '$lib/assets/imgs/bestrisimgs/Capture2-2.png';

</script>