import { useCount } from '@/stores/count-store';

export default function CounterViewer() {
  const count = useCount();
  return <div>{count}</div>;
}
