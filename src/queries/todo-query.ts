import { useQuery, useQueryClient } from '@tanstack/react-query';

import type { Todo } from '@/shared/types';

import { fetchTodoById, fetchTodos } from '@/api/todo-api';

import { QUERY_KEYS } from '@/shared/constants';

export function useTodosData() {
  const queryClient = useQueryClient();

  return useQuery({
    queryFn: async () => {
      console.log('useQuery called.....');

      const todos = await fetchTodos();

      todos.forEach((todo) => {
        queryClient.setQueryData<Todo>(QUERY_KEYS.todo.detail(todo.id), todo);
      });

      return todos.map((todo) => todo.id);
    },
    queryKey: QUERY_KEYS.todo.list,
  });
}

export function useTodoById(id: string, type: 'LIST' | 'DETAIL') {
  return useQuery({
    queryFn: () => fetchTodoById(id),
    queryKey: QUERY_KEYS.todo.detail(id),
    enabled: type === 'DETAIL',
  });
}
