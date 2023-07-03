import { allMoves, allLegalMoves, legalPieceMoves } from './moves.ts';
import { pieceNumbers, pieceNotation, letters, startingPosition, positionValues, PAWN, KNIGHT, BISHOP, ROOK, QUEEN, KING, pieceValues } from './constants.ts';

import type { piece, move } from './constants.ts';

type i32 = number;
	
export class Board {
	pieces: piece[];
	turn: i32;
	queenCastles: boolean[];
	kingCastles: boolean[];
	evalAttacks: move[][];
	evalAllAttacks: move[][];
	evalScore: i32 | undefined;
	moveNum: i32;
	history: move[];
	notation: string[];

	metaData: {
		time: number | undefined,
		nodes: number | undefined
	}

	constructor(brd?: Board) {
		if(brd !== undefined) {
			this.pieces = brd.pieces.map((p: piece) => p.slice()); // copy pieces
			this.turn = brd.turn;
			this.evalAttacks = brd.evalAttacks;
			this.evalAllAttacks = brd.evalAllAttacks;
			this.evalScore = brd.evalScore;
			this.history = brd.history.slice();

			this.queenCastles = brd.queenCastles.slice();
			this.kingCastles = brd.kingCastles.slice();

			this.moveNum = brd.moveNum;

			this.metaData = { ...brd.metaData };

		} else {
			this.pieces = [];
			this.turn = 1;
			this.evalAttacks = [undefined, undefined];
			this.evalAllAttacks = [undefined, undefined];
			this.evalScore = undefined;
			this.history = [];
			
			this.queenCastles = [true, true];
			this.kingCastles = [true, true];
			
			this.moveNum = 0;
			
			this.metaData = { time: undefined, nodes: undefined };
		}
	}

	importString(str: string) {
		this.pieces = [];

		let position: i32 = 0;
		
		let i: i32 = 0;
		
		while(i < str.length && position < 64) {
			
			let char: string = str.charAt(i);
			let index: i32 = pieceNumbers.indexOf(char.toUpperCase());
			let color: i32 = +(char.toUpperCase() === char);
			
			
			if(index !== -1) {
				this.pieces.push([position, index, color]);
				
				position++;
			} else if(!isNaN(+char)) {
				position += +char;
			} else if(char === ' ') {
				break;
			}

			i++;
		}
		return this;
	}
	castleString() {
		return (this.kingCastles[1] ? 'K' : '-') + 
					 (this.queenCastles[1] ? 'Q' : '-') + 
					 (this.kingCastles[0] ? 'k' : '-') + 
					 (this.queenCastles[0] ? 'q' : '-');
	}

	getNotation() {
		let loopBoard = new Board();
		loopBoard.importString(startingPosition);

		let ret: string[] = [];

		for (let i = 0; i < this.history.length; i++) {
			let moveon = this.history[i];
			let p: piece = loopBoard.pieceAtPos(moveon[0]);
			let retNot = '';

			if(p[1] === KING) {
				// castling?
				if(moveon[0] === (p[2] === 0 ? 4 : 60)) {
					if(moveon[1] === (p[2] === 0 ? 6 : 62)) {
						// king side
						ret.push('O-O');
						loopBoard.movePiece(moveon);
						continue;
					} else if(moveon[1] === (p[2] === 0 ? 2 : 58)) {
						// queen side
						ret.push('O-O-O');
						loopBoard.movePiece(moveon);
						continue;
					}
				}
			}


			retNot += pieceNotation[p[1]];
			if(loopBoard.indexAtPos(moveon[1]) !== -1) {
				if(p[1] === PAWN) {
					retNot += letters[moveon[0] % 8];
				}
				retNot += 'x';
			}

			if(p[1] !== PAWN) {
				for (let j = 0; j < loopBoard.pieces.length; j++) {
					if(loopBoard.pieces[j][0] !== p[0] && loopBoard.pieces[j][2] === p[2] && loopBoard.pieces[j][1] === p[1] && legalPieceMoves(loopBoard, loopBoard.pieces[j][0]).includes(moveon[1])) {
						if(p[0] % 8 !== loopBoard.pieces[j][0] % 8) {
							retNot += letters[p[0] % 8];
						} else {
							retNot += (8 - Math.floor(p[0] / 8));
						}
					}
				}
			}

			retNot += letters[moveon[1] % 8] + (8 - Math.floor(moveon[1] / 8));

			if(p[1] === PAWN && (Math.floor(moveon[1] / 8) === 0 || Math.floor(moveon[1] / 8) === 7)) {
				retNot += '=Q';
			}

			loopBoard.movePiece(moveon);

			if(loopBoard.gameOver(loopBoard.turn) === 1) {
				retNot += '#';
			} else if(loopBoard.inCheck(loopBoard.turn)) {
				retNot += '+';
			}
			
			ret.push(retNot);
		}
		return ret;
	}

