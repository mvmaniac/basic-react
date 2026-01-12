import { useDecreaseCount, useIncreaseCount } from '@/stores/count-store';

import { Button } from '@/components/ui/button';

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
