import React, {memo} from 'react';

const TryHooks = memo(({tryInfo}) => {
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
      <div>&nbsp;</div>
    </li>
  );
});

export default TryHooks;
