import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../../assets/belo.svg";

const Paper = styled.div`
  background: var(--panel-bg);
  margin: 20vh 5vw;
  padding: 75px 42px 64px;
  text-align: center;
  min-height: 60vh;
  border-radius: 1rem;
  box-shadow: 1px 3px 18px #264653;
  position: relative;

  .logo {
    // width: 150px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%) translateY(-50%) rotateZ(15deg);
    height: auto;
  }
`;

const APaper = ({ children, ...props }) => {
  return (
    <Grid
      as={motion.div}
      initial={{ opacity: 0, x: 500 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -500 }}
      transition={{ duration: 0.7 }}
      container
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      <Grid item xs={12} md={10} lg={8}>
        <Paper>
          <Logo className='logo' width={220} height={150}/>
          {/* <svg className="logo" src="assets/images/belo.svg" alt="" /> */}
          {children}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default APaper;
