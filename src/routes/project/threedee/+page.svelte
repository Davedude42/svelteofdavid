<style>
	#3d {border: 1px solid black; background-color: black;}
	body {
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
		line-height: 1.5;
		text-align: center;
	}
</style>
<ProgramInfo>
	<h2>Homemade 3D Renderer</h2>
	<p>Who needs Three.js?? Not me!!<br>Not since I made this back in 8th grade.</p>
	<p>When I first made this, I wrote<br>"Next step, Minecraft."<br>I wonder what the next step is.</p>
</ProgramInfo>
<div class="flex flex-col items-center" style="padding-top: 80px;">
	<canvas id="3d" bind:this={can}></canvas>
	<div class="p-4">
		<input type="range" min="20" max="500" bind:value={perspect}> perspective<br>
		<input type="range" min="-50" max="50" bind:value={camx}> x<br>
		<input type="range" min="-50" max="50" bind:value={camy}> y<br>
		<input type="range" min="-400" max="400" bind:value={camz}> z<br>
	</div>
</div>
<script>
import { onMount } from "svelte";
import ProgramInfo from '$lib/components/ProgramInfo.svelte';

var can;
var ctx;
var perspect = 300;
var x = 0;
var y = 0;
var z = 0;
var camint;
var camx = 8;
var camy = -10;
var camz = 220;
var camrx = 0;
var camry = 0;
var camrz = 0;
var frame = 0;

onMount(() => {
	ctx = can.getContext('2d');
	can.width = 400;
	can.height = 400;

	setInterval(function () {
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, can.width, can.height);
		frame++;
		ctx.lineWidth = "2";
		for (var i = 0; i < items.length; i++) {
			items[i].color = 'white'//'hsl(' + items[i].getCenter()[2] * 5 + ', 100%, 50%)';
			if(i == 1) {
				items[i].rotateY(1);
			}

			items[i].render();
		}
		
	}, 50);
});

