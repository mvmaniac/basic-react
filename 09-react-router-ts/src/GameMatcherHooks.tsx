import * as React from 'react';
import { useParams, useLocation } from 'react-router';
// import NumberBaseballHooks from '../../03-numberbaseball-ts/src/NumberBaseballHooks';
// import RockPaperScissorsHooks from '../../05-rps-ts/src/RockPaperScissorsHooks';
// import LottoHooks from '../../06-lotto-ts/src/LottoHooks';

// 커스텀 속성이 있다면 기존 타입을 확장
// interface Props extends RouteChildrenProps {
//   hello: string;
// }

function GameMatcherHooks(): JSX.Element {
  const location = useLocation();
  const params = useParams();
  const { name } = params;

  if (!name) {
    return <div>일치하는 게임이 없습니다.(hooks)</div>;
  }

  const urlSearchParams = new URLSearchParams(location.search.slice(1));
  console.log(urlSearchParams.get('hello'));

  if (name === 'number-baseball') {
    return <NumberBaseballHooks />;
  }

  if (name === 'rock-paper-scissors') {
    return <RockPaperScissorsHooks />;
  }

  if (name === 'lotto') {
    return <LottoHooks />;
  }

  return <div>일치하는 게임이 없습니다.(hooks)</div>;
}

export default GameMatcherHooks;
