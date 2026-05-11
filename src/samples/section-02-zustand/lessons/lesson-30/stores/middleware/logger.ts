import type { StateCreator, StoreMutatorIdentifier } from 'zustand';

type Logger = <
  T, // 상태 데이터의 타입 (예: { count: number })
  Mps extends [StoreMutatorIdentifier, unknown][] = [], // 앞선 미들웨어들의 누적 타입 로그
  Mcs extends [StoreMutatorIdentifier, unknown][] = [], // 현재 미들웨어가 추가할 타입 로그
>(
  f: StateCreator<T, Mps, Mcs>, // 인자 1: 원본 스토어 조리법
  name?: string, // 인자 2: 콘솔 식별용 스토어 이름
) => StateCreator<T, Mps, Mcs>; // 반환: 강화된 조리법

export const logger: Logger = (f, name) => (set, get, store) => {
  // [2] 원래의 set 함수를 가로채는 'loggedSet'을 설계합니다.
  const loggedSet = ((...args: unknown[]) => {
    // 시각적 가시성을 위해 %c를 사용하여 콘솔 텍스트에 색상을 입힙니다.
    console.log(
      `%c[Zustand] ${name ?? 'Store'} 업데이트 시작`,
      'color: #4CAF50; font-weight: bold;',
    );

    // [3] 업데이트 직전의 생생한 현재 상태를 사진 찍듯 기록합니다.
    console.log('이전 상태(Prev):', get());

    /**
     * [4] 실제 상태 변경 수행
     * Zustand의 set은 동기(Synchronous)적으로 작동합니다.
     * 즉, 이 줄이 끝나면 상태는 이미 변해 있습니다.
     * 내부 구현에서만 set 호출 타입을 단순 함수로 우회합니다.
     * 이 우회는 이 한 지점에만 국한되며, 외부로 노출되는 loggedSet 타입은
     * 아래의 `as typeof set`로 원래 시그니처를 유지합니다.
     */
    (set as unknown as (...innerArgs: unknown[]) => void)(...args);

    // [5] 변경된 결과물을 다시 스냅샷 찍어 대조합니다.
    console.log('다음 상태(Next):', get());
    console.log('%c업데이트 완료', 'color: #4CAF50; font-weight: bold;');
  // 외부 타입 계약은 원래 set 시그니처를 따르도록 유지합니다.
  }) as typeof set;

  /**
   * [6] 마지막 관문: 원본 조리법 f를 실행합니다.
   * 이때, 원래의 set 대신 우리가 가로챈 loggedSet을 전달하는 것이 핵심입니다.
   */
  return f(loggedSet, get, store);
};
