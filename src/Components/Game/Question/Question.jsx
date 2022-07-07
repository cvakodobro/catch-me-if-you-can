import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { answerQuestion } from "../../../stores/features/gameSlice";

const Root = styled(motion.div)`
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
  pointer-events: ${(props) => (props.player ? "auto" : "none")};

  .answered {
    background-color: #264653;
    pointer-events: none;
    color: white;
  }

  footer {
    margin-top: 25px;
    display: grid;
    align-content: center;
    justify-content: center;
    align-items: center;
    justify-items: center;
    grid-template-rows: 3rem 3rem;
    grid-template-columns: 10rem 10rem;
    grid-column-gap: 5rem;
    grid-row-gap: 1rem;
  }

  .answer-wrapper {
    width: 100%;
    height: 100%;
  }

  .button {
    width: 100%;
    height: 100%;
    border-radius: 15px;
    border: none;
    box-shadow: 1px 1px 15px #264653;
  }
`;

const Question = () => {
  const dispatch = useDispatch();
  const q = useSelector((state) => state.game.question);
  const currentPlayerId = useSelector((state) => state.game.currentPlayerId);
  const playerId = useSelector((state) => state.game.playerId);
  const waitingToStartWithQuestions = useSelector(
    (state) => state.game.waitingToStartWithQuestions
  );

  const answerIndex = useSelector((state) => state.game.answerIndex);

  const onClick = (index) => {
    dispatch(answerQuestion(index));
  };

  return q && !waitingToStartWithQuestions ? (
    <AnimatePresence>
      <Root
        key={q.id}
        player={currentPlayerId === playerId}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <header>
          {/* <Timer duration={duration} timeoutFn={this.checkAnswer(null, correctAnswer)} stopTimer={this.state.stopTimer} /> */}
        </header>
        <p>{decodeURIComponent(q.question)}</p>
        <footer>
          {q.answers?.map((answer, i) => {
            return (
              <div key={answer} className="answer-wrapper">
                <button
                  className={`button question ${
                    answerIndex !== null && i === answerIndex ? "answered" : ""
                  }`}
                  onClick={() => onClick(i)}
                >
                  {decodeURIComponent(answer)}
                </button>
              </div>
            );
          })}
        </footer>
      </Root>
    </AnimatePresence>
  ) : null;
};

export default Question;
