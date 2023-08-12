/*
	Terminology

	grid[x][y] - grid square
	material - id, e.g. brick, sand, water, steam, mercury

	0 - solid (brick)
	1 - grain (sand)
	2 - liquid (water)
	3 - gas (steam)
	4 - particle (fire)


*/
var sentLog = false;
function oneLog(msg='Test!') {
	if(sentLog == false) {
		sentLog = true;
		console.log(msg);
	}
}
function combust(x, y) {
	grid[x][y].data.burning = true;
	grid[x][y].data.burnTime = 0;
	grid[x][y].data.burnEndTime = (200+rNum(50))/grid[x][y].burns.burnSpeed;
}
function workOutBurning(x, y) {
	
	if(grid[x][y].data.burning == true) {
		grid[x][y].data.burnTime++;
		if(grid[x][y].data.burnEndTime < grid[x][y].data.burnTime) {
			stateChange(x, y, 11, true);
		}
		
		if(rNum(5) == 0) {
			let pots = [];
			if(mats[grid[x-1][y].id].type == 3) pots.push([-1,0]);
			if(mats[grid[x+1][y].id].type == 3) pots.push([1,0]);
			if(mats[grid[x][y-1].id].type == 3) pots.push([0,-1]);
			if(mats[grid[x][y+1].id].type == 3) pots.push([0,1]);
			
			if(pots.length != 0) {
				pots = rItem(pots);
				
				stateChange(x+pots[0], y+pots[1], grid[x][y].id == 14 ? 15 : 9, true);
			}
		}
		
		if(rNum(5) == 0) {
			let pots = [];
			if(grid[x-1][y].burns.burnTemp != null && grid[x-1][y].data.burning == false && (
				mats[grid[x-2][y].id].type >= 3 || 
				mats[grid[x-1][y-1].id].type >= 3 ||  
				mats[grid[x-1][y+1].id].type >= 3 || 
				mats[grid[x][y-1].id].type >= 3 || 
				mats[grid[x][y+1].id].type >= 3
			)) pots.push([-1,0]);
			if(grid[x+1][y].burns.burnTemp != null && grid[x+1][y].data.burning == false && (
				mats[grid[x+2][y].id].type >= 3 || 
				mats[grid[x+1][y-1].id].type >= 3 || 
				mats[grid[x+1][y+1].id].type >= 3 || 
				mats[grid[x][y-1].id].type >= 3 || 
				mats[grid[x][y+1].id].type >= 3
			)) pots.push([1,0]);
			if(grid[x][y-1].burns.burnTemp != null && grid[x][y-1].data.burning == false && (
				mats[grid[x+1][y-1].id].type >= 3 || 
				mats[grid[x-1][y-1].id].type >= 3 || 
				mats[grid[x][y-2].id].type >= 3 || 
				mats[grid[x-1][y].id].type >= 3 || 
				mats[grid[x+1][y].id].type >= 3
			)) pots.push([0,-1]);
			if(grid[x][y+1].burns.burnTemp != null && grid[x][y+1].data.burning == false && (
				mats[grid[x+1][y+1].id].type >= 3 || 
				mats[grid[x][y+2].id].type >= 3 || 
				mats[grid[x-1][y+1].id].type >= 3 || 
				mats[grid[x-1][y].id].type >= 3 || 
				mats[grid[x+1][y].id].type >= 3
			)) pots.push([0,1]);
			if(pots.length != 0) {
				pots = rItem(pots);
				combust(x+pots[0], y+pots[1]);
			}
		}
		
	} else {
		if(grid[x][y].temp > grid[x][y].burns.burnTemp) {
			combust(x, y);
		}
	}
}
function stateChange(x, y, to, setTemp=false) {
	if(to == null)
		console.error('No null man!!! >:(', to);
	grid[x][y].id = to;
	grid[x][y].timer = 0;
	grid[x][y].color = mats[to].color(x, y);
	grid[x][y].data = mats[to].data(x, y);
	grid[x][y].stateChanges = mats[to].stateChanges();
	grid[x][y].burns = mats[to].burns();

	if(setTemp && mats[to].startTemp != -1) 
		grid[x][y].temp = mats[to].startTemp;
	else if(isNaN(grid[x][y].temp))
		grid[x][y].temp = 20;

}
function swap(x1, y1, x2, y2) {
	if(x1 == 0 || y1 == 0 || x2 == 0 || y2 == 0 || x1 == dim.x-1 || y1 == dim.y-1 || x2 == dim.x-1 || y2 == dim.y-1) { console.error('Been a naughty boy.'); return; }
	var two = grid[x2][y2];
	grid[x2][y2] = grid[x1][y1];
	grid[x1][y1] = two;
}
function trypush(x, y) {

}
function gravities() {
	var order = Array.from({length: dim.x-2}, (x, i) => i+1); // shuffles all the Xs just cuz
	order = shuffle(order);
	for (let i = 0; i < order.length; i++) {
	let x = order[i];
	for (let y = dim.y-2; y >= 1; y--) {
	if(mats[grid[x][y].id].type !== 4) { // if not particle
	if(grid[x][y].graved === false) { // if not fallen yet

		/* --- FALL DOWN --- */

		let canFallDown;
		{ // can fall down
		canFallDown = 
			( // checking if able to move down based on density
				mats[grid[x][y+1].id].density < mats[grid[x][y].id].density || // cell denser than the one below it
				( // if able to move randomly along edge
					grid[x][y].id !== grid[x][y+1].id && // not the same material
					mats[grid[x][y].id].type === mats[grid[x][y+1].id].type && // same type
					rNum(Math.abs(mats[grid[x][y+1].id].density-mats[grid[x][y].id].density)+5) === 0 // random number based on densities ceil(d+5)
				)
			) &&
			mats[grid[x][y].id].type !== 0 && // cell not solid
			(mats[grid[x][y+1].id].type === 2 || mats[grid[x][y+1].id].type === 3) && // cell below liquid or gas
			grid[x][y+1].graved === false && // lower cell hasn't moved yet
			(mats[grid[x][y].id].type != mats[grid[x][y+1].id].type || grid[x][y+1].pushedUp === false) && // if same type, only move once
			(mats[grid[x][y].id].type != 3 || stepN % 2 === 0); // if gas, only fall on even frames
		}
		if(canFallDown === true) {
			
			grid[x][y].graved = true;
			grid[x][y+1].pushedUp = true;
			
			swap(x, y, x, y+1);
			
			if(mats[grid[x][y+1].id].type === 2 && grid[x][y+2].id == grid[x][y+1].id) {
				let pots = [];
				if(mats[grid[x+1][y+1].id].density < mats[grid[x][y+1].id].density) pots.push(1);
				if(mats[grid[x-1][y+1].id].density < mats[grid[x][y+1].id].density) pots.push(-1);
				if(pots.length != 0) {
					pots = rItem(pots);
					swap(x, y+1, x+pots, y+1);
				}
			}
			
		} else {

			/* --- FALL SIDEWAYS --- */

			let pots = [];

			if(mats[grid[x][y+1].id].type <= 1 || (mats[grid[x][y+1].id].type === 2 && mats[grid[x][y+1].id].type === 2)) { // cell below a solid or grain, or a liquid if liquid
				{ // can fall down left
					if(
						mats[grid[x-1][y+1].id].density < mats[grid[x][y].id].density && // cell denser than down left cell
						(mats[grid[x][y].id].type === 1 || mats[grid[x][y].id].type === 2) && // cell a grain or liquid
						(mats[grid[x-1][y+1].id].type === 2 || mats[grid[x-1][y+1].id].type === 3) && // cell down left a liquid or gas
						grid[x-1][y+1].graved === false && // down left cell hasn't fallen
						(mats[grid[x-1][y+1].id].type !== mats[grid[x][y].id].type || grid[x-1][y+1].pushedUp === false) // if same type, only move once
					)
					pots.push(-1);
				}
				{ // can fall down right
					if(
						mats[grid[x+1][y+1].id].density < mats[grid[x][y].id].density && // cell denser than down right cell
						(mats[grid[x][y].id].type === 1 || mats[grid[x][y].id].type === 2) && // cell a grain or liquid
						(mats[grid[x+1][y+1].id].type === 2 || mats[grid[x+1][y+1].id].type === 3) && // cell down right a liquid or gas
						grid[x+1][y+1].graved === false && // down right cell hasn't fallen
						(mats[grid[x+1][y+1].id].type !== mats[grid[x][y].id].type || grid[x+1][y+1].pushedUp === false) // if same type, only move once
					)
					pots.push(1);
				}
			}
			
			if(pots.length != 0) {
				pots = rItem(pots);

				grid[x][y].graved = true;
				grid[x+pots][y+1].pushedUp = true;

				swap(x, y, x+pots, y+1);

			}
		}
		
		/* --- SLIDE SIDEWAYS --- */
		
		let pots = [];
		if(mats[grid[x][y+1].id].density >= mats[grid[x][y].id].density) { // cell below denser or same
			{ // slide left
				if(
					mats[grid[x][y].id].density > mats[grid[x-1][y].id].density && // cell denser than cell on left
					(mats[grid[x][y].id].type === 2 || mats[grid[x][y].id].type === 3) && // cell liquid or gas
					(mats[grid[x-1][y].id].type === 2 || mats[grid[x-1][y].id].type === 3) && // cell on left liquid or gas
					grid[x-1][y].id != grid[x][y].id // not same material
				)
				pots.push(-1);
			}
			{ // slide right
				if(
					mats[grid[x][y].id].density > mats[grid[x+1][y].id].density && // cell denser than cell on right
					(mats[grid[x][y].id].type === 2 || mats[grid[x][y].id].type === 3) && // cell liquid or gas
					(mats[grid[x+1][y].id].type === 2 || mats[grid[x+1][y].id].type === 3) && // cell on right liquid or gas
					grid[x+1][y].id != grid[x][y].id // not same material
				)
				pots.push(1);
			}
		}
		
		if(pots.length !== 0) {
			
			if(mats[grid[x][y].id].type === 3) { // if gas
				if(rNum(3) === 0) { // random number
					pots = rItem(pots);
					swap(x, y, x+pots, y);
				}
			} else { // otherwise if liquid
				let wets = [];
				for (let i = 0; i < pots.length; i++) {
					if(grid[x][y].pushedUp === true) {
						wets.push(rNum(2) + 100);
					} else {
						let search = 0;
						let rx = x + pots[i];
						do {
							search++;
							if(mats[grid[rx][y].id].density > mats[grid[x][y].id].density) { // can't fall down this way
								search = Infinity;
								break;
							}
							rx += pots[i];
						} while(mats[grid[rx][y+1].id].density >= mats[grid[x][y].id].density);
						wets.push(search);
					}
				}
				//console.log(wets);
				pots = pots[rItem(minpos(wets))];
				if(grid[x][y].pushedUp === true) {
					if(rNum(4) == 0) swap(x, y, x + pots, y);
				} else {
					swap(x, y, x + pots, y);
				}
			}
		}
	} // if
	} // if
	} // for
	} // for
}
function temps() {
	
	// make a list of every cell location and shuffle it
	var cells = [];
	for (let i = 1; i < dim.x-1; i++) {
		for(let j = 1; j < dim.y-1; j++) {
			cells.push({x: i, y: j});
		}
	}
	gridcells = shuffle(cells);
	
	for (let i = 0; i < cells.length; i++) {
		var cell = cells[i];
		var pots = [];
		/*if(grid[cell.x][cell.y].temp == null)
			continue;*/

		if(grid[cell.x][cell.y].temp > grid[cell.x-1][cell.y].temp) pots.push({x:-1,y:0});
		if(grid[cell.x][cell.y].temp > grid[cell.x+1][cell.y].temp) pots.push({x:1,y:0});
		if(grid[cell.x][cell.y].temp > grid[cell.x][cell.y-1].temp) pots.push({x:0,y:-1});
		if(grid[cell.x][cell.y].temp > grid[cell.x][cell.y+1].temp) pots.push({x:0,y:1});
		if(pots.length != 0) {
			pots = shuffle(pots);
			for (let i = 0; i < pots.length; i++) {
				let mod = tempS * (mats[grid[cell.x][cell.y].id].cond+mats[grid[cell.x+pots[i].x][cell.y+pots[i].y].id].cond) / 2; // tempS * (cond1+cond2)/2
				let change = (grid[cell.x][cell.y].temp - grid[cell.x+pots[i].x][cell.y+pots[i].y].temp) * mod;
				grid[cell.x][cell.y].temp -= change;
				grid[cell.x+pots[i].x][cell.y+pots[i].y].temp += change;
			}
		}
	}
}
var FPS = 235;
var stepN = 0;
var times = {
	total: 0,
	cellSteps: 0,
	gravity: 0,
	temps: 0
};
var prevTimes = {
	total: [],
	cellSteps: [],
	gravity: [],
	temps: []
};
function step(force=false) {
	let startTime = window.performance.now();
	if(!running && !force)
		return false;
	stepN++;

	let ttime;
	let jobTime = window.performance.now();
	
	var sumTemps = 0;
	var sumCells = 0;
	
	for (let y = 1; y < dim.y-1; y++) {
		for (let x = 1; x < dim.x-1; x++) {
			grid[x][y].graved = false;
			grid[x][y].pushedUp = false;

			mats[grid[x][y].id].step(x, y);

			if(grid[x][y].burns.burnTemp) {
				workOutBurning(x, y);
			}
			if(stateChanges) {
				if(grid[x][y].temp < grid[x][y].stateChanges.downTemp && rNum(tempRan) == 0) {
					stateChange(x, y, grid[x][y].stateChanges.downTo);
				} else if(grid[x][y].temp > grid[x][y].stateChanges.upTemp && rNum(tempRan) == 0) {
					stateChange(x, y, grid[x][y].stateChanges.upTo);
				}
			}

			grid[x][y].timer++;
			if(!isNaN(grid[x][y].temp)) { // not a vaccum
				sumTemps += grid[x][y].temp;
				sumCells++;
			}
		}
	}
	avrTemp = sumTemps / sumCells;
	
	ttime = window.performance.now();
	times.cellSteps = ttime - jobTime;
	jobTime = ttime;

	gravities();
	
	ttime = window.performance.now();
	times.gravity = ttime - jobTime;
	jobTime = ttime;

	if(ttime - startTime < 18)
		temps();

	ttime = window.performance.now();
	times.temps = ttime - jobTime;
	jobTime = ttime;

	if(mousedown && mousein) {
		pen(mousepos.x, mousepos.y);
	}
	showOnCell();
	
	ttime = window.performance.now();
	times.total = ttime - startTime;
	for (const key in times) {
		if(prevTimes[key].length > 48) {
			prevTimes[key].shift();
		}
		prevTimes[key].push(times[key]);
	}
}