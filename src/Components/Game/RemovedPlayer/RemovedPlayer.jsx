import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setRemovedPlayer } from "../../../stores/features/gameSlice";
import Button from "../../Shared/Button/Button";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background: black;
  width: 100%;
  opacity: 0.5;
  z-index: 100;
`;

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
  z-index: 200;

  .button-wrapper {
    display: flex;
    justify-content: space-evenly;
    align-content: center;
    margin-top: 1rem;
  }
`;

const RemovedPlayer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const removedPlayer = useSelector((state) => state.game.removedPlayer);
  const playerId = useSelector((state) => state.game.playerId);

  return removedPlayer ? (
    <>
      <Root>
        {removedPlayer.id === playerId ? (
          <div>
            <p>You have been removed from the game</p>
            <p>You can go to main menu or you can watch the rest of the game</p>
            <div className="button-wrapper">
              <Button onClick={() => navigate("/main-menu")}>Main Menu</Button>
              <Button onClick={() => dispatch(setRemovedPlayer(null))}>
                Continue Watching
              </Button>
            </div>
          </div>
        ) : (
          <p>{removedPlayer.name} has been removed</p>
        )}
      </Root>
      {removedPlayer.id === playerId && <Overlay />}
    </>
  ) : null;
};

export default RemovedPlayer;
