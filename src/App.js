import styled from "styled-components";
import { Routes, Route, useLocation } from "react-router-dom";
import Game from "./Components/Game/Game";
import CreateUser from "./Components/CreateUser/CreateUser";
import MainMenu from "./Components/MainMenu/MainMenu";
import CreateServer from "./Components/CreateServer/CreateServer";
import JoinServer from "./Components/JoinServer/JoinServer";
import Lobby from "./Components/WaitingLobby/Lobby";
import { Provider } from "react-redux";
import { store } from "./stores/store";
import { useState } from "react";
import StartPage from "./Components/StartPage/StartPage";
import { AnimatePresence } from "framer-motion";
import Loading from "./Components/Shared/Loading/Loading";
import GameAudio from "./utils/audio";
import ErrorBoundary from "./Components/Shared/ErrorBoundary/ErrorBoundary";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Root = styled.div`
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  /* background: radial-gradient(#5065da, #20295a); */
  background: radial-gradient(#2a9d8f, #264653);
`;

const theme = createTheme({
  palette: {
    quiz: {
      main: "#f4a261",
    },
  },
});

function App() {
  const [loadingAssets, setLoadingAssets] = useState(true);

  const location = useLocation();

  const onLoaded = () => {
    // GameAudio.playMusic("music");
    setLoadingAssets(false);
  };

  if (loadingAssets) return <Loading onLoaded={onLoaded} />;

  return (
    <Root>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <AnimatePresence exitBeforeEnter>
            <ErrorBoundary>
              <Routes location={location} key={location.key}>
                <Route
                  key={"/create-user"}
                  path="/create-user"
                  element={<CreateUser />}
                />
                <Route
                  key={"/main-menu"}
                  path="/main-menu"
                  element={<MainMenu />}
                />
                <Route
                  key={"/create-server"}
                  path="/create-server"
                  element={<CreateServer />}
                />
                <Route
                  key={"/join-server"}
                  path="/join-server"
                  element={<JoinServer />}
                />
                <Route key={"/game"} path="/game" element={<Game />} />
                <Route
                  key={"/waiting-lobby"}
                  path="/waiting-lobby"
                  element={<Lobby />}
                />
                <Route key={"/"} path="/" element={<StartPage />} />
              </Routes>
            </ErrorBoundary>
          </AnimatePresence>
        </Provider>
      </ThemeProvider>
    </Root>
  );
}

export default App;
