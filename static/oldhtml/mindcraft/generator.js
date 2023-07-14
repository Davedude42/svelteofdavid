//import * as noise from './perlin.js';
export function generateVoxel(noise, seed, x, y, z) {
	const size = 20;

	let smallNoise1 = noise.simplex3(x/size, 0, z/size);
	let mountain1 = noise.simplex3(x/size/10, 20, z/size/10);
	
	let smallNoise2 = noise.simplex3(x/size, 30, z/size);
	let mountain2 = noise.simplex3(x/size/15, -10, z/size/15);


	let grass = Math.floor(64 + smallNoise1*3 + Math.max(0, mountain1*30+mountain2*10));
	let stone = Math.floor(grass - 4 + smallNoise2*2);
	if(y == grass)
		return 1;
	else if(y < stone)
		return 3;
	else if(y >= stone && y < grass)
		return 2;
	else
		return 0;
}