import React, {Component} from 'react';

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
};

const SCORES = {
  ROCK: 0,
  SCISSORS: 1,
  PAPER: -1
};

const computerChoice = (imgCoord) =>
  Object.entries(RPS_COORDS).find((v) => v[1] === imgCoord)[0];

class RockPaperScissorsClass extends Component {
  constructor() {
    super();

    this.state = {
      imgCoord: '0',
      score: 0,
      result: []
    };

    this.interval = null;
  }

  // 컴포넌트가 첫 렌더링된 후
  // 비동기 요청을 많이 함
  componentDidMount() {
    this.interval = setInterval(this.changeHand, 500);
  }

  // 리렌더링 후
  // componentDidUpdate (prevProps, prevState) {}

  // 컴포넌트가 제거되기 직전
  // 비동기 요청 정리
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onClickBtn = (choice) => () => {
    const {imgCoord} = this.state;

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
      this.interval = setInterval(this.changeHand, 500);
    }, 1000);
  };

  changeHand = () => {
    const {imgCoord} = this.state;

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

  render() {
    const {result, score, imgCoord} = this.state;

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
