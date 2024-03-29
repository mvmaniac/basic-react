import * as React from 'react';
import { Component, createRef } from 'react';
import TryClass from './TryClass';
import { TryInfo } from './types/types';

interface State {
  result: string;
  value: string;
  answer: number[];
  tries: TryInfo[];
}

// 숫자 4개를 겹치지 않고 랜덤하게 뽑는 함수
function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];

  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }

  return array;
}

// use safer object types
// const lowerObj: Record<string, unknown> = {};
class NumberBaseballClass extends Component<Record<string, unknown>, State> {
  inputRef = createRef<HTMLInputElement>();

  constructor(props = {}) {
    super(props);

    this.state = {
      result: '',
      value: '',
      answer: getNumbers(), // ex: [1, 3, 5, 7]
      tries: [],
    };
  }

  onSubmitForm = (event: React.FormEvent<HTMLFormElement>): void => {
    const { value, answer, tries } = this.state;

    event.preventDefault();

    if (value === answer.join('')) {
      this.setState((prevState) => ({
        result: '홈런!',
        tries: [...prevState.tries, { try: value, result: '홈런' }],
      }));

      this.reset();
    } else {
      const answerArray = value.split('').map((v) => parseInt(v, 10));

      let strike = 0;
      let ball = 0;

      if (tries.length >= 9) {
        this.setState({
          result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')} 였습니다!`,
        });

        this.reset();
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }

        this.setState((prevState) => ({
          result: '',
          value: '',
          tries: [
            ...prevState.tries,
            { try: value, result: `${strike} 스트라이크, ${ball} 볼 입니다.` },
          ],
        }));
      }
    }
  };

  onChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      value: event.target.value,
    });
  };

  reset = (): void => {
    alert('게임을 다시 시작합니다!');

    this.setState({
      value: '',
      answer: getNumbers(),
      tries: [],
    });
  };

  render(): JSX.Element {
    const { result, value, tries } = this.state;

    return (
      <>
        <h1>{result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input
            maxLength={4}
            value={value}
            onChange={this.onChangeInput}
            ref={this.inputRef}
          />
        </form>
        <div>
          시도(class):&nbsp;
          {tries.length}
        </div>
        <ul>
          {tries.map((v, idx) => (
            <TryClass key={`${idx + 1}차 시도 : `} tryInfo={v} />
          ))}
        </ul>
      </>
    );
  }
}

export default NumberBaseballClass;
