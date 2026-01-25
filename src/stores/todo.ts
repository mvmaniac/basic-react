import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import type { Todo } from '@/shared/types';

interface TodoState {
  todos: Todo[];
}

interface TodoActions {
  createTodo: (content: Todo['content']) => void;
  deleteTodo: (targetId: Todo['id']) => void;
}

interface TodoStore extends TodoState {
  actions: TodoActions;
}

const initialState: TodoState = {
  todos: [],
};

const useTodoStore = create<TodoStore>()(
  immer((set) => ({
    ...initialState,
    actions: {
      createTodo: (content) => {
        set((state) => {
          state.todos.push({
            id: String(new Date().getTime()),
            content,
            isDone: false,
          });
        });
      },
      deleteTodo: (targetId) => {
        set((state) => {
          state.todos = state.todos.filter((todo) => todo.id !== targetId);
        });
      },
    },
  })),
);

export const useTodos = () => {
  return useTodoStore((store) => store.todos);
};

export const useCreateTodo = () => {
  return useTodoStore((store) => store.actions.createTodo);
};

export const useDeleteTodo = () => {
  return useTodoStore((store) => store.actions.deleteTodo);
};
