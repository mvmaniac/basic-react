import { useSuspenseQuery } from '@tanstack/react-query';

import type { User } from '@/samples/section-04-tan-stack-query/lessons/lesson-65/api/mock-api.ts';

import { fetchUser } from '@/samples/section-04-tan-stack-query/lessons/lesson-65/api/mock-api.ts';
import { userKeys } from '@/samples/section-04-tan-stack-query/query-keys.ts';

export default function UserProfile({ id }: { id: number }) {
  /**
   * 1. useSuspenseQuery의 핵심 메커니즘:
   * 성공한 데이터가 올 때까지 이 컴포넌트의 실행은 여기서 중단(Suspend)됩니다.
   * 데이터가 없으면 상위 Suspense로 제어권을 완전히 던져버립니다.
   */
  const { data: user } = useSuspenseQuery<User>({
    queryKey: userKeys.detail(id),
    queryFn: () => fetchUser(id),
  });

  /**
   * 2. 데이터 존재 확정:
   * 로딩이나 에러 상태라면 실행 흐름이 이 리턴 문까지 내려오지도 않습니다.
   * 타입스크립트 환경에서 'user'는 절대로 undefined일 수 없음을 보장받습니다.
   * 옵셔널 체이닝(?.) 없는 깨끗한 코드가 완성됩니다.
   */
  return (
    <div style={styles.container}>
      <img src={user.avatar} alt={user.name} style={styles.avatar} />
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

const styles = {
  container: {
    border: '2px solid #333',
    padding: '1.5rem',
    borderRadius: '12px',
    backgroundColor: '#f8f9fa',
    textAlign: 'center' as const,
  },
  avatar: { width: '80px', borderRadius: '50%', marginBottom: '10px' },
};
