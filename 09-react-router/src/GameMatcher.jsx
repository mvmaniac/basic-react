import React, { PureComponent } from 'react';
import NumberBaseballClass from 'number-baseball/src/NumberBaseballClass';
import RockPaperScissorsClass from 'rps/src/RockPaperScissorsClass';
import LottoClass from 'lotto/src/LottoClass';

class GameMatcher extends PureComponent {
  render() {
    const { match, location } = this.props;
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
