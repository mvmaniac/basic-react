import React, {useState, useRef} from 'react';

const ResponseCheckHooks = () => {
  const [state, setSate] = useState('waiting');
  const [message, setMessage] = useState('클릭해서 시작하세요.(hooks)');
  const [result, setResult] = useState([]);

  const timeout = useRef(null);
  const startTime = useRef(null);
  const endTime = useRef(null);

  const setStateAndMessage = (newState, newMessage) => {
    setSate(newState);
    setMessage(newMessage);
  };

  const onClickScreen = () => {
    if (state === 'waiting') {
      setStateAndMessage('ready', '초록색이 되면 클릭하세요.');

      timeout.current = setTimeout(() => {
        setStateAndMessage('now', '지금 클릭!!!');

        // 시작 시간 체크
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); // 2초 ~ 3초 랜덤
    } else if (state === 'ready') {
      // 타임아웃 클리어
      clearTimeout(timeout.current);

      // 성급하게 클릭
      setStateAndMessage(
        'waiting',
        '너무 성급 하시군요! 초록색이 된 후에 클릭하세요.'
      );
    } else if (state === 'now') {
      // 끝 시간 체크
      endTime.current = new Date();

      // 반응속도 체크
      setStateAndMessage('waiting', '클릭해서 시작하세요.(hooks)');

      setResult((prevResult) => {
        return [...prevResult, endTime.current - startTime.current];
      });
    }
  };

  const onReset = () => {
    setResult([]);
  };

  const renderAverage = () => {
    return result.length === 0 ? null : (
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
  };

  return (
    <>
      <div
        id="screen"
        className={state}
        onClick={onClickScreen}
        role="button"
        tabIndex="0"
      >
        {message}
      </div>
      {renderAverage()}
    </>
  );
};

export default ResponseCheckHooks;
