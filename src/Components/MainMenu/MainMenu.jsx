import Grid from "@mui/material/Grid";
import Paper from "../Shared/Paper/Paper";
import Button from "../Shared/Button/Button";
import Typography from "../Shared/Typography/Typography";
import { Link } from "react-router-dom";
import API from "../../api/API";

const style = {
  color: "#fff",
};

const MainMenu = () => {
  const onPlayOnline = () => {
    API.playOnline(true);
  };

  return (
    <Paper key="main-menu">
      <Grid container alignItems="center" justifyContent="center" spacing={4}>
        <Grid item xs={10}>
          <Typography fontSize={22}>Start Playing</Typography>
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          justifyContent="center"
          spacing={2}
          xs={12}
        >
          <Grid item xs={12} md={8}>
            <Button
              disabled={!API.isOnline}
              style={{ width: "80%" }}
              href="/create-server"
              onClick={onPlayOnline}
            >
              <img src="assets/icons/add.svg" alt="" />
              <Typography>Create A Game</Typography>
            </Button>
          </Grid>
          <Grid item xs={12} md={8}>
            <Button
              disabled={!API.isOnline}
              style={{ width: "80%" }}
              href="/join-server"
              onClick={onPlayOnline}
            >
              <img src="assets/icons/glob.svg" alt="" />
              <Typography>Join A Game</Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid item container alignItems="center" justifyContent="center" mt={4}>
          <Grid item xs={6}>
            <Link style={style} to="/create-user">
              Profile Setting
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MainMenu;
