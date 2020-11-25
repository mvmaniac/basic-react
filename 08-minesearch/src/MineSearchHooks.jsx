import React, {useEffect, useReducer, useMemo} from 'react';
import MineSearchContext from './MineSearchContext';
import TableHooks from './TableHooks';
import FormHooks from './FormHooks';
import {
  CODE,
  START_GAME,
  CLICK_MINE,
  OPEN_CELL,
  FLAG_CELL,
  QUESTION_CELL,
  NORMALIZE_CELL,
  INCREMENT_TIMER
} from './Const';

const plantMine = (row, cell, mine) => {
  console.log(row, cell, mine);

  const candidate = Array(row * cell)
    .fill()
    .map((arr, i) => i);
  const shuffle = [];

  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(
      Math.floor(Math.random() * candidate.length),
      1
    )[0];
    shuffle.push(chosen);
  }

  const data = [];

  for (let i = 0; i < row; i += 1) {
    const rowData = [];
    data.push(rowData);

    for (let j = 0; j < cell; j += 1) {
      rowData.push(CODE.NORMAL);
    }
  }

  for (let k = 0, {length} = shuffle; k < length; k += 1) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }

  console.log(data);
  return data;
};

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME: {
      return {
        ...state,
        data: {
          row: action.row,
          cell: action.cell,
          mine: action.mine
        },
        tableData: plantMine(action.row, action.cell, action.mine),
        timer: 0,
        result: '',
        halted: false,
        openedCount: 0
      };
    }
    case CLICK_MINE: {
      const tableData = [...state.tableData];

      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE;

      return {
        ...state,
        tableData,
        halted: true
      };
    }
    case OPEN_CELL: {
      const tableData = [...state.tableData];

      tableData.forEach((row, i) => {
        tableData[i] = [...row];
      });

      let openedCount = 0;
      const checked = [];
      const checkAround = (row, cell) => {
        // 상/하/좌/우 칸이 아닌 경우 필터링
        if (
          row < 0 ||
          row >= tableData.length ||
          cell < 0 ||
          cell >= tableData[0].length
        ) {
          return;
        }

        if (
          [
            CODE.OPENED,
            CODE.FLAG_MINE,
            CODE.FLAG,
            CODE.QUESTION_MINE,
            CODE.QUESTION
          ].includes(tableData[row][cell])
        ) {
          return;
        }

        // 이미 검사한 칸이면
        if (checked.includes(`${row},${cell}`)) {
          return;
        }

        checked.push(`${row},${cell}`);

        let around = [];

        if (tableData[row - 1]) {
          around = around.concat(
            tableData[row - 1][cell - 1],
            tableData[row - 1][cell],
            tableData[row - 1][cell + 1]
          );
        }

        around = around.concat(
          tableData[row][cell - 1],
          tableData[row][cell + 1]
        );

        if (tableData[row + 1]) {
          around = around.concat(
            tableData[row + 1][cell - 1],
            tableData[row + 1][cell],
            tableData[row + 1][cell + 1]
          );
        }

        const count = around.filter((v) =>
          [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)
        ).length;

        // 주변칸 오픈
        if (count === 0 && row > -1) {
          const near = [];

          if (row - 1 > -1) {
            near.push([row - 1, cell - 1]);
            near.push([row - 1, cell]);
            near.push([row - 1, cell + 1]);
          }

          near.push([row, cell - 1]);
          near.push([row, cell + 1]);

          if (row + 1 < tableData.length) {
            near.push([row + 1, cell - 1]);
            near.push([row + 1, cell]);
            near.push([row + 1, cell + 1]);
          }

          near.forEach((n) => {
            if (tableData[n[0]][n[1]] !== CODE.OPENED) {
              checkAround(n[0], n[1]);
            }
          });
        }

        // 내 칸인 닫힌 칸이라면 카운트 증가
        if (tableData[row][cell] === CODE.NORMAL) {
          openedCount += 1;
        }

        tableData[row][cell] = count;
      };

      checkAround(action.row, action.cell);

      const {row, cell, mine} = state.data;
      let halted = false;
      let result = '';

      openedCount = state.openedCount + openedCount;

      // 승리
      if (row * cell - mine === openedCount) {
        halted = true;
        result = `${state.timer}초 안에 승리 하셨습니다!`;
      }

      return {
        ...state,
        tableData,
        result,
        halted,
        openedCount
      };
    }
    case FLAG_CELL: {
      const tableData = [...state.tableData];

      tableData[action.row] = [...state.tableData[action.row]];

      if (tableData[action.row][action.cell] === CODE.MINE) {
        tableData[action.row][action.cell] = CODE.FLAG_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.FLAG;
      }

      return {
        ...state,
        tableData
      };
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData];

      tableData[action.row] = [...state.tableData[action.row]];

      if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
        tableData[action.row][action.cell] = CODE.QUESTION_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.QUESTION;
      }

      return {
        ...state,
        tableData
      };
    }
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];

      tableData[action.row] = [...state.tableData[action.row]];

      if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
        tableData[action.row][action.cell] = CODE.MINE;
      } else {
        tableData[action.row][action.cell] = CODE.NORMAL;
      }

      return {
        ...state,
        tableData
      };
    }
    case INCREMENT_TIMER: {
      return {
        ...state,
        timer: state.timer + 1
      };
    }
    default: {
      return state;
    }
  }
};

const initialState = {
  data: {
    row: 0,
    cell: 0,
    mine: 0
  },
  tableData: [],
  timer: 0,
  result: '',
  halted: true,
  openedCount: 0
};

const MineSearchHooks = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {tableData, timer, result, halted} = state;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo(() => ({tableData, halted, dispatch}), [tableData]);

  useEffect(() => {
    let interval;

    if (!halted) {
      interval = setInterval(() => {
        dispatch({type: INCREMENT_TIMER});
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [halted]);

  return (
    <MineSearchContext.Provider value={value}>
      <FormHooks />
      <div>{timer}</div>
      <TableHooks />
      <div>{result}</div>
    </MineSearchContext.Provider>
  );
};

export default MineSearchHooks;
