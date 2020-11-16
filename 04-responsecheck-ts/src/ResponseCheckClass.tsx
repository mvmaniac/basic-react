import * as React from 'react';
import {Component} from 'react';

interface State {
  state: 'waiting' | 'now' | 'ready';
  message: string;
  result: number[];
}

class ResponseCheckClass extends Component<Record<string, unknown>, State> {
  timeout: number | null = null;

  startTime = 0;

  endTime = 0;

  constructor(props = {}) {
    super(props);

    this.state = {
      state: 'waiting',
      message: '클릭해서 시작하세요.(class)',
      result: []
    };
  }

  onClickScreen = (): void => {
    const {state} = this.state;

    if (state === 'waiting') {
      this.setStateAndMessage('ready', '초록색이 되면 클릭하세요.');

      this.timeout = window.setTimeout(() => {
        this.setStateAndMessage('now', '지금 클릭!!!');

        // 시작 시간 체크
        this.startTime = new Date().getTime();
      }, Math.floor(Math.random() * 1000) + 2000); // 2초 ~ 3초 랜덤
    } else if (state === 'ready') {
      // 타임아웃 클리어
      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      // 성급하게 클릭
      this.setStateAndMessage(
        'waiting',
        '너무 성급 하시군요! 초록색이 된 후에 클릭하세요.'
      );
    } else if (state === 'now') {
      // 끝 시간 체크
      this.endTime = new Date().getTime();

      // 반응속도 체크
      this.setState((prevState) => {
        return {
          state: 'waiting',
          message: '클릭해서 시작하세요.(class)',
          result: [...prevState.result, this.endTime - this.startTime]
        };
      });
    }
  };

  onReset = (): void => {
    this.setState({
      result: []
    });
  };

  setStateAndMessage = (
    newState: 'waiting' | 'now' | 'ready',
    newMessage: string
  ): void => {
    this.setState({
      state: newState,
      message: newMessage
    });
  };

  renderAverage = (): JSX.Element | null => {
    const {result} = this.state;

    return result.length === 0 ? null : (
      <>
        <div>
          평균시간:&nbsp;
          {result.reduce((a, c) => a + c) / result.length}
          &nbsp;ms
        </div>
        <button type="button" onClick={this.onReset}>
          리셋
        </button>
      </>
    );
  };

  render(): JSX.Element {
    const {state, message} = this.state;

    return (
      <>
        <div
          id="screen"
          className={state}
          onClick={this.onClickScreen}
          role="button"
          tabIndex={0}
        >
          {message}
        </div>
        {this.renderAverage()}
      </>
    );
  }
}

export default ResponseCheckClass;
