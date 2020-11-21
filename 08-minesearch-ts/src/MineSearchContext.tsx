import {createContext} from 'react';
import {Codes, ReducerActions} from './types/types';

interface Context {
  tableData: Codes[][];
  halted: boolean;
  dispatch: React.Dispatch<ReducerActions>;
}

const MineSearchContext = createContext<Context>({
  tableData: [],
  halted: true,
  dispatch: () => {}
});

export default MineSearchContext;
