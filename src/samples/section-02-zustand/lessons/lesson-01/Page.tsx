import { Button } from '@/components/ui/button.tsx';

import {
  useDepartmentActions,
  useDepartmentState,
} from '@/samples/section-02-zustand/lessons/lesson-01/stores/department.ts';

export default function Lesson01Page() {
  const { perfumeStock, shirtStock } = useDepartmentState();
  const { sellPerfume, sellShirt } = useDepartmentActions();

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
        Perfume stock: {perfumeStock} <Button onClick={sellPerfume}>Sell</Button>
      </div>
      <div
        style={{
          border: '1px solid #ccc',
          padding: '15px',
          marginTop: '15px',
          borderRadius: '8px',
        }}
      >
        Shirt stock: {shirtStock} <Button onClick={sellShirt}>Sell</Button>
      </div>
    </div>
  );
}
