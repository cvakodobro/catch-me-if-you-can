import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import Paper from "../Shared/Paper/Paper";
import Stack from "@mui/material/Stack";
import Table from "../Shared/Table/Table";
import Button from "../Shared/Button/Button";
import TextField from "../Shared/TextField/TextField";
import Typography from "../Shared/Typography/Typography";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "../../utils/hooks";
import { setInLobby, setPlayerId } from "../../stores/features/gameSlice";
import API from "../../api/API";

const CTableRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  // display: grid;
  // grid-template-columns: repeat(3, 1fr);
  border-radius: 2rem;
  height: 45px;
  &:hover {
    cursor: pointer;
  }
`;
const CTableCell = styled.p`
  height: 30px;
  width: calc(100% / 3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const JoinServer = () => {
  const [showPrivate, setShowPrivate] = useState(true);
  const [selectedServer, setSelectedServer] = useState(null);

  const [password, setPassword] = useState(null); //for show button
  const [selectOne, setSelectOne] = useState(false); //for show button

  const [isPrivate, setIsPrivate] = useState(false);
  const [servers, setServers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    API.playOnline(true);
    (async () => {
      const servers = await API.getServers();
      setServers(servers);
    })();
    const interval = setInterval(async () => {
      const servers = await API.getServers();
      setServers(servers);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleJoinServer = async () => {
    const serverId = servers[selectedServer].id;
    try {
      const playerId = await API.joinServer(serverId, password);
      console.log(playerId);
      dispatch(setPlayerId(playerId));
      dispatch(setInLobby(true));
      navigate("/waiting-lobby");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper>
      <Grid container justifyContent="center" alignItems="center" spacing={5}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            spacing={2}
          >
            <p
              style={{
                color: `${showPrivate ? " white" : "gray"}`,
                // textShadow: `${showPrivate ? "0 0 3px white" : ""}`,
              }}
            >
              Show Private Servers
            </p>
            <Checkbox
              defaultChecked
              color="quiz"
              onChange={() => {
                setShowPrivate(!showPrivate);
                setSelectedServer(null);
                setSelectOne(false);
              }}
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Table>
            {servers.map((server, index) => {
              console.log(server);
              return (
                <CTableRow
                  key={index}
                  onClick={() => {
                    setSelectedServer(index);
                    setSelectOne(true);
                    setPassword("");
                    if (server.isPrivate) setIsPrivate(true);
                    else setIsPrivate(false);
                  }}
                  style={
                    index === selectedServer && server.isPrivate
                      ? {
                          backgroundColor: "rgba(0,0,0,.5)",
                          border: " 1px solid #fb0303",
                          borderWidth: "0 0 3px 2px",
                          borderRadius: "1rem",
                          boxShadow: "inset 1px 0 5px 1px black",
                        }
                      : index === selectedServer
                      ? {
                          backgroundColor: "rgba(0,0,0,.5)",
                          borderRadius: "1rem",
                        }
                      : {}
                  }
                >
                  {index === selectedServer && server.isPrivate ? (
                    <>
                      <CTableCell>{server.name}</CTableCell>
                      <TextField
                        type="password"
                        placeholder="Enter the server password"
                        style={{
                          height: "100%",
                          border: "none",
                          background: "none",
                          boxShadow: "none",
                        }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </>
                  ) : (
                    <>
                      <CTableCell>{server.name}</CTableCell>
                      <CTableCell>{server.cntPlayers}</CTableCell>
                      <CTableCell>{server.isPrivate ? "Yes" : ""}</CTableCell>
                    </>
                  )}
                </CTableRow>
              );
            })}
          </Table>
        </Grid>
        <Grid item xs={12}>
          {((selectOne && isPrivate && password) ||
            (selectOne && !isPrivate)) && (
            <Button onClick={handleJoinServer}>
              <Typography>Join Game</Typography>
            </Button>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default JoinServer;
