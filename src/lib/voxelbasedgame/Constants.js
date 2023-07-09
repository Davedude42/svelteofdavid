
export const GRAVITY = -0.00003;

export const PLAYER_ACCELERATION = 0.0001;
export const PLAYER_FRICTION = 0.00005;
export const PLAYER_SPEED = 0.004;
export const JUMP_HEIGHT = 1.2;
export const JUMP_SPEED = Math.sqrt(2 * JUMP_HEIGHT * Math.abs(GRAVITY));

export const PLAYER_RADIUS = 0.1;
export const PLAYER_HEIGHT = 1.9;

export const SENSITIVITY = 0.005;

export const CAMERA_HEIGHT = 1.7;

export function toChunkId(cx, cz) {
	return cx + 'x' + cz;
}