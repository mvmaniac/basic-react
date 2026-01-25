import { Link } from 'react-router';

import type { Todo } from '@/shared/types';

import { Button } from '@/components/ui/button.tsx';

import { useDeleteTodo, useUpdateTodo } from '@/queries/todo.mutation.ts';
import { useTodoById } from '@/queries/todo.query.ts';

interface TodoItemProps {
  id: Todo['id'];
}

export default function TodoItem({ id }: TodoItemProps) {
  const { data: todo } = useTodoById(id, 'LIST');
  const { mutate: updateTodo } = useUpdateTodo();
  const { mutate: deleteTodo, isPending: isDeletePending } = useDeleteTodo();

  if (!todo) return null;
  const { content, isDone } = todo;

  const handleToggleTodo = () => {
    updateTodo({
      id,
      isDone: !isDone,
    });
  };

  const handleDeleteClick = () => {
    deleteTodo(id);
  };

  return (
    <div className="flex items-center justify-between border p-2">
      <div className="flex gap-5">
        <input
          type="checkbox"
          checked={isDone}
          disabled={isDeletePending}
          onChange={handleToggleTodo}
        />
        <Link to={`/todo-list/${id}`}>{content}</Link>
      </div>
      <Button variant={'destructive'} disabled={isDeletePending} onClick={handleDeleteClick}>
        삭제
      </Button>
    </div>
  );
}
