import * as React from 'react';
import {useCallback, useContext, useMemo, memo} from 'react';
import MineSearchContext from './MineSearchContext';
import {
  CODE,
  openCell,
  clickMine,
  flagMine,
  questionCell,
  normalizeCell,
  Codes
} from './types/types';

const getTdStyle = (code: Codes) => {
  switch (code) {
    case CODE.NORMAL:
    case CODE.MINE: {
      return {
        background: '#444'
      };
    }
    case CODE.CLICKED_MINE:
    case CODE.OPENED: {
      return {
        background: '#fff'
      };
    }
    case CODE.FLAG_MINE:
    case CODE.FLAG: {
      return {
        background: '#f00'
      };
    }
    case CODE.QUESTION_MINE:
    case CODE.QUESTION: {
      return {
        background: '#ff0'
      };
    }
    default: {
      return {
        background: '#fff'
      };
    }
  }
};

const getTdText = (code: Codes) => {
  switch (code) {
    case CODE.NORMAL: {
      return '';
    }
    case CODE.MINE: {
      return 'X';
    }
    case CODE.CLICKED_MINE: {
      return '펑';
    }
    case CODE.FLAG_MINE:
    case CODE.FLAG: {
      return '!';
    }
    case CODE.QUESTION_MINE:
    case CODE.QUESTION: {
      return '?';
    }
    default: {
      return code || '';
    }
  }
};

interface Props {
  rowIndex: number;
  cellIndex: number;
}

const TdHooks: React.FC<Props> = memo(({rowIndex, cellIndex}) => {
  console.log('td hooks rendered...');

  const {tableData, halted, dispatch} = useContext(MineSearchContext);
  const code = tableData[rowIndex][cellIndex];

  const onclickTd = useCallback(() => {
    // 게임이 멈췄으면 아무것도 하지 않음
    if (halted) {
      return;
    }

    switch (tableData[rowIndex][cellIndex]) {
      case CODE.OPENED:
      case CODE.FLAG_MINE:
      case CODE.FLAG:
      case CODE.QUESTION_MINE:
      case CODE.QUESTION: {
        break;
      }
      case CODE.NORMAL: {
        dispatch(openCell(rowIndex, cellIndex));
        break;
      }
      case CODE.MINE: {
        dispatch(clickMine(rowIndex, cellIndex));
        break;
      }
      default: {
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableData[rowIndex][cellIndex], halted]);

  const onRightClickTd = useCallback(
    (evt: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>) => {
      evt.preventDefault();

      // 게임이 멈췄으면 아무것도 하지 않음
      if (halted) {
        return;
      }

      switch (tableData[rowIndex][cellIndex]) {
        case CODE.NORMAL:
        case CODE.MINE: {
          dispatch(flagMine(rowIndex, cellIndex));
          break;
        }
        case CODE.FLAG_MINE:
        case CODE.FLAG: {
          dispatch(questionCell(rowIndex, cellIndex));
          break;
        }
        case CODE.QUESTION_MINE:
        case CODE.QUESTION: {
          dispatch(normalizeCell(rowIndex, cellIndex));
          break;
        }
        default: {
          break;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tableData[rowIndex][cellIndex], halted]
  );

  return useMemo(
    () => (
      <td
        style={getTdStyle(code)}
        onClick={onclickTd}
        onContextMenu={onRightClickTd}
        role="presentation"
      >
        {getTdText(code)}
      </td>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tableData[rowIndex][cellIndex]]
  );
});

export default TdHooks;
