import { GameServer, Player } from "../utils/interfaces";

export interface ServerInterface {
  player?: Player;

  getServers(): Promise<GameServer[]>;

  getServerPlayers(): Promise<Player[]>;

  createServer(serverName: string, serverPassword?: string): Promise<string>;

  joinServer(serverId: string, serverPassword?: string): Promise<string>;

  emitReady(): void;

  startQuestions(): void;

  next(index: number): void;

  nextPlayer(): void;

  leaveServer(): void;

  onPlayersUpdated(
    cb: (data: {
      startPosition: number;
      endPosition: number;
      direction: number;
      currentPlayerId: string;
    }) => void
  ): () => void;

  onGameInit(cb: (data: { players: Player[] }) => void): () => void;

  onQuestionAnswer(cb: (data: number) => void): () => void;

  onNextQuestion(
    cb: (data: { question: any; player: boolean }) => void
  ): () => void;

  getPlayerSurprise(): void;

  onPlayerSurprise(cb: (data: { surprise: any }) => void): () => void;

  onPlayerRemoved(
    cb: (data: { newPlayers: Player[]; removedPlayer: Player[] }) => void
  ): () => void;

  onNextPlayer(cb: (data: number) => void): () => void;

  onPlayerLeft(cb: () => void): () => void;

  onFinishGame(cb: (winner: Player) => void): () => void;

  getPlayer(): Player;
}
