import React, { useContext, memo } from 'react';
import TdHooks from './TdHooks';
import MineSearchContext from './MineSearchContext';

const TrHooks = memo(({ rowIndex }) => {
  console.log('tr hooks rendered...');

  const { tableData } = useContext(MineSearchContext);

  return (
    <tr>
      {tableData[0] &&
        Array(tableData[0].length)
          .fill()
          .map((td, i) => (
            <TdHooks key={`${i + 1}`} rowIndex={rowIndex} cellIndex={i} />
          ))}
    </tr>
  );
});

export default TrHooks;
