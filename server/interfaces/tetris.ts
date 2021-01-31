
export interface GameData {
  type: string;
  ended: boolean;
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
}

export interface IcreateGame {
  gameCreatorUsername: string,
  gameData: GameData
};
