<div class="flex-grow flex flex-col items-center p-4 bg-neutral-700" style="padding-top: 80px;" on:mousedown={onmousedown} on:mouseup={onmouseup}>
	<div class="flex-grow flex flex-col items-center justify-center w-full h-full" bind:this={container}>
		<canvas bind:this={canvas} on:mousemove={onmousemove}></canvas>
	</div>
	<input type="color" bind:value={color} class="fixed top-4 right-4">
</div>
<svelte:window on:mousedown={() => mousedown = true} on:mouseup={() => mousedown = false} />
<script lang="ts">
import ioClient from "socket.io-client";
import { onMount } from "svelte";

const WALLS: number[] = [110, 106, 109, 107];

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
function rgbToString(rgb: number[]): string {
	return `rgb(${rgb.join(',')})`;
}
function hexToRgb(hex: string): number[] {
  // Remove the # character if present
  hex = hex.replace("#", "");

  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  if (hex.length === 3) {
    hex = hex.replace(/(.)/g, "$1$1");
  }

  // Verify if the input is a valid hexadecimal color code
  const validHexRegex = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

  if (!validHexRegex.test(hex)) {
    throw new Error("Invalid Hexadecimal Color Code.");
  }

  // Convert the hex value to decimal
  const [r, g, b] = hex.match(/[A-Fa-f0-9]{2}/g).map((value) => parseInt(value, 16));

  return [r, g, b];
};

let container: HTMLDivElement;
let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

let canvasWidth: number;
let canvasHeight: number;

let pixelDepth: number = 20;

let pixelsLocal: number[][] = [];

let color: string = '#ff0000';

let mousedown: boolean = false;
let mouseindex: number = -1;

function drawPixels() {
	ctx.fillStyle = 'rgb(40, 40, 40)';
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);

	if(pixelsLocal.length === 0) {
		return false;
	}
	let pixelWidth0 = (canvasWidth - pixelDepth*2) / (WALLS[0] - 1);
	let pixelWidth1 = (canvasWidth - pixelDepth*2) / (WALLS[1] - 1);
	let pixelWidth2 = (canvasWidth - pixelDepth*2) / (WALLS[2] - 1);
	let pixelWidth3 = (canvasWidth - pixelDepth*2) / (WALLS[3] - 1);

	ctx.fillStyle = rgbToString(pixelsLocal[0]);
	ctx.fillRect(0, 0, pixelDepth, pixelDepth);

	let pixelIndex = 0;

	for (let i = 0; i < WALLS.reduce((a, b) => a + b, 0); i++) {
		ctx.fillStyle = rgbToString(pixelsLocal[i]);
		if(i < WALLS[0]) {
			let walli = i;
			if(walli === 0) ctx.fillRect(0, 0, pixelDepth, pixelDepth);
			else ctx.fillRect(pixelDepth + (walli - 1) * pixelWidth0, 0, pixelWidth0, pixelDepth);
		} else if(i < WALLS[0] + WALLS[1]) {
			let walli = i - WALLS[0];
			if(walli === 0) ctx.fillRect(canvasWidth - pixelDepth, 0, pixelDepth, pixelDepth);
			else ctx.fillRect(canvasWidth - pixelDepth, pixelDepth + (walli - 1) * pixelWidth1, pixelDepth, pixelWidth1);
		} else if(i < WALLS[0] + WALLS[1] + WALLS[2]) {
			let walli = i - WALLS[0] - WALLS[1];
			if(walli === 0) ctx.fillRect(canvasWidth - pixelDepth, canvasHeight - pixelDepth, pixelDepth, pixelDepth);
			else ctx.fillRect(canvasWidth - (pixelDepth + (walli - 1) * pixelWidth2) - pixelWidth2, canvasHeight - pixelDepth, pixelWidth2, pixelDepth);
		} else if(i < WALLS[0] + WALLS[1] + WALLS[2] + WALLS[3]) {
			let walli = i - WALLS[0] - WALLS[1] - WALLS[2];
			if(walli === 0) ctx.fillRect(0, canvasHeight - pixelDepth, pixelDepth, pixelDepth);
			else ctx.fillRect(0, canvasWidth - (pixelDepth + (walli - 1) * pixelWidth3) - pixelWidth3, pixelDepth, pixelWidth3);
		}
	}
	ctx.fillStyle = 'rgb(120, 120, 120)';
	ctx.font = (canvasWidth / 30) + 'px Arial';
	ctx.textAlign = 'left';
	ctx.fillText('DOOR', pixelDepth + pixelWidth0 * WALLS[0]*3/4, pixelDepth + canvasWidth / 20);
	ctx.fillText('WINDOW', pixelDepth + pixelWidth2 * WALLS[0]*1/8, canvasHeight - (pixelDepth + canvasWidth / 50));
	
	ctx.textAlign = 'center';
	ctx.fillText('UNDER CONSTRUCTION', canvasWidth / 2, canvasHeight / 2);
	ctx.fillText('Please mind our dust.', canvasWidth / 2, canvasHeight / 2 + 30);
}

