<style>
	p, blockquote {
		margin-bottom: 8px;
	}
</style>
<ProgramInfo>
	<h2>Tuition Live Stream</h2>
	<p>This is calculated off the base tuition for 2023-2024.</p>
	<p>If you have a scholarship or something, then good job!</p>
	<p>It only adds up during school time so if it isn't changing that's why.</p>
</ProgramInfo>
<div class="flex flex-col items-center gap-4 px-4" style="padding-top: 80px; padding-bottom: 24px;">
	<div class="thick-black-border w-full p-4" style="max-width: 600px">
		<p class="font-bold">Hey, have you ever wondered...</p>
		<blockquote class="border-l-2 border-black pl-3 ml-1">
			I go to a certain private school, and my parents have to pay some big amount for me to be here, but how much is it really?
		</blockquote>
	</div>
	<div class="flex flex-row items-center justify-between thick-black-border w-full p-4" style="max-width: 600px">
		<div class="font-bold">Short Answer</div>
		<div class="text-2xl">~<span class="font-medium font-IBMPlexMono">${ Math.round(dayPrice) }</span> every day</div>
	</div>
	<div class="flex flex-col items-center thick-black-border w-full p-4" style="max-width: 600px">
		<div class="flex flex-row items-center justify-between w-full">
			<div class="font-bold">Live Stream</div>
		</div>
		<div class="flex flex-row items-center justify-between w-full py-4" style="max-width: 400px">
			<div class="text-lg font-bold">This Year</div>
			<div style="font-size: 42px; line-height: 1;" class="flex flex-row font-medium font-IBMPlexMono">
				{#each { length: yearString.length - 2 } as _, index}
					<CharacterChanger character={yearString.charAt(index)} />
				{/each}
				<span class="inline-block">{yearString.charAt(7)}</span>
				<span class="inline-block">{yearString.charAt(8)}</span>
			</div>
		</div>
		<div class="flex flex-row items-center justify-between w-full py-4" style="max-width: 400px">
			<div class="text-lg font-bold">Today</div>
			<div style="font-size: 42px; line-height: 1;" class="font-IBMPlexMono">
				{#each todayString as _, index}
					<CharacterChanger character={todayString.charAt(index)} />
				{/each}
			</div>
		</div>
	</div>
	<div class="flex flex-col items-center thick-black-border w-full p-4" style="max-width: 600px">
		<div class="flex flex-row items-center justify-between w-full pb-1">
			<div class="font-bold">Tuition Lookup</div>
		</div>
		<div class="flex flex-row items-center justify-between w-full py-4" style="max-width: 400px">
			<div class="text-xl font-bold">1 Hour</div>
			<div class="text-2xl font-medium font-IBMPlexMono">
				${ hourPrice.toFixed(2) }
			</div>
		</div>
		<div class="flex flex-row items-center justify-between w-full py-4" style="max-width: 400px">
			<div class="text-xl font-bold">1 Period</div>
			<div class="text-2xl font-medium font-IBMPlexMono">
				${ periodPrice.toFixed(2) }
			</div>
		</div>
		<div class="flex flex-row items-center justify-between w-full py-4" style="max-width: 400px">
			<div class="text-xl font-bold">1 Game Pigeon Word Hunt</div>
			<div class="text-2xl font-medium font-IBMPlexMono">
				${ wordHuntPrice.toFixed(2) }
			</div>
		</div>
		<div class="flex flex-row items-center justify-between w-full py-4" style="max-width: 400px">
			<div class="text-xl font-bold">Airpods (${ airpodPrice })</div>
			<div class="text-xl">
				{ airpodDays } days worth
			</div>
		</div>
	</div>
</div>
<script lang="ts">
import { onMount, onDestroy } from 'svelte';
import CharacterChanger from "$lib/components/CharacterChanger.svelte";
import ProgramInfo from '$lib/components/ProgramInfo.svelte';

function isSchoolDay(d: Date): boolean {
	if(d.getDay() === 0 || d.getDay() === 6) {
		return false;
	}

	for (let i = 0; i < excludedDays.length; i++) {
		const exclude: string[] = excludedDays[i];

		if(new Date(exclude[0]) <= d && d <= new Date(exclude[1])) {
			return false;
		}
	}

	return true;
}
function countSchoolDays(a: Date, b: Date): number {
  let tempDate: Date = new Date(a);
	let targetDate: Date = new Date(b);

	tempDate.setHours(0, 0, 0, 0);
	targetDate.setHours(0, 0, 0, 0);

	let sum: number = 0;

	while (tempDate < targetDate) {
		if(isSchoolDay(tempDate)) {
			sum++;
		}
		
		tempDate.setDate(tempDate.getDate() + 1);
	}
	
	if(isSchoolDay(tempDate)) {
		sum++;
	}

	return sum;
}

const yearPrice: number = 14250;

const yearStartAndEnd: string[] = ['8/18/2023', '6/7/2024'];
const excludedDays: string[][] = [
	['12/18/2023', '1/5/2024'],
	['4/15/2024', '4/19/2024']
];

let daysInYear: number = countSchoolDays(new Date(yearStartAndEnd[0]), new Date(yearStartAndEnd[1]));

console.log(excludedDays, daysInYear);

const dayPrice: number = yearPrice / daysInYear;

const airpodPrice: number = 169;
const airpodDays: number = Math.ceil(airpodPrice / dayPrice);

const hourPrice: number = dayPrice / 435 * 60;
const periodPrice: number = dayPrice / 9;
const wordHuntPrice: number = dayPrice / 435 * (80 / 60);

let c = 0;

let todayString: string = '';
let yearString: string = '';

function updateLivestream(): void {
	let now: Date = new Date();

	let schoolDayStart = new Date(now);
	schoolDayStart.setHours(7, 45, 0, 0);

	let percentSchoolDay: number = Math.min(Math.max((now.getTime() - schoolDayStart.getTime()) / (1000 * 60 * 435), 0), 1); // 7:45 - 3:00

	let today: number = percentSchoolDay * dayPrice;
	
	if(now < new Date(yearStartAndEnd[0]) || now > new Date(yearStartAndEnd[1])) {
		today = 0;
	}

	let year: number = 0;

	let schoolDays = countSchoolDays(new Date(yearStartAndEnd[0]), new Date());

	year += Math.floor((schoolDays - 1) * dayPrice * 100) / 100;
	year += today;

	todayString = ('$' + (Math.floor(today * 100) / 100).toFixed(2)).padStart(8, ' ');
	yearString = ('$' + year.toFixed(4)).padStart(9, ' ');
}

updateLivestream();

let int: any;

onMount(() => int = setInterval(updateLivestream, 100));
onDestroy(() => clearInterval(int));

</script>