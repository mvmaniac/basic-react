import { useParams } from 'react-router';

import { useTodoById } from '@/queries/todo-query';

export default function TodoDetailPage() {
  const params = useParams();
  const id = params.id;

  const { data, isLoading, error } = useTodoById(Number(id));

  if (isLoading) return <div>로딩 중 입니다 ...</div>;
  if (error || !data) return <div>오류가 발생했습니다.</div>;

  return (
    <div>
      <h1>{data.content}</h1>
    </div>
  );
}
