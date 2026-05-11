export interface User {
  id: number;
  name: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
}

export const fetchUser = async (id: number): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 0) reject(new Error('존재하지 않는 유저입니다.'));
      resolve({ id, name: '시니어 아키텍트' });
    }, 2000);
  });
};

export const fetchPosts = async (id: number): Promise<Post[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: '첫 번째 게시글', content: 'useSuspenseQueries 최적화 완료!' },
        { id: 2, title: '두 번째 게시글', content: 'Waterfall 현상을 격파했습니다.' },
      ]);
    }, 2000);
  });
};
