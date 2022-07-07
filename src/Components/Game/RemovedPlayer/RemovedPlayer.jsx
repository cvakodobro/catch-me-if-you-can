import { useSelector } from "react-redux";
import styled from "styled-components";

const Root = styled.div`
  border-radius: 1rem;
  box-shadow: 1px 3px 18px #264653;
  position: absolute;
  top: 35%;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  width: 40rem;
  padding: 25px 40px;
  background: #35978b;
  color: white;
`;

const RemovedPlayer = () => {
  const removedPlayer = useSelector((state) => state.game.removedPlayer);

  return removedPlayer ? (
    <Root>
      <p>Player has been removed</p>
    </Root>
  ) : null;
};

export default RemovedPlayer;
