import { useSelector } from "react-redux";
import styled from "styled-components";

const Root = styled.div`
  position: relative;
  margin: auto;
  height: 28.7rem;
  width: 28.7rem;
`;

const Tile = styled.div`
  border: 3px solid #222d69;
  position: absolute;
  top: ${(props) => props.topPos * 4.1}rem;
  left: ${(props) => props.leftPos * 4.1}rem;
  width: 4rem;
  height: 4rem;
  border-radius: 10px;
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

const Board = () => {
  const players = useSelector((state) => state.game.players);

  return (
    <Root>
      {[...Array(24)].map((el, i) => {
        if (i < 6) return <Tile topPos={0} leftPos={i % 6}></Tile>;
        else if (i >= 6 && i < 12)
          return <Tile topPos={i % 6} leftPos={6}></Tile>;
        else if (i >= 12 && i < 18)
          return <Tile topPos={6} leftPos={6 - (i % 6)}></Tile>;
        else return <Tile topPos={6 - (i % 6)} leftPos={0}></Tile>;
      })}
      {players.map((player) => {
        if (player.removed) return null;
        if (player.position < 6)
          return (
            <Player
              color={player.color}
              topPos={0}
              leftPos={player.position % 6}
            ></Player>
          );
        else if (player.position >= 6 && player.position < 12)
          return (
            <Player
              color={player.color}
              topPos={player.position % 6}
              leftPos={6}
            ></Player>
          );
        else if (player.position >= 12 && player.position < 18)
          return (
            <Player
              color={player.color}
              topPos={6}
              leftPos={6 - (player.position % 6)}
            ></Player>
          );
        else
          return (
            <Player
              color={player.color}
              topPos={6 - (player.position % 6)}
              leftPos={0}
            ></Player>
          );
      })}
    </Root>
  );
};

export default Board;
