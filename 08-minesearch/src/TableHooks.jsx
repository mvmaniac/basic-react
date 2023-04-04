import React, { useContext, memo } from 'react';
import TrHooks from './TrHooks';
import MineSearchContext from './MineSearchContext';

const TableHooks = memo(() => {
  const { tableData } = useContext(MineSearchContext);

  return (
    <table>
      <tbody>
        {Array(tableData.length)
          .fill()
          .map((tr, i) => (
            <TrHooks key={`${i + 1}`} rowIndex={i} />
          ))}
      </tbody>
    </table>
  );
});

export default TableHooks;
