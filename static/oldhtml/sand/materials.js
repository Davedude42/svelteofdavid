// 0 - solid, 1 - grain, 2 - liquid, 3 - gas, 4 - particle



/*
	0  - air
	1  - brick
	2  - sand
	3  - water
	4  - steam
	5  - mercury
	6  - saltwater
	7  - salt
	8  - helium
	9  - fire
	10 - ice
	11 - vacuum
	12 - invinsible
	13 - wood
	14 - oil
	15 - hot fire
	16 - tap
	17 - acid
	18 - virus
	19 - lead (solid)
	20 - lead (melted)
*/

var mats = [
	{ // 0
		name: 'air',
		density: 5, // densities kg/m^3 (not always legit)
		step: (x, y) => {
			
		},
		stateChanges: () => ({ downTemp: -Infinity, downTo: null, upTemp: Infinity, upTo: null }),
		burns: () => ({ burnTemp: null, explodeTemp: null, burnSpeed: null, burnColor: [] }),
		type: 3,
		data: (x, y) => { return {}; },
		color: (x, y) => { let c = 20+rNum(3)*5; return [c,c,c]; },
		singleColor: [20,20,20],
		cond: 0.7,
		startTemp: -1
	},
	{ // 1
		name: 'brick',
		density: Infinity,
		step: (x, y) => {

		},
		stateChanges: () => ({ downTemp: -Infinity, downTo: null, upTemp: Infinity, upTo: null }),
		burns: () => ({ burnTemp: null, explodeTemp: null, burnSpeed: null, burnColor: [] }),
		type: 0,
		data: (x, y) => { return {}; },
		color: (x, y) => ((x+Math.floor(y/3)*3)%5==0||y%3==0?[200,200,200]:[200, 0, 0]),
		singleColor: [200,0,0],
		cond: 0.1,
		startTemp: -1
	},
	{ // 2
		name: 'sand',
		density: 2082,
		step: (x, y) => {

		},
		stateChanges: () => ({ downTemp: -Infinity, downTo: null, upTemp: Infinity, upTo: null }),
		burns: () => ({ burnTemp: null, explodeTemp: null, burnSpeed: null, burnColor: [] }),
		type: 1,
		data: (x, y) => { return {}; },
		color: (x, y) => [250,240-rNum(4)*15,0],
		singleColor: [250,230,0],
		cond: 0.15,
		startTemp: -1
	},
	{ // 3
		name: 'water',
		density: 997,
		step: (x, y) => {

		},
		stateChanges: () => ({
				downTemp: -1 - rNum(8)/4,
				downTo: 10,
				upTemp: 110 + rNum(8)/4,
				upTo: 4,
		}),
		burns: () => ({ burnTemp: null, explodeTemp: null, burnSpeed: null, burnColor: [] }),
		type: 2,
		data: (x, y) => { return {}; },
		color: (x, y) => [0,50+rNum(4)*5,255],
		singleColor: [0,60,255],
		cond: 0.8,
		startTemp: -1
	},
	{ // 4
		name: 'steam',
		density: 1,
		step: (x, y) => {
			
		},
		stateChanges: () => ({
			downTemp: 95 - rNum(8)/4,
			downTo: 3,
			upTemp: Infinity,
			upTo: null,
		}),
		burns: () => ({ burnTemp: null, explodeTemp: null, burnSpeed: null, burnColor: [] }),
		type: 3,
		data: (x, y) => { return {}; },
		color: (x, y) => { let c = rNum(2)*5; return [210+c,210+c,210+c]; },
		singleColor: [215,215,215],
		cond: 0.7,
		startTemp: 120
	},
	{ // 5
		name: 'mercury',
		density: 1900, // had to make it less dense than sand ¯\_(ツ)_/¯ 
		step: (x, y) => {

		},
		stateChanges: () => ({ downTemp: -Infinity, downTo: null, upTemp: Infinity, upTo: null }),
		burns: () => ({ burnTemp: null, explodeTemp: null, burnSpeed: null, burnColor: [] }),
		type: 2,
		data: (x, y) => { return {}; },
		color: (x, y) => [130,130,130],
		singleColor: [130,130,130],
		cond: 0.85,
		startTemp: -1
	},
	{ // 6
		name: 'saltwater',
		density: 1023,
		step: (x, y) => {
			if(grid[x][y].temp >= 95 && rNum(40)==0) {
				if(rNum(12) == 0) 
					stateChange(x, y, 7);
				else 
					stateChange(x, y, 4);
			}
		},
		stateChanges: () => ({
			downTemp: -Infinity,
			downTo: null,
			upTemp: 95 - rNum(8)/4,
			upTo: rNum(12)==0?7:4,
		}),
		burns: () => ({ burnTemp: null, explodeTemp: null, burnSpeed: null, burnColor: [] }),
		type: 2,
		data: (x, y) => { return {}; },
		color: (x, y) => [0,150+rNum(4)*2,255],
		singleColor: [0,160,255],
		cond: 0.75,
		startTemp: -1
	},
	{ // 7
		name: 'salt',
		density: 2000,
		step: (x, y) => {
			var poss = []; // replace nearby waters with salt water
			if(grid[x+1][y].id == 3) poss.push({x:1,y:0});
			if(grid[x-1][y].id == 3) poss.push({x:-1,y:0});
			if(grid[x][y+1].id == 3) poss.push({x:0,y:1});
			if(grid[x][y-1].id == 3) poss.push({x:0,y:-1});
			if(poss.length != 0 && rNum(30) == 0) {
				poss = rItem(poss);
				stateChange(x+poss.x, y+poss.y, 6);
				if(rNum(12) == 0) stateChange(x, y, 6);
			}
		},
		stateChanges: () => ({ downTemp: -Infinity, downTo: null, upTemp: Infinity, upTo: null }),
		burns: () => ({ burnTemp: null, explodeTemp: null, burnSpeed: null, burnColor: [] }),
		type: 1,
		data: (x, y) => { return {}; },
		color: (x, y) => { let c = rNum(4)*15; return [240,240-c,240-c]; },
		singleColor: [240,200,200],
		cond: 0.15,
		startTemp: -1
	},
	{ // 8
		name: 'helium',
		density: 0.1,
		step: (x, y) => {
			
		},
		stateChanges: () => ({ downTemp: -Infinity, downTo: null, upTemp: Infinity, upTo: null }),
		burns: () => ({ burnTemp: null, explodeTemp: null, burnSpeed: null, burnColor: [] }),
		type: 3,
		data: (x, y) => { return {}; },
		color: (x, y) => { let c = rNum(2)*5; return [255,150-c,255]; },
		singleColor: [255,150,255],
		cond: 0.8,
		startTemp: -1
	},
	{ // 9
		name: 'fire',
		density: Infinity,
		step: (x, y) => {
			grid[x][y].temp = grid[x][y].data.temp;
			if(mats[grid[x][y-1].id].type == 3 && rNum(3) == 0) {
				swap(x, y, x, y - 1);
			} else if(rNum(3) == 0) {
				var pots = [];
				if(mats[grid[x-1][y].id].type == 3) pots.push(-1);
				if(mats[grid[x+1][y].id].type == 3) pots.push(1);
				if(pots.length != 0) {
					pots = rItem(pots);
					swap(x, y, x+pots, y);
				}
			}
			if(grid[x][y].timer > (grid[x][y].data.temp-230)/25 && grid[x][y].timer > grid[x][y].data.temp / 50) {
				stateChange(x, y, 11, true);
			}
		},
		stateChanges: () => ({ downTemp: -Infinity, downTo: null, upTemp: Infinity, upTo: null }),
		burns: () => ({ burnTemp: null, explodeTemp: null, burnSpeed: null, burnColor: [] }),
		type: 4,
		data: (x, y) => { return { temp: 230 + rNum(5) * 50 }; },
		color: (x, y) => [255,150,0],
		singleColor: [255,150,0],
		cond: 0.6,
		startTemp: 300
	},
	{ // 10
		name: 'ice',
		density: Infinity,
		step: (x, y) => {

		},
		stateChanges: () => ({
			downTemp: -Infinity,
			downTo: null,
			upTemp: 1 + rNum(8)/4,
			upTo: 3,
		}),
		burns: () => ({ burnTemp: null, explodeTemp: null, burnSpeed: null, burnColor: [] }),
		type: 0,
		data: (x, y) => { return {}; },
		color: (x, y) => [143,255,253],
		singleColor: [143,255,253],
		cond: 0.4,
		startTemp: -15
	},
	{ // 11
		name: 'vacuum',
		density: 0,
		step: (x, y) => {
			var pots = [];
			if(mats[grid[x-1][y].id].type == 3 && grid[x-1][y].id != 11 && grid[x-1][y].timer > 1) pots.push({x: -1, y: 0});
			if(mats[grid[x+1][y].id].type == 3 && grid[x+1][y].id != 11 && grid[x+1][y].timer > 1) pots.push({x: 1, y: 0});
			if(mats[grid[x][y-1].id].type == 3 && grid[x][y-1].id != 11 && grid[x][y-1].timer > 1) pots.push({x: 0, y: -1});
			if(mats[grid[x][y+1].id].type == 3 && grid[x][y+1].id != 11 && grid[x][y+1].timer > 1) pots.push({x: 0, y: 1});

			if(pots.length != 0) {
				pots = rItem(pots);
				stateChange(x, y, grid[x+pots.x][y+pots.y].id);
				grid[x][y].temp = grid[x+pots.x][y+pots.y].temp;
			}
		},
		stateChanges: () => ({ downTemp: -Infinity, downTo: null, upTemp: Infinity, upTo: null }),
		burns: () => ({ burnTemp: null, explodeTemp: null, burnSpeed: null, burnColor: [] }),
		type: 3,
		data: (x, y) => { return {}; },
		color: (x, y) => [0,0,0],
		singleColor: [0,0,0],
		cond: 0,
		startTemp: NaN
	},
	{ // 12
		name: 'invinsible',
		density: Infinity,
		step: (x, y) => {

		},
		stateChanges: () => ({ downTemp: -Infinity, downTo: null, upTemp: Infinity, upTo: null }),
		burns: () => ({ burnTemp: null, explodeTemp: null, burnSpeed: null, burnColor: [] }),
		type: 0,
		data: (x, y) => { return {}; },
		color: (x, y) => ((x+Math.floor(y/3)*3)%5==0||y%3==0?[200,200,200]:[150,150,150]),
		singleColor: [150,150,150],
		cond: 0,
		startTemp: NaN
	},
	{ // 13
		name: 'wood',
		density: Infinity,
		step: (x, y) => {
			
		},
		stateChanges: () => ({ downTemp: -Infinity, downTo: null, upTemp: Infinity, upTo: null }),
		burns: () => ({ burnTemp: 250, explodeTemp: null, burnSpeed: 1, burnColor: [150,50,0] }),
		type: 0,
		data: (x, y) => { return { burningTime: 0, burning: false, endBurnTime: 400+rNum(10)*20, burnColor: [150,50,0] }; },
		color: (x, y) => { let n = noise.simplex2(x/2, y/2); let c = Math.ceil(n*2)*5; return y%4==3?[116-c,94-c,57-c]:(n>0.8?[139,112,59]:(x%16==7+(Math.floor(y/4)%2)*8?[159-c,132-c,79-c]:[186+c,153+c,99+c])); },
		singleColor: [186,153,99],
		cond: 0.2,
		startTemp: -1
	},
	{ // 14
		name: 'oil',
		density: 881,
		step: (x, y) => {
			
		},
		stateChanges: () => ({ downTemp: -Infinity, downTo: null, upTemp: Infinity, upTo: null }),
		burns: () => ({ burnTemp: 400, explodeTemp: null, burnSpeed: 8, burnColor: [44,38,84] }),
		type: 2,
		data: (x, y) => { return { burningTime: 0, burning: false, endBurnTime: 100+rNum(10)*20, burnColor: [44,38,84] }; },
		color: (x, y) => [44,38,84],
		singleColor: [44,38,84],
		cond: 0.9,
		startTemp: -1
	},
	{ // 15
		name: 'hot fire',
		density: Infinity,
		step: (x, y) => {
			grid[x][y].temp = grid[x][y].data.temp;
			if(mats[grid[x][y-1].id].type == 3 && rNum(3) == 0) {
				swap(x, y, x, y - 1);
			} else if(rNum(3) == 0) {
				var pots = [];
				if(mats[grid[x-1][y].id].type == 3) pots.push(-1);
				if(mats[grid[x+1][y].id].type == 3) pots.push(1);
				if(pots.length != 0) {
					pots = rItem(pots);
					swap(x, y, x+pots, y);
				}
			}
			if(grid[x][y].timer > grid[x][y].data.temp / 200) {
				stateChange(x, y, 11, true);
			}
		},
		stateChanges: () => ({ downTemp: -Infinity, downTo: null, upTemp: Infinity, upTo: null }),
		burns: () => ({ burnTemp: null, explodeTemp: null, burnSpeed: null, burnColor: [] }),
		type: 4,
		data: (x, y) => { return { temp: 400 + rNum(5) * 50 }; },
		color: (x, y) => [87,163,255],
		singleColor: [87,163,255],
		cond: 0.6,
		startTemp: 300
	},
	{ // 16
		name: 'tap',
		density: Infinity,
		step: (x, y) => {
			if(grid[x][y].data.matID != -1) {
				if(rNum(8) == 0) {
					let pots = [];
					if(mats[grid[x-1][y].id].type == 3) pots.push([-1,0]);
					if(mats[grid[x+1][y].id].type == 3) pots.push([1,0]);
					if(mats[grid[x][y-1].id].type == 3) pots.push([0,-1]);
					if(mats[grid[x][y+1].id].type == 3) pots.push([0,1]);

					if(pots.length != 0) {
						pots = rItem(pots);
						stateChange(x+pots[0], y+pots[1], grid[x][y].data.matID, true);
						grid[x+pots[0]][y+pots[1]].graved = true;
					}
				}
			} else {
				let pots = [];
				if((grid[x-1][y].id != 0 && grid[x-1][y].id != 11 && mats[grid[x-1][y].id].type != 0) || (grid[x-1][y].id == 16 && grid[x-1][y].data.matID!=-1)) pots.push([-1,0]);
				if((grid[x+1][y].id != 0 && grid[x+1][y].id != 11 && mats[grid[x+1][y].id].type != 0) || (grid[x+1][y].id == 16 && grid[x+1][y].data.matID!=-1)) pots.push([1,0]);
				if((grid[x][y-1].id != 0 && grid[x][y-1].id != 11 && mats[grid[x][y-1].id].type != 0) || (grid[x][y-1].id == 16 && grid[x][y-1].data.matID!=-1)) pots.push([0,-1]);
				if((grid[x][y+1].id != 0 && grid[x][y+1].id != 11 && mats[grid[x][y+1].id].type != 0) || (grid[x][y+1].id == 16 && grid[x][y+1].data.matID!=-1)) pots.push([0,1]);

				if(pots.length != 0) {
					pots = rItem(pots);
					grid[x][y].data.matID = grid[x+pots[0]][y+pots[1]].id == 16 ? grid[x+pots[0]][y+pots[1]].data.matID : grid[x+pots[0]][y+pots[1]].id;
				}
			}
		},
		stateChanges: () => ({ downTemp: -Infinity, downTo: null, upTemp: Infinity, upTo: null }),
		burns: () => ({ burnTemp: null, explodeTemp: null, burnSpeed: null, burnColor: [] }),
		type: 0,
		data: (x, y) => { return { matID: -1 }; },
		color: (x, y) => [255,220,0],
		singleColor: [255,220,0],
		cond: 0.1,
		startTemp: -1
	},
	{ // 17
		name: 'acid',
		density: 980,
		step: (x, y) => {
			if(grid[x][y].timer % 6 == 0) {
				let pots = [];
				if(mats[grid[x-1][y].id].type <= 1 && grid[x-1][y].id != 12) pots.push([-1,0]);
				if(mats[grid[x+1][y].id].type <= 1 && grid[x+1][y].id != 12) pots.push([1,0]);
				if(mats[grid[x][y-1].id].type <= 1 && grid[x][y-1].id != 12) pots.push([0,-1]);
				if(mats[grid[x][y+1].id].type <= 1 && grid[x][y+1].id != 12) pots.push([0,1]);

				if(pots.length != 0) {
					pots = rItem(pots);
					stateChange(x+pots[0], y+pots[1], 11, true);
				}
			}
		},
		stateChanges: () => ({ downTemp: -Infinity, downTo: null, upTemp: Infinity, upTo: null }),
		burns: () => ({ burnTemp: null, explodeTemp: null, burnSpeed: null, burnColor: [] }),
		type: 2,
		data: (x, y) => ({}),
		color: (x, y) => [107,255,0],
		singleColor: [107,255,0],
		cond: 0.1,
		startTemp: -1
	},
	{ // 18
		name: 'virus',
		density: Infinity,
		step: (x, y) => {
			if(rNum(5) == 0) {
				let pots = [];

				for(let i = 0; i < 10; i++)
					if(x-i > 0 && mats[grid[x-i][y].id].type != 3 && grid[x-i][y].id != 18 && grid[x-i][y].id != 12 && grid[x-1][y].id != 18 && grid[x-1][y].id != 12) pots.push([-1,0]);
				for(let i = 0; i < 10; i++)
					if(x+i < dim.x && mats[grid[x+i][y].id].type != 3 && grid[x+i][y].id != 18 && grid[x+i][y].id != 12 && grid[x+1][y].id != 18 && grid[x+1][y].id != 12) pots.push([1,0]);
				for(let i = 0; i < 10; i++)
					if(y-i > 0 && mats[grid[x][y-i].id].type != 3 && grid[x][y-i].id != 18 && grid[x][y-i].id != 12 && grid[x][y-1].id != 18 && grid[x][y-1].id != 12) pots.push([0,-1]);
				for(let i = 0; i < 10; i++)
					if(y+i < dim.y && mats[grid[x][y+i].id].type != 3 && grid[x][y+i].id != 18 && grid[x][y+i].id != 12 && grid[x][y+1].id != 18 && grid[x][y+1].id != 12) pots.push([0,1]);

				if(pots.length != 0) {
					pots = rItem(pots);
					stateChange(x+pots[0], y+pots[1], 18, true);
				} else {
					if(rNum(4) == 0 && grid[x][y].data.life != 0) {
						if(mats[grid[x-1][y-1].id].type == 3) pots.push([-1,-1]);
						if(mats[grid[x-1][y+1].id].type == 3) pots.push([-1,1]);
						if(mats[grid[x+1][y-1].id].type == 3) pots.push([1,-1]);
						if(mats[grid[x+1][y+1].id].type == 3) pots.push([1,1]);

						if(pots.length != 0) {
							pots = rItem(pots);
							stateChange(x+pots[0], y+pots[1], 18, true);
							grid[x+pots[0]][y+pots[1]].data.life = grid[x][y].data.life-1;
						}
					}
				}
			}
			if(grid[x][y].timer > grid[x][y].data.disTime) {
				stateChange(x, y, 11, true);
			}
		},
		stateChanges: () => ({ downTemp: -Infinity, downTo: null, upTemp: Infinity, upTo: null }),
		burns: () => ({ burnTemp: null, explodeTemp: null, burnSpeed: null, burnColor: [] }),
		type: 0,
		data: (x, y) => { var life = Math.random(); return { life: Math.floor(life/2)+1, disTime: (50+rNum(5))*(life+0.5) }; },
		color: (x, y) => [195,255,92],
		singleColor: [195,255,92],
		cond: 0.1,
		startTemp: -1
	},
	{ // 19
		name: 'lead',
		density: Infinity,
		step: (x, y) => {

		},
		stateChanges: () => ({ downTemp: -Infinity, downTo: null, upTemp: 450, upTo: 20 }),
		burns: () => ({ burnTemp: null, explodeTemp: null, burnSpeed: null, burnColor: [] }),
		type: 0,
		data: (x, y) => { return {}; },
		color: (x, y) => [200,200,200],
		singleColor: [200,200,200],
		cond: 0.9,
		startTemp: -1
	},
	{ // 20
		name: 'lead_liquid',
		density: 2000,
		step: (x, y) => {

		},
		stateChanges: () => ({ downTemp: 400, downTo: 19, upTemp: Infinity, upTo: null }),
		burns: () => ({ burnTemp: null, explodeTemp: null, burnSpeed: null, burnColor: [] }),
		type: 2,
		data: (x, y) => { return {}; },
		color: (x, y) => [230,0,0],
		singleColor: [230,0,0],
		cond: 0.5,
		startTemp: 450
	},
];