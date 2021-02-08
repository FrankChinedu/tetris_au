
export interface GameData {
  type: string;
  ended: boolean;
  started: boolean;
  mode: string;
  allowedPlayers: number;
  criteria: string;
  baseScore: number;
  winScore: number;
  winTime: number;
  _id?: string;
  tetriminoes: string;
  creatorId: string;
  gameId: string;
  username: string;
  clientId: string;
}

export interface IcreateGame {
  gameCreatorUsername: string,
  gameData: GameData
};

export interface IRoomValues {
    name: string;
    score: number;
    checkedOut: boolean
}
export interface IRoomMembers {
    [key: string]: IRoomValues
}
