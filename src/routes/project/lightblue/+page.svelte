<style>

.lightblue-grid {
	flex-shrink: 0;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 100px 1fr 100px;
	justify-content: center;
	gap: 24px;

	width: 100%;

	padding: 32px;
}

@media (min-width: 500px) {
	.lightblue-grid {
		width: 440px;
	}
}

.lightblue-grid > div {
	background-color: white;

	border: 4px solid black;
}

.lightblue-face {
	width: auto;
	height: 100%;
	@apply px-4 py-2;

	user-select: none;
}
.lightblue-message {
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;

	@apply px-4 font-IBMPlexMono font-medium;
}
</style>
<svelte:window on:resize={() => { resizeBoard(); drawBoard(); }} />
<ProgramInfo>
	<h2><span class="bg-lighter">Light Blue</span></h2>
	<p>It's not the best, but it's still better than me.</p>
	<p>I have to compile it into web assembly so it can be super-duper fast.</p>
	<h4>Controls</h4>
	<p>Click on a piece then on a spot and it will move.</p>
</ProgramInfo>
<div class:hidden={!pgnPopupOpen} class="fixed z-40 inset-0 flex flex-col items-center justify-center bg-black/40">
	<div style="width: 500px; height: 400px; max-width: 90%;" class="thick-black-border flex flex-col gap-4 p-4 bg-lighter">
		<div class="flex flex-row justify-between">
			<OutlandishButton elementStyle="width: 150px; padding: 4px;" on:click={copyPGN}>
				Copy
			</OutlandishButton>
			<button class="thick-black-border p-1 bg-red-500 hover:bg-red-400 active:bg-red-300 font-semibold" style="width: 40px; height: 40px;" on:click={() => pgnPopupOpen = false}>
				<i class="fa-solid fa-xmark"></i>
			</button>
		</div>
		<div class="flex-grow p-2">
			<textarea class="w-full h-full p-2 font-IBMPlexMono text-sm font-medium resize-none" bind:value={pgnNotation} bind:this={notationTextarea} />
		</div>
	</div>