function projectDot(dot) {
	let scale = perspect / (perspect + (dot[2] - camz));
	return [(dot[0] - camx) * scale + can.width / 2, (dot[1] - camy) * scale + can.height / 2];
}
function average(p1, p2) {
	return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2, (p1[2] + p2[2]) / 2];
}
function rotate(d, cx, cy, cz, rx, ry, rz) {
	let dot = d;
	let angle = Math.atan2(dot[2] - cz, dot[0] - cx) + ry / Math.PI * 180;
	let dis = Math.sqrt((dot[2] - cz) * (dot[2] - cz) + (dot[0] - cx) * (dot[0] - cx));
	dot[2] = cz - Math.sin(angle) * dis;
	dot[0] = cx - Math.cos(angle) * dis;

	angle = Math.atan2(dot[1] - cy, dot[0] - cx) + rz / Math.PI * 180;
	dis = Math.sqrt((dot[1] - cy) * (dot[1] - cy) + (dot[0] - cx) * (dot[0] - cx));
	dot[1] = cy - Math.sin(angle) * dis;
	dot[0] = cx - Math.cos(angle) * dis;

	angle = Math.atan2(dot[2] - cz, dot[1] - cy) + rx / Math.PI * 180;
	dis = Math.sqrt((dot[2] - cz) * (dot[2] - cz) + (dot[1] - cy) * (dot[1] - cy));
	dot[2] = cz - Math.sin(angle) * dis;
	dot[1] = cy - Math.cos(angle) * dis;
	
	return dot;
}
class Die {
	constructor (r, f, x, y, z) {
		this.vertices = [];
		if(f == 20) {
			this.vertices.push([x, y + r, z]);
			var ang = 0;
			for (var i = 0; i < 5; i++) {
				this.vertices.push([Math.cos(ang) * 0.7946544723 * r, y + r / 2.828427127, Math.sin(ang) * 0.7946544723 * r])
				ang += 72 / 180 * Math.PI;
			}
			var ang = 72 / 180 * Math.PI / 2;
			for (var i = 0; i < 5; i++) {
				this.vertices.push([Math.cos(ang) * 0.7946544723 * r, y - r / 2.828427127, Math.sin(ang) * 0.7946544723 * r])
				ang += 72 / 180 * Math.PI;
			}
			this.vertices.push([x, y - r, z]);
		}
		this.edges = [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 2], [2, 3], [3, 4], [4, 5], [5, 1], [1, 6], [2, 7], [3, 8], [4, 9], [5, 10], [1, 10], [2, 6], [3, 7], [4, 8], [5, 9], [6, 7], [7, 8], [8, 9], [9, 10], [6, 10], [11, 6], [11, 7], [11, 8], [11, 9], [11, 10]];
		this.r = r;
		this.rx = 0;
		this.ry = 0;
		this.rz = 0;
	}
	translate(mx, my, mz) {
		for (var i = 0; i < this.vertices.length; i++) {
			this.vertices[i][0] += mx;
			this.vertices[i][1] += my;
			this.vertices[i][2] += mz;
		}
	}
	render() {
		ctx.strokeStyle = this.color;
		let pos;
		let dot;
		this.edges.sort((a, b) => { return average(this.vertices[b[0]], this.vertices[b[1]])[2] - average(this.vertices[a[0]], this.vertices[a[1]])[2] });
		for (var i = 0; i < this.edges.length; i++) {
			ctx.beginPath();
			ctx.strokeStyle = 'hsl(' + (350 / this.edges.length) * i + ', 100%, 50%)';
			dot = rotate(this.vertices[this.edges[i][0]].slice(0), camx, camy, camz, camrx, camry, camrz);
			pos = projectDot(dot);

			ctx.moveTo(pos[0], pos[1]);
			dot = rotate(this.vertices[this.edges[i][1]].slice(0), camx, camy, camz, camrx, camry, camrz);
			pos = projectDot(dot);
			ctx.lineTo(pos[0], pos[1]);
			ctx.stroke();
		}
		ctx.beginPath();
			ctx.fillStyle = "white";
			pos = projectDot(this.getCenter());
			ctx.arc(pos[0], pos[1], 2, 0, Math.PI * 2);
			ctx.fill();
		/*for (var i = 0; i < this.vertices.length; i++) {
			ctx.beginPath();
			ctx.fillStyle = "white";
			pos = projectDot(this.vertices[i]);
			ctx.arc(pos[0], pos[1], 2, 0, Math.PI * 2);
			ctx.fill();
		}*/
	}
	scale(r) {
		var center = this.getCenter();
		var x = center[0]; var y = center[1];
		this.vertices = [];

			this.vertices.push([x, y + r, z]);
			var ang = 0;
			for (var i = 0; i < 5; i++) {
				this.vertices.push([Math.cos(ang) * 0.7946544723 * r, y + r / 2.828427127, Math.sin(ang) * 0.7946544723 * r])
				ang += 72 / 180 * Math.PI;
			}
			var ang = 72 / 180 * Math.PI / 2;
			for (var i = 0; i < 5; i++) {
				this.vertices.push([Math.cos(ang) * 0.7946544723 * r, y - r / 2.828427127, Math.sin(ang) * 0.7946544723 * r])
				ang += 72 / 180 * Math.PI;
			}
			this.vertices.push([x, y - r, z]);

		var rx = this.rx;
		var ry = this.ry;
		var rz = this.rz;
		this.rx = 0;
		this.ry = 0;
		this.rz = 0;
		this.rotateX(rx);
		this.rotateY(ry);
		this.rotateZ(rz);
		this.r = r;
	}
	getCenter() {
		let center = [0, 0, 0];
		for (var i = 0; i < this.vertices.length; i++) {
			center[0] += this.vertices[i][0];
			center[1] += this.vertices[i][1];
			center[2] += this.vertices[i][2];
		}
		center[0] /= this.vertices.length;
		center[1] /= this.vertices.length;
		center[2] /= this.vertices.length;

		return center;
	}
	rotateX(r) {
		var center = this.getCenter();
		var angle;
		var dis = Math.sqrt(this.r * this.r * 2);
		for (var i = 0; i < this.vertices.length; i++) {

			angle = Math.atan2(center[1] - this.vertices[i][1], center[2] - this.vertices[i][2]) + r / 180 * Math.PI;

			this.vertices[i][1] = center[1] - Math.sin(angle) * dis;
			this.vertices[i][2] = center[2] - Math.cos(angle) * dis;

		}
		this.rx += r;
		if(this.rx >= 180) { this.rx -= 360; } else if(this.rx <= -180) { this.rx += 360; }
		
	}
	rotateY(r) {
		var center = this.getCenter();
		var angle;
		var dis = Math.sqrt(this.r * this.r * 2);
		for (var i = 0; i < this.vertices.length; i++) {
			angle = Math.atan2(center[2] - this.vertices[i][2], center[0] - this.vertices[i][0]) + r / 180 * Math.PI;

			this.vertices[i][2] = center[2] - Math.sin(angle) * dis;
			this.vertices[i][0] = center[0] - Math.cos(angle) * dis;
		}
		this.ry += r;
		if(this.ry >= 180) { this.ry -= 360; } else if(this.ry <= -180) { this.ry += 360; }
	}
	rotateZ(r) {
		var center = this.getCenter();
		var angle;
		var dis = Math.sqrt(this.r * this.r * 2);
		for (var i = 0; i < this.vertices.length; i++) {
			angle = Math.atan2(center[1] - this.vertices[i][1], center[0] - this.vertices[i][0]) + r / 180 * Math.PI;
			this.vertices[i][1] = center[1] - Math.sin(angle) * dis;
			this.vertices[i][0] = center[0] - Math.cos(angle) * dis;
		}
		this.rz += r;
		if(this.rz >= 180) { this.rz -= 360; } else if(this.rz <= -180) { this.rz += 360; }
	}
}
class Cube {
	constructor (r, x, y, z) {
		this.vertices = [[x - r, y - r, z - r], [x - r, y + r, z - r], [x - r, y - r, z + r], [x - r, y + r, z + r], [x + r, y - r, z - r], [x + r, y + r, z - r], [x + r, y - r, z + r], [x + r, y + r, z + r]];
		this.edges = [[0, 1], [0, 2], [0, 4], [1, 5], [1, 3], [2, 3], [2, 6], [3, 7], [4, 5], [4, 6], [5, 7], [6, 7]];
		this.r = r;
		this.rx = 0;
		this.ry = 0;
		this.rz = 0;
	}
	translate(mx, my, mz) {
		for (var i = 0; i < this.vertices.length; i++) {
			this.vertices[i][0] += mx;
			this.vertices[i][1] += my;
			this.vertices[i][2] += mz;
		}
	}
	render() {
		ctx.strokeStyle = this.color;
		let pos;
		let dot;
		this.edges.sort((a, b) => { return average(this.vertices[b[0]], this.vertices[b[1]])[2] - average(this.vertices[a[0]], this.vertices[a[1]])[2] });
		for (var i = 0; i < this.edges.length; i++) {
			ctx.beginPath();
			//ctx.strokeStyle = 'hsl(' + (360 / this.edges.length) * i + ', 100%, 50%)';
			dot = rotate(this.vertices[this.edges[i][0]].slice(0), camx, camy, camz, camrx, camry, camrz);
			pos = projectDot(dot);
			
			ctx.moveTo(pos[0], pos[1]);
			dot = rotate(this.vertices[this.edges[i][1]].slice(0), camx, camy, camz, camrx, camry, camrz);
			pos = projectDot(dot);
			ctx.lineTo(pos[0], pos[1]);
			ctx.stroke();
		}
	}
	scale(r) {
		var center = this.getCenter();
		this.vertices = [[center[0] - r, center[1] - r, center[2] - r], [center[0] - r, center[1] + r, center[2] - r], [center[0] - r, center[1] - r, center[2] + r], [center[0] - r, center[1] + r, center[2] + r], [center[0] + r, center[1] - r, center[2] - r], [center[0] + r, center[1] + r, center[2] - r], [center[0] + r, center[1] - r, center[2] + r], [center[0] + r, center[1] + r, center[2] + r]];
		var rx = this.rx;
		var ry = this.ry;
		var rz = this.rz;
		this.rx = 0;
		this.ry = 0;
		this.rz = 0;
		this.rotateX(rx);
		this.rotateY(ry);
		this.rotateZ(rz);
		this.r = r;
	}
	getCenter() {
		let center = [0, 0, 0];
		for (var i = 0; i < this.vertices.length; i++) {
			center[0] += this.vertices[i][0];
			center[1] += this.vertices[i][1];
			center[2] += this.vertices[i][2];
		}
		center[0] /= this.vertices.length;
		center[1] /= this.vertices.length;
		center[2] /= this.vertices.length;

		return center;
	}
	rotateX(r) {
		var center = this.getCenter();
		var angle;
		var dis = Math.sqrt(this.r * this.r * 2);
		for (var i = 0; i < this.vertices.length; i++) {

			angle = Math.atan2(center[1] - this.vertices[i][1], center[2] - this.vertices[i][2]) + r / 180 * Math.PI;

			this.vertices[i][1] = center[1] - Math.sin(angle) * dis;
			this.vertices[i][2] = center[2] - Math.cos(angle) * dis;

		}
		this.rx += r;
		if(this.rx >= 180) { this.rx -= 360; } else if(this.rx <= -180) { this.rx += 360; }
		
	}
	rotateY(r) {
		var center = this.getCenter();
		var angle;
		var dis = Math.sqrt(this.r * this.r * 2);
		for (var i = 0; i < this.vertices.length; i++) {
			angle = Math.atan2(center[2] - this.vertices[i][2], center[0] - this.vertices[i][0]) + r / 180 * Math.PI;

			this.vertices[i][2] = center[2] - Math.sin(angle) * dis;
			this.vertices[i][0] = center[0] - Math.cos(angle) * dis;
		}
		this.ry += r;
		if(this.ry >= 180) { this.ry -= 360; } else if(this.ry <= -180) { this.ry += 360; }
	}
	rotateZ(r) {
		var center = this.getCenter();
		var angle;
		var dis = Math.sqrt(this.r * this.r * 2);
		for (var i = 0; i < this.vertices.length; i++) {
			angle = Math.atan2(center[1] - this.vertices[i][1], center[0] - this.vertices[i][0]) + r / 180 * Math.PI;
			this.vertices[i][1] = center[1] - Math.sin(angle) * dis;
			this.vertices[i][0] = center[0] - Math.cos(angle) * dis;
		}
		this.rz += r;
		if(this.rz >= 180) { this.rz -= 360; } else if(this.rz <= -180) { this.rz += 360; }
	}
}
var items = [new Die(20, 20, 0, 0, 0), new Cube(5, 30, 4, -5)];


</script>