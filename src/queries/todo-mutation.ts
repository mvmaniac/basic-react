import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { Todo } from '@/shared/types';

import { createTodo, deleteTodo, updateTodo } from '@/api/todo-api';

import { QUERY_KEYS } from '@/shared/constants';

export function useCreateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onMutate: () => {
      // 비동기 실행 전
      console.log('[useCreateTodoMutation] onMutate called');
    },
    onSettled: () => {
      // 비동기 완료 후
      console.log('[useCreateTodoMutation] onSettled called');
    },
    onSuccess: (newTodo) => {
      // 목록 갱신 - 성공시 추가 하는 방법
      // 캐시 정규화 전
      // queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
      //   if (!prevTodos) return [newTodo];
      //   return [...prevTodos, newTodo];
      // });
      // 캐시 정규화 후
      queryClient.setQueryData<Todo>(QUERY_KEYS.todo.detail(newTodo.id), newTodo);
      queryClient.setQueryData<string[]>(QUERY_KEYS.todo.list, (prevTodoIds) =>
        prevTodoIds ? [...prevTodoIds, newTodo.id] : [newTodo.id],
      );

      // 목록 갱신 - 캐시 무효화하여 재요청하는 방법
      // await queryClient.invalidateQueries({
      //   queryKey: QUERY_KEYS.todo.list,
      // });
    },
    onError: (error) => {
      window.alert(error.message);
    },
  });
}

// 낙관적 락 사용 시
export function useUpdateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    onMutate: async (updatedTodo) => {
      // 캐시 정규화 전
      // await queryClient.cancelQueries({
      //   queryKey: QUERY_KEYS.todo.list,
      // });
      //
      // const prevTodos = queryClient.getQueryData<Todo[]>(QUERY_KEYS.todo.list);
      //
      // queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
      //   if (!prevTodos) return [];
      //   return prevTodos.map((prevTodo) =>
      //     prevTodo.id === updatedTodo.id ? { ...prevTodo, ...updatedTodo } : prevTodo,
      //   );
      // });
      //
      // // error 발생 시 사용하기 위해 이전 목록 반환
      // return {
      //   prevTodos,
      // };

      // 캐시 정규화 후
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.todo.detail(updatedTodo.id),
      });

      const prevTodo = queryClient.getQueryData<Todo>(QUERY_KEYS.todo.detail(updatedTodo.id));

      queryClient.setQueryData<Todo>(QUERY_KEYS.todo.detail(updatedTodo.id), (prevTodo) => {
        if (!prevTodo) return;
        return { ...prevTodo, ...updatedTodo };
      });

      return {
        prevTodo,
      };
    },
    onError: (_error, _variable, context) => {
      // 캐시 정규화 전
      // if (!context?.prevTodos) return;
      // queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, context.prevTodos);

      // 캐시 정규화 후
      if (!context?.prevTodo) return;
      queryClient.setQueryData<Todo>(QUERY_KEYS.todo.detail(context.prevTodo.id), context.prevTodo);
    },
    // 캐시 정규화 후에는 사용하지 않음
    // 왜냐하면 리스트의 개별 아이템의 캐시는 disabled 상태이기 때문
    // onSettled: async () => {
    //   await queryClient.invalidateQueries({
    //     queryKey: QUERY_KEYS.todo.list,
    //   });
    // },
  });
}

export function useDeleteTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: (deletedTodo) => {
      // 1. 캐시 무효화 -> invalidateQueries
      // 2. 수정 요청의 응답값 활용 -> onSuccess
      // 3. 낙관적 업데이트 -> onMutate

      // 캐시 정규화 전
      // queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
      //   if (!prevTodos) return [];
      //   return prevTodos.filter((prevTodo) => prevTodo.id !== deletedTodo.id);
      // });

      // 캐시 정규화 후
      queryClient.removeQueries({
        queryKey: QUERY_KEYS.todo.detail(deletedTodo.id),
      });

      queryClient.setQueryData<string[]>(QUERY_KEYS.todo.list, (prevTodos) => {
        if (!prevTodos) return [];
        return prevTodos.filter((prevId) => prevId !== deletedTodo.id);
      });
    },
  });
}
