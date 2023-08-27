import * as React from 'react';
import { useState, useRef, useCallback } from 'react';
import TryHooks from './TryHooks';
import { TryInfo } from './types/types';

// 숫자 4개를 겹치지 않고 랜덤하게 뽑는 함수
const getNumbers = () => {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];

  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }

  return array;
};

function NumberBaseballHooks(): JSX.Element {
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState(getNumbers());
  const [tries, setTries] = useState<TryInfo[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    alert('게임을 다시 시작합니다!');

    setValue('');
    setAnswer(getNumbers());
    setTries([]);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const onSubmitForm = useCallback<
    (event: React.FormEvent<HTMLFormElement>) => void
  >(
    (event) => {
      event.preventDefault();

      if (value === answer.join('')) {
        setResult('홈런');
        setTries((prevTries) => [...prevTries, { try: value, result: '홈런' }]);

        reset();
      } else {
        const answerArray = value.split('').map((v) => parseInt(v, 10));

        let strike = 0;
        let ball = 0;

        if (tries.length >= 9) {
          setResult(
            `10번 넘게 틀려서 실패! 답은 ${answer.join(',')} 였습니다!`,
          );

          reset();
        } else {
          for (let i = 0; i < 4; i += 1) {
            if (answerArray[i] === answer[i]) {
              strike += 1;
            } else if (answer.includes(answerArray[i])) {
              ball += 1;
            }
          }

          setResult('');
          setValue('');

          setTries((prevTries) => [
            ...prevTries,
            { try: value, result: `${strike} 스트라이크, ${ball} 볼 입니다.` },
          ]);
        }
      }
    },
    [value, answer, tries.length],
  );

  const onChangeInput = useCallback<
    (event: React.ChangeEvent<HTMLInputElement>) => void
  >((event) => {
    setValue(event.target.value);
  }, []);

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input
          maxLength={4}
          value={value}
          onChange={onChangeInput}
          ref={inputRef}
        />
      </form>
      <div>
        시도(hooks):&nbsp;
        {tries.length}
      </div>
      <ul>
        {tries.map((v, idx) => (
          <TryHooks key={`${idx + 1}차 시도 : `} tryInfo={v} />
        ))}
      </ul>
    </>
  );
}

export default NumberBaseballHooks;
