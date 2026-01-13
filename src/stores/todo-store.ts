import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { Todo } from '@/shared/types/todo';

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const useTodoStore = create(
  immer(
    combine(initialState, (set) => ({
      actions: {
        createTodo: (content: string) => {
          set((state) => {
            state.todos.push({
              id: String(new Date().getTime()),
              content,
              isDone: false,
            });
          });
        },
        deleteTodo: (targetId: Todo['id']) => {
          set((state) => {
            state.todos = state.todos.filter((todo) => todo.id !== targetId);
          });
        },
      },
    })),
  ),
);

export const useTodos = () => {
  return useTodoStore((state) => state.todos);
};

export const useCreateTodo = () => {
  return useTodoStore((state) => state.actions.createTodo);
};

export const useDeleteTodo = () => {
  return useTodoStore((state) => state.actions.deleteTodo);
};
