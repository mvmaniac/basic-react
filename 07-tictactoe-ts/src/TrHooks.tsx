import * as React from 'react';
import { useEffect, useRef, memo } from 'react';
import TdHooks from './TdHooks';
import { ReducerActions } from './types/types';

interface Props {
  rowIndex: number;
  rowData: string[];
  dispatch: React.Dispatch<ReducerActions>;
}

const TrHooks: React.FC<Props> = memo(({ rowIndex, rowData, dispatch }) => {
  console.log('tr hooks rendered...');

  const ref = useRef<any>([]);
  useEffect(() => {
    console.log(
      'tr hooks -> ',
      rowData === ref.current[0],
      dispatch === ref.current[1],
      rowIndex === ref.current[2]
    );
    ref.current = [rowData, dispatch, rowIndex];
  }, [rowData, dispatch, rowIndex]);

  return (
    <tr>
      {Array(rowData.length)
        .fill(null)
        .map((td, i) => (
          <TdHooks
            key={`${i + 1}`}
            rowIndex={rowIndex}
            cellIndex={i}
            cellData={rowData[i]}
            dispatch={dispatch}
          />
        ))}
    </tr>
  );
});

export default TrHooks;
