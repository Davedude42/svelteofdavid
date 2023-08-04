<style>
.fullscreen-canvas {
	position: fixed;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;

	background-color: #cbeaf7;
}

.settings-box {
	position: fixed;
	bottom: 16px;
	left: 16px;
	z-index: 10;

	display: flex;
	flex-direction: column;

	width: 280px;
	border: 4px solid black;
	padding: 4px;

	background-color: white;

	font-weight: 600;
}

.flex-items-center {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 5px;

	padding: 3px 5px;
}

.label {
	width: 65px;
}
.range {
	width: 120px;
}

.settings-box input {
	border: 1px solid gray;

	padding: 0 4px;
}
.settings-box input[type=text]:focus {
	outline: 1px solid black;
}
</style>
<div class="settings-box">
	<div class="flex-items-center">
		<div class="label">Gravity</div>
		<input type="range" min="0" max="5" step="0.1" bind:value={G} class="range">
		<span>{ G }</span>
	</div>
	<div class="flex-items-center">
		<div class="label">Mass</div>
		<input type="range" min="-10" max="100" on:input={updateMassRange} value={Math.sign(mass) * Math.sqrt(Math.abs(mass))} class="range">
		<input style="flex-grow: 1; width: 0px;" type="text" on:input={updateMass} value={mass}>
	</div>
	<label class="flex-items-center">
		<input type="checkbox" bind:checked={orbit} /> Place Orbits
	</label>
	<label class="flex-items-center">
		<input type="checkbox" bind:checked={bodyGravity} /> Body Gravity
	</label>
	<label class="flex-items-center">
		<input type="checkbox" bind:checked={universalGravity} /> Universal Gravity
	</label>
	<label class="flex-items-center">
		<input type="checkbox" bind:checked={boundries} /> Boundries
	</label>
</div>
<canvas id="ball" class="fullscreen-canvas" bind:this={canvas} on:mousemove={mousemove} on:mousedown={mousedown} on:mouseup={mouseup}></canvas>
<script>
import { onMount } from "svelte";

let width = 100;
let height = 100;

let canvas;
let ctx;


//canvas.style.width = width + 'px';
//canvas.style.height = height + 'px';

let mass = 64;

function updateMassRange(event) {
	mass = Math.sign(event.target.value) * Math.floor(event.target.value*event.target.value);
}
function updateMass(event) {
	let old = mass;

	mass = +event.target.value;

	if(isNaN(mass)) {
		mass = old;
	}
}

let startX = -1;
let startY = -1;

let mouseX = -1;
let mouseY = -1;

let orbit = false;
let bodyGravity = true;
let universalGravity = false;
let boundries = false;

function mousedown(event) {
	let mouseX = event.offsetX;
	let mouseY = event.offsetY;

	startX = mouseX;
	startY = mouseY;
}
function mousemove(event) {
	mouseX = event.offsetX;
	mouseY = event.offsetY;

	draw();
}
function mouseup(event) {
	mouseX = event.offsetX;
	mouseY = event.offsetY;

	let newcircle = new Circle(orbit ? mouseX : startX, orbit ? mouseY : startY, 0, 0, mass);

	circles.push(newcircle);

	if(orbit) {
		let closestBody = newcircle.findMainInfluence(circles);

		if(closestBody !== null)
			newcircle.orbitMe(closestBody);
	} else {
		newcircle.vx = -(mouseX - startX) / 20;
		newcircle.vy = -(mouseY - startY) / 20;
	}

	startX = -1;
	startY = -1;

	draw();
}

let MIN_BALL_SIZE = 5;

let ELAS = 0.93;
let FRIC = 0.99;

let G = 1;

let circles = [];

