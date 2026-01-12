import TodoEditor from '@/components/todo/TodoEditor';
import TodoItem from '@/components/todo/TodoItem';

import { useTodosData } from '@/queries/todo-query';

export default function TodoListPage() {
  const { data: todos, isLoading, error } = useTodosData();

  if (isLoading) return <div>로딩 중 입니다 ...</div>;
  if (error) return <div>오류가 발생했습니다.</div>;

  return (
    <div className="flex flex-col gap-5 p-5">
      <h1 className="text-2xl font-bold">TodoList</h1>
      <TodoEditor />
      {todos?.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </div>
  );
}