const socket = ioClient();

function onmousedown(event) {
	mousedown = true;

	onmousemove(event);
}
function onmouseup() {
	mousedown = false;
}

function onmousemove(event) {
	if(!mousedown) {
		mouseindex = -1;
		return;
	}

	let x = eventX(event);
	let y = eventY(event);

	let indexToChange: number = -1;

	let pixelWidth0 = (canvasWidth - pixelDepth*2) / (WALLS[0] - 1);
	let pixelWidth1 = (canvasWidth - pixelDepth*2) / (WALLS[1] - 1);
	let pixelWidth2 = (canvasWidth - pixelDepth*2) / (WALLS[2] - 1);
	let pixelWidth3 = (canvasWidth - pixelDepth*2) / (WALLS[3] - 1);

	if(y < pixelDepth) {
		if(x < pixelDepth) indexToChange = 0;
		else if(x < canvasWidth - pixelDepth) indexToChange = 1 + Math.floor((x - pixelDepth) / pixelWidth0);
		else indexToChange = WALLS[0];
	} else if(y >= canvasHeight - pixelDepth) {
		if(x >= canvasWidth - pixelDepth) indexToChange = WALLS[0] + WALLS[1];
		else if(x > pixelDepth) indexToChange = WALLS[0] + WALLS[1] + 1 + Math.floor(((canvasWidth - x) - pixelDepth) / pixelWidth2);
		else indexToChange = WALLS[0] + WALLS[1] + WALLS[2];
	} else if(x >= canvasWidth - pixelDepth) {
		indexToChange = WALLS[0] + 1 + Math.floor((y - pixelDepth) / pixelWidth1);
	} else if(x < pixelDepth) {
		indexToChange = WALLS[0] + WALLS[1] + WALLS[2] + 1 + Math.floor(((canvasHeight - y) - pixelDepth) / pixelWidth3);
	}

	if(indexToChange !== -1 && mouseindex !== indexToChange) {
		sendChange(indexToChange);
	}

	mouseindex = indexToChange;
}

function resizeCanvas() {
	let dpi: number = window.devicePixelRatio;
	let smallerDim: number = Math.min(container.offsetWidth, container.offsetHeight);

	canvasWidth = smallerDim;
	canvasHeight = smallerDim;

	canvas.width = canvasWidth * dpi;
	canvas.height = canvasHeight * dpi;

	canvas.style.width = canvasWidth + 'px';
	canvas.style.height = canvasHeight + 'px';

	ctx.scale(dpi, dpi);
}

function sendChange(index) {

	let arrayColor = hexToRgb(color);

	socket.emit("updateToServer", { indeces: [index], color: arrayColor });
}

onMount(() => {
	ctx = canvas.getContext('2d');

	resizeCanvas();
	drawPixels();

	socket.on('pixelsToClient', (msg) => {
		let { pixels } = msg;
		pixelsLocal = pixels;

		console.log('client update!');

		drawPixels();
	});
	socket.on('initial', (msg) => {
		let { pixels, username } = msg;
		pixelsLocal = pixels;

		drawPixels();
	});
});
</script>