import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateUserApi } from '@/samples/section-04-tan-stack-query/lessons/lesson-69/api/mock-api.ts';
import { userKeys } from '@/samples/section-04-tan-stack-query/query-keys.ts';

export default function UserEditor({ id }: { id: number }) {
  const queryClient = useQueryClient();

  /**
   * 명시적으로 사용
   * useMutation<User, Error, User, { previousUser: User[] | undefined }>
   *
   * useMutation<TData, TError, TVariables, TContext>
   * 1. TData: 성공 시 서버 응답 타입 (User)
   * 2. TError: 에러 발생 시 타입 (Error)
   * 3. TVariables: mutate에 넘길 데이터 타입 (User)
   * 4. TContext: 백업 데이터의 구조 ({ previousTodos: User[] | undefined })
   */
  const { mutate, isPending } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: (data, variables) => {
      /**
       * 엔진은 'users'로 시작하는 모든 캐시를 찾아 즉시 'Stale' 딱지를 붙입니다.
       * 화면에서 이 데이터를 쓰고 있는 모든 컴포넌트에게 재요청 신호를 보냅니다.
       */
      void queryClient.invalidateQueries({
        queryKey: userKeys.all,
      });

      // data: mutationFn이 성공 후 반환한 서버 응답 값
      // variables: mutate(variables) 호출할 때 내가 넘긴 요청 값
      // data가 빈 경우 variables 사용
      console.log(`✨ ${variables.name}님 정보 갱신 프로세스 진입`);
    },
  });

  return (
    <div
      style={{
        padding: '1rem',
        border: '1px solid #ddd',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        flex: 1,
      }}
    >
      <h3>🛠️ 수정 제어실</h3>
      <button
        style={{ padding: '10px', cursor: 'pointer' }}
        disabled={isPending}
        onClick={() => mutate({ id, name: 'New Senior ' + Math.floor(Math.random() * 100) })}
      >
        {isPending ? '서버 통신 중...' : '이름 랜덤 수정 및 무효화'}
      </button>
      <p style={{ fontSize: '12px', color: '#666' }}>
        새로고침 없이 왼쪽 정보만 바뀌는지 확인하세요.
      </p>
    </div>
  );
}
