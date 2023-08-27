import React, { useEffect, useReducer } from 'react';
import TableHooks from './TableHooks';
import { SET_WINNER, CLICK_CELL, CHANGE_TURN, RESET_GAME } from './Const';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER: {
      // state.winner = action.winner; 이렇게 하면 안됨
      // 기존 state 직접 바꾸는게 아니라, 기존 state 에서 바뀌는 부분만 바꾸고
      // 새로운 state 를 만들어서 리턴해주어야 함
      return {
        ...state,
        winner: action.winner,
      };
    }
    case CLICK_CELL: {
      const tableData = [...state.tableData];

      tableData[action.row] = [...tableData[action.row]];
      tableData[action.row][action.cell] = state.turn;

      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell],
      };
    }
    case CHANGE_TURN: {
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      };
    }
    case RESET_GAME: {
      return {
        ...state,
        turn: 'O',
        tableData: [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        recentCell: [-1, -1],
      };
    }
    default: {
      return state;
    }
  }
};

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  recentCell: [-1, -1],
};

function TicTacToeHooks() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { winner, turn, tableData, recentCell } = state;

  useEffect(() => {
    const [row, cell] = recentCell;

    if (row < 0) {
      return;
    }

    let win = false;

    if (
      tableData[row][0] === turn &&
      tableData[row][1] === turn &&
      tableData[row][2] === turn
    ) {
      win = true;
    }

    if (
      tableData[0][cell] === turn &&
      tableData[1][cell] === turn &&
      tableData[2][cell] === turn
    ) {
      win = true;
    }

    if (
      tableData[0][0] === turn &&
      tableData[1][1] === turn &&
      tableData[2][2] === turn
    ) {
      win = true;
    }

    if (
      tableData[0][2] === turn &&
      tableData[1][1] === turn &&
      tableData[2][0] === turn
    ) {
      win = true;
    }

    if (win) {
      dispatch({ type: SET_WINNER, winner: turn });
      dispatch({ type: RESET_GAME });
    } else {
      // true 이면 무승부 임
      let all = true;

      // 무승부 검사
      tableData.forEach((rowData) => {
        rowData.forEach((cellData) => {
          if (!cellData) {
            all = false;
          }
        });
      });

      if (all) {
        dispatch({ type: RESET_GAME });
      } else {
        dispatch({ type: CHANGE_TURN });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recentCell]);

  return (
    <>
      <TableHooks tableData={tableData} dispatch={dispatch} />
      {winner && (
        <div>
          {winner}
          님의 승리
        </div>
      )}
    </>
  );
}

export default TicTacToeHooks;
