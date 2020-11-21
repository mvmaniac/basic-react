import * as React from 'react';
import {useHistory, useLocation, useRouteMatch} from 'react-router';
import NumberBaseballHooks from '../../03-numberbaseball-ts/src/NumberBaseballHooks';
import RockPaperScissorsHooks from '../../05-rps-ts/src/RockPaperScissorsHooks';
import LottoHooks from '../../06-lotto-ts/src/LottoHooks';

// 커스텀 속성이 있다면 기존 타입을 확장
// interface Props extends RouteChildrenProps {
//   hello: string;
// }

const GameMatcherHooks = (): JSX.Element => {
  const match = useRouteMatch<{name: string}>();
  const location = useLocation();
  const history = useHistory();

  if (!match) {
    return <div>일치하는 게임이 없습니다.(hooks)</div>;
  }

  const urlSearchParams = new URLSearchParams(location.search.slice(1));
  console.log(urlSearchParams.get('hello'));

  if (match.params.name === 'number-baseball') {
    return <NumberBaseballHooks />;
  }

  if (match.params.name === 'rock-paper-scissors') {
    return <RockPaperScissorsHooks />;
  }

  if (match.params.name === 'lotto') {
    return <LottoHooks />;
  }

  return <div>일치하는 게임이 없습니다.(hooks)</div>;
};

export default GameMatcherHooks;
