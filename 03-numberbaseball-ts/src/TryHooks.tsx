import * as React from 'react';
import {memo} from 'react';

import {TryInfo} from './types/types';

const TryHooks: React.FC<{tryInfo: TryInfo}> = memo(({tryInfo}) => (
  <li>
    <div>{tryInfo.try}</div>
    <div>{tryInfo.result}</div>
    <div>&nbsp;</div>
  </li>
));

export default TryHooks;
