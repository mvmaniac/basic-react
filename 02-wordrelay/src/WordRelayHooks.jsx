import React, {useState, useRef} from 'react';

const WordRelayHooks = () => {
  const [word, setWord] = useState('백수');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();

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

  const onChangeInput = (e) => {
    setValue(e.target.value);
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
        <button type="button">입력!(hooks)</button>
      </form>
      <div>{result}</div>
    </>
  );
};

export default WordRelayHooks;
