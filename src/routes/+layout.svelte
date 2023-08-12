<style>
.lg-nav {
	display: none;

	position: fixed;
	top: 1rem;
	left: 1rem;
	z-index: 40;
	
	flex-direction: row;
	align-items: center;
	gap: 2rem;

	height: 3rem;

	padding-left: 0.5rem;
	padding-right: 1rem;

	@apply bg-primary text-xl font-IBMPlexMono font-medium;
}
@media only screen and (min-width: 768px) {
	.lg-nav {
		display: flex;
	}
}
.sm-nav {
	position: fixed;
	top: 1rem;
	left: 1rem;
	z-index: 40;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	
	width: 3rem;
	height: 3rem;

	transition: width 0.3s 0.3s, height 0.3s;
	overflow: hidden;
	
	@apply bg-primary text-xl font-IBMPlexMono font-medium;
}
@media only screen and (min-width: 768px) {
	.sm-nav {
		display: none;
	}
}

.popoverOpen {

	width: calc(100% - 2rem);
	height: 10rem;

	justify-content: start;
	
	transition: width 0.3s, height 0.3s 0.3s;
}

</style>
<nav class="top-nav lg-nav thick-black-border">
	<a class="flex flex-row items-center cursor-pointer" href="/">
		<img class="inline h-8" src={logo} alt="Amazing little aperature--It's my logo!">
		<span class="pl-2 hover:underline">David Haroldsen</span>
	</a>
	<a class="hover:underline cursor-pointer" href="/about">About</a>
	<a class="hover:underline cursor-pointer" href="/projectList">Projects</a>
</nav>
<div class="top-nav sm-nav nav-button thick-black-border" class:popoverOpen on:click={togglePopover} on:keypress={emptyFunction}>
	{#if !popoverOpen}
		<i class="fa-solid fa-bars nav-button"></i>
	{:else}
		<div class="flex flex-col justify-evenly min-h-[9.5rem] whitespace-nowrap">
			<a class="flex flex-row items-center h-8 mr-10 cursor-pointer" href="/">
				<img class="inline h-8" src={logo} alt="Amazing little aperature--It's my logo!">
				<span class="pl-2 hover:underline">David Haroldsen</span>
			</a>
			<a class="hover:underline cursor-pointer h-8 ml-10" href="/about">About</a>
			<a class="hover:underline cursor-pointer h-8 ml-10" href="/projectList">Projects</a>
		</div>
	{/if}
</div>
<div class="flex flex-col min-h-full-fr">
	<slot />
</div>
<svelte:window
  on:click={tryClosePopover}
/>
<Analytics />
<script lang="ts">
import "../app.css";

import logo from '$lib/assets/imgs/whiteSmallBlack.png';

import { Analytics } from '@vercel/analytics/react';

let popoverOpen = false;

let popoverButton;

function emptyFunction () {}

function togglePopover() {
	popoverOpen = !popoverOpen;
}

function tryClosePopover(e) {
	if(!e.target.closest('.nav-button')) {
		popoverOpen = false;
	}
}
</script>