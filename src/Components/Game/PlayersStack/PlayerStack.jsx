import styled from "styled-components";
import { useSelector } from "../../../utils/hooks";
import Avatar from "../../Shared/Avatar/Avatar";
import Typography from "../../Shared/Typography/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

const Root = styled.div`
  width: 100%;
  padding: 25px;
`;

export default function PlayersStack() {
  const players = useSelector((state) => state.game.players);
  const currentPlayerId = useSelector((state) => state.game.currentPlayerId);

  return (
    <Root>
      <Grid
        item
        container
        flexWrap="nowrap"
        alignItems="center"
        justifyContent="center"
        spacing={0.5}
        gap={6}
        xs={12}
      >
        {players.map((player) => {
          return (
            <Stack
              key={player.id}
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <Avatar
                removed={player.removed}
                seed={`${player.name}${player.img}`}
                color={player.color}
                border={currentPlayerId === player.id ? "5px" : "1px"}
              />
              <Typography>
                {player.name}
              </Typography>
            </Stack>
          );
        })}
      </Grid>
    </Root>
  );
}
