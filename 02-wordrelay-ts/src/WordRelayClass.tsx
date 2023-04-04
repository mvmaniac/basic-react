import * as React from 'react';
import { Component, createRef } from 'react';

interface State {
  word: string;
  value: string;
  result: string;
}

// use safer object types
// const lowerObj: Record<string, unknown> = {};
class WordRelayClass extends Component<Record<string, unknown>, State> {
  onInputRef = createRef<HTMLInputElement>();

  constructor(props = {}) {
    super(props);

    this.state = {
      word: '백수',
      value: '',
      result: ''
    };
  }

  onSubmitForm = (event: React.FormEvent<HTMLFormElement>): void => {
    const { word, value } = this.state;

    event.preventDefault();

    const input = this.onInputRef.current;

    if (word[word.length - 1] === value[0]) {
      this.setState({
        result: '딩동댕',
        value: '',
        word: value
      });
    } else {
      this.setState({
        result: '땡!',
        value: ''
      });
    }

    if (input) {
      input.focus();
    }
  };

  onChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ value: event.target.value });
  };

  render(): JSX.Element {
    const { word, value, result } = this.state;

    return (
      <>
        <div>{word}</div>
        <form onSubmit={this.onSubmitForm}>
          <input
            type="text"
            value={value}
            onChange={this.onChangeInput}
            ref={this.onInputRef}
          />
          &nbsp;
          <button type="submit">입력! (class)</button>
        </form>
        <div>{result}</div>
      </>
    );
  }
}

export default WordRelayClass;
