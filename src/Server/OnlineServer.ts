import { GameServer, Player } from "../utils/interfaces";
import { ServerInterface } from "./ServerInterface";
import { socket } from "../api/socket";

export class OnlineServer implements ServerInterface {
  player?: Player;

  getServers(): Promise<GameServer[]> {
    return new Promise((res, rej) => {
      socket.emit("get-servers", null, (err: any, servers: GameServer[]) => {
        if (err) return rej(err);
        console.log(servers);

        res(servers);
      });
    });
  }

  getServerPlayers(): Promise<Player[]> {
    return new Promise((res, rej) => {
      socket.emit("get-server-players", null, (err: any, players: Player[]) => {
        if (err) return rej(err);
        res(players);
      });
    });
  }

  createServer(serverName: string, serverPassword?: string): Promise<string> {
    return new Promise((res, rej) => {
      socket.emit(
        "create-server",
        { serverName, serverPassword, player: this.getPlayer() },
        (err: any, playerId: string) => {
          if (err) return rej(err);
          res(playerId);
        }
      );
    });
  }

  joinServer(serverId: string, serverPassword?: string): Promise<string> {
    return new Promise((res, rej) => {
      socket.emit(
        "join-server",
        { serverId, serverPassword, player: this.getPlayer() },
        (err: any, playerId: string) => {
          if (err) {
            return rej(err);
          }
          setTimeout(() => {
            // socket.emit("add-bots");
          }, 2000);
          res(playerId);
        }
      );
    });
  }

  next(index: number | null): void {
    socket.emit("next", { answerIndex: index });
  }

  nextPlayer(): void {
    socket.emit("next-player");
  }

  onQuestionAnswer(cb: (data: number) => void): () => void {
    socket.on("question-answer", cb);
    return () => socket.off("question-answer", cb);
  }

  onNextPlayer(cb: (data: number) => void): () => void {
    socket.on("next-player", cb);
    return () => socket.off("next-player", cb);
  }

  startQuestions(): void {
    socket.emit("start-questions");
  }

  emitReady(): void {
    console.log("start-game");
    socket.emit("start-game");
  }

  leaveServer(): void {
    socket.emit("leave-server");
    this.removeAllListeners();
  }

  getPlayerSurprise(): void {
    socket.emit("get-player-surprise");
  }

  onPlayersUpdated(
    cb: (data: {
      startPosition: number;
      endPosition: number;
      direction: number;
      currentPlayerId: string;
    }) => void
  ): () => void {
    socket.on("players-changed", cb);
    return () => socket.off("players-changed", cb);
  }

  onPlayerRemoved(
    cb: (data: { newPlayers: Player[]; removedPlayer: Player[] }) => void
  ): () => void {
    socket.on("player-removed", cb);
    return () => socket.off("player-removed", cb);
  }

  onGameInit(cb: (data: { players: Player[] }) => void): () => void {
    socket.on("init-game", cb);
    return () => socket.off("init-game", cb);
  }

  onNextQuestion(
    cb: (data: { question: any; player: boolean }) => void
  ): () => void {
    socket.on("next-question", cb);
    return () => socket.off("next-question", cb);
  }

  onPlayerSurprise(cb: (data: { surprise: any }) => void): () => void {
    socket.on("player-surprise", cb);
    return () => socket.off("player-surprise", cb);
  }

  onPlayerLeft(cb: () => void): () => void {
    socket.on("player-left", cb);
    return () => socket.off("player-left", cb);
  }

  onFinishGame(cb: (winner: Player) => void): () => void {
    socket.on("finished-game", cb);
    return () => socket.off("finished-game", cb);
  }

  removeAllListeners() {
    socket.removeAllListeners();
  }

  getPlayer(): Player {
    if (this.player) return this.player;
    this.player = {} as Player;
    this.player.name = localStorage.getItem("playerName") as string;
    this.player.img = localStorage.getItem("playerImg") as string;
    return this.player;
  }
}
