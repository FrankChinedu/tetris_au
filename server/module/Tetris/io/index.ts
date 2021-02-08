
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
  client.on(EVENT_TYPES.DELETE_GAME_SESSION, handleDeleteGameSession);
  client.on(EVENT_TYPES.GAME_OVER, handleUserGameOver);
  client.on(EVENT_TYPES.GET_MEMBER_STATE, handleGetMemberState);
  client.on(EVENT_TYPES.USER_SCORE_CHANGE, handleUserScoreChange);

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

  function handleGetMemberState (roomName: string) {
    const roomMembers = gameDataRecords[roomName];
    if (roomMembers) {
      io.in(roomName).emit(EVENT_TYPES.UPDATED_ROOM_MEMBER_STATE, roomMembers);
    }
  }

  async function handleJoinTetrisSession (roomName: string, username: string) {
    // const roomLength = await (io.in(roomName).allSockets() as unknown) as any;

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
      client.to(roomName).emit(EVENT_TYPES.PLAYER_JOIN_GAME_ROOM,
        { message: `${username} just joined the game`, roomMembers: gameDataRecords[roomName] });

      const roomMembers = gameDataRecords[roomName];

      io.in(roomName).emit(EVENT_TYPES.UPDATED_ROOM_MEMBER_STATE, roomMembers);
    } else {
      client.emit(EVENT_TYPES.INVALID_TETRIS_GAME_ROOM, { message: 'Game room does not exist' });
    }
  }

  function handleStartGame (roomName: string) {
    const userGameRoom = gameDataRecords[roomName];

    if (!userGameRoom) return;
    const roomSize = Object.entries(userGameRoom).length;

    const gameData = gameDataStore[roomName] as GameData;
    if (gameData) {
      if (roomSize <= 1) {
        client.emit(EVENT_TYPES.TETRIS_GAME_ROOM_SIZE, { message: 'seems like only you is in the room' });
        return;
      }
      io.in(roomName).emit(EVENT_TYPES.START_TETRIS_GAME_SESSION);
    } else {
      client.emit(EVENT_TYPES.INVALID_TETRIS_GAME_ROOM, { message: 'Game room does not exist' });
    }
  }

  function handleDeleteGameSession (roomName: string, username: string, adminName: string) {
    const userGameRoom = gameDataRecords[roomName];

    if (!userGameRoom) return;
    const roomSize = Object.entries(userGameRoom).length;

    if (roomSize === 1 && username === adminName) {
      delete gameDataRecords[roomName];
    } else if (roomSize === 1 && username === adminName) {
      delete gameDataRecords[roomName];
    } else if (username !== adminName) {
      delete userGameRoom[username];
      // send new roomMember state
      const roomMembers = gameDataRecords[roomName];

      io.in(roomName).emit(EVENT_TYPES.UPDATED_ROOM_MEMBER_STATE, roomMembers);
    } else if (username === adminName) {
      delete userGameRoom[username];

      const nextAdmin = (Object.keys(userGameRoom)[0] as unknown) as string;
      const GameData = gameDataStore[roomName] as GameData;
      GameData.username = nextAdmin;
      const gameData = GameData;

      const roomMembers = gameDataRecords[roomName];
      io.in(roomName).emit(EVENT_TYPES.UPDATED_ROOM_MEMBER_STATE, roomMembers);
      io.in(roomName).emit(EVENT_TYPES.UPDATED_GAME_SESSION_DATA, gameData);
    }
  }

  function handleUserGameOver ({ roomName, username }: {[key: string]: string}) {
    console.log('username', username);
    // set user as the user that gamed over.
    io.in(roomName).emit(EVENT_TYPES.GAME_SESSION_OVER);
  }

  function handleUserScoreChange ({ roomName, userName, score }: {[key: string]: string}) {
    const roomMembers = gameDataRecords[roomName];
    if (roomMembers) {
      roomMembers[userName].score = score;
      io.in(roomName).emit(EVENT_TYPES.UPDATED_ROOM_MEMBER_STATE, roomMembers);
    };
  }

  client.on('disconnect', (reason) => {
    console.log('client', client.id);
    console.log('reason', reason);
  });
};
