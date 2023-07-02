import { Board } from './board.ts';
import { pieceNumbers, pieceNotation, letters, startingPosition, positionValues, PAWN, KNIGHT, BISHOP, ROOK, QUEEN, KING } from './constants.ts';

import type { piece, move } from './constants.ts';

type i32 = number;

export function rookMoves(brd: Board, pos: i32, color: i32): i32[] {
	var ret: piece[] = [];
	
	let arr = brd.singleRayFilled(pos, 8);
	if(arr.length > 0 && arr[arr.length-1][2] === color)
		arr.pop();
	ret = ret.concat(arr);
	
	arr = brd.singleRayFilled(pos, -1);
	if(arr.length > 0 && arr[arr.length-1][2] === color)
		arr.pop();
	ret = ret.concat(arr);
	
	arr = brd.singleRayFilled(pos, 1);
	if(arr.length > 0 && arr[arr.length-1][2] === color)
		arr.pop();
	ret = ret.concat(arr);
	
	arr = brd.singleRayFilled(pos, -8);
	if(arr.length > 0 && arr[arr.length-1][2] === color)
		arr.pop();
	ret = ret.concat(arr);
	
	return ret.map(piece => piece[0]);
}

export function bishopMoves(brd: Board, pos: i32, color: i32): i32[] {
	var ret: piece[] = [];
	
	let arr = brd.singleRayFilled(pos, 7);
	if(arr.length > 0 && arr[arr.length-1][2] === color)
		arr.pop();
	ret = ret.concat(arr);
	
	arr = brd.singleRayFilled(pos, -9);
	if(arr.length > 0 && arr[arr.length-1][2] === color)
		arr.pop();
	ret = ret.concat(arr);
	
	arr = brd.singleRayFilled(pos, 9);
	if(arr.length > 0 && arr[arr.length-1][2] === color)
		arr.pop();
	ret = ret.concat(arr);
	
	arr = brd.singleRayFilled(pos, -7);
	if(arr.length > 0 && arr[arr.length-1][2] === color)
		arr.pop();
	ret = ret.concat(arr);
	
	return ret.map(piece => piece[0]);
}

export function pawnMoves(brd: Board, pos: i32, color: i32): i32[] {
	let ret: i32[] = [];
	let testindex: i32;

	if(color === 1) {
		if(pos-8 >= 0 && brd.indexAtPos(pos-8) === -1)
			ret.push(pos-8);
		if(pos-16 >= 0 && brd.indexAtPos(pos-16) === -1 && brd.indexAtPos(pos-8) === -1 && Math.floor(pos / 8) === 6)
			ret.push(pos-16);
	
		testindex = brd.indexAtPos(pos-7);
		if(pos-7 >= 0 && pos%8 < 7 && testindex !== -1 && brd.pieces[testindex][2] !== color)
			ret.push(pos-7);
			
		testindex = brd.indexAtPos(pos-9);
		if(pos-9 >= 0 && pos%8 > 0 && testindex !== -1 && brd.pieces[testindex][2] !== color)
			ret.push(pos-9);
	} else {
		if(pos+8 < 64 && brd.indexAtPos(pos+8) === -1)
			ret.push(pos+8);
		if(pos+16 < 64 && brd.indexAtPos(pos+16) === -1 && brd.indexAtPos(pos+8) === -1 && Math.floor(pos / 8) === 1)
			ret.push(pos+16);
	
		testindex = brd.indexAtPos(pos+7);
		if(pos+7 < 64 && pos%8 > 0 && testindex !== -1 && brd.pieces[testindex][2] !== color)
			ret.push(pos+7);
			
		testindex = brd.indexAtPos(pos+9);
		if(pos+9 < 64 && pos%8 < 7 && testindex !== -1 && brd.pieces[testindex][2] !== color)
			ret.push(pos+9);
	}

	return ret;
}

