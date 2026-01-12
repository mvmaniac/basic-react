import { useQuery } from '@tanstack/react-query';

import { fetchTodoById, fetchTodos } from '@/api/todo-api';

export function useTodosData() {
  return useQuery({
    queryFn: fetchTodos,
    queryKey: ['todos'],
  });
}

export function useTodoById(id: number) {
  return useQuery({
    queryFn: () => fetchTodoById(id),
    queryKey: ['todos', id],
  });
}
