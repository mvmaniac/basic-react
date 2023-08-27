import React, { Component } from 'react';

class WordRelayClass extends Component {
  constructor() {
    super();

    this.state = {
      word: '백수',
      value: '',
      result: '',
    };
  }

  onSubmitForm = (event) => {
    const { word, value } = this.state;

    event.preventDefault();

    if (word[word.length - 1] === value[0]) {
      this.setState({
        result: '딩동댕',
        value: '',
        word: value,
      });
    } else {
      this.setState({
        result: '땡!',
        value: '',
      });
    }

    this.inputRef.focus();
  };

  onChangeInput = (event) => {
    this.setState({ value: event.target.value });
  };

  onInputRef = (el) => {
    this.inputRef = el;
  };

  render() {
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
