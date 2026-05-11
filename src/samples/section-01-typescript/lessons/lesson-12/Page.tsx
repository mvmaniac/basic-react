import GlobalErrorBoundary from '@/samples/section-01-typescript/lessons/lesson-12/components/GlobalErrorBoundary.tsx';

function Bomb() {
  throw new Error('Engine threshold exceeded');
  return <div>working...</div>;
}

export default function Lesson12Page() {
  return (
    <div style={{ padding: '40px' }}>
      <GlobalErrorBoundary fallback={<p>Recovered safely.</p>}>
        <Bomb />
      </GlobalErrorBoundary>
      <p style={{ marginTop: '20px', color: 'green' }}>Outside boundary is still healthy.</p>
    </div>
  );
}
