import * as React from 'react';
import { useContext, memo } from 'react';
import TdHooks from './TdHooks';
import MineSearchContext from './MineSearchContext';

interface Props {
  rowIndex: number;
}

const TrHooks: React.FC<Props> = memo(({ rowIndex }) => {
  console.log('tr hooks rendered...');

  const { tableData } = useContext(MineSearchContext);

  return (
    <tr>
      {tableData[0] &&
        Array(tableData[0].length)
          .fill(0)
          .map((td, i) => (
            <TdHooks key={`${i + 1}`} rowIndex={rowIndex} cellIndex={i} />
          ))}
    </tr>
  );
});

export default TrHooks;