class Circle {
	constructor(x, y, vx, vy, m) {
		this.x = x;
		this.y = y;

		this.vx = vx;
		this.vy = vy;

		this.r = Math.max(MIN_BALL_SIZE, Math.sqrt(Math.abs(m)));
		this.m = m;
	}
	isColliding(other) {
		return Math.sqrt((this.x-other.x)**2 + (this.y-other.y)**2) < this.r + other.r;
	}
	collide(other) {
		let diffx = this.x - other.x;
		let diffy = this.y - other.y;

		let diffScale = Math.sqrt(diffx*diffx + diffy*diffy);

		if(diffScale === 0) {
			diffx = 0;
			diffy = -1;
		} else {
			diffx /= diffScale;
			diffy /= diffScale;
		}

		let v1 = diffx * this.vx + diffy * this.vy;   // dot product of diff and velocity 1
		let v2 = diffx * other.vx + diffy * other.vy; // dot product of diff and velocity 2

		let nv1;
		let nv2;

		let m1 = Math.abs(this.m);
		let m2 = Math.abs(other.m);

		if(this.m === 0 && other.m === 0) {
			nv1 = v2;
			nv2 = v1;
		} else {
			nv1 = (ELAS*m2*(v2 - v1) + m1*v1 + m2*v2) / (m1 + m2);
			nv2 = (ELAS*m1*(v1 - v2) + m1*v1 + m2*v2) / (m1 + m2);
		}

		let norx = diffy;
		let nory = -diffx;

		let norv1 = FRIC*(norx * this.vx + nory * this.vy);
		let norv2 = FRIC*(norx * other.vx + nory * other.vy);

		this.vx = diffx * nv1 + norx * norv1;
		this.vy = diffy * nv1 + nory * norv1;

		other.vx = diffx * nv2 + norx * norv2;
		other.vy = diffy * nv2 + nory * norv2;

		/*let damount1 = -v1 / (Math.abs(v1) + Math.abs(v2));
		let damount2 = -v2 / (Math.abs(v1) + Math.abs(v2));*/

		//console.log(v1, v2, damount1, damount2);

		this.x += /*damount1 **/ diffx * ((this.r + other.r) - diffScale);
		this.y += /*damount1 **/ diffy * ((this.r + other.r) - diffScale);
		
		//other.x += damount2 * diffx * ((this.r + other.r) - diffScale);
		//other.y += damount2 * diffy * ((this.r + other.r) - diffScale);

		if(isNaN(this.vx) || isNaN(this.vy) || isNaN(other.vx) || isNaN(other.vy)) {
			console.log(v1, v2, nv1, nv2, this, other);
		}
	}
	move(dt) {
		this.x += this.vx * dt;
		this.y += this.vy * dt;
	}
	boundries() {
		if(this.x < this.r) {
			this.x = this.r;
			this.vx *= -ELAS;
			this.vy *= ELAS;
		}
		if(this.x > width - this.r) {
			this.x = width - this.r;
			this.vx *= -ELAS;
			this.vy *= ELAS;
		}
		if(this.y < this.r) {
			this.y = this.r;
			this.vx *= ELAS;
			this.vy *= -ELAS;
		}
		if(this.y > height - this.r) {
			this.y = height - this.r;
			this.vx *= ELAS;
			this.vy *= -ELAS;
		}
	}
	speed() {
		return Math.sqrt(this.vx*this.vx + this.vy*this.vy);
	}
	momentum() {
		return this.speed() * this.m;
	}
	gravity(other, dt) {
		if(this.distanceTo(other) !== 0) {
			let diffx = this.x - other.x;
			let diffy = this.y - other.y;

			let diffScale = Math.sqrt(diffx*diffx + diffy*diffy);

			diffx /= diffScale;
			diffy /= diffScale;

			let gravity = G * other.m / (diffScale * diffScale);

			let gx = -diffx * gravity;
			let gy = -diffy * gravity;

			this.vx += gx * dt;
			this.vy += gy * dt;
		}
	}
	distanceTo(other) {
		return Math.sqrt((this.x-other.x)**2 + (this.y-other.y)**2);
	}
	orbitMe(other) {
		if(this.distanceTo(other) !== 0) {
			let velocity = Math.sqrt(G * other.m / this.distanceTo(other));
			let diffx = this.x - other.x;
			let diffy = this.y - other.y;

			let diffScale = Math.sqrt(diffx*diffx + diffy*diffy);

			diffx /= diffScale;
			diffy /= diffScale;

			let norx = diffy;
			let nory = -diffx;

			norx *= velocity;
			nory *= velocity;

			this.vx = norx;
			this.vy = nory;
		}
	}
	findMainInfluence(list) {
		let closestBody = new Circle(0, 0, 0, 0, 0);
		for (let i = 0; i < list.length; i++) {
			if(list[i].m / ((list[i].x-mouseX)**2 + (list[i].y-mouseY)**2) > closestBody.m / ((closestBody.x-mouseX)**2 + (closestBody.y-mouseY)**2) && circles[i] != this) {
				closestBody = list[i];
			}
		}
		if(closestBody.m === 0) {
			return null;
		} else {
			return closestBody;
		}
	}
}


