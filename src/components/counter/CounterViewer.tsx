import { useCount } from '@/stores/count.ts';

export default function CounterViewer() {
  const count = useCount();
  return <div>{count}</div>;
}
