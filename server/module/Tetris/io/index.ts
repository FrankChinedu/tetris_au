
import { Socket, Server } from 'socket.io';
import EVENT_TYPES from '../../../Events/constant';

import EventEmitter from '../../../Events';
import { GameData } from '../../../interfaces';

export default (socket: Socket, io: Server): void => {
  EventEmitter.on(EVENT_TYPES.CREATE_GAME_DATA, (gameData: GameData) => {
    console.log('game data heard', gameData);
  });
  setTimeout(() => {
    socket.emit('start_game');
    console.log('done');
  }, 3000);
  // app.use(`${api}/user`, userRoute);
  // socket.in().
};
