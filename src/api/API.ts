import { OnlineServer } from "../Server/OnlineServer";
import { ServerInterface } from "../Server/ServerInterface";
import { Player, GameServer } from "../utils/interfaces";
import { socket } from "./socket";

export class _API implements ServerInterface {
  isOnline = false;
  _server: ServerInterface;
  player?: Player;

  constructor() {
    this._server = new OnlineServer();

    socket.on("connect", () => {
      this.setOnlineMode(socket.connected);
    });
  }

  startQuestions(): void {
    console.log("emmiting start questions");
    this._server.startQuestions();
  }

  next(index: number): void {
    this._server.next(index);
  }

  nextPlayer(): void {
    this._server.nextPlayer();
  }

  onNextPlayer(cb: (data: number) => void): () => void {
    return this._server.onNextPlayer(cb);
  }

  onQuestionAnswer(cb: (data: number) => void): () => void {
    return this._server.onQuestionAnswer(cb);
  }

  onNextQuestion(
    cb: (data: { question: any; player: boolean }) => void
  ): () => void {
    return this._server.onNextQuestion(cb);
  }

  getPlayerSurprise(): void {
    this._server.getPlayerSurprise();
  }

  onPlayerSurprise(cb: (data: { surprise: any }) => void): () => void {
    return this._server.onPlayerSurprise(cb);
  }

  setOnlineMode(isOnline: boolean) {
    this.isOnline = isOnline;
  }

  playOnline() {
    this._server = new OnlineServer();
  }

  getServers(): Promise<GameServer[]> {
    console.log(this._server);

    return this._server.getServers();
  }

  getServerPlayers(): Promise<Player[]> {
    return this._server.getServerPlayers();
  }

  createServer(serverName: string, serverPassword?: string): Promise<string> {
    return this._server.createServer(serverName, serverPassword);
  }

  joinServer(serverId: string, serverPassword?: string): Promise<string> {
    return this._server.joinServer(serverId, serverPassword);
  }

  emitReady(): void {
    this._server.emitReady();
  }

  leaveServer(): void {
    this._server.leaveServer();
  }

  onPlayersUpdated(
    cb: (data: {
      startPosition: number;
      endPosition: number;
      direction: number;
      currentPlayerId: string;
    }) => void
  ): () => void {
    return this._server.onPlayersUpdated(cb);
  }

  onPlayerRemoved(
    cb: (data: { newPlayers: Player[]; removedPlayer: Player[] }) => void
  ): () => void {
    return this._server.onPlayerRemoved(cb);
  }

  onGameInit(cb: (data: { players: Player[] }) => void): () => void {
    const unsub = this._server.onGameInit(cb);
    console.log(this._server);
    return unsub;
  }

  onPlayerLeft(cb: () => void): () => void {
    return this._server.onPlayerLeft(cb);
  }

  onFinishGame(cb: (winner: Player) => void): () => void {
    return this._server.onFinishGame(cb);
  }

  getPlayer(): Player {
    return this._server.getPlayer();
  }
}

const API = new _API();

export default API;
