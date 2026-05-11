export interface User {
  id: number;
  name: string;
}

// 유저 수정 API (0.5초 지연)
export const updateUserApi = async (updatedUser: User): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`📡 [Network] 서버 데이터 수정 완료: ${updatedUser.name}`);
      resolve(updatedUser);
    }, 500);
  });
};

// 유저 조회 API (무효화 후 자동 호출될 함수)
export const fetchUserApi = async (id: number): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: '시니어 개발자 (수정 전)' });
    }, 300);
  });
};
