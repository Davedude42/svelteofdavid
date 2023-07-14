
export class Chunk {
	cx;
	cy;
	id;

	voxels;

	constructor(cx, cy) {
		this.cx = cx;
		this.cy = cy;
		this.id = cx + 'x' + cy;

		this.voxels = new Uint16Array(16*16*256);
	}
	getVoxel(x, y, z) {
		if(y < 0 || y >= 256 || x < 0 || x >= 16 || z < 0 || z >= 16)
			return undefined;
		else
			return this.voxels[x + z*16 + y*256];
	}
	getVectorVoxel(pos) {
		if(pos.y < 0 || pos.y >= 256 || pos.x < 0 || pos.x >= 16 || pos.z < 0 || pos.z >= 16)
			return undefined;
		else
			return this.voxels[x + z*16 + y*256];
	}
	setVoxel(val, x, y, z) {
		this.voxels[x + z*16 + y*256] = val;
	}
	async generate() {
		for (let x = 0; x < 16; x++) {
			for (let z = 0; z < 16; z++) {
				let grassHeight = 64 + x % 2 + z % 3;
				for (let y = 0; y < 256; y++) {
					if(y == grassHeight) {
						this.setVoxel(1, x, y, z);
					} else if(y < grassHeight) {
						this.setVoxel(2, x, y, z);
					} else {
						this.setVoxel(0, x, y, z);
					}
				}
			}
		}
	}
}