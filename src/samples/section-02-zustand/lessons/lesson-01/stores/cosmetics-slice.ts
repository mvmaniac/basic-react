import type {
  CosmeticsSlice,
  DepartmentStore,
} from '@/samples/section-02-zustand/lessons/lesson-01/types/types.ts';
import type { StateCreator } from 'zustand';

/**
 * StateCreator를 통해 전체 구조를 인지하면서, 실제 구현은 CosmeticsSlice에 맞게 진행합니다.
 * DepartmentStore, // 첫 번째: 전체 스토어 타입 (다른 슬라이스 참조용)
 * [],              // 두 번째: 미들웨어 (없음)
 * [],              // 세 번째: 미들웨어 (없음)
 * CosmeticsSlice   // 네 번째: 현재 구현할 슬라이스 타입
 */
export const createCosmeticsSlice: StateCreator<DepartmentStore, [], [], CosmeticsSlice> = (
  set,
) => ({
  perfumeStock: 100,
  sellPerfume: () => set((state) => ({ perfumeStock: state.perfumeStock - 1 })),
});
