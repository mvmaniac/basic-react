import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { useQueryClient } from '@tanstack/react-query';

import type { FallbackProps } from 'react-error-boundary';

import UserProfile from '@/samples/section-04-tan-stack-query/lessons/lesson-65/components/UserProfile.tsx';

// 대체 UI 컴포넌트들 (Plan B)
const UserProfileSkeleton = () => (
  <div style={{ padding: '2rem', background: '#eee', borderRadius: '12px', textAlign: 'center' }}>
    ? 스켈레톤 UI가 데이터를 기다리는 중...
  </div>
);

const ErrorPage = ({ error, resetErrorBoundary }: FallbackProps) => (
  <div style={{ color: 'red', border: '2px solid red', padding: '1rem', borderRadius: '12px' }}>
    <h3>? 차단기 작동 (에러 격리)</h3>
    <p>{error instanceof Error ? error.message : '알 수 없는 에러가 발생했습니다.'}</p>
    <button onClick={resetErrorBoundary}>다시 시도</button>
  </div>
);

export default function Lesson65Page() {
  const queryClient = useQueryClient();

  return (
    <main
      style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}
    >
      <div style={{ marginTop: '20px' }}>
        {/* 1. 에러 발생 시 앱 전체가 죽지 않게 막아주는 안전 펜스 (Error Boundary) */}
        <ErrorBoundary
          FallbackComponent={ErrorPage}
          onReset={() => void queryClient.resetQueries()}
        >
          {/* 2. 자식이 실행을 중단하면 가로채서 로딩 UI를 띄우는 대기실 (Suspense) */}
          <Suspense fallback={<UserProfileSkeleton />}>
            {/* ?? 테스트: id를 0으로 바꾸면 에러 UI가 나타납니다. */}
            <UserProfile id={1} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </main>
  );
}
