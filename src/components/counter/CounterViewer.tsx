import { useCount } from '@/stores/count-store.ts';

export default function CounterViewer() {
  const count = useCount();
  return <div>{count}</div>;
}
