import { useSuspenseQueries } from '@tanstack/react-query';

import {
  fetchPosts,
  fetchUser,
} from '@/samples/section-04-tan-stack-query/lessons/lesson-66/api/mock-api.ts';
import { postKeys, userKeys } from '@/samples/section-04-tan-stack-query/query-keys.ts';

export default function UserAndPosts({ id }: { id: number }) {
  /**
   * [Solution] useSuspenseQueries를 활용한 병렬 페칭 최적화
   * queries 배열 안에 요청들을 담아 전달하면 엔진이 이를 하나의 단위로 인식합니다.
   */
  const [userQuery, postsQuery] = useSuspenseQueries({
    queries: [
      {
        queryKey: userKeys.detail(id),
        queryFn: () => fetchUser(id),
        staleTime: 1000 * 60 * 5,
      },
      {
        queryKey: postKeys.list(id),
        queryFn: () => fetchPosts(id),
        staleTime: 1000 * 60,
      },
    ],
  });

  /**
   * 모든 비동기 로직이 동시에 시작된 후, 모든 데이터가 준비되었을 때 리턴 문이 실행됩니다.
   * userQuery.data는 User 타입으로, postsQuery.data는 Post[] 타입으로 정확히 추론됩니다.
   */
  return (
    <section
      style={{
        border: '2px solid #333',
        padding: '1.5rem',
        borderRadius: '12px',
        background: '#fff',
      }}
    >
      <h2>🚀 {userQuery.data.name}님의 대시보드</h2>
      <hr />
      <h3>최신 게시글 목록</h3>
      <ul style={{ lineHeight: '1.8' }}>
        {postsQuery.data.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
          </li>
        ))}
      </ul>
      <p style={{ color: '#666', fontSize: '0.9rem' }}>
        💡 2개의 요청(각 2초)이 동시에 시작되어 총 2초 만에 완료되었습니다.
      </p>
    </section>
  );
}