	pieceAtPos(pos: i32): piece {
		let ret: piece = this.pieces.find((p: piece) => p[0] === pos);

		if(ret === undefined) {
			return [pos, 0, -1];
		} else {
			return ret;
		}
	}

	indexAtPos(pos: i32): i32 {
		return this.pieces.findIndex((p: piece) => p[0] === pos);
	}

	findPiece(type: i32, color: i32): piece {
		for(let i = 0; i < this.pieces.length; i++) {
			if(this.pieces[i][1] === type && this.pieces[i][2] === color) {
				return this.pieces[i];
			}	
		}
		return [-1, type, color];
	}

	removePiece(pos: i32): boolean {
		let index: i32 = this.indexAtPos(pos);

		if(index !== -1) {
			this.pieces.splice(index, 1);
			return true;
		}
		return false;
	}

	movePiece(m: move): Board {
		if(m[0] === m[1]) {
			return this;
		}
	
		let captured = this.removePiece(m[1]);

		let index: i32 = this.indexAtPos(m[0]);
		let piece: piece = this.pieces[index];
		
		if(index === -1) {
			console.error('Wait there\'s no piece at ' + m[0]);
			return this;
		} else {
			piece[0] = m[1];
			if(piece[1] === KING) {
				// castling?
				if(m[0] === (piece[2] === 0 ? 4 : 60)) {
					if(m[1] === (piece[2] === 0 ? 6 : 62)) {
						// king side
						let rookindex: i32 = this.indexAtPos(piece[2] === 0 ? 7 : 63);
						if(rookindex !== -1) this.pieces[rookindex][0] = (piece[2] === 0 ? 5 : 61);
					} else if(m[1] === (piece[2] === 0 ? 2 : 58)) {
						// queen side
						let rookindex: i32 = this.indexAtPos(piece[2] === 0 ? 0 : 56);
						if(rookindex !== -1) this.pieces[rookindex][0] = (piece[2] === 0 ? 3 : 59);
					}
				}

				this.queenCastles[piece[2]] = false;
				this.kingCastles[piece[2]] = false;
			} else if(piece[1] === ROOK) {
				if(m[0] === (piece[2] === 0 ? 0 : 56)) {
					this.queenCastles[piece[2]] = false;
				} else if(m[0] === (piece[2] === 0 ? 7 : 63)) {
					this.kingCastles[piece[2]] = false;
				}
			} else if(piece[1] === PAWN && (Math.floor(m[1]/8) === 0 || (Math.floor(m[1]/8) === 7))) {
				this.pieces[index][1] = QUEEN;
			}
		}

		this.turn = +!this.turn;
		this.moveNum++;

		this.history.push(m);

		this.evalScore = undefined;
		this.evalAttacks = [undefined, undefined];
		this.evalAllAttacks = [undefined, undefined];

		return this;
	}

	movePieceCopy(m: move) {
		return (new Board(this)).movePiece(m);
	}
	
	inCheck(color: i32): boolean {
		let king: piece = this.findPiece(KING, color);

		if(king[0] === -1) {
			return false;
		}

		return this.allAttacks(+!color).find((m: move) => m[1] === king[0]) !== undefined;
	}

	// 0 for nothing, 1 for checkmate, -1 for stalemate
	gameOver(color: i32): i32 {
		let mymoves: move[] = this.attacks(color);

		if(mymoves.length === 0) {
			if(this.inCheck(color)) {
				return 1;
			} else {
				return -1;
			}
		} else {
			if(this.pieces.length === 2) {
				return -1;
			}
		}
		return 0;
	}

	attacks(color: i32): move[] {
		if(this.evalAttacks[color] === undefined) {
			let ret: move[] = allLegalMoves(this, color);

			this.evalAttacks[color] = ret;

			return ret;
		} else {
			return this.evalAttacks[color];
		}
	}
	
	allAttacks(color: i32): move[] {
		if(this.evalAllAttacks[color] === undefined) {
			let ret: move[] = allMoves(this, color);

			this.evalAllAttacks[color] = ret;

			return ret;
		} else {
			return this.evalAllAttacks[color];
		}
	}

