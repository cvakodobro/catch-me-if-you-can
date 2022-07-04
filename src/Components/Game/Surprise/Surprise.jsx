import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setSurprise } from "../../../stores/features/gameSlice";

const Root = styled.div`
  border-radius: 1rem;
  box-shadow: 1px 3px 18px rgb(0 6 50);
  position: absolute;
  top: 35%;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  width: 60%;
  padding: 25px 40px;
  background: #253174;
  color: white;
`;

const Surprise = () => {
  const dispatch = useDispatch();
  const surprise = useSelector((state) => state.game.surprise);
  //   const currentPlayerId = useSelector((state) => state.game.currentPlayerId);
  //   const playerId = useSelector((state) => state.game.playerId);

  useEffect(() => {
    if (surprise) {
      setTimeout(() => {
        dispatch(setSurprise(null));
      }, 3000);
    }
  }, [surprise, dispatch]);

  return surprise ? (
    <Root>
      <header>
        {/* <Timer duration={duration} timeoutFn={this.checkAnswer(null, correctAnswer)} stopTimer={this.state.stopTimer} /> */}
      </header>
      <p>{surprise.message}</p>
    </Root>
  ) : null;
};

export default Surprise;
