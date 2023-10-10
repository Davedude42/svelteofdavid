// Assuming you have imported the necessary classes and functions from other files
// For example:
// import { Rainbow, Entering, Paint, Tint, SleepyTime, Animation, RefreshProgram, Starry, Interwebs } from './programs.js';
// import { layer, hslToRgb } from './useful.js';

class Lights {
	constructor(pixels) {
			this.length = pixels.length;
			this.pixels = pixels;

			// Commented out the BlueDot code as it's not directly translatable to JavaScript

			this.programs = {
					'-1': new RefreshProgram(this.length, []),
					'1000': new Entering(this.length, this.onCommand.bind(this))
			};

			this.paused = false;
			this.sleeping = false;
			this.force = true;
			this.FPS = 24;
			this.timer = 0;

			document.addEventListener('keydown', this.keyPress.bind(this));
			document.addEventListener('keyup', this.keyRelease.bind(this));
	}

	clearPrograms() {
			for (let pkey in this.programs) {
					if (parseInt(pkey) < 1000) {
							delete this.programs[pkey];
					}
			}
			this.force = true;
	}

	keyPress(event) {
			let key = event.key.toLowerCase();

			if (key === 'escape') {
					this.clearPrograms();
			} else if (key === '`') {
					this.setPaused(!this.paused);
			}

			for (let k in this.programs) {
					let program = this.programs[k];
					let res = program.key(key);
					if (!res) break;
			}
	}

	keyRelease(event) {
			let key = event.key.toLowerCase();

			for (let k in this.programs) {
					let program = this.programs[k];
					let res = program.keyUp(key);
					if (!res) break;
			}
	}

	onCommand(com) {
			switch (com.key) {
					case 'r':
							this.programs[com.layer] = new Rainbow(this.length, com.args);
							break;
					case 'pop':
							delete this.programs[com.layer];
							break;
					case 'p':
							this.programs[com.layer] = new Paint(this.length, com.args);
							break;
					case 't':
							this.programs[com.layer] = new Tint(this.length, com.args);
							break;
					case 'n':
							this.programs[com.layer] = new SleepyTime(this.length, com.args);
							break;
					case 'a':
							this.programs[com.layer] = new Animation(this.length, com.args);
							break;
					case 'star':
							this.programs[com.layer] = new Starry(this.length, com.args);
							break;
					case 'web':
							this.programs[com.layer] = new Interwebs(this.length, com.args);
							break;
					default:
							return false;
			}

			this.force = true;
			return true;
	}

	begin(FPS = 24) {
			this.FPS = FPS;
			console.log("Here are the possible commands:");
			console.log("Rainbow - /r [speed]");
			console.log("Stop a program - /[layer] pop");
			console.log("Paint - /p");
			console.log("Nighttime - /n");
			console.log("Animation - /a [animation]");
			console.log("Starry - /star");

			setInterval(() => {
					if (!this.sleeping) {
							this.frame();
					}
			}, 1000 / this.FPS);
	}

	frame() {
			if (!this.sleeping && !this.paused) {
					this.fill([0, 0, 0, 0]);

					let anyUpdated = false;
					for (let k in this.programs) {
							let program = this.programs[k];
							let res = program.frame(this.timer);
							anyUpdated = res || anyUpdated;
					}

					if (anyUpdated || this.force) {
							for (let k in this.programs) {
									let program = this.programs[k];
									for (let i = 0; i < this.length; i++) {
											let pxl = program.pixels[i];
											let rgb = program.isRGB ? pxl : hslToRgb(pxl);
											this.pixels[i] = layer(this.pixels[i], rgb);
									}
							}
							this.pixels.show();
							this.force = false;
					}
					this.timer++;
			}
	}

	sleep() {
			this.sleeping = true;
	}

	wake() {
			if (this.sleeping) {
					this.sleeping = false;
					this.begin(this.FPS);
			}
	}

	setPaused(val) {
			this.paused = val;
	}

	fill(color) {
			this.pixels.fill(color);
	}
}
