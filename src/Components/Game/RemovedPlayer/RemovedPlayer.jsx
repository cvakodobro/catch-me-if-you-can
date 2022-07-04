import { useSelector } from "react-redux";
import styled from "styled-components";

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

const RemovedPlayer = () => {
  const removedPlayer = useSelector((state) => state.game.removedPlayer);

  return removedPlayer ? (
    <Root>
      <header>
        {/* <Timer duration={duration} timeoutFn={this.checkAnswer(null, correctAnswer)} stopTimer={this.state.stopTimer} /> */}
      </header>
      <p>Player has been removed</p>
    </Root>
  ) : null;
};

export default RemovedPlayer;
