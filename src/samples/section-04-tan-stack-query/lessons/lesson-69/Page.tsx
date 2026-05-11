import UserProfile from '@/samples/section-04-tan-stack-query/lessons/lesson-65/components/UserProfile.tsx';
import UserEditor from '@/samples/section-04-tan-stack-query/lessons/lesson-69/components/UserEditor.tsx';

export default function Lesson69Page() {
  return (
    <main
      style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto' }}
    >
      <div style={{ display: 'flex', gap: '2rem', marginTop: '20px' }}>
        <UserProfile id={1} />
        <UserEditor id={1} />
      </div>
    </main>
  );
}
