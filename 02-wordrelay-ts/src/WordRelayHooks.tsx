import * as React from 'react';
import { useState, useRef, useCallback } from 'react';

function WordRelayHooks(): JSX.Element {
  const [word, setWord] = useState('백수');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // useCallback 제네릭을 사용해서 타입을 정의하는 경우
  const onSubmitForm = useCallback<
    (event: React.FormEvent<HTMLFormElement>) => void
  >(
    (event) => {
      event.preventDefault();

      if (word[word.length - 1] === value[0]) {
        setResult('딩동댕');
        setValue('');
        setWord(value);
      } else {
        setResult('땡!');
        setValue('');
      }

      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
    [word, value]
  );

  // useCallback 제네릭을 사용하지 않고 타입을 정의하는 경우
  const onChangeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    []
  );

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
}

export default WordRelayHooks;
