export const SET_WINNER = 'SET_WINNER' as const;
export const CLICK_CELL = 'CLICK_CELL' as const;
export const CHANGE_TURN = 'CHANGE_TURN' as const;
export const RESET_GAME = 'RESET_GAME' as const;

export interface SetWinnerAction {
  type: typeof SET_WINNER;
  winner: 'O' | 'X';
}

// 변하는 값, 즉 변수가 있는 것만 액션 크리에이터를 만듬
export const setWinner = (winner: 'O' | 'X'): SetWinnerAction => ({
  type: SET_WINNER,
  winner
});

export interface ClickCellAction {
  type: typeof CLICK_CELL;
  row: number;
  cell: number;
}

// 변하는 값, 즉 변수가 있는 것만 액션 크리에이터를 만듬
export const clickCell = (row: number, cell: number): ClickCellAction => ({
  type: CLICK_CELL,
  row,
  cell
});

export interface ChangeTurnAction {
  type: typeof CHANGE_TURN;
}

export interface ResetGameAction {
  type: typeof RESET_GAME;
}

export type ReducerActions =
  | SetWinnerAction
  | ClickCellAction
  | ChangeTurnAction
  | ResetGameAction;
