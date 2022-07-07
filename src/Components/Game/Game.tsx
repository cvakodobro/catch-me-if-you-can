import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../utils/hooks";
import {
  stopGame,
  setQuestion,
  setNextPlayer,
  setQuestionAnswer,
  moveCurrentPlayer,
  setSurprise,
  setRemovedPlayer,
  setPlayers,
  removeQuestion,
} from "../../stores/features/gameSlice";
import Scoreboard from "./Scoreboard/Scoreboard.jsx";
import { Player } from "../../utils/interfaces.js";
import API from "../../api/API";
import { Navigate } from "react-router";
import Question from "./Question/Question.jsx";
import PlayersStack from "./PlayersStack/PlayerStack.jsx";
import PlayerReady from "./PlayerReady/PlayerReady.jsx";
import Board from "./Board/Board.jsx";
import Surprise from "./Surprise/Surprise";
import RemovedPlayer from "./RemovedPlayer/RemovedPlayer";

export default function Game() {
  const dispatch = useDispatch();
  const [finished, setFinished] = useState(false);
  const [winner, setWinner] = useState<Player | null>(null);
  const inGame = useSelector((state) => state.game.inGame);
  const playerId = useSelector((state) => state.game.playerId);

  const movePlayer = (
    startPosition: number,
    endPosition: number,
    direction: number,
    currentPlayerId: string
  ) => {
    if (startPosition !== endPosition) {
      dispatch(moveCurrentPlayer(direction));
      setTimeout(() => {
        movePlayer(
          (((startPosition + direction) % 24) + 24) % 24,
          endPosition,
          direction,
          currentPlayerId
        );
      }, 1000);
    } else {
      if (playerId === currentPlayerId) API.getPlayerSurprise();
    }
  };

  useEffect(() => {
    const timeoutReady = setTimeout(() => {
      API.emitReady();
    }, 0);

    API.onQuestionAnswer((answerIndex) => {
      dispatch(setQuestionAnswer(answerIndex));
    });

    API.onPlayersUpdated(
      ({ startPosition, endPosition, direction, currentPlayerId }) => {
        dispatch(removeQuestion());
        movePlayer(startPosition, endPosition, direction, currentPlayerId);
      }
    );

    API.onNextQuestion(({ question, player }) => {
      console.log(question);
      dispatch(
        setQuestion({
          question,
          player,
        })
      );
    });

    API.onPlayerRemoved(({ newPlayers, removedPlayer }) => {
      console.log(newPlayers, removedPlayer);
      dispatch(setRemovedPlayer(removedPlayer[0]));

      setTimeout(() => {
        dispatch(setPlayers(newPlayers));
      }, 3000);
    });

    API.onPlayerSurprise(({ surprise }) => {
      dispatch(setSurprise(surprise));
    });

    API.onNextPlayer((nextPlayer) => {
      console.log("next player");
      dispatch(setNextPlayer(nextPlayer));
    });

    API.onFinishGame((winnerPlayer) => {
      console.log(winner);
      setWinner(winnerPlayer);
      setFinished(true);
    });

    return () => {
      API.leaveServer();
      dispatch(stopGame());
      clearTimeout(timeoutReady);
    };
  }, [dispatch]);

  if (!inGame) return <Navigate replace to="/main-menu" />;

  return (
    <div>
      <PlayerReady />
      <PlayersStack />
      <Board />
      <Question />
      <Surprise />
      <RemovedPlayer />
      {finished && <Scoreboard winner={winner} />}
    </div>
  );
}