	eval(): i32 {
		if(this.evalScore === undefined) {
			let endGame: number = 0;
			endGame += Math.min(1, (32 - this.pieces.length) * (0.6/32) + this.moveNum * (0.4/30));

			let value: i32 = 0;
			for (var i = 0; i < this.pieces.length; i++) {
				value += pieceValues[this.pieces[i][1]] * (this.pieces[i][2] * 2 - 1);
				value += Math.round(positionValues[this.pieces[i][1]][this.pieces[i][2] === 0 ? 63-this.pieces[i][0] : this.pieces[i][0]] * (this.pieces[i][2] * 2 - 1) * (1.1-endGame));

				if(this.pieces[i][1] === PAWN) {
					let p: piece;
					p = this.pieceAtPos(this.pieces[i][0] - 7 * (this.pieces[i][2] * 2 - 1));
					if(p[0] === this.pieces[i][2] && p[1] === PAWN)
						value += 40 * (this.pieces[i][2] * 2 - 1);
					
					p = this.pieceAtPos(this.pieces[i][0] - 9 * (this.pieces[i][2] * 2 - 1));
					if(p[0] === this.pieces[i][2] && p[1] === PAWN)
						value += 40 * (this.pieces[i][2] * 2 - 1);
				}
			}

			// king much better to be near center in end game
			let whiteKing: piece = this.findPiece(KING, 1);
			let blackKing: piece = this.findPiece(KING, 0);

			value -= Math.round((Math.abs(3.5-(whiteKing[0]%8)) + Math.abs(3.5-Math.floor(whiteKing[0]/8))) * 30 * endGame);
			value += Math.round((Math.abs(3.5-(blackKing[0]%8)) + Math.abs(3.5-Math.floor(blackKing[0]/8))) * 30 * endGame);


			/*let foundMove = false;
			// if black doesn't have pieces other than king and pawns
			if(this.pieces.findIndex((p: piece) => p[2] === 0 && p[0] !== KING && p[0] !== PAWN) === -1) {
				for (let i = 0; i < this.pieces.length; i++) {
					if(this.pieces[i][2] === 0 && legalPieceMoves(this, this.pieces[i][0]).length !== 0) {
						foundMove = true;
						break;
					}
				}
			}
			// if white doesn't have pieces other than king and pawns
			if(this.pieces.findIndex((p: piece) => p[2] === 1 && p[0] !== KING && p[0] !== PAWN) === -1) {
				for (let i = 0; i < this.pieces.length; i++) {
					if(this.pieces[i][2] === 1 && legalPieceMoves(this, this.pieces[i][0]).length !== 0) {
						foundMove = true;
						break;
					}
				}
			}

			if()*/

			/* -- everything past here must come last -- */

			this.evalScore = value;
			return value;
		} else {
			return this.evalScore;
		}
	}

	singleRay(pos: i32, offset: i32): piece {
		let poson: i32 = pos;
		let indexon: i32 = -1;
		
		let ox: i32 = (35 + offset)%8 - 3;
		let oy: i32 = Math.floor((35 + offset)/8) - 4;
		
		while(poson >= 0 && poson < 64 && poson%8 + ox < 8 && poson%8 + ox >= 0 && Math.floor(poson/8) + oy < 8 && Math.floor(poson/8) + oy >= 0 && indexon === -1) {
			poson += offset;
			indexon = this.indexAtPos(poson);
		}

		if(indexon === -1) {
			return [poson, 0, -1];
		} else {
			return [poson, this.pieces[indexon][1], this.pieces[indexon][2]];
		}
	}
	
	singleRayFilled(pos: i32, offset: i32): piece[] {
		let ret: piece[] = [];
		
		let poson: i32 = pos;
		let indexon: i32 = -1;
		
		let ox: i32 = (35 + offset)%8 - 3;
		let oy: i32 = Math.floor((35 + offset)/8) - 4;
		
		while(poson >= 0 && poson < 64 && poson%8 + ox < 8 && poson%8 + ox >= 0 && Math.floor(poson/8) + oy < 8 && Math.floor(poson/8) + oy >= 0 && indexon === -1) {
			poson += offset;
			indexon = this.indexAtPos(poson);
			
			if(indexon !== -1) {
				ret.push([poson, this.pieces[indexon][1], this.pieces[indexon][2]]);
			} else {
				ret.push([poson, 0, -1])
			}
		}
		return ret;
	}
	
	fullRay(pos: i32, offset: i32): piece[] {
		let ret: piece[] = [];
		
		let poson: i32 = pos;
		let indexon: i32 = -1;
		
		let ox: i32 = (35 + offset)%8 - 3;
		let oy: i32 = Math.floor((35 + offset)/8) - 4;
		
		while(poson >= 0 && poson < 64 && poson%8 + ox < 8 && poson%8 + ox >= 0 && Math.floor(poson/8) + oy < 8 && Math.floor(poson/8) + oy >= 0) {
			poson += offset;
			indexon = this.indexAtPos(poson);
			
			if(indexon !== -1) {
				ret.push([poson, this.pieces[indexon][1], this.pieces[indexon][2]]);
			}
		}
		return ret;	
	}
	
	fullRayFilled(pos: i32, offset: i32): piece[] {
		let ret: piece[] = [];
		
		let poson: i32 = pos;
		let indexon: i32 = -1;
		
		let ox: i32 = (35 + offset)%8 - 3;
		let oy: i32 = Math.floor((35 + offset)/8) - 4;
		
		while(poson >= 0 && poson < 64 && poson%8 + ox < 8 && poson%8 + ox >= 0 && Math.floor(poson/8) + oy < 8 && Math.floor(poson/8) + oy >= 0) {
			poson += offset;
			indexon = this.indexAtPos(poson);
			
			if(indexon !== -1) {
				ret.push([poson, this.pieces[indexon][1], this.pieces[indexon][2]]);
			} else {
				ret.push([poson, 0, -1])
			}
		}
		return ret;	
	}
}