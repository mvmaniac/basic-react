import { useDecreaseCount, useIncreaseCount } from '@/stores/count.ts';

import { Button } from '@/components/ui/button.tsx';

export default function CounterController() {
  const increase = useIncreaseCount();
  const decrease = useDecreaseCount();

  return (
    <div>
      <Button onClick={decrease}>-</Button>
      <Button onClick={increase}>+</Button>
    </div>
  );
}
