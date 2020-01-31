import React, {Component} from 'react';
import NumberBaseballClass from '../../03-numberbaseball/src/NumberBaseballClass';
import RockPaperScissorsClass from '../../05-rps/src/RockPaperScissorsClass';
import LottoClass from '../../06-lotto/src/LottoClass';

class GameMatcher extends Component {
  ignore = () => {};

  render () {
    const {match, location} = this.props;
    console.log(this.props);

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

    return <div>일치하는 게임이 없습니다.</div>;
  }
}

export default GameMatcher;
