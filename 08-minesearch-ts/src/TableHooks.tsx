import * as React from 'react';
import { useContext, memo } from 'react';
import TrHooks from './TrHooks';
import MineSearchContext from './MineSearchContext';

const TableHooks = memo(() => {
  const { tableData } = useContext(MineSearchContext);

  return (
    <table>
      <tbody>
        {Array(tableData.length)
          .fill(0)
          .map((tr, i) => (
            <TrHooks key={`${i + 1}`} rowIndex={i} />
          ))}
      </tbody>
    </table>
  );
});

export default TableHooks;
