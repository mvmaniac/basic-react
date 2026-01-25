import type { Todo } from '@/shared/types';

import { API_BASE_URL } from '@/shared/constants';

export async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch(`${API_BASE_URL}/todos`);
  if (!response.ok) throw new Error(`Fetch failed: ${response.statusText}`);
  return (await response.json()) as Todo[];
}

export async function fetchTodoById(id: string): Promise<Todo> {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`);
  if (!response.ok) throw new Error(`Fetch failed: ${response.statusText}`);
  return (await response.json()) as Todo;
}

export async function createTodo(content: string) {
  const response = await fetch(`${API_BASE_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content,
      isDone: false,
    }),
  });

  if (!response.ok) throw new Error(`Create failed: ${response.statusText}`);
  return (await response.json()) as Todo;
}

export async function updateTodo(todo: Partial<Todo> & { id: string }) {
  const response = await fetch(`${API_BASE_URL}/todos/${todo.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) throw new Error(`Update failed: ${response.statusText}`);
  return (await response.json()) as Todo;
}

export async function deleteTodo(id: string) {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('Delete Todo Failed');
  return (await response.json()) as Todo;
}