function draw() {
	ctx.clearRect(0, 0, width, height);

	if(startX != -1) {
		ctx.strokeStyle = 'red';
		ctx.lineWidth = 1;

		if(orbit) {
			let closestBody = (new Circle(mouseX, mouseY, 0, 0, 1)).findMainInfluence(circles);

			if(closestBody !== null) {
				ctx.beginPath();
				ctx.arc(closestBody.x, closestBody.y, Math.sqrt((closestBody.x-mouseX)**2 + (closestBody.y-mouseY)**2), 0, 2*Math.PI);
				ctx.stroke();
			}

			ctx.strokeStyle = 'gray';
			
			ctx.beginPath();
			ctx.arc(mouseX, mouseY, Math.max(MIN_BALL_SIZE, Math.sqrt(Math.abs(mass))), 0, Math.PI*2);
			ctx.stroke();
		} else {
			ctx.beginPath();
			ctx.moveTo(startX, startY);
			ctx.lineTo(mouseX, mouseY);
			ctx.stroke();

			ctx.strokeStyle = 'gray';

			ctx.beginPath();
			ctx.arc(startX, startY, Math.max(MIN_BALL_SIZE, Math.sqrt(Math.abs(mass))), 0, Math.PI*2);
			ctx.stroke();
		}
	}

	ctx.strokeStyle = 'black';
	ctx.lineWidth = 2;

	for (let i = 0; i < circles.length; i++) {
		const circle = circles[i];
		
		ctx.beginPath();
		ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI*2);
		ctx.stroke();

		if(circle.m === 0) {
			ctx.fillStyle = 'rgba(250, 248, 212)';
		} else if(circle.m < 0) {
			ctx.fillStyle = 'rgba(236, 212, 250)';
		} else {
			ctx.fillStyle = 'white';
		}
		ctx.fill();
	}
	ctx.fillStyle = 'black';
	ctx.font = '16px Arial';
	ctx.textAlign = 'right';
	ctx.fillText(FPS, width - 10, 20);

	if(circles.length === 0) {
		ctx.fillStyle = '#00000077';
		ctx.textAlign = 'center';
		ctx.font = '24px Arial';
		ctx.fillText('Click to place circles to smash', width/2, height/2);

		ctx.font = '18px Arial';
		ctx.fillText('Drag back to shoot the circles', width/2, height/2 + 30);
	}
}
let time = performance.now();
let FPS = 50;
let frame = 0;
let dt = 1;

let int;

onMount(() => {
	ctx = canvas.getContext('2d');
	
	width = Math.round(canvas.offsetWidth);
	height = Math.round(canvas.offsetHeight);

	let dpi = window.devicePixelRatio;
	canvas.width = width * dpi;
	canvas.height = height * dpi;

	ctx.scale(dpi, dpi);


	int = setInterval(() => {

		let timenow = performance.now();
		
		dt = (timenow - time) / 20;

		if(frame % 10 === 0)
			FPS = Math.round(1000 / (timenow - time));

		time = timenow;

		for (let i = 0; i < circles.length; i++) {
			const circle = circles[i];

			circle.move(dt);

			for(let j = 0; j < circles.length; j++) {
				const othercircle = circles[j];
				if(i !== j) {
					if(circle.isColliding(othercircle)) {
						circle.collide(othercircle);
					}

					if(bodyGravity)
						circle.gravity(othercircle, dt);
				}
			}

			if(universalGravity)
				circle.vy += G * 0.04 * dt;

			if(boundries)
				circle.boundries();
		}

		frame++;

		draw();
	}, 20);
});
</script>