import React, {memo} from 'react';

const TryHooks = memo(({tryInfo}) => (
  <li>
    <div>{tryInfo.try}</div>
    <div>{tryInfo.result}</div>
    <div>&nbsp;</div>
  </li>
));

export default TryHooks;
