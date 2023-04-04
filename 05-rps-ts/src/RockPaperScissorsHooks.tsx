import * as React from 'react';
import { useState, useRef, useEffect } from 'react';

const RPS_COORDS = {
  ROCK: '0',
  SCISSORS: '-142px',
  PAPER: '-284px'
} as const;

const SCORES = {
  ROCK: 0,
  SCISSORS: 1,
  PAPER: -1
} as const;

type ImgCoords = (typeof RPS_COORDS)[keyof typeof RPS_COORDS];

const computerChoice = (imgCoord: ImgCoords) =>
  (Object.keys(RPS_COORDS) as ['ROCK', 'SCISSORS', 'PAPER']).find(
    (k) => RPS_COORDS[k] === imgCoord
  ) ?? 'ROCK';

function RockPaperScissorsHooks(): JSX.Element {
  const [imgCoord, setImgCoord] = useState<ImgCoords>(RPS_COORDS.ROCK);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState('');

  const interval = useRef(0);

  const changeHand = () => {
    if (imgCoord === RPS_COORDS.ROCK) {
      setImgCoord(RPS_COORDS.SCISSORS);
    } else if (imgCoord === RPS_COORDS.SCISSORS) {
      setImgCoord(RPS_COORDS.PAPER);
    } else if (imgCoord === RPS_COORDS.PAPER) {
      setImgCoord(RPS_COORDS.ROCK);
    }
  };

  useEffect(() => {
    // componentDidMount, componentDidUpdate 역할 (1:1 대응은 아님)
    interval.current = window.setInterval(changeHand, 500);

    return () => {
      // componentWillUnmount 역할
      clearInterval(interval.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgCoord]);

  const onClickBtn = (choice: keyof typeof RPS_COORDS) => () => {
    clearInterval(interval.current);

    const myScore = SCORES[choice];
    const cpuScore = SCORES[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;

    if (diff === 0) {
      setResult('비겼습니다.');
    } else if ([-1, 2].includes(diff)) {
      setResult('이겼습니다!');
      setScore((prevScore) => prevScore + 1);
    } else {
      setResult('졌습니다.');
      setScore((prevScore) => prevScore - 1);
    }

    setTimeout(() => {
      interval.current = window.setInterval(changeHand, 500);
    }, 1000);
  };

  return (
    <>
      <div
        id="computer"
        style={{
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`
        }}
      />
      <div>
        <button
          type="button"
          id="scissors"
          className="btn"
          onClick={onClickBtn('SCISSORS')}
        >
          가위
        </button>
        <button
          type="button"
          id="rock"
          className="btn"
          onClick={onClickBtn('ROCK')}
        >
          바위
        </button>
        <button
          type="button"
          id="paper"
          className="btn"
          onClick={onClickBtn('PAPER')}
        >
          보
        </button>
      </div>
      <div>{result}</div>
      <div>
        현재&nbsp;
        {score}점(hooks)
      </div>
    </>
  );
}

export default RockPaperScissorsHooks;
