import * as React from 'react';
import TrHooks from './TrHooks';
import {ReducerActions} from './types/types';

interface Props {
  tableData: string[][];
  dispatch: React.Dispatch<ReducerActions>;
}

const TableHooks: React.FC<Props> = ({tableData, dispatch}) => (
  <table>
    <tbody>
      {Array(tableData.length)
        .fill(null)
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

export default TableHooks;
