import CounterController from '@/components/counter/CounterController.tsx';
import CounterViewer from '@/components/counter/CounterViewer.tsx';

export default function CounterPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Counter</h1>
      <CounterViewer />
      <CounterController />
    </div>
  );
}