export function kingMoves(brd: Board, pos: i32, color: i32): i32[] {
	let ret: i32[] = [];
	
	if(pos % 8 > 0 && brd.pieceAtPos(pos - 1)[2] !== color)
		ret.push(pos - 1);
	if(pos % 8 < 7 && brd.pieceAtPos(pos + 1)[2] !== color)
		ret.push(pos + 1);
	if(pos - 8 >= 0 && brd.pieceAtPos(pos - 8)[2] !== color)
		ret.push(pos - 8);
	if(pos + 8 < 64 && brd.pieceAtPos(pos + 8)[2] !== color)
		ret.push(pos + 8);
		
	if(pos % 8 > 0 && pos - 9 >= 0 && brd.pieceAtPos(pos - 9)[2] !== color)
		ret.push(pos - 9);
	if(pos % 8 < 7 && pos + 9 < 64 && brd.pieceAtPos(pos + 9)[2] !== color)
		ret.push(pos + 9);
	if(pos % 8 < 7 && pos - 7 >= 0 && brd.pieceAtPos(pos - 7)[2] !== color)
		ret.push(pos - 7);
	if(pos % 8 > 0 && pos + 7 < 64 && brd.pieceAtPos(pos + 7)[2] !== color)
		ret.push(pos + 7);

	if(brd.kingCastles[color] === true && brd.indexAtPos(pos + 1) === -1 && brd.indexAtPos(pos + 2) === -1) {
		ret.push(pos + 2);
	}
	if(brd.queenCastles[color] === true && brd.indexAtPos(pos - 1) === -1 && brd.indexAtPos(pos - 2) === -1 && brd.indexAtPos(pos - 3) === -1) {
		ret.push(pos - 2);
	}
		
	return ret;
}

export function knightMoves(brd: Board, pos: i32, color: i32): i32[] {
	let ret: i32[] = [];
	
	if(pos % 8 > 1 && pos-10 >= 0 && brd.pieceAtPos(pos-10)[2] !== color)
		ret.push(pos-10);
	if(pos % 8 > 0 && pos-17 >= 0 && brd.pieceAtPos(pos-17)[2] !== color)
		ret.push(pos-17);
	if(pos % 8 < 7 && pos-15 >= 0 && brd.pieceAtPos(pos-15)[2] !== color)
		ret.push(pos-15);
	if(pos % 8 < 6 && pos-6 >= 0 && brd.pieceAtPos(pos-6)[2] !== color)
		ret.push(pos-6);
		
	if(pos % 8 < 6 && pos+10 < 64 && brd.pieceAtPos(pos+10)[2] !== color)
		ret.push(pos+10);
	if(pos % 8 < 7 && pos+17 < 64 && brd.pieceAtPos(pos+17)[2] !== color)
		ret.push(pos+17);
	if(pos % 8 > 0 && pos+15 < 64 && brd.pieceAtPos(pos+15)[2] !== color)
		ret.push(pos+15);
	if(pos % 8 > 1 && pos+6 < 64 && brd.pieceAtPos(pos+6)[2] !== color)
		ret.push(pos+6);
		
	return ret;
}

export function pieceMoves(brd: Board, pos: i32): i32[] {
	let pce: piece = brd.pieceAtPos(pos);

	switch(pce[1]) {
		case ROOK:
			return rookMoves(brd, pos, pce[2]);
		case BISHOP:
			return bishopMoves(brd, pos, pce[2]);
		case PAWN:
			return pawnMoves(brd, pos, pce[2]);
		case QUEEN:
			return rookMoves(brd, pos, pce[2]).concat(bishopMoves(brd, pos, pce[2]));
		case KING:
			return kingMoves(brd, pos, pce[2]);
		case KNIGHT:
			return knightMoves(brd, pos, pce[2]);
	}
	return [];
}

export function legalPieceMoves(brd: Board, pos: i32): i32[] {
	let moves: i32[] = pieceMoves(brd, pos);
	let piece: piece = brd.pieceAtPos(pos);
	
	return moves.filter(move => !(new Board(brd)).movePiece([pos, move]).inCheck(piece[2]));
}

export function isLegalMove(brd: Board, pos1: i32, pos2: i32): boolean {
	let moves: i32[] = legalPieceMoves(brd, pos1);
	
	return moves.includes(pos2);
}

export function allLegalMoves(brd: Board, color: i32): move[] {
	let ret: move[] = [];
	
	for (var i = 0; i < brd.pieces.length; i++) {
		if(brd.pieces[i][2] === color) {
			let moves = pieceMoves(brd, brd.pieces[i][0]);
			moves.forEach(move => {
				if(!brd.movePieceCopy([brd.pieces[i][0], move]).inCheck(color)) {
					ret.push([brd.pieces[i][0], move]);
				}
			});
		}
	}
	return ret;
}

export function allMoves(brd: Board, color: i32): move[] {
	let ret: move[] = [];
	
	for (var i = 0; i < brd.pieces.length; i++) {
		if(brd.pieces[i][2] === color) {
			let moves = pieceMoves(brd, brd.pieces[i][0]);
			moves.forEach(move => {
				ret.push([brd.pieces[i][0], move]);
			});
		}
	}
	return ret;
}