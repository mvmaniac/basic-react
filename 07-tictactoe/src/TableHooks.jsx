import React from 'react';
import TrHooks from './TrHooks';

function TableHooks({ tableData, dispatch }) {
  return (
    <table>
      <tbody>
        {Array(tableData.length)
          .fill()
          .map((tr, i) => (
            <TrHooks
              key={`${i + 1}`}
              rowIndex={i}
              rowData={tableData[i]}
              dispatch={dispatch}
            />
          ))}
      </tbody>
    </table>
  );
}

export default TableHooks;
