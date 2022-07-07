import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { startQuestions } from "../../../stores/features/gameSlice";

const Root = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  color: white;
`;

const PlayerReady = () => {
  const dispatch = useDispatch();
  const interval = useRef();
  const currentPlayerId = useSelector((state) => state.game.currentPlayerId);
  const playerId = useSelector((state) => state.game.playerId);
  const players = useSelector((state) => state.game.players);
  const waitingToStartWithQuestions = useSelector(
    (state) => state.game.waitingToStartWithQuestions
  );

  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    if (waitingToStartWithQuestions) {
      interval.current = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [waitingToStartWithQuestions]);

  useEffect(() => {
    if (seconds < 1) {
      clearInterval(interval.current);
      setSeconds(3);
      console.log("gotovo je sad dovuci pitanje jedno po jedno");
      dispatch(startQuestions());
    }
  }, [seconds, dispatch]);

  const playerName = players.filter((el) => el.id === currentPlayerId)[0]?.name;

  return waitingToStartWithQuestions ? (
    <Root player={currentPlayerId === playerId}>
      <p>
        {playerName} is starting in {seconds}
      </p>
    </Root>
  ) : null;
};

export default PlayerReady;
