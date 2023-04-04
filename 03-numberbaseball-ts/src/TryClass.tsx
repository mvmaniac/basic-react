import * as React from 'react';
import { PureComponent } from 'react';

import { TryInfo } from './types/types';

class TryClass extends PureComponent<{ tryInfo: TryInfo }> {
  // Component 클래스 extends 해서 해당 함수를 구현해도 됨
  // shouldComponentUpdate(nextProps, nextState, nextContext) {}
  render(): JSX.Element {
    const { tryInfo } = this.props;

    return (
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
        <div>&nbsp;</div>
      </li>
    );
  }
}

export default TryClass;
