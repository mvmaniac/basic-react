import { createContext } from 'react';

const MineSearchContext = createContext({
  tableData: [],
  halted: true,
  dispatch: () => {}
});

export default MineSearchContext;
