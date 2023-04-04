import * as React from 'react';
import { useState, useCallback, useContext, memo } from 'react';
import MineSearchContext from './MineSearchContext';
import { startGame } from './types/types';

const FormHooks = memo(() => {
  const [row, setRow] = useState(10);
  const [cell, setCell] = useState(10);
  const [mine, setMine] = useState(20);
  const { dispatch } = useContext(MineSearchContext);

  const onChangeRow = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setRow(parseInt(evt.target.value, 10));
    },
    []
  );

  const onChangeCell = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setCell(parseInt(evt.target.value, 10));
    },
    []
  );

  const onChangeMine = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setMine(parseInt(evt.target.value, 10));
    },
    []
  );

  const onClickBtn = useCallback(() => {
    dispatch(startGame(row, cell, mine));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [row, cell, mine]);

  return (
    <div>
      <input
        type="number"
        placeholder="세로"
        value={row}
        onChange={onChangeRow}
      />
      <input
        type="number"
        placeholder="가로"
        value={cell}
        onChange={onChangeCell}
      />
      <input
        type="number"
        placeholder="지뢰"
        value={mine}
        onChange={onChangeMine}
      />
      <button type="button" onClick={onClickBtn}>
        시작
      </button>
    </div>
  );
});

export default FormHooks;
