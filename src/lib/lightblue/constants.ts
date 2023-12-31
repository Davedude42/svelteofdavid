
	
type i32 = number;


export type move = i32[];
export type piece = i32[];

/*
board/piece:
	0 - position
	1 - piece
	2 - color
*/

export const pieceNumbers: string[] = ['', 'P', 'N', 'B', 'R', 'Q', 'K'];
export const pieceValues: i32[] = [0, 100, 300, 300, 500, 900, 90000];

export const letters: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
export const pieceNotation: string[] = ['', '', 'N', 'B', 'R', 'Q', 'K'];

export const PAWN:   i32 = 1;
export const KNIGHT: i32 = 2;
export const BISHOP: i32 = 3;
export const ROOK:   i32 = 4;
export const QUEEN:  i32 = 5;
export const KING:   i32 = 6;

export const startingPosition = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';


export const positionValues: i32[][] = [
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

	[0,0,0,0,0,0,0,0,
	100,100,110,120,120,110,100,100,
	80,80,90,100,100,90,80,80,
	30,30,50,90,90,50,30,30,
	30,40,70,80,80,70,40,30,
	0,10,20,40,40,20,10,0,
	0,20,20,0,0,20,20,0,
	0,0,0,0,0,0,0,0],

	[-50,-20,-10,-10,-10,-10,-20,-50,
	-40,-10,0,0,0,0,-10,-40,
	-30,20,30,50,50,30,20,-30,
	-20,20,50,60,60,50,20,-20,
	-20,30,40,60,60,40,30,-20,
	-30,10,20,40,40,20,10,-30,
	-40,-10,0,10,10,0,-10,-40,
	-50,-20,-10,-10,-10,-10,-20,-50],

	[-30,-20,-10,-10,-10,-10,-20,-30,
	-20,-10,0,0,0,0,-10,-20,
	-10,30,30,50,50,30,30,-10,
	0,30,50,60,60,50,30,0,
	0,40,40,60,60,40,40,0,
	-10,10,20,40,40,20,10,-10,
	-20,-10,0,10,10,0,-10,-20,
	-30,-20,-10,-10,-10,-10,-20,-30],

	[0,10,10,10,10,10,10,0,
	30,40,40,40,40,40,40,30,
	0,10,10,10,10,10,10,0,
	0,10,10,10,10,10,10,0,
	0,10,10,10,10,10,10,0,
	0,10,10,10,10,10,10,0,
	0,10,10,10,10,10,10,0,
	10,10,20,20,20,20,10,10,],

	[-30,-20,-10,-10,-10,-10,-20,-30,
	-20,-10,0,0,0,0,-10,-20,
	-10,30,30,50,50,30,30,-10,
	0,30,50,60,60,50,30,0,
	0,40,40,60,60,40,40,0,
	-10,10,20,40,40,20,10,-10,
	-20,-10,0,10,10,0,-10,-20,
	-30,-20,-10,-10,-10,-10,-20,-30],

	[-120,-110,-100,-90,-90,-100,-110,-120,
	-100,-90,-80,-70,-70,-80,-90,-100,
	-80,-70,-60,-50,-50,-60,-70,-80,
	-60,-50,-40,-30,-30,-40,-50,-60,
	-40,-30,-20,-10,-10,-20,-30,-40,
	-20,-10,0,10,10,0,-10,-20,
	0,10,20,30,30,20,10,0,
	0,80,80,30,30,80,80,0]
];