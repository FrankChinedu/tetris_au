
import { Socket, Server } from 'socket.io';
import EVENT_TYPES from '../../../Events/constant';

import EventEmitter from '../../../Events';
import { IcreateGame, GameData } from '../../../interfaces';

const gameRooms:any = {};
const gameDataStore: any = {};
const gameDataRecords: any = {};

export default (client: Socket, io: Server): void => {
  EventEmitter.on(EVENT_TYPES.CREATE_GAME_DATA, (createGameData: IcreateGame) => {
    const gameId = createGameData.gameData.gameId;
    const gameData = createGameData.gameData;
    gameDataStore[gameId] = gameData;
    EventEmitter.removeListener(EVENT_TYPES.CREATE_GAME_DATA, () => {
      console.log('listener removed');
    });
  });

  client.on(EVENT_TYPES.NEW_TETRIS_GAME_SESSION, handleCreateNewTetrisSession);
  client.on(EVENT_TYPES.JOIN_TETRIS_GAME_SESSION, handleJoinTetrisSession);
  client.on(EVENT_TYPES.START_TETRIS_GAME, handleStartGame);

  function handleCreateNewTetrisSession (roomName: string, username: string) {
    const gameData = gameDataStore[roomName];
    if (gameData) {
      gameRooms[client.id] = roomName;
      gameDataRecords[roomName] = {
        [username]: {
          name: username,
          score: 0
        }
      };
      client.join(roomName);
      client.emit(EVENT_TYPES.TETRIS_GAME_SESSION_DATA, gameData);
    }
  }

  async function handleJoinTetrisSession (roomName: string, username: string) {
    const roomLength = await (io.in(roomName).allSockets() as unknown) as any;

    const gameData = gameDataStore[roomName] as GameData;

    if (gameData && gameDataRecords[roomName]) {
      if (gameDataRecords[roomName][username]) {
        // user name already picked
        client.emit(EVENT_TYPES.USERNAME_TAKEN_ERROR, { message: 'user name already taken' });
        return;
      }
      gameRooms[client.id] = roomName;
      client.join(roomName);
      gameDataRecords[roomName][username] = {
        name: username,
        score: 0
      };
      client.emit(EVENT_TYPES.TETRIS_GAME_SESSION_DATA, gameData);
    } else {
      client.emit(EVENT_TYPES.INVALID_TETRIS_GAME_ROOM, { message: 'Game room does not exist' });
    }
  }

  function handleStartGame (roomName: string) {
    const gameData = gameDataStore[roomName] as GameData;
    if (gameData) {
      client.in(roomName).emit(EVENT_TYPES.START_TETRIS_GAME_SESSION);
    } else {
      client.emit(EVENT_TYPES.INVALID_TETRIS_GAME_ROOM, { message: 'Game room does not exist' });
    }
  }

  client.on('disconnect', (reason) => {
    console.log('client', client.id);
    console.log('reason', reason);
  });
};
