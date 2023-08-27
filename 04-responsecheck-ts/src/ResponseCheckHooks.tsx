import * as React from 'react';
import { useState, useRef, useCallback } from 'react';

function ResponseCheckHooks(): JSX.Element {
  const [state, setSate] = useState('waiting');
  const [message, setMessage] = useState('클릭해서 시작하세요.(hooks)');
  const [result, setResult] = useState<number[]>([]);

  const timeout = useRef<number | null>(null);
  const startTime = useRef(0);
  const endTime = useRef(0);

  const setStateAndMessage = (newState: string, newMessage: string) => {
    setSate(newState);
    setMessage(newMessage);
  };

  const onClickScreen = useCallback(() => {
    if (state === 'waiting') {
      setStateAndMessage('ready', '초록색이 되면 클릭하세요.');

      timeout.current = window.setTimeout(
        () => {
          setStateAndMessage('now', '지금 클릭!!!');

          // 시작 시간 체크
          startTime.current = new Date().getTime();
        },
        Math.floor(Math.random() * 1000) + 2000,
      ); // 2초 ~ 3초 랜덤
    } else if (state === 'ready') {
      // 타임아웃 클리어
      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      // 성급하게 클릭
      setStateAndMessage(
        'waiting',
        '너무 성급 하시군요! 초록색이 된 후에 클릭하세요.',
      );
    } else if (state === 'now') {
      // 끝 시간 체크
      endTime.current = new Date().getTime();

      // 반응속도 체크
      setStateAndMessage('waiting', '클릭해서 시작하세요.(hooks)');

      setResult((prevResult) => [
        ...prevResult,
        endTime.current - startTime.current,
      ]);
    }
  }, [state]);

  const onReset = useCallback(() => {
    setResult([]);
  }, []);

  const renderAverage = () =>
    result.length === 0 ? null : (
      <>
        <div>
          평균시간:&nbsp;
          {result.reduce((a, c) => a + c) / result.length}
          ms
        </div>
        <button type="button" onClick={onReset}>
          리셋
        </button>
      </>
    );

  return (
    <>
      <div
        id="screen"
        className={state}
        onClick={onClickScreen}
        role="button"
        tabIndex={0}
      >
        {message}
      </div>
      {renderAverage()}
    </>
  );
}

export default ResponseCheckHooks;