</div>
<div class="flex-grow flex flex-col md:flex-row justify-evenly md:max-h-screen bg-neutral-700 overflow-hidden" style="padding-top: 80px">
	{#if gameStarted}
		<div class="flex-grow lg:flex-grow-0 flex-shrink flex flex-row items-center justify-center max-w-full max-h-full px-8 overflow-hidden" bind:this={wrapper}>
			<canvas class="box-content thick-black-border select-none" bind:this={canvas} on:mousedown={mouseDown}></canvas>
		</div>
	{/if}
	<div class="lightblue-grid self-center md:self-stretch">
		<div class="flex flex-row justify-between">
			<img src={ thinking } alt="current state of bot" class="lightblue-face" class:hidden={!(loading)} />
			<img src={ welcome } alt="current state of bot" class="lightblue-face" class:hidden={!(!loading && !showComputerStuff)} />
			<img src={ done } alt="current state of bot" class="lightblue-face" class:hidden={!(!loading && showComputerStuff)} />
			{#if gameStarted}
				{#if showComputerStuff}
					<div class="lightblue-message items-end">
						<p class="font-bold">{ (board.metaData.time / 1000)?.toFixed(2) } seconds</p>
						<p>{ board.metaData.nodes } nodes</p>
						<p>{ (board.metaData.time / board.metaData.nodes)?.toFixed(2) }ms per node</p>
					</div>
				{:else if !loading}
					<div class="lightblue-message items-center text-center">
						Start us off.
					</div>
				{/if}
			{:else}
				<div class="lightblue-message items-center text-center">
					Light Blue welcomes you.
				</div>
			{/if}
		</div>
		{#if gameStarted} 
			<div class="grid grid-cols-2 overflow-hidden" style="min-height: 300px;">
				<div class="flex flex-col gap-4 p-4">
					{#if gameOver} 
						<div class="p-2 font-IBMPlexMono bg-primary font-semibold text-center text-xl">
							{#if draw} 
								Draw!
							{:else}
								{ checkmateColor === playerColor ? 'I' : 'You' } won!
							{/if}
						</div>
					{/if}
					<div class="flex-grow"></div>
					<OutlandishButton on:click={openPGN}>
						Copy Notation
					</OutlandishButton>
					<OutlandishButton on:click={restart}>
						Leave Game
					</OutlandishButton>
				</div>
				<div class="grid grid-cols-2 gap-y-2 p-2 content-start items-start justify-items-start font-IBMPlexMono overflow-y-scroll" bind:this={notationScroll}>
					{#each notation as note}
						<div class="px-1 bg-secondary/50 font-bold">
							{ note }
						</div>
					{/each}
				</div>
			</div>
		{:else}
			<div class="flex flex-col p-8 gap-6 align-stretch">
				<OutlandishButton elementClass="text-lg" on:click={() => startAs(1)}>Start as white</OutlandishButton>
				<OutlandishButton elementClass="text-lg !bg-black text-white hover:text-lighter" on:click={() => startAs(0)}>Start as black</OutlandishButton>
			</div>
		{/if}
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

import OutlandishButton from '$lib/components/OutlandishButton.svelte';
import ProgramInfo from '$lib/components/ProgramInfo.svelte';

import { Board } from '$lib/lightblue/board.ts';
import { KING, startingPosition, letters } from '$lib/lightblue/constants.ts';
import { legalPieceMoves } from '$lib/lightblue/moves.ts';
import { computerMoveBoard } from '$lib/lightblue/computer.ts';

import welcome from '$lib/lightblue/welcome.png';
import pieces from '$lib/lightblue/pieces.png';
import done from '$lib/lightblue/done.png';
import thinking from '$lib/lightblue/thinking.png';

let notationTextarea;
let notationScroll;
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
let gameOver = false;

let checkIndex = -1;
let checkmateColor = -1;
let draw = false;

let pieceMoves = [];

let score = 0;
let notation = [];

let pgnPopupOpen = false;
let pgnNotation = '';

function copyPGN() {
	notationTextarea.select();
  navigator.clipboard.writeText(pgnNotation);
}

function openPGN() {
	pgnPopupOpen = true;
	pgnNotation = getPGNNotation();
}

function getPGNNotation() {
		let now = new Date();
		let whiteGameOver = board.gameOver(1);
		let blackGameOver = board.gameOver(0);
		let stringResult = '*';

		if(whiteGameOver === -1 || blackGameOver === -1) {
			stringResult = '1/2-1/2';
		} else if(whiteGameOver === 1) {
			stringResult = '0-1';
		} else if(blackGameOver === 1) {
			stringResult = '1-0';
		}

		let ret = `[Event "Light Blue vs. Human"]
[Site "davidharoldsen.com"]
[Date "${now.getFullYear()}.${now.getMonth()<10 ? '0' + now.getMonth() : now.getMonth()}.${now.getDate()<10 ? '0' + now.getDate() : now.getDate()}"]
[Round "1"]
[White "${playerColor === 0 ? 'Light Blue' : 'Player'}"]
[Black "${playerColor === 1 ? 'Light Blue' : 'Player'}"]
[Result "${stringResult}"]

`;

		let notation = board.getNotation();

		for (let i = 0; i < notation.length; i++) {
			if(i % 2 === 0) {
				ret += Math.floor(i / 2 + 1) + '. ';
			}
			ret += notation[i] + ' ';
		}
		ret += stringResult;
		return ret;
	}

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
	if(!gameStarted || playerColor !== board.turn || loading || gameOver) {
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

			afterMove();

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

	let width = Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );

	if(width > 1024) {
		boardWidth = Math.min(500, Math.min(wrapper.offsetHeight - 8 - 64));
	} else if(width > 768) {
		boardWidth = Math.min(500, Math.min(wrapper.offsetWidth - 8 - 64, wrapper.offsetHeight - 8 - 64));
	} else {
		boardWidth = Math.min(500, Math.min(wrapper.offsetWidth - 8 - 64));
	}
	

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

	let pastMove = board.history[board.history.length - 1] ?? [];

	for (let x = 0; x < 8; x++) {
		for (let y = 0; y < 8; y++) {
			px = playerColor === 0 ? 7 - x : x;
			py = playerColor === 0 ? 7 - y : y;

			if(x % 2 === y % 2) {
				if(x + y*8 === highlightedIndex || pastMove.includes(x + y*8)) {
					ctx.fillStyle = '#fef08a';
				} else if(x + y*8 === checkIndex) {
					ctx.fillStyle = '#fca5a5';
				} else {
					ctx.fillStyle = 'white';
				}
			} else {
				if(x + y*8 === highlightedIndex || pastMove.includes(x + y*8)) {
					ctx.fillStyle = '#fde047';
				} else if(x + y*8 === checkIndex) {
					ctx.fillStyle = '#f87171';
				} else {
					ctx.fillStyle = '#6AB5FF';
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
		}
	}
	
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.font = '500 ' + (size / 5) + 'px IBM Plex Mono';

	for (let x = 0; x < 8; x++) {
		px = playerColor === 0 ? 7 - x : x;
		if(x % 2 !== playerColor) {
			ctx.fillStyle = 'white';
		} else {
			ctx.fillStyle = '#6AB5FF';
		}
		
		ctx.fillText(letters[x], (px+1-0.12) * size, 7.88 * size);
	}
	for (let y = 0; y < 8; y++) {
		py = playerColor === 0 ? 7 - y : y;
		if(y % 2 !== playerColor) {
			ctx.fillStyle = '#6AB5FF';
		} else {
			ctx.fillStyle = 'white';
		}
		
		ctx.fillText(8-y, 0.11 * size, (py+0.15) * size);
	}

	for (let x = 0; x < 8; x++) {
		for (let y = 0; y < 8; y++) {
			px = playerColor === 0 ? 7 - x : x;
			py = playerColor === 0 ? 7 - y : y;

			let p = board.pieceAtPos(x + y * 8);

			ctx.drawImage(piecesImg, numbersToSprite[p[1]] * imageSize, p[2] * imageSize, imageSize, imageSize, (px+0.02) * size, (py+0.02) * size, 0.96*size, 0.96*size);
		}
	}
}

async function afterMove() {
	score = board.eval();
	notation = board.getNotation();

	let gameOver0 = board.gameOver(0);
	let gameOver1 = board.gameOver(1);

	if(gameOver0 === 1) {
		gameOver = true;
		checkmateColor = 0;
	} else if(gameOver1 === 1) {
		gameOver = true;
		checkmateColor = 1;
	} else if(gameOver0 === -1) {
		gameOver = true;
		draw = true;
	}

	if(board.inCheck(0)) {
		checkIndex = board.findPiece(KING, 0)[0];
	} else if (board.inCheck(1)) {
		checkIndex = board.findPiece(KING, 1)[0];
	} else {
		checkIndex = -1;
	}
	
	await tick();

	notationScroll.scrollBy(0, 1000);
}

function evalPieceMoves() {
	if(highlightedIndex === -1) {
		pieceMoves = [];
	} else {
		pieceMoves = legalPieceMoves(board, highlightedIndex);
	}
}

async function possiblyMoveComputer() {
	if(board.turn === +!playerColor && !gameOver) {
		drawBoard();
		loading = true;

		await tick();
		
		setTimeout(() => {
			board = computerMoveBoard(board, 4);

			afterMove();

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

function restart() {
	gameStarted = false;
	showComputerStuff = false;
	loading = false;
	gameOver = false;

	highlightedIndex = -1;
}

async function createLightBlue() {
	gameStarted = true;

	board = new Board();
	board.importString(startingPosition);
	board.eval();

	score = 0;
	notation = [];

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