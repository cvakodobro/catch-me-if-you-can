import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setSurprise } from "../../../stores/features/gameSlice";

const Root = styled.div`
  border-radius: 1rem;
  box-shadow: 1px 3px 18px #264653;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 20rem;
  padding: 25px 40px;
  background: #35978b;
  color: white;
`;

const Surprise = () => {
  const dispatch = useDispatch();
  const surprise = useSelector((state) => state.game.surprise);
  // const currentPlayerId = useSelector((state) => state.game.currentPlayerId);
  // const playerId = useSelector((state) => state.game.playerId);

  useEffect(() => {
    if (surprise) {
      setTimeout(() => {
        dispatch(setSurprise(null));
      }, 3000);
    }
  }, [surprise, dispatch]);

  return surprise ? (
    <Root>
      <p>{surprise.message}</p>
    </Root>
  ) : null;
};

export default Surprise;
