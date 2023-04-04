import * as React from 'react';
import { Component } from 'react';

// 클래스의 경우
//  -> constructor -> render -> ref -> componentDidMount
//    setState/props 변경 시
//    -> shouldComponentUpdate -> render -> componentDidUpdate
// 부모가 나를 없앴을 때
// -> componentWillUnmount -> 소멸

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

interface State {
  result: string;
  imgCoord: ImgCoords;
  score: number;
}

class RockPaperScissorsClass extends Component<Record<string, unknown>, State> {
  interval = 0;

  constructor(props = {}) {
    super(props);

    this.state = {
      imgCoord: RPS_COORDS.ROCK,
      score: 0,
      result: ''
    };
  }

  // 컴포넌트가 첫 렌더링된 후
  // 비동기 요청을 많이 함
  componentDidMount(): void {
    this.interval = window.setInterval(this.changeHand, 500);
  }

  // 리렌더링 후
  // componentDidUpdate (prevProps, prevState) {}

  // 컴포넌트가 제거되기 직전
  // 비동기 요청 정리
  componentWillUnmount(): void {
    clearInterval(this.interval);
  }

  onClickBtn = (choice: keyof typeof RPS_COORDS) => (): void => {
    const { imgCoord } = this.state;

    clearInterval(this.interval);

    const myScore = SCORES[choice];
    const cpuScore = SCORES[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;

    if (diff === 0) {
      this.setState({
        result: '비겼습니다.'
      });
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => ({
        result: '이겼습니다!',
        score: prevState.score + 1
      }));
    } else {
      this.setState((prevState) => ({
        result: '졌습니다.',
        score: prevState.score - 1
      }));
    }

    setTimeout(() => {
      this.interval = window.setInterval(this.changeHand, 500);
    }, 1000);
  };

  changeHand = (): void => {
    const { imgCoord } = this.state;

    if (imgCoord === RPS_COORDS.ROCK) {
      this.setState({
        imgCoord: RPS_COORDS.SCISSORS
      });
    } else if (imgCoord === RPS_COORDS.SCISSORS) {
      this.setState({
        imgCoord: RPS_COORDS.PAPER
      });
    } else if (imgCoord === RPS_COORDS.PAPER) {
      this.setState({
        imgCoord: RPS_COORDS.ROCK
      });
    }
  };

  render(): JSX.Element {
    const { result, score, imgCoord } = this.state;

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
            onClick={this.onClickBtn('SCISSORS')}
          >
            가위
          </button>
          <button
            type="button"
            id="rock"
            className="btn"
            onClick={this.onClickBtn('ROCK')}
          >
            바위
          </button>
          <button
            type="button"
            id="paper"
            className="btn"
            onClick={this.onClickBtn('PAPER')}
          >
            보
          </button>
        </div>
        <div>{result}</div>
        <div>
          현재&nbsp;
          {score}점(class)
        </div>
      </>
    );
  }
}

export default RockPaperScissorsClass;
