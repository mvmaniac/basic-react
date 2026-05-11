import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import type { FallbackProps } from 'react-error-boundary';

import UserAndPosts from '@/samples/section-04-tan-stack-query/lessons/lesson-66/components/UserAndPosts.tsx';

const GlobalSkeleton = () => (
  <div
    style={{ padding: '2rem', background: '#f0f0f0', borderRadius: '12px', textAlign: 'center' }}
  >
    ⌛ 데이터를 병렬로 동기화 중입니다... (Waterfall 격파 중)
  </div>
);

const ErrorPage = ({ error }: FallbackProps) => (
  <div style={{ color: 'red', padding: '1rem', border: '2px solid red', borderRadius: '8px' }}>
    ❌ 에러 발생: {error instanceof Error ? error.message : '알 수 없는 에러가 발생했습니다.'}
  </div>
);
export default function Lesson66Page() {
  return (
    <main
      style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}
    >
      <ErrorBoundary fallbackRender={ErrorPage}>
        <Suspense fallback={<GlobalSkeleton />}>
          {/* ⚠️ 테스트: id를 0으로 바꾸면 2초 뒤 즉시 ErrorPage가 나타납니다. */}
          <UserAndPosts id={1} />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
