export interface Player {
  id: string;
  name: string;
  img: string;
  isBot?: boolean;
  position: number;
  initialPosition: number;
}

export interface GameServer {
  id: string;
  name: string;
  isPrivate: boolean;
  cntPlayers: string;
}
