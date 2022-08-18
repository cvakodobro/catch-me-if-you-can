import './Timer.css'

const Timer = (props) => {
  return (
    <div className={`timer__animated_wrapper animate_${props.direction} mr-05`}>
      <ul className="timer__animated_ticks">
        <li className="timer__animated_tick-1"></li>
        <li className="timer__animated_tick-2"></li>
        <li className="timer__animated_tick-3"></li>
        <li className="timer__animated_tick-4"></li>
        <li className="timer__animated_tick-5"></li>
      </ul>
      <div className="timer__animated_hands">
        <span className="timer__animated_minutes"></span>
        <span className="timer__animated_hours"></span>
      </div>
    </div>
  );
};

export default Timer;
