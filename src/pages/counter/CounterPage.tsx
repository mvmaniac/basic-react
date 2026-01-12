import CounterController from '@/components/counter/CounterController';
import CounterViewer from '@/components/counter/CounterViewer';

export default function CounterPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Counter</h1>
      <CounterViewer />
      <CounterController />
    </div>
  );
}
