import { create } from 'zustand';
import {
  combine,
  createJSONStorage,
  devtools,
  persist,
  subscribeWithSelector,
} from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// interface Count {
//   count: number;
//   actions: {
//     increase: () => void;
//     decrease: () => void;
//   };
// }

// export const useCountStore = create<Count>((set, _get) => ({
//   count: 0,
//   actions: {
//     increase: () => set((store) => ({ count: store.count + 1 })),
//     decrease: () => set((store) => ({ count: store.count - 1 })),
//   },
// }));

// combine
// 첫 번쨰 인수를 가지고 자동 추론하므로 별도의 타입을 정의하지 않아도 됨
// 두 번쨰 인수에서 선언한 함수에서는 첫 번째 인수의 값만 접근 가능
const useCountStore = create(
  devtools(
    persist(
      subscribeWithSelector(
        immer(
          combine(
            {
              count: 0,
            },
            (set, _get) => ({
              actions: {
                // increase: () => set((state) => ({ count: state.count + 1 })),
                // decrease: () => set((state) => ({ count: state.count - 1 })),
                increaseImmer: () =>
                  set((state) => {
                    state.count += 1;
                  }),
                decreaseImmer: () =>
                  set((state) => {
                    state.count -= 1;
                  }),
              },
            }),
          ),
        ),
      ),
      {
        name: 'count',
        partialize: (store) => ({ count: store.count }),
        storage: createJSONStorage(() => sessionStorage), // or localStorage (default)
      },
    ),
  ),
);

useCountStore.subscribe(
  (store) => store.count,
  (count, prevCount) => {
    // listener
    console.log(`useCountStore.subscribe => count: ${count}, prevCount: ${prevCount}`);
  },
);

export const useCount = () => {
  return useCountStore((store) => store.count);
};

export const useIncreaseCount = () => {
  return useCountStore((store) => store.actions.increaseImmer);
};

export const useDecreaseCount = () => {
  return useCountStore((store) => store.actions.decreaseImmer);
};
