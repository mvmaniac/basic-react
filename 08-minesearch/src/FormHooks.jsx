import React, {useState, useCallback, useContext, memo} from 'react';
import MineSearchContext from './MineSearchContext';
import {START_GAME} from './Const';

const FormHooks = memo(() => {
  const [row, setRow] = useState(10);
  const [cell, setCell] = useState(10);
  const [mine, setMine] = useState(20);
  const {dispatch} = useContext(MineSearchContext);

  const onChangeRow = useCallback((evt) => {
    setRow(evt.target.value);
  }, []);

  const onChangeCell = useCallback((evt) => {
    setCell(evt.target.value);
  }, []);

  const onChangeMine = useCallback((evt) => {
    setMine(evt.target.value);
  }, []);

  const onClickBtn = useCallback(() => {
    dispatch({type: START_GAME, row, cell, mine});
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
