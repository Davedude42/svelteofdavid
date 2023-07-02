<style>
.lightblue-grid {
	display: grid;
	grid-template-columns: 380px;
	grid-template-rows: 100px 1fr 100px;
	justify-content: center;
	gap: 24px;

	padding: 32px;
}

.lightblue-grid > div {
	background-color: white;

	border: 4px solid black;
}
</style>
<div class="flex flex-col md:flex-row justify-evenly bg-neutral-700 min-h-full" style="padding-top: 80px">
	{#if gameStarted}
		<div class="flex flex-row items-center justify-center p-8" bind:this={wrapper}>
			<canvas class="box-content thick-black-border select-none" bind:this={canvas} on:mousedown={mouseDown}></canvas>
		</div>
	{/if}
	<div class="lightblue-grid">
		<div class="flex flex-row justify-between">
			<img src={ thinking } alt="current state of bot" class="px-4 py-2 select-none" class:hidden={!(loading)} />
			<img src={ welcome } alt="current state of bot" class="px-4 py-2 select-none" class:hidden={!(!loading && !showComputerStuff)} />
			<img src={ done } alt="current state of bot" class="px-4 py-2 select-none" class:hidden={!(!loading && showComputerStuff)} />
			{#if gameStarted}
				{#if showComputerStuff}
					<div class="flex flex-col items-end justify-center px-4 font-IBMPlexMono font-medium">
						<p class="font-bold">{ (board.metaData.time / 1000)?.toFixed(2) } seconds</p>
						<p>{ board.metaData.nodes } nodes</p>
						<p>{ (board.metaData.time / board.metaData.nodes)?.toFixed(2) }ms per node</p>
					</div>
				{/if}
			{:else}
				<div class="flex flex-col justify-center px-4 font-IBMPlexMono font-semibold text-center">
					Light Blue welcomes you.
				</div>
			{/if}
		</div>
		<div class="p-8 overflow-auto">
			{#if gameStarted}
				<div>
					{#each notation as note}
						<p>
							{ note }
						</p>
					{/each}
				</div>
			{:else}
				<div class="flex flex-col gap-6 align-stretch">
					<button class="thick-black-border p-2 bg-white hover:bg-gray-100 text-lg font-semibold" on:click={() => startAs(1)}>Start as white</button>
					<button class="thick-black-border p-2 bg-black hover:bg-gray-800 text-lg font-semibold text-white" on:click={() => startAs(0)}>Start as black</button>
				</div>
			{/if}
		</div>
		{#if gameStarted}
			<div class="flex flex-col">
				<div class="flex-grow flex flex-col items-center justify-center text-xl font-IBMPlexMono font-medium">
					{ score >= 0 ? '+' : '-' }{ Math.abs(score / 100)?.toFixed(2) }
				</div>
				<div style="height: 35px" class="flex flex-row bg-black border-t-4 border-black">
					<div style:width={(50 + 7 * Math.sign(score) * Math.pow(Math.abs(score/100), 0.5)) + '%'} class="bg-white"></div>
				</div>
			</div>
		{/if}
	</div>
</div>
<script>
import { onMount, tick } from 'svelte';

import { Board } from '$lib/lightblue/board.ts';
import { startingPosition, letters } from '$lib/lightblue/constants.ts';
import { legalPieceMoves } from '$lib/lightblue/moves.ts';
import { computerMoveBoard } from '$lib/lightblue/computer.ts';

import welcome from '$lib/lightblue/welcome.png';
import pieces from '$lib/lightblue/pieces.png';
import done from '$lib/lightblue/done.png';
import thinking from '$lib/lightblue/thinking.png';

let wrapper;
let canvas;

let ctx;

let boardWidth = 400;

let board = new Board();

let piecesImg;

let playerColor = -1;

let highlightedIndex = -1;
let heldIndex = -1;

let gameStarted = false;
let showComputerStuff = false;
let loading = false;

let pieceMoves = [];

let score = 0;
let notation = [];

board.importString(startingPosition);
board.eval();

function eventX(event) {
	let ret = 0;
	if(event.targetTouches) {
		var bcr = event.target.getBoundingClientRect();
		ret = (event.targetTouches[0].clientX - bcr.x);
	} else {
		ret = event.offsetX;
	}
	return ret;
}
function eventY(event) {
	let ret = 0;
	if(event.targetTouches) {
		var bcr = event.target.getBoundingClientRect();
		ret = event.targetTouches[0].clientY - bcr.y;
	} else {
		ret = event.offsetY;
	}
	return ret;
}


function mouseDown(event) {
	if(!gameStarted || playerColor !== board.turn || loading) {
		return;
	}

	let ex = eventX(event);
	let ey = eventY(event);

	let x = Math.floor(ex / (boardWidth / 8));
	let y = Math.floor(ey / (boardWidth / 8));

	if(playerColor === 0) {
		x = 7 - x;
		y = 7 - y;
	}

	let index = x + y * 8;

	if(highlightedIndex === index) {
		highlightedIndex = -1;
	} else if(board.pieceAtPos(index)[1] !== 0 && board.pieceAtPos(index)[2] === playerColor) {
		highlightedIndex = index;
	} else {
		if(pieceMoves.includes(index)) {
			board.movePiece([highlightedIndex, index]);
			updateScore();

			highlightedIndex = -1;
			
			evalPieceMoves();
			
			possiblyMoveComputer();

			return;
		}
	}

	evalPieceMoves();
	drawBoard();
}

function resizeBoard() {
	let scale = window.devicePixelRatio;

	boardWidth = Math.min(500, wrapper.offsetHeight - 8 - 64);

	ctx.restore();

	canvas.width = boardWidth * scale;
	canvas.height = boardWidth * scale;

	ctx.scale(scale, scale);
	ctx.save();

	canvas.style.width = boardWidth + 'px';
	canvas.style.height = boardWidth + 'px';
}

function drawBoard() {
	let numbersToSprite = [-1, 5, 3, 2, 4, 1, 0];

	let size = boardWidth / 8;

	let imageSize = piecesImg.width / 6;

	let px, py;

	for (let x = 0; x < 8; x++) {
		for (let y = 0; y < 8; y++) {
			px = playerColor === 0 ? 7 - x : x;
			py = playerColor === 0 ? 7 - y : y;

			if(x % 2 === y % 2) {
				if(x + y*8 === highlightedIndex) {
					ctx.fillStyle = '#fde047';
				} else {
					ctx.fillStyle = '#6AB5FF';
				}
			} else {
				if(x + y*8 === highlightedIndex) {
					ctx.fillStyle = '#fef08a';
				} else {
					ctx.fillStyle = 'white';
				}
			}

			ctx.fillRect(px * size, py * size, size, size);

			let p = board.pieceAtPos(x + y * 8);
			
			if(pieceMoves.includes(x + y*8)) {
				ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
				
				if(p[1] === 0) {
					ctx.fillRect((px+0.3) * size, (py+0.3) * size, 0.4*size, 0.4*size);
				} else {
					// sides
					ctx.fillRect((px) * size, (py) * size, 0.1*size, size);
					ctx.fillRect((px+0.9) * size, (py) * size, 0.1*size, size);

					// top and bottom
					ctx.fillRect((px+0.1) * size, (py) * size, 0.8*size, 0.1*size);
					ctx.fillRect((px+0.1) * size, (py+0.9) * size, 0.8*size, 0.1*size);
				}
			}

			ctx.drawImage(piecesImg, numbersToSprite[p[1]] * imageSize, p[2] * imageSize, imageSize, imageSize, px * size, py * size, size, size);
		}
	}
	
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.font = '500 12px IBM Plex Mono';

	for (let x = 0; x < 8; x++) {
		px = playerColor === 0 ? 7 - x : x;
		if(x % 2 !== playerColor) {
			ctx.fillStyle = '#6AB5FF';
		} else {
			ctx.fillStyle = 'white';
		}
		
		ctx.fillText(letters[x], (px+1) * size - 7, 8 * size - 7);
	}
	for (let y = 0; y < 8; y++) {
		py = playerColor === 0 ? 7 - y : y;
		if(y % 2 !== playerColor) {
			ctx.fillStyle = 'white';
		} else {
			ctx.fillStyle = '#6AB5FF';
		}
		
		ctx.fillText(8-y, 6, py * size + 10);
	}
}

function updateScore() {
	score = board.eval();
	notation = board.getNotation();
}

function evalPieceMoves() {
	if(highlightedIndex === -1) {
		pieceMoves = [];
	} else {
		pieceMoves = legalPieceMoves(board, highlightedIndex);
	}
}

async function possiblyMoveComputer() {
	if(board.turn === +!playerColor) {
		drawBoard();
		loading = true;

		await tick();
		
		setTimeout(() => {
			board = computerMoveBoard(board, 4);

			updateScore();

			loading = false;

			showComputerStuff = true;
			
			drawBoard();
		}, 200);
	}
}

function startAs(color) {
	playerColor = color;

	createLightBlue();
}

async function createLightBlue() {
	gameStarted = true;

	await tick();

	ctx = canvas.getContext('2d');

	resizeBoard();
	drawBoard();

	possiblyMoveComputer();
}


onMount(() => {
	piecesImg = new Image();
	piecesImg.src = pieces;
});
</script>