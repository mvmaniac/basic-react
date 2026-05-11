import { Button } from '@/components/ui/button.tsx';

import {
  useHistoryActions,
  useHistoryState,
} from '@/samples/section-02-zustand/lessons/lesson-33/stores/history.ts';

export default function Lesson33Page() {
  const { count, past, future } = useHistoryState();
  const { increment, undo, redo } = useHistoryActions();

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <div style={{ padding: '30px', backgroundColor: '#f0f0f0', borderRadius: '15px' }}>
        <h2 style={{ fontSize: '64px', margin: '10px 0' }}>{count}</h2>
        <Button onClick={increment} style={{ padding: '10px 20px', fontSize: '16px' }}>
          증가 (+)
        </Button>
        <Button
          onClick={undo}
          disabled={past.length === 0}
          style={{ padding: '10px 20px', marginLeft: '10px' }}
        >
          Undo
        </Button>
        <Button
          onClick={redo}
          disabled={future.length === 0}
          style={{ padding: '10px 20px', marginLeft: '10px' }}
        >
          Redo
        </Button>
      </div>
      <div style={{ display: 'flex', gap: '50px', marginTop: '30px' }}>
        <div style={{ flex: 1 }}>
          <h4>📜 과거 (Past Stack)</h4>
          {past.map((v, i) => (
            <div key={i} style={{ borderBottom: '1px solid #ddd', padding: '5px 0' }}>
              Snapshot: {v}
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <h4>🔮 미래 (Future Stack)</h4>
          {future.map((v, i) => (
            <div key={i} style={{ borderBottom: '1px solid #ddd', padding: '5px 0' }}>
              Snapshot: {v}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
