import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import API from "../../api/API";
import { Player } from "../../utils/interfaces";

interface StoreState {
  playerId: string;
  currentPlayerId: string;
  currentPlayer: number;
  nextPlayre: number;
  orderOffset: number;
  players: Player[];
  inGame: boolean;
  inLobby: boolean;
  token: string;

  waitingToStartWithQuestions: boolean;
  question: any;
  playable: boolean;
  points: number;
  questionNumber: number;
  answerIndex: number | null;
  surprise: any;
  removedPlayer: Player | null;
}

const initialState = {
  inGame: false,
} as StoreState;

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setPlayerId(state, action: PayloadAction<string>) {
      state.playerId = action.payload;
    },

    init: (
      state,
      action: PayloadAction<{ players: Player[]; token: string }>
    ) => {
      console.log("init");
      const { players, token } = action.payload;
      state.inGame = true;
      state.token = token;
      state.points = 0;
      state.waitingToStartWithQuestions = true;
      state.players = players;
      state.currentPlayer = 0;
      state.currentPlayerId = players[0].id;
      state.answerIndex = null;
      state.surprise = null;
      state.removedPlayer = null;
    },

    startQuestions(state) {
      state.waitingToStartWithQuestions = false;
      state.questionNumber = 1;
      if (state.playerId === state.currentPlayerId) API.startQuestions();
    },

    setQuestion(state, action: PayloadAction<{ question: any; player: any }>) {
      state.answerIndex = null;
      state.question = action.payload.question;
      state.playable = action.payload.player === state.playerId;
      state.currentPlayerId = action.payload.player;
    },

    removeQuestion(state) {
      state.question = null;
    },

    setQuestionAnswer(state, action: PayloadAction<number>) {
      state.answerIndex = action.payload;
    },

    answerQuestion(state, action: PayloadAction<number>) {
      console.log(state.questionNumber);
      API.next(action.payload);
      state.questionNumber = state.questionNumber + 1;
    },

    setNextPlayer(state, action: PayloadAction<number>) {
      console.log(state.currentPlayerId);
      console.log(action.payload);
      state.currentPlayer = action.payload;
      state.currentPlayerId = state.players[action.payload].id;
      state.question = null;
      state.waitingToStartWithQuestions = true;
      console.log(state.currentPlayerId);
    },

    moveCurrentPlayer(state, action: PayloadAction<number>) {
      state.question = null;
      state.players[state.currentPlayer].position =
        (((state.players[state.currentPlayer].position + action.payload) % 24) +
          24) %
        24;
    },

    updatePlayers(state, action: PayloadAction<Player[]>) {
      console.log(action.payload);
      state.question = null;
      state.players = action.payload;
    },

    setSurprise(state, action: PayloadAction<any>) {
      state.surprise = action.payload;
    },

    setRemovedPlayer(state, action: PayloadAction<Player>) {
      state.removedPlayer = action.payload;
    },

    setPlayers(state, action: PayloadAction<Player[]>) {
      state.removedPlayer = null;
      state.players = action.payload;
    },

    stopGame(state) {
      state.inGame = false;
    },

    setInLobby(state, action: PayloadAction<boolean>) {
      state.inLobby = action.payload;
    },
  },
});

export const {
  init,
  stopGame,
  moveCurrentPlayer,
  setInLobby,
  setPlayerId,
  updatePlayers,
  setQuestion,
  setNextPlayer,
  startQuestions,
  answerQuestion,
  setQuestionAnswer,
  setSurprise,
  setRemovedPlayer,
  setPlayers,
  removeQuestion,
} = gameSlice.actions;

export default gameSlice.reducer;
