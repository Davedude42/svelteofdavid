<canvas id="lightCanvas" width="650" height="650" style="background-color: #222222;"></canvas>
<script>
const WALLS = [/*...*/]; // Fill in the WALLS array values
const WALLS_SUM = [/*...*/]; // Fill in the WALLS_SUM array values

const LENGTH = 30 * 5 * 3 - 18;
const PIXEL_SIZE = 4;

function rgbToHex(rgb) {
	return `#${rgb[0].toString(16).padStart(2, '0')}${rgb[1].toString(16).padStart(2, '0')}${rgb[2].toString(16).padStart(2, '0')}`;
}

class FakePixels {
	constructor(length) {
			this.length = length;
			this.pixels = Array(this.length).fill([0, 0, 0]);
			this.canvas = document.getElementById('lightCanvas');
			this.ctx = this.canvas.getContext('2d');
			this.pixelRects = [];

			for (let i = 0; i < this.length; i++) {
					let px = 0, py = 0;

					for (let pi = 0; pi < i; pi++) {
							if (pi < WALLS_SUM[0]) px += PIXEL_SIZE;
							else if (pi < WALLS_SUM[1]) py += PIXEL_SIZE;
							else if (pi < WALLS_SUM[2]) px -= PIXEL_SIZE;
							else if (pi < WALLS_SUM[3]) py -= PIXEL_SIZE;

							if (pi === WALLS_SUM[2]) {
									px -= PIXEL_SIZE;
									py += PIXEL_SIZE;
							}
					}

					this.ctx.fillStyle = '#000000';
					this.ctx.fillRect(25 + px, 25 + py, PIXEL_SIZE, PIXEL_SIZE);
					this.pixelRects.push({ x: 25 + px, y: 25 + py });
			}
	}

	setPixel(index, color) {
			if (color.some(val => val < 0 || val > 255)) {
					console.log('NOT VALID COLOR', color);
					return;
			}
			this.pixels[index] = color;
	}

	fill(color) {
			if (color.some(val => val < 0 || val > 255)) {
					console.log('NOT VALID COLOR');
					return;
			}
			this.pixels.fill(color);
	}

	show() {
			for (let i = 0; i < this.length; i++) {
					this.ctx.fillStyle = rgbToHex(this.pixels[i]);
					const rect = this.pixelRects[i];
					this.ctx.fillRect(rect.x, rect.y, PIXEL_SIZE, PIXEL_SIZE);
			}
	}
}

// Assuming Lights is a class you have in JavaScript as well
const theLights = new Lights(new FakePixels(LENGTH));
theLights.begin();
</script>