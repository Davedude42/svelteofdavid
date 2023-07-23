<div class="p-24 flex flex-col items-center">
	{ color }
	<input type="color" bind:value={color}>
	<div>
		<canvas bind:this={canvas}></canvas>
	</div>
</div>
<svelte:window on:mousedown={() => mousedown = true} on:mouseup={() => mousedown = false} />
<script lang="ts">
import ioClient from "socket.io-client";
import { onMount } from "svelte";

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

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

let pixelsLocal: number[][] = [];

let color: string = '';

let mousedown: boolean = false;

function drawPixels() {

}

const socket = ioClient();

onMount(() => {
	ctx = canvas.getContext('2d');

	socket.on('pixelsToClient', (msg) => {
		let { pixels } = msg;
		pixelsLocal = pixels;
	});
	socket.on('initial', (msg) => {
		let { pixels, username } = msg;
		pixelsLocal = pixels;
	});
});

function mouseOver(index) {
	if(mousedown) {
		sendChange(index);
	}


}

function sendChange(index) {

	let arrayColor = hexToRgb(color);

	console.log(arrayColor);

	socket.emit("updateToServer", { indeces: [index], color: arrayColor });
}
</script>