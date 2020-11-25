import React, {Component} from 'react';
import BallClass from './BallClass';

const getWinNumbers = () => {
  console.log('getWinNumbers...');

  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);

  const shuffle = [];

  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }

  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);

  return [...winNumbers, bonusNumber];
};

class LottoClass extends Component {
  constructor() {
    super();

    this.state = {
      winNumbers: getWinNumbers(), // 당첨 숫자들
      winBalls: [],
      bonusBall: null, // 보너스 공
      redo: false
    };

    this.timeouts = [];
  }

  // 컴포넌트가 첫 렌더링된 후
  // 비동기 요청을 많이 함
  componentDidMount() {
    console.log('componentDidMount...');

    this.runTimeouts();
  }

  // 리렌더링 후
  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate...');

    if (this.timeouts.length === 0) {
      console.log('componentDidUpdate for runTimouts...');

      this.runTimeouts();
    }
  }

  // 컴포넌트가 제거되기 직전
  // 비동기 요청 정리
  componentWillUnmount() {
    console.log('componentWillUnmount...');

    this.timeouts.forEach((v) => {
      clearTimeout(v);
    });
  }

  onClickRedo = () => {
    console.log('onClickRedo...');

    this.setState({
      winNumbers: getWinNumbers(), // 당첨 숫자들
      winBalls: [],
      bonusBall: null, // 보너스 공
      redo: false
    });

    this.timeouts = [];
    // this.timeouts.length = null;
  };

  runTimeouts = () => {
    const {winNumbers} = this.state;

    for (let i = 0, {length} = winNumbers; i < length - 1; i += 1) {
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => {
          return {
            winBalls: [...prevState.winBalls, winNumbers[i]]
          };
        });
      }, (i + 1) * 1000);
    }

    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonusBall: winNumbers[6],
        redo: true
      });
    }, 7000);
  };

  render() {
    const {winBalls, bonusBall, redo} = this.state;

    return (
      <>
        <div>당첨 숫자(class)</div>
        <div id="결과창">
          {winBalls.map((v) => (
            <BallClass key={v} number={v} />
          ))}
        </div>
        <div>보너스!</div>
        {bonusBall && <BallClass number={bonusBall} />}
        {redo && (
          <button type="button" onClick={this.onClickRedo}>
            한 번 더!
          </button>
        )}
      </>
    );
  }
}

export default LottoClass;
