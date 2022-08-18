import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { answerQuestion } from "../../../stores/features/gameSlice";
import { useEffect, useRef, useState } from "react";
import Timer from "../Timer/Timer";

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
  padding: 25px 30px;
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

  .question-text {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .timer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-left: 0.5rem;
  }

  .seconds {
    // text-align: center;
    width: 1rem;
    display: flex;
    justify-content: flex-end;
  }
`;

const Question = () => {
  const interval = useRef();
  const dispatch = useDispatch();
  const q = useSelector((state) => state.game.question);
  const currentPlayerId = useSelector((state) => state.game.currentPlayerId);
  const playerId = useSelector((state) => state.game.playerId);
  const waitingToStartWithQuestions = useSelector(
    (state) => state.game.waitingToStartWithQuestions
  );

  const answerIndex = useSelector((state) => state.game.answerIndex);

  const onClick = (index) => {
    if (seconds !== 0) {
      dispatch(answerQuestion(index));
    }
  };

  const [seconds, setSeconds] = useState(5);
  const [direction, setDirection] = useState(null);

  const resetTimer = () => {
    setSeconds(5);
    setDirection("forward");
    if (interval.current) clearInterval(interval.current);
    const id = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
    interval.current = id;
  };

  useEffect(() => {
    resetTimer();
  }, [q]);

  useEffect(() => {
    if (answerIndex !== null) {
      if (interval.current) {
        setDirection(null);
        clearInterval(interval.current);
      }
    }
  }, [answerIndex]);

  useEffect(() => {
    if (q && seconds === 0) {
      if (interval.current) {
        setDirection(null);
        clearInterval(interval.current);
      }
      if (currentPlayerId === playerId) dispatch(answerQuestion(null));
    }
  }, [seconds]);

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
        <div className="question-text">
          <p>{decodeURIComponent(q.question)}</p>
          <div className="timer">
            <Timer direction={direction} />
            <div className="seconds">{seconds}</div>
          </div>
        </div>
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
