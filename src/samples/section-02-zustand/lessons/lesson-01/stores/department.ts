import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

import type { DepartmentStore } from '@/samples/section-02-zustand/lessons/lesson-01/types/types.ts';

import { createClothingSlice } from '@/samples/section-02-zustand/lessons/lesson-01/stores/clothing-slice.ts';
import { createCosmeticsSlice } from '@/samples/section-02-zustand/lessons/lesson-01/stores/cosmetics-slice.ts';

const useDepartmentStore = create<DepartmentStore>((...a) => {
  const cosmetics = createCosmeticsSlice(...a);
  const clothing = createClothingSlice(...a);

  return {
    ...cosmetics,
    ...clothing,
    actions: {
      sellPerfume: cosmetics.sellPerfume,
      sellShirt: clothing.sellShirt,
    },
  };
});

export const useDepartmentState = () =>
  useDepartmentStore(
    useShallow((state) => ({
      perfumeStock: state.perfumeStock,
      shirtStock: state.shirtStock,
    })),
  );

export const useDepartmentActions = () => useDepartmentStore((state) => state.actions);
