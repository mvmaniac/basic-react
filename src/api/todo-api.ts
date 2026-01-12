import type { Todo } from '@/shared/types';

import { API_BASE_URL } from '@/shared/constants';

export async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch(`${API_BASE_URL}/todos`);
  if (!response.ok) throw new Error(`Fetch failed: ${response.statusText}`);
  return (await response.json()) as Todo[];
}

export async function fetchTodoById(id: number): Promise<Todo> {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`);
  if (!response.ok) throw new Error(`Fetch failed: ${response.statusText}`);
  return (await response.json()) as Todo;
}
