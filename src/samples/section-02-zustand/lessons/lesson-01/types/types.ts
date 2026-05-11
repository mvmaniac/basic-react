// MethodKeys<T>:
// T의 각 프로퍼티를 순회하면서 "함수 타입인 키"만 남깁니다.
// - 함수면 해당 키(K)
// - 함수가 아니면 never
// 마지막 [keyof T] 인덱싱으로 남은 키들의 유니온 타입을 만듭니다.
type MethodKeys<T> = {
  [K in keyof T]-?: T[K] extends (...args: infer _Args) => unknown ? K : never;
}[keyof T];

// MethodsOnly<T>:
// 위에서 추출한 "함수 키 집합"만 Pick 해서
// T에서 액션(메서드) 프로퍼티만 분리한 타입을 만듭니다.
type MethodsOnly<T> = Pick<T, MethodKeys<T>>;

export interface CosmeticsSlice {
  perfumeStock: number; // 향수 재고량 (상태)
  sellPerfume: () => void; // 향수 판매 (액션)
}

export interface ClothingSlice {
  shirtStock: number; // 셔츠 재고량 (상태)
  sellShirt: () => void; // 셔츠 판매 (액션)
}

export type DepartmentActions = MethodsOnly<CosmeticsSlice & ClothingSlice>;

export interface DepartmentStore extends CosmeticsSlice, ClothingSlice {
  actions: DepartmentActions;
}
