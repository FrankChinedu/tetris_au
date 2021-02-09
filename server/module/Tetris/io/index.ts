
import { Socket, Server } from 'socket.io';
import EVENT_TYPES from '../../../Events/constant';

import EventEmitter from '../../../Events';
import { IcreateGame, GameData, IRoomMembers, IRoomValues } from '../../../interfaces';

// const gameRooms:any = {};
const gameDataStore: any = {};
const gameDataRecords: any = {};

export default (client: Socket, io: Server): void => {
  EventEmitter.on(EVENT_TYPES.CREATE_GAME_DATA, (createGameData: IcreateGame) => {
    const gameId = createGameData.gameData.gameId;
    const gameData = createGameData.gameData;
    gameDataStore[gameId] = gameData;
    setTimeout(() => {
      EventEmitter.removeAllListeners();
    }, 0);
  });

  client.on(EVENT_TYPES.NEW_TETRIS_GAME_SESSION, handleCreateNewTetrisSession);
  client.on(EVENT_TYPES.JOIN_TETRIS_GAME_SESSION, handleJoinTetrisSession);
  client.on(EVENT_TYPES.START_TETRIS_GAME, handleStartGame);
  client.on(EVENT_TYPES.DELETE_GAME_SESSION, handleDeleteGameSession);
  client.on(EVENT_TYPES.GAME_OVER, handleUserGameOver);
  client.on(EVENT_TYPES.GET_MEMBER_STATE, handleGetMemberState);
  client.on(EVENT_TYPES.USER_SCORE_CHANGE, handleUserScoreChange);

  function handleCreateNewTetrisSession (roomName: string, username: string) {
    const gameData = gameDataStore[roomName] as GameData;
    if (gameData) {
      gameDataRecords[roomName] = {
        [username]: {
          name: username,
          score: 0,
          checkedOut: false,
          timestamp: Date.now()
        }
      };
      client.join(roomName);
      client.emit(EVENT_TYPES.TETRIS_GAME_SESSION_DATA, gameData);
    }
  }

  function hasRestarted (undefinedValue: string | undefined): void {
    if (!undefinedValue) {
      client.emit(EVENT_TYPES.CANCEL_GAME_SESSION);
    }
  }

  function handleGetMemberState (roomName: string) {
    const roomMembers = gameDataRecords[roomName];
    const gameData = gameDataStore[roomName] as GameData;

    if (!gameData) {
      hasRestarted(gameData);
      return;
    }
    // gameDataStore
    if (roomMembers) {
      io.in(roomName).emit(EVENT_TYPES.UPDATED_ROOM_MEMBER_STATE, roomMembers);
    }
  }

  async function handleJoinTetrisSession (roomName: string, username: string) {
    const gameData = gameDataStore[roomName] as GameData;
    if (gameData && gameDataRecords[roomName]) {
      if (gameData.started) {
        client.emit(EVENT_TYPES.GAME_SESSION_STARTED, { message: 'Sorry You cant join this game anymore. The game has started' });
        return;
      }
      if (gameDataRecords[roomName][username]) {
        // user name already picked
        client.emit(EVENT_TYPES.USERNAME_TAKEN_ERROR, { message: 'That username has already been taken. Sorry' });
        return;
      }
      client.join(roomName);
      gameDataRecords[roomName][username] = {
        name: username,
        score: 0,
        checkedOut: false,
        timestamp: Date.now()
      };
      client.emit(EVENT_TYPES.TETRIS_GAME_SESSION_DATA, gameData);
      client.to(roomName).emit(EVENT_TYPES.PLAYER_JOIN_GAME_ROOM,
        { message: `${username} just joined the game`, roomMembers: gameDataRecords[roomName] });

      const roomMembers = gameDataRecords[roomName];

      io.in(roomName).emit(EVENT_TYPES.UPDATED_ROOM_MEMBER_STATE, roomMembers);
    } else {
      client.emit(EVENT_TYPES.INVALID_TETRIS_GAME_ROOM, { message: 'The game ID you entered does not exist' });
    }
  }

  function handleStartGame (roomName: string) {
    const userGameRoom = gameDataRecords[roomName];

    if (!userGameRoom) {
      hasRestarted(userGameRoom);
      return;
    };
    const roomSize = Object.entries(userGameRoom).length;

    const gameData = gameDataStore[roomName] as GameData;
    if (gameData) {
      if (roomSize <= 1) {
        client.emit(EVENT_TYPES.TETRIS_GAME_ROOM_SIZE, { message: 'It seems like you\'re the only one in the room, wanna play single player instead?' });
        return;
      }
      gameData.started = true;
      io.in(roomName).emit(EVENT_TYPES.START_TETRIS_GAME_SESSION);
    } else {
      client.emit(EVENT_TYPES.INVALID_TETRIS_GAME_ROOM, { message: 'The game ID you entered does not exist' });
      if (!gameData) {
        hasRestarted(gameData);
      }
    }
  }

  function handleDeleteGameSession (roomName: string, username: string, adminName: string) {
    const userGameRoom = gameDataRecords[roomName];

    const gameData = gameDataStore[roomName] as GameData;

    if (!gameData) {
      hasRestarted(gameData);
      return;
    }

    if (!userGameRoom) return;
    const roomSize = Object.entries(userGameRoom).length;

    if (roomSize === 1 && username === adminName) {
      delete gameDataRecords[roomName];
      delete gameDataStore[roomName];
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

  function handleUserGameOver ({ roomName, userName }: {[key: string]: string}) {
    const roomMembers = gameDataRecords[roomName] as IRoomMembers;
    const gameData = gameDataStore[roomName] as GameData;

    if (!gameData) {
      hasRestarted(gameData);
      return;
    }
    roomMembers[userName].checkedOut = true;

    const roomArray = Object.values(roomMembers) as IRoomValues[];
    const hasNotCheckedOut = roomArray.filter(value => value.checkedOut === false);
    if (hasNotCheckedOut.length === 1) {
      io.in(roomName).emit(EVENT_TYPES.GAME_SESSION_OVER, { gameHasNotEnded: false });
      gameData.ended = true;
      delete gameDataRecords[roomName];
      delete gameDataStore[roomName];
    } else {
      client.emit(EVENT_TYPES.GAME_SESSION_OVER, { gameHasNotEnded: true });
      client.in(roomName).emit(EVENT_TYPES.USER_HAS_CHECKED_OUT_GAME_SESSION, `${userName} has checked out of game`);
    }
  }

  function handleUserScoreChange ({ roomName, userName, score }: {[key: string]: string}) {
    const roomMembers = gameDataRecords[roomName];
    if (roomMembers) {
      roomMembers[userName].score = score;
      roomMembers[userName].timestamp = Date.now();
      io.in(roomName).emit(EVENT_TYPES.UPDATED_ROOM_MEMBER_STATE, roomMembers);
    };
    const gameData = gameDataStore[roomName] as GameData;

    if (!gameData) {
      hasRestarted(gameData);
    }
  }

  client.on('disconnect', (reason) => {
    console.log('client', client.id);
    console.log('reason', reason);
  });
};
