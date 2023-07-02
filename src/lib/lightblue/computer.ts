import { allMoves, allLegalMoves } from './moves.ts';
import { Board } from './board.ts';
import type { move } from './constants.ts';

type i32 = number;

export let evaluated: i32 = 0;
let timeSpendSorting: number = 0;

export function computerMoveBoard(brd: Board, depth: i32): Board {
	let startTime: number = performance.now();
	if(depth === -1) {
		let moves: move[] = allLegalMoves(brd, brd.turn);
	
		return brd.movePieceCopy(moves[Math.floor(Math.random() * moves.length)]);
	} else {
		let boards: Board[] = allLegalMoves(brd, brd.turn).map((m: move) => brd.movePieceCopy(m)); 

		let best: Board = undefined;

		evaluated = 0;
		
		if(brd.turn === 1) {
			let boards: Board[] = allLegalMoves(brd, brd.turn).map((m: move) => brd.movePieceCopy(m)); 

			let max: i32 = -Infinity;

			for (let i = 0; i < boards.length; i++) {
				let value = minmax(boards[i], depth-1, -Infinity, Infinity);
				if(value > max) {
					max = value;
					best = boards[i];
				}
				evaluated++;
			}

			let endTime: number = performance.now();
			
			best.metaData = {
				time: Math.round(endTime - startTime),
				nodes: evaluated
			};

			return best;

		} else {
			let boards: Board[] = allLegalMoves(brd, brd.turn).map((m: move) => brd.movePieceCopy(m)); 

			let min: i32 = Infinity;

			for (let i = 0; i < boards.length; i++) {
				let value = minmax(boards[i], depth-1, -Infinity, Infinity);
				if(value < min) {
					min = value;
					best = boards[i];
				}
				evaluated++;
			}

			let endTime: number = performance.now();

			best.metaData = {
				time: Math.round(endTime - startTime),
				nodes: evaluated
			};

			return best;

		}
	}
}

function minmax(brd: Board, depth: i32, a: i32, b: i32): i32 {
	
	if(depth === 0) {
		return brd.eval();
	} else {
		if(brd.turn === 1) {
			let boards: Board[] = allLegalMoves(brd, brd.turn).map((m: move) => brd.movePieceCopy(m));

			let beforeTime = performance.now();
			
			boards.forEach((b: Board) => b.eval());
			
			boards.sort((a, b) => {
				return b.evalScore - a.evalScore;
			});
			timeSpendSorting += performance.now() - beforeTime;

			let value: i32 = -Infinity;

			for (let i = 0; i < boards.length; i++) {
				value = Math.max(value, minmax(boards[i], depth-1, a, b));
				if(value >= b)
					break;
				a = Math.max(a, value);
				evaluated++;
			}
			if(value === -Infinity) {
				if(brd.inCheck(1)) {
					return -Infinity;
				} else {
					return 0;
				}
			}
			return value;
		} else {
			let boards: Board[] = allLegalMoves(brd, brd.turn).map((m: move) => brd.movePieceCopy(m)); 
			
			
			let beforeTime = performance.now();
			boards.forEach((b: Board) => b.eval());

			boards.sort((a, b) => {
				return a.evalScore - b.evalScore;
			});
			timeSpendSorting += performance.now() - beforeTime;

			let value: i32 = Infinity;

			for (let i = 0; i < boards.length; i++) {
				value = Math.min(value, minmax(boards[i], depth-1, a, b));
				if(value <= a)
					break;
				b = Math.min(b, value);
				evaluated++;
			}
			if(value === Infinity) {
				if(brd.inCheck(0)) {
					return Infinity;
				} else {
					return 0;
				}
			}
			return value;
		}
	}
}