const SOCKET_EVENTS = {
    NEW_TETRIS_GAME_SESSION: 'NEW_TETRIS_GAME_SESSION',
    TETRIS_GAME_SESSION_DATA: 'TETRIS_GAME_SESSION_DATA',
    JOIN_TETRIS_GAME_SESSION: 'JOIN_TETRIS_GAME_SESSION',
    START_TETRIS_GAME_SESSION: 'START_TETRIS_GAME_SESSION',
    INVALID_TETRIS_GAME_ROOM: 'INVALID_TETRIS_GAME_ROOM',
    USERNAME_TAKEN_ERROR: 'USERNAME_TAKEN_ERROR',
    TETRIS_GAME_ROOM_SIZE: 'TETRIS_GAME_ROOM_SIZE',
    PLAYER_JOIN_GAME_ROOM: 'PLAYER_JOIN_GAME_ROOM',
    START_TETRIS_GAME: 'START_TETRIS_GAME',
    SCORE_CHANGED: 'SCORE_CHANGED',
    DELETE_GAME_SESSION: 'DELETE_GAME_SESSION',
    UPDATED_GAME_SESSION_DATA: 'UPDATED_GAME_SESSION_DATA',
    UPDATED_ROOM_MEMBER_STATE: 'UPDATED_ROOM_MEMBER_STATE',
    GET_MEMBER_STATE: 'GET_MEMBER_STATE',
    USER_SCORE_CHANGE: 'USER_SCORE_CHANGE',
    GAME_OVER: 'GAME_OVER',
    GAME_SESSION_OVER: 'GAME_SESSION_OVER',
    GAME_SESSION_STARTED: 'GAME_SESSION_STARTED',
    USER_HAS_CHECKED_OUT_GAME_SESSION: 'USER_HAS_CHECKED_OUT_GAME_SESSION',
    CANCEL_GAME_SESSION: 'CANCEL_GAME_SESSION',
    GAME_OVER_ALL: 'GAME_OVER_ALL',
    PING: 'PING',
    PING_TIME: 50000,
  };
  
  export default SOCKET_EVENTS;