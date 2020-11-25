import React, {useState, useRef} from 'react';

const WordRelayHooks = () => {
  const [word, setWord] = useState('백수');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  const onSubmitForm = (event) => {
    event.preventDefault();

    if (word[word.length - 1] === value[0]) {
      setResult('딩동댕');
      setValue('');
      setWord(value);
    } else {
      setResult('땡!');
      setValue('');
    }

    inputRef.current.focus();
  };

  const onChangeInput = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          value={value}
          onChange={onChangeInput}
          ref={inputRef}
        />
        &nbsp;
        <button type="submit">입력!(hooks)</button>
      </form>
      <div>{result}</div>
    </>
  );
};

export default WordRelayHooks;
