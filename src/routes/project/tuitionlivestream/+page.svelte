<style>
@keyframes money-falling {
	from {
		background-position: 0px 0px;
	}
	to {
		background-position: 0px 399px;
	}
}

p, blockquote {
	margin-bottom: 8px;
}
.cash-money-background {
	background-image: url('/staticimgs/moneybackground.jpg');
	background-repeat: repeat;
	background-size: 400px;
	background-position: 0px 0px;

	animation: money-falling;
	animation-duration: 20s;
	animation-iteration-count: infinite;
	animation-timing-function: linear;
}
</style>
<ProgramInfo>
	<h2>Tuition Live Stream</h2>
	<p>This is calculated off the base tuition for 2023-2024.</p>
	<p>If you have a scholarship or something, then good job!</p>
	<p>The livestream runs during school days from 7:45am to 3pm.</p>
</ProgramInfo>
<div class="cash-money-background flex flex-col items-center gap-4 px-4" style="padding-top: 80px; padding-bottom: 24px;">
	<div class="thick-black-border w-full p-4 bg-white" style="max-width: 600px">
		<p class="font-bold">Hey, have you ever wondered...</p>
		<blockquote class="border-l-2 border-black pl-3 ml-1">
			I go to a certain private school, and my parents have to pay some big amount for me to be here, but how much is it really?
		</blockquote>
	</div>
	<div class="flex flex-row items-center justify-between thick-black-border w-full p-4 bg-white" style="max-width: 600px">
		<div class="font-bold">Answer</div>
		<div class="text-2xl">~<span class="font-medium font-IBMPlexMono">${ Math.round(dayPrice) }</span> every day</div>
	</div>
	<div class="flex flex-col items-center thick-black-border w-full p-4 bg-white" style="max-width: 600px">
		<div class="relative flex flex-row items-center justify-between w-full">
			<div class="font-bold">Live Stream</div>
			<i class="absolute top-0 right-0 text-xs fa-solid fa-circle" style:color={live ? 'red' : '#bbb'}></i>
		</div>
		<div class="flex flex-row items-center justify-between w-full py-4" style="max-width: 400px">
			<div class="text-lg font-bold">This Year</div>
			<div style="font-size: 42px; line-height: 1;" class="font-medium font-IBMPlexMono">
				{#each yearString as _, index}
					<CharacterChanger character={yearString.charAt(index)} />
				{/each}
			</div>
		</div>
		<div class="flex flex-row items-center justify-between w-full py-4" style="max-width: 400px">
			<div class="text-lg font-bold">Today</div>
			<div style="font-size: 42px; line-height: 1;" class="flex flex-row font-IBMPlexMono">
				{#each { length: todayString.length - 2 } as _, index}
					<CharacterChanger character={todayString.charAt(index)} />
				{/each}
				<span class="inline-block">{todayString.charAt(6)}</span>
				<span class="inline-block">{todayString.charAt(7)}</span>
			</div>
		</div>
	</div>
	<div class="flex flex-col items-center thick-black-border w-full p-4 bg-white" style="max-width: 600px">
		<div class="flex flex-row items-center justify-between w-full pb-1">
			<div class="font-bold">Tuition Costs</div>
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
	let yearEnd = new Date(yearStartAndEnd[1]);
	yearEnd.setHours(23, 59);
	
	if(d.getDay() === 0 || d.getDay() === 6 || d < new Date(yearStartAndEnd[0]) || d > yearEnd) {
		return false;
	}

	for (let i = 0; i < excludedDays.length; i++) {
		const exclude: string[] = excludedDays[i];
		
		const excludeDates: Date[] = [new Date(exclude[0]), new Date(exclude[1])];
		excludeDates[1].setHours(23, 59);

		if(excludeDates[0] <= d && d <= excludeDates[1]) {
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

	if(targetDate < tempDate) return 0;

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

const yearStartAndEnd: string[] = ['8/18/2023', '5/24/2024'];
const excludedDays: string[][] = [
	['9/4/2023', '9/4/2023'], // labor day
	['10/6/2023', '10/9/2023'], // step-up day and columbus day
	['10/13/2023', '10/13/2023'], // step-up day
	['10/26/2023', '10/27/2023'], // parent-teacher conferences
	['11/10/2023', '11/10/2023'], // veterans days
	['11/22/2023', '11/24/2023'], // thanksgiving
	['12/18/2023', '1/5/2024'], // exams and christmas break
	['1/15/2024', '1/15/2024'], // martin luther king day
	['2/29/2024', '2/29/2024'], // faculty retreat
	['3/1/2024', '3/1/2024'], // dupage county institute day
	['3/25/2024', '4/1/2024'], // spring break & easter monday
];

let daysInYear: number = countSchoolDays(new Date(yearStartAndEnd[0]), new Date(yearStartAndEnd[1]));

const dayPrice: number = yearPrice / daysInYear;

const airpodPrice: number = 169;
const airpodDays: number = Math.ceil(airpodPrice / dayPrice);

const hourPrice: number = dayPrice / 435 * 60;
const periodPrice: number = dayPrice / 9;
const wordHuntPrice: number = dayPrice / 435 * (80 / 60);

let c = 0;

let todayString: string = '';
let yearString: string = '';

let live: boolean = false;

function updateLivestream(): void {
	let now: Date = new Date();

	let schoolDayStart = new Date(now);
	schoolDayStart.setHours(7, 45, 0, 0);
	let schoolDayEnd = new Date(now);
	schoolDayEnd.setHours(15, 0, 0, 0);

	let percentSchoolDay: number = Math.min(Math.max((now.getTime() - schoolDayStart.getTime()) / (1000 * 60 * 435), 0), 1); // 7:45 - 3:00

	let today: number = percentSchoolDay * dayPrice;
	
	let schoolDay: boolean = isSchoolDay(now);
	
	if(!schoolDay) {
		today = 0;
	}
	
	live = schoolDay && schoolDayStart < now && now < schoolDayEnd;

	let year: number = 0;

	let yesterday = new Date(now);
	yesterday.setDate(yesterday.getDate() - 1);

	let schoolDays = countSchoolDays(new Date(yearStartAndEnd[0]), yesterday);

	year += Math.floor(schoolDays * dayPrice * 100) / 100; // rounded here so that "today" and "year" add cents at the same time
	year += today;

	year = Math.floor(year * 100) / 100;
	today = Math.floor(today * 10000) / 10000;

	yearString = ('$' + year.toFixed(2)).padStart(9, ' ');
	todayString = ('$' + today.toFixed(4)).padStart(8, ' ');
}

updateLivestream();

let int: any;

onMount(() => int = setInterval(updateLivestream, 100));
onDestroy(() => clearInterval(int));

</script>