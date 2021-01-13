
import { Socket, Server } from 'socket.io';
import EVENT_TYPES from '../../../Events/constant';

import EventEmitter from '../../../Events';
import { IcreateGame, GameData } from '../../../interfaces';

const gameRooms:any = {};
const gameDataStore: any = {};

export default (client: Socket, io: Server): void => {
  EventEmitter.on(EVENT_TYPES.CREATE_GAME_DATA, (createGameData: IcreateGame) => {
    const gameId = createGameData.gameData.gameId;
    const gameData = createGameData.gameData;
    gameDataStore[gameId] = gameData;
  });

  client.on(EVENT_TYPES.NEW_TETRIS_GAME_SESSION, handleCreateNewTetrisSession);
  client.on(EVENT_TYPES.JOIN_TETRIS_GAME_SESSION, handleJoinTetrisSession);

  function handleCreateNewTetrisSession (roomName: string) {
    const gameData = gameDataStore[roomName];
    if (gameData) {
      gameRooms[client.id] = roomName;
      client.join(roomName);
      client.emit(EVENT_TYPES.TETRIS_GAME_SESSION_DATA, gameData);
    }
  }

  function handleJoinTetrisSession (roomName: string) {
    const roomLength = (io.in(roomName).allSockets() as unknown) as number;
    const gameData = gameDataStore[roomName] as GameData;
    if (gameData) {
      gameRooms[client.id] = roomName;
      client.join(roomName);

      if (+roomLength === +gameData.allowedPlayers) {
        client.in(roomName).emit(EVENT_TYPES.START_TETRIS_GAME_SESSION);
      }
    }
  }
  // socket.i/ test game
  setTimeout(() => {
    client.emit('start_game');
    console.log('done');
  }, 3000);
};
