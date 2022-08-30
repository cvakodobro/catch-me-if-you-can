import { useSelector } from "react-redux";
import styled from "styled-components";

const Tile = styled.div`
  border: 3px solid #edf1f3;
  position: absolute;
  top: ${(props) => props.topPos * 4.1}rem;
  left: ${(props) => props.leftPos * 4.1}rem;
  width: 4rem;
  height: 4rem;
  background: var(--primary);
  border-radius: 10px;
`;

const Root = styled.div`
  position: relative;
  margin: auto;
  height: 28.7rem;
  width: 28.7rem;
`;

const Player = styled.div`
  box-shadow: 1px 3px 10px rgb(0 6 50);
  //   background-color: ${(props) => props.color};
  position: absolute;
  top: ${(props) => props.topPos * 4.1 + 0.5}rem;
  left: ${(props) => props.leftPos * 4.1 + 0.5}rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: radial-gradient(
    ${(props) => props.color},
    ${(props) => props.color},
    black
  );
`;

const ramp = (x) => (x > 0 ? x : 0);

const f = (i, shift) =>
  ramp(i - shift) - ramp(i - 6 - shift) - ramp(i - 12 - shift) + ramp(i - 18 - shift);

const Board = () => {
  const players = useSelector((state) => state.game.players);

  return (
    <Root>
      {[...Array(24)].map((_el, i) => {
        return <Tile key={i} leftPos={f(i, 0)} topPos={f(i, 6)} />;
      })}
      {players.map((player) => {
        if (player.removed) return null;
        return (
          <Player
            key={player.id}
            color={player.color}
            topPos={f(player.position, 6)}
            leftPos={f(player.position, 0)}
          ></Player>
        );
      })}
    </Root>
  );
};

export default Board;
