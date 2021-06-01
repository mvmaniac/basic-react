import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';

// import NumberBaseballClass from '../../03-numberbaseball/src/NumberBaseballClass';
// import RockPaperScissorsClass from '../../05-rps/src/RockPaperScissorsClass';
// import LottoClass from '../../06-lotto/src/LottoClass';

import GameMatcher from './GameMatcher';

const Games = () => (
  <BrowserRouter>
    <div>
      <Link to="/game/number-baseball?hello=dev">숫자야구</Link>
      &nbsp;
      <Link to="/game/rock-paper-scissors">가위바위보</Link>
      &nbsp;
      <Link to="/game/lotto">로또생성기</Link>
      &nbsp;
      <Link to="/game/matcher">게임매쳐</Link>
    </div>
    <div>
      {/* <Route path="/number-baseball" component={NumberBaseballClass} />
        <Route path="/rock-paper-scissors" component={RockPaperScissorsClass} />
        <Route path="/lotto" component={LottoClass} /> */}
      <Route path="/game/:name" component={GameMatcher} />
    </div>
  </BrowserRouter>
);

export default Games;
