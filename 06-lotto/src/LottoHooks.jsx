import React, {useState, useRef, useEffect, useMemo, useCallback} from 'react';
import BallHooks from './BallHooks';

const getWinNumbers = () => {
  console.log('getWinNumbers...');

  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);

  const shuffle = [];

  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }

  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);

  return [...winNumbers, bonusNumber];
};

const LottoHooks = () => {
  // hooks의 경우 함수 컴포넌트 전체가 실행되기 때문에
  // getWinNumbers() 함수가 계속 실행됨
  // useMemo 는 함수 결과 값을 저장한다, 두번쨰 인자로 설정한 변수의 상태가 바뀌기 전까지...
  const lottoNumbers = useMemo(() => getWinNumbers(), []);

  const [winNumbers, setWinNumbers] = useState(lottoNumbers); // 당첨 숫자들
  const [winBalls, setWinBalls] = useState([]);
  const [bonusBall, setBonusBall] = useState(null); // 보너스 공
  const [redo, setRedo] = useState(false);

  const timeouts = useRef([]);

  const runTimeouts = () => {
    for (let i = 0, {length} = winNumbers; i < length - 1; i += 1) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevWinBalls) => [...prevWinBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
    }

    timeouts.current[6] = setTimeout(() => {
      setBonusBall(winNumbers[6]);
      setRedo(true);
    }, 7000);
  };

  // useEffect 는 안에 있는 함수를 실행 한다, 두 번째 인자로 설정한 변수의 상태가 바뀔 때...
  useEffect(() => {
    // componentDidMount, componentDidUpdate 역할 (1:1 대응은 아님)
    console.log('useEffect...');
    runTimeouts();

    return () => {
      // componentWillUnmount 역할
      console.log('useEffect return...');
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
    // 배열에 요소가 있으면 componentDidMount와 componentDidUpdate 둘 다 수행
    // 빈 배열이면 componentDidMount와 동일
  }, [timeouts.current]);

  // useCallback 함수 자체를 기억한다. 두 번째 인자가로 설정한 변수의 상태가 바뀌기 전까지...
  const onClickRedo = useCallback(() => {
    console.log('onClickRedo...');
    console.log(winNumbers);

    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonusBall(null);
    setRedo(false);

    timeouts.current = [];
    // timeouts.current.length = null; // 이런식으로 하면 안됨, 상태가 변화가 감지가 안됨
  }, [winNumbers]);

  return (
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map((v) => (
          <BallHooks key={v} number={v} />
        ))}
      </div>
      <div>보너스!</div>
      {bonusBall && <BallHooks number={bonusBall} />}
      {redo && (
        <button type="button" onClick={onClickRedo}>
          한 번 더!
        </button>
      )}
    </>
  );
};

export default LottoHooks;
