import DesignButton from '@/samples/section-01-typescript/lessons/lesson-11/components/DesignButton.tsx';

export default function Lesson11Page() {
  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <DesignButton token="primary-500" label="Confirm" />
      <DesignButton token="accent-300" label="Notify" />
    </div>
  );
}
