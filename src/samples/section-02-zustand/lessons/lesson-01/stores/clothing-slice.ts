import type {
  ClothingSlice,
  DepartmentStore,
} from '@/samples/section-02-zustand/lessons/lesson-01/types/types.ts';
import type { StateCreator } from 'zustand';

export const createClothingSlice: StateCreator<DepartmentStore, [], [], ClothingSlice> = (set) => ({
  shirtStock: 50,
  sellShirt: () => set((state) => ({ shirtStock: state.shirtStock - 1 })),
});
