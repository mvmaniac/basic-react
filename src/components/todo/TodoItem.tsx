import { Link } from 'react-router';

import type { Todo } from '@/shared/types';

import { useDeleteTodo } from '@/stores/todo-store';

import { Button } from '@/components/ui/button';

interface TodoItemProps {
  id: Todo['id'];
  content: Todo['content'];
}

export default function TodoItem({ id, content }: TodoItemProps) {
  const deleteTodo = useDeleteTodo();

  const handleDeleteClick = () => {
    deleteTodo(id);
  };

  return (
    <div className="flex items-center justify-between border p-2">
      <Link to={`/todo-list/${id}`}>{content}</Link>
      <Button onClick={handleDeleteClick} variant={'destructive'}>
        삭제
      </Button>
    </div>
  );
}
