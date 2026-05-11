import type { ReactNode } from 'react';

/**
 * DataListProps<T>:
 * 어떤 타입의 데이터 배열을 다룰지 결정하는 인터페이스입니다.
 * T는 반드시 id 속성을 가져야 한다는 제약(extends)을 걸어 안정성을 높였습니다.
 */
interface DataListProps<T extends { id: string | number }> {
  items: T[];
  renderRow: (item: T) => ReactNode;
}

/**
 * 제네릭 컴포넌트 DataList
 * T가 최소한 id를 가지고 있음을 extends로 보장받았기 때문에,
 * map 함수 내부에서 안전하게 item.id를 key로 사용할 수 있습니다.
 */
export default function DataList<T extends { id: string | number }>({
  items,
  renderRow,
}: DataListProps<T>) {
  return (
    <div
      style={{
        border: '1px solid #e1e4e8',
        borderRadius: '8px',
        overflow: 'hidden',
        marginTop: '20px',
        backgroundColor: '#fff',
      }}
    >
      {items.map((item) => (
        <div key={item.id} style={{ padding: '12px 20px', borderBottom: '1px solid #eee' }}>
          {renderRow(item)}
        </div>
      ))}
    </div>
  );
}
