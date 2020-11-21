import * as React from 'react';
import {Component} from 'react';
import {RouteChildrenProps} from 'react-router';
import NumberBaseballClass from '../../03-numberbaseball-ts/src/NumberBaseballClass';
import RockPaperScissorsClass from '../../05-rps-ts/src/RockPaperScissorsClass';
import LottoClass from '../../06-lotto-ts/src/LottoClass';

// 커스텀 속성이 있다면 기존 타입을 확장
// interface Props extends RouteChildrenProps {
//   hello: string;
// }

class GameMatcherClass extends Component<RouteChildrenProps<{name: string}>> {
  ignore = (): void => {};

  render(): JSX.Element {
    const {match, location} = this!.props;
    console.log(this!.props);

    if (!match) {
      return <div>일치하는 게임이 없습니다.(class)</div>;
    }

    const urlSearchParams = new URLSearchParams(location.search.slice(1));
    console.log(urlSearchParams.get('hello'));

    if (match.params.name === 'number-baseball') {
      return <NumberBaseballClass />;
    }

    if (match.params.name === 'rock-paper-scissors') {
      return <RockPaperScissorsClass />;
    }

    if (match.params.name === 'lotto') {
      return <LottoClass />;
    }

    return <div>일치하는 게임이 없습니다.(class)</div>;
  }
}

export default GameMatcherClass;
