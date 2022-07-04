import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import "./Question.css";
import { answerQuestion } from "../../../stores/features/gameSlice";

const Root = styled.div`
  border-radius: 1rem;
  box-shadow: 1px 3px 18px rgb(0 6 50);
  position: absolute;
  top: 35%;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  width: 60%;
  padding: 25px 40px;
  background: #253174;
  color: white;
  pointer-events: ${(props) => (props.player ? "auto" : "none")};
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
    <Root player={currentPlayerId === playerId}>
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
  ) : null;
};

export default Question;
