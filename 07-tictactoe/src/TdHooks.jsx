import React, {useCallback, useEffect, useRef, memo} from 'react';
import {CLICK_CELL} from './Const';

const TdHooks = memo(({rowIndex, cellIndex, cellData, dispatch}) => {
  console.log('td hooks rendered...');

  const ref = useRef([]);
  useEffect(() => {
    console.log(
      'td hooks -> ',
      rowIndex === ref.current[0],
      cellIndex === ref.current[1],
      dispatch === ref.current[2],
      cellData === ref.current[3]
    );
    ref.current = [rowIndex, cellIndex, dispatch, cellData];
  }, [rowIndex, cellIndex, dispatch, cellData]);

  const onClickTd = useCallback(() => {
    console.log(`rowIndex, cellIndex = ${rowIndex}, ${cellIndex}`);

    if (cellData) {
      return;
    }

    // 비동기 임
    dispatch({type: CLICK_CELL, row: rowIndex, cell: cellIndex});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cellData]);

  return (
    <td onClick={onClickTd} role="presentation">
      {cellData}
    </td>
  );
});

export default TdHooks;
