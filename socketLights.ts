import { Server } from 'socket.io';

const LENGTH = 30*5*3-18;

export const socketLights = {
	name: 'socketLights',
	configureServer(server) {

		let masterPixels: number[][] = [];

		for(let i = 0; i < LENGTH; i++) {
			masterPixels[i] = [0, 0, 0];
		}
		
    const io = new Server(server.httpServer);

    io.on('connection', (socket) => {
			let username: string = `User ${Math.round(Math.random() * 999999)}`;
			
			console.log('New user: ' + username);

			socket.emit('initial', { username, pixels: masterPixels });

			socket.on('updateToServer', (msg) => {
				let { indeces, color } = msg;
				
				for (let i = 0; i < indeces.length; i++) {
					masterPixels[indeces[i]] = color;
				}

				io.emit('pixelsToClient', {
					pixels: masterPixels
				});
			});
    });

	}
};